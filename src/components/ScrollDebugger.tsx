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
      
      // More accurate section detection based on scroll position
      let activeSection = 'hero';
      const sectionTriggers = [
        { name: 'services', trigger: windowHeight * 0.2 },      // 20% of viewport
        { name: 'portfolio', trigger: windowHeight * 1.5 },     // After services (150vh)
        { name: 'about', trigger: windowHeight * 2.5 },         // After portfolio
        { name: 'contact', trigger: windowHeight * 3.3 }        // After about (80vh)
      ];

      for (const section of sectionTriggers) {
        if (scrollY >= section.trigger) {
          activeSection = section.name;
        }
      }

      setScrollInfo({
        scrollY: Math.round(scrollY),
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
    <div className="fixed top-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg text-sm font-mono border border-primary/30">
      <div className="mb-2 font-bold text-primary">ScrollTrigger Debug</div>
      <div>Scroll: {scrollInfo.scrollY}px</div>
      <div>Window: {scrollInfo.windowHeight}px</div>
      <div className="text-accent">Active: {scrollInfo.activeSection}</div>
      <div>Progress: {Math.round((scrollInfo.scrollY / (scrollInfo.windowHeight * 4)) * 100)}%</div>
      
      {/* Trigger Points */}
      <div className="mt-3 pt-2 border-t border-primary/20">
        <div className="text-xs text-muted-foreground mb-1">Trigger Points:</div>
        <div className="text-xs">
          <div className={scrollInfo.scrollY >= scrollInfo.windowHeight * 0.2 ? 'text-accent' : 'text-muted-foreground'}>
            Services: {Math.round(scrollInfo.windowHeight * 0.2)}px
          </div>
          <div className={scrollInfo.scrollY >= scrollInfo.windowHeight * 1.5 ? 'text-accent' : 'text-muted-foreground'}>
            Portfolio: {Math.round(scrollInfo.windowHeight * 1.5)}px
          </div>
          <div className={scrollInfo.scrollY >= scrollInfo.windowHeight * 2.5 ? 'text-accent' : 'text-muted-foreground'}>
            About: {Math.round(scrollInfo.windowHeight * 2.5)}px
          </div>
          <div className={scrollInfo.scrollY >= scrollInfo.windowHeight * 3.3 ? 'text-accent' : 'text-muted-foreground'}>
            Contact: {Math.round(scrollInfo.windowHeight * 3.3)}px
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollDebugger;