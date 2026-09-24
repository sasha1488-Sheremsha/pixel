const W = 50
const H = 30

let grid = document.querySelector('.grid')
let input = document.querySelector('input')
let draw = document.querySelector('#draw')
let eraser = document.querySelector('#eraser')
let del = document.querySelector('#delete')
let save = document.querySelector('#save')
let fill  = document.querySelector('#fill')
let tools = [draw, eraser , del, save, fill]
let color = input.value
let PENDOWN= false

for(let tool of tools){
    tool.addEventListener('mouseenter', function(){
        tool.style.backgroundColor = 'white'
    })

    tool.addEventListener('mouseleave', function(){
        tool.style.backgroundColor = ''
    })
}
input.addEventListener('input', function(e){
    color=e.target.value
},false)

eraser.addEventListener('click', function(){
    color=grid.style.backgroundColor
})
grid.addEventListener('mousedown', function(){
    PENDOWN-true
})
grid.addEventListener('mouseup', function(){
    PENDOWN-false
})



function createGrid(w, h){
    grid.style.gridTemplateColumns = `repeat(${w}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${h}, 1fr)`

    for (let i = 0; i < h; i++){
        for (let j = 0; j < w; j++){

            let pixel = document.createElement('div')
            pixel.classList.add('pixel')
            pixel.id = `${i}-${j}`

            pixel.addEventListener('mouseover', function(){
                if(PENDOWN){
                    pixel.style.backgroundColor = color
                }
            })

            pixel.addEventListener('click', function(){
                pixel.style.backgroundColor = color
            })

            grid.appendChild(pixel)
        }
    }
}
createGrid(W, H)