import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#funciona', label: 'Como Funciona' },
  { href: '#recursos', label: 'Recursos' },
  { href: '#precos', label: 'Preços' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(6,10,18,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', width: 70, height: 70, top: -13, left: -13,
                background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
            <img src="/logo.png" alt="ALV" style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
            ALV<span style={{ color: 'var(--color-primary)' }}>Trading</span>
          </span>
        </a>

        <div style={{ display: 'none', gap: 32, alignItems: 'center' }} className="nav-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: 14, color: '#94a3b8', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#10b981'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >{l.label}</a>
          ))}
          <a href="/app"
            style={{
              padding: '8px 20px', borderRadius: 10, background: 'var(--color-primary)', color: '#060a12',
              fontWeight: 600, fontSize: 14, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.9'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >Testar Grátis</a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'flex', padding: 8, background: 'none', border: 'none', color: '#94a3b8' }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 24px' }}>
              {links.map(l => (
                <a key={l.href} href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ padding: '10px 0', color: '#94a3b8', fontSize: 14, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >{l.label}</a>
              ))}
              <a href="/app" onClick={() => setMobileOpen(false)}
                style={{
                  marginTop: 8, padding: '12px 0', borderRadius: 10, background: 'var(--color-primary)',
                  color: '#060a12', fontWeight: 600, fontSize: 14, textAlign: 'center',
                }}
              >Testar Grátis</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
