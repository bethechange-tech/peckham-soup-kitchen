'use client';
import React from 'react';
import { LineWave } from 'react-loader-spinner';

const loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LineWave height='150' width='150' color='green' ariaLabel='loading' />
    </div>
  );
};

export default loading;
