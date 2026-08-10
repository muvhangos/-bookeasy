import "./Button.css";

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`buttonComponent ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}