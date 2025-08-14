import { Transaction } from '../db/index';
import { getMonth } from './dateHelpers';

/**
 * Calculate financial metrics based on a list of transactions. If a month
 * (yyyy-mm) is provided, only transactions in that month are considered.
 */
export function calcMetrics(transactions: Transaction[], month?: string) {
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach((tx) => {
    if (!month || getMonth(tx.date) === month) {
      if (tx.type === 'entrada') {
        totalIncome += tx.amount;
      } else {
        totalExpense += tx.amount;
      }
    }
  });
  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
}