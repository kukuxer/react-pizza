export const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');

export const calculateTotalPrice = (items: any[]) => {
    return items.reduce((total, item) => total + item.price * item.count, 0);
};