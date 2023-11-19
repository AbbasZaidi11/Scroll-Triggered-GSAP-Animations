gsap.registerPlugin(ScrollTrigger);

// Function to set up animations for a section
const setupSectionAnimations = (
  sectionLeft,
  sectionRight,
  sectionText,
  progressSVG
) => {
  gsap.from(sectionLeft, {
    opacity: 0,
    x: -100,
    duration: 1.5,
    scrollTrigger: {
      trigger: sectionLeft,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse", // Added "reverse" for reverse animation
    },
  });

  gsap.from(sectionText, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: sectionText,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse", // Added "reverse" for reverse animation
    },
  });

  // Update your SVG progress animation here using GSAP and ScrollTrigger
  // Example:
  gsap.fromTo(
    progressSVG,
    {
      width: "0%",
    },
    {
      width: "100%",
      duration: 1,
      scrollTrigger: {
        trigger: sectionLeft,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    }
  );

  // Staggered animation for images in the right section
  const images = gsap.utils.toArray(`${sectionRight} img`);

  gsap.from(images, {
    opacity: 0,
    y: (index) => (index % 2 === 0 ? -100 : 100),
    duration: 1,
    scrollTrigger: {
      trigger: sectionRight,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse", // Added "reverse" for reverse animation
    },
  });
};

// Call the setupSectionAnimations function for each section
["1", "2", "3", "4", "5", "6", "7"].forEach((section) => {
  setupSectionAnimations(
    `.scroll-${section}-left`,
    `.scroll-${section}-right`,
    `.scroll-${section}-text`,
    `#progress-svg-${section}`
  );
});

// Set up animation for the main SVG progress bar
gsap.fromTo(
  "#transrg", // Replace with the actual id of your SVG
  { scaleX: 0 }, // Initial state
  {
    scaleX: 1, // Final state
    transformOrigin: "left center", // Scale from the left side
    ease: "none", // Linear scaling
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Adjust as needed for smooth scrolling
    },
  }
);

const roots = document.querySelectorAll(".root");

// Iterate through each root element
roots.forEach((root, index) => {
  // Get the corresponding left scroll div
  const leftScrollDiv = root.querySelector(`.scroll-${index + 1}-left`);

  // Get the corresponding scroller SVG
  const scroller = root.querySelector(`#scroller-${index + 1} svg`);

  // Get the computed background color of the left scroll div
  const bgColor = window
    .getComputedStyle(leftScrollDiv)
    .getPropertyValue("background-color");

  // Set the background color of the SVG
  scroller.style.backgroundColor = bgColor;
});

// Additional animation for the main SVG progress bar
gsap.from("#transrg", { opacity: 0, duration: 2 });
