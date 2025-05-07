// Initialize the products page
document.addEventListener('DOMContentLoaded', () => {
    // Get query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');

    // Set page title based on query
    updatePageTitle(category, search);

    // Load products
    loadProducts(category, search);

    // Set up filter and sort functionality
    setupFilters();
    setupSort();
});

// Update page title based on query
function updatePageTitle(category, search) {
    const titleElement = document.getElementById('products-title');
    if (!titleElement) return;

    if (search) {
        titleElement.textContent = `Search Results for "${search}"`;
    } else if (category) {
        // Capitalize first letter of category
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        titleElement.textContent = formattedCategory;
    } else {
        titleElement.textContent = 'All Products';
    }
}

// Load products based on filters
function loadProducts(category, search, filters = {}, sort = 'featured') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Filter products based on category and search
    let filteredProducts = window.shopData.products;

    // Apply category filter
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Apply search filter
    if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
        );
    }

    // Apply additional filters
    if (filters.categories && filters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            filters.categories.includes(product.category)
        );
    }

    if (filters.priceRanges && filters.priceRanges.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return filters.priceRanges.some(range => {
                if (range === '0-25') return product.price >= 0 && product.price <= 25;
                if (range === '25-50') return product.price > 25 && product.price <= 50;
                if (range === '50-100') return product.price > 50 && product.price <= 100;
                if (range === '100-500') return product.price > 100 && product.price <= 500;
                if (range === '500+') return product.price > 500;
                return false;
            });
        });
    }

    if (filters.ratings && filters.ratings.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return filters.ratings.some(rating => {
                if (rating === '4+') return product.rating >= 4;
                if (rating === '3+') return product.rating >= 3;
                if (rating === '2+') return product.rating >= 2;
                if (rating === '1+') return product.rating >= 1;
                return false;
            });
        });
    }

    // Apply sorting
    if (sort === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'newest') {
        // For demo purposes, we'll just reverse the array to simulate newest first
        filteredProducts.reverse();
    }

    // Clear the grid
    productsGrid.innerHTML = '';

    // Display products or empty message
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
        <div class="empty-state">
          <span class="material-symbols-outlined">search_off</span>
          <p>No products found matching your criteria.</p>
          <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
        </div>
      `;
    } else {
        // Create product cards
        filteredProducts.forEach(product => {
            // Assuming createProductCard is defined elsewhere or imported
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });

        // Create pagination (simplified for demo)
        createPagination(filteredProducts.length);
    }
}

// Create pagination controls
function createPagination(totalProducts) {
    const paginationElement = document.getElementById('pagination');
    if (!paginationElement) return;

    const productsPerPage = 12;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Clear pagination
    paginationElement.innerHTML = '';

    // Only show pagination if we have more than one page
    if (totalPages <= 1) return;

    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&laquo; Previous';
    prevButton.disabled = true; // Disabled for demo
    paginationElement.appendChild(prevButton);

    // Create page buttons (max 5)
    const maxButtons = Math.min(totalPages, 5);
    for (let i = 1; i <= maxButtons; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === 1) pageButton.classList.add('active');
        paginationElement.appendChild(pageButton);
    }

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next &raquo;';
    paginationElement.appendChild(nextButton);
}

// Set up filter functionality
function setupFilters() {
    const applyFiltersButton = document.getElementById('apply-filters');
    const clearFiltersButton = document.getElementById('clear-filters');

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            const filters = getSelectedFilters();
            const sort = document.getElementById('sort-select').value;

            // Get current category and search from URL
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            const search = urlParams.get('search');

            loadProducts(category, search, filters, sort);
        });
    }

    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', clearFilters);
    }
}

// Get selected filters
function getSelectedFilters() {
    const filters = {
        categories: [],
        priceRanges: [],
        ratings: []
    };

    // Get selected categories
    document.querySelectorAll('.category-filter:checked').forEach(checkbox => {
        filters.categories.push(checkbox.value);
    });

    // Get selected price ranges
    document.querySelectorAll('.price-filter:checked').forEach(checkbox => {
        filters.priceRanges.push(checkbox.value);
    });

    // Get selected ratings
    document.querySelectorAll('.rating-filter:checked').forEach(checkbox => {
        filters.ratings.push(checkbox.value);
    });

    return filters;
}

// Clear all filters
function clearFilters() {
    // Uncheck all filter checkboxes
    document.querySelectorAll('.category-filter, .price-filter, .rating-filter').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset sort to default
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.value = 'featured';
    }

    // Reload products without filters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');

    loadProducts(category, search);
}

// Set up sort functionality
function setupSort() {
    const sortSelect = document.getElementById('sort-select');

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const filters = getSelectedFilters();
            const sort = sortSelect.value;

            // Get current category and search from URL
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            const search = urlParams.get('search');

            loadProducts(category, search, filters, sort);
        });
    }
}
