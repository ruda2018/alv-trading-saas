import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogOut, Signal, Activity, DollarSign, Clock } from 'lucide-react'

const API = 'https://alv-trading-api.onrender.com'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [signals, setSignals] = useState([])
  const [connected, setConnected] = useState(false)
  const wsRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/app'); return }
    setUser({ email: localStorage.getItem('email'), id: localStorage.getItem('user_id') })

    const ws = new WebSocket(`wss://alv-trading-api.onrender.com/ws?token=${token}`)
    wsRef.current = ws
    ws.onopen = () => setConnected(true)
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data)
        if (msg.type === 'signal') setSignals(prev => [msg, ...prev].slice(0, 50))
      } catch {}
    }
    ws.onclose = () => setConnected(false)
    return () => ws.close()
  }, [])

  async function logout() {
    localStorage.clear()
    navigate('/app')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a', padding: 24 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: 900, margin: '0 auto 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '16px 24px',
          background: '#131926', borderRadius: 12, border: '1px solid #1e293b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/logo.png" alt="ALV" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>ALV Trading</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: connected ? '#10b981' : '#ef4444' }} />
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{connected ? 'Conectado' : 'Desconectado'}</span>
          </div>
          <span style={{ fontSize: 13, color: '#64748b' }}>{user?.email}</span>
          <button onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8, border: '1px solid #1e293b', background: 'transparent', color: '#94a3b8', fontSize: 12, cursor: 'pointer' }}
          ><LogOut size={14} /> Sair</button>
        </div>
      </motion.div>

      {/* Stats */}
      <div style={{ maxWidth: 900, margin: '0 auto 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        {[
          { icon: <Signal size={18} />, label: 'Sinais Hoje', value: signals.length.toString() },
          { icon: <Clock size={18} />, label: 'Status', value: connected ? 'Online' : 'Offline' },
          { icon: <Activity size={18} />, label: 'Confiança Média', value: signals.length > 0 ? Math.round(signals.reduce((a, s) => a + (s.confidence || 0), 0) / signals.length) + '%' : '---' },
          { icon: <DollarSign size={18} />, label: 'Estratégia', value: 'Scalping' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ padding: '16px 20px', background: '#131926', borderRadius: 12, border: '1px solid #1e293b' }}
          >
            <div style={{ color: '#10b981', marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{stat.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Signals Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ maxWidth: 900, margin: '0 auto', background: '#131926', borderRadius: 12, border: '1px solid #1e293b', overflow: 'hidden' }}
      >
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', fontWeight: 600, fontSize: 15 }}>Sinais em Tempo Real</div>
        {signals.length === 0 ? (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: '#64748b', fontSize: 14 }}>
            <Signal size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p>Aguardando sinais...</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>O scheduler forex roda Seg 09:00 até Sex 14:00 BRT</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {['Par', 'Direção', 'Entry', 'SL', 'TP1', 'Confiança', 'Hora'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {signals.map((s, i) => (
                  <motion.tr key={s.id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ borderBottom: '1px solid rgba(30,41,59,0.5)' }}
                  >
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.symbol}</td>
                    <td style={{ padding: '12px 16px', color: s.direction === 'BUY' ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                      {s.direction === 'BUY' ? '▲ COMPRA' : '▼ VENDA'}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{s.entry}</td>
                    <td style={{ padding: '12px 16px', color: '#ef4444', fontFamily: 'monospace' }}>{s.stopLoss}</td>
                    <td style={{ padding: '12px 16px', color: '#10b981', fontFamily: 'monospace' }}>{s.takeProfit1}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                        background: s.confidence >= 80 ? 'rgba(16,185,129,0.15)' : 'rgba(250,204,21,0.15)',
                        color: s.confidence >= 80 ? '#10b981' : '#eab308',
                      }}>{s.confidence}%</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748b', fontSize: 12 }}>
                      {s.created_at ? new Date(s.created_at * 1000).toLocaleTimeString('pt-BR') : '---'}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
