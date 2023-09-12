/* let taskTouch = document.querySelectorAll('.task-touch');
let toDoTouch = document.querySelector('.todo-touch');
let inProgressTouch = document.querySelector('.in-progress-touch');
let feedbackTouch = document.querySelector('.feedback-touch');
let doneTouch = document.querySelector('.done-touch');
let toDoPos = toDoTouch.getBoundingClientRect();
let inProgressPos = inProgressTouch.getBoundingClientRect();
let feedbackPos = feedbackTouch.getBoundingClientRect();
let donePos = doneTouch.getBoundingClientRect();

taskTouch.forEach(addStart);

function addStart(element) {
    element.addEventListener('touchstart', e => {


        let startX = e.changedTouches[0].clientX;
        let startY = e.changedTouches[0].clientY;

        element.addEventListener('touchmove', ev =>{
            ev.preventDefault();

            let nextX = ev.changedTouches[0].clientX;
            let nextY = ev.changedTouches[0].clientY;

            element.style.left = nextX-startX+'px';
            element.style.top = nextY-startY+'px';
            element.style.zIndex = 10;
        });

        element.addEventListener('touchend', ev => {
            element.style.zIndex = 0;
            if (element.getBoundingClientRect().top > inProgressPos.top) {
                if (!inProgressTouch.contains(element)) {
                    inProgressTouch.appendChild(element);
                }
            } else if (element.getBoundingClientRect().top > feedbackPos.top) {
                if (!feedbackTouch.contains(element)) {
                    feedbackTouch.appendChild(element);
                }                
            } else if (element.getBoundingClientRect().top > donePos.top){
                if (!doneTouch.contains(element)) {
                    doneTouch.appendChild(element);
                }                
            } else if (element.getBoundingClientRect().top > toDoPos.bottom) {
                if (!toDoTouch.contains(element)) {
                    toDoTouch.appendChild(element);
                }                
            }            
            element.style.left = 0+'px';
            element.style.top = 0+'px';
        });

    });
}
 */


function enableTouchDragDrop() {
    let taskTouch = document.querySelectorAll('.task-touch');
    let toDoTouch = document.querySelector('.todo-touch');
    let inProgressTouch = document.querySelector('.in-progress-touch');
    let feedbackTouch = document.querySelector('.feedback-touch');
    let doneTouch = document.querySelector('.done-touch');
    let toDoPos = toDoTouch.getBoundingClientRect();
    let inProgressPos = inProgressTouch.getBoundingClientRect();
    let feedbackPos = feedbackTouch.getBoundingClientRect();
    let donePos = doneTouch.getBoundingClientRect();

    taskTouch.forEach(addStart);

    function addStart(element) {
        element.addEventListener('touchstart', e => {
            let startX = e.changedTouches[0].clientX;
            let startY = e.changedTouches[0].clientY;

            element.addEventListener('touchmove', ev =>{
                ev.preventDefault();

                let nextX = ev.changedTouches[0].clientX;
                let nextY = ev.changedTouches[0].clientY;

                element.style.left = nextX - startX + 'px';
                element.style.top = nextY - startY + 'px';
                element.style.zIndex = 10;
            });

            element.addEventListener('touchend', ev => {
                element.style.zIndex = 0;
                if (element.getBoundingClientRect().top > inProgressPos.top) {
                    if (!inProgressTouch.contains(element)) {
                        inProgressTouch.appendChild(element);
                    }
                } else if (element.getBoundingClientRect().top > feedbackPos.top) {
                    if (!feedbackTouch.contains(element)) {
                        feedbackTouch.appendChild(element);
                    }                
                } else if (element.getBoundingClientRect().top > donePos.top){
                    if (!doneTouch.contains(element)) {
                        doneTouch.appendChild(element);
                    }                
                } else if (element.getBoundingClientRect().top > toDoPos.bottom) {
                    if (!toDoTouch.contains(element)) {
                        toDoTouch.appendChild(element);
                    }                
                }            
                element.style.left = 0 + 'px';
                element.style.top = 0 + 'px';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', enableTouchDragDrop);