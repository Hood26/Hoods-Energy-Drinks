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
import { TraderHelper } from "./traderHelper";
import { ItemCreateHelper } from "./itemCreateHelper";
import { FluentAssortConstructor as FluentAssortCreator } from "./fluentTraderAssortCreator";
import * as fs from 'node:fs';
import path from "node:path";
import { jsonc } from "jsonc";
import { DrinkInfo, itemProps } from "./info";

// I'm just here so I won't get fined
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
        this.traderHelper = new TraderHelper();
        this.fluentAssortCreator = new FluentAssortCreator(hashUtil, this.logger);
    }
    
    public postDBLoad(container: DependencyContainer): void {
        this.logger.debug(`[${this.mod}] postDb Loading... `);
        const configPath = path.resolve(__dirname, "../config/config.jsonc");
        this.config = jsonc.parse(fs.readFileSync(configPath, "utf-8"));
        const databaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const ragfairConfig = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const info: Record<string, itemProps> = DrinkInfo;
        const itemCreate = new ItemCreateHelper();
        const tables = databaseServer.getTables();
        itemCreate.buildItems(container, this.config)
        this.traderHelper.addSingleItemsToTrader(tables, '54cb57776803fa99248b456e', this.fluentAssortCreator, container, this.logger, this.config);

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
                                if (itm._tpl == "5751496424597720a27126da") { // Hot Rod Energy Drink
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
        

        for (const item of itemCreate.loot){
            for(const map of maps){
                const mapStaticLoot = tables.locations[map].staticLoot;
                const staticLootProbabilities = item.addToStaticLoot;
                for(const [lootContainer, probability] of Object.entries(staticLootProbabilities)){
                    const hot_rod_energy_prob: number = this.getProbability(mapStaticLoot, lootContainer, '5751496424597720a27126da', map);
                    try{
                        mapStaticLoot[lootContainer].itemDistribution.push({
                            "tpl": item.newId,
                            "relativeProbability": Math.ceil(probability * hot_rod_energy_prob)
                        });
                    } catch (e){
                        this.logger.debug("[Hoods Energy Drinks] Could not add " + item.newId + " to container " + lootContainer + " on map " + map)
                    }
                }
            }
        }
        this.logger.debug(`[${this.mod}] postDb Loaded`);
        this.logger.success("[Hoods Energy Drinks] Energy Drinks Loaded!");
    }

    private getProbability(mapStaticLoot: any, lootContainer: string, _id: string, map: string): number{

        for (const [key, value] of Object.entries(mapStaticLoot)){
            if (key != lootContainer) continue;

            for (let i = 0; i < value.itemDistribution.length; i++) {
                if (mapStaticLoot[key].itemDistribution[i].tpl == _id) {
                    return mapStaticLoot[key].itemDistribution[i].relativeProbability;
                }
            }
        }
        return 300; // base value for containers that don't have max energy drinks in their loot pool
    }
}

module.exports = { mod: new HoodsEnergyDrinks() }
