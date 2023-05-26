import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";

const HomePage = () => {
  const isMobileNonMobileScreens = useMediaQuery("min-width:1000px");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isMobileNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isMobileNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
        </Box>
        <Box
          flexBasis={isMobileNonMobileScreens ? "42%" : undefined}
          mt={isMobileNonMobileScreens ? undefined : "2rem"}
        >
         <MyPostWidget picturePath={picturePath}/>
        </Box>
        {isMobileNonMobileScreens && (<Box flexBasis="26%"> </Box>)}
      </Box>
    </Box>
  );
};

export default HomePage;
