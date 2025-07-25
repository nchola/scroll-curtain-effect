import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SectionConfig {
  id: string;
  height: string; // e.g., '100vh', '150vh'
  background: string;
  content: React.ReactNode;
}

interface ScrollTriggerCurtainProps {
  heroContent: React.ReactNode;
  sections: SectionConfig[];
}

const ScrollTriggerCurtain: React.FC<ScrollTriggerCurtainProps> = ({
  heroContent,
  sections
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;
    const sectionElements = sectionsRef.current;

    if (!container || !hero || sectionElements.some(el => !el)) return;

    // Clear any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial states with proper layering
    gsap.set(hero, { 
      zIndex: 1,
      position: 'relative'
    });
    
    sectionElements.forEach((section, index) => {
      if (section) {
        gsap.set(section, { 
          zIndex: 10 + index, // Start from z-10 to ensure proper layering
          y: '100vh', // Start completely below viewport
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: sections[index].height
        });
      }
    });

    // Create ScrollTrigger for each section with improved timing
    sectionElements.forEach((section, index) => {
      if (!section) return;

      const sectionConfig = sections[index];
      const prevSectionsHeight = sections.slice(0, index).reduce((total, sec) => {
        return total + parseInt(sec.height);
      }, 0);
      
      // More precise trigger points
      const triggerStart = index === 0 ? 'top bottom' : `${prevSectionsHeight}vh bottom`;
      const triggerEnd = `+=${parseInt(sectionConfig.height)}vh`;
      
      ScrollTrigger.create({
        trigger: section,
        start: triggerStart,
        end: triggerEnd,
        scrub: 0.5, // Slower, smoother scrubbing
        animation: gsap.to(section, {
          y: '0vh', // Precise viewport positioning
          ease: 'none'
        }),
        onUpdate: (self) => {
          // Ensure section stays on top during animation
          const currentZ = 10 + index;
          if (section.style.zIndex !== currentZ.toString()) {
            section.style.zIndex = currentZ.toString();
          }
        },
        onToggle: (self) => {
          if (self.isActive) {
            // Ensure this section is visible and properly layered
            section.style.visibility = 'visible';
            section.style.opacity = '1';
          }
        }
      });
    });

    // Pin the hero section during the entire scroll sequence
    const totalScrollDistance = sectionElements.length * window.innerHeight;
    
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: `+=${totalScrollDistance}`,
      pin: true,
      pinSpacing: false // Don't add extra space
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sections]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section - Fixed/Pinned */}
      <div 
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {heroContent}
      </div>

      {/* Sections Container */}
      <div className="relative">
        {sections.map((section, index) => (
          <div key={section.id} className="relative w-full">
            {/* Spacer div to maintain scroll distance */}
            <div 
              className="w-full"
              style={{ height: section.height }}
            />
            
            {/* Actual section content with improved layering */}
            <div
              ref={el => sectionsRef.current[index] = el}
              className="fixed top-0 left-0 w-full overflow-hidden"
              style={{
                height: section.height,
                background: section.background,
                zIndex: 10 + index,
                transform: 'translate3d(0, 100vh, 0)', // Hardware acceleration
                willChange: 'transform' // Optimize for animations
              }}
            >
              <div className="relative w-full h-full">
                {/* Background overlay to ensure complete coverage */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    background: section.background,
                    zIndex: -1 
                  }}
                />
                
                {/* Section content */}
                <div className="relative z-10 w-full h-full">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final spacer to ensure proper scroll ending */}
      <div className="w-full h-screen bg-background" />
    </div>
  );
};

export default ScrollTriggerCurtain;