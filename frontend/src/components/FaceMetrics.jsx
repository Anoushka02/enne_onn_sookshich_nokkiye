function Metric({
  label,
  value,
}) {
  return (
    <div className="metric">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  )
}


export default function FaceMetrics({
  result,
}) {
  const face = result?.face

  return (
    <section className="card panel-card">

      <div className="card-body p-4">

        <p className="eyebrow">
          TOTALLY NOT SCIENCE
        </p>

        <h2>
          Face metrics
        </h2>


        <div className="metrics mt-3">

          <Metric
            label="Face detected"
            value={
              face
                ? face.faceDetected
                  ? 'YES'
                  : 'NO'
                : '—'
            }
          />


          <Metric
            label="Eyes detected"
            value={
              face
                ? face.eyesDetected
                : '—'
            }
          />


          <Metric
            label="Face position"
            value={
              face?.facePosition
                ? face.facePosition.toUpperCase()
                : '—'
            }
          />

        </div>

      </div>

    </section>
  )
}
