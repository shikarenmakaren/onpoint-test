const wrapper = document.getElementById("wrapper");
const slider = document.querySelector(".slides");
const allSlides = document.querySelectorAll(".slide");

const promoBtn = document.getElementById('promo-btn');
const modalCloseBtn = document.getElementById('modal-close');

const promo = document.getElementById('promo');
const modal = document.getElementById('modal');

const modalFirst = document.querySelector('.modal__first');
const modalSecond = document.querySelector('.modal__second');

const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

const prevDot = document.getElementById('prev-dot');
const nextDot = document.getElementById('next-dot');

const allModalSlides = document.querySelectorAll('.modal-slide');

const homeBtn = document.getElementById('home-btn');

const scroll = document.getElementById('scroll');

const descrContentHeight = document.querySelector('.descr__descr').scrollHeight;
const descrHeight = document.querySelector('.descr__descr').offsetHeight;
const content = document.querySelector('.descr__descr');

const velocityScroll = descrContentHeight / descrHeight;

const mainLink = document.getElementById('main-link');


const promoBottle = document.getElementById('promo-bottle');
const spermAnim = document.getElementById('slide-2_animation');


let scr1, scr2 = 0;
let moveContent = 0;


document.addEventListener("DOMContentLoaded", startup);

function startup() {
    wrapper.addEventListener('touchstart', startTouch, false);
    wrapper.addEventListener('touchend', endTouch, false);
    wrapper.addEventListener('touchmove', moveTouch, false);

    promoBtn.addEventListener('touchstart', isolate(openModal), false);
    promoBtn.addEventListener('touchmove', isolate(() => {
    }), false);
    promoBtn.addEventListener('touchend', isolate(() => {
    }), false);

    modal.addEventListener('touchstart', isolate(() => {
    }), false);
    modal.addEventListener('touchmove', isolate(() => {
    }), false);
    modal.addEventListener('touchend', isolate(() => {
    }), false);

    modalCloseBtn.addEventListener('touchstart', isolate(closeModal), false);

    modalNext.addEventListener('touchstart', isolate(() => {
        allModalSlides[0].style.display = 'none';
        allModalSlides[1].style.display = 'block';

        nextDot.style.backgroundColor = '#fc6da9';
        nextDot.style.borderColor = '#fc6da9';

        prevDot.style.borderColor = '#000'
        prevDot.style.backgroundColor = '#fff';

    }), false);


    modalPrev.addEventListener('touchstart', isolate(() => {
        allModalSlides[1].style.display = 'none';
        allModalSlides[0].style.display = 'block';

        nextDot.style.backgroundColor = '#fff';
        nextDot.style.borderColor = '#000';

        prevDot.style.borderColor = '#fc6da9';
        prevDot.style.backgroundColor = '#fc6da9';
    }), false);


    scroll.addEventListener('touchstart', isolate((event) => {
        scr1 = event.touches[0].clientY;
    }), false);

    scroll.addEventListener('touchmove', isolate((event) => {
        scr2 = scr1 - event.touches[0].clientY;
        scroll.style.top = `${scroll.offsetTop - scr2}px`;
        moveContent = scroll.offsetTop / velocityScroll;

        let maxScroll = descrHeight - scroll.offsetHeight;

        if (scroll.offsetTop < 0) {
            scroll.style.top = '0px';
        }

        if ((scroll.offsetHeight + scroll.offsetTop) >= descrHeight) {
            scroll.style.top = `${maxScroll}px`;
        }

        content.scrollTo(0, moveContent);
        scr1 = event.touches[0].clientY;

    }), false);

    scroll.addEventListener('touchend', isolate(() => {}), false);

    homeBtn.addEventListener('touchstart', isolate(() => {
        slideIndex = 0;
        transit(slideIndex);
    }), false);
    homeBtn.addEventListener('touchmove', isolate(() => {
    }), false);
    homeBtn.addEventListener('touchend', isolate(() => {
    }), false);

    mainLink.addEventListener('touchstart', isolate(() => {
        slideIndex = 1;
        transit(slideIndex);
    }), false);
    mainLink.addEventListener('touchmove', isolate(() => {
    }), false);
    mainLink.addEventListener('touchend', isolate(() => {
    }), false);
}

function isolate(func) {
    return function(event) {
        event.preventDefault();
        let ret = func.call(this, event);
        event.stopPropagation(); 
        return ret;
    };
}

const WIDTH = wrapper.clientWidth;

let startIndex;
let slideIndex = 0;
let lastPosX;
let startPosX;

function startTouch(event) {
    event.preventDefault();

    startIndex = slideIndex;
    startPosX = event.touches[0].clientX;
    lastPosX = startPosX;
}

function moveTouch(event) {
    lastPosX = event.touches[0].clientX;
    let diff = startPosX - lastPosX;
    transit(slideIndex, diff);
}

function endTouch() {
    let newIndex = startIndex + swipe(startPosX, lastPosX)
    if (!(newIndex < 0 || newIndex > (allSlides.length - 1))) {
        slideIndex = newIndex;
    }
    transit(slideIndex);
}

const TRESHOLD_X = 200;

function swipe(startX, endX) {
    let diff = endX - startX;

    if (diff < -TRESHOLD_X) {
        return 1
    }

    if (diff > TRESHOLD_X) {
        return -1
    }

    return 0
}

function transit(idx, diff=0) {
    slider.classList.add("transition");
    let trans = idx*WIDTH + diff
    console.log(trans)
    if (!(trans<0 || trans>WIDTH*(allModalSlides.length))){
        slider.style.left = `${-trans}px`;
    } 

    // sperm animation
    if (idx === 1) {
        document.querySelector('.slide-background').classList.add('sperm-animation');
    }
    if (idx === 0) {
        document.querySelector('.slide-background').classList.remove('sperm-animation');
    }
}

function openModal() {
    promo.style.display = 'none';

    modal.style.display = 'block';
    modal.classList.add('fadeIn');
    modal.classList.remove('fadeOut');

    prevDot.style.borderColor = '#fc6da9';
    prevDot.style.backgroundColor = '#fc6da9';

    wrapper.addEventListener('touchstart', closeModal);
}

function closeModal() {
    modal.style.display = 'none';
    promo.style.display = 'block';

    modal.classList.add('fadeOut');
    modal.classList.remove('fadeIn');

    modalSecond.style.display = 'none';
    modalFirst.style.display = 'block';
    nextDot.style.backgroundColor = '#fff';
    nextDot.style.borderColor = '#000';

    wrapper.removeEventListener('touchstart', closeModal);
}