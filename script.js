const W = 50
const H = 30

let grid = document.querySelector('.grid')
let input = document.querySelector('input')
let draw = document.querySelector('#draw')
let eraser = document.querySelector('#eraser')
let del = document.querySelector('#delete')
let save = document.querySelector('#save')
let fill  = document.querySelector('#fill')
let download  = document.querySelector('#download')
let gridon  = document.querySelector('#grid')
let tools = [draw, eraser , del, save, fill, download, gridon]
let color = input.value
let PENDOWN= false
let GRIDON = true

for(let tool of tools){
    tool.addEventListener('mouseenter', function(){
        if(tool.id!='grid' & !GRIDON){
            tool.style.backgroundColor = 'white'
        }
    })

    tool.addEventListener('mouseleave', function(){
        if(tool.id!='grid' & !GRIDON){
            tool.style.backgroundColor = ''
        }
    })
}
input.addEventListener('input', function(e){
    color=e.target.value
},false)

eraser.addEventListener('click', function(){
    color=grid.style.backgroundColor
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
                console.log(PENDOWN)
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

function save(){
    let pixels = document.querySelectorAll('.pixel')
    let colors = []
    for(let pixel of pixels){
        colors.push(pixel.style.backgroundColor)
    }
}
createGrid(W, H)
grid.addEventListener('mousedown',()=> {PENDOWN = true})
grid.addEventListener('mouseup',()=> {PENDOWN = false})

del.addEventListener('click', function(){
    if(confirm('Вы точно хотите удалить, это удалится навсегда!!')){
        let pixels = document.querySelectorAll('.pixel')
        for(let pixel of pixels){
            pixel.style.backgroundColor = grid.style.backgroundColor
        }
    }
})
fill.addEventListener('click', function(){
    if(confirm('Вы точно хотите закрасить все?')){
        let pixels = document.querySelectorAll('.pixel')
        for(let pixel of pixels){
            pixel.style.backgroundColor = color
        }        
    }

})
gridon.addEventListener('click', function(){
    let pixels = document.querySelectorAll('.pixel')
    let border
    if(GRIDON){
        border = 'none'
        GRIDON = false 
        gridon.style.backgroundColor= 'var(--muted-foreground)'
    }else{
        border = ' 0.5px solid var(--muted-foreground)'
        GRIDON= true
        gridon.style.backgroundColor = 'var(--primary)'

    }
    for(let pixel of pixels){
        pixel.style.border=border
        
    }
})
download.addEventListener('click', function(){
    console.log('click')
    domtoimage.toJpeg(document.querySelector('.grid'), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'pixel.jpeg';
            link.href = dataUrl;
            link.click();
        });
})