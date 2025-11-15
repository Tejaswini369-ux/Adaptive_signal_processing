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
      {/* === Read Instructions Button === */}
      <div className="flex justify-end w-full px-5 mt-2 mb-3 -mt-6">
        <button
          onClick={() => setShowInstructions(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow font-medium"
        >
          Read Instructions
        </button>
      </div>

      {/* === Instructions Modal === */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full h-[80vh] overflow-auto">

            <h2 className="text-xl font-bold mb-4 text-gray-800">Instructions</h2>

            <ul className="list-decimal ml-6 space-y-2 text-gray-700 text-sm">

              <li>Select which adaptive algorithm you want to simulate:
                <ul className="list-disc ml-6">
                  <li><b>LMS</b> – Least Mean Squares</li>
                  <li><b>RMS / RLS</b> – Depending on your experiment</li>
                </ul>
              </li>

              <li>After selecting an algorithm, its simulation panel will appear.</li>

              <li><b>LMS Algorithm</b>:
                <ul className="list-disc ml-6">
                  <li>Based on gradient descent</li>
                  <li>Adaptation controlled by step-size (μ)</li>
                  <li>Slower convergence but stable</li>
                </ul>
              </li>

              <li><b>RMS / RLS Algorithm</b>:
                <ul className="list-disc ml-6">
                  <li>Uses signal power or matrix-based recursive updates</li>
                  <li>Much faster convergence</li>
                  <li>Useful for non-stationary or rapidly changing signals</li>
                </ul>
              </li>

              <li>Your simulation module will typically include:
                <ul className="list-disc ml-6">
                  <li>Input parameters (noise, signal, μ, forgetting factor, etc.)</li>
                  <li>Plots for output signal</li>
                  <li>Error signals</li>
                  <li>Adaptive weight evolution</li>
                </ul>
              </li>

              <li>You can switch between algorithms anytime.</li>

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

      {/* === Main Simulation UI === */}
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
            RLS
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
