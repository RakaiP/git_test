const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}


function addBookToLibrary(title, author, pages, read = false) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index > -1) {
        myLibrary.splice(index, 1);
    }
}

function findBookById(bookId) {
    return myLibrary.find(book => book.id === bookId);
}

function displayBooks() {
    const container = document.getElementById('library-container');
    container.innerHTML = '';
    
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('data-id', book.id);
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p class="status ${book.read ? 'read' : 'not-read'}">
                ${book.read ? '✓ Read' : '○ Not Read'}
            </p>
            <div class="book-card-buttons">
                <button class="toggle-read-btn" data-book-id="${book.id}">
                    Toggle Read
                </button>
                <button class="remove-btn" data-book-id="${book.id}">
                    Remove
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    // Add event listeners for toggle and remove buttons
    attachButtonListeners();
}

// Function to attach event listeners to dynamically created buttons
function attachButtonListeners() {
    document.querySelectorAll('.toggle-read-btn').forEach(button => {
        button.addEventListener('click', (e)=> {
            const bookId = e.target.getAttribute('data-book-id');
            const book = findBookById(bookId);
            if(book) {
                book.toggleRead(); //use the prototype method
                displayBooks(); //refresh display
            }
        });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e)=> {
            const bookId = e.target.getAttribute('data-book-id');
            removeBook(bookId);
            displayBooks(); //refresh display
        });
    });
}



// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    //Get dialog and buttons
    const dialog = document.getElementById('new-book-dialog');
    const newBookBtn = document.getElementById('new-book-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const bookForm = document.getElementById('book-form');

    //open dialog when "New Book" button clicked
    newBookBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    //close dialog when "Cancel" button clicked
    cancelBtn.addEventListener('click', () => {
        dialog.close();
    });
    
    
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault(); //prevent form from submitting normally

        //Get form values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = parseInt(document.getElementById('pages').value);
        const read = document.getElementById('read').checked;

        //addbook to library
        addBookToLibrary(title, author, pages, read);

        displayBooks(); //refresh display

        bookForm.reset(); //reset form
        dialog.close(); //close dialog
    });

        // Manually add some books to test
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
    addBookToLibrary('1984', 'George Orwell', 328, false);
    addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);

    // Display the books
    displayBooks();
});


