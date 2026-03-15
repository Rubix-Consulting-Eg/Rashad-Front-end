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
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiTelInput } from "mui-tel-input";
import { Eye, EyeOff, Mail, User, Globe, Calendar } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";
import { authApi } from "@/lib/api/auth";
import { countries, type Country } from "@/lib/data/countries";
import { useAuth } from "@/lib/auth/AuthContext";
import { OtpVerification } from "./OtpInput";
import { AppButton } from "@/components/shared/AppButton";

type Step = "form" | "otp";

function SectionHeader({ title }: { title: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 2,
        mt: 2.5,
      }}
    >
      <Typography
        component="span"
        sx={{
          color: "primary.main",
          fontWeight: 600,
          fontSize: "0.8rem",
          whiteSpace: "nowrap",
          letterSpacing: "0.03em",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          flex: 1,
          height: "1px",
          backgroundColor: "primary.main",
          opacity: 0.5,
        }}
      />
    </Box>
  );
}

export function RegisterForm() {
  const t = useTranslations("auth");
  const theme = useTheme();
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
      authApi.register({ ...data, phone: data.phone.replace(/\s/g, "") }),
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

  const onSubmit = (data: RegisterFormValues) => registerMutation.mutate(data);
  const handleOtpComplete = (otp: string) => verifyMutation.mutate(otp);
  const handleResendOtp = async () => {
    await authApi.sendOtp(email);
    toast.success(t("otpSent"));
  };

  const getError = (msg: string | undefined) => {
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
        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        {/* Card header */}
        <Box sx={{ textAlign: "center", mb: 1.5 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
          >
            {t("registerTitle")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("registerSubtitle")}
          </Typography>
        </Box>

        {/* ── Personal information ── */}
        <SectionHeader title={t("personalInfo")} />

        <TextField
          {...register("full_name_en")}
          placeholder={t("fullNameEn")}
          error={!!errors.full_name_en}
          helperText={getError(errors.full_name_en?.message)}
          fullWidth
          inputProps={{ dir: "ltr" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <User size={17} color={theme.palette.text.secondary} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 1.5 }}
        />

        <TextField
          {...register("full_name_ar")}
          placeholder={t("fullNameAr")}
          error={!!errors.full_name_ar}
          helperText={getError(errors.full_name_ar?.message)}
          fullWidth
          inputProps={{ dir: "rtl" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <User size={17} color={theme.palette.text.secondary} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 1.5 }}
        />

        {/* ── Account Access ── */}
        <SectionHeader title={t("accountAccess")} />

        <TextField
          {...register("email")}
          type="email"
          placeholder={t("enterWorkEmail")}
          error={!!errors.email}
          helperText={getError(errors.email?.message)}
          fullWidth
          dir="ltr"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={17} color={theme.palette.text.secondary} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 1.5 }}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <MuiTelInput
              {...field}
              defaultCountry="SA"
              placeholder={t("enterPhone")}
              error={!!errors.phone}
              helperText={getError(errors.phone?.message)}
              fullWidth
              dir="ltr"
              sx={{ mb: 1.5 }}
            />
          )}
        />

        {/* Password fields side by side */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            mb: 1.5,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            {...register("password")}
            placeholder={t("password")}
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={getError(errors.password?.message)}
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            {...register("password_confirmation")}
            placeholder={t("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            error={!!errors.password_confirmation}
            helperText={getError(errors.password_confirmation?.message)}
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* ── Additional information ── */}
        <SectionHeader title={t("additionalInfo")} />

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
              onChange={(_e, newValue) => field.onChange(newValue?.code ?? "")}
              renderOption={(props, option) => {
                const { key, ...rest } =
                  props as React.HTMLAttributes<HTMLLIElement> & {
                    key: string;
                  };
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
                  placeholder={t("selectNationality")}
                  error={!!errors.nationality}
                  helperText={getError(errors.nationality?.message)}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <Globe
                              size={17}
                              color={theme.palette.text.secondary}
                            />
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
              fullWidth
              sx={{ mb: 1.5 }}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.gender} sx={{ mb: 1.5 }}>
              <FormLabel
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  mb: 0.5,
                }}
              >
                {t("gender")}{" "}
                <Box component="span" sx={{ color: "error.main" }}>
                  *
                </Box>
              </FormLabel>
              <RadioGroup {...field} row sx={{ gap: 1 }}>
                {(["male", "female"] as const).map((val) => (
                  <FormControlLabel
                    key={val}
                    value={val}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "text.secondary",
                          "&.Mui-checked": { color: "primary.main" },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary" }}
                      >
                        {t(val)}
                      </Typography>
                    }
                  />
                ))}
              </RadioGroup>
              {errors.gender && (
                <FormHelperText>
                  {getError(errors.gender.message)}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Terms checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              sx={{
                color: "text.secondary",
                "&.Mui-checked": { color: "primary.main" },
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {t("agreeTermsPrefix")}{" "}
              <Box
                component={Link}
                href="/terms"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {t("termsOfService")}
              </Box>{" "}
              {t("and")}{" "}
              <Box
                component={Link}
                href="/privacy"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {t("privacyPolicy")}
              </Box>
            </Typography>
          }
          sx={{ mb: 2.5, alignItems: "flex-start", mt: 0.5 }}
        />

        <AppButton
          type="submit"
          fullWidth
          loading={registerMutation.isPending}
          sx={{ py: 1.5, fontSize: "1rem", borderRadius: 2 }}
        >
          {t("createAccount")}
        </AppButton>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "text.secondary", mt: 2 }}
        >
          {t("haveAccount")}{" "}
          <Box
            component={Link}
            href="/login"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {t("loginNow")}
          </Box>
        </Typography>
      </Box>
    </LocalizationProvider>
  );
}
