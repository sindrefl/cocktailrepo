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

 //Filtering:
 export async function getFilteredDrinks(glass, category,page){
    return await fetch(`/api/filtered/drinks?category=${category}&glass=${glass.toUpperCase()}&page=${page}`).then(response => response.json())
 }

 export async function getFilteredDrinksBySpecificDrink(specificDrink){
     return await fetch(`/api/filtered/specificDrink?name=${specificDrink}`).then(response => response.json())
 }

 export async function getDrinkSuggestions(input) {
    return await fetch(`/api/filtered/suggestions/drink?drink=${input}`, {
        method: 'GET'
    }).then(response => response.json())
}

 export async function getPageSize(glass, category){
     return await fetch(`/api/filtered/pagecount?category=${category}&glass=${glass.toUpperCase()}`).then(response => response.json())
 }



 //POST:
 export async function postDrink(body){ 
    return await fetch('/api/addDrink', {
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

 