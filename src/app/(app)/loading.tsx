'use client';
import { Audio } from 'react-loader-spinner';

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
      <Audio height='150' width='150' color='blue' ariaLabel='loading' />
    </div>
  );
};

export default loading;
