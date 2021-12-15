var container = $(".page-container")
var viewHeight = document.documentElement.clientHeight
var viewWidth = document.documentElement.clientWidth

console.log("viewheight", viewHeight)

var pageNum = document.querySelectorAll('.page-item').length
var currentPosition = 0
container.css("height", viewHeight)

var line = $("#line")
line.css("width", viewWidth)
// var subscrib = $("#subscrib")
// subscrib.css("width", viewWidth)

function goDown () {
    console.log("1", currentPosition);
    console.log("2", viewHeight);
    console.log("3", -viewHeight * (pageNum - 1));
    if (currentPosition == -viewHeight * (pageNum - 1)) {
        console.log("_____");
        currentPosition = currentPosition - 150
        container.css("top", currentPosition)
        return
    }
    if (currentPosition > - viewHeight * (pageNum - 1)) {
        currentPosition = currentPosition - viewHeight
        container.css("top", currentPosition)
    }
}

function goUp () {
    if (currentPosition < 0) {
        currentPosition = currentPosition + viewHeight
        if (currentPosition > 0) {
            currentPosition = 0
        }
        container.css("top", currentPosition)
    }
}

function throttle (fn, delay) {
    let baseTime = 0
    return function () {
        const currentTime = Date.now()
        if (baseTime + delay < currentTime) {
            fn.apply(this, arguments)
            baseTime = currentTime
        }
    }
}

var handlerWheel = throttle(scrollMove, 1000)
if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
    document.addEventListener('mousewheel', handlerWheel)
} else {
    document.addEventListener('DOMMouseScroll', handlerWheel)
}
function scrollMove (e) {
    if (e.deltaY > 0) {
        goDown()
    } else {
        goUp()
    }
}

// mobile
var touchStartY = 0
document.addEventListener('touchstart', event => {
    touchStartY = event.touches[0].pageY
})
var handleTouchEnd = throttle(touchEnd, 500)
document.addEventListener('touchend', handleTouchEnd)
function touchEnd (e) {
    var touchEndY = e.changedTouches[0].pageY
    if (touchEndY - touchStartY < 0) {
        goDown()
    } else {
        goUp()
    }
}

//click events

