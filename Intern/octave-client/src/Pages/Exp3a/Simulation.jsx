import React, { useState } from 'react';
import LMS from './LMS';
import MVDR from './MVDR';

const Simulation = () => {
  const [activeSection, setActiveSection] = useState('NULL');
  const [showInstructions, setShowInstructions] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'LMS':
        return <LMS />;
      case 'MVDR':
        return <MVDR />;
      default:
        return <div>Which algorithm you wanna try out</div>;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center relative -mt-6">

        {/* --- Read Instructions Button --- */}
        <div className="flex justify-end w-full px-5 mt-2 mb-3">
          <button
            onClick={() => setShowInstructions(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow font-medium"
          >
            Read Instructions
          </button>
        </div>

        {/* --- Instructions Popup Modal --- */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full relative h-[80vh] overflow-auto">

              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Instructions
              </h2>

              <ul className="list-decimal ml-6 space-y-2 text-gray-700 text-sm">

                <li>This experiment demonstrates <b>Adaptive Beamforming</b> techniques.</li>

                <li>Select the desired algorithm:
                  <ul className="list-disc ml-6">
                    <li><b>LMS Beamforming</b> – Simple adaptive approach</li>
                    <li><b>MVDR Beamforming</b> – Optimal minimum-variance method</li>
                  </ul>
                </li>

                <li>After selecting LMS or MVDR, the simulation interface will appear.</li>

                <li>For LMS Beamforming:
                  <ul className="list-disc ml-6">
                    <li>Adjust step-size parameter (μ)</li>
                    <li>Observe adaptive weight updates</li>
                    <li>Monitor error signal and convergence</li>
                  </ul>
                </li>

                <li>For MVDR Beamforming:
                  <ul className="list-disc ml-6">
                    <li>Simulation computes optimal weights</li>
                    <li>Signal covariance matrix is used</li>
                    <li>Main lobe is steered toward the desired user</li>
                    <li>Interference is minimized</li>
                  </ul>
                </li>

                <li>Observe:
                  <ul className="list-disc ml-6">
                    <li>Beam patterns</li>
                    <li>Weight vectors</li>
                    <li>Signal-to-interference performance</li>
                  </ul>
                </li>

                <li>You may switch between algorithms anytime.</li>
              </ul>

              <button
                onClick={() => setShowInstructions(false)}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* --- Algorithm Selection Buttons --- */}
        <div className="flex gap-5">
          <button
            className={`px-6 py-2 rounded-lg ${
              activeSection === 'LMS'
                ? 'bg-blue-hover'
                : 'bg-blue-button hover:bg-blue-hover'
            }`}
            onClick={() => setActiveSection('LMS')}
          >
            LMS
          </button>

          <button
            className={`px-6 py-2 rounded-lg ${
              activeSection === 'MVDR'
                ? 'bg-blue-hover'
                : 'bg-blue-button hover:bg-blue-hover'
            }`}
            onClick={() => setActiveSection('MVDR')}
          >
            MVDR
          </button>
        </div>

        {/* --- Main Simulation Content --- */}
        <div className="mt-5">
          {renderSection()}
        </div>

      </div>
    </>
  );
};

export default Simulation;
