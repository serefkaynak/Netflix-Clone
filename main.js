//Top Slider
function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove the "active" class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Display the current slide and mark its corresponding dot as active
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

async function generateSliderHtml() {
  let html = `
    {{slideritems}}
        <div class="slider-nav">
          <a class="slider-nav-btn" onclick="plusSlides(-1)">
            <ion-icon name="caret-back-outline"></ion-icon>
          </a>
          <a class="slider-nav-btn" onclick="plusSlides(1)">
            <ion-icon name="caret-forward-outline"></ion-icon>
          </a>
        </div>
      
        <!-- The dots/circles -->
        <div class="dot-container">
          {{dots}}
        </div>
  `;
  //html = html.replace("{{slideritems}}",await generateSliderItems())
  html = html.replace(new RegExp("{{slideritems}}", "g"), await generateSliderItems());
  html = html.replace("{{dots}}",await generateSliderDots());
  let sliderContainer = document.getElementsByClassName("slider-container")[0];
  sliderContainer.innerHTML = html;
  sliderContainer.addEventListener('click', ()=>{
    clearInterval(interval_num);
  });
  showSlides(slideIndex);
}


async function generateSliderItems(){
  let result = await fetch('http://127.0.0.1:5500/data.json').then((x)=>x.json());
  let html = ``;
  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    html += 
    `<div class="slide fade">
        <img class="slide-image" src="${element.img}">
        <div class="slide-content">
          <h3 class="slide-title">${element.title}</h3>
          <p class="slide-desc">
            ${element.description}
          <a href="" class="slide-btn">
          Play 
          <ion-icon name="arrow-forward-circle"></ion-icon>
          </a>
        </div>
      </div>`
  }
  return html;
}

async function generateSliderDots(){
  let result = await fetch('http://127.0.0.1:5500/data.json').then((x)=>x.json());
  let html =``;
  for (let i = 0; i < result.length; i++) {
    html +=' <span class="dot" onclick="currentSlide('+(i+1)+')"></span>';
  }
  return html;
}

//Slider Actions
let slideIndex = 1;
let interval_num =-1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Automatically advance to the next slide every 3 seconds (3000 milliseconds)
function startTimer() {
  interval_num = setInterval(function () {
    plusSlides(1);
  }, 3000);  
}

// Initialize the top slider
generateSliderHtml().then(()=>{
  startTimer();
});


// Refactoring
async function getContentSlidersData() {
  let result = await fetch('http://127.0.0.1:5500/dataimage_list.json').then((x)=>x.json());
  return result;
}

function generateContentSliderInnerImagesHtml(data){
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    html += `<div class="swiper-slide">
      <img src="${item.img}" alt="">
    </div>`;
  }
  return html;
}

async function GenerateSliderSection() {
  let data = await getContentSlidersData();
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let img_html = generateContentSliderInnerImagesHtml(item.items);
    let temp = `
    <div class="container">
        <p>${item.title}</p>
        <div class="popular-container">            
            <div class="swiper-container">
              <div class="swiper-wrapper">
                ${img_html}
              </div>
              <!-- Add Arrows -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
    </div>`;
    html += temp;
  }

  document.getElementById('sliders').innerHTML = html;
}

function initializeSwiperSlider() {
 const swiper = new Swiper(".swiper-container", {
  slidesPerView: 2,
  slidesPerGroup: 1,
  centeredSlides: true,
  loop: true,
  navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
   breakpoints: {
    // when window width is >= 600px
    600: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 5,
      centeredSlides: true
      
    },
     // when window width is >= 900px
     900: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 5,
       centeredSlides: false
      
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 5,
      centeredSlides: false
    },         
     // when window width is >= 1500px
    1500: {
       slidesPerView: 5,
       slidesPerGroup: 5,
       spaceBetween: 5,
       centeredSlides: false
     },  
     // when window width is >= 1800px
    1800: {
      slidesPerView: 6,
      slidesPerGroup: 6,
      spaceBetween: 5,
      centeredSlides: false
    }
  }
});
}

async function initSlider(){
  await GenerateSliderSection();
  initializeSwiperSlider();
}

initSlider();