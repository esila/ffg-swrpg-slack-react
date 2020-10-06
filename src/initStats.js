const initCharacter = {
    name: "",
    player_name: "",
    species: "",
    credits: "",
    total_xp: 0,
    available_xp: 0,
    image_url: "",
    career: "",
    specializations: [
        {
            name: "",
            in_career: "yes"

        }
    ],
    gender: "",
    age: "",
    height: "",
    build: "",
    hair: "",
    eyes: "",
    notable_features: "",
    other: "",
    motivations_1_category: "",
    motivations_1_type: "",
    motivations_1_description: "",
    motivations_2_category: "",
    motivations_2_type: "",
    motivations_2_description: "",
};

const initSoakWounds = {
    soak: 1,
    wounds: {
        threshold: 1,
        current: 0
    },
    strain: {
        threshold: 1,
        current: 0
    },
    defense: {
        range: 0,
        melee: 0
    },
    encumberance: {
        threshold: 1,
        current: 0
    },
    force_rating: {
        threshold: 0,
        committed: 0
    }
};

const characteristics = ["Brawn", "Agility", "Intellect", "Cunning", "Willpower", "Presence"];
const initCharacteristicsState = Object.assign( {}, ...characteristics.map((characteristic) => ({[characteristic]: 1})));

const generalSkills = {
    Astrogation: {
        characteristic: "Intellect",
    },
    Athletics: {
        characteristic: "Brawn",
    },
    Charm: {
        characteristic: "Presence",
    },
    Coercion: {
        characteristic: "Willpower",
    },
    Computers: {
        characteristic: "Intellect",
    },
    Cool: {
        characteristic: "Presence",
    },
    Coordination: {
        characteristic: "Agility",
    },
    Deception: {
        characteristic: "Cunning",
    },
    Discipline: {
        characteristic: "Willpower",
    },
    Leadership: {
        characteristic: "Presence",
    },
    Mechanics: {
        characteristic: "Intellect",
    },
    Medicine: {
        characteristic: "Intellect",
    },
    Negotiation: {
        characteristic: "Presence",
    },
    Perception: {
        characteristic: "Cunning",
    },
    PilotingPlanetary: {
        characteristic: "Agility",
    },
    PilotingSpace: {
        characteristic: "Agility",
    },
    Resilience: {
        characteristic: "Brawn",
    },
    Skulduggery: {
        characteristic: "Cunning",
    },
    Stealth: {
        characteristic: "Agility",
    },
    Streetwise: {
        characteristic: "Cunning",
    },
    Survival: {
        characteristic: "Cunning",
    },
    Vigilance: {
        characteristic: "Willpower",
    },
};

const combatSkills = {
    Brawl: {
        characteristic: "Brawn",
    },
    Gunnery: {
        characteristic: "Agility",
    },
    Lightsaber: {
        characteristic: "Brawn",
    },
    Melee: {
        characteristic: "Brawn",
    },
    RangedLight: {
        characteristic: "Agility",
    },
    RangedHeavy: {
        characteristic: "Agility",
    },
};

const knowledgeSkills = {
    CoreWorlds: {
        characteristic: "Intellect",
    },
    Education: {
        characteristic: "Intellect",
    },
    Lore: {
        characteristic: "Intellect",
    },
    OuterRim: {
        characteristic: "Intellect",
    },
    Underworld: {
        characteristic: "Intellect",
    },
    Xenology: {
        characteristic: "Intellect",
    },
};

const initSkillsState = (skills) => {
    return Object.assign(
        {}, ...Object.keys(skills).map((elem) => ({
                [elem]:
                    {
                        name: elem,
                        characteristic: skills[elem].characteristic,
                        career: false,
                        rank: 0,
                        extraDice: ""
                    }
            }
        )));
};

const initGeneralSkillsState = initSkillsState(generalSkills);
const initCombatSkillsState = initSkillsState(combatSkills);
const initKnowledgeSkillsState = initSkillsState(knowledgeSkills);

const weaponStub = {
    make_model: "",
    weapon_type: "",
    modifiers: "",
    book_page: "",
    restricted: "No",
    features: "",
    range: "Engaged",
    skill: "Brawl",
    condition: "New",
    rarity: "",
    value: "",
    qualities: "",
    damage: 0,
    critical: 0,
    encumberance: 0,
    hp: 0,
    attachments: [
        {
            attachment_name: "",
            hard_points: 0,
            base_modifiers: "",
            modifications: "",
            book_page: "",
        }
    ]
};
const weapons = [weaponStub];

const talentStub = {
    name: "",
    rank: 0,
    passive_active: "passive",
    book_page: "",
    xp_cost: 0,
    summary: ""
};
const talents = [talentStub];

const vehicleStub = {
    starship: {
        defense: {
            silhouette: 0,
            armor: 0,
            speed: {
                max: 0,
                current: 0
            },
            hull_trauma: {
                threshold: 0,
                current: 0
            },
            handling: 0,
            system_strain: {
                threshold: 0,
                current: 0
            },
            fore: 0,
            port: 0,
            starboard: 0,
            aft: 0
        },
        name: "",
        hull_type: "",
        manufacturer: "",
        hyperdrive_primary_class: "",
        hyperdrive_backup_class: "",
        consumables: "",
        book_page: "",
        restricted: "no",
        hard_points: 0,
        sensor_range: "none",
        ship_complement: "",
        navicomputer: "",
        rarity: "",
        value: ""
    },
    planetary: {}
};

const initState = {
    character: initCharacter,
    characteristics: initCharacteristicsState,
    generalSkills: initGeneralSkillsState,
    combatSkills: initCombatSkillsState,
    knowledgeSkills: initKnowledgeSkillsState,
    soakWounds: initSoakWounds,
    weapons: weapons,
    talents: talents,
    vehicles: vehicleStub,
};

export default initState;