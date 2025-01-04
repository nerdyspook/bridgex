"use client"; // Indicates that this is a client-side component

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

// ContainerScroll Component
// Sets up a scrollable container and applies scroll-based animations to child components
export const ContainerScroll = ({
  titleComponent,
}: {
  titleComponent: string | React.ReactNode;
}) => {
  // Reference to the container DOM element
  const containerRef = useRef<any>(null);

  // Track the vertical scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // State to determine if the viewport is mobile-sized
  const [isMobile, setIsMobile] = React.useState(false);

  // Effect to handle responsiveness based on window width
  React.useEffect(() => {
    // Function to check if the viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize to update mobile state
    window.addEventListener("resize", checkMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Determine scaling factors based on device type
  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Create transformation values based on scroll progress
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]); // Rotate from 20deg to 0deg
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions()); // Scale based on device
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]); // Translate vertically

  return (
    <div
      className="h-[80rem] flex items-center justify-center relative p-20"
      ref={containerRef} // Attach ref to monitor scroll
    >
      <div
        className="py-40 w-full relative"
        style={{
          perspective: "1000px", // Establish 3D perspective for child components
        }}
      >
        {/* Header Component with vertical translation */}
        <Header translate={translate} titleComponent={titleComponent} />

        {/* Card Component with rotation, scaling, and translation */}
        <Card rotate={rotate} translate={translate} scale={scale} />
      </div>
    </div>
  );
};

// Header Component
// Displays the title and moves it vertically based on scroll
export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate, // Apply vertical translation
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

// Card Component
// Displays an image card with 3D rotation, scaling, and translation effects
export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: any;
  scale: any;
  translate: any;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // Apply rotation along the X-axis
        scale, // Apply scaling
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003", // Complex shadow for depth
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="bg-gray-100 h-full w-full rounded-2xl gap-4 overflow-hidden p-4 transition-all ">
        {/* Next.js Image component for optimized image loading */}
        <Image
          src="/temp-banner.png" // Path to the image
          fill // Fills the parent container
          alt="bannerImage" // Alt text for accessibility
          className="object-cover border-8 rounded-2xl" // Styling classes
        />
      </div>
    </motion.div>
  );
};
