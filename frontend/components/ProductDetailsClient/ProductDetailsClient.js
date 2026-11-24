"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductImageGallery from "@/components/ProductImageGallery";
import PriceDisplay from "@/components/PriceDisplay";
import SizeSelector from "@/components/SizeSelector";
import ColorSelector from "@/components/ColorSelector";
import QuantitySelector from "@/components/QuantitySelector";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import { useCart } from "@/hooks/useCart";
import styles from "./ProductDetailsClient.module.css";

export default function ProductDetailsClient({ product, relatedProducts = [] }) {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.slug || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [openFaq, setOpenFaq] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Keep variant selection synced if product changes
  useEffect(() => {
    if (product.sizes?.length > 0 && (!selectedSize || !product.sizes.includes(selectedSize))) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors?.length > 0 && (!selectedColor || !product.colors.some((c) => c.slug === selectedColor))) {
      setSelectedColor(product.colors[0].slug);
    }
  }, [product.id, product.slug, product.sizes, product.colors, selectedSize, selectedColor]);

  const currentColorObj = product.colors?.find((c) => c.slug === selectedColor) || product.colors?.[0];

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls past 520px (past the initial buy button area)
      setShowStickyBar(window.scrollY > 520);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAddToCart() {
    const sizeToUse = selectedSize || product.sizes?.[0] || "M";
    const colorToUse = selectedColor || product.colors?.[0]?.slug || "standard";
    const success = addItem(product, quantity, sizeToUse, colorToUse);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  }

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: product.categoryLabel || "Category", href: `/category/${product.category}` },
    { label: product.name },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Breadcrumb items={breadcrumbs} />

        <div className={styles.mainGrid}>
          {/* Gallery Column */}
          <div className={styles.galleryCol}>
            <ProductImageGallery
              images={product.images || []}
              productName={product.name}
            />
          </div>

          {/* Details & Purchase Column */}
          <div className={styles.detailsCol}>
            {/* Badges */}
            {product.badges?.length > 0 && (
              <div className={styles.badgesRow}>
                {product.badges.map((b) => (
                  <span key={b} className={styles.badge}>
                    {b}
                  </span>
                ))}
              </div>
            )}

            <h1 className={styles.title}>{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className={styles.ratingRow}>
                <span className={styles.stars}>
                  {"★".repeat(Math.round(product.rating))}
                  {"☆".repeat(5 - Math.round(product.rating))}
                </span>
                <span className={styles.ratingText}>
                  {product.rating} ({product.reviewCount || 120} verified customer reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className={styles.priceRow}>
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                currency={product.currency}
                size="lg"
              />
              <span className={styles.taxNotice}>Inclusive of all taxes · Free shipping &gt; ₹999</span>
            </div>

            <p className={styles.shortDesc}>{product.description}</p>

            <hr className={styles.divider} />

            {/* Color Selector */}
            {product.colors?.length > 0 && (
              <div className={styles.optionSection}>
                <div className={styles.optionHeader}>
                  <span className={styles.optionLabel}>Colour:</span>
                  <span className={styles.optionSelected}>{currentColorObj?.name}</span>
                </div>
                <ColorSelector
                  colors={product.colors}
                  selected={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>
            )}

            {/* Size Selector */}
            {product.sizes?.length > 0 && (
              <div className={styles.optionSection}>
                <div className={styles.optionHeader}>
                  <span className={styles.optionLabel}>Size:</span>
                  <span className={styles.optionSelected}>{selectedSize}</span>
                </div>
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onChange={setSelectedSize}
                />
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className={styles.actionRow}>
              <div className={styles.quantityWrap}>
                <label className={styles.optionLabel}>Quantity:</label>
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={10}
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={added ? styles.btnAdded : ""}
              >
                {!product.inStock
                  ? "Out of Stock"
                  : added
                  ? "✓ Added to Cart!"
                  : `Add to Cart • ₹${(product.price * quantity).toLocaleString("en-IN")}`}
              </Button>
            </div>

            {/* Reassurance Features */}
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🌱</span>
                <div>
                  <strong>Sustainable Natural Yarns</strong>
                  <p>Organically grown bamboo &amp; Himalayan bast hemp</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🚚</span>
                <div>
                  <strong>Free Express Shipping</strong>
                  <p>On all domestic orders across India</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔄</span>
                <div>
                  <strong>Hassle-Free 15-Day Exchange</strong>
                  <p>Easy doorstep size exchange guarantee</p>
                </div>
              </div>
            </div>

            {/* Quick Summary Tabs */}
            <div className={styles.tabsWrap}>
              <div className={styles.tabsHeader} role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "description"}
                  className={`${styles.tabBtn} ${activeTab === "description" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  Overview
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "fabric"}
                  className={`${styles.tabBtn} ${activeTab === "fabric" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("fabric")}
                >
                  Composition
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "care"}
                  className={`${styles.tabBtn} ${activeTab === "care" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("care")}
                >
                  Wash &amp; Care
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === "description" && (
                  <div className={styles.tabBody}>
                    <p>{product.description}</p>
                    <ul className={styles.featureBullets}>
                      <li>Engineered specifically for daily relaxed comfort</li>
                      <li>Naturally thermoregulating, breathable, and odor-resistant</li>
                      <li>Pre-shrunk organic yarn weave for dimensional stability</li>
                    </ul>
                  </div>
                )}

                {activeTab === "fabric" && (
                  <div className={styles.tabBody}>
                    <p className={styles.specLabel}>Fabric Blend:</p>
                    <p className={styles.fabricCompositionText}>{product.fabric}</p>
                    <p className={styles.ecoPill}>
                      🌿 Non-toxic &amp; skin-friendly natural dyes
                    </p>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className={styles.tabBody}>
                    <p className={styles.specLabel}>Care Instructions:</p>
                    <p>{product.care}</p>
                    <ul className={styles.featureBullets}>
                      <li>Cold water gentle cycle or delicate hand wash</li>
                      <li>Do not use chlorine bleach or artificial softeners</li>
                      <li>Line dry in shade to preserve natural fibre elasticity</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            HEELIUM APPAREL PILOT DEEP DIVE SECTIONS (MATCHING USER VIDEO)
           ═════════════════════════════════════════════════════════════════════ */}

        {/* ── SECTION 1: THE COMFORT IS IN THE CONSTRUCTION ── */}
        {product.constructionDetails?.length > 0 && (
          <section className={styles.constructionSection}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionEyebrow}>THE COMFORT IS IN THE CONSTRUCTION</span>
              <h2 className={styles.sectionTitle}>The details behind the difference.</h2>
              <p className={styles.sectionSubtitle}>
                Precision tailoring, reinforced seam architectures, and engineered stretch so your everyday wear holds its silhouette without restriction.
              </p>
            </div>

            <div className={styles.constructionList}>
              {product.constructionDetails.map((item, idx) => (
                <div
                  key={item.num || idx}
                  className={`${styles.constructionBlock} ${idx % 2 === 1 ? styles.constructionBlockReverse : ""}`}
                >
                  <div className={styles.constructionImageCard}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.constructionImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.constructionTextCard}>
                    <span className={styles.featureNumber}>{item.num || `0${idx + 1}`}</span>
                    <h3 className={styles.featureTitle}>{item.title}</h3>
                    <p className={styles.featureDesc}>{item.desc}</p>
                    {item.tag && (
                      <div className={styles.featurePill}>
                        <span className={styles.checkIcon}>✓</span> {item.tag}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 2: KNOW WHAT YOU'RE WEARING ── */}
        {product.materialStory && (
          <section className={styles.materialSection}>
            <div className={styles.materialGrid}>
              <div className={styles.materialImageCard}>
                <img
                  src={product.materialStory.image || "/images/products/features/fabric_blend_macro.jpg"}
                  alt="Fabric weave macro detail"
                  className={styles.materialImg}
                  loading="lazy"
                />
                <div className={styles.materialMacroBadge}>
                  <span>Microscopic Yarn View</span>
                </div>
              </div>

              <div className={styles.materialTextCol}>
                <span className={styles.sectionEyebrow}>
                  {product.materialStory.tag || "KNOW WHAT YOU'RE WEARING"}
                </span>
                <h2 className={styles.sectionTitle}>{product.materialStory.headline}</h2>
                <p className={styles.materialDesc}>{product.materialStory.subtext}</p>

                {product.materialStory.breakdown?.length > 0 && (
                  <div className={styles.breakdownGrid}>
                    {product.materialStory.breakdown.map((b, idx) => (
                      <div key={idx} className={styles.breakdownCard}>
                        <div className={styles.breakdownPercent}>{b.percent}</div>
                        <div className={styles.breakdownFiber}>{b.fiber}</div>
                        <div className={styles.breakdownRole}>· {b.role}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 3: MAKE IT PART OF YOUR EVERYDAY ── */}
        {product.stylingNote && (
          <section className={styles.stylingSection}>
            <div className={styles.stylingCard}>
              <div className={styles.stylingContent}>
                <span className={styles.sectionEyebrow}>
                  {product.stylingNote.tag || "MAKE IT PART OF YOUR EVERYDAY"}
                </span>
                <h2 className={styles.sectionTitle}>{product.stylingNote.headline}</h2>
                <p className={styles.stylingDesc}>{product.stylingNote.subtext}</p>
              </div>
              <div className={styles.stylingMedia}>
                <img
                  src={product.stylingNote.image || "/images/products/features/hangers_colorways.png"}
                  alt="Styling versatility"
                  className={styles.stylingImg}
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 4: CHOOSE WITH CONFIDENCE (FIT GUIDE) ── */}
        {product.fitGuide && (
          <section className={styles.fitSection}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionEyebrow}>CHOOSE WITH CONFIDENCE</span>
              <h2 className={styles.sectionTitle}>{product.fitGuide.headline || "Find your everyday fit."}</h2>
              <p className={styles.sectionSubtitle}>
                {product.fitGuide.subtext || "Tailored specifically for Indian body proportions with room to move."}
              </p>
            </div>

            <div className={styles.fitTableWrap}>
              <table className={styles.fitTable}>
                <thead>
                  <tr>
                    {product.fitGuide.headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.fitGuide.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={row[0] === selectedSize ? styles.selectedSizeRow : ""}
                      onClick={() => setSelectedSize(row[0])}
                    >
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={cIdx === 0 ? styles.sizeCell : ""}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.fitTipBox}>
              <span className={styles.fitTipIcon}>📏</span>
              <div>
                <strong>Sizing Recommendation:</strong>
                <p>
                  Our garments are true to Indian regular sizing. If you prefer a relaxed boxier silhouette or are between sizes, we recommend taking one size up.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 5: CUSTOMER REVIEWS ── */}
        {product.reviews?.length > 0 && (
          <section className={styles.reviewsSection}>
            <div className={styles.reviewsHeader}>
              <div>
                <span className={styles.sectionEyebrow}>WHAT OUR COMMUNITY SAYS</span>
                <h2 className={styles.sectionTitle}>Verified Comfort.</h2>
              </div>
              <div className={styles.ratingSummaryBadge}>
                <div className={styles.ratingStars}>★★★★★</div>
                <div className={styles.ratingScore}>{product.rating || 4.88} / 5.0</div>
                <div className={styles.ratingCount}>
                  Based on {product.reviewCount || 140} verified orders across India
                </div>
              </div>
            </div>

            <div className={styles.reviewsGrid}>
              {product.reviews.map((rev, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.reviewStars}>{"★".repeat(rev.rating || 5)}</div>
                  <h4 className={styles.reviewTitle}>"{rev.title}"</h4>
                  <p className={styles.reviewComment}>{rev.comment}</p>
                  <div className={styles.reviewFooter}>
                    <div>
                      <span className={styles.reviewAuthor}>{rev.author}</span>
                      {rev.location && <span className={styles.reviewLoc}> · {rev.location}</span>}
                    </div>
                    <span className={styles.verifiedBadge}>✓ Verified Buyer</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 6: GOOD TO KNOW (FAQS ACCORDION) ── */}
        {product.faqs?.length > 0 && (
          <section className={styles.faqSection}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionEyebrow}>GOOD TO KNOW</span>
              <h2 className={styles.sectionTitle}>Before you order.</h2>
              <p className={styles.sectionSubtitle}>
                Clear answers regarding fibre sourcing, laundry maintenance, longevity, and our 15-day exchange guarantee.
              </p>
            </div>

            <div className={styles.faqList}>
              {product.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`${styles.faqItem} ${openFaq === idx ? styles.faqItemOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestionBtn}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.faqIcon}>{openFaq === idx ? "−" : "+"}</span>
                  </button>
                  {openFaq === idx && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── RELATED PRODUCTS SECTION ── */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedHead}>
              <span className={styles.relatedEyebrow}>Complete Your Capsule</span>
              <h2 className={styles.relatedTitle}>You May Also Like</h2>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>

      {/* ── SECTION 7: STICKY BOTTOM ACTION BAR (HEELIUM PILOT STYLE) ── */}
      <aside
        className={`${styles.stickyBar} ${showStickyBar ? styles.stickyBarVisible : ""}`}
        aria-label="Quick Add to Cart Bar"
      >
        <div className={styles.stickyBarInner}>
          <div className={styles.stickyProductInfo}>
            <img
              src={product.images?.[0] || "/images/products/heelium-men-tee-black.png"}
              alt={product.name}
              className={styles.stickyThumb}
            />
            <div className={styles.stickyTitleGroup}>
              <span className={styles.stickyTitle}>{product.name}</span>
              <div className={styles.stickyVariantControls}>
                <span className={styles.stickyVariantColor}>{currentColorObj?.name}</span>
                {product.sizes?.length > 0 && (
                  <select
                    className={styles.stickySizeSelect}
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    aria-label="Select size"
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>
                        Size {s}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className={styles.stickyActionGroup}>
            <div className={styles.stickyPrice}>
              ₹{(product.price * quantity).toLocaleString("en-IN")}
            </div>
            <button
              type="button"
              className={`${styles.stickyAddBtn} ${added ? styles.stickyAddBtnSuccess : ""}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {!product.inStock ? "Out of Stock" : added ? "✓ Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
