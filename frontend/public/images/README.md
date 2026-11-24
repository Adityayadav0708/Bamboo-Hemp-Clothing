# 🖼️ Image Assets – Bamboo & Hemp Clothing

All images used in this project are organized into the following subfolders:

```
public/images/
├── about/            # About page images – bamboo & hemp story, brand-story placeholder
├── avatars/          # Customer review/testimonial avatars (priya, rahul, anjali)
├── brand/            # Logo files (logo_exact.png, stitch_logo.png)
├── categories/       # Category thumbnails (cat_*.png) and banner images (category-*-banner.jpg)
│                     # Also placeholder category images
├── home/             # Hero image, bestseller images
│   └── hd/           # High-definition lifestyle photos used in homepage sections
└── products/         # All product photos
    ├── heelium-*/    # Bamboo innerwear product images (men's & women's)
    ├── hemp-*/       # Hemp T-shirt product images
    ├── features/     # Detail/macro shots used in product detail pages
    └── placeholders/ # Placeholder product images (placeholder-product-*.jpg)
```

## Usage in Code

Always use paths starting with `/images/` (relative to `public/`). Example:
```js
src="/images/products/heelium-men-tee-black.png"
src="/images/home/hero_models.png"
src="/images/avatars/avatar-priya.jpg"
src="/images/categories/cat_tees.png"
```

## Adding New Images

| Image type         | Folder                        |
|--------------------|-------------------------------|
| Product photo      | `products/`                   |
| Category banner    | `categories/`                 |
| Home/hero image    | `home/`                       |
| HD lifestyle photo | `home/hd/`                    |
| About page image   | `about/`                      |
| Avatar/testimonial | `avatars/`                    |
| Logo/brand asset   | `brand/`                      |
| Product detail shot| `products/features/`          |
