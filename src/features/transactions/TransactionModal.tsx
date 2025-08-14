import React, { useState } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import CurrencyInput from '../../components/CurrencyInput';
import DatePicker from '../../components/DatePicker';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import { useFinanceStore } from '../../store/useFinanceStore';

interface TransactionModalProps {
  onClose: () => void;
  transactionToEdit?: number;
}

/**
 * Modal for creating or editing a transaction. Presents a form with
 * fields for date, type, amount, category and optional details. On
 * submission, it persists the new transaction via the store.
 */
const TransactionModal: React.FC<TransactionModalProps> = ({ onClose, transactionToEdit }) => {
  const { addTransaction, transactions, updateTransaction } = useFinanceStore();
  // If editing, load existing values
  const editing = transactionToEdit !== undefined;
  const existing = editing ? transactions.find((t) => t.id === transactionToEdit) : undefined;
  const [date, setDate] = useState(() => existing?.date ?? new Date().toISOString().slice(0, 10));
  const [type, setType] = useState<'entrada' | 'saida'>(() => existing?.type ?? 'entrada');
  const [amount, setAmount] = useState<number>(() => existing?.amount ?? 0);
  const [category, setCategory] = useState(() => existing?.category ?? 'Salário');
  const [subcategory, setSubcategory] = useState(() => existing?.subcategory ?? '');
  const [account, setAccount] = useState(() => existing?.account ?? '');
  const [description, setDescription] = useState(() => existing?.description ?? '');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing && existing) {
        await updateTransaction({
          ...existing,
          date,
          type,
          amount,
          category,
          subcategory: subcategory || undefined,
          account: account || undefined,
          description: description || undefined,
        });
        setToast({ message: 'Movimentação atualizada!', type: 'success' });
      } else {
        await addTransaction({
          date,
          type,
          amount,
          category,
          subcategory: subcategory || undefined,
          account: account || undefined,
          description: description || undefined,
        });
        setToast({ message: 'Movimentação adicionada!', type: 'success' });
      }
      // Close the modal after a short delay to allow the toast to display
      setTimeout(onClose, 1200);
    } catch (err) {
      setToast({ message: 'Erro ao salvar movimentação', type: 'error' });
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">
        {editing ? 'Editar Movimentação' : 'Nova Movimentação'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <DatePicker label="Data" value={date} onChange={(e) => setDate(e.target.value)} />
        <Select
          label="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value as 'entrada' | 'saida')}
          options={[
            { value: 'entrada', label: 'Entrada' },
            { value: 'saida', label: 'Saída' },
          ]}
        />
        <CurrencyInput
          label="Valor"
          value={amount}
          onValueChange={(cents) => setAmount(cents)}
        />
        <Input
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoria"
        />
        <Input
          label="Subcategoria (opcional)"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          placeholder="Subcategoria"
        />
        <Input
          label="Conta (opcional)"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Conta"
        />
        <Input
          label="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="warning" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {editing ? 'Salvar' : 'Adicionar'}
          </Button>
        </div>
      </form>
      {/* Display toast messages */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Modal>
  );
};

export default TransactionModal;