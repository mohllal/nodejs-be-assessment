(function filter() {
  const $gallery = $('#gallery'); // Get the gallery element
  const $search = $('#search'); // Get the input element
  const $type = $('#type'); // Get the select element

  // Declare filterArray() function
  function filterResults() {
    const query = $search.val().trim().toLowerCase(); // Get the query
    const type = $type.val(); // Get the type

    $.ajax({
      url: `http://localhost:8088/api/v1/search?q=${query}&field=${type}&page=1`,
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

  $search.on('keyup', filterResults); // Use keyup event to call filterResults()
  $type.on('change', filterResults);// Use change event to call filterResults()
}());
