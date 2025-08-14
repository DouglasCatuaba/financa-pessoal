import React, { useEffect } from 'react';
import Card from '../../components/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { calcMetrics } from '../../utils/calcMetrics';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * Dashboard screen showing monthly KPIs such as balance, income and expenses.
 * It loads transactions on mount and recomputes metrics when the store
 * changes. Only the current month is considered for the KPIs.
 */
const Dashboard: React.FC = () => {
  const { transactions, loaded, loadTransactions } = useFinanceStore();
  useEffect(() => {
    if (!loaded) {
      loadTransactions();
    }
  }, [loaded, loadTransactions]);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { totalIncome, totalExpense, balance } = calcMetrics(transactions, currentMonth);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <h2 className="text-sm text-gray-500 dark:text-gray-400">Saldo do Mês</h2>
        <p className="text-2xl font-semibold mt-2">{formatCurrency(balance)}</p>
      </Card>
      <Card>
        <h2 className="text-sm text-gray-500 dark:text-gray-400">Entradas</h2>
        <p className="text-2xl font-semibold mt-2">{formatCurrency(totalIncome)}</p>
      </Card>
      <Card>
        <h2 className="text-sm text-gray-500 dark:text-gray-400">Saídas</h2>
        <p className="text-2xl font-semibold mt-2">{formatCurrency(totalExpense)}</p>
      </Card>
    </div>
  );
};

export default Dashboard;