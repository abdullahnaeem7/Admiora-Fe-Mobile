// dateUtils.ts

export const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long', // You can change to 'short' or 'numeric' as needed
        day: '2-digit',
    }).format(new Date(date));
};
