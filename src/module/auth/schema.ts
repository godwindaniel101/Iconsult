import { object, string, ref } from "yup";

export const registration = object({
    body: object({
        passwordConfirmation: string()
            .required("Password Confirmation is required")
            .oneOf([ref("password")]),
        password: string()
            .required("Password is required")
            .min(8, "password most be a minimum of 8 characters")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        email: string()
            .required("email is required")
            .email("a valid email is required"),
        last_name: string().required("last name is required"),
        first_name: string().required("first name is required"),
    }),
});
export const companyRegistration = object({
    body: object({
        passwordConfirmation: string()
            .required("Password Confirmation is required")
            .oneOf([ref("password")]),
        password: string()
            .required("Password is required")
            .min(8, "password most be a minimum of 8 characters")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        company_name: string().required("Company name is required"),
        phone_no: string().required("phone number is required"),
        email: string()
            .required("email is required")
            .email("a valid email is required"),
        last_name: string().required("last name is required"),
        first_name: string().required("first name is required"),
    }),
});

export const login = object({
    body: object({
        password: string().required("password is requied"),
        email: string().required("email is required"),
    }),
});

export const forgetPassword = object({
    body: object({
        email: string()
            .required("email is required")
            .email("a valid email is required"),
    }),
});
export const resetPassword = object({
    params: object({
        resetToken: string()
            .required("reset token is required")
    }),
    body: object({
        passwordConfirmation: string()
            .required("Password Confirmation is required")
            .oneOf([ref("password")]),
        password: string()
            .required("Password is required")
            .min(8, "password most be a minimum of 8 characters")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    })
});
