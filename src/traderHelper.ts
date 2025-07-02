import { DependencyContainer } from "tsyringe";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { FluentAssortConstructor as FluentAssortCreator } from "./fluentTraderAssortCreator";
import { Money } from "@spt/models/enums/Money";
import type { itemProps } from "./info";
import { DrinkInfo } from "./info"; 


export class TraderHelper
{
     /**
     * Add basic items to trader
     * @param tables SPT db
     * @param traderId Traders id (basejson/_id value)
     */
     public addSingleItemsToTrader(tables: IDatabaseTables, traderId: string, assortCreator: FluentAssortCreator, container: DependencyContainer, logger: ILogger, config: any) : void {
        const info: Record<string, itemProps> = DrinkInfo;

        for (const [key, value] of Object.entries(info)) {
          if (config[`${key}_sold_by_trader`]) {
               assortCreator.createSingleAssortItem(value._id)
                    .addUnlimitedStackCount()
                    .addBuyRestriction(config[`${key}_stock`])
                    .addMoneyCost(Money.ROUBLES, (config[`enable_alternate_buffs`] ? config[`alternate_trader_price`] : config[`${key}_trader_price`]))
                    .addLoyaltyLevel(config[`${key}_loyalty_level`])
                    .export(tables.traders[traderId]);
          }
        }
     }
}