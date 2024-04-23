export const cartReducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "removeFromCart":
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload.id),
      }
    case "increaseQty":
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload.id ? { ...product, qty: product.qty + 1 } : product
        ),
      };
    case "decreaseQty":
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload.id && product.qty > 0 ? { ...product, qty: product.qty - 1 } : product
        ),
      };
    default:
      return state;
  }
}


