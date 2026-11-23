"use client";
import { useState } from "react";
import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutSummary from "@/components/CheckoutSummary";
import EmptyState from "@/components/EmptyState";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { placeOrder } from "@/services/api/orderService";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateRequired,
  validatePincode,
} from "@/utils/validators";
import styles from "./CheckoutPageClient.module.css";

export default function CheckoutPageClient() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: "",
    name: user?.name || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // Calculations
  const isFreeStandard = subtotal >= 999;
  const deliveryFee = deliveryMethod === "express" ? 149 : isFreeStandard ? 0 : 99;
  const codFee = paymentMethod === "cod" ? 49 : 0;

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function validateCheckout() {
    const errs = {};
    const e = validateEmail(formData.email);
    const p = validatePhone(formData.phone);
    const n = validateName(formData.name);
    const a1 = validateRequired(formData.addressLine1, "Street address");
    const c = validateRequired(formData.city, "City");
    const s = validateRequired(formData.state, "State");
    const pin = validatePincode(formData.pincode);

    if (e) errs.email = e;
    if (p) errs.phone = p;
    if (n) errs.name = n;
    if (a1) errs.addressLine1 = a1;
    if (c) errs.city = c;
    if (s) errs.state = s;
    if (pin) errs.pincode = pin;

    return errs;
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    const validationErrors = validateCheckout();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        items,
        shippingAddress: { ...formData },
        deliveryMethod,
        paymentMethod,
        subtotal,
        deliveryFee,
        codFee,
        total: subtotal + deliveryFee + codFee,
      };

      const res = await placeOrder(orderPayload);
      setPlacedOrder({
        orderId: res.orderId || `BH-${Date.now().toString().slice(-6)}`,
        items: [...items],
        total: subtotal + deliveryFee + codFee,
        shippingAddress: { ...formData },
      });
      clearCart();
    } catch (err) {
      alert(err.message || "Something went wrong while placing order.");
    } finally {
      setLoading(false);
    }
  }

  // 1. Empty Cart State
  if (items.length === 0 && !placedOrder) {
    return (
      <div className={styles.emptyPage}>
        <div className={styles.container}>
          <Breadcrumb items={[{ label: "Checkout" }]} />
          <EmptyState
            icon="🛍️"
            title="Your Cart is Empty"
            message="Add some bamboo or hemp clothing to your bag before checking out."
            ctaLabel="Go to Shop"
            ctaHref="/shop"
          />
        </div>
      </div>
    );
  }

  // 2. Order Success Confirmation State
  if (placedOrder) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.successBadge}>✓ Order Confirmed</div>
            <h1 className={styles.successTitle}>Thank You for Your Order!</h1>
            <p className={styles.orderId}>
              Order Number: <strong>#{placedOrder.orderId}</strong>
            </p>
            <p className={styles.successText}>
              A confirmation email has been sent to <strong>{placedOrder.shippingAddress.email}</strong>.
            </p>

            <div className={styles.mockNotice}>
              ⚠️ <strong>Development Notice:</strong> This is a confirmed mock order in our prototype environment. No live payment gateway transaction occurred.
            </div>

            <div className={styles.orderSummaryBox}>
              <h3>Shipping to:</h3>
              <p>
                <strong>{placedOrder.shippingAddress.name}</strong><br />
                {placedOrder.shippingAddress.addressLine1}<br />
                {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} - {placedOrder.shippingAddress.pincode}<br />
                Phone: {placedOrder.shippingAddress.phone}
              </p>
            </div>

            <div className={styles.successActions}>
              <Button href="/account/orders" variant="primary" size="lg">
                View in Order History
              </Button>
              <Button href="/shop" variant="outline" size="lg">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Regular Checkout View
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

        <h1 className={styles.heading}>Checkout</h1>

        <div className={styles.grid}>
          <div className={styles.formCol}>
            <CheckoutForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              deliveryMethod={deliveryMethod}
              onDeliveryMethodChange={setDeliveryMethod}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              onSubmit={handlePlaceOrder}
              loading={loading}
            />
          </div>

          <aside className={styles.summaryCol} aria-label="Order summary">
            <CheckoutSummary
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              codFee={codFee}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
