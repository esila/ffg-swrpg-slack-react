/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCharacterSheet = /* GraphQL */ `
  mutation CreateCharacterSheet(
    $input: CreateCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    createCharacterSheet(input: $input, condition: $condition) {
      id
      user
      weapons {
        make_model
        weapon_type
        modifiers
        book_page
        restricted
        features
        range
        skill
        condition
        rarity
        value
        qualities
        damage
        critical
        encumberance
        hp
        attachments {
          attachment_name
          hard_points
          base_modifiers
          modifications
          book_page
        }
      }
      talents {
        name
        rank
        passive_active
        book_page
        xp_cost
        summary
      }
      vehicles {
        starship {
          name
          hull_type
          manufacturer
          hyperdrive_primary_class
          hyperdrive_backup_class
          consumables
          book_page
          restricted
          hard_points
          sensor_range
          ship_complement
          navicomputer
          rarity
          value
          critical_injuries {
            percent
            severity
            name
            result
          }
          starship_attachments {
            name
            hard_points
            base_modifiers
            modifications
            book_page
            rarity
            restricted
            value
          }
          starship_roles {
            character_name
            role
            skill
          }
          starship_weapons {
            character_name
            weapon_name
            arc_fore
            arc_starboard
            arc_aft
            arc_port
            critical
            damage
            range
            dice
            special
            skill
            book_page
            rarity
            restricted
            value
          }
          starship_defense {
            silhouette
            armor
            handling
            fore
            port
            starboard
            aft
            system_strain {
              threshold
              current
            }
            hull_trauma {
              threshold
              current
            }
            speed {
              max
              current
            }
          }
        }
      }
      critical_injuries {
        percent
        severity
        name
        result
      }
      soakWounds {
        soak
        force_rating {
          threshold
          committed
        }
        encumberance {
          threshold
          current
        }
        defense {
          range
          melee
        }
        strain {
          threshold
          current
        }
        wounds {
          threshold
          current
        }
      }
      knowledgeSkills {
        Xenology {
          name
          characteristic
          career
          rank
          extraDice
        }
        Underworld {
          name
          characteristic
          career
          rank
          extraDice
        }
        OuterRim {
          name
          characteristic
          career
          rank
          extraDice
        }
        Lore {
          name
          characteristic
          career
          rank
          extraDice
        }
        Education {
          name
          characteristic
          career
          rank
          extraDice
        }
        CoreWorlds {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      combatSkills {
        RangedHeavy {
          name
          characteristic
          career
          rank
          extraDice
        }
        RangedLight {
          name
          characteristic
          career
          rank
          extraDice
        }
        Melee {
          name
          characteristic
          career
          rank
          extraDice
        }
        Lightsaber {
          name
          characteristic
          career
          rank
          extraDice
        }
        Gunnery {
          name
          characteristic
          career
          rank
          extraDice
        }
        Brawl {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      generalSkills {
        Vigilance {
          name
          characteristic
          career
          rank
          extraDice
        }
        Survival {
          name
          characteristic
          career
          rank
          extraDice
        }
        Streetwise {
          name
          characteristic
          career
          rank
          extraDice
        }
        Stealth {
          name
          characteristic
          career
          rank
          extraDice
        }
        Skulduggery {
          name
          characteristic
          career
          rank
          extraDice
        }
        Resilience {
          name
          characteristic
          career
          rank
          extraDice
        }
        PilotingSpace {
          name
          characteristic
          career
          rank
          extraDice
        }
        PilotingPlanetary {
          name
          characteristic
          career
          rank
          extraDice
        }
        Perception {
          name
          characteristic
          career
          rank
          extraDice
        }
        Negotiation {
          name
          characteristic
          career
          rank
          extraDice
        }
        Medicine {
          name
          characteristic
          career
          rank
          extraDice
        }
        Mechanics {
          name
          characteristic
          career
          rank
          extraDice
        }
        Leadership {
          name
          characteristic
          career
          rank
          extraDice
        }
        Discipline {
          name
          characteristic
          career
          rank
          extraDice
        }
        Deception {
          name
          characteristic
          career
          rank
          extraDice
        }
        Coordination {
          name
          characteristic
          career
          rank
          extraDice
        }
        Cool {
          name
          characteristic
          career
          rank
          extraDice
        }
        Computers {
          name
          characteristic
          career
          rank
          extraDice
        }
        Coercion {
          name
          characteristic
          career
          rank
          extraDice
        }
        Charm {
          name
          characteristic
          career
          rank
          extraDice
        }
        Athletics {
          name
          characteristic
          career
          rank
          extraDice
        }
        Astrogation {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      characteristics {
        Brawn
        Agility
        Intellect
        Cunning
        Willpower
        Presence
      }
      character {
        name
        player_name
        species
        credits
        total_xp
        available_xp
        image_url
        career
        gender
        age
        height
        build
        hair
        eyes
        notable_features
        other
        motivations_1_category
        motivations_1_type
        motivations_1_description
        motivations_2_category
        motivations_2_type
        motivations_2_description
        obligations_1_type
        obligations_1_magnitude
        obligations_1_details
        obligations_2_type
        obligations_2_magnitude
        obligations_2_details
        specializations {
          name
          in_career
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCharacterSheet = /* GraphQL */ `
  mutation UpdateCharacterSheet(
    $input: UpdateCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    updateCharacterSheet(input: $input, condition: $condition) {
      id
      user
      weapons {
        make_model
        weapon_type
        modifiers
        book_page
        restricted
        features
        range
        skill
        condition
        rarity
        value
        qualities
        damage
        critical
        encumberance
        hp
        attachments {
          attachment_name
          hard_points
          base_modifiers
          modifications
          book_page
        }
      }
      talents {
        name
        rank
        passive_active
        book_page
        xp_cost
        summary
      }
      vehicles {
        starship {
          name
          hull_type
          manufacturer
          hyperdrive_primary_class
          hyperdrive_backup_class
          consumables
          book_page
          restricted
          hard_points
          sensor_range
          ship_complement
          navicomputer
          rarity
          value
          critical_injuries {
            percent
            severity
            name
            result
          }
          starship_attachments {
            name
            hard_points
            base_modifiers
            modifications
            book_page
            rarity
            restricted
            value
          }
          starship_roles {
            character_name
            role
            skill
          }
          starship_weapons {
            character_name
            weapon_name
            arc_fore
            arc_starboard
            arc_aft
            arc_port
            critical
            damage
            range
            dice
            special
            skill
            book_page
            rarity
            restricted
            value
          }
          starship_defense {
            silhouette
            armor
            handling
            fore
            port
            starboard
            aft
            system_strain {
              threshold
              current
            }
            hull_trauma {
              threshold
              current
            }
            speed {
              max
              current
            }
          }
        }
      }
      critical_injuries {
        percent
        severity
        name
        result
      }
      soakWounds {
        soak
        force_rating {
          threshold
          committed
        }
        encumberance {
          threshold
          current
        }
        defense {
          range
          melee
        }
        strain {
          threshold
          current
        }
        wounds {
          threshold
          current
        }
      }
      knowledgeSkills {
        Xenology {
          name
          characteristic
          career
          rank
          extraDice
        }
        Underworld {
          name
          characteristic
          career
          rank
          extraDice
        }
        OuterRim {
          name
          characteristic
          career
          rank
          extraDice
        }
        Lore {
          name
          characteristic
          career
          rank
          extraDice
        }
        Education {
          name
          characteristic
          career
          rank
          extraDice
        }
        CoreWorlds {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      combatSkills {
        RangedHeavy {
          name
          characteristic
          career
          rank
          extraDice
        }
        RangedLight {
          name
          characteristic
          career
          rank
          extraDice
        }
        Melee {
          name
          characteristic
          career
          rank
          extraDice
        }
        Lightsaber {
          name
          characteristic
          career
          rank
          extraDice
        }
        Gunnery {
          name
          characteristic
          career
          rank
          extraDice
        }
        Brawl {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      generalSkills {
        Vigilance {
          name
          characteristic
          career
          rank
          extraDice
        }
        Survival {
          name
          characteristic
          career
          rank
          extraDice
        }
        Streetwise {
          name
          characteristic
          career
          rank
          extraDice
        }
        Stealth {
          name
          characteristic
          career
          rank
          extraDice
        }
        Skulduggery {
          name
          characteristic
          career
          rank
          extraDice
        }
        Resilience {
          name
          characteristic
          career
          rank
          extraDice
        }
        PilotingSpace {
          name
          characteristic
          career
          rank
          extraDice
        }
        PilotingPlanetary {
          name
          characteristic
          career
          rank
          extraDice
        }
        Perception {
          name
          characteristic
          career
          rank
          extraDice
        }
        Negotiation {
          name
          characteristic
          career
          rank
          extraDice
        }
        Medicine {
          name
          characteristic
          career
          rank
          extraDice
        }
        Mechanics {
          name
          characteristic
          career
          rank
          extraDice
        }
        Leadership {
          name
          characteristic
          career
          rank
          extraDice
        }
        Discipline {
          name
          characteristic
          career
          rank
          extraDice
        }
        Deception {
          name
          characteristic
          career
          rank
          extraDice
        }
        Coordination {
          name
          characteristic
          career
          rank
          extraDice
        }
        Cool {
          name
          characteristic
          career
          rank
          extraDice
        }
        Computers {
          name
          characteristic
          career
          rank
          extraDice
        }
        Coercion {
          name
          characteristic
          career
          rank
          extraDice
        }
        Charm {
          name
          characteristic
          career
          rank
          extraDice
        }
        Athletics {
          name
          characteristic
          career
          rank
          extraDice
        }
        Astrogation {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      characteristics {
        Brawn
        Agility
        Intellect
        Cunning
        Willpower
        Presence
      }
      character {
        name
        player_name
        species
        credits
        total_xp
        available_xp
        image_url
        career
        gender
        age
        height
        build
        hair
        eyes
        notable_features
        other
        motivations_1_category
        motivations_1_type
        motivations_1_description
        motivations_2_category
        motivations_2_type
        motivations_2_description
        obligations_1_type
        obligations_1_magnitude
        obligations_1_details
        obligations_2_type
        obligations_2_magnitude
        obligations_2_details
        specializations {
          name
          in_career
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCharacterSheet = /* GraphQL */ `
  mutation DeleteCharacterSheet(
    $input: DeleteCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    deleteCharacterSheet(input: $input, condition: $condition) {
      id
      user
      weapons {
        make_model
        weapon_type
        modifiers
        book_page
        restricted
        features
        range
        skill
        condition
        rarity
        value
        qualities
        damage
        critical
        encumberance
        hp
        attachments {
          attachment_name
          hard_points
          base_modifiers
          modifications
          book_page
        }
      }
      talents {
        name
        rank
        passive_active
        book_page
        xp_cost
        summary
      }
      vehicles {
        starship {
          name
          hull_type
          manufacturer
          hyperdrive_primary_class
          hyperdrive_backup_class
          consumables
          book_page
          restricted
          hard_points
          sensor_range
          ship_complement
          navicomputer
          rarity
          value
          critical_injuries {
            percent
            severity
            name
            result
          }
          starship_attachments {
            name
            hard_points
            base_modifiers
            modifications
            book_page
            rarity
            restricted
            value
          }
          starship_roles {
            character_name
            role
            skill
          }
          starship_weapons {
            character_name
            weapon_name
            arc_fore
            arc_starboard
            arc_aft
            arc_port
            critical
            damage
            range
            dice
            special
            skill
            book_page
            rarity
            restricted
            value
          }
          starship_defense {
            silhouette
            armor
            handling
            fore
            port
            starboard
            aft
            system_strain {
              threshold
              current
            }
            hull_trauma {
              threshold
              current
            }
            speed {
              max
              current
            }
          }
        }
      }
      critical_injuries {
        percent
        severity
        name
        result
      }
      soakWounds {
        soak
        force_rating {
          threshold
          committed
        }
        encumberance {
          threshold
          current
        }
        defense {
          range
          melee
        }
        strain {
          threshold
          current
        }
        wounds {
          threshold
          current
        }
      }
      knowledgeSkills {
        Xenology {
          name
          characteristic
          career
          rank
          extraDice
        }
        Underworld {
          name
          characteristic
          career
          rank
          extraDice
        }
        OuterRim {
          name
          characteristic
          career
          rank
          extraDice
        }
        Lore {
          name
          characteristic
          career
          rank
          extraDice
        }
        Education {
          name
          characteristic
          career
          rank
          extraDice
        }
        CoreWorlds {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      combatSkills {
        RangedHeavy {
          name
          characteristic
          career
          rank
          extraDice
        }
        RangedLight {
          name
          characteristic
          career
          rank
          extraDice
        }
        Melee {
          name
          characteristic
          career
          rank
          extraDice
        }
        Lightsaber {
          name
          characteristic
          career
          rank
          extraDice
        }
        Gunnery {
          name
          characteristic
          career
          rank
          extraDice
        }
        Brawl {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      generalSkills {
        Vigilance {
          name
          characteristic
          career
          rank
          extraDice
        }
        Survival {
          name
          characteristic
          career
          rank
          extraDice
        }
        Streetwise {
          name
          characteristic
          career
          rank
          extraDice
        }
        Stealth {
          name
          characteristic
          career
          rank
          extraDice
        }
        Skulduggery {
          name
          characteristic
          career
          rank
          extraDice
        }
        Resilience {
          name
          characteristic
          career
          rank
          extraDice
        }
        PilotingSpace {
          name
          characteristic
          career
          rank
          extraDice
        }
        PilotingPlanetary {
          name
          characteristic
          career
          rank
          extraDice
        }
        Perception {
          name
          characteristic
          career
          rank
          extraDice
        }
        Negotiation {
          name
          characteristic
          career
          rank
          extraDice
        }
        Medicine {
          name
          characteristic
          career
          rank
          extraDice
        }
        Mechanics {
          name
          characteristic
          career
          rank
          extraDice
        }
        Leadership {
          name
          characteristic
          career
          rank
          extraDice
        }
        Discipline {
          name
          characteristic
          career
          rank
          extraDice
        }
        Deception {
          name
          characteristic
          career
          rank
          extraDice
        }
        Coordination {
          name
          characteristic
          career
          rank
          extraDice
        }
        Cool {
          name
          characteristic
          career
          rank
          extraDice
        }
        Computers {
          name
          characteristic
          career
          rank
          extraDice
        }
        Coercion {
          name
          characteristic
          career
          rank
          extraDice
        }
        Charm {
          name
          characteristic
          career
          rank
          extraDice
        }
        Athletics {
          name
          characteristic
          career
          rank
          extraDice
        }
        Astrogation {
          name
          characteristic
          career
          rank
          extraDice
        }
      }
      characteristics {
        Brawn
        Agility
        Intellect
        Cunning
        Willpower
        Presence
      }
      character {
        name
        player_name
        species
        credits
        total_xp
        available_xp
        image_url
        career
        gender
        age
        height
        build
        hair
        eyes
        notable_features
        other
        motivations_1_category
        motivations_1_type
        motivations_1_description
        motivations_2_category
        motivations_2_type
        motivations_2_description
        obligations_1_type
        obligations_1_magnitude
        obligations_1_details
        obligations_2_type
        obligations_2_magnitude
        obligations_2_details
        specializations {
          name
          in_career
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFabricObject = /* GraphQL */ `
  mutation CreateFabricObject(
    $input: CreateFabricObjectInput!
    $condition: ModelFabricObjectConditionInput
  ) {
    createFabricObject(input: $input, condition: $condition) {
      id
      fabricId
      data
      createdAt
      updatedAt
    }
  }
`;
export const updateFabricObject = /* GraphQL */ `
  mutation UpdateFabricObject(
    $input: UpdateFabricObjectInput!
    $condition: ModelFabricObjectConditionInput
  ) {
    updateFabricObject(input: $input, condition: $condition) {
      id
      fabricId
      data
      createdAt
      updatedAt
    }
  }
`;
export const deleteFabricObject = /* GraphQL */ `
  mutation DeleteFabricObject(
    $input: DeleteFabricObjectInput!
    $condition: ModelFabricObjectConditionInput
  ) {
    deleteFabricObject(input: $input, condition: $condition) {
      id
      fabricId
      data
      createdAt
      updatedAt
    }
  }
`;
export const createDestinyPool = /* GraphQL */ `
  mutation CreateDestinyPool(
    $input: CreateDestinyPoolInput!
    $condition: ModelDestinyPoolConditionInput
  ) {
    createDestinyPool(input: $input, condition: $condition) {
      id
      light
      dark
      createdAt
      updatedAt
    }
  }
`;
export const updateDestinyPool = /* GraphQL */ `
  mutation UpdateDestinyPool(
    $input: UpdateDestinyPoolInput!
    $condition: ModelDestinyPoolConditionInput
  ) {
    updateDestinyPool(input: $input, condition: $condition) {
      id
      light
      dark
      createdAt
      updatedAt
    }
  }
`;
export const deleteDestinyPool = /* GraphQL */ `
  mutation DeleteDestinyPool(
    $input: DeleteDestinyPoolInput!
    $condition: ModelDestinyPoolConditionInput
  ) {
    deleteDestinyPool(input: $input, condition: $condition) {
      id
      light
      dark
      createdAt
      updatedAt
    }
  }
`;
