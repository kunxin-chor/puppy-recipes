const API_KEY = "1";
const API_URL = "https://www.themealdb.com/api/json/v1/" + API_KEY;

function testAPI()
{
    axios.get(API_URL, {
        params: {
            'c':'Seafood'
        }
    })
    .then(function(response){
        console.log(response.data);
    })
}

function testGetCategories()
{
    axios.get(API_URL+"list.php?c=list")
}

$(function(){
    
    $("#search-button").click(function(){
        
        
      let category = $("#search-input").val();    
      axios.get(API_URL+"/filter.php", {
            params: {
                'c': category
            }
        })
        .then(function(response){
            let results = response.data.meals;
            for (let each_result of results)
            {
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
    
})