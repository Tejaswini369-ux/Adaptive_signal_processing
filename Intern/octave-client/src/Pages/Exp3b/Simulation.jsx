import React, { useState } from 'react';
import LMS_EQUALIZATION from './LMS_EQUALIZATION';
import RLS_EQUALIZATION from './RLS_EQUALIZATION';
import LMS_PREDICTION from './LMS_PREDICTION';
import RLS_PREDICTION from './RLS_PREDICTION';

const Simulation = () => {
  const [activeSection, setActiveSection] = useState('NULL');
  const [algorithmType, setAlgorithmType] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const renderSection = () => {
    if (activeSection === 'LMS') {
      switch (algorithmType) {
        case 'Equalization':
          return <LMS_EQUALIZATION />;
        case 'Prediction':
          return <LMS_PREDICTION />;
        default:
          return <div></div>;
      }
    } else if (activeSection === 'RLS') {
      switch (algorithmType) {
        case 'Equalization':
          return <RLS_EQUALIZATION />;
        case 'Prediction':
          return <RLS_PREDICTION />;
        default:
          return <div></div>;
      }
    } else {
      return <div>Select an algorithm</div>;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center relative -mt-10">

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
                <li>Select the desired algorithm:
                  <ul className="list-disc ml-6">
                    <li><b>LMS</b> (Least Mean Squares)</li>
                    <li><b>RLS</b> (Recursive Least Squares)</li>
                  </ul>
                </li>

                <li>After selecting LMS or RLS, choose the operation type:
                  <ul className="list-disc ml-6">
                    <li><b>Equalization</b></li>
                    <li><b>Prediction</b></li>
                  </ul>
                </li>

                <li>The corresponding simulation module will be displayed.</li>

                <li>For Equalization:
                  <ul className="list-disc ml-6">
                    <li>Observe how the adaptive filter compensates channel distortion.</li>
                    <li>Input noisy/distorted signal parameters as needed.</li>
                  </ul>
                </li>

                <li>For Prediction:
                  <ul className="list-disc ml-6">
                    <li>Understand how the adaptive filter predicts future signal values.</li>
                    <li>Modify step-size / forgetting factor (if available) within the module.</li>
                  </ul>
                </li>

                <li>Each simulation module contains its own graphs, numerical updates, and controls.</li>

                <li>You may repeat selection and switch between algorithms anytime.</li>
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

        {/* --- Algorithm Selection --- */}
        <div className='flex gap-5'>
          <button
            className={`px-6 py-2 rounded-lg ${
              activeSection === 'LMS'
                ? 'bg-blue-hover'
                : 'bg-blue-button hover:bg-blue-hover'
            }`}
            onClick={() => {
              setActiveSection('LMS');
              setAlgorithmType('');
            }}
          >
            LMS
          </button>

          <button
            className={`px-6 py-2 rounded-lg ${
              activeSection === 'RLS'
                ? 'bg-blue-hover'
                : 'bg-blue-button hover:bg-blue-hover'
            }`}
            onClick={() => {
              setActiveSection('RLS');
              setAlgorithmType('');
            }}
          >
            RLS
          </button>
        </div>

        {/* --- Equalization / Prediction Buttons --- */}
        {activeSection !== 'NULL' && (
          <div className='flex gap-5 mt-5'>
            <button
              className={`px-6 py-2 rounded-lg ${
                algorithmType === 'Equalization'
                  ? 'bg-blue-hover'
                  : 'bg-blue-button hover:bg-blue-hover'
              }`}
              onClick={() => setAlgorithmType('Equalization')}
            >
              Equalization
            </button>

            <button
              className={`px-6 py-2 rounded-lg ${
                algorithmType === 'Prediction'
                  ? 'bg-blue-hover'
                  : 'bg-blue-button hover:bg-blue-hover'
              }`}
              onClick={() => setAlgorithmType('Prediction')}
            >
              Prediction
            </button>
          </div>
        )}

        {/* --- Main Display Section --- */}
        <div className='mt-5'>
          {renderSection()}
        </div>

      </div>
    </>
  );
};

export default Simulation;
