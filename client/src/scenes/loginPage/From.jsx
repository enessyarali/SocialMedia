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
import  * as yup from "yup" //Validation Library
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/flexBetween";

const registerSchema = yup.object.shape({
    firstName :yup.string.reqired("required"),
    lastName : yup.string.reqired("required"),
    email : yup.string.email().reqired("required"),
    password : yup.string.reqired("required"),
    location : yup.string.reqired("required"),
    occupation : yup.string.reqired("required"),
    picture : yup.string.reqired("required"),
})