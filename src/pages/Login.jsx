import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Particles from '../components/Particles'

const API = 'https://alv-trading-api.onrender.com'

export default function Login() {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
      if (!r.ok) { setError(d.detail || 'Erro ao entrar'); return }
      localStorage.setItem('token', d.access_token)
      localStorage.setItem('user_id', d.user_id)
      localStorage.setItem('email', d.email)
      window.location.href = '/app/dashboard'
    } catch { setError('Erro de conexão') }
    finally { setLoading(false) }
  }

  async function doRegister(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const r = await fetch(API + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass, name }),
      })
      const d = await r.json()
      if (!r.ok) { setError(d.detail || d.error || 'Erro ao cadastrar'); return }
      setSuccess('Conta criada! Faça login.')
      setTimeout(() => { setTab('login'); setSuccess('') }, 1500)
    } catch { setError('Erro de conexão') }
    finally { setLoading(false) }
  }

  return (
    <>
      <Particles />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 420 }}
        >
          <div style={{
            background: '#131926', borderRadius: 16, padding: 32,
            border: '1px solid #1e293b',
          }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
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
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  style={{
                    position: 'absolute', width: 180, height: 180, top: -50, left: -50,
                    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                  }}
                />
                <img src="/logo.png" alt="ALV Trading" style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover', position: 'relative', zIndex: 1 }} />
              </div>
              <h1 style={{ fontSize: 24, color: '#10b981', fontWeight: 700 }}>ALV Trading</h1>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Plataforma de Sinais Automáticos</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {['login', 'register'].map(t => (
                <button key={t} onClick={() => { setTab(t); setError(''); setSuccess('') }}
                  style={{
                    flex: 1, padding: 10, borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
                    transition: 'all 0.2s', border: 'none',
                    background: tab === t ? '#10b981' : '#1e293b',
                    color: tab === t ? '#0a0f1a' : '#64748b',
                  }}
                >{t === 'login' ? 'Entrar' : 'Cadastrar'}</button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === 'login' ? (
                <motion.form key="login" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} onSubmit={doLogin}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #1e293b', background: '#0a0f1a', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#10b981'}
                      onBlur={e => e.target.style.borderColor = '#1e293b'}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Senha</label>
                    <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #1e293b', background: '#0a0f1a', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#10b981'}
                      onBlur={e => e.target.style.borderColor = '#1e293b'}
                    />
                  </div>
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 600, background: '#10b981', color: '#0a0f1a', opacity: loading ? 0.7 : 1 }}
                  >{loading ? 'Entrando...' : 'Entrar'}</motion.button>
                  {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 6 }}>{error}</p>}
                </motion.form>
              ) : (
                <motion.form key="register" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} onSubmit={doRegister}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #1e293b', background: '#0a0f1a', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#10b981'}
                      onBlur={e => e.target.style.borderColor = '#1e293b'}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Nome</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #1e293b', background: '#0a0f1a', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#10b981'}
                      onBlur={e => e.target.style.borderColor = '#1e293b'}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Senha</label>
                    <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #1e293b', background: '#0a0f1a', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#10b981'}
                      onBlur={e => e.target.style.borderColor = '#1e293b'}
                    />
                  </div>
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 600, background: '#10b981', color: '#0a0f1a', opacity: loading ? 0.7 : 1 }}
                  >{loading ? 'Criando...' : 'Criar Conta'}</motion.button>
                  {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 6 }}>{error}</p>}
                  {success && <p style={{ color: '#10b981', fontSize: 13, marginTop: 6 }}>{success}</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  )
}
