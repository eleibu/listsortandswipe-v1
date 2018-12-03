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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lithiumlistPro", function() { return lithiumlistPro; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Notes:
// listCont should have 'position: relative'
// need to set css 'box-shadow' for 'clone-sort' class if want sort clone to have a drop shadow
// need to set css for 'sort-item-active' to hide active item while sorting


var lithiumlistPro = function () {
	var _defaultProperties;

	var instances = [];
	// var activeListCont = null;
	// var moveType = null;
	// var activeIndex = null;
	// var origIndex = null;
	// var startPageX = null;
	// var startPageY = null;
	// var lastPageX = null;
	// var lastPageY = null;
	// var sortDelayTimer = null;

	var defaultProperties = (_defaultProperties = {
		onSortStart: null,
		onSortEnd: null,
		sortEnabled: true,
		sortByDrag: true,
		sortCloneClass: 'clone-sort',
		sortItemActiveClass: 'sort-item-active',
		sortDragHandleClass: 'sort-drag-handle',
		// sortCloneBoxShadow: '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)',
		sortMoveStartDelay: 200,
		sortReorderDuration: 200,
		sortEndDockDuration: 200,
		sortScrollSpeed: 15,
		leftEnabled: true,
		leftByDrag: true,
		leftCloneClass: 'clone-left',
		leftDragHandleClass: 'left-drag-handle',
		leftDragStartThreshold: 10,
		leftDragEndPercent: 0.5,
		leftSlideOutDuration: 200,
		leftSlideInDuration: 200,
		leftBgdHeightTransition: 'height 100ms ease-in 100ms',
		leftBgdColor: '#FF3300',
		rightEnabled: true,
		rightByDrag: true
	}, _defineProperty(_defaultProperties, 'leftCloneClass', 'clone-right'), _defineProperty(_defaultProperties, 'rightDragHandleClass', 'right-drag-handle'), _defineProperty(_defaultProperties, 'rightDragStartThreshold', 10), _defineProperty(_defaultProperties, 'rightDragEndPercent', 0.5), _defineProperty(_defaultProperties, 'rightSlideOutDuration', 200), _defineProperty(_defaultProperties, 'rightSlideInDuration', 200), _defineProperty(_defaultProperties, 'rightBgdHeightTransition', 'height 100ms ease-in 100ms'), _defineProperty(_defaultProperties, 'rightBgdColor', '#339900'), _defaultProperties);

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

	var attachToList = function attachToList(listCont, scrollCont, eventsTarget, listItemClass, listProperties) {
		if (listCont == null) {
			throw 'listCont cannot be null.';
		}
		for (var i = 0, len = instances.length; i < len; i++) {
			if (instances[i].listCont === listCont) {
				throw 'listCont already has lithiumlist attached.';
			}
		}

		if (scrollCont == null) {
			scrollCont = window;
		} else {
			if (scrollCont !== window && scrollCont !== listCont && !scrollCont.contains(listCont)) {
				throw 'listCont must be parent of scrollCont.';
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

		var temp = {
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
			'funcMouseMove': null,
			'funcMouseUp': null,
			'funcTouchMove': null,
			'funcTouchEnd': null
		};

		var instance = {
			'listCont': listCont,
			'scrollCont': scrollCont,
			'eventsTarget': eventsTarget,
			'listItemClass': listItemClass,
			'deltaItemsScroll': getDeltaWithParent(listCont, scrollCont, 0),
			'props': props,
			'temp': temp
		};
		instances.push(instance);

		instance.listCont.addEventListener('mousedown', function (e) {
			mouseDown(e, instance);
		});
		// instance.listCont.addEventListener('touchstart', function(e) {touchStart(e, instance)});

		// var items = listCont.getElementsByClassName(listItemClass);
		// for (var i = 0, len = items.length; i < len; i++) {
		// 	(function(i) {
		// 		items[i].addEventListener('mousedown', function(e) {mouseDown(e, i, instance)});
		// 		items[i].addEventListener('touchstart', function(e) {touchStart(e, i, instance)});
		// 	}(i));
		// }
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
					// sort drag handle click
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

	var backgroundClick = function backgroundClick(e, index, instance) {
		if (instance.props.sortEnabled) {
			var pageX = getPageX(e);
			var pageY = getPageY(e);

			// activeListCont = listCont;
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

			setSortDelay(instance.props.sortMoveStartDelay, instance);
		}
	};

	var touchStart = function touchStart(e, index, instance) {
		alert(e.pageX + ' ' + index);
	};

	var setSortDelay = function setSortDelay(delay, instance) {
		instance.temp.sortDelayTimer = setTimeout(function () {
			activateSort(instance);
		}, delay);
	};

	var activateSort = function activateSort(instance) {
		if (instance.props.onSortStart) {
			instance.props.onSortStart(instance.temp.activeIndex);
		}

		instance.temp.sortDelayTimer = null;
		instance.temp.moveType = 'SORT';

		setItems(instance);
		if (!instance.temp.itemClone) {
			var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
			createClone(instance, 0, top);
		}

		if (instance.props.sortItemActiveClass) {
			addClass(instance.temp.items[instance.temp.activeIndex], instance.props.sortItemActiveClass);
		}
	};

	var mouseMove = function mouseMove(e, instance) {
		var pageX = getPageX(e);
		var pageY = getPageY(e);
		// const cursorX = this.startPageX - pageX;

		if (!instance.temp.moveType) {
			if (instance.temp.sortDelayTimer) {// ignore up / down movement during this time

			}
		} else {
			if (instance.temp.moveType == 'LEFT' || instance.temp.moveType == 'RIGHT') {} else if (instance.temp.moveType == 'SORT') {
				e.preventDefault(); // Prevent scrolling on mobile

				// if (this.scrollInterval) {
				//     clearInterval(this.scrollInterval);
				//     this.scrollInterval = null;
				// }

				var shouldScroll = moveItemClone(instance, pageY - instance.temp.lastPageY);
				// this.animateTasks();

				// if (shouldScroll) {
				//     let cloneTop = this.getOrigTop(this.clone) + this.getTranslateYNum(this.clone);
				//     let scrollDir = 0;
				//     let outFraction = 0;
				//     if (cloneTop < (this.getScrollCont().scrollTop - this.deltaItemsScroll)) {
				//         scrollDir = -1;    // scroll up
				//         outFraction = ((this.getScrollCont().scrollTop - this.deltaItemsScroll) - cloneTop) / this.clone.offsetHeight;
				//     } else if ((cloneTop + this.clone.offsetHeight) > (this.getScrollCont().scrollTop + this.getScrollCont().offsetHeight - this.deltaItemsScroll)) {
				//         scrollDir = 1;    // scroll down
				//         outFraction = ((cloneTop + this.clone.offsetHeight) - (this.getScrollCont().scrollTop + this.getScrollCont().offsetHeight - this.deltaItemsScroll)) / this.clone.offsetHeight;
				//     }

				//     if ((scrollDir != 0) & (outFraction != 0)) {
				//         let multiplier = 15;
				//         if (this.props.sortScrollSpeed) {
				//             multiplier = this.props.sortScrollSpeed;
				//         }
				//         const scrollChange = Math.round(scrollDir * outFraction * multiplier);

				//         this.scrollInterval = setInterval(() => {
				//             this.doScroll(scrollChange);
				//         }, 5);
				//     }
				// }
			}
		}

		instance.temp.lastPageX = pageX;
		instance.temp.lastPageY = pageY;
	};

	var moveItemClone = function moveItemClone(instance, deltaTrans) {
		//@@
		var shouldScroll = true;
		var cloneOrigTop = getItemCloneTop(instance);
		var cloneTrans = getTransYNum(instance.temp.itemClone) + deltaTrans;

		if (cloneOrigTop + cloneTrans < 0) {
			cloneTrans = -1 * cloneOrigTop;
			shouldScroll = false;
		} else if (cloneOrigTop + cloneTrans + instance.temp.itemClone.offsetHeight > instance.listCont.offsetHeight) {
			cloneTrans = instance.listCont.offsetHeight - cloneOrigTop - instance.temp.itemClone.offsetHeight;
			shouldScroll = false;
		}

		instance.temp.itemClone.style[vendorPrefix + 'Transform'] = 'translateY(' + cloneTrans + 'px)';
		return shouldScroll;
	};

	var animateItems = function animateItems() {};

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

		// instance.eventsTarget.addEventListener('mousemove', function(e) {mouseMove(e, instance);});
		// instance.eventsTarget.addEventListener('mouseup', function(e) {mouseUp(e, instance);});
		// instance.eventsTarget.addEventListener('touchmove', function(e) {touchMove(e, instance);});
		// instance.eventsTarget.addEventListener('touchend', function(e) {touchEnd(e, instance);});

		//       this.props.eventsTarget().removeEventListener('mousemove', this.handleMouseMove);
		//       this.props.eventsTarget().removeEventListener('mouseup', this.handleMouseUp);
		//       this.props.eventsTarget().removeEventListener('touchmove', this.handleTouchMove);
		//       this.props.eventsTarget().removeEventListener('touchend', this.handleTouchEnd);

		//       if (this.moveType) {
		//           if (this.moveType == 'DELETE') {
		//               if (this.clone) {
		//               	const cloneX = -1 * this.clone.offsetLeft;

		//               	if (this.props.deleteConfirm) {
		// 		    	if (this.cloneIsAtDeleteConfirmThreshold) {
		// 		    		this.cloneIsAtDeleteConfirmThreshold = false;
		// 			    	if (this.props.onDeleteConfirmStart) {
		// 			    		this.props.onDeleteConfirmStart();
		// 			    	}
		// 					document.addEventListener('mousedown', this.handleDocClick);
		// 		    	} else {
		// 		    		this.autoSlideRight();
		// 		    	}
		//               	} else {
		//                    let deleteSwipeEndPercent = 0.5;
		//                    if (this.props.deleteSwipeEndPercent) {
		//                        deleteSwipeEndPercent = this.props.deleteSwipeEndPercent;
		//                    }
		//                    const deleteSwipeEndThreshold = this.taskDivs[this.activeTaskIndex].offsetWidth * deleteSwipeEndPercent;

		//                    if (cloneX > deleteSwipeEndThreshold) {
		//                        this.autoSlideLeft();
		//                    } else {
		//                        this.autoSlideRight();
		//                    }
		//               	}
		//               }
		//           } else if (this.moveType == 'SORT') {
		//               if (this.scrollInterval) {
		//                   clearInterval(this.scrollInterval);
		//                   this.scrollInterval = null;
		//               }

		//               let activeTaskTop = getDeltaWithParent(this.taskDivs[this.activeTaskIndex], this.getItemsCont(), 0) + this.getTranslateYNum(this.taskDivs[this.activeTaskIndex]);

		//               let cloneTop = this.getOrigTop(this.clone) + this.getTranslateYNum(this.clone);
		//               let sortEndDockDuration = 200;
		//               if (this.props.sortEndDockDuration) {
		//                   sortEndDockDuration = this.props.sortEndDockDuration;
		//               }
		//               this.clone.style[`${vendorPrefix}TransitionDuration`] = sortEndDockDuration + 'ms';
		//               this.moveClone(activeTaskTop - cloneTop);

		//               this.sortEndTimer = setTimeout(() => {
		//                   this.sortEnd();
		//               }, sortEndDockDuration);
		//           }
		//       }
	};

	var touchMove = function touchMove(e, instance) {};

	var touchEnd = function touchEnd(e, instance) {};

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

	var detachFromList = function detachFromList(listCont) {
		if (listCont) {

			// do stuff

		} else {
			throw 'listCont cannot be null.';
		}
	};

	var addItem = function addItem(listCont, item) {};

	var removeItem = function removeItem(listCont, item) {};

	// utility functions

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
		// if ((elem) && (elem.className) && (elem.className.length > 0) && (className) && (className.length > 0)) {
		// 	className = " " + className + " ";
		// 	if ((" " + elem.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
		// 		return true;
		// 	}
		// }
		//    return false;
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
		detachFromList: detachFromList,
		addItem: addItem,
		removeItem: removeItem
	};
}();

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })

/******/ });