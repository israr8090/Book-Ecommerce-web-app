import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

//--create Token--
const createToken = (user) => {
    // return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return jwt.sign({ user }, process.env.JWT_SECRET);
}

// //--create Token--
// const createToken = (id) => {
//     // return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
//     return jwt.sign({ id }, process.env.JWT_SECRET);
// }

//--register user  
const registerUser = async (req, res) => {
    //--destructuring user data--
    const { name, email, password } = req.body;

    //--validating user data--
    try {
        //--checking that user already exists--
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        //--validating email format & strong Password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be atleast 8 characters" });
        }

        //--hashing user password--
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //--creating new user--
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            image:""
        });

        //--saving new user--
        const newUser = await user.save();

        //--generating token--
        // const token = createToken(newUser._id);
        const token = createToken(newUser);

        //--returning token--
        res.json({ success: true, message: "User Registered Successfully", token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//--login user
const loginUser = async (req, res) => {
    //--destructuring user data--
    const {email, password} = req.body;

    //--validating user data--
    try {
        //--checking us user already exists--
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exists" });
        }

        //--validating password--
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        //--generating token--
        // const token = createToken(user._id);
        const token = createToken(user);

        //--returning token--
        res.json({ success: true, message: "User Logged In Successfully", token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//--fetch all user List
const userList = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//--export--
export { registerUser, loginUser, userList };