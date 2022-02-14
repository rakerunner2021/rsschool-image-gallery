const authKey = "6BHOwRv3X3gzKA4_3kC99B3uBzsjOWZguuZSyJVin-4";
const nextBtn = document.querySelector('.next-page');
const input = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');

let pageNumber = 1;
let search = false;
let query = "";

input.addEventListener('input', (e) => {
    e.preventDefault();
    query = e.target.value;
})

async function createPhotos (pageNumber) {
    const data = await fetch (`https://api.unsplash.com/search/photos?&per_page=15&page=${pageNumber}&query=office&client_id=6BHOwRv3X3gzKA4_3kC99B3uBzsjOWZguuZSyJVin-4`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: authKey,    
        }
    }
 );
 const result = await data.json();
 console.log(result);
 result.results.forEach((photo) => {
    const pic = document.createElement('div');
    pic.innerHTML = `<img src=${photo.urls.regular}>
        
    <a href=${photo.urls.regular}>Download</a> 
    `;
    document.querySelector('.image-gallery').appendChild(pic); 
 });
}

async function searchPhotos (query, pageNumber) {
    const data = await fetch (`https://api.unsplash.com/search/photos?&per_page=15&page=${pageNumber}&query=${query}&client_id=6BHOwRv3X3gzKA4_3kC99B3uBzsjOWZguuZSyJVin-4`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: authKey,    
        }
    }
 );
 const result = await data.json();
 console.log(result);
 result.results.forEach((photo) => {
    const pic = document.createElement('div');
    pic.innerHTML = `<img src=${photo.urls.regular}>
        
    <a href=${photo.urls.regular}>Download</a> 
    `;
    document.querySelector('.image-gallery').appendChild(pic); 
 });
}

searchBtn.addEventListener('click', () => {
    if(input.value === "") return;
    clear();
    search = true;
    searchPhotos(query, pageNumber);
    pageNumber++;
})

function clear () {
   //input.value = "";
    document.querySelector('.image-gallery').innerHTML = "";
    pageNumber = 1;
}

nextBtn.addEventListener('click', () => {
    if(!search) {
        pageNumber++;
        createPhotos(pageNumber);
    } else {
        if(query.value === "") return;
        pageNumber++;
        searchPhotos(query, pageNumber)
    }
})
createPhotos(pageNumber);
