import validator from "validator";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { upsertStream } from "../config/stream.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character long." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const idx = Math.floor(Math.random() * 1000) + 1;
    const avtaar = `https://api.dicebear.com/9.x/avataaars/svg?backgroundColor=ffd5dc&style=default,circle&seed=${idx}`;

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      image: avtaar,
    });

    await upsertStream({
      id:newUser._id.toString(),
      name:newUser.fullName,
      image:newUser.image || ""
    })

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSize: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSize: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ user: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const logout=async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:'Logout Successfully'});
}

export const onboard=async(req,res)=>{
  try{
    const userId=req.user._id;
    const {fullName,bio,skill,language,location}=req.body;

    if(!fullName || !bio || !skill || !language || !location){
      return res.status(400).json({message:'All fields required',
        missingFields:[
          !fullName && 'fullname',
          !bio && 'bio',
          !skill  && 'skill',
          !language && 'language',
          !location && 'location',
        ].filter(Boolean)
      });
    }

    const updatedUser=await userModel.findByIdAndUpdate(userId,{
      fullName,
      bio,
      skill,
      language,
      location,
      isOnboarded:true
    },{new:true});


     await upsertStream({
      id:updatedUser._id.toString(),
      name:updatedUser.fullName,
      image:updatedUser.image || ""
    })

    if(!updatedUser){
      return res.status(404).json({message:'User not updated'});
    }

    res.status(200).json({user:updatedUser})

  }catch(err){
    console.log(err.message)
    res.status(500).json({message:'Something went wrong'});
  }
}