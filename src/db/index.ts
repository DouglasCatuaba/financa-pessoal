import Dexie, { Table } from 'dexie';

/**
 * Interfaces describing the shape of data stored in IndexedDB via Dexie.
 * We store all monetary values as numbers representing centavos (integer)
 * to avoid floating point rounding errors. Dates are stored as strings in
 * ISO format (yyyy-mm-dd). Timestamps track creation and update times.
 */
export interface Transaction {
  id?: number;
  date: string; // yyyy-mm-dd
  type: 'entrada' | 'saida';
  amount: number; // value in centavos
  category: string;
  subcategory?: string;
  account?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Recurring {
  id?: number;
  title: string;
  type: 'entrada' | 'saida';
  amount: number;
  category: string;
  dayOfMonth: number;
  active: boolean;
  lastEmitted?: string; // yyyy-mm
}

export interface Budget {
  id?: number;
  category: string;
  amount: number;
  month: string; // yyyy-mm
}

export interface Rule {
  id?: number;
  name: string;
  conditions: { field: string; operator: string; value: string }[];
  action: { type: 'categorize'; category: string; subcategory?: string };
  order: number;
}

/**
 * FinanceDexie encapsulates the Dexie database configuration. It defines
 * four tables: transactions, recurrings, budgets and rules. Each table
 * declares its indices to support efficient queries. The primary keys are
 * auto‑incrementing numeric IDs (`++`).
 */
export class FinanceDexie extends Dexie {
  transactions!: Table<Transaction>;
  recurrings!: Table<Recurring>;
  budgets!: Table<Budget>;
  rules!: Table<Rule>;

  constructor() {
    super('FinanceDB');
    this.version(1).stores({
      transactions: '++id, date, type, category, amount',
      recurrings: '++id, dayOfMonth, category',
      budgets: '++id, month, category',
      rules: '++id, name',
    });
  }
}

export const db = new FinanceDexie();