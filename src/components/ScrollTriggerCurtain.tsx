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

    // Set initial states
    gsap.set(hero, { zIndex: 1 });
    
    sectionElements.forEach((section, index) => {
      if (section) {
        gsap.set(section, { 
          zIndex: index + 2,
          y: '100%' // Start from bottom
        });
      }
    });

    // Create ScrollTrigger for each section
    sectionElements.forEach((section, index) => {
      if (!section) return;

      const sectionConfig = sections[index];
      const sectionHeight = sectionConfig.height;
      
      // Calculate trigger point based on previous sections
      const triggerStart = index === 0 ? 'top bottom' : `${index * 100}vh bottom`;
      
      ScrollTrigger.create({
        trigger: section,
        start: triggerStart,
        end: `+=${sectionHeight}`,
        scrub: 1, // Smooth scrubbing
        animation: gsap.to(section, {
          y: '0%', // Slide up to cover hero
          ease: 'none'
        }),
        onToggle: (self) => {
          // Optional: Add any side effects when section enters/exits
          if (self.isActive) {
            console.log(`Section ${index + 1} is covering hero`);
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
            
            {/* Actual section content */}
            <div
              ref={el => sectionsRef.current[index] = el}
              className="fixed top-0 left-0 w-full overflow-hidden"
              style={{
                height: section.height,
                background: section.background,
                zIndex: index + 2
              }}
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Final spacer to ensure proper scroll ending */}
      <div className="w-full h-screen" />
    </div>
  );
};

export default ScrollTriggerCurtain;