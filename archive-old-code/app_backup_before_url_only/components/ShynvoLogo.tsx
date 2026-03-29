export default function ShynvoLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
        {/* Core */}
        <circle cx="50" cy="50" r="10" fill="white" />

        {/* Orbit rings */}
        <ellipse
          cx="50"
          cy="50"
          rx="34"
          ry="18"
          stroke="white"
          strokeWidth="3"
          opacity="0.9"
        />

        <ellipse
          cx="50"
          cy="50"
          rx="18"
          ry="34"
          stroke="white"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Signal points */}
        <circle cx="84" cy="50" r="3" fill="white" />
        <circle cx="16" cy="50" r="3" fill="white" />
        <circle cx="50" cy="16" r="3" fill="white" />
        <circle cx="50" cy="84" r="3" fill="white" />
      </svg>

      <span className="text-sm font-semibold tracking-wide">
        SHYNVO
      </span>
    </div>
  );
}