import styles from "./Button.module.css";

/**
 * Button — reusable button component.
 *
 * Props:
 *   variant: "primary" | "secondary" | "outline" | "ghost" | "danger"
 *   size:    "sm" | "md" | "lg"
 *   fullWidth: boolean
 *   loading: boolean
 *   disabled: boolean
 *   as: "button" | "a" (for link styling)
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  href,
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
