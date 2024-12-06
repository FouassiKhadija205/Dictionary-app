import { useState } from 'react';

const useClickCounter = () => {
  const [clics, setClics] = useState(0);

  const incrementer = () => {
    setClics((prevClics) => prevClics + 1);
  };

  return { clics, incrementer };
};

export default useClickCounter;
