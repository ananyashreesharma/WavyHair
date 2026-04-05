import { useState, useEffect, useRef } from 'react'
import '../waves-decoded.css'

const NAV = [
  { href: '#intro', label: '00  Intro' },
  { href: '#section-why', label: '01  Why' },
  { href: '#section-what', label: '02  What' },
  { href: '#section-humidity', label: '03  Humidity' },
  { href: '#section-drop', label: '04  Drop' },
  { href: '#section-works', label: '05  Works' },
]

export default function WavesDecoded() {
  const [crossSectionVal, setCrossSectionVal] = useState(40)
  const [follicleVal, setFollicleVal] = useState(70)
  const [humidityVal, setHumidityVal] = useState(0)
  const [cuticleVal, setCuticleVal] = useState(0)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [orthoParaActive, setOrthoParaActive] = useState(null)
  const [activeNav, setActiveNav] = useState('intro')
  const canvasRef = useRef(null)
  const mainRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let time = 0
    let raf = 0
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    function drawWaves() {
      if (!width || !height) return
      ctx.clearRect(0, 0, width, height)
      const reduced = mqReduce.matches
      const colors = [
        'rgba(0,0,0,0.62)',
        'rgba(217, 48, 37, 0.4)',
        'rgba(0,0,0,0.09)',
        'rgba(0,0,0,0.26)',
      ]
      const step = 6
      const lineSpacing = 34
      const driftSpeed = reduced ? 0 : 0.52
      const drift = (time * driftSpeed) % lineSpacing
      const mouse = mouseRef.current
      const lines = Math.ceil(height / lineSpacing) + 10
      const phase = reduced ? 0 : time * 0.013

      for (let row = 0; row < lines; row++) {
        ctx.beginPath()
        ctx.lineWidth = row % 3 === 0 ? 2 : 1
        ctx.strokeStyle = colors[row % colors.length]
        const baseY = row * lineSpacing - drift - lineSpacing * 2
        for (let x = 0; x <= width; x += step) {
          let y = baseY + Math.sin(x * 0.0046 + row * 0.5 + phase) * 32
          const dist = Math.hypot(x - mouse.x, y - mouse.y)
          const radius = 210
          if (!reduced && dist < radius) {
            const force = (radius - dist) / radius
            y += force * 50 * (row % 2 === 0 ? 1 : -1)
          }
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      if (!reduced) time += 1
      raf = requestAnimationFrame(drawWaves)
    }

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    mqReduce.addEventListener('change', resize)
    resize()
    drawWaves()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      mqReduce.removeEventListener('change', resize)
    }
  }, [])

  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    const sections = main.querySelectorAll('section[id]')
    const onScroll = () => {
      let current = 'intro'
      const scrollY = window.scrollY
      sections.forEach((section) => {
        const top = section.offsetTop
        if (scrollY >= top - 300) current = section.id || current
      })
      setActiveNav(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const crossSectionLabel =
    crossSectionVal < 20
      ? 'Current: Round (Straight)'
      : crossSectionVal > 80
        ? 'Current: Flat Oval (Coily)'
        : 'Current: Wavy (Slightly Oval)'

  const humidityPath = (() => {
    const w = 220
    const points = 50
    let d = 'M0,50'
    for (let i = 1; i <= points; i++) {
      const x = (w / points) * i
      const noise = Math.sin(i * 2.3 + humidityVal * 0.1) * (humidityVal * 0.4)
      const y = 50 + Math.sin(x * 0.05) * 30 + noise
      d += ` L${x},${y}`
    }
    return d
  })()

  const cuticlePath = (() => {
    const segments = 20
    const w = 220
    const segW = w / segments
    const lift = (cuticleVal / 100) * 15
    let d = ''
    for (let i = 0; i < segments; i++) {
      const xStart = i * segW
      d += `M${xStart},30 L${xStart + segW},${30 - lift} L${xStart + segW},30 L${xStart},30 Z `
    }
    d += `M0,30 L${w},30 L${w},50 L0,50 Z`
    return d
  })()

  return (
    <>
    <div className="waves-page-bg" aria-hidden="true" />
    <canvas ref={canvasRef} className="waves-bg-canvas" aria-hidden="true" />
    <div className="waves-decoded">
      <div className="magazine-grid">
        <aside>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem' }}>
            <div>
              <h1 className="serif-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                WAVES<br />
                <span style={{ fontStyle: 'italic', color: 'var(--accent-red)' }}>DECODED</span>
              </h1>
              <p className="mono" style={{ fontSize: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid black', paddingTop: '0.5rem', display: 'inline-block' }}>
                The Science behind Texture
              </p>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`nav-item ${activeNav === href.replace('#', '') ? 'active' : ''}`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mono" style={{ fontSize: '0.75rem', opacity: 0.6, lineHeight: 1.6, marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <p>Curated by a girl who read through papers and articles just to get her hair right!</p>
            <p style={{ marginTop: '0.5rem', color: 'var(--accent-red)' }}>Keep scrolling for the good stuff</p>
          </div>
        </aside>

        <main ref={mainRef} style={{ flex: 1 }}>
          <section id="intro" className="hero-section">
            <div className="hero-content" style={{ maxWidth: '42rem', padding: '2rem 2rem 3rem' }}>
              <h2 className="serif-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem', paddingTop: '0.25em' }}>
                Our hair aren't Glitching,<br />it's just complex.
              </h2>
              <div style={{ marginTop: '2.5rem', textAlign: 'left', background: 'rgba(255,255,255,0.85)', padding: '1.5rem', border: '1px solid black', maxWidth: '24rem', marginLeft: 'auto', marginRight: 'auto', transform: 'rotate(1deg)', transition: 'transform 0.5s' }} className="hover-rotate">
                <p style={{ marginBottom: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-red)' }}>Editor's note:</p>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  I'm not a hair scientist. I'm just a wavy haired girl who followed the Curly Girl Method for yearrrrrssss (yes, really), and still ended up feeling great one day and like Hagrid the next.
                </p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                  So naturally, I became obsessive, like really obsessive until I figured out why are they so out of my control.
                </p>
              </div>
            </div>
          </section>

          <div>
            <section id="section-why" className="content-wrapper section-block" style={{ marginBottom: '6rem', paddingTop: '5rem', position: 'relative', background: 'rgba(253, 251, 247, 0.82)' }}>
              <div className="section-marker">01</div>
              <h2 className="serif-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', position: 'relative', zIndex: 10 }}>Why Our Hair Is Wavy</h2>
              <p className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-red)', marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>(It starts underground)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>
                <div>
                  <p style={{ fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '1.5rem', fontWeight: 300 }}>
                    <span className="drop-cap">Y</span>our wave doesn't begin at the mid lengths. It starts at the follicle. Under your skin. So you basically can't pressure them into something they're not.
                  </p>
                  <p style={{ fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '1.5rem', fontWeight: 300 }}>
                    Straight hair grows from symmetrical follicles. Curly hair grows from curved, asymmetrical follicles. Wavy hair? We're in between. Mildly asymmetric. Follicle shape is one major contributor to curl pattern.
                  </p>
                  <p style={{ fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
                    We're the middle child of hair geometry.
                  </p>
                  <p style={{ fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '1.5rem', fontWeight: 300 }}>
                    And there are genes involved. Of course there are.
                  </p>
                  <div style={{ background: 'black', color: 'white', padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                      <strong>TCHH</strong> → makes a protein that acts like glue inside the hair root.
                    </p>
                    <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                      <strong>EDAR</strong> → associated with straighter, thicker, rounder fibers.
                    </p>
                    <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                      And it's polygenic. Which basically means: Our waves are layered. Subtle. Complex. Like our lives.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="interactive-card follicle-geometry-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '260px', padding: '1.5rem', boxShadow: 'none', border: '1px solid rgba(0,0,0,0.08)', background: 'linear-gradient(180deg, rgba(250,249,247,0.88) 0%, rgba(255,255,255,0.88) 100%)' }}>
                    <h4 className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', marginBottom: '1rem', alignSelf: 'flex-start', color: 'var(--text-black)', opacity: 0.7 }}>FOLLICLE GEOMETRY</h4>
                    <div style={{ width: '9rem', height: '10rem', position: 'relative', flexShrink: 0 }}>
                      <svg width="100%" height="100%" viewBox="0 0 140 200" style={{ display: 'block' }} preserveAspectRatio="xMidYMid meet">
                        <defs>
                          <linearGradient id="follicleBg" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(0,0,0,0.02)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 38 15 L 38 168 L 38 198 L 102 198 L 102 168 L 102 15 Q 70 2 38 15 Z"
                          fill="url(#follicleBg)"
                          stroke="rgba(0,0,0,0.2)"
                          strokeWidth="1.2"
                        />
                        <path
                          d={(() => {
                            const t = follicleVal / 100
                            const cpx = 70 - 32 * t
                            const endX = 70 - 16 * t
                            return `M 70 22 Q ${cpx} 100 ${endX} 198`
                          })()}
                          fill="none"
                          stroke="var(--accent-red)"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ transition: 'd 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />
                        <line x1={32} y1={170} x2={108} y2={170} stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="3 3" />
                      </svg>
                    </div>
                    <div style={{ width: '100%', maxWidth: '11rem', marginTop: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.65rem' }} className="mono">
                        <span style={{ opacity: follicleVal < 50 ? 1 : 0.4, transition: 'opacity 0.25s', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: follicleVal < 50 ? 'var(--accent-red)' : 'rgba(0,0,0,0.15)' }} />
                          STRAIGHT
                        </span>
                        <span style={{ opacity: follicleVal >= 50 ? 1 : 0.4, transition: 'opacity 0.25s', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          ASYMMETRICAL
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: follicleVal >= 50 ? 'var(--accent-red)' : 'rgba(0,0,0,0.15)' }} />
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={follicleVal}
                        onChange={(e) => setFollicleVal(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-red)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="mono" style={{ fontSize: '0.7rem', marginTop: '2rem', opacity: 0.85 }}>Supported by:</p>
              <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Cloete et al. (2019), Westgate et al. (2017), Pośpiech et al. (2018)</p>
            </section>

            <section id="section-what" className="content-wrapper section-block" style={{ marginBottom: '6rem', position: 'relative', background: 'rgba(255, 255, 255, 0.8)' }}>
              <div className="section-marker">02</div>
              <h2 className="serif-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', position: 'relative', zIndex: 10 }}>What's Actually Going On</h2>
              <p className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-red)', marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>(The strand is not round. YES. Not round.)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
                <div style={{ gridColumn: 'span 12' }} className="md-col-5">
                  <p style={{ fontSize: '1.25rem', fontFamily: 'Bodoni Moda, serif', fontStyle: 'italic', marginBottom: '1.5rem' }}>This part was weird for me.</p>
                  <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: 2 }}>Straight hair? Circular cross-section. Curly/Coily hair? Very flattened, oval. Wavy hair? Slightly oval. Greater ellipticity (more oval shape) correlates with increased curvature (more curl).</p>
                  <h4 className="serif-display" style={{ fontSize: '1.125rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Inside the Strand</h4>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', lineHeight: 2 }}>Inside a hair strand one side is a bit different from the other, so it doesn't grow evenly. Cells on the outer side (ortho) stretch more, while cells on the inner side (para) stay tighter. This difference creates uneven tension which makes the hair bend and form curls (usually gradually, not sharply).</p>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', lineHeight: 2, fontStyle: 'italic', color: 'var(--accent-red)' }}>Translation: Our strand contains built in asymmetry.</p>
                  <ul className="mono" style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid black', paddingTop: '1.5rem' }}>
                    <li
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: orthoParaActive === 'ortho' ? 'rgba(217, 48, 37, 0.08)' : 'transparent', padding: '0.25rem 0.5rem', margin: '-0.25rem -0.5rem', borderRadius: 2, transition: 'background 0.2s', cursor: 'pointer' }}
                      onMouseEnter={() => setOrthoParaActive('ortho')}
                      onMouseLeave={() => setOrthoParaActive(null)}
                    >
                      <span>ORTHO CELLS</span><span style={{ color: 'var(--accent-red)' }}>OUTSIDE CURVE</span>
                    </li>
                    <li
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: orthoParaActive === 'para' ? 'rgba(217, 48, 37, 0.08)' : 'transparent', padding: '0.25rem 0.5rem', margin: '-0.25rem -0.5rem', borderRadius: 2, transition: 'background 0.2s', cursor: 'pointer' }}
                      onMouseEnter={() => setOrthoParaActive('para')}
                      onMouseLeave={() => setOrthoParaActive(null)}
                    >
                      <span>PARA CELLS</span><span style={{ color: 'var(--accent-red)' }}>INSIDE CURVE</span>
                    </li>
                  </ul>
                </div>
                <div style={{ gridColumn: 'span 12' }}>
                  <div className="interactive-card" style={{ background: 'linear-gradient(180deg, #e8f4f4 0%, #d0e8e8 30%, #b8d4d8 100%)', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.08)' }}>
                    <h3 className="serif-display" style={{ fontSize: '1.5rem', marginBottom: '0.35rem', textAlign: 'center' }}>The Cross-Section</h3>
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#555', marginBottom: '1.25rem' }}>Slide to morph follicle shape, strand and cross-section. Straight → wavy → curly.</p>
                    <div style={{ marginBottom: '1.25rem', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }}>
                      <svg width="100%" viewBox="0 0 320 280" style={{ display: 'block' }} preserveAspectRatio="xMidYMid meet">
                        <defs>
                          <linearGradient id="crossSecAbove" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#c5e2e2" />
                            <stop offset="100%" stopColor="#a8d4d6" />
                          </linearGradient>
                          <linearGradient id="crossSecBelow" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7eb5b8" />
                            <stop offset="100%" stopColor="#5a9a9e" />
                          </linearGradient>
                          <linearGradient id="crossSecRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2d5a5e" />
                            <stop offset="100%" stopColor="#1e4246" />
                          </linearGradient>
                          <linearGradient id="crossSecRingMid" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6b9a9e" />
                            <stop offset="100%" stopColor="#4a7a7e" />
                          </linearGradient>
                        </defs>
                        <rect x={0} y={0} width={320} height={140} fill="url(#crossSecAbove)" />
                        <rect x={0} y={100} width={320} height={180} fill="url(#crossSecBelow)" />
                        <path
                          d="M 0 112 Q 40 100 80 107 T 160 104 T 240 107 T 320 100 L 320 118 L 0 118 Z"
                          fill="rgba(255,255,255,0.92)"
                          stroke="rgba(255,255,255,0.6)"
                          strokeWidth="1.5"
                        />
                        {(() => {
                          const t = crossSectionVal / 100
                          const rx = 26 - 12 * t
                          const ry = 26 + 10 * t
                          const rot = 15 * t
                          return (
                            <g transform={`translate(160, 248) rotate(${rot})`} style={{ transition: 'transform 0.35s ease-out' }}>
                              <ellipse cx={0} cy={0} rx={rx} ry={ry} fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
                              <ellipse cx={0} cy={0} rx={rx * 0.72} ry={ry * 0.72} fill="url(#crossSecRingMid)" stroke="none" />
                              <ellipse cx={0} cy={0} rx={rx * 0.38} ry={ry * 0.38} fill="url(#crossSecRingInner)" stroke="none" />
                            </g>
                          )
                        })()}
                        {(() => {
                          const t = crossSectionVal / 100
                          const leftX = 160 - 16
                          const rightX = 160 + 16
                          const ctrlX = 160 - 22 * t
                          const bulbY = 200
                          return (
                            <path
                              d={`M ${leftX} 106 
                                ${t > 0.06 ? `Q ${ctrlX} 145 ${leftX} ${bulbY}` : `L ${leftX} ${bulbY}`}
                                L ${leftX} 235 L ${rightX} 235 L ${rightX} ${bulbY} 
                                L ${rightX} 106 Q 160 96 ${leftX} 106 Z`}
                              fill="rgba(255,255,255,0.88)"
                              stroke="rgba(255,255,255,0.7)"
                              strokeWidth="1.5"
                            />
                          )
                        })()}
                        {(() => {
                          const t = crossSectionVal / 100
                          if (t < 0.12) {
                            return <line x1={160} y1={106} x2={160} y2={24} stroke="rgba(255,255,255,0.95)" strokeWidth="6" strokeLinecap="round" />
                          }
                          const q1x = 160 - 42 * t
                          const q1y = 68
                          const q2x = 160 + 30 * t
                          const q2y = 42
                          const endX = 160 - 18 * t
                          return (
                            <path
                              d={`M 160 106 Q ${q1x} ${q1y} 160 55 Q ${q2x} ${q2y} ${endX} 24`}
                              fill="none"
                              stroke="rgba(255,255,255,0.95)"
                              strokeWidth="6"
                              strokeLinecap="round"
                            />
                          )
                        })()}
                        <text x={160} y={272} textAnchor="middle" className="mono" fontSize="9" fill="rgba(0,0,0,0.5)" fontWeight="600">
                          {crossSectionVal < 25 ? 'Circular cross-section' : crossSectionVal < 75 ? 'Slightly oval' : 'Flattened oval'}
                        </text>
                      </svg>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={crossSectionVal}
                      onChange={(e) => setCrossSectionVal(Number(e.target.value))}
                    />
                    <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '0.75rem', color: '#555', gap: '0.5rem' }}>
                      {['STRAIGHT', 'WAVY', 'CURLY'].map((label, i) => {
                        const active = (i === 0 && crossSectionVal < 33) || (i === 1 && crossSectionVal >= 33 && crossSectionVal < 67) || (i === 2 && crossSectionVal >= 67)
                        return (
                          <span key={label} style={{ flex: 1, textAlign: 'center', fontWeight: active ? 700 : 400, color: active ? 'var(--accent-red)' : undefined }}>
                            {label}
                          </span>
                        )
                      })}
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '0.75rem', fontFamily: 'Bodoni Moda, serif', fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--accent-red)' }}>{crossSectionLabel}</p>
                  </div>
                </div>
              </div>
              <p className="mono" style={{ fontSize: '0.7rem', marginTop: '2rem', opacity: 0.85 }}>Supported by:</p>
              <p style={{ fontSize: '0.75rem', marginBottom: 0 }}>Robbins (2012), Wortmann et al. (2019), Cloete et al. (2019)</p>
            </section>

            <section id="section-humidity" className="section-block" style={{ background: 'rgba(253, 251, 247, 0.78)', color: 'var(--text-black)', padding: '4rem 4rem', marginBottom: '6rem', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
              <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <div className="section-marker" style={{ color: 'var(--neutral-grey)' }}>03</div>
                <h2 className="serif-display" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-black)' }}>Why Humidity changes it</h2>
                <p style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--text-black)', opacity: 0.9, marginBottom: '2rem' }}>Humidity affects hair because its shape is partly held by weak hydrogen bonds. When moisture in the air (water) enters the hair, it breaks these bonds and resets them. As the hair dries again, the bonds reform in a new pattern, making the hair change shape (more frizz or curl).</p>
                <p className="mono" style={{ fontSize: '0.75rem', borderLeft: '3px solid var(--accent-red)', paddingLeft: '1rem', marginBottom: '2rem', color: 'var(--text-black)' }}>Curly hair already has built in uneven structure, so it doesn't rely as much on temporary hydrogen bonds to keep its shape. Straight hair is naturally uniform, so humidity doesn't change it much. But wavy hair? We react 'cause humidity reshapes those bonds.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                  <div style={{ border: '1px solid var(--neutral-grey)', padding: '1.5rem', background: 'rgba(255,255,255,0.88)' }}>
                    <h4 className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>BONDS + HUMIDITY</h4>
                    <div style={{ height: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', overflow: 'hidden' }}>
                      <svg width="100%" height={80} viewBox="0 0 220 100" style={{ overflow: 'visible' }} preserveAspectRatio="xMidYMid meet">
                        <path d={humidityPath} fill="none" stroke="var(--text-black)" strokeWidth={humidityVal > 50 ? 2 + humidityVal / 50 : 2} opacity={humidityVal > 50 ? 0.85 : 1} />
                      </svg>
                    </div>
                    <input type="range" min="0" max="100" value={humidityVal} onChange={(e) => setHumidityVal(Number(e.target.value))} />
                    <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', marginTop: '0.5rem', color: '#666' }}>
                      <span>0% HUMIDITY</span>
                      <span>100% HUMIDITY</span>
                    </div>
                  </div>
                  <div style={{ border: '1px solid var(--neutral-grey)', padding: '1.5rem', background: 'rgba(255,255,255,0.88)' }}>
                    <h4 className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>THE CUTICLE SITUATION</h4>
                    <p style={{ fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>Your cuticle is like roof shingles. Flat → shine, smoothness. Lifted → friction, frizz. Humidity interacts with lifted shingles.</p>
                    <div style={{ height: '4rem', background: 'rgba(253, 251, 247, 0.85)', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '0.75rem' }}>
                      <svg width="100%" height={40} viewBox="0 0 220 60" preserveAspectRatio="xMidYMid meet">
                        <path d={cuticlePath} fill="none" stroke="#111" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <input type="range" min="0" max="100" value={cuticleVal} onChange={(e) => setCuticleVal(Number(e.target.value))} />
                    <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', marginTop: '0.35rem', color: '#999' }}>
                      <span>Flat</span>
                      <span>Lifted</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mono" style={{ fontSize: '0.7rem', marginTop: '2rem', opacity: 0.85 }}>Supported by:</p>
              <p style={{ fontSize: '0.75rem', marginBottom: 0 }}>Robbins (2012), Wortmann et al. (2019), Coderch et al. (cuticle)</p>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 256, height: 256, border: '1px solid var(--neutral-grey)', borderRadius: '50%', transform: 'translate(50%, -50%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 384, height: 384, border: '1px solid var(--neutral-grey)', borderRadius: '50%', transform: 'translate(-50%, 50%)' }} />
            </section>

            <section id="section-drop" className="content-wrapper section-block" style={{ marginBottom: '6rem', position: 'relative', background: 'rgba(255, 255, 255, 0.8)' }}>
              <div className="section-marker">04</div>
              <div style={{ position: 'relative', padding: '3rem 0' }}>
                <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1, textAlign: 'center', opacity: 0.08, userSelect: 'none', position: 'absolute', top: 0, left: 0, width: '100%' }}>GRAVITY</h2>
                <h2 className="serif-display" style={{ fontSize: '2.5rem', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>Why Waves Drop</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', position: 'relative', zIndex: 10 }}>
                  <div>
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>Wavy hair is moderately elliptical. Meaning: It bends. But it cannot fight weight.</p>
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>Heavier products increase strand weight and reduce frictional lift, which can relax wave pattern. Stiff, film-forming products can add tension too.</p>
                    <p className="mono" style={{ fontSize: '0.875rem', borderTop: '1px solid black', paddingTop: '1rem' }}>Waves don't need control, they need lift.</p>
                  </div>
                  <div style={{ background: 'var(--accent-red)', color: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p className="serif-display" style={{ fontStyle: 'italic', fontSize: '1.5rem', textAlign: 'center' }}>"Waves don't need control. They need lift."</p>
                  </div>
                </div>
                <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  {['Heavy Creams', 'Raw Oils', 'Stiff Gel'].map((label) => (
                    <div key={label} style={{ border: '1px solid black', padding: '1rem', textAlign: 'center', transition: 'background 0.2s, color 0.2s' }} className="hover-invert">
                      <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }}>×</span>
                      <span className="mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{label}</span>
                    </div>
                  ))}
                  <div style={{ border: '1px solid black', padding: '1rem', textAlign: 'center', background: 'rgba(243, 243, 243, 0.85)', opacity: 0.5, cursor: 'not-allowed' }}>
                    <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }}>×</span>
                    <span className="mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Gravity</span>
                  </div>
                </div>
                <p className="mono" style={{ fontSize: '0.7rem', marginTop: '2rem', opacity: 0.85 }}>Supported by:</p>
                <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Wortmann et al. (2019), fiber bending and load response</p>
                <p style={{ fontSize: '0.75rem', marginBottom: 0 }}>Robbins (2012), mechanical properties of keratin fibers</p>
              </div>
            </section>

            <section id="section-works" className="content-wrapper section-block" style={{ marginBottom: '6rem', position: 'relative', background: 'rgba(255, 255, 255, 0.8)' }}>
              <div className="section-marker">05</div>
              <h2 className="serif-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', position: 'relative', zIndex: 10 }}>What works for me (might not work for everyone)</h2>
              <p className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-red)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>(The Stability Window Theory)</p>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#555' }}>Wavy hair lives in a narrow equilibrium zone.</p>
              <p style={{ fontSize: '0.95rem', marginBottom: '2rem', color: '#555' }}>Too humid → frizz. Too heavy → straight. Too stiff → stringy. Too dry → fluffy triangle. So here's what works:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem 2.5rem' }}>
                {[
                  { title: 'Light Mousse/Serum', hint: 'Structure and support', body: 'Your hair can bend. It just can\'t carry too much weight.' },
                  { title: 'Style Soaking Wet', hint: '', body: 'Hydrogen bonds reset while drying. Set the pattern while wet and lock it in during evaporation.' },
                  { title: 'Touch It Less', hint: '', body: 'Waves sit in a stability window. The more I scrunch, separate, "just fix this one piece" the more I destabilize the pattern. Let it dry and step away from the mirror.' },
                  { title: 'Light Hydration', hint: '', body: 'Hyaluronic gels, lightweight leave ins.' },
                ].map((item) => (
                  <div key={item.title} className="works-item" style={{ cursor: 'default' }}>
                    <div style={{ borderBottom: '1px solid black', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <h3 className="mono" style={{ fontSize: '1.125rem', fontWeight: 700 }}>{item.title}</h3>
                      {item.hint ? <span style={{ color: 'var(--accent-red)', fontSize: '0.75rem', opacity: 0 }} className="works-hint">{item.hint}</span> : null}
                    </div>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#666' }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-wrapper section-block" style={{ paddingBottom: '6rem', borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: '4rem', background: 'rgba(253, 251, 247, 0.78)' }}>
              <div style={{ maxWidth: '42rem', margin: '0 auto 4rem' }}>
                <h3 className="serif-display" style={{ fontSize: '2.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>Basically</h3>
                <div className="soft-truth-callout" style={{ borderLeft: '3px solid var(--accent-red)', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '1.125rem', marginBottom: '1rem', fontWeight: 300, color: 'var(--text-black)', lineHeight: 1.6 }}>Wavy hair is a controlled mechanical imbalance.</p>
                  <p style={{ fontSize: '1.125rem', marginBottom: '1rem', fontWeight: 300, color: 'var(--text-black)', lineHeight: 1.6 }}>It's not confused and definitely not broken. It's just balancing forces:</p>
                  <ul className="mono" style={{ fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.8, listStyle: 'none', paddingLeft: 0 }}>
                    <li>Geometry</li>
                    <li>Hydrogen bonds</li>
                    <li>Gravity</li>
                    <li>Humidity</li>
                    <li>Product mass</li>
                  </ul>
                </div>
              </div>
              <details open={sourcesOpen} onToggle={(e) => setSourcesOpen(e.target.open)} style={{ background: 'rgba(245, 245, 245, 0.85)', padding: '1.5rem' }}>
                <summary className="mono" style={{ listStyle: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', color: '#333' }}>
                  <span>The Receipts. (Sources)</span>
                  <span style={{ transform: sourcesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>↓</span>
                </summary>
                <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem 1.5rem', fontSize: '0.65rem', lineHeight: 1.5, color: '#444' }} className="mono">
                  <div>
                    <p style={{ marginBottom: '0.35rem', fontWeight: 600, color: '#222', fontSize: '0.7rem' }}>01. Follicle & structure</p>
                    <p style={{ margin: '0 0 0.2rem 0',  }}><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6393780/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Cloete et al. (2019), structural and geometric differences in curly hair</a></p>
                    <p style={{ margin: '0 0 0.2rem 0',  }}><a href="https://onlinelibrary.wiley.com/doi/full/10.1111/exd.13347" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Westgate et al. (2017), follicle biology and developmental pathways</a></p>
                    <p style={{ margin: '0 0 0.2rem 0',  }}><a href="https://pubmed.ncbi.nlm.nih.gov/29449061/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Pośpiech et al. (2018), DNA-based hair morphology prediction</a></p>
                    <p style={{ margin: 0,  }}><a href="https://onlinelibrary.wiley.com/doi/full/10.1111/exd.13347" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Westgate et al. (2017), genetic regulation of hair structure</a></p>
                  </div>
                  <div>
                    <p style={{ marginBottom: '0.35rem', fontWeight: 600, color: '#222', fontSize: '0.7rem' }}>02. Cross-section & mechanics</p>
                    <p style={{ margin: '0 0 0.2rem 0',  }}><a href="https://link.springer.com/book/10.1007/978-3-642-25611-0" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Robbins (2012), Chemical and Physical Behavior of Human Hair</a></p>
                    <p style={{ margin: '0 0 0.2rem 0',  }}><a href="https://onlinelibrary.wiley.com/doi/10.1111/ics.12796" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Wortmann et al. (2019), biomechanical modeling of fiber bending</a></p>
                    <p style={{ margin: '0 0 0.2rem 0',  }}><a href="https://link.springer.com/book/10.1007/978-3-642-25611-0" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Robbins (2012), Cloete et al. (2019) (ortho/para)</a></p>
                    <p style={{ margin: 0,  }}><a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/ics.12261" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Robbins (2012), Coderch et al., hair surface lipids and barrier properties</a></p>
                  </div>
                  <div>
                    <p style={{ marginBottom: '0.35rem', fontWeight: 600, color: '#222', fontSize: '0.7rem' }}>03. Humidity & bonds</p>
                    <p style={{ margin: '0 0 0.2rem 0',  }}><a href="https://link.springer.com/book/10.1007/978-3-642-25611-0" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Robbins (2012)</a></p>
                    <p style={{ margin: 0,  }}><a href="https://onlinelibrary.wiley.com/doi/10.1111/ics.12796" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Wortmann et al. (2019)</a></p>
                  </div>
                  <div>
                    <p style={{ marginBottom: '0.35rem', fontWeight: 600, color: '#222', fontSize: '0.7rem' }}>04. Why waves drop</p>
                    <p style={{ margin: '0 0 0.2rem 0',  }}><a href="https://onlinelibrary.wiley.com/doi/10.1111/ics.12796" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Wortmann et al. (2019), fiber bending and load response</a></p>
                    <p style={{ margin: 0,  }}><a href="https://link.springer.com/book/10.1007/978-3-642-25611-0" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Robbins (2012), mechanical properties of keratin fibers</a></p>
                  </div>
                </div>
              </details>
            </section>
          </div>
        </main>
      </div>

    </div>
    </>
  )
}
