import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// ─── Types ──────────────────────────────────────────────────────────────────
type Part = string | { t: string; accent: true }
type Phase = 'lines' | 'memoir' | 'likes'

interface Line {
  id: number
  content: Part[]
  size: 'large' | 'medium'
}

function render(parts: Part[]) {
  return parts.map((p, i) =>
    typeof p === 'string'
      ? <span key={i}>{p}</span>
      : <span key={i} className="accent">{p.t}</span>
  )
}

// ─── Intro lines ─────────────────────────────────────────────────────────────
const LINES: Line[] = [
  { id: 0, content: ["Hey Maki"], size: 'large' },
  { id: 1, content: ["So I've been meaning to tell you something"], size: 'medium' },
  { id: 2, content: ["But first, let me make this a little more ", { t: "interesting", accent: true }], size: 'medium' },
  { id: 3, content: ["You know I have a thing for the ", { t: "dramatics", accent: true }], size: 'medium' },
  { id: 4, content: ["Let me start with a little ", { t: "story…", accent: true }], size: 'medium' },
]

// ─── Photos ──────────────────────────────────────────────────────────────────
const PHOTOS: string[] = []

function PhotoCarousel() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    if (PHOTOS.length === 0) return
    const t = setInterval(() => setCur(i => (i + 1) % PHOTOS.length), 3500)
    return () => clearInterval(t)
  }, [])

  if (PHOTOS.length === 0) {
    return (
      <div className="carousel" style={{ background: '#0d1e35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'rgba(200,224,245,0.2)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>add photos here</span>
      </div>
    )
  }

  return (
    <div className="carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={cur}
          src={PHOTOS[cur]}
          alt=""
          className="carousel-img"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </AnimatePresence>
      <div className="carousel-veil" />
      <div className="carousel-dots">
        {PHOTOS.map((_, i) => (
          <span key={i} className={`cdot${i === cur ? ' on' : ''}`} onClick={() => setCur(i)} />
        ))}
      </div>
    </div>
  )
}

// ─── Memoir scene ────────────────────────────────────────────────────────────
function Memoir({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <motion.div
      className="memoir"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PhotoCarousel />

      <div className="memoir-body">
        <span className="memoir-tag">A Story</span>
        <h2 className="memoir-title">Write your story title here…</h2>

        <div className="memoir-text">
          <p>
            Write your memoir content here. Tell your story —{' '}
            <em className="memoir-em">add the meaningful moments.</em>{' '}
            This is your space to be honest and creative.
          </p>

          <p>
            Add more paragraphs as needed. Talk about how you met, what you noticed,
            what made you pay attention.
          </p>

          <p>And from there… the rest is history.</p>

          <p className="memoir-punchline">
            Their one flaw?{' '}
            <em className="memoir-em">Write it here.</em>{' '}
            <span className="memoir-lol">LOL</span>
          </p>
        </div>

        <div className="memoir-nav">
          <button className="memoir-back" onClick={onBack}>← back</button>
          <button className="memoir-next" onClick={onNext}>Things I like about you →</button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Things I like ───────────────────────────────────────────────────────────
interface LikeItem {
  title: string
  body: string
  photos?: string[]
  cornerPhotos?: string[]
  video?: string
}

const CORNER_ROTS = ['-8deg', '6deg', '5deg', '-7deg']

function CornerPolaroids({ photos }: { photos: string[] }) {
  const positions = ['tl', 'tr', 'bl', 'br']
  return (
    <>
      {photos.map((src, i) => (
        <div
          key={i}
          className={`corner-polaroid corner-${positions[i]}`}
          style={{ '--rot': CORNER_ROTS[i] } as React.CSSProperties}
        >
          <img src={src} alt="" />
        </div>
      ))}
    </>
  )
}

const LIKES: LikeItem[] = [
  {
    title: 'Like #1 title here',
    body: "Describe the first thing you like about them. Be specific, be honest, be you.",
  },
  {
    title: 'Like #2 title here',
    body: "Another thing that caught your attention. Add photos or videos to any slide.",
  },
  {
    title: 'Like #3 title here',
    body: "Keep going. The more specific the better.",
  },
  {
    title: 'Like #4 title here',
    body: "You can add as many slides as you need.",
  },
  {
    title: 'Now… the real question',
    body: "You know where this is going.",
  },
]

function PolaroidVideo({ src, rot = '-3deg' }: { src: string; rot?: string }) {
  return (
    <div className="polaroid polaroid-video" style={{ '--rot': rot } as React.CSSProperties}>
      <video src={src} autoPlay loop muted playsInline />
    </div>
  )
}

const POLAROID_ROTS = ['-5deg', '3deg', '-2deg']

function Polaroids({ photos }: { photos: string[] }) {
  return (
    <div className="polaroids">
      {photos.map((src, i) => (
        <div
          key={i}
          className="polaroid"
          style={{ '--rot': POLAROID_ROTS[i % POLAROID_ROTS.length] } as React.CSSProperties}
        >
          <img src={src} alt="" />
        </div>
      ))}
    </div>
  )
}

function Likes({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const item = LIKES[idx]

  function go(n: number) {
    if (n < 0 || n >= LIKES.length) return
    setDir(n > idx ? 1 : -1)
    setIdx(n)
  }

  const num = String(idx + 1).padStart(2, '0')
  const total = String(LIKES.length).padStart(2, '0')

  return (
    <motion.div
      className="likes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="likes-topbar">
        <button className="memoir-back" onClick={onBack}>← back</button>
        <span className="likes-counter">{num} / {total}</span>
      </div>

      <div className="likes-stage">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            className="likes-slide"
            variants={{
              enter: (d: number) => ({ opacity: 0, y: d > 0 ? 60 : -60 }),
              show:  { opacity: 1, y: 0 },
              exit:  (d: number) => ({ opacity: 0, y: d > 0 ? -40 : 40 }),
            }}
            initial="enter"
            animate="show"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="likes-label">The List</p>
            <h2 className="likes-title">{item.title}</h2>
            <p className="likes-body">{item.body}</p>

            {item.photos && <Polaroids photos={item.photos} />}
            {item.video && <PolaroidVideo src={item.video} />}
          </motion.div>
        </AnimatePresence>

        {item.cornerPhotos && <CornerPolaroids photos={item.cornerPhotos} />}
      </div>

      <div className="likes-nav">
        <button className="likes-arrow" onClick={() => go(idx - 1)} disabled={idx === 0}>←</button>
        <div className="likes-track">
          {LIKES.map((_, i) => (
            <button key={i} className={`likes-pip${i === idx ? ' on' : ''}`} onClick={() => go(i)} />
          ))}
        </div>
        <button className="likes-arrow" onClick={() => go(idx + 1)} disabled={idx === LIKES.length - 1}>→</button>
      </div>
    </motion.div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<Phase>('lines')
  const [idx, setIdx]     = useState(0)
  const [dir, setDir]     = useState(1)

  function go(next: number) {
    if (next < 0) return
    if (next >= LINES.length) { setPhase('memoir'); return }
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {phase === 'likes' ? (
          <Likes key="likes" onBack={() => setPhase('memoir')} />
        ) : phase === 'memoir' ? (
          <Memoir
            key="memoir"
            onNext={() => setPhase('likes')}
            onBack={() => { setPhase('lines'); setIdx(LINES.length - 1) }}
          />
        ) : (
          <motion.div key="lines" className="lines-scene" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.p
                key={idx}
                custom={dir}
                className={`line ${LINES[idx].size}`}
                variants={{
                  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 48 : -48 }),
                  show:  { opacity: 1, y: 0 },
                  exit:  (d: number) => ({ opacity: 0, y: d > 0 ? -32 : 32 }),
                }}
                initial="enter"
                animate="show"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {render(LINES[idx].content)}
              </motion.p>
            </AnimatePresence>

            <div className="nav">
              <button className="nav-btn" onClick={() => go(idx - 1)} disabled={idx === 0}>←</button>
              <div className="dots">
                {LINES.map((_, i) => (
                  <span key={i} className={`dot${i === idx ? ' on' : ''}`} />
                ))}
              </div>
              <button className="nav-btn" onClick={() => go(idx + 1)}>→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
