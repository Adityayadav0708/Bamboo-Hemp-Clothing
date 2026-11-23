"use client";
import { useState } from "react";
import Link from "next/link";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { forgotPassword } from "@/services/api/authService";
import { validateEmail } from "@/utils/validators";
import styles from "./ForgotPasswordForm.module.css";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await forgotPassword({ email });
      setSubmitted(true);
    } catch (apiErr) {
      setError(apiErr.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>🔒 Account Recovery</span>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle}>
          Enter your registered email and we will send you password reset instructions.
        </p>
      </div>

      {submitted ? (
        <div className={styles.successState}>
          <span className={styles.successIcon}>✉️</span>
          <h2 className={styles.successHeading}>Check Your Inbox</h2>
          <p className={styles.successMsg}>
            If an account exists for <strong>{email}</strong>, you will receive an email with instructions on how to reset your password.
          </p>
          <div className={styles.successActions}>
            <Button href="/login" variant="primary" size="md" fullWidth>
              Return to Sign In
            </Button>
            <button
              type="button"
              className={styles.resendBtn}
              onClick={() => { setSubmitted(false); setEmail(""); }}
            >
              Try another email
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <FormInput
            id="email"
            label="Registered Email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null); }}
            error={error}
            required
            autoComplete="email"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Send Reset Link
          </Button>
        </form>
      )}

      <div className={styles.footer}>
        <Link href="/login" className={styles.backLink}>
          ← Back to Sign In
        </Link>
      </div>
    </div>
  );
}
