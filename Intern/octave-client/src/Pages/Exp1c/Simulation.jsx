import React, { useState } from 'react';
import LMS from './LMS';
import RMS from './RMS';

const Simulation = () => {
  const [activeSection, setActiveSection] = useState('NULL');
  const [showInstructions, setShowInstructions] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'LMS':
        return <LMS />;
      case 'RMS':
        return <RMS />;
      default:
        return <div>Which algorithm you wanna try out</div>;
    }
  };

  return (
    <>
      {/* === READ INSTRUCTIONS BUTTON === */}
      <div className="flex justify-end w-full px-5 mt-2 mb-3 -mt-6">
        <button
          onClick={() => setShowInstructions(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow font-medium"
        >
          Read Instructions
        </button>
      </div>

      {/* === INSTRUCTIONS MODAL === */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full h-[80vh] overflow-auto">

            <h2 className="text-xl font-bold mb-4 text-gray-800">Instructions</h2>

            <ul className="list-decimal ml-6 space-y-2 text-gray-700 text-sm">

              <li>
                This experiment demonstrates <b>Adaptive Filtering</b> using:
                <ul className="list-disc ml-6">
                  <li><b>LMS</b> – Least Mean Squares algorithm</li>
                  <li><b>RMS</b> – Root Mean Square-based adaptive filter *</li>
                </ul>
                <p className="text-xs text-gray-600 ml-6 mt-1">
                  * If RMS actually means RLS (Recursive Least Squares), tell me and I will update wording.
                </p>
              </li>

              <li>Select your desired algorithm using the buttons at the top.</li>

              <li>After selecting an algorithm, the simulation interface will load:
                <ul className="list-disc ml-6">
                  <li>Provide the required signal parameters</li>
                  <li>Run the simulation</li>
                  <li>Observe error convergence and filter weight evolution</li>
                </ul>
              </li>

              <li><b>LMS Algorithm</b>:
                <ul className="list-disc ml-6">
                  <li>Simple gradient-descent-based adaptation</li>
                  <li>Controlled by step-size parameter (μ)</li>
                  <li>Slower but stable</li>
                </ul>
              </li>

              <li><b>RMS / RLS Algorithm</b>:
                <ul className="list-disc ml-6">
                  <li>Uses signal power or recursive updates</li>
                  <li>Faster convergence</li>
                  <li>Better performance for time-varying signals</li>
                </ul>
              </li>

              <li>You may switch algorithms anytime to compare performance.</li>

              <li>Observe:
                <ul className="list-disc ml-6">
                  <li>Error signal</li>
                  <li>Filter output</li>
                  <li>Weight vector updates</li>
                </ul>
              </li>

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

      {/* === MAIN SIMULATION INTERFACE === */}
      <div className='flex flex-col items-center'>
        
        <div className='flex gap-5'>
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
              activeSection === 'RMS'
                ? 'bg-blue-hover'
                : 'bg-blue-button hover:bg-blue-hover'
            }`}
            onClick={() => setActiveSection('RMS')}
          >
            RMS
          </button>
        </div>

        <div className='mt-5'>
          {renderSection()}
        </div>

      </div>
    </>
  );
};

export default Simulation;
