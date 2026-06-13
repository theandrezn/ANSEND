export default function Flag({ country, label, active = false, onClick }) {
  const flag = country === "US" ? "🇺🇸" : "🇧🇷";

  return (
    <button
      type="button"
      className={`ansend-i18n-flag${active ? " is-active" : ""}`}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
    >
      <span aria-hidden="true">{flag}</span>
    </button>
  );
}
