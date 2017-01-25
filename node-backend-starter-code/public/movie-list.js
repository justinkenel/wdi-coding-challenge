function buildMovieList(searchForm, movieList, selectedMovieDescription, omdbApi,
    favoritesService) {
  function displayMovieDetails(imdbID) {
    omdbApi.getMovieDetails(imdbID, function(result) {
      // Construct the table containing the information about the selected
      // movie.
      // Setting the value of innerHTML updates the element, in this case
      // creating a table where the items on the left are the labels for the
      // fields on the right
      selectedMovieDescription.innerHTML =
        "<table>" +
        "<tr><td>Title</td><td>" + result.Title + "</td></tr>" +
        "<tr><td>Year</td><td>" + result.Year + "</td></tr>" +
        "<tr><td>Rated</td><td>" + result.Rated + "</td></tr>" +
        "<tr><td>Synopsis</td><td>" + result.Plot + "</td></tr>" +
        "</table>";
    });
  }

  function buildMovieElement(movieData) {
    var title = movieData.Title;
    var year = movieData.Year;
    var imdbID = movieData.imdbID;

    var addToFavoritesElement = document.createElement('span');
    addToFavoritesElement.innerHTML = '☆';
    addToFavoritesElement.title = 'Add to favorites';
    addToFavoritesElement.onclick = function() {
      favoritesService.addFavorite(movieData, function() {});
    };

    var titleElement = document.createElement('span');
    titleElement.innerHTML = title;
    titleElement.onclick = function() {
      displayMovieDetails(imdbID);
    };

    var movieElement = document.createElement('li');
    movieElement.append(addToFavoritesElement);
    movieElement.append(titleElement);

    return movieElement;
  }

  searchForm.addEventListener("submit", function(event) {
    var searchText = searchForm.elements['searchText'].value;
    omdbApi.searchOmdb(searchText, function(results) {
      // remove all elements currently in the search results
      movieList.innerHTML = "";

      // iterate over all results from the search:
      //  - build an li element to go in the movie list element
      //  - append the constructed element to the list
      var searchValues = results['Search'];
      for(var i in searchValues) {
        var li = buildMovieElement(searchValues[i]);
        movieList.append(li);
      }
    });
    return false;
  });
}
