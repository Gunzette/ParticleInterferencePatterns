let globd = 2; //in um
let globb = 1; //in um
let globLambda = 0.4; //in um
let globa = 2000; //in mm

var area = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 20;
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "#ff0000"
        document.getElementById("canvasDiv").insertBefore(this.canvas, document.getElementById("canvasDiv").childNodes[0])
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    generatePhoton: function() {
        ctx = this.context;

        let x = randInt(area.canvas.width);
        let xCentered = (x-(area.canvas.width/2));
        let y = randInt(area.canvas.height);
        let I = intensity(posToTheta(xCentered), globLambda, globd, globb)  
        let adjustedIntensity = (I/normAngleWidth(xCentered));
        if(adjustedIntensity >= Math.random()) {
            ctx.fillRect(x, y, 2, 2);
            return 1;
        } else {
            return 0;
        }
    },
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Physics
function intensity(theta, lambda, d, b) {
    let inner = (Math.PI*Math.sin(theta))/lambda;

    if(theta == 0) {
        return (Math.cos(inner*b))**2
    }

    return ((Math.cos(inner*d)**2)*(Math.sin(inner*b)**2))/(inner*b)**2;
}

function posToTheta(posCentered) {
    return Math.atan((posCentered)/globa);
}

function angleWidth(pos) {
    return (posToTheta(pos+0.5) - posToTheta(pos-0.5));
}

function normAngleWidth(pos) {
    return (angleWidth(pos)/angleWidth(0));
}

function randInt(max) {
    return Math.floor(Math.random() * max);
}

// function avgint(max, norm) {
//     let sum = 0;
//     for(let i = 0; i < norm; i++) {
//         sum += randInt(max);
//     }
//     return sum/norm;
// }

async function init() {
    area.start();
    for(let i=0; i<1000; i++) {
        for(let j=0; j<25; j++) {
            area.generatePhoton();
        }
        await sleep(1);
    }   
}
