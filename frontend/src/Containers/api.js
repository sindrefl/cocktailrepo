
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



 //POST:
 export async function postDrink(body){ 
    return await fetch('/api/cocktail/addDrink', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, body})
 }

 export async function saveImageFiles(files, names){
     return await files.forEach((file,index) => {
         saveImageFile(file, names[index])
     });
 }

 export async function saveImageFile(file, name){
    var data = new FormData()
    data.append('image', file)
    data.append('fileName', file.name)
    data.append('name', name)

    return await fetch('/api/simage', {
        method: 'POST',
        body: data
    })
 }


 //LOGIN AND SO ON:

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}