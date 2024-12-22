// src/components/CertificateCard.js
import React from 'react';
import { FileText } from 'lucide-react';

const CertificateCard = ({ cert, onViewCertificate }) => (
  <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          {cert.icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{cert.title}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            cert.status === 'Awarded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          } mt-2`}>
            {cert.status}
          </span>
        </div>
      </div>
      {cert.status === 'Awarded' && (
        <button
          onClick={() => onViewCertificate(cert)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FileText className="w-4 h-4" />
          View Certificate
        </button>
      )}
    </div>
    <div className="mt-4">
      <div className="text-sm text-gray-600 mb-2">Current Score: {cert.score}/100</div>
      <div className="w-full h-2 bg-gray-100 rounded-full">
        <div className={`h-2 rounded-full ${
          cert.status === 'Awarded' ? 'bg-green-500' : 'bg-yellow-500'
        }`} style={{ width: `${cert.score}%` }} />
      </div>
      <p className="text-sm text-gray-600 mt-4">
        {cert.criteria}
      </p>
      {cert.awardedDate && (
        <p className="text-sm text-gray-500 mt-2">
          Awarded on: {new Date(cert.awardedDate).toLocaleDateString()}
        </p>
      )}
    </div>
  </div>
);

export default CertificateCard;