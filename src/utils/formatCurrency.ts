/**
 * Format a value in centavos (integer) into a BRL currency string.
 * Examples: 12345 -> "R$ 123,45".
 */
export function formatCurrency(cents: number): string {
  const value = cents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}