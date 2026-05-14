import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

type Page = 'cover' | 'letter' | 'finale'

// ─── Phrases ──────────────────────────────────────────────────────────────────
const PHRASES = [
  "Kelechi, you never enter a room quietly — not because you're loud, but because your kindness arrives before you do. You give without keeping score. To you, generosity was never about how much you had — it was about how much love you could leave behind.",
  "Children run to greet you because you remember their names. Elderly neighbors wait by their gates hoping you'll stop to chat. You never make people feel small for needing help. You believe love should feel safe, not heavy.",
  "\"Love grows when you give it away.\" You've always lived by that. And wherever you go, hope seems to grow too.",
  "But as time passed, your business started to slow and your love life felt distant. For the first time, you were giving and giving… but not receiving enough back to stay steady. Your laughter didn't disappear — but it became quieter.",
  "Some nights you sat alone wondering: \"Did I give too much? Did I forget myself while loving everyone else?\" But something inside you refused to break completely. Maybe life wasn't punishing you — maybe it was teaching you that even the most cheerful givers need space to receive, to rest, and to rebuild.",
  "You haven't failed, Kelechi. You're just tired from giving more than you've been receiving. Rest without guilt. Say no when you're drained. You don't need to stop being loving — you just need to stop abandoning yourself while doing it.",
  "I'm intentional about you. Truly and consistently. I see your strength, your kindness, and even the moments you try to hide your tiredness. I'm not here for convenience — I'm here for you, for your growth, your peace, and everything you're becoming. You don't have to earn my love. You already have it.",
]

// ─── Cover ────────────────────────────────────────────────────────────────────
function Cover({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.div
      className="page cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="cover-photo-half">
        <img src="/9479fb34-ddcc-4d88-95f6-7a8082e945a6.JPG" alt="" />
      </div>
      <div className="cover-text-half">
        <p className="cover-for">for</p>
        <h1 className="cover-name">Kelechi.</h1>
        <div className="cover-line" />
        <p className="cover-sub">
          A letter written just for her.
          <br />Something she deserves to read.
        </p>
        <button className="cover-btn" onClick={onBegin}>
          begin reading →
        </button>
      </div>
    </motion.div>
  )
}

// ─── Letter ───────────────────────────────────────────────────────────────────
function Letter({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      if (idx < PHRASES.length - 1) setIdx(i => i + 1)
      else onDone()
    }, 10000)
    return () => clearTimeout(t)
  }, [idx, onDone])

  function tap() {
    if (idx < PHRASES.length - 1) setIdx(i => i + 1)
    else onDone()
  }

  return (
    <motion.div
      className="page letter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onClick={tap}
    >
      <div className="letter-stage">
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            className="phrase"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {PHRASES[idx]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="letter-footer">
        <div className="letter-dots">
          {PHRASES.map((_, i) => (
            <div key={i} className={`dot${i === idx ? ' active' : i < idx ? ' done' : ''}`} />
          ))}
        </div>
        <p className="letter-hint">tap to skip · {idx + 1} / {PHRASES.length}</p>
      </div>
    </motion.div>
  )
}

// ─── Finale ───────────────────────────────────────────────────────────────────
function Finale({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      className="page finale"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="finale-photos">
        <img src="/IMG_0077.JPG" alt="" className="finale-img main" />
      </div>
      <div className="finale-overlay" />
      <div className="finale-text">
        <p className="finale-eyebrow">I choose you with care, not confusion.</p>
        <h2 className="finale-q">
          Always,<br />Nobert.
        </h2>
        <p className="finale-sig">Nobert Marchisio Osahon</p>
      </div>
      <button className="back-btn" onClick={onBack}>← start over</button>
    </motion.div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('cover')
  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {page === 'cover'  && <Cover   key="cover"  onBegin={() => setPage('letter')} />}
        {page === 'letter' && <Letter  key="letter" onDone={() => setPage('finale')} />}
        {page === 'finale' && <Finale  key="finale" onBack={() => setPage('cover')} />}
      </AnimatePresence>
    </div>
  )
}
