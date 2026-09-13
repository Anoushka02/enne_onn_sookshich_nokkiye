export default function ASCIIViewer({
  ascii,
}) {
  const placeholder = `> WAITING FOR VISUAL DATA...
> CAPTURE A FRAME TO REVEAL YOUR
> LOW-RESOLUTION DESTINY.`

  return (
    <section className="card panel-card h-100">

      <div className="card-body p-4">

        <p className="eyebrow">
          PIXEL PROPHECY
        </p>

        <h2>
          Your ASCII face
        </h2>

        <div className="ascii-shell mt-3">

          <span className="terminal-dots">
            ● ● ●
          </span>

          <pre className="ascii-art">
            {ascii || placeholder}
          </pre>

        </div>

      </div>

    </section>
  )
}
