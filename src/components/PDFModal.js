// src/components/PDFModal.js
import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import CertificateTemplate from './CertificateTemplate';

const PDFModal = ({ isOpen, onClose, certificate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-5/6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Certificate Preview</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="h-full">
          <PDFViewer width="100%" height="100%">
            <CertificateTemplate certData={certificate} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

export default PDFModal;
