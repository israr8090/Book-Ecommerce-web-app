import userModel from "../models/userModel.js";

//--add to cart function--
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        // console.log(userData)
        let cartData = await userData.cartData; 

        if (!cartData[req.body.itemId]) { 
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item added to cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error2" });
    }
};

//--remove item from cart function--
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            res.json({ success: true, message: "Item removed from cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error3" });
    }
};

//--fetch User Cart data--
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error4" });
    }
}

export { addToCart, removeFromCart, getCart };
