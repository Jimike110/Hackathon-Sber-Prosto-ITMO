import { useState, useRef, useEffect } from 'react';
import '../styles/ScreenShare.css';

const ScreenShare = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [error, setError] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [plateNumber, setPlateNumber] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    const videoElement = videoRef.current;
    const controller = abortControllerRef.current;

    const setupVideo = async () => {
      if (mediaStream && videoElement) {
        try {
          videoElement.srcObject = mediaStream;
          const playPromise = videoElement.play();
          if (controller.signal.aborted) return;
          await playPromise;
        } catch (error) {
          if (error.name !== 'AbortError') {
            setError('Error playing video: ' + error.message);
          }
        }
      }
    };

    setupVideo();

    return () => {
      controller.abort();
      abortControllerRef.current = new AbortController();
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, [mediaStream]);

  useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  useEffect(() => {
    let isProcessing = false;

    const processFrames = async () => {
      while (isSharing) {
        if (isProcessing) {
          await new Promise((resolve) => setTimeout(resolve, 10)); // Prevent CPU overload
          continue;
        }

        isProcessing = true;
        await captureAndSendFrame();
        isProcessing = false;

        await new Promise((resolve) => setTimeout(resolve, 100)); // Maintain interval timing
      }
    };

    if (isSharing) {
      processFrames();
      setIsSharing(true);
    }

    return () => setIsSharing(false);
  }, [isSharing]);

  const captureAndSendFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("frame", blob, "screenshot.jpg");    

      try {
        const response = await fetch("http://localhost:5000/process-frame", {
          method: "POST",
          body: formData,
          headers: { "Connection": "keep-alive" },
        });

        const data = await response.json();
        setPlateNumber(data.plate);
        setFileSize(data.fileSize)
      } catch (error) {
        console.error("Error sending frame:", error);
      }

      
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    }, "image/jpeg", 0.7);
  };

  const startScreenShare = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'window' },
        audio: false,
      });

      const onTrackEnded = () => {
        stopScreenShare();
        stream.getTracks().forEach(track => track.removeEventListener('ended', onTrackEnded));
      };

      stream.getTracks().forEach(track => {
        track.addEventListener('ended', onTrackEnded);
      });

      setMediaStream(stream);
      setIsSharing(true);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setIsSharing(false);
      }
    }
  };

  const stopScreenShare = () => {
    abortControllerRef.current.abort();
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setMediaStream(null);
    setIsSharing(false);
    setError(null);
    setPlateNumber(null);
    setFileSize(null);
  };

  return (
    <div className="container">
      <h1>Screen Share Demo</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {!isSharing ? (
        <button className="start-button" onClick={startScreenShare}>
          Start Screen Sharing
        </button>
      ) : (
        <button className="stop-button" onClick={stopScreenShare}>
          Stop Sharing
        </button>
      )}

      {isSharing && (
        <div className="video-container">
          <video ref={videoRef} playsInline muted autoPlay className="video-element" />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className="sharing-indicator">● Recording</div>
        </div>
      )}

      {(plateNumber && isSharing && fileSize) && (
        <div className="plate-result">
          Detected Plate: <strong>{plateNumber}</strong><br />
          File Size: <strong>{fileSize}</strong>
        </div>
      )}
    </div>
  );
};

export default ScreenShare;
