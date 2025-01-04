"use client"; // Indicates that this is a client-side component in Next.js

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion"; // For animation effects
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import Particles, { initParticlesEngine } from "@tsparticles/react"; // tsparticles React integration
import type { Container, Engine } from "@tsparticles/engine"; // Types for tsparticles
import { loadSlim } from "@tsparticles/slim"; // tsparticles slim engine for optimized performance

// Define the props for SparklesCore component
type ParticlesProps = {
  id?: string; // Optional ID for the particles container
  className?: string; // Optional additional CSS classes
  background?: string; // Background color for the particles canvas
  particleSize?: number; // Base size for particles (currently unused)
  minSize?: number; // Minimum size for particles
  maxSize?: number; // Maximum size for particles
  speed?: number; // Speed of particle movement
  particleColor?: string; // Color of the particles
  particleDensity?: number; // Number of particles to render
};

// SparklesCore Component
// Renders a customizable particle effect using tsparticles and animates its appearance using Framer Motion
export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  // State to track if tsparticles engine has been initialized
  const [init, setInit] = useState(false);

  // Initialize the tsparticles engine on component mount
  useEffect(() => {
    // Initialize tsparticles with the slim engine
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine); // Load the slim version for better performance
    }).then(() => {
      setInit(true); // Set initialization flag to true once done
    });
  }, []);

  // Framer Motion's animation controls
  const controls = useAnimation();

  // Callback when particles are loaded
  const particlesLoaded = async (container?: Container) => {
    if (container) {
      console.log(container); // Log the particles container for debugging purposes
      // Start the opacity animation to fade in the particles
      controls.start({
        opacity: 1, // Animate opacity to 1
        transition: {
          duration: 1, // Animation duration of 1 second
        },
      });
    }
  };

  return (
    // Motion div to control the opacity animation
    <motion.div
      animate={controls} // Connects to Framer Motion's animation controls
      className={cn("opacity-0", className)} // Initial opacity set to 0, with optional additional classes
    >
      {/* Render Particles only after initialization is complete */}
      {init && (
        <Particles
          id={id || "tsparticles"} // Assigns an ID to the particles container, defaults to 'tsparticles'
          className={cn("h-full w-full")} // Sets the container to full height and width
          particlesLoaded={particlesLoaded} // Callback when particles are loaded
          options={{
            // Background configuration
            background: {
              color: {
                value: background || "#0d47a1", // Sets the background color, defaults to a shade of blue
              },
            },
            // Full-screen mode settings
            fullScreen: {
              enable: false, // Disables full-screen particles
              zIndex: 1, // z-index when full-screen is enabled
            },
            fpsLimit: 120, // Limits the frame rate to 120 FPS for performance
            interactivity: {
              events: {
                onClick: {
                  enable: true, // Enables interaction on click
                  mode: "push", // Adds particles on click
                },
                onHover: {
                  enable: false, // Disables interaction on hover
                  mode: "repulse",
                },
                resize: true as any, // Enables particles to adjust on window resize
              },
              modes: {
                push: {
                  quantity: 4, // Number of particles added per click
                },
                repulse: {
                  distance: 200, // Distance for repulsion effect
                  duration: 0.4, // Duration of repulsion
                },
              },
            },
            particles: {
              // Bounce behavior
              bounce: {
                horizontal: {
                  value: 1, // Full bounce on horizontal axis
                },
                vertical: {
                  value: 1, // Full bounce on vertical axis
                },
              },
              // Collision behavior
              collisions: {
                absorb: {
                  speed: 2,
                },
                bounce: {
                  horizontal: {
                    value: 1,
                  },
                  vertical: {
                    value: 1,
                  },
                },
                enable: false, // Disables collision detection between particles
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              // Particle color configuration
              color: {
                value: particleColor || "#ffffff", // Sets particle color, defaults to white
                animation: {
                  h: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  s: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  l: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                },
              },
              // Additional particle effects (currently minimal)
              effect: {
                close: true,
                fill: true,
                options: {},
                type: {} as any,
              },
              groups: {}, // Defines groups for particles, can be used for complex behaviors
              // Particle movement configuration
              move: {
                angle: {
                  offset: 0,
                  value: 90, // Movement angle in degrees
                },
                attract: {
                  distance: 200,
                  enable: false, // Disables attraction behavior
                  rotate: {
                    x: 3000,
                    y: 3000,
                  },
                },
                center: {
                  x: 50,
                  y: 50,
                  mode: "percent", // Centers based on percentage
                  radius: 0,
                },
                decay: 0, // No decay in speed
                distance: {}, // No specific distance configuration
                direction: "none", // No fixed direction
                drift: 0, // No drift
                enable: true, // Enables movement
                gravity: {
                  acceleration: 9.81, // Gravity acceleration
                  enable: false, // Disables gravity
                  inverse: false,
                  maxSpeed: 50,
                },
                path: {
                  clamp: true,
                  delay: {
                    value: 0,
                  },
                  enable: false, // Disables path following
                  options: {},
                },
                outModes: {
                  default: "out", // Particles move out of the canvas when reaching the edge
                },
                random: false, // No random movement
                size: false, // Particle size does not affect movement
                speed: {
                  min: 0.1,
                  max: 1, // Speed range for particle movement
                },
                spin: {
                  acceleration: 0,
                  enable: false, // Disables spin
                },
                straight: false, // Particles move in curved paths
                trail: {
                  enable: false, // Disables trails
                  length: 10,
                  fill: {},
                },
                vibrate: false, // Disables vibration
                warp: false, // Disables warp effect
              },
              // Number of particles
              number: {
                density: {
                  enable: true, // Enables density-based number adjustment
                  width: 400,
                  height: 400,
                },
                limit: {
                  mode: "delete",
                  value: 0,
                },
                value: particleDensity || 120, // Number of particles, defaults to 120
              },
              // Opacity settings
              opacity: {
                value: {
                  min: 0.1,
                  max: 1,
                },
                animation: {
                  count: 0,
                  enable: true, // Enables opacity animation
                  speed: speed || 4, // Speed of opacity animation, defaults to 4
                  decay: 0,
                  delay: 2, // Delay before starting the animation
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              reduceDuplicates: false, // Disables reducing duplicate particles
              // Shadow settings (currently disabled)
              shadow: {
                blur: 0,
                color: {
                  value: "#000",
                },
                enable: false,
                offset: {
                  x: 0,
                  y: 0,
                },
              },
              // Shape of particles
              shape: {
                close: true,
                fill: true,
                options: {},
                type: "circle", // Shape type (circle)
              },
              // Size of particles
              size: {
                value: {
                  min: minSize || 1, // Minimum size, defaults to 1
                  max: maxSize || 3, // Maximum size, defaults to 3
                },
                animation: {
                  count: 0,
                  enable: false, // Disables size animation
                  speed: 5,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              stroke: {
                width: 0, // No stroke
              },
              // Z-index of particles
              zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
              // Destruction settings (currently none)
              destroy: {
                bounds: {},
                mode: "none", // Disables destruction
                split: {
                  count: 1,
                  factor: {
                    value: 3,
                  },
                  rate: {
                    value: {
                      min: 4,
                      max: 9,
                    },
                  },
                  sizeOffset: true,
                },
              },
              // Rolling behavior (currently disabled)
              roll: {
                darken: {
                  enable: false,
                  value: 0,
                },
                enable: false,
                enlighten: {
                  enable: false,
                  value: 0,
                },
                mode: "vertical",
                speed: 25,
              },
              // Tilt settings (currently disabled)
              tilt: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                enable: false,
              },
              // Twinkle settings (currently disabled)
              twinkle: {
                lines: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
                particles: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
              // Wobble settings (currently disabled)
              wobble: {
                distance: 5,
                enable: false,
                speed: {
                  angle: 50,
                  move: 10,
                },
              },
              // Life cycle settings (currently no life cycle)
              life: {
                count: 0,
                delay: {
                  value: 0,
                  sync: false,
                },
                duration: {
                  value: 0,
                  sync: false,
                },
              },
              // Rotation settings (currently disabled)
              rotate: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                path: false,
              },
              // Orbit settings (currently disabled)
              orbit: {
                animation: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: false,
                },
                enable: false,
                opacity: 1,
                rotation: {
                  value: 45,
                },
                width: 1,
              },
              // Links between particles (currently disabled)
              links: {
                blink: false,
                color: {
                  value: "#fff",
                },
                consent: false,
                distance: 100,
                enable: false, // Disables links between particles
                frequency: 1,
                opacity: 1,
                shadow: {
                  blur: 5,
                  color: {
                    value: "#000",
                  },
                  enable: false,
                },
                triangles: {
                  enable: false,
                  frequency: 1,
                },
                width: 1,
                warp: false,
              },
              // Repulse settings (currently disabled)
              repulse: {
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1,
              },
            },
            detectRetina: true, // Enhances visual quality on retina displays
          }}
        />
      )}
    </motion.div>
  );
};
