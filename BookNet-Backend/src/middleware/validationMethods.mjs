import { body, query } from "express-validator";

//Registration Fields validate------------------------------------------------------------------------------------------------------------------------
export const RegisterValidator = () => [
   body("FirstName")
   .trim()
   .escape()
   .notEmpty().withMessage("Please Enter First Name"),
   body("LastName")
   .trim()
   .escape()
   .notEmpty().withMessage("Please Enter Last Name"),
   body("Username")
      .trim()
      .escape()
      .notEmpty().withMessage("Please Enter Correct Username"),

   body("Email")
      .trim()
      .escape()
      .notEmpty().withMessage("Please Enter  Email")           
      .isEmail().withMessage("Please Enter Correct Email"),

   body("Password")
      .notEmpty().withMessage("please enter password")
      .isStrongPassword({
         minLength: 8,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1,
         minSymbols: 1,
      }).withMessage("Password must include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol"),
   body("ConfirmPassword")
      .notEmpty().withMessage("Please confirm your password")
      .custom((value, { req }) => {
        if (value !== req.body.Password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
];

//User Profile Fields validate------------------------------------------------------------------------------------------------------------------------

export const ProfileFieldsValidator = () => [
 
   body("Image"),
   body("DOB").trim().escape(),
   body("Gender").trim().escape(),
   body("Designation").trim().escape(),
   body("Mobile").trim().escape(),
   body("Address").trim().escape(),
];

//login Fields validate------------------------------------------------------------------------------------------------------------------------

export const loginValidator = () => [
   body("Username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please Enter Username"),

   body("Password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please Enter Password"),
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
