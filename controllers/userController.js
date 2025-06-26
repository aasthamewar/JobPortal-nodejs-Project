import userModel from "../models/userModel.js";

export const updateUserController = async (req,res,next) =>{
    const {name,email,lastName,Location} = req.body
    if(!name || !email || !lastName || !Location){
        next('Please Provide All Field')
    }
    const user = await userModel.findOne({_id:req.user.userId})
    user.name = name
    user.lastName = lastName
    user.email = email
    user.Location = Location

    await user.save()
    const token = user.createJWT()
    res.status(200).json({
        user,
        token,
    });
};