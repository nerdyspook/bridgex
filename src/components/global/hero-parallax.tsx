"use client"; // Indicates that this is a client-side component in Next.js

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion"; // Framer Motion for animations
import Image from "next/image"; // Next.js optimized Image component
import Link from "next/link"; // Next.js Link component for client-side transitions

// HeroParallax Component
// Creates a parallax scrolling effect with multiple rows of product cards
export const HeroParallax = ({
  products,
}: {
  products: {
    title: string; // Product title
    link: string; // URL to the product page
    thumbnail: string; // Image URL for the product
  }[];
}) => {
  // Divide the products into three rows for display
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  // Reference to the main container to track scroll
  const ref = React.useRef(null);

  // useScroll hook to get scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: ref, // Element to track
    offset: ["start start", "end start"], // Defines when the scroll starts and ends
  });

  // Spring animation configuration for smoother transitions
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Transformations based on scroll progress
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  ); // Translates along X-axis from 0 to 1000 pixels

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  ); // Translates along X-axis in reverse

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  ); // Rotates along X-axis from 15deg to 0deg

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  ); // Changes opacity from 0.2 to 1

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  ); // Rotates along Z-axis from 20deg to 0deg

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  ); // Translates along Y-axis from -700 to 500 pixels

  return (
    <div
      ref={ref} // Attach ref to monitor scroll
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      // Tailwind CSS classes:
      // h-[300vh]: Height set to 300% of the viewport height for scrolling
      // py-40: Vertical padding
      // overflow-hidden: Hide overflowing content
      // antialiased: Smoother font rendering
      // relative: Positioning context
      // flex flex-col: Flexbox layout with column direction
      // [perspective:1000px]: CSS perspective for 3D transformations
      // [transform-style:preserve-3d]: Preserves 3D transformations of child elements
    >
      {/* Header Section */}
      <Header />

      {/* Animated Container for Product Rows */}
      <motion.div
        style={{
          rotateX, // Apply rotation along X-axis
          rotateZ, // Apply rotation along Z-axis
          translateY, // Apply vertical translation
          opacity, // Apply opacity change
        }}
        className=""
      >
        {/* First Row of Product Cards */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX} // Apply horizontal translation
              key={product.title} // Unique key for list rendering
            />
          ))}
        </motion.div>

        {/* Second Row of Product Cards */}
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse} // Apply reverse horizontal translation
              key={product.title}
            />
          ))}
        </motion.div>

        {/* Third Row of Product Cards */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX} // Apply horizontal translation
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Header Component
// Displays the main heading and descriptive text
export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Transform Your Business with <br /> Our Automation Solutions
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Streamline your workflows and boost productivity with our cutting-edge
        SaaS automation tools. Our team of experts is dedicated to building
        seamless and efficient solutions tailored to your business needs.
      </p>
    </div>
  );
};

// ProductCard Component
// Represents individual product items with image, title, and link
export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string; // Product title
    link: string; // URL to the product page
    thumbnail: string; // Image URL for the product
  };
  translate: MotionValue<number>; // Motion value for horizontal translation
}) => {
  return (
    <motion.div
      style={{
        x: translate, // Apply horizontal translation
      }}
      whileHover={{
        y: -20, // Lift the card on hover
      }}
      key={product.title} // Unique key for list rendering
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
      // Tailwind CSS classes:
      // group/product: Defines a group for nested hover states
      // h-96: Fixed height
      // w-[30rem]: Fixed width
      // relative: Positioning context
      // flex-shrink-0: Prevents the card from shrinking
    >
      {/* Link to the product page */}
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
        // Tailwind CSS classes:
        // block: Display block
        // group-hover/product:shadow-2xl: Apply shadow on hover
      >
        {/* Product Image */}
        <Image
          src={product.thumbnail} // Image source URL
          height="600" // Image height
          width="600" // Image width
          className="object-cover object-left-top absolute h-full w-full inset-0"
          // Tailwind CSS classes:
          // object-cover: Cover the container while maintaining aspect ratio
          // object-left-top: Align image to the top-left
          // absolute: Position absolutely within the relative parent
          // h-full w-full: Fill the parent container
          // inset-0: Top, right, bottom, left set to 0
          alt={product.title} // Alt text for accessibility
        />
      </Link>

      {/* Overlay for Hover Effect */}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none">
        {/* 
          Tailwind CSS classes:
          - absolute inset-0: Position the overlay to cover the entire card
          - h-full w-full: Full height and width
          - opacity-0: Initially transparent
          - group-hover/product:opacity-80: Become semi-transparent black on hover
          - bg-black: Black background
          - pointer-events-none: Allows clicks to pass through
        */}
      </div>

      {/* Product Title */}
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
        {/* 
          Tailwind CSS classes:
          - absolute bottom-4 left-4: Position at the bottom-left with some offset
          - opacity-0: Initially transparent
          - group-hover/product:opacity-100: Fully opaque on hover
          - text-white: White text color
        */}
      </h2>
    </motion.div>
  );
};
