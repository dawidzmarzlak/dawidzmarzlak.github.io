// Animacje (Lenis-lite + parallax + magnetyczne CTA + ticker)
// Wszystko działa w obrębie najbliższego scrollującego rodzica
// — żeby działało zarówno w fullscreen artboardzie, jak i na zwykłej stronie.

// Znajdź najbliższego scrollującego przodka
const findScroller = (el) => {
  let n = el?.parentElement;
  while (n && n !== document.body) {
    const cs = getComputedStyle(n);
    if (/(auto|scroll|overlay)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight) return n;
    n = n.parentElement;
  }
  return window;
};

// Hook: scroll-reveal kart przez IntersectionObserver
const useReveal = (selector = '.reveal', deps = []) => {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll(selector).forEach(el => io.observe(el));
    return () => io.disconnect();
  }, deps);
};

// Hook: parallax — element przesuwa się o `speed * scrollDelta`
const useParallax = (ref, speed = 0.15) => {
  React.useEffect(() => {
    if (!ref.current) return;
    const scroller = findScroller(ref.current);
    const target = scroller === window ? document.documentElement : scroller;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = ref.current.getBoundingClientRect();
      const containerRect = scroller === window
        ? { top: 0, height: window.innerHeight }
        : scroller.getBoundingClientRect();
      const center = rect.top - containerRect.top + rect.height / 2 - containerRect.height / 2;
      ref.current.style.transform = `translate3d(0, ${-center * speed}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { scroller.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [ref, speed]);
};

// Hook: magnetyczne przyciąganie elementu do kursora
const useMagnetic = (ref, strength = 0.35) => {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = 'translate(0, 0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [ref, strength]);
};

// Hook: hover preview na karcie (mousemove → płynna rotacja 3D)
const useTilt = (ref, max = 6) => {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [ref, max]);
};

// Komponent: pętlowy ticker (logos / hasła)
const Ticker = ({ children, speed = 30, gap = 64, className = '' }) => {
  const items = React.Children.toArray(children);
  return (
    <div className={`anim-ticker ${className}`}>
      <div className="anim-ticker-track" style={{ animationDuration: `${speed}s`, gap }}>
        {[...items, ...items, ...items].map((c, i) => (
          <div key={i} className="anim-ticker-item">{c}</div>
        ))}
      </div>
    </div>
  );
};

// Komponent: animowane CTA (magnetyczne + neonowy obrys przy hover)
const MagneticCTA = ({ children, href = '#', variant = 'primary', className = '' }) => {
  const wrapRef = React.useRef(null);
  const innerRef = React.useRef(null);
  useMagnetic(wrapRef, 0.25);
  useMagnetic(innerRef, 0.4);
  return (
    <a ref={wrapRef} href={href} className={`anim-mag-wrap anim-mag-${variant} ${className}`}>
      <span ref={innerRef} className="anim-mag-inner">{children}</span>
    </a>
  );
};

// Komponent: parallax wrapper
const Parallax = ({ children, speed = 0.15, className = '', style = {} }) => {
  const ref = React.useRef(null);
  useParallax(ref, speed);
  return <div ref={ref} className={className} style={style}>{children}</div>;
};

// Komponent: tilt karta
const Tilt = ({ children, max = 5, className = '', style = {} }) => {
  const ref = React.useRef(null);
  useTilt(ref, max);
  return <div ref={ref} className={`anim-tilt ${className}`} style={{ ...style, transition: 'transform 0.25s ease', transformStyle: 'preserve-3d' }}>{children}</div>;
};

// Komponent: animowany licznik
const CountUp = ({ to, duration = 1600, format = (n) => n }) => {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{format(val)}</span>;
};

// Komponent: text reveal (litera po literze, scroll trigger)
const TextReveal = ({ children, delay = 0, stagger = 30, className = '' }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const text = String(children);
  const words = text.split(' ');
  return (
    <span ref={ref} className={`anim-reveal-text ${className}`}>
      {words.map((w, wi) => (
        <span key={wi} className="anim-rt-word">
          {w.split('').map((ch, ci) => (
            <span key={ci} className="anim-rt-char" style={{ transitionDelay: `${delay + (wi * 80 + ci * stagger)}ms` }}>{ch}</span>
          ))}
          {wi < words.length - 1 && <span className="anim-rt-space"> </span>}
        </span>
      ))}
    </span>
  );
};

Object.assign(window, {
  useReveal, useParallax, useMagnetic, useTilt,
  Ticker, MagneticCTA, Parallax, Tilt, CountUp, TextReveal,
  findScroller,
});
