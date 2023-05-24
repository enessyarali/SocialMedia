import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const LoginPage = () => {
  const theme = useTheme();
  const isMobileNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Box width="100%">
        <Typography fontWeight="bold" fontSize="32px" color="primary" backgroundColor={theme.palette.background.alt} p="1rem 6%"  textAlign="center">
          SuperSocial
        </Typography>
      </Box>
      <Box width={isMobileNonMobileScreens ? "50%" : "93%"}>

      </Box>
    </Box>
  );
};

export default LoginPage;
