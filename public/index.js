var app = function(){
  var url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  //create a new XMLHttpRequest object
  var request = new XMLHttpRequest();
  //set the type of request we want with the url we want to call
  request.open("GET", url);
  //set the callback we want it to use when it has completed the call
  request.addEventListener('load', callback);
  //send the request!
  request.send();
}

const requestComplete = function(){
//this will be the request object itself
if(this.status !== 200) return;
//grab the response text
const jsonString = this.responseText;
const brews = JSON.parse(jsonString);

  console.log(brews);
  populateSelect(brews);
  getBeer(brews);
}

const populateSelect = function(brews){
  const select = document.getElementById("beer-list");

  brews.forEach(function(beer, index){
    let option = document.createElement('option');
    option.innerText = beer.name
    option.value = index
    select.appendChild(option);

  })
  
};

const getBeer = function(brews){
  const selected = document.querySelector('select');
  selected.addEventListener('change', function(){
    let beer = brews[this.value];
    getDetails(beer);
    getIngredients(beer);
  })
}

const getIngredients = function(beer){
  const div = document.getElementById('ingredients');
  const hops = beer.ingredients.hops;
  hops.forEach(function(hop, index){
    let p = document.createElement('p');
    p.innerText = hop.name
    p.value = index
    div.appendChild(p);
  })
}


const getDetails = function(beer){
  const div = document.getElementById('details')
  const name = document.createElement('p')
  name.innerText = `Name: ${beer.name}`
  const tag = document.createElement('p')
  tag.innerText = `${beer.tagline}`
  const abv = document.createElement('p')
  abv.innerText = `ABV: ${beer.abv}`
  const des = document.createElement('p')
  des.innerText = ` ${beer.description}`
  const pair = document.createElement('p')
  pair.innerText = `Food Pairing: ${beer.food_pairing[0]}`
  const img = document.createElement('img')
  img.src = beer.image_url
  div.appendChild(name);
  div.appendChild(tag);
  div.appendChild(abv);
  div.appendChild(des);
  div.appendChild(pair);
  div.appendChild(img);
  // return div;
};

window.addEventListener('load', app);