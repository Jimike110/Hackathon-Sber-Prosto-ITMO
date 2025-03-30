// app/ui/components/QRScanner/index.tsx

import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Typography, message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import { fetchData, isApiError } from "@/app/lib/api";

const { Title, Text } = Typography;

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const checkAuthorization = async (qrCode: string): Promise<boolean> => {
    try {
      const response = await fetchData<{ validate: boolean }>(
        `/check/pass/guest?code=${encodeURIComponent(qrCode)}`
      );
      return response.validate;
    } catch (error) {
      if (isApiError(error)) {
        console.error("API Error:", error.message);
        message.error("Authorization check failed");
      }
      return false;
    }
  };

  const startScanner = () => {
    if (scannerRef.current || isScanning) return;

    const config = {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
    };

    scannerRef.current = new Html5QrcodeScanner("qr-reader", config, true);
    setIsScanning(true);

    scannerRef.current.render(
      async (decodedText) => {
        try {
          setScanResult(decodedText);
          const authResult = await checkAuthorization(decodedText);
          setIsAuthorized(authResult);
          message.success(authResult ? "Authorized!" : "Not authorized!");
        } catch (error) {
          setIsAuthorized(false);
          message.error("Authorization error");
        } finally {
          stopScanner();
        }
      },
      (errorMessage) => {
        if (!errorMessage.includes("No MultiFormat Readers")) {
          setCameraError(errorMessage);
        }
      }
    );
  };

  const stopScanner = async () => {
    if (!scannerRef.current) return;
    
    try {
      await scannerRef.current.clear();
    } catch (error) {
      console.error("Failed to clear scanner:", error);
      setCameraError("Failed to stop scanner");
    } finally {
      scannerRef.current = null;
      setIsScanning(false);
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
    setIsAuthorized(null);
    setCameraError(null);
    startScanner();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Title level={3}>Scan QR Code</Title>
      </Row>

      <Row justify="center" style={{ marginBottom: 24 }}>
        <Col span={24} style={{ maxWidth: 300 }}>
          <div id="qr-reader" />
        </Col>
      </Row>

      {scanResult && (
        <Row justify="center" style={{ marginBottom: 16 }}>
          <Col>
            {isAuthorized === true && (
              <Title level={4} type="success">AUTHORIZED</Title>
            )}
            {isAuthorized === false && (
              <Title level={4} type="danger">UNAUTHORIZED</Title>
            )}
          </Col>
        </Row>
      )}

      {cameraError && (
        <Row justify="center" style={{ marginBottom: 16 }}>
          <Text type="danger">{cameraError}</Text>
        </Row>
      )}

      <Row justify="center">
        <Button 
          type="primary" 
          onClick={handleScanAgain}
          disabled={isScanning && !scanResult}
          loading={isScanning && !scanResult}
        >
          {scanResult ? "Scan Again" : "Start Scanning"}
        </Button>
      </Row>
    </div>
  );
};

export default QRScanner;