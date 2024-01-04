import Cookies from "js-cookie";

function CartReducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART": {
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find(
          (item) => item.id === newItem.id
        );
        const cartItems = existItem
          ? state.cart.cartItems.map((item) =>
              item.id === existItem.id ? newItem : item
            )
          : [...state.cart.cartItems, newItem];
  
        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
  
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      case "CART_REMOVE_ITEM": {
        const cartItems = state.cart.cartItems.filter(
          (item) => item.id != action.payload.id
        );
  
        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
  
        return { ...state, cart: { ...state.cart, cartItems } };
      }

      default:
        return state;
    }
  }

  export default CartReducer