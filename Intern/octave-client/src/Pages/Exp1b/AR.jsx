import axios from 'axios';
import React, { useState, useEffect } from 'react';
import image from '../../image.png';

const AR = () => {
  const [inputs, setInputs] = useState([
    { id: 'n_steps', label: 'No.of time steps', min: 10, max: 1000, step: 1, value: 500 },
    { id: 'p', label: 'Order', min: 1, max: 20, step: 1, value: 10 },
    { id: 'sigma', label: 'Standard deviation', min: 0.01, max: 1, step: 0.0001, value: 0.5 }
  ]);

  const [coefficients, setCoefficients] = useState(new Array(10).fill(0.5));
  const [code, setCode] = useState('');
  const [codeHtml, setCodeHtml] = useState('Code will be generated here.!');
  const [imageUrls, setImageUrls] = useState(new Array(5).fill(image));
  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const order = inputs.find(input => input.id === 'p').value;
    setCoefficients(new Array(order).fill(0.5));
  }, [inputs]);

  const handleInputChange = (id, value) => {
    const input = inputs.find(input => input.id === id);
    const newValue = Math.min(Math.max(value, input.min), input.max);
    setInputs(inputs.map(input => input.id === id ? { ...input, value: newValue } : input));
  };

  const handleCoefficientChange = (index, value) => {
    const newCoefficients = [...coefficients];
    newCoefficients[index] = value;
    setCoefficients(newCoefficients);
  };

  const handleGenerateCode = () => {

    const generatedCode = `
function AR_process(n_steps, p, phi, sigma, uniqueIdentifier)
    % Function to simulate an AR(p) stochastic process
    % ...
end
    `;
    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  const handleRun = async () => {
    setLoading(true);
    setShowImages(false);
    const data = {
      n_steps: inputs.find(input => input.id === 'n_steps').value,
      p: inputs.find(input => input.id === 'p').value,
      phi: coefficients.slice(0, inputs.find(input => input.id === 'p').value),
      sigma: inputs.find(input => input.id === 'sigma').value
    };

    try {
      const response = await axios.post('http://localhost:5000/AR-process', data);
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
    element.download = "AR_process.m";
    document.body.appendChild(element);
    element.click();
  };

  const SphereLoading = () => (
    <div className="flex fixed inset-0 items-center justify-center bg-white bg-opacity-50">
      <div className="w-20 h-10">
        <div className="relative w-full h-full overflow-hidden p-2 pl-3">
          <p className="font-sans text-sm font-semibold">Loading...</p>
          <div className="absolute inset-0 bg-blue-button rounded-lg animate-pulse opacity-0 text-black"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* === READ INSTRUCTIONS BUTTON === */}
      <div className="flex justify-end w-full px-5 mt-2 mb-3 -mt-8">
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

              <li>This experiment simulates an <b>AR(p) Autoregressive Stochastic Process</b>.</li>

              <li>Set the input parameters:
                <ul className="list-disc ml-6">
                  <li><b>n_steps</b> – Length of the time-series</li>
                  <li><b>p</b> – Model order</li>
                  <li><b>σ</b> – Standard deviation of white noise</li>
                </ul>
              </li>

              <li>Provide <b>AR coefficients</b> (φ₁, φ₂, ..., φₚ).  
                <p className="text-xs ml-6">Tip: Ensure coefficients satisfy the stationarity condition.</p>
              </li>

              <li>Click <b>Generate Code</b> to see MATLAB code for AR simulation.</li>

              <li>Click <b>Submit & Run</b> to:
                <ul className="list-disc ml-6">
                  <li>Simulate AR process</li>
                  <li>Generate stochastic time series</li>
                  <li>Generate white noise plot</li>
                  <li>Display output figures</li>
                </ul>
              </li>

              <li>You can download the MATLAB file using the <b>Download</b> button.</li>

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

      {/* === MAIN SIMULATION LAYOUT === */}
      <div className='flex flex-row gap-5 space-x-5'>
        
        {/* LEFT SIDE: CODE + BUTTONS + IMAGES */}
        <div className="flex flex-col space-y-10 ">
          <div className='flex flex-col'>
            <iframe
              srcDoc={codeHtml}
              title="Generated Code"
              width="800"
              height="300"
              className='outline border-4 p-2 rounded-sm border-blue-hover'
            ></iframe>

            <div className='flex justify-between text-sm'>
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
            <div className='grid grid-cols-1'>
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Output ${index + 1}`} />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: INPUT CONTROLS */}
        <div className="text-sm">
          
          {/* ========== INPUT PARAMETERS ========== */}
          <div className='flex flex-col items-center'>
            <p className='font-semibold'>Select the input Parameters</p>

            <div className='bg-blue-hover px-5 py-3 mt-2 rounded-xl'>
              {inputs.map(input => (
                <div key={input.id} className="flex flex-col items-center">
                  <label htmlFor={input.id} className="block mb-2">
                    <pre className='font-serif'>
                      <span>{input.min} ≤ </span> {input.label} <span> ≤ {input.max}</span>
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
                      className="w-16 text-center border border-gray-300 rounded-lg py-1 focus:outline-none focus:border-blue-500"
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

          {/* ========== AR COEFFICIENTS ========== */}
          <div className='bg-blue-hover px-5 py-3 mt-2 rounded-xl'>
            {coefficients.map((coeff, index) => (
              <div key={index} className="flex flex-col items-center">
                <label htmlFor={`coeff-${index}`} className="block mb-2">
                  <pre className='font-serif'>
                    <span>-1 ≤ </span> {`Coefficient ${index + 1}`} <span> ≤ 1</span>
                  </pre>
                </label>

                <div className="flex flex-row items-center">
                  <input
                    type="number"
                    id={`coeff-${index}`}
                    min={-1}
                    max={1}
                    step={0.001}
                    value={coeff}
                    onChange={(e) => handleCoefficientChange(index, parseFloat(e.target.value))}
                    className="w-16 text-center border border-gray-300 rounded-lg py-1 focus:outline-none focus:border-blue-500"
                  />

                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.001}
                    value={coeff}
                    onChange={(e) => handleCoefficientChange(index, parseFloat(e.target.value))}
                    className="flex-grow ml-2"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <button onClick={handleGenerateCode} className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-10">
              Generate Code
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default AR;
