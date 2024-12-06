import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [taille, setTaille] = useState({
    largeur: window.innerWidth,
    hauteur: window.innerHeight,
  });

  useEffect(() => {
    const mettreAJourTaille = () => {
      setTaille({
        largeur: window.innerWidth,
        hauteur: window.innerHeight,
      });
    };

    window.addEventListener('resize', mettreAJourTaille);
    return () => window.removeEventListener('resize', mettreAJourTaille);
  }, []);

  return taille;
};

export default useWindowSize;