/* GOOGLE API SCRIPT */

const APIKey = "AIzaSyBpzAJtDlPPG6C2l0fUZM558KSRGdIRbT8";
const baseURL = "https://customsearch.googleapis.com/customsearch/v1?";
const searchEngineID = "54f51fe0be357423e";
var searchLocation;
var searchTerm;
var requestURL;


// https://stackoverflow.com/questions/25515936/perform-curl-request-in-javascript
/* by user https://stackoverflow.com/users/1244127/json-c11
fetch(requestURL)
  .then(function (response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
  /*
  <script async src="https://cse.google.com/cse.js?cx=54f51fe0be357423e">
</script>
<div class="gcse-search"></div>
*/



// Run script when button is clicked
$(function () {
  // select button
  var btnElt = $("#button");

  // add listener to button
  btnElt.on("click", function(event) {
    event.preventDefault();
    //https://stackoverflow.com/questions/10659097/jquery-get-selected-option-from-dropdown
    var propertyID = $("#property").find(":selected").val();
    var serviceID = $("#issue-type").find(":selected").val();
    //$("#search-results").text(propertyID);

    // set search location based on selection
    if (propertyID == "The Custom - Luxury Suites") {
      searchLocation = "2424 77th Street Los Angeles, CA 90247";
    }
    else if (propertyID == "JW Lofts") {
      searchLocation = "7117 Sepulveda Ave. Los Angeles, CA 90247";
    }
    else if (propertyID == "The Giancarlo") {
      searchLocation = "4242 Robinson Way Los Angeles, CA 90042";
    }
    else if (propertyID == "Crystal Lake Apartments") {
      searchLocation = "1313 Elm Street Los Angeles, CA 90066";
    }

    // set search term based on selection
    if (serviceID == "Plumbing") {
      searchTerm = "plumber";
    }
    else if (serviceID == "Electrical") {
      searchTerm = "electrician";
    }

    requestURL = baseURL + "key=" + APIKey + "&cx=" + searchEngineID + "&q=\"" + searchTerm + " AND " + searchLocation + "\"&callback=displayResults";
    //$("#search-results").text(requestURL);
    var scriptTag = "<script src=\"" + requestURL + "\"></script>";
    $("#script-2").attr("src", requestURL);
  });
  /* run the search
  // https://stackoverflow.com/questions/7840003/google-custom-search-api-returning-invalid-json
  await btnElt.on("end", async function () {
    fetch(requestURL).then(response => response.json())
      .then(data => console.log(data));
  }); */
});

// https://developers.google.com/custom-search/v1/using_rest
function displayResults(response) {
  console.log(response);
  for (var i = 0; i < response.items.length; i++) {
    var item = response.items[i];
    console.log(item);
    document.getElementById("search-results").append(
      document.createElement("br"),
      document.createTextNode(item.htmlTitle)
    );
  }
}