import express from 'express'
import {authUser} from '../middleware/authUser.js'
const router=express.Router();
import { signup,login, logout ,onboard} from '../controllers/authController.js';

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
// router.get('/forgot-password',forgotPassword)


router.put('/onboarding',authUser,onboard)
router.get('/me',authUser,(req,res)=>{
    res.status(200).json({user:req.user})
})


export default router;