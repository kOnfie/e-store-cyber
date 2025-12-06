// Hook to get cart and wishlist counters for Header
// TODO: Connect to actual Zustand stores when they are implemented

export const useHeaderCounters = () => {
  // TODO: Replace with actual store selectors
  // const wishlistCount = useWishlistStore((state) => state.productIds.length);
  // const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  const wishlistCount = 0;
  const cartCount = 0;

  return {
    wishlistCount,
    cartCount,
  };
};
