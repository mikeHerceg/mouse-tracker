
const target = document.getElementById('move-with-mouse')
const mouse = document.onmousemove
const dataSection = document.getElementById('data')


const setData = (data) => {
    const {mouseX, mouseY, targetCenterX, targetCenterY} = data
    dataSection.innerText = 
    `
    mouse location: ${mouseX}, ${mouseY} \n
    targetDimensions: ${targetCenterX}, ${targetCenterY}
    `
}
const rotateBox = (data) => {
    const {mouseX, mouseY, targetCenterX, targetCenterY} = data; 
    let x = (mouseX - targetCenterX) / 50
    let y = (mouseY - targetCenterY) / 50
    target.style = `--x:${x}deg; --y:${y}deg;`
    console.log(
        'x:'+x+', y:'+y
    )
}
const watchmouse = (e) => {
    const data = {
        targetCenterX:target.offsetLeft + target.offsetWidth / 2,
        targetCenterY:target.offsetTop + target.offsetHeight / 2,
        mouseX:e.clientX,
        mouseY:e.clientY
    }
    setData(data)
    rotateBox(data);
}
window.addEventListener('mousemove', (e) => watchmouse(e) );
window.addEventListener('mouseout',()=>target.style=null)