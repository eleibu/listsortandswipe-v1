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


// Known issues:
// * Position of itemCont behaves strangely when item-cont has a top or bottom margin. Temporary resolution is to remove the margin, insert a child div and add a margin to that.
// * Cursor is sometimes far above itemCont but still moving it (seems to happen only when moving up, but not sure).


// TODO: left / right confirm
// TODO: cancel 'mousemove', 'mouseup', 'touchmove', 'touchend' while scrolling?
// TODO: Start of scrolling should cancel sort timer (DONE?)
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
		sortScrollSpeed: 15,
		onLeftStart: null,
		onLeftSlideOutStart: null,
		onLeftEnd: null,
		leftEnabled: true,
		leftByDrag: true,
		leftScrollClass: 'left-scroll',
		leftCloneClass: 'left-clone',
		leftCloneSlideOutClass: 'left-clone-slideout',
		leftItemActiveClass: 'left-item-active',
		leftMaskClass: 'left-mask',
		leftMaskSlideOutClass: 'left-mask-slideout',
		leftDragHandleClass: 'left-drag-handle',
		leftDragStartThreshold: '10%',
		leftDragEndThreshold: '30%',
		leftSlideOutDuration: 200,
		leftSlideInDuration: 200,
		// leftBgdHeightTransition: 'height 100ms ease-in 100ms',
		// leftBgdColor: '#FF3300',
		onRightStart: null,
		onRightSlideOutStart: null,
		onRightEnd: null,
		rightEnabled: true,
		rightByDrag: true,
		rightScrollClass: 'right-scroll',
		rightCloneClass: 'right-clone',
		rightCloneSlideOutClass: 'right-clone-slideout',
		rightItemActiveClass: 'right-item-active',
		rightMaskClass: 'right-mask',
		rightMaskSlideOutClass: 'right-mask-slideout',
		rightDragHandleClass: 'right-drag-handle',
		rightDragStartThreshold: '10px',
		rightDragEndThreshold: '30%',
		rightSlideOutDuration: 200,
		rightSlideInDuration: 200
		// rightBgdHeightTransition: 'height 100ms ease-in 100ms',
		// rightBgdColor: '#339900'
	};

	var setDefaultProperties = function setDefaultProperties(userDefaultProperties) {
		if (userDefaultProperties) {
			for (var attrname in defaultProperties) {
				if (typeof userDefaultProperties[attrname] !== 'undefined') {
					defaultProperties[attrname] = userDefaultProperties[attrname];
				}
			}
		}
	};

	var setListProperties = function setListProperties(userListProperties) {
		// to do
	};

	var attachToList = function attachToList(scrollCont, listCont, eventsTarget, listItemClass, listProperties) {
		if (scrollCont == null) {
			scrollCont = window;
		} else {
			if (scrollCont !== window && scrollCont !== listCont && !scrollCont.contains(listCont)) {
				throw 'listCont must be parent of scrollCont.';
			}
		}

		if (listCont == null) {
			throw 'listCont cannot be null.';
		}
		for (var i = 0, len = instances.length; i < len; i++) {
			if (instances[i].listCont === listCont) {
				throw 'listCont already has lithiumlist attached.';
			}
		}

		if (eventsTarget == null) {
			eventsTarget = window;
		}

		if (listItemClass == null || listItemClass.length == 0) {
			throw 'listItemClass must be a string of length > 0.';
		}

		var props = defaultProperties;
		if (listProperties) {

			// SHOULD WE VALIDATE THESE FIRST?

			for (var attrname in props) {
				if (typeof listProperties[attrname] !== 'undefined') {
					props[attrname] = listProperties[attrname];
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
			'itemMask': null,
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
				if (checkClassClicked(e, instance.temp.items[index], instance.props.sortDragHandleClass)) {
					setTimeout(function () {
						sortHandleClick(e, index, instance);
					}, 1); // delay allows itemCont to show :hover classes
				} else if (checkClassClicked(e, instance.temp.items[index], instance.props.leftDragHandleClass)) {
					// left drag handle click
				} else if (checkClassClicked(e, instance.temp.items[index], instance.props.rightDragHandleClass)) {
					// right drag handle click
				} else {
					backgroundClick(e, index, instance);
				}
			}
		}
	};

	var touchStart = function touchStart(e, instance) {
		mouseDown(e, instance);
	};

	var initialiseItemMove = function initialiseItemMove(e, index, instance) {
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

	var sortHandleClick = function sortHandleClick(e, index, instance) {
		if (instance.props.sortEnabled) {
			initialiseItemMove(e, index, instance);
			setItems(instance);
			activateSort(instance);
		}
	};

	var backgroundClick = function backgroundClick(e, index, instance) {
		if (instance.props.sortEnabled && instance.props.sortByDrag || instance.props.leftEnabled && instance.props.leftByDrag || instance.props.rightEnabled && instance.props.rightByDrag) {
			initialiseItemMove(e, index, instance);
			setItems(instance);
			if (instance.props.sortEnabled && instance.props.sortByDrag && instance.temp.items.length > 1) {
				instance.temp.sortDelayTimer = setTimeout(function () {
					activateSort(instance);
				}, instance.props.sortMoveStartDelay);
			} else {

				// wait for either left or right drag

			}
		}
	};

	var activateSort = function activateSort(instance) {
		if (instance.temp && instance.temp.lastPageX != null && instance.temp.lastPageY != null) {
			var rect = instance.temp.items[instance.temp.activeIndex].getBoundingClientRect();
			if (instance.temp.lastPageX >= rect.left && instance.temp.lastPageX <= rect.right && instance.temp.lastPageY >= rect.top && instance.temp.lastPageY <= rect.bottom) {
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
		if (instance.temp && instance.temp.moveType == 'SORT') {
			e.preventDefault();
		}

		var pageX = getPageX(e);
		var pageY = getPageY(e);
		var cursorX = pageX - instance.temp.startPageX;

		if (!instance.temp.moveType) {
			if (instance.temp.sortDelayTimer && (instance.props.leftEnabled && instance.props.leftByDrag || instance.props.rightEnabled && instance.props.rightByDrag)) {
				if (cursorX < 0 && instance.props.leftEnabled && instance.props.leftByDrag) {
					var leftDST = getPXorPercent(instance.props.leftDragStartThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
					if (Math.abs(cursorX) > leftDST) {
						clearTimeout(instance.temp.sortDelayTimer);
						instance.temp.sortDelayTimer = null;
						instance.temp.moveType = 'LEFT';

						if (instance.props.onLeftStart) {
							instance.props.onLeftStart(instance.temp.activeIndex);
						}

						if (instance.props.leftScrollClass) {
							addClass(instance.scrollCont, instance.props.leftScrollClass);
						}

						if (instance.props.leftMaskClass && !instance.temp.itemMask) {
							createMask(instance);
						}

						if (instance.props.leftItemActiveClass) {
							addClass(instance.temp.items[instance.temp.activeIndex], instance.props.leftItemActiveClass);
						}

						var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
						if (!instance.temp.itemClone) {
							var left = cursorX + 'px';
							createClone(instance, left, top);
						}
					}
				} else if (cursorX > 0) {
					var rightDST = getPXorPercent(instance.props.rightDragStartThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
					if (cursorX > rightDST) {
						clearTimeout(instance.temp.sortDelayTimer);
						instance.temp.sortDelayTimer = null;
						instance.temp.moveType = 'RIGHT';

						if (instance.props.onRightStart) {
							instance.props.onRightStart(instance.temp.activeIndex);
						}

						if (instance.props.rightScrollClass) {
							addClass(instance.scrollCont, instance.props.rightScrollClass);
						}

						if (instance.props.rightMaskClass && !instance.temp.itemMask) {
							createMask(instance);
						}

						if (instance.props.rightItemActiveClass) {
							addClass(instance.temp.items[instance.temp.activeIndex], instance.props.rightItemActiveClass);
						}

						var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
						if (!instance.temp.itemClone) {
							var left = cursorX + 'px';
							createClone(instance, left, top);
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
						var scrollChange = Math.round(scrollProps.scrollDir * scrollProps.outFraction * instance.props.sortScrollSpeed);
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

		// CAN WE REPLACE THIS WITH OFFSETTOP?

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

		// CAN WE REPLACE THIS WITH: https://stackoverflow.com/questions/42267189/how-to-get-value-translatex-by-javascript

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
				// remove class from scrollCont
				// remove class from item
				// remove leftItemActiveClass
				// remove rightItemActiveClass

				if (instance.temp.moveType == 'LEFT') {
					var cloneX = Math.abs(instance.temp.itemClone.offsetLeft);
					var leftDET = getPXorPercent(instance.props.leftDragEndThreshold, instance.temp.items[instance.temp.activeIndex].offsetWidth);
					if (cloneX > leftDET) {
						initLeftSlideOut(instance);
					} else {}

					//          	const cloneX = -1 * this.clone.offsetLeft;

					//          	if (this.props.deleteConfirm) {
					//  	if (this.cloneIsAtDeleteConfirmThreshold) {
					//  		this.cloneIsAtDeleteConfirmThreshold = false;
					//   	if (this.props.onDeleteConfirmStart) {
					//   		this.props.onDeleteConfirmStart();
					//   	}
					// document.addEventListener('mousedown', this.handleDocClick);
					//  	} else {
					//  		this.autoSlideRight();
					//  	}
					//          	} else {
					//               let deleteSwipeEndPercent = 0.5;
					//               if (this.props.deleteSwipeEndPercent) {
					//                   deleteSwipeEndPercent = this.props.deleteSwipeEndPercent;
					//               }
					//               const deleteSwipeEndThreshold = this.taskDivs[this.activeTaskIndex].offsetWidth * deleteSwipeEndPercent;

					//               if (cloneX > deleteSwipeEndThreshold) {
					//                   this.autoSlideLeft();
					//               } else {
					//                   this.autoSlideRight();
					//               }
					//          	}
				} else {}
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

		if (instance.props.leftMaskSlideOutClass && instance.temp.itemMask) {
			addClass(instance.temp.itemMask, instance.props.leftMaskSlideOutClass);
		}

		instance.temp.itemClone.style.left = '-100%';

		setTimeout(function () {
			completeSlideOut(instance);
		}, instance.props.leftSlideOutDuration);
	};

	var completeSlideOut = function completeSlideOut(instance) {
		if (instance.temp.moveType == 'LEFT' && instance.props.onLeftEnd) {
			instance.props.onLeftEnd(instance.temp.activeIndex);
		} else if (instance.temp.moveType == 'RIGHT' && instance.props.onRightEnd) {
			instance.props.onRightEnd(instance.temp.activeIndex);
		}

		if (instance.props.leftScrollClass) {
			removeClass(instance.scrollCont, instance.props.leftScrollClass);
		}

		if (instance.temp.items[instance.temp.activeIndex] && instance.props.leftItemActiveClass) {
			removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.leftItemActiveClass);
		}

		instance.temp.moveType = null;
		instance.temp.activeIndex = null;
		destroyTempDivs(instance);
	};

	var sortEnd = function sortEnd(instance) {
		if (instance.props.sortItemActiveClass) {
			removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.sortItemActiveClass);
		}

		destroyTempDivs(instance);

		for (var i = 0, len = instance.temp.items.length; i < len; i++) {
			instance.temp.items[i].style[vendorPrefix + 'TransitionDuration'] = '';
			instance.temp.items[i].style[vendorPrefix + 'Transform'] = '';
		}

		if (instance.props.sortScrollClass) {
			removeClass(instance.scrollCont, instance.props.sortScrollClass);
		}

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
		if (instance.temp.itemMask) {
			instance.listCont.removeChild(instance.temp.itemMask);
			instance.temp.itemMask = null;
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

	var createMask = function createMask(instance) {
		var newDiv = document.createElement('div');
		instance.temp.itemMask = instance.listCont.appendChild(newDiv);
		instance.temp.itemMask.style.position = 'absolute';
		instance.temp.itemMask.style.left = '0';
		instance.temp.itemMask.style.top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
		instance.temp.itemMask.style.height = instance.temp.items[instance.temp.activeIndex].offsetHeight + 'px';
		instance.temp.itemMask.style.width = '100%';

		if (instance.temp.moveType == 'LEFT') {
			if (instance.props.leftMaskClass) {
				addClass(instance.temp.itemMask, instance.props.leftMaskClass);
			}
		} else if (instance.temp.moveType == 'RIGHT') {
			if (instance.props.rightMaskClass) {
				addClass(instance.temp.itemMask, instance.props.rightMaskClass);
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

	// utility functions

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

	// public properties and methods

	return {
		setDefaultProperties: setDefaultProperties,
		setListProperties: setListProperties,
		attachToList: attachToList,
		detachFromList: detachFromList
	};
}();

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/js/lithiumlist-pro-1.0.0.js");


/***/ })

/******/ });