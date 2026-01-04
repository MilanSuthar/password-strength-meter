import usePasswordStrength from "../hooks/usePasswordStrengthMeter";

export default function PasswordStrengthMeter({ password, variant = "bar" }) {
  const { score, color, rules } = usePasswordStrength(password);

  const gradientColors = ["red", "orange", "yellow", "lightgreen", "green"];

  const renderBars = () => (
    <div className="meter-bar">
      {[1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          className="bar"
          style={{ backgroundColor: score >= level ? color : "#ddd" }}
        />
      ))}
    </div>
  );

  const renderCircle = () => {
    const percentage = (score / 5) * 100;
    return (
      <div className="meter-circle">
        <svg viewBox="0 0 36 36">
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ddd"
            strokeWidth="2"
          />
          <path
            className="circle"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={`${(score / 5) * 100}, 100`}
          />
        </svg>
        <div className="circle-label">{score}/5</div>
      </div>
    );
  };

  const renderEmoji = () => {
    const emojis = ["😢", "😐", "🙂", "😃", "🥳"];
    return (
      <div style={{ fontSize: "24px", textAlign: "center" }}>
        {emojis[score - 1] || "😶"}
      </div>
    );
  };

  const renderGradient = () => {
    const percentage = (score / 5) * 100;
    const fillColor = gradientColors[score - 1] || "red";
    return (
      <div
        className="meter-gradient"
        style={{
          background: `linear-gradient(to right, ${fillColor} ${percentage}%, #ddd ${percentage}%)`,
        }}
      />
    );
  };

  return (
    <div className="password-meter">
      {variant === "bar" && renderBars()}
      {variant === "circle" && renderCircle()}
      {variant === "emoji" && renderEmoji()}
      {variant === "gradient" && renderGradient()}

      <ul className="rules-list">
        <li className={rules.length ? "valid strike" : ""}>
          Minimum 8 characters
        </li>
        <li className={rules.uppercase ? "valid strike" : ""}>
          At least 1 uppercase
        </li>
        <li className={rules.lowercase ? "valid strike" : ""}>
          At least 1 lowercase
        </li>
        <li className={rules.number ? "valid strike" : ""}>
          At least 1 number
        </li>
        <li className={rules.symbol ? "valid strike" : ""}>
          At least 1 symbol
        </li>
      </ul>
    </div>
  );
}
