import {
   FormControl,
   InputLabel,
   OutlinedInput,
   InputAdornment,
   IconButton,
   FormHelperText,
   Button,
} from "@mui/material";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   TextField,
   Box,
   Alert,
   Stack,
   CircularProgress,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import API from "../API/api";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
   const { login, isAuthenticated } = useAuth();

   const [showPassword, setShowPassword] = useState(false);
   const [successDialogOpen, setSuccessDialogOpen] = useState(false);
   const [serverError, setServerError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const navigate = useNavigate();

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleMouseUpPassword = (event) => {
      event.preventDefault();
   };

   // --------------------------------------------------------------

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const submitCall = (data) => {
      console.log(data);
      sendRequest(data);
   };

   const sendRequest = async (data) => {
      setIsSubmitting(true);
      setServerError("");
      try {
         const res = await API.post("/users/login", data, {
            withCredentials: true,
         });
         console.log("User Logged In:", res.data);
         setSuccessDialogOpen(true);
         console.log(
            "LoginPage: Data being sent to login context:",
            res.data.user
         );

         if (res.data.user) {
            login(res.data.user);
         }
         setServerError("");
      } catch (error) {
         console.error(
            "User Login Error:",
            error.response?.data || error.message
         );

         setServerError(
            typeof error.response?.data?.error === "object"
               ? error.response.data.error
               : {
                    general:
                       error.response?.data?.error || "Something went wrong",
                 }
         );
      } finally {
         setIsSubmitting(false);
      }
   };

   useEffect(() => {
      // If the user is already authenticated, redirect them
      if (isAuthenticated) {
         navigate("/profile", { replace: true }); 
      }
   }, [isAuthenticated, navigate]);

   return (
      <div
         className="flex items-center justify-center flex-col"
         style={{ height: "75vh" }}>
         <form onSubmit={handleSubmit(submitCall)}>
            <div
               className="w-sm flex flex-col p-5 gap-5 bg-white  rounded-2xl "
               style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
               <h1 className="text-4xl font-bold text-center">Login</h1>
               {serverError && typeof serverError === "object" && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                     {Object.entries(serverError).map(([field, message]) => (
                        <Alert severity="error" key={field}>
                           {message}
                        </Alert>
                     ))}
                  </Stack>
               )}
               <TextField
                  className="w-full"
                  id="outlined-error-helper-text"
                  label="User Name or Email"
                  {...register("emailOrUsername", {
                     required: "User Name or Email is Required",
                  })}
                  error={!!errors.emailOrUsername}
                  helperText={errors.emailOrUsername?.message}
                  disabled={isSubmitting}
               />

               <FormControl
                  sx={{ width: "100%" }}
                  variant="outlined"
                  error={!!errors.password}>
                  <InputLabel htmlFor="outlined-adornment-password">
                     Password
                  </InputLabel>
                  <OutlinedInput
                     id="outlined-adornment-password"
                     type={showPassword ? "text" : "password"}
                     label="Password"
                     {...register("password", {
                        required: "Password is Required",
                     })}
                     disabled={isSubmitting}
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              aria-label={
                                 showPassword
                                    ? "hide password"
                                    : "show password"
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end">
                              {showPassword ? (
                                 <VisibilityOff />
                              ) : (
                                 <Visibility />
                              )}
                           </IconButton>
                        </InputAdornment>
                     }
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
               </FormControl>

               <div>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     disabled={isSubmitting}
                     sx={{ height: "48px" }}>
                     {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                     ) : (
                        "Login"
                     )}
                  </Button>
               </div>
               <p className="text-center">
                  Don't have an account?{" "}
                  <Link to="/register">
                     <span className="text-blue-600 font-bold">
                        {" "}
                        Register Now
                     </span>{" "}
                  </Link>{" "}
               </p>
            </div>
         </form>
         <Dialog
            open={successDialogOpen}
            onClose={() => {
               setSuccessDialogOpen(false);
               navigate("/profile");
            }}>
            {/* Centered Icon */}
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
               }}>
               <CheckCircleIcon
                  sx={{
                     width: 50,
                     height: 50,
                     color: "#02ab32",
                  }}
               />
            </Box>

            <DialogTitle sx={{ textAlign: "center" }}>Logged in</DialogTitle>

            <DialogContent
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  px: 4,
               }}>
               <p>The user login successfull!</p>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
               <Button
                  onClick={() => {
                     setSuccessDialogOpen(false);
                     navigate("/profile");
                  }}
                  autoFocus
                  variant="contained">
                  OK
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default LoginPage;
