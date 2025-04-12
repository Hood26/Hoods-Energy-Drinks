import { DependencyContainer } from "tsyringe";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import * as fs from 'fs';
import { jsonc } from "jsonc";
import path from "path";
import { Buffs } from "./buffs";
import type { itemProps } from "./info";
import { DrinkInfo } from "./info";

export class ItemCreateHelper {
    
    public config: any;
    public loot: Array<NewItemFromCloneDetails> = [];
    public items: Array<string> = [];

    public buildItems(container: DependencyContainer) {
        const db: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        this.config = jsonc.parse(fs.readFileSync(path.resolve(__dirname, "../config/config.jsonc"), "utf-8")).config;
        const customItem = container.resolve<CustomItemService>("CustomItemService");
        const info: Record<string, itemProps> = DrinkInfo;
        const buffs: Buffs = new Buffs();

        for (const [key, value] of Object.entries(info)) {
            db.tableData.globals.config.Health.Effects.Stimulator.Buffs[key] = this.config[`${key}_effect_toggle`] ? buffs[`${key}_buffs`] : []

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
                    Weight: 0.6,
                    foodUseTime: 5,
                    StimulatorBuffs: key,
                    effects_health: {},
                    effects_damage: {
    
                    }
                },
                parentId: "5448e8d64bdc2dce718b4568",
                newId: value._id, 
                fleaPriceRoubles: this.config[`${key}_flea_price`],
                handbookPriceRoubles: value.handbookPriceRoubles,
                handbookParentId: "5b47574386f77428ca22b335",
                locales: {
                    "en": {
                        name: value.name,
                        shortName: value.shortName,
                        description: value.desc
                    }
                },
                addToStaticLoot: {
                    "578f87a3245977356274f2cb": this.config[`${key}_loot_duffle_bag_weight`],
                    "5909e4b686f7747f5b744fa4": this.config[`${key}_loot_dead_scav_weight`],
                    "578f8778245977358849a9b5": this.config[`${key}_loot_jacket_weight`],
                    "5d6fd13186f77424ad2a8c69": this.config[`${key}_loot_ration_supply_crate_weight`],
                    "5d6d2b5486f774785c2ba8ea": this.config[`${key}_loot_ground_cache_weight`],
                },
                looseLootSpawnWeight: this.config[`${key}_loose_loot_multiplier`]
            }
            this.loot.push(item);
            customItem.createItemFromClone(item);
        }
    }
}