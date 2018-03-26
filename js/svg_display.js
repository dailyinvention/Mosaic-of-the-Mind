document.addEventListener('DOMContentLoaded', function() {
  const svgns = 'http://www.w3.org/2000/svg'

  // Select the SVG element
  let svg = document.getElementById('svgGrid')
  let svgBound = svg.getBoundingClientRect()
  console.log(svgBound)

  // Get devisor loaded from refs
  const heightDivisor = document.getElementById('y-divisor').getAttribute('param')
  const widthDivisor = document.getElementById('x-divisor').getAttribute('param')

  // Function fades in random cells
  let randomFadeIn = () => {
    const fadeDuration = document.getElementById('fade-delay').getAttribute('param')
    // Load all hidden cells
    let cells = document.getElementsByClassName('hidden-cell')
    // Pick random number from cell count
    let randomNum = Math.floor(Math.random() * Math.floor(cells.length - 1))
    
    // If all cells have been processed, end function
    if (!cells[0]) {
      return true
    }
    
    let element = cells[randomNum]
    setTimeout(() => {
      // Remove cell from hidden cells class
      element.classList.remove('hidden-cell')
      element.classList.add('visible-cell')
      element.style.animation = 'fadeIn .5s ease-in 1 forwards'
      randomFadeIn()
    }, fadeDuration)

  }

  // Define parameters
  let rectParams = {
    rectHeight: svgBound.height/(parseInt(heightDivisor) + 1),
    rectWidth: svgBound.width/(parseInt(widthDivisor) + 1),
    widthFill: 0,
    heightFill: 0,
    widthIdx: 0,
    heightIdx: 0,
  }

  let id = 0

  // Loop through the height until bounding box is reached
  while (rectParams.heightFill < svgBound.height) {
    rectParams.heightIdx++
    rectParams.widthFill = 0
    rectParams.widthIdx = 0
    // Loop through width until the bounding box is reached
    while (rectParams.widthFill < svgBound.width) {
      rectParams.widthIdx++
      // Add the grid squares
      let gridsquare = document.createElementNS(svgns, 'rect')
      gridsquare.setAttributeNS(null, 'x', rectParams.widthIdx * rectParams.rectWidth - 1)
      gridsquare.setAttributeNS(null, 'y', rectParams.heightIdx * rectParams.rectHeight - 1)
      gridsquare.setAttributeNS(null, 'height', rectParams.rectHeight)
      gridsquare.setAttributeNS(null, 'width', rectParams.rectWidth)
      gridsquare.setAttributeNS(null, 'stroke', 'black')
      gridsquare.setAttributeNS(null, 'fill', 'white')
      gridsquare.id = id
      gridsquare.setAttribute('class', 'hidden-cell')
      svg.appendChild(gridsquare)
      id++
      rectParams.widthFill += rectParams.rectWidth + 1
    }
    rectParams.heightFill += rectParams.rectHeight + 1
  }

  randomFadeIn()
  
}, false)

