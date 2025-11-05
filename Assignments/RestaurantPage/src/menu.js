function createMenuPage() {
    const content= document.getElementById('content');

    content.innerHTML = '';
    
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-page');

    const headline = document.createElement('h1');
    headline.textContent = 'Our Menu';
    menuContainer.appendChild(headline);

   
    const menuItems = [
        {
            category: 'Appetizers',
            items: [
                { name: 'Caesar Salad', price: '$12', description: 'Fresh romaine, parmesan, croutons' },
                { name: 'French Onion Soup', price: '$10', description: 'Caramelized onions, gruyere cheese' },
                { name: 'Bruschetta', price: '$14', description: 'Toasted bread, tomatoes, basil' }
            ]
        },
        {
            category: 'Main Courses',
            items: [
                { name: 'Filet Mignon', price: '$45', description: '8oz prime beef, garlic mashed potatoes' },
                { name: 'Grilled Salmon', price: '$32', description: 'Atlantic salmon, seasonal vegetables' },
                { name: 'Chicken Parmesan', price: '$28', description: 'Breaded chicken, marinara, mozzarella' },
                { name: 'Vegetarian Pasta', price: '$24', description: 'Fresh vegetables, garlic cream sauce' }
            ]
        },
        {
            category: 'Desserts',
            items: [
                { name: 'Chocolate Lava Cake', price: '$12', description: 'Warm chocolate cake, vanilla ice cream' },
                { name: 'Tiramisu', price: '$10', description: 'Classic Italian dessert' },
                { name: 'Crème Brûlée', price: '$11', description: 'Vanilla custard, caramelized sugar' }
            ]
        }
    ];


    menuItems.forEach(section => {
        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = section.category;
        categoryHeading.classList.add('menu-category');
        menuContainer.appendChild(categoryHeading);

        const itemsContainer = document.createElement('div');
        itemsContainer.classList.add('menu-items');

        section.items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            

            const itemHeader = document.createElement('div');
            itemHeader.classList.add('item-header');

            const itemName = document.createElement('span');
            itemName.classList.add('item-name');
            itemName.textContent = item.name;

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('item-price');
            itemPrice.textContent = item.price;

            itemHeader.appendChild(itemName);
            itemHeader.appendChild(itemPrice);
        
            const itemDescription = document.createElement('p');
            itemDescription.classList.add('item-description');
            itemDescription.textContent = item.description;

            menuItem.appendChild(itemHeader);
            menuItem.appendChild(itemDescription);
            itemsContainer.appendChild(menuItem);
        });

        menuContainer.appendChild(itemsContainer);
    });
    
    content.appendChild(menuContainer);

}

export { createMenuPage };
