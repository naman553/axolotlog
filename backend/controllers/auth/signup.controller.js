import User from "../../models/users/Users.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,email,password
        })
        res.status(201).json({ message: 'Signup successful' })
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

export default signup