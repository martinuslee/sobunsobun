const productImage = (label: string, accent: string, detail: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420">
  <rect width="640" height="420" fill="#f7fbed"/>
  <rect x="78" y="60" width="484" height="300" rx="28" fill="#ffffff" stroke="#d8dccf" stroke-width="4"/>
  <rect x="118" y="96" width="404" height="92" rx="18" fill="${accent}"/>
  <text x="320" y="154" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="800" fill="#ffffff">${label}</text>
  <g fill="#191d15" font-family="Arial, sans-serif" text-anchor="middle">
    <text x="320" y="248" font-size="34" font-weight="800">${detail}</text>
    <text x="320" y="296" font-size="20" fill="#727a69">제조사 개별 포장 상품</text>
  </g>
  <rect x="156" y="318" width="328" height="14" rx="7" fill="#e0e4d7"/>
</svg>
`)}`;

export const INSTANT_RICE_IMAGE = productImage('즉석밥', '#316b00', '24개입 박스');
export const CUP_NOODLE_IMAGE = productImage('컵라면', '#c65f00', '12개입 박스');
export const SPARKLING_WATER_IMAGE = productImage('탄산수', '#0077b6', '24캔 묶음');
export const COFFEE_STICK_IMAGE = productImage('커피', '#6f4e37', '100T 묶음');
