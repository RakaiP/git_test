function createAboutPage() {

    const content = document.getElementById('content');


    content.innerHTML = ''; 

    const aboutContainer = document.createElement('div');
    aboutContainer.classList.add('about-page');

    const headline = document.createElement('h1');
    headline.textContent = 'About Us';
    aboutContainer.appendChild(headline);

    const description = document.createElement('p');
    description.textContent = 'Our restaurant has been serving delicious meals since 1990. We pride ourselves on using fresh ingredients and providing excellent service.';
    aboutContainer.appendChild(description);

    content.appendChild(aboutContainer);
}

export {createAboutPage};