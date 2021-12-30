
const target = document.getElementById('move-with-mouse')
const mouse = document.onmousemove
const dataSection = document.getElementById('data')


function setData(data) {
    const {mouseX, mouseY, targetX, targetY} = data
    dataSection.innerText = 
    `
    mouse location: ${mouseX}, ${mouseY} \n
    targetDimensions: ${targetX}, ${targetY}
    `
}
function rotateBox(data){
    let x = (data.mouseX) / 50
    if(data.mouseX < data.targetX){
        x = -x
    }

    let y = (data.mouseY) / 50
    if(data.mouseY > data.targetY){
        y = -y
    }

    target.style = `--x:${x}deg; --y:${y}deg;`
    console.log(
        'x:'+x+', y:'+y
    )
}
function watchmouse(e){
    const data = {
        targetX:target.offsetLeft + target.offsetWidth / 2,
        targetY:target.offsetTop + target.offsetHeight / 2,
        
        mouseX:e.clientX,
        mouseY:e.clientY

    }
    setData(data)
    rotateBox(data);
}
window.addEventListener('mousemove', (e) => watchmouse(e) );