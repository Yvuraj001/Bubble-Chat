const Logo = () => (
  <svg width="100%" height={250} viewBox="0 0 680 320" role="img" xmlns="http://www.w3.org/2000/svg">

    {/* background square */}
    <rect x="260" y="40" width="160" height="160" rx="40" fill="#22c55e"/>

    {/* top bubble */}
    <rect x="288" y="68" width="96" height="64" rx="16" fill="white"/>
    <polygon points="296,132 288,152 316,132" fill="white"/>

    {/* bottom bubble */}
    <rect x="296" y="120" width="96" height="64" rx="16" fill="#16a34a"/>
    <polygon points="384,184 392,204 364,184" fill="#16a34a"/>

    {/* top bubble lines */}
    <rect x="296" y="84" width="40" height="6" rx="3" fill="#bbf7d0"/>
    <rect x="296" y="96" width="60" height="6" rx="3" fill="#bbf7d0"/>
    <rect x="296" y="108" width="28" height="6" rx="3" fill="#bbf7d0"/>

    {/* bottom bubble lines */}
    <rect x="304" y="136" width="60" height="6" rx="3" fill="white" opacity="0.7"/>
    <rect x="304" y="148" width="44" height="6" rx="3" fill="white" opacity="0.7"/>
    <rect x="304" y="160" width="52" height="6" rx="3" fill="white" opacity="0.7"/>

    {/* wordmark */}
    <text x="340" y="240" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="32" fontWeight="700" fill="#16a34a" letterSpacing="-0.5">bubble</text>
    <text x="340" y="265" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="400" fill="#22c55e" letterSpacing="3">MESSENGER</text>

  </svg>
);

export default Logo;