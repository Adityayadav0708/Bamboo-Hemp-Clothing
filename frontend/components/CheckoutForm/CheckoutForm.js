"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import styles from "./CheckoutForm.module.css";

const PAYMENT_METHODS = [
  {
    id: "upi",
    name: "UPI / QR Code",
    desc: "Google Pay, PhonePe, Paytm, BHIM",
    icon: "📱",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    desc: "Visa, Mastercard, RuPay, Amex",
    icon: "💳",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    desc: "All major Indian banks supported",
    icon: "🏦",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    desc: "Pay in cash when order arrives (+₹49 COD fee)",
    icon: "💵",
  },
];

export default function CheckoutForm({
  formData,
  errors,
  onChange,
  deliveryMethod,
  onDeliveryMethodChange,
  paymentMethod,
  onPaymentMethodChange,
  onSubmit,
  loading,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      {/* 1. Contact Information */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.stepNum}>1</span>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
        </div>

        <div className={styles.fieldsGrid}>
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            error={errors.email}
            required
            autoComplete="email"
          />

          <FormInput
            id="phone"
            label="Phone Number (10 digits)"
            type="tel"
            placeholder="9876543210"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            error={errors.phone}
            required
            autoComplete="tel"
          />
        </div>
      </section>

      {/* 2. Shipping Address */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.stepNum}>2</span>
          <h2 className={styles.sectionTitle}>Shipping Address</h2>
        </div>

        <div className={styles.fieldsCol}>
          <FormInput
            id="name"
            label="Full Name"
            placeholder="Recipient's Name"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            error={errors.name}
            required
            autoComplete="name"
          />

          <FormInput
            id="addressLine1"
            label="Flat, House no., Building, Street"
            placeholder="House/Flat No., Road/Street"
            value={formData.addressLine1}
            onChange={(e) => onChange("addressLine1", e.target.value)}
            error={errors.addressLine1}
            required
            autoComplete="street-address"
          />

          <FormInput
            id="addressLine2"
            label="Apartment, Landmark, Suite (Optional)"
            placeholder="Near Landmark..."
            value={formData.addressLine2}
            onChange={(e) => onChange("addressLine2", e.target.value)}
          />

          <div className={styles.fieldsGrid3}>
            <FormInput
              id="city"
              label="City"
              placeholder="e.g. Bengaluru"
              value={formData.city}
              onChange={(e) => onChange("city", e.target.value)}
              error={errors.city}
              required
            />

            <FormInput
              id="state"
              label="State"
              placeholder="e.g. Karnataka"
              value={formData.state}
              onChange={(e) => onChange("state", e.target.value)}
              error={errors.state}
              required
            />

            <FormInput
              id="pincode"
              label="Pincode (6 digits)"
              placeholder="560001"
              value={formData.pincode}
              onChange={(e) => onChange("pincode", e.target.value)}
              error={errors.pincode}
              required
            />
          </div>
        </div>
      </section>

      {/* 3. Delivery Method */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.stepNum}>3</span>
          <h2 className={styles.sectionTitle}>Delivery Method</h2>
        </div>

        <div className={styles.deliveryOptions}>
          <label
            className={`${styles.deliveryOption} ${
              deliveryMethod === "standard" ? styles.deliveryActive : ""
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value="standard"
              checked={deliveryMethod === "standard"}
              onChange={() => onDeliveryMethodChange("standard")}
              className={styles.radio}
            />
            <div className={styles.deliveryDetails}>
              <strong>Standard Delivery (3-5 business days)</strong>
              <span>Eco-friendly packaging</span>
            </div>
            <span className={styles.deliveryPrice}>Free over ₹999</span>
          </label>

          <label
            className={`${styles.deliveryOption} ${
              deliveryMethod === "express" ? styles.deliveryActive : ""
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value="express"
              checked={deliveryMethod === "express"}
              onChange={() => onDeliveryMethodChange("express")}
              className={styles.radio}
            />
            <div className={styles.deliveryDetails}>
              <strong>Express Delivery (1-2 business days)</strong>
              <span>Priority handling</span>
            </div>
            <span className={styles.deliveryPrice}>+₹149</span>
          </label>
        </div>
      </section>

      {/* 4. Payment Method */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.stepNum}>4</span>
          <h2 className={styles.sectionTitle}>Payment Method</h2>
        </div>

        {/* Company Disclaimer Notice */}
        <div className={styles.paymentDisclaimer}>
          ⚠️ <strong>Integration Notice:</strong> Payment gateway will be implemented after company confirms provider (Razorpay / PayU / Stripe). No real monetary transaction will take place during development.
        </div>

        <div className={styles.paymentList}>
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.id}
              className={`${styles.paymentOption} ${
                paymentMethod === method.id ? styles.paymentActive : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={() => onPaymentMethodChange(method.id)}
                className={styles.radio}
              />
              <span className={styles.paymentIcon}>{method.icon}</span>
              <div className={styles.paymentText}>
                <strong>{method.name}</strong>
                <span>{method.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Submit Button */}
      <div className={styles.submitWrap}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Place Order
        </Button>
        <p className={styles.legalNotice}>
          By placing your order, you agree to our Terms &amp; Conditions and Return Policy.
        </p>
      </div>
    </form>
  );
}
