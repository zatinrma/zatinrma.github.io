function show_hide_static_menu() {
    var static_menu = document.getElementById("static_menu");
    var btn_static_menu = document.getElementById("btn_static_menu");
    if (static_menu.style.display === "none") {
        static_menu.style.display = "block";
        btn_static_menu.innerText = 'Hide Static Menu'
    } else {
        static_menu.style.display = "none";
        btn_static_menu.innerText = 'Show Static Menu'
    }
}

function show_hide_immediate_change_menu() {
    var immediate_menu_change = document.getElementById("immediate_menu_change");
    var btn_immediate_menu_change = document.getElementById("btn_immediate_menu_change");
    if (immediate_menu_change.style.display === "none") {
        immediate_menu_change.style.display = "block"
        btn_immediate_menu_change.innerText = "Hide 5 Seconds Menu"
    } else {
        immediate_menu_change.style.display = "none";
        btn_immediate_menu_change.innerText = "Show 5 Seconds Menu"
    }
}

function show_hide_immediate_fade_change_menu() {
    var immediate_fade_menu_change = document.getElementById("immediate_fade_menu_change");
    var btn_immediate_fade_menu_change = document.getElementById("btn_immediate_fade_menu_change");
    if (immediate_fade_menu_change.style.display === "none") {
        immediate_fade_menu_change.style.display = "block"
        btn_immediate_fade_menu_change.innerText = "Hide 5 Seconds Fade Menu"
    } else {
        immediate_fade_menu_change.style.display = "none";
        btn_immediate_fade_menu_change.innerText = "Show 5 Seconds Fade Menu"
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // 3# DYNAMIC WITH FADE EFFECT 
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 5000); // Change image every 5 Seconds
    }

    // 2# DYNAMIC WITH NO EFFECT
    let image_1 = document.getElementById('slide_img_1');
    let image_2 = document.getElementById('slide_img_2');
    let images = [
        './Image/P1.jpg',
        './Image/P2.jpg',
        './Image/P3.jpg',
        './Image/P4.jpg',
        './Image/P5.jpg',
        './Image/P6.jpg',
        './Image/P7.jpg',
        './Image/P8.jpg',
        './Image/P9.jpg',
        './Image/P10.jpg',
        './Image/P11.jpg',
    ]
    function random_interval() {
        let random_1 = Math.floor(Math.random() * 10);  // Java Script List has quantity 13 file starting in list from 0 - 12
        let random_2 = random_1
        console.log('11111111', random_1)
        if (random_1 == 10) {
            random_2 = random_1 + 1
        }
        else {
            random_2 = random_1 + 1
        }
        image_1.src = images[random_1];
        image_2.src = images[random_2];
    }
    setInterval(random_interval, 3000)
});

