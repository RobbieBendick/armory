export interface Character {
  name: string;
  id: number;
  realm: Realm;
}

export interface Realm {
  key: {
    href: string;
  };
  id: number;
  slug: string;
}

export interface Faction {
  type: 'ALLIANCE' | 'HORDE';
}

export interface SeasonMatchStatistics {
  played: number;
  won: number;
  lost: number;
}

export interface Tier {
  key: {
    href: string;
  };
  id: number;
}

export interface Player {
  character: Character;
  faction: Faction;
  rank: number;
  rating: number;
  season_match_statistics: SeasonMatchStatistics;
  tier: Tier;
}
