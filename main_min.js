function showSlides(e){const n=document.getElementsByClassName("slide"),i=document.getElementsByClassName("dot");e>n.length&&(slideIndex=1),e<1&&(slideIndex=n.length);for(let e=0;e<n.length;e++)n[e].style.display="none";for(let e=0;e<i.length;e++)i[e].className=i[e].className.replace(" active","");n[slideIndex-1].style.display="block",i[slideIndex-1].className+=" active"}async function generateSliderHtml(){let e='\n          {{slideritems}}\n              <div class="slider-nav">\n                <a class="slider-nav-btn" onclick="plusSlides(-1)">\n                  <ion-icon name="caret-back-outline"></ion-icon>\n                </a>\n                <a class="slider-nav-btn" onclick="plusSlides(1)">\n                  <ion-icon name="caret-forward-outline"></ion-icon>\n                </a>\n              </div>\n            \n              \x3c!-- The dots/circles --\x3e\n              <div class="dot-container">\n                {{dots}}\n              </div>\n        ';e=e.replace(new RegExp("{{slideritems}}","g"),await generateSliderItems()),e=e.replace("{{dots}}",await generateSliderDots());let n=document.getElementsByClassName("slider-container")[0];n.innerHTML=e,n.addEventListener("click",(()=>{clearInterval(interval_num)})),showSlides(slideIndex)}async function generateSliderItems(){let e=await fetch("http://127.0.0.1:5500/data.json").then((e=>e.json())),n="";for(let i=0;i<e.length;i++){const t=e[i];n+=`<div class="slide fade">\n              <img class="slide-image" src="${t.img}">\n              <div class="slide-content">\n                <h3 class="slide-title">${t.title}</h3>\n                <p class="slide-desc">\n                  ${t.description}\n                <a href="" class="slide-btn">\n                Play \n                <ion-icon name="arrow-forward-circle"></ion-icon>\n                </a>\n              </div>\n            </div>`}return n}async function generateSliderDots(){let e=await fetch("http://127.0.0.1:5500/data.json").then((e=>e.json())),n="";for(let i=0;i<e.length;i++)n+=' <span class="dot" onclick="currentSlide('+(i+1)+')"></span>';return n}let slideIndex=1,interval_num=-1;function plusSlides(e){showSlides(slideIndex+=e)}function currentSlide(e){showSlides(slideIndex=e)}function startTimer(){interval_num=setInterval((function(){plusSlides(1)}),3e3)}async function getContentSlidersData(){return await fetch("http://127.0.0.1:5500/dataimage_list.json").then((e=>e.json()))}function generateContentSliderInnerImagesHtml(e){let n="";for(let i=0;i<e.length;i++){n+=`<div class="swiper-slide">\n            <img src="${e[i].img}" alt="">\n          </div>`}return n}async function GenerateSliderSection(){let e=await getContentSlidersData(),n="";for(let i=0;i<e.length;i++){const t=e[i];let s=generateContentSliderInnerImagesHtml(t.items);n+=`\n          <div class="container">\n              <p>${t.title}</p>\n              <div class="popular-container">            \n                  <div class="swiper-container">\n                    <div class="swiper-wrapper">\n                      ${s}\n                    </div>\n                    \x3c!-- Add Arrows --\x3e\n                      <div class="swiper-button-next"></div>\n                      <div class="swiper-button-prev"></div>\n                  </div>\n              </div>\n          </div>`}document.getElementById("sliders").innerHTML=n}function initializeSwiperSlider(){new Swiper(".swiper-container",{slidesPerView:2,slidesPerGroup:1,centeredSlides:!0,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{600:{slidesPerView:2,slidesPerGroup:2,spaceBetween:5,centeredSlides:!0},900:{slidesPerView:3,slidesPerGroup:3,spaceBetween:5,centeredSlides:!1},1200:{slidesPerView:4,slidesPerGroup:4,spaceBetween:5,centeredSlides:!1},1500:{slidesPerView:5,slidesPerGroup:5,spaceBetween:5,centeredSlides:!1},1800:{slidesPerView:6,slidesPerGroup:6,spaceBetween:5,centeredSlides:!1}}})}async function initSlider(){await GenerateSliderSection(),initializeSwiperSlider()}generateSliderHtml().then((()=>{startTimer()})),initSlider();