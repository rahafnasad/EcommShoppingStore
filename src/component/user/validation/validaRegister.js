import * as yup from 'yup'
export const registerSchema = yup.object({

    userName:yup.string().required("user name is required").min(3,"must be at least 3 char").max(30,"max is 30 char"),
    email:yup.string().required("user email is required").email(),
    password:yup.string().required("password name is required").min(3,"must be at least 3 char").max(30,"max is 30 char"),
})
export const logInSchema = yup.object({

    email:yup.string().required("user email is required").email(),
    password:yup.string().required("password name is required").min(3,"must be at least 3 char").max(30,"max is 30 char"),
})
export const ForgotSchema = yup.object({

    email:yup.string().required("user email is required").email(),
    code:yup.string().required("code name is required").min(4,"must be 4 char").max(4,"must be 4  char"),

    password:yup.string().required("password name is required").min(3,"must be at least 3 char").max(30,"max is 30 char"),
})