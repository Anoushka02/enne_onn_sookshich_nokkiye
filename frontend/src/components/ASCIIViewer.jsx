export default function ASCIIViewer({ ascii }) {
  return <section className="card panel-card h-100"><div className="card-body p-4">
    <p className="eyebrow">PIXEL PROPHECY</p><h2>Your ASCII face</h2>
    <div className="ascii-shell mt-3"><span className="terminal-dots">● ● ●</span><pre className="ascii-art">{ascii || '> WAITING FOR VISUAL DATA...\n> CAPTURE A FRAME TO REVEAL YOUR\n> LOW-RESOLUTION DESTINY.'}</pre></div>
  </div></section>
}
