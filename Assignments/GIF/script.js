const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents page reload
    const searchTerm = searchInput.value;
    fetchGif(searchTerm);
});

function fetchGif(searchTerm) {
    const img = document.getElementById('gifImage');
    const loadingMessage = document.getElementById('loading-message');
    const apiKey = 'hUZ4sWDHAQUwzIXdt8xWOlyIFAtALwaj';
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

    // Show loading message, hide image
    loadingMessage.style.display = 'block';
    img.style.display = 'none';
    loadingMessage.textContent = 'Loading...';
    
    fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(function(response) {
        console.log('API Response:', response); // Debug log
        if (response.data && response.data.images) {
            img.src = response.data.images.original.url;
            img.alt = searchTerm;
            
            // Hide loading message, show image
            loadingMessage.style.display = 'none';
            img.style.display = 'block';
        } else {
            console.error('No GIF found for:', searchTerm);
            loadingMessage.textContent = 'No GIF found! Try another search term.';
        }
    })
    .catch(function(error) {
        console.error('Fetch error:', error);
        loadingMessage.textContent = 'Error loading GIF. Please try again later.';
    });
}


// Initial fetch to display a default gif
fetchGif('cats');

