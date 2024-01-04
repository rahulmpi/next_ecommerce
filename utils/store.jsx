const { createContext, useContext, useReducer } = require("react");
import Cookies from "js-cookie";
import reducer from "./CartReducer";

const StoreContext = createContext()

const StoreProvider = ({children}) =>{

    const initialState = {
        cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
    }

    const [state, dispatch] = useReducer(reducer, initialState)

   return <StoreContext.Provider value={{state, dispatch}}>{children}</StoreContext.Provider>
}

export default StoreProvider

export const useStoreContext = () =>{
    return useContext(StoreContext)
}