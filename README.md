# UDBHAV 2K26 — Freshers Party Invitation Website

A bespoke, responsive single-page invitation website for **UDBHAV 2K26**, crafted with a distinctive **Cinematic Heritage** creative direction. 

Built with love and devotion by the MCA seniors of **JSS Shri Manjunatheshwara MCA Institute, Vidyagiri, Dharwad**.

---

## ✦ Creative Direction: Cinematic Heritage

1. **Bespoke UDBHAV Emblem & Monogram**:
   - Master vector emblem featuring the radiant star, soaring phoenix U lettermark, celebration crowd silhouette, laurel wreaths, and scroll banner (*JSS MCA DHARWAD*).
   - Crisp SVG vector format embedded in the intro, navbar, admission pass, and footer hallmark, plus scalable SVG favicon.

2. **Cinematic 3–5 Second Entrance Experience**:
   - Theatrical panel-parting reveal with animated gold emblem, Roman date (`SATURDAY · XIV · XI · MMXXVI`), ornamental corner fleurons (`⚜`), and gold-seal **ENTER THE CELEBRATION** CTA.
   - Smooth `sessionStorage` recall so returning guests enter instantly, with a keyboard-accessible "Direct Access (Skip Intro)" option and "Replay Opening Ceremony" footer trigger.

3. **Cinematic Editorial Event Poster Hero**:
   - Dramatic Roman typography (`Cinzel` headings, `Cormorant Garamond` editorial script, `Poppins` body text).
   - Double hairline ornamental borders, corner fleurons, and Roman numeral metadata (`I. DATE`, `II. TIME`, `III. VENUE`).
   - Hardware-accelerated canvas particle system simulating floating golden dust and embers (battery-conscious and throttled with `IntersectionObserver`).

4. **Animated Invitation Card with 3D Gold-Seal Opening Effect**:
   - Interactive golden wax seal button (`#waxSealBtn`) with breathing aura and haptic feedback.
   - Unrolling calligraphy parchment letter from seniors with watermark monogram, authentic letterhead, and official "Sealed & Delivered" wax stamp.
   - Accompanied by golden confetti burst upon unsealing.

5. **Editorial Timeline of Programme (Acts I–V)**:
   - Structured like a five-act celebration play with elegant concise descriptions:
     - **Act I — Fun Activities & Warm Connections**: "Meet, mingle and make new friends."
     - **Act II — Music & DJ**: "Feel the rhythm and enjoy the beats."
     - **Act III — Cultural Performances**: "Celebrate talent, creativity and expression."
     - **Act IV — Games & Events**: "Join the fun and enjoy friendly challenges."
     - **Act V — Exciting Prizes & Freshers Titles**: "Celebrate achievements and unforgettable moments."

6. **Refined Countdown Presentation**:
   - Target: **14 November 2026, 12:00 PM IST** (`2026-11-14T12:00:00+05:30`).
   - Large, refined numbers with subtle reflection cards and live `aria-live` accessibility announcements.

7. **Important Details & Golden Admission Ticket**:
   - Perforated gold admission ticket with unique Pass ID (`UDBHAV-2K26-JSS-MCA`).
   - One-click **Google Calendar** integration with pre-filled event time, location, and details.
   - Universal **Apple / iCal (.ics)** downloadable calendar file.
   - Direct **Google Maps** link for navigation to MCA Seminar Hall, Vidyagiri, Dharwad.

8. **Museum-Framed Poster Gallery & Lightbox**:
   - Authentic 1440 × 1920 high-resolution event poster framed with beveled passe-partout matting.
   - Fullscreen accessible Lightbox modal with zoom controls (`+`, `-`, reset, double-click), download button, and ESC key dismiss.

9. **Social Sharing Hub**:
   - Native Web Share API integration (`navigator.share`) on mobile and desktop.
   - Direct WhatsApp group sharing with pre-formatted invite message.
   - One-tap URL clipboard copy with accessible floating toast notification.

10. **Memorable Closing Statement**:
    - Hallmark emblem with ancient Vedic blessing: *“Tamaso Ma Jyotirgamaya · Lead us from darkness unto light”*.
    - Moving invitation pledge: *“Here begins your story. Welcome to the family of JSS MCA Dharwad.”*

11. **Background Music Experience**:
    - Minimalist music control in navigation bar with gentle animated soundwave equalizer during playback.
    - User-initiated playback: plays on explicit toggle click or when entering the celebration.
    - Zero autoplay on page load; seamless looping, graceful missing-file handling without JavaScript errors.
    - Audio file location: `audio/background-music.mp3`.

---

## ✦ Design Constraints & Specifications

- **Palette**: Deep burgundy (`#350912`), dark wine (`#1D070B`), near black (`#090407`), antique gold (`#D8A84E`), highlight gold (`#F5D98B`), and warm ivory (`#F7F0E3`).
- **Typography**: Google Fonts `Cinzel` (400–900), `Cormorant Garamond` (400–700 italic/regular), and `Poppins` (300–700).
- **RSVP / Registration**: Strictly excluded per requirements (no forms or payments).
- **Frameworks**: 100% Pure Vanilla HTML5, CSS3, and ES6+ JavaScript (zero external runtime dependencies or libraries).
- **Reduced Motion**: Full `@media (prefers-reduced-motion: reduce)` support.
- **Accessibility & SEO**: WCAG 2.1 AA contrast compliance, Schema.org `Event` JSON-LD structured data, Open Graph, Twitter Cards, and skip links.

---

## ✦ Project Structure

```text
UDBHAV-2K26/
├── audio/                   # Directory for celebration background music asset
│   └── background-music.mp3 # Celebration background music asset
├── css/
│   └── style.css            # Modular, responsive stylesheet with CSS custom properties
├── images/
│   ├── favicon.svg          # UDBHAV 'U' monogram SVG favicon
│   ├── udbhav-emblem.svg    # Official full vector emblem
│   ├── udbhav-symbol.svg    # Compact vector emblem
│   └── udbhav-poster.jpg    # Authentic high-resolution event poster (1440x1920)
├── js/
│   └── main.js              # Accessible modular application logic, audio & timer
├── index.html               # Semantic HTML5 document with Schema.org Event metadata
└── README.md                # Project documentation
```

---

## ✦ Running Locally

No build tools, compilation, or backends required. Standard modern browsers (Chrome, Edge, Safari, Firefox) run the static site directly.

### Option 1: Python HTTP Server
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000).

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

---

## ✦ Deployment

- **GitHub Pages**: Push this repository and configure GitHub Pages to serve from `main` branch (`/root`).
- **Netlify / Vercel**: Drag and drop the folder or connect Git repository.
- **Static Hosting**: Upload all files to any web hosting directory (Apache, Nginx, AWS S3, Cloudflare Pages).

---

## ✦ Compliance & Specifications

- **Event Date**: 14 November 2026, 12:00 PM IST (Saturday)
- **Venue**: MCA Seminar Hall, JSS Shri Manjunatheshwara MCA Institute, Vidyagiri, Dharwad, Karnataka 580004
- **RSVP**: Intentionally omitted (no registration forms required)
- **Frameworks**: Pure Vanilla HTML5, CSS3 & ES6+ JavaScript (zero external runtime dependencies)
