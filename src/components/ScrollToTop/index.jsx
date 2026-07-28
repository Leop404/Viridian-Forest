import { useState, useEffect } from 'react';
import scrollToTopIcon from '../../assets/scrolltotop.png';
import './index.css';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button onClick={scrollToTop} className="scroll-to-top-btn" title="Volver arriba">
      <img src={scrollToTopIcon} alt="Volver arriba" className="scroll-icon"/>
    </button>
  );
};