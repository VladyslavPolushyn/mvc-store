export default class ViewSearchSort {
    headerCollapse = document.querySelector('.main-header .collapse');

    constructor(cbSort, cbSearch, cbFilterCategory) {
        this.headerCollapse.insertAdjacentHTML('afterbegin', `
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="me-2 mt-2">
                    <select class="form-select sort-select" aria-label="Default select example">
                        <option disabled selected>Sort by price</option>
                        <option value="low-price">Low price first</option>
                        <option value="high-price">High price first</option>
                    </select>
                </li>
                <li class="me-2 mt-2">
                    <select class="form-select filter-select" aria-label="Default select example">
                        <option disabled selected>Category</option>
                        <option value="All">All</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Tea & Coffee">Tea & Coffee</option>
                        <option value="Bread & Bakery">Bread & Bakery</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Sweets">Sweets</option>
                        <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                        <option value="Grains, Pasta & Sides">Grains, Pasta & Sides</option>
                        <option value="Meat & Seafood">Meat & Seafood</option>
                        <option value="Dairy, Eggs & Cheese">Dairy, Eggs & Cheese</option>
                        <option value="Sauces">Sauces</option>	
                    </select>
                </li>
            </ul>
            <form class="d-flex mt-2">
                <input class="form-control me-2 search-input" type="search" placeholder="Enter product name..." aria-label="Search">
            </form>`);

        this.sortDropdown = document.querySelector('.sort-select');
        this.searchInput = document.querySelector('.search-input');
        this.filterInput = document.querySelector('.filter-select');

        this.sortDropdown.addEventListener('input', cbSort);
        this.searchInput.addEventListener('input', cbSearch);
        this.filterInput.addEventListener('input', cbFilterCategory);

    }

}