"use client"; // Indicates that this is a client-side component in Next.js

import React from "react";
import { motion } from "framer-motion"; // Framer Motion for animations
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { SparklesCore } from "./sparkles"; // Custom Sparkles component for particle effects

// LampComponent
// This component renders a heading with animations inside the LampContainer
export function LampComponent() {
  return (
    <LampContainer>
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }} // Initial state: semi-transparent and shifted down by 100px
        whileInView={{ opacity: 1, y: 0 }} // When in view: fully opaque and original position
        transition={{
          delay: 0.3, // Delay before the animation starts
          duration: 0.8, // Duration of the animation
          ease: "easeInOut", // Easing function for smooth transition
        }}
        className="mt-20 bg-gradient-to-br from-neutral-300 to-neutral-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        // Tailwind CSS Classes:
        // mt-20: Margin top
        // bg-gradient-to-br from-neutral-300 to-neutral-500: Background gradient from bottom-right
        // py-4: Padding on y-axis
        // bg-clip-text: Clips the background to the text
        // text-center: Centers the text
        // text-4xl md:text-7xl: Font size responsive to screen size
        // font-medium: Medium font weight
        // tracking-tight: Tight letter spacing
        // text-transparent: Makes the text transparent to show the gradient
      >
        Plans That
        <br /> Fit You Best
      </motion.h1>
    </LampContainer>
  );
}

// LampContainer
// This component creates a styled container with animated background elements
export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[800px] flex-col items-center justify-center overflow-hidden bg-neutral-950 w-full rounded-md z-0",
        className
        // Combines base classes with any additional classes passed via props
      )}
    >
      {/* Background Animated Elements */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        {/* First Animated Conic Gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }} // Initial state: semi-transparent and narrower
          whileInView={{ opacity: 1, width: "30rem" }} // When in view: fully opaque and wider
          transition={{
            delay: 0.3, // Delay before the animation starts
            duration: 0.8, // Duration of the animation
            ease: "easeInOut", // Easing function for smooth transition
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            // Uses CSS custom properties for dynamic gradient positioning
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-neutral-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          // Tailwind CSS Classes:
          // absolute: Position absolutely within the parent
          // inset-auto right-1/2: Positions the element to the right by 50%
          // h-56: Fixed height
          // overflow-visible: Allows overflow to be visible
          // w-[30rem]: Fixed width
          // bg-gradient-conic from-neutral-500 via-transparent to-transparent: Conic gradient background
          // text-white: White text color (not used here but may affect child elements)
          // [--conic-position:from_70deg_at_center_top]: Sets the custom property for gradient
        >
          {/* Overlay for Gradient Shape - Bottom */}
          <div className="absolute w-[100%] left-0 bg-neutral-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          {/* 
            Tailwind CSS Classes:
            - absolute: Position absolutely within the parent
            - w-[100%] left-0: Full width, aligned to the left
            - bg-neutral-950 h-40 bottom-0: Background color, fixed height, aligned to bottom
            - z-20: Z-index to position above other elements
            - [mask-image:linear-gradient(to_top,white,transparent)]: Masks the top part with a gradient
          */}

          {/* Overlay for Gradient Shape - Left */}
          <div className="absolute w-40 h-[100%] left-0 bg-neutral-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          {/* 
            Tailwind CSS Classes:
            - absolute: Position absolutely within the parent
            - w-40 h-[100%]: Fixed width and full height
            - left-0 bottom-0: Aligned to the left and bottom
            - bg-neutral-950: Background color
            - z-20: Z-index to position above other elements
            - [mask-image:linear-gradient(to_right,white,transparent)]: Masks the right part with a gradient
          */}
        </motion.div>

        {/* Second Animated Conic Gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }} // Initial state: semi-transparent and narrower
          whileInView={{ opacity: 1, width: "30rem" }} // When in view: fully opaque and wider
          transition={{
            delay: 0.3, // Delay before the animation starts
            duration: 0.8, // Duration of the animation
            ease: "easeInOut", // Easing function for smooth transition
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            // Uses CSS custom properties for dynamic gradient positioning
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-neutral-500 text-white [--conic-position:from_290deg_at_center_top]"
          // Tailwind CSS Classes:
          // absolute: Position absolutely within the parent
          // inset-auto left-1/2: Positions the element to the left by 50%
          // h-56: Fixed height
          // w-[30rem]: Fixed width
          // bg-gradient-conic from-transparent via-transparent to-neutral-500: Conic gradient background
          // text-white: White text color (not used here but may affect child elements)
          // [--conic-position:from_290deg_at_center_top]: Sets the custom property for gradient
        >
          {/* Overlay for Gradient Shape - Right */}
          <div className="absolute w-40 h-[100%] right-0 bg-neutral-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          {/* 
            Tailwind CSS Classes:
            - absolute: Position absolutely within the parent
            - w-40 h-[100%]: Fixed width and full height
            - right-0 bottom-0: Aligned to the right and bottom
            - bg-neutral-950: Background color
            - z-20: Z-index to position above other elements
            - [mask-image:linear-gradient(to_left,white,transparent)]: Masks the left part with a gradient
          */}

          {/* Overlay for Gradient Shape - Bottom */}
          <div className="absolute w-[100%] right-0 bg-neutral-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          {/* 
            Tailwind CSS Classes:
            - absolute: Position absolutely within the parent
            - w-[100%] right-0: Full width, aligned to the right
            - bg-neutral-950 h-40 bottom-0: Background color, fixed height, aligned to bottom
            - z-20: Z-index to position above other elements
            - [mask-image:linear-gradient(to_top,white,transparent)]: Masks the top part with a gradient
          */}
        </motion.div>

        {/* Blurred Background Element */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-neutral-950 blur-2xl"></div>
        {/* 
          Tailwind CSS Classes:
          - absolute top-1/2: Positioned at 50% from the top
          - h-48 w-full: Fixed height and full width
          - translate-y-12: Shifts down by 3rem (48px)
          - scale-x-150: Scales width by 150%
          - bg-neutral-950: Background color
          - blur-2xl: Applies a large blur
        */}

        {/* Semi-Transparent Overlay with Backdrop Blur */}
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        {/* 
          Tailwind CSS Classes:
          - absolute top-1/2: Positioned at 50% from the top
          - z-50: High z-index to be above other elements
          - h-48 w-full: Fixed height and full width
          - bg-transparent: Transparent background
          - opacity-10: 10% opacity
          - backdrop-blur-md: Applies medium blur to the backdrop
        */}

        {/* Circular Blurred Element */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-neutral-500 opacity-50 blur-3xl"></div>
        {/* 
          Tailwind CSS Classes:
          - absolute inset-auto: Positioned absolutely with automatic insets
          - z-50: High z-index to be above other elements
          - h-36 w-[28rem]: Fixed height and width
          - -translate-y-1/2: Shifts up by 50% of its height
          - rounded-full: Fully rounded borders (circle)
          - bg-neutral-500: Background color
          - opacity-50: 50% opacity
          - blur-3xl: Applies an extra large blur
        */}

        {/* Animated Circular Element */}
        <motion.div
          initial={{ width: "8rem" }} // Initial width
          whileInView={{ width: "16rem" }} // Width when in view
          transition={{
            delay: 0.3, // Delay before the animation starts
            duration: 0.8, // Duration of the animation
            ease: "easeInOut", // Easing function for smooth transition
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-neutral-400 blur-2xl"
          // Tailwind CSS Classes:
          // absolute inset-auto: Positioned absolutely with automatic insets
          // z-30: Z-index to position above some elements
          // h-36 w-64: Fixed height and width
          // -translate-y-[6rem]: Shifts up by 6rem (96px)
          // rounded-full: Fully rounded borders (circle)
          // bg-neutral-400: Background color
          // blur-2xl: Applies a large blur
        ></motion.div>

        {/* Animated Horizontal Line */}
        <motion.div
          initial={{ width: "15rem" }} // Initial width
          whileInView={{ width: "30rem" }} // Width when in view
          transition={{
            delay: 0.3, // Delay before the animation starts
            duration: 0.8, // Duration of the animation
            ease: "easeInOut", // Easing function for smooth transition
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-neutral-400 "
          // Tailwind CSS Classes:
          // absolute inset-auto: Positioned absolutely with automatic insets
          // z-50: High z-index to be above other elements
          // h-0.5: Very thin height (2px)
          // w-[30rem]: Fixed width
          // -translate-y-[7rem]: Shifts up by 7rem (112px)
          // bg-neutral-400: Background color
        ></motion.div>

        {/* Sparkles or Particle Effect */}
        <div className="w-[40rem] h-40 relative">
          <SparklesCore
            background="transparent" // Transparent background for particles
            minSize={0.4} // Minimum size of particles
            maxSize={1} // Maximum size of particles
            particleDensity={1200} // Density of particles
            className="w-full h-full" // Full width and height
            particleColor="#FFFFFF" // White color for particles
          />
        </div>

        {/* Overlay to Darken the Bottom */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-neutral-950 "></div>
        {/* 
          Tailwind CSS Classes:
          - absolute inset-auto: Positioned absolutely with automatic insets
          - z-40: Z-index to position above other elements
          - h-44 w-full: Fixed height and full width
          - -translate-y-[12.5rem]: Shifts up by 12.5rem (200px)
          - bg-neutral-950: Background color
        */}
      </div>

      {/* Content Area */}
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
        {/* 
          Tailwind CSS Classes:
          - relative z-50: Positioned relatively with high z-index
          - flex flex-col: Flexbox layout with column direction
          - -translate-y-80: Shifts up by 20rem (320px)
          - items-center: Centers items horizontally
          - px-5: Horizontal padding
        */}
      </div>
    </div>
  );
};
