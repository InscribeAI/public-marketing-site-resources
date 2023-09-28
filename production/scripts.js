// document.addEventListener('DOMContentLoaded', function() {

//   const target = document.querySelector('.i_statssection');

//   // Exit if the target doesn't exist
//   if (!target) return;


//   const startStats = (section) => {
//     setTimeout(() => {
//       section.querySelector('.i_statsblock').classList.add('start');
//     }, 100);

//     const elems = section.querySelectorAll('.i_statsblock__stat__number');

//     elems.forEach((elem, i) => {
//       elem.innerHTML = '$0m+';
//       setTimeout(() => {
//         if (elem) {
//           let count = 0;
          
//           const interval = setInterval(() => {
//             count++;
//             elem.innerHTML = `$${count}m+`;
            
//             if (count >= 100) {
//               clearInterval(interval);
//             }
//           }, 22); // Adjust this duration to make the count-up faster or slower
//         }
//       }, 550 * i);
//     });
//   }

//   // Create an Intersection Observer
//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
//         // If the element is intersecting and at least 50% is visible
//         startStats(entry.target);
//         console.log(entry.target);
//         observer.unobserve(entry.target);  // Stop observing since our condition has been met
//       }
//     });
//   }, {
//     root: null,  // use the viewport as the root
//     rootMargin: '0px',
//     threshold: 0.5  // trigger the callback when 50% of the target is visible
//   });

//   // Start observing
//   observer.observe(target);
// });

document.addEventListener('DOMContentLoaded', () => {

  let sliderSettings = {};

  const goToSlide = (slider, slideNumber, userClick) => {
    const sliderNav = slider.querySelector('.i_testimonialslider__nav');
    const sliderNavItems = sliderNav.querySelectorAll('.i_testimonialslider__nav__item');
    const sliderItems = slider.querySelectorAll('.i_testimonialslider__item');
    const sliderBar = slider.querySelector('.i_testimonialslider__nav__bar__count');

    sliderNavItems.forEach((item, index) => {
      if(index === slideNumber) {
        item.classList.add('--active');
      } else {
        item.classList.remove('--active');
      }
    });

    sliderItems.forEach((item, index) => {

      if(item.classList.contains('i_testimonialslider__item__first')) {
        item.classList.remove('i_testimonialslider__item__first');
      }

      if(index === slideNumber) {
        item.classList.add('--active');
      } else {
        item.classList.remove('--active');
      }
    });

    sliderBar.classList.remove('--countdown');

    setTimeout(() => {
      sliderBar.classList.add('--countdown');
    }, 1000);

    // if( !userClick ) {
    // }

    if(userClick) {
      clearTimeout(sliderSettings.timeout);
      sliderSettings.timeout = setTimeout(() => {
        goToNextSlideTimeout();
      }, 5000);
      // sliderBar.classList.add('--userEngaged');
    }

  }

  const goToNextSlide = (slider) => {
    const sliderNav = slider.querySelector('.i_testimonialslider__nav');
    const sliderNavItems = sliderNav.querySelectorAll('.i_testimonialslider__nav__item');
    const sliderItems = slider.querySelectorAll('.i_testimonialslider__item');

    let activeSlide = 0;

    sliderNavItems.forEach((item, index) => {
      if(item.classList.contains('--active')) {
        activeSlide = index;
      }
    });

    if(activeSlide < sliderNavItems.length - 1) {
      goToSlide(slider, activeSlide + 1);
    } else {
      goToSlide(slider, 0);
    }
  }

  const goToNextSlideTimeout = () => {
    const slider = document.querySelector('.i_testimonialslider');
    goToNextSlide(slider);

    sliderSettings.timeout = setTimeout(() => {
      goToNextSlideTimeout();
    }, 5000);
  }

  setTimeout(() => {
    document.querySelector('.i_testimonialslider').querySelector('.i_testimonialslider__nav__bar__count').classList.add('--countdown');
  }, 1000);

  sliderSettings.timeout = setTimeout(() => {
    goToNextSlideTimeout();
  }, 5000);

  // Get the slider element
  const slider = document.querySelector('.i_testimonialslider');
  const sliderNav = document.querySelector('.i_testimonialslider__nav');
  
  if (slider && sliderNav) {
    // Get all the slides inside the slider
    const slides = slider.querySelectorAll('.i_testimonialslider__item');
    
    // clear the html inside the slider nav
    sliderNav.innerHTML = '';

    // Loop through each slide and add an item to the ul
    slides.forEach((slide, index) => {
      const navItem = document.createElement('div');
      navItem.classList.add('i_testimonialslider__nav__item');
      // navItem.textContent = `Item ${index + 1}`;
      if(index === 0) {
        navItem.classList.add('--active');
      }
      
      navItem.addEventListener('click', () => {     
        // Go to the slide
        goToSlide(slider, index, true);
      });

      sliderNav.appendChild(navItem);
      
    });
  }
});


// document.addEventListener('DOMContentLoaded', function () {
//   // Select all toggle buttons
//   const toggles = document.querySelectorAll('.i_togglelist__item__toggle');

//   toggles.forEach(function (toggle) {
//     toggle.addEventListener('click', function () {
//       // Get the parent .togglelist_item element
//       const parentItem = toggle.closest('.i_togglelist__item');

//       // Get the corresponding .togglelist_item_body and its content
//       const body = parentItem.querySelector('.i_togglelist__item__body');
//       const content = parentItem.querySelector('.i_togglelist__item__body__content');


//       // Toggle the --open class on the clicked .togglelist_item
//       parentItem.classList.toggle('--open');

//       if (parentItem.classList.contains('--open')) {
//         // Open the item
//         // Set the height to the content's height
//         body.style.height = `${content.scrollHeight}px`;

//         // After a delay, set the height to 'auto' for responsiveness
//         setTimeout(() => {
//           body.style.height = 'auto';
//         }, 300); // assuming the transition in your CSS takes 300ms
//       } else {
//         // Close the item
//         // First set the height to the current px value (in case it's 'auto')
//         body.style.height = `${body.scrollHeight}px`;
//         // Force repaint to ensure the next style change gets animated
//         body.offsetHeight; // no need to store this anywhere, the reference is enough
//         // Set the height back to zero
//         body.style.height = '0';
//       }
//     });
//   });

// });

// document.addEventListener('DOMContentLoaded', function () {
//   function changeSlide(targetLayer) {
//     const stack = document.querySelector('.i_restackingslider__stack');
//     const layers = Array.from(stack.querySelectorAll('.i_restackingslider__stack__layer'));
//     const contentLayers = Array.from(document.querySelectorAll('.i_restackingslider__content__layer'));
//     const navItems = Array.from(document.querySelectorAll('.i_restackingslider__nav__item'));
    
//     // Find the target layer based on the input
//     const target = layers.find(
//       layer => layer.classList.contains(`layerorder--${targetLayer}`)
//     );

//     if(target.classList.contains('--active')) {
//       return;
//     }
    
//     // Find the current active layer and add a --reset class to it
//     const activeLayer = layers.find(layer => layer.classList.contains('--active'));
//     activeLayer.classList.remove('--active');
    
    
//     // Create an array with the new order of layers, starting with the target layer
//     const targetIndex = layers.indexOf(target);
//     const newLayersOrder = layers.slice(targetIndex).concat(layers.slice(0, targetIndex));
    
//     // Re-assign classes to layers based on the new order
//     newLayersOrder.forEach((layer, index) => {
//       layer.className = `i_restackingslider__stack__layer i_restackingslider__stack__layer--${index + 1}`;
//     });

//     // Add back in layeroder--x
//     layers.forEach((layer, index) => {
//       layer.classList.add(`layerorder--${index + 1}`);
//     });

//     activeLayer.classList.add('--reset');

//     // Remove the active class from all i_restackingslider__content__layer
//     contentLayers.forEach(layer => {
//       layer.classList.remove('--active');
//     });

//     // Add the active class to the corresponding i_restackingslider__content__layer
//     contentLayers[targetLayer - 1].classList.add('--active');

//     // Remove the --active class from all nav items
//     navItems.forEach(item => {
//       item.classList.remove('--active');
//     });

//     // Add the --active class to the corresponding nav item
//     navItems[targetLayer - 1].classList.add('--active');

//     setTimeout(() => {
//       // Remove the --reset class from the previously active layer
//       activeLayer.classList.remove('--reset');
      
//       setTimeout(() => {
//         // The new active layer is now layer 1, so add --active class to it
//         newLayersOrder[0].classList.add('--active');
//       }, 500);
//     }, 500);
//   }

//   function moveToNextSlide() {
//     const stack = document.querySelector('.i_restackingslider__stack');
//     const layers = Array.from(stack.querySelectorAll('.i_restackingslider__stack__layer'));
    
//     // Find the current active layer
//     const activeLayer = layers.find(layer => layer.classList.contains('--active'));
    
//     // Get its layer number from its class
//     const activeLayerNum = parseInt(activeLayer.className.match(/layerorder--(\d+)/)[1], 10);

    
//     // Calculate the next layer number, and wrap around if necessary
//     const totalLayers = layers.length;
//     const nextLayerNum = (activeLayerNum % totalLayers) + 1;
    
//     // Call changeSlide function to switch to the next slide
//     changeSlide(nextLayerNum);
//   }

//   window.restacking__int = setInterval(() => {
//     moveToNextSlide();
//   }, 5000);

//   (() => {
//     const navItems = Array.from(document.querySelectorAll('.i_restackingslider__nav__item'));

//     navItems.forEach((navItem, index) => {
//       navItem.addEventListener('click', () => {
//         clearInterval(window.restacking__int);
//         changeSlide(index + 1);
//         // add UserEngaged class to parent slider
//         navItem.closest('.i_restackingslider').classList.add('--userEngaged');
//       });
//     });
//   })();
// });

// document.addEventListener('DOMContentLoaded', function () {
//   // Initialize variables
//   let cycleSlideInterval;
//   let userEngaged = false;

//   function goToCycleSlide(slideNum) {
//     // Clear interval if user engaged
//     if (userEngaged) {
//       clearInterval(cycleSlideInterval);
//     }

//     // Find and deactivate currently active slides and nav items
//     const activeSlide = document.querySelector('.i_cycleslider__list__item.--active');
//     const activeNavItem = document.querySelector('.i_cycleslider__nav__item.--active');
//     activeSlide.classList.remove('--active');
//     activeNavItem.classList.remove('--active');

//     // Activate the slide and nav item based on the given slide number
//     const targetSlide = document.querySelector(`.i_cycleslider__list__item:nth-child(${slideNum})`);
//     const targetNavItem = document.querySelector(`.i_cycleslider__nav__item:nth-child(${slideNum})`);
//     targetSlide.classList.add('--active');
//     targetNavItem.classList.add('--active');
//   }

//   function goToNextCycleSlide() {
//     const totalSlides = document.querySelectorAll('.i_cycleslider__list__item').length;
//     const activeSlide = document.querySelector('.i_cycleslider__list__item.--active');
//     const activeIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
//     const nextSlideNum = (activeIndex + 1) % totalSlides + 1;
//     goToCycleSlide(nextSlideNum);
//   }

//   // Attach click events to cycle list items and nav items
//   document.querySelectorAll('.i_cycleslider__list__item__box, .i_cycleslider__nav__item').forEach(item => {
//     item.addEventListener('click', function() {
//       const parentSlider = this.closest('.i_cycleslider');
//       parentSlider.classList.add('--userEngaged');
//       userEngaged = true;
//       const slideNum = Array.from(this.closest('.i_cycleslider__list, .i_cycleslider__nav').children).indexOf(this.closest('.i_cycleslider__list__item, .i_cycleslider__nav__item')) + 1;
//       goToCycleSlide(slideNum);
//     });
//   });

//   // Initialize cycle slide interval
//   cycleSlideInterval = setInterval(() => {
//     if (!userEngaged) {
//       goToNextCycleSlide();
//     }
//   }, 1500);

//   // To manually go to a specific slide, you can use goToCycleSlide function like so:
//   // goToCycleSlide(2);

// });

// document.addEventListener('DOMContentLoaded', function () {
//   let lastScrollTop = 0;
//   let lastTime = 0;
//   let speed = 0;
//   let rafId = null;

//   // Array to keep track of each block's current transform distance
//   let currentTransforms = [];

//   // Function to handle scroll
//   window.addEventListener('scroll', () => {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     const currentTime = Date.now();
    
//     // Calculate speed (distance over time)
//     speed = (scrollTop - lastScrollTop) / (currentTime - lastTime);
    
//     // Update for next time
//     lastScrollTop = scrollTop;
//     lastTime = currentTime;

//     // Call requestAnimationFrame for smooth animations
//     if (rafId === null) {
//       rafId = requestAnimationFrame(() => {
//         checkElementInViewport();
//         rafId = null;
//       });
//     }
//   });

//   // Function to check if element is in the viewport and handle block transformations
//   function checkElementInViewport() {
//     const element = document.querySelector('.i_ctasection');
//     const rect = element.getBoundingClientRect();
    
//     if (rect.top < window.innerHeight && rect.bottom > 0) {
//       // Element is in the viewport
//       const blocks = document.querySelectorAll('.i_ctasection__block--behind');
      
//       blocks.forEach((block, index) => {
//         // Initialize currentTransforms array if necessary
//         if (typeof currentTransforms[index] === 'undefined') {
//           currentTransforms[index] = 0;
//         }
        
//         // Calculate incremental distance based on speed
//         const incrementalDistance = (index + 1) * speed;
        
//         // Update the current transform distance for this block
//         currentTransforms[index] += incrementalDistance;

//         // Define min and max distances for this block
//         const maxDistance = index + 1;
//         const minDistance = -(index + 1);
        
//         // Apply limits
//         if (currentTransforms[index] > maxDistance) {
//           currentTransforms[index] = maxDistance;
//         } else if (currentTransforms[index] < minDistance) {
//           currentTransforms[index] = minDistance;
//         }
        
//         // Apply the new transform
//         block.style.transform = `translateY(${currentTransforms[index]}rem)`;
//       });
//     }
//   }


//   // Initial call
//   checkElementInViewport();





// });


// document.addEventListener('DOMContentLoaded', function () {
//   // Function to adjust sticky blocks
//   let ticking = false;
//   let observerTriggered = false;

//   function adjustStickyBlocks() {
//     if (observerTriggered) {
//       const stickyBlocks = document.querySelectorAll('.sticky .i_stackingblock__wrap');
//       const stickyList = document.querySelector('.i_slideupblocks__list');
//       const stickyListRect = stickyList.getBoundingClientRect();

//       stickyBlocks.forEach((block, index) => {
//         const rect = block.getBoundingClientRect();
//         let factor = (window.innerHeight - rect.top) / window.innerHeight;

//         // Calculate the remaining viewport size
//         const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
//         const multipliedFontSize = baseFontSize * 3;
//         const remainingViewportSize = window.innerHeight - multipliedFontSize;
//         const remainingViewportRatio = remainingViewportSize / window.innerHeight;

//         // Limit the factor to stop scaling once it reaches 3rem from the top
//         if (rect.top <= multipliedFontSize) {
//           factor = Math.max(factor, remainingViewportRatio);
//         }

//         // Parallax the mediaAsset slightly down
//         const parallaxOffset = 200 * factor;  // Adjust as needed
//         const mediaAsset = block.querySelector('.insert__clippedgraphic__media__asset');
//         if(mediaAsset) {
//           mediaAsset.style.transform = `translateY(-${parallaxOffset}px)`;
//         }

//         // Normalize and limit factor between 0 and 1
//         factor = Math.min(1, Math.max(0, (factor - 0.5) * 2));

//         // Additional scaling factor based on the position within the parent
//         const blockPositionInList = rect.top - stickyListRect.top;
//         const blockListFactor = blockPositionInList / stickyListRect.height;

//         // Combine the two scaling factors
//         const combinedFactor = factor * blockListFactor;

//         // Scale down the block as it reaches the top of the screen
//         let scale = 1 - combinedFactor * (0.2 - index * 0.03);  // Decreased by 0.02 for each subsequent block
//         scale = Math.max(0, scale); // Ensure scale doesn't go below 0.8 (or any other minimum you set)


//         // Ensuring that the effect doesn't start until the block has reached 50% of the viewport
//         // if (factor <= 0.5 ) return;
        
//         block.style.transform = `scale(${scale})`;
//       });
//     }
//     ticking = false;
//   }





//   // Intersection Observer to detect when i_slideupblocks is visible
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         observerTriggered = true;
//       } else {
//         observerTriggered = false;
//       }
//     });
//   });

//   observer.observe(document.querySelector('.i_slideupblocks'));

//   // Function to call on scroll
//   function onScroll() {
//     if (!ticking) {
//       window.requestAnimationFrame(adjustStickyBlocks);
//       ticking = true;
//     }
//   }

//   // Listen to scroll event
//   window.addEventListener('scroll', onScroll);

// });