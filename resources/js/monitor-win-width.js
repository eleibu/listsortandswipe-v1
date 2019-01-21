export var monitorWinWidth = (function () {
    var event_changeWidthClass = new Event('changeWidthClass');

    var winWidthChange = function() {
        var width = window.innerWidth;
        if (width > 1330) {
            setWidthClass('xl');
        } else if (width > 1130) {
            setWidthClass('lg');
        } else if (width > 760) {
            setWidthClass('md');
        } else if (width > 540) {
            setWidthClass('sm');
        } else {
            setWidthClass('xs');
        }
    };

    var setWidthClass = function(classtxt) {
        var divtarget = document.getElementById("pageWrapper");
        if (divtarget && (divtarget.className != classtxt)) {
            divtarget.className = classtxt;
            window.dispatchEvent(event_changeWidthClass);
        }
    };

    winWidthChange();
    window.addEventListener("resize", function() { winWidthChange() });
})();