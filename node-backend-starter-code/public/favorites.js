function favoritesService() {
  var url = "/favorites";
  return {
    getFavorites: function(onLoad, onError) {
      var request = new XMLHttpRequest();
      request.open("GET", url, true);

      request.onload = function(event) {
        var results = JSON.parse(request.responseText);
        for(var i in results) {
          results[i] = {
            Title: results[i].name,
            imdbID: results[i].oid
          };
        }
        onLoad(results);
      };
      request.onerror = function(event) {
        onError(request);
      };

      request.send(null);
    },

    addFavorite: function(omdbMovie, onLoad, onError) {
      var request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.setRequestHeader("Content-type", "application/json");

      request.onload = function(event) {
        var results = JSON.parse(request.responseText);
        onLoad(results);
      };
      request.onerror = function(event) {
        onError(request);
      };

      // Convert from the omdb format to the backend format for favorites - the
      // backend has:
      //  - oid (object id), which maps to the imdbID
      //  - name, which maps to the Title
      var favorite = {
        oid: omdbMovie.imdbID,
        name: omdbMovie.Title
      };
      request.send(JSON.stringify(favorite));
    }
  }
}
