

    const target = document.getElementById('move-with-mouse')
    const dataSection = document.getElementById('data')
    const targetRect = target.getBoundingClientRect()
    let listenerState
    const getData = (e) =>{
        const data = {
            target:target.offsetTop,
            targetCenterX: target.offsetLeft + (target.offsetWidth / 2),
            targetCenterY: target.offsetTop + (target.offsetHeight / 2),
            mouseX:e.clientX,
            mouseY:e.clientY
        }
        return data
    }
    // use to display data being tracked
    const setData = (data) => {
        const {mouseX, mouseY, targetCenterX, targetCenterY, window, target} = data
        dataSection.innerText = 
        `
        target: ${targetRect} \n

        mouse location: ${mouseX}, ${mouseY} \n
        targetDimensions: ${targetCenterX}, ${targetCenterY}
        `
    }
    
    const rotateBox = (data) => {
        const {mouseX, mouseY, targetCenterX, targetCenterY} = data; 
        let x = (mouseX - targetCenterX) / 50
        let y = (mouseY - targetCenterY) / 50
        target.style = `--x:${x}deg; --y:${y}deg;`
        console.log('x:'+x+', y:'+y)
    }
    const watchmouse = (e) => {
        const data = getData(e)
        setData(data)
        rotateBox(data);
    }
    const cleanUp = () =>{
        target.style=null
    }
 
    
const watchPostion = () =>{
    const targetRect = target.getBoundingClientRect()   
    const windowHieght =  window.innerHeight
    if( targetRect.y >= -1 && windowHieght >= targetRect.y){
        if(listenerState) return
        listenerState = true
        window.addEventListener('mousemove',watchmouse);
        window.addEventListener('mouseout', cleanUp)
    }else{
        listenerState = false
        window.removeEventListener('mousemove', watchmouse);
        window.removeEventListener('mouseout', cleanUp)

    }

}

window.addEventListener('scroll', watchPostion)


