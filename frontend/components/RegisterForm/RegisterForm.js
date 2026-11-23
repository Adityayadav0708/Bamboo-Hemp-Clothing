"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/utils/validators";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const router = useRouter();
  const { register, error, clearError, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
    if (error) clearError();
  }

  function getPasswordStrength(pass) {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  }

  const strength = getPasswordStrength(formData.password);

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    const nameErr = validateName(formData.name);
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);
    const confirmErr = validateConfirmPassword(formData.password, formData.confirmPassword);

    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (passErr) errors.password = passErr;
    if (confirmErr) errors.confirmPassword = confirmErr;
    if (!formData.agreeTerms) {
      errors.agreeTerms = "You must agree to the Terms & Conditions and Privacy Policy.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const res = await register(formData.name, formData.email, formData.password);
    if (res.success) {
      router.push("/account");
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>🌿 Join the Community</span>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>
          Sign up for a better, more natural wardrobe experience.
        </p>
      </div>

      {error && (
        <div className={styles.errorWrap}>
          <ErrorMessage message={error} onRetry={clearError} />
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <FormInput
          id="name"
          label="Full Name"
          type="text"
          placeholder="e.g. Rahul Sharma"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={fieldErrors.name}
          required
          autoComplete="name"
        />

        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={fieldErrors.email}
          required
          autoComplete="email"
        />

        <div>
          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={fieldErrors.password}
            required
            autoComplete="new-password"
          />

          {formData.password && (
            <div className={styles.strengthWrap}>
              <div className={styles.strengthBar}>
                <div
                  className={`${styles.strengthFill} ${
                    strength <= 1
                      ? styles.strengthWeak
                      : strength <= 2
                      ? styles.strengthMedium
                      : styles.strengthStrong
                  }`}
                  style={{ width: `${(strength / 4) * 100}%` }}
                />
              </div>
              <span className={styles.strengthLabel}>
                {strength <= 1 ? "Weak" : strength <= 2 ? "Medium" : "Strong password"}
              </span>
            </div>
          )}
        </div>

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          error={fieldErrors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <div className={styles.termsWrap}>
          <label className={styles.termsLabel}>
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => handleChange("agreeTerms", e.target.checked)}
              className={styles.checkbox}
            />
            <span>
              I agree to the{" "}
              <Link href="/terms-and-conditions" className={styles.legalLink} target="_blank">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className={styles.legalLink} target="_blank">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {fieldErrors.agreeTerms && (
            <p className={styles.termsError} role="alert">
              {fieldErrors.agreeTerms}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Create Account
        </Button>
      </form>

      <div className={styles.footer}>
        <p>
          Already have an account?{" "}
          <Link href="/login" className={styles.switchLink}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
