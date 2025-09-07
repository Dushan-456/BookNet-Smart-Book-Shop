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

const RegisterPage = () => {
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
      watch,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const submitCall = (data) => {
      console.log(data);
      sendRequest(data);
   };
   const password = watch("password");

   //---------------------------------------------------------------------------------------

   const sendRequest = async (data) => {
      setIsSubmitting(true); // --- CHANGE: Start loading ---
      setServerError("");
      try {
         const res = await API.post("/users/register", data);
         console.log("User Registered:", res.data);
         setSuccessDialogOpen(true);
         setServerError("");
      } catch (error) {
         console.error(
            "Error registering user:",
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

   return (
      <div className="flex bg-gray-500 items-center justify-center h-screen">
         <form onSubmit={handleSubmit(submitCall)}>
            <div className="w-sm flex flex-col p-5 gap-5 bg-white  rounded-2xl ">
               <h1 className="text-4xl font-bold text-center">
                  Create an Account
                  {serverError && typeof serverError === "object" && (
                     <Stack sx={{ width: "100%" }} spacing={2}>
                        {Object.entries(serverError).map(([field, message]) => (
                           <Alert severity="error" key={field}>
                              {message}
                           </Alert>
                        ))}
                     </Stack>
                  )}
               </h1>
               <TextField
                  className="w-full"
                  {...register("username", {
                     required: "User Name is Required",
                     minLength: {
                        value: 3,
                        message: "Name must be at least  characters",
                     },
                  })}
                  label="Username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  disabled={isSubmitting}
               />
               <TextField
                  className="w-full"
                  {...register("firstName", {
                     required: "First Name is Required",
                  })}
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  disabled={isSubmitting}
               />
               <TextField
                  className="w-full"
                  {...register("lastName", {
                     required: "Last Name is Required",
                  })}
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  disabled={isSubmitting}
               />
               <TextField
                  className="w-full"
                  {...register("email", {
                     required: "Email is required",
                     pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                     },
                  })}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
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
                        required: "Password is required",
                        validate: {
                           hasUpperCase: (value) =>
                              /[A-Z]/.test(value) ||
                              "Must include an uppercase letter",
                           hasLowerCase: (value) =>
                              /[a-z]/.test(value) ||
                              "Must include a lowercase letter",
                           hasNumber: (value) =>
                              /[0-9]/.test(value) || "Must include a number",
                           hasSymbol: (value) =>
                              /[\W_]/.test(value) || "Must include a symbol",
                           hasMinLength: (value) =>
                              value.length >= 8 ||
                              "Must be at least 8 characters",
                        },
                     })}
                     disabled={isSubmitting}
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              aria-label={
                                 showPassword
                                    ? "Hide password"
                                    : "Show password"
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

               <FormControl
                  sx={{ width: "100%" }}
                  variant="outlined"
                  error={!!errors.confirmPassword}>
                  <InputLabel htmlFor="outlined-adornment-password1">
                     Confirm Password
                  </InputLabel>
                  <OutlinedInput
                     id="outlined-adornment-password1"
                     type={showPassword ? "text" : "password"}
                     label="Confirm Password"
                     {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                           value === password || "Passwords do not match",
                     })}
                     disabled={isSubmitting}
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              aria-label={
                                 showPassword
                                    ? "Hide password"
                                    : "Show password"
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
                  <FormHelperText>
                     {errors.confirmPassword?.message}
                  </FormHelperText>
               </FormControl>

               <div>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     disabled={isSubmitting}
                     sx={{ height: "48px" }} // Give button a fixed height
                  >
                     {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                     ) : (
                        "Register"
                     )}
                  </Button>
               </div>
               <p className="text-center">
                  Already have an account?{" "}
                  <Link to="/login">
                     <span className="text-blue-600 font-bold"> Login</span>{" "}
                  </Link>{" "}
               </p>
            </div>
         </form>
         <Dialog
            open={successDialogOpen}
            onClose={() => {
               setSuccessDialogOpen(false);
               navigate("/login");
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

            <DialogTitle sx={{ textAlign: "center" }}>
               User Registered
            </DialogTitle>

            <DialogContent
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  px: 4,
               }}>
               <p>
                  The user has been registered successfully! Please Log in Now
               </p>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
               <Button
                  onClick={() => {
                     setSuccessDialogOpen(false);
                     navigate("/login");
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

export default RegisterPage;
