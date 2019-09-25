const API_KEY = "1";
const API_URL = "https://www.themealdb.com/api/json/v1/" + API_KEY;

/* global $ */
/* global axios */

function testAPI() {
    axios.get(API_URL, {
            params: {
                'c': 'Seafood'
            }
        })
        .then(function(response) {
            console.log(response.data);
        })
}

function testGetByName() {
    axios.get(API_URL + "/search.php", {
        params: {
            "s": "chicken"
        }
    }).then(function(response) {
        console.log(response);
    })
}

function getCategories() {
    axios.get(API_URL + "/list.php?c=list").then(function(response) {
        console.log(response.data.meals);
        for (let each_category of response.data.meals) {
            let option = $(`<option value="${each_category.strCategory}">${each_category.strCategory}</option>`)
            $("#selected-category").append(option);
        }

    })
}

$(function() {

    $(".search-widget").hide();
    $("#search-by-name-form").show();

    getCategories();

    // search by category
    $("#search-by-category-button").click(function() {

        let category = $("#selected-category").val();
        axios.get(API_URL + "/filter.php", {
                params: {
                    'c': category
                }
            })
            .then(function(response) {
                let results = response.data.meals;
                $("#results").empty();
                for (let each_result of results) {
                    let media_object = `
                    <div class="media mt-2 mb-2">
                      <img src="${each_result.strMealThumb}" class="mr-3 img-thumbnail" style="width:25%">
                      <div class="media-body">
                        <h5 class="mt-0">${each_result.strMeal}</h5>
                      </div>
                    </div>
                    `
                    $("#results").append($(media_object));
                }
            })

    })

    $("#search-button").click(function() {
        let search_terms = $("#search-input").val();
        axios.get(API_URL + "/search.php", {
            params: {
                "s": search_terms
            }
        }).then(function(response) {
            $("#results").empty();
            for (let each_result of response.data.meals) {
                   let media_object = `
                    <div class="media mt-2 mb-2">
                      <img src="${each_result.strMealThumb}" class="mr-3 img-thumbnail" style="width:25%">
                      <div class="media-body">
                        <h5 class="mt-0">${each_result.strMeal}</h5>
                      </div>
                    </div>
                    `
                    $("#results").append($(media_object));
            }
        })
    })
    
    $("#search-by-name-radio").click(function(){
        $('.search-widget').hide();
        $("#search-by-name-form").show();
    })
    
    $("#search-by-category-radio").click(function(){
       $(".search-widget").hide();
       $("#search-by-category-form").show();
    });

})
