/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/lithiumlist-pro-1.0.0.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lithiumlistPro", function() { return lithiumlistPro; });


// BROWSER COMPATIBIILITY
// IE 9
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


// Notes:
// listCont should have 'position: relative'
// need to set css 'box-shadow' for 'clone-sort' class if want sort clone to have a drop shadow
// need to set css for 'sort-item-active' to hide active item while sorting
// add 'unselectedable' classes (with vendor prefixes) to prevent text selection
// eventsTarget should be 'window' on desktop and NOT 'window' or 'body' on mobile
// if 'left/righMaskClass' is not set, mask is not created
// sortScrollSpeed: 1, 2, 3, 4, 5 (default = 3)
// leftMasks / rightMasks must be arrays (not null) and leftMasks.classNameDefault must not be undefined or null
// setDefaultProperties only applies to instances created after it is called (use setListProperties to change properties for a paticular instance)


// Pipeline:
// confirm left / right
// left / right buttons
// elastic drag left / right
// slow auto scroll when approach top / bottom


// Known issues:
// * Position of itemCont behaves strangely when item-cont has a top or bottom margin. Temporary resolution is to remove the margin, insert a child div and add a margin to that.
// * Cursor is sometimes far above itemCont but still moving it (seems to happen only when moving up, but not sure).


// TODO: If leftMasks / rightMasks have length > 1, shorten them!!!
// TODO: Test using window as scrollCont
// TODO: Do not add classes to scrollCont if it is 'window'
// TODO: Remove .version() from webpack.mix.js?


var lithiumlistPro = function () {
	var instances = [];

	var defaultProperties = {
		onSortStart: null,
		onSortEnd: null,
		sortEnabled: true,
		sortByDrag: true,
		sortScrollClass: 'sort-scroll',
		sortCloneClass: 'sort-clone',
		sortItemActiveClass: 'sort-item-active',
		sortDragHandleClass: 'sort-drag-handle',
		sortMoveStartDelay: 400,
		sortReorderDuration: 200,
		sortEndDockDuration: 200,
		sortScrollSpeed: 3,
		onLeftStart: null,
		onLeftSlideOutStart: null,
		onLeftSlideBackStart: null,
		onLeftEnd: null,
		leftEnabled: true,
		leftByDrag: true,
		leftScrollClass: 'left-scroll',
		leftCloneClass: 'left-clone',
		leftCloneSlideOutClass: 'left-clone-slide-out',
		leftCloneSlideBackClass: 'left-clone-slide-back',
		leftItemActiveClass: 'left-item-active',
		leftMasks: [{
			classNameDefault: 'left-mask',
			classNameSlideOut: 'left-mask-slide-out',
			classNameSlideBack: 'left-mask-slide-back',
			childNode: null
		}],
		leftDragHandleClass: 'left-drag-handle',
		leftDragStartThreshold: '10%',
		leftDragEndThreshold: '30%',
		leftSlideOutDuration: 300,
		leftSlideBackDuration: 200,
		onRightStart: null,
		onRightSlideOutStart: null,
		onRightSlideBackStart: null,
		onRightEnd: null,
		rightEnabled: true,
		rightByDrag: true,
		rightScrollClass: 'right-scroll',
		rightCloneClass: 'right-clone',
		rightCloneSlideOutClass: 'right-clone-slide-out',
		rightCloneSlideBackClass: 'right-clone-slide-back',
		rightItemActiveClass: 'right-item-active',
		rightMasks: [{
			classNameDefault: 'right-mask',
			classNameSlideOut: 'right-mask-slide-out',
			classNameSlideBack: 'right-mask-slide-back',
			childNode: null
		}],
		rightDragHandleClass: 'right-drag-handle',
		rightDragStartThreshold: '10px',
		rightDragEndThreshold: '30%',
		rightSlideOutDuration: 300,
		rightSlideBackDuration: 200,
		ignoreOnClick: ['input', 'textarea', 'select', 'option', 'button']
	};

	var setDefaultProperties = function setDefaultProperties(newDefaultProperties) {
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
		}
	};

	var setListProperties = function setListProperties(listCont, listProperties) {
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

	var attachToList = function attachToList(listCont, scrollCont, eventsTarget, listItemClass, listProperties) {
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

		if (isUndefinedOrNull(scrollCont)) {
			scrollCont = window;
		} else {
			if (isDOMElement(scrollCont)) {
				if (scrollCont === listCont) {
					console.warn('Auto scrolling may not work where scrollCont === listCont');
				} else {
					if (scrollCont !== window && !scrollCont.contains(listCont)) {
						throw 'scrollCont must contain listCont';
					}
				}
			} else {
				throw 'scrollCont must be a DOM element';
			}
		}

		if (isUndefinedOrNull(eventsTarget)) {
			eventsTarget = window;
		}

		if (isUndefinedOrNull(listItemClass) || !isString(listItemClass) || listItemClass.length == 0) {
			throw 'listItemClass must be a string of length > 0';
		}

		var props = {};
		if (!isUndefinedOrNull(listProperties)) {
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

		var instance = {
			'scrollCont': scrollCont,
			'listCont': listCont,
			'eventsTarget': eventsTarget,
			'listItemClass': listItemClass,
			'deltaItemsScroll': getDeltaWithParent(listCont, scrollCont, 0),
			'props': props,
			'temp': getEmptyTemp()
		};
		instances.push(instance);

		instance.temp.funcOnScroll = function (e) {
			onScroll(e, instance);
		};
		instance.temp.funcMouseDown = function (e) {
			mouseDown(e, instance);
		};
		instance.temp.funcTouchStart = function (e) {
			touchStart(e, instance);
		};
		instance.scrollCont.addEventListener('scroll', instance.temp.funcOnScroll);
		instance.listCont.addEventListener('mousedown', instance.temp.funcMouseDown);
		instance.listCont.addEventListener('touchstart', instance.temp.funcTouchStart);
	};

	var getEmptyTemp = function getEmptyTemp() {
		return {
			'items': [],
			'moveType': null,
			'itemClone': null,
			'itemMasks': [],
			'activeIndex': null,
			'origIndex': null,
			'startPageX': null,
			'startPageY': null,
			'lastPageX': null,
			'lastPageY': null,
			'sortDelayTimer': null,
			'sortEndTimer': null,
			'scrollInterval': null,
			'funcOnScroll': null,
			'funcMouseDown': null,
			'funcTouchStart': null,
			'funcMouseMove': null,
			'funcMouseUp': null,
			'funcTouchMove': null,
			'funcTouchEnd': null
		};
	};

	var onScroll = function onScroll(e, instance) {
		if (instance.temp.sortDelayTimer) {
			clearTimeout(instance.temp.sortDelayTimer);
			instance.temp.sortDelayTimer = null;
		}
	};

	var mouseDown = function mouseDown(e, instance) {
		if (instance != null && (instance.props.sortEnabled || instance.props.leftEnabled || instance.props.rightEnabled)) {
			setItems(instance);

			var index = null;
			for (var i = 0, len = instance.temp.items.length; i < len; i++) {
				if (instance.temp.items[i] === e.target || instance.temp.items[i].contains(e.target)) {
					index = i;
					break;
				}
			}

			if (index != null) {
				if (instance.props.sortEnabled && checkClassClicked(e, instance.temp.items[index], instance.props.sortDragHandleClass)) {
					setTimeout(function () {
						initItemMove(e, index, instance);
						setItems(instance);
						activateSort(instance);
					}, 1); // delay allows itemCont to show :hover classes
				} else if (instance.props.leftEnabled && checkClassClicked(e, instance.temp.items[index], instance.props.leftDragHandleClass)) {
					instance.temp.activeIndex = index;
					initMoveLeft(instance, 0);
					initLeftSlideOut(instance);
				} else if (instance.props.rightEnabled && checkClassClicked(e, instance.temp.items[index], instance.props.rightDragHandleClass)) {
					instance.temp.activeIndex = index;
					initMoveRight(instance, 0);
					initRightSlideOut(instance);
				} else if (instance.props.ignoreOnClick.indexOf(e.target.tagName.toLowerCase()) == -1) {
					backgroundClick(e, index, instance);
				}
			}
		}
	};

	var touchStart = function touchStart(e, instance) {
		mouseDown(e, instance);
	};

	var initItemMove = function initItemMove(e, index, instance) {
		var pageX = getPageX(e);
		var pageY = getPageY(e);

		instance.temp.activeIndex = index;
		instance.temp.origIndex = index;
		instance.temp.startPageX = pageX;
		instance.temp.startPageY = pageY;
		instance.temp.lastPageX = pageX;
		instance.temp.lastPageY = pageY;
		instance.temp.funcMouseMove = function (e) {
			mouseMove(e, instance);
		};
		instance.temp.funcMouseUp = function (e) {
			mouseUp(e, instance);
		};
		instance.temp.funcTouchMove = function (e) {
			touchMove(e, instance);
		};
		instance.temp.funcTouchEnd = function (e) {
			touchEnd(e, instance);
		};

		instance.eventsTarget.addEventListener('mousemove', instance.temp.funcMouseMove);
		instance.eventsTarget.addEventListener('mouseup', instance.temp.funcMouseUp);
		instance.eventsTarget.addEventListener('touchmove', instance.temp.funcTouchMove);
		instance.eventsTarget.addEventListener('touchend', instance.temp.funcTouchEnd);
	};

	var initMoveLeft = function initMoveLeft(instance, cloneLeftPX) {
		instance.temp.moveType = 'LEFT';

		if (instance.props.onLeftStart) {
			instance.props.onLeftStart(instance.temp.activeIndex);
		}

		if (instance.props.leftScrollClass) {
			addClass(instance.scrollCont, instance.props.leftScrollClass);
		}

		if (instance.props.leftMasks.length > 0 && instance.temp.itemMasks.length == 0) {
			createMasks(instance);
		}

		if (instance.props.leftItemActiveClass) {
			addClass(instance.temp.items[instance.temp.activeIndex], instance.props.leftItemActiveClass);
		}

		var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
		if (!instance.temp.itemClone) {
			var left = cloneLeftPX + 'px';
			createClone(instance, left, top);
		}
	};

	var initMoveRight = function initMoveRight(instance, cloneLeftPX) {
		instance.temp.moveType = 'RIGHT';

		if (instance.props.onRightStart) {
			instance.props.onRightStart(instance.temp.activeIndex);
		}

		if (instance.props.rightScrollClass) {
			addClass(instance.scrollCont, instance.props.rightScrollClass);
		}

		if (instance.props.rightMasks.length > 0 && instance.temp.itemMasks.length == 0) {
			createMasks(instance);
		}

		if (instance.props.rightItemActiveClass) {
			addClass(instance.temp.items[instance.temp.activeIndex], instance.props.rightItemActiveClass);
		}

		var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
		if (!instance.temp.itemClone) {
			var left = cloneLeftPX + 'px';
			createClone(instance, left, top);
		}
	};

	var backgroundClick = function backgroundClick(e, index, instance) {
		if (instance.props.sortEnabled && instance.props.sortByDrag || instance.props.leftEnabled && instance.props.leftByDrag || instance.props.rightEnabled && instance.props.rightByDrag) {
			initItemMove(e, index, instance);
			setItems(instance);
			if (instance.props.sortEnabled && instance.props.sortByDrag && instance.temp.items.length > 1) {
				instance.temp.sortDelayTimer = setTimeout(function () {
					activateSort(instance);
				}, instance.props.sortMoveStartDelay);
			}
		}
	};

	var activateSort = function activateSort(instance) {
		if (instance.temp && instance.temp.lastPageX != null && instance.temp.lastPageY != null) {
			var rect = instance.temp.items[instance.temp.activeIndex].getBoundingClientRect();
			if (cursorIsOverRect(instance.temp.lastPageX, instance.temp.lastPageY, rect)) {
				instance.temp.sortDelayTimer = null;
				instance.temp.moveType = 'SORT';

				if (instance.props.onSortStart) {
					instance.props.onSortStart(instance.temp.activeIndex);
				}

				if (instance.props.sortScrollClass) {
					addClass(instance.scrollCont, instance.props.sortScrollClass);
				}

				if (!instance.temp.itemClone) {
					var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
					createClone(instance, 0, top);
				}

				if (instance.props.sortItemActiveClass) {
					addClass(instance.temp.items[instance.temp.activeIndex], instance.props.sortItemActiveClass);
				}
			}
		}
	};

	var mouseMove = function mouseMove(e, instance) {
		if (instance.temp && instance.temp.moveType != null) {
			e.preventDefault();
		}

		var pageX = getPageX(e);
		var pageY = getPageY(e);
		var cursorX = pageX - instance.temp.startPageX;

		if (!instance.temp.moveType) {
			if (instance.temp.sortDelayTimer && (instance.props.leftEnabled && instance.props.leftByDrag || instance.props.rightEnabled && instance.props.rightByDrag)) {
				var rect = instance.temp.items[instance.temp.activeIndex].getBoundingClientRect();
				if (cursorIsOverRect(pageX, pageY, rect)) {
					if (cursorX < 0 && instance.props.leftEnabled && instance.props.leftByDrag) {
						var leftDST = getPXorPercent(instance.props.leftDragStartThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
						if (Math.abs(cursorX) > leftDST) {
							clearTimeout(instance.temp.sortDelayTimer);
							instance.temp.sortDelayTimer = null;
							initMoveLeft(instance, cursorX);
						}
					} else if (cursorX > 0 && instance.props.rightEnabled && instance.props.rightByDrag) {
						var rightDST = getPXorPercent(instance.props.rightDragStartThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
						if (cursorX > rightDST) {
							clearTimeout(instance.temp.sortDelayTimer);
							instance.temp.sortDelayTimer = null;
							initMoveRight(instance, cursorX);
						}
					}
				}
			}
		} else {
			if (instance.temp.moveType == 'LEFT' || instance.temp.moveType == 'RIGHT') {
				if (instance.temp.moveType == 'LEFT') {
					if (cursorX < 0) {
						var left = cursorX + 'px';
						instance.temp.itemClone.style.left = left;
					}
				} else {
					if (cursorX > 0) {
						var left = cursorX + 'px';
						instance.temp.itemClone.style.left = left;
					}
				}
			} else if (instance.temp.moveType == 'SORT') {
				var deltaY = pageY - instance.temp.lastPageY;
				if (deltaY != 0 && instance.temp.scrollInterval) {
					clearInterval(instance.temp.scrollInterval);
					instance.temp.scrollInterval = null;
				}

				var rect = instance.temp.itemClone.getBoundingClientRect();
				var shouldMove = false;
				if (deltaY < 0 && rect.bottom > pageY) {
					// moving up - move if cursor is above bottom of itemClone
					shouldMove = true;
				} else if (deltaY > 0 && rect.top < pageY) {
					// moving down - move if cursor is below top of itemClone
					shouldMove = true;
				}

				if (shouldMove) {
					var scrollProps = moveItemClone(instance, deltaY, true);
					animateItems(instance);

					if (scrollProps.scrollDir != 0 && scrollProps.outFraction != 0) {
						var scrollChange = Math.round(scrollProps.scrollDir * scrollProps.outFraction * getScrollMultiplier(instance.props.sortScrollSpeed));
						instance.temp.scrollInterval = setInterval(function () {
							doScroll(instance, scrollChange);
						}, 5);
					}
				}
			}
		}

		instance.temp.lastPageX = pageX;
		instance.temp.lastPageY = pageY;
	};

	var touchMove = function touchMove(e, instance) {
		mouseMove(e, instance);
	};

	var doScroll = function doScroll(instance, scrollChange) {
		var shouldScroll = moveItemClone(instance, scrollChange, false);
		if (shouldScroll) {
			instance.scrollCont.scrollTop = instance.scrollCont.scrollTop + scrollChange;
			animateItems(instance);
		} else {
			if (instance.temp.scrollInterval) {
				clearInterval(instance.temp.scrollInterval);
				instance.temp.scrollInterval = null;
			}
		}
	};

	var moveItemClone = function moveItemClone(instance, deltaTrans, withScrollProps) {
		var cloneOrigTop = getItemCloneTop(instance);
		var cloneTrans = getTransYNum(instance.temp.itemClone) + deltaTrans;

		if (cloneOrigTop + cloneTrans < 0) {
			// ensure itemClone is not above top or below bottom of listCont
			cloneTrans = -1 * cloneOrigTop;
		} else if (cloneOrigTop + cloneTrans + instance.temp.itemClone.offsetHeight > instance.listCont.clientHeight) {
			cloneTrans = instance.listCont.clientHeight - cloneOrigTop - instance.temp.itemClone.offsetHeight;
		}
		instance.temp.itemClone.style[vendorPrefix + 'Transform'] = 'translateY(' + cloneTrans + 'px)';

		var cloneTop = cloneOrigTop + cloneTrans;
		if (withScrollProps) {
			// return scrollProps
			var scrollDir = 0;
			var outFraction = 0;
			if (cloneTop < instance.scrollCont.scrollTop - instance.deltaItemsScroll) {
				scrollDir = -1; // scroll up
				outFraction = (instance.scrollCont.scrollTop - instance.deltaItemsScroll - cloneTop) / instance.temp.itemClone.offsetHeight;
			} else if (cloneTop + instance.temp.itemClone.offsetHeight > instance.scrollCont.scrollTop + instance.scrollCont.clientHeight - instance.deltaItemsScroll) {
				scrollDir = 1; // scroll down
				outFraction = (cloneTop + instance.temp.itemClone.offsetHeight - (instance.scrollCont.scrollTop + instance.scrollCont.clientHeight - instance.deltaItemsScroll)) / instance.temp.itemClone.offsetHeight;
			}
			return {
				'scrollDir': scrollDir,
				'outFraction': outFraction
			};
		} else {
			// return shouldScroll
			var shouldScroll = false;
			if (cloneTop < instance.scrollCont.scrollTop - instance.deltaItemsScroll || cloneTop + instance.temp.itemClone.offsetHeight > instance.scrollCont.scrollTop + instance.scrollCont.clientHeight - instance.deltaItemsScroll) {
				shouldScroll = true;
			}
			return shouldScroll;
		}
	};

	var animateItems = function animateItems(instance) {
		var prevIndex = null;
		var moveUpBoundary = 0;
		if (instance.temp.activeIndex > 0) {
			prevIndex = instance.temp.activeIndex - 1;
			moveUpBoundary = instance.temp.items[prevIndex].offsetTop + getTransYNum(instance.temp.items[prevIndex]) + instance.temp.items[prevIndex].offsetHeight / 2;
		}

		var nextIndex = null;
		var moveDownBoundary = instance.listCont.clientHeight;
		if (instance.temp.activeIndex < instance.temp.items.length - 1) {
			nextIndex = instance.temp.activeIndex + 1;
			moveDownBoundary = instance.temp.items[nextIndex].offsetTop + getTransYNum(instance.temp.items[nextIndex]) + instance.temp.items[nextIndex].offsetHeight / 2;
		}

		var cloneTop = getItemCloneTop(instance) + getTransYNum(instance.temp.itemClone);

		if (cloneTop < moveUpBoundary || cloneTop + instance.temp.itemClone.offsetHeight > moveDownBoundary) {
			if (prevIndex !== null && cloneTop < moveUpBoundary) {
				// move up
				var activeUp = -1 * instance.temp.items[prevIndex].offsetHeight;
				instance.temp.items[instance.temp.activeIndex].style[vendorPrefix + 'TransitionDuration'] = instance.props.sortReorderDuration + 'ms';
				setTransY(instance.temp.items[instance.temp.activeIndex], activeUp);

				var prevDown = instance.temp.items[instance.temp.activeIndex].offsetHeight;
				instance.temp.items[prevIndex].style[vendorPrefix + 'TransitionDuration'] = instance.props.sortReorderDuration + 'ms';
				setTransY(instance.temp.items[prevIndex], prevDown);

				var copyActiveTaskDivRef = instance.temp.items[instance.temp.activeIndex];
				instance.temp.items[instance.temp.activeIndex] = instance.temp.items[prevIndex];
				instance.temp.items[prevIndex] = copyActiveTaskDivRef;
				instance.temp.activeIndex = prevIndex;
			} else if (nextIndex !== null && cloneTop + instance.temp.itemClone.offsetHeight > moveDownBoundary) {
				// move down
				var activeDown = instance.temp.items[nextIndex].offsetHeight;
				instance.temp.items[instance.temp.activeIndex].style[vendorPrefix + 'TransitionDuration'] = instance.props.sortReorderDuration + 'ms';
				setTransY(instance.temp.items[instance.temp.activeIndex], activeDown);

				var nextUp = -1 * instance.temp.items[instance.temp.activeIndex].offsetHeight;
				instance.temp.items[nextIndex].style[vendorPrefix + 'TransitionDuration'] = instance.props.sortReorderDuration + 'ms';
				setTransY(instance.temp.items[nextIndex], nextUp);

				var copyActiveTaskDivRef = instance.temp.items[instance.temp.activeIndex];
				instance.temp.items[instance.temp.activeIndex] = instance.temp.items[nextIndex];
				instance.temp.items[nextIndex] = copyActiveTaskDivRef;
				instance.temp.activeIndex = nextIndex;
			}
		}
	};

	var getItemCloneTop = function getItemCloneTop(instance) {
		var origTop = 0;
		if (instance.temp.itemClone && instance.temp.itemClone.style && instance.temp.itemClone.style.top) {
			var index = instance.temp.itemClone.style.top.indexOf('px');
			if (index > -1) {
				origTop = parseInt(instance.temp.itemClone.style.top.substring(0, index));
			}
		}
		return origTop;
	};

	var getTransYNum = function getTransYNum(el) {
		var currentTransAmount = 0;
		if (el.style && el.style[vendorPrefix + 'Transform']) {
			var index = el.style[vendorPrefix + 'Transform'].indexOf('px');
			if (index > -1) {
				currentTransAmount = parseInt(el.style[vendorPrefix + 'Transform'].substring(11, index));
			}
		}
		return currentTransAmount;
	};

	var setTransY = function setTransY(el, transAmount) {
		var currentTransAmount = getTransYNum(el);
		var newTransAmount = 0;
		if (currentTransAmount != 0) {
			newTransAmount = currentTransAmount + transAmount;
		} else {
			newTransAmount = transAmount;
		}
		if (newTransAmount != 0) {
			el.style[vendorPrefix + 'Transform'] = 'translateY(' + newTransAmount + 'px)';
		} else {
			el.style[vendorPrefix + 'Transform'] = '';
		}
	};

	var vendorPrefix = function () {
		var styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
		var prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === ('' && ['', 'o']))[1];

		switch (prefix) {
			case 'ms':
				return 'ms';
			default:
				return prefix && prefix.length ? prefix[0].toUpperCase() + prefix.substr(1) : '';
		}
	}();

	var mouseUp = function mouseUp(e, instance) {
		if (instance.temp.sortDelayTimer) {
			clearTimeout(instance.temp.sortDelayTimer);
			instance.temp.sortDelayTimer = null;
		}
		if (instance.temp.funcMouseMove) {
			instance.eventsTarget.removeEventListener('mousemove', instance.temp.funcMouseMove);
		}
		if (instance.temp.funcMouseUp) {
			instance.eventsTarget.removeEventListener('mouseup', instance.temp.funcMouseUp);
		}
		if (instance.temp.funcTouchMove) {
			instance.eventsTarget.removeEventListener('touchmove', instance.temp.funcTouchMove);
		}
		if (instance.temp.funcTouchEnd) {
			instance.eventsTarget.removeEventListener('touchend', instance.temp.funcTouchEnd);
		}

		if (instance.temp.moveType) {
			if (instance.temp.moveType == 'LEFT' || instance.temp.moveType == 'RIGHT') {
				var cloneX = Math.abs(instance.temp.itemClone.offsetLeft);
				if (instance.temp.moveType == 'LEFT') {
					var leftDET = getPXorPercent(instance.props.leftDragEndThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
					if (cloneX > leftDET) {
						initLeftSlideOut(instance);
					} else {
						initLeftSlideBack(instance);
					}
				} else {
					var rightDET = getPXorPercent(instance.props.rightDragEndThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
					if (cloneX > rightDET) {
						initRightSlideOut(instance);
					} else {
						initRightSlideBack(instance);
					}
				}
			} else if (instance.temp.moveType == 'SORT') {
				if (instance.temp.scrollInterval) {
					clearInterval(instance.temp.scrollInterval);
					instance.temp.scrollInterval = null;
				}

				var activeTaskTop = getDeltaWithParent(instance.temp.items[instance.temp.activeIndex], instance.listCont, 0) + getTransYNum(instance.temp.items[instance.temp.activeIndex]);

				var cloneTop = getItemCloneTop(instance) + getTransYNum(instance.temp.itemClone);
				instance.temp.itemClone.style[vendorPrefix + 'TransitionDuration'] = instance.props.sortEndDockDuration + 'ms';
				moveItemClone(instance, activeTaskTop - cloneTop, false);

				instance.temp.sortEndTimer = setTimeout(function () {
					sortEnd(instance);
				}, instance.props.sortEndDockDuration);
			}
		}
	};

	var touchEnd = function touchEnd(e, instance) {
		mouseUp(e, instance);
	};

	var initLeftSlideOut = function initLeftSlideOut(instance) {
		instance.temp.itemClone.style.transition = 'left ' + instance.props.leftSlideOutDuration + 'ms ease-in';
		setTimeout(function () {
			doLeftSlideOut(instance);
		}, 1);
	};

	var doLeftSlideOut = function doLeftSlideOut(instance) {
		if (instance.props.onLeftSlideOutStart) {
			instance.props.onLeftSlideOutStart(instance.temp.activeIndex);
		}

		if (instance.props.leftCloneSlideOutClass) {
			addClass(instance.temp.itemClone, instance.props.leftCloneSlideOutClass);
		}

		for (var i = 0, len = instance.props.leftMasks.length; i < len; i++) {
			if (instance.props.leftMasks[i].classNameSlideOut && instance.temp.itemMasks[i]) {
				addClass(instance.temp.itemMasks[i], instance.props.leftMasks[i].classNameSlideOut);
			}
		}

		instance.temp.itemClone.style.left = '-100%';
		setTimeout(function () {
			completeSlide(instance, true);
		}, instance.props.leftSlideOutDuration);
	};

	var initLeftSlideBack = function initLeftSlideBack(instance) {
		instance.temp.itemClone.style.transition = 'left ' + instance.props.leftSlideBackDuration + 'ms ease-in';
		setTimeout(function () {
			doLeftSlideBack(instance);
		}, 1);
	};

	var doLeftSlideBack = function doLeftSlideBack(instance) {
		if (instance.props.onLeftSlideBackStart) {
			instance.props.onLeftSlideBackStart(instance.temp.activeIndex);
		}

		if (instance.props.leftCloneSlideBackClass) {
			addClass(instance.temp.itemClone, instance.props.leftCloneSlideBackClass);
		}

		for (var i = 0, len = instance.props.leftMasks.length; i < len; i++) {
			if (instance.props.leftMasks[i].classNameSlideBack && instance.temp.itemMasks[i]) {
				addClass(instance.temp.itemMasks[i], instance.props.leftMasks[i].classNameSlideBack);
			}
		}

		instance.temp.itemClone.style.left = '0';
		setTimeout(function () {
			completeSlide(instance, false);
		}, instance.props.leftSlideBackDuration);
	};

	var initRightSlideOut = function initRightSlideOut(instance) {
		instance.temp.itemClone.style.transition = 'left ' + instance.props.rightSlideOutDuration + 'ms ease-in';
		setTimeout(function () {
			doRightSlideOut(instance);
		}, 1);
	};

	var doRightSlideOut = function doRightSlideOut(instance) {
		if (instance.props.onRightSlideOutStart) {
			instance.props.onRightSlideOutStart(instance.temp.activeIndex);
		}

		if (instance.props.rightCloneSlideOutClass) {
			addClass(instance.temp.itemClone, instance.props.rightCloneSlideOutClass);
		}

		for (var i = 0, len = instance.props.rightMasks.length; i < len; i++) {
			if (instance.props.rightMasks[i].classNameSlideOut && instance.temp.itemMasks[i]) {
				addClass(instance.temp.itemMasks[i], instance.props.rightMasks[i].classNameSlideOut);
			}
		}

		instance.temp.itemClone.style.left = '100%';
		setTimeout(function () {
			completeSlide(instance, true);
		}, instance.props.rightSlideOutDuration);
	};

	var initRightSlideBack = function initRightSlideBack(instance) {
		instance.temp.itemClone.style.transition = 'left ' + instance.props.rightSlideBackDuration + 'ms ease-in';
		setTimeout(function () {
			doRightSlideBack(instance);
		}, 1);
	};

	var doRightSlideBack = function doRightSlideBack(instance) {
		if (instance.props.onRightSlideBackStart) {
			instance.props.onRightSlideBackStart(instance.temp.activeIndex);
		}

		if (instance.props.rightCloneSlideBackClass) {
			addClass(instance.temp.itemClone, instance.props.rightCloneSlideBackClass);
		}

		for (var i = 0, len = instance.props.rightMasks.length; i < len; i++) {
			if (instance.props.rightMasks[i].classNameSlideBack && instance.temp.itemMasks[i]) {
				addClass(instance.temp.itemMasks[i], instance.props.rightMasks[i].classNameSlideBack);
			}
		}

		instance.temp.itemClone.style.left = '0';
		setTimeout(function () {
			completeSlide(instance, false);
		}, instance.props.rightSlideBackDuration);
	};

	var completeSlide = function completeSlide(instance, didSlideOut) {
		if (instance.temp.moveType == 'LEFT') {
			if (instance.temp.items[instance.temp.activeIndex] && instance.props.leftItemActiveClass) {
				removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.leftItemActiveClass);
			}

			if (instance.props.leftScrollClass) {
				removeClass(instance.scrollCont, instance.props.leftScrollClass);
			}

			destroyTempDivs(instance);

			if (instance.props.onLeftEnd) {
				instance.props.onLeftEnd(instance.temp.activeIndex, didSlideOut);
			}
		} else if (instance.temp.moveType == 'RIGHT') {
			if (instance.temp.items[instance.temp.activeIndex] && instance.props.rightItemActiveClass) {
				removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.rightItemActiveClass);
			}

			if (instance.props.rightScrollClass) {
				removeClass(instance.scrollCont, instance.props.rightScrollClass);
			}

			destroyTempDivs(instance);

			if (instance.props.onRightEnd) {
				instance.props.onRightEnd(instance.temp.activeIndex, didSlideOut);
			}
		}

		instance.temp = getEmptyTemp();
	};

	var sortEnd = function sortEnd(instance) {
		for (var i = 0, len = instance.temp.items.length; i < len; i++) {
			instance.temp.items[i].style[vendorPrefix + 'TransitionDuration'] = '';
			instance.temp.items[i].style[vendorPrefix + 'Transform'] = '';
		}

		if (instance.props.sortItemActiveClass) {
			removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.sortItemActiveClass);
		}

		if (instance.props.sortScrollClass) {
			removeClass(instance.scrollCont, instance.props.sortScrollClass);
		}

		destroyTempDivs(instance);

		if (instance.props.onSortEnd) {
			instance.props.onSortEnd(instance.temp.origIndex, instance.temp.activeIndex);
		}

		instance.temp = getEmptyTemp();
	};

	var destroyTempDivs = function destroyTempDivs(instance) {
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

	var setItems = function setItems(instance) {
		instance.temp.items = Array.prototype.slice.call(instance.listCont.getElementsByClassName(instance.listItemClass));
	};

	var createClone = function createClone(instance, left, top) {
		var cloneNode = instance.temp.items[instance.temp.activeIndex].cloneNode(true);
		instance.temp.itemClone = instance.listCont.appendChild(cloneNode);
		instance.temp.itemClone.style.position = 'absolute';
		instance.temp.itemClone.style.left = left;
		instance.temp.itemClone.style.top = top;

		if (instance.temp.moveType == 'SORT') {
			if (instance.props.sortCloneClass) {
				addClass(instance.temp.itemClone, instance.props.sortCloneClass);
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

	var createMasks = function createMasks(instance) {
		var masks = null;
		if (instance.temp.moveType == 'LEFT' && instance.props.leftMasks.length > 0) {
			masks = instance.props.leftMasks;
		} else if (instance.temp.moveType == 'RIGHT' && instance.props.rightMasks.length > 0) {
			masks = instance.props.rightMasks;
		}
		if (masks) {
			for (var i = 0, len = masks.length; i < len; i++) {
				var newDiv = document.createElement('div');
				instance.temp.itemMasks[i] = instance.listCont.appendChild(newDiv);
				instance.temp.itemMasks[i].style.position = 'absolute';
				instance.temp.itemMasks[i].style.left = '0';
				instance.temp.itemMasks[i].style.top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
				instance.temp.itemMasks[i].style.height = instance.temp.items[instance.temp.activeIndex].offsetHeight + 'px';
				instance.temp.itemMasks[i].style.width = '100%';

				if (masks[i].classNameDefault) {
					addClass(instance.temp.itemMasks[i], masks[i].classNameDefault);
				}
				if (masks[i].childNode) {
					instance.temp.itemMasks[i].appendChild(masks[i].childNode);
				}
			}
		}
	};

	var detachFromList = function detachFromList(listCont) {
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
					instances[index].scrollCont.removeEventListener('scroll', instances[index].temp.funcOnScroll);
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

	var triggerLeft = function triggerLeft(listCont, itemIndex) {
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

	var triggerRight = function triggerRight(listCont, itemIndex) {
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

	// utility functions

	var getScrollMultiplier = function getScrollMultiplier(speed) {
		switch (speed) {
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

	var cursorIsOverRect = function cursorIsOverRect(pageX, pageY, rect) {
		if (pageX >= rect.left && pageX <= rect.right && pageY >= rect.top && pageY <= rect.bottom) {
			return true;
		} else {
			return false;
		}
	};

	var getPXorPercent = function getPXorPercent(val, percOf) {
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

	var checkClassClicked = function checkClassClicked(e, container, className) {
		var classClicked = false;
		if (className) {
			if (hasClass(e.target, className)) {
				// check if element with className was itself clicked
				classClicked = true;
			} else {
				if (container) {
					// check if element with className contains the clicked element
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
	};

	var getPageX = function getPageX(e) {
		if (e.touches && e.touches.length) {
			return e.touches[0].pageX;
		} else if (e.changedTouches && e.changedTouches.length) {
			return e.changedTouches[0].pageX;
		} else {
			return e.pageX;
		}
	};

	var getPageY = function getPageY(e) {
		if (e.touches && e.touches.length) {
			return e.touches[0].pageY;
		} else if (e.changedTouches && e.changedTouches.length) {
			return e.changedTouches[0].pageY;
		} else {
			return e.pageY;
		}
	};

	var hasClass = function hasClass(el, className) {
		if (el.classList) {
			return el.classList.contains(className);
		}
		return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	};

	var addClass = function addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else if (!hasClass(el, className)) {
			el.className += " " + className;
		}
	};

	var removeClass = function removeClass(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else if (hasClass(el, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			el.className = el.className.replace(reg, ' ');
		}
	};

	var getDeltaWithParent = function getDeltaWithParent(node, parent, delta) {
		if (node) {
			var newDelta = node.offsetTop + delta;
			if (node.parentNode !== parent) {
				return getDeltaWithParent(node.parentNode, parent, newDelta);
			} else {
				return newDelta;
			}
		} else {
			return delta;
		}
	};

	var uuidv4 = function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
			    v = c == 'x' ? r : r & 0x3 | 0x8;
			return v.toString(16).toUpperCase();
		});
	};

	// validation

	var validateProps = function validateProps(props) {
		if (!isUndefinedOrNull(props['onSortStart']) && !isFunction(props['onSortStart'])) {
			throw 'onSortStart must be a function';
		}

		if (!isUndefinedOrNull(props['onSortEnd']) && !isFunction(props['onSortEnd'])) {
			throw 'onSortEnd must be a function';
		}

		if (!isUndefinedOrNull(props['sortEnabled']) && !isBoolean(props['sortEnabled'])) {
			throw 'sortEnabled must be a boolean';
		}

		if (!isUndefinedOrNull(props['sortByDrag']) && !isBoolean(props['sortByDrag'])) {
			throw 'sortByDrag must be a boolean';
		}

		if (!isUndefinedOrNull(props['sortScrollClass']) && (!isString(props['sortScrollClass']) || props['sortScrollClass'].length == 0)) {
			throw 'sortScrollClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['sortCloneClass']) && (!isString(props['sortCloneClass']) || props['sortCloneClass'].length == 0)) {
			throw 'sortCloneClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['sortItemActiveClass']) && (!isString(props['sortItemActiveClass']) || props['sortItemActiveClass'].length == 0)) {
			throw 'sortItemActiveClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['sortDragHandleClass']) && (!isString(props['sortDragHandleClass']) || props['sortDragHandleClass'].length == 0)) {
			throw 'sortDragHandleClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['sortMoveStartDelay']) && (!isInteger(props['sortMoveStartDelay']) || props['sortMoveStartDelay'] < 0)) {
			throw 'sortMoveStartDelay must be a positive integer or zero';
		}

		if (!isUndefinedOrNull(props['sortReorderDuration']) && (!isInteger(props['sortReorderDuration']) || props['sortReorderDuration'] < 0)) {
			throw 'sortReorderDuration must be a positive integer or zero';
		}

		if (!isUndefinedOrNull(props['sortEndDockDuration']) && (!isInteger(props['sortEndDockDuration']) || props['sortEndDockDuration'] < 0)) {
			throw 'sortEndDockDuration must be a positive integer or zero';
		}

		if (!isUndefinedOrNull(props['sortScrollSpeed']) && (!isInteger(props['sortScrollSpeed']) || props['sortScrollSpeed'] != 1 && props['sortScrollSpeed'] != 2 && props['sortScrollSpeed'] != 3 && props['sortScrollSpeed'] != 4 && props['sortScrollSpeed'] != 5)) {
			throw 'sortScrollSpeed must be an integer 1 - 5';
		}

		if (!isUndefinedOrNull(props['onLeftStart']) && !isFunction(props['onLeftStart'])) {
			throw 'onLeftStart must be a function';
		}

		if (!isUndefinedOrNull(props['onLeftSlideOutStart']) && !isFunction(props['onLeftSlideOutStart'])) {
			throw 'onLeftSlideOutStart must be a function';
		}

		if (!isUndefinedOrNull(props['onLeftSlideBackStart']) && !isFunction(props['onLeftSlideBackStart'])) {
			throw 'onLeftSlideBackStart must be a function';
		}

		if (!isUndefinedOrNull(props['onLeftEnd']) && !isFunction(props['onLeftEnd'])) {
			throw 'onLeftEnd must be a function';
		}

		if (!isUndefinedOrNull(props['leftEnabled']) && !isBoolean(props['leftEnabled'])) {
			throw 'leftEnabled must be a boolean';
		}

		if (!isUndefinedOrNull(props['leftByDrag']) && !isBoolean(props['leftByDrag'])) {
			throw 'leftByDrag must be a boolean';
		}

		if (!isUndefinedOrNull(props['leftScrollClass']) && (!isString(props['leftScrollClass']) || props['leftScrollClass'].length == 0)) {
			throw 'leftScrollClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['leftCloneClass']) && (!isString(props['leftCloneClass']) || props['leftCloneClass'].length == 0)) {
			throw 'leftCloneClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['leftCloneSlideOutClass']) && (!isString(props['leftCloneSlideOutClass']) || props['leftCloneSlideOutClass'].length == 0)) {
			throw 'leftCloneSlideOutClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['leftCloneSlideBackClass']) && (!isString(props['leftCloneSlideBackClass']) || props['leftCloneSlideBackClass'].length == 0)) {
			throw 'leftCloneSlideBackClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['leftItemActiveClass']) && (!isString(props['leftItemActiveClass']) || props['leftItemActiveClass'].length == 0)) {
			throw 'leftItemActiveClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['leftMasks'])) {
			if (isArray(props['leftMasks'])) {
				for (var i = 0, len = props['leftMasks'].length; i < len; i++) {
					var mask = props['leftMasks'][i];
					if (isUndefinedOrNull(mask['classNameDefault']) || !isString(mask['classNameDefault']) || mask['classNameDefault'].length == 0) {
						throw 'leftMasks.classNameDefault must not be undefined or null and must be a string of length >0';
					}
					if (!isUndefinedOrNull(mask['classNameSlideOut']) && (!isString(mask['classNameSlideOut']) || mask['classNameSlideOut'].length == 0)) {
						throw 'leftMasks.classNameSlideOut must be a string of length >0';
					}
					if (!isUndefinedOrNull(mask['classNameSlideBack']) && (!isString(mask['classNameSlideBack']) || mask['classNameSlideBack'].length == 0)) {
						throw 'leftMasks.classNameSlideBack must be a string of length >0';
					}
					if (!isUndefinedOrNull(mask['childNode']) && !isDOMElement(mask['childNode'])) {
						throw 'leftMasks.childNode must be a DOM element';
					}
				}
			} else {
				throw 'leftMasks must be an array';
			}
		}

		if (!isUndefinedOrNull(props['leftDragHandleClass']) && (!isString(props['leftDragHandleClass']) || props['leftDragHandleClass'].length == 0)) {
			throw 'leftDragHandleClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['leftDragStartThreshold']) && !isPXorPercent(props['leftDragStartThreshold'])) {
			throw 'leftDragStartThreshold must be \'#px\', \'#%\' or \'0\' (eg. \'10px\' or \'10%\')';
		}

		if (!isUndefinedOrNull(props['leftDragEndThreshold']) && !isPXorPercent(props['leftDragEndThreshold'])) {
			throw 'leftDragEndThreshold must be \'#px\', \'#%\' or \'0\' (eg. \'10px\' or \'10%\')';
		}

		if (!isUndefinedOrNull(props['leftSlideOutDuration']) && (!isInteger(props['leftSlideOutDuration']) || props['leftSlideOutDuration'] < 0)) {
			throw 'leftSlideOutDuration must be a positive integer or zero';
		}

		if (!isUndefinedOrNull(props['leftSlideBackDuration']) && (!isInteger(props['leftSlideBackDuration']) || props['leftSlideBackDuration'] < 0)) {
			throw 'leftSlideBackDuration must be a positive integer or zero';
		}

		if (!isUndefinedOrNull(props['onRightStart']) && !isFunction(props['onRightStart'])) {
			throw 'onRightStart must be a function';
		}

		if (!isUndefinedOrNull(props['onRightSlideOutStart']) && !isFunction(props['onRightSlideOutStart'])) {
			throw 'onRightSlideOutStart must be a function';
		}

		if (!isUndefinedOrNull(props['onRightSlideBackStart']) && !isFunction(props['onRightSlideBackStart'])) {
			throw 'onRightSlideBackStart must be a function';
		}

		if (!isUndefinedOrNull(props['onRightEnd']) && !isFunction(props['onRightEnd'])) {
			throw 'onRightEnd must be a function';
		}

		if (!isUndefinedOrNull(props['rightEnabled']) && !isBoolean(props['rightEnabled'])) {
			throw 'rightEnabled must be a boolean';
		}

		if (!isUndefinedOrNull(props['rightByDrag']) && !isBoolean(props['rightByDrag'])) {
			throw 'rightByDrag must be a boolean';
		}

		if (!isUndefinedOrNull(props['rightScrollClass']) && (!isString(props['rightScrollClass']) || props['rightScrollClass'].length == 0)) {
			throw 'rightScrollClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['rightCloneClass']) && (!isString(props['rightCloneClass']) || props['rightCloneClass'].length == 0)) {
			throw 'rightCloneClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['rightCloneSlideOutClass']) && (!isString(props['rightCloneSlideOutClass']) || props['rightCloneSlideOutClass'].length == 0)) {
			throw 'rightCloneSlideOutClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['rightCloneSlideBackClass']) && (!isString(props['rightCloneSlideBackClass']) || props['rightCloneSlideBackClass'].length == 0)) {
			throw 'rightCloneSlideBackClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['rightItemActiveClass']) && (!isString(props['rightItemActiveClass']) || props['rightItemActiveClass'].length == 0)) {
			throw 'rightItemActiveClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['rightMasks'])) {
			if (isArray(props['rightMasks'])) {
				for (var i = 0, len = props['rightMasks'].length; i < len; i++) {
					var mask = props['rightMasks'][i];
					if (isUndefinedOrNull(mask['classNameDefault']) || !isString(mask['classNameDefault']) || mask['classNameDefault'].length == 0) {
						throw 'rightMasks.classNameDefault must not be undefined or null and must be a string of length >0';
					}
					if (!isUndefinedOrNull(mask['classNameSlideOut']) && (!isString(mask['classNameSlideOut']) || mask['classNameSlideOut'].length == 0)) {
						throw 'rightMasks.classNameSlideOut must be a string of length >0';
					}
					if (!isUndefinedOrNull(mask['classNameSlideBack']) && (!isString(mask['classNameSlideBack']) || mask['classNameSlideBack'].length == 0)) {
						throw 'rightMasks.classNameSlideBack must be a string of length >0';
					}
					if (!isUndefinedOrNull(mask['childNode']) && !isDOMElement(mask['childNode'])) {
						throw 'rightMasks.childNode must be a DOM element';
					}
				}
			} else {
				throw 'rightMasks must be an array';
			}
		}

		if (!isUndefinedOrNull(props['rightDragHandleClass']) && (!isString(props['rightDragHandleClass']) || props['rightDragHandleClass'].length == 0)) {
			throw 'rightDragHandleClass must be a string of length >0';
		}

		if (!isUndefinedOrNull(props['rightDragStartThreshold']) && !isPXorPercent(props['rightDragStartThreshold'])) {
			throw 'rightDragStartThreshold must be \'#px\', \'#%\' or \'0\' (eg. \'10px\' or \'10%\')';
		}

		if (!isUndefinedOrNull(props['rightDragEndThreshold']) && !isPXorPercent(props['rightDragEndThreshold'])) {
			throw 'rightDragEndThreshold must be \'#px\', \'#%\' or \'0\' (eg. \'10px\' or \'10%\')';
		}

		if (!isUndefinedOrNull(props['rightSlideOutDuration']) && (!isInteger(props['rightSlideOutDuration']) || props['rightSlideOutDuration'] < 0)) {
			throw 'rightSlideOutDuration must be a positive integer or zero';
		}

		if (!isUndefinedOrNull(props['rightSlideBackDuration']) && (!isInteger(props['rightSlideBackDuration']) || props['rightSlideBackDuration'] < 0)) {
			throw 'rightSlideBackDuration must be a positive integer or zero';
		}

		if (!isUndefinedOrNull(props['ignoreOnClick'])) {
			if (isArray(props['ignoreOnClick'])) {
				for (var i = 0, len = props['ignoreOnClick'].length; i < len; i++) {
					var value = props['ignoreOnClick'][i];
					if (isUndefinedOrNull(value) || !isString(value) || value.length == 0) {
						throw 'ignoreOnClick must be an array of strings of length >0';
					}
				}
			} else {
				throw 'ignoreOnClick must be an array';
			}
		}
	};

	var isUndefinedOrNull = function isUndefinedOrNull(value) {
		if (typeof value === 'undefined' || value == null) {
			return true;
		} else {
			return false;
		}
	};

	var isFunction = function isFunction(value) {
		if (value && typeof value === 'function') {
			return true;
		} else {
			return false;
		}
	};

	var isBoolean = function isBoolean(value) {
		if (typeof value === 'boolean') {
			return true;
		} else {
			return false;
		}
	};

	var isInteger = function isInteger(value) {
		if (!(typeof value === 'string') && !(value instanceof String) && value === parseInt(value, 10)) {
			return true;
		} else {
			return false;
		}
	};

	var isString = function isString(value) {
		if (typeof value === 'string' || value instanceof String) {
			return true;
		} else {
			return false;
		}
	};

	var isArray = function isArray(value) {
		if (value instanceof Array) {
			return true;
		} else {
			return false;
		}
	};

	var isDOMElement = function isDOMElement(value) {
		if (value instanceof Element) {
			return true;
		} else {
			return false;
		}
	};

	var isPXorPercent = function isPXorPercent(value) {
		if (typeof value === 'string' || value instanceof String) {
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
}();

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/js/lithiumlist-pro-1.0.0.js");


/***/ })

/******/ });