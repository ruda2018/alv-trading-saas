import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from '../components/Particles'

const API = 'https://alv-trading-api.onrender.com'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function doLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const r = await fetch(API + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      })
      const d = await r.json()
      if (!r.ok) { setError(d.detail || 'Email ou senha incorretos'); return }
      localStorage.setItem('token', d.access_token)
      localStorage.setItem('user_id', d.user_id)
      localStorage.setItem('email', d.email)
      if (d.trial_ends_at) localStorage.setItem('trial_ends_at', d.trial_ends_at)
      if (d.plan) localStorage.setItem('plan', d.plan)
      navigate('/app/dashboard')
    } catch {
      setError('Servidor offline. Tente novamente em alguns instantes.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Particles />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 400 }}
        >
          <div style={{
            background: '#131926', borderRadius: 16, padding: 32,
            border: '1px solid #1e293b',
          }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute', width: 140, height: 140, top: -30, left: -30,
                      background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
                      borderRadius: '50%',
                    }}
                  />
                  <img src="/logo.png" alt="ALV Trading" style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover', position: 'relative', zIndex: 1 }} />
                </div>
              </Link>
              <h1 style={{ fontSize: 24, color: '#10b981', fontWeight: 700 }}>ALV Trading</h1>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Acesse sua conta</p>
            </div>

            {/* Login Form */}
            <form onSubmit={doLogin}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #1e293b', background: '#0a0f1a', color: '#e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#1e293b'}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Senha</label>
                <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #1e293b', background: '#0a0f1a', color: '#e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#1e293b'}
                />
              </div>
              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 600, background: '#10b981', color: '#0a0f1a', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
              >{loading ? 'Entrando...' : 'Entrar'}</motion.button>
              {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 10, textAlign: 'center' }}>{error}</p>}
            </form>

            {/* Footer */}
            <div style={{ marginTop: 24, textAlign: 'center', fontSize: 12, color: '#475569' }}>
              <p>Sua conta foi criada pelo <strong style={{ color: '#10b981' }}>Eduardo</strong>.</p>
              <p style={{ marginTop: 4 }}>Dúvidas? <a href="https://wa.me/5591986043702" target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none' }}>Fale no WhatsApp</a></p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>← Voltar para o início</Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}
