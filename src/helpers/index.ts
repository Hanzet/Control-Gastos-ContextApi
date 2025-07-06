export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP',
    }).format(amount);
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
    }).format(date);
}