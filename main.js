const $ = (selector = '') => document.querySelector(selector)
const _$ = (element = HTMLElement, selector = '') => element.querySelector(selector)
const $$ = (selector = '') => document.querySelectorAll(selector)
const _$$ = (element = HTMLElement, selector = '') => element.querySelectorAll(selector)
const { format } = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ARS', currencyDisplay: 'symbol', maximumFractionDigits: 0 })


const header = $('header');
const projects = $('.projects');
const about_role = $('.about-me span.bold')
const about_original_text = about_role.textContent
const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_.".split('')

let actualScroll = 0

window.addEventListener('scroll', () => {

  // Header scroll behaviour
  headerBehaviour()

})


function headerBehaviour() {
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
}

function hackerType(element = HTMLElement, iteration = 0){

  if (iteration <= element.textContent.length) {
    let fixedText = about_original_text.substring(0, iteration)
    let randomText = randomizedText(element.textContent.substring(iteration))
    element.textContent = fixedText + randomText
    setTimeout(() => hackerType(element, iteration + 1), 50)
  }


}

function randomizedText(text = ""){

  let newText = ''

  text.split('').forEach(() => {
    newText += letters[Math.floor(Math.random() * letters.length)]
  })

  return newText


}

let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hackerType(entry.target)
    }
  })
})

observer.observe(about_role)


_$$(projects, '.project').forEach((project)=>{
  project.addEventListener('mousemove', ({clientX, clientY}) => {
  let {height, width} = project.getBoundingClientRect()
  let x = clientX / width - .5  
  let y = clientY / height - .5
  project.setAttribute('style', `--_mouse-x : ${x}; --_mouse-y : ${y}`)
})
})

