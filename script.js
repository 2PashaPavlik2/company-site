let lastScroll = 0;
let clickEventDetected = false; // флаг, який позначає, чи був виявлений клік на елементах header
const defaultOffset = 200;
const header = document.querySelector('header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

function updateHeader() {
    if (!clickEventDetected) { // перевіряємо, чи не було виявлено кліку на елементах header
        if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
            // scroll down
            header.classList.add('hide');
        } else if (scrollPosition() < lastScroll && containHide()) {
            // scroll up
            header.classList.remove('hide');
        }
    }

    lastScroll = scrollPosition();
}

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}

// Викликати функцію оновлення header тільки при зміні позиції прокрутки
const debouncedUpdateHeader = debounce(updateHeader, 16);

window.addEventListener('scroll', debouncedUpdateHeader);

// Додаємо обробник подій для кліку на елементах header
const headerElements = header.querySelectorAll('a');
headerElements.forEach(element => {
    element.addEventListener('click', (event) => {
        clickEventDetected = true;
        event.preventDefault(); // запобігаємо типовій поведінці посилань
        const target = event.target.getAttribute('href');
        document.querySelector(target).scrollIntoView({
            behavior: 'auto' // встановлюємо behavior на 'auto', щоб тимчасово вимкнути плавну прокрутку
        });

        setTimeout(() => {
            clickEventDetected = false;
        }, 1000); // часовий інтервал, протягом якого заборонено зміну стилю header при скролі
    });
});


