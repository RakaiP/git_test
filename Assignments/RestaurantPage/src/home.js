function createHomePage() {

    const content = document.getElementById('content');


    content.innerHTML = '';


    const homeContainer = document.createElement('div');
    homeContainer.classList.add('home-page');


    const headline = document.createElement('h1');
    headline.textContent = 'Welcome to Our Restaurant';
    homeContainer.appendChild(headline);


    const description = document.createElement('p');
    description.textContent = 'Experience the finest dining with us. Enjoy our exquisite menu and cozy atmosphere.';
    homeContainer.appendChild(description);    



    content.appendChild(homeContainer);
    
}

    
export {createHomePage};