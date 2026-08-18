// Product images representing the user-provided photos:
// 1. 납작복숭아.webp (on brix Standard box with 12 flat donut peaches in clear clamshells)
// 2. 상추.jpg (자연그대로 친환경 상추 in produce bag with green ribbon tag)
// 3. 코스트코 삼겹살.jpg (미국산 냉장돈육삼겹살로스 3.0kg in white tray with WORLD CLASS PORK label)
// 4. 딸기 (설향 딸기 1kg)

export const FLAT_PEACH_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f8f9fa"/>
      <stop offset="100%" stop-color="#e9ecef"/>
    </linearGradient>
    <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f8b375"/>
      <stop offset="100%" stop-color="#e9954a"/>
    </linearGradient>
    <radialGradient id="peachGrad1" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ffccd5"/>
      <stop offset="35%" stop-color="#ff758f"/>
      <stop offset="70%" stop-color="#e63946"/>
      <stop offset="100%" stop-color="#c1121f"/>
    </radialGradient>
    <radialGradient id="peachCenter" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffbe0b"/>
      <stop offset="60%" stop-color="#fb5607"/>
      <stop offset="100%" stop-color="#d90429"/>
    </radialGradient>
    <linearGradient id="plasticReflect" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
      <stop offset="30%" stop-color="rgba(255,255,255,0.1)"/>
      <stop offset="70%" stop-color="rgba(255,255,255,0.4)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#bgGrad)"/>

  <!-- Main Container / Box Group -->
  <g filter="url(#shadow)">
    <!-- Bottom Box: on brix Standard Box -->
    <g id="bottom-box">
      <rect x="140" y="490" width="520" height="240" rx="8" fill="url(#boxGrad)"/>
      <rect x="140" y="490" width="520" height="8" fill="#d97d2e"/>

      <!-- Text: The 맛있는 과일의 기준 -->
      <text x="170" y="535" font-family="'Noto Sans KR', sans-serif" font-weight="700" font-size="14" fill="#3d220f" letter-spacing="-0.3">
        The 맛있는 과일의 기준
      </text>

      <!-- Brand Text: on brix -->
      <text x="170" y="605" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="44" fill="#1b1715">
        on brix
      </text>
      <!-- Underline for brix -->
      <rect x="230" y="618" width="88" height="5" fill="#1b1715"/>

      <!-- Brand Text: Standard (Italic Serif) -->
      <text x="170" y="675" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-weight="900" font-size="52" fill="#1b1715">
        Standard
      </text>

      <!-- Peach Illustration on Box -->
      <g transform="translate(560, 615)">
        <!-- Big Pink Peach -->
        <path d="M 0,-45 C 35,-45 70,-10 65,30 C 60,65 15,80 0,65 C -15,80 -60,65 -65,30 C -70,-10 -35,-45 0,-45 Z" fill="#ffb4a2"/>
        <path d="M 0,-40 C 25,-40 50,-10 45,25 C 40,55 10,65 0,55 Z" fill="#ff8da1" opacity="0.6"/>
        <!-- Leaves -->
        <path d="M -15,-48 C -35,-70 5,-65 0,-45 Z" fill="#2d5a27"/>
        <path d="M 10,-48 C 30,-70 45,-45 0,-45 Z" fill="#407c36"/>
        <!-- Circular text around peach -->
        <text x="-40" y="-20" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#3d220f" transform="rotate(-30 -40 -20)">fruit fresh delight</text>
      </g>
    </g>

    <!-- Top Two Clamshell Packs (2 Packs Side by Side) -->
    <!-- Left Pack -->
    <g id="left-clamshell" transform="translate(150, 110)">
      <!-- Clamshell Base -->
      <rect x="0" y="0" width="240" height="370" rx="20" fill="#ffffff" stroke="#c9d2db" stroke-width="3"/>
      <rect x="10" y="10" width="220" height="350" rx="14" fill="none" stroke="#e2e8f0" stroke-width="2"/>

      <!-- 6 Flat Peaches (Left Pack) -->
      <!-- Row 1 -->
      <!-- Peach 1 (Top Left) -->
      <g transform="translate(60, 65)">
        <!-- White Foam Mesh Net -->
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <!-- Flat Peach -->
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>
      <!-- Peach 2 (Top Right) -->
      <g transform="translate(180, 65)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>

      <!-- Row 2 -->
      <!-- Peach 3 (Mid Left) -->
      <g transform="translate(60, 185)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>
      <!-- Peach 4 (Mid Right) -->
      <g transform="translate(180, 185)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>

      <!-- Row 3 -->
      <!-- Peach 5 (Bottom Left) -->
      <g transform="translate(60, 305)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>
      <!-- Peach 6 (Bottom Right) -->
      <g transform="translate(180, 305)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>

      <!-- Plastic Shell Sheen -->
      <rect x="0" y="0" width="240" height="370" rx="20" fill="url(#plasticReflect)" opacity="0.6"/>
    </g>

    <!-- Right Pack -->
    <g id="right-clamshell" transform="translate(410, 110)">
      <rect x="0" y="0" width="240" height="370" rx="20" fill="#ffffff" stroke="#c9d2db" stroke-width="3"/>
      <rect x="10" y="10" width="220" height="350" rx="14" fill="none" stroke="#e2e8f0" stroke-width="2"/>

      <!-- 6 Flat Peaches (Right Pack) -->
      <!-- Row 1 -->
      <g transform="translate(60, 65)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>
      <g transform="translate(180, 65)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>

      <!-- Row 2 -->
      <g transform="translate(60, 185)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>
      <g transform="translate(180, 185)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>

      <!-- Row 3 -->
      <g transform="translate(60, 305)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>
      <g transform="translate(180, 305)">
        <circle cx="0" cy="0" r="44" fill="#ffffff" stroke="#e0e4d7" stroke-width="4" stroke-dasharray="6,3"/>
        <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#peachGrad1)"/>
        <ellipse cx="0" cy="-2" rx="20" ry="16" fill="url(#peachCenter)"/>
        <circle cx="0" cy="-2" r="6" fill="#800f2f"/>
      </g>

      <rect x="0" y="0" width="240" height="370" rx="20" fill="url(#plasticReflect)" opacity="0.6"/>
    </g>
  </g>
</svg>
`)}`;

export const LETTUCE_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="lettuceBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f4f6f0"/>
    </linearGradient>
    <radialGradient id="leafGreenLight" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#c8e668"/>
      <stop offset="40%" stop-color="#70b224"/>
      <stop offset="80%" stop-color="#387a10"/>
      <stop offset="100%" stop-color="#245106"/>
    </radialGradient>
    <radialGradient id="leafRedGrad" cx="30%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#7b2cbf"/>
      <stop offset="35%" stop-color="#5a1836"/>
      <stop offset="70%" stop-color="#3d5a1b"/>
      <stop offset="100%" stop-color="#2b450f"/>
    </radialGradient>
    <filter id="lettuceShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#lettuceBg)"/>

  <!-- Lettuce Bag Group -->
  <g filter="url(#lettuceShadow)" transform="translate(100, 70)">
    <!-- Clear Bag Body Shape -->
    <path d="M 80,60 C 250,20 350,20 520,60 C 580,180 600,450 540,620 C 420,680 180,680 60,620 C 0,450 20,180 80,60 Z" fill="#e9f5e1" opacity="0.3" stroke="#bddbb0" stroke-width="2"/>

    <!-- Lettuce Ruffled Heads (Top and Center) -->
    <!-- Dark Reddish Ruffled Leaf Tops -->
    <path d="M 120,180 Q 150,90 200,120 Q 260,80 300,130 Q 360,70 410,110 Q 470,80 500,160 Q 450,250 480,320 Q 350,290 300,340 Q 230,280 140,310 Z" fill="url(#leafRedGrad)"/>
    <path d="M 160,150 Q 220,100 270,140 Q 340,90 390,130 Q 460,110 470,180 Q 420,240 370,220 Q 290,260 220,200 Z" fill="#6b1d3d" opacity="0.85"/>

    <!-- Vibrant Green Center Ruffles -->
    <path d="M 100,280 Q 130,220 180,240 Q 250,190 300,230 Q 380,180 430,230 Q 500,220 520,300 Q 480,420 460,540 Q 380,600 300,610 Q 200,600 140,540 Q 110,430 100,280 Z" fill="url(#leafGreenLight)"/>

    <!-- Crisp White Stems and Ribs -->
    <path d="M 210,610 Q 220,480 240,380 Q 250,490 280,610 Z" fill="#eefbe4" opacity="0.9"/>
    <path d="M 370,610 Q 360,470 340,370 Q 330,490 310,610 Z" fill="#eefbe4" opacity="0.9"/>

    <!-- Left & Right Leaves Spread -->
    <path d="M 80,330 Q 130,360 170,470 Q 110,540 80,450 Z" fill="#70b224" opacity="0.95"/>
    <path d="M 520,330 Q 470,360 430,470 Q 490,540 520,450 Z" fill="#70b224" opacity="0.95"/>

    <!-- Plastic Bag Sheen / Highlights -->
    <path d="M 110,120 Q 280,80 490,120 L 460,580 Q 290,620 130,580 Z" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.5"/>
    <path d="M 90,200 L 120,480" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.4"/>
    <path d="M 500,220 L 470,490" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.3"/>

    <!-- Center Label Tag Badge: 자연그대로 친환경 -->
    <g transform="translate(300, 370)">
      <!-- Green String Ribbon Top -->
      <path d="M -50,-105 Q 0,-140 50,-105 Q 0,-85 -50,-105 Z" fill="none" stroke="#509e1e" stroke-width="7"/>
      <circle cx="0" cy="-95" r="7" fill="#509e1e"/>

      <!-- White Curved Tag Shield -->
      <path d="M -110,-80 C -110,-95 -95,-105 -75,-105 L 75,-105 C 95,-105 110,-95 110,-80 L 120,60 C 120,100 60,135 0,145 C -60,135 -120,100 -120,60 Z" fill="#ffffff" stroke="#4f941f" stroke-width="5"/>
      <path d="M -102,-72 C -102,-86 -88,-97 -70,-97 L 70,-97 C 88,-97 102,-86 102,-72 L 112,55 C 112,90 55,125 0,135 C -55,125 -112,90 -112,55 Z" fill="none" stroke="#90c765" stroke-width="2"/>

      <!-- Vegetable Basket Icon -->
      <g transform="translate(0, -60)">
        <path d="M -30,0 Q 0,25 30,0 L 25,-12 L -25,-12 Z" fill="#c49a6c" stroke="#8a5c2d" stroke-width="2"/>
        <circle cx="-10" cy="-15" r="8" fill="#539121"/>
        <circle cx="10" cy="-14" r="7" fill="#d9381e"/>
        <circle cx="0" cy="-18" r="9" fill="#7cb342"/>
      </g>

      <!-- Label Text: 자연그대로 -->
      <g transform="translate(0, -15)">
        <path d="M -48,-5 Q -40,-15 -35,-5 Q -42,5 -48,-5 Z" fill="#4f941f"/>
        <text x="0" y="0" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-weight="700" font-size="14" fill="#355e1b">
          자연그대로
        </text>
      </g>

      <!-- Label Text: 친환경 (Big Bold) -->
      <text x="0" y="42" text-anchor="middle" font-family="'Noto Sans KR', sans-serif" font-weight="900" font-size="44" fill="#1b4d08" letter-spacing="-1">
        친환경
      </text>

      <!-- Green Ribbon Banner: SAFETY NATURE HEALTH -->
      <rect x="-95" y="60" width="190" height="24" rx="6" fill="#4f941f"/>
      <text x="0" y="77" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="10.5" fill="#ffffff" letter-spacing="0.5">
        SAFETY NATURE HEALTH
      </text>
    </g>
  </g>
</svg>
`)}`;

export const COSTCO_PORK_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="supermarketBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#495057"/>
      <stop offset="50%" stop-color="#343a40"/>
      <stop offset="100%" stop-color="#212529"/>
    </linearGradient>
    <linearGradient id="porkLeanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d64057"/>
      <stop offset="40%" stop-color="#e85d75"/>
      <stop offset="80%" stop-color="#c92a42"/>
      <stop offset="100%" stop-color="#b01f35"/>
    </linearGradient>
    <linearGradient id="porkFatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fff0f3"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#ffe3e8"/>
    </linearGradient>
    <linearGradient id="trayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfdfd"/>
      <stop offset="100%" stop-color="#e9ecef"/>
    </linearGradient>
    <filter id="porkShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Supermarket Background / Shelf Context -->
  <rect width="800" height="800" fill="url(#supermarketBg)"/>

  <!-- Supermarket Refrigerated Trays in background -->
  <rect x="20" y="10" width="220" height="130" rx="10" fill="#e9ecef" opacity="0.3"/>
  <rect x="260" y="10" width="260" height="130" rx="10" fill="#e9ecef" opacity="0.3"/>
  <rect x="540" y="10" width="240" height="130" rx="10" fill="#e9ecef" opacity="0.3"/>

  <!-- Yellow Sleeve (Holding the tray) -->
  <path d="M 120,800 C 180,680 320,670 420,800 Z" fill="#ffe066" opacity="0.95"/>

  <!-- Main Costco Pork Tray -->
  <g filter="url(#porkShadow)" transform="translate(80, 110)">
    <!-- White Deep Grooved Styrofoam Grocery Tray -->
    <rect x="0" y="0" width="640" height="520" rx="28" fill="url(#trayGrad)" stroke="#ced4da" stroke-width="4"/>
    <rect x="18" y="18" width="604" height="484" rx="20" fill="none" stroke="#adb5bd" stroke-width="2"/>

    <!-- Inner Grid Pattern of Foam Meat Tray -->
    <g stroke="#dee2e6" stroke-width="2" opacity="0.6">
      <line x1="30" y1="90" x2="610" y2="90"/>
      <line x1="30" y1="180" x2="610" y2="180"/>
      <line x1="30" y1="270" x2="610" y2="270"/>
      <line x1="30" y1="360" x2="610" y2="360"/>
      <line x1="30" y1="450" x2="610" y2="450"/>
    </g>

    <!-- Thick Cut Slices of Pork Belly (미국산 냉장돈육삼겹살로스) -->
    <!-- Slices layered from left to right -->
    <g transform="translate(70, 40)">
      <!-- Slice 1 -->
      <g transform="translate(0, 0)">
        <path d="M 0,20 Q 30,0 60,20 L 50,420 Q 20,440 0,410 Z" fill="url(#porkLeanGrad)"/>
        <path d="M 15,20 Q 35,5 45,20 L 40,420 Q 25,435 15,410 Z" fill="url(#porkFatGrad)"/>
        <path d="M 25,30 Q 35,15 35,400" stroke="#d64057" stroke-width="8" opacity="0.8"/>
      </g>
      <!-- Slice 2 -->
      <g transform="translate(55, 0)">
        <path d="M 0,20 Q 30,0 60,20 L 50,420 Q 20,440 0,410 Z" fill="url(#porkLeanGrad)"/>
        <path d="M 15,20 Q 35,5 45,20 L 40,420 Q 25,435 15,410 Z" fill="url(#porkFatGrad)"/>
        <path d="M 25,30 Q 35,15 35,400" stroke="#d64057" stroke-width="8" opacity="0.8"/>
      </g>
      <!-- Slice 3 -->
      <g transform="translate(110, 0)">
        <path d="M 0,20 Q 30,0 60,20 L 50,420 Q 20,440 0,410 Z" fill="url(#porkLeanGrad)"/>
        <path d="M 15,20 Q 35,5 45,20 L 40,420 Q 25,435 15,410 Z" fill="url(#porkFatGrad)"/>
        <path d="M 25,30 Q 35,15 35,400" stroke="#d64057" stroke-width="8" opacity="0.8"/>
      </g>
      <!-- Slice 4 -->
      <g transform="translate(165, 0)">
        <path d="M 0,20 Q 30,0 60,20 L 50,420 Q 20,440 0,410 Z" fill="url(#porkLeanGrad)"/>
        <path d="M 15,20 Q 35,5 45,20 L 40,420 Q 25,435 15,410 Z" fill="url(#porkFatGrad)"/>
        <path d="M 25,30 Q 35,15 35,400" stroke="#d64057" stroke-width="8" opacity="0.8"/>
      </g>
      <!-- Slice 5 -->
      <g transform="translate(220, 0)">
        <path d="M 0,20 Q 30,0 60,20 L 50,420 Q 20,440 0,410 Z" fill="url(#porkLeanGrad)"/>
        <path d="M 15,20 Q 35,5 45,20 L 40,420 Q 25,435 15,410 Z" fill="url(#porkFatGrad)"/>
        <path d="M 25,30 Q 35,15 35,400" stroke="#d64057" stroke-width="8" opacity="0.8"/>
      </g>
      <!-- Slice 6 -->
      <g transform="translate(275, 0)">
        <path d="M 0,20 Q 30,0 60,20 L 50,420 Q 20,440 0,410 Z" fill="url(#porkLeanGrad)"/>
        <path d="M 15,20 Q 35,5 45,20 L 40,420 Q 25,435 15,410 Z" fill="url(#porkFatGrad)"/>
        <path d="M 25,30 Q 35,15 35,400" stroke="#d64057" stroke-width="8" opacity="0.8"/>
      </g>
      <!-- Slice 7 -->
      <g transform="translate(330, 0)">
        <path d="M 0,20 Q 30,0 60,20 L 50,420 Q 20,440 0,410 Z" fill="url(#porkLeanGrad)"/>
        <path d="M 15,20 Q 35,5 45,20 L 40,420 Q 25,435 15,410 Z" fill="url(#porkFatGrad)"/>
        <path d="M 25,30 Q 35,15 35,400" stroke="#d64057" stroke-width="8" opacity="0.8"/>
      </g>
      <!-- Slice 8 -->
      <g transform="translate(385, 0)">
        <path d="M 0,20 Q 30,0 60,20 L 50,420 Q 20,440 0,410 Z" fill="url(#porkLeanGrad)"/>
        <path d="M 15,20 Q 35,5 45,20 L 40,420 Q 25,435 15,410 Z" fill="url(#porkFatGrad)"/>
        <path d="M 25,30 Q 35,15 35,400" stroke="#d64057" stroke-width="8" opacity="0.8"/>
      </g>
    </g>

    <!-- Plastic Film Wrap Reflections -->
    <rect x="18" y="18" width="604" height="484" rx="20" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.4"/>
    <circle cx="160" cy="240" r="32" fill="#ffffff" opacity="0.25"/>
    <circle cx="380" cy="220" r="28" fill="#ffffff" opacity="0.3"/>

    <!-- Right-Side Costco Labels (WORLD CLASS PORK + Spec Sticker) -->
    <!-- 1. WORLD CLASS PORK Blue Logo Badge -->
    <g transform="translate(450, 95)">
      <rect x="0" y="0" width="165" height="65" rx="10" fill="#0056b3" stroke="#ffffff" stroke-width="2"/>
      <!-- US Flag Pork Icon -->
      <g transform="translate(100, 12)">
        <rect x="0" y="0" width="45" height="28" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <rect x="0" y="0" width="20" height="15" fill="#002868"/>
        <line x1="20" y1="5" x2="45" y2="5" stroke="#bf0a30" stroke-width="3"/>
        <line x1="20" y1="12" x2="45" y2="12" stroke="#bf0a30" stroke-width="3"/>
        <line x1="0" y1="20" x2="45" y2="20" stroke="#bf0a30" stroke-width="3"/>
        <text x="3" y="10" font-family="Arial" font-size="8" font-weight="bold" fill="#ffffff">★</text>
        <text x="2" y="38" font-family="Arial" font-size="8" font-weight="bold" fill="#0056b3">U.S. PORK</text>
      </g>
      <text x="12" y="26" font-family="'Arial Black', Arial, sans-serif" font-weight="900" font-size="13" fill="#ffffff" letter-spacing="-0.3">
        WORLD
      </text>
      <text x="12" y="44" font-family="'Arial Black', Arial, sans-serif" font-weight="900" font-size="13" fill="#ffffff" letter-spacing="-0.3">
        CLASS
      </text>
      <text x="12" y="58" font-family="'Arial Black', Arial, sans-serif" font-weight="900" font-size="11" fill="#ffffff" letter-spacing="0.5">
        PORK
      </text>
    </g>

    <!-- 2. Official Korean Product Label Sticker -->
    <g transform="translate(450, 168)">
      <rect x="0" y="0" width="165" height="180" rx="6" fill="#ffffff" stroke="#adb5bd" stroke-width="1.5"/>
      <text x="10" y="20" font-family="'Noto Sans KR', sans-serif" font-weight="800" font-size="11" fill="#212529">
        미국산 냉장돈육삼겹살로스
      </text>
      <line x1="10" y1="26" x2="155" y2="26" stroke="#dee2e6" stroke-width="1"/>
      
      <text x="10" y="40" font-family="'Noto Sans KR', sans-serif" font-size="8" fill="#495057">식품유형: 포장육 (냉장육)</text>
      <text x="10" y="52" font-family="'Noto Sans KR', sans-serif" font-size="8" fill="#495057">원산지: 미국산 (돼지고기 100%)</text>
      <text x="10" y="64" font-family="'Noto Sans KR', sans-serif" font-size="8" fill="#495057">보관방법: -2~10°C 냉장보관</text>
      <text x="10" y="76" font-family="'Noto Sans KR', sans-serif" font-size="8" fill="#495057">유통기한: 라벨 별도표기일까지</text>
      
      <!-- Big Weight Display -->
      <rect x="10" y="85" width="145" height="26" rx="4" fill="#f8f9fa" stroke="#e9ecef" stroke-width="1"/>
      <text x="16" y="102" font-family="'Noto Sans KR', sans-serif" font-weight="700" font-size="9" fill="#212529">내용량</text>
      <text x="145" y="103" text-anchor="end" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="13" fill="#191d15">3.0 kg</text>
      
      <!-- Barcode simulation -->
      <g transform="translate(15, 120)">
        <rect x="0" y="0" width="3" height="30" fill="#000"/>
        <rect x="6" y="0" width="2" height="30" fill="#000"/>
        <rect x="11" y="0" width="4" height="30" fill="#000"/>
        <rect x="18" y="0" width="1" height="30" fill="#000"/>
        <rect x="22" y="0" width="3" height="30" fill="#000"/>
        <rect x="28" y="0" width="2" height="30" fill="#000"/>
        <rect x="33" y="0" width="5" height="30" fill="#000"/>
        <rect x="42" y="0" width="2" height="30" fill="#000"/>
        <rect x="47" y="0" width="4" height="30" fill="#000"/>
        <rect x="54" y="0" width="2" height="30" fill="#000"/>
        <rect x="60" y="0" width="3" height="30" fill="#000"/>
        <rect x="66" y="0" width="4" height="30" fill="#000"/>
        <rect x="73" y="0" width="1" height="30" fill="#000"/>
        <rect x="78" y="0" width="3" height="30" fill="#000"/>
        <rect x="84" y="0" width="4" height="30" fill="#000"/>
        <rect x="92" y="0" width="2" height="30" fill="#000"/>
        <rect x="98" y="0" width="3" height="30" fill="#000"/>
        <rect x="105" y="0" width="5" height="30" fill="#000"/>
        <rect x="114" y="0" width="2" height="30" fill="#000"/>
        <rect x="120" y="0" width="4" height="30" fill="#000"/>
        <text x="60" y="42" text-anchor="middle" font-family="monospace" font-size="8" fill="#212529">78091815040335</text>
      </g>
      
      <!-- HACCP mark -->
      <circle cx="138" cy="168" r="8" fill="#0077b6"/>
      <text x="138" y="171" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="5" fill="#ffffff">HACCP</text>
    </g>
  </g>
</svg>
`)}`;

export const STRAWBERRY_IMAGE = `https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80`;
