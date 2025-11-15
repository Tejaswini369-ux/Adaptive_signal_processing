import React, { useState } from 'react';
import LMS_PREDICTION from './exp4a';

const Simulation = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <div className="relative flex flex-col items-center -mt-6">

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

                <li>This experiment performs <b>LMS Prediction</b> using adaptive filtering.</li>

                <li>Adjust the input parameters such as:
                  <ul className="list-disc ml-6">
                    <li>Step-size (μ)</li>
                    <li>Number of samples</li>
                    <li>Noise variance</li>
                  </ul>
                </li>

                <li>The adaptive filter updates coefficients iteratively to minimize prediction error.</li>

                <li>Observe:
                  <ul className="list-disc ml-6">
                    <li>Input signal</li>
                    <li>Predicted signal</li>
                    <li>Error signal</li>
                    <li>Convergence behavior</li>
                  </ul>
                </li>

                <li>After providing values, click <b>Submit & Run</b> to generate the simulation plots.</li>

                <li>You may repeat the experiment with different step-size or noise parameters to see how quickly the filter converges.</li>

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

        {/* --- Main Simulation Component --- */}
        <div>
          <LMS_PREDICTION />
        </div>

      </div>
    </>
  );
};

export default Simulation;
