export const APPLICATION_ROOT = window.origin.indexOf('localhost') !== -1 ? 'http://localhost:3000/' : 'http://mycocktaibar.herokuapp.com/'


export const getGlassImage = (glass) => {
    return `${APPLICATION_ROOT}api/images/glass/${glass}.jpg`
}

export const getCategoryImage = (category) => {
    return `${APPLICATION_ROOT}api/images/categories/${category.name.replace(/\//g,"")}.jpg`
}

export const getDrinkImage = (drink) => {
    return `${APPLICATION_ROOT}api/images/drinks/${drink.name.replace(/ /g,'_').replace(/[èé]/g, 'e')}.jpg`
}
