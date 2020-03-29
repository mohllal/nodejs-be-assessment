(function filter() {
  const $gallery = $('#gallery'); // Get the gallery element
  const $searchText = $('#search-text'); // Get the search input element
  const $searchType = $('#search-type'); // Get the search select element
  const $sortType = $('#sort-type'); // Get the sort select element

  // Declare filterArray() function
  function filterResults() {
    const query = $searchText.val().trim().toLowerCase(); // Get the search query
    const searchType = $searchType.val(); // Get the search type
    const sortType = $sortType.val();

    console.log(`http://localhost:8088/api/v1/search?q=${query}&field=${searchType}&sortBy=${sortType}&page=1`);

    if (query) {
      $.ajax({
        url: `http://localhost:8088/api/v1/search?q=${query}&field=${searchType}&sortBy=${sortType}&page=1`,
        type: 'GET',
        success(result) {
          console.log('Response:', result);
          $gallery.empty();

          const books = result.response.results.work;
          books.forEach((book) => {
            const content = `
            <div class="book">
             <img src=${book.best_book.image_url} alt=${book.best_book.title}>
             <div>${book.best_book.title}</div>
            </div>
            `;
            $gallery.append(content);
          });
        },
        error(error) {
          console.error('Error:', error);
          alert(error.responseJSON.response);
        },
      });
    }
  }

  $searchText.on('keyup', filterResults); // Use keyup event to call filterResults()
  $searchType.on('change', filterResults);// Use change event to call filterResults()
  $sortType.on('change', filterResults);// Use change event to call filterResults()
}());
