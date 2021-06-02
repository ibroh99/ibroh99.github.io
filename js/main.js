/*------------------- about section tabs -------------------*/
(() => {
    const aboutSection = document.querySelector('.about-section'),
        tabsContainer = document.querySelector('.about-tabs');

    tabsContainer.addEventListener('click', (e) => {
        if (
            e.target.classList.contains('tab-item') &&
            !e.target.classList.contains('active')
        ) {
            const target = e.target.getAttribute('data-target');
            // console.log(target);
            tabsContainer
                .querySelector('.active')
                .classList.remove('outer-shadow', 'active');
            e.target.classList.add('active', 'outer-shadow');

            aboutSection
                .querySelector('.tab-content.active')
                .classList.remove('active');
            aboutSection.querySelector(target).classList.add('active');
        }
    });
})();

function bodyScrollingToggle() {
    document.body.classList.toggle('stop-scrolling');
}

/*------------------- portofolio filter and popup -------------------*/
(() => {
    const filterContainer = document.querySelector('.portofolio-filter'),
        portofolioItemsContainer = document.querySelector('.portofolio-items'),
        portofolioItems = document.querySelectorAll('.portofolio-item'),
        popup = document.querySelector('.portofolio-popup'),
        prevBtn = popup.querySelector('.pp-prev'),
        nextBtn = popup.querySelector('.pp-next'),
        closeBtn = popup.querySelector('.pp-close'),
        projectDetailsContainer = popup.querySelector('.pp-details'),
        projectDetailsBtn = popup.querySelector('.pp-project-details-btn');
    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener('click', (e) => {
        if (
            e.target.classList.contains('filter-item') &&
            !e.target.classList.contains('active')
        ) {
            filterContainer
                .querySelector('.active')
                .classList.remove('outer-shadow', 'active');
            e.target.classList.add('active', 'outer-shadow');
            const target = e.target.getAttribute('data-target');
            portofolioItems.forEach((item) => {
                if (
                    target === item.getAttribute('data-category') ||
                    target === 'all'
                ) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        }
    });

    portofolioItemsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.portofolio-item-inner')) {
            const portofolioItem = e.target.closest(
                '.portofolio-item-inner'
            ).parentElement;

            itemIndex = Array.from(
                portofolioItem.parentElement.children
            ).indexOf(portofolioItem);
            screenshots = portofolioItems[itemIndex]
                .querySelector('.portofolio-item-img img')
                .getAttribute('data-screenshots');
            screenshots = screenshots.split(',');
            if (screenshots.length === 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    });

    closeBtn.addEventListener('click', () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains('active')) {
            popupDetailsToggle();
        }
    });

    function popupToggle() {
        popup.classList.toggle('open');
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector('.pp-image');
        popup.querySelector('.pp-loader').classList.add('active');
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            popup.querySelector('.pp-loader').classList.remove('active');
        };
        popup.querySelector('.pp-counter').innerHTML =
            slideIndex + 1 + ' of ' + screenshots.length;
    }

    nextBtn.addEventListener('click', () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
    });
    prevBtn.addEventListener('click', () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
    });

    projectDetailsBtn.addEventListener('click', () => {
        popupDetailsToggle();
    });

    function popupDetails() {
        const details = portofolioItems[itemIndex].querySelector(
            '.portofolio-item-details'
        ).innerHTML;
        popup.querySelector('.pp-project-details').innerHTML = details;
        const title = portofolioItems[itemIndex].querySelector(
            '.portofolio-item-title'
        ).innerHTML;
        popup.querySelector('.pp-title h2').innerHTML = title;
        const category =
            portofolioItems[itemIndex].getAttribute('data-category');
        popup.querySelector('.pp-title p span').innerHTML =
            category.split('-')[0] + ' Application';
    }

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains('active')) {
            projectDetailsBtn.querySelector('i').classList.add('fa-plus');
            projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = 0 + 'px';
        } else {
            projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
            projectDetailsBtn.querySelector('i').classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight =
                projectDetailsContainer.scrollHeight + 'px';
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }
})();
