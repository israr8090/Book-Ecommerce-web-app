import axios from "axios";
import { createContext, useEffect, useState } from "react";

//--exporting StoreContext for uses in components
export const StoreContext = createContext(null)

//--creating StoreContextProvider for uses in components
export const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"; //--server side URL--

    //--useStates
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [book_list, setBookList] = useState([]);

    //--for adding item in cart--
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        //--if user is logdIN then 
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    //--this function for removing item in cart--
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        //--checking token 
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    //--this function for getting total amount of cart--
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itmeInfo = book_list.find((product) => product._id === item);
                totalAmount += itmeInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    //--this function for loading cart data--
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        // console.log(response.data.cartData)
        setCartItems(response.data.cartData);
    };

    //--fetch book List--
    const fetchBookList = async () => {
        const response = await axios.get(url + "/api/book/list");
        setBookList(response.data.data);
    };

    //--when reload web page user not logout--
    useEffect(() => {
        async function loadData() {
            await fetchBookList();  //--called fetchBookList funciton

            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));

                //--loading cart data if token
                await loadCartData(localStorage.getItem("token"));
            }
        };
        loadData();
    }, []);

    //--context value that is used in components for state management
    const contextValue = {
        book_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
};

export default StoreContextProvider;