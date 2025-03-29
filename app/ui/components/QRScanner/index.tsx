import { Button, Col, Row, Typography, message } from 'antd';
import React, { useState } from 'react';
import ReactQrReader from 'react-qr-reader';
// import { useMediaQuery } from 'react-responsive';

const { Title, Text } = Typography;

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = true;

  // Handle the QR code scan result
  const handleScan = (data: string | null) => {
    if (data) {
      setScanResult(data);
      message.success('QR Code Scanned!');
    }
  };

  // Handle the error while scanning
  const handleError = (err: any) => {
    setCameraError('Error accessing the camera.');
    message.error('Failed to access the camera.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="center" align="middle" style={{ marginBottom: "24px" }}>
        <Col>
          <Title level={3}>Scan QR Code</Title>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col span={isMobile ? 24 : 12}>
          {/* QR Reader component */}
          {/* <ReactQrReader
            delay={300}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
            onScan={handleScan}
            onError={handleError}
            facingMode="environment"
          /> */}
        </Col>
      </Row>

      {/* Display Scan Result */}
      {scanResult && (
        <Row justify="center" align="middle" style={{ marginBottom: "16px" }}>
          <Col>
            <Text strong>Scan Result: </Text>
            <Text>{scanResult}</Text>
          </Col>
        </Row>
      )}

      {/* Display Camera Error */}
      {cameraError && (
        <Row justify="center" align="middle" style={{ marginBottom: "16px" }}>
          <Col>
            <Text type="danger">{cameraError}</Text>
          </Col>
        </Row>
      )}

      {/* Button to open QR scanner */}
      <Row justify="center" style={{ marginBottom: "16px" }}>
        <Col>
          <Button
            type="primary"
            onClick={() => setCameraError(null)}
          >
            Start Scanning
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default QRScanner;
