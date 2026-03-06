export interface Scholarship {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  amount: number | null;
  isFullFunding: boolean;
  deadline: string;
  stream: string;
  level: string;
  description: string;
  relevanceScore: number;
}

export interface FilterState {
  countries: string[];
  streams: string[];
  levels: string[];
  deadline: string | null;
}

export type ViewMode = 'cards' | 'table' | 'map';
export type SortOption = 'relevance' | 'amount' | 'deadline';

export const DEFAULT_FILTER: FilterState = {
  countries: ['USA', 'UK', 'Canada', 'Germany', 'France'],
  streams: ['Business', 'Law', 'IR', 'STEM'],
  levels: ['UG', 'PG', 'PhD'],
  deadline: null
};
