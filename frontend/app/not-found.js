import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Bamboo & Hemp",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <p style={{ fontSize: "5rem", lineHeight: 1 }}>🌿</p>
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          color: "#244B3C",
          marginTop: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        Page Not Found
      </h1>
      <p style={{ color: "#6B7568", maxWidth: 400, marginBottom: "2rem" }}>
        Sorry, the page you&apos;re looking for doesn&apos;t exist. It may have
        been moved or the URL may be incorrect.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 2rem",
          backgroundColor: "#244B3C",
          color: "#FAF9F5",
          borderRadius: 999,
          fontWeight: 500,
          fontSize: "0.9375rem",
          textDecoration: "none",
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
