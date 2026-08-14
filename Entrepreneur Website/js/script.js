/* =========================================================
ENTREPRENEUR INSIGHT
MAIN JAVASCRIPT
Works on ALL website pages
========================================================= */

/* =========================================================
WAIT FOR HTML
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const menuIcon = document.querySelector(".menu-btn i");


if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");


        if (menuIcon) {

            if (nav.classList.contains("active")) {

                menuIcon.classList.remove("fa-bars");

                menuIcon.classList.add("fa-xmark");

            } else {

                menuIcon.classList.remove("fa-xmark");

                menuIcon.classList.add("fa-bars");

            }

        }

    });

}


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

const navLinks =
    document.querySelectorAll("nav ul li a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (nav) {

            nav.classList.remove("active");

        }


        if (menuIcon) {

            menuIcon.classList.remove("fa-xmark");

            menuIcon.classList.add("fa-bars");

        }

    });

});


/* =====================================================
   STICKY HEADER
===================================================== */

const header =
    document.querySelector("header");


if (header) {

    const updateHeader = () => {

        if (window.scrollY > 50) {

            header.style.background = "#ffffff";

            header.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.15)";

        } else {

            header.style.background =
                "rgba(255,255,255,.95)";

            header.style.boxShadow =
                "0 5px 25px rgba(0,0,0,.08)";

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();

}


/* =====================================================
   HERO BUTTON
===================================================== */

const heroBtn =
    document.querySelector(".hero-btn");


if (heroBtn) {

    heroBtn.addEventListener("click", (event) => {

        const featured =
            document.querySelector(".featured");


        if (featured) {

            event.preventDefault();

            featured.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealItems =
    document.querySelectorAll(
        ".hero-content, .featured, .reveal"
    );


if (
    revealItems.length > 0 &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


    revealItems.forEach(item => {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(50px)";

        item.style.transition =
            "all 0.8s ease";

        revealObserver.observe(item);

    });

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");


if (sections.length > 0) {

    window.addEventListener("scroll", () => {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href &&
                current &&
                href === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    });

}


/* =====================================================
   BACK TO TOP
===================================================== */

let topBtn =
    document.querySelector(".top-btn");


if (!topBtn) {

    topBtn =
        document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.className = "top-btn";

    topBtn.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(topBtn);

}


if (topBtn) {

    topBtn.style.display = "none";


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.style.display = "flex";

        } else {

            topBtn.style.display = "none";

        }

    });


    topBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   COUNTER
===================================================== */

const counters =
    document.querySelectorAll(".counter");

const statSection =
    document.querySelector(".stats");


if (
    counters.length > 0 &&
    statSection &&
    "IntersectionObserver" in window
) {

    let counterStarted = false;


    const startCounter = () => {

        if (counterStarted) return;

        counterStarted = true;


        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            if (isNaN(target)) return;


            let count = 0;

            const duration = 2000;

            const intervalTime = 20;

            const increment =
                target /
                (duration / intervalTime);


            const updateCounter = () => {

                count += increment;


                if (count < target) {

                    counter.innerText =
                        Math.ceil(count);

                    setTimeout(
                        updateCounter,
                        intervalTime
                    );

                } else {

                    counter.innerText =
                        target.toLocaleString() + "+";

                }

            };


            updateCounter();

        });

    };


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        startCounter();

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.3
            }
        );


    counterObserver.observe(statSection);

}


/* =====================================================
   MAGAZINE COVERFLOW SLIDER
===================================================== */

const cards =
    document.querySelectorAll(".mag-card");

const prevBtn =
    document.querySelector(
        ".slider-btn.prev"
    );

const nextBtn =
    document.querySelector(
        ".slider-btn.next"
    );

const sliderSection =
    document.querySelector(
        ".slider-section"
    );


let current = 0;

let autoSlide = null;


/* -----------------------------------------------------
   UPDATE SLIDER
----------------------------------------------------- */

function updateSlider() {

    if (cards.length === 0) return;


    cards.forEach(card => {

        card.className = "mag-card";

    });


    if (!cards[current]) return;


    cards[current].classList.add(
        "active"
    );


    if (cards.length > 1) {

        const prev =
            (current - 1 + cards.length) %
            cards.length;


        const next =
            (current + 1) %
            cards.length;


        cards[prev].classList.add(
            "prev"
        );


        cards[next].classList.add(
            "next"
        );


        cards.forEach((card, index) => {

            if (
                index !== current &&
                index !== prev &&
                index !== next
            ) {

                if (index < current) {

                    card.classList.add(
                        "hide-left"
                    );

                } else {

                    card.classList.add(
                        "hide-right"
                    );

                }

            }

        });

    }

}


/* -----------------------------------------------------
   NEXT SLIDE
----------------------------------------------------- */

function nextSlide() {

    if (cards.length <= 1) return;


    current++;


    if (current >= cards.length) {

        current = 0;

    }


    updateSlider();

}


/* -----------------------------------------------------
   PREVIOUS SLIDE
----------------------------------------------------- */

function previousSlide() {

    if (cards.length <= 1) return;


    current--;


    if (current < 0) {

        current =
            cards.length - 1;

    }


    updateSlider();

}


/* -----------------------------------------------------
   NEXT BUTTON
----------------------------------------------------- */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        nextSlide
    );

}


/* -----------------------------------------------------
   PREVIOUS BUTTON
----------------------------------------------------- */

if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        previousSlide
    );

}


/* -----------------------------------------------------
   AUTO SLIDE
----------------------------------------------------- */

function startAutoSlide() {

    if (cards.length <= 1) return;


    if (autoSlide) {

        clearInterval(autoSlide);

    }


    autoSlide =
        setInterval(
            nextSlide,
            4000
        );

}


function stopAutoSlide() {

    if (autoSlide) {

        clearInterval(autoSlide);

        autoSlide = null;

    }

}


if (cards.length > 0) {

    updateSlider();

    startAutoSlide();

}


/* -----------------------------------------------------
   STOP SLIDER ON HOVER
----------------------------------------------------- */

if (sliderSection) {

    sliderSection.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    sliderSection.addEventListener(
        "mouseleave",
        startAutoSlide
    );

}


/* =====================================================
   READ MORE BUTTONS
===================================================== */

const readMoreButtons =
    document.querySelectorAll(
        ".read-more, .read-more-btn"
    );


readMoreButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            const href =
                button.getAttribute(
                    "href"
                );


            if (
                !href ||
                href === "#"
            ) {

                event.preventDefault();

                window.location.href =
                    "article-details.html";

            }

        }
    );

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.querySelector(
        "#contactForm"
    );


const formMessage =
    document.querySelector(
        "#formMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (formMessage) {

                formMessage.innerText =
                    "Thank you! Your message has been received.";

                formMessage.style.color =
                    "#198754";

            }


            contactForm.reset();

        }
    );

}


/* =====================================================
   NEWSLETTER FORM
===================================================== */

const newsletterForms =
    document.querySelectorAll(
        ".newsletter-form"
    );


newsletterForms.forEach(form => {

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                form.querySelector(
                    "input[type='email']"
                );


            if (
                input &&
                input.value.trim() !== ""
            ) {

                alert(
                    "Thank you for subscribing to Entrepreneur Insight!"
                );

                form.reset();

            }

        }
    );

});


/* =====================================================
   VIDEO
===================================================== */

const videos =
    document.querySelectorAll(
        "video"
    );


videos.forEach(video => {

    video.addEventListener(
        "contextmenu",
        event => {

            event.preventDefault();

        }
    );

});


/* =====================================================
   CURRENT PAGE NAVIGATION
===================================================== */

const currentPage =
    window.location.pathname
        .split("/")
        .pop();


if (currentPage) {

    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            href &&
            href !== "#" &&
            href === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/* =====================================================
   CONSOLE CHECK
===================================================== */

console.log(
    "Entrepreneur Insight website loaded successfully."
);


});
