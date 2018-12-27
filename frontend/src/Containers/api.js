
 import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

//Get Image Links:
export const getGlassImage = (glass) => {
    return `/api/images/glass?path=${glass.toUpperCase()}.jpg`
};

export const getCategoryImage = (category) => {
    return `/api/images/categories?path=${category.name.replace(/\//g,"")}.jpg`
}

export const getDrinkImage = (drink) => {
    return `/api/images/drinks?id=${drink.cocktail_id}`;
}

//Get lists of objects:
export async function getRandomDrink(){
    return await fetch('/api/cocktail/random', {
        method : 'GET'
    }).then((response) => response.json());
}

export async function getIngredients(){
    return await fetch('/api/cocktail/ingredients',{
        method: 'GET'
    }).then(response => response.json())
}

export async function getTopNCategories(i){
   return await fetch(`/api/cocktail/categories/${i}`,{
        method:'GET'
   }).then(response => response.json())
}

export async function getCategories(){
    return await fetch(`/api/cocktail/categories`,{
         method:'GET'
    }).then(response => response.json())
 }
 
 export async function getTopNGlassTypes(i){
    return await fetch(`/api/cocktail/glassTypes/${i}`, {
         method: 'GET'
    }).then(response => response.json())
 }
 
 export async function getGlassTypes(){
    return await fetch(`/api/cocktail/glassTypes`, {
         method: 'GET'
    }).then(response => response.json())
 }

 //Filtering:
 export async function getFilteredDrinks(glass, category,page){
    return await fetch(`/api/filtered/drinks?category=${category}&glass=${glass.toUpperCase()}&page=${page}`).then(response => response.json())
 }

 export async function getFilteredDrinksBySpecificDrink(specificDrink){
     return await fetch(`/api/filtered/specificDrink?name=${specificDrink}`).then(response => response.json())
 }

 export async function getFilteredDrinksByIngredients(ingredients){
    let requeststring = ingredients.map(ing => "ingredients=" + ing).join('&')
    console.log(`/api/filtered/ingredients?${requeststring}`)
    return await fetch(`/api/filtered/ingredients?${requeststring}`).then(response => response.json())
}

 export async function getDrinkSuggestions(input) {
    return await fetch(`/api/filtered/suggestions/drink?drink=${input}`, {
        method: 'GET'
    }).then(response => response.json())
}

export async function getIngredientSuggestions(input) {
    return await fetch(`/api/filtered/suggestions/ingredient?ingredient=${input}`, {
        method: 'GET'
    }).then(response => response.json())
}

 export async function getPageSize(glass, category){
     return await fetch(`/api/filtered/pagecount?category=${category}&glass=${glass.toUpperCase()}`).then(response => response.json())
 }


 export async function getMenu(){
     return await fetch(`/api/menu`).then(response => response.json())
 }

 //POST:
 export async function postDrink(body){ 
    return await fetch('/api/cocktail/addDrink', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, body})
 }

 //LOGIN AND SO ON:
const request = (url, body) => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    body = Object.assign({}, defaults, body);

    return fetch(API_BASE_URL + url, body)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

const postRequest = (url, body) =>{
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const headers = new Headers({'Content-Type': 'application/json'})

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    return fetch(API_BASE_URL + url, {
        headers: headers,
        method: 'POST',
        body: body
    })
}

const postRequestNoContentType = (url, body) =>{
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const headers = new Headers()

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    return fetch(API_BASE_URL + url, {
        headers: headers,
        method: 'POST',
        body: body
    })
}


export function getCurrentUser() {
    return request("/user/me",{
        method: 'GET'
    });
}

export function deleteCocktail(cocktail_id){
    return request("/api/admin/cocktail/delete/" + cocktail_id,{
        method: 'POST'
    })
}

async function updateCocktailImage(file, cocktailId){
    var data = new FormData();
    data.append('image', file)
    data.append('fileName', file.name)

    return await postRequestNoContentType(`/api/admin/cocktail/updateImage/${cocktailId}`, data)
}

export async function updateCocktail(file, cocktail){
    if(file) {
        updateCocktailImage(file, cocktail.drinkId)
    }
    
    const data = JSON.stringify({
        drinkId: cocktail.drinkId,
        name: cocktail.name,
        ingredients: cocktail.ingredients,
        amounts: cocktail.amounts,
        glass: cocktail.glass,
        recipe: cocktail.recipe
    })
    
    return await postRequest('/api/admin/cocktail/update', data)
 }
