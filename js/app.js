'use strict';

// Globals
let voteCount = 0;
let lastVote = 25;
let products = [];
let renderQueue = [];

// DOM
let imageContext = document.getElementById('productImageCtx');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let resultButton = document.getElementById('resultButton');
let resultList = document.getElementById('resultList');

// Constructor
function Product(name, picExtension = 'jpg'){
  this.name = name;
  this.pic = `img/${name}.${picExtension}`;
  this.votesReceived = 0;
  this.viewsReceived = 0;

  products.push(this);
}

// Push to products.
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

// Main script

fillRenderQueue();
renderImages();

function fillRenderQueue(targetLength = 6){
  for (let i = renderQueue.length; i < targetLength; i++){
    let productIndex = getRandomProductIndex();
    while(renderQueue.includes(productIndex)){
      productIndex = getRandomProductIndex();
    }
    renderQueue.push(productIndex);
  }
}

function renderImages(){
  let index = renderQueue.shift();
  img1.src = products[index].pic;
  img1.alt = products[index].name;
  products[index].viewsReceived++;

  index = renderQueue.shift();
  img2.src = products[index].pic;
  img2.alt = products[index].name;
  products[index].viewsReceived++;

  index = renderQueue.shift();
  img3.src = products[index].pic;
  img3.alt = products[index].name;
  products[index].viewsReceived++;
}

function getRandomProductIndex(){
  return Math.floor(Math.random() * products.length);
}

function voteImage(event){
  products.forEach(product => {
    if(product.name === event.target.alt){
      console.log('Hello Vote.');
      product.votesReceived++;
    }
  });
  ++voteCount;
  if (voteCount === lastVote){
    imageContext.removeEventListener('click', voteImage);
    resultButton.disabled = false;
    resultButton.textContent = 'Show Results';
  }else{
    fillRenderQueue();
    renderImages();
  }
}

function showResults(){
  for(let i = 0; i < products.length; i++){
    let liElem = document.createElement('li');
    liElem.textContent = `${products[i].name} views: ${products[i].viewsReceived}, votes: ${products[i].votesReceived}`;
    resultList.append(liElem);
  }
  resultButton.removeEventListener('click', showResults);
}

// Event listeners

imageContext.addEventListener('click', voteImage);
resultButton.addEventListener('click', showResults);
