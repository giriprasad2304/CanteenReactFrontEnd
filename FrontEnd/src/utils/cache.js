export const appCache = {
    menu: null,
    orders: null,
    profile: null,
    
    // Clear user-specific cache (e.g. on logout or when placing a new order)
    clearUserCache() {
        this.orders = null;
        this.profile = null;
    }
};
