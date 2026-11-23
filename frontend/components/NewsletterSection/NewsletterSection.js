"use client";
import { useState } from "react";
import styles from "./NewsletterSection.module.css";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <section className={styles.section} aria-labelledby="newsletter-heading">
      <div className={styles.container}>
        <div className={styles.card}>
          <span className={styles.eyebrow}>STAY CONNECTED</span>
          <h2 id="newsletter-heading" className={styles.heading}>
            Sign Up for 15% Off Your First Order
          </h2>
          <p className={styles.sub}>
            Be the first to hear about new bamboo &amp; hemp arrivals, climate-ready fabric innovations, and exclusive multi-pack drops.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputRow}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                className={styles.input}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                autoComplete="email"
                required
              />
              <button type="submit" className={styles.submitBtn}>
                Subscribe
              </button>
            </div>

            {status === "success" && (
              <p className={styles.success} role="alert">
                ✓ Thank you for subscribing! Your 15% coupon has been sent.
              </p>
            )}
            {status === "error" && (
              <p className={styles.error} role="alert">
                Please enter a valid email address.
              </p>
            )}
          </form>

          <p className={styles.disclaimer}>
            By signing up, you agree to our Privacy Policy. Zero spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
