import { Injectable } from '@angular/core';
import { Scholarship, FilterState, SortOption } from '../models/scholarship.model';

const STORAGE_KEY = 'gradpilots_scholarships';
const SEEDED_KEY = 'gradpilots_seeded';

const DUMMY_SCHOLARSHIPS: Scholarship[] = [
  {
    id: '1',
    name: 'Global Scholars Program',
    country: 'USA',
    countryFlag: '🇺🇸',
    amount: 50000,
    isFullFunding: false,
    deadline: 'July',
    stream: 'Business',
    level: 'PG',
    description: 'Prestigious scholarship for outstanding graduate students pursuing business studies in the USA.',
    relevanceScore: 95
  },
  {
    id: '2',
    name: 'UK Excellence Award',
    country: 'UK',
    countryFlag: '🇬🇧',
    amount: null,
    isFullFunding: true,
    deadline: 'August',
    stream: 'Law',
    level: 'PG',
    description: 'Full funding for exceptional students pursuing postgraduate law studies at top UK universities.',
    relevanceScore: 90
  },
  {
    id: '3',
    name: 'Canadian Merit Scholarship',
    country: 'Canada',
    countryFlag: '🇨🇦',
    amount: 30000,
    isFullFunding: false,
    deadline: 'June',
    stream: 'STEM',
    level: 'UG',
    description: 'Supporting talented undergraduate students in STEM fields across Canadian universities.',
    relevanceScore: 88
  },
  {
    id: '4',
    name: 'Germany Research Grant',
    country: 'Germany',
    countryFlag: '🇩🇪',
    amount: 40000,
    isFullFunding: false,
    deadline: 'May',
    stream: 'STEM',
    level: 'PhD',
    description: 'Funding for doctoral researchers in cutting-edge STEM disciplines at German institutions.',
    relevanceScore: 92
  },
  {
    id: '5',
    name: 'France Academic Award',
    country: 'France',
    countryFlag: '🇫🇷',
    amount: 20000,
    isFullFunding: false,
    deadline: 'September',
    stream: 'IR',
    level: 'PG',
    description: 'Award for students pursuing international relations and political science in France.',
    relevanceScore: 82
  },
  {
    id: '6',
    name: 'STEM Innovators Grant',
    country: 'USA',
    countryFlag: '🇺🇸',
    amount: null,
    isFullFunding: true,
    deadline: 'April',
    stream: 'STEM',
    level: 'PhD',
    description: 'Full funding for innovative PhD researchers driving breakthroughs in STEM fields.',
    relevanceScore: 97
  },
  {
    id: '7',
    name: 'Oxford Future Leaders',
    country: 'UK',
    countryFlag: '🇬🇧',
    amount: null,
    isFullFunding: true,
    deadline: 'June',
    stream: 'Business',
    level: 'PG',
    description: 'Prestigious full scholarship for next-generation business leaders at the University of Oxford.',
    relevanceScore: 96
  },
  {
    id: '8',
    name: 'Maple Leaf Excellence',
    country: 'Canada',
    countryFlag: '🇨🇦',
    amount: 25000,
    isFullFunding: false,
    deadline: 'July',
    stream: 'Law',
    level: 'PG',
    description: 'Merit-based scholarship for international law students at Canadian universities.',
    relevanceScore: 80
  },
  {
    id: '9',
    name: 'Humboldt Research Fellowship',
    country: 'Germany',
    countryFlag: '🇩🇪',
    amount: null,
    isFullFunding: true,
    deadline: 'August',
    stream: 'STEM',
    level: 'PhD',
    description: 'Full research fellowship for outstanding postdoctoral researchers in Germany.',
    relevanceScore: 93
  },
  {
    id: '10',
    name: 'Eiffel Excellence Scholarship',
    country: 'France',
    countryFlag: '🇫🇷',
    amount: 35000,
    isFullFunding: false,
    deadline: 'May',
    stream: 'Business',
    level: 'PG',
    description: 'French government scholarship supporting international masters students in business and engineering.',
    relevanceScore: 87
  },
  {
    id: '11',
    name: 'Fulbright Scholar Award',
    country: 'USA',
    countryFlag: '🇺🇸',
    amount: null,
    isFullFunding: true,
    deadline: 'September',
    stream: 'IR',
    level: 'PG',
    description: 'Prestigious US government scholarship for international exchange and mutual understanding.',
    relevanceScore: 99
  },
  {
    id: '12',
    name: 'Chevening Scholarship',
    country: 'UK',
    countryFlag: '🇬🇧',
    amount: null,
    isFullFunding: true,
    deadline: 'April',
    stream: 'IR',
    level: 'PG',
    description: 'UK government flagship scholarship developing global leaders and change-makers worldwide.',
    relevanceScore: 98
  },
  {
    id: '13',
    name: 'Vanier Canada Graduate',
    country: 'Canada',
    countryFlag: '🇨🇦',
    amount: null,
    isFullFunding: true,
    deadline: 'June',
    stream: 'STEM',
    level: 'PhD',
    description: 'Canada\'s most prestigious doctoral scholarship for world-class PhD students.',
    relevanceScore: 95
  },
  {
    id: '14',
    name: 'DAAD Scholarship',
    country: 'Germany',
    countryFlag: '🇩🇪',
    amount: 20000,
    isFullFunding: false,
    deadline: 'July',
    stream: 'IR',
    level: 'PG',
    description: 'German Academic Exchange Service scholarship for international graduate studies.',
    relevanceScore: 85
  },
  {
    id: '15',
    name: 'Campus France Excellence',
    country: 'France',
    countryFlag: '🇫🇷',
    amount: null,
    isFullFunding: true,
    deadline: 'August',
    stream: 'STEM',
    level: 'PhD',
    description: 'Excellence award for outstanding PhD candidates in French research institutions.',
    relevanceScore: 89
  },
  {
    id: '16',
    name: 'Gates Cambridge Scholarship',
    country: 'UK',
    countryFlag: '🇬🇧',
    amount: null,
    isFullFunding: true,
    deadline: 'September',
    stream: 'STEM',
    level: 'PhD',
    description: 'Full scholarship for outstanding applicants from outside the UK to study at Cambridge University.',
    relevanceScore: 100
  },
  {
    id: '17',
    name: 'NSF Graduate Fellowship',
    country: 'USA',
    countryFlag: '🇺🇸',
    amount: 37000,
    isFullFunding: false,
    deadline: 'May',
    stream: 'STEM',
    level: 'PG',
    description: 'National Science Foundation fellowship supporting graduate research in STEM disciplines.',
    relevanceScore: 91
  },
  {
    id: '18',
    name: 'Lester B. Pearson Award',
    country: 'Canada',
    countryFlag: '🇨🇦',
    amount: null,
    isFullFunding: true,
    deadline: 'April',
    stream: 'Business',
    level: 'UG',
    description: 'Full scholarship recognizing exceptional international students who demonstrate leadership.',
    relevanceScore: 86
  },
  {
    id: '19',
    name: 'Heinrich Böll Foundation',
    country: 'Germany',
    countryFlag: '🇩🇪',
    amount: 15000,
    isFullFunding: false,
    deadline: 'June',
    stream: 'Law',
    level: 'UG',
    description: 'Foundation scholarship for undergraduate students with social and political engagement.',
    relevanceScore: 78
  },
  {
    id: '20',
    name: 'French Government Bursary',
    country: 'France',
    countryFlag: '🇫🇷',
    amount: 18000,
    isFullFunding: false,
    deadline: 'July',
    stream: 'Law',
    level: 'UG',
    description: 'French government bursary for international undergraduate students studying law and social sciences.',
    relevanceScore: 75
  },
  {
    id: '21',
    name: 'American Association Award',
    country: 'USA',
    countryFlag: '🇺🇸',
    amount: 45000,
    isFullFunding: false,
    deadline: 'August',
    stream: 'Business',
    level: 'UG',
    description: 'Merit scholarship for undergraduate business students demonstrating academic excellence.',
    relevanceScore: 83
  },
  {
    id: '22',
    name: 'Commonwealth Shared Scholarship',
    country: 'UK',
    countryFlag: '🇬🇧',
    amount: null,
    isFullFunding: true,
    deadline: 'June',
    stream: 'Law',
    level: 'PG',
    description: 'Fully funded scholarship for students from Commonwealth countries to study in the UK.',
    relevanceScore: 94
  }
];

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {

  constructor() {
    this.seedDataIfNeeded();
  }

  private seedDataIfNeeded(): void {
    if (!localStorage.getItem(SEEDED_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_SCHOLARSHIPS));
      localStorage.setItem(SEEDED_KEY, 'true');
    }
  }

  getAllScholarships(): Scholarship[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getFilteredAndSorted(filters: FilterState, sortBy: SortOption): Scholarship[] {
    let scholarships = this.getAllScholarships();

    // Apply filters
    scholarships = scholarships.filter(s => {
      const countryMatch = filters.countries.length === 0 || filters.countries.includes(s.country);
      const streamMatch = filters.streams.length === 0 || filters.streams.includes(s.stream);
      const levelMatch = filters.levels.length === 0 || filters.levels.includes(s.level);
      const deadlineMatch = !filters.deadline || s.deadline === filters.deadline;
      return countryMatch && streamMatch && levelMatch && deadlineMatch;
    });

    // Apply sorting
    switch (sortBy) {
      case 'amount':
        scholarships.sort((a, b) => {
          const aAmt = a.isFullFunding ? Number.MAX_SAFE_INTEGER : (a.amount ?? 0);
          const bAmt = b.isFullFunding ? Number.MAX_SAFE_INTEGER : (b.amount ?? 0);
          return bAmt - aAmt;
        });
        break;
      case 'deadline':
        const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];
        scholarships.sort((a, b) => monthOrder.indexOf(a.deadline) - monthOrder.indexOf(b.deadline));
        break;
      case 'relevance':
      default:
        scholarships.sort((a, b) => b.relevanceScore - a.relevanceScore);
        break;
    }

    return scholarships;
  }

  getStats(scholarships: Scholarship[]): { total: number; fullFunding: number; deadlinesThisQuarter: number } {
    const currentMonth = new Date().getMonth(); // 0-indexed
    const quarterMonths: string[][] = [
      ['January', 'February', 'March'],
      ['April', 'May', 'June'],
      ['July', 'August', 'September'],
      ['October', 'November', 'December']
    ];
    const currentQuarter = Math.floor(currentMonth / 3);
    const thisQuarterMonths = quarterMonths[currentQuarter];

    return {
      total: scholarships.length,
      fullFunding: scholarships.filter(s => s.isFullFunding).length,
      deadlinesThisQuarter: scholarships.filter(s => thisQuarterMonths.includes(s.deadline)).length
    };
  }
}
