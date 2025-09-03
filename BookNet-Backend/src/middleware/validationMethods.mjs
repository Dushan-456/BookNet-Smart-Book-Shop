import { body, query } from "express-validator";

//Registration Fields validate------------------------------------------------------------------------------------------------------------------------
export const RegisterValidator = () => [
   body("firstName")
   .trim()
   .escape()
   .notEmpty().withMessage("Please Enter First Name"),
   body("lastName")
   .trim()
   .escape()
   .notEmpty().withMessage("Please Enter Last Name"),
   body("username")
      .trim()
      .escape()
      .notEmpty().withMessage("Please Enter Correct Username"),

   body("email")
      .trim()
      .normalizeEmail()
      .notEmpty().withMessage("Please Enter  Email")           
      .isEmail().withMessage("Please Enter Correct Email"),

   body("password")
      .notEmpty().withMessage("please enter password")
      .isStrongPassword({
         minLength: 8,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1,
         minSymbols: 1,
      }).withMessage("Password must include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol"),
   body("confirmPassword")
      .notEmpty().withMessage("Please confirm your password")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
];

//login Fields validate------------------------------------------------------------------------------------------------------------------------

export const loginValidator = () => [
   body("emailOrUsername")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please Enter Username or Email"),
   body("password")
      .notEmpty()
      .withMessage("Please Enter Password"),
];

//User Profile Fields validate------------------------------------------------------------------------------------------------------------------------

export const ProfileFieldsValidator = () => [
 
   body("image"),
   body("dob").trim().escape(),
   body("gender").trim().escape(),
   body("designation").trim().escape(),
   body("mobile").trim().escape(),
   body("address").trim().escape(),
];



//common body Fields validate------------------------------------------------------------------------------------------------------------------------
export const comValidate = (...keys) => {
   const validateValues = [];
   keys.forEach((k) => {
      validateValues.push(
         body(k).trim().escape().notEmpty().withMessage("Please enter values")
      );
   });
   return validateValues;
};
//common Query  validate------------------------------------------------------------------------------------------------------------------------
export const comQueryValidate = (...keys) => {
   const validateValues = [];
   keys.forEach((k) => {
      validateValues.push(
         query(k).trim().escape().notEmpty().withMessage("Please enter values")
      );
   });
   return validateValues;
};
