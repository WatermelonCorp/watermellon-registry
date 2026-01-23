export interface Deal {
  company: string;
  value: number;
  segment: string;
  tags: string[];
  owner: {
    name: string;
    avatar: string;
  };
  activityHistory: number[];
  winProbability: number;
  lastActivity: string;
}
