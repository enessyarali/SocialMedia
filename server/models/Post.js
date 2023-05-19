import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId : {
            type : String, 
            required : true
        },
        firstName : {
            type : String, 
            required : true
        },
        lastName : {
            type : String, 
            required : true
        },
        location  : String,
        description : String,
        picturePath : String,
        userPicturePath : String,
        likes : {
            type : Map,
            of: Boolean, //All we need to do is check if the userId exists in this map and the value is gonna be true always if it exists
            //Instead of an array Map is a hashmap that enables constan time O(1) to check if the userId exists.It is much more performance friendly.
            //Otherwise we need to loop through the entire array and check if the userId exists and it would not perform really good.
            //Its O(1) vs O(n). 
        },
        comments : {
            type : Array,
            default: []
        },
    },
    {timestamps : true}
)

const Post = mongoose.model("Post" , postSchema);
 
export default Post;
