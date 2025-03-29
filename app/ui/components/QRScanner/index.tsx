import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Typography, message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";

const { Title, Text } = Typography;

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const startScanner = () => {
    if (scannerRef.current) return; // Already initialized

    const config = {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
    };

    scannerRef.current = new Html5QrcodeScanner("qr-reader", config, true);

    scannerRef.current.render(
      (decodedText) => {
        setScanResult(decodedText);
        message.success("QR Code Scanned!");
      },
      (errorMessage) => {
        if (errorMessage.includes("No MultiFormat Readers")) return;
        setCameraError(errorMessage);
      }
    );

    setIsScanning(true);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
        .then(() => {
          scannerRef.current = null;
          setIsScanning(false);
        })
        .catch(error => {
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
  }, []);

  const handleScanAgain = () => {
    setScanResult(null);
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
          <div id="qr-reader" style={{ width: "100%", maxWidth: "300px", margin: "auto" }}></div>
        </Col>
      </Row>

      {scanResult && (
        <Row justify="center" align="middle" style={{ marginBottom: "16px" }}>
          <Col>
            <Text strong>Scan Result: </Text>
            <Text>{scanResult}</Text>
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
          <Button
            type="primary"
            onClick={handleScanAgain}
            disabled={isScanning}
          >
            {scanResult ? "Scan Again" : "Scan"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default QRScanner;