const $ = (selector = '') => document.querySelector(selector)
const _$ = (element = HTMLElement, selector = '') => element.querySelector(selector)
const $$ = (selector = '') => document.querySelectorAll(selector)
const _$$ = (element = HTMLElement, selector = '') => element.querySelectorAll(selector)
const { format } = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ARS', currencyDisplay: 'symbol', maximumFractionDigits: 0 })


const header = $('header');
const projects = $('.projects');
const encripted = $$('.encripted')
const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_.".split('')

let actualScroll = 0

window.addEventListener('scroll', () => {

  // Header scroll behaviour
  headerBehaviour()

})

// hackerType effect

let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hackerType(entry.target, entry.target.textContent)
    }
  })
})

encripted.forEach((el)=>observer.observe(el))


// Project-image hover behaviour

_$$(projects, '.project').forEach((project)=>{
  project.addEventListener('mousemove', ({clientX, clientY}) => {
  let {height, width} = project.getBoundingClientRect()
  let x = clientX / width - .5  
  let y = clientY / height - .5
  project.setAttribute('style', `--_mouse-x : ${x}; --_mouse-y : ${y}`)
})
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

function hackerType(element = HTMLElement, originalText = ""){

  for (let i = 0; i <= originalText.length; i++) {

    setTimeout(() => {
      let fixedText = originalText.substring(0, i)
      let randomText = randomizedText(element.textContent.substring(i))
      element.textContent = fixedText + randomText
    }, i * 750 / originalText.length)

  }

}

function randomizedText(text = ""){

  let newText = ''

  text.split('').forEach(() => {
    newText += letters[Math.floor(Math.random() * letters.length)]
  })

  return newText


}








