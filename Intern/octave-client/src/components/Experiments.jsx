import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Experiments = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const handleItemClick = (index) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(index)
        ? prevExpandedItems.filter(item => item !== index)
        : [...prevExpandedItems, index]
    );
  };

  const experimentsData = [
    {
      title: 'Experiment-1',
      details: [
        { text: 'Simulation and comparative analysis of LMS and RLS algorithms using simulated as well real time bio signals. Observe the effect of various adaptation factors like step size, forgetting factor.', link: '/exps/lms-rms/' },
        { text: 'Simulate an Autoregressive stochastic process', link: '#' },
        { text: 'Detect non-stationarity in stochastic processes with LMS and RLS', link: '#' }
      ]
    },
    {
      title: 'Study and implementation of Kalman filter',
      details: [
        { text: 'Correspondence between the initial conditions of the Kalman variables and prediction performance', link: '#' },
        { text: 'With an unforced dynamic model and noiseless state space model.', link: '#' }
      ]
    },
    {
      title: 'Simulation of adaptive noise cancellation, interference canceling, channel equalization using appropriate adaptive filters for various scenario and compare the performance for various other variants of these adaptive algorithms',
      details: [
        { text: 'Implementation and analysis of Autoregressive Stochastic processes and Minimum Variance Distortionless Beamformer using LMS and Monte-Carlo Runs.', link: '#' },
        { text: 'Simulate an adaptive prediction and equalization with LMS and RLS Algorithm.', link: '#' }
      ]
    },
    {
      title: 'Audio synthesis using the Differential DSP library',
      details: [
        { text: 'Audio synthesis using the Differential DSP library', link: '#' }
      ]
    }
  ];

  
  return (
    <div>
    <ol className="list-decimal font-serif">
      {experimentsData.map((experiment, index) => (
        <li key={index} className="mb-2 text-sm">
          <div className='font-semibold cursor-pointer text-base' onClick={() => handleItemClick(index)}>
            {experiment.title}
          </div>
          {expandedItems.includes(index) && (
            <ol className="list-[lower-alpha] ml-6 mt-2">
              {experiment.details.map((detail, subIndex) => (
                <li key={subIndex} className="mb-1">
                  <Link to={detail.link} className="hover:underline text-blue-600 hover:text-orange-500">
                    {detail.text}
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  </div>
  )
}

export default Experiments
