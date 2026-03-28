import { useState, useEffect, useRef } from 'react'
import '../oddity.css'
import gravityCheckImg from '../assets/gravity-check.png'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const MENU_ITEMS = [
  { id: 'bio', label: '01 Why,' },
  { id: 'structure', label: '02 What,' },
  { id: 'physics', label: '03 Humidity,' },
  { id: 'drop', label: '04 Drop,' },
  { id: 'works', label: '05 Works' },
]

export default function ScienceOfCurlsOddity() {
  const [structureView, setStructureView] = useState('fiber')
  const [ellipticity, setEllipticity] = useState(1.0)
  const [cuticleRaise, setCuticleRaise] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const canvasRef = useRef(null)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', resize)
    resize()

    function drawDoodle(x, y) {
      const type = Math.random()
      ctx.strokeStyle = '#111111'
      ctx.lineWidth = 1
      ctx.beginPath()
      if (type < 0.33) {
        ctx.arc(x, y, Math.random() * 3, 0, Math.PI * 2)
      } else if (type < 0.66) {
        const s = 3
        ctx.moveTo(x - s, y - s)
        ctx.lineTo(x + s, y + s)
        ctx.moveTo(x + s, y - s)
        ctx.lineTo(x - s, y + s)
      } else {
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.random() * 5, y + Math.random() * 5)
      }
      ctx.stroke()
    }

    function handleMove(e) {
      const x = e.clientX ?? e.touches?.[0]?.clientX
      const y = e.clientY ?? e.touches?.[0]?.clientY
      if (x == null || y == null) return
      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y)
      if (dist > 30) {
        drawDoodle(x, y)
        lastPos.current = { x, y }
      }
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
    }
  }, [])

  return (
    <div className="oddity-page">
      <canvas id="surprise-canvas" ref={canvasRef} aria-hidden="true" />

      <header>
        <div className="logo">waves.</div>
        <a href="#top" className="nav-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Index</a>
      </header>

      <main id="top">
        <div className="doodle-container animate-wiggle">
          <svg viewBox="0 0 100 100" className="doodle-path" style={{ width: '100%', height: '100%' }}>
            <path d="M30,70 C20,70 15,60 15,50 C15,30 30,10 50,10 C70,10 85,30 85,50 C85,60 80,70 70,70" stroke="currentColor" fill="none" strokeWidth="1.5" />
            <path d="M35,70 L30,85 M65,70 L70,85" stroke="currentColor" fill="none" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="2" fill="currentColor" stroke="none" />
            <circle cx="60" cy="40" r="2" fill="currentColor" stroke="none" />
            <path d="M45,55 Q50,60 55,55" stroke="currentColor" fill="none" strokeWidth="1.5" />
            <path d="M50,10 Q50,0 60,0" stroke="currentColor" fill="none" strokeWidth="1.5" />
            <circle cx="60" cy="0" r="3" fill="currentColor" stroke="none" />
          </svg>
        </div>

        <div className="menu-stack">
          {MENU_ITEMS.map(({ id, label }) => (
            <div key={id} className="menu-item" onClick={() => scrollToSection(id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollToSection(id)}>{label}</div>
          ))}
        </div>

        <div className="body-text">
          Your waves aren't random. I'm not a trichologist — I'm just a wavy girl who read the research. This is the science of curls, decoded: <span className="underline">why your hair is wavy</span>, what's going on inside the strand, why humidity changes everything, why waves drop, and what actually works.
        </div>

        <div className="image-module">
          <img src={gravityCheckImg} alt="I don't trip. I do random gravity checks. Still good!" />
          <div className="scribble-decor animate-float">
            <svg viewBox="0 0 100 100" className="doodle-path" style={{ width: '100%', height: '100%' }}>
              <path d="M50,50 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0" style={{ strokeDasharray: '4,4', opacity: 0.5 }} stroke="currentColor" fill="none" strokeWidth="1.5" />
              <path d="M50,20 L50,80 M20,50 L80,50 M30,30 L70,70 M70,30 L30,70" stroke="currentColor" fill="none" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <div className="spacer" />

        <section id="bio" className="oddity-section">
          <h2>01 — Why Your Hair Is Wavy</h2>
          <p style={{ fontStyle: 'italic', opacity: 0.8 }}>It starts in the follicle.</p>
          <p>Hair shape is programmed at the root. Straight hair grows from a more symmetrical follicle; curly from a more curved, asymmetrical one. Wavy hair sits in between — mildly asymmetric.</p>
          <p><strong>Your wave starts under your skin.</strong> Hair shape is influenced by genes including EDAR and TCHH. There isn't one "wavy gene" — it's polygenic, layered and subtle.</p>
          <div className="oddity-card" style={{ marginTop: '1.5rem' }}>
            <h3>The genes doing the most: EDAR & TCHH</h3>
            <p style={{ fontSize: '1rem', marginBottom: 0 }}>TCHH makes a protein that acts like glue inside the hair root. EDAR is linked to straighter, thicker fibers. Together they're part of why your pattern is yours.</p>
          </div>
        </section>

        <section id="structure" className="oddity-section">
          <h2>02 — What's Actually Going On</h2>
          <p><strong>Your strand isn't round.</strong> Straight hair has a more circular cross-section; curlier hair is more oval. Wavy hair? Slightly oval. The more oval, the easier it bends.</p>
          <p>Inside the strand, ortho and para cortical cells create tension. In waves the separation is subtle — enough for movement, not coils.</p>
          <div className="oddity-controls">
            <button type="button" className={`oddity-btn ${structureView === 'fiber' ? 'active' : ''}`} onClick={() => setStructureView('fiber')}>Inside the strand</button>
            <button type="button" className={`oddity-btn ${structureView === 'surface' ? 'active' : ''}`} onClick={() => setStructureView('surface')}>The surface (cuticles)</button>
          </div>
          {structureView === 'fiber' && (
            <div className="oddity-card">
              <p>Slide to see oval (curlier) vs round (straighter).</p>
              <FiberCrossSectionInk ellipticity={ellipticity} />
              <label style={{ display: 'block', marginTop: '0.5rem' }}>How oval?</label>
              <input type="range" min="0.4" max="1" step="0.01" value={ellipticity} className="oddity-range" onChange={(e) => setEllipticity(parseFloat(e.target.value))} />
            </div>
          )}
          {structureView === 'surface' && (
            <div className="oddity-card">
              <p>Cuticles are like roof shingles. When lifted: more friction, frizz, dullness.</p>
              <CuticleInk raise={cuticleRaise} />
              <label style={{ display: 'block', marginTop: '0.5rem' }}>Cuticle lift</label>
              <input type="range" min="0" max="15" step="1" value={cuticleRaise} className="oddity-range" onChange={(e) => setCuticleRaise(Number(e.target.value))} />
            </div>
          )}
        </section>

        <section id="physics" className="oddity-section">
          <h2>03 — Why Humidity Changes Everything</h2>
          <p>Hair shape is partly held together by hydrogen bonds. Water breaks them; drying reforms them. So when your hair gets wet it becomes flexible; when it dries it locks into shape.</p>
          <p>More humidity = more bond disruption. Curly hair has stronger structural locking. Straight hair doesn't rely on curvature. Wavy hair? It reacts. <strong>That's not damage. That's chemistry.</strong></p>
          <div className="oddity-card">
            <HumidityVizInk humidity={humidity} />
            <label style={{ display: 'block', marginTop: '0.5rem' }}>Humidity — slide to see the vibe</label>
            <input type="range" min="0" max="100" value={humidity} className="oddity-range" onChange={(e) => setHumidity(Number(e.target.value))} />
          </div>
        </section>

        <section id="drop" className="oddity-section">
          <h2>04 — Why Waves Drop</h2>
          <p>Gravity. Wavy hair is only moderately elliptical — it bends but not strongly enough to fight weight. Heavy creams stretch the bend; too much oil or stiff gel pulls it down.</p>
          <p><strong>Waves don't need control. They need lift.</strong></p>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
            <img src={gravityCheckImg} alt="I do random gravity checks. Still good!" style={{ maxWidth: '280px', width: '100%' }} />
            <img src="/drop-stick-figure.svg" alt="Stick figure: still good!" width="240" height="120" style={{ display: 'block' }} />
          </div>
        </section>

        <section id="works" className="oddity-section">
          <h2>05 — What Actually Works (For Me)</h2>
          <p>Light hydration. Mousse instead of heavy gel. Styling soaking wet. Scrunching upward. Touching it less. Sometimes sea salt spray or lightweight hyaluronic gel.</p>
          <p>Mousse gives structure without mass. Styling soaking wet matters because hydrogen bonds reset during drying. Touching it less matters because waves sit in a narrow stability window.</p>
          <p><strong>Now I treat my hair like what it is: a controlled mechanical imbalance. Not confused. Not broken. Just balanced.</strong></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1.5rem', alignItems: 'flex-start' }}>
            <img src="/works-stick-figure.svg" alt="Stick figure: lift!" width="160" height="208" style={{ flexShrink: 0 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', flex: '1 1 300px' }}>
              <div className="oddity-card"><h3>Be gentle</h3><p style={{ fontSize: '1rem', marginBottom: 0 }}>Go easy on sulfates and heat.</p></div>
              <div className="oddity-card"><h3>Set while damp</h3><p style={{ fontSize: '1rem', marginBottom: 0 }}>Catch the shape while it's wet.</p></div>
              <div className="oddity-card"><h3>Less friction</h3><p style={{ fontSize: '1rem', marginBottom: 0 }}>Satin pillowcases and scrunchies.</p></div>
            </div>
          </div>
        </section>

        <section className="oddity-section">
          <h2>The Soft Truth</h2>
          <p>Wavy hair lives in a very specific equilibrium. Too humid → frizz. Too heavy → straight. Too stiff → stringy. Too dry → fluffy. Once I understood that, I stopped forcing it to behave like tight curls. I started supporting what it already is.</p>
        </section>

        <section className="oddity-section">
          <button type="button" className="oddity-btn" style={{ marginBottom: '1rem' }} onClick={() => setSourcesOpen((o) => !o)}>
            {sourcesOpen ? '▼ Hide sources' : '◇ Sources (for the nerds)'}
          </button>
          {sourcesOpen && (
            <div className="oddity-card" style={{ maxWidth: '720px' }}>
              <h3>01 — Why your hair is wavy</h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.95rem', lineHeight: 1.8 }}>
                <li>• <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6894537/" target="_blank" rel="noopener noreferrer" className="underline">Cloete et al., 2019</a></li>
                <li>• <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/exd.13347" target="_blank" rel="noopener noreferrer" className="underline">Westgate et al., 2017</a></li>
                <li>• <a href="https://www.sciencedirect.com/science/article/pii/S1872497318302077" target="_blank" rel="noopener noreferrer" className="underline">Pośpiech et al., 2018</a></li>
              </ul>
              <h3 style={{ marginTop: '1.5rem' }}>02 — What's actually going on</h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.95rem', lineHeight: 1.8 }}>
                <li>• <a href="https://link.springer.com/book/10.1007/978-3-642-25611-0" target="_blank" rel="noopener noreferrer" className="underline">Robbins, 2012</a></li>
                <li>• <a href="https://onlinelibrary.wiley.com/doi/10.1111/exd.14048" target="_blank" rel="noopener noreferrer" className="underline">Wortmann et al., 2019</a></li>
              </ul>
              <h3 style={{ marginTop: '1.5rem' }}>03 — Humidity</h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.95rem', lineHeight: 1.8 }}>
                <li>• <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/ics.12261" target="_blank" rel="noopener noreferrer" className="underline">Coderch et al.</a></li>
              </ul>
            </div>
          )}
        </section>

        <section className="oddity-section">
          <h2>Loved wavy hair routine reads</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 2 }}>
            <li>• <a href="https://www.vogue.com/article/wavy-hair-routine" target="_blank" rel="noopener noreferrer" className="underline">Vogue — Wavy Hair Routine</a></li>
            <li>• <a href="https://www.cosmopolitan.com/style-beauty/beauty/a65562666/wavy-hair-routine/" target="_blank" rel="noopener noreferrer" className="underline">Cosmopolitan</a></li>
            <li>• <a href="https://curlsmith.com/blogs/curl-academy/wavy-hair" target="_blank" rel="noopener noreferrer" className="underline">Curlsmith — Wavy Hair Guide</a></li>
          </ul>
        </section>

        <div className="spacer" />
        <div className="doodle-container" style={{ alignSelf: 'flex-end', width: 60, height: 60 }}>
          <svg viewBox="0 0 50 50" className="doodle-path" style={{ width: '100%', height: '100%', color: 'var(--ink-black)' }}>
            <path d="M10,40 Q25,10 40,40 Q25,50 10,40" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10,40 L5,35 M40,40 L45,35" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </main>
    </div>
  )
}

function FiberCrossSectionInk({ ellipticity }) {
  const ry = 80 * ellipticity
  return (
    <svg width="200" height="200" viewBox="0 0 300 300" style={{ display: 'block', margin: '1rem 0' }}>
      <ellipse cx="150" cy="150" rx="80" ry={ry} fill="none" stroke="#111" strokeWidth="2" />
      <path d="M 150,70 A 80,80 0 0 1 150,230" stroke="#111" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity={0.6} />
    </svg>
  )
}

function CuticleInk({ raise }) {
  const deg = Number(raise)
  return (
    <svg width="280" height="120" viewBox="0 0 300 200" style={{ display: 'block', margin: '1rem 0' }}>
      <rect x="20" y="80" width="260" height="40" fill="rgba(17,17,17,0.05)" stroke="#111" strokeWidth="1" />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 20 + i * 35
        return <line key={i} x1={x} y1="80" x2={50 + i * 35} y2="80" stroke="#111" strokeWidth="2" transform={`rotate(-${deg}, ${x}, 80)`} />
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const x = 20 + i * 35
        return <line key={`b-${i}`} x1={x} y1="120" x2={50 + i * 35} y2="120" stroke="#111" strokeWidth="2" transform={`rotate(${deg}, ${x}, 120)`} />
      })}
    </svg>
  )
}

function HumidityVizInk({ humidity }) {
  const val = Number(humidity)
  const scale = 1 + val / 100
  const frizzPath = `M -25,0 Q ${-40 - val * 0.4},${-20 - val * 0.4} ${-20 + val * 0.4},${-40 - val * 0.4} Q 0,${-50 - val * 0.4} ${20 - val * 0.4},${-40 - val * 0.4} Q ${40 + val * 0.4},${-20 - val * 0.4} 25,0`
  return (
    <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <svg width="120" height="180" viewBox="0 0 200 250">
        <line x1="100" y1="150" x2="100" y2="220" stroke="#111" strokeWidth="2" />
        <line x1="100" y1="220" x2="80" y2="250" stroke="#111" strokeWidth="2" />
        <line x1="100" y1="220" x2="120" y2="250" stroke="#111" strokeWidth="2" />
        <line x1="100" y1="170" x2="70" y2="150" stroke="#111" strokeWidth="2" />
        <line x1="100" y1="170" x2="130" y2="150" stroke="#111" strokeWidth="2" />
        <circle cx="100" cy="130" r="25" stroke="#111" strokeWidth="2" fill="none" />
        <circle cx="90" cy="125" r="2" fill="#111" />
        <circle cx="110" cy="125" r="2" fill="#111" />
        <path d="M90,140 Q100,145 110,140" stroke="#111" strokeWidth="1.5" fill="none" />
        <g transform={`translate(100,130) scale(${scale})`}>
          <path d={frizzPath} stroke="#111" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  )
}
