import {greeting} from "./greeting.js";
import "./styles.css";
import { createHomePage } from "./home.js";
import { createMenuPage } from "./menu.js";
import { createAboutPage } from "./about.js";

console.log(greeting);


document.addEventListener('DOMContentLoaded', () => {



    const homeBtn = document.querySelector('.home-btn');
    const menuBtn = document.querySelector('.menu-btn');
    const aboutBtn = document.querySelector('.about-btn');
        

    createHomePage();
    setActiveButton(menuBtn);

    homeBtn.addEventListener('click', () => {
        setActiveButton(homeBtn);
        createHomePage();
    });

    menuBtn.addEventListener('click', () => {
        setActiveButton(menuBtn);
        createMenuPage();
    });

    aboutBtn.addEventListener('click', () => {
        setActiveButton(aboutBtn);
        createAboutPage();
    }); 



});


function setActiveButton(activeBtn) {
    const allBtns = document.querySelectorAll('nav button');
    allBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}


