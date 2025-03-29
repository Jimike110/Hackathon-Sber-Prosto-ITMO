import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Typography, message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import { isApiError } from "@/app/lib/api";

const { Title, Text } = Typography;

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Simulated authorization check.
  // In your real implementation, replace this with an API call.
  const checkAuthorization = async (): Promise<boolean> => {
    try {
      // Simulate a delay and API response.
      await new Promise((resolve) => setTimeout(resolve, 500));
      // For example, return true if the scan result contains a specific keyword.
      // Replace the condition below with your real API call logic.
      return scanResult?.includes("AUTHORIZED") || false;
    } catch (error) {
      if (isApiError(error)) {
        console.log("API Error: ", error.message);
      }
      throw error;
    }
  };

  const startScanner = () => {
    if (scannerRef.current) return; // Already initialized

    const config = {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
    };

    scannerRef.current = new Html5QrcodeScanner("qr-reader", config, true);
    setIsScanning(true);

    scannerRef.current.render(
      async (decodedText: string) => {
        setScanResult(decodedText);
        message.success("QR Code Scanned!");
        // When a QR code is scanned, check its authorization.
        try {
          const authResult = await checkAuthorization();
          setIsAuthorized(authResult);
          if (authResult) {
            message.success("Authorized!");
          } else {
            message.error("Not authorized!");
          }
        } catch (error) {
          setIsAuthorized(false);
          message.error("Authorization error.");
        }
        // Optionally, stop scanning after a successful scan.
        stopScanner();
      },
      (errorMessage: string) => {
        // Ignore errors about no QR code found in a frame.
        if (!errorMessage.includes("No MultiFormat Readers")) {
          setCameraError(errorMessage);
        }
      }
    );
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .clear()
        .then(() => {
          scannerRef.current = null;
          setIsScanning(false);
        })
        .catch((error) => {
          console.error("Failed to clear scanner", error);
          setCameraError("Failed to stop scanner");
        });
    }
  };

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScanAgain = () => {
    // Clear previous scan result and authorization status
    setScanResult(null);
    setIsAuthorized(null);
    setCameraError(null);
    startScanner();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" align="middle" style={{ marginBottom: "24px" }}>
        <Col>
          <Title level={3}>Scan QR Code</Title>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col span={24}>
          <div
            id="qr-reader"
            style={{
              width: "100%",
              maxWidth: "300px",
              margin: "auto",
            }}
          ></div>
        </Col>
      </Row>

      {/* Show authorization only when a scan result exists */}
      {scanResult && (
        <Row justify="center" align="middle" style={{ marginBottom: "16px" }}>
          <Col>
            {isAuthorized === null ? null : isAuthorized ? (
              <Text strong>AUTHORIZED</Text>
            ) : (
              <Text type="danger">UNAUTHORIZED</Text>
            )}
          </Col>
        </Row>
      )}

      {cameraError && (
        <Row justify="center" align="middle" style={{ marginBottom: "16px" }}>
          <Col>
            <Text type="danger">{cameraError}</Text>
          </Col>
        </Row>
      )}

      <Row justify="center" style={{ marginBottom: "16px" }}>
        <Col>
          <Button type="primary" onClick={handleScanAgain} disabled={isScanning}>
            {scanResult ? "Scan Again" : "Scan"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default QRScanner;
