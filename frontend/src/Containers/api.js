export const getGlassImage = (glass) => {
    return `/api/images/glass?path=${glass.toUpperCase()}.jpg`
};

export const getCategoryImage = (category) => {
    return `/api/images/categories?path=${category.name.replace(/\//g,"")}.jpg`
}

export const getDrinkImage = (drink) => {
    //return `/api/images/drinks?path=${drink.name.replace(/ /g,'_').replace(/[èé]/g, 'e')}.jpg`
    return `/api/images/drinks?path=${drink.name}`;
}

export async function getRandomDrink(){
    return await fetch('/api/random', {
        method : 'GET'
    }).then((response) => response.json());
}

export async function getIngredients(){
    return await fetch('/api/ingredients',{
        method: 'GET'
    }).then(response => response.json())
}

export async function getTopNCategories(i){
   return await fetch(`/api/categories/${i}`,{
        method:'GET'
   }).then(response => response.json())
}

export async function getCategories(){
    return await fetch(`/api/categories`,{
         method:'GET'
    }).then(response => response.json())
 }
 
 export async function getTopNGlassTypes(i){
    return await fetch(`/api/glassTypes/${i}`, {
         method: 'GET'
    }).then(response => response.json())
 }
 
 export async function getGlassTypes(){
    return await fetch(`/api/glassTypes`, {
         method: 'GET'
    }).then(response => response.json())
 }

 export async function getFilteredDrinks(glass, category,page){
    return await fetch(`/api/filteredDrinks?category=${category}&glass=${glass.toUpperCase()}&page=${page}`).then(response => response.json())
 }

 export async function getPageSize(glass, category){
     return await fetch(`/api/pagecount?category=${category}&glass=${glass.toUpperCase()}`).then(response => response.json())
 }

 export async function postDrink(body){ 
    return await fetch('/api/addDrink', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, body})
 }