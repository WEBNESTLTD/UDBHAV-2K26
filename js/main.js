/**
 * UDBHAV 2K26 — Freshers Party Official Invitation Website
 * JSS Shri Manjunatheshwara MCA Institute, Vidyagiri, Dharwad
 * Production-ready JavaScript
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Constants & Configuration
  // ---------------------------------------------------------------------------
  // Target Event Time: 14 November 2026, 12:00:00 PM IST (+05:30)
  const EVENT_TIMESTAMP = new Date('2026-11-14T12:00:00+05:30').getTime();
  const EVENT_END_TIMESTAMP = new Date('2026-11-14T17:00:00+05:30').getTime();

  const DOM = {
    introScreen: document.getElementById('introScreen'),
    enterButton: document.getElementById('enterButton'),
    skipIntroButton: document.getElementById('skipIntroButton'),
    replayIntroBtn: document.getElementById('replayIntroBtn'),
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('navMenu'),
    navBackdrop: document.getElementById('navBackdrop'),
    menuToggle: document.getElementById('menuToggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggle: document.getElementById('themeToggle'),
    metaThemeColor: document.getElementById('metaThemeColor'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    countdownMessage: document.getElementById('countdownMessage'),
    viewPoster: document.getElementById('viewPoster'),
    posterPreview: document.getElementById('posterPreview'),
    posterLightbox: document.getElementById('posterLightbox'),
    closePoster: document.getElementById('closePoster'),
    lightboxOverlay: document.getElementById('lightboxOverlay'),
    lightboxImg: document.getElementById('lightboxImg'),
    lightboxZoomIn: document.getElementById('lightboxZoomIn'),
    lightboxZoomOut: document.getElementById('lightboxZoomOut'),
    lightboxResetZoom: document.getElementById('lightboxResetZoom'),
    downloadIcsBtn: document.getElementById('downloadIcsBtn'),
    shareButton: document.getElementById('shareButton'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    whatsappShareBtn: document.getElementById('whatsappShareBtn'),
    toast: document.getElementById('toast'),
    toastText: document.getElementById('toastText'),
    waxSealBtn: document.getElementById('waxSealBtn'),
    waxSealWrapper: document.getElementById('waxSealWrapper'),
    waxSealTip: document.getElementById('waxSealTip'),
    resealBtn: document.getElementById('resealBtn'),
    sealParticles: document.getElementById('sealParticles'),
    invitationParchment: document.getElementById('invitationParchment'),
    envelopeContainer: document.querySelector('.envelope-container'),
    particleCanvas: document.getElementById('particleCanvas'),
    confettiCanvas: document.getElementById('confettiCanvas'),
    reveals: document.querySelectorAll('.reveal'),
    backToTop: document.getElementById('backToTop'),
    timelineTrackFill: document.getElementById('timelineTrackFill'),
    editorialTimeline: document.getElementById('editorialTimeline')
  };

  let lastFocusedElement = null;
  let toastTimer = null;
  let currentZoom = 1;
  const prevCountdown = { d: null, h: null, m: null, s: null };

  // ---------------------------------------------------------------------------
  // 2. Audio Architecture (Reserved for Future Implementation)
  // ---------------------------------------------------------------------------
  // Clean placeholder: background music and sound effects will be integrated here
  // when audio assets are provided, without requiring website redesign.

  // ---------------------------------------------------------------------------
  // 3. Canvas Confetti System (Pure Vanilla JS)
  // ---------------------------------------------------------------------------
  let confettiParticles = [];
  let confettiAnimId = null;

  function launchConfetti(durationMs = 2800) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = DOM.confettiCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#dfb76c', '#f5d78e', '#ffffff', '#a21e2d', '#fdf5df', '#c5973b'];
    confettiParticles = [];

    const count = window.innerWidth < 768 ? 55 : 110;
    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 80,
        w: Math.random() * 9 + 4,
        h: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        velY: Math.random() * 3 + 2.5,
        velX: (Math.random() - 0.5) * 3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        opacity: 1
      });
    }

    const startTime = Date.now();

    function renderConfetti() {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeCount = 0;
      confettiParticles.forEach((p) => {
        p.y += p.velY;
        p.x += p.velX;
        p.rotation += p.rotSpeed;

        if (elapsed > durationMs - 800) {
          p.opacity = Math.max(0, p.opacity - 0.025);
        }

        if (p.y < canvas.height + 20 && p.opacity > 0) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (activeCount > 0 && elapsed < durationMs) {
        confettiAnimId = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(confettiAnimId);
      }
    }

    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
    renderConfetti();
  }

  // ---------------------------------------------------------------------------
  // 4. Toast Notification System
  // ---------------------------------------------------------------------------
  function showToast(message, duration = 3000) {
    if (!DOM.toast || !DOM.toastText) return;
    DOM.toastText.textContent = message;
    DOM.toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, duration);
  }

  // ---------------------------------------------------------------------------
  // 5. Theme Toggle (Dark & Light) with Persistence
  // ---------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('udbhav_theme_2k26');
    if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      if (DOM.metaThemeColor) DOM.metaThemeColor.setAttribute('content', '#faf3ea');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      if (DOM.metaThemeColor) DOM.metaThemeColor.setAttribute('content', '#0e0508');
    }

    if (DOM.themeToggle) {
      DOM.themeToggle.addEventListener('click', toggleTheme);
    }
  }

  function toggleTheme() {
    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('udbhav_theme_2k26', 'dark');
      if (DOM.metaThemeColor) DOM.metaThemeColor.setAttribute('content', '#0e0508');
      showToast('Switched to Cinematic Dark theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('udbhav_theme_2k26', 'light');
      if (DOM.metaThemeColor) DOM.metaThemeColor.setAttribute('content', '#faf3ea');
      showToast('Switched to Classic Ivory theme');
    }
  }

  // ---------------------------------------------------------------------------
  // 6. Entrance Intro Screen
  // ---------------------------------------------------------------------------
  function closeIntro(triggerConfetti = true) {
    if (!DOM.introScreen) return;
    DOM.introScreen.classList.add('hide');
    DOM.introScreen.setAttribute('aria-hidden', 'true');
    document.body.classList.add('entered');
    sessionStorage.setItem('udbhav_entered_2k26', 'true');

    if (triggerConfetti) {
      launchConfetti(3200);
    }

    // Focus on main content after curtain opens
    setTimeout(() => {
      const homeHeading = document.querySelector('.hero-title');
      if (homeHeading) homeHeading.focus();
    }, 600);
  }

  function openIntro() {
    if (!DOM.introScreen) return;
    DOM.introScreen.classList.remove('hide');
    DOM.introScreen.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('entered');
    if (DOM.enterButton) DOM.enterButton.focus();
  }

  function initIntro() {
    const hasEntered = sessionStorage.getItem('udbhav_entered_2k26');
    const hasHash = window.location.hash && window.location.hash !== '#home';

    if (hasEntered === 'true' || hasHash) {
      if (DOM.introScreen) {
        DOM.introScreen.classList.add('hide');
        DOM.introScreen.setAttribute('aria-hidden', 'true');
      }
      document.body.classList.add('entered');
    } else {
      if (DOM.enterButton) DOM.enterButton.focus();
    }

    if (DOM.enterButton) {
      DOM.enterButton.addEventListener('click', () => closeIntro(true));
    }
    if (DOM.skipIntroButton) {
      DOM.skipIntroButton.addEventListener('click', () => closeIntro(false));
    }
    if (DOM.replayIntroBtn) {
      DOM.replayIntroBtn.addEventListener('click', () => {
        openIntro();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Allow Enter key or Space on intro screen to enter
    document.addEventListener('keydown', (e) => {
      if (DOM.introScreen && !DOM.introScreen.classList.contains('hide')) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          e.preventDefault();
          closeIntro(true);
        }
      }
    });
  }

  function triggerDigitTick(cardElement) {
    if (!cardElement) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cardElement.classList.remove('digit-tick');
    void cardElement.offsetWidth; // Force reflow
    cardElement.classList.add('digit-tick');
  }

  // ---------------------------------------------------------------------------
  // 7. Live Countdown Timer
  // ---------------------------------------------------------------------------
  function updateCountdown() {
    const now = Date.now();
    const distance = EVENT_TIMESTAMP - now;

    if (distance <= 0) {
      const endDistance = EVENT_END_TIMESTAMP - now;
      if (DOM.days) DOM.days.textContent = '00';
      if (DOM.hours) DOM.hours.textContent = '00';
      if (DOM.minutes) DOM.minutes.textContent = '00';
      if (DOM.seconds) DOM.seconds.textContent = '00';

      if (DOM.countdownMessage) {
        if (endDistance > 0) {
          DOM.countdownMessage.innerHTML = '🎉 <strong class="gold-gradient-text">UDBHAV 2K26 is Happening NOW!</strong> Welcome Freshers!';
        } else {
          DOM.countdownMessage.innerHTML = '✨ Thank you for making <strong class="gold-gradient-text">UDBHAV 2K26</strong> truly unforgettable!';
        }
      }
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    const dStr = String(d).padStart(2, '0');
    const hStr = String(h).padStart(2, '0');
    const mStr = String(m).padStart(2, '0');
    const sStr = String(s).padStart(2, '0');

    if (DOM.days) {
      if (prevCountdown.d !== null && prevCountdown.d !== dStr) {
        triggerDigitTick(DOM.days.closest('.time-card'));
      }
      DOM.days.textContent = dStr;
      prevCountdown.d = dStr;
    }

    if (DOM.hours) {
      if (prevCountdown.h !== null && prevCountdown.h !== hStr) {
        triggerDigitTick(DOM.hours.closest('.time-card'));
      }
      DOM.hours.textContent = hStr;
      prevCountdown.h = hStr;
    }

    if (DOM.minutes) {
      if (prevCountdown.m !== null && prevCountdown.m !== mStr) {
        triggerDigitTick(DOM.minutes.closest('.time-card'));
      }
      DOM.minutes.textContent = mStr;
      prevCountdown.m = mStr;
    }

    if (DOM.seconds) {
      if (prevCountdown.s !== null && prevCountdown.s !== sStr) {
        triggerDigitTick(DOM.seconds.closest('.time-card'));
      }
      DOM.seconds.textContent = sStr;
      prevCountdown.s = sStr;
    }

    if (DOM.countdownMessage) {
      if (d === 0) {
        DOM.countdownMessage.textContent = 'Today is the day! See you at 12:00 PM in Seminar Hall!';
      } else if (d === 1) {
        DOM.countdownMessage.textContent = 'Only 1 day left! Get ready for an electrifying celebration!';
      } else {
        DOM.countdownMessage.textContent = 'Every second brings us closer. A new memory is waiting to be made!';
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 8. Navigation, Mobile Drawer & Scrollspy
  // ---------------------------------------------------------------------------
  function toggleMobileMenu(forceState) {
    if (!DOM.navMenu || !DOM.menuToggle) return;
    const isOpen = DOM.navMenu.classList.contains('open');
    const newState = typeof forceState === 'boolean' ? forceState : !isOpen;

    DOM.navMenu.classList.toggle('open', newState);
    DOM.menuToggle.setAttribute('aria-expanded', String(newState));
    if (DOM.navBackdrop) DOM.navBackdrop.classList.toggle('show', newState);

    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function initNavigation() {
    if (DOM.menuToggle) {
      DOM.menuToggle.addEventListener('click', () => toggleMobileMenu());
    }

    if (DOM.navBackdrop) {
      DOM.navBackdrop.addEventListener('click', () => toggleMobileMenu(false));
    }

    DOM.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.navMenu && DOM.navMenu.classList.contains('open')) {
        toggleMobileMenu(false);
        if (DOM.menuToggle) DOM.menuToggle.focus();
      }
    });

    const sections = document.querySelectorAll('section[id], header[id]');
    
    function onScroll() {
      const scrollPos = window.scrollY;

      if (DOM.navbar) {
        DOM.navbar.classList.toggle('scrolled', scrollPos > 40);
      }

      let currentSectionId = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        DOM.navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------------------------------------------------------------------------
  // 9. Poster Lightbox Modal with Zoom Controls
  // ---------------------------------------------------------------------------
  function applyZoom() {
    if (!DOM.lightboxImg) return;
    DOM.lightboxImg.style.transform = `scale(${currentZoom})`;
    if (currentZoom > 1) {
      DOM.lightboxImg.classList.add('zoomed');
    } else {
      DOM.lightboxImg.classList.remove('zoomed');
    }
  }

  function resetZoom() {
    currentZoom = 1;
    applyZoom();
  }

  function openPosterModal() {
    if (!DOM.posterLightbox) return;
    lastFocusedElement = document.activeElement;
    resetZoom();
    DOM.posterLightbox.classList.add('open');
    DOM.posterLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (DOM.closePoster) DOM.closePoster.focus();
    }, 50);
  }

  function closePosterModal() {
    if (!DOM.posterLightbox) return;
    DOM.posterLightbox.classList.remove('open');
    DOM.posterLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    resetZoom();

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function initPosterLightbox() {
    if (DOM.viewPoster) DOM.viewPoster.addEventListener('click', openPosterModal);
    if (DOM.posterPreview) DOM.posterPreview.addEventListener('click', openPosterModal);
    if (DOM.closePoster) DOM.closePoster.addEventListener('click', closePosterModal);
    if (DOM.lightboxOverlay) DOM.lightboxOverlay.addEventListener('click', closePosterModal);

    if (DOM.lightboxZoomIn) {
      DOM.lightboxZoomIn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentZoom < 2.5) {
          currentZoom += 0.3;
          applyZoom();
        }
      });
    }

    if (DOM.lightboxZoomOut) {
      DOM.lightboxZoomOut.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentZoom > 0.8) {
          currentZoom -= 0.3;
          applyZoom();
        }
      });
    }

    if (DOM.lightboxResetZoom) {
      DOM.lightboxResetZoom.addEventListener('click', (e) => {
        e.stopPropagation();
        resetZoom();
      });
    }

    if (DOM.lightboxImg) {
      DOM.lightboxImg.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        currentZoom = currentZoom === 1 ? 1.8 : 1;
        applyZoom();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.posterLightbox && DOM.posterLightbox.classList.contains('open')) {
        closePosterModal();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 10. Add to Calendar (iCalendar .ics Generator)
  // ---------------------------------------------------------------------------
  function generateIcsFile() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//UDBHAV 2K26//Freshers Party Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:udbhav-2k26-jss-mca-dharwad@jssdharwad.org',
      'DTSTAMP:20261111T120000Z',
      'DTSTART:20261114T063000Z',
      'DTEND:20261114T113000Z',
      'SUMMARY:UDBHAV 2K26 — Freshers Party',
      'DESCRIPTION:Official Freshers Party welcoming new juniors to JSS Shri Manjunatheshwara MCA Institute. Music\\, cultural performances\\, fun games\\, and memorable celebrations.',
      'LOCATION:Seminar Hall\\, JSS Shri Manjunatheshwara MCA Institute\\, Vidyagiri\\, Dharwad\\, Karnataka 580004',
      'STATUS:CONFIRMED',
      'CLASS:PUBLIC',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'UDBHAV-2K26-Invitation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Event saved! Opening in your calendar app...');
  }

  function initCalendar() {
    if (DOM.downloadIcsBtn) {
      DOM.downloadIcsBtn.addEventListener('click', generateIcsFile);
    }
  }

  // ---------------------------------------------------------------------------
  // 11. Social Sharing System
  // ---------------------------------------------------------------------------
  const INVITE_TEXT = 'You’re cordially invited to UDBHAV 2K26 – Freshers Party! Saturday, 14 November 2026 at 12:00 PM IST in Seminar Hall, JSS Shri Manjunatheshwara MCA Institute, Vidyagiri, Dharwad.';

  function shareInvitation() {
    const shareData = {
      title: 'UDBHAV 2K26 — Freshers Party',
      text: INVITE_TEXT,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).then(() => {
        launchConfetti(2400);
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      });
    } else {
      copyToClipboard();
    }
  }

  function copyToClipboard() {
    const textToCopy = `${INVITE_TEXT}\n\nOfficial Invitation: ${window.location.href}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Invitation copied to clipboard! Share it with friends!');
        launchConfetti(2200);
      }).catch(() => {
        fallbackCopyText(textToCopy);
      });
    } else {
      fallbackCopyText(textToCopy);
    }
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Invitation copied to clipboard! Share it with friends!');
      launchConfetti(2200);
    } catch (e) {
      showToast('Unable to copy automatically. Please copy the URL from your browser bar.');
    }
    document.body.removeChild(textArea);
  }

  function initSharing() {
    if (DOM.shareButton) {
      DOM.shareButton.addEventListener('click', shareInvitation);
    }

    if (DOM.copyLinkBtn) {
      DOM.copyLinkBtn.addEventListener('click', () => {
        const url = window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(() => {
            showToast('Invitation website link copied to clipboard!');
            launchConfetti(2000);
          }).catch(() => {
            fallbackCopyText(url);
          });
        } else {
          fallbackCopyText(url);
        }
      });
    }

    if (DOM.whatsappShareBtn) {
      const currentUrl = encodeURIComponent(window.location.href);
      const message = encodeURIComponent(`${INVITE_TEXT}\n\nOfficial Website: `);
      DOM.whatsappShareBtn.href = `https://api.whatsapp.com/send?text=${message}${currentUrl}`;
    }
  }

  // ---------------------------------------------------------------------------
  // 12. Cinematic Interactive Envelope & Wax Seal Opening Experience
  // ---------------------------------------------------------------------------
  let isEnvelopeAnimating = false;

  function burstGoldSealParticles() {
    const container = DOM.sealParticles || document.getElementById('sealParticles');
    if (!container) return;
    container.innerHTML = '';

    const count = 22;
    const colors = ['#fffbf0', '#f7e1a9', '#d4af37', '#aa8228', '#ffffff'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'seal-particle';
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const distance = 35 + Math.random() * 55;
      const size = 3 + Math.random() * 3.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = 500 + Math.random() * 350;

      p.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
      p.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.backgroundColor = color;
      p.style.animationDuration = `${duration}ms`;

      container.appendChild(p);
    }

    setTimeout(() => {
      container.innerHTML = '';
    }, 900);
  }

  function toggleInvitation(open, silent = false) {
    const btn = DOM.waxSealBtn;
    const container = DOM.envelopeContainer;
    const tip = DOM.waxSealTip || (btn ? btn.querySelector('.wax-seal-tip') : null);
    if (!btn || !container) return;

    if (isEnvelopeAnimating) return;
    isEnvelopeAnimating = true;

    const isCurrentlyExpanded = btn.getAttribute('aria-expanded') === 'true';
    const shouldOpen = open !== undefined ? open : !isCurrentlyExpanded;

    if (shouldOpen) {
      btn.classList.add('is-pressing');
      setTimeout(() => {
        btn.classList.remove('is-pressing');
        btn.classList.add('has-cracked');
        burstGoldSealParticles();
      }, 140);

      setTimeout(() => {
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Invitation letter is open. Tap to fold and reseal invitation');
        container.classList.add('is-unsealed');
        if (tip) tip.textContent = 'INVITATION OPEN · TAP TO RESEAL';

        if (!silent) {
          launchConfetti(2400);
          showToast('Your invitation has been unsealed ✦');
        }

        setTimeout(() => {
          isEnvelopeAnimating = false;
        }, 700);
      }, 260);
    } else {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open your invitation letter from seniors');
      container.classList.remove('is-unsealed');
      if (tip) tip.textContent = 'TAP TO OPEN YOUR INVITATION';

      setTimeout(() => {
        btn.classList.remove('has-cracked');
        isEnvelopeAnimating = false;
      }, 700);

      if (!silent) {
        showToast('Invitation folded and resealed ✦');
      }
    }
  }

  function unsealInvitation(silent = false) {
    toggleInvitation(true, silent);
  }

  function resealInvitation(silent = false) {
    toggleInvitation(false, silent);
  }

  function initWaxSeal() {
    if (DOM.waxSealBtn) {
      DOM.waxSealBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleInvitation(undefined, false);
      });

      DOM.waxSealBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleInvitation(undefined, false);
        }
      });
    }

    if (DOM.resealBtn) {
      DOM.resealBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resealInvitation(false);
      });

      DOM.resealBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          resealInvitation(false);
        }
      });
    }

    // Auto-unseal when user clicks the hero "UNSEAL YOUR INVITATION" button
    const heroUnsealBtn = document.querySelector('a[href="#welcome"]');
    if (heroUnsealBtn) {
      heroUnsealBtn.addEventListener('click', () => {
        setTimeout(() => {
          if (DOM.waxSealBtn && DOM.waxSealBtn.getAttribute('aria-expanded') !== 'true') {
            unsealInvitation(false);
          }
        }, 500);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 13. Ambient Golden Dust / Embers Particle Canvas
  // ---------------------------------------------------------------------------
  function initParticleCanvas() {
    const canvas = DOM.particleCanvas;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;
    let isVisible = true;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    }

    function createParticles() {
      const count = window.innerWidth < 768 ? 28 : 65;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.6,
          speedY: Math.random() * 0.45 + 0.15,
          speedX: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.65 + 0.2,
          pulse: Math.random() * 0.02 + 0.01,
          color: Math.random() > 0.35 ? '#f5d78e' : '#dfb76c'
        });
      }
    }

    function render() {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulse * 0.05) * 0.005;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.opacity));
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = '#d4a74e';
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    render();

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            render();
          }
        } else {
          isVisible = false;
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.05 });

    const heroSection = document.getElementById('home');
    if (heroSection) heroObserver.observe(heroSection);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isVisible = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        render();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 13. Scroll Reveal Animations & Progressive Timeline (IntersectionObserver)
  // ---------------------------------------------------------------------------
  function initScrollReveal() {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced || !('IntersectionObserver' in window)) {
      DOM.reveals.forEach(el => el.classList.add('visible'));
      if (DOM.timelineTrackFill) DOM.timelineTrackFill.classList.add('drawn');
      document.querySelectorAll('.timeline-act').forEach(act => act.classList.add('act-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.id === 'editorialTimeline' || entry.target.contains(DOM.timelineTrackFill)) {
            if (DOM.timelineTrackFill) {
              DOM.timelineTrackFill.classList.add('drawn');
            }
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    DOM.reveals.forEach((el) => observer.observe(el));

    // Five-Act Timeline progressive reveal & ornament pulse
    const timelineActs = document.querySelectorAll('.timeline-act');
    if (timelineActs.length > 0) {
      const actObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('act-visible');
            if (DOM.timelineTrackFill) {
              DOM.timelineTrackFill.classList.add('drawn');
            }
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
      });

      timelineActs.forEach(act => actObserver.observe(act));
    }
  }

  // ---------------------------------------------------------------------------
  // 14. Initialization
  // ---------------------------------------------------------------------------
  function init() {
    initTheme();
    initIntro();
    initNavigation();
    initPosterLightbox();
    initCalendar();
    initWaxSeal();
    initSharing();
    initParticleCanvas();
    initScrollReveal();

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
