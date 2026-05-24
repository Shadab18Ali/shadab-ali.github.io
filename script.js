/* ============================================================
   SHADAB ALI PORTFOLIO — script.js (v4 — 3D Premium Upgrade)
   Three.js hero object + GSAP ScrollTrigger + all original logic
   ============================================================ */

/* ── EmailJS ──────────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

(function () {
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

/* ── GLOBALS ──────────────────────────────────────────────── */
const IS_TOUCH   = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
const IS_MOBILE  = window.matchMedia('(max-width: 768px)').matches;
const IS_DESKTOP = window.matchMedia('(min-width: 1025px)').matches;
const REDUCED    = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ACCENT = '#a8ff3e';

/* ── BOOT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initAmbientGlow();
  initScrolledNav();
  initNavHighlight();
  initMobileMenu();
  initCounters();
  initPhotoUpload();
  initFormSubmit();
  initMarqueeHover();

  if (!REDUCED) {
    initThreeHero();
    initGSAP();
    initCard3DTilt();
    initMagneticButtons();
    initParticles();
  } else {
    // Reduced motion: just show all reveals immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
});

/* ══════════════════════════════════════════════════════════
   1. THREE.JS HERO — floating geometric object
   ══════════════════════════════════════════════════════════ */
function initThreeHero() {
  const container = document.getElementById('hero3dCanvas');
  if (!container) return;

  container.innerHTML = `
    <svg id="devSvg" viewBox="0 0 520 480" xmlns="http://www.w3.org/2000/svg"
         style="width:100%;height:100%;display:block;">
      <defs>
        <radialGradient id="deskGlow" cx="50%" cy="80%" r="55%">
          <stop offset="0%" stop-color="#a8ff3e" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#a8ff3e" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="screenGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#a8ff3e" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#0a1a00" stop-opacity="0"/>
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="screenBloom">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1a1a1a"/>
          <stop offset="100%" stop-color="#0d0d0d"/>
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0d1a00"/>
          <stop offset="100%" stop-color="#050f00"/>
        </linearGradient>
        <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#111"/>
          <stop offset="100%" stop-color="#0a0a0a"/>
        </linearGradient>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c8956c"/>
          <stop offset="100%" stop-color="#a8714a"/>
        </linearGradient>
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e2420"/>
          <stop offset="100%" stop-color="#141a12"/>
        </linearGradient>
        <clipPath id="screenClip">
          <rect x="148" y="118" width="164" height="106" rx="3"/>
        </clipPath>
      </defs>

      <!-- ambient desk glow -->
      <ellipse cx="260" cy="390" rx="200" ry="60" fill="url(#deskGlow)" class="dev-float"/>

      <!-- ── DESK ── -->
      <rect x="60" y="360" width="400" height="16" rx="4" fill="url(#deskGrad)" stroke="#1e1e1e" stroke-width="1"/>
      <!-- desk edge highlight -->
      <rect x="60" y="360" width="400" height="2" rx="2" fill="#2a2a2a"/>

      <!-- ── LAPTOP BASE ── -->
      <rect x="130" y="340" width="240" height="24" rx="5" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="1"/>
      <rect x="130" y="340" width="240" height="3" rx="2" fill="#282828"/>
      <!-- touchpad -->
      <rect x="218" y="348" width="64" height="10" rx="3" fill="#141414" stroke="#222" stroke-width="0.8"/>

      <!-- ── LAPTOP LID / SCREEN ── -->
      <rect x="140" y="110" width="220" height="232" rx="10" fill="#111" stroke="#222" stroke-width="1.5"/>
      <rect x="148" y="118" width="204" height="116" rx="3" fill="url(#screenGrad)" stroke="#1a2600" stroke-width="1"/>

      <!-- screen glow bloom -->
      <rect x="148" y="118" width="204" height="116" rx="3" fill="url(#screenGlow)" filter="url(#screenBloom)" opacity="0.7"/>

      <!-- ── CODE ON SCREEN ── -->
      <g clip-path="url(#screenClip)" class="code-lines">
        <!-- line 1 -->
        <rect x="158" y="128" width="18" height="5" rx="1.5" fill="#a8ff3e" opacity="0.9"/>
        <rect x="180" y="128" width="36" height="5" rx="1.5" fill="#6bde1a" opacity="0.7"/>
        <rect x="220" y="128" width="22" height="5" rx="1.5" fill="#4ade80" opacity="0.6"/>
        <!-- line 2 -->
        <rect x="164" y="138" width="28" height="5" rx="1.5" fill="#7dd3fc" opacity="0.7"/>
        <rect x="196" y="138" width="14" height="5" rx="1.5" fill="#a8ff3e" opacity="0.55"/>
        <rect x="214" y="138" width="42" height="5" rx="1.5" fill="#94a3b8" opacity="0.4"/>
        <!-- line 3 -->
        <rect x="164" y="148" width="52" height="5" rx="1.5" fill="#f472b6" opacity="0.65"/>
        <rect x="220" y="148" width="20" height="5" rx="1.5" fill="#a8ff3e" opacity="0.7"/>
        <!-- line 4 -->
        <rect x="164" y="158" width="30" height="5" rx="1.5" fill="#94a3b8" opacity="0.4"/>
        <rect x="198" y="158" width="44" height="5" rx="1.5" fill="#7dd3fc" opacity="0.6"/>
        <!-- line 5 -->
        <rect x="158" y="168" width="18" height="5" rx="1.5" fill="#a8ff3e" opacity="0.9"/>
        <rect x="180" y="168" width="28" height="5" rx="1.5" fill="#f472b6" opacity="0.5"/>
        <!-- line 6 -->
        <rect x="164" y="178" width="60" height="5" rx="1.5" fill="#94a3b8" opacity="0.35"/>
        <!-- line 7 -->
        <rect x="164" y="188" width="22" height="5" rx="1.5" fill="#7dd3fc" opacity="0.65"/>
        <rect x="190" y="188" width="18" height="5" rx="1.5" fill="#a8ff3e" opacity="0.8"/>
        <rect x="212" y="188" width="32" height="5" rx="1.5" fill="#4ade80" opacity="0.55"/>
        <!-- cursor blink -->
        <rect x="158" y="200" width="2" height="8" rx="1" fill="#a8ff3e" opacity="0.9" class="cursor-blink"/>
      </g>

      <!-- screen bezel bottom -->
      <rect x="148" y="234" width="204" height="8" rx="2" fill="#0a0a0a"/>
      <!-- webcam dot -->
      <circle cx="250" cy="115" r="2.5" fill="#1a1a1a" stroke="#222" stroke-width="0.8"/>
      <circle cx="250" cy="115" r="1" fill="#a8ff3e" opacity="0.4"/>

      <!-- laptop hinge -->
      <rect x="220" y="338" width="60" height="6" rx="3" fill="#161616" stroke="#222" stroke-width="0.8"/>

      <!-- ── PERSON — chair/body ── -->
      <!-- chair back -->
      <rect x="195" y="250" width="110" height="130" rx="8" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="1.5" opacity="0.5"/>

      <!-- torso / shirt -->
      <path d="M210 320 Q210 295 250 285 Q290 295 290 320 L292 360 L208 360 Z"
            fill="url(#shirtGrad)" stroke="#1e2420" stroke-width="1"/>
      <!-- shirt collar highlight -->
      <path d="M238 285 L250 298 L262 285" fill="none" stroke="#2a3326" stroke-width="1.5" stroke-linecap="round"/>

      <!-- neck -->
      <rect x="243" y="270" width="14" height="20" rx="6" fill="url(#skinGrad)"/>

      <!-- head -->
      <ellipse cx="250" cy="255" rx="30" ry="32" fill="url(#skinGrad)"/>
      <!-- hair -->
      <path d="M220 245 Q222 215 250 212 Q278 215 280 245 Q275 228 250 226 Q225 228 220 245 Z"
            fill="#1a0f08"/>
      <!-- hair top detail -->
      <path d="M228 228 Q250 218 272 228" fill="none" stroke="#2a1810" stroke-width="3" stroke-linecap="round"/>

      <!-- ear -->
      <ellipse cx="220" cy="256" rx="5" ry="7" fill="#b8804a"/>
      <ellipse cx="280" cy="256" rx="5" ry="7" fill="#b8804a"/>

      <!-- eyes -->
      <ellipse cx="238" cy="250" rx="5" ry="4.5" fill="#0d0d0d"/>
      <ellipse cx="262" cy="250" rx="5" ry="4.5" fill="#0d0d0d"/>
      <!-- eye highlight -->
      <circle cx="240" cy="248" r="1.5" fill="#fff" opacity="0.9"/>
      <circle cx="264" cy="248" r="1.5" fill="#fff" opacity="0.9"/>
      <!-- eyebrows -->
      <path d="M232 242 Q238 239 244 241" fill="none" stroke="#1a0f08" stroke-width="2" stroke-linecap="round"/>
      <path d="M256 241 Q262 239 268 242" fill="none" stroke="#1a0f08" stroke-width="2" stroke-linecap="round"/>
      <!-- slight smile -->
      <path d="M242 262 Q250 267 258 262" fill="none" stroke="#8a5a3a" stroke-width="1.5" stroke-linecap="round"/>

      <!-- glasses -->
      <rect x="229" y="245" width="18" height="13" rx="5" fill="none" stroke="#333" stroke-width="1.5" opacity="0.7"/>
      <rect x="253" y="245" width="18" height="13" rx="5" fill="none" stroke="#333" stroke-width="1.5" opacity="0.7"/>
      <line x1="247" y1="251" x2="253" y2="251" stroke="#333" stroke-width="1.5"/>
      <line x1="220" y1="249" x2="229" y2="250" stroke="#333" stroke-width="1.5"/>
      <line x1="271" y1="250" x2="280" y2="249" stroke="#333" stroke-width="1.5"/>

      <!-- left arm -->
      <path d="M210 310 Q195 320 182 340 Q178 352 190 358"
            fill="none" stroke="#1a1a1a" stroke-width="18" stroke-linecap="round"/>
      <path d="M210 310 Q195 320 182 340 Q178 352 190 358"
            fill="none" stroke="url(#shirtGrad)" stroke-width="16" stroke-linecap="round"/>

      <!-- right arm -->
      <path d="M290 310 Q305 320 318 340 Q322 352 310 358"
            fill="none" stroke="#1a1a1a" stroke-width="18" stroke-linecap="round"/>
      <path d="M290 310 Q305 320 318 340 Q322 352 310 358"
            fill="none" stroke="url(#shirtGrad)" stroke-width="16" stroke-linecap="round"/>

      <!-- left hand on keyboard -->
      <ellipse cx="193" cy="358" rx="14" ry="8" fill="url(#skinGrad)" transform="rotate(-10 193 358)"/>
      <!-- fingers -->
      <path d="M182 354 Q179 348 183 347" stroke="#b8804a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M186 352 Q184 345 188 344" stroke="#b8804a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M191 351 Q190 344 194 343" stroke="#b8804a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M196 352 Q196 345 200 344" stroke="#b8804a" stroke-width="3" fill="none" stroke-linecap="round"/>

      <!-- right hand on keyboard -->
      <ellipse cx="307" cy="358" rx="14" ry="8" fill="url(#skinGrad)" transform="rotate(10 307 358)"/>
      <path d="M318 354 Q321 348 317 347" stroke="#b8804a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M314 352 Q316 345 312 344" stroke="#b8804a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M309 351 Q310 344 306 343" stroke="#b8804a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M304 352 Q304 345 300 344" stroke="#b8804a" stroke-width="3" fill="none" stroke-linecap="round"/>

      <!-- ── FLOATING ELEMENTS ── -->
      <!-- floating tag: </> -->
      <g class="float-tag float-1" opacity="0.75">
        <rect x="60" y="180" width="52" height="24" rx="6" fill="#0d1a00" stroke="#a8ff3e" stroke-width="0.8" stroke-opacity="0.4"/>
        <text x="86" y="196" text-anchor="middle" font-family="monospace" font-size="10" fill="#a8ff3e" opacity="0.85">&lt;/&gt;</text>
      </g>

      <!-- floating tag: {} -->
      <g class="float-tag float-2" opacity="0.65">
        <rect x="400" y="150" width="44" height="22" rx="6" fill="#0d1a00" stroke="#a8ff3e" stroke-width="0.8" stroke-opacity="0.4"/>
        <text x="422" y="165" text-anchor="middle" font-family="monospace" font-size="10" fill="#a8ff3e" opacity="0.8">{  }</text>
      </g>

      <!-- floating tag: () -->
      <g class="float-tag float-3" opacity="0.6">
        <rect x="78" y="290" width="40" height="22" rx="6" fill="#0d1a00" stroke="#6bde1a" stroke-width="0.8" stroke-opacity="0.35"/>
        <text x="98" y="305" text-anchor="middle" font-family="monospace" font-size="10" fill="#6bde1a" opacity="0.75">( )</text>
      </g>

      <!-- floating wifi/signal icon -->
      <g class="float-tag float-4" opacity="0.55" transform="translate(398, 250)">
        <circle cx="12" cy="20" r="2.5" fill="#a8ff3e"/>
        <path d="M5 14 Q12 7 19 14" fill="none" stroke="#a8ff3e" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
        <path d="M1 10 Q12 1 23 10" fill="none" stroke="#a8ff3e" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
      </g>

      <!-- screen light spill on face -->
      <ellipse cx="250" cy="262" rx="45" ry="30" fill="#a8ff3e" opacity="0.025" filter="url(#softGlow)"/>

      <!-- subtle grid lines behind figure -->
      <line x1="60" y1="240" x2="460" y2="240" stroke="#a8ff3e" stroke-width="0.3" opacity="0.06"/>
      <line x1="60" y1="300" x2="460" y2="300" stroke="#a8ff3e" stroke-width="0.3" opacity="0.04"/>
      <line x1="160" y1="110" x2="160" y2="380" stroke="#a8ff3e" stroke-width="0.3" opacity="0.04"/>
      <line x1="340" y1="110" x2="340" y2="380" stroke="#a8ff3e" stroke-width="0.3" opacity="0.04"/>

      <!-- coffee mug -->
      <rect x="390" y="342" width="28" height="22" rx="4" fill="#111" stroke="#1e1e1e" stroke-width="1"/>
      <path d="M418 349 Q428 349 428 356 Q428 363 418 363" fill="none" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round"/>
      <!-- steam -->
      <path d="M398 340 Q400 334 398 328" fill="none" stroke="#a8ff3e" stroke-width="1" stroke-linecap="round" opacity="0.3" class="steam steam-1"/>
      <path d="M404 339 Q406 332 404 326" fill="none" stroke="#a8ff3e" stroke-width="1" stroke-linecap="round" opacity="0.2" class="steam steam-2"/>
    </svg>
  `;

  /* ── Mouse parallax on the SVG ── */
  if (!IS_TOUCH && IS_DESKTOP) {
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    const svg = container.querySelector('#devSvg');
    let cx = 0, cy = 0, rafId;
    const loop = () => {
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;
      if (svg) svg.style.transform = `translate(${cx * 8}px, ${cy * 5}px)`;
      rafId = requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId); else loop();
    });
  }

  /* ── Scroll fade ── */
  const heroSection = document.getElementById('hero');
  window.addEventListener('scroll', () => {
    if (!heroSection) return;
    const p = Math.min(window.scrollY / heroSection.offsetHeight, 1);
    container.style.opacity = Math.max(0, 1 - p * 1.5);
  }, { passive: true });
}
/* ══════════════════════════════════════════════════════════
   2. GSAP + SCROLLTRIGGER
   ══════════════════════════════════════════════════════════ */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // fallback: use CSS reveal
    initScrollReveal();
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero entrance ── */
  const heroTl = gsap.timeline({ delay: 0.15 });
  heroTl
    .from('.hero-eyebrow', {
      opacity: 0, y: 22, duration: 0.8, ease: 'power3.out',
    })
    .from('h1.display', {
      opacity: 0, y: 60, skewY: 4, duration: 1.1, ease: 'power4.out',
    }, '-=0.5')
    .from('.hero-stat', {
      opacity: 0, y: 28, stagger: 0.1, duration: 0.7, ease: 'power3.out',
    }, '-=0.55')
    .from('.hero-accent-bar', {
      opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
    }, '-=0.4')
    .from('.nav', {
      opacity: 0, y: -20, duration: 0.6, ease: 'power2.out',
    }, 0);

  /* ── Generic .reveal via ScrollTrigger ── */
  document.querySelectorAll('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
    el.classList.add('gsap-handled'); // prevent duplicate CSS animation
  });

  /* ── Section titles: word-by-word reveal ── */
  document.querySelectorAll('h2.section-title').forEach(h2 => {
    gsap.fromTo(h2,
      { opacity: 0, y: 50, skewY: 3 },
      {
        opacity: 1, y: 0, skewY: 0,
        duration: 1.0,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: h2,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Project items: staggered slide-in ── */
  gsap.utils.toArray('.project-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        duration: 0.75,
        ease: 'power3.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Cards: scale up + fade ── */
  gsap.utils.toArray('.card-3d').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 45, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: (i % 3) * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Metrics panel: counter cells stagger ── */
  gsap.utils.toArray('.metric-cell').forEach((cell, i) => {
    gsap.fromTo(cell,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1,
        duration: 0.6,
        ease: 'back.out(1.4)',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: cell,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Experience rows: slide from left ── */
  gsap.utils.toArray('.exp-row').forEach((row, i) => {
    gsap.fromTo(row,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: i * 0.07,
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Process steps: sequential reveal ── */
  gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.fromTo(step,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.65,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: step,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Section labels: draw-in from left ── */
  gsap.utils.toArray('.section-label').forEach(label => {
    gsap.fromTo(label,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Skill tags: scatter-in ── */
  gsap.utils.toArray('.skill-tag').forEach((tag, i) => {
    gsap.fromTo(tag,
      { opacity: 0, scale: 0.75, y: 10 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.45,
        ease: 'back.out(2)',
        delay: i * 0.035,
        scrollTrigger: {
          trigger: tag,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Stats row: count-up with scale ── */
  gsap.utils.toArray('.stat-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, scale: 0.85, y: 20 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.6,
        ease: 'back.out(1.5)',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Marquee parallax on scroll ── */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    gsap.to(marqueeTrack, {
      x: '-=80',
      ease: 'none',
      scrollTrigger: {
        trigger: '.marquee-wrap',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }

  /* ── Final CTA: dramatic entrance ── */
  const finalCta = document.querySelector('#finalcta h2');
  if (finalCta) {
    gsap.fromTo(finalCta,
      { opacity: 0, y: 70, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: finalCta,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ── Hero parallax: title moves up slower than scroll ── */
  const heroTitle = document.querySelector('.hero-title-wrap');
  if (heroTitle) {
    gsap.to(heroTitle, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ── About card parallax ── */
  const aboutCard = document.querySelector('.about-card');
  if (aboutCard && IS_DESKTOP) {
    gsap.to(aboutCard, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  /* ── Section background gradient shift ── */
  gsap.utils.toArray('[data-gsap-section]').forEach(section => {
    gsap.fromTo(section,
      { backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 110%, rgba(168,255,62,0) 0%, transparent 70%)' },
      {
        backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,255,62,0.025) 0%, transparent 70%)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 2,
        },
      }
    );
  });
}

/* ══════════════════════════════════════════════════════════
   3. 3D CARD TILT — mouse-driven per-card perspective
   ══════════════════════════════════════════════════════════ */
function initCard3DTilt() {
  if (IS_MOBILE || IS_TOUCH) return;

  const MAX_TILT = 10;
  const MAX_LIFT = 8;

  document.querySelectorAll('.card-3d').forEach(card => {
    let rafId;
    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;
    let isHovered = false;

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      card.style.transition = 'box-shadow 0.3s, border-color 0.3s';
      lerpLoop();
    });

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2); // -1…1
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2); // -1…1
      targetRX = -dy * MAX_TILT;
      targetRY =  dx * MAX_TILT;
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      targetRX = 0;
      targetRY = 0;
      card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s, border-color 0.3s';
      card.style.transform  = '';
      card.style.boxShadow  = '';
    });

    function lerpLoop() {
      if (!isHovered && Math.abs(currentRX) < 0.01 && Math.abs(currentRY) < 0.01) {
        cancelAnimationFrame(rafId);
        return;
      }
      currentRX += (targetRX - currentRX) * 0.1;
      currentRY += (targetRY - currentRY) * 0.1;
      card.style.transform =
        `perspective(900px) rotateX(${currentRX}deg) rotateY(${currentRY}deg) translateY(-${MAX_LIFT}px)`;
      card.style.boxShadow =
        `${-currentRY * 0.9}px ${currentRX * 0.7 + 18}px 50px rgba(0,0,0,0.55),
         0 0 0 1px rgba(168,255,62,${(Math.max(Math.abs(currentRX), Math.abs(currentRY)) / MAX_TILT * 0.18).toFixed(3)})`;
      rafId = requestAnimationFrame(lerpLoop);
    }
  });
}

/* ══════════════════════════════════════════════════════════
   4. MAGNETIC BUTTONS
   ══════════════════════════════════════════════════════════ */
function initMagneticButtons() {
  if (IS_MOBILE || IS_TOUCH) return;

  document.querySelectorAll('.gsap-magnetic, .btn-lime, .hire-float').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.28;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.28;
      if (typeof gsap !== 'undefined') {
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
      } else {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      } else {
        el.style.transform = '';
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════
   5. AMBIENT MOUSE GLOW
   ══════════════════════════════════════════════════════════ */
function initAmbientGlow() {
  if (IS_MOBILE || IS_TOUCH) return;
  const glow = document.getElementById('ambientGlow');
  if (!glow) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let rafId;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  function loop() {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    rafId = requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });
}

/* ══════════════════════════════════════════════════════════
   6. CANVAS PARTICLES — subtle floating dots (fixed layer)
   ══════════════════════════════════════════════════════════ */
function initParticles() {
  if (IS_MOBILE) return; // skip on mobile for perf

  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H;

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COUNT = 60;
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    a: Math.random() * 0.5 + 0.1,
  }));

  let animId;
  const draw = () => {
    animId = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 255, 62, ${p.a})`;
      ctx.fill();
    });
  };
  draw();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
}

/* ══════════════════════════════════════════════════════════
   7. CUSTOM CURSOR (upgraded from v3)
   ══════════════════════════════════════════════════════════ */
function initCursor() {
  if (!IS_DESKTOP || IS_TOUCH) return;

  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  }, { passive: true });

  function lerpRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rafId = requestAnimationFrame(lerpRing);
  }
  lerpRing();

  document.addEventListener('mousedown', () => {
    dot.classList.add('clicking');
    ring.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('clicking');
    ring.classList.remove('clicking');
  });
  document.addEventListener('mouseleave', () => {
    cancelAnimationFrame(rafId);
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    rafId = requestAnimationFrame(lerpRing);
    dot.style.opacity = '';
    ring.style.opacity = '';
  });

  /* Hover targets: links, buttons, cards */
  const hoverTargets = document.querySelectorAll(
    'a, button, .project-item, .card-3d, .service-row, .process-step, .price-card, .skill-tag'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    });
  });

  /* Text cursor state on paragraphs */
  document.querySelectorAll('p, li, .testi-quote').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('text-hover');
      ring.classList.add('text-hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('text-hover');
      ring.classList.remove('text-hover');
    });
  });
}

/* ══════════════════════════════════════════════════════════
   8. SCROLL REVEAL fallback (used when GSAP unavailable)
   ══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════════════════
   9. SCROLLED NAV
   ══════════════════════════════════════════════════════════ */
function initScrolledNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 18);
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   10. ACTIVE NAV HIGHLIGHT
   ══════════════════════════════════════════════════════════ */
function initNavHighlight() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const links    = document.querySelectorAll('.nav-links a');

  const update = () => {
    let active = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 90) active = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + active);
    });
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   11. MOBILE MENU — upgraded with GSAP if available
   ══════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const btn  = document.querySelector('.hbg');
  const menu = document.getElementById('mob-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => toggleMenu(btn, menu));
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu(btn, menu));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu(btn, menu);
  });
}

function toggleMenu(btn, menu) {
  menu.classList.contains('open') ? closeMenu(btn, menu) : openMenu(btn, menu);
}

function openMenu(btn, menu) {
  menu.classList.add('open');
  btn.classList.add('is-open');
  btn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');

  const links = Array.from(menu.querySelectorAll('a'));

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(menu,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
    gsap.fromTo(links,
      { opacity: 0, y: 24, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06, delay: 0.1 }
    );
  } else {
    links.forEach((a, i) => {
      a.style.transitionDelay = `${i * 55}ms`;
      a.style.opacity  = '0';
      a.style.transform = 'translateY(14px)';
      requestAnimationFrame(() => {
        a.style.transition = 'opacity .35s ease, transform .35s ease';
        a.style.opacity    = '1';
        a.style.transform  = 'translateY(0)';
      });
    });
  }
}

function closeMenu(btn, menu) {
  menu.classList.remove('open');
  btn.classList.remove('is-open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  menu.querySelectorAll('a').forEach(a => {
    a.style.transitionDelay = '';
    a.style.opacity  = '';
    a.style.transform = '';
    a.style.transition = '';
  });
}

/* ══════════════════════════════════════════════════════════
   12. ANIMATED COUNTERS
   ══════════════════════════════════════════════════════════ */
function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.55 });

  els.forEach(el => io.observe(el));
}

function countUp(el) {
  const target   = parseFloat(el.getAttribute('data-counter'));
  const suffix   = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const startTs  = performance.now();

  const tick = now => {
    const p  = Math.min((now - startTs) / duration, 1);
    const ep = 1 - Math.pow(1 - p, 3); // ease-out-cubic
    el.textContent = Math.round(target * ep) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ══════════════════════════════════════════════════════════
   13. PHOTO UPLOAD
   ══════════════════════════════════════════════════════════ */
function initPhotoUpload() {
  const input = document.getElementById('photo-input');
  if (!input) return;

  try {
    const saved = localStorage.getItem('sa_photo');
    if (saved) applyPhoto(saved);
  } catch (_) {}

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      applyPhoto(ev.target.result);
      try { localStorage.setItem('sa_photo', ev.target.result); } catch (_) {}
    };
    reader.readAsDataURL(file);
  });
}

function applyPhoto(src) {
  const img  = document.getElementById('avatar-img');
  const init = document.getElementById('avatar-initials');
  if (!img) return;
  img.src = src;
  img.style.display = 'block';
  if (init) init.style.display = 'none';
}

/* ══════════════════════════════════════════════════════════
   14. CONTACT FORM
   ══════════════════════════════════════════════════════════ */
function initFormSubmit() {
  const btn = document.getElementById('submit-btn');
  if (btn) btn.addEventListener('click', handleSubmit);
}

async function handleSubmit() {
  const name    = (document.getElementById('f-name')?.value    || '').trim();
  const email   = (document.getElementById('f-email')?.value   || '').trim();
  const service = (document.getElementById('f-service')?.value || '');
  const url     = (document.getElementById('f-url')?.value     || '').trim();
  const message = (document.getElementById('f-message')?.value || '').trim();
  const btn     = document.getElementById('submit-btn');
  const note    = document.getElementById('form-note');

  clearFormAlerts();
  if (!name)                                  { showFormAlert('Please enter your name.');           return; }
  if (!email || !/\S+@\S+\.\S+/.test(email)) { showFormAlert('Please enter a valid email address.'); return; }
  if (!message)                               { showFormAlert('Please write a message.');           return; }

  const origText   = btn.textContent;
  btn.innerHTML    = '<span class="btn-spinner"></span> Sending…';
  btn.disabled     = true;
  if (note) note.textContent = 'Sending your message…';

  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name, from_email: email,
        service: service || 'Not specified',
        store_url: url   || 'Not provided',
        message,
      });
      showFormSuccess(email);
    } catch (err) {
      btn.textContent = origText;
      btn.disabled    = false;
      if (note) note.textContent = 'Something went wrong — try WhatsApp for the fastest response.';
    }
  } else {
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\nSite: ${url || 'N/A'}\n\n${message}`
    );
    window.open(`mailto:shadab18ali@gmail.com?subject=Portfolio Enquiry — ${name}&body=${body}`);
    showFormSuccess(email);
  }
}

function showFormSuccess(email) {
  const formBody = document.getElementById('form-body');
  const success  = document.getElementById('form-success');
  const replyEl  = document.getElementById('reply-email');
  if (formBody) formBody.style.display = 'none';
  if (replyEl)  replyEl.textContent    = email;
  if (success) {
    success.classList.add('show');
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(success, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }
  }
}

function showFormAlert(msg) {
  clearFormAlerts();
  const p = document.createElement('p');
  p.className = 'form-alert';
  p.style.cssText = [
    'font-family:var(--mono)', 'font-size:.63rem', 'color:#ff4d4d',
    'text-transform:uppercase', 'letter-spacing:.1em',
    'margin:-.4rem 0 .7rem', 'display:flex', 'align-items:center', 'gap:.35rem',
  ].join(';');
  p.innerHTML = '⚠ ' + msg;
  const btn = document.getElementById('submit-btn');
  if (btn) btn.before(p);
  setTimeout(() => p.remove(), 4500);
}

function clearFormAlerts() {
  document.querySelectorAll('.form-alert').forEach(el => el.remove());
}

/* ══════════════════════════════════════════════════════════
   15. MARQUEE PAUSE ON HOVER
   ══════════════════════════════════════════════════════════ */
function initMarqueeHover() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}
