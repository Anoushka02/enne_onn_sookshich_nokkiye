export default function RoastResult({
  result,
  error,
}) {
  const roast =
    error ||
    result?.roast ||
    'Capture a face to begin the questionable analysis.'

  return (
    <section className="card roast-card">

      <div className="card-body p-4 p-md-5">

        <p className="eyebrow">
          🤖 AI ROAST
        </p>

        <blockquote>
          “{roast}”
        </blockquote>


        {result?.confidence && (

          <span className="confidence">
            Unreliable confidence:{' '}
            {result.confidence}%
          </span>

        )}


        <p className="disclaimer mb-0 mt-3">
          For entertainment only. This is
          comedy, not an accurate analysis
          of you.
        </p>

      </div>

    </section>
  )
}
