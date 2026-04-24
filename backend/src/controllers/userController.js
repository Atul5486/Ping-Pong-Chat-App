import userModel from "../models/user.js";
import friendRequestModel from '../models/friendRequest.js'

export const getRecommandedUsers   = async(req, res) => {
    const user=req.user;
    const userId=req.user._id
    try {
        const recommandedUsers = await userModel.find({ _id: { 
            $ne: userId,
            $nin:user.friends
         },
        isOnboarded:true
     }).select('-password').limit(10);

     if(recommandedUsers.length==0){
        return res.status(200).json({message:'No recommanded users found'});
     }
        res.status(200).json(recommandedUsers);
    } catch (error) {
        console.log('error in userController')
        res.status(500).json({ message: 'Server error' });
    }
}

export const getMyFriends=async(req,res)=>{
    try{
        const user=await userModel.findById(req.user._id).select('friends').populate('friends','fullName image language skill language bio location')
        res.status(200).json(user.friends)
    }catch(err){
        console.log('Error in user controller get my friends',err.message);
        res.status(500).json({message:'Internal server error'});
    }
}

export const sendFriendRequest=async(req,res)=>{
    try{

        const myId=req.user._id;
        const {id:recipientId}=req.params;

        
        if(myId.toString()===recipientId){
            return res.status(400).json({message:'You cannot send request to yourself'})
        }

        const recipient=await userModel.findById(recipientId)
        if(!recipient){
            return res.status(400).json({message:'Recipient not found'});
        }

        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:'you are already friends with this user'})
        }

        const existingRequest=await friendRequestModel.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId},
            ]
        })
        if(existingRequest){
            return res.status(400).json({message:'Request already exists'});
        }
        
        const friendRequest=await friendRequestModel.create({
            sender:myId,
            recipient:recipientId
        })

        res.status(201).json({friendRequest})

    }catch(err){
        console.log('Error in sendFriendReqest',err.message)
        res.status(500).json({message:'Internal server error'})
    }
}

export const acceptFriendRequest=async(req,res)=>{
        try {

            const {id:requestId}=req.params;

            const friendRequest=await friendRequestModel.findById(requestId);

            if(!friendRequest){
                return res.status(404).json({message:'Friend request not found'});
            }
            
            if(friendRequest.recipient.toString()!==req.user._id.toString()){
                return res.status(403).json({message:'you are not authorized to accept this request'});
            }

            friendRequest.status='accepted';
            await friendRequest.save();

            await userModel.findByIdAndUpdate(friendRequest.sender,{
                $addToSet:{friends:friendRequest.recipient}
            })
            await userModel.findByIdAndUpdate(friendRequest.recipient,{
                $addToSet:{friends:friendRequest.sender}
            })

            res.status(200).json({message:'friend request accepted'});

            
        } catch (err) {
            console.log('Error in acceptFriendRequest',err.message);
            res.status(500).json({message:'Internal server error'});
        }
}

export const getFriendRequest=async(req,res)=>{
    try {

        const incomingRequest=await friendRequestModel.find({
            recipient:req.user._id,
            status:'pending'
        }).populate('sender',"fullName image language location skill bio")
        
        const acceptedRequest=await friendRequestModel.find({
            sender:req.user._id,
            status:'accepted'
        }).populate('recipient',"fullName image")

        res.status(200).json({incomingRequest,acceptedRequest})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:'Internal server error'});
    }
    
}
export const getOutgoingFriendRequest=async(req,res)=>{
    try {

        const ongoingRequest=await friendRequestModel.find({
            sender:req.user._id,
            status:'pending'
        }).populate('recipient','fullName image language skill ')

        res.status(200).json({ongoingRequest})
        
    } catch (error) {   
        console.log(error.message)
        res.status(500).json({message:'Internal server error'})
        
    }
}