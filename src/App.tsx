import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

type Phase = 'cover' | 'chapters' | 'list'

// ─── Cover ───────────────────────────────────────────────────────────────────
function Cover({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.div
      className="cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7 }}
      onClick={onBegin}
    >
      <div className="cover-inner">
        <p className="cover-eyebrow">a letter for</p>
        <h1 className="cover-name">Kelechi<span className="cover-dot">.</span></h1>
        <div className="cover-rule" />
        <p className="cover-sub">tap anywhere to begin</p>
      </div>
      <p className="cover-corner">№ 001</p>
    </motion.div>
  )
}

// ─── Chapters ─────────────────────────────────────────────────────────────────
interface Chapter {
  num: string
  layout: 'left' | 'right' | 'center' | 'big'
  headline: string
  body?: string
}

const CHAPTERS: Chapter[] = [
  {
    num: '01',
    layout: 'big',
    headline: "There was a woman named Kelechi",
    body: "who never entered a room quietly — not because she was loud, but because her kindness arrived before she did.",
  },
  {
    num: '02',
    layout: 'left',
    headline: "She gave without keeping score.",
    body: "Sometimes money to someone struggling, other times food, encouragement, a listening ear, or simply her time. To Kelechi, generosity was not about how much she had — it was about how much love she could leave behind.",
  },
  {
    num: '03',
    layout: 'right',
    headline: "Children ran to greet her.",
    body: "Elderly neighbors waited by their gates hoping she would stop to chat. Friends trusted her because she celebrated their happiness as if it were her own.",
  },
  {
    num: '04',
    layout: 'left',
    headline: "She never made people feel small for needing help.",
    body: "Her kindness came gently, wrapped in laughter, warmth, and sincerity. She believed love should feel safe, not heavy.",
  },
  {
    num: '05',
    layout: 'big',
    headline: '"Love grows when you give it away."',
    body: "And somehow, wherever she went, hope seemed to grow too.",
  },
  {
    num: '06',
    layout: 'center',
    headline: "Then, things began to change.",
    body: "Her business, once full of promise, started to slow. Her love life, which she had nurtured with patience and sincerity, began to feel distant.",
  },
  {
    num: '07',
    layout: 'left',
    headline: "For the first time, she felt it.",
    body: "Giving and giving… but not receiving enough back to stay steady. Her laughter didn't disappear, but it became quieter.",
  },
  {
    num: '08',
    layout: 'right',
    headline: "Some nights she sat alone, wondering.",
    body: '"Did I give too much? Did I forget myself while loving everyone else?" But even in that heaviness, something inside her refused to break completely.',
  },
  {
    num: '09',
    layout: 'big',
    headline: "Maybe life wasn't punishing her.",
    body: "Maybe it was teaching her that even cheerful givers need space to receive, to rest, and to rebuild.",
  },
  {
    num: '10',
    layout: 'center',
    headline: "Kelechi, you haven't failed.",
    body: "You're just tired from giving more than you've been receiving.",
  },
  {
    num: '11',
    layout: 'left',
    headline: "Your business slowdown doesn't erase your ability.",
    body: "It just means you need a reset. In love, don't overextend yourself to keep someone close. If it's real, it won't require you to shrink or over-give to be valued.",
  },
  {
    num: '12',
    layout: 'right',
    headline: "Include yourself in the care you give others.",
    body: "Rest without guilt. Say no when you're drained. Protect your peace like you protect everyone else's.",
  },
  {
    num: '13',
    layout: 'big',
    headline: "You don't need to stop being loving.",
    body: "You just need to stop abandoning yourself while doing it.",
  },
]

function Chapters({ onNext }: { onNext: () => void }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  function advance() {
    if (idx < CHAPTERS.length - 1) {
      setDir(1)
      setIdx(i => i + 1)
    } else {
      onNext()
    }
  }

  function back() {
    if (idx > 0) {
      setDir(-1)
      setIdx(i => i - 1)
    }
  }

  const ch = CHAPTERS[idx]

  return (
    <motion.div
      className="chapters"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={advance}
    >
      {/* Back tap zone */}
      {idx > 0 && (
        <div
          className="ch-back-zone"
          onClick={(e) => { e.stopPropagation(); back() }}
        />
      )}

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          className={`ch-page ch-${ch.layout}`}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
            show: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
          }}
          initial="enter"
          animate="show"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ch-num">{ch.num}</span>
          <div className="ch-content">
            <h2 className="ch-headline">{ch.headline}</h2>
            {ch.body && <p className="ch-body">{ch.body}</p>}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="ch-progress">
        <div
          className="ch-progress-fill"
          style={{ width: `${((idx + 1) / CHAPTERS.length) * 100}%` }}
        />
      </div>

      <p className="ch-hint">{idx < CHAPTERS.length - 1 ? 'tap to continue' : 'tap to see the list'}</p>
    </motion.div>
  )
}

// ─── The List ─────────────────────────────────────────────────────────────────
interface ListItem {
  num: string
  title: string
  body: string
  photos?: string[]
  video?: string
  accent?: string
}

const LIST: ListItem[] = [
  {
    num: '01',
    title: 'List item one',
    body: 'Add the first thing you like about them here. The more specific the better.',
    accent: 'note',
  },
  {
    num: '02',
    title: 'List item two',
    body: 'Add photos to any item by dropping them in public/images/ and referencing them in the photos array.',
  },
  {
    num: '03',
    title: 'List item three',
    body: 'You can also add a video to any slide using the video field.',
  },
  {
    num: '04',
    title: 'List item four',
    body: 'Keep going — add as many as you need.',
  },
  {
    num: '05',
    title: 'And the question…',
    body: 'You know where this is going.',
    accent: 'final',
  },
]

function ListScene({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const item = LIST[idx]

  function go(n: number) {
    if (n < 0 || n >= LIST.length) return
    setDir(n > idx ? 1 : -1)
    setIdx(n)
  }

  return (
    <motion.div
      className="list-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top bar */}
      <div className="ls-topbar">
        <button className="ls-back-btn" onClick={onBack}>← back</button>
        <span className="ls-counter">{idx + 1} of {LIST.length}</span>
      </div>

      {/* Stage */}
      <div className="ls-stage">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            className={`ls-item${item.accent === 'final' ? ' ls-final' : ''}`}
            variants={{
              enter: (d: number) => ({ opacity: 0, y: d > 0 ? 48 : -48 }),
              show: { opacity: 1, y: 0 },
              exit: (d: number) => ({ opacity: 0, y: d > 0 ? -32 : 32 }),
            }}
            initial="enter"
            animate="show"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ls-num-wrap">
              <span className="ls-ordinal">{item.num}</span>
              <div className="ls-rule" />
            </div>
            <h2 className="ls-title">{item.title}</h2>
            <p className="ls-body">{item.body}</p>

            {item.photos && (
              <div className="ls-photos">
                {item.photos.map((src, i) => (
                  <img key={i} src={src} className="ls-photo" alt="" />
                ))}
              </div>
            )}

            {item.video && (
              <video
                className="ls-video"
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="ls-nav">
        <button
          className="ls-arrow"
          onClick={() => go(idx - 1)}
          disabled={idx === 0}
        >←</button>

        <div className="ls-pips">
          {LIST.map((_, i) => (
            <button
              key={i}
              className={`ls-pip${i === idx ? ' on' : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <button
          className="ls-arrow"
          onClick={() => go(idx + 1)}
          disabled={idx === LIST.length - 1}
        >→</button>
      </div>
    </motion.div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<Phase>('cover')

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {phase === 'cover' && (
          <Cover key="cover" onBegin={() => setPhase('chapters')} />
        )}
        {phase === 'chapters' && (
          <Chapters key="chapters" onNext={() => setPhase('list')} />
        )}
        {phase === 'list' && (
          <ListScene key="list" onBack={() => setPhase('chapters')} />
        )}
      </AnimatePresence>
    </div>
  )
}
