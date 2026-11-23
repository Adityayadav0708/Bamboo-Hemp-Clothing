# Product Requirements Document (PRD)
## Bamboo & Hemp Everyday Essentials – D2C E-Commerce Platform

**Document Version:** 1.0  
**Date:** 2026-11-22  
**Status:** Draft – Pending Company Confirmation  
**Prepared by:** Frontend Development Team (Intern Project)  
**Confidentiality:** Internal Use Only

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Goals & Objectives](#3-goals--objectives)
4. [Target Audience](#4-target-audience)
5. [Technology Stack](#5-technology-stack)
6. [Folder Architecture](#6-folder-architecture)
7. [Design System](#7-design-system)
8. [Pages & Features](#8-pages--features)
9. [Global Components](#9-global-components)
10. [Frontend Functionality](#10-frontend-functionality)
11. [API Integration Plan](#11-api-integration-plan)
12. [State Management](#12-state-management)
13. [SEO & Accessibility](#13-seo--accessibility)
14. [Responsiveness Requirements](#14-responsiveness-requirements)
15. [Mock Data Strategy](#15-mock-data-strategy)
16. [Environment Configuration](#16-environment-configuration)
17. [Development Stages](#17-development-stages)
18. [Out of Scope](#18-out-of-scope)
19. [Open Questions & Decisions Pending](#19-open-questions--decisions-pending)
20. [Glossary](#20-glossary)

---

## 1. Executive Summary

This document defines the complete product requirements for the **Bamboo & Hemp Everyday Essentials** Direct-to-Consumer (D2C) e-commerce platform. The platform is a modern, premium, nature-inspired clothing e-commerce website built with **Next.js (App Router)**, targeting Indian consumers who seek sustainable, comfortable everyday clothing made from bamboo and hemp fabrics.

The frontend is designed as an independent presentation layer that communicates with an **Express.js + MongoDB** backend via REST APIs. The final product must meet professional D2C brand standards — not a demo or prototype.

> ⚠️ **DISCLAIMER:** Brand name, logo, product specifications, pricing, fabric claims, legal policies, and customer testimonials used during development are **placeholder content only**. All such content must be reviewed and approved by the company before going live.

---

## 2. Project Overview

| Field | Details |
|-------|---------|
| **Project Name** | Bamboo & Hemp Everyday Essentials |
| **Type** | D2C E-Commerce Platform |
| **Business Model** | Direct-to-Consumer (Brand → Customer, no marketplace) |
| **Product Focus** | Everyday clothing – T-Shirts, Innerwear |
| **Material Focus** | Bamboo fabric, Hemp fabric |
| **Primary Market** | India *(subject to company confirmation)* |
| **Frontend Tech** | Next.js 14+ (App Router), React, JavaScript, CSS Modules |
| **Backend Tech** | Node.js, Express.js, MongoDB (MVC Architecture) |
| **Hosting Target** | TBD *(company to confirm)* |
| **Payment Gateway** | TBD *(company to confirm)* |

---

## 3. Goals & Objectives

### 3.1 Business Goals
- Build a fully functional, production-quality D2C storefront.
- Communicate brand values: sustainability, comfort, premium quality, simplicity.
- Enable customers to discover, evaluate, and purchase bamboo/hemp products online.
- Establish a trust-first brand presence for first-time and returning customers.

### 3.2 Technical Goals
- Deliver a complete Next.js frontend with App Router architecture.
- Ensure clean separation between frontend (`frontend/`) and backend (`backend/`).
- Prepare all API service layers before backend is ready (mock-first approach).
- Achieve full responsiveness across mobile, tablet, laptop, and desktop.
- Implement SEO best practices using Next.js Metadata API.
- Write maintainable, modular, reusable component code.

### 3.3 User Experience Goals
- Provide a premium editorial shopping experience.
- Minimize friction in product discovery → cart → checkout journey.
- Deliver fast, smooth interactions with appropriate loading/error states.
- Ensure accessibility (WCAG 2.1 AA target).

---

## 4. Target Audience

### Primary Persona
| Attribute | Description |
|-----------|-------------|
| **Age** | 22–40 years |
| **Location** | Urban India (Tier 1 & Tier 2 cities) *(to be confirmed)* |
| **Gender** | All genders |
| **Income** | Middle to upper-middle class |
| **Values** | Sustainability, comfort, minimalism, natural living |
| **Behaviour** | Online shopper, researches before buying, brand-conscious |
| **Device** | Mobile-first (60–70% mobile usage expected) |

### Secondary Persona
- Gift shoppers buying sustainable clothing for others.
- Wellness and eco-conscious lifestyle enthusiasts.

---

## 5. Technology Stack

### 5.1 Frontend (Confirmed)

| Technology | Purpose | Justification |
|-----------|---------|--------------|
| **Next.js 14+ (App Router)** | Framework | SSR, SSG, routing, metadata API, image optimization |
| **React 18** | UI Library | Component model, hooks, context |
| **JavaScript (ES2022+)** | Language | TypeScript may be introduced with company approval |
| **CSS Modules** | Styling | Scoped, zero-runtime, Next.js native |
| **next/image** | Image optimization | Automatic WebP, lazy loading, responsive sizes |
| **next/font** | Font loading | No layout shift, self-hosted Google Fonts |
| **React Context API** | State management | Cart & Auth global state (no extra dependency needed) |

> Libraries beyond the above will be proposed with justification before introduction.

### 5.2 Backend (Planned – Not in Frontend Scope)

| Technology | Purpose |
|-----------|---------|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Multer / Cloudinary | Image uploads |

### 5.3 Rejected Alternatives
| Rejected | Reason |
|---------|--------|
| Vite + React | Not Next.js; no SSR/SSG/metadata built-in |
| Angular | Different framework; not approved |
| Vue.js | Different framework; not approved |
| Redux Toolkit | Unnecessary complexity for this scale; Context API is sufficient |
| Styled Components | Runtime CSS-in-JS adds overhead; CSS Modules preferred |

---

## 6. Folder Architecture

```
d:\Bamboo-Hemp\
│
├── frontend/                          # Next.js Application
│   ├── app/                           # App Router pages & layouts
│   │   ├── layout.js                  # Root layout (Navbar, Footer, Providers)
│   │   ├── page.js                    # Homepage  →  Route: /
│   │   ├── globals.css                # Global styles & CSS custom properties
│   │   │
│   │   ├── shop/
│   │   │   └── page.js                # Shop All  →  Route: /shop
│   │   │
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.js            # Category  →  Route: /category/:slug
│   │   │
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.js            # Product   →  Route: /product/:slug
│   │   │
│   │   ├── cart/
│   │   │   └── page.js                # Cart      →  Route: /cart
│   │   │
│   │   ├── login/
│   │   │   └── page.js                # Login     →  Route: /login
│   │   │
│   │   ├── register/
│   │   │   └── page.js                # Register  →  Route: /register
│   │   │
│   │   ├── forgot-password/
│   │   │   └── page.js                # Forgot PW →  Route: /forgot-password
│   │   │
│   │   ├── checkout/
│   │   │   └── page.js                # Checkout  →  Route: /checkout
│   │   │
│   │   ├── account/
│   │   │   ├── page.js                # Account   →  Route: /account
│   │   │   └── orders/
│   │   │       ├── page.js            # Orders    →  Route: /account/orders
│   │   │       └── [id]/
│   │   │           └── page.js        # Order Det →  Route: /account/orders/:id
│   │   │
│   │   ├── about/
│   │   │   └── page.js                # About     →  Route: /about
│   │   ├── contact/
│   │   │   └── page.js                # Contact   →  Route: /contact
│   │   ├── faq/
│   │   │   └── page.js                # FAQ       →  Route: /faq
│   │   ├── shipping-policy/
│   │   │   └── page.js                # Shipping  →  Route: /shipping-policy
│   │   ├── return-policy/
│   │   │   └── page.js                # Returns   →  Route: /return-policy
│   │   ├── privacy-policy/
│   │   │   └── page.js                # Privacy   →  Route: /privacy-policy
│   │   └── terms-and-conditions/
│   │       └── page.js                # T&C       →  Route: /terms-and-conditions
│   │
│   ├── components/
│   │   ├── layout/                    # Navbar, Footer, AnnouncementBar, etc.
│   │   ├── home/                      # Hero, CategoryGrid, Bestsellers, etc.
│   │   ├── products/                  # ProductCard, ProductGrid, Gallery, etc.
│   │   ├── cart/                      # CartItem, CartSummary, EmptyCart, etc.
│   │   ├── forms/                     # FormInput, AuthForm, CheckoutForm, etc.
│   │   ├── account/                   # AccountNav, OrderList, OrderCard, etc.
│   │   └── common/                    # Button, Spinner, EmptyState, Breadcrumb, etc.
│   │
│   ├── context/
│   │   ├── CartContext.js             # Global cart state & actions
│   │   └── AuthContext.js             # Global auth state & actions
│   │
│   ├── services/
│   │   └── api/
│   │       ├── productService.js      # Product API calls
│   │       ├── authService.js         # Auth API calls
│   │       ├── cartService.js         # Cart API calls
│   │       └── orderService.js        # Order API calls
│   │
│   ├── data/
│   │   ├── products.js                # Mock product data
│   │   └── categories.js             # Mock category data
│   │
│   ├── hooks/
│   │   ├── useCart.js                 # Cart convenience hook
│   │   └── useAuth.js                 # Auth convenience hook
│   │
│   ├── utils/
│   │   ├── formatters.js              # Currency, date, text formatters
│   │   └── validators.js             # Form validation helpers
│   │
│   ├── public/
│   │   └── images/                   # Static images, icons, placeholder assets
│   │
│   ├── package.json
│   ├── next.config.js
│   └── .env.local                    # Frontend environment variables
│
├── backend/                           # Express.js API Server (future)
│   ├── config/
│   │   └── db.js                      # MongoDB connection
│   ├── models/                        # Mongoose schemas
│   ├── controllers/                   # Route handlers
│   ├── routes/                        # Express route definitions
│   ├── middleware/                    # Auth, error handling
│   ├── services/                      # Business logic
│   ├── validators/                    # Request validation
│   ├── utils/                         # Helpers
│   ├── app.js                         # Express app setup
│   ├── server.js                      # Server entry point
│   ├── package.json
│   └── .env                          # Backend environment variables
│
├── .gitignore
└── README.md
```

---

## 7. Design System

### 7.1 Color Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-primary` | Forest Green | `#244B3C` | Primary buttons, headings, navbar |
| `--color-secondary` | Sage Green | `#9BAF95` | Accents, hover states, badges |
| `--color-bg-warm` | Warm Beige | `#E9E1D2` | Section backgrounds, cards |
| `--color-bg-light` | Off White | `#FAF9F5` | Page background |
| `--color-text` | Charcoal | `#292D2A` | Body text, prices |
| `--color-white` | White | `#FFFFFF` | Card surfaces, overlays |
| `--color-error` | Error Red | `#C0392B` | Form errors, alerts |
| `--color-border` | Light Border | `#E0D8CC` | Input borders, dividers |

> ⚠️ This palette is a design proposal. Final brand colors require company approval.

### 7.2 Typography

| Token | Font | Weight | Usage |
|-------|------|--------|-------|
| `--font-heading` | Playfair Display | 400, 600, 700 | H1–H3, editorial headings |
| `--font-body` | Inter | 300, 400, 500, 600 | Body copy, labels, navigation |
| `--font-accent` | Cormorant Garamond | 400, 500 | Pull quotes, taglines |

### 7.3 Spacing Scale

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  96px
--space-10: 128px
```

### 7.4 Breakpoints

| Name | Min Width | Target |
|------|-----------|--------|
| `xs` | 0px | Small phones |
| `sm` | 480px | Phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### 7.5 Design Principles
- **Whitespace first:** Generous padding creates a premium feel.
- **No excessive gradients:** Flat, clean surfaces only.
- **Subtle interactions:** Hover effects are smooth (200–300ms ease), never flashy.
- **Editorial imagery:** High-quality lifestyle and product photography (placeholder images in development).
- **Nature-inspired:** Use earthy tones, organic shapes, clean lines.

---

## 8. Pages & Features

### 8.1 Homepage (`/`)

| Section | Description |
|---------|-------------|
| Announcement Bar | Free shipping threshold, promotions *(placeholder)* |
| Navbar | Logo, nav links, search, cart icon, account icon |
| Hero | Full-width banner, headline, subtext, CTA button, lifestyle image |
| Shop by Category | 4 category cards with images and links |
| Bestsellers | Horizontal product scroll / grid of 4–6 products |
| Fabric Benefits | 3–4 cards: Breathable, Sustainable, Soft, Eco-friendly |
| Brand Story | Short narrative with image (placeholder copy) |
| Featured Collection | Highlight one collection with image grid |
| Testimonials | 3–4 sample reviews *(clearly marked as sample)* |
| Newsletter | Email subscription form |
| Footer | Links, social icons, legal links, copyright |

### 8.2 Shop All (`/shop`)

| Feature | Details |
|---------|---------|
| Product Grid | Responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop |
| Filters | Category, Size, Color, Price range |
| Filter Drawer | Mobile slide-in filter panel |
| Sorting | Newest, Price ↑↓, Popularity |
| Product Count | "Showing X of Y products" |
| Empty State | Message + CTA when no products match filters |
| Pagination | Page-based or load-more |

### 8.3 Category Pages (`/category/[slug]`)

Supported slugs:
- `bamboo-tshirts`
- `hemp-tshirts`
- `mens-innerwear`
- `womens-innerwear`

| Feature | Details |
|---------|---------|
| Category Banner | Hero image + category name + description |
| Product Grid | Same as shop page |
| Filters | Category-specific filters |
| Breadcrumb | Home > Category Name |

### 8.4 Product Detail Page (`/product/[slug]`)

| Feature | Details |
|---------|---------|
| Image Gallery | Main image + thumbnail strip, click to switch |
| Product Info | Name, price, short description |
| Size Selector | XS / S / M / L / XL / XXL — visual button UI |
| Color Selector | Circular color swatches |
| Quantity Selector | +/- buttons with min=1 |
| Add to Cart | Primary CTA, with feedback on success |
| Product Tabs | Description, Fabric & Care, Shipping |
| Fabric Info | Placeholder (company to provide real specs) |
| Related Products | 4 cards at bottom |
| Breadcrumb | Home > Category > Product |

### 8.5 Cart (`/cart`)

| Feature | Details |
|---------|---------|
| Cart Items | Image, name, size, color, quantity, price |
| Quantity Update | Inline +/- controls |
| Remove Item | Per-item remove button |
| Order Summary | Subtotal, shipping *(TBD)*, estimated total |
| Coupon Field | UI only — backend integration pending |
| CTAs | Continue Shopping + Proceed to Checkout |
| Empty State | Illustration + "Start Shopping" CTA |

### 8.6 Authentication Pages

#### Login (`/login`)
- Email + password fields
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Error message display
- Loading state on submit
- Redirect to account on success

#### Register (`/register`)
- Full name, email, password, confirm password
- Password strength indicator
- Terms acceptance checkbox
- Validation on all fields
- Loading state on submit

#### Forgot Password (`/forgot-password`)
- Email input
- Submit → show success message
- Link back to login

### 8.7 Checkout (`/checkout`)

| Section | Details |
|---------|---------|
| Contact Info | Name, email, phone |
| Shipping Address | Address line 1 & 2, city, state, pincode, country |
| Order Summary | Products, subtotal, shipping, total |
| Delivery Method | Standard / Express *(placeholder options)* |
| Payment | UI placeholder — gateway TBD (company to confirm) |
| Place Order | Primary CTA |

> ⚠️ No real payment processing until gateway is confirmed by the company.

### 8.8 Account Overview (`/account`)

| Feature | Details |
|---------|---------|
| Welcome Panel | Customer name, email |
| Quick Stats | Total orders, wishlist count |
| Navigation | Orders, Profile, Addresses, Logout |
| Recent Orders | Last 3 orders with status |

### 8.9 Order History (`/account/orders`)

| Feature | Details |
|---------|---------|
| Order List | Order #, date, total, status badge |
| Status Badges | Placed, Processing, Shipped, Delivered, Cancelled |
| View Details | Link to individual order |
| Empty State | "No orders yet" + Shop CTA |

### 8.10 Order Details (`/account/orders/[id]`)

| Feature | Details |
|---------|---------|
| Order Header | Order #, date, status |
| Items | Product image, name, size, color, qty, price |
| Shipping Address | Delivery address |
| Payment Summary | Subtotal, shipping, total, payment method |
| Tracking | Placeholder tracking section |

### 8.11 Informational Pages

| Page | Route | Key Content |
|------|-------|-------------|
| About | `/about` | Brand mission, story, team *(placeholder)* |
| Contact | `/contact` | Contact form, email, phone *(placeholder)* |
| FAQ | `/faq` | Accordion-style Q&A *(placeholder)* |
| Shipping Policy | `/shipping-policy` | Delivery timelines *(placeholder – legal review required)* |
| Return Policy | `/return-policy` | Return/exchange rules *(placeholder – legal review required)* |
| Privacy Policy | `/privacy-policy` | Data usage *(placeholder – legal review required)* |
| Terms & Conditions | `/terms-and-conditions` | Site T&C *(placeholder – legal review required)* |

---

## 9. Global Components

### 9.1 Layout Components

| Component | File | Description |
|-----------|------|-------------|
| `AnnouncementBar` | `components/layout/AnnouncementBar.js` | Top promo strip |
| `Navbar` | `components/layout/Navbar.js` | Desktop navigation |
| `MobileNavigation` | `components/layout/MobileNavigation.js` | Mobile slide-out menu |
| `Footer` | `components/layout/Footer.js` | Site-wide footer |

### 9.2 Product Components

| Component | File | Description |
|-----------|------|-------------|
| `ProductCard` | `components/products/ProductCard.js` | Card for grids |
| `ProductGrid` | `components/products/ProductGrid.js` | Responsive grid wrapper |
| `ProductImageGallery` | `components/products/ProductImageGallery.js` | PDP image viewer |
| `SizeSelector` | `components/products/SizeSelector.js` | Size button group |
| `ColorSelector` | `components/products/ColorSelector.js` | Color swatch group |
| `QuantitySelector` | `components/products/QuantitySelector.js` | +/- quantity control |
| `PriceDisplay` | `components/products/PriceDisplay.js` | Formatted price |

### 9.3 Common Components

| Component | File | Description |
|-----------|------|-------------|
| `Button` | `components/common/Button.js` | Reusable button variants |
| `SearchBar` | `components/common/SearchBar.js` | Search input |
| `Breadcrumb` | `components/common/Breadcrumb.js` | Navigation breadcrumb |
| `LoadingSpinner` | `components/common/LoadingSpinner.js` | Loading indicator |
| `EmptyState` | `components/common/EmptyState.js` | Empty screen UI |
| `ErrorMessage` | `components/common/ErrorMessage.js` | Error display |
| `FilterSidebar` | `components/common/FilterSidebar.js` | Product filters |
| `SortDropdown` | `components/common/SortDropdown.js` | Sort control |
| `CategoryCard` | `components/common/CategoryCard.js` | Category tiles |

### 9.4 Form Components

| Component | File | Description |
|-----------|------|-------------|
| `FormInput` | `components/forms/FormInput.js` | Styled input field |
| `NewsletterSection` | `components/forms/NewsletterSection.js` | Email capture |

---

## 10. Frontend Functionality

### 10.1 Client-Side Interactions (Working, not static)

| Feature | Implementation |
|---------|---------------|
| Page navigation | Next.js `<Link>` — no full page reload |
| Cart add/remove/update | CartContext + localStorage persistence |
| Filter & sort products | Client-side state filtering on mock data |
| Product image gallery | Active image state switching |
| Size & color selection | Controlled component state |
| Form validation | Custom validators + real-time feedback |
| Mobile nav toggle | CSS + state-based show/hide |
| Loading states | Skeleton loaders / spinner on data fetch |
| Error states | Error boundary + ErrorMessage component |
| Empty states | EmptyState component with CTAs |

### 10.2 Cart State Management

**Choice: React Context API**  
**Reason:** The cart is the only truly global shared state needed. Redux or Zustand would be over-engineering for this scale. Context API is built into React, requires no extra dependency, and handles this use case perfectly.

Cart state persists to `localStorage` so items survive page refresh.

---

## 11. API Integration Plan

### 11.1 Environment Variable

```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 11.2 Service Architecture

All API calls are centralized in `frontend/services/api/`. Each service exports async functions. During development, these return mock data. When the backend is ready, only the service files change — pages and components remain untouched.

### 11.3 Planned API Endpoints

| Method | Endpoint | Service | Description |
|--------|----------|---------|-------------|
| GET | `/api/products` | productService | List all products |
| GET | `/api/products/:slug` | productService | Single product |
| GET | `/api/categories` | productService | All categories |
| GET | `/api/products?category=&size=&color=&sort=` | productService | Filtered products |
| POST | `/api/auth/register` | authService | Register user |
| POST | `/api/auth/login` | authService | Login user |
| POST | `/api/auth/logout` | authService | Logout user |
| GET | `/api/auth/me` | authService | Current user |
| GET | `/api/cart` | cartService | Get cart |
| POST | `/api/cart` | cartService | Add to cart |
| PUT | `/api/cart/:itemId` | cartService | Update cart item |
| DELETE | `/api/cart/:itemId` | cartService | Remove cart item |
| GET | `/api/orders` | orderService | User orders |
| GET | `/api/orders/:id` | orderService | Order detail |
| POST | `/api/orders` | orderService | Place order |

> ⚠️ Final endpoints subject to backend API design approval.

---

## 12. State Management

| State | Scope | Solution |
|-------|-------|---------|
| Cart items | Global | `CartContext` (Context API + localStorage) |
| Auth / User | Global | `AuthContext` (Context API + httpOnly cookie from backend) |
| Product filters | Page-local | `useState` in Shop/Category page |
| Form state | Component-local | `useState` per form |
| UI toggles (mobile menu, gallery) | Component-local | `useState` |

---

## 13. SEO & Accessibility

### 13.1 SEO
- Next.js `generateMetadata()` per page for `<title>` and `<meta description>`
- Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`)
- `next/image` for automatic image optimization and lazy loading
- Descriptive `alt` text on all images
- Canonical URLs
- Structured data (JSON-LD) for products — Phase 2

### 13.2 Accessibility
- All interactive elements keyboard-reachable
- ARIA labels on icon-only buttons (cart icon, search icon)
- Color contrast ratio ≥ 4.5:1 for normal text
- Focus indicators visible
- Form fields with `<label>` elements properly associated
- Error messages announced to screen readers via `aria-live`

---

## 14. Responsiveness Requirements

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Navbar | Hamburger + drawer | Full or compact | Full |
| Product Grid | 2 columns | 3 columns | 4 columns |
| Hero Section | Stack vertically | Side-by-side | Side-by-side |
| Filters | Slide-in drawer | Sidebar | Sidebar |
| Checkout | Single column | Single column | Two columns |
| Footer | Stacked | 2 columns | 4 columns |
| Cart | Full page | Full page | Full page |
| PDP Gallery | Stack | Side-by-side | Side-by-side |

---

## 15. Mock Data Strategy

- All mock data lives in `frontend/data/products.js` and `frontend/data/categories.js`.
- Service functions in `frontend/services/api/` check for `NEXT_PUBLIC_API_URL`. If the backend is unavailable, they fall back to mock data automatically.
- Mock data is clearly labeled with comments: `// MOCK DATA – Replace with API response`.
- No mock data is presented as real company inventory or specifications.

### Sample Mock Products (12 total)
- 4× Bamboo T-Shirts (Men's)
- 2× Hemp T-Shirts (Unisex)
- 3× Men's Innerwear
- 3× Women's Innerwear

---

## 16. Environment Configuration

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_NAME=[Brand Name Placeholder]
NEXT_PUBLIC_CURRENCY=INR
NEXT_PUBLIC_CURRENCY_SYMBOL=₹
```

### Backend (`backend/.env`) — For Reference Only
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bamboo-hemp
JWT_SECRET=[secret – never expose to frontend]
NODE_ENV=development
```

---

## 17. Development Stages

| Stage | Scope | Key Deliverables |
|-------|-------|-----------------|
| **1** | Setup & Structure | next.js init, folder structure, env, mock data, services, contexts, utils |
| **2** | Global Layout | Navbar, Footer, AnnouncementBar, MobileNavigation, global CSS, fonts |
| **3** | Homepage | All 10 homepage sections, full responsive layout |
| **4** | Shop & Category | Product grid, filters, sorting, category pages |
| **5** | Product Detail | Gallery, size/color/qty selectors, tabs, related products |
| **6** | Cart | Cart items, quantity update, order summary, empty state |
| **7** | Auth Pages | Login, Register, Forgot Password with validation |
| **8** | Checkout | Multi-section form, order summary, payment UI placeholder |
| **9** | Account & Orders | Account dashboard, order list, order detail |
| **10** | Info Pages | About, Contact, FAQ, all policy pages |
| **11** | Polish & QA | Responsiveness fixes, accessibility pass, final UI refinement |

---

## 18. Out of Scope

The following are **explicitly excluded** from this frontend project:

| Item | Reason |
|------|--------|
| Express.js backend development | Separate project phase |
| MongoDB schema implementation | Backend responsibility |
| Payment gateway integration | Pending company confirmation of provider |
| Real authentication (server sessions) | Backend + frontend integration phase |
| Admin panel / dashboard | Separate project, not D2C frontend |
| Inventory management UI | Backend admin scope |
| Real customer testimonials | Company to provide |
| Official brand name / logo | Pending company branding approval |
| Legal policy content | Requires company legal review |
| Real product specifications / fabric claims | Company to provide |
| SMS / WhatsApp integration | Future phase |
| PWA / native app | Future phase |
| Multi-language support | Future phase |
| Analytics integration | Future phase |

---

## 19. Open Questions & Decisions Pending

| # | Question | Owner | Priority |
|---|----------|-------|---------|
| 1 | What is the confirmed brand name and logo? | Company | 🔴 High |
| 2 | What is the confirmed target market (India only, or global)? | Company | 🔴 High |
| 3 | Which payment gateway will be used? (Razorpay / PayU / Stripe) | Company | 🔴 High |
| 4 | Are real product images available, or do we use stock photos? | Company | 🟡 Medium |
| 5 | What are the actual fabric specifications and certifications? | Company | 🟡 Medium |
| 6 | What are the confirmed shipping and return policies? | Company / Legal | 🟡 Medium |
| 7 | Should TypeScript be used instead of JavaScript? | Tech Lead | 🟡 Medium |
| 8 | Is Wishlist a confirmed feature for V1? | Company | 🟡 Medium |
| 9 | What is the confirmed hosting environment? (Vercel, AWS, etc.) | Company | 🟢 Low |
| 10 | Are there any third-party integrations required? (Chat, CRM) | Company | 🟢 Low |
| 11 | Will there be a blog / content section? | Company | 🟢 Low |
| 12 | What are the actual customer testimonials? | Company | 🟢 Low |

---

## 20. Glossary

| Term | Definition |
|------|-----------|
| **D2C** | Direct-to-Consumer — brand sells directly to end customers |
| **App Router** | Next.js 13+ routing system using the `app/` directory |
| **SSR** | Server-Side Rendering — page rendered on the server per request |
| **SSG** | Static Site Generation — page pre-rendered at build time |
| **CSR** | Client-Side Rendering — page rendered in the browser |
| **MVC** | Model-View-Controller — architectural pattern for backend |
| **Mock Data** | Placeholder data used during development before real API is ready |
| **REST API** | Representational State Transfer — HTTP-based API architecture |
| **JWT** | JSON Web Token — stateless authentication token |
| **PDP** | Product Detail Page |
| **PLP** | Product Listing Page (Shop / Category pages) |
| **CTA** | Call to Action — a button or link prompting user action |
| **WCAG** | Web Content Accessibility Guidelines |

---

*Document prepared for internal development use. All placeholder content, design suggestions, and proposed specifications are subject to company review and approval before production deployment.*

---
**End of PRD v1.0**
