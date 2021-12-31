
function mouseEffect(targetId) {
    //intial values
    this.target = document.getElementById(targetId)
    this.targetRect = this.target.getBoundingClientRect()
    this.dataSection = document.getElementById('data')
    this.listenerState = false
    this.data ={
        target: this.targetRect.top,
        targetCenterX: this.targetRect.left + (this.targetRect.width / 2),
        targetCenterY: this.targetRect.top + (this.targetRect.height / 2),
        mouseX: this.targetCenterX,
        mouseY: this.targetCenterY,
    }
    //intial values end
    const getTargetData = () =>{
        this.data = {
            ...this.data,
            target: this.targetRect.top,
            targetCenterX: this.targetRect.left + (this.targetRect.width / 2),
            targetCenterY: this.targetRect.top + (this.targetRect.height / 2),
        }
        //setData()
    }
    const getMouseData = (e) =>{
        this.data = {
            ...this.data,
            mouseX: e.clientX,
            mouseY: e.clientY,
        }
        //setData()
    }
    // use to display data being tracked
    const setData = () => {
        const {mouseX, mouseY, targetCenterX, targetCenterY} = this.data
        this.dataSection.innerText = 
        `
        mouse location: ${mouseX}, ${mouseY} \n
        targetDimensions: ${targetCenterX}, ${targetCenterY}
        `
    }
    const rotateBox = () => {
        const {mouseX, mouseY, targetCenterX, targetCenterY} = this.data; 
        let x = (mouseX - targetCenterX) / 40
        let y = (mouseY - targetCenterY) / 40
        this.target.style = `--x:${x}deg; --y:${y}deg;`
    }
    
    const cleanUp = () =>{
        this.target.style=null
    }

    const watchPage = () =>{
        this.targetRect = this.target.getBoundingClientRect()   
        //console.log(this.targetRect)
        const windowHieght =  window.innerHeight
        const targetTop = this.targetRect.y        
        const targetBottom = this.targetRect.y + this.targetRect.height
        if( targetBottom >= -1 && windowHieght >= targetTop){
            if(this.listenerState) return
            this.listenerState = true
            window.addEventListener('scroll',getTargetData);
            window.addEventListener('scroll', rotateBox);  
            window.addEventListener('mousemove', rotateBox);
            window.addEventListener('mousemove',getMouseData);                      
            window.addEventListener('mouseout', cleanUp)
        }else{
            this.listenerState = false
            window.removeEventListener('scroll', rotateBox);
            window.removeEventListener('mousemove', rotateBox);
            window.removeEventListener('mouseout', cleanUp)
        }
    }

    this.intilize = window.addEventListener('scroll', watchPage)
}


const main = new mouseEffect('move-with-mouse')
main.intilize
console.log(main)

