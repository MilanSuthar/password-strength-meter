// src/components/usePasswordStrength.js
import { useMemo } from "react";

export default function usePasswordStrength(password) {
  return useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: "Too Short",
        color: "gray",
        rules: {
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          symbol: false,
        },
        allValid: false,
      };
    }

    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(rules).filter(Boolean).length;

    let label = "Weak";
    let color = "red";

    if (score === 2) {
      label = "Medium";
      color = "orange";
    }
    if (score === 3 || score === 4) {
      label = "Strong";
      color = "green";
    }
    if (score === 5) {
      label = "Very Strong";
      color = "darkgreen";
    }

    const allValid = Object.values(rules).every(Boolean);

    return { score, label, color, rules, allValid };
  }, [password]);
}
