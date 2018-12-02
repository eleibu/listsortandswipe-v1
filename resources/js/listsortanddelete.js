import React from 'react';
import { findDOMNode } from 'react-dom';
import { getDeltaWithParent } from 'SHARED/utils.js';

export default function listSortAndDelete(WrappedComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);
		    this.taskDivs = [];
		    this.origTaskIndex = null;
		    this.activeTaskIndex = null;
		    this.ignoreElements = ['input', 'textarea', 'select', 'option', 'button'];
		    this.moveType = null;   // null, 'DELETE' or 'SORT'
		    this.sortDelayTimer = null;
		    this.startPageX = null;
		    this.startPageY = null;
		    this.lastPageX = null;
		    this.lastPageY = null;
		    this.scrollInterval = null;
		    this.sortEndTimer = null;
		    this.deltaItemsScroll = 0;
		    this.setTaskDivs = this.setTaskDivs.bind(this);
		    this.handleSort = this.handleSort.bind(this);
		    this.handleDeleteButton = this.handleDeleteButton.bind(this);
		    this.deleteItem = this.deleteItem.bind(this);
		    this.handleDocClick = this.handleDocClick.bind(this);
		    this.handleTouchStart = this.handleTouchStart.bind(this);
		    this.handleMouseDown = this.handleMouseDown.bind(this);
		    this.handleMouseMove = this.handleMouseMove.bind(this);
		    this.handleMouseUp = this.handleMouseUp.bind(this);
		    this.handleTouchMove = this.handleTouchMove.bind(this);
		    this.handleTouchEnd = this.handleTouchEnd.bind(this);
		    this.deleteAllItems = this.deleteAllItems.bind(this);
		    this.autoDeleteAll = this.autoDeleteAll.bind(this);
		}
	    componentDidMount() {
	        this.deltaItemsScroll = getDeltaWithParent(this.getItemsCont(), this.getScrollCont(), 0);
	    }
	    setTaskDivs() {
	        const itemsCont = this.getItemsCont();
	        if (itemsCont) {
	            this.taskDivs = Array.prototype.slice.call(itemsCont.getElementsByClassName(this.props.itemsClassName));
	        }
	    }
	    handleSort(e, index) {
	        e.stopPropagation();
	        if ((this.props.sortEnabled) && (!this.props.sortByDragging) && (this.props.items.length > 1)) {
	            const pageX = getPageX(e);
	            const pageY = getPageY(e);

	            this.origTaskIndex = index;
	            this.activeTaskIndex = index;
	            this.startPageX = pageX;
	            this.startPageY = pageY;
	            this.lastPageX = pageX;
	            this.lastPageY = pageY;            
	            this.props.eventsTarget().addEventListener('mousemove', this.handleMouseMove);
	            this.props.eventsTarget().addEventListener('mouseup', this.handleMouseUp);
	            this.props.eventsTarget().addEventListener('touchmove', this.handleTouchMove);
	            this.props.eventsTarget().addEventListener('touchend', this.handleTouchEnd);

	            let delay = 0;
	            if (this.props.sortMoveStartDelay) {
	                delay = this.props.sortMoveStartDelay;
	            }
	            this.setSortDelay(delay);
	        }
	    }
	    handleDeleteButton(e, index) {
	        e.stopPropagation();
	        if (this.props.deleteEnabled && !this.props.deleteBySwipe) {
	        	this.deleteItem(index);
	        }
	    }
	    deleteItem(index) {
            this.setTaskDivs();
            if (this.taskDivs[index]) {
            	this.activeTaskIndex = index;
	            if (this.props.itemsContHideOverflowOnSlide) {
	                this.origItemsContOverflow = this.getItemsCont().style.overflow;
	                this.getItemsCont().style.overflow = 'hidden';
	            }
	            if (!this.redDiv) {
					this.createRed();
	            }
	            if (!this.clone) {
		            const top = this.taskDivs[this.activeTaskIndex].offsetTop + 'px';
		            this.createClone('0px', top);
	            }
	            if (this.props.deleteConfirm) {
					this.autoSlideConfirm();
	            } else {
		            this.autoSlideLeft();
	            }
            }
	    }
	    autoSlideConfirm() {
	    	const autoSlideConfirmDuration = 100;
	    	this.clone.style.transition = 'left '+ autoSlideConfirmDuration + 'ms ease-in';
	    	setTimeout(() => this.doAutoSlideConfirm(autoSlideConfirmDuration), 1);
	    }
	    doAutoSlideConfirm(autoSlideConfirmDuration) {
	    	let deleteConfirmThreshold = 0.25;
	    	if (this.props.deleteConfirmThreshold) {
				deleteConfirmThreshold = this.props.deleteConfirmThreshold;
	    	}
	    	this.clone.style.left = (-1 * (this.taskDivs[this.activeTaskIndex].offsetWidth * deleteConfirmThreshold)) + 'px';
			setTimeout(() => this.autoSlideConfirmCompleted(), autoSlideConfirmDuration);
	    }
	    autoSlideConfirmCompleted() {
	    	if (this.props.onDeleteConfirmStart) {
	    		this.props.onDeleteConfirmStart();
	    	}
	    	document.addEventListener('mousedown', this.handleDocClick);
	    }
	    handleDocClick(e) {
	    	document.removeEventListener('mousedown', this.handleDocClick);
	    	if (this.props.onDeleteConfirmEnd) {
	    		this.props.onDeleteConfirmEnd();
	    	}
			if ((this.redDiv) && ((e.target === this.redDiv) || (this.redDiv.contains(e.target)))) {
				this.autoSlideLeft();
			} else {
				this.autoSlideRight();
			}
	    }
	    deleteAllItems() {
	    	this.setTaskDivs();
	    	this.autoDeleteAll();
	    }
	    autoDeleteAll() {
	    	if (this.taskDivs.length > 0) {
	    		this.deleteItem(0);
	    		this.autoDeleteAllTimeout = setTimeout(() => this.autoDeleteAll(), 300);
	    	}
	    }
	    handleTouchStart(e, index) {
	        this.handleMouseDown(e, index);
	    }
	    handleMouseDown(e, index) {
	        if ((e.button !== 2) && (this.ignoreElements.indexOf(e.target.tagName.toLowerCase()) == -1) && ((this.props.deleteEnabled && this.props.deleteBySwipe) || (this.props.sortEnabled && this.props.sortByDragging && (this.props.items.length > 1)))) {
	            // Fixes a bug in Firefox where the :active state of anchor tags prevent subsequent 'mousemove' events from being fired (see https://github.com/clauderic/react-sortable-hoc/issues/118)
	            if (!isTouchEvent(e) && e.target.tagName.toLowerCase() === 'a') {
	                e.preventDefault();
	            }

	            const pageX = getPageX(e);
	            const pageY = getPageY(e);

	            this.origTaskIndex = index;
	            this.activeTaskIndex = index;
	            this.startPageX = pageX;
	            this.startPageY = pageY;
	            this.lastPageX = pageX;
	            this.lastPageY = pageY;            
	            this.props.eventsTarget().addEventListener('mousemove', this.handleMouseMove);
	            this.props.eventsTarget().addEventListener('mouseup', this.handleMouseUp);
	            this.props.eventsTarget().addEventListener('touchmove', this.handleTouchMove);
	            this.props.eventsTarget().addEventListener('touchend', this.handleTouchEnd);

	            if ((this.props.deleteEnabled && this.props.deleteBySwipe) && (this.props.sortEnabled && this.props.sortByDragging && (this.props.items.length > 1))) {
	                // deleteBySwipe AND sortByDragging
	                let delay = 200;
	                if (this.props.sortMoveStartDelay) {
	                    delay = this.props.sortMoveStartDelay;
	                }
	                this.setSortDelay(delay);
	            } else if (this.props.deleteEnabled && this.props.deleteBySwipe) {
	                // deleteBySwipe only
	                this.setTaskDivs();
	                this.moveType = 'DELETE';
	                this.sortDelayTimer = null;
	            } else {
	                // sortByDragging only
	                let delay = 0;
	                if (this.props.sortMoveStartDelay) {
	                    delay = this.props.sortMoveStartDelay;
	                }
	                this.setSortDelay(delay);
	            }
	        }
	    }
	    setSortDelay(delay) {
	        this.moveType = null;
	        this.sortDelayTimer = setTimeout(this.activateSort.bind(this), delay);
	    }
	    activateSort() {
	        if (this.props.sortEnabled) {
		        if (this.props.onSortStart) {
		            this.props.onSortStart(this.activeTaskIndex);
		        }

	            this.setTaskDivs();
	            this.moveType = 'SORT';
	            this.sortDelayTimer = null;

	            if (!this.clone) {
	                const top = this.taskDivs[this.activeTaskIndex].offsetTop + 'px';
	                this.createClone(0, top);
	                let sortCloneBoxShadow = '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)';
	                if (this.props.sortCloneBoxShadow) {
	                    sortCloneBoxShadow = this.props.sortCloneBoxShadow;
	                }
	                this.clone.style.boxShadow = sortCloneBoxShadow;
	            }

	            this.taskDivs[this.activeTaskIndex].style.visibility = 'hidden';
	            this.taskDivs[this.activeTaskIndex].style.opacity = '0';
	        }
	    }
	    handleTouchMove(e) {
	        this.handleMouseMove(e);
	    }
	    handleMouseMove(e) {
	        const pageX = getPageX(e);
	        const pageY = getPageY(e);
	        const cursorX = this.startPageX - pageX;
	        if (!this.moveType) {
	            if (this.sortDelayTimer) { // ignore up / down movement during this time
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
	    }
	    moveClone(deltaTrans) {
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
	    }
	    animateTasks() {
	        let prevIndex = null;
	        let moveUpBoundary = 0;
	        if (this.activeTaskIndex > 0) {
	            prevIndex = this.activeTaskIndex - 1;
	            moveUpBoundary = this.taskDivs[prevIndex].offsetTop + this.getTranslateYNum(this.taskDivs[prevIndex]) + (this.taskDivs[prevIndex].offsetHeight / 2);
	        }

	        let nextIndex = null;
	        let moveDownBoundary = this.getItemsCont().offsetHeight;
	        if (this.activeTaskIndex < this.taskDivs.length - 1) {
	            nextIndex = this.activeTaskIndex + 1;
	            moveDownBoundary = this.taskDivs[nextIndex].offsetTop + this.getTranslateYNum(this.taskDivs[nextIndex]) + (this.taskDivs[nextIndex].offsetHeight / 2);
	        }

	        let cloneTop = this.getOrigTop(this.clone) + this.getTranslateYNum(this.clone);

	        if ((cloneTop < moveUpBoundary) || ((cloneTop + this.clone.offsetHeight) > moveDownBoundary)) {
	            let sortReorderDuration = 200;
	            if (this.props.sortReorderDuration) {
	                sortReorderDuration = this.props.sortReorderDuration;
	            }
	            if ((prevIndex !== null) && (cloneTop < moveUpBoundary)) {
	                // move up
	                const activeUp = -1 * this.taskDivs[prevIndex].offsetHeight;
	                this.taskDivs[this.activeTaskIndex].style[`${vendorPrefix}TransitionDuration`] = sortReorderDuration + 'ms';
	                this.setTranslateY(this.taskDivs[this.activeTaskIndex], activeUp);

	                const prevDown = this.taskDivs[this.activeTaskIndex].offsetHeight;
	                this.taskDivs[prevIndex].style[`${vendorPrefix}TransitionDuration`] = sortReorderDuration + 'ms';
	                this.setTranslateY(this.taskDivs[prevIndex], prevDown);

	                const copyActiveTaskDivRef = this.taskDivs[this.activeTaskIndex];
	                this.taskDivs[this.activeTaskIndex] = this.taskDivs[prevIndex];
	                this.taskDivs[prevIndex] = copyActiveTaskDivRef;
	                this.activeTaskIndex = prevIndex;
	            } else if ((nextIndex !== null) && ((cloneTop + this.clone.offsetHeight) > moveDownBoundary)) {
	                // move down
	                const activeDown = this.taskDivs[nextIndex].offsetHeight;
	                this.taskDivs[this.activeTaskIndex].style[`${vendorPrefix}TransitionDuration`] = sortReorderDuration + 'ms';
	                this.setTranslateY(this.taskDivs[this.activeTaskIndex], activeDown);

	                const nextUp = -1 * this.taskDivs[this.activeTaskIndex].offsetHeight;
	                this.taskDivs[nextIndex].style[`${vendorPrefix}TransitionDuration`] = sortReorderDuration + 'ms';
	                this.setTranslateY(this.taskDivs[nextIndex], nextUp);

	                const copyActiveTaskDivRef = this.taskDivs[this.activeTaskIndex];
	                this.taskDivs[this.activeTaskIndex] = this.taskDivs[nextIndex];
	                this.taskDivs[nextIndex] = copyActiveTaskDivRef;
	                this.activeTaskIndex = nextIndex;
	            }
	        }
	    }
	    doScroll(scrollChange) {
	        let shouldScroll = this.moveClone(scrollChange);
	        if (shouldScroll) {
	            this.getScrollCont().scrollTop = this.getScrollCont().scrollTop + scrollChange;
	            this.animateTasks();
	        } else {
	            if (this.scrollInterval) {
	                clearInterval(this.scrollInterval);
	                this.scrollInterval = null;
	            }
	            this.scrollPaddingTimer = setTimeout(() => {
	                this.doScrollPadding(scrollChange, 0, this.clone.offsetHeight);
	            }, 5);
	        }
	    }
	    doScrollPadding(scrollChange, totalPadding, maxPadding) {
	        let scrollAmount = scrollChange;
	        if (Math.abs(scrollChange) + totalPadding > maxPadding) {
	            scrollAmount = maxPadding - totalPadding;
	            if (scrollChange < 0) {
	                scrollAmount = -1 * scrollAmount;
	            }
	        }
	        this.getScrollCont().scrollTop = this.getScrollCont().scrollTop + scrollAmount;
	        const newTotalPadding = totalPadding + Math.abs(scrollAmount);
	        if (maxPadding - newTotalPadding > 0) {
	            this.scrollPaddingTimer = setTimeout(() => {
	                this.doScrollPadding(scrollChange, newTotalPadding, maxPadding);
	            }, 5);
	        }
	    }
	    setTranslateY(elem, transAmount) {
	        let currentTransAmount = this.getTranslateYNum(elem);
	        let newTransAmount = 0;
	        if (currentTransAmount != 0) {
	            newTransAmount = currentTransAmount + transAmount;
	        } else {
	            newTransAmount = transAmount;
	        }
	        if (newTransAmount != 0) {
	            elem.style[`${vendorPrefix}Transform`] = 'translateY('+ newTransAmount + 'px)';
	        } else {
	            elem.style[`${vendorPrefix}Transform`] = '';
	        }
	    }
	    getTranslateYNum(elem) {
	        let currentTransAmount = 0;
	        if ((elem.style) && (elem.style[`${vendorPrefix}Transform`])) {
	            let index = elem.style[`${vendorPrefix}Transform`].indexOf('px');
	            if (index >  -1) {
	                currentTransAmount = parseInt(elem.style[`${vendorPrefix}Transform`].substring(11, index));
	            }
	        }
	        return currentTransAmount;
	    }
	    getOrigTop(elem) {
	        let origTop = 0;
	        if ((elem.style) && (elem.style.top)) {
	            let index = elem.style.top.indexOf('px');
	            if (index > -1) {
	                origTop = parseInt(elem.style.top.substring(0, index));
	            }            
	        }
	        return origTop;
	    }
	    handleTouchEnd(e) {
	        this.handleMouseUp(e);
	    }
	    handleMouseUp(e) {
	        if (this.sortDelayTimer) {
	            clearTimeout(this.sortDelayTimer);
	            this.sortDelayTimer = null;
	        }
	        this.props.eventsTarget().removeEventListener('mousemove', this.handleMouseMove);
	        this.props.eventsTarget().removeEventListener('mouseup', this.handleMouseUp);
	        this.props.eventsTarget().removeEventListener('touchmove', this.handleTouchMove);
	        this.props.eventsTarget().removeEventListener('touchend', this.handleTouchEnd);

	        if (this.moveType) {
	            if (this.moveType == 'DELETE') {
	                if (this.clone) {
	                	const cloneX = -1 * this.clone.offsetLeft;

	                	if (this.props.deleteConfirm) {
					    	if (this.cloneIsAtDeleteConfirmThreshold) {
					    		this.cloneIsAtDeleteConfirmThreshold = false;
						    	if (this.props.onDeleteConfirmStart) {
						    		this.props.onDeleteConfirmStart();
						    	}
								document.addEventListener('mousedown', this.handleDocClick);
					    	} else {
					    		this.autoSlideRight();
					    	}
	                	} else {
		                    let deleteSwipeEndPercent = 0.5;
		                    if (this.props.deleteSwipeEndPercent) {
		                        deleteSwipeEndPercent = this.props.deleteSwipeEndPercent;
		                    }
		                    const deleteSwipeEndThreshold = this.taskDivs[this.activeTaskIndex].offsetWidth * deleteSwipeEndPercent;
		                    
		                    if (cloneX > deleteSwipeEndThreshold) {
		                        this.autoSlideLeft();
		                    } else {
		                        this.autoSlideRight();
		                    }
	                	}
	                }
	            } else if (this.moveType == 'SORT') {
	                if (this.scrollInterval) {
	                    clearInterval(this.scrollInterval);
	                    this.scrollInterval = null;
	                }

	                let activeTaskTop = getDeltaWithParent(this.taskDivs[this.activeTaskIndex], this.getItemsCont(), 0) + this.getTranslateYNum(this.taskDivs[this.activeTaskIndex]);

	                let cloneTop = this.getOrigTop(this.clone) + this.getTranslateYNum(this.clone);
	                let sortEndDockDuration = 200;
	                if (this.props.sortEndDockDuration) {
	                    sortEndDockDuration = this.props.sortEndDockDuration;
	                }
	                this.clone.style[`${vendorPrefix}TransitionDuration`] = sortEndDockDuration + 'ms';
	                this.moveClone(activeTaskTop - cloneTop);

	                this.sortEndTimer = setTimeout(() => {
	                    this.sortEnd();
	                }, sortEndDockDuration);
	            }
	        }
	    }
	    sortEnd() {
	        this.taskDivs[this.activeTaskIndex].style.visibility = 'visible';
	        this.taskDivs[this.activeTaskIndex].style.opacity = '1';

	        this.destroyRedAndClone();

	        for (let i = 0; i < this.taskDivs.length; i++) {
	            this.taskDivs[i].style[`${vendorPrefix}TransitionDuration`] = '';
	            this.taskDivs[i].style[`${vendorPrefix}Transform`] = '';
	        }
	        if (this.props.onSortEnd) {
	            this.props.onSortEnd(this.origTaskIndex, this.activeTaskIndex);
	        }

	        this.origTaskIndex = null;
	        this.activeTaskIndex = null;
	        this.moveType = null;
	        this.startPageX = null;
	        this.startPageY = null;
	        this.lastPageX = null;
	        this.lastPageY = null;
	        this.sortEndTimer = null;
	    }
	    getItemsCont() {
	        let itemsCont = this.props.itemsCont();
	        if (!itemsCont) {
				try {
					itemsCont = findDOMNode(this);
				} catch(error) {
				}
	        }
	        if (!itemsCont) {
	            throw "Items container not found";
	        }
	        return itemsCont;
	    }
	    getScrollCont() {
	        let scrollCont = this.props.scrollCont();
	        if (!scrollCont) {
	            scrollCont = this.getItemsCont();
	        }
	        if (!scrollCont) {
	            throw "Scroll container not found";
	        }
	        return scrollCont;
	    }
	    createRed() {
	        const newDiv = document.createElement('div');
	        this.redDiv = this.getItemsCont().appendChild(newDiv);
	        if (this.props.deleteBgdClassName) {
	        	this.redDiv.className = this.props.deleteBgdClassName;
	        }
	        if ((this.props.deleteConfirm) && (this.props.deleteConfirmBgdClassName)) {
	        	if (this.redDiv.className) {
	        		this.redDiv.className = this.redDiv.className + ' ' + this.props.deleteConfirmBgdClassName;
	        	} else {
					this.redDiv.className = this.props.deleteConfirmBgdClassName;
	        	}
	        }
	        this.redDiv.style.position = 'absolute';
	        this.redDiv.style.top = this.taskDivs[this.activeTaskIndex].offsetTop + 'px';
	        this.redDiv.style.left = '0px';
	        this.redDiv.style.height = (this.taskDivs[this.activeTaskIndex].offsetHeight - 1) + 'px';
	        this.redDiv.style.width = '100%';
	        let deleteBgdHeightTransition = 'height 100ms ease-in 100ms';
	        if (this.props.deleteBgdHeightTransition) {
	            deleteBgdHeightTransition = this.props.deleteBgdHeightTransition;
	        }
	        this.redDiv.style.transition = deleteBgdHeightTransition;
	        let deleteBgdColor = '#FF3300';
	        if (this.props.deleteBgdColor) {
	            deleteBgdColor = this.props.deleteBgdColor;
	        }
	        this.redDiv.style.backgroundColor = deleteBgdColor;

	        if (this.props.deleteMsgChildren) {
	        	this.redDiv.appendChild(this.props.deleteMsgChildren);
	        }
	    }
	    createClone(left, top) {
	        const clonedNode = this.taskDivs[this.activeTaskIndex].cloneNode(true);
	        this.clone = this.getItemsCont().appendChild(clonedNode);
	        this.clone.style.position = 'absolute';
	        this.clone.style.left = left;
	        this.clone.style.top = top;
	        this.clone.style.width = '100%';
	    }
	    destroyRedAndClone() {
	        const itemsCont = this.getItemsCont();
	        if (itemsCont) {
	            if (this.redDiv) {
	                itemsCont.removeChild(this.redDiv);
	                this.redDiv = null;
	            }
	            if (this.clone) {
	                itemsCont.removeChild(this.clone);
	                this.clone = null;
	            }            
	            if (this.origItemsContOverflow) {
	                itemsCont.style.overflow = this.origItemsContOverflow;
	                this.origItemsContOverflow = null;
	            }
	        }
	    }
	    autoSlideLeft() {
            let deleteSlideOutDuration = 100;
            if (this.props.deleteSlideOutDuration) {
                deleteSlideOutDuration = this.props.deleteSlideOutDuration;
            }
            this.clone.style.transition = 'left ' + deleteSlideOutDuration + 'ms ease-in';
            setTimeout(() => this.doAutoSlideLeft(), 1);
	    }
	    doAutoSlideLeft() {
	        if (this.props.onDeleteEnd) {
	            this.props.onDeleteEnd(this.activeTaskIndex);
	        }
	        this.redDiv.style.height = 0;
	        this.clone.style.left = '-100%';
            let deleteSlideOutDuration = 100;
            if (this.props.deleteSlideOutDuration) {
                deleteSlideOutDuration = this.props.deleteSlideOutDuration;
            }
	        setTimeout(() => this.deleteCompleted(), deleteSlideOutDuration);	    	
	    }
	    autoSlideRight() {
	        let deleteSlideInDuration = 100;
            if (this.props.deleteSlideInDuration) {
                deleteSlideInDuration = this.props.deleteSlideInDuration;
            }
			this.clone.style.transition = 'left ' + deleteSlideInDuration + 'ms ease-in-out';
            setTimeout(() => this.doAutoSlideRight(deleteSlideInDuration), 1);
	    }
	    doAutoSlideRight(deleteSlideInDuration) {
			this.clone.style.left = '0px';
			setTimeout(() => this.destroyRedAndClone(), deleteSlideInDuration);
	    }
	    deleteCompleted() {
	        this.activeTaskIndex = null;
	        this.moveType = null;
	        this.destroyRedAndClone();
	    }
		render() {
			return (
				<WrappedComponent handleMouseDown={this.handleMouseDown} handleTouchStart={this.handleTouchStart} handleSort={this.handleSort} handleDeleteButton={this.handleDeleteButton} deleteItem={this.deleteItem} deleteAllItems={this.deleteAllItems} {...this.props} />
			);
		}
	}
}

const vendorPrefix = (function() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return ''; // server environment
        // fix for:
        //    https://bugzilla.mozilla.org/show_bug.cgi?id=548397
        //    window.getComputedStyle() returns null inside an iframe with display: none
        // in this case return an array with a fake mozilla style in it.
        const styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
        const pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];

        switch (pre) {
        case 'ms':
            return 'ms';
        default:
            return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
        }
    }
)();

function isTouchEvent(e) {
    if ((e.touches && e.touches.length) || (e.changedTouches && e.changedTouches.length)) {
        return true;
    } else {
        return false;
    }
}

function getPageX(e) {
    if (e.touches && e.touches.length) {
        return e.touches[0].pageX;
    } else if (e.changedTouches && e.changedTouches.length) {
        return e.changedTouches[0].pageX;
    } else {
        return e.pageX;
    }
}

function getPageY(e) {
    if (e.touches && e.touches.length) {
        return e.touches[0].pageY;
    } else if (e.changedTouches && e.changedTouches.length) {
        return e.changedTouches[0].pageY;
    } else {
        return e.pageY;
    }
}