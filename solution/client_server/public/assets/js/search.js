/**
 * Initializes the quick search functionality.
 * Adds event listeners to the search input and the quick search overlay.
 * Also adds an event listener to close the overlay when clicking outside the search box or the results.
 */
function initSearch() {
    const searchBar = document.getElementById('searchbar');

    searchBar.addEventListener('click', openQuickSearch);
    searchBar.addEventListener('input', handleQuickSearchInput);

    document.getElementById('searchButton').addEventListener('click', function() {
        const searchText = document.getElementById('searchbar').value;
        matchesSearch(searchText);
    });
}

/**
 * Opens the search overlay and adds the event listener needed to close the overlay.
 */
function openQuickSearch() {
    const resultsDiv = document.querySelector('.results');

    setTimeout(() => {
        document.addEventListener('click', closeSearchEvent, true);
    }, 100);
}

/**
 * Handles the input event of the quick search input.
 * @param event The input event.
 */
function handleQuickSearchInput(event) {
    const searchText = event.target.value;
    const type = window.location.pathname.split('/')[1];

    // Dictionary to map the type of search to the corresponding API endpoint.
    const dictionary = {
        'Players': 'Players',
        'specific_Player': 'Players',
        'Teams': 'Teams',
        'Team': 'Teams',
        'Championships': 'Championships',
        'specific_Championship': 'Championships',
        'Match': 'Matches',
        'Matches': 'Matches'
    };

    if (searchText.length > 1 ) {//&& dictionary[type] === 'Matches'
        axios.get(`/search/${dictionary[type]}`, { params: { query: searchText } })
            .then(response => displaySearchResults(response.data, type))
            .catch(error => {
                console.error(error);
                displayError('Error retrieving search results.');
            });
    } else {
        clearSearchResults();
    }
}

function matchesSearch(searchText) {
    axios.get(`/search/Matches`, { params: { query: searchText } })
        .then(response => displaySearchResults(response.data, 'Matches'))
        .catch(error => {
            console.error(error);
            displayError('Error retrieving search results.');
        });
}

/**
 * Displays search results based on the provided data.
 * Renders player and club categories separately.
 * @param {Object} results - The search results data.
 * @param {Array} results.players - The array of player objects.
 * @param type The type of search results (players, teams or championships).
 */
function displaySearchResults(results, type) {
    clearSearchResults();
    const resultsDiv = document.querySelector('.results');

    const dictionary = {
        'Players': 'specific_Player',
        'specific_Player': 'specific_Player',
        'Teams': 'Team',
        'Championships': 'specific_Championship',
        'specific_Championship': 'specific_Championship',
        'Matches': 'Match',
        'Match': 'Match'
    };


    if (results && results.postgres && results.postgres.length > 0) {
        createCategoryContainer("Here's what we found:", results.postgres, dictionary[type], 'id', resultsDiv);
    }

    if (results && results.mongo && results.mongo.length > 0) {
        createCategoryContainer("Here's what we found:", results.mongo, 'Match', 'game_id', resultsDiv);
    }

    if (results.mongo.length === 0 && results.postgres.length === 0) {
        displayError('No results found matching your search.');
    }
}

/**
 * Creates a container for a category of items (players or clubs) and appends it to the search results div.
 * @param labelText The label for the category.
 * @param items The items to display in the category.
 * @param itemClass The class of the items (players or clubs).
 * @param idKey The key for the unique identifier of the items.
 * @param resultsDiv The search results div.
 */
function createCategoryContainer(labelText, items, itemClass, idKey, resultsDiv) {
    const containerDiv = createElement('div', ['category-container']);
    const label = createElement('div', ['label'], labelText);
    const categoryDiv = createElement('div', ['category', itemClass]);

    containerDiv.appendChild(label);
    containerDiv.appendChild(categoryDiv);

    items.forEach(item => {
        let itemElement;

        if (itemClass === 'Match') {
             itemElement = createElement('p', ['item'], `${item.home_club_name} vs ${item.away_club_name}`);
        } else {
             itemElement = createElement('p', ['item'], item.name);
        }
        const href = `/${itemClass}/${item[idKey]}`;
        itemElement.addEventListener('click', () => {
            window.location.href = href;
        });
        itemElement.addEventListener('mouseover', () => {
            itemElement.style.cursor = 'pointer';
        });
        categoryDiv.appendChild(itemElement);
    });

    resultsDiv.appendChild(containerDiv);
}

function createElement(tag, classes, textContent = '') {
    const element = document.createElement(tag);
    if (classes) classes.forEach(cls => element.classList.add(cls));
    if (textContent) element.textContent = textContent;
    return element;
}

/**
 * Displays an error message in the search results div.
 * @param message The error message to display.
 */
function displayError(message) {
    const resultsDiv = document.querySelector('.results');
    resultsDiv.textContent = message;
    resultsDiv.className = 'results no-results';
}

/**
 * Clears the search results from the search results div.
 */
function clearSearchResults() {
    const resultsDiv = document.querySelector('.results');
    const searchBar = document.getElementById('searchbar');
    searchBar.textContent = '';
    resultsDiv.innerHTML = '';
    resultsDiv.className = 'results';
}

/**
 * Closes the quick search overlay if the click is outside the search box or the results.
 * Also removes the event listener needed to close the overlay.
 * @param event The input event.
 */
function closeSearchEvent(event) {
    const searchResults = document.getElementsByClassName('category');
    const searchbar = document.getElementById('searchbar');
    const searchButton = document.getElementById('searchButton');
    const isClickInsideQuickSearch = Array.from(searchResults).some(element => element.contains(event.target)) ||
        searchbar.contains(event.target) || searchButton.contains(event.target);
    if (!isClickInsideQuickSearch) {
        document.removeEventListener('click', closeSearchEvent, true);
        closeQuickSearch();
    }
}

/**
 * Closes the quick search overlay by hiding the HTML elements.
 * Also clears the search input and removes the results.
 */
function closeQuickSearch() {
    //const results = document.getElementById('results')
    //results.removeClass('results no-results')
    document.getElementById('searchbar').value = '';
    clearSearchResults();
}