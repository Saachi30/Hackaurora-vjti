import React, { useState } from 'react';
import { User, Mail, Calendar, Award } from 'lucide-react';
import PDFModal from '../../../components/PDFModal';
import CertificateCard from '../../../components/CertificateCard';
import { achievements, carbonData, certificates } from '../../../data/mockData.js';

const ProfileDashboard = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const handleViewCertificate = (cert) => {
    setSelectedCertificate(cert);
    setShowPDFViewer(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, John Doe</h1>
          <p className="text-gray-600 mt-1">Track your sustainability journey</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <User className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Average Monthly Footprint', value: '85.5 kg', progress: 85, color: 'bg-green-500' },
          { title: 'Monthly Reduction', value: '12.5%', progress: 12, color: 'bg-blue-500' },
          { title: 'Total Emissions', value: '1,240 kg', progress: 75, color: 'bg-purple-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-4">
              <div className={`h-2 ${stat.color} rounded-full transition-all duration-500`}
                   style={{ width: `${stat.progress}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Graph Card */}
        <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-6">Carbon Footprint Trend</h2>
          <div className="h-64 w-full flex items-end justify-between gap-2">
            {carbonData.map((data, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div className="relative w-full group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.footprint}kg
                  </div>
                  <div className="w-full bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                       style={{ height: `${(data.footprint / 120) * 200}px` }} />
                </div>
                <span className="text-sm text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
          <div className="space-y-6">
            {[
              { icon: <User className="w-4 h-4 text-gray-500" />, label: 'Full Name', value: 'John Doe' },
              { icon: <Mail className="w-4 h-4 text-gray-500" />, label: 'Email', value: 'john@example.com' },
              { icon: <Award className="w-4 h-4 text-gray-500" />, label: 'Eco Score', value: '85' },
              { icon: <Calendar className="w-4 h-4 text-gray-500" />, label: 'Member Since', value: '10-11-24' }
            ].map((detail, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                {detail.icon}
                <div>
                  <div className="text-sm text-gray-500">{detail.label}</div>
                  <div className="font-medium text-gray-900">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-white rounded-xl p-6 md:col-span-2 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-6">Sustainability Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <CertificateCard 
                key={index} 
                cert={cert} 
                onViewCertificate={handleViewCertificate}
              />
            ))}
          </div>
        </div>

        {/* Achievements Card */}
        <div className="bg-white rounded-xl p-6 md:col-span-2 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-gray-50 rounded-lg">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PDFModal
        isOpen={showPDFViewer}
        onClose={() => setShowPDFViewer(false)}
        certificate={selectedCertificate}
      />
    </div>
  );
};

export default ProfileDashboard;