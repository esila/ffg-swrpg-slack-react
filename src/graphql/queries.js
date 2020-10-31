/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCharacterSheet = /* GraphQL */ `
  query GetCharacterSheet($id: ID!) {
    getCharacterSheet(id: $id) {
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
export const listCharacterSheets = /* GraphQL */ `
  query ListCharacterSheets(
    $filter: ModelCharacterSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCharacterSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFabricObject = /* GraphQL */ `
  query GetFabricObject($id: ID!) {
    getFabricObject(id: $id) {
      id
      fabricId
      data
      createdAt
      updatedAt
    }
  }
`;
export const listFabricObjects = /* GraphQL */ `
  query ListFabricObjects(
    $filter: ModelFabricObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFabricObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fabricId
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDestinyPool = /* GraphQL */ `
  query GetDestinyPool($id: ID!) {
    getDestinyPool(id: $id) {
      id
      light
      dark
      createdAt
      updatedAt
    }
  }
`;
export const listDestinyPools = /* GraphQL */ `
  query ListDestinyPools(
    $filter: ModelDestinyPoolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDestinyPools(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        light
        dark
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMusicPlayer = /* GraphQL */ `
  query GetMusicPlayer($id: ID!) {
    getMusicPlayer(id: $id) {
      id
      track
      play
      createdAt
      updatedAt
    }
  }
`;
export const listMusicPlayers = /* GraphQL */ `
  query ListMusicPlayers(
    $filter: ModelMusicPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMusicPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        track
        play
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCharacterStatus = /* GraphQL */ `
  query GetCharacterStatus($id: ID!) {
    getCharacterStatus(id: $id) {
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
export const listCharacterStatuss = /* GraphQL */ `
  query ListCharacterStatuss(
    $filter: ModelCharacterStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCharacterStatuss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
