import express from 'express'
import { authUser } from '../middleware/authUser.js';
import { getRecommandedUsers,getMyFriends, acceptFriendRequest,getFriendRequest,getOutgoingFriendRequest, sendFriendRequest } from '../controllers/userController.js';
const router=express.Router()


router.use(authUser)

router.get('/',getRecommandedUsers);
router.get('/friends',getMyFriends);
router.post('/friend-request/:id',sendFriendRequest);
router.put('/friend-request/:id/accept',acceptFriendRequest);
router.get('/friend-request',getFriendRequest);
router.get('/friend-request/outgoing',getOutgoingFriendRequest);

export default router;