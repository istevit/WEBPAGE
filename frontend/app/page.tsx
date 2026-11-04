'use client';

import React, { useEffect, useState, useRef } from 'react';

// Data definitions
interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { target: 250, suffix: '+', label: 'Active members' },
  { target: 18, suffix: '', label: 'Events this year' },
  { target: 32, suffix: '', label: 'Student projects' },
  { target: 12, suffix: '', label: 'Industry sessions' },
];

interface LearnCardItem {
  num: string;
  icon: string;
  title: string;
  desc: string;
  delay: string;
}

const learnCards: LearnCardItem[] = [
  {
    num: '01',
    icon: '⌁',
    title: 'Technical Skills',
    desc: 'Explore coding, electronics, AI, emerging technologies and hands-on tools.',
    delay: '0',
  },
  {
    num: '02',
    icon: '↗',
    title: 'Build Projects',
    desc: 'Turn ideas into prototypes through collaborative project-based learning.',
    delay: '90',
  },
  {
    num: '03',
    icon: '◎',
    title: 'Industry Exposure',
    desc: 'Learn from professionals, alumni and technical experts through focused sessions.',
    delay: '180',
  },
  {
    num: '04',
    icon: '✦',
    title: 'Leadership',
    desc: 'Take ownership of teams, events, campaigns and meaningful campus initiatives.',
    delay: '270',
  },
];

interface EventItem {
  day: string;
  month: string;
  time: string;
  place: string;
  delay: string;
}

const eventsData: EventItem[] = [
  { day: '18', month: 'OCT', time: '02:00 PM', place: 'LAB 302', delay: '0' },
  { day: '25', month: 'OCT', time: '10:30 AM', place: 'SEMINAR HALL', delay: '80' },
  { day: '08', month: 'NOV', time: '11:00 AM', place: 'AUDITORIUM', delay: '160' },
  { day: '21', month: 'NOV', time: '01:00 PM', place: 'LAB 204', delay: '240' },
  { day: '05', month: 'DEC', time: '03:30 PM', place: 'ROOM 501', delay: '320' },
  { day: '12', month: 'DEC', time: '10:00 AM', place: 'AUDITORIUM', delay: '400' },
];

interface CommitteeMember {
  name: string;
  role: string;
  img?: string;
  link: string;
  placeholder?: string;
}

const committeeRow1: CommitteeMember[] = [
  {
    name: 'Prof. Vijay Purohit',
    role: 'Convenor',
    img: 'https://i.postimg.cc/qqQnf53k/convenor.jpg',
    link: 'https://www.linkedin.com/',
  },
];

const committeeRow2: CommitteeMember[] = [
  {
    name: 'Rishabh Hatlunkar',
    role: 'Chairperson',
    img: 'https://i.postimg.cc/nLKsmWhp/rishabh.jpg',
    link: 'https://www.linkedin.com/in/rishabh-hatlunkar-3947722b4/',
  },
  {
    name: 'Devangini Jadhav',
    role: 'Vice Chairperson',
    img: 'https://i.postimg.cc/XNpxgHVf/Screenshot-2026-10-08-213353.png',
    link: 'https://www.linkedin.com/in/devangini-jadhav-8aa964330/',
  },
];

const committeeRow3: CommitteeMember[] = [
  {
    name: 'Rachit Shrirame',
    role: 'Technical Head',
    img: 'https://i.postimg.cc/zB7YTChy/rachit.png',
    link: 'https://www.linkedin.com/in/rachit-shrirame-4a3293397/',
  },
  {
    name: 'Rakesh Chaudhary',
    role: 'Documentation Head',
    img: 'https://i.postimg.cc/SNw77wk6/rakesh.jpg',
    link: 'https://www.linkedin.com/in/rakeshchaudhary6786/',
  },
  {
    name: 'Tanisha Worlikar',
    role: 'Media & Creative Head',
    img: 'https://i.postimg.cc/9QrtGC64/tanisha.jpg',
    link: 'https://www.linkedin.com/in/tanisha-worlikar-b34084335/',
  },
  {
    name: 'Anay Gore',
    role: 'Media & Creative Co-Head',
    img: 'https://i.postimg.cc/sgv9psks/anay.jpg',
    link: 'https://www.linkedin.com/in/anay-gore-85aa99323/',
  },
];

const committeeRow4: CommitteeMember[] = [
  {
    name: 'Ashwika Bhadauria',
    role: 'Events Head',
    img: 'https://i.postimg.cc/Nj571B3j/Ashwika.jpg',
    link: 'https://www.linkedin.com/in/ashwika-singh-bhadauria-63a07b41b/',
  },
  {
    name: '...',
    role: 'Events Co-Head',
    placeholder: '...',
    link: 'https://www.linkedin.com/',
  },
  {
    name: 'Sahil Auti',
    role: 'Publicity Head',
    img: 'https://i.postimg.cc/t4YthpKV/sahil.jpg',
    link: 'https://www.linkedin.com/',
  },
  {
    name: 'Gayatri Sawant',
    role: 'Publicity Co-Head',
    img: 'https://i.postimg.cc/L8nBz2c4/gayatri.jpg',
    link: 'https://www.linkedin.com/',
  },
];

const faqData = [
  {
    question: 'Who can join ISTE?',
    answer: 'Students interested in technology, projects, learning and leadership can join the chapter.',
    defaultOpen: true,
  },
  {
    question: 'Do I need prior technical experience?',
    answer: 'No. Activities are designed for students with different levels of experience.',
    defaultOpen: false,
  },
  {
    question: 'What kind of events does ISTE conduct?',
    answer: 'Workshops, technical sessions, project activities, competitions and industry-focused sessions.',
    defaultOpen: false,
  },
  {
    question: 'How can I contact the committee?',
    answer: "Use the contact form below or connect through the chapter's social platforms.",
    defaultOpen: false,
  },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hero refs for mouse tilt
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroGlowRef = useRef<HTMLDivElement | null>(null);
  const heroRing1Ref = useRef<HTMLDivElement | null>(null);
  const heroRing2Ref = useRef<HTMLDivElement | null>(null);
  const heroScrollWrapRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Stats counting state
  const [counterValues, setCounterValues] = useState<number[]>([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsTriggeredRef = useRef(false);

  // Form state
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });

  // Handle mobile drawer lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  // Scroll handler for navbar, progress bar, active link, and hero decay
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Scroll progress
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Scrolled state
      setIsScrolled(scrollY > 30);

      // Hero decay
      if (heroScrollWrapRef.current && scrollY <= 750) {
        const scale = Math.max(0.92, 1 - scrollY / 3800);
        const opacity = Math.max(0.35, 1 - scrollY / 700);
        const translateY = scrollY * 0.2;
        heroScrollWrapRef.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        heroScrollWrapRef.current.style.opacity = opacity.toFixed(3);
      }

      // Active section highlight
      const scrollPos = scrollY + 160;
      const sectionIds = ['home', 'about', 'events', 'team', 'faq', 'contact'];
      for (const id of sectionIds) {
        const sec = document.getElementById(id);
        if (sec) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // IntersectionObserver for reveal elements
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .committee-level');
    let observer: IntersectionObserver | null = null;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = el.getAttribute('data-delay');
              if (delay) {
                setTimeout(() => {
                  el.classList.add('revealed');
                }, parseInt(delay, 10));
              } else {
                el.classList.add('revealed');
              }
              obs.unobserve(el);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      revealElements.forEach(el => observer?.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  // Stats counter animation observer
  useEffect(() => {
    const runCounters = () => {
      const duration = 1300;
      const startTime = performance.now();

      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        setCounterValues(statsData.map(s => Math.floor(ease * s.target)));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCounterValues(statsData.map(s => s.target));
        }
      }

      requestAnimationFrame(step);
    };

    let statsObserver: IntersectionObserver | null = null;
    if (statsRef.current && 'IntersectionObserver' in window) {
      statsObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !statsTriggeredRef.current) {
              statsTriggeredRef.current = true;
              runCounters();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );

      statsObserver.observe(statsRef.current);
    } else {
      setCounterValues(statsData.map(s => s.target));
    }

    return () => {
      if (statsObserver) statsObserver.disconnect();
    };
  }, []);

  // 3D Center-Anchored Parallax Effect for ISTE Title
  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const heroTitle = heroTitleRef.current;
    const heroGlow = heroGlowRef.current;
    const heroRing1 = heroRing1Ref.current;
    const heroRing2 = heroRing2Ref.current;

    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetX = 0,
      targetY = 0,
      targetZ = 0;
    let currentX = 0,
      currentY = 0,
      currentZ = 0;
    let targetTiltX = 0,
      targetTiltY = 0;
    let currentTiltX = 0,
      currentTiltY = 0;
    let targetProx = 0,
      currentProx = 0;

    let heroEntranceDone = false;
    function unlockHeroTransform() {
      if (heroEntranceDone) return;
      heroEntranceDone = true;
      if (heroTitle) {
        heroTitle.style.animation = 'none';
        heroTitle.style.opacity = '1';
      }
    }

    if (heroTitle) {
      heroTitle.addEventListener('animationend', unlockHeroTransform, { once: true });
      setTimeout(unlockHeroTransform, 1000);
    }

    let parallaxAnimId: number;
    let handleMouseMove: ((e: MouseEvent) => void) | undefined;
    let handleMouseLeave: (() => void) | undefined;

    if (hasMouse && !prefersReducedMotion && heroSection && heroTitle) {
      handleMouseMove = (e: MouseEvent) => {
        const rect = heroTitle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const boundX = Math.max(window.innerWidth * 0.42, 380);
        const boundY = Math.max(window.innerHeight * 0.42, 280);
        const normX = Math.max(-1, Math.min(1, deltaX / boundX));
        const normY = Math.max(-1, Math.min(1, deltaY / boundY));

        targetX = normX * 8;
        targetY = normY * 8;
        targetTiltX = normY * 4;
        targetTiltY = -normX * 4;

        const dist = Math.hypot(deltaX, deltaY);
        const maxDist = Math.max(window.innerWidth * 0.45, 420);
        targetProx = Math.max(0, Math.min(1, 1 - dist / maxDist));
        targetZ = targetProx * 10;
      };

      handleMouseLeave = () => {
        targetX = 0;
        targetY = 0;
        targetZ = 0;
        targetTiltX = 0;
        targetTiltY = 0;
        targetProx = 0;
      };

      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);

      const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

      const renderHeroCenterParallax = () => {
        currentX = lerp(currentX, targetX, 0.08);
        currentY = lerp(currentY, targetY, 0.08);
        currentZ = lerp(currentZ, targetZ, 0.08);
        currentTiltX = lerp(currentTiltX, targetTiltX, 0.08);
        currentTiltY = lerp(currentTiltY, targetTiltY, 0.08);
        currentProx = lerp(currentProx, targetProx, 0.08);

        if (heroEntranceDone && heroTitle) {
          heroTitle.style.transform = `perspective(1000px) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, ${currentZ.toFixed(2)}px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;

          const shadowBlur = (12 + currentProx * 16).toFixed(1);
          const shadowY = (4 + currentProx * 8).toFixed(1);
          const shadowAlpha = (0.05 + currentProx * 0.1).toFixed(3);
          heroTitle.style.filter = `drop-shadow(0 ${shadowY}px ${shadowBlur}px rgba(23, 20, 95, ${shadowAlpha}))`;
        }

        lettersRef.current.forEach(letter => {
          if (!letter) return;
          const depth = parseFloat(letter.getAttribute('data-depth') || '1.0');
          const diff = depth - 1.0;
          const letterX = (currentX * diff * 0.65).toFixed(2);
          const letterY = (currentY * diff * 0.55).toFixed(2);
          const letterZ = (diff * (7 + currentProx * 6)).toFixed(2);
          letter.style.transform = `translate3d(${letterX}px, ${letterY}px, ${letterZ}px)`;
        });

        if (heroGlow) {
          heroGlow.style.transform = `translate(calc(-50% + ${(-currentX * 1.5).toFixed(2)}px), calc(-50% + ${(-currentY * 1.5).toFixed(2)}px))`;
        }
        if (heroRing1) {
          heroRing1.style.transform = `translate(calc(-50% + ${(-currentX * 1.0).toFixed(2)}px), calc(-50% + ${(-currentY * 1.0).toFixed(2)}px))`;
        }
        if (heroRing2) {
          heroRing2.style.transform = `translate(calc(-50% + ${(currentX * 0.8).toFixed(2)}px), calc(-50% + ${(currentY * 0.8).toFixed(2)}px))`;
        }

        parallaxAnimId = requestAnimationFrame(renderHeroCenterParallax);
      };

      parallaxAnimId = requestAnimationFrame(renderHeroCenterParallax);
    }

    return () => {
      if (parallaxAnimId) cancelAnimationFrame(parallaxAnimId);
      if (heroSection && handleMouseMove) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
      }
      if (heroSection && handleMouseLeave) {
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formValues;
    const subject = encodeURIComponent(`ISTE Website Enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:iste@vit.edu.in?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div
        id="scroll-progress"
        aria-hidden="true"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Navbar */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} id="mainNav">
        <a className="brand" href="#home">
          <div className="logo logo-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.postimg.cc/BQppCddz/ISTE-LOGO.png"
              alt="ISTE logo"
              width={43}
              height={43}
            />
          </div>
          <div className="brand-copy">
            <strong>ISTE Student Chapter</strong>
            <small>Vidyalankar Institute of Technology</small>
          </div>
        </a>

        <div className="links">
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>
            About
          </a>
          <a href="#events" className={activeSection === 'events' ? 'active' : ''}>
            Events
          </a>
          <a href="#team" className={activeSection === 'team' ? 'active' : ''}>
            Committee
          </a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>
            Contact
          </a>
        </div>

        <div className="nav-right">
          <div className="nav-status">
            <i></i> 2026–27 Chapter
          </div>
          <a className="nav-cta" href="#contact">
            Join the Chapter ↗
          </a>
          <button
            className="mobile-toggle"
            id="mobileToggle"
            aria-label="Open menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} id="mobileDrawer">
        <a href="#about" className="drawer-link" onClick={() => setMobileOpen(false)}>
          About Chapter
        </a>
        <a href="#events" className="drawer-link" onClick={() => setMobileOpen(false)}>
          Events Calendar
        </a>
        <a href="#team" className="drawer-link" onClick={() => setMobileOpen(false)}>
          Committee Hierarchy
        </a>
        <a href="#contact" className="drawer-link" onClick={() => setMobileOpen(false)}>
          Contact
        </a>
        <a
          href="#contact"
          className="drawer-cta drawer-link"
          onClick={() => setMobileOpen(false)}
        >
          Join the Chapter ↗
        </a>
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="hero-iste" id="home" ref={heroSectionRef}>
          <div className="hero-glow" id="heroGlow" ref={heroGlowRef} aria-hidden="true" />
          <div
            className="hero-ring hero-ring-1"
            id="heroRing1"
            ref={heroRing1Ref}
            aria-hidden="true"
          />
          <div
            className="hero-ring hero-ring-2"
            id="heroRing2"
            ref={heroRing2Ref}
            aria-hidden="true"
          />
          <div className="hero-scroll-wrap" id="heroScrollWrap" ref={heroScrollWrapRef}>
            <div className="hero-mouse-wrap" id="heroMouseWrap">
              <div className="hero-mini">INDIAN SOCIETY FOR TECHNICAL EDUCATION</div>
              <h1 id="heroTitle" ref={heroTitleRef} aria-label="ISTE">
                <span
                  className="hero-letter"
                  data-depth="0.85"
                  ref={el => {
                    lettersRef.current[0] = el;
                  }}
                >
                  I
                </span>
                <span
                  className="hero-letter"
                  data-depth="1.0"
                  ref={el => {
                    lettersRef.current[1] = el;
                  }}
                >
                  S
                </span>
                <span
                  className="hero-letter"
                  data-depth="1.15"
                  ref={el => {
                    lettersRef.current[2] = el;
                  }}
                >
                  T
                </span>
                <span
                  className="hero-letter"
                  data-depth="1.3"
                  ref={el => {
                    lettersRef.current[3] = el;
                  }}
                >
                  E
                </span>
              </h1>
              <div className="hero-sub">Student Chapter · Vidyalankar Institute of Technology</div>
              <div>
                <a className="hero-scroll" href="#about">
                  Explore Chapter <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & STATS SECTION */}
        <section className="about-iste" id="about">
          <div className="container">
            <div className="compact-heading reveal-on-scroll">
              <div>
                <div className="kicker">About the chapter</div>
                <h2 className="section-title">Learn. Build. Lead.</h2>
              </div>
              <p className="section-desc">
                A student community focused on technical learning, practical projects,
                leadership and industry exposure.
              </p>
            </div>

            <div className="stats-compact reveal-on-scroll" ref={statsRef}>
              {statsData.map((stat, idx) => (
                <div className="stat-new" key={idx}>
                  <strong
                    className="stat-counter"
                    data-target={stat.target}
                    data-suffix={stat.suffix}
                  >
                    {counterValues[idx]}
                    {stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEARN SECTION */}
        <section className="learn-section">
          <div className="container">
            <div className="center-heading reveal-on-scroll">
              <div className="kicker">Why join ISTE?</div>
              <h2>What will you learn here?</h2>
              <p>More than events — a place to develop the skills that matter beyond the classroom.</p>
            </div>

            <div className="learn-grid">
              {learnCards.map((card, idx) => (
                <article
                  key={idx}
                  className="learn-card reveal-on-scroll"
                  data-delay={card.delay}
                >
                  <div className="learn-card-head">
                    <span className="learn-card-num">{card.num}</span>
                    <span className="learn-indicator">↗</span>
                  </div>
                  <div className="learn-icon">{card.icon}</div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section className="events-new" id="events">
          <div className="container">
            <div className="section-head compact-heading reveal-on-scroll">
              <div>
                <div className="kicker">Calendar</div>
                <h2 className="section-title">Upcoming events</h2>
              </div>
              <p className="section-desc">Save the dates. More details will be announced by the committee.</p>
            </div>

            <div className="event-cards-only">
              {eventsData.map((ev, idx) => (
                <article
                  key={idx}
                  className="event-date-card reveal-on-scroll"
                  data-delay={ev.delay}
                >
                  <div className="event-date">
                    <b>{ev.day}</b>
                    <span>{ev.month}</span>
                  </div>
                  <div className="event-time">{ev.time}</div>
                  <div className="event-place">{ev.place}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* COMMITTEE SECTION */}
        <section className="committee-section" id="team">
          <div className="container">
            <div className="center-heading reveal-on-scroll">
              <div className="kicker">The committee</div>
              <h2>Meet the people behind ISTE</h2>
              <p>A team of students working together to build a stronger technical community.</p>
            </div>

            <div className="committee-hierarchy">
              {/* Row 1: Convenor */}
              <div className="committee-level committee-top" data-row="1">
                {committeeRow1.map((m, idx) => (
                  <a
                    key={idx}
                    className="committee-card committee-convenor"
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="conveyor-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.img}
                        alt={m.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </a>
                ))}
              </div>

              {/* Row 2: Chairperson & Vice Chairperson */}
              <div className="committee-level committee-two" data-row="2">
                {committeeRow2.map((m, idx) => (
                  <a
                    key={idx}
                    className="committee-card"
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="conveyor-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.img}
                        alt={m.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </a>
                ))}
              </div>

              {/* Row 3: Technical, Documentation, Media Heads */}
              <div className="committee-level committee-four" data-row="3">
                {committeeRow3.map((m, idx) => (
                  <a
                    key={idx}
                    className="committee-card"
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="conveyor-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.img}
                        alt={m.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </a>
                ))}
              </div>

              {/* Row 4: Events & Publicity Heads */}
              <div className="committee-level committee-four committee-bottom" data-row="4">
                {committeeRow4.map((m, idx) => (
                  <a
                    key={idx}
                    className="committee-card"
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="conveyor-avatar">
                      {m.img ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={m.img}
                          alt={m.name}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="avatar-placeholder-txt">{m.placeholder}</span>
                      )}
                    </div>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="faq-section" id="faq">
          <div className="container">
            <div className="faq-layout">
              <div className="faq-intro reveal-on-scroll">
                <div className="kicker">FAQ</div>
                <h2 className="section-title">Questions, answered.</h2>
                <p className="section-desc">A few things students usually want to know before joining the chapter.</p>
              </div>

              <div className="faq-list reveal-on-scroll">
                {faqData.map((item, idx) => (
                  <details key={idx} open={item.defaultOpen}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="contact-box reveal-on-scroll">
              <div className="contact-copy">
                <div className="kicker" style={{ color: '#9ea0b5' }}>
                  Get in touch
                </div>
                <h2>Still got questions?</h2>
                <p>Feel free to reach out. We&apos;re happy to help.</p>
                <div className="contact-note">
                  ISTE Student Chapter · Vidyalankar Institute of Technology
                </div>
              </div>

              <form className="contact-form" id="contactForm" onSubmit={handleFormSubmit}>
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formValues.name}
                    onChange={e => setFormValues({ ...formValues, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formValues.email}
                    onChange={e => setFormValues({ ...formValues, email: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Write your message..."
                    value={formValues.message}
                    onChange={e => setFormValues({ ...formValues, message: e.target.value })}
                    required
                  />
                </label>
                <button className="submit-btn" type="submit">
                  Submit <span>↗</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://i.postimg.cc/BQppCddz/ISTE-LOGO.png"
                  alt="ISTE Logo"
                  width={32}
                  height={32}
                />
                <span>ISTE Student Chapter</span>
              </div>
              <strong className="footer-title">ISTE Student Chapter</strong>
              <p>Indian Society for Technical Education · Vidyalankar Institute of Technology</p>
            </div>

            <div className="footer-nav-groups" style={{ display: 'flex', gap: '60px' }}>
              <div className="footer-col">
                <span>Navigate</span>
                <div className="footer-links">
                  <a href="#home">Home</a>
                  <a href="#events">Events</a>
                  <a href="#team">Committee</a>
                  <a href="#faq">FAQ</a>
                </div>
              </div>

              <div className="footer-col">
                <span>Connect</span>
                <div className="footer-links">
                  <a
                    href="https://www.linkedin.com/company/iste-vit/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://www.instagram.com/iste.vit/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram ↗
                  </a>
                  <a
                    href="https://github.com/istevit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=iste%40vit.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 ISTE Student Chapter · VIT</span>
            <span>Built by the student community.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
