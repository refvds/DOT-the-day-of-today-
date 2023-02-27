const att = await chrome.runtime.sendMessage({message: 'get-data'});
const slider = document.querySelector('#slider');
const btnNextSlide = document.querySelector('#btnNext');
const btnPrevSlide = document.querySelector('#btnPrev');
const sliderItems = att.map((img, index) => createImg(slider, img, index));
let currentIndex = 0;

function createImg(sliderNode, path, index) {
  const sliderItem = document.createElement('img');
  sliderItem.src = path;
  
  index === 0 
    ? sliderItem.classList.add('slider__item') 
    : sliderItem.classList.add('slider__item', 'hidden')
  
    sliderNode.appendChild(sliderItem);
  
    return sliderItem;
}

function changeSlide(slideIndex) {
  sliderItems.at(currentIndex).classList.add('hidden');
  currentIndex = (slideIndex + sliderItems.length) % sliderItems.length;
  sliderItems[currentIndex].classList.remove('hidden');
}

btnNextSlide.addEventListener('click', () => {
  changeSlide(currentIndex + 1);
});

btnPrevSlide.addEventListener('click', () => {
  changeSlide(currentIndex - 1);
});

