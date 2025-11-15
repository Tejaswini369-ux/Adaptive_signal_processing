import axios from 'axios';
import React, { useState } from 'react';
import image from '../../image.png';

function Simulation() {
  const [inputs, setInputs] = useState([
    { id: 'A00', label: 'state_transition_matrix_00', min: -1, max: 1, step: 0.01, value: 0 },
    { id: 'A01', label: 'state_transition_matrix_01', min: -1, max: 1, step: 0.01, value: 0 },
    { id: 'A10', label: 'state_transition_matrix_10', min: -1, max: 1, step: 0.01, value: 0 },
    { id: 'A11', label: 'state_transition_matrix_11', min: -1, max: 1, step: 0.01, value: 0 },
    { id: 'x0', label: 'true_state_00', min: -1, max: 1, step: 0.001, value: 0.01 },
    { id: 'x1', label: 'true_state_01', min: -1, max: 1, step: 0.001, value: 0.01 },
    { id: 'num_steps', label: 'No.of time steps', min: 10, max: 100, step: 1, value: 5 },
    { id: 'x0_est_0', label: 'initial_state_estimate_00', min: -1, max: 1, step: 0.001, value: 1 },
    { id: 'x0_est_1', label: 'initial_state_estimate_01', min: -1, max: 1, step: 0.001, value: 1 }
  ]);

  const [code, setCode] = useState('');
  const [codeHtml, setCodeHtml] = useState('Code will be generated here.!');
  const [imageUrls, setImageUrls] = useState(new Array(5).fill(image));
  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const [showInstructions, setShowInstructions] = useState(false); // <<< NEW

  const handleInputChange = (id, value) => {
    setInputs(inputs.map(input =>
      input.id === id ? { ...input, value: Math.min(Math.max(value, input.min), input.max) } : input
    ));
  };

  const handleGenerateCode = () => {
    const generatedCode = `function kalman_filter_simulation(A, x0, num_steps, x0_est)
    % Define the measurement matrix, process noise covariance, and measurement noise covariance
    C = eye(2);            % Measurement matrix (identity matrix)
    Q = 1e-6 * eye(2);     % Small process noise covariance
    R = zeros(2);          % Measurement noise covariance (noiseless)

    % Initialize true state and measurements
    x_true = zeros(2, num_steps); % True state
    y_meas = zeros(2, num_steps); % Measurements

    x_true(:, 1) = x0; 

    for k = 2:num_steps
        x_true(:, k) = A * x_true(:, k-1);
        y_meas(:, k) = C * x_true(:, k);
    end

    x_est = zeros(2, num_steps);
    P = eye(2);
    x_est(:, 1) = x0_est;

    for k = 2:num_steps
        x_pred = A * x_est(:, k-1);
        P_pred = A * P * A' + Q;

        K = P_pred * C' / (C * P_pred * C' + R);
        x_est(:, k) = x_pred + K * (y_meas(:, k) - C * x_pred);
        P = (eye(2) - K * C) * P_pred;
    end
end`;
    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  const handleRun = async () => {
    setLoading(true);
    setShowImages(false);

    const data = {
      A_octave: [
        [inputs.find(i => i.id === 'A00').value, inputs.find(i => i.id === 'A01').value],
        [inputs.find(i => i.id === 'A10').value, inputs.find(i => i.id === 'A11').value]
      ],
      x0: [inputs.find(i => i.id === 'x0').value, inputs.find(i => i.id === 'x1').value],
      num_steps: inputs.find(i => i.id === 'num_steps').value,
      x0_est: [
        inputs.find(i => i.id === 'x0_est_0').value,
        inputs.find(i => i.id === 'x0_est_1').value
      ]
    };

    try {
      const response = await axios.post('http://localhost:5000/Simulation', data);
      setImageUrls(response.data.images.map(img => `http://localhost:5000${img}`));
      setShowImages(true);
    } catch (error) {
      console.error('Error running the script:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "kalmanFilterSimulation.m";
    document.body.appendChild(element);
    element.click();
  };

  const SphereLoading = () => (
    <div className="flex fixed inset-0 items-center justify-center bg-white bg-opacity-50">
      <div className="w-20 h1">
        <div className="relative w-full h-full overflow-hidden p-2 pl-3">
          <p className="font-sans text-sm font-semibold">Loading...</p>
          <div className="absolute inset-0 bg-blue-button rounded-lg animate-pulse opacity-0 text-black"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* --- Read Instructions Button --- */}
      <div className="flex justify-end w-full px-5 mt-2 mb-3 -mt-6">
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

            <h2 className="text-xl font-bold mb-4 text-gray-800">Instructions</h2>

            <ul className="list-decimal ml-6 space-y-2 text-gray-700 text-sm">

              <li>This simulation demonstrates a <b>2-state Kalman Filter</b>.</li>

              <li>Enter values for:
                <ul className="list-disc ml-6">
                  <li>State Transition Matrix A (A00, A01, A10, A11)</li>
                  <li>True Initial State (x0, x1)</li>
                  <li>Initial State Estimate (x0_est)</li>
                  <li>Number of Time Steps (10–100)</li>
                </ul>
              </li>

              <li>Click <b>Generate Code</b> to generate MATLAB/Octave code.</li>

              <li>Click <b>Submit & Run</b> to execute the Kalman filter on the backend.</li>

              <li>The output shows:
                <ul className="list-disc ml-6">
                  <li>True state trajectory</li>
                  <li>Estimated state trajectory</li>
                  <li>Kalman filter convergence behavior</li>
                  <li>State estimation accuracy</li>
                </ul>
              </li>

              <li>You can adjust matrix values to see how system stability and estimation change.</li>

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

      {/* --- Actual Simulation Layout --- */}
      <div className="flex flex-row gap-5 space-x-5">
        
        {/* LEFT PANEL */}
        <div className="flex flex-col space-y1">

          <div className="flex flex-col">
            <iframe
              srcDoc={codeHtml}
              title="Generated Code"
              width="750"
              height="300"
              className="outline border-4 p-2 rounded-sm border-blue-hover"
            ></iframe>

            <div className="flex justify-between text-sm">
              <button
                className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-8"
                onClick={handleDownload}
              >
                Download
              </button>

              <button
                className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-8"
                onClick={handleRun}
              >
                Submit & Run
              </button>
            </div>
          </div>

          {loading && <SphereLoading />}
          
          {!loading && showImages && (
            <div className="grid grid-cols-1">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Output ${index + 1}`} />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="text-sm">
          <div className="flex flex-col items-center">
            <p className="font-semibold">Select the input Parameters</p>

            <div className="bg-blue-hover px-5 py-3 mt-2 rounded-xl">

              {inputs.map(input => (
                <div key={input.id} className="flex flex-col items-center">

                  <label htmlFor={input.id} className="block mb-2">
                    <pre className="font-serif">
                      <span>{input.min} ≤ </span>{input.label}<span> ≤ {input.max}</span>
                    </pre>
                  </label>

                  <div className="flex flex-row items-center">
                    <input
                      type="number"
                      id={input.id}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={input.value}
                      onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value))}
                      className="w-16 text-center border border-gray-300 rounded-lg py-1"
                    />

                    <input
                      type="range"
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={input.value}
                      onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value))}
                      className="flex-grow ml-2"
                    />
                  </div>

                </div>
              ))}

            </div>
          </div>

          <div className="flex flex-col mt-5">
            <button
              onClick={handleGenerateCode}
              className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover"
            >
              Generate Code
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Simulation;
