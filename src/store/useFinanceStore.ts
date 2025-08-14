import { create } from 'zustand';
import { db, Transaction } from '../db/index';

/**
 * Zustand store for managing transactions and interfacing with IndexedDB via
 * Dexie. The store exposes functions to load, add, update and delete
 * transactions. Whenever a change is made, the in‑memory state is kept in
 * sync with the database.
 */
interface FinanceState {
  transactions: Transaction[];
  loaded: boolean;
  loadTransactions: () => Promise<void>;
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTransaction: (tx: Transaction) => Promise<void>;
  removeTransaction: (id: number) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: [],
  loaded: false,
  // Load all transactions from IndexedDB and populate the state.
  async loadTransactions() {
    const rows = await db.transactions.toArray();
    set({ transactions: rows, loaded: true });
  },
  // Add a new transaction to IndexedDB and update the state. Generates
  // timestamps for creation and update.
  async addTransaction(tx) {
    const now = new Date().toISOString();
    const id = await db.transactions.add({
      ...tx,
      createdAt: now,
      updatedAt: now,
    });
    set((state) => ({
      transactions: [...state.transactions, { id, ...tx, createdAt: now, updatedAt: now }],
    }));
  },
  // Update an existing transaction identified by its id.
  async updateTransaction(tx) {
    if (typeof tx.id === 'undefined') return;
    const now = new Date().toISOString();
    await db.transactions.update(tx.id, { ...tx, updatedAt: now });
    set((state) => ({
      transactions: state.transactions.map((t) => (t.id === tx.id ? { ...tx, updatedAt: now } : t)),
    }));
  },
  // Remove a transaction from the database and state.
  async removeTransaction(id) {
    await db.transactions.delete(id);
    set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) }));
  },
}));