"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiTelInput } from "mui-tel-input";
import { Eye, EyeOff } from "lucide-react";
import dayjs from "dayjs";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";
import { authApi } from "@/lib/api/auth";
import { countries, type Country } from "@/lib/data/countries";
import { useAuth } from "@/lib/auth/AuthContext";
import { OtpVerification } from "./OtpInput";

type Step = "form" | "otp";

export function RegisterForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name_ar: "",
      full_name_en: "",
      email: "",
      phone: "",
      date_of_birth: "",
      nationality: "",
      gender: undefined,
      password: "",
      password_confirmation: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) =>
      authApi.register({
        ...data,
        phone: data.phone.replace(/\s/g, ""),
      }),
    onSuccess: (_data, variables) => {
      setEmail(variables.email);
      setStep("otp");
      toast.success(t("otpSent"));
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? t("registerError");
      toast.error(message);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (otp: string) => authApi.verifyOtp({ email, otp }),
    onSuccess: async (response) => {
      const { access_token, refresh_token } = response.data.data;
      await login(access_token, refresh_token);
      toast.success(t("registerSuccess"));
      router.push("/");
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? t("otpError");
      toast.error(message);
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  const handleOtpComplete = (otp: string) => {
    verifyMutation.mutate(otp);
  };

  const handleResendOtp = async () => {
    await authApi.sendOtp(email);
    toast.success(t("otpSent"));
  };

  const getTranslatedError = (msg: string | undefined) => {
    if (!msg) return undefined;
    try {
      return t(msg);
    } catch {
      return msg;
    }
  };

  if (step === "otp") {
    return (
      <OtpVerification
        onComplete={handleOtpComplete}
        onResend={handleResendOtp}
        isLoading={verifyMutation.isPending}
        error={verifyMutation.isError ? t("otpError") : undefined}
      />
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          width: "100%",
          maxWidth: 480,
          mx: "auto",
        }}
      >
        <Typography variant="h5" fontWeight={700} textAlign="center">
          {t("registerTitle")}
        </Typography>

      <TextField
        {...register("full_name_ar")}
        label={t("fullNameAr")}
        error={!!errors.full_name_ar}
        helperText={getTranslatedError(errors.full_name_ar?.message)}
        fullWidth
        inputProps={{ dir: "rtl" }}
      />

      <TextField
        {...register("full_name_en")}
        label={t("fullNameEn")}
        error={!!errors.full_name_en}
        helperText={getTranslatedError(errors.full_name_en?.message)}
        fullWidth
        inputProps={{ dir: "ltr" }}
      />

      <TextField
        {...register("email")}
        label={t("email")}
        type="email"
        placeholder="name@rubixconsult.com"
        error={!!errors.email}
        helperText={getTranslatedError(errors.email?.message)}
        fullWidth
        dir="ltr"
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <MuiTelInput
            {...field}
            defaultCountry="SA"
            label={t("phone")}
            error={!!errors.phone}
            helperText={getTranslatedError(errors.phone?.message)}
            fullWidth
            dir="ltr"
          />
        )}
      />

      <Controller
        name="date_of_birth"
        control={control}
        render={({ field }) => (
          <DatePicker
            label={t("dateOfBirth")}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) =>
              field.onChange(date ? dayjs(date).format("YYYY-MM-DD") : "")
            }
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.date_of_birth,
                helperText: getTranslatedError(
                  errors.date_of_birth?.message,
                ),
              },
            }}
            maxDate={dayjs()}
          />
        )}
      />

      <Controller
        name="nationality"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={countries}
            getOptionLabel={(option: Country) =>
              `${option.flag} ${locale === "ar" ? option.name_ar : option.name_en}`
            }
            value={countries.find((c) => c.code === field.value) ?? null}
            onChange={(_e, newValue) => {
              field.onChange(newValue?.code ?? "");
            }}
            renderOption={(props, option) => {
              const { key, ...rest } =
                props as React.HTMLAttributes<HTMLLIElement> & { key: string };
              return (
                <Box component="li" key={key} {...rest} sx={{ gap: 1 }}>
                  <span>{option.flag}</span>
                  <span>
                    {locale === "ar" ? option.name_ar : option.name_en}
                  </span>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("nationality")}
                error={!!errors.nationality}
                helperText={getTranslatedError(errors.nationality?.message)}
              />
            )}
            fullWidth
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.gender}>
            <FormLabel>{t("gender")}</FormLabel>
            <RadioGroup {...field} row>
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={t("male")}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={t("female")}
              />
            </RadioGroup>
            {errors.gender && (
              <FormHelperText>
                {getTranslatedError(errors.gender.message)}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <TextField
        {...register("password")}
        label={t("password")}
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        helperText={getTranslatedError(errors.password?.message)}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        {...register("password_confirmation")}
        label={t("confirmPassword")}
        type={showConfirmPassword ? "text" : "password"}
        error={!!errors.password_confirmation}
        helperText={getTranslatedError(errors.password_confirmation?.message)}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={registerMutation.isPending}
        sx={{
          py: 1.5,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        {registerMutation.isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          t("register")
        )}
      </Button>
    </Box>
    </LocalizationProvider>
  );
}
