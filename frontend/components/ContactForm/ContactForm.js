"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { validateName, validateEmail, validateRequired } from "@/utils/validators";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(field, val) {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    const n = validateName(formData.name);
    const em = validateEmail(formData.email);
    const msg = validateRequired(formData.message, "Message");

    if (n) errs.name = n;
    if (em) errs.email = em;
    if (msg) errs.message = msg;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    // Simulate sending inquiry
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return (
      <div className={styles.successBox}>
        <span className={styles.successIcon}>🌿</span>
        <h3 className={styles.successTitle}>Message Received</h3>
        <p className={styles.successMsg}>
          Thank you, <strong>{formData.name}</strong>. Our customer care team will get back to you at <strong>{formData.email}</strong> within 24 hours.
        </p>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "Order Inquiry", message: "" });
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.grid2}>
        <FormInput
          id="name"
          label="Your Name"
          placeholder="e.g. Priyanshi Mehta"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          required
        />

        <FormInput
          id="email"
          label="Your Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="subject" className={styles.label}>
          Subject
        </label>
        <select
          id="subject"
          className={styles.select}
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
        >
          <option value="Order Inquiry">Order Inquiry / Tracking</option>
          <option value="Size & Fit Advice">Size &amp; Fit Advice</option>
          <option value="Returns & Exchanges">Returns &amp; Exchanges</option>
          <option value="Fabric & Sustainability">Fabric &amp; Sustainability Question</option>
          <option value="Partnership / Bulk">Partnership / Bulk Orders</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="message" className={styles.label}>
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${styles.textarea} ${errors.message ? styles.textareaError : ""}`}
          placeholder="How can we assist you with our natural apparel?"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
        />
        {errors.message && <p className={styles.error}>{errors.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={loading}
      >
        Send Message
      </Button>
    </form>
  );
}
