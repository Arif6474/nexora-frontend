export const takaFormator = (amount) => {
    return "৳ " + new Intl.NumberFormat('bn-BD', {
        style: 'currency',
        currency: 'BDT',
    }).format(amount);
}   