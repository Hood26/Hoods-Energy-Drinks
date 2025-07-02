import { DependencyContainer } from "tsyringe";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { Buffs } from "./buffs";
import type { itemProps } from "./info";
import { DrinkInfo } from "./info";

export class ItemCreateHelper {
    public config: any;
    public loot: Array<NewItemFromCloneDetails> = [];
    public items: Array<string> = [];

    public buildItems(container: DependencyContainer, config: any) {
        const db: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const customItem = container.resolve<CustomItemService>("CustomItemService");
        const info: Record<string, itemProps> = DrinkInfo;
        const buffs: Buffs = new Buffs();
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs['alternate_buffs'] = buffs['alternate_buffs'];

        for (const [key, value] of Object.entries(info)) {
            db.tableData.globals.config.Health.Effects.Stimulator.Buffs[key] = config[`${key}_effect_toggle`] ? buffs[`${key}_buffs`] : []
            
            const item: NewItemFromCloneDetails = {
                itemTplToClone: "5d40407c86f774318526545a",
                overrideProperties: {
                    Prefab: {
                        path: `assets/${key}.bundle`,
                        rcid: ""
                    },
                    UsePrefab: {
                        path: `assets/${key}_container.bundle`,
                        rcid: ""
                    },
                    DiscardLimit: -1,
                    Weight: 0.6,
                    foodUseTime: 5,
                    StimulatorBuffs: config[`enable_alternate_buffs`] ? 'alternate_buffs' : key,
                    effects_health: {},
                    effects_damage: {}
                },
                parentId: "5448e8d64bdc2dce718b4568",
                newId: value._id, 
                fleaPriceRoubles: config[`enable_alternate_buffs`] ? config[`alternate_flea_price`] : config[`${key}_flea_price`],
                handbookPriceRoubles: config[`enable_alternate_buffs`] ? config[`alternate_handbook_price`] : config[`${key}_handbook_price`],
                handbookParentId: "5b47574386f77428ca22b335",
                locales: {
                    "en": {
                        name: value.name,
                        shortName: value.shortName,
                        description: value.desc
                    }
                },
                addToStaticLoot: {
                    "578f87a3245977356274f2cb": config[`${key}_loot_duffle_bag_multiplier`],
                    "5909e4b686f7747f5b744fa4": config[`${key}_loot_dead_scav_multiplier`],
                    "578f8778245977358849a9b5": config[`${key}_loot_jacket_multiplier`],
                    "5d6fd13186f77424ad2a8c69": config[`${key}_loot_ration_supply_crate_multiplier`],
                    "5d6d2b5486f774785c2ba8ea": config[`${key}_loot_ground_cache_multiplier`]
                },
                looseLootSpawnWeight: config[`${key}_loose_loot_multiplier`]
            }
            this.loot.push(item);
            customItem.createItemFromClone(item);
        }
    }
}