"use client"; // Indicates that this is a client-side component in Next.js

import { cn } from "@/lib/utils"; // Utility function for conditional class names
import Image from "next/image"; // Next.js optimized Image component
import React, { useEffect, useState } from "react";

// InfiniteMovingCards Component
// Creates an infinitely scrolling horizontal carousel of images
export const InfiniteMovingCards = ({
  items,
  direction = "left", // Scroll direction: 'left' or 'right'
  speed = "fast", // Scroll speed: 'fast', 'normal', 'slow'
  pauseOnHover = true, // Pause scrolling when hovered
  className, // Additional CSS classes for customization
}: {
  items: {
    href: string; // Image source URL
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  // References to DOM elements
  const containerRef = React.useRef<HTMLDivElement>(null); // Reference to the main container
  const scrollerRef = React.useRef<HTMLUListElement>(null); // Reference to the scroller list

  // State to trigger animation start after duplication
  const [start, setStart] = useState(false);

  // useEffect to initialize animation on component mount
  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once

  // Function to duplicate list items for infinite scrolling and set animation properties
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children); // Original list items

      // Duplicate each list item and append to the scroller
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true); // Clone the node
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem); // Append cloned node
        }
      });

      // Set animation direction and speed based on props
      getDirection();
      getSpeed();

      // Trigger animation start by updating state
      setStart(true);
    }
  }

  // Function to set the animation direction using CSS custom properties
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        // Scroll forwards (to the left)
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        // Scroll in reverse (to the right)
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  // Function to set the animation speed using CSS custom properties
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s"); // Fast speed
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s"); // Normal speed
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s"); // Slow speed
      }
    }
  };

  //   console.log(items) // Debugging: Log the items array

  return (
    <div
      ref={containerRef} // Attach ref to the main container
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]", // Base classes with gradient mask
        className // Additional custom classes
      )}
    >
      <ul
        ref={scrollerRef} // Attach ref to the scroller list
        className={cn(
          "flex min-w-full shrink-0 gap-10 py-4 w-max flex-nowrap", // Flex layout for horizontal scrolling
          start && "animate-scroll", // Apply animation class when start is true
          pauseOnHover && "hover:[animation-play-state:paused]" // Pause animation on hover if enabled
        )}
      >
        {items.map((item) => (
          <Image
            width={170} // Set image width
            height={1} // Set image height (possibly using 'fill' instead for responsive)
            src={item.href} // Image source
            alt={item.href} // Alt text for accessibility
            className="relative rounded-2xl object-contain opacity-50" // Image styling classes
            key={item.href} // Unique key for list rendering
          />
        ))}
      </ul>
    </div>
  );
};
