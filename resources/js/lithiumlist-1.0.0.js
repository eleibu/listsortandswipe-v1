// TESTED ON:
// IE11
// Edge38
// Safari 12 on Mac
// Chrome 71 on Windows
// Chrome 71 on Mac
// Chrome 59 on Android
// Samsung Browser 5.4 on Android
// Firefox 64 on Mac



// SHOULD WORK ON:
// IE 10	(IE9 and below does not support 'transition')
// Edge 12
// Firefox 12
// Chrome 4
// Safari 4
// Opera 11.5
// iOS Safari 4
// Android Browser 2.3
// Chrome for Android all
// Firefox for Android all
// (based on getBoundingClientRect - see caniuse)


// OVERVIEW AND FEATURES
// Vertical only
// Sorts and swipes left/right (sliding 'out' and 'back')
// Sort start delay allows time to swipe first
// Drag handles / buttons
// Active item clone




// Notes:
// if outerCont != window:
	// outerCont must have a height other than 'auto' (eg. px, %, em)
	// outerCont must have overflow 'auto', 'scroll' or 'hidden' (will be set to 'hidden' during automatic scrolling to deal with Safari auto scrolling issue)
// set 'safariAutoOuterOverflow = false' to prevent setting 'outerCont.style.overflow = hidden' upon auto scroll (will break auto scroll on Mac Safari)
// if set 'safariBodyUnselectable = false', consider adding unselectable styles to an outer object (eg. body, document, etc) even if 'listitem-cont' or a sub-element is
	// unselectable - otherwise, unintended selection of elements outside outerCont can cause problems
// does not work with '-webkit-overflow-scrolling: touch' (iOS only)


// Pipeline:
// allow trigger left/right on multiple items at the same time
// confirm left / right
// left / right buttons and multiple (remember to delete tempFunctionRemoveMasks())
// elastic drag left / right
// slow auto scroll when approach top / bottom
// triggerSort - item to new position


// Known issues:
// * Cursor is sometimes far above itemCont but still moving it (seems to happen only when moving up, but not sure).
// * When: (i) listItems have non-uniform top/bottom margins; (ii) listCont has a top/bottom margin; or (iii) both (i) and (ii), items in the list can jump up and down when
		// any item is dragged left or right - solution is to apply a top-border (even if 0.01px and transparent) to listCont


// Medium articles:
// Validation using plain JS

// TO FINALISE DOCS
// Replace 'click/tap' with 'press'
// Move 'Why Lithium List?' to its own page, remove delete functionality and add a line about great docs
// Change 'Overview of functionality' to 'Concepts' and re-read/write (including explaining difference between 'slide' and 'swipe')
// Look for square brackets and fix
// Make all examples CHANGE the default settings
// Ensure all links actually link to something (especially in docs.blade.php and demos.blade.php)


//budicon-security-guard


// TODO: Check that copy button is working on mobile
// TODO: Include '-webkit-tap-highlight-color: rgba(0,0,0,0);' in documentation, see:
	// https://stackoverflow.com/questions/5106934/prevent-grey-overlay-on-touchstart-in-mobile-safari-webview
	// https://github.com/Polymer/polymer/issues/1970
// TODO: In the examples, why does the whole list flash when pressed?
// TODO: Include 'hamburger' and 'cross' in font icons
// TODO: Test setDefaultProperties
// TODO: hasClass, addClass and removeClass should be able to handle 'mask left' (at the moment they can't) - if not, update docs to say this
// TODO: Can two lists share the same outerCont (especially if outerCont wraps the whole page)?
// TODO: In events, replace 'activeIndex' with 'activeItem'?
// TODO: Check if clone is in correct place even when it has a margin
// TODO: Say in documentation that childNode can be a textNode


// TODO: Will it work with 'window' if we fix the issues (see when outerCont = window.document)?


// TODO: Change 'lithiumlistPro' to 'lithiumlist'
// TODO: Why is 'unlicensed' message not showing in docs/setup?
// TODO: Test 'supportsPassive' in Edge and IE
// TODO: Include version number and send it to server
// TODO: Favicon
// TODO: Can we improve auto-scrolling when outerCont = window?
// TODO: Allow '-webkit-overflow-scrolling: touch' by turning it off when sorting starts?
// TODO: Reset props for already attached list
// TODO: Change prop combinations
// TODO: Minify and upload to NPM



// TODO: Do not attach to window, attach to outer div instead - change validation to check for this
// TODO: Update url in rSend
// TODO: Remove .version() from webpack.mix.js?


export var lithiumlist = (function () {
	var instances = [];

	var defaultProperties = {
		onSortStart: null,
		onSortEnd: null,
		onSortAutoScrollStart: null,
		onSortAutoScrollEnd: null,
        sortEnabled: true,
        sortByLongPress: true,
        sortStartDuration: 300,
        sortEndDuration: 300,
        sortOuterClass: 'sort-outer',
        sortListClass: 'sort-list',
        sortCloneClass: 'sort-clone',
        sortCloneBoxShadow: '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)',		// not validated (other than string of length >0)
        sortCloneScale: '1.02',																// not validated (other than string of length >0)
        sortItemActiveHide: true,
        sortItemActiveClass: 'sort-item-active',
        sortDragHandleClass: 'sort-drag-handle',
        sortMoveStartDelay: 400,
        sortReorderDuration: 200,
        sortScrollEnabled: true,
        sortScrollSpeed: 3,
        safariBodyUnselectable: true,														// applies only to Safari on MacOS
        safariAutoOuterOverflow: true,														// applies only to Safari on MacOS
		onLeftStart: null,
		onLeftSlideOutStart: null,
		onLeftSlideBackStart: null,
		onLeftEnd: null,
        leftEnabled: true,
        leftBySwipe: true,
        leftOuterClass: 'left-outer',
        leftListClass: 'left-list',
        leftCloneClass: 'left-clone',
        leftCloneSlideOutClass: 'left-clone-slide-out',
        leftCloneSlideBackClass: 'left-clone-slide-back',
        leftItemActiveClass: 'left-item-active',
        leftMasks: [{
        	background: 'rgba(252, 13, 27, 1)',												// not validated (other than string of length >0)
			classNameDefault: 'left-mask',
			classNameSlideOut: 'left-mask-slide-out',
			classNameSlideBack: 'left-mask-slide-back',
			childNode: null
        }],
        leftButtonClass: 'left-button',
        leftSwipeStartThreshold: '20px',
        leftSwipeEndThreshold: '30%',
        leftSlideOutDuration: 300,
        leftSlideBackDuration: 200,
		onRightStart: null,
		onRightSlideOutStart: null,
		onRightSlideBackStart: null,
		onRightEnd: null,
        rightEnabled: true,
        rightBySwipe: true,
        rightOuterClass: 'right-outer',
        rightListClass: 'right-list',
        rightCloneClass: 'right-clone',
        rightCloneSlideOutClass: 'right-clone-slide-out',
        rightCloneSlideBackClass: 'right-clone-slide-back',
        rightItemActiveClass: 'right-item-active',
        rightMasks: [{
        	background: 'rgba(15, 127, 18, 1)',												// not validated (other than string of length >0)
			classNameDefault: 'right-mask',
			classNameSlideOut: 'right-mask-slide-out',
			classNameSlideBack: 'right-mask-slide-back',
			childNode: null
        }],
        rightButtonClass: 'right-button',
        rightSwipeStartThreshold: '20px',
        rightSwipeEndThreshold: '30%',
        rightSlideOutDuration: 300,
        rightSlideBackDuration: 200,
        ignoreOnClick: ['input', 'textarea', 'select', 'option', 'button']
	};

	var isSafariMacOS = false;
	if (window.safari !== undefined) {
		isSafariMacOS = true;
	}

	// public methods

	var attachToList = function(key, outerCont, listCont, listItemClass, listProperties) {
		if (isUndefinedOrNull(outerCont)) {
			outerCont = window;
		} else {
			if (!isWindow(outerCont)) {
				if (isDOMElement(outerCont)) {
					if (outerCont === listCont) {
						console.warn('Auto scrolling may not work where outerCont === listCont');
					} else {
						if (!outerCont.contains(listCont)) {
							throw 'outerCont must contain listCont';
						}
					}
				} else {
					throw 'outerCont must be a DOM element';
				}
			}
		}

		if (isUndefinedOrNull(listCont)) {
			throw 'listCont must not be undefined or null';
		} else {
			if (isDOMElement(listCont)) {
				for (var i = 0, len = instances.length; i < len; i++) {
					if (instances[i].listCont === listCont) {
						throw 'listCont already has lithiumlist attached';
					}
				}
			} else {
				throw 'listCont must be a DOM element';
			}
		}

		if (isUndefinedOrNull(listItemClass) || (!isString(listItemClass)) || (listItemClass.length == 0)) {
			throw 'listItemClass must be a string of length > 0';
		}

		var props = {};
		if (isUndefinedOrNull(listProperties)) {
			for (var attrname in defaultProperties) {
				if (isArray(defaultProperties[attrname])) {
					props[attrname] = defaultProperties[attrname].slice(0);
				} else {
					props[attrname] = defaultProperties[attrname];
				}
			}
		} else {
			validateProps(listProperties);
			for (var attrname in defaultProperties) {
				if (typeof listProperties[attrname] === 'undefined') {
					if (isArray(defaultProperties[attrname])) {
						props[attrname] = defaultProperties[attrname].slice(0);
					} else {
						props[attrname] = defaultProperties[attrname];
					}
				} else {
					if (isArray(listProperties[attrname])) {
						props[attrname] = listProperties[attrname].slice(0);
					} else {
						props[attrname] = listProperties[attrname];
					}
				}
			}
		}
		tempFunctionRemoveMasks(props);

		var instance = {
			'rkey' : key,
			'isr' : false,
			'outerCont' : outerCont,
			'listCont' : listCont,
			'listItemClass' : listItemClass,
			'props' : props,
			'temp' : getNewTemp()
		};

		instances.push(instance);

		if (rMsg(instance, true)) {// reg
			instance.temp.funcOnScroll = function(e) {onScroll(e, instance);};
			instance.temp.funcMouseDown = function(e) {mouseDown(e, instance);};
			instance.temp.funcTouchStart = function(e) {touchStart(e, instance);};
			instance.outerCont.addEventListener('scroll', instance.temp.funcOnScroll);
			instance.listCont.addEventListener('mousedown', instance.temp.funcMouseDown);
			instance.listCont.addEventListener('touchstart', instance.temp.funcTouchStart);			
		}// reg

		// reg - start
		if (!isUndefinedOrNull(instance.rkey) && isFunction(rSend) && isFunction(rLoad)) {
			rSend(instance);
		} else {
			rMsg(instance);
		}
		// reg - end
	};

	var detachFromList = function(listCont) {
		if (listCont) {
			var index = null;
			for (var i = 0, len = instances.length; i < len; i++) {
				if (instances[i].listCont === listCont) {
					index = i;
					break;
				}
			}
			if (index != null) {
				if (instances[index].temp.funcOnScroll) {
					instances[index].outerCont.removeEventListener('scroll', instances[index].temp.funcOnScroll);
				}
		        if (instances[index].temp.funcMouseDown) {
					listCont.removeEventListener('mousedown', instances[index].temp.funcMouseDown);
		        }
		        if (instances[index].temp.funcTouchStart) {
					listCont.removeEventListener('touchstart', instances[index].temp.funcTouchStart);
		        }
		        instances.splice(index, 1);
			}
		} else {
			throw 'listCont cannot be null.';
		}
	};

	var triggerLeft = function(listCont, itemIndex) {
		if (listCont) {
			var index = null;
			for (var i = 0, len = instances.length; i < len; i++) {
				if (instances[i].listCont === listCont) {
					index = i;
					break;
				}
			}
			if (index != null) {
				if (instances[index].props.leftEnabled) {
					setItems(instances[index]);
					if (instances[index].temp.items.length > itemIndex) {
						instances[index].temp.activeIndex = itemIndex;
						initMoveLeft(instances[index], 0);
						initLeftSlideOut(instances[index]);
					} else {
						console.warn('List item not found.');
					}
				} else {
					console.warn('listCont has \'leftEnabled = false\'.');
				}
			} else {
				console.warn('listCont does not have lithiumlist attached.');
			}
		} else {
			throw 'listCont cannot be null.';
		}
	};

	var triggerRight = function(listCont, itemIndex) {
		if (listCont) {
			var index = null;
			for (var i = 0, len = instances.length; i < len; i++) {
				if (instances[i].listCont === listCont) {
					index = i;
					break;
				}
			}
			if (index != null) {
				if (instances[index].props.rightEnabled) {
					setItems(instances[index]);
					if (instances[index].temp.items.length > itemIndex) {
						instances[index].temp.activeIndex = itemIndex;
						initMoveRight(instances[index], 0);
						initRightSlideOut(instances[index]);
					} else {
						console.warn('List item not found.');
					}
				} else {
					console.warn('listCont has \'rightEnabled = false\'.');
				}
			} else {
				console.warn('listCont does not have lithiumlist attached.');
			}
		} else {
			throw 'listCont cannot be null.';
		}
	};

	var setDefaultProperties = function(newDefaultProperties) {
		if (isUndefinedOrNull(newDefaultProperties)) {
			throw 'newDefaultProperties must not be undefined or null';
		} else {
			for (var attrname in defaultProperties) {
				if (typeof newDefaultProperties[attrname] !== 'undefined') {
					if (isArray(newDefaultProperties[attrname])) {
						defaultProperties[attrname] = newDefaultProperties[attrname].slice(0);
					} else {
						defaultProperties[attrname] = newDefaultProperties[attrname];
					}
				}
			}
			tempFunctionRemoveMasks(defaultProperties);
		}
	};

	var setListProperties = function(listCont, listProperties) {
		if (!isUndefinedOrNull(listCont) && isDOMElement(listCont)) {
			if (!isUndefinedOrNull(listProperties)) {
				var index = null;
				for (var i = 0, len = instances.length; i < len; i++) {
					if (instances[i].listCont === listCont) {
						index = i;
						break;
					}
				}
				if (index != null) {
					validateProps(listProperties);
					for (var attrname in instances[index]['props']) {
						if (typeof listProperties[attrname] !== 'undefined') {
							if (isArray(listProperties[attrname])) {
								instances[index]['props'][attrname] = listProperties[attrname].slice(0);
							} else {
								instances[index]['props'][attrname] = listProperties[attrname];
							}
						}
					}
					tempFunctionRemoveMasks(instances[index]['props']);
				} else {
					throw 'listCont does not have lithiumlist attached ';
				}
			} else {
				throw 'listProperties must not be undefined or null';
			}
		} else {
			throw 'listCont must be a DOM element';
		}
	};

	// private functions

	var tempFunctionRemoveMasks = function(props) {
		if (props.leftMasks && (props.leftMasks.length > 1)) {
			props.leftMasks.length = 1;
		}
		if (props.rightMasks && (props.rightMasks.length > 1)) {
			props.rightMasks.length = 1;
		}
	};

	var onScroll = function(e, instance) {
    	if (instance.temp.sortDelayTimer) {
    		clearTimeout(instance.temp.sortDelayTimer);
    		instance.temp.sortDelayTimer = null;
    	}
	};

	var mouseDown = function(e, instance) {
		if ((instance != null) && (!instance.temp.ignoreClicks) && ((instance.props.sortEnabled) || (instance.props.leftEnabled) || (instance.props.rightEnabled))) {
			setItems(instance);

			var index = null;
			for (var i = 0, len = instance.temp.items.length; i < len; i++) {
				if ((instance.temp.items[i] === e.target) || (instance.temp.items[i].contains(e.target))) {
					index = i;
					break;
				}
			}

			if (index != null) {
				if (instance.props.sortEnabled && checkClassClicked(e, instance.temp.items[index], instance.props.sortDragHandleClass)) {
					setTimeout(function() {
						initItemMove(e, index, instance);
						activateSort(instance);
					}, 1);	// delay allows itemCont to show :hover classes
				} else if (instance.props.leftEnabled && checkClassClicked(e, instance.temp.items[index], instance.props.leftButtonClass)) {
					instance.temp.activeIndex = index;
					initMoveLeft(instance, 0);
					initLeftSlideOut(instance);
				} else if (instance.props.rightEnabled && checkClassClicked(e, instance.temp.items[index], instance.props.rightButtonClass)) {
					instance.temp.activeIndex = index;
					initMoveRight(instance, 0);
					initRightSlideOut(instance);
				} else if (instance.props.ignoreOnClick.indexOf(e.target.tagName.toLowerCase()) == -1) {
					backgroundClick(e, index, instance);
				}
			}
		}
	};

	var touchStart = function(e, instance) {
		mouseDown(e, instance);
	};

	var initItemMove = function(e, index, instance) {
		var pageX = getPageX(e);
		var pageY = getPageY(e);

		instance.temp.activeIndex = index;
		instance.temp.origIndex = index;
		instance.temp.startPageX = pageX;
		instance.temp.startPageY = pageY;
		instance.temp.lastPageX = pageX;
		instance.temp.lastPageY = pageY;
		instance.temp.funcMouseMove = function(e) {mouseMove(e, instance);};
		instance.temp.funcMouseUp = function(e) {mouseUp(e, instance);};
		instance.temp.funcTouchMove = function(e) {touchMove(e, instance);};
		instance.temp.funcTouchEnd = function(e) {touchEnd(e, instance);};
		if (!instance.isr) rSend(instance);// reg

		window.addEventListener('mousemove', instance.temp.funcMouseMove);
		window.addEventListener('mouseup', instance.temp.funcMouseUp);
		if (supportsPassive) {
			window.addEventListener('touchmove', instance.temp.funcTouchMove, {passive: false});
		} else {
			window.addEventListener('touchmove', instance.temp.funcTouchMove);
		}
		window.addEventListener('touchend', instance.temp.funcTouchEnd);
	};

	var supportsPassive = function() {
		var supportsPassive = false;
		try {
		  window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() { supportsPassive = true; } }));
		} catch(err) {}
		return supportsPassive;
	};

	var initMoveLeft = function(instance, cursorX) {
		instance.temp.ignoreClicks = true;
		instance.temp.moveType = 'LEFT';
		instance.temp.activeOrigX = instance.temp.items[instance.temp.activeIndex].offsetLeft;

        if (instance.props.onLeftStart) {
			instance.props.onLeftStart(getReturnInstance(instance), instance.temp.activeIndex);
        }

        safariBodyUnselectableAdd(instance);

        if ((instance.props.leftOuterClass) && isDOMElement(instance.outerCont)) {	// check that outerCont is not 'window' or 'document'
        	addClass(instance.outerCont, instance.props.leftOuterClass);
        }
        if (instance.props.leftListClass) {
			addClass(instance.listCont, instance.props.leftListClass);
        }
        if (!instance.isr) rSend(instance);// reg

        if ((instance.props.leftMasks.length > 0) && (instance.temp.itemMasks.length == 0)) {
			createMasks(instance);
        }

		var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
        if (!instance.temp.itemClone) {
        	var left = cursorX + instance.temp.activeOrigX + 'px';
        	createClone(instance, left, top);
        }

		if (instance.props.leftItemActiveClass) {
			addClass(instance.temp.items[instance.temp.activeIndex], instance.props.leftItemActiveClass);
		}
	};

	var initMoveRight = function(instance, cursorX) {
		instance.temp.ignoreClicks = true;
		instance.temp.moveType = 'RIGHT';
		instance.temp.activeOrigX = instance.temp.items[instance.temp.activeIndex].offsetLeft;

        if (instance.props.onRightStart) {
			instance.props.onRightStart(getReturnInstance(instance), instance.temp.activeIndex);
        }

        safariBodyUnselectableAdd(instance);

        if ((instance.props.rightOuterClass) && isDOMElement(instance.outerCont)) {	// check that outerCont is not 'window' or 'document'
        	addClass(instance.outerCont, instance.props.rightOuterClass);
        }
        if (instance.props.rightListClass) {
			addClass(instance.listCont, instance.props.rightListClass);
        }
        if (!instance.isr) rSend(instance);// reg

        if ((instance.props.rightMasks.length > 0) && (instance.temp.itemMasks.length == 0)) {
			createMasks(instance);
        }

		var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
        if (!instance.temp.itemClone) {
        	var left = cursorX + instance.temp.activeOrigX + 'px';
        	createClone(instance, left, top);
        }

		if (instance.props.rightItemActiveClass) {
			addClass(instance.temp.items[instance.temp.activeIndex], instance.props.rightItemActiveClass);
		}
	};

	var backgroundClick = function(e, index, instance) {
		if ((instance.props.sortEnabled && instance.props.sortByLongPress) || (instance.props.leftEnabled && instance.props.leftBySwipe) || (instance.props.rightEnabled && instance.props.rightBySwipe)) {
			initItemMove(e, index, instance);
			setItems(instance);
			if (instance.props.sortEnabled && instance.props.sortByLongPress) {
				instance.temp.sortDelayTimer = setTimeout(function() {activateSort(instance);}, instance.props.sortMoveStartDelay);
			}
		}
	};

	var activateSort = function(instance) {
		if ((instance.temp) && (instance.temp.lastPageX != null) && (instance.temp.lastPageY != null)) {
			var rect = instance.temp.items[instance.temp.activeIndex].getBoundingClientRect();
			if (cursorIsOverRect(instance.temp.lastPageX, instance.temp.lastPageY, rect)) {
				instance.temp.ignoreClicks = true;

		        instance.temp.sortDelayTimer = null;
		        instance.temp.moveType = 'SORT';
				instance.temp.activeOrigX = instance.temp.items[instance.temp.activeIndex].offsetLeft;

				instance.temp.deltaItemsOuter = 0;
				if (instance.outerCont !== instance.listCont) {
					if (isWindow(instance.outerCont)) {
						instance.temp.deltaItemsOuter = instance.listCont.getBoundingClientRect().top + getOuterTop(instance.outerCont);
					} else {
						instance.temp.deltaItemsOuter = instance.listCont.getBoundingClientRect().top - instance.outerCont.getBoundingClientRect().top + getOuterTop(instance.outerCont);
					}
				}

		        if (instance.props.onSortStart) {
					instance.props.onSortStart(getReturnInstance(instance), instance.temp.activeIndex);
		        }

				safariBodyUnselectableAdd(instance);

		        if ((instance.props.sortOuterClass) && isDOMElement(instance.outerCont)) {	// check that outerCont is not 'window' or 'document'
		        	addClass(instance.outerCont, instance.props.sortOuterClass);
		        }

		        if (instance.props.sortListClass) {
		        	addClass(instance.listCont, instance.props.sortListClass);
		        }

		        if (!instance.temp.itemClone) {
		        	var left = instance.temp.activeOrigX + 'px';
		        	var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
		        	createClone(instance, left, top);
		        }

				if (instance.props.sortItemActiveHide) {
					instance.temp.items[instance.temp.activeIndex].style.visibility = 'hidden';
				}
				if (instance.props.sortItemActiveClass) {
					addClass(instance.temp.items[instance.temp.activeIndex], instance.props.sortItemActiveClass);
				}
			}
		}
	};

	var mouseMove = function(e, instance) {
		if ((instance.temp) && (instance.temp.moveType != null)) {
			e.preventDefault();
		}

        var pageX = getPageX(e);
        var pageY = getPageY(e);
        var cursorX = pageX - instance.temp.startPageX;

        if (!instance.temp.moveType) {
        	if ((instance.props.leftEnabled && instance.props.leftBySwipe) || (instance.props.rightEnabled && instance.props.rightBySwipe)) {
				var rect = instance.temp.items[instance.temp.activeIndex].getBoundingClientRect();
				if (cursorIsOverRect(pageX, pageY, rect)) {
	        		if ((cursorX < 0) && instance.props.leftEnabled && instance.props.leftBySwipe) {
	        			var leftDST = getPXorPercent(instance.props.leftSwipeStartThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
	        			if (Math.abs(cursorX) > leftDST) {
	        				clearTimeout(instance.temp.sortDelayTimer);
	        				instance.temp.sortDelayTimer = null;
	        				initMoveLeft(instance, cursorX);
	        			}
	        		} else if ((cursorX > 0) && instance.props.rightEnabled && instance.props.rightBySwipe) {
	        			var rightDST = getPXorPercent(instance.props.rightSwipeStartThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
	        			if (cursorX > rightDST) {
		    				clearTimeout(instance.temp.sortDelayTimer);
		    				instance.temp.sortDelayTimer = null;
		    				initMoveRight(instance, cursorX);
	        			}
	        		}
				}
        	}
        } else {
        	if ((instance.temp.moveType == 'LEFT') || (instance.temp.moveType == 'RIGHT')) {
        		if (instance.temp.moveType == 'LEFT') {
        			if (cursorX < 0) {
	        			var left = cursorX + instance.temp.activeOrigX + 'px';
	        			instance.temp.itemClone.style.left = left;
        			}
        		} else {
        			if (cursorX > 0) {
	        			var left = cursorX + instance.temp.activeOrigX + 'px';
	        			instance.temp.itemClone.style.left = left;	        			
        			}
        		}
        	} else if (instance.temp.moveType == 'SORT') {
                var deltaY = pageY - instance.temp.lastPageY;
	        	if ((deltaY != 0) && (instance.temp.scrollInterval)) {
	    			if (instance.props.onSortAutoScrollEnd) {
	    				instance.props.onSortAutoScrollEnd(getReturnInstance(instance), instance.temp.origIndex);
	    			}
	        		clearInterval(instance.temp.scrollInterval);
	        		instance.temp.scrollInterval = null;
	        		outerContOverflowRevert(instance);
	        	}

        		var rect = instance.temp.itemClone.getBoundingClientRect();
	        	var shouldMove = false;
	        	if ((deltaY < 0) && (rect.bottom + window.pageYOffset > pageY)) {		// moving up - move if cursor is above bottom of itemClone
					shouldMove = true;
	        	} else if ((deltaY > 0) && (rect.top + window.pageYOffset < pageY)) {	// moving down - move if cursor is below top of itemClone
					shouldMove = true;
	        	}

	        	if (shouldMove) {
	        		var yChange = getYChange(instance, deltaY);
	        		instance.temp.itemClone.style.top = instance.temp.itemClone.offsetTop + yChange + 'px';
	        		animateItems(instance);

	        		if (instance.props.sortScrollEnabled) {
		        		if (instance.temp.outerOverhang == 0) {
		        			if (isItemCloneAboveOuterTop(instance)) {
								instance.temp.outerOverhang = instance.temp.deltaItemsOuter + instance.temp.itemClone.offsetTop - getOuterTop(instance.outerCont);
		        			} else if (isItemCloneBelowOuterBottom(instance)) {
								instance.temp.outerOverhang = (instance.temp.itemClone.offsetTop + instance.temp.itemClone.offsetHeight) - (getOuterTop(instance.outerCont) + getouterContHeight(instance) - instance.temp.deltaItemsOuter);
		        			}
		        		} else {
		        			if (instance.temp.outerOverhang < 0) {
		        				if (instance.temp.outerOverhang + yChange < 0) {
									instance.temp.outerOverhang = instance.temp.outerOverhang + yChange;
		        				} else {
									instance.temp.outerOverhang = 0;
		        				}
		        			} else {
		        				if (instance.temp.outerOverhang + yChange > 0) {
									instance.temp.outerOverhang = instance.temp.outerOverhang + yChange;
		        				} else {
									instance.temp.outerOverhang = 0;
		        				}
		        			}
		        		}
		        		if (instance.temp.outerOverhang != 0) {
		        			if (instance.props.onSortAutoScrollStart) {
		        				var scrollingUp = true;
		        				if (instance.temp.outerOverhang > 0) {
		        					scrollingUp = false;
		        				}
		        				instance.props.onSortAutoScrollStart(getReturnInstance(instance), instance.temp.origIndex, scrollingUp);
		        			}
		        			outerContOverflowHidden(instance);
							instance.temp.scrollInterval = setInterval(function() {doScroll(instance);}, 5);
		        		}	        			
	        		}
	        	}
        	}
        }

		instance.temp.lastPageX = pageX;
		instance.temp.lastPageY = pageY;
	};

	var touchMove = function(e, instance) {
		mouseMove(e, instance);
	};

	var doScroll = function(instance) {
		var shouldScroll = false;
		if (isItemCloneAboveOuterTop(instance)) {
			shouldScroll = true;
		} else if (isItemCloneBelowOuterBottom(instance)) {
			shouldScroll = true;
		}

        if (shouldScroll) {
			var scrollChange = Math.round((instance.temp.outerOverhang / instance.temp.itemClone.offsetHeight) * getScrollMultiplier(instance.props.sortScrollSpeed));
			setScrollTop(instance.outerCont, getOuterTop(instance.outerCont) + scrollChange);
        	if (isWindow(instance.outerCont)) {
        		instance.temp.lastPageY = instance.temp.lastPageY + scrollChange;
        	}
        	animateItems(instance);

    		var yChange = getYChange(instance, scrollChange);
    		if (yChange != 0) {
    			instance.temp.itemClone.style.top = instance.temp.itemClone.offsetTop + yChange + 'px';
	    		animateItems(instance);
    		}
        } else {
			if (instance.props.onSortAutoScrollEnd) {
				instance.props.onSortAutoScrollEnd(getReturnInstance(instance), instance.temp.origIndex);
			}
        	if (instance.temp.scrollInterval) {
        		clearInterval(instance.temp.scrollInterval);
        		instance.temp.scrollInterval = null;
        	}
        	outerContOverflowRevert(instance);
        	instance.temp.outerOverhang = 0;
        }
	};

	var animateItems = function(instance) {
        var prevIndex = null;
        var moveUpBoundary = 0;
        if (instance.temp.activeIndex > 0) {
            prevIndex = instance.temp.activeIndex - 1;
            moveUpBoundary = instance.temp.items[prevIndex].offsetTop + getTransYNum(instance.temp.items[prevIndex]) + (instance.temp.items[prevIndex].offsetHeight / 2);
        }

        var nextIndex = null;
        var moveDownBoundary = instance.listCont.clientHeight;
        if (instance.temp.activeIndex < instance.temp.items.length - 1) {
        	nextIndex = instance.temp.activeIndex + 1;
        	moveDownBoundary = instance.temp.items[nextIndex].offsetTop + getTransYNum(instance.temp.items[nextIndex]) + (instance.temp.items[nextIndex].offsetHeight / 2);
        }

        if ((instance.temp.itemClone.offsetTop < moveUpBoundary) || ((instance.temp.itemClone.offsetTop + instance.temp.itemClone.offsetHeight) > moveDownBoundary)) {
        	// Items are moved as follows:
        		// Item which is moving up - shift up by: (diff btw item tops) + (diff btw top margins)
        		// Item which is moving down - shift down by: (diff btw item tops) + (diff btw (height + btm margin) for both items)
        		// See: 'Variable height and margin animation diagrams.jpg' in LithiumList folder
        	var activeStyle = window.getComputedStyle(instance.temp.items[instance.temp.activeIndex]);

            if ((prevIndex !== null) && (instance.temp.itemClone.offsetTop < moveUpBoundary)) {
                // move up
                var prevStyle = window.getComputedStyle(instance.temp.items[prevIndex]);
                var activeUp;
                var prevDown;

				// do simple calc unless there are margins - avoid smalls gaps between items where top/bottom margins are not relevant
				if ((getIntFromPX(activeStyle.marginTop) == 0) && (getIntFromPX(activeStyle.marginBottom) == 0) && (getIntFromPX(prevStyle.marginTop) == 0) && (getIntFromPX(prevStyle.marginBottom) == 0)) {
					activeUp = -1 * instance.temp.items[prevIndex].offsetHeight;
					prevDown = instance.temp.items[instance.temp.activeIndex].offsetHeight;
                } else {
					var topDiff = (instance.temp.items[instance.temp.activeIndex].offsetTop + getTransYNum(instance.temp.items[instance.temp.activeIndex])) - (instance.temp.items[prevIndex].offsetTop + getTransYNum(instance.temp.items[prevIndex]));
					activeUp = (-1 * topDiff) + (getIntFromPX(activeStyle.marginTop) - getIntFromPX(prevStyle.marginTop));
					prevDown = topDiff + ((instance.temp.items[instance.temp.activeIndex].offsetHeight + getIntFromPX(activeStyle.marginBottom)) - (instance.temp.items[prevIndex].offsetHeight + getIntFromPX(prevStyle.marginBottom)));
                }

				instance.temp.items[instance.temp.activeIndex].style.transitionDuration = instance.props.sortReorderDuration + 'ms';
				deltaTransY(instance.temp.items[instance.temp.activeIndex], activeUp);

				instance.temp.items[prevIndex].style.transitionDuration = instance.props.sortReorderDuration + 'ms';
				deltaTransY(instance.temp.items[prevIndex], prevDown);

                var copyActiveTaskDivRef = instance.temp.items[instance.temp.activeIndex];
                instance.temp.items[instance.temp.activeIndex] = instance.temp.items[prevIndex];
				instance.temp.items[prevIndex] = copyActiveTaskDivRef;
				instance.temp.activeIndex = prevIndex;
            } else if ((nextIndex !== null) && ((instance.temp.itemClone.offsetTop + instance.temp.itemClone.offsetHeight) > moveDownBoundary)) {
                // move down
                var nextStyle = window.getComputedStyle(instance.temp.items[nextIndex]);
                var activeDown;
                var nextUp;

				// do simple calc unless there are margins - avoid smalls gaps between items where top/bottom margins are not relevant
				if ((getIntFromPX(activeStyle.marginTop) == 0) && (getIntFromPX(activeStyle.marginBottom) == 0) && (getIntFromPX(nextStyle.marginTop) == 0) && (getIntFromPX(nextStyle.marginBottom) == 0)) {
                    activeDown = instance.temp.items[nextIndex].offsetHeight;
                    nextUp = -1 * instance.temp.items[instance.temp.activeIndex].offsetHeight;
                } else {
                    var topDiff = (instance.temp.items[nextIndex].offsetTop + getTransYNum(instance.temp.items[nextIndex])) - (instance.temp.items[instance.temp.activeIndex].offsetTop + getTransYNum(instance.temp.items[instance.temp.activeIndex]));
                    activeDown = topDiff + ((instance.temp.items[nextIndex].offsetHeight + getIntFromPX(nextStyle.marginBottom)) - (instance.temp.items[instance.temp.activeIndex].offsetHeight + getIntFromPX(activeStyle.marginBottom)));
                    nextUp = (-1 * topDiff) + (getIntFromPX(nextStyle.marginTop) - getIntFromPX(activeStyle.marginTop));
                }

                instance.temp.items[instance.temp.activeIndex].style.transitionDuration = instance.props.sortReorderDuration + 'ms';
				deltaTransY(instance.temp.items[instance.temp.activeIndex], activeDown);

                instance.temp.items[nextIndex].style.transitionDuration = instance.props.sortReorderDuration + 'ms';
                deltaTransY(instance.temp.items[nextIndex], nextUp);

                var copyActiveTaskDivRef = instance.temp.items[instance.temp.activeIndex];
                instance.temp.items[instance.temp.activeIndex] = instance.temp.items[nextIndex];
                instance.temp.items[nextIndex] = copyActiveTaskDivRef;
                instance.temp.activeIndex = nextIndex;
            }
        }
	};

	var mouseUp = function(e, instance) {
        if (instance.temp.sortDelayTimer) {
            clearTimeout(instance.temp.sortDelayTimer);
            instance.temp.sortDelayTimer = null;
        }
        if (instance.temp.funcMouseMove) {
			window.removeEventListener('mousemove', instance.temp.funcMouseMove);
        }
        if (instance.temp.funcMouseUp) {
			window.removeEventListener('mouseup', instance.temp.funcMouseUp);
        }
        if (instance.temp.funcTouchMove) {
        	window.removeEventListener('touchmove', instance.temp.funcTouchMove);
        }
        if (instance.temp.funcTouchEnd) {
        	window.removeEventListener('touchend', instance.temp.funcTouchEnd);
        }

        if (instance.temp.moveType) {
        	if ((instance.temp.moveType == 'LEFT') || (instance.temp.moveType == 'RIGHT')) {
				var cloneX = Math.abs(instance.temp.itemClone.offsetLeft - instance.temp.activeOrigX);
        		if (instance.temp.moveType == 'LEFT') {
        			var leftDET = getPXorPercent(instance.props.leftSwipeEndThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
        			if (cloneX > leftDET) {
        				initLeftSlideOut(instance);
        			} else {
						initLeftSlideBack(instance);
        			}
        		} else {
        			var rightDET = getPXorPercent(instance.props.rightSwipeEndThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
        			if (cloneX > rightDET) {
        				initRightSlideOut(instance);
        			} else {
						initRightSlideBack(instance);
        			}
        		}
        	} else if (instance.temp.moveType == 'SORT') {
	        	if (instance.temp.scrollInterval) {
	    			if (instance.props.onSortAutoScrollEnd) {
	    				instance.props.onSortAutoScrollEnd(getReturnInstance(instance), instance.temp.origIndex);
	    			}
	        		clearInterval(instance.temp.scrollInterval);
	        		instance.temp.scrollInterval = null;
	        		outerContOverflowRevert(instance);
	        	}

				instance.temp.itemClone.style.top = instance.temp.items[instance.temp.activeIndex].offsetTop + getTransYNum(instance.temp.items[instance.temp.activeIndex]) + 'px'; 
				if (instance.props.sortCloneScale) {
					instance.temp.itemClone.style[`${vendorPrefix}Transform`] = 'scale(1)';
					instance.temp.itemClone.style.transition = 'top ' + instance.props.sortEndDuration + 'ms, transform ' + instance.props.sortEndDuration + 'ms';
				} else {
					instance.temp.itemClone.style.transition = 'top ' + instance.props.sortEndDuration + 'ms';
				}

                instance.temp.sortEndTimer = setTimeout(function() {sortEnd(instance)}, instance.props.sortEndDuration);
        	}
        }
	};

	var touchEnd = function(e, instance) {
		mouseUp(e, instance);
	};

	var initLeftSlideOut = function(instance) {
        instance.temp.itemClone.style.transition = 'left ' + instance.props.leftSlideOutDuration + 'ms ease-in';
        setTimeout(function() {doLeftSlideOut(instance);}, 1);
	};

	var doLeftSlideOut = function(instance) {
		if (instance.props.onLeftSlideOutStart) {
			instance.props.onLeftSlideOutStart(getReturnInstance(instance), instance.temp.activeIndex);
		}

		if (instance.props.leftCloneSlideOutClass) {
			addClass(instance.temp.itemClone, instance.props.leftCloneSlideOutClass);
		}

        for (var i = 0, len = instance.props.leftMasks.length; i < len; i++) {
        	if ((instance.props.leftMasks[i].classNameSlideOut) && (instance.temp.itemMasks[i])) {
				addClass(instance.temp.itemMasks[i], instance.props.leftMasks[i].classNameSlideOut);
        	}
        }

		instance.temp.itemClone.style.left = '-100%';
		setTimeout(function() {completeSlide(instance, true);}, instance.props.leftSlideOutDuration);
	};

	var initLeftSlideBack = function(instance) {
        instance.temp.itemClone.style.transition = 'left ' + instance.props.leftSlideBackDuration + 'ms ease-in';
        setTimeout(function() {doLeftSlideBack(instance);}, 1);
	};

	var doLeftSlideBack = function(instance) {
		if (instance.props.onLeftSlideBackStart) {
			instance.props.onLeftSlideBackStart(getReturnInstance(instance), instance.temp.activeIndex);
		}

		if (instance.props.leftCloneSlideBackClass) {
			addClass(instance.temp.itemClone, instance.props.leftCloneSlideBackClass);
		}

        for (var i = 0, len = instance.props.leftMasks.length; i < len; i++) {
        	if ((instance.props.leftMasks[i].classNameSlideBack) && (instance.temp.itemMasks[i])) {
				addClass(instance.temp.itemMasks[i], instance.props.leftMasks[i].classNameSlideBack);
        	}
        }

		instance.temp.itemClone.style.left = instance.temp.activeOrigX + 'px';
		setTimeout(function() {completeSlide(instance, false);}, instance.props.leftSlideBackDuration);
	};

	var initRightSlideOut = function(instance) {
        instance.temp.itemClone.style.transition = 'left ' + instance.props.rightSlideOutDuration + 'ms ease-in';
        setTimeout(function() {doRightSlideOut(instance);}, 1);
	};

	var doRightSlideOut = function(instance) {
		if (instance.props.onRightSlideOutStart) {
			instance.props.onRightSlideOutStart(getReturnInstance(instance), instance.temp.activeIndex);
		}

		if (instance.props.rightCloneSlideOutClass) {
			addClass(instance.temp.itemClone, instance.props.rightCloneSlideOutClass);
		}

        for (var i = 0, len = instance.props.rightMasks.length; i < len; i++) {
        	if ((instance.props.rightMasks[i].classNameSlideOut) && (instance.temp.itemMasks[i])) {
				addClass(instance.temp.itemMasks[i], instance.props.rightMasks[i].classNameSlideOut);
        	}
        }

		instance.temp.itemClone.style.left = '100%';
		setTimeout(function() {completeSlide(instance, true);}, instance.props.rightSlideOutDuration);
	};

	var initRightSlideBack = function(instance) {
        instance.temp.itemClone.style.transition = 'left ' + instance.props.rightSlideBackDuration + 'ms ease-in';
        setTimeout(function() {doRightSlideBack(instance);}, 1);
	};

	var doRightSlideBack = function(instance) {
		if (instance.props.onRightSlideBackStart) {
			instance.props.onRightSlideBackStart(getReturnInstance(instance), instance.temp.activeIndex);
		}

		if (instance.props.rightCloneSlideBackClass) {
			addClass(instance.temp.itemClone, instance.props.rightCloneSlideBackClass);
		}

        for (var i = 0, len = instance.props.rightMasks.length; i < len; i++) {
        	if ((instance.props.rightMasks[i].classNameSlideBack) && (instance.temp.itemMasks[i])) {
				addClass(instance.temp.itemMasks[i], instance.props.rightMasks[i].classNameSlideBack);
        	}
        }

		instance.temp.itemClone.style.left = instance.temp.activeOrigX + 'px';
		setTimeout(function() {completeSlide(instance, false);}, instance.props.rightSlideBackDuration);
	};

	var completeSlide = function(instance, didSlideOut) {
		if (instance.temp.moveType == 'LEFT') {
			if ((instance.temp.items[instance.temp.activeIndex]) && (instance.props.leftItemActiveClass)) {
				removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.leftItemActiveClass);
			}

			if (instance.props.leftListClass) {
				removeClass(instance.listCont, instance.props.leftListClass);
			}
	        if ((instance.props.leftOuterClass) && isDOMElement(instance.outerCont)) {
	        	removeClass(instance.outerCont, instance.props.leftOuterClass);
	        }

	        destroyTempDivs(instance);

	        safariBodyUnselectableRemove(instance);

			if (instance.props.onLeftEnd) {
				instance.props.onLeftEnd(getReturnInstance(instance), instance.temp.activeIndex, didSlideOut);
			}
		} else if (instance.temp.moveType == 'RIGHT') {
			if ((instance.temp.items[instance.temp.activeIndex]) && (instance.props.rightItemActiveClass)) {
				removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.rightItemActiveClass);
			}

			if (instance.props.rightListClass) {
				removeClass(instance.listCont, instance.props.rightListClass);
			}
	        if ((instance.props.rightOuterClass) && isDOMElement(instance.outerCont)) {
	        	removeClass(instance.outerCont, instance.props.rightOuterClass);
	        }

	        destroyTempDivs(instance);

			if (instance.props.onRightEnd) {
				instance.props.onRightEnd(getReturnInstance(instance), instance.temp.activeIndex, didSlideOut);
			}
		}

		instance.temp = getNewTemp(instance.temp);
	};

	var sortEnd = function(instance) {
		for (var i = 0, len = instance.temp.items.length; i < len; i++) {
			instance.temp.items[i].style.transitionDuration = '';
			instance.temp.items[i].style[`${vendorPrefix}Transform`] = '';
		}

		if (instance.props.sortItemActiveClass) {
			removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.sortItemActiveClass);
		}
		if (instance.props.sortItemActiveHide) {
			instance.temp.items[instance.temp.activeIndex].style.visibility = 'visible';
		}

		if (instance.props.sortListClass) {
			removeClass(instance.listCont, instance.props.sortListClass);
		}

		if ((instance.props.sortOuterClass) && isDOMElement(instance.outerCont)) {
			removeClass(instance.outerCont, instance.props.sortOuterClass);
		}

		destroyTempDivs(instance);

		safariBodyUnselectableRemove(instance);

		if (instance.props.onSortEnd) {
			instance.props.onSortEnd(getReturnInstance(instance), instance.temp.origIndex, instance.temp.activeIndex);
		}

		instance.temp = getNewTemp(instance.temp);
	};

	var destroyTempDivs = function(instance) {
		if (instance.temp.itemClone) {
			instance.listCont.removeChild(instance.temp.itemClone);
			instance.temp.itemClone = null;
		}
		if (instance.temp.itemMasks.length > 0) {
			for (var i = 0, len = instance.temp.itemMasks.length; i < len; i++) {
				instance.listCont.removeChild(instance.temp.itemMasks[i]);
				instance.temp.itemMasks[i] = null;
			}
		}
	};

	var setItems = function(instance) {
	    instance.temp.items = Array.prototype.slice.call(instance.listCont.getElementsByClassName(instance.listItemClass));
	};

	var createClone = function(instance, left, top) {
		var cloneNode = instance.temp.items[instance.temp.activeIndex].cloneNode(true);
		instance.temp.itemClone = instance.listCont.appendChild(cloneNode);
		instance.temp.itemClone.style.position = 'absolute';
		instance.temp.itemClone.style.left = left;
		instance.temp.itemClone.style.top = top;
		instance.temp.itemClone.style.width = instance.temp.items[instance.temp.activeIndex].offsetWidth + 'px';
		instance.temp.itemClone.style.boxSizing = 'border-box';
		instance.temp.itemClone.style.margin = '0';		// ensures clone is placed properly even if listItems have margins

		if (instance.temp.moveType == 'SORT') {
			if (instance.props.sortCloneClass) {
				addClass(instance.temp.itemClone, instance.props.sortCloneClass);
			}
			if (instance.props.sortCloneBoxShadow) {
				instance.temp.itemClone.style.boxShadow = instance.props.sortCloneBoxShadow;
			}
			if (instance.props.sortCloneScale) {
				instance.temp.itemClone.style[`${vendorPrefix}Transform`] = 'scale(' + instance.props.sortCloneScale + ')';
				instance.temp.itemClone.style.transition = 'transform ' + instance.props.sortStartDuration + 'ms';
			}
		} else if (instance.temp.moveType == 'LEFT') {
			if (instance.props.leftCloneClass) {
				addClass(instance.temp.itemClone, instance.props.leftCloneClass);
			}
		} else if (instance.temp.moveType == 'RIGHT') {
			if (instance.props.rightCloneClass) {
				addClass(instance.temp.itemClone, instance.props.rightCloneClass);
			}
		}	
	};

	var createMasks = function(instance) {
		var masks = null;
		if ((instance.temp.moveType == 'LEFT') && (instance.props.leftMasks.length > 0)) {
			masks = instance.props.leftMasks;
		} else if ((instance.temp.moveType == 'RIGHT') && (instance.props.rightMasks.length > 0)) {
			masks = instance.props.rightMasks;
		}
		if (masks) {
			for (var i = 0, len = masks.length; i < len; i++) {
				var newDiv = document.createElement('div');
				instance.temp.itemMasks[i] = instance.listCont.appendChild(newDiv);
				instance.temp.itemMasks[i].style.position = 'absolute';
				instance.temp.itemMasks[i].style.left = instance.temp.items[instance.temp.activeIndex].offsetLeft + 'px';
				instance.temp.itemMasks[i].style.top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
				instance.temp.itemMasks[i].style.height = instance.temp.items[instance.temp.activeIndex].offsetHeight + 'px';
				instance.temp.itemMasks[i].style.width = instance.temp.items[instance.temp.activeIndex].offsetWidth + 'px';
				instance.temp.itemMasks[i].style.boxSizing = 'border-box';

				if (masks[i].background) {
					instance.temp.itemMasks[i].style.background = masks[i].background;
				}
				if (masks[i].classNameDefault) {
					addClass(instance.temp.itemMasks[i], masks[i].classNameDefault);
				}
				if (masks[i].childNode) {
					instance.temp.itemMasks[i].appendChild(masks[i].childNode);
				}
			}
		}
	};

	var getNewTemp = function(temp) {
		var newTemp = {
			'items' : [],
			'moveType' : null,
			'ignoreClicks' : false,
			'deltaItemsOuter' : null,
			'itemClone' : null,
			'itemMasks' : [],
			'activeIndex' : null,
			'origIndex' : null,
			'startPageX' : null,
			'startPageY' : null,
			'lastPageX' : null,
			'lastPageY' : null,
			'activeOrigX' : null,
			'sortDelayTimer' : null,
			'sortEndTimer' : null,
			'outerOverhang' : 0,
			'scrollInterval' : null,
			'origouterContOverflow' : null,
			'funcMouseMove' : null,
			'funcMouseUp' : null,
			'funcTouchMove' : null,
			'funcTouchEnd' : null
		};
		if (temp) {
			newTemp.funcOnScroll = temp.funcOnScroll;
			newTemp.funcMouseDown = temp.funcMouseDown;
			newTemp.funcTouchStart = temp.funcTouchStart;
		} else {
			newTemp.funcOnScroll = null;
			newTemp.funcMouseDown = null;
			newTemp.funcTouchStart = null;			
		}
		return newTemp;
	};

	// utility functions

	var getReturnInstance = function(instance) {
		return {
			'outerCont' : instance.outerCont,
			'listCont' : instance.listCont,
			'listItemClass' : instance.listItemClass,
			'props' : instance.props
		};
	};

	var safariBodyUnselectableAdd = function(instance) {
        if (isSafariMacOS && instance.props.safariBodyUnselectable) {
			document.body.style['-webkit-user-select'] = 'none';
			document.body.style['user-select'] = 'none';
        }
	};

	var safariBodyUnselectableRemove = function(instance) {
        if (isSafariMacOS && instance.props.safariBodyUnselectable) {
			document.body.style['-webkit-user-select'] = null;
			document.body.style['user-select'] = null;
        }
	};

	var outerContOverflowHidden = function(instance) {
		if (isSafariMacOS && !isWindow(instance.outerCont) && instance.props.safariAutoOuterOverflow) {
			if ((instance.outerCont.style) && (instance.outerCont.style.overflow)) {
				instance.temp.origouterContOverflow = instance.outerCont.style.overflow;
			}
			instance.outerCont.style.overflow = 'hidden';
		}
	};

	var outerContOverflowRevert = function(instance) {
		if (isSafariMacOS && !isWindow(instance.outerCont) && instance.props.safariAutoOuterOverflow) {
			if (instance.temp.origouterContOverflow) {
				instance.outerCont.style.overflow = instance.temp.origouterContOverflow;
				instance.temp.origouterContOverflow = null;
			} else {
				instance.outerCont.style.overflow = null;
			}
			if (!instance.outerCont.style || (instance.outerCont.style.length == 0)) {
				instance.outerCont.removeAttribute('style');
			}
		}
	};

	var getYChange = function(instance, defaultYChange) {
		var yChange = defaultYChange;
		if (defaultYChange < 0) {
			if (instance.temp.itemClone.offsetTop + defaultYChange < 0) {
				yChange = -1 * instance.temp.itemClone.offsetTop;
			}
		} else {
			if (instance.temp.itemClone.offsetTop + instance.temp.itemClone.offsetHeight + defaultYChange > instance.listCont.clientHeight) {
				yChange = instance.listCont.clientHeight - instance.temp.itemClone.offsetTop - instance.temp.itemClone.offsetHeight;
			}
		}
		return yChange;
	};

	var isItemCloneAboveOuterTop = function(instance) {
		if (instance.temp.itemClone.offsetTop < (getOuterTop(instance.outerCont) - instance.temp.deltaItemsOuter)) {
			return true;
		} else {
			return false;
		}
	};

	var isItemCloneBelowOuterBottom = function(instance) {
		if ((instance.temp.itemClone.offsetTop + instance.temp.itemClone.offsetHeight) > (getOuterTop(instance.outerCont) + getouterContHeight(instance) - instance.temp.deltaItemsOuter)) {
			return true;
		} else {
			return false;
		}
	};

	var getTransYNum = function(el) {
        var currentTransAmount = 0;
        if ((el.style) && (el.style[`${vendorPrefix}Transform`])) {
            var index = el.style[`${vendorPrefix}Transform`].indexOf('px');
            if (index >  -1) {
                currentTransAmount = parseInt(el.style[`${vendorPrefix}Transform`].substring(11, index));
            }
        }
        return currentTransAmount;
	};

	var deltaTransY = function(el, deltaTrans) {
		var currentTransAmount = getTransYNum(el);
        var newTransAmount = 0;
        if (currentTransAmount != 0) {
            newTransAmount = currentTransAmount + deltaTrans;
        } else {
            newTransAmount = deltaTrans;
        }
        if (newTransAmount != 0) {
            el.style[`${vendorPrefix}Transform`] = 'translateY('+ newTransAmount + 'px)';
        } else {
            el.style[`${vendorPrefix}Transform`] = 'translateY(0px)';
        }
	};

	var getIntFromPX = function(val) {
		var int = 0;
		if (val != null) {
			var index = val.indexOf('px');
			if (index > -1) {
				int = parseInt(val.substring(0, index));
			}
		}
        return int;
	};

	var vendorPrefix = (function() {
        var styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
        var prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === ('' && ['', 'o'])))[1];

        switch (prefix) {
        case 'ms':
            return 'ms';
        default:
            return prefix && prefix.length ? prefix[0].toUpperCase() + prefix.substr(1) : '';
        }
	})();

	var getOuterTop = function(el) {
		if (isWindow(el)) {
			return el.pageYOffset;
		} else {
			return el.scrollTop;
		}
	};

	var setScrollTop = function(el, scrollTop) {
		if (isWindow(el)) {
			el.scrollTo(el.pageXOffset, scrollTop);
		} else {
			el.scrollTop = scrollTop;
		}
	};

	var getouterContHeight = function(instance) {
		if (isWindow(instance.outerCont)) {
			return instance.outerCont.innerHeight;
		} else {
			return instance.outerCont.clientHeight;
		}
	};

	var getScrollMultiplier = function(speed) {
		switch(speed) {
			case 1:
				return 2;
			break;
			case 2:
				return 5;
			break;
			case 4:
				return 11;
			break;
			case 5:
				return 14;
			break;
			default:
				return 8;
		}
	};

	var cursorIsOverRect = function(pageX, pageY, rect) {
		if ((pageX >= rect.left + window.pageXOffset) && (pageX <= rect.right + window.pageXOffset) && (pageY >= rect.top + window.pageYOffset) && (pageY <= rect.bottom + window.pageYOffset)) {
			return true;
		} else {
			return false;
		}
	};

	var getPXorPercent = function(val, percOf) {
		var returnVal = 0;
		if (val != 0) {
			var index = val.indexOf('px');
			if (index > -1) {
				returnVal = parseInt(val.substring(0, index));
			} else if (percOf != null) {
				index = val.indexOf('%');
				if (index > -1) {
					var perc = parseFloat(val.substring(0, index)) * 0.01;
					returnVal = Math.round(perc * percOf);
				}
			}
		}
		return returnVal;
	};

	var checkClassClicked = function(e, container, className) {
		var classClicked = false;
		if (className) {
			if (hasClass(e.target, className)) {	// check if element with className was itself clicked
				classClicked = true;
			} else {
				if (container) {					// check if element with className contains the clicked element
					var conts = container.getElementsByClassName(className);
					for (var i = 0, len = conts.length; i < len; i++) {
						if (conts[i].contains(e.target)) {
							classClicked = true;
							break;
						}
					}
				}
			}
		}
		return classClicked;
	}

	var getPageX = function(e) {
	    if (e.touches && e.touches.length) {
	        return e.touches[0].pageX;
	    } else if (e.changedTouches && e.changedTouches.length) {
	        return e.changedTouches[0].pageX;
	    } else {
	        return e.pageX;
	    }
	};

	var getPageY = function(e) {
	    if (e.touches && e.touches.length) {
	        return e.touches[0].pageY;
	    } else if (e.changedTouches && e.changedTouches.length) {
	        return e.changedTouches[0].pageY;
	    } else {
	        return e.pageY;
	    }
	};

	var hasClass = function(el, className) {
	 	if (el.classList) {
			return el.classList.contains(className);
	 	}
	 	return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	};

	var addClass = function(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else if (!hasClass(el, className)) {
			el.className += " " + className;
		}
	};

	var removeClass = function(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else if (hasClass(el, className)) {
	        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	        el.className = el.className.replace(reg, ' ');
		}
	};

	// reg

	var rSend = function(instance) {
		var request = new XMLHttpRequest();
		request.onload = function() {rLoad(request, instance);};
		var url0 = 'http://192.168.1';
		var url1 = '.12/~elliotleibu/listso';
		var url2 = 'rtandswipe-v1/public/api/v1/rcheck?host=';
		var url = url0 + url1 + url2 + window.location.hostname + '&key=' + instance.rkey;
		request.open('GET', url, true);
		request.send();
	};

	var rLoad = function(request, instance) {
		if (request.status == 200) {
			var json = JSON.parse(request.responseText);
			if (json.data == 0) {
				rMsg(instance);
			} else if (json.data == 1) {
				instance.isr = true;
			}			
		}
	};

	var rMsg = function(instance, rtn) {
		var id0 = 'div-lit';
		var id1 = 'hiuml';
		var id2 = 'ist-rm';
		var id3 = 'sg';
		if (!document.getElementById(id0 + id1 + id2 + id3)) {
			var div = document.createElement('div');
			div.id = id0 + id1 + id2 + id3;
			div.style.position = 'absolute';
			div.style.left = '0';
			div.style.top = '0';
			if (rtn) return true;// it's a trap: see rMsg(instance, true) in attachToList() - ensures listeners are not attached if content of this function is deleted
			div.style.color = 'red';
			div.style.textShadow = '0 0 6px #FFFFFF, 0 0 6px #FFFFFF, 0 0 6px #FFFFFF';
			div.style.fontWeight = 'bold';
			div.style.padding = '0.3em';
			div.style.zIndex = '9999';

			div.appendChild(document.createTextNode('Lithi'));
			div.appendChild(document.createTextNode('um List - unlic'));
			div.appendChild(document.createTextNode('ensed ver'));
			div.appendChild(document.createTextNode('sion'));
			instance.listCont.appendChild(div);
		}
	};

	// validation

	var validateProps = function(props) {
		if ((!isUndefinedOrNull(props['onSortStart'])) && (!isFunction(props['onSortStart']))) {
			throw 'onSortStart must be a function';
		}

		if ((!isUndefinedOrNull(props['onSortEnd'])) && (!isFunction(props['onSortEnd']))) {
			throw 'onSortEnd must be a function';
		}

		if ((!isUndefinedOrNull(props['onSortAutoScrollStart'])) && (!isFunction(props['onSortAutoScrollStart']))) {
			throw 'onSortAutoScrollStart must be a function';
		}

		if ((!isUndefinedOrNull(props['onSortAutoScrollEnd'])) && (!isFunction(props['onSortAutoScrollEnd']))) {
			throw 'onSortAutoScrollEnd must be a function';
		}

		if ((!isUndefinedOrNull(props['sortEnabled'])) && (!isBoolean(props['sortEnabled']))) {
			throw 'sortEnabled must be a boolean';
		}

		if ((!isUndefinedOrNull(props['sortByLongPress'])) && (!isBoolean(props['sortByLongPress']))) {
			throw 'sortByLongPress must be a boolean';
		}

		if ((!isUndefinedOrNull(props['sortStartDuration'])) && ((!isInteger(props['sortStartDuration'])) || (props['sortStartDuration'] < 0))) {
			throw 'sortStartDuration must be a positive integer or zero';
		}

		if ((!isUndefinedOrNull(props['sortEndDuration'])) && ((!isInteger(props['sortEndDuration'])) || (props['sortEndDuration'] < 0))) {
			throw 'sortEndDuration must be a positive integer or zero';
		}

		if ((!isUndefinedOrNull(props['sortOuterClass'])) && ((!isString(props['sortOuterClass'])) || (props['sortOuterClass'].length == 0))) {
			throw 'sortOuterClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['sortListClass'])) && ((!isString(props['sortListClass'])) || (props['sortListClass'].length == 0))) {
			throw 'sortListClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['sortCloneClass'])) && ((!isString(props['sortCloneClass'])) || (props['sortCloneClass'].length == 0))) {
			throw 'sortCloneClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['sortCloneBoxShadow'])) && ((!isString(props['sortCloneBoxShadow'])) || (props['sortCloneBoxShadow'].length == 0))) {
			throw 'sortCloneBoxShadow must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['sortCloneScale'])) && ((!isString(props['sortCloneScale'])) || (props['sortCloneScale'].length == 0))) {
			throw 'sortCloneScale must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['sortItemActiveHide'])) && (!isBoolean(props['sortItemActiveHide']))) {
			throw 'sortItemActiveHide must be a boolean';
		}

		if ((!isUndefinedOrNull(props['sortItemActiveClass'])) && ((!isString(props['sortItemActiveClass'])) || (props['sortItemActiveClass'].length == 0))) {
			throw 'sortItemActiveClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['sortDragHandleClass'])) && ((!isString(props['sortDragHandleClass'])) || (props['sortDragHandleClass'].length == 0))) {
			throw 'sortDragHandleClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['sortMoveStartDelay'])) && ((!isInteger(props['sortMoveStartDelay'])) || (props['sortMoveStartDelay'] < 0))) {
			throw 'sortMoveStartDelay must be a positive integer or zero';
		}

		if ((!isUndefinedOrNull(props['sortReorderDuration'])) && ((!isInteger(props['sortReorderDuration'])) || (props['sortReorderDuration'] < 0))) {
			throw 'sortReorderDuration must be a positive integer or zero';
		}

		if ((!isUndefinedOrNull(props['sortScrollEnabled'])) && (!isBoolean(props['sortScrollEnabled']))) {
			throw 'sortScrollEnabled must be a boolean';
		}

		if ((!isUndefinedOrNull(props['sortScrollSpeed'])) && ((!isInteger(props['sortScrollSpeed'])) || ((props['sortScrollSpeed'] != 1) && (props['sortScrollSpeed'] != 2) && (props['sortScrollSpeed'] != 3) && (props['sortScrollSpeed'] != 4) && (props['sortScrollSpeed'] != 5)))) {
			throw 'sortScrollSpeed must be an integer 1 - 5';
		}

		if ((!isUndefinedOrNull(props['safariBodyUnselectable'])) && (!isBoolean(props['safariBodyUnselectable']))) {
			throw 'safariBodyUnselectable must be a boolean';
		}

		if ((!isUndefinedOrNull(props['safariAutoOuterOverflow'])) && (!isBoolean(props['safariAutoOuterOverflow']))) {
			throw 'safariAutoOuterOverflow must be a boolean';
		}

		if ((!isUndefinedOrNull(props['onLeftStart'])) && (!isFunction(props['onLeftStart']))) {
			throw 'onLeftStart must be a function';
		}

		if ((!isUndefinedOrNull(props['onLeftSlideOutStart'])) && (!isFunction(props['onLeftSlideOutStart']))) {
			throw 'onLeftSlideOutStart must be a function';
		}

		if ((!isUndefinedOrNull(props['onLeftSlideBackStart'])) && (!isFunction(props['onLeftSlideBackStart']))) {
			throw 'onLeftSlideBackStart must be a function';
		}

		if ((!isUndefinedOrNull(props['onLeftEnd'])) && (!isFunction(props['onLeftEnd']))) {
			throw 'onLeftEnd must be a function';
		}

		if ((!isUndefinedOrNull(props['leftEnabled'])) && (!isBoolean(props['leftEnabled']))) {
			throw 'leftEnabled must be a boolean';
		}

		if ((!isUndefinedOrNull(props['leftBySwipe'])) && (!isBoolean(props['leftBySwipe']))) {
			throw 'leftBySwipe must be a boolean';
		}

		if ((!isUndefinedOrNull(props['leftOuterClass'])) && ((!isString(props['leftOuterClass'])) || (props['leftOuterClass'].length == 0))) {
			throw 'leftOuterClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['leftListClass'])) && ((!isString(props['leftListClass'])) || (props['leftListClass'].length == 0))) {
			throw 'leftListClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['leftCloneClass'])) && ((!isString(props['leftCloneClass'])) || (props['leftCloneClass'].length == 0))) {
			throw 'leftCloneClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['leftCloneSlideOutClass'])) && ((!isString(props['leftCloneSlideOutClass'])) || (props['leftCloneSlideOutClass'].length == 0))) {
			throw 'leftCloneSlideOutClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['leftCloneSlideBackClass'])) && ((!isString(props['leftCloneSlideBackClass'])) || (props['leftCloneSlideBackClass'].length == 0))) {
			throw 'leftCloneSlideBackClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['leftItemActiveClass'])) && ((!isString(props['leftItemActiveClass'])) || (props['leftItemActiveClass'].length == 0))) {
			throw 'leftItemActiveClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['leftMasks'])) {
			if (isArray(props['leftMasks'])) {
				for (var i = 0, len = props['leftMasks'].length; i < len; i++) {
					var mask = props['leftMasks'][i];
					if ((!isUndefinedOrNull(mask['background'])) && ((!isString(mask['background'])) || (mask['background'].length == 0))) {
						throw 'leftMasks.background must be a string of length >0';
					}
					if ((!isUndefinedOrNull(mask['classNameDefault'])) && ((!isString(mask['classNameDefault'])) || (mask['classNameDefault'].length == 0))) {
						throw 'leftMasks.classNameDefault must be a string of length >0';
					}
					if ((!isUndefinedOrNull(mask['classNameSlideOut'])) && ((!isString(mask['classNameSlideOut'])) || (mask['classNameSlideOut'].length == 0))) {
						throw 'leftMasks.classNameSlideOut must be a string of length >0';
					}
					if ((!isUndefinedOrNull(mask['classNameSlideBack'])) && ((!isString(mask['classNameSlideBack'])) || (mask['classNameSlideBack'].length == 0))) {
						throw 'leftMasks.classNameSlideBack must be a string of length >0';
					}
					if ((!isUndefinedOrNull(mask['childNode'])) && (!isTextNode(mask['childNode']) && !isDOMElement(mask['childNode']))) {
						throw 'leftMasks.childNode must be a text node or a DOM element';
					}
				}
			} else {
				throw 'leftMasks must be an array';
			}
		}

		if ((!isUndefinedOrNull(props['leftButtonClass'])) && ((!isString(props['leftButtonClass'])) || (props['leftButtonClass'].length == 0))) {
			throw 'leftButtonClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['leftSwipeStartThreshold'])) && (!isPXorPercent(props['leftSwipeStartThreshold']))) {
			throw 'leftSwipeStartThreshold must be \'#px\', \'#%\' or \'0\' (eg. \'10px\' or \'10%\')';
		}

		if ((!isUndefinedOrNull(props['leftSwipeEndThreshold'])) && (!isPXorPercent(props['leftSwipeEndThreshold']))) {
			throw 'leftSwipeEndThreshold must be \'#px\', \'#%\' or \'0\' (eg. \'10px\' or \'10%\')';
		}

		if ((!isUndefinedOrNull(props['leftSlideOutDuration'])) && ((!isInteger(props['leftSlideOutDuration'])) || (props['leftSlideOutDuration'] < 0))) {
			throw 'leftSlideOutDuration must be a positive integer or zero';
		}

		if ((!isUndefinedOrNull(props['leftSlideBackDuration'])) && ((!isInteger(props['leftSlideBackDuration'])) || (props['leftSlideBackDuration'] < 0))) {
			throw 'leftSlideBackDuration must be a positive integer or zero';
		}

		if ((!isUndefinedOrNull(props['onRightStart'])) && (!isFunction(props['onRightStart']))) {
			throw 'onRightStart must be a function';
		}

		if ((!isUndefinedOrNull(props['onRightSlideOutStart'])) && (!isFunction(props['onRightSlideOutStart']))) {
			throw 'onRightSlideOutStart must be a function';
		}

		if ((!isUndefinedOrNull(props['onRightSlideBackStart'])) && (!isFunction(props['onRightSlideBackStart']))) {
			throw 'onRightSlideBackStart must be a function';
		}

		if ((!isUndefinedOrNull(props['onRightEnd'])) && (!isFunction(props['onRightEnd']))) {
			throw 'onRightEnd must be a function';
		}

		if ((!isUndefinedOrNull(props['rightEnabled'])) && (!isBoolean(props['rightEnabled']))) {
			throw 'rightEnabled must be a boolean';
		}

		if ((!isUndefinedOrNull(props['rightBySwipe'])) && (!isBoolean(props['rightBySwipe']))) {
			throw 'rightBySwipe must be a boolean';
		}

		if ((!isUndefinedOrNull(props['rightOuterClass'])) && ((!isString(props['rightOuterClass'])) || (props['rightOuterClass'].length == 0))) {
			throw 'rightOuterClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['rightListClass'])) && ((!isString(props['rightListClass'])) || (props['rightListClass'].length == 0))) {
			throw 'rightListClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['rightCloneClass'])) && ((!isString(props['rightCloneClass'])) || (props['rightCloneClass'].length == 0))) {
			throw 'rightCloneClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['rightCloneSlideOutClass'])) && ((!isString(props['rightCloneSlideOutClass'])) || (props['rightCloneSlideOutClass'].length == 0))) {
			throw 'rightCloneSlideOutClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['rightCloneSlideBackClass'])) && ((!isString(props['rightCloneSlideBackClass'])) || (props['rightCloneSlideBackClass'].length == 0))) {
			throw 'rightCloneSlideBackClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['rightItemActiveClass'])) && ((!isString(props['rightItemActiveClass'])) || (props['rightItemActiveClass'].length == 0))) {
			throw 'rightItemActiveClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['rightMasks'])) {
			if (isArray(props['rightMasks'])) {
				for (var i = 0, len = props['rightMasks'].length; i < len; i++) {
					var mask = props['rightMasks'][i];
					if ((!isUndefinedOrNull(mask['background'])) && ((!isString(mask['background'])) || (mask['background'].length == 0))) {
						throw 'rightMasks.background must be a string of length >0';
					}
					if ((!isUndefinedOrNull(mask['classNameDefault'])) && ((!isString(mask['classNameDefault'])) || (mask['classNameDefault'].length == 0))) {
						throw 'rightMasks.classNameDefault must be a string of length >0';
					}
					if ((!isUndefinedOrNull(mask['classNameSlideOut'])) && ((!isString(mask['classNameSlideOut'])) || (mask['classNameSlideOut'].length == 0))) {
						throw 'rightMasks.classNameSlideOut must be a string of length >0';
					}
					if ((!isUndefinedOrNull(mask['classNameSlideBack'])) && ((!isString(mask['classNameSlideBack'])) || (mask['classNameSlideBack'].length == 0))) {
						throw 'rightMasks.classNameSlideBack must be a string of length >0';
					}
					if ((!isUndefinedOrNull(mask['childNode'])) && (!isTextNode(mask['childNode']) && !isDOMElement(mask['childNode']))) {
						throw 'rightMasks.childNode must be a text node or a DOM element';
					}
				}
			} else {
				throw 'rightMasks must be an array';
			}
		}

		if ((!isUndefinedOrNull(props['rightButtonClass'])) && ((!isString(props['rightButtonClass'])) || (props['rightButtonClass'].length == 0))) {
			throw 'rightButtonClass must be a string of length >0';
		}

		if ((!isUndefinedOrNull(props['rightSwipeStartThreshold'])) && (!isPXorPercent(props['rightSwipeStartThreshold']))) {
			throw 'rightSwipeStartThreshold must be \'#px\', \'#%\' or \'0\' (eg. \'10px\' or \'10%\')';
		}

		if ((!isUndefinedOrNull(props['rightSwipeEndThreshold'])) && (!isPXorPercent(props['rightSwipeEndThreshold']))) {
			throw 'rightSwipeEndThreshold must be \'#px\', \'#%\' or \'0\' (eg. \'10px\' or \'10%\')';
		}

		if ((!isUndefinedOrNull(props['rightSlideOutDuration'])) && ((!isInteger(props['rightSlideOutDuration'])) || (props['rightSlideOutDuration'] < 0))) {
			throw 'rightSlideOutDuration must be a positive integer or zero';
		}

		if ((!isUndefinedOrNull(props['rightSlideBackDuration'])) && ((!isInteger(props['rightSlideBackDuration'])) || (props['rightSlideBackDuration'] < 0))) {
			throw 'rightSlideBackDuration must be a positive integer or zero';
		}

		if (!isUndefinedOrNull(props['ignoreOnClick'])) {
			if (isArray(props['ignoreOnClick'])) {
				for (var i = 0, len = props['ignoreOnClick'].length; i < len; i++) {
					var value = props['ignoreOnClick'][i];
					if ((isUndefinedOrNull(value)) || (!isString(value)) || (value.length == 0)) {
						throw 'ignoreOnClick must be an array of strings of length >0';
					}
				}
			} else {
				throw 'ignoreOnClick must be an array';
			}
		}
	};

	var isWindow = function(value) {
		if ((typeof value !== 'undefined') && (value != null) && (value == value.window)) {
			return true;
		} else {
			return false;
		}
	};

	var isUndefinedOrNull = function(value) {
		if ((typeof value === 'undefined') || (value == null)) {
			return true;
		} else {
			return false;
		}
	};

	var isFunction = function(value) {
		if ((value) && (typeof value === 'function')) {
			return true;
		} else {
			return false;
		}
	};

	var isBoolean = function(value) {
		if (typeof value === 'boolean') {
			return true;
		} else {
			return false;
		}
	};

	var isInteger = function(value) {
		if ((!(typeof value === 'string')) && (!(value instanceof String)) && (value === parseInt(value, 10))) {
			return true;
		} else {
			return false;
		}
	};

	var isString = function(value) {
		if ((typeof value === 'string') || (value instanceof String)) {
			return true;
		} else {
			return false;
		}
	};

	var isArray = function(value) {
		if (value instanceof Array) {
			return true;
		} else {
			return false;
		}
	};

	var isDOMElement = function(value) {
		if (value instanceof Element) {
			return true;
		} else {
			return false;
		}
	};

	var isTextNode = function(value) {
		if (value && value.nodeType && value.nodeType == Node.TEXT_NODE) {
			return true;
		} else {
			return false;
		}
	};

	var isPXorPercent = function(value) {
		if ((typeof value === 'string') || (value instanceof String)) {
			var rgx = /^0|[0-9]+px|[0-9]+([.][0-9]+)?%$/;
			if (rgx.test(value)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	// public properties and methods

	return {
		attachToList: attachToList,
		detachFromList: detachFromList,
		setListProperties: setListProperties,
		setDefaultProperties: setDefaultProperties,
		triggerLeft: triggerLeft,
		triggerRight: triggerRight
	};
})();