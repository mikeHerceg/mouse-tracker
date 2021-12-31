
function mouseEffect(targetId) {
    this.target = document.getElementById(targetId)
    this.dataSection = document.getElementById('data')
    this.listenerState = false
    const getData = (e) =>{
        const data = {
            target:this.target.offsetTop,
            targetCenterX: this.target.offsetLeft + (this.target.offsetWidth / 2),
            targetCenterY: this.target.offsetTop + (this.target.offsetHeight / 2),
            mouseX:e.clientX,
            mouseY:e.clientY
        }
        return data
    }
    // use to display data being tracked
    const setData = (data) => {
        const {mouseX, mouseY, targetCenterX, targetCenterY, window, target} = data
        this.dataSection.innerText = 
        `
        mouse location: ${mouseX}, ${mouseY} \n
        targetDimensions: ${targetCenterX}, ${targetCenterY}
        `
    }
    
    const rotateBox = (data) => {
        const {mouseX, mouseY, targetCenterX, targetCenterY} = data; 
        let x = (mouseX - targetCenterX) / 50
        let y = (mouseY - targetCenterY) / 50
        this.target.style = `--x:${x}deg; --y:${y}deg;`
        console.log('x:'+x+', y:'+y)
    }
    const watchmouse = (e) => {
        const data = getData(e)
        setData(data)
        rotateBox(data);
    }
    const cleanUp = () =>{
        this.target.style=null
    }
     
    
    const watchPostion = () =>{
        const targetRect = this.target.getBoundingClientRect()   
        const windowHieght =  window.innerHeight
        if( targetRect.y >= -1 && windowHieght >= targetRect.y){
            if(this.listenerState) return
            this.listenerState = true
            window.addEventListener('mousemove',watchmouse);
            window.addEventListener('mouseout', cleanUp)
        }else{
            this.listenerState = false
            window.removeEventListener('mousemove', watchmouse);
            window.removeEventListener('mouseout', cleanUp)
        }
    
    }
    
    this.intilize = window.addEventListener('scroll', watchPostion)
    
}


const main = new mouseEffect('move-with-mouse')
main.intilize


