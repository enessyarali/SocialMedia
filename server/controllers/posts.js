import Post from "../models/Post.js"
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
    try {
        const {userId , description , picturePath} = req.body;
        const user = await User.findbyId(userId);
        const newPost =  new Post({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            description,
            userPicturePath : user.picturePath,
            picturePath,
            likes : {},
            comments : []
        })
        await newPost.save();
        const post = await Post.find(); 
        res.status(201).json(post);//Returns  all posts so that user can see the updated version of the feed
    } catch (error) {
        res.status(409).json({error : error.message})
    }
}

//READ

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find(); 
        console.log(post);
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

export const getUserPosts = async (req , res) =>{
    try {
        const { userId } = req.params;
        const posts = await Post.find({userId});
        console.log(posts); 
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

//UPDATE

export const likePost = async (req , res) => {
    try {
        const { id } = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id); //Grabing the post
        const isLiked =  post.likes.get(userId);// Grabbing whether that user liked the post
        if(isLiked){
            post.likes.delete(userId); //if he or she has liked it we unlike by deleting the user from the likes list which was a Map.
        }else{
            post.likes.set(userId , true); //if he or she did not like it before we like it.
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id , 
            {likes : post.likes}, //we find it first in the database and update the database with new likes  list
            { new : true}
        )
        res.status(200).json(updatedPost)  //We send updatedPost to the frontend so that we can update the frontend.We have to update 
                                            //the frontend once you hit the like button
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}