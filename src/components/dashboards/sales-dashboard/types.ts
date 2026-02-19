export type DealStage = 
  | "Qualification"
  | "Discovery"
  | "Proposal"
  | "Negotiation"
  | "Closed Won";

export interface Deal {
  id: string;
  company: string;
  value: number;
  owner: {
    name: string;
    avatar: string;
  };
  stage: DealStage;
  tags: string[];
  winProbability: number;
  lastActivity: string;
  segment: string;
  activityHistory: number[];
}
