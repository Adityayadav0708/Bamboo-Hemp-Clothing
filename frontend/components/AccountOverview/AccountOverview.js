"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AccountLayout from "@/components/AccountLayout";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { getUserOrders } from "@/services/api/orderService";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "@/services/api/addressService";
import { formatPrice, formatDate } from "@/utils/formatters";
import { validateName, validatePhone, validateShippingAddress } from "@/utils/validators";
import styles from "./AccountOverview.module.css";

const EMPTY_ADDRESS = {
  recipientName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault: false,
};

export default function AccountOverview() {
  const { user, updateProfile, syncAddresses } = useAuth();
  const [ordersState, setOrdersState] = useState({ loadedForId: null, list: [] });

  // Profile editor state
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ fullName: "", phone: "" });
  const [profileErrors, setProfileErrors] = useState({});
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileNotice, setProfileNotice] = useState(null);

  // Address manager state
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);
  const [addressErrors, setAddressErrors] = useState({});
  const [addressSaving, setAddressSaving] = useState(false);
  const [addressNotice, setAddressNotice] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const uid = user?.id;
    if (!uid) return;
    let cancelled = false;

    getUserOrders()
      .then((list) => {
        if (!cancelled) {
          setOrdersState({ loadedForId: uid, list: Array.isArray(list) ? list : [] });
        }
      })
      .catch(() => {
        if (!cancelled) setOrdersState({ loadedForId: uid, list: [] });
      });

    getAddresses()
      .then((list) => {
        if (!cancelled && Array.isArray(list)) syncAddresses(list);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [user?.id, syncAddresses]);

  const orders = ordersState.list;
  const ordersLoading = Boolean(user?.id) && ordersState.loadedForId !== user.id;

  function toggleProfileEditor() {
    setEditingProfile((prev) => {
      const next = !prev;
      if (next) {
        setProfileForm({
          fullName: user?.fullName || user?.name || "",
          phone: user?.phone || "",
        });
      }
      return next;
    });
    setProfileErrors({});
    setProfileNotice(null);
  }

  async function handleSaveProfile(e) {
    e.preventDefault();
    setProfileNotice(null);
    const errs = {};
    const nameErr = validateName(profileForm.fullName);
    if (nameErr) errs.fullName = nameErr;

    if (profileForm.phone && profileForm.phone.trim()) {
      const cleaned = profileForm.phone.replace(/^\+91[\s-]?/, "").replace(/\D/g, "");
      const phoneErr = validatePhone(cleaned);
      if (phoneErr) errs.phone = phoneErr;
    }

    if (Object.keys(errs).length > 0) {
      setProfileErrors(errs);
      return;
    }

    setProfileSaving(true);
    try {
      await updateProfile({
        fullName: profileForm.fullName.trim(),
        phone: profileForm.phone.trim(),
      });
      setEditingProfile(false);
      setProfileNotice({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setProfileNotice({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setProfileSaving(false);
    }
  }

  function openNewAddressForm() {
    setEditingAddressId(null);
    setAddressErrors({});
    setAddressNotice(null);
    setAddressForm({
      ...EMPTY_ADDRESS,
      recipientName: user?.fullName || user?.name || "",
      phone: (user?.phone || "").replace(/^\+91[\s-]?/, "").replace(/\D/g, "").slice(-10),
      isDefault: (user?.addresses || []).length === 0,
    });
    setAddressFormOpen(true);
  }

  function openEditAddressForm(addr) {
    setEditingAddressId(addr._id || addr.id);
    setAddressErrors({});
    setAddressNotice(null);
    setAddressForm({
      recipientName: addr.recipientName || "",
      phone: (addr.phone || "").replace(/^\+91[\s-]?/, "").replace(/\D/g, "").slice(-10),
      addressLine1: addr.addressLine1 || "",
      addressLine2: addr.addressLine2 || "",
      city: addr.city || "",
      state: addr.state || "",
      postalCode: addr.postalCode || "",
      country: addr.country || "India",
      isDefault: Boolean(addr.isDefault),
    });
    setAddressFormOpen(true);
  }

  async function handleSaveAddress(e) {
    e.preventDefault();
    setAddressNotice(null);

    const validationErrs = validateShippingAddress({
      name: addressForm.recipientName,
      phone: addressForm.phone,
      addressLine1: addressForm.addressLine1,
      city: addressForm.city,
      state: addressForm.state,
      pincode: addressForm.postalCode,
    });
    if (Object.keys(validationErrs).length > 0) {
      setAddressErrors(validationErrs);
      return;
    }

    setAddressSaving(true);
    try {
      const result = editingAddressId
        ? await updateAddress(editingAddressId, addressForm)
        : await addAddress(addressForm);

      if (result?.addresses) {
        syncAddresses(result.addresses);
      }
      setAddressFormOpen(false);
      setEditingAddressId(null);
      setAddressNotice({
        type: "success",
        text: editingAddressId ? "Address updated successfully." : "New shipping address saved.",
      });
    } catch (err) {
      setAddressNotice({ type: "error", text: err.message || "Failed to save address." });
    } finally {
      setAddressSaving(false);
    }
  }

  async function handleSetDefaultAddress(addrId) {
    setAddressNotice(null);
    try {
      const result = await updateAddress(addrId, { isDefault: true });
      if (result?.addresses) syncAddresses(result.addresses);
      setAddressNotice({ type: "success", text: "Default shipping address updated." });
    } catch (err) {
      setAddressNotice({ type: "error", text: err.message || "Could not update default address." });
    }
  }

  async function handleDeleteAddress(addrId) {
    setAddressNotice(null);
    try {
      const result = await deleteAddress(addrId);
      if (result?.addresses) syncAddresses(result.addresses);
      setConfirmDeleteId(null);
      setAddressNotice({ type: "success", text: "Address removed." });
    } catch (err) {
      setAddressNotice({ type: "error", text: err.message || "Could not delete address." });
    }
  }

  const savedAddresses = user?.addresses || [];
  const recentOrders = orders.slice(0, 3);

  return (
    <AccountLayout activeTab="Dashboard">
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.title}>Account Dashboard</h1>
          <p className={styles.subtitle}>
            Manage your personal profile, saved shipping addresses, and live order history.
          </p>
        </div>
        <div className={styles.ecoBadge}>
          <span>🌱 Verified Member</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📦</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{ordersLoading ? "…" : orders.length}</span>
            <span className={styles.statLabel}>Total Orders</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statIcon}>📍</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{savedAddresses.length}</span>
            <span className={styles.statLabel}>Saved Addresses</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statIcon}>🚚</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>Free</span>
            <span className={styles.statLabel}>Delivery on Orders &gt; ₹999</span>
          </div>
        </div>
      </div>

      {/* Customer Profile Section */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Customer Profile</h2>
          <button
            type="button"
            className={styles.actionLinkBtn}
            onClick={toggleProfileEditor}
          >
            {editingProfile ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {profileNotice && (
          <div className={profileNotice.type === "success" ? styles.feedbackSuccess : styles.feedbackError}>
            {profileNotice.text}
          </div>
        )}

        {editingProfile ? (
          <form onSubmit={handleSaveProfile} noValidate>
            <div className={styles.formGrid2}>
              <FormInput
                id="profile-name"
                label="Full Name"
                value={profileForm.fullName}
                onChange={(e) => {
                  setProfileForm((p) => ({ ...p, fullName: e.target.value }));
                  setProfileErrors((er) => ({ ...er, fullName: null }));
                }}
                error={profileErrors.fullName}
                required
              />
              <FormInput
                id="profile-phone"
                label="Phone Number"
                type="tel"
                placeholder="10-digit mobile number"
                value={profileForm.phone}
                onChange={(e) => {
                  setProfileForm((p) => ({ ...p, phone: e.target.value }));
                  setProfileErrors((er) => ({ ...er, phone: null }));
                }}
                error={profileErrors.phone}
              />
            </div>
            <div className={styles.formActions}>
              <Button type="submit" variant="primary" size="md" loading={profileSaving} disabled={profileSaving}>
                Save Profile
              </Button>
            </div>
          </form>
        ) : (
          <div className={styles.profileDetails}>
            <div className={styles.profileField}>
              <span className={styles.fieldLabel}>Full Name</span>
              <span className={styles.fieldValue}>{user?.fullName || user?.name}</span>
            </div>
            <div className={styles.profileField}>
              <span className={styles.fieldLabel}>Email Address</span>
              <span className={styles.fieldValue}>{user?.email}</span>
            </div>
            <div className={styles.profileField}>
              <span className={styles.fieldLabel}>Phone Number</span>
              <span className={styles.fieldValue}>{user?.phone || "Not added yet"}</span>
            </div>
          </div>
        )}
      </section>

      {/* Saved Addresses CRUD Section */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Saved Shipping Addresses</h2>
          <button
            type="button"
            className={styles.actionLinkBtn}
            onClick={openNewAddressForm}
          >
            + Add New Address
          </button>
        </div>

        {addressNotice && (
          <div className={addressNotice.type === "success" ? styles.feedbackSuccess : styles.feedbackError}>
            {addressNotice.text}
          </div>
        )}

        {addressFormOpen && (
          <form onSubmit={handleSaveAddress} className={styles.addressFormCard} noValidate>
            <h3 className={styles.formSubheading}>
              {editingAddressId ? "Edit Shipping Address" : "Add New Shipping Address"}
            </h3>

            <div className={styles.formGrid2}>
              <FormInput
                id="addr-recipient"
                label="Recipient Full Name"
                value={addressForm.recipientName}
                onChange={(e) => {
                  setAddressForm((a) => ({ ...a, recipientName: e.target.value }));
                  setAddressErrors((er) => ({ ...er, name: null }));
                }}
                error={addressErrors.name}
                required
              />
              <FormInput
                id="addr-phone"
                label="Phone Number (10 digits)"
                type="tel"
                value={addressForm.phone}
                onChange={(e) => {
                  setAddressForm((a) => ({ ...a, phone: e.target.value }));
                  setAddressErrors((er) => ({ ...er, phone: null }));
                }}
                error={addressErrors.phone}
                required
              />
            </div>

            <FormInput
              id="addr-line1"
              label="Street Address / Flat / Building"
              value={addressForm.addressLine1}
              onChange={(e) => {
                setAddressForm((a) => ({ ...a, addressLine1: e.target.value }));
                setAddressErrors((er) => ({ ...er, addressLine1: null }));
              }}
              error={addressErrors.addressLine1}
              required
            />

            <FormInput
              id="addr-line2"
              label="Landmark / Apartment (Optional)"
              value={addressForm.addressLine2}
              onChange={(e) => setAddressForm((a) => ({ ...a, addressLine2: e.target.value }))}
            />

            <div className={styles.formGrid3}>
              <FormInput
                id="addr-city"
                label="City"
                value={addressForm.city}
                onChange={(e) => {
                  setAddressForm((a) => ({ ...a, city: e.target.value }));
                  setAddressErrors((er) => ({ ...er, city: null }));
                }}
                error={addressErrors.city}
                required
              />
              <FormInput
                id="addr-state"
                label="State"
                value={addressForm.state}
                onChange={(e) => {
                  setAddressForm((a) => ({ ...a, state: e.target.value }));
                  setAddressErrors((er) => ({ ...er, state: null }));
                }}
                error={addressErrors.state}
                required
              />
              <FormInput
                id="addr-pin"
                label="Pincode (6 digits)"
                value={addressForm.postalCode}
                onChange={(e) => {
                  setAddressForm((a) => ({ ...a, postalCode: e.target.value }));
                  setAddressErrors((er) => ({ ...er, pincode: null }));
                }}
                error={addressErrors.pincode}
                required
              />
            </div>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={addressForm.isDefault}
                onChange={(e) => setAddressForm((a) => ({ ...a, isDefault: e.target.checked }))}
              />
              <span>Set as default shipping address</span>
            </label>

            <div className={styles.formActions}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setAddressFormOpen(false);
                  setEditingAddressId(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" loading={addressSaving} disabled={addressSaving}>
                {editingAddressId ? "Update Address" : "Save Address"}
              </Button>
            </div>
          </form>
        )}

        {savedAddresses.length > 0 ? (
          <div className={styles.addressesGrid}>
            {savedAddresses.map((addr) => {
              const addrId = addr._id || addr.id;
              return (
                <div
                  key={addrId}
                  className={`${styles.addressCard} ${addr.isDefault ? styles.addressCardDefault : ""}`}
                >
                  <div className={styles.addressTop}>
                    <strong>{addr.recipientName}</strong>
                    {addr.isDefault && <span className={styles.defaultPill}>Default</span>}
                  </div>
                  <p className={styles.addressText}>
                    {addr.addressLine1}
                    {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                    <br />
                    {addr.city}, {addr.state} - {addr.postalCode}
                    <br />
                    {addr.country || "India"}
                    {addr.phone ? ` · ${addr.phone}` : ""}
                  </p>
                  <div className={styles.addressActions}>
                    {!addr.isDefault && (
                      <button
                        type="button"
                        className={styles.addrBtn}
                        onClick={() => handleSetDefaultAddress(addrId)}
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.addrBtn}
                      onClick={() => openEditAddressForm(addr)}
                    >
                      Edit
                    </button>
                    {confirmDeleteId === addrId ? (
                      <>
                        <button
                          type="button"
                          className={styles.addrBtnDanger}
                          onClick={() => handleDeleteAddress(addrId)}
                        >
                          Confirm Delete
                        </button>
                        <button
                          type="button"
                          className={styles.addrBtn}
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className={styles.addrBtnDanger}
                        onClick={() => setConfirmDeleteId(addrId)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.noOrders}>No saved shipping addresses yet. Add one for faster checkout.</p>
        )}
      </section>

      {/* Recent Orders Section */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <Link href="/account/orders" className={styles.viewAllLink}>
            View all orders →
          </Link>
        </div>

        {ordersLoading ? (
          <p className={styles.noOrders}>Loading recent orders…</p>
        ) : recentOrders.length > 0 ? (
          <div className={styles.orderList}>
            {recentOrders.map((order) => (
              <div key={order.id} className={styles.orderRow}>
                <div className={styles.orderInfo}>
                  <strong className={styles.orderId}>#{order.id}</strong>
                  <span className={styles.orderDate}>{formatDate(order.date)}</span>
                  <span className={styles.orderItems}>
                    {order.items.map((i) => `${i.name} × ${i.quantity}`).join(", ")}
                  </span>
                </div>

                <div className={styles.orderMeta}>
                  <span
                    className={`${styles.statusBadge} ${
                      order.status?.toLowerCase() === "delivered"
                        ? styles.statusDelivered
                        : styles.statusProcessing
                    }`}
                  >
                    {order.status}
                  </span>
                  <strong className={styles.orderTotal}>{formatPrice(order.total)}</strong>
                  <Link href={`/account/orders/${order.id}`} className={styles.detailsLink}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noOrders}>
            No orders placed yet. <Link href="/shop" className={styles.viewAllLink}>Browse products →</Link>
          </p>
        )}
      </section>
    </AccountLayout>
  );
}
