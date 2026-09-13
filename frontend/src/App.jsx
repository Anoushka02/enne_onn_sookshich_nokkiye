import { useState } from 'react'

import WebcamCapture from './components/WebcamCapture'
import ASCIIViewer from './components/ASCIIViewer'
import FaceMetrics from './components/FaceMetrics'
import RoastResult from './components/RoastResult'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function App() {
  const [result, setResult] = useState(null)
  const [capturedImage, setCapturedImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCapture(blob) {
    setLoading(true)
    setError('')
    setResult(null)

    const imageUrl = URL.createObjectURL(blob)
    setCapturedImage(imageUrl)

    const formData = new FormData()

    formData.append(
      'image',
      blob,
      'webcam-capture.jpg'
    )

    try {
      const response = await fetch(
        `${API_URL}/analyze`,
        {
          method: 'POST',
          body: formData,
        }
      )

      let payload

      try {
        payload = await response.json()
      } catch {
        throw new Error(
          'The backend returned an invalid response.'
        )
      }

      if (!response.ok) {
        throw new Error(
          payload.error ||
            'The roast engine is currently questioning its existence.'
        )
      }

      setResult(payload)

      if (payload.error || payload.warning) {
        setError(
          payload.error ||
            payload.warning
        )
      }
    } catch (requestError) {
      console.error(requestError)

      if (
        requestError.message ===
        'Failed to fetch'
      ) {
        setError(
          'Cannot connect to the roast engine. Make sure the Flask backend is running.'
        )
      } else {
        setError(requestError.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="container py-4 py-md-5">

        {/* HEADER */}
        <header className="hero mb-4 mb-md-5">

          <div className="brand-mark">
            <span>◈</span>

            ANALYSIS TERMINAL

            <i>v1.0</i>
          </div>

          <div className="hero-copy">

            <div>

              <p className="eyebrow">
                UNNECESSARILY ADVANCED JUDGMENT SYSTEM
              </p>

              <h1>
                ENNE ONN
                <br />
                <em>SHERIKKUM NOOKIKKE</em>
              </h1>

              <p className="hero-text">
                One camera frame. A suspiciously
                confident machine. Zero mercy.
              </p>

            </div>

            <div className="status-pill">

              <b></b>

              SYSTEM READY

              <br />

              <small>
                CAMERA → ASCII → CHAOS
              </small>

            </div>

          </div>

        </header>


        {/* CAMERA + ASCII */}
        <div className="row g-4">

          <div className="col-lg-6">

            <WebcamCapture
              onCapture={handleCapture}
              disabled={loading}
            />

          </div>


          <div className="col-lg-6">

            <ASCIIViewer
              ascii={result?.ascii}
            />

          </div>

        </div>


        {/* CAPTURED IMAGE */}
        {capturedImage && (

          <section className="card panel-card captured-card mt-4">

            <div className="card-body p-4">

              <p className="eyebrow">
                EVIDENCE
              </p>

              <h2>
                Your captured face
              </h2>

              <img
                src={capturedImage}
                className="captured-image mt-3"
                alt="Captured webcam frame"
              />

            </div>

          </section>

        )}


        {/* METRICS + ROAST */}
        <div className="row g-4 mt-1">

          <div className="col-lg-5">

            <FaceMetrics
              result={result}
            />

          </div>


          <div className="col-lg-7">

            <RoastResult
              result={result}
              error={error}
            />

          </div>

        </div>


        {/* FOOTER */}
        <footer className="text-center mt-5">

          <small>
            ASCII Face Roast AI · Built for
            entertainment · Accuracy not guaranteed
          </small>

        </footer>

      </div>
    </main>
  )
}
