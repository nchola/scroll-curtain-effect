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

    // Create ScrollTrigger for each section with fixed timing
    sectionElements.forEach((section, index) => {
      if (!section) return;

      const sectionConfig = sections[index];
      
      // Calculate precise trigger points
      const sectionHeight = parseInt(sectionConfig.height.replace('vh', ''));
      const triggerPoint = index * window.innerHeight; // Start when previous section should be covered
      
      ScrollTrigger.create({
        trigger: container, // Use container as trigger, not individual sections
        start: `${triggerPoint}px top`,
        end: `${triggerPoint + (sectionHeight * window.innerHeight / 100)}px top`,
        scrub: 0.8, // Slightly slower for smoother effect
        animation: gsap.fromTo(section, 
          {
            y: '100vh', // Start completely below
            opacity: 1
          },
          {
            y: '0vh', // Move to cover viewport
            opacity: 1,
            ease: 'none'
          }
        ),
        onEnter: () => {
          // Ensure section is on top when entering
          section.style.zIndex = (20 + index).toString();
          console.log(`Section ${index + 1} entering`);
        },
        onLeave: () => {
          // Keep section visible when leaving upward
          console.log(`Section ${index + 1} leaving`);
        },
        onEnterBack: () => {
          // Handle backward scroll
          section.style.zIndex = (20 + index).toString();
        },
        onLeaveBack: () => {
          // Reset when scrolling back up
          console.log(`Section ${index + 1} leaving back`);
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
                zIndex: 20 + index, // Higher z-index range
                transform: 'translate3d(0, 100vh, 0)', // Start below viewport
                willChange: 'transform',
                visibility: 'visible', // Always visible
                opacity: 1
              }}
            >
              <div className="relative w-full h-full">
                {/* Solid background layer for complete coverage */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    background: section.background,
                    zIndex: 1
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

      {/* Final spacer dengan background solid */}
      <div className="w-full h-screen" style={{ 
        background: sections[sections.length - 1]?.background || 'hsl(var(--background))'
      }} />
    </div>
  );
};

export default ScrollTriggerCurtain;