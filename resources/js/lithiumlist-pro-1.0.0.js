

// Notes:
// listCont should have 'position: relative'
// need to set css 'box-shadow' for 'clone-sort' class if want sort clone to have a drop shadow
// need to set css for 'sort-item-active' to hide active item while sorting


export var lithiumlistPro = (function () {
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

	var defaultProperties = {
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
        rightByDrag: true,
        leftCloneClass: 'clone-right',
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

		var temp = {
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
			'sortDelayTimer' : null
		};

		var instance = {
			'listCont' : listCont,
			'scrollCont' : scrollCont,
			'eventsTarget' : eventsTarget,
			'listItemClass' : listItemClass,
			'deltaItemsScroll' : getDeltaWithParent(listCont, scrollCont, 0),
			'props' : props,
			'temp' : temp
		};
		instances.push(instance);

		instance.listCont.addEventListener('mousedown', function(e) {mouseDown(e, instance)});
		// instance.listCont.addEventListener('touchstart', function(e) {touchStart(e, instance)});

		// var items = listCont.getElementsByClassName(listItemClass);
		// for (var i = 0, len = items.length; i < len; i++) {
		// 	(function(i) {
		// 		items[i].addEventListener('mousedown', function(e) {mouseDown(e, i, instance)});
		// 		items[i].addEventListener('touchstart', function(e) {touchStart(e, i, instance)});
		// 	}(i));
		// }
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

	var backgroundClick = function(e, index, instance) {
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
		instance.temp.sortDelayTimer = setTimeout(function() {activateSort(instance);}, delay);
	};

	var activateSort = function(instance) {
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

	var mouseMove = function(e, instance) {
        var pageX = getPageX(e);
        var pageY = getPageY(e);
        // const cursorX = this.startPageX - pageX;

        if (!instance.temp.moveType) {
        	if (instance.temp.sortDelayTimer) {	 // ignore up / down movement during this time

        	}
        } else {
        	if ((instance.temp.moveType == 'LEFT') || (instance.temp.moveType == 'RIGHT')) {

        	} else if (instance.temp.moveType == 'SORT') {

        	}
        }

        if (!this.moveType) {
            if (this.sortDelayTimer) { // ignore up / down movement during this setTimeout
                if (((this.props.deleteEnabled && this.props.deleteBySwipe)) && (cursorX > this.props.deleteSwipeStartThreshold)) {
                    clearTimeout(this.sortDelayTimer);
                    this.sortDelayTimer = null;
                    this.setTaskDivs();
                    this.moveType = 'DELETE';
                    if (this.props.itemsContHideOverflowOnSlide) {
                        this.origItemsContOverflow = this.getItemsCont().style.overflow;
                        this.getItemsCont().style.overflow = 'hidden';
                    }
                    if (!this.redDiv) {
                        this.createRed();
                    }
                    if (!this.clone) {
                        const left = -1 * cursorX + 'px';
                        const top = this.taskDivs[this.activeTaskIndex].offsetTop + 'px';
                        this.createClone(left, top);
                    }
                }
            }
        } else {
            if (this.moveType == 'DELETE') {
                if (this.props.itemsContHideOverflowOnSlide) {
                    this.origItemsContOverflow = this.getItemsCont().style.overflow;
                    this.getItemsCont().style.overflow = 'hidden';
                }
                if (!this.redDiv) {
                    this.createRed();
                }
                if (!this.clone) {
                    const left = -1 * cursorX + 'px';
                    const top = this.taskDivs[this.activeTaskIndex].offsetTop + 'px';
                    this.createClone(left, top);
                }
		    	if (cursorX > this.props.deleteSwipeStartThreshold) {
		    		if (this.props.deleteConfirm) {
				    	let deleteConfirmThreshold = 0.25;
				    	if (this.props.deleteConfirmThreshold) {
							deleteConfirmThreshold = this.props.deleteConfirmThreshold;
				    	}
				    	const thresholdPx = this.taskDivs[this.activeTaskIndex].offsetWidth * deleteConfirmThreshold;
				    	if (cursorX <= thresholdPx) {
				    		this.cloneIsAtDeleteConfirmThreshold = false;
		                    const left = -1 * cursorX + 'px';
		                    this.clone.style.left = left;
				    	} else {
				    		this.cloneIsAtDeleteConfirmThreshold = true;
				    	}
		    		} else {
	                    const left = -1 * cursorX + 'px';
	                    this.clone.style.left = left;
		    		}
		    	}
            } else if (this.moveType == 'SORT') {
                e.preventDefault(); // Prevent scrolling on mobile

                if (this.scrollInterval) {
                    clearInterval(this.scrollInterval);
                    this.scrollInterval = null;
                }

                let shouldScroll = this.moveClone(pageY - this.lastPageY);
                this.animateTasks();

                if (shouldScroll) {
                    let cloneTop = this.getOrigTop(this.clone) + this.getTranslateYNum(this.clone);
                    let scrollDir = 0;
                    let outFraction = 0;
                    if (cloneTop < (this.getScrollCont().scrollTop - this.deltaItemsScroll)) {
                        scrollDir = -1;    // scroll up
                        outFraction = ((this.getScrollCont().scrollTop - this.deltaItemsScroll) - cloneTop) / this.clone.offsetHeight;
                    } else if ((cloneTop + this.clone.offsetHeight) > (this.getScrollCont().scrollTop + this.getScrollCont().offsetHeight - this.deltaItemsScroll)) {
                        scrollDir = 1;    // scroll down
                        outFraction = ((cloneTop + this.clone.offsetHeight) - (this.getScrollCont().scrollTop + this.getScrollCont().offsetHeight - this.deltaItemsScroll)) / this.clone.offsetHeight;
                    }

                    if ((scrollDir != 0) & (outFraction != 0)) {
                        let multiplier = 15;
                        if (this.props.sortScrollSpeed) {
                            multiplier = this.props.sortScrollSpeed;
                        }
                        const scrollChange = Math.round(scrollDir * outFraction * multiplier);

                        this.scrollInterval = setInterval(() => {
                            this.doScroll(scrollChange);
                        }, 5);
                    }
                }
            }
        }
        this.lastPageX = pageX;
        this.lastPageY = pageY;



	};

	var moveItemClone = function(deltaTrans) {
	        let shouldScroll = true;
	        let cloneOrigTop = this.getOrigTop(this.clone);
	        let cloneTrans = this.getTranslateYNum(this.clone) + deltaTrans;

	        if (cloneOrigTop + cloneTrans < 0) {
	            cloneTrans = -1 * cloneOrigTop;
	            shouldScroll = false;
	        } else if (cloneOrigTop + cloneTrans + this.clone.offsetHeight > this.getItemsCont().offsetHeight) {
	            cloneTrans = this.getItemsCont().offsetHeight - cloneOrigTop - this.clone.offsetHeight;
	            shouldScroll = false;
	        }

	        this.clone.style[`${vendorPrefix}Transform`] = 'translateY('+ cloneTrans + 'px)';
	        return shouldScroll;
	};

	var animateItems = function() {

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

	var mouseUp = function(e, instance) {

	};

	var touchMove = function(e, instance) {

	};

	var touchEnd = function(e, instance) {

	};

	var setItems = function(instance) {
	    instance.temp.items = Array.prototype.slice.call(instance.listCont.getElementsByClassName(instance.listItemClass));
	}

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
	}

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