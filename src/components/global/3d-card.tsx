"use client"; // Indicates that this is a client-side component in Next.js

import { cn } from "@/lib/utils"; // Utility function for conditional class names
import Image from "next/image"; // Next.js optimized Image component
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

// Create a Context to manage mouse enter state
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

// CardContainer Component
// Handles mouse events to create a 3D rotation effect on its children
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref to access the container DOM element
  const [isMouseEntered, setIsMouseEntered] = useState(false); // State to track if mouse is over the container

  // Handler for mouse movement within the container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return; // Exit if ref is not assigned
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect(); // Get container's position and size
    // Calculate the rotation angles based on mouse position relative to container's center
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    // Apply CSS transform to rotate the container in 3D space
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  // Handler for mouse entering the container
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true); // Update state to indicate mouse has entered
    // Additional logic can be added here if needed when mouse enters
  };

  // Handler for mouse leaving the container
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return; // Exit if ref is not assigned
    setIsMouseEntered(false); // Update state to indicate mouse has left
    // Reset CSS transform to default when mouse leaves
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    // Provide the mouse enter state and updater function to child components
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      {/* Outer div to center the card and apply perspective for 3D effect */}
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px", // Sets the perspective for 3D transformations
        }}
      >
        {/* Inner div that will be rotated based on mouse movements */}
        <div
          ref={containerRef} // Attach ref to access the DOM element
          onMouseEnter={handleMouseEnter} // Attach mouse enter event handler
          onMouseMove={handleMouseMove} // Attach mouse move event handler
          onMouseLeave={handleMouseLeave} // Attach mouse leave event handler
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d", // Preserves 3D transformations for child elements
          }}
        >
          {children} {/* Render child components */}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// CardBody Component
// A sub-container that maintains 3D transform styles for its child elements
export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
      // Tailwind CSS Classes:
      // h-96 w-96: Fixed height and width (24rem each)
      // [transform-style:preserve-3d]: Ensures child elements maintain their 3D position
      // [&>*]:[transform-style:preserve-3d]: Applies the same transform style to all direct child elements
    >
      {children} {/* Render child components */}
    </div>
  );
};

// CardItem Component
// Represents individual items within the card that can be animated
export const CardItem = ({
  as: Tag = "div", // Allows rendering as a different HTML tag
  children,
  className,
  translateX = 0, // Translation along X-axis when mouse is over
  translateY = 0, // Translation along Y-axis when mouse is over
  translateZ = 0, // Translation along Z-axis when mouse is over
  rotateX = 0, // Rotation around X-axis when mouse is over
  rotateY = 0, // Rotation around Y-axis when mouse is over
  rotateZ = 0, // Rotation around Z-axis when mouse is over
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}) => {
  const ref = useRef<HTMLDivElement>(null); // Ref to access the DOM element
  const [isMouseEntered] = useMouseEnter(); // Access mouse enter state from context

  // Effect to handle animations when mouse enters or leaves
  useEffect(() => {
    handleAnimations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseEntered]); // Re-run when `isMouseEntered` changes

  // Function to apply or reset CSS transforms based on mouse state
  const handleAnimations = () => {
    if (!ref.current) return; // Exit if ref is not assigned
    if (isMouseEntered) {
      // Apply translations and rotations when mouse is over
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      // Reset transformations when mouse leaves
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    // Render the component as the specified Tag (default 'div')
    <Tag
      ref={ref} // Attach ref to access the DOM element
      className={cn("w-fit transition duration-200 ease-linear", className)}
      // Tailwind CSS Classes:
      // w-fit: Width fits the content
      // transition duration-200 ease-linear: Smooth transition for transformations
      {...rest} // Spread any additional props
    >
      {children} {/* Render child components */}
    </Tag>
  );
};

// Custom Hook: useMouseEnter
// Provides access to the mouse enter state from the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext); // Access the context
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider"); // Error if hook is used outside of provider
  }
  return context; // Return the context value
};
