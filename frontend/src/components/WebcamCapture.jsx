import {
  useEffect,
  useRef,
  useState,
} from 'react'

export default function WebcamCapture({
  onCapture,
  disabled,
}) {
  const videoRef = useRef(null)

  const [cameraError, setCameraError] =
    useState('')

  useEffect(() => {
    let stream

    async function startCamera() {
      try {
        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          setCameraError(
            'Your browser does not support webcam access.'
          )

          return
        }

        stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
            },
            audio: false,
          })

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream
        }
      } catch (error) {
        console.error(error)

        setCameraError(
          'Please allow camera access to use ASCII Face Roast AI.'
        )
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream
          .getTracks()
          .forEach((track) =>
            track.stop()
          )
      }
    }
  }, [])

  function captureFrame() {
    const video = videoRef.current

    if (!video || !video.videoWidth) {
      setCameraError(
        'Camera is not ready yet. Please wait a moment.'
      )

      return
    }

    const canvas =
      document.createElement('canvas')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context =
      canvas.getContext('2d')

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    )

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCapture(blob)
        }
      },
      'image/jpeg',
      0.9
    )
  }

  return (
    <section className="card panel-card h-100">

      <div className="card-body p-4">

        <p className="eyebrow">
          LIVE CAMERA
        </p>

        <h2>
          Webcam preview
        </h2>

        <div className="camera-wrap mt-3">

          <span className="camera-label">
            ● LIVE INPUT
          </span>

          <span className="scan-line"></span>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />

        </div>


        {cameraError && (

          <div className="alert alert-warning mt-3 mb-0">
            {cameraError}
          </div>

        )}


        <button
          className="btn roast-button w-100 mt-3"
          onClick={captureFrame}
          disabled={
            disabled ||
            Boolean(cameraError)
          }
        >
          {disabled
            ? 'Consulting the roast engine…'
            : 'Capture & Roast Me'}
        </button>

      </div>

    </section>
  )
}
