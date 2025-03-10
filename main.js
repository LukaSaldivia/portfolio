const $ = (selector = '') => document.querySelector(selector)
const _$ = (element = HTMLElement, selector = '') => element.querySelector(selector)
const $$ = (selector = '') => document.querySelectorAll(selector)
const _$$ = (element = HTMLElement, selector = '') => element.querySelectorAll(selector)
const { format } = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ARS', currencyDisplay: 'symbol', maximumFractionDigits: 0 })


const header = $('header');
const projects = $('.projects');
const encripted = $$('.encripted')
const contactBtn = $("#contact_header_btn")
const contact_span = _$(contactBtn, "span")
const optional_links = $(".optional-links")
const checkbox_menuToggle = _$(header, 'input[type="checkbox"]')


const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_.".split('')

let actualScroll = 0

window.addEventListener('scroll', () => {

  // Header scroll behaviour
  const top = Math.min(-(window.scrollY - actualScroll + header.clientHeight), 0)

  if (window.scrollY > actualScroll) {
    actualScroll = window.scrollY
  }

  if (top === 0) {
    actualScroll = window.scrollY + header.clientHeight
  }

  header.setAttribute("style", `--_top-header:${top}px`);
  header.classList.toggle('active', window.scrollY < actualScroll)
  header.classList.toggle('clr', window.scrollY > header.clientHeight)

})




// Project-image hover behaviour

_$$(projects, '.project').forEach((project)=>{
  project.addEventListener('mousemove', ({clientX, clientY}) => {
  let {height, width} = project.getBoundingClientRect()
  let x = clientX / width - .5  
  let y = clientY / height - .5
  project.setAttribute('style', `--_mouse-x : ${x}; --_mouse-y : ${y}`)
})
})

// magnetic contact button
document.addEventListener("mousemove", ({clientX, clientY}) => {
  const { top, left, width, height } = contactBtn.getBoundingClientRect()


  const magneticField = 15

  const calcX = Math.abs(left + width / 2 - clientX) < width / 2 + magneticField 
  const calcY = Math.abs(top + height / 2 - clientY) < height / 2 + magneticField

  if (
    calcX && calcY
  ) {

    let newPosition = {
      x :  Math.min(Math.abs(left + width / 2 - clientX), magneticField) *  Math.sign(left + width / 2 - clientX) * -1,
      y : Math.min(Math.abs(top + height / 2 - clientY), magneticField) *  Math.sign(top + height / 2 - clientY) * -1
    }


    contactBtn.setAttribute("style", `--_magnetic-x:${newPosition.x}; --_magnetic-y: ${newPosition.y}`)

    contactBtn.animate([
      {translate: `${newPosition.x}px ${newPosition.y}px`}
    ], {
      duration : 300,
      fill: "forwards"
    })
    contact_span.animate([
      {translate: `${-newPosition.x/1.5}px ${-newPosition.y/1.5}px`}
    ], {
      duration : 300,
      fill: "forwards"
    })
  }else{
    
    
    contactBtn.animate([
      {translate: `0 0`}
    ], {
      duration : 600,
      easing : "ease-in",
      fill: "forwards"
    })
    contact_span.animate([
      {translate: `0 0`}
    ], {
      duration : 600,
      easing : "ease-in",
      fill: "forwards"
      
    })

  }

})


// ensure content loaded to make all animations
document.addEventListener("DOMContentLoaded", () => {
  $("body").classList.add("complete")

  // hackerType effect

let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hackerType(entry.target, entry.target.textContent)
      observer.unobserve(entry.target)
    }
  })
}, {
  threshold: 0
})

encripted.forEach((el)=>observer.observe(el))
})


// ux on mobile improve on navigation on head link
optional_links.addEventListener("click", ({target}) => {
  if(target.closest("a")){
    checkbox_menuToggle.checked = false
  }
})

function hackerType(element = HTMLElement, originalText = "") {
  const iterations = 15; // Número de iteraciones por letra
  for (let i = 0; i <= originalText.length * iterations; i++) {
    setTimeout(() => {
      let fixedText = originalText.substring(0, Math.floor(i / iterations));
      let randomText = randomizedText(originalText.substring(Math.floor(i / iterations)).length);
      element.textContent = fixedText + randomText;
    }, i * 700 / (originalText.length * iterations));
  }
}

function randomizedText(length = 0){

  let newText = ''

  for (let i = 0; i < length; i++) {
    newText += letters[Math.floor(Math.random() * letters.length)]
    
  }
  

  return newText


}








