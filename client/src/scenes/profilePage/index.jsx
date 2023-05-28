import { Box, useMediaQuery } from "@mui/material";
import Friend from "components/Friend";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendList";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const userId = useParams();
  const token = useSelector((state) => state.token);
  const isMobileNonMobileScreens = useMediaQuery("min-width : 1000px");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`,}
    });
    const data = await response.json();
    setUser(data)
  };
  
  useEffect(() => getUser() , [])

  if(!user) return null;

  return(
    <Box>
        <Navbar/>
        <Box
        width="100%"
        padding="2rem 6%"
        display={isMobileNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isMobileNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath}></UserWidget>
          <Box gap="2rem 0"/>
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isMobileNonMobileScreens ? "42%" : undefined}
          mt={isMobileNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box gap="2rem 0"/>
          <PostsWidget userId={userId} />
        </Box>
       
      </Box>
    </Box>
  )
};

export default ProfilePage;
