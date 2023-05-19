import User from "../models/User";


//READ

export const getUser = async (req , res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({message:  err.message});
    }
}

export  const getUserFriends = async (req , res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne(id);
        // this line uses Promise.all() along with map() to fetch the friends' data for the given user.
        // user.friends.map((id) => user.findById(id)) maps over each friend's ID in the user.friends array and 
        // calls user.findById(id) to fetch the friend's data. It returns an array of promises.
        // Promise.all() is then used to wait for all the promises to resolve, returning an array of friend objects.
        const friends = await Promise.all(user.friends.map((id) => user.findById(id)))
        // this line maps over each friend object in the friends array to extract only the desired properties. 
        // It creates a new object with the specified properties.
        const formattedFriends = friends.map(({_id , firstName, lastName , occupation ,location, picturePath}) => 
                                            {return {_id , firstName, lastName , occupation ,location, picturePath}})
        res.status(200).json(formattedFriends)    
    } catch (error) {
        res.status(404).json({message:  err.message});
    }
}

// UPDATE

export const addRemoveFriend = async (req , res) => {
    try {
        const {id , friendId} = req.params;
        const user  = await User.findById(id);
        const friend =  await User.findById(friendId)
        if(user.friends.includes(friendId)) {
            user.friends.filter((id) => id !== friendId); //Removes the friend from the users friends list
            friend.friends.filter((id) => id !== id); //Removes the friend from the users friends list
        }else{
            user.friends.push(id)  //Adds the friend to the users friends list
            friend.friends.push(id) // Adds the user to the friend's friends list
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(user.friends.map((id) => user.findById(id)))
        const formattedFriends = friends.map(({_id , firstName, lastName , occupation ,location, picturePath}) => 
                                            {return {_id , firstName, lastName , occupation ,location, picturePath}})

        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({message:  err.message});
    }
}