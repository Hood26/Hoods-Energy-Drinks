import { DependencyContainer } from "tsyringe";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { FluentAssortConstructor as FluentAssortCreator } from "./fluentTraderAssortCreator";
import { Money } from "@spt/models/enums/Money";
import { VFS } from "@spt/utils/VFS";
import { jsonc } from "jsonc";
import path from "path";


export class TraderHelper
{
     /**
     * Add basic items to trader
     * @param tables SPT db
     * @param traderId Traders id (basejson/_id value)
     */
     public addSingleItemsToTrader(tables: IDatabaseTables, traderId: string, assortCreator: FluentAssortCreator, container: DependencyContainer, logger: ILogger) : void {
        const vfs = container.resolve<VFS>("VFS")
        const config = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config/config.jsonc")))


        assortCreator.createSingleAssortItem("65ccf66fc9162d12270bb181")
               .addUnlimitedStackCount()
               .addBuyRestriction(config.config['monster_blue_stock'])
               .addMoneyCost(Money.ROUBLES, config.config['monster_blue_trader_price'])
               .addLoyaltyLevel(config.config['monster_blue_loyalty_level'])
               .export(tables.traders[traderId]);




        
        if (config.config['monster_blue_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb160")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['monster_blue_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['monster_blue_trader_price'])
                                     .addLoyaltyLevel(config.config['monster_blue_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['monster_green_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb161")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['monster_green_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['monster_green_trader_price'])
                                     .addLoyaltyLevel(config.config['monster_green_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['monster_white_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb162")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['monster_white_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['monster_white_trader_price'])
                                     .addLoyaltyLevel(config.config['monster_white_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['monster_strawberry_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb163")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['monster_strawberry_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['monster_strawberry_trader_price'])
                                     .addLoyaltyLevel(config.config['monster_strawberry_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['ghost_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb174")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['ghost_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['ghost_trader_price'])
                                     .addLoyaltyLevel(config.config['ghost_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['nos_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb175")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['nos_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['nos_trader_price'])
                                     .addLoyaltyLevel(config.config['nos_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['monster_punch_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb176")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['monster_punch_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['monster_punch_trader_price'])
                                     .addLoyaltyLevel(config.config['monster_punch_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['bang_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb177")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['bang_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['bang_trader_price'])
                                     .addLoyaltyLevel(config.config['bang_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['monster_doctor_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb178")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['monster_doctor_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['monster_doctor_trader_price'])
                                     .addLoyaltyLevel(config.config['monster_doctor_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['monster_lemonade_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb179")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['monster_lemonade_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['monster_lemonade_trader_price'])
                                     .addLoyaltyLevel(config.config['monster_lemonade_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['redbull_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb180")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['redbull_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['redbull_trader_price'])
                                     .addLoyaltyLevel(config.config['redbull_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
        if (config.config['redbull_watermelon_sold_by_trader']) {
             assortCreator.createSingleAssortItem("66ccf66fc9162d12270bb181")
                                     .addUnlimitedStackCount()
                                     .addBuyRestriction(config.config['redbull_watermelon_stock'])
                                     .addMoneyCost(Money.ROUBLES, config.config['redbull_watermelon_trader_price'])
                                     .addLoyaltyLevel(config.config['redbull_watermelon_loyalty_level'])
                                     .export(tables.traders[traderId]);
        }
     }
}