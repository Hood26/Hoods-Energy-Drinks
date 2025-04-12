import { DependencyContainer } from "tsyringe";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import * as fs from 'fs';
import { jsonc } from "jsonc";
import path from "path";
import { Buffs } from "./buffs";
import { Info } from "./info";

export class ItemCreateHelper {

    public config: any;
    public loot: Array<NewItemFromCloneDetails> = [];
    public items: Array<string> = [

    ];

    // Create customs Items and store them in the database
    public createItems(container: DependencyContainer) {
        const db: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        this.config = jsonc.parse(fs.readFileSync(path.resolve(__dirname, "../config/config.jsonc"), "utf-8")).config;
        const customItem = container.resolve<CustomItemService>("CustomItemService");
        const info: Info = new Info();
        const buffs: Buffs = new Buffs();

        for (let item of info.drink_info) {
            db.tableData.globals.config.Health.Effects.Stimulator.Buffs[item] = this.config[`${item}_effect_toggle`] ? buffs[`${item}_buffs`] : []
        }

        const monster_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "monster_green",
                effects_health: {},
                effects_damage: {

                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb161", 
            fleaPriceRoubles: this.config['monster_green_flea_price'],
            handbookPriceRoubles: 50000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Original Green Energy Drink",
                    shortName: "Monster",
                    description: `The Original Green Monster Energy Drink is Tarkov's most scavenged and desired energy drink. Scavs and PMCs alike horde this beverage for both for its taste and affects, which help keep their energy and stamina up longer during raids.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_green_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_green_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_green_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_green_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_green_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_green_loose_loot_multiplier"]
        }

        this.loot.push(monster_energy);

        const monster_energy_blue: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_blue.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_blue_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "monster_blue",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb160", 
            fleaPriceRoubles: this.config['monster_blue_flea_price'],
            handbookPriceRoubles: 40000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Original Lo-Carb Energy Drink",
                    shortName: "Monster",
                    description: `The Lo-Carb Monster Energy Drink is a favorite among scavs that have a taste for increased their ability in scavenging faster and staying alert longer in-raid. Monster Energy Lo-Carb packs a powerful punch and has a smooth, easy drinking flavor, but without glucose. Get the big bad Monster buzz you know and love, but with a sweet & salty citrus twist with a fraction of the carbohydrates and only 30 calories per can and with 140mg of Caffeine.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_blue_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_blue_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_blue_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_blue_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_blue_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_blue_loose_loot_multiplier"]
        }

        this.loot.push(monster_energy_blue);

        const monster_energy_white: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_white.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                UsePrefab: {
                    path: "assets/monster_energy_white_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "monster_white",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb162", 
            fleaPriceRoubles: this.config['monster_white_flea_price'],
            handbookPriceRoubles: 55000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Zero Ultra Energy Drink",
                    shortName: "Monster",
                    description: `The light, refreshing citrus flavor of Zero Ultra has broken the rules of flavor. 10 calories, zero sugar, and a full load of our Monster Energy blend to keep the good times rolling.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_white_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_white_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_white_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_white_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_white_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_white_loose_loot_multiplier"]
        }

        this.loot.push(monster_energy_white);

        const monster_energy_strawberry: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_strawberry.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_strawberry_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "monster_strawberry",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb163", 
            fleaPriceRoubles: this.config['monster_strawberry_flea_price'],
            handbookPriceRoubles: 62500,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Zero-Ultra Strawberry Dreams Energy Drink",
                    shortName: "Monster",
                    description: `Take just one sip and you'll be crazy for Ultra Strawberry Dreams. Wonderfully sweet, while slightly tart, this easy-drinking Ultra tastes like a dream. Packed with the Monster Energy blend you love, with just 10 calories and zero sugar.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_strawberry_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_strawberry_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_strawberry_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_strawberry_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_strawberry_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_strawberry_loose_loot_multiplier"]
        }

        this.loot.push(monster_energy_strawberry);

        const ghost_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/ghost_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/ghost_energy_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "ghost",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb174", 
            fleaPriceRoubles: this.config['ghost_flea_price'],
            handbookPriceRoubles: 65000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Ghost Strawbango Margarita Energy Drink",
                    shortName: "Ghost",
                    description: `Ghost Energy is the fully transparent, fully loaded energy drink we have all been waiting for. Our legendary energy drink features no sugar, no artificial colors, and authentic Strawbango Margarita flavor. It contains 200mg of Natural Caffeine from coffee beans, which has been found anecdotally to deliver a smooth, feel-good energy with less jitters and no crash when compared to other forms of caffeine.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["ghost_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["ghost_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["ghost_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["ghost_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["ghost_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["ghost_loose_loot_multiplier"]
        }

        this.loot.push(ghost_energy);

        const nos_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/nos_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/nos_energy_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "nos",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb175", 
            fleaPriceRoubles: this.config['nos_flea_price'],
            handbookPriceRoubles: 70000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "NOS Original Energy Drink",
                    shortName: "NOS",
                    description: `Fuel Up. Fire Up. 100 mile an hour power. Thundering from top gear to no fear, the super-charged take charge. It's time to strap in, or sit it out. How Hard Will You Drive? High Performance Energy.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["nos_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["nos_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["nos_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["nos_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["nos_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["nos_loose_loot_multiplier"]
        }

        this.loot.push(nos_energy);

        const monster_energy_punch: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_punch.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_punch_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "monster_punch",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb176", 
            fleaPriceRoubles: this.config['monster_punch_flea_price'],
            handbookPriceRoubles: 100000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Juice Pipeline Punch Energy Drink",
                    shortName: "Monster",
                    description: `Like the Banzai Pipeline of Oahu, Pipeline Punch was destined to become a legend. The perfect carbonated blend of passion fruit, orange, guava, and our Monster Energy blend.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_punch_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_punch_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_punch_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_punch_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_punch_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_punch_loose_loot_multiplier"]
        }

        this.loot.push(monster_energy_punch);

        const bang_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/bang_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/bang_energy_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "bang",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb177", 
            fleaPriceRoubles: this.config['bang_flea_price'],
            handbookPriceRoubles: 105000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Bang Rainbow Unicorn Energy Drink",
                    shortName: "Bang",
                    description: `Bang is not your stereotypical high sugar, life-sucking soda masquerading as an energy drink! High sugar drinks spike blood sugar producing metabolic mayhem causing you to crash harder than a test dummy into a brick wall. Every 16-ounce can of Bang contains 300 milligrams of caffeine, which studies have shown may increase endurance, as well as strength in some cases, along with essential amino acids, CoQ10 and Super Creatine.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["bang_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["bang_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["bang_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["bang_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["bang_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["bang_loot_loose_loot_multiplier"]
        }

        this.loot.push(bang_energy);

        const monster_energy_doctor: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_doctor.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_doctor_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "monster_doctor",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb178", 
            fleaPriceRoubles: this.config['monster_doctor_flea_price'],
            handbookPriceRoubles: 115000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster The Doctor Energy Drink",
                    shortName: "Monster",
                    description: `Monster Energy Valentino Rossi VR46 500ml Carbonated Energy Drink and 160mg caffeine. VR46 tastes unlike traditional energy drinks with a light, crisp and refreshing citrus taste. We teamed up with MotoGP Champion, Valentino Rossi AKA ""The Doctor"", to create our fastest Monster yet. Serve cold for maximum refreshment.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_doctor_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_doctor_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_doctor_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_doctor_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_doctor_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_doctor_loose_loot_multiplier"]
        }

        this.loot.push(monster_energy_doctor);

        const monster_energy_lemonade: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_lemonade.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_lemonade_container.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                foodUseTime: 5,
                StimulatorBuffs: "monster_lemonade",
                effects_health: {
                    Hydration: {
                        value: 0
                    },
                    Energy: {
                        value: 100
                    }
                },
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb179", 
            fleaPriceRoubles: this.config['monster_lemonade_flea_price'],
            handbookPriceRoubles: 140000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Juice Aussie Lemonade Energy Drink",
                    shortName: "Monster",
                    description: `Inspired by the land down under and powered by our world-famous Monster Energy blend, Aussie Style Lemonade is a carbonated exotic twist on lemonade. Tart yet sweet, with a burst of fresh citrus flavor.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_lemonade_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_lemonade_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_lemonade_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_lemonade_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_lemonade_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_lemonade_loose_loot_multiplier"]
        }

        this.loot.push(monster_energy_lemonade);

        const starbucks_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/starbucks_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/starbucks_energy_container.bundle",
                    rcid: ""
                },
                Weight: 0.3,
                foodUseTime: 5,
                StimulatorBuffs: "starbucks",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb180", 
            fleaPriceRoubles: this.config['starbucks_flea_price'],
            handbookPriceRoubles: 65000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Starbucks Double Shot Energy Drink",
                    shortName: "Starbucks",
                    description: `Starbucks`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["starbucks_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["starbucks_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["starbucks_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["starbucks_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["starbucks_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["starbucks_loose_loot_multiplier"]
        }

        this.loot.push(starbucks_energy);

        const c4_starburst_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/c4_starburst_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/c4_starburst_energy_container.bundle",
                    rcid: ""
                },
                Weight: 0.3,
                foodUseTime: 5,
                StimulatorBuffs: "c4_starburst",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb181", 
            fleaPriceRoubles: this.config['c4_starburst_flea_price'],
            handbookPriceRoubles: 65000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "C4 Starburst Energy Drink",
                    shortName: "C4",
                    description: `C4 Starburst`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["c4_starburst_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["c4_starburst_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["c4_starburst_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["c4_starburst_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["c4_starburst_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["c4_starburst_loose_loot_multiplier"]
        }

        this.loot.push(c4_starburst_energy);

        const rockstar_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/rockstar_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/rockstar_energy_container.bundle",
                    rcid: ""
                },
                Weight: 0.3,
                foodUseTime: 5,
                StimulatorBuffs: "rockstar",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb182", 
            fleaPriceRoubles: this.config['rockstar_flea_price'],
            handbookPriceRoubles: 65000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Rockstar Energy Drink",
                    shortName: "Rockstar",
                    description: `Rockstar is scientifically formulated to provide an incredible energy boost for those who lead active and exhausting lifestyles-from athletes to rock stars. Put in the work with our original energy drink, fully-charged with B-vitamins and formulated with guarana, taurine, and caffeine to help keep you going and stay focused* with invigorating taste.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["rockstar_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["rockstar_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["rockstar_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["rockstar_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["rockstar_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["rockstar_loose_loot_multiplier"]
        }

        this.loot.push(rockstar_energy);

        const monster_energy_pacific_punch: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_pacific_punch.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                UsePrefab: {
                    path: "assets/monster_energy_pacific_punch_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "monster_white",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb184", 
            fleaPriceRoubles: this.config['monster_white_flea_price'],
            handbookPriceRoubles: 55000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Pacific Punch Energy Drink",
                    shortName: "Monster",
                    description: `The light, refreshing citrus flavor of Zero Ultra has broken the rules of flavor. 10 calories, zero sugar, and a full load of our Monster Energy blend to keep the good times rolling.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_white_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_white_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_white_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_white_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_white_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_white_loose_loot_multiplier"]
        }

        this.loot.push(monster_energy_pacific_punch);

        const ghost_energy_swedish_fish: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/ghost_energy_swedish_fish.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                UsePrefab: {
                    path: "assets/ghost_energy_swedish_fish_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "monster_white",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb183", 
            fleaPriceRoubles: this.config['monster_white_flea_price'],
            handbookPriceRoubles: 55000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Ghost Swedish Fish Energy Drink",
                    shortName: "Ghost",
                    description: `The light, refreshing citrus flavor of Zero Ultra has broken the rules of flavor. 10 calories, zero sugar, and a full load of our Monster Energy blend to keep the good times rolling.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_white_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_white_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_white_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_white_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_white_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_white_loose_loot_multiplier"]
        }

        this.loot.push(ghost_energy_swedish_fish);

        const stalker_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/stalker_energy.bundle",
                    rcid: ""
                },
                Weight: 0.6,
                UsePrefab: {
                    path: "assets/stalker_energy_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "monster_white",
                effects_health: {},
                effects_damage: {}
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb185", 
            fleaPriceRoubles: this.config['monster_white_flea_price'],
            handbookPriceRoubles: 55000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Original Stalker Energy Drink",
                    shortName: "Stalker",
                    description: `Rare energy drink originating from the Pripyat region. This is an excellent energy drink consisting of caffeine, taurine and a mixture of rejuvenating vitamins. Just the ticket when you're too tired to push forward!`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_white_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_white_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_white_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_white_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_white_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_white_loose_loot_multiplier"]
        }

        this.loot.push(stalker_energy);

        customItem.createItemFromClone(monster_energy);
        customItem.createItemFromClone(monster_energy_blue);
        customItem.createItemFromClone(monster_energy_white);
        customItem.createItemFromClone(monster_energy_strawberry);
        customItem.createItemFromClone(monster_energy_punch);
        customItem.createItemFromClone(nos_energy);
        customItem.createItemFromClone(bang_energy);
        customItem.createItemFromClone(ghost_energy);
        customItem.createItemFromClone(starbucks_energy);
        customItem.createItemFromClone(c4_starburst_energy);
        customItem.createItemFromClone(rockstar_energy);
        customItem.createItemFromClone(monster_energy_doctor);
        customItem.createItemFromClone(monster_energy_lemonade);
        customItem.createItemFromClone(monster_energy_pacific_punch);
        customItem.createItemFromClone(ghost_energy_swedish_fish);
        customItem.createItemFromClone(stalker_energy);
    }
}