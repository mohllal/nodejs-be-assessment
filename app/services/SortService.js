module.exports = class SearchService {
  /**
   * Sort Books By Certain Creiteria
   * @param {Array} books
   * @param {string} criteria
   */
  static sortBooks(books, criteria) {
    switch (criteria) {
      case 'average_rating':
        books.sort(SearchService._sortByAverageRating);
        break;
      case 'ratings_count':
        books.sort(SearchService._sortByRatingCount);
        break;
      case 'publication_date':
        books.sort(SearchService._sortByPublicationDate);
        break;
      default:
        break;
    }
  }

  /**
   * Sort Books By Average Rating
   * @param {Object} elem
   * @param {Object} nextElem
   */
  static _sortByAverageRating(elem, nextElem) {
    if (parseFloat(elem.average_rating) < parseFloat(nextElem.average_rating)) {
      return 1;
    }
    if (parseFloat(elem.average_rating) > parseFloat(nextElem.average_rating)) {
      return -1;
    }
    return 0;
  }

  /**
   * Sort Books By Rating Count
   * @param {Object} elem
   * @param {Object} nextElem
   */
  static _sortByRatingCount(elem, nextElem) {
    if (parseInt(elem.ratings_count.$t, 10) < parseInt(nextElem.ratings_count.$t, 10)) {
      return 1;
    }
    if (parseInt(elem.ratings_count.$t, 10) > parseInt(nextElem.ratings_count.$t, 10)) {
      return -1;
    }
    return 0;
  }

  /**
   * Sort Books By Publicate Date
   * @param {Object} elem
   * @param {Object} nextElem
   */
  static _sortByPublicationDate(elem, nextElem) {
    // skip element if it doesn't have publication info
    if (
      elem.original_publication_day.nil
      || elem.original_publication_month.nil
      || elem.original_publication_year.nil
    ) {
      return 1;
    }

    // skip next element if it doesn't have publication info
    if (
      nextElem.original_publication_day.nil
      || nextElem.original_publication_month.nil
      || nextElem.original_publication_year.nil
    ) {
      return -1;
    }

    // convert publication date info to DD/MM/YY date string
    const elemDateString = `${elem.original_publication_day.$t}/${elem.original_publication_month.$t}/${elem.original_publication_year.$t}`;
    const nextElemDateString = `${nextElem.original_publication_day.$t}/${nextElem.original_publication_month.$t}/${nextElem.original_publication_year.$t}`;

    // convert date strings back to date objects
    const elemDateObject = new Date(elemDateString);
    const nextElemDateObject = new Date(nextElemDateString);

    if (elemDateObject.getTime() < nextElemDateObject.getTime()) {
      return 1;
    }
    if (elemDateObject.getTime() > nextElemDateObject.getTime()) {
      return -1;
    }
    return 0;
  }
};
