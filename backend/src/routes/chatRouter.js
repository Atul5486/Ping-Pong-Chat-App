import express from 'express'
import { authUser } from '../middleware/authUser.js';
import { getStreamToken } from '../controllers/chatController.js';
const router =express.Router();

router.get('/token',authUser,getStreamToken);

export default router;