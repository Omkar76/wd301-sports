export interface Sport {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  plays: string;
}

export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  sport: Sport;
  date: string;
  summary: string;
  teams: Team[];
}

export interface ArticleDetail extends Article {
  content?: string;
}

export interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: Team[];
}

export interface Score {
  [teamName: string]: string;
}

export interface MatchDetails extends Match {
  startsAt?: string;
  score?: { [teamName: string]: string };
  playingTeam?: number;
  story?: string;
}

export interface Preferences {
  hasPreferences: boolean;
  favorateSports: Sport[];
  favorateTeams: Team[];
}
