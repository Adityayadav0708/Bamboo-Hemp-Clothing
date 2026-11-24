"use client";
import { useState, useEffect } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutSummary from "@/components/CheckoutSummary";
import EmptyState from "@/components/EmptyState";
import ErrorMessage from "@/components/ErrorMessage";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { getCheckoutQuote, placeOrder } from "@/services/api/orderService";
import { addAddress as addAddressAPI } from "@/services/api/addressService";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateRequired,
  validatePincode,
} from "@/utils/validators";
import styles from "./CheckoutPageClient.module.css";

function addressToFormFields(addr, fallbackUser) {
  if (!addr) return {};
  return {
    name: addr.recipientName || fallbackUser?.fullName || fallbackUser?.name || "",
    phone: (addr.phone || fallbackUser?.phone || "").replace(/\D/g, "").slice(-10),
    addressLine1: addr.addressLine1 || "",
    addressLine2: addr.addressLine2 || "",
    city: addr.city || "",
    state: addr.state || "",
    pincode: addr.postalCode || "",
  };
}

export default function CheckoutPageClient() {
  const { items, subtotal, couponCode, clearCart } = useCart();
  const { user, isAuthenticated, syncAddresses } = useAuth();

  const savedAddresses = user?.addresses || [];
  const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0] || null;

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [formOverrides, setFormOverrides] = useState({});
  const [saveAddressToAccount, setSaveAddressToAccount] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const activeAddressId =
    selectedAddressId ?? (defaultAddr ? defaultAddr._id || defaultAddr.id : "new");

  const activeSavedAddr =
    activeAddressId !== "new"
      ? savedAddresses.find((a) => (a._id || a.id) === activeAddressId) || defaultAddr
      : null;

  const baseDefaults = activeSavedAddr
    ? {
        email: user?.email || "",
        ...addressToFormFields(activeSavedAddr, user),
      }
    : {
        email: user?.email || "",
        name: user?.fullName || user?.name || "",
        phone: (user?.phone || "").replace(/\D/g, "").slice(-10),
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
      };

  const formData = {
    email: formOverrides.email ?? baseDefaults.email ?? "",
    phone: formOverrides.phone ?? baseDefaults.phone ?? "",
    name: formOverrides.name ?? baseDefaults.name ?? "",
    addressLine1: formOverrides.addressLine1 ?? baseDefaults.addressLine1 ?? "",
    addressLine2: formOverrides.addressLine2 ?? baseDefaults.addressLine2 ?? "",
    city: formOverrides.city ?? baseDefaults.city ?? "",
    state: formOverrides.state ?? baseDefaults.state ?? "",
    pincode: formOverrides.pincode ?? baseDefaults.pincode ?? "",
  };

  // Fetch authoritative backend quote whenever cart items, coupon, delivery, or payment change
  useEffect(() => {
    if (!items.length) return;
    let cancelled = false;
    getCheckoutQuote({ items, couponCode, deliveryMethod, paymentMethod })
      .then((q) => {
        if (!cancelled && q) setQuote(q);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [items, couponCode, deliveryMethod, paymentMethod]);

  const activeQuote = items.length ? quote : null;

  const localDiscount = (() => {
    const code = (couponCode || "").toUpperCase();
    if ((code === "WELCOME10" || code === "BAMBOO10") && subtotal >= 999) {
      return Math.round(subtotal * 0.1);
    }
    if (code === "HEMP20" && subtotal >= 1999) {
      return Math.round(subtotal * 0.2);
    }
    return 0;
  })();

  const discount = activeQuote?.discountRupees ?? localDiscount;
  const isFreeStandard = Math.max(0, subtotal - discount) >= 999;
  const deliveryFee =
    activeQuote?.shippingFeeRupees ?? (deliveryMethod === "express" ? 149 : isFreeStandard ? 0 : 99);
  const codFee = activeQuote?.codFeeRupees ?? (paymentMethod === "cod" ? 49 : 0);
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + codFee);

  function handleSelectSavedAddress(addr) {
    const id = addr._id || addr.id;
    setSelectedAddressId(id);
    setErrors({});
    setFormOverrides({});
  }

  function handleUseNewAddress() {
    setSelectedAddressId("new");
    setFormOverrides({
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    });
  }

  function handleChange(field, value) {
    setFormOverrides((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
    if (submitError) setSubmitError("");
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
    setSubmitError("");
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
        guestEmail: formData.email.trim(),
        address: {
          recipientName: formData.name.trim(),
          addressLine1: formData.addressLine1.trim(),
          addressLine2: formData.addressLine2.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          postalCode: formData.pincode.trim(),
          country: "India",
          phone: formData.phone.trim(),
        },
        deliveryMethod,
        paymentMethod,
        couponCode,
        total: finalTotal,
      };

      const res = await placeOrder(orderPayload);

      if (isAuthenticated && activeAddressId === "new" && saveAddressToAccount) {
        try {
          const savedResult = await addAddressAPI(orderPayload.address);
          if (savedResult?.addresses) {
            syncAddresses(savedResult.addresses);
          }
        } catch {
          // Non-blocking
        }
      }

      setPlacedOrder({
        orderId: res.orderId,
        isLiveOrder: res.isLiveOrder,
        items: [...items],
        total: res.order?.total ?? finalTotal,
        paymentMethod,
        shippingAddress: {
          ...formData,
        },
      });
      clearCart();
    } catch (err) {
      setSubmitError(err.message || "Something went wrong while placing your order.");
      window.scrollTo({ top: 100, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  }

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

  if (placedOrder) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.successBadge}>✓ Order Placed</div>
            <h1 className={styles.successTitle}>Thank You for Your Order!</h1>
            <p className={styles.orderId}>
              Order Number: <strong>#{placedOrder.orderId}</strong>
            </p>
            <p className={styles.successText}>
              Your order has been recorded under <strong>{placedOrder.shippingAddress.email}</strong>.
            </p>

            {placedOrder.paymentMethod !== "cod" && (
              <div className={styles.mockNotice}>
                ℹ️ <strong>Payment Gateway Notice:</strong> Order created with status <em>Pending</em>; live online payment capture will activate after payment gateway provider confirmation.
              </div>
            )}

            <div className={styles.orderSummaryBox}>
              <h3>Shipping to:</h3>
              <p>
                <strong>{placedOrder.shippingAddress.name}</strong><br />
                {placedOrder.shippingAddress.addressLine1}
                {placedOrder.shippingAddress.addressLine2 ? `, ${placedOrder.shippingAddress.addressLine2}` : ""}<br />
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

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

        <h1 className={styles.heading}>Checkout</h1>

        {submitError && (
          <div style={{ marginBottom: "1.5rem" }}>
            <ErrorMessage message={submitError} onRetry={() => setSubmitError("")} />
          </div>
        )}

        <div className={styles.grid}>
          <div className={styles.formCol}>
            {isAuthenticated && savedAddresses.length > 0 && (
              <div className={styles.savedAddressBar}>
                <div className={styles.savedAddressHead}>
                  <strong>Saved Shipping Addresses</strong>
                  <button
                    type="button"
                    className={styles.newAddrBtn}
                    onClick={handleUseNewAddress}
                  >
                    + Use a different address
                  </button>
                </div>
                <div className={styles.savedAddressList}>
                  {savedAddresses.map((addr) => {
                    const addrId = addr._id || addr.id;
                    const isSelected = activeAddressId === addrId;
                    return (
                      <button
                        key={addrId}
                        type="button"
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`${styles.savedAddressCard} ${isSelected ? styles.savedAddressActive : ""}`}
                      >
                        <div className={styles.savedAddrTop}>
                          <strong>{addr.recipientName}</strong>
                          {addr.isDefault && <span className={styles.defaultTag}>Default</span>}
                        </div>
                        <span>
                          {addr.addressLine1}, {addr.city} - {addr.postalCode}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {isAuthenticated && activeAddressId === "new" && (
              <label className={styles.saveAddressCheck}>
                <input
                  type="checkbox"
                  checked={saveAddressToAccount}
                  onChange={(e) => setSaveAddressToAccount(e.target.checked)}
                />
                <span>Save this shipping address to my account</span>
              </label>
            )}

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
              discount={discount}
              couponCode={couponCode}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
