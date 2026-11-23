"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validatePassword } from "@/utils/validators";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const { login, error, clearError, loading } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(true);
  const [socialLoading, setSocialLoading] = useState(null);

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
    if (error) clearError();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);

    if (emailErr) errors.email = emailErr;
    if (passErr) errors.password = passErr;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const res = await login(formData.email, formData.password);
    if (res.success) {
      router.push("/account");
    }
  }

  async function handleSocialLogin(provider) {
    setSocialLoading(provider);
    clearError();
    // Simulate instant secure OAuth flow
    setTimeout(async () => {
      const email = provider === "google" ? "member@gmail.com" : "shopper@bamboohemp.in";
      const res = await login(email, "SecurePass123!");
      setSocialLoading(null);
      if (res.success) {
        router.push("/account");
      }
    }, 600);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>MEMBER ACCESS</span>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          Sign in to access your orders, saved addresses, and member-exclusive perks.
        </p>
      </div>

      {error && (
        <div className={styles.errorWrap}>
          <ErrorMessage message={error} onRetry={clearError} />
        </div>
      )}

      {/* Social Login Options */}
      <div className={styles.socialGroup}>
        <button
          type="button"
          className={styles.socialBtn}
          onClick={() => handleSocialLogin("google")}
          disabled={loading || !!socialLoading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className={styles.socialIcon} aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{socialLoading === "google" ? "Connecting..." : "Continue with Google"}</span>
        </button>

        <button
          type="button"
          className={styles.socialBtnSecondary}
          onClick={() => handleSocialLogin("otp")}
          disabled={loading || !!socialLoading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          <span>{socialLoading === "otp" ? "Sending code..." : "Sign in with OTP"}</span>
        </button>
      </div>

      <div className={styles.divider}>
        <span className={styles.dividerLine}></span>
        <span className={styles.dividerText}>or continue with email</span>
        <span className={styles.dividerLine}></span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="e.g. name@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={fieldErrors.email}
          required
          autoComplete="email"
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={fieldErrors.password}
          required
          autoComplete="current-password"
        />

        <div className={styles.optionsRow}>
          <label className={styles.remember}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={styles.checkbox}
            />
            <span>Remember this device</span>
          </label>

          <Link href="/forgot-password" className={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Sign In
        </Button>
      </form>

      {/* Security Reassurance */}
      <div className={styles.securityBadge}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>256-Bit SSL Encrypted & Protected Session</span>
      </div>

      <div className={styles.footer}>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.switchLink}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
