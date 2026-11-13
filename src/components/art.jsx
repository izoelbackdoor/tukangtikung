// Gambar dummy: ilustrasi SVG buatan sendiri (bukan foto orang atau pekerjaan sungguhan).

const PALETTES = [
  { wall: '#F2E6D8', floor: '#D9C3A5', accent: '#F26A1B', deep: '#7A3E2B', line: '#8C6A4A', sky: '#DCE8F5' },
  { wall: '#E6EEF0', floor: '#B9C7CC', accent: '#1F6F78', deep: '#21414A', line: '#5C7780', sky: '#EAF3F8' },
  { wall: '#EFE9DF', floor: '#C7B9A3', accent: '#2F6B4F', deep: '#2A3A2F', line: '#7D7260', sky: '#E2F1E8' },
  { wall: '#F5EFD8', floor: '#D8C68E', accent: '#C2410C', deep: '#5B3A12', line: '#9A7B3E', sky: '#FFF1E8' },
  { wall: '#E9E3F5', floor: '#BDB3D3', accent: '#5B4B8A', deep: '#2E2747', line: '#7A6F96', sky: '#EEEAF8' },
]

export function Avatar({ look, size = 96, rounded = 20, label, photo }) {
  if (photo) return <img src={photo} alt={label || 'Foto contoh'} width={size} height={size} loading="lazy" style={{ width: size, height: size, borderRadius: rounded, objectFit: 'cover', flexShrink: 0, display: 'block' }} />
  const { skin, shirt, hat, bg, mustache, glasses, hair } = look
  const hairColor = '#1F1A17'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label || 'Ilustrasi avatar contoh'} style={{ borderRadius: rounded, flexShrink: 0, display: 'block' }}>
      <rect width="100" height="100" fill={bg} />
      <path d="M14 100c2-20 16-30 36-30s34 10 36 30z" fill={shirt} />
      <path d="M41 70h18v8c0 4-4 7-9 7s-9-3-9-7z" fill={skin} />
      <path d="M38 74l12 12 12-12" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2.5" />
      <ellipse cx="50" cy="46" rx="18" ry="21" fill={skin} />
      <ellipse cx="32" cy="48" rx="3.5" ry="5" fill={skin} />
      <ellipse cx="68" cy="48" rx="3.5" ry="5" fill={skin} />
      {hair === 'short' && <path d="M32 42c0-14 8-20 18-20s18 6 18 20c-3-6-9-9-18-9s-15 3-18 9z" fill={hairColor} />}
      {hair === 'side' && <path d="M32 44c-1-15 8-22 19-22 10 0 18 6 17 19-6-7-14-9-22-8-6 1-10 5-14 11z" fill={hairColor} />}
      {hair === 'bald' && <path d="M33 46c0-4 1-7 2-9" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />}
      {hat === 'cap' && <g><path d="M31 40c0-13 9-19 19-19s19 6 19 19z" fill="#17191C" /><path d="M48 39h28c0 3-3 5-6 5H48z" fill="#17191C" /><circle cx="50" cy="22" r="2" fill="#F26A1B" /></g>}
      {hat === 'helmet' && <g><path d="M29 40c0-14 10-21 21-21s21 7 21 21z" fill="#F2B21B" /><rect x="26" y="38" width="48" height="5" rx="2.5" fill="#E09A0C" /><path d="M50 19v20" stroke="#E09A0C" strokeWidth="3" /></g>}
      <circle cx="43" cy="48" r="2.2" fill="#1F1A17" />
      <circle cx="57" cy="48" r="2.2" fill="#1F1A17" />
      {glasses && <g fill="none" stroke="#1F1A17" strokeWidth="1.6"><circle cx="43" cy="48" r="5" /><circle cx="57" cy="48" r="5" /><path d="M48 48h4" /></g>}
      {mustache && <path d="M43 57c3-2 5-2 7 0 2-2 4-2 7 0-2 2-5 2-7 1-2 1-5 1-7-1z" fill={hairColor} />}
      <path d="M44 61c3 3 9 3 12 0" fill="none" stroke="#5A2E1A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Scene({ cat, p }) {
  switch (cat) {
    case 'bangunan':
      return (
        <g>
          <rect width="160" height="70" fill={p.wall} />
          <path d="M0 70h160v50H0z" fill={p.floor} />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => <path key={k} d={`M${80 + (k - 4) * 8} 70 L${80 + (k - 4) * 44} 120`} stroke={p.line} strokeWidth="1" opacity=".6" />)}
          {[78, 88, 102].map((y) => <path key={y} d={`M0 ${y}h160`} stroke={p.line} strokeWidth="1" opacity=".6" />)}
          <rect x="18" y="58" width="22" height="8" fill={p.deep} rx="1" />
          <rect x="18" y="50" width="22" height="8" fill={p.accent} rx="1" />
          <path d="M112 66l14-30 6 3-12 29z" fill={p.deep} />
          <path d="M122 40l14-10 4 6-14 8z" fill="#9AA3AD" />
        </g>
      )
    case 'kayu':
      return (
        <g>
          <rect width="160" height="120" fill={p.wall} />
          <rect x="10" y="14" width="140" height="30" fill={p.floor} rx="2" />
          {[10, 45, 80, 115].map((x) => <rect key={x} x={x + 2} y="16" width="31" height="26" fill="none" stroke={p.line} strokeWidth="1.2" />)}
          <rect x="10" y="66" width="140" height="6" fill={p.deep} />
          <rect x="10" y="72" width="140" height="40" fill={p.floor} />
          {[10, 45, 80, 115].map((x) => <g key={x}><rect x={x + 2} y="75" width="31" height="34" fill="none" stroke={p.line} strokeWidth="1.2" /><rect x={x + 14} y="80" width="8" height="2.5" rx="1" fill={p.deep} /></g>)}
          <rect x="96" y="58" width="22" height="8" rx="2" fill="#9AA3AD" />
          <path d="M107 58v-8h6" stroke="#6B7280" strokeWidth="2" fill="none" />
          <rect x="30" y="54" width="12" height="12" rx="2" fill={p.accent} />
        </g>
      )
    case 'listrik':
      return (
        <g>
          <rect width="160" height="120" fill={p.wall} />
          <path d="M80 0v34" stroke={p.deep} strokeWidth="2" />
          <path d="M66 34h28l-4 12H70z" fill={p.deep} />
          <circle cx="80" cy="56" r="11" fill="#FFE7A3" />
          <circle cx="80" cy="56" r="20" fill="#FFE7A3" opacity=".35" />
          <rect x="18" y="62" width="34" height="44" rx="4" fill="#FFFFFF" stroke={p.line} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={24 + k * 6.5} y="72" width="4.5" height="12" rx="1" fill={k === 1 ? p.accent : p.deep} />)}
          <path d="M35 106v14M52 84h34c8 0 10 6 10 12v24" stroke={p.line} strokeWidth="2" fill="none" />
          <rect x="114" y="70" width="22" height="30" rx="4" fill="#FFFFFF" stroke={p.line} />
          <rect x="121" y="78" width="8" height="12" rx="2" fill={p.accent} />
        </g>
      )
    case 'ledeng':
      return (
        <g>
          <rect width="160" height="120" fill={p.wall} />
          {[0, 1, 2, 3, 4, 5, 6].map((k) => <path key={k} d={`M${k * 24} 0v74`} stroke={p.line} strokeWidth=".8" opacity=".4" />)}
          <path d="M20 26h70a10 10 0 0 1 10 10v8" stroke={p.deep} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M100 44v6" stroke="#9AA3AD" strokeWidth="9" strokeLinecap="round" />
          <path d="M88 52h24" stroke="#9AA3AD" strokeWidth="5" strokeLinecap="round" />
          <path d="M100 62c-3 5-4 7-4 9a4 4 0 0 0 8 0c0-2-1-4-4-9z" fill="#5BA8D9" />
          <path d="M40 74h80l-6 28H46z" fill="#FFFFFF" stroke={p.line} />
          <rect x="0" y="102" width="160" height="18" fill={p.floor} />
          <circle cx="24" cy="26" r="7" fill={p.accent} />
        </g>
      )
    case 'cat':
      return (
        <g>
          <rect width="160" height="120" fill={p.wall} />
          <rect x="0" y="0" width="96" height="120" fill={p.accent} opacity=".85" />
          <path d="M96 0c4 20-4 40 2 60s-4 40 0 60" stroke={p.accent} strokeWidth="6" fill="none" opacity=".85" />
          <rect x="104" y="30" width="36" height="14" rx="4" fill={p.deep} />
          <path d="M140 37h6v18h-24v10" stroke="#6B7280" strokeWidth="3" fill="none" />
          <rect x="118" y="65" width="8" height="30" rx="3" fill="#17191C" />
          <path d="M20 100h40l-4 20H24z" fill="#9AA3AD" />
          <ellipse cx="40" cy="100" rx="20" ry="4" fill={p.accent} />
        </g>
      )
    case 'las':
      return (
        <g>
          <rect width="160" height="120" fill={p.sky} />
          <path d="M6 30 L154 18 L154 26 L6 38z" fill={p.deep} />
          {[14, 50, 86, 122, 148].map((x) => <rect key={x} x={x} y="30" width="4" height="74" fill={p.deep} />)}
          <rect x="0" y="80" width="160" height="4" fill={p.deep} />
          {Array.from({ length: 18 }, (_, k) => <rect key={k} x={6 + k * 8.5} y="84" width="2.4" height="24" fill={p.deep} />)}
          <rect x="0" y="108" width="160" height="12" fill={p.floor} />
          <circle cx="104" cy="54" r="4" fill="#FFD27A" />
          <circle cx="104" cy="54" r="10" fill="#FFD27A" opacity=".35" />
        </g>
      )
    case 'atap':
      return (
        <g>
          <rect width="160" height="120" fill={p.sky} />
          <path d="M10 70 L80 18 L150 70z" fill={p.accent} />
          {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${24 + k * 7} ${60 - k * 8} H${136 - k * 7}`} stroke={p.deep} strokeWidth="1.4" opacity=".55" />)}
          <rect x="24" y="70" width="112" height="44" fill={p.wall} />
          <rect x="40" y="82" width="22" height="18" fill={p.sky} stroke={p.line} />
          <rect x="96" y="80" width="22" height="34" fill={p.deep} />
          <path d="M6 72 L80 16 L154 72" stroke={p.deep} strokeWidth="4" fill="none" strokeLinejoin="round" />
        </g>
      )
    default:
      return (
        <g>
          <rect width="160" height="120" fill={p.wall} />
          <path d="M0 86h160v34H0z" fill={p.floor} />
          <rect x="18" y="20" width="44" height="40" fill={p.sky} stroke={p.line} strokeWidth="2" />
          <path d="M40 20v40M18 40h44" stroke={p.line} strokeWidth="2" />
          <rect x="84" y="46" width="60" height="40" rx="3" fill={p.accent} />
          <rect x="88" y="34" width="52" height="14" rx="3" fill={p.deep} />
          <rect x="22" y="70" width="40" height="16" rx="3" fill={p.deep} />
          <path d="M120 0v14" stroke={p.deep} strokeWidth="2" />
          <circle cx="120" cy="18" r="5" fill="#FFE7A3" />
        </g>
      )
  }
}

export function WorkArt({ cat, seed = 0, label, rounded = 14, ratio = '4 / 3', showTag = true, photo }) {
  const p = PALETTES[Math.abs(seed) % PALETTES.length]
  if (photo) return (
    <figure style={{ margin: 0, position: 'relative', aspectRatio: ratio, borderRadius: rounded, overflow: 'hidden', background: '#E6E8EB' }}>
      <img src={photo} alt={`Foto contoh: ${label || cat}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {(label || showTag) && <figcaption style={{ position: 'absolute', left: 8, right: 8, bottom: 8, display: 'flex', justifyContent: 'space-between', gap: 6, alignItems: 'flex-end' }}>{label ? <span style={{ background: 'rgba(23,25,28,.82)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '4px 8px', borderRadius: 8 }}>{label}</span> : <span />}{showTag && <span style={{ background: 'rgba(255,255,255,.9)', color: '#3F454D', fontSize: 10, fontWeight: 600, padding: '3px 6px', borderRadius: 6 }}>foto AI</span>}</figcaption>}
    </figure>
  )
  return (
    <figure style={{ margin: 0, position: 'relative', aspectRatio: ratio, borderRadius: rounded, overflow: 'hidden', background: p.wall }}>
      <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Ilustrasi contoh: ${label || cat}`} style={{ width: '100%', height: '100%', display: 'block' }}>
        <g transform={seed % 2 ? 'translate(160 0) scale(-1 1)' : undefined}><Scene cat={cat} p={p} /></g>
      </svg>
      {(label || showTag) && (
        <figcaption style={{ position: 'absolute', left: 8, right: 8, bottom: 8, display: 'flex', justifyContent: 'space-between', gap: 6, alignItems: 'flex-end' }}>
          {label ? <span style={{ background: 'rgba(23,25,28,.82)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '4px 8px', borderRadius: 8, maxWidth: '75%' }}>{label}</span> : <span />}
          {showTag && <span style={{ background: 'rgba(255,255,255,.9)', color: '#3F454D', fontSize: 10, fontWeight: 600, padding: '3px 6px', borderRadius: 6, whiteSpace: 'nowrap' }}>ilustrasi</span>}
        </figcaption>
      )}
    </figure>
  )
}
