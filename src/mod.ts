// SPT types
import { DependencyContainer } from "tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ImageRouter } from "@spt/routers/ImageRouter";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { ILocationData } from "@spt/models/spt/server/ILocations";
import { HashUtil } from "@spt/utils/HashUtil";
import { TraderHelper } from "./traderHelpers";
import { ItemCreateHelper } from "./itemCreateHelper";
import { FluentAssortConstructor as FluentAssortCreator } from "./fluentTraderAssortCreator";
import { VFS } from "@spt/utils/VFS";
import { jsonc } from "jsonc";
import path from "path";

class HoodsEnergyDrinks implements IPreSptLoadMod, IPostDBLoadMod
{
    private mod: string
    private logger: ILogger
    private traderHelper: TraderHelper
    private fluentAssortCreator: FluentAssortCreator
    private hashUtil: HashUtil;
    public config: any;

    constructor() {
        this.mod = "Hoods Energy Drinks";
    }

    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param container Dependency container
     */
    public preSptLoad(container: DependencyContainer): void {
        // Get a logger
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.logger.debug(`[${this.mod}] preAki Loading... `);

        // Get SPT code/data we need later
        const hashUtil: HashUtil = container.resolve<HashUtil>("HashUtil");
        const vfs = container.resolve<VFS>("VFS")

        // Create helper class and use it to register our traders image/icon + set its stock refresh time
        this.config = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config/config.jsonc")))
        this.hashUtil = hashUtil;
        this.traderHelper = new TraderHelper();
        this.fluentAssortCreator = new FluentAssortCreator(hashUtil, this.logger);

    }
    
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     * @param container Dependency container
     */
    public postDBLoad(container: DependencyContainer): void {
        this.logger.debug(`[${this.mod}] postDb Loading... `);

        // Resolve SPT classes we'll use
        const databaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        //const configServer: ConfigServer = container.resolve<ConfigServer>("ConfigServer");
        const jsonUtil: JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        // Creates and stores new gambling items in database
        const itemCreate = new ItemCreateHelper();

        itemCreate.createItems(container)

        // Get a reference to the database tables
        const tables = databaseServer.getTables();


        // Add energy drinks to therapist
        this.traderHelper.addSingleItemsToTrader(tables, '54cb57776803fa99248b456e', this.fluentAssortCreator, container, this.logger);

        const maps = [
            "bigmap",     // customs
            "factory4_day",
            "factory4_night",
            "woods",
            "rezervbase",
            "shoreline",
            "interchange",
            "tarkovstreets",
            "lighthouse",
            "laboratory",
            "sandbox",    // groundzero
            "sandbox_high"
        ];

        //console.log(tables.locations["bigmap"].staticLoot["578f87a3245977356274f2cb"].itemDistribution[217])
        //console.log(tables.locations["bigmap"].staticLoot["5d6fd13186f77424ad2a8c69"].itemDistribution)
        
        const items = tables.locations["bigmap"].staticLoot["5d6d2b5486f774785c2ba8ea"].itemDistribution
        
        for (const item in items) {
            if (items[item].tpl == '5751435d24597720a27126d1') {
                //console.log(item)
                console.log(items[item])
            }
        }
            
            

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
        
        //console.log(tables.locations["bigmap"].staticLoot["578f87a3245977356274f2cb"].itemDistribution) // Drawer
        // Currently this adds poker chips to many static loot containers on all maps
        for (const item of itemCreate.loot){
            for(const map of maps){
                const mapStaticLoot = tables.locations[map].staticLoot;
                const staticLootProbabilities = item.addToStaticLoot;
                for(const [lootContainer, probability] of Object.entries(staticLootProbabilities)){

                    try{
                        mapStaticLoot[lootContainer].itemDistribution.push({
                            "tpl": item.newId,
                            "relativeProbability": probability
                        });
                    } catch (e){
                        this.logger.debug("Could not add " + item.newId + " to container " + lootContainer + " on map " + map)
                    }

                }
            }
        }
        this.logger.debug(`[${this.mod}] postDb Loaded`);

        this.logger.success("[Hood Energy Drinks] Energy Drinks Loaded!");
    }
}

module.exports = { mod: new HoodsEnergyDrinks() }
