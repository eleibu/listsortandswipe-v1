

// Notes:
// listCont should have 'position: relative'


export var lithiumlistPro = (function () {
	var instances = [];
	// var activeListCont = null;
	var moveType = null;
	var activeIndex = null;
	var origIndex = null;
	var startPageX = null;
	var startPageY = null;
	var lastPageX = null;
	var lastPageY = null;
	var sortDelayTimer = null;

	var defaultProperties = {
		onSortStart: null,
		onSortEnd: null,
        sortEnabled: true,
        sortByDrag: true,
        sortDragHandleClass: 'sort-drag-handle',
        // sortCloneBoxShadow: '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)',
        sortMoveStartDelay: 200,
        sortReorderDuration: 200,
        sortEndDockDuration: 200,
        sortScrollSpeed: 15,
        leftEnabled: true,
        leftByDrag: true,
        leftDragHandleClass: 'left-drag-handle',
        leftDragStartThreshold: 10,
        leftDragEndPercent: 0.5,
        leftSlideOutDuration: 200,
        leftSlideInDuration: 200,
        leftBgdHeightTransition: 'height 100ms ease-in 100ms',
        leftBgdColor: '#FF3300',
        rightEnabled: true,
        rightByDrag: true,
        rightDragHandleClass: 'right-drag-handle',
        rightDragStartThreshold: 10,
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

	var attachToList = function(listCont, scrollCont, eventsTarget, listItemClass, listProperties) {
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
			if ((scrollCont !== window) && (scrollCont !== listCont) && (!scrollCont.contains(listCont))) {
				throw 'listCont must be parent of scrollCont.';
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
			'listCont' : listCont,
			'scrollCont' : scrollCont,
			'eventsTarget' : eventsTarget,
			'listItemClass' : listItemClass,
			'deltaItemsScroll' : getDeltaWithParent(listCont, scrollCont, 0),
			'props' : props
		};
		instances.push(instance);

		var items = listCont.getElementsByClassName(listItemClass);
		for (var i = 0, len = items.length; i < len; i++) {
			(function(i) {
				items[i].addEventListener('mousedown', function(e) {mouseDown(e, i, instance)});
				items[i].addEventListener('touchstart', function(e) {touchStart(e, i, instance)});
			}(i));
		}
	};

	var mouseDown = function(e, index, instance) {
		// var instance = null;
		// for (var i = 0, len = instances.length; i < len; i++) {
		// 	if (instances[i].listCont === listCont) {
		// 		instance = instances[i];
		// 		break;
		// 	}
		// }

		if ((instance != null) && ((instance.props.sortEnabled) || (instance.props.leftEnabled) || (instance.props.rightEnabled))) {
 			if ((instance.props.sortDragHandleClass) && (hasClass(e.target, instance.props.sortDragHandleClass))) {
 				// sort drag handle click
 				// alert('sort handle');

 			} else if ((instance.props.leftDragHandleClass) && (hasClass(e.target, instance.props.leftDragHandleClass))) {
 				// left drag handle click
 				// alert('left handle');

 			} else if ((instance.props.rightDragHandleClass) && (hasClass(e.target, instance.props.rightDragHandleClass))) {
 				// right drag handle click
 				// alert('right handle');

 			} else {
 				backgroundClick(e, index, instance);
 				// background click
 				// alert('background');

 			}
		}
	};

	var backgroundClick = function(e, index, instance) {
		if (instance.props.sortEnabled) {
			var pageX = getPageX(e);
			var pageY = getPageY(e);

			// activeListCont = listCont;
			activeIndex = index;
			origIndex = index;
			startPageX = pageX;
			startPageY = pageY;
			lastPageX = pageX;
			lastPageY = pageY;

			instance.eventsTarget.addEventListener('mousemove', function(e) {mouseMove(e, instance);});
			instance.eventsTarget.addEventListener('mouseup', function(e) {mouseUp(e, instance);});
			instance.eventsTarget.addEventListener('touchmove', function(e) {touchMove(e, instance);});
			instance.eventsTarget.addEventListener('touchend', function(e) {touchEnd(e, instance);});

			setSortDelay(instance.props.sortMoveStartDelay, instance);
		}
	};

	var touchStart = function(e, index, instance) {
		alert(e.pageX + ' ' + index);
	};

	var setSortDelay = function(delay, instance) {
		sortDelayTimer = setTimeout(function() {activateSort(instance);}, delay);
	};

	var activateSort = function(instance) {
        if (instance.props.onSortStart) {
			instance.props.onSortStart(activeIndex);
        }
        alert(activeIndex);

        // this.setTaskDivs();
        // this.moveType = 'SORT';
        // this.sortDelayTimer = null;

        // if (!this.clone) {
        //     const top = this.taskDivs[this.activeTaskIndex].offsetTop + 'px';
        //     this.createClone(0, top);
        //     let sortCloneBoxShadow = '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)';
        //     if (this.props.sortCloneBoxShadow) {
        //         sortCloneBoxShadow = this.props.sortCloneBoxShadow;
        //     }
        //     this.clone.style.boxShadow = sortCloneBoxShadow;
        // }

        // this.taskDivs[this.activeTaskIndex].style.visibility = 'hidden';
        // this.taskDivs[this.activeTaskIndex].style.opacity = '0';
	};

	var mouseMove = function(e, index, listCont, instance) {

	};

	var mouseUp = function(e, index, listCont, instance) {

	};

	var touchMove = function(e, index, listCont, instance) {

	};

	var touchEnd = function(e, index, listCont, instance) {

	};

	var detachFromList = function(listCont) {
		if (listCont) {

			// do stuff

		} else {
			throw 'listCont cannot be null.';
		}
	};

	var addItem = function(listCont, item) {

	};

	var removeItem = function(listCont, item) {
		
	};


	// utility functions

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

	var hasClass = function(elem, className) {
		if ((elem) && (elem.className) && (elem.className.length > 0) && (className) && (className.length > 0)) {
			className = " " + className + " ";
			if ((" " + elem.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
				return true;
			}
		}
	    return false;
	};

	var getDeltaWithParent = function(node, parent, delta) {
	    if (node) {
	        const newDelta = node.offsetTop + delta;
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
		detachFromList: detachFromList,
		addItem: addItem,
		removeItem: removeItem
	};
})();