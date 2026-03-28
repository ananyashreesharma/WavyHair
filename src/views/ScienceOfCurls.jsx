import { useState, useEffect, useRef } from 'react'
import '../chalk-theme.css'
import gravityCheckImg from '../assets/gravity-check.png'

const NAV_ITEMS = [
  { id: 'bio', label: '01 Why' },
  { id: 'structure', label: '02 What' },
  { id: 'physics', label: '03 Humidity' },
  { id: 'drop', label: '04 Drop' },
  { id: 'works', label: '05 Works' },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function ScienceOfCurls() {
  const [activeNav, setActiveNav] = useState('bio')
  const [structureView, setStructureView] = useState('fiber')
  const [ellipticity, setEllipticity] = useState(1.0)
  const [cuticleRaise, setCuticleRaise] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    const prev = document.body.style.cssText
    document.body.style.backgroundColor = '#1a1b1e'
    document.body.style.color = '#f0f0f0'
    return () => { document.body.style.cssText = prev }
  }, [])

  useEffect(() => {
    const container = mainRef.current
    if (!container) return
    const sections = container.querySelectorAll('.section-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view')
        })
      },
      { rootMargin: '-10% 0px -15% 0px', threshold: 0 }
    )
    sections.forEach((el) => observer.observe(el))
    return () => sections.forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <div ref={mainRef} className="chalk-theme">
      <header className="container section-reveal in-view" style={{ padding: '6rem 0 4rem', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div className="fig-label">Your hair, decoded</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', transform: 'rotate(-1deg)' }}>
              Your waves aren't random.<br />
              <span className="highlight-blue">They're literally built different.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--chalk-dim)', maxWidth: '90%', marginBottom: '1rem', lineHeight: 1.7 }}>
              I'm not a hair scientist. I'm just a wavy girl who followed the curly girl method for years… and kept wondering why my hair looked perfect at 9am and confused by 2pm.
            </p>
            <p style={{ fontSize: '1.25rem', color: 'var(--chalk-dim)', maxWidth: '90%', marginBottom: '1rem', lineHeight: 1.7 }}>
              So I did what any slightly dramatic, slightly nerdy person would do. I read the research.
            </p>
            <p style={{ fontSize: '1.25rem', color: 'var(--chalk-white)', maxWidth: '90%', marginBottom: '2rem', lineHeight: 1.7 }}>
              These are just bits and bytes of what I learned.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', fontFamily: 'var(--font-display)', fontSize: '1.25rem', flexWrap: 'wrap' }}>
              {NAV_ITEMS.map(({ id, label }) => (
                <div
                  key={id}
                  className={`nav-item ${activeNav === id ? 'active' : ''}`}
                  onClick={() => { setActiveNav(id); scrollToSection(id) }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="float-anim">
            <HeroSVG />
          </div>
        </div>
      </header>

      <section id="bio" className="container section-reveal" style={{ padding: '6rem 0' }} onMouseEnter={() => setActiveNav('bio')}>
        <div className="doodle-box">
          <h2 className="highlight-pink">01 — Why Your Hair Is Wavy</h2>
          <p style={{ fontFamily: 'var(--font-small)', color: 'var(--chalk-dim)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>(It starts in the follicle)</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Hair shape is programmed at the root.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Research shows straight hair grows from a more symmetrical follicle. Curly hair grows from a more curved, asymmetrical one. Wavy hair sits in between — mildly asymmetric, not dramatic enough to spiral, not even enough to fall flat.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>That tiny bend in the follicle changes how the strand exits your scalp.</p>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-pink)', marginBottom: '1.5rem' }}><strong>Your wave starts under your skin. No cap.</strong></p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Hair shape is influenced by multiple genes, including EDAR and TCHH, which affect follicle structure and internal protein formation. There isn't one "wavy gene." It's polygenic — layered and subtle.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Which honestly makes sense. Because waves are layered and subtle.</p>
          <p style={{ fontSize: '0.95rem', color: 'var(--chalk-dim)', fontFamily: 'var(--font-small)' }}>(Supported by Cloete et al., 2019; Westgate et al., 2017; Pośpiech et al., 2018)</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', marginTop: '2rem' }}>
            <BioProfessorSVG />
            <BioDiagramSVG />
          </div>
          <div className="gene-card" style={{ marginTop: '2rem' }}>
            <h3 className="highlight-yellow" style={{ fontSize: '1.1rem' }}>The genes doing the most: EDAR & TCHH</h3>
            <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>TCHH makes a protein that acts like glue inside the hair root. EDAR is linked to straighter, thicker, rounder fibers. Together they're part of why your pattern is yours.</p>
          </div>
        </div>
      </section>

      <section id="structure" className="section-reveal" style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.02)' }} onMouseEnter={() => setActiveNav('structure')}>
        <div className="container">
          <h2 className="highlight-blue" style={{ marginBottom: '0.5rem' }}>02 — What's Actually Going On</h2>
          <p style={{ fontFamily: 'var(--font-small)', color: 'var(--chalk-dim)', marginBottom: '2rem' }}>(Shape + internal structure)</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>This is the part that changed everything for me.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}><strong>Your strand isn't round.</strong></p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Straight hair has a more circular cross-section. Curlier hair is more flattened — more oval. Wavy hair? Slightly oval.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>The more oval the strand, the easier it bends. That's just physics.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Inside the strand are different cortical cell types — ortho and para cells. In tight curls, they're strongly separated on opposite sides of the strand, creating pronounced curvature. In straight hair, they're more evenly distributed.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>In waves, the separation is subtle. Enough internal tension to create movement. Not enough to create coils.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>That's why your pattern shows up when wet… and sometimes disappears when brushed.</p>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-blue)', marginBottom: '1rem' }}>You live in the middle.</p>
          <p style={{ fontSize: '0.95rem', color: 'var(--chalk-dim)', fontFamily: 'var(--font-small)', marginBottom: '2rem' }}>(Supported by Bryson et al., 2009; Wortmann et al., 2019; Robbins, 2012)</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
            <button className={`control-btn ${structureView === 'fiber' ? 'active' : ''}`} onClick={() => setStructureView('fiber')}>Inside the strand</button>
            <button className={`control-btn ${structureView === 'surface' ? 'active' : ''}`} onClick={() => setStructureView('surface')}>The surface (cuticles)</button>
          </div>

          <div className="interactive-stage" id="view-fiber" style={{ display: structureView === 'fiber' ? 'grid' : 'none' }}>
            <div>
              <h3 className="highlight-yellow">Cross-section shape</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Slide to see oval (curlier) vs round (straighter).</p>
              <FiberCrossSectionSVG ellipticity={ellipticity} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-yellow)' }}>How oval? (curl tightness)</label>
              <input type="range" min="0.4" max="1.0" step="0.01" value={ellipticity} className="chalk-range" onChange={(e) => setEllipticity(parseFloat(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-small)', color: 'var(--chalk-dim)' }}>
                <span>Oval = curlier</span>
                <span>Round = straighter</span>
              </div>
            </div>
          </div>

          <div className="interactive-stage" id="view-surface" style={{ display: structureView === 'surface' ? 'grid' : 'none' }}>
            <div>
              <h3 className="highlight-green">Cuticle health</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Your cuticles are like tiny roof shingles. When they're lifted, you get more friction, frizz, and dullness.</p>
              <CuticleSVG raise={cuticleRaise} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-green)' }}>Cuticle lift (damage)</label>
              <input type="range" min="0" max="15" step="1" value={cuticleRaise} className="chalk-range" onChange={(e) => setCuticleRaise(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-small)', color: 'var(--chalk-dim)' }}>
                <span>Laying flat (healthy)</span>
                <span>Lifted (damaged)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="physics" className="container section-reveal" style={{ padding: '6rem 0' }} onMouseEnter={() => setActiveNav('physics')}>
        <h2 className="highlight-yellow">03 — Why Humidity Changes Everything</h2>
        <div className="doodle-box" style={{ marginTop: '2rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Hair shape is partly held together by hydrogen bonds.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Water breaks those bonds. Drying reforms them.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>So when your hair gets wet, it becomes flexible. When it dries, it "locks" into whatever shape it was in.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Now add humidity. More water in the air = more bond disruption.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Curly hair has stronger structural locking. Straight hair doesn't rely on curvature. Wavy hair? It reacts.</p>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-yellow)', marginBottom: '1.5rem' }}>That's not damage. That's chemistry.</p>
          <p style={{ fontSize: '0.95rem', color: 'var(--chalk-dim)', fontFamily: 'var(--font-small)', marginBottom: '2rem' }}>(Supported by Robbins, 2012; Coderch et al., 2017)</p>
          <HumidityViz humidity={humidity} />
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <label className="highlight-blue" style={{ fontFamily: 'var(--font-display)' }}>Humidity level — slide to see the vibe</label>
            <input type="range" min="0" max="100" value={humidity} className="chalk-range" onChange={(e) => setHumidity(Number(e.target.value))} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-small)', color: 'var(--chalk-dim)' }}>
              <span>Dry (defined)</span>
              <span>Humid (frizz mode)</span>
            </div>
          </div>
        </div>
      </section>

      <section id="drop" className="container section-reveal" style={{ padding: '6rem 0' }} onMouseEnter={() => setActiveNav('drop')}>
        <div className="doodle-box">
          <h2 className="highlight-pink">04 — Why Waves Drop</h2>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem', marginBottom: '1rem' }}>Gravity.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Because wavy hair is only moderately elliptical, it bends — but not strongly enough to fight weight.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Heavy creams stretch the bend. Too much oil elongates the strand. Too much stiff gel can pull it downward.</p>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-pink)', marginBottom: '2rem' }}><strong>Waves don't need control. They need lift.</strong></p>
          <div style={{ minHeight: '280px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '1rem 0' }}>
            <img src={gravityCheckImg} alt="I don't trip. I do random gravity checks. Still good!" style={{ display: 'block', maxWidth: '320px', width: '100%' }} />
            <DropStickFigureChalk />
          </div>
        </div>
      </section>

      <section id="works" className="container section-reveal" style={{ padding: '6rem 0' }} onMouseEnter={() => setActiveNav('works')}>
        <h2 className="highlight-green" style={{ marginBottom: '0.5rem' }}>05 — What Actually Works (For Me)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 220px) minmax(0, 1fr)', gap: '2rem', alignItems: 'start', marginBottom: '2rem' }}>
          <div style={{ minHeight: '280px', display: 'flex', justifyContent: 'center' }}>
            <WorksStickFigureChalk />
          </div>
          <div>
            <p style={{ fontSize: '1.2rem', color: 'var(--chalk-dim)', marginBottom: '1rem' }}>After years of trial and error, here's what finally clicked:</p>
            <ul style={{ fontSize: '1.2rem', marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
              <li>Light hydration</li>
              <li>Mousse instead of heavy gel</li>
              <li>Styling soaking wet</li>
              <li>Scrunching upward</li>
              <li>Touching it less</li>
              <li>Sometimes sea salt spray</li>
              <li>Sometimes lightweight hyaluronic gel</li>
            </ul>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}><strong>Here's why that makes sense.</strong></p>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Mousse gives structure without adding mass. Wavy hair bends easily but can't carry weight well. Mousse supports the pattern without dragging it down.</p>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Hyaluronic gel (when lightweight) helps maintain flexibility without stiffness. Waves need elasticity, not rigidity.</p>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Sea salt spray adds texture by increasing friction slightly — more grip, more visible wave — but too much dries things out. It's a tool, not a lifestyle.</p>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Styling soaking wet matters because hydrogen bonds reset during drying. If you set the pattern while wet, it locks in better.</p>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Touching it less matters because waves sit in a narrow stability window. The more you disrupt them while drying, the more inconsistent they become.</p>
            <p style={{ fontSize: '1.2rem', color: 'var(--accent-green)' }}>Now I treat my hair like what it is: a controlled mechanical imbalance. Not confused. Not broken. Just balanced.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2rem' }}>
          <ProtocolCard borderColor="var(--accent-pink)" title="Be gentle" body="Go easy on sulfates and heat. Dial it back and your waves will thank you." icon={<ProtocolIconSulfate />} />
          <ProtocolCard borderColor="var(--accent-blue)" title="Set while damp" body="Catch the shape while it's wet. Leave-in and gel help lock the pattern in." icon={<ProtocolIconLock />} />
          <ProtocolCard borderColor="var(--accent-green)" title="Less friction" body="Satin pillowcases and scrunchies reduce tugging and breakage. Your bonds will thank you." icon={<ProtocolIconSatin />} />
        </div>
      </section>

      <section id="soft-truth" className="container section-reveal" style={{ padding: '6rem 0' }}>
        <div className="doodle-box">
          <h2 className="highlight-yellow script-heading" style={{ textAlign: 'center', fontSize: '2.5rem' }}>The Soft Truth ✨</h2>
          <p style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Wavy hair lives in a very specific equilibrium.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Too humid → frizz. Too heavy → straight. Too stiff → stringy. Too dry → fluffy.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Once I understood that, I stopped forcing it to behave like tight curls.</p>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-yellow)' }}>I started supporting what it already is.</p>
        </div>
      </section>

      <section id="sources" className="container" style={{ padding: '4rem 0 2rem' }}>
        <button
          type="button"
          className="sources-btn"
          onClick={() => setSourcesOpen((o) => !o)}
          style={{
            display: 'block',
            margin: '0 auto',
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: 'var(--chalk-dim)',
            background: 'none',
            border: '2px solid var(--chalk-dim)',
            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {sourcesOpen ? '▼ Hide sources' : '◇ Sources (for the nerds)'}
        </button>
        {sourcesOpen && (
          <div style={{ maxWidth: '720px', margin: '2rem auto 0', padding: '2rem', border: '2px solid var(--chalk-dim)', borderRadius: '10px', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontFamily: 'var(--font-small)', color: 'var(--chalk-dim)', marginBottom: '1.5rem', fontSize: '1rem' }}>
              Science but make it cute. Here’s who actually said it — all links go to the real papers or books.
            </p>

            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-pink)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>01 — Why your hair is wavy</h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--chalk-white)' }}>
              <li>• <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6894537/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Cloete et al., 2019</a> — <em>The what, why and how of curly hair: a review</em></li>
              <li>• <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/exd.13347" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Westgate et al., 2017</a> — <em>The biology and genetics of curly hair</em></li>
              <li>• <a href="https://www.sciencedirect.com/science/article/pii/S1872497318302077" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Pośpiech et al., 2018</a> — <em>Improving the prediction of head hair shape from DNA</em></li>
            </ul>

            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-blue)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>02 — What’s actually going on</h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--chalk-white)' }}>
              <li>• <a href="https://link.springer.com/book/10.1007/978-3-642-25611-0" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Robbins, 2012</a> — <em>Chemical and Physical Behavior of Human Hair</em> (cross-section, ellipticity, curl)</li>
              <li>• <a href="https://onlinelibrary.wiley.com/doi/10.1111/exd.14048" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Wortmann et al., 2019</a> — <em>Why is hair curly?—Biomechanics of the mature hair shaft</em></li>
              <li>• <a href="https://onlinelibrary.wiley.com/doi/10.1111/j.1468-2494.2010.00579_6.x" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Curved human hair microstructure</a> — Cortical cell types & curvature (ortho/para)</li>
            </ul>

            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-yellow)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>03 — Why humidity changes everything</h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--chalk-white)' }}>
              <li>• <a href="https://link.springer.com/book/10.1007/978-3-642-25611-0" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Robbins, 2012</a> — Hydrogen bonds, water, drying, shape lock</li>
              <li>• <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/ics.12261" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Coderch et al.</a> — <em>The influence of hair lipids in ethnic hair properties</em> (moisture & lipids)</li>
            </ul>

            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-green)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>04 & 05 — What to actually do (heat, friction, setting pattern)</h4>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--chalk-white)' }}>
              <li>• <a href="https://www.sciencedirect.com/science/article/abs/pii/S0040603118300145" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Wortmann et al., 2018</a> — <em>Kinetics of changes by thermal treatment</em> (heat & keratin)</li>
              <li>• Robbins (2012) — Styling while wet & hydrogen bond re-forming</li>
              <li>• Wortmann & Schwan-Jonczyk — Hair handle, friction, cuticle damage (referenced in review lit)</li>
            </ul>

            <p style={{ fontFamily: 'var(--font-small)', color: 'var(--chalk-dim)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
              Quick list: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6894537/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Cloete 2019</a> · <a href="https://onlinelibrary.wiley.com/doi/10.1111/j.1468-2494.2010.00579_6.x" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>curved hair structure</a> · <a href="https://onlinelibrary.wiley.com/doi/10.1111/exd.14048" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Wortmann 2019</a> · <a href="https://link.springer.com/book/10.1007/978-3-642-25611-0" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Robbins 2012</a> · <a href="https://www.sciencedirect.com/science/article/pii/S1872497318302077" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Pośpiech 2018</a> · <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/exd.13347" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Westgate 2017</a> · <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/ics.12261" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Coderch</a> · <a href="https://www.sciencedirect.com/science/article/abs/pii/S0040603118300145" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Wortmann 2018</a>
            </p>
          </div>
        )}
      </section>

      <section id="routine-reads" className="container section-reveal" style={{ padding: '2rem 0 4rem' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-script)', fontWeight: 700, fontSize: '2rem', color: 'var(--chalk-white)', marginBottom: '0.5rem' }}>Loved wavy hair routine reads ✨</h2>
        <p style={{ textAlign: 'center', color: 'var(--chalk-dim)', fontFamily: 'var(--font-body)', marginBottom: '1.5rem', fontSize: '1rem' }}>Practical routines beyond the nerd spiral — more product-focused, great for step-by-step ideas.</p>
        <ul style={{ listStyle: 'none', maxWidth: '560px', margin: '0 auto', fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: 2.2 }}>
          <li>• <a href="https://www.vogue.com/article/wavy-hair-routine" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Vogue — The Ultimate Wavy Hair Routine</a></li>
          <li>• <a href="https://www.cosmopolitan.com/style-beauty/beauty/a65562666/wavy-hair-routine/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Cosmopolitan — The Best Wavy Hair Routine</a></li>
          <li>• <a href="https://www.marieclaire.com/beauty/wavy-hair-routine/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Marie Claire — My 5-Minute Wavy Hair Routine</a></li>
          <li>• <a href="https://curlsmith.com/blogs/curl-academy/wavy-hair" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Curlsmith — The Ultimate Wavy Hair Guide</a></li>
        </ul>
      </section>

      <footer style={{ textAlign: 'center', padding: '4rem', opacity: 0.5, fontFamily: 'var(--font-small)' }}>
        <p>That's a wrap. Go rock those waves. ✨</p>
      </footer>
    </div>
  )
}

function HeroSVG() {
  return (
    <svg width="100%" height="400" viewBox="0 0 400 400" style={{ overflow: 'visible' }}>
      <rect x="10" y="10" width="380" height="300" rx="5" fill="none" stroke="#666" strokeWidth="8" />
      <rect x="20" y="20" width="360" height="280" rx="2" fill="#222" stroke="none" />
      <path d="M 80,100 Q 120,50 160,100 T 240,100" stroke="white" strokeWidth="3" fill="none" strokeDasharray="5,5" />
      <path d="M 80,140 Q 120,90 160,140 T 240,140" stroke="white" strokeWidth="3" fill="none" />
      <text x="100" y="250" fill="white" fontFamily="'Gochi Hand'" fontSize="18">The blueprint</text>
      <g transform="translate(260, 180)">
        <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="4" fill="#f0f0f0" />
        <circle cx="30" cy="35" r="8" stroke="black" strokeWidth="2" fill="none" />
        <circle cx="50" cy="35" r="8" stroke="black" strokeWidth="2" fill="none" />
        <line x1="38" y1="35" x2="42" y2="35" stroke="black" strokeWidth="2" />
        <line x1="40" y1="70" x2="40" y2="150" stroke="white" strokeWidth="4" />
        <line x1="40" y1="90" x2="10" y2="60" stroke="white" strokeWidth="4" />
        <line x1="40" y1="90" x2="70" y2="120" stroke="white" strokeWidth="4" />
        <line x1="10" y1="60" x2="-40" y2="0" stroke="#FFD700" strokeWidth="3" />
        <line x1="40" y1="150" x2="20" y2="200" stroke="white" strokeWidth="4" />
        <line x1="40" y1="150" x2="60" y2="200" stroke="white" strokeWidth="4" />
        <path d="M 10,40 Q -10,10 20,-10 T 60,-10 T 90,40" stroke="#f0f0f0" strokeWidth="3" fill="none" />
        <path d="M 15,30 Q 0,0 40,-20 T 80,0" stroke="#f0f0f0" strokeWidth="3" fill="none" />
      </g>
    </svg>
  )
}

function BioProfessorSVG() {
  return (
    <svg width="200" height="250" viewBox="0 0 200 250">
      <circle cx="100" cy="180" r="40" stroke="white" strokeWidth="4" fill="#f0f0f0" />
      <circle cx="85" cy="175" r="10" stroke="black" strokeWidth="2" fill="none" />
      <circle cx="115" cy="175" r="10" stroke="black" strokeWidth="2" fill="none" />
      <line x1="95" y1="175" x2="105" y2="175" stroke="black" strokeWidth="2" />
      <path d="M 90,200 Q 100,210 110,200" stroke="black" strokeWidth="2" fill="none" />
      <path d="M 60,180 C 40,140 60,100 100,100 C 140,100 160,140 140,180" stroke="white" strokeWidth="3" fill="none" strokeDasharray="4,4" />
      <path d="M 50,160 C 20,120 70,80 100,80 C 130,80 180,120 150,160" stroke="white" strokeWidth="2" fill="none" />
      <line x1="100" y1="220" x2="100" y2="250" stroke="white" strokeWidth="4" />
    </svg>
  )
}

function DropStickFigureChalk() {
  return (
    <svg width="200" height="120" viewBox="0 0 240 120" style={{ display: 'block', overflow: 'visible' }} aria-hidden>
      <g fill="none" stroke="var(--chalk-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="120" cy="25" r="12" />
        <line x1="120" y1="37" x2="120" y2="65" />
        <line x1="120" y1="45" x2="85" y2="35" />
        <line x1="120" y1="45" x2="155" y2="35" />
        <line x1="120" y1="65" x2="95" y2="105" />
        <line x1="120" y1="65" x2="145" y2="105" />
      </g>
      <rect x="70" y="0" width="100" height="28" rx="6" fill="none" stroke="var(--accent-pink)" strokeWidth="1.5" />
      <path d="M100 28 L95 38 L105 38 Z" fill="none" stroke="var(--accent-pink)" strokeWidth="1.5" />
      <text x="120" y="18" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="var(--chalk-white)">STILL GOOD!</text>
      <text x="120" y="95" textAnchor="middle" fontFamily="var(--font-small)" fontSize="9" fill="var(--chalk-dim)">gravity checks</text>
    </svg>
  )
}

function WorksStickFigureChalk() {
  return (
    <svg width="200" height="260" viewBox="0 0 200 260" style={{ display: 'block', overflow: 'visible' }} aria-hidden>
      <rect x="50" y="0" width="100" height="26" rx="6" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" />
      <path d="M90 26 L85 36 L95 36 Z" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" />
      <text x="100" y="17" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fontWeight="600" fill="var(--chalk-white)">LIFT!</text>
      <g fill="none" stroke="var(--chalk-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="100" cy="55" r="18" />
        <line x1="100" y1="73" x2="100" y2="140" />
        <line x1="100" y1="95" x2="65" y2="55" />
        <line x1="100" y1="95" x2="135" y2="55" />
        <line x1="100" y1="140" x2="75" y2="200" />
        <line x1="100" y1="140" x2="125" y2="200" />
      </g>
    </svg>
  )
}

function BioDiagramSVG() {
  return (
    <svg width="100%" height="300" viewBox="0 0 400 300">
      <path d="M 0,50 Q 50,45 100,50 T 200,50 T 300,50 T 400,50" stroke="#f0f0f0" strokeWidth="3" fill="none" opacity="0.5" />
      <text x="10" y="40" fill="#f0f0f0" fontFamily="'Gochi Hand'" fontSize="14">Scalp surface</text>
      <path d="M 180,250 C 150,250 150,200 180,180 C 210,160 250,120 220,50" stroke="#ffeb3b" strokeWidth="15" fill="none" strokeLinecap="round" opacity="0.3" />
      <path d="M 180,250 C 150,250 150,200 180,180 C 210,160 250,120 220,50" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="180" y1="250" x2="220" y2="280" stroke="#ff4081" strokeWidth="2" />
      <text x="230" y="285" fill="#ff4081" fontFamily="'Permanent Marker'" fontSize="16">Dermal papilla (the little engine)</text>
      <path d="M 240,120 Q 280,120 300,100" stroke="#4fc3f7" strokeWidth="2" strokeDasharray="5,5" fill="none" />
      <text x="310" y="100" fill="#4fc3f7" fontFamily="'Gochi Hand'">Bent tube = bent hair. Simple.</text>
    </svg>
  )
}

function FiberCrossSectionSVG({ ellipticity }) {
  const ry = 80 * ellipticity
  const offset = 80 - ry
  return (
    <svg id="fiber-svg" width="300" height="300" viewBox="0 0 300 300">
      <g transform={`translate(150, ${50 + offset})`}>
        <circle cx="0" cy="0" r="15" stroke="white" strokeWidth="3" fill="#f0f0f0" />
        <line x1="0" y1="15" x2="0" y2="40" stroke="white" strokeWidth="3" />
        <line x1="0" y1="40" x2="-10" y2="60" stroke="white" strokeWidth="3" />
      </g>
      <g transform={`translate(150, ${250 - offset})`}>
        <circle cx="0" cy="0" r="15" stroke="white" strokeWidth="3" fill="#f0f0f0" />
        <line x1="0" y1="-15" x2="0" y2="-40" stroke="white" strokeWidth="3" />
        <line x1="0" y1="-40" x2="-10" y2="-60" stroke="white" strokeWidth="3" />
      </g>
      <ellipse cx="150" cy="150" rx="80" ry={ry} fill="none" stroke="#ffeb3b" strokeWidth="8" />
      <path d="M 150,70 A 80,80 0 0 1 150,230" stroke="#ff4081" strokeWidth="4" strokeDasharray="5,5" fill="none" opacity="0.6" />
      <text x="180" y="150" fill="#ff4081" fontSize="12" fontFamily="'Gochi Hand'">ORTHO</text>
      <text x="80" y="150" fill="#4fc3f7" fontSize="12" fontFamily="'Gochi Hand'">PARA</text>
    </svg>
  )
}

function CuticleSVG({ raise }) {
  const deg = Number(raise)
  return (
    <svg id="cuticle-svg" width="300" height="200" viewBox="0 0 300 200">
      <rect x="20" y="80" width="260" height="40" fill="#333" stroke="none" />
      <g id="scales-top">
        {Array.from({ length: 8 }, (_, i) => {
          const x = 20 + i * 35
          return <line key={`t-${i}`} x1={x} y1="80" x2={50 + i * 35} y2="80" stroke="white" strokeWidth="3" transform={`rotate(-${deg}, ${x}, 80)`} />
        })}
      </g>
      <g id="scales-bottom">
        {Array.from({ length: 8 }, (_, i) => {
          const x = 20 + i * 35
          return <line key={`b-${i}`} x1={x} y1="120" x2={50 + i * 35} y2="120" stroke="white" strokeWidth="3" transform={`rotate(${deg}, ${x}, 120)`} />
        })}
      </g>
      <circle cx="280" cy="100" r="15" stroke="white" strokeWidth="3" fill="#f0f0f0" />
      <line x1="265" y1="100" x2="240" y2="100" stroke="white" strokeWidth="3" />
      <text x="250" y="60" fill="white" fontFamily="'Gochi Hand'" fontSize="14">Touch test</text>
    </svg>
  )
}

function HumidityViz({ humidity }) {
  const val = Number(humidity)
  const scale = 1 + val / 100
  const opacity = val / 100
  const strokeW = val > 50 ? 1 : 3
  const mouthD = val > 80 ? 'M 90,145 Q 100,135 110,145' : 'M 90,140 Q 100,145 110,140'
  const frizzPath = (() => {
    const chaos = val * 0.4
    return `M -25,0 Q ${-40 - chaos},${-20 - chaos} ${-20 + chaos},${-40 - chaos} Q ${0},${-50 - chaos} ${20 - chaos},${-40 - chaos} Q ${40 + chaos},${-20 - chaos} ${25},0`
  })()

  return (
    <div style={{ position: 'relative', height: '300px', borderBottom: '2px solid var(--chalk-white)', marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 600 300" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <g opacity={opacity}>
          <path d="M 50,50 Q 70,30 90,50 T 130,50 T 150,80" stroke="#4fc3f7" strokeWidth="2" fill="none" />
          <path d="M 450,40 Q 470,20 490,40 T 530,40" stroke="#4fc3f7" strokeWidth="2" fill="none" />
          <line x1="70" y1="70" x2="60" y2="90" stroke="#4fc3f7" strokeWidth="2" opacity="0.6" />
          <line x1="100" y1="60" x2="90" y2="80" stroke="#4fc3f7" strokeWidth="2" opacity="0.6" />
        </g>
      </svg>
      <svg width="200" height="250" viewBox="0 0 200 250" style={{ zIndex: 1 }}>
        <line x1="100" y1="150" x2="100" y2="220" stroke="white" strokeWidth="4" />
        <line x1="100" y1="220" x2="80" y2="250" stroke="white" strokeWidth="4" />
        <line x1="100" y1="220" x2="120" y2="250" stroke="white" strokeWidth="4" />
        <line x1="100" y1="170" x2="70" y2="150" stroke="white" strokeWidth="4" />
        <line x1="100" y1="170" x2="130" y2="150" stroke="white" strokeWidth="4" />
        <circle cx="100" cy="130" r="25" stroke="white" strokeWidth="4" fill="#f0f0f0" />
        <circle cx="90" cy="125" r="2" fill="black" />
        <circle cx="110" cy="125" r="2" fill="black" />
        <path d={mouthD} stroke="black" strokeWidth="2" fill="none" />
        <g transform={`translate(100,130) scale(${scale})`}>
          <path d={frizzPath} stroke="white" strokeWidth={strokeW} fill="none" />
        </g>
      </svg>
    </div>
  )
}

function ProtocolCard({ borderColor, title, body, icon }) {
  return (
    <div className="protocol-card" style={{ borderColor }}>
      <div style={{ height: '100px', marginBottom: '1.5rem' }}>{icon}</div>
      <h3 style={{ color: borderColor }}>{title}</h3>
      <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>{body}</p>
    </div>
  )
}

function ProtocolIconSulfate() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <rect x="35" y="40" width="30" height="50" rx="5" stroke="white" strokeWidth="3" fill="none" />
      <rect x="42" y="30" width="16" height="10" stroke="white" strokeWidth="3" fill="none" />
      <text x="40" y="70" fill="white" fontSize="10" fontFamily="'Gochi Hand'">SO4</text>
      <line x1="20" y1="20" x2="80" y2="80" stroke="#ff4081" strokeWidth="4" opacity="0.8" />
      <line x1="80" y1="20" x2="20" y2="80" stroke="#ff4081" strokeWidth="4" opacity="0.8" />
    </svg>
  )
}

function ProtocolIconLock() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <path d="M 30,50 Q 20,40 30,30" stroke="white" strokeWidth="3" fill="none" />
      <path d="M 70,50 Q 80,40 70,30" stroke="white" strokeWidth="3" fill="none" />
      <path d="M 40,20 Q 50,80 60,20" stroke="#4fc3f7" strokeWidth="3" fill="none" strokeDasharray="2,2" />
      <circle cx="50" cy="50" r="5" fill="#4fc3f7" />
    </svg>
  )
}

function ProtocolIconSatin() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <rect x="20" y="40" width="60" height="40" rx="5" stroke="#69f0ae" strokeWidth="3" fill="none" />
      <text x="35" y="65" fill="#69f0ae" fontSize="10" fontFamily="'Gochi Hand'">SATIN</text>
      <circle cx="50" cy="35" r="15" stroke="white" strokeWidth="3" fill="#1a1b1e" />
      <text x="70" y="20" fill="white" fontSize="12">Zzz</text>
    </svg>
  )
}
