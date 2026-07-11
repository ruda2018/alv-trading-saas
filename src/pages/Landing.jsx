import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, TrendingUp, Shield, Zap, BarChart3, Monitor, Cpu } from 'lucide-react'
import Navbar from '../components/Navbar'
import Particles from '../components/Particles'
import Reveal from '../components/Reveal'

function GlassCard({ children, style }) {
  return (
    <div style={{
      background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, ...style,
    }}>
      {children}
    </div>
  )
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <GlassCard style={{ padding: 32, transition: 'transform 0.3s, border-color 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = '' }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: 'var(--color-primary)' }}>
          {icon}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{desc}</p>
      </GlassCard>
    </Reveal>
  )
}

function StepCard({ num, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <GlassCard style={{ padding: 24, textAlign: 'center', transition: 'transform 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = '' }}
      >
        <motion.div
          whileHover={{ scale: 1.1, background: 'var(--color-primary)', color: '#060a12' }}
          style={{
            width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 18, border: '2px solid var(--color-primary)', color: 'var(--color-primary)',
            margin: '0 auto 16px',
          }}
        >{num}</motion.div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{desc}</p>
      </GlassCard>
    </Reveal>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div onClick={() => setOpen(!open)}
        style={{ padding: '16px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#e2e8f0' }}
      >
        <span style={{ fontSize: 15 }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} style={{ color: '#64748b' }} />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, paddingBottom: 16 }}>{a}</p>
      </motion.div>
    </div>
  )
}

const faqs = [
  { q: 'Preciso ter experiência em trading?', a: 'Não. O sistema foi feito para operar automaticamente. Você só precisa ter uma conta MT5 (demo ou real) e deixar o agente rodando em VPS.' },
  { q: 'O teste grátis realmente não cobra nada?', a: 'Sim, 5 dias totalmente grátis. Você testa com conta demo, vê os sinais chegando e as ordens sendo executadas. Só paga se quiser continuar.' },
  { q: 'Quanto preciso depositar na corretora?', a: 'Se você já tem conta em outra corretora, precisa ter no mínimo US$100 nela. Se abrir conta na nossa corretora indicada, precisa de apenas US$50.' },
  { q: 'Quais corretoras são compatíveis?', a: 'Qualquer corretora que ofereça MT5 (Headway, Exness, IC Markets etc). Se quiser depositar só US$50, use nossa corretora indicada — me chame no WhatsApp.' },
  { q: 'Preciso deixar o PC ligado 24h?', a: 'O agente roda em VPS (servidor virtual) por ~R$20/mês. O sistema fica online 24/7 sem ocupar seu computador.' },
]

export default function Landing() {
  return (
    <>
      <Particles />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />

        {/* Hero */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 16px 64px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.08) 0%, transparent 50%),radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 50%),radial-gradient(ellipse at 50% 80%, rgba(139,92,246,0.05) 0%, transparent 50%)',
            animation: 'gradientShift 20s ease-in-out infinite alternate',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px 4px 4px', borderRadius: 100, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 24 }}>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }}
                  />
                  <span style={{ fontSize: 12, color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.05em' }}>SISTEMA EM FUNCIONAMENTO</span>
                </div>

                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
                  Spreads de <span style={{ color: 'var(--color-primary)', textShadow: '0 0 40px rgba(16,185,129,0.3)' }}>3 a 7 Pips</span><br />
                  Scalping 20 a 50 Pips
                </h1>

                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: '#94a3b8', lineHeight: 1.6, maxWidth: 520, marginBottom: 32 }}>
                  IA analisa EURUSD, GBPUSD, USDJPY e AUDUSD com 9 metodologias. Você só conecta sua conta e deixa o robô operar. Stop loss, take profit e trailing stop automáticos.
                </p>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      to="/app"
                      style={{
                        padding: '14px 32px', borderRadius: 12, background: 'var(--color-primary)', color: '#060a12',
                        fontWeight: 700, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                        boxShadow: '0 0 40px rgba(16,185,129,0.15), 0 0 80px rgba(16,185,129,0.05)',
                      }}
                    >
                      Testar Grátis por 5 Dias <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                  <a href="#funciona"
                    style={{
                      padding: '14px 28px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                      color: '#cbd5e1', fontWeight: 500, fontSize: 16, transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                  >Como Funciona</a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, fontSize: 13, color: '#64748b' }}>
                  <div style={{ display: 'flex' }}>
                    {['R', 'P', 'M'].map((l, i) => (
                      <div key={i} style={{
                        width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, marginLeft: i > 0 ? -8 : 0,
                        background: i === 0 ? 'var(--color-primary)' : i === 1 ? '#3b82f6' : '#a855f7', color: '#fff',
                      }}>{l}</div>
                    ))}
                  </div>
                  <span><strong style={{ color: 'var(--color-primary)' }}>+12</strong> traders na lista de espera</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'none' }}
                className="hero-terminal"
              >
                <GlassCard style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    {['#ef4444', '#eab308', '#10b981'].map(c => (
                      <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.8 }} />
                    ))}
                    <span style={{ fontSize: 11, color: '#64748b', marginLeft: 8, fontFamily: 'var(--font-mono)' }}>terminal — alv-agent</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8 }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                      <span style={{ color: '#64748b' }}>$ </span><span style={{ color: 'var(--color-primary)' }}>./alv-agent</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                      <span style={{ color: '#94a3b8' }}>[MT5] Conectado — Conta: 4934095</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                      <span style={{ color: '#94a3b8' }}>[WS] Conectado ao servidor de sinais</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ color: 'var(--color-primary)', marginTop: 8 }}>
                      [SINAL] EURUSD BUY | Conf: 81%
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
                      <span style={{ color: '#94a3b8' }}>&nbsp;&nbsp;Entry: 1,08345 &nbsp; SL: 1,08290</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
                      <span style={{ color: '#94a3b8' }}>&nbsp;&nbsp;TP1: 1,08440 &nbsp; TP2: 1,08550</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} style={{ color: '#10b981', marginTop: 8 }}>
                      ✓ ORDEM EXECUTADA — Ticket: 584021
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ color: '#64748b', marginTop: 8 }}
                    >$ █</motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="funciona" style={{ padding: '96px 16px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{ color: 'var(--color-primary)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em' }}>PROCESSO</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, marginTop: 12, letterSpacing: '-0.02em' }}>Como Funciona</h2>
              <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>Do cadastro aos primeiros sinais em menos de 10 minutos</p>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              <StepCard num={1} title="Cadastre-se" desc="Crie sua conta grátis. Não precisa de cartão de crédito." delay={0} />
              <StepCard num={2} title="Conecte sua Demo" desc="Informe os dados da sua conta demo MT5." delay={1} />
              <StepCard num={3} title="Receba Sinais" desc="IA analisa o mercado 24/7 e envia ordens direto no seu MT5." delay={2} />
              <StepCard num={4} title="Só Lucre" desc="Stop loss e trailing stop automáticos. Você só acompanha." delay={3} />
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section id="recursos" style={{ padding: '96px 16px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{ color: 'var(--color-primary)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em' }}>RECURSOS</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, marginTop: 12, letterSpacing: '-0.02em' }}>IA com 9 Metodologias</h2>
              <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>Sua estratégia favorita de análise técnica, rodando 24 horas por dia</p>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              <FeatureCard icon={<TrendingUp size={24} />} title="Multi-Metodologia" desc="Wyckoff, Elliott Wave, Price Action, Smart Money, Volume Profile e mais 5 metodologias combinadas em uma única análise." delay={0} />
              <FeatureCard icon={<Zap size={24} />} title="Execução Automática" desc="Sinal gerado → ordem enviada ao MT5 → stop loss colocado → trailing ativado. Zero intervenção manual." delay={1} />
              <FeatureCard icon={<Shield size={24} />} title="Gerenciamento de Risco" desc="Limite de drawdown diário, pausa após perdas consecutivas, volume proporcional ao saldo." delay={2} />
              <FeatureCard icon={<BarChart3 size={24} />} title="4 Pares Forex" desc="EURUSD, GBPUSD, USDJPY, AUDUSD — spreads reduzidos em 3 a 7 pips e scalping de 20 a 50 pips com stops milimétricos e Trailing Stop (Stop Móvel) para sustentabilidade e consistência de cada operação." delay={0} />
              <FeatureCard icon={<Monitor size={24} />} title="Painel ao Vivo" desc="Acompanhe todos os sinais em tempo real pelo painel web. Veja entry, SL, TP e confiança." delay={1} />
              <FeatureCard icon={<Cpu size={24} />} title="Agente Local" desc="Um script Python leve que roda em VPS e conecta seu MT5 ao servidor. Instalação em 2 minutos." delay={2} />
            </div>
          </div>
        </section>

        {/* Preços */}
        <section id="precos" style={{ padding: '96px 16px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{ color: 'var(--color-primary)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em' }}>PREÇOS</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, marginTop: 12, letterSpacing: '-0.02em' }}>Invista no Seu Trading</h2>
              <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 12 }}>Teste grátis por 5 dias. Depois, R$39,90 por 30 dias.</p>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 700, margin: '0 auto' }}>
              {/* Trial */}
              <Reveal variant="scale" style={{ textAlign: 'center' }}>
                <GlassCard style={{ padding: 40 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', letterSpacing: '0.1em', marginBottom: 8 }}>TESTE GRÁTIS</div>
                  <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--color-primary)', marginBottom: 4 }}>Grátis</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>5 dias de acesso total</div>
                  <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                    {['Conta demo MT5', 'Sinais Forex (4 pares)', 'Painel ao vivo'].map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#94a3b8' }}>
                        <Check size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} /> {t}
                      </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#475569' }}>
                      <Check size={16} style={{ color: '#475569', flexShrink: 0 }} /> Suporte prioritário
                    </div>
                  </div>
                  <Link to="/app"
                    style={{ display: 'block', padding: 14, borderRadius: 12, background: 'var(--color-primary)', color: '#060a12', fontWeight: 700, fontSize: 15, textAlign: 'center', textDecoration: 'none' }}
                  >Começar Agora</Link>
                </GlassCard>
              </Reveal>

              {/* Mensal */}
              <Reveal variant="scale" delay={1} style={{ textAlign: 'center' }}>
                <GlassCard style={{ padding: 40, position: 'relative', border: '1px solid rgba(16,185,129,0.4)', transform: 'scale(1.05)' }}>
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--color-primary)', color: '#060a12', fontSize: 10, fontWeight: 700,
                    padding: '4px 16px', borderRadius: 20, letterSpacing: '0.05em',
                  }}>MAIS POPULAR</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.1em', marginBottom: 8 }}>MENSAL</div>
                  <div style={{ fontSize: 40, fontWeight: 900, marginBottom: 4 }}>R$39,<span style={{ fontSize: 24 }}>90</span></div>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>a cada 30 dias</div>
                  <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                    {['Tudo do Trial', 'Conta Real MT5', 'Suporte via WhatsApp', 'Prioridade em novas features'].map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#94a3b8' }}>
                        <Check size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} /> {t}
                      </div>
                    ))}
                  </div>
                  <motion.a href="https://wa.me/5591986043702?text=Quero%20o%20plano%20mensal%20de%20R%2439%2C90%20do%20ALV%20Trading" target="_blank"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{ display: 'block', padding: 14, borderRadius: 12, background: 'var(--color-primary)', color: '#060a12', fontWeight: 700, fontSize: 15, textAlign: 'center', boxShadow: '0 0 40px rgba(16,185,129,0.15)' }}
                  >Falar com Eduardo</motion.a>
                </GlassCard>
              </Reveal>
            </div>
            <Reveal style={{ textAlign: 'center', marginTop: 40 }}>
              <p style={{ fontSize: 14, color: '#64748b' }}>
                💡 Se já tem conta em corretora, deposite <strong style={{ color: 'var(--color-primary)' }}>US$100</strong>.
                Se usar nossa <strong style={{ color: '#f59e0b' }}>corretora indicada</strong>, precisa só de <strong style={{ color: '#f59e0b' }}>US$50</strong> na conta.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CTA Final */}
        <section style={{ padding: '96px 16px' }}>
          <Reveal variant="scale">
            <GlassCard style={{ maxWidth: 700, margin: '0 auto', padding: '48px 32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em' }}>
                Pronto para <span style={{ color: 'var(--color-primary)' }}>Automatizar</span> Seu Trading?
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>5 dias grátis. Sem compromisso. Sem cartão de crédito.</p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/app"
                    style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--color-primary)', color: '#060a12', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
                  >Testar Grátis Agora</Link>
                </motion.div>
                <motion.a href="https://wa.me/5591986043702?text=Ol%C3%A1%20Eduardo,%20quero%20saber%20mais%20sobre%20o%20ALV%20Trading" target="_blank"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{ padding: '14px 28px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontWeight: 500, fontSize: 16 }}
                >Falar no WhatsApp</motion.a>
              </div>
              <p style={{ fontSize: 12, color: '#475569', marginTop: 24 }}>🔒 Seus dados estão seguros. Não armazenamos suas credenciais MT5.</p>
            </GlassCard>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ padding: '96px 16px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ color: 'var(--color-primary)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em' }}>FAQ</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, marginTop: 12, letterSpacing: '-0.02em' }}>Dúvidas Frequentes</h2>
            </Reveal>
            <Reveal>
              {faqs.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 16px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="/logo.png" alt="ALV" style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>ALV Trading</span>
            </div>
            <p style={{ fontSize: 13, color: '#64748b' }}>© 2026 ALV Trading. Todos os direitos reservados.</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="https://wa.me/5591986043702" target="_blank" style={{ fontSize: 13, color: '#64748b', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#10b981'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
              >WhatsApp</a>
              <a href="#" style={{ fontSize: 13, color: '#64748b', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#10b981'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
              >Termos</a>
            </div>
          </div>
        </footer>

        {/* WhatsApp Float */}
        <motion.a
          href="https://wa.me/5591986043702?text=Quero%20ativar%20meu%20plano%20ALV%20Trading"
          target="_blank"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 999,
            width: 56, height: 56, borderRadius: '50%', background: '#25D366',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
          }}
        >
          <svg width={26} height={26} viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>
      </div>
    </>
  )
}
