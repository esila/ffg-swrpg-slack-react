/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCharacterSheet = /* GraphQL */ `
  subscription OnCreateCharacterSheet {
    onCreateCharacterSheet {
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
export const onUpdateCharacterSheet = /* GraphQL */ `
  subscription OnUpdateCharacterSheet {
    onUpdateCharacterSheet {
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
export const onDeleteCharacterSheet = /* GraphQL */ `
  subscription OnDeleteCharacterSheet {
    onDeleteCharacterSheet {
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
export const onCreateFabricObject = /* GraphQL */ `
  subscription OnCreateFabricObject {
    onCreateFabricObject {
      id
      fabricId
      data
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFabricObject = /* GraphQL */ `
  subscription OnUpdateFabricObject {
    onUpdateFabricObject {
      id
      fabricId
      data
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFabricObject = /* GraphQL */ `
  subscription OnDeleteFabricObject {
    onDeleteFabricObject {
      id
      fabricId
      data
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCanvasObject = /* GraphQL */ `
  subscription OnCreateCanvasObject {
    onCreateCanvasObject {
      id
      data
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCanvasObject = /* GraphQL */ `
  subscription OnUpdateCanvasObject {
    onUpdateCanvasObject {
      id
      data
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCanvasObject = /* GraphQL */ `
  subscription OnDeleteCanvasObject {
    onDeleteCanvasObject {
      id
      data
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDestinyPool = /* GraphQL */ `
  subscription OnCreateDestinyPool {
    onCreateDestinyPool {
      id
      light
      dark
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDestinyPool = /* GraphQL */ `
  subscription OnUpdateDestinyPool {
    onUpdateDestinyPool {
      id
      light
      dark
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDestinyPool = /* GraphQL */ `
  subscription OnDeleteDestinyPool {
    onDeleteDestinyPool {
      id
      light
      dark
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMusicPlayer = /* GraphQL */ `
  subscription OnCreateMusicPlayer {
    onCreateMusicPlayer {
      id
      track
      play
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMusicPlayer = /* GraphQL */ `
  subscription OnUpdateMusicPlayer {
    onUpdateMusicPlayer {
      id
      track
      play
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMusicPlayer = /* GraphQL */ `
  subscription OnDeleteMusicPlayer {
    onDeleteMusicPlayer {
      id
      track
      play
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCharacterStatus = /* GraphQL */ `
  subscription OnCreateCharacterStatus {
    onCreateCharacterStatus {
      id
      name
      player_name
      wounds
      strain
      critical_injuries {
        percent
        severity
        name
        result
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCharacterStatus = /* GraphQL */ `
  subscription OnUpdateCharacterStatus {
    onUpdateCharacterStatus {
      id
      name
      player_name
      wounds
      strain
      critical_injuries {
        percent
        severity
        name
        result
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCharacterStatus = /* GraphQL */ `
  subscription OnDeleteCharacterStatus {
    onDeleteCharacterStatus {
      id
      name
      player_name
      wounds
      strain
      critical_injuries {
        percent
        severity
        name
        result
      }
      createdAt
      updatedAt
    }
  }
`;
