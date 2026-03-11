import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const ARABIC_NAME_REGEX = /^[\u0621-\u064A\u0660-\u0669\s]+$/;
const ENGLISH_NAME_REGEX = /^[a-zA-Z\s]+$/;
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
const RUBIX_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@rubixconsult\.com$/i;

export const registerSchema = z
  .object({
    full_name_ar: z
      .string()
      .min(3, "validation.nameMinLength")
      .max(100, "validation.nameMaxLength")
      .regex(ARABIC_NAME_REGEX, "validation.arabicOnly"),
    full_name_en: z
      .string()
      .min(3, "validation.nameMinLength")
      .max(100, "validation.nameMaxLength")
      .regex(ENGLISH_NAME_REGEX, "validation.englishOnly"),
    email: z
      .string()
      .min(1, "validation.required")
      .email("validation.invalidEmail")
      .regex(RUBIX_EMAIL_REGEX, "validation.rubixEmailOnly"),
    phone: z.string().refine(
      (val) => {
        const parsed = parsePhoneNumberFromString(val);
        return parsed?.isValid() ?? false;
      },
      { message: "validation.invalidPhone" },
    ),
    date_of_birth: z.string().min(1, "validation.required"),
    nationality: z.string().min(1, "validation.required"),
    gender: z.enum(["male", "female"], {
      message: "validation.required",
    }),
    password: z
      .string()
      .min(8, "validation.passwordMinLength")
      .regex(STRONG_PASSWORD_REGEX, "validation.passwordStrength"),
    password_confirmation: z.string().min(1, "validation.required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "validation.passwordMismatch",
    path: ["password_confirmation"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "validation.required")
    .email("validation.invalidEmail")
    .regex(RUBIX_EMAIL_REGEX, "validation.rubixEmailOnly"),
  password: z.string().min(1, "validation.required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "validation.otpLength")
    .regex(/^\d+$/, "validation.otpDigitsOnly"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
