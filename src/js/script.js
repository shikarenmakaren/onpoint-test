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

const slideWidth = allSlides[0].clientWidth;

const scroll = document.getElementById('scroll');
const scrollWrapper = document.getElementById('scroll-wrapper');

const descrContentHeight = document.querySelector('.descr__descr').scrollHeight; //высота контента внутри дескр 686px
const descrHeight = document.querySelector('.descr__descr').offsetHeight; //высота дескр
const content = document.querySelector('.descr__descr');

const velocityScroll = descrContentHeight / descrHeight;

const mainLink = document.getElementById('main-link');


let scr1, scr2 = 0; // scroll
let moveContent = 0; // scroll



document.addEventListener("DOMContentLoaded", startup);

function startup() {
    wrapper.addEventListener('touchstart', startTouch, false);
    wrapper.addEventListener('touchend', endTouch, false);
    wrapper.addEventListener('touchmove', moveTouch, false);

    promoBtn.addEventListener('touchstart', isolate(openModal), false);
    promoBtn.addEventListener('touchmove', isolate(() => {}), false);
    promoBtn.addEventListener('touchend', isolate(() => {}), false);

    modal.addEventListener('touchstart', isolate(() => {}), false);
    modal.addEventListener('touchmove', isolate(() => {}), false);
    modal.addEventListener('touchend', isolate(() => {}), false);

    modalCloseBtn.addEventListener('touchstart', closeModal, false);

    modalNext.addEventListener('touchstart', (event) => {
        let i = 0;

        event.preventDefault();
        i++;
        if (i == (allModalSlides.length - 1)) {
            allModalSlides[i-1].style.display = 'none';
            allModalSlides[i].style.display = 'block';

            allModalSlides[i].classList.add('fadeIn');

        } 

        nextDot.style.backgroundColor = '#fc6da9';
        nextDot.style.borderColor = '#fc6da9';

        prevDot.style.borderColor = '#000'
        prevDot.style.backgroundColor = '#fff';
        
    }, false);
    modalPrev.addEventListener('touchstart', (event) => {
        let j = 1;

        event.preventDefault();
        j--;
        if (j == 0) {
            allModalSlides[j+1].style.display = 'none';
            allModalSlides[j].style.display = 'block';

            allModalSlides[j].classList.add('fadeIn');
        } 
        nextDot.style.backgroundColor = '#fff';
        nextDot.style.borderColor = '#000';

        prevDot.style.borderColor = '#fc6da9';
        prevDot.style.backgroundColor = '#fc6da9';

    }, false);

    scroll.addEventListener('touchstart', isolate((event) => {
        scr1 = event.touches[0].clientY;
    }), false);
    scroll.addEventListener('touchmove', isolate((event) => {
        scr2 = scr1 - event.touches[0].clientY;
        scroll.style.top = `${scroll.offsetTop - scr2}px`;
        moveContent = scroll.offsetTop / velocityScroll;

        maxScroll = descrHeight - scroll.offsetHeight;

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

    homeBtn.addEventListener('touchstart', isolate((event) => {
        slideIndex = 0;
        transit(0);
    }), false);
    homeBtn.addEventListener('touchmove', isolate(() => {}), false);
    homeBtn.addEventListener('touchend', isolate(() => {}), false);

    mainLink.addEventListener('touchstart', isolate((event) => {
        slideIndex = 1;
        transit(WIDTH);
    }), false);
    mainLink.addEventListener('touchmove', isolate(() => {}), false);
    mainLink.addEventListener('touchend', isolate(() => {}), false);
  }

function isolate(func) {
    return function(event) {
        event.preventDefault();
        event.stopPropagation();

        return func.apply(event);
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
    transit(slideIndex*WIDTH + diff);
}

function endTouch(event) {
    let newIndex = startIndex + swipe(startPosX, lastPosX)
    if (!(newIndex < 0 || newIndex > (allSlides.length -1))) {
        slideIndex = newIndex;
    }
    transit(slideIndex*WIDTH);
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

function transit(newOffset) {
    slider.classList.add("transition");
    slider.style.left = `${-newOffset}px`;
}

function openModal(event) {
    promo.style.display = 'none';

    modal.style.display = 'block';
    modal.classList.add('fadeIn');
    modal.classList.remove('fadeOut');

    prevDot.style.borderColor = '#fc6da9';
    prevDot.style.backgroundColor = '#fc6da9';

    wrapper.addEventListener('touchstart', closeModal);
}

function closeModal() {
    modal.style.display = 'none',
    promo.style.display = 'block';

    modal.classList.add('fadeOut');
    modal.classList.remove('fadeIn'),

    modalSecond.style.display = 'none';
    modalFirst.style.display = 'block';
    nextDot.style.backgroundColor = '#fff';
    nextDot.style.borderColor = '#000';

    wrapper.removeEventListener('touchstart', closeModal);
}