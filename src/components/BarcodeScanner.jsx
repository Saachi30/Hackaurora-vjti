import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Check, RefreshCcw } from 'lucide-react';
import Quagga from 'quagga';

const BarcodeScanner = ({ isOpen, onClose, onScan }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const [detectedCode, setDetectedCode] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const barcodeBuffer = useRef([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isOpen && scannerRef.current) {
      initializeScanner();
    }
    return () => {
      // Only stop Quagga if it was successfully initialized
      if (isInitialized.current) {
        try {
          Quagga.stop();
        } catch (err) {
          console.error('Error stopping Quagga:', err);
        }
      }
    };
  }, [isOpen]);

  const initializeScanner = () => {
    // Reset initialization flag
    isInitialized.current = false;

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerRef.current,
        constraints: {
          facingMode: "environment",
          width: 1280,
          height: 720,
          aspectRatio: { min: 1, max: 2 }
        },
        area: {
          top: "25%",
          right: "25%",
          left: "25%",
          bottom: "25%",
        },
      },
      decoder: {
        readers: [
          "ean_reader",
          "ean_8_reader",
          "code_128_reader",
          "code_39_reader",
          "upc_reader"
        ],
        debug: {
          drawBoundingBox: true,
          showPattern: true,
        },
        multiple: false
      },
      locate: true,
      frequency: 10
    }, (err) => {
      if (err) {
        setError('Failed to initialize camera');
        return;
      }
      
      try {
        Quagga.start();
        isInitialized.current = true;
      } catch (startErr) {
        setError('Failed to start camera');
        console.error('Error starting Quagga:', startErr);
      }
    });

    Quagga.onDetected(handleDetection);
  };

  const isValidBarcode = (code) => {
    const isCorrectLength = code.length === 13 || code.length === 8;
    const isNumeric = /^\d+$/.test(code);
    return isCorrectLength && isNumeric;
  };

  const handleDetection = (result) => {
    const code = result.codeResult.code;
    const confidence = result.codeResult.confidence;

    barcodeBuffer.current.push(code);
    if (barcodeBuffer.current.length > 5) {
      barcodeBuffer.current.shift();
    }

    const codeFrequency = barcodeBuffer.current.filter(c => c === code).length;
    
    if (codeFrequency >= 3 && 
        confidence > 0.7 && 
        isValidBarcode(code) && 
        !showConfirmation) {
      
      setDetectedCode(code);
      setConfidenceScore(confidence);
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    if (detectedCode) {
      // Clean up before navigation
      if (isInitialized.current) {
        try {
          Quagga.stop();
          isInitialized.current = false;
        } catch (err) {
          console.error('Error stopping Quagga:', err);
        }
      }
      navigate(`/product-tracking/${detectedCode}`);
      onClose();
    }
  };

  const handleRetry = () => {
    setShowConfirmation(false);
    setDetectedCode(null);
    setConfidenceScore(0);
    barcodeBuffer.current = [];
    
    // Clean up before reinitializing
    if (isInitialized.current) {
      try {
        Quagga.stop();
        isInitialized.current = false;
      } catch (err) {
        console.error('Error stopping Quagga:', err);
      }
    }
    
    initializeScanner();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div className="relative w-full max-w-lg mx-4">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-lg overflow-hidden"
        >
          <div className="p-4 flex justify-between items-center border-b">
            <h3 className="text-lg font-semibold">Scan Barcode</h3>
            <button
              onClick={() => {
                // Clean up before closing
                if (isInitialized.current) {
                  try {
                    Quagga.stop();
                    isInitialized.current = false;
                  } catch (err) {
                    console.error('Error stopping Quagga:', err);
                  }
                }
                onClose();
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative aspect-[4/3] bg-black">
            <div ref={scannerRef} className="absolute inset-0">
              {error && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-100 text-red-600 p-4 rounded-lg">
                    {error}
                  </div>
                </div>
              )}
            </div>
            
            {!showConfirmation && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 border-2 border-blue-500 opacity-50" />
                  <div className="absolute left-1/4 right-1/4 top-[40%] h-[20%] border-2 border-blue-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1/2 h-0.5 bg-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showConfirmation && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg max-w-sm mx-4 text-center">
                  <h4 className="text-lg font-semibold mb-2">Barcode Detected</h4>
                  <p className="text-gray-600 mb-4">
                    Found barcode: {detectedCode}
                    <br />
                    Confidence: {(confidenceScore * 100).toFixed(1)}%
                  </p>
                  <div className="flex space-x-4 justify-center">
                    <button
                      onClick={handleConfirm}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Confirm
                    </button>
                    <button
                      onClick={handleRetry}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      <RefreshCcw className="w-5 h-5 mr-2" />
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 text-center text-sm text-gray-600">
            {!showConfirmation ? 
              'Position the barcode within the frame to scan' :
              'Please confirm the detected barcode'
            }
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BarcodeScanner;