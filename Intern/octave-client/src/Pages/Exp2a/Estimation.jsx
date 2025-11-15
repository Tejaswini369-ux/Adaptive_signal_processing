import axios from 'axios';
import React, { useState } from 'react';
import image from '../../image.png';

function Estimation() {
  const [inputs, setInputs] = useState([
    { id: 'N', label: 'No. of time steps', min: 100, max: 1000, step: 1, value: 500 },
    { id: 'dt', label: 'Sampling time', min: 0.001, max: 0.01, step: 0.001, value: 0.01 },
    { id: 'u', label: 'U', min: 1, max: 10, step: 1, value: 5 },
    { id: 'y0', label: 'Initial position', min: 50, max: 100, step: 1, value: 60 },
    { id: 'v0', label: 'Velocity', min: 0, max: 100, step: 1, value: 10 },
    { id: 'R', label: 'Variance', min: 2, max: 100, step: 0.1, value: 10 },
    { id: 'p', label: 'Order', min: 1, max: 10, step: 1, value: 1 }
  ]);

  const [code, setCode] = useState('');
  const [codeHtml, setCodeHtml] = useState('Code will be generated here.!');
  const [imageUrls, setImageUrls] = useState(new Array(5).fill(image));
  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const [showInstructions, setShowInstructions] = useState(false); // NEW

  // Update Inputs
  const handleInputChange = (id, value) => {
    setInputs(inputs.map(input =>
      input.id === id ? { ...input, value: Math.min(Math.max(value, input.min), input.max) } : input
    ));
  };

  // Generate MATLAB Code
  const handleGenerateCode = () => {
    const generatedCode = `
function kalmanFilterEstimation(N, dt, u, y0, v0, R)
    t = dt * (1:N);
    I = eye(2);

    F = [1 dt; 0 1];
    G = [-1/2*dt^2; -dt];
    H = [1 0];
    Q = [0 0; 0 0];
    x0 = [10; 0];
    P0 = [50 0; 0 0.01];

    xt = zeros(2, N);
    xt(:, 1) = [y0; v0];

    for k = 2:N
        xt(:, k) = F * xt(:, k-1) + G * u;
    end

    v = sqrt(R) * randn(1, N);
    z = H * xt + v;

    x = zeros(2, N);
    x(:, 1) = x0;
    P = P0;

    for k = 2:N
        x(:, k) = F * x(:, k-1) + G * u;
        P = F * P * F' + Q;

        K = P * H' / (H * P * H' + R);
        x(:, k) = x(:, k) + K * (z(k) - H * x(:, k));
        P = (I - K * H) * P;
    end

    figure;
    subplot(2, 1, 1); plot(t, z, 'g-', t, x(1, :), 'b--'); hold on; plot(t, xt(1, :), 'r:');
    title('Position');

    subplot(2, 1, 2); plot(t, x(2, :)); hold on; plot(t, xt(2, :), 'r:');
    title('Velocity');

    figure;
    subplot(2, 1, 1); plot(t, x(1, :) - xt(1, :)); title('Position Error');
    subplot(2, 1, 2); plot(t, x(2, :) - xt(2, :)); title('Velocity Error');
end`;

    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  // Backend Execution
  const handleRun = async () => {
    setLoading(true);
    setShowImages(false);

    const data = inputs.reduce((acc, input) => {
      acc[input.id] = input.value;
      return acc;
    }, {});

    try {
      const response = await axios.post('http://localhost:5000/Estimation', data);
      setImageUrls(response.data.images.map(img => `http://localhost:5000${img}`));
      setShowImages(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "kalmanFilterEstimation.m";
    document.body.appendChild(a);
    a.click();
  };

  const SphereLoading = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
      <div className="w-20">
        <p className="font-sans text-sm font-semibold">Loading...</p>
      </div>
    </div>
  );

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

              <li>This experiment performs **Kalman Filter–based State Estimation**.</li>

              <li>Provide the required inputs:
                <ul className="list-disc ml-6">
                  <li>Number of time steps (N)</li>
                  <li>Sampling time (dt)</li>
                  <li>Constant input (u)</li>
                  <li>Initial position (y0)</li>
                  <li>Initial velocity (v0)</li>
                  <li>Measurement noise variance (R)</li>
                  <li>Order (p) – used in advanced extensions</li>
                </ul>
              </li>

              <li>Click <b>Generate Code</b> to generate MATLAB code for the experiment.</li>

              <li>Click <b>Submit & Run</b> to:
                <ul className="list-disc ml-6">
                  <li>Simulate true dynamics of a moving object</li>
                  <li>Add noisy measurements</li>
                  <li>Estimate state using Kalman Filter</li>
                  <li>Generate estimation error plots</li>
                </ul>
              </li>

              <li>The output will display:
                <ul className="list-disc ml-6">
                  <li>Measured vs Estimated vs True Position</li>
                  <li>Estimated vs True Velocity</li>
                  <li>Position Estimation Error</li>
                  <li>Velocity Estimation Error</li>
                </ul>
              </li>

              <li>You may change dt, N, R, and initial conditions to observe differences in estimation accuracy.</li>

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

      {/* === MAIN UI LAYOUT === */}
      <div className="flex flex-row gap-5 space-x-5">

        {/* LEFT SIDE – Code + Output */}
        <div className="flex flex-col space-y-10">

          <iframe
            srcDoc={codeHtml}
            title="Generated Code"
            width="750"
            height="300"
            className="outline border-4 p-2 rounded-sm border-blue-hover"
          ></iframe>

          <div className="flex justify-between text-sm">
            <button
              onClick={handleDownload}
              className="bg-blue-button px-3 py-1 rounded-lg hover:bg-blue-hover mt-8"
            >
              Download
            </button>

            <button
              onClick={handleRun}
              className="bg-blue-button px-3 py-1 rounded-lg hover:bg-blue-hover mt-8"
            >
              Submit & Run
            </button>
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

        {/* RIGHT SIDE – Inputs */}
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

          <button
            onClick={handleGenerateCode}
            className="bg-blue-button px-3 py-1 rounded-lg hover:bg-blue-hover mt-10"
          >
            Generate Code
          </button>
        </div>
      </div>
    </>
  );
}

export default Estimation;
