function buildMovieList(
    searchForm, movieList, selectedMovieDescription, showFavorites,
    omdbApi, favoritesService) {
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

  function buildMovieElement(movieData, showFavoriteIcon) {
    var title = movieData.Title;
    var imdbID = movieData.imdbID;

    var titleElement = document.createElement('span');
    titleElement.innerHTML = title;
    titleElement.onclick = function() {
      displayMovieDetails(imdbID);
    };

    var movieElement = document.createElement('li');
    if(showFavoriteIcon) {
      var addToFavoritesElement = document.createElement('span');
      addToFavoritesElement.innerHTML = '☆';
      addToFavoritesElement.title = 'Add to favorites';
      addToFavoritesElement.onclick = function() {
        favoritesService.addFavorite(movieData, function() {});
      };

      movieElement.append(addToFavoritesElement);
    }

    movieElement.append(titleElement);

    return movieElement;
  }

  // Using the buildMovieELement function (which includes the logic for clicking
  // on a movie link to display the information about that movie) build the
  // display for the movies that are in the users favorites list
  function displayFavorites() {
    favoritesService.getFavorites(function(favorites) {
      movieList.innerHTML = "";
      for(var i in favorites) {
        var movieElement = buildMovieElement(favorites[i], false);
        movieList.append(movieElement);
      }
    });
  }

  // showFavorites is a provided link element
  // clicking the link will call the displayFavorites function, defined above
  showFavorites.onclick = function() {
    displayFavorites();
    return false;
  };

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
        var li = buildMovieElement(searchValues[i], true);
        movieList.append(li);
      }
    });
    return false;
  });
}
