console.log('version', 'v1.0.195');

document.addEventListener('DOMContentLoaded', function() {

	function adjustSlideUpBlocks(_list) {

		// verify that list is a NodeList
		if (_list && !_list.forEach) {
			_list = [_list];
		}

		// Get a NodeList of all elements with class 'i_slideupblocks__list'
		const slideupLists = _list || document.querySelectorAll('.i_slideupblocks__list');

		slideupLists.forEach(function(list) {
			// Find the tallest block within the list
			const blocks = list.querySelectorAll('.i_slideupblock');
			let maxHeight = 0;
			let stickyTop = 0;

			blocks.forEach(function(block) {

				const blockHeight = block.offsetHeight;

				// Retrieve the top position of the parent .sticky class

				if( stickyTop === 0 ) {
					const stickyParent = block.closest('.sticky');
					stickyTop = parseFloat(window.getComputedStyle(stickyParent).top);
				}

				if (blockHeight > maxHeight) {
					maxHeight = blockHeight;
				}
			});

			const viewportHeight = window.innerHeight;
			const spaceNeeded = stickyTop + maxHeight;

			if (spaceNeeded > viewportHeight) {
					list.classList.add('i_slideupblocks__list__unstuck');
			} else {
					list.classList.remove('i_slideupblocks__list__unstuck');
			}
		});
	}

	// // Run the function once on page load
	if (window.innerWidth > 991) {
			adjustSlideUpBlocks();
	}

	// // Attach a resize event listener to the window
	window.addEventListener('resize', function() {
			if (window.innerWidth > 991) {
					adjustSlideUpBlocks();
			} else {
					// If the viewport width is 991px or below, remove adjustments
					const slideupLists = document.querySelectorAll('.i_slideupblocks__list');
					slideupLists.forEach(function(list) {
							list.classList.remove('i_slideupblocks__list__unstuck'); // Remove the class
					});
			}
	});

	// function adjustSlideUpBlocks(list) {

	// 		console.log('running adjust slideup');

	// 		// verify that list is a NodeList
	// 		if (list && !list.forEach) {
	// 			list = [list];
	// 		}


	// 		// Get a NodeList of all elements with class 'i_slideupblocks__list'
	// 		const slideupLists = list || document.querySelectorAll('.i_slideupblocks__list');

	// 		slideupLists.forEach(function(list) {
	// 			let maxHeight = 0;
	// 			let stickyTop = 0;

	// 			// check to see if this list has any images
	// 			const images = list.querySelectorAll('img');
	// 			const hasImages = images.length > 0;
	// 			let allLoaded = true;

	// 			// if there are images, check to see if they are all loaded
	// 			if (hasImages) {
	// 				images.forEach(function(img) {
	// 					if (!img.complete) {
	// 						allLoaded = false;
	// 					}
	// 				});

	// 				// if they are not all loaded, wait until they are
	// 				if (!allLoaded) {
	// 					// console.log('not all loaded');
	// 					return;
	// 				}
	// 			}
					
				
	// 			// Find the tallest block within the list
	// 			const blocks = list.querySelectorAll('.i_slideupblock');
	// 			blocks.forEach(function(block) {

	// 				// check to see if the block has a height set
	// 				if (block.style.height) {
	// 					block.style.height = '';
	// 				}

	// 				const blockHeight = block.offsetHeight;

	// 				// Retrieve the top position of the parent .sticky class
	// 				const stickyParent = block.closest('.sticky');
	// 				stickyTop = parseFloat(window.getComputedStyle(stickyParent).top);

	// 				if (blockHeight > maxHeight) {
	// 					maxHeight = blockHeight;
	// 				}
	// 			});

	// 			// Set all blocks within the list to the maxHeight
	// 			blocks.forEach(function(block) {
	// 					block.style.height = `${maxHeight}px`;
	// 			});

	// 			const viewportHeight = window.innerHeight;

	// 			if (stickyTop + maxHeight > viewportHeight) {
	// 					list.classList.add('i_slideupblocks__list__unstuck');
	// 			} else {
	// 					list.classList.remove('i_slideupblocks__list__unstuck');
	// 			}
	// 		});
	// }

	// // Run the function once on page load
	// if (window.innerWidth > 991) {
	// 		adjustSlideUpBlocks();
	// }

	// const images = document.querySelectorAll('.i_slideupblock img[loading="lazy"]');
	
	// 	images.forEach(img => {
	// 		if (img.complete) {
	// 			// If the image is already loaded (e.g., cached), set heights immediately
	// 			// console.log(img.complete);
	// 			adjustSlideUpBlocks();
	// 		} else {
	// 			// Otherwise, set the height after the image has loaded
	// 			img.addEventListener('load', () => {
	// 				adjustSlideUpBlocks();
	// 			});
	// 		}
	// 	});
	
	// 	// Also call setEqualHeights initially in case images are not lazy-loaded
	// 	adjustSlideUpBlocks();

	// // Attach a resize event listener to the window
	// window.addEventListener('resize', function() {
	// 		if (window.innerWidth > 991) {
	// 				adjustSlideUpBlocks();
	// 		} else {
	// 				// If the viewport width is 991px or below, remove adjustments
	// 				const slideupLists = document.querySelectorAll('.i_slideupblocks__list');
	// 				slideupLists.forEach(function(list) {
	// 						const blocks = list.querySelectorAll('.i_slideupblock');
	// 						blocks.forEach(function(block) {
	// 								block.style.height = ''; // Reset height
	// 						});
	// 						list.classList.remove('i_slideupblocks__list__unstuck'); // Remove the class
	// 				});
	// 		}
	// });
});


// Stats Section
document.addEventListener('DOMContentLoaded', function() {

	const target = document.querySelector('.i_statssection');

	// Exit if the target doesn't exist
	if (!target) return;


	const startStats = (section) => {

		const elems = section.querySelectorAll('.i_statsblock__stat__number');

		elems.forEach((elem, i) => {

			// get count-to attr from element
			let countTo = parseInt(elem.getAttribute('count-to'), 10);
			// get count-template attr from element
			const countTemplate = elem.getAttribute('count-template');
			// get count-by attr from element 
			const countBy = parseInt(elem.getAttribute('count-by'), 10);

			if( !countTo )  {
				countTo = 100;
			}

			elem.innerHTML = countTemplate.replace('[n]', '0');
			setTimeout(() => {
				if (elem) {
					let count = 0;

					const interval = setInterval(() => {
						
						if (countBy) {
							count += countBy;
						} else {
							count++;
						}

						let countOutput = count;

						// replace [n] with the current count
						if (countTemplate) {
							countOutput = countTemplate.replace('[n]', count);
						}
						
						elem.innerHTML = countOutput;

						if (count >= countTo) {
							clearInterval(interval);
						}

					}, 22); // Adjust this duration to make the count-up faster or slower
				}
			}, 550 * i);
		});
	}

	// Create an Intersection Observer
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
				// If the element is intersecting and at least 50% is visible
				startStats(entry.target);
				observer.unobserve(entry.target); // Stop observing since our condition has been met
			}
		});
	}, {
		root: null, // use the viewport as the root
		rootMargin: '0px',
		threshold: 0.5 // trigger the callback when 50% of the target is visible
	});

	// Start observing
	observer.observe(target);
});

// Testimonial Slider
document.addEventListener('DOMContentLoaded', () => {

	let sliderSettings = {};

	const goToSlide = (slider, slideNumber, userClick) => {
		const sliderNav = slider.querySelector('.i_testimonialslider__nav');
		const sliderNavItems = sliderNav.querySelectorAll('.i_testimonialslider__nav__item');
		const sliderItems = slider.querySelectorAll('.i_testimonialslider__item');
		const sliderBar = slider.querySelector('.i_testimonialslider__nav__bar__count');

		sliderNavItems.forEach((item, index) => {
			if (index === slideNumber) {
				item.classList.add('i--active');
			} else {
				item.classList.remove('i--active');
			}
		});

		sliderItems.forEach((item, index) => {

			if (index === slideNumber) {
				item.classList.add('i--active');
			} else {
				item.classList.remove('i--active');
			}
		});

		sliderBar.classList.remove('--countdown');

		setTimeout(() => {
			sliderBar.classList.add('--countdown');
		}, 1000);

		// if( !userClick ) {
		// }

		if (userClick) {
			clearTimeout(sliderSettings.timeout);
			sliderSettings.timeout = setTimeout(() => {
				goToNextSlideTimeout();
			}, 5000);
			// sliderBar.classList.add('--userEngaged');
		}

	}

	const goToNextSlide = (slider) => {

		if (!slider) return;

		const sliderNav = slider.querySelector('.i_testimonialslider__nav');
		const sliderNavItems = sliderNav.querySelectorAll('.i_testimonialslider__nav__item');
		const sliderItems = slider.querySelectorAll('.i_testimonialslider__item');

		let activeSlide = 0;

		sliderNavItems.forEach((item, index) => {
			if (item.classList.contains('i--active')) {
				activeSlide = index;
			}
		});

		if (activeSlide < sliderNavItems.length - 1) {
			goToSlide(slider, activeSlide + 1);
		} else {
			goToSlide(slider, 0);
		}
	}

	const goToNextSlideTimeout = () => {
		const slider = document.querySelector('.i_testimonialslider');
		if (slider) {
			goToNextSlide(slider);
		}

		sliderSettings.timeout = setTimeout(() => {
			goToNextSlideTimeout();
		}, 5000);
	}

	setTimeout(() => {
		const testimonialSlider = document.querySelector('.i_testimonialslider');
		if (!testimonialSlider) return;
		testimonialSlider.querySelector('.i_testimonialslider__nav__bar__count').classList.add('--countdown');
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
			if (index === 0) {
				navItem.classList.add('i--active');
			}

			navItem.addEventListener('click', () => {
				// Go to the slide
				goToSlide(slider, index, true);
			});

			sliderNav.appendChild(navItem);

		});
	}
});

// Toggle List
document.addEventListener('DOMContentLoaded', function() {
	// Select all toggle buttons
	const toggles = document.querySelectorAll('.i_togglelist__item__toggle');

	if (!toggles) return;

	toggles.forEach(function(toggle) {
		toggle.addEventListener('click', function() {
			// Get the parent .togglelist_item element
			const parentItem = toggle.closest('.i_togglelist__item');

			// Get the corresponding .togglelist_item_body and its content
			const body = parentItem.querySelector('.i_togglelist__item__body');
			const content = parentItem.querySelector('.i_togglelist__item__body__content');


			// Toggle the --open class on the clicked .togglelist_item
			parentItem.classList.toggle('i--open');

			if (parentItem.classList.contains('i--open')) {
				// Open the item
				// Set the height to the content's height
				body.style.height = `${content.scrollHeight}px`;

				// After a delay, set the height to 'auto' for responsiveness
				setTimeout(() => {
					body.style.height = 'auto';
				}, 300); // assuming the transition in your CSS takes 300ms
			} else {
				// Close the item
				// First set the height to the current px value (in case it's 'auto')
				body.style.height = `${body.scrollHeight}px`;
				// Force repaint to ensure the next style change gets animated
				body.offsetHeight; // no need to store this anywhere, the reference is enough
				// Set the height back to zero
				body.style.height = '0';
			}
		});
	});

});

// Restacking Slider
document.addEventListener('DOMContentLoaded', function() {

	const slider = document.querySelector('.i_restackingslider');

	if (!slider) return;

	function changeSlide(targetLayer) {
		const stack = document.querySelector('.i_restackingslider__stack');
		const layers = Array.from(stack.querySelectorAll('.i_restackingslider__stack__layer'));
		const contentLayers = Array.from(document.querySelectorAll('.i_restackingslider__content__layer'));
		const navItems = Array.from(document.querySelectorAll('.i_restackingslider__nav__item'));

		// Find the target layer based on the input
		const target = layers.find(
			layer => layer.classList.contains(`layerorder--${targetLayer}`)
		);

		if (target.classList.contains('i--active')) {
			return;
		}

		// Find the current active layer and add a --reset class to it
		const activeLayer = layers.find(layer => layer.classList.contains('i--active'));
		activeLayer.classList.remove('i--active');


		// Create an array with the new order of layers, starting with the target layer
		const targetIndex = layers.indexOf(target);
		const newLayersOrder = layers.slice(targetIndex).concat(layers.slice(0, targetIndex));

		// Re-assign classes to layers based on the new order
		newLayersOrder.forEach((layer, index) => {
			layer.className = `i_restackingslider__stack__layer i_restackingslider__stack__layer--${index + 1}`;
		});

		// Add back in layeroder--x
		layers.forEach((layer, index) => {
			layer.classList.add(`layerorder--${index + 1}`);
		});

		activeLayer.classList.add('--reset');

		// Remove the active class from all i_restackingslider__content__layer
		contentLayers.forEach(layer => {
			layer.classList.remove('i--active');
		});

		// Add the active class to the corresponding i_restackingslider__content__layer
		contentLayers[targetLayer - 1].classList.add('i--active');

		// Remove the --active class from all nav items
		navItems.forEach(item => {
			item.classList.remove('i--active');
		});

		// Add the --active class to the corresponding nav item
		navItems[targetLayer - 1].classList.add('i--active');

		setTimeout(() => {
			// Remove the --reset class from the previously active layer
			activeLayer.classList.remove('--reset');

			setTimeout(() => {
				// The new active layer is now layer 1, so add --active class to it
				newLayersOrder[0].classList.add('i--active');
			}, 500);
		}, 500);
	}

	function moveToNextSlide() {
		const stack = document.querySelector('.i_restackingslider__stack');

    if (!stack) return;

		const layers = Array.from(stack.querySelectorAll('.i_restackingslider__stack__layer'));

		// Find the current active layer
		const activeLayer = layers.find(layer => layer.classList.contains('i--active'));

    let activeLayerNum = 0;

    if( activeLayer ) {
      // Get its layer number from its class
      activeLayerNum = parseInt(activeLayer.className.match(/layerorder--(\d+)/)[1], 10);
    }


		// Calculate the next layer number, and wrap around if necessary
		const totalLayers = layers.length;
		const nextLayerNum = (activeLayerNum % totalLayers) + 1;

		// Call changeSlide function to switch to the next slide
		changeSlide(nextLayerNum);
	}

	window.restacking__int = setInterval(() => {
		moveToNextSlide();
	}, 5000);

	(() => {
		const navItems = Array.from(document.querySelectorAll('.i_restackingslider__nav__item'));

		navItems.forEach((navItem, index) => {
			navItem.addEventListener('click', () => {
				clearInterval(window.restacking__int);
				changeSlide(index + 1);
				// add UserEngaged class to parent slider
				navItem.closest('.i_restackingslider').classList.add('--userEngaged');
			});
		});
	})();
});

// Cycle Slider
document.addEventListener('DOMContentLoaded', function() {

	const cycleSlider = document.querySelector('.i_cycleslider');

	if (!cycleSlider) return;

	// Initialize variables
	let cycleSlideInterval;
	let userEngaged = false;

	function goToCycleSlide(slideNum) {
		// Clear interval if user engaged
		if (userEngaged) {
			clearInterval(cycleSlideInterval);
		}

		// Find and deactivate currently active slides and nav items
		const activeSlide = document.querySelector('.i_cycleslider__list__item.i--active');
		const activeNavItem = document.querySelector('.i_cycleslider__nav__item.i--active');
		activeSlide.classList.remove('i--active');
		activeNavItem.classList.remove('i--active');

		// Activate the slide and nav item based on the given slide number
		const targetSlide = document.querySelector(`.i_cycleslider__list__item:nth-child(${slideNum})`);
		const targetNavItem = document.querySelector(`.i_cycleslider__nav__item:nth-child(${slideNum})`);
		targetSlide.classList.add('i--active');
		targetNavItem.classList.add('i--active');
	}

	function goToNextCycleSlide() {
		const totalSlides = document.querySelectorAll('.i_cycleslider__list__item').length;
		const activeSlide = document.querySelector('.i_cycleslider__list__item.i--active');
		const activeIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
		const nextSlideNum = (activeIndex + 1) % totalSlides + 1;
		goToCycleSlide(nextSlideNum);
	}

	// Attach click events to cycle list items and nav items
	document.querySelectorAll('.i_cycleslider__list__item__box, .i_cycleslider__nav__item').forEach(item => {
		item.addEventListener('click', function() {
			const parentSlider = this.closest('.i_cycleslider');
			parentSlider.classList.add('--userEngaged');
			userEngaged = true;
			const slideNum = Array.from(this.closest('.i_cycleslider__list, .i_cycleslider__nav').children).indexOf(this.closest('.i_cycleslider__list__item, .i_cycleslider__nav__item')) + 1;
			goToCycleSlide(slideNum);
		});
	});

	// Initialize cycle slide interval
	cycleSlideInterval = setInterval(() => {
		if (!userEngaged) {
			goToNextCycleSlide();
		}
	}, 1500);

	// To manually go to a specific slide, you can use goToCycleSlide function like so:
	// goToCycleSlide(2);

});

// CTA Section
document.addEventListener('DOMContentLoaded', function() {
	const element = document.querySelector('.i_ctasection');
	if (!element) return;

	let lastScrollTop = 0;
	let lastTime = 0;
	let speed = 0;
	let rafId = null;

	// Array to keep track of each block's current transform distance
	let currentTransforms = [];

	// Function to handle scroll
	window.addEventListener('scroll', () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const currentTime = Date.now();

		// Calculate speed (distance over time)
		speed = (scrollTop - lastScrollTop) / (currentTime - lastTime);

		// Update for next time
		lastScrollTop = scrollTop;
		lastTime = currentTime;

		// Call requestAnimationFrame for smooth animations
		if (rafId === null) {
			rafId = requestAnimationFrame(() => {
				checkElementInViewport();
				rafId = null;
			});
		}
	});

	// Function to check if element is in the viewport and handle block transformations
	function checkElementInViewport() {
		const element = document.querySelector('.i_ctasection');
		const rect = element.getBoundingClientRect();

		if (rect.top < window.innerHeight && rect.bottom > 0) {
			// Element is in the viewport
			const blocks = document.querySelectorAll('.i_ctasection__block--behind');

			blocks.forEach((block, index) => {
				// Initialize currentTransforms array if necessary
				if (typeof currentTransforms[index] === 'undefined') {
					currentTransforms[index] = 0;
				}

				// Calculate incremental distance based on speed
				const incrementalDistance = (index + 1) * speed;

				// Update the current transform distance for this block
				currentTransforms[index] += incrementalDistance;

				// Define min and max distances for this block
				const maxDistance = index + 1;
				const minDistance = -(index + 1);

				// Apply limits
				if (currentTransforms[index] > maxDistance) {
					currentTransforms[index] = maxDistance;
				} else if (currentTransforms[index] < minDistance) {
					currentTransforms[index] = minDistance;
				}

				// Apply the new transform
				block.style.transform = `translateY(${currentTransforms[index]}rem)`;
			});
		}
	}


	// Initial call
	checkElementInViewport();

});

// Sticley blocks
document.addEventListener('DOMContentLoaded', function() {

	const stickyBlocksSection = document.querySelector('.i_slideupblocks');

	if (!stickyBlocksSection) return;

	let ticking = false;
	let observerTriggered = false;

	function adjustStickyBlocks() {
		if (observerTriggered) {
			const stickyBlocks = document.querySelectorAll('.sticky .i_stackingblock__wrap');
			const stickyList = document.querySelector('.i_slideupblocks__list');
			const stickyListRect = stickyList.getBoundingClientRect();

			stickyBlocks.forEach((block, index) => {
				const rect = block.getBoundingClientRect();
				let factor = (window.innerHeight - rect.top) / window.innerHeight;

				// Calculate the remaining viewport size
				const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
				const multipliedFontSize = baseFontSize * 3;
				const remainingViewportSize = window.innerHeight - multipliedFontSize;
				const remainingViewportRatio = remainingViewportSize / window.innerHeight;

				// Limit the factor to stop scaling once it reaches 3rem from the top
				if (rect.top <= multipliedFontSize) {
					factor = Math.max(factor, remainingViewportRatio);
				}

				// Parallax the mediaAsset slightly down
				const parallaxOffset = 200 * factor; // Adjust as needed
				const mediaAsset = block.querySelector('.insert__clippedgraphic__media__asset');
				if (mediaAsset) {
					mediaAsset.style.transform = `translateY(-${parallaxOffset}px)`;
				}

				// Normalize and limit factor between 0 and 1
				factor = Math.min(1, Math.max(0, (factor - 0.5) * 2));

				// Additional scaling factor based on the position within the parent
				const blockPositionInList = rect.top - stickyListRect.top;
				const blockListFactor = blockPositionInList / stickyListRect.height;

				// Combine the two scaling factors
				const combinedFactor = factor * blockListFactor;

				// Scale down the block as it reaches the top of the screen
				let scale = 1 - combinedFactor * (0.2 - index * 0.03); // Decreased by 0.02 for each subsequent block
				scale = Math.max(0, scale); // Ensure scale doesn't go below 0.8 (or any other minimum you set)


				// Ensuring that the effect doesn't start until the block has reached 50% of the viewport
				// if (factor <= 0.5 ) return;

				block.style.transform = `scale(${scale})`;
			});
		}
		ticking = false;
	}





	// Intersection Observer to detect when i_slideupblocks is visible
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				observerTriggered = true;
			} else {
				observerTriggered = false;
			}
		});
	});

	observer.observe(document.querySelector('.i_slideupblocks'));

	// Function to call on scroll
	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(adjustStickyBlocks);
			ticking = true;
		}
	}

	// Listen to scroll event
	window.addEventListener('scroll', onScroll);

});


// animate in sections
document.addEventListener('DOMContentLoaded', function() {

	const childrenDelay = document.querySelectorAll('[class*="i_childrendelay--"]');
	childrenDelay.forEach(element => {
		// Extract delay value using a regex match on the element's className
		const match = element.className.match(/i_childrendelay--(\d+)/);

		if (!match) {
			return;
		}

		// find animated children
		const animatedChildren = element.querySelectorAll('[class*="i_animate"]');
		animatedChildren.forEach((child, index) => {
			// if a class that contains i_animatedelay-- grab the value
			const childMatch = child.className.match(/i_animatedelay--(\d+)/);
			let addTo = 0;
			if (childMatch) {
				addTo = parseInt(childMatch[1], 10);
			}
			// if it doesn't contain i_animatedelay-- add it
			if (!childMatch) {
				child.className += ` i_animatedelay--0`;
			}
			// replace the value at the end of the animate delay class
			child.className = child.className.replace(/i_animatedelay--(\d+)/, `i_animatedelay--${addTo +  parseInt(match[1], 10)}`);

		});

		if (match) {
			// Set the transition-delay style property
			const delayValue = match[1] + 'ms';
			element.style.transitionDelay = delayValue;
		}
	});

	// Select only elements that contain the class pattern "transitionDelay--"
	const elementsWithDelay = document.querySelectorAll('[class*="i_animatedelay--"]');

	elementsWithDelay.forEach(element => {
		// Extract delay value using a regex match on the element's className
		const match = element.className.match(/i_animatedelay--(\d+)/);

		if (match) {
			// Set the transition-delay style property
			const delayValue = match[1] + 'ms';
			element.style.transitionDelay = delayValue;
		}
	});


	// Define the observer callback
	function handleIntersect(entries, observer) {
		entries.forEach(entry => {
			// If the section is intersecting at the specified threshold or more

			if (entry.intersectionRatio >= 0.25) {
				entry.target.classList.add('i--animatesection--in');
				observer.unobserve(entry.target); // Stop observing since our condition has been met
			}
			// Scroll up and down animation
			// } else {
			// 	entry.target.classList.remove('i--animatesection--in');
			// }
		});
	}

	// Define the observer options
	let options = {
		root: null, // Use the viewport as the root
		rootMargin: '0px',
		threshold: 0.25
	};

	// Create a new observer
	let observer = new IntersectionObserver(handleIntersect, options);

	// Observe all <section> elements
	document.querySelectorAll('section').forEach(section => {
		observer.observe(section);
	});

});

// Use Case Slider on Mobile
document.addEventListener('DOMContentLoaded', function() {

	// Get all containers
	const containers = document.querySelectorAll('.i_usecasessection__list-w');

	// Loop through each container

	containers.forEach(container => {
		

		// let container = document.querySelector('.i_usecasessection__list-w');
		if (!container) return;
		let slider = container.querySelector('.i_usecasessection__list');
		if (!slider) return;
		let isDragging = false;
		let startX;
		let lastX;
		let currentX;
		let lastDelta;
		let lastTime;
		let momentumId;
		let initialScrollLeft;
		let snapAnimationId;
		const blocks = slider.querySelectorAll('.i_icontextblock');

		// Create dot navigation slider
		const dotNav = document.createElement('div');
		dotNav.classList.add('dot-navigation');
		container.appendChild(dotNav);

		// Generate dots
		blocks.forEach((block, index) => {
			const dot = document.createElement('div');
			dot.classList.add('dot');
			if (index === 0) dot.classList.add('active'); // Make the first dot active initially
			dotNav.appendChild(dot);
			dot.addEventListener('click', function() {
				scrollToItem(index);
			});
		});

		const dots = container.querySelectorAll('.dot');

		const items = slider.querySelectorAll('.i_icontextblock');

		const isTouchEvent = e => e.type.startsWith('touch');

		function start(e) {
			cancelAnimationFrame(snapAnimationId);
			clearInterval(momentumId);
			
			isDragging = true;
			lastX = startX = e.pageX || e.touches[0].pageX;
			initialScrollLeft = slider.scrollLeft;
			lastTime = Date.now();
		}

		function move(e) {
			if (!isDragging) return;
			currentX = e.pageX || e.touches[0].pageX;
			let deltaX = currentX - startX;

			let now = Date.now();
			lastDelta = currentX - lastX;
			let deltaTime = now - lastTime;

			if (deltaTime === 0) deltaTime = 1;
			let speed = lastDelta / deltaTime;

			if(!isTouchEvent(e)) {
				translateSlider(deltaX);
			}

			lastX = currentX;
			lastTime = now;
		}

		function end(e) {
			isDragging = false;
			const isTouch = isTouchEvent(e);
			if (!isTouch) {
				momentumScrolling(e);
			} else {
				updateDots();
			}
		}

		function translateSlider(deltaX) {
			slider.scrollLeft = initialScrollLeft - deltaX;

			// uodate the dots
			// let minDistance = Infinity;
			// let closestItem;
			// const center = slider.scrollLeft + (slider.offsetWidth / 2);

			// items.forEach((item) => {
			//   const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
			//   const distance = Math.abs(itemCenter - center);
			//   if (distance < minDistance) {
			//     minDistance = distance;
			//     closestItem = item;
			//   }
			// });

			// // get the index of the closest item
			// const closestIndex = Array.from(items).indexOf(closestItem);

			// // remove active class from all dots
			// dots.forEach(dot => {
			//   dot.classList.remove('active');
			// });

			// // add active class to the closest dot
			// dots[closestIndex].classList.add('active');

		}

		function updateDots() {
			let minDistance = Infinity;
			let closestItem;
			const center = slider.scrollLeft + (slider.offsetWidth / 2);

			// find the closest item
			items.forEach((item) => {
				const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
				const distance = Math.abs(itemCenter - center);
				if (distance < minDistance) {
					minDistance = distance;
					closestItem = item;
				}
			});

			// get the index of the closest item
			const closestIndex = Array.from(items).indexOf(closestItem);

			// remove active class from all dots
			dots.forEach(dot => {
				dot.classList.remove('active');
			});

			// add active class to the closest dot
			dots[closestIndex].classList.add('active');
		}


		function momentumScrolling() {

			let speed = lastDelta;
			momentumId = setInterval(function() {
				if (Math.abs(speed) < 1) {
					clearInterval(momentumId);

					snapToClosest();
					return;
				}
				slider.scrollLeft -= speed;
				speed *= 0.95;

				let minDistance = Infinity;
				let closestItem;
				const center = slider.scrollLeft + (slider.offsetWidth / 2);

				items.forEach((item) => {
					const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
					const distance = Math.abs(itemCenter - center);
					if (distance < minDistance) {
						minDistance = distance;
						closestItem = item;
					}
				});

				// get the index of the closest item
				const closestIndex = Array.from(items).indexOf(closestItem);

				// remove active class from all dots
				dots.forEach(dot => {
					dot.classList.remove('active');
				});

				// add active class to the closest dot

				dots[closestIndex].classList.add('active');

			}, 16);
		}

		function snapToClosest() {
			let minDistance = Infinity;
			let closestItem;

			const center = slider.scrollLeft + (slider.offsetWidth / 2);

			items.forEach((item) => {
				const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
				const distance = Math.abs(itemCenter - center);
				if (distance < minDistance) {
					minDistance = distance;
					closestItem = item;
				}
			});

			// get the index of the closest item
			const closestIndex = Array.from(items).indexOf(closestItem);

			// remove active class from all dots
			dots.forEach(dot => {
				dot.classList.remove('active');
			});

			// add active class to the closest dot

			dots[closestIndex].classList.add('active');

			const targetScrollPosition = closestItem.offsetLeft;
			animateSnap(targetScrollPosition);
		}

		function animateSnap(target) {
			const start = slider.scrollLeft;
			const change = target - start;
			const baseTime = 350; // Adjust as needed
			const multiplier = 0.5; // Adjust as needed
			const duration = baseTime + (multiplier * Math.abs(change));
			let startTime = null;

			function animate(time) {
				if (!startTime) startTime = time;

				const elapsed = time - startTime;
				const t = easeInOutCubic(elapsed, 0, 1, duration);

				slider.scrollLeft = start + change * t;

				if (elapsed < duration) {
					snapAnimationId = requestAnimationFrame(animate);
				}
			}

			function easeInOutCubic(t, b, c, d) {
				t /= d / 2;
				if (t < 1) return c / 2 * t * t * t + b;
				t -= 2;
				return c / 2 * (t * t * t + 2) + b;
			}

			snapAnimationId = requestAnimationFrame(animate);
		}

		function scrollToItem(index) {
			const targetItem = items[index];
			const targetScrollPosition = targetItem.offsetLeft;

			// remove active class from all dots
			dots.forEach(dot => {
				dot.classList.remove('active');
			});

			// add active class to the closest dot
			dots[index].classList.add('active');

			animateScroll(slider, targetScrollPosition, 1000);
		}

		const speed = 1000; // pixels per second, adjust to desired speed

		function animateScroll(element, to, duration) {
			let start = element.scrollLeft,
				change = to - start,
				startTime = performance.now(),
				val,
				now;

			function animateScrollStep(timestamp) {
				if (!now) now = timestamp;
				let timeElapsed = timestamp - now;
				val = easeInOutCubic(timeElapsed, start, change, duration);
				element.scrollLeft = val;
				if (timeElapsed < duration) requestAnimationFrame(animateScrollStep);
			}

			function easeInOutCubic(t, b, c, d) {
				t /= d / 2;
				if (t < 1) return c / 2 * t * t * t + b;
				t -= 2;
				return c / 2 * (t * t * t + 2) + b;
			}

			requestAnimationFrame(animateScrollStep);
		}

		slider.addEventListener('mousedown', start);
		slider.addEventListener('mousemove', move);
		slider.addEventListener('mouseup', end);

		slider.addEventListener('touchstart', start, {
			passive: true
		});
		slider.addEventListener('touchmove', move, {
			passive: true
		});
		slider.addEventListener('touchend', end, {
			passive: true
		});

		// set an event for while the slider is being scrolled
		slider.addEventListener('scroll', updateDots);
	});
});

function adjustStickyTop() {
  // Get all .i_stickysections elements
  const stickySections = document.querySelectorAll('.i_stickysections');
  
  for (let section of stickySections) {
    // Find the first .stick class within the current section
    const stickElement = section.querySelector('.stick');
    if (!stickElement) continue;
    
    // Calculate the difference between the element's height and the viewport height
    const difference = stickElement.offsetHeight - window.innerHeight;


    // If the .stick element's height is greater than the viewport, adjust its top
    if (difference > 0) {
      stickElement.style.top = `-${difference}px`;
    } else {
      stickElement.style.top = '0';
    }
  }
}

// Run the function once the content is loaded
document.addEventListener('DOMContentLoaded', adjustStickyTop);

// Run the function on window resize
window.addEventListener('resize', adjustStickyTop);

// setInterval(() => {
// 	adjustStickyTop();
// }, 1000);


document.addEventListener('DOMContentLoaded', () => {
	const scrollers = document.querySelectorAll(".scroller");

	if(scrollers.length === 0) return;

  addAnimation();

	function addAnimation() {
		scrollers.forEach((scroller) => {
			// add data-animated="true" to every `.scroller` on the page
			scroller.setAttribute("data-animated", true);

			// Make an array from the elements within `.scroller-inner`
			const scrollerInner = scroller.querySelector(".scroller__inner");
			const scrollerContent = Array.from(scrollerInner.children);

			// For each item in the array, clone it
			// add aria-hidden to it
			// add it into the `.scroller-inner`
			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute("aria-hidden", true);
				scrollerInner.appendChild(duplicatedItem);
			});
		});
	}
});


// js for links
document.addEventListener('DOMContentLoaded', function() {
	const labels = document.querySelectorAll('.i_link__label');

	labels.forEach(label => {
			const parentRowInner = label.closest('.i_link__row__inner');
			if (parentRowInner) {
					parentRowInner.setAttribute('data-label', label.innerText.trim());
					// parentRowInner.setAttribute('data-label', label.innerHTML.trim());
			}
	});
});


// js for testimonial slider quote heights
function setQuoteHeight() {
	// Get all sliders
	const sliders = document.querySelectorAll('.i_testimonialslider');

	sliders.forEach(slider => {
			let maxHeight = 0;

			// Find all .i_quote-w inside the current slider
			const quotes = slider.querySelectorAll('.i_quote-w');

			// Reset heights to auto for accurate calculation and find the max height
			quotes.forEach(quote => {
					quote.style.height = 'auto';
					if (quote.offsetHeight > maxHeight) {
							maxHeight = quote.offsetHeight;
					}
			});

			// Set all .i_quote-w inside this slider to the max height
			quotes.forEach(quote => {
					quote.style.height = `${maxHeight}px`;
			});
	});
}

// Run the function on page load
document.addEventListener('DOMContentLoaded', setQuoteHeight);

// Run the function on window resize
window.addEventListener('resize', setQuoteHeight);


document.addEventListener('DOMContentLoaded', function() {
	// Function to check scroll position and update body class
	function checkScrollPosition() {
			if (window.scrollY > 0 && !document.body.classList.contains('state--scrolled')) {
					document.body.classList.add('state--scrolled');
			} else if (window.scrollY === 0 && document.body.classList.contains('state--scrolled')) {
					document.body.classList.remove('state--scrolled');
			}
	}

	// Listen to scroll events
	window.addEventListener('scroll', checkScrollPosition);

	// Initial check (in case the user has already scrolled when the page loads)
	checkScrollPosition();
});

// Patch for link hover fx

function setLinkLabelStyles(label) {
	
	// Get the parent wrapper with class 'i_link__row'
	const parentWrapper = label.closest('.i_link__row');
	
	if (parentWrapper) {

		// remove all inline styles from the parent wrapper
		parentWrapper.removeAttribute('style');

		// Get computed styles for the label
		const computedStyles = window.getComputedStyle(label);

		// Set the font properties for the parent wrapper
		parentWrapper.style.color = computedStyles.color;
		parentWrapper.style.fontFamily = computedStyles.fontFamily;
		parentWrapper.style.fontSize = computedStyles.fontSize;
		parentWrapper.style.fontWeight = computedStyles.fontWeight;
		parentWrapper.style.fontStyle = computedStyles.fontStyle;
		parentWrapper.style.textTransform = computedStyles.textTransform;
		parentWrapper.style.letterSpacing = computedStyles.letterSpacing;
		parentWrapper.style.fontVariationSettings = computedStyles.fontVariationSettings;
	}
}

function setLinkLabels() {
	// Get a NodeList of all elements with class 'i_link__label'
	const labels = document.querySelectorAll('.i_link__label');

	labels.forEach(label => {
		setLinkLabelStyles(label);
	});
}
document.addEventListener('DOMContentLoaded', setLinkLabels);

// Run the function on window resize
window.addEventListener('resize', setLinkLabels);

// Run the function on font load
document.fonts.ready.then(setLinkLabels);


// when the document is resizing, set a body class to --resizing
// this is used to stop the link hover fx from running while the document is resizing
document.addEventListener('DOMContentLoaded', function() {
	let resizing = false;
	window.addEventListener('resize', function() {
		if ( !resizing ) {
			resizing = true;
			document.body.classList.add('--resizing');
		} else {
			clearTimeout(window.resizingTimeout);
		}
		window.resizingTimeout = setTimeout(function() {
			resizing = false;
			document.body.classList.remove('--resizing');
		}, 500);
	});
});

// Run Lottie animations after document is loaded
document.addEventListener('DOMContentLoaded', function() {
	var lotties = document.querySelectorAll('.lottie-animation');
	if( window.lottie ) {
		
		// loop through lotties
		lotties.forEach(element => {
			const animationData = element.getAttribute('data-animation');

			if( !animationData ) return;

			window.lottie.loadAnimation({
				container: element, // the dom element that will contain the animation
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: animationData // the path to the animation json
			});
		});

	}
});

document.addEventListener('DOMContentLoaded', function() {
	var navButton = document.querySelector('.navmenu__button');

	navButton.addEventListener('click', function() {
			document.body.classList.toggle('--nav--open');
	});
});

document.addEventListener('DOMContentLoaded', function() {
	// const chatRoot = document.querySelector('[data-testid="root"]').shadowRoot.querySelector('.hb_shadow_root')
	// chatRoot.style.setProperty('--chat-font-family', 'Hubotsans Slnt Wdth Wght, sans-serif');
	// chatRoot.style.setProperty('--headerAvatarFill', '#39075B');

	const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Check if it's an element node
                if (isChatbotDiv(node)) {
                    injectStylesIntoShadowRoot(node);
                    observer.disconnect();
                } else {
                    // Observe the new div for additional changes
                    const innerObserver = new MutationObserver(innerMutations => {
                        if (isChatbotDiv(node)) {
                            injectStylesIntoShadowRoot(node);
                            innerObserver.disconnect();
                        }
                    });
                    innerObserver.observe(node, { childList: true, subtree: true });
                }
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });

function isChatbotDiv(node) {
	// check to see if it is a div, and has the property of data-testid="root"
	return node.tagName === 'DIV' && node.getAttribute('data-testid') === 'root';
}

function injectStylesIntoShadowRoot(node) {
	node.style.setProperty('--chat-font-family', 'Hubotsans Slnt Wdth Wght, sans-serif');
	node.style.setProperty('--headerAvatarFill', '#39075B');
}

});

document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('a[data-href^="#"]').forEach(anchor => {
		anchor.onclick = null;
		anchor.addEventListener('click', function (e) {
			console.log('clicked');
			e.preventDefault();
			const targetElement = document.querySelector(this.getAttribute('data-href'));
	
			// Get the computed style of the target element
			const style = window.getComputedStyle(targetElement);
			// Extract the scroll-margin-top value and parse it into an integer
			const headerOffset = parseInt(style.getPropertyValue('scroll-margin-top'), 10);

			
			const elementPosition = parseInt(targetElement.getBoundingClientRect().top, 10);
			const offsetPosition = elementPosition + window.scrollY - headerOffset;
			
			console.log('headerOffset', headerOffset);
			console.log('elementPosition', elementPosition);
			console.log('offsetPosition', offsetPosition);

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		});
	});
});