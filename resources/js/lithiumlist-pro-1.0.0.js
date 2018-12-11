

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


// Known issues:
// * Position of itemCont behaves strangely when item-cont has a top or bottom margin. Temporary resolution is to remove the margin, insert a child div and add a margin to that.
// * Cursor is sometimes far above itemCont but still moving it (seems to happen only when moving up, but not sure).


// TODO: Start of scrolling should cancel sort timer (DONE?)
// TODO: Sorting should not start if cursor/touch is not over same item that was clicked/touched
// TODO: Remove .version() from webpack.mix.js?


export var lithiumlistPro = (function () {
	var instances = [];

	var defaultProperties = {
		onSortStart: null,
		onSortEnd: null,
        sortEnabled: true,
        sortByDrag: true,
        sortCloneClass: 'clone-sort',
        sortItemActiveClass: 'sort-item-active',
        sortDragHandleClass: 'sort-drag-handle',
        // sortCloneBoxShadow: '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)',
        sortMoveStartDelay: 400,
        sortReorderDuration: 200,
        sortEndDockDuration: 200,
        sortScrollSpeed: 15,
		onLeftStart: null,
		onLeftEnd: null,
        leftEnabled: true,
        leftByDrag: true,
        leftCloneClass: 'clone-left',
        leftMaskClass: 'mask-left',
        leftDragHandleClass: 'left-drag-handle',
        leftDragStartThreshold: '10px',
        leftDragEndPercent: 0.5,
        leftSlideOutDuration: 200,
        leftSlideInDuration: 200,
        leftBgdHeightTransition: 'height 100ms ease-in 100ms',
        leftBgdColor: '#FF3300',
		onRightStart: null,
		onRightEnd: null,
        rightEnabled: true,
        rightByDrag: true,
        rightCloneClass: 'clone-right',
        rightMaskClass: 'mask-right',
        rightDragHandleClass: 'right-drag-handle',
        rightDragStartThreshold: '10px',
        rightDragEndPercent: 0.5,
        rightSlideOutDuration: 200,
        rightSlideInDuration: 200,
        rightBgdHeightTransition: 'height 100ms ease-in 100ms',
        rightBgdColor: '#339900'
	};

	var setDefaultProperties = function(userDefaultProperties) {
		if (userDefaultProperties) {
			for (var attrname in defaultProperties) {
				if (typeof userDefaultProperties[attrname] !== 'undefined') {
					defaultProperties[attrname] = userDefaultProperties[attrname];
				}
			}
		}
	};

	var setListProperties = function(userListProperties) {
		// to do
	};

	var attachToList = function(scrollCont, listCont, eventsTarget, listItemClass, listProperties) {
		if (scrollCont == null) {
			scrollCont = window;
		} else {
			if ((scrollCont !== window) && (scrollCont !== listCont) && (!scrollCont.contains(listCont))) {
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

		if ((listItemClass == null) || (listItemClass.length == 0)) {
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
			'scrollCont' : scrollCont,
			'listCont' : listCont,
			'eventsTarget' : eventsTarget,
			'listItemClass' : listItemClass,
			'deltaItemsScroll' : getDeltaWithParent(listCont, scrollCont, 0),
			'props' : props,
			'temp' : getEmptyTemp()
		};
		instances.push(instance);

		instance.temp.funcOnScroll = function(e) {onScroll(e, instance);};
		instance.temp.funcMouseDown = function(e) {mouseDown(e, instance);};
		instance.temp.funcTouchStart = function(e) {touchStart(e, instance);};
		instance.scrollCont.addEventListener('scroll', instance.temp.funcOnScroll);
		instance.listCont.addEventListener('mousedown', instance.temp.funcMouseDown);
		instance.listCont.addEventListener('touchstart', instance.temp.funcTouchStart);
	};

	var getEmptyTemp = function() {
		return {
			'items' : [],
			'moveType' : null,
			'itemClone' : null,
			'itemMask' : null,
			'activeIndex' : null,
			'origIndex' : null,
			'startPageX' : null,
			'startPageY' : null,
			'lastPageX' : null,
			'lastPageY' : null,
			'sortDelayTimer' : null,
			'sortEndTimer' : null,
			'scrollInterval' : null,
			'funcOnScroll' : null,
			'funcMouseDown' : null,
			'funcTouchStart' : null,
			'funcMouseMove' : null,
			'funcMouseUp' : null,
			'funcTouchMove' : null,
			'funcTouchEnd' : null
		};
	};

	var onScroll = function(e, instance) {
    	if (instance.temp.sortDelayTimer) {
    		clearTimeout(instance.temp.sortDelayTimer);
    		instance.temp.sortDelayTimer = null;
    	}
	};

	var mouseDown = function(e, instance) {
		if ((instance != null) && ((instance.props.sortEnabled) || (instance.props.leftEnabled) || (instance.props.rightEnabled))) {
			setItems(instance);

			var index = null;
			for (var i = 0, len = instance.temp.items.length; i < len; i++) {
				if ((instance.temp.items[i] === e.target) || (instance.temp.items[i].contains(e.target))) {
					index = i;
					break;
				}
			}

			if (index != null) {
				if (checkClassClicked(e, instance.temp.items[index], instance.props.sortDragHandleClass)) {
					setTimeout(function() {sortHandleClick(e, index, instance);}, 1);	// delay allows itemCont to show :hover classes
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

	var touchStart = function(e, instance) {
		mouseDown(e, instance);
	};

	var initialiseItemMove = function(e, index, instance) {
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

		instance.eventsTarget.addEventListener('mousemove', instance.temp.funcMouseMove);
		instance.eventsTarget.addEventListener('mouseup', instance.temp.funcMouseUp);
		instance.eventsTarget.addEventListener('touchmove', instance.temp.funcTouchMove);
		instance.eventsTarget.addEventListener('touchend', instance.temp.funcTouchEnd);
	};

	var sortHandleClick = function(e, index, instance) {
		if (instance.props.sortEnabled) {
			initialiseItemMove(e, index, instance);
			setItems(instance);
			activateSort(instance);
		}
	};

	var backgroundClick = function(e, index, instance) {
		if ((instance.props.sortEnabled && instance.props.sortByDrag) || (instance.props.leftEnabled && instance.props.leftByDrag) || (instance.props.rightEnabled && instance.props.rightByDrag)) {
			initialiseItemMove(e, index, instance);
			setItems(instance);
			if (instance.props.sortEnabled && instance.props.sortByDrag && (instance.temp.items.length > 1)) {
				instance.temp.sortDelayTimer = setTimeout(function() {activateSort(instance);}, instance.props.sortMoveStartDelay);
			} else {

				// wait for either left or right drag

			}
		}
	};


	var activateSort = function(instance) {
		if ((instance.temp) && (instance.temp.lastPageX != null) && (instance.temp.lastPageY != null)) {
			var rect = instance.temp.items[instance.temp.activeIndex].getBoundingClientRect();
			if ((instance.temp.lastPageX >= rect.left) && (instance.temp.lastPageX <= rect.right) && (instance.temp.lastPageY >= rect.top) && (instance.temp.lastPageY <= rect.bottom)) {
		        if (instance.props.onSortStart) {
					instance.props.onSortStart(instance.temp.activeIndex);
		        }
		        instance.temp.sortDelayTimer = null;
		        instance.temp.moveType = 'SORT';

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

	var getPXorPercent = function(val) {
		if (val != 0) {
			var index = val.indexOf('px');
			if (index == -1) {
				index = val.indexOf('%');
			}
			if (index > -1) {
				return parseInt(val.substring(0, index));
			} else {
				return 0;
			}
		}
	};

	var mouseMove = function(e, instance) {
		if ((instance.temp) && (instance.temp.moveType == 'SORT')) {
			e.preventDefault();
		}

        var pageX = getPageX(e);
        var pageY = getPageY(e);

        if (!instance.temp.moveType) {
        	if ((instance.temp.sortDelayTimer) && ((instance.props.leftEnabled && instance.props.leftByDrag) || (instance.props.rightEnabled && instance.props.rightByDrag))) {
        		var cursorX = pageX - instance.temp.lastPageX;
        		if ((cursorX < 0) && instance.props.leftEnabled && instance.props.leftByDrag) {
        			var leftDT = 0;
        			if (instance.props.leftDragStartThreshold != 0) {
        				var index = instance.props.leftDragStartThreshold.indexOf('px');
        				if (index > -1) {
        					leftDT = parseInt(instance.props.leftDragStartThreshold.substring(0, index));
        				} else {
        					index = instance.props.leftDragStartThreshold.indexOf('%');
        					if (index > -1) {
        						var perc = parseFloat(instance.props.leftDragStartThreshold.substring(0, index)) * 0.01;    
        						var itemW = instance.temp.items[instance.temp.activeIndex].offsetWidth;
								leftDT = Math.round(perc * itemW);
        					}
        				}
        			}
        			if (Math.abs(cursorX) > leftDT) {
        				console.log('left');
        				clearTimeout(instance.temp.sortDelayTimer);
        				instance.temp.sortDelayTimer = null;
				        instance.temp.moveType = 'LEFT';


						var top = instance.temp.items[instance.temp.activeIndex].offsetTop + 'px';
				        if (!instance.temp.itemClone) {
				        	var left = cursorX + 'px';
				        	createClone(instance, left, top);
				        }

				        if (!instance.temp.itemMask) {
				        	createMask(instance, top);
				        }

				        // call 'onLeftStart'
        			}


        		} else if (cursorX > 0) {

        		}

        	} else {
        		// waiting for mouse to be released, or left or right drag

        	}
        } else {
        	if ((instance.temp.moveType == 'LEFT') || (instance.temp.moveType == 'RIGHT')) {

        	} else if (instance.temp.moveType == 'SORT') {
                var deltaY = pageY - instance.temp.lastPageY;
	        	if ((deltaY != 0) && (instance.temp.scrollInterval)) {
	        		clearInterval(instance.temp.scrollInterval);
	        		instance.temp.scrollInterval = null;
	        	}

        		var rect = instance.temp.itemClone.getBoundingClientRect();
	        	var shouldMove = false;
	        	if ((deltaY < 0) && (rect.bottom > pageY)) {		// moving up - move if cursor is above bottom of itemClone
					shouldMove = true;
	        	} else if ((deltaY > 0) && (rect.top < pageY)) {	// moving down - move if cursor is below top of itemClone
					shouldMove = true;
	        	}

	        	if (shouldMove) {
	        		var scrollProps = moveItemClone(instance, deltaY, true);
	        		animateItems(instance);

                    if ((scrollProps.scrollDir != 0) && (scrollProps.outFraction != 0)) {
                    	var scrollChange = Math.round(scrollProps.scrollDir * scrollProps.outFraction * instance.props.sortScrollSpeed);
                    	instance.temp.scrollInterval = setInterval(function() {doScroll(instance, scrollChange);}, 5);
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

	var doScroll = function(instance, scrollChange) {
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

	var moveItemClone = function(instance, deltaTrans, withScrollProps) {
        var cloneOrigTop = getItemCloneTop(instance);
        var cloneTrans = getTransYNum(instance.temp.itemClone) + deltaTrans;

        if (cloneOrigTop + cloneTrans < 0) {	// ensure itemClone is not above top or below bottom of listCont
            cloneTrans = -1 * cloneOrigTop;
        } else if (cloneOrigTop + cloneTrans + instance.temp.itemClone.offsetHeight > instance.listCont.clientHeight) {
            cloneTrans = instance.listCont.clientHeight - cloneOrigTop - instance.temp.itemClone.offsetHeight;
        }
        instance.temp.itemClone.style[`${vendorPrefix}Transform`] = 'translateY('+ cloneTrans + 'px)';

		var cloneTop = cloneOrigTop + cloneTrans;
        if (withScrollProps) {
        	// return scrollProps
	        var scrollDir = 0;
	        var outFraction = 0;
	        if (cloneTop < (instance.scrollCont.scrollTop - instance.deltaItemsScroll)) {
	        	scrollDir = -1;		// scroll up
	        	outFraction = ((instance.scrollCont.scrollTop - instance.deltaItemsScroll) - cloneTop) / instance.temp.itemClone.offsetHeight;
	        } else if ((cloneTop + instance.temp.itemClone.offsetHeight) > (instance.scrollCont.scrollTop + instance.scrollCont.clientHeight - instance.deltaItemsScroll)) {
				scrollDir = 1;		// scroll down
				outFraction = ((cloneTop + instance.temp.itemClone.offsetHeight) - (instance.scrollCont.scrollTop + instance.scrollCont.clientHeight - instance.deltaItemsScroll)) / instance.temp.itemClone.offsetHeight;
	        }
	        return {
	        	'scrollDir' : scrollDir,
	        	'outFraction' : outFraction
	        };
        } else {
        	// return shouldScroll
        	var shouldScroll = false;
        	if ((cloneTop < (instance.scrollCont.scrollTop - instance.deltaItemsScroll)) || ((cloneTop + instance.temp.itemClone.offsetHeight) > (instance.scrollCont.scrollTop + instance.scrollCont.clientHeight - instance.deltaItemsScroll))) {
        		shouldScroll = true;
        	}
        	return shouldScroll;
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

        var cloneTop = getItemCloneTop(instance) + getTransYNum(instance.temp.itemClone);

        if ((cloneTop < moveUpBoundary) || ((cloneTop + instance.temp.itemClone.offsetHeight) > moveDownBoundary)) {
            if ((prevIndex !== null) && (cloneTop < moveUpBoundary)) {
                // move up
                var activeUp = -1 * instance.temp.items[prevIndex].offsetHeight;
				instance.temp.items[instance.temp.activeIndex].style[`${vendorPrefix}TransitionDuration`] = instance.props.sortReorderDuration + 'ms';
				setTransY(instance.temp.items[instance.temp.activeIndex], activeUp);

                var prevDown = instance.temp.items[instance.temp.activeIndex].offsetHeight;
				instance.temp.items[prevIndex].style[`${vendorPrefix}TransitionDuration`] = instance.props.sortReorderDuration + 'ms';
				setTransY(instance.temp.items[prevIndex], prevDown);

                var copyActiveTaskDivRef = instance.temp.items[instance.temp.activeIndex];
                instance.temp.items[instance.temp.activeIndex] = instance.temp.items[prevIndex];
				instance.temp.items[prevIndex] = copyActiveTaskDivRef;
				instance.temp.activeIndex = prevIndex;
            } else if ((nextIndex !== null) && ((cloneTop + instance.temp.itemClone.offsetHeight) > moveDownBoundary)) {
                // move down
                var activeDown = instance.temp.items[nextIndex].offsetHeight;
                instance.temp.items[instance.temp.activeIndex].style[`${vendorPrefix}TransitionDuration`] = instance.props.sortReorderDuration + 'ms';
				setTransY(instance.temp.items[instance.temp.activeIndex], activeDown);

                var nextUp = -1 * instance.temp.items[instance.temp.activeIndex].offsetHeight;
                instance.temp.items[nextIndex].style[`${vendorPrefix}TransitionDuration`] = instance.props.sortReorderDuration + 'ms';
                setTransY(instance.temp.items[nextIndex], nextUp);

                var copyActiveTaskDivRef = instance.temp.items[instance.temp.activeIndex];
                instance.temp.items[instance.temp.activeIndex] = instance.temp.items[nextIndex];
                instance.temp.items[nextIndex] = copyActiveTaskDivRef;
                instance.temp.activeIndex = nextIndex;
            }
        }
	};

	var getItemCloneTop = function(instance) {

		// CAN WE REPLACE THIS WITH OFFSETTOP?

		var origTop = 0;
		if ((instance.temp.itemClone) && (instance.temp.itemClone.style) && (instance.temp.itemClone.style.top)) {
			var index = instance.temp.itemClone.style.top.indexOf('px');
			if (index > -1) {
				origTop = parseInt(instance.temp.itemClone.style.top.substring(0, index));
			}
		}
		return origTop;
	};

	var getTransYNum = function(el) {

		// CAN WE REPLACE THIS WITH: https://stackoverflow.com/questions/42267189/how-to-get-value-translatex-by-javascript

        var currentTransAmount = 0;
        if ((el.style) && (el.style[`${vendorPrefix}Transform`])) {
            var index = el.style[`${vendorPrefix}Transform`].indexOf('px');
            if (index >  -1) {
                currentTransAmount = parseInt(el.style[`${vendorPrefix}Transform`].substring(11, index));
            }
        }
        return currentTransAmount;
	};

	var setTransY = function(el, transAmount) {
		var currentTransAmount = getTransYNum(el);
        var newTransAmount = 0;
        if (currentTransAmount != 0) {
            newTransAmount = currentTransAmount + transAmount;
        } else {
            newTransAmount = transAmount;
        }
        if (newTransAmount != 0) {
            el.style[`${vendorPrefix}Transform`] = 'translateY('+ newTransAmount + 'px)';
        } else {
            el.style[`${vendorPrefix}Transform`] = '';
        }
	}

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

	var mouseUp = function(e, instance) {
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
        	if ((instance.temp.moveType == 'LEFT') || (instance.temp.moveType == 'RIGHT')) {


        	} else if (instance.temp.moveType == 'SORT') {
	        	if (instance.temp.scrollInterval) {
	        		clearInterval(instance.temp.scrollInterval);
	        		instance.temp.scrollInterval = null;
	        	}

                var activeTaskTop = getDeltaWithParent(instance.temp.items[instance.temp.activeIndex], instance.listCont, 0) + getTransYNum(instance.temp.items[instance.temp.activeIndex]);

                var cloneTop = getItemCloneTop(instance) + getTransYNum(instance.temp.itemClone);
                instance.temp.itemClone.style[`${vendorPrefix}TransitionDuration`] = instance.props.sortEndDockDuration + 'ms';
                moveItemClone(instance, activeTaskTop - cloneTop, false);

                instance.temp.sortEndTimer = setTimeout(function() {sortEnd(instance)}, instance.props.sortEndDockDuration);
        	}
        }
	};

	var touchEnd = function(e, instance) {
		mouseUp(e, instance);
	};

	var sortEnd = function(instance) {
		if (instance.props.sortItemActiveClass) {
			removeClass(instance.temp.items[instance.temp.activeIndex], instance.props.sortItemActiveClass);
		}

        destroyTempDivs(instance);

		for (var i = 0, len = instance.temp.items.length; i < len; i++) {
			instance.temp.items[i].style[`${vendorPrefix}TransitionDuration`] = '';
			instance.temp.items[i].style[`${vendorPrefix}Transform`] = '';
		}
		if (instance.props.onSortEnd) {
			instance.props.onSortEnd(instance.temp.origIndex, instance.temp.activeIndex);
		}
		instance.temp = getEmptyTemp();
	};

	var destroyTempDivs = function(instance) {



		if (instance.temp.itemClone) {
			instance.listCont.removeChild(instance.temp.itemClone);
			instance.temp.itemClone = null;
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

	var createMask = function(instance, top) {
		var newDiv = document.createElement('div');
		instance.temp.itemMask = instance.listCont.appendChild(newDiv);
		instance.temp.itemClone.style.position = 'absolute';
		instance.temp.itemClone.style.left = '0';
		instance.temp.itemClone.style.top = top;

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

	var getDeltaWithParent = function(node, parent, delta) {
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

	var uuidv4 = function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
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
})();