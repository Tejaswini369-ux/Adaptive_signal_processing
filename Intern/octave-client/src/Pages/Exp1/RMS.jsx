import React, { useState } from 'react';
import axios from 'axios';
import image from '../../image.png';

const RMS = () => {
  const [selectedFile, setSelectedFile] = useState('simulated1.csv');
  const [inputs, setInputs] = useState([
    { id: 'lambda', label: 'Forgetting factor', min: 0, max: 1, step: 0.001, value: 0.5 },
    { id: 'M', label: 'Filter length', min: 2, max: 50, step: 1, value: 5 }
  ]);
  const [code, setCode] = useState('');
  const [codeHtml, setCodeHtml] = useState('Code will be generated here.!');
  const [imageUrls, setImageUrls] = useState(new Array(5).fill(image));
  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const fileOptions = [
    { name: 'simulated.csv', file: 'simulated1.csv' },
    { name: 'real.csv', file: 'real.csv' }
  ];

  const handleFileChange = (file) => {
    setSelectedFile(file);
    console.log(file);
  };

 const handleInputChange = (id, value) => {
  const input = inputs.find(input => input.id === id);
  let newValue = Math.min(Math.max(value, input.min), input.max);
  if (id === 'lambda' && newValue === 0) {
    newValue = 0.001;
  }
  setInputs(inputs.map(input => input.id === id ? { ...input, value: newValue } : input));
};


  const handleGenerateCode = () => {
    const generatedCode = `
function rls_denoise(lambda, inputFile, M, outputDir)
    delta = 1e-3;
    fs = 100;
    clc;
    close all;
    x = csvread(inputFile);
    n = length(x);
    P = (1 / delta) * eye(M);
    w_rls = zeros(M, 1);
    D = x;
    A = D + 0.5 * randn(size(D));
    B_rls = zeros(1, n);
    Err_rls = zeros(1, n);
    weights_rls = zeros(M, n);
    A_padded = [zeros(M-1, 1); A];
    t = (0:n-1) / fs;
    for i = M:n
        A_i = A_padded(i:-1:i-M+1);
        k = (P * A_i) / (lambda + A_i' * P * A_i);
        y_rls = w_rls' * A_i;
        Err_rls(i) = D(i) - y_rls;
        w_rls = w_rls + k * Err_rls(i);
        weights_rls(:, i) = w_rls;
        P = (P - k * A_i' * P) / lambda;
        if any(diag(P) < 1e-10)
            P = max(P, 1e-10 * eye(M));
        end
        B_rls(i) = w_rls' * A_i;
    end
    figure;
    subplot(3,1,1), plot(t, D);
    title('Desired Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    subplot(3,1,2), plot(t, A);
    title('Signal Corrupted with Noise');
    xlabel('Time (s)');
    ylabel('Amplitude');
    subplot(3,1,3), plot(t, B_rls);
    title('RLS Output Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    legend('RLS Output');
    saveas(gcf, fullfile(outputDir, 'rls_output_signal.png'));
    figure;
    subplot(2,1,1), plot(t, Err_rls);
    title('RLS Error Signal');
    xlabel('Time (s)');
    ylabel('Error');
    saveas(gcf, fullfile(outputDir, 'rls_error_signal.png'));
end
`;
    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "rls_denoise.m";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleSubmitAndRun = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);  // Start loading
    setShowImages(false);  // Hide images until new ones are loaded

    const formData = {
      file: selectedFile,
      lambda: inputs.find(input => input.id === 'lambda').value,
      M: inputs.find(input => input.id === 'M').value
    };
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:5000/rls-process', formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data'
        }
      });

      setImageUrls(response.data.images.map(img => `http://localhost:5000${img}`));
      setShowImages(true);  // Show images after loading
    } catch (error) {
      console.error('Error running the script:', error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

const SphereLoading = () => (
  <div className="flex felx-col fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 ">
    <div className="w-20 h-10">
      <div className="relative w-full h-full overflow-hidden p-2 pl-3">
        <p className='font-sans text-sm font-bold'>Loading...</p>
        <div className="absolute inset-0 bg-blue-button rounded-lg animate-pulse opacity-0 text-black">
        </div>
        
      </div>
    </div>
  </div>  
);



  return (
    <div className='flex flex-col space-y-10'>
      <div className="flex flex-row gap-5 space-x-5">
        <div className='flex flex-col'>
          <iframe
            srcDoc={codeHtml}
            title="Generated Code"
            width="750"
            height="262"
            className='outline border-4 p-2 rounded-sm border-blue-hover'
          ></iframe>
          <div className='flex justify-between '>
            <button onClick={handleDownloadCode} className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-8">
              Download
            </button>
            <button onClick={handleSubmitAndRun} className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-8">
              Submit & Run
            </button>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex flex-col">
            <p className="mb-2 ml-12 font-bold">Select CSV file of Input</p>
           <select
              onChange={(e) => handleFileChange(e.target.value)}
              className="bg-white border border-black rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
            >
              {fileOptions.map((option, index) => (
                <option key={index} value={option.file} >{option.name}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col mt-8 items-center'>
            <p className='font-bold'>Select the input Parameters</p>
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
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                      className="w-16 text-center border border-gray-300 rounded-lg py-1 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="range"
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={input.value}
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                      className="flex-grow ml-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <button onClick={handleGenerateCode} className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-10 text-base">
              Generate Code
            </button>
          </div>
        </div>
      </div>
      {loading && <SphereLoading/>}
      {!loading && showImages && (
        <div className='grid grid-cols-1'>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Output ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RMS;
