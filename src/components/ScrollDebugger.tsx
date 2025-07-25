import { useEffect, useState } from 'react';

const ScrollDebugger = () => {
  const [scrollInfo, setScrollInfo] = useState({
    scrollY: 0,
    windowHeight: 0,
    activeSection: 'hero'
  });

  useEffect(() => {
    const updateScrollInfo = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      let activeSection = 'hero';
      if (scrollY > windowHeight * 0.5) activeSection = 'services';
      if (scrollY > windowHeight * 2) activeSection = 'portfolio';
      if (scrollY > windowHeight * 3) activeSection = 'about';
      if (scrollY > windowHeight * 3.8) activeSection = 'contact';

      setScrollInfo({
        scrollY,
        windowHeight,
        activeSection
      });
    };

    window.addEventListener('scroll', updateScrollInfo);
    window.addEventListener('resize', updateScrollInfo);
    updateScrollInfo();

    return () => {
      window.removeEventListener('scroll', updateScrollInfo);
      window.removeEventListener('resize', updateScrollInfo);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-sm font-mono">
      <div>Scroll: {scrollInfo.scrollY}px</div>
      <div>Window: {scrollInfo.windowHeight}px</div>
      <div>Active: {scrollInfo.activeSection}</div>
      <div>Progress: {Math.round((scrollInfo.scrollY / (scrollInfo.windowHeight * 4)) * 100)}%</div>
    </div>
  );
};

export default ScrollDebugger;