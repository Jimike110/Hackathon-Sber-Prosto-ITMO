import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Typography, message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";

const { Title, Text } = Typography;

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Configuration for the scanner
    const config = {
      fps: 10, // scanning speed: frames per second
      qrbox: 250, // scanning box size (250x250px)
      rememberLastUsedCamera: true,
    };

    const verbose = false;

    // Initialize the QR code scanner and render it into the div with id 'qr-reader'
    scannerRef.current = new Html5QrcodeScanner("qr-reader", config, verbose);

    scannerRef.current.render(
      (decodedText: string, decodedResult: any) => {
        setScanResult(decodedText);
        message.success("QR Code Scanned!");
        // Optionally, stop scanning after a successful scan
        scannerRef.current?.clear().catch((error) => console.error("Failed to clear scanner", error));
      },
      (errorMessage: string) => {
        // This callback is invoked in case of scan errors or no QR detected in a frame
        console.warn("QR scan error:", errorMessage);
      }
    );

    // Cleanup the scanner on component unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => console.error("Failed to clear scanner", error));
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" align="middle" style={{ marginBottom: "24px" }}>
        <Col>
          <Title level={3}>Scan QR Code</Title>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col span={24}>
          {/* The scanner renders into this element */}
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
            onClick={() => {
              // Reset the scan result and reinitialize the scanner by reloading the page.
              // You could also call a function to reinitialize the scanner without a full reload.
              setScanResult(null);
              window.location.reload();
            }}
          >
            Scan Again
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default QRScanner;
