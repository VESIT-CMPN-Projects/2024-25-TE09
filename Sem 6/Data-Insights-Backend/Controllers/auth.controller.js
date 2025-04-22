import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
// import { sendVerificationEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  //get data
  const { email, password, name } = req.body;
  //process
  try {
    //check unavailable fields
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists");
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // const verificationToken = Math.floor(1000 + Math.random() * 9000);

    //update user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      //   verificationToken: verificationToken,
      //   verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    //save user
    await user.save();

    // //send verification email
    // sendVerificationEmail(user.email, user.verificationToken);
    // console.log("User created successfully");

    //jwt token
    generateTokenAndSetCookie(res, user._id);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check unavailable fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    //check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateTokenAndSetCookie(res, user._id);
    console.log("Login successful");

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0), // Expire immediately
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const verifyEmail = async (req, res) => {
//   const { code } = req.body;
//   try {
//     if (!code) {
//       return res.status(400).json({ message: "Verification code is required" });
//     }
//     const user = User.findOne({
//       verificationToken: code,
//       verificationTokenExpiresAt: { $gt: Date.now() },
//     });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Invalid or expired verification code" });
//     }
//     user.isVerified = true;
//     user.verificationToken = undefined;
//     user.verificationTokenExpiresAt = undefined;
//     await user.save();

//     await sendWelcomeEmail(user.email);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
