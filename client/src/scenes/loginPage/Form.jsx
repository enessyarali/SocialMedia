import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { EditOutlinedIcon } from "@mui/icons-material/EditOffOutlined";
import { Formik } from "formik"; //Form Library
import * as yup from "yup"; //Validation Library
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/flexBetween";

const registerSchema = yup.object.shape({
  firstName: yup.string.reqired("required"),
  lastName: yup.string.reqired("required"),
  email: yup.string.email().reqired("required"),
  password: yup.string.reqired("required"),
  location: yup.string.reqired("required"),
  occupation: yup.string.reqired("required"),
  picture: yup.string.reqired("required"),
});

const loginSchema = yup.object.shape({
  email: yup.string.email().reqired("required"),
  password: "",
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register"; //Always try to name Boolean values with "is"

  const register = async (values , onSubmitProps ) => {
    //This allows us to send form with image
    
    const formData = new FormData()
    for(let value in values){
      formData.append(value , values[value]);
    }
    formData = FormData("picturePath" , values.picture.name);

    const savedUserResponse = await fetch(
      "https://localhost:3001/auth/register",
      {
        method : "POST",
        body : formData,
      })
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if(savedUser){
        setPageType("login")
      }
  }

  const login = async (values ,onSubmitProps) => {
    const loggedInResponse = await fetch(
      "https://localhost:3001/auth/login",
      {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(values),
      })
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();

      if(loggedIn){
        dispatch(setLogin({
          user : loggedIn.user,
          token : loggedIn.token
        }))
        navigate("/home");
      }
      
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    if (isRegister) await register(values , onSubmitProps)
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {/* Below is the functioning of formik check the documentation to see how it works */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0 , 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              type="password"
              onChange={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {/* BUTTONS */}
          <Box>
            <Button
            fullWidth
            type="Submit"
            sx = {{
              m : "2rem 0",
              p : "1rem" , 
              backgroundColor : palette.primary.main,
              color : palette.background.alt,
              "& hover" : {color : palette.primary.main},
            }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
            onClick={() => {
              setPageType(isLogin ? "register" : "login") ;
              resetForm()}}
              sx={{
                textDecoration : "underline",
                color : palette.primary.main,
                "&hover" : {
                  cursor : "pointer",
                  color : palette.primary.light
                }
              }}
            >
            {isLogin ? "Don't have an account ? Sign Up Here" :  "Already have an account ? Log in Here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;