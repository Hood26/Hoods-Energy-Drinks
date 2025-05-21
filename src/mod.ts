// SPT types
import { DependencyContainer } from "tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ILocationData } from "@spt/models/spt/server/ILocations";
import { HashUtil } from "@spt/utils/HashUtil";
import { TraderHelper } from "./traderHelpers";
import { ItemCreateHelper } from "./itemCreateHelper";
import { FluentAssortConstructor as FluentAssortCreator } from "./fluentTraderAssortCreator";
import * as fs from 'fs';
import { jsonc } from "jsonc";
import path from "path";
import { DrinkInfo, itemProps } from "./info";

class HoodsEnergyDrinks implements IPreSptLoadMod, IPostDBLoadMod
{
    private mod: string
    private logger: ILogger
    private traderHelper: TraderHelper
    private fluentAssortCreator: FluentAssortCreator
    public config: any;

    constructor() {
        this.mod = "Hoods Energy Drinks";
    }

    public preSptLoad(container: DependencyContainer): void {
        const hashUtil: HashUtil = container.resolve<HashUtil>("HashUtil");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.logger.debug(`[${this.mod}] preAki Loading... `);
        this.config = jsonc.parse(fs.readFileSync(path.resolve(__dirname, "../config/config.jsonc"), "utf-8")).config;
        this.traderHelper = new TraderHelper();
        this.fluentAssortCreator = new FluentAssortCreator(hashUtil, this.logger);
    }
    
    public postDBLoad(container: DependencyContainer): void {
        this.logger.debug(`[${this.mod}] postDb Loading... `);
        const databaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const ragfairConfig = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const info: Record<string, itemProps> = DrinkInfo;
        const itemCreate = new ItemCreateHelper();
        const tables = databaseServer.getTables();
        itemCreate.buildItems(container)
        this.traderHelper.addSingleItemsToTrader(tables, '54cb57776803fa99248b456e', this.fluentAssortCreator, container, this.logger);

        const maps = [
            "bigmap",      // customs
            "factory4_day",
            "factory4_night",
            "woods",
            "rezervbase",
            "shoreline",
            "interchange",
            "tarkovstreets",
            "lighthouse",
            "laboratory",
            "sandbox",     // groundzero
            "sandbox_high" // groundzero_lvl_20+
        ];

        // flea ban energy drinks
        for (const [key, value] of Object.entries(info)) {
            if (this.config[`${key}_flea_banned`]) {
                ragfairConfig.dynamic.blacklist.custom.push(value._id);
            }
        }

        // Add all energy drinks to all levels of Hall Of Fame
        const hall_of_fame_ids = [
            tables.templates.items["63dbd45917fff4dee40fe16e"], // lvl 1
            tables.templates.items["65424185a57eea37ed6562e9"], // lvl 2
            tables.templates.items["6542435ea57eea37ed6562f0"]  // lvl 3
        ];

        for (const item of itemCreate.loot){
            hall_of_fame_ids.forEach((hall) => {
                for (const slot of hall._props.Slots) {
                    for (const filter of slot._props.filters) {
                        if (!filter.Filter.includes(item.newId)) {
                            filter.Filter.push(item.newId);
                        }
                    }
                }
            });
        }   
         
        // Thanks to RainbowPC and his Lots Of Loot mod, based on his code inserting items into loose loot spawns
        for (const item of itemCreate.loot){
            const lootComposedKey = item.newId + '_composedkey';
            for(const map of maps) {
                for (const [name, temp] of Object.entries(tables.locations)) {
                    const mapdata : ILocationData = temp;
                    if (name == map) {
                        for (const point of mapdata.looseLoot.spawnpoints) {
                            for (const itm of point.template.Items) {
                                if (itm._tpl == "5751435d24597720a27126d1") { // Max Energy energy drink
                                    const originalItemID = itm._id;
                                    let originRelativeProb: any;
                                    for (const dist of point.itemDistribution) {
                                        if (dist.composedKey.key == originalItemID) {
                                            originRelativeProb = dist.relativeProbability;
                                            point.template.Items.push({
                                                _id: lootComposedKey,
                                                _tpl: item.newId,
                                            })
                                        }
                                    }
                                    //console.log(Math.max(Math.round(originRelativeProb * item.looseLootSpawnWeight), 1))
                                    point.itemDistribution.push({
                                        composedKey: {
                                            key: lootComposedKey,
                                        },
                                        relativeProbability: Math.max(Math.round(originRelativeProb * item.looseLootSpawnWeight), 1)
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
        
        //for (const item of Object.entries(tables.locations["interchange"].staticLoot["578f87a3245977356274f2cb"].itemDistribution)) {
            //if (item[1].tpl == "5751435d24597720a27126d1") { // Max Energy energy drink
                //const max_energy_prob = tables.locations[map].staticLoot[lootContainer].itemDistribution[0].relativeProbability;
            //}
        //}

        /*
        for (const item of Object.entries(tables.locations["tarkovstreets"].staticLoot["578f87a3245977356274f2cb"].itemDistribution)) {
            if (item[1].tpl == "5751435d24597720a27126d1") { // Max Energy energy drink
                console.log(item[1]);
            }
            if (item[1].tpl == "60b0f93284c20f0feb453da7") { // rat cola
                console.log(item[1]);
            }
        }
        return
        */

        //console.log(tables.locations["bigmap"].staticLoot["578f87a3245977356274f2cb"].itemDistribution) // Drawer
        //console.log(tables.locations["bigmap"].staticLoot["578f87a3245977356274f2cb"].itemDistribution[0].tpl)
        for (const item of itemCreate.loot){
            for(const map of maps){
                const mapStaticLoot = tables.locations[map].staticLoot;
                const staticLootProbabilities = item.addToStaticLoot; ''
                for(const [lootContainer, probability] of Object.entries(staticLootProbabilities)){
                    //console.log(lootContainer);
                    //console.log(map);
                    //console.log(tables.locations[map].staticLoot[lootContainer].itemDistribution[0]);
                    
                    try{
                        let max_energy_prob: number = 1;
                        for (const item of Object.entries(tables.locations[map].staticLoot[lootContainer].itemDistribution)) {
                            if (item[1].tpl == "5751435d24597720a27126d1" && lootContainer == '578f87a3245977356274f2cb') { // Max Energy energy drink
                                max_energy_prob = item[1].relativeProbability;
                                //console.log(max_energy_prob);
                                //console.log(probability);
                            }
                        }
                        mapStaticLoot[lootContainer].itemDistribution.push({
                            "tpl": item.newId,
                            "relativeProbability": probability * max_energy_prob
                        });
                    } catch (e){
                        this.logger.debug("Could not add " + item.newId + " to container " + lootContainer + " on map " + map)
                    }

                }
            }
            break;
        }
        this.logger.debug(`[${this.mod}] postDb Loaded`);
        this.logger.success("[Hoods Energy Drinks] Energy Drinks Loaded!");
    }
}

module.exports = { mod: new HoodsEnergyDrinks() }
