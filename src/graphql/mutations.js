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
