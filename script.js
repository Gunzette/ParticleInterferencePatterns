let globg = 2; //in um
let globl = 1; //in um
let globLambda = 0.4; //in um
let globa = 2000; //in mm
// pixels are mm

let globTicks = 1000; // total number of display ticks
let globFreq = 15; // in kHz (inaccurate by 1%-20% lower depending on pattern)
let globTimeVis = false; // true: "realisitic" mode; false: instant mode

let globColor = "#ff0000" // Color of Photon Impacts

var area = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 20;
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = globColor;
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
        let I = intensity(posToTheta(xCentered), globLambda, globg, globl)  
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
function intensity(theta, lambda, g, l) {
    let inner = (Math.PI*Math.sin(theta))/lambda;

    if(theta == 0) {
        return (Math.cos(inner*l))**2
    }

    return ((Math.cos(inner*g)**2)*(Math.sin(inner*l)**2))/(inner*l)**2;
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

function assignGlobs() {
    document.getElementById("lambda").value = globLambda * 1000;
    document.getElementById("g").value = globg;
    document.getElementById("l").value = globl;
    document.getElementById("a").value = globa / 10;
    document.getElementById("Ticks").value = globTicks;
    document.getElementById("f").value = globFreq;
    document.getElementById("im").checked = !(globTimeVis);
    document.getElementById("col").value = globColor;
}

function reassignGlobs() {
    globLambda = Number(document.getElementById("lambda").value) / 1000;
    globg = Number(document.getElementById("g").value);
    globl = Number(document.getElementById("l").value);
    globa = Number(document.getElementById("a").value) * 10;
    globTicks = Number(document.getElementById("Ticks").value);
    globFreq = Number(document.getElementById("f").value);
    globTimeVis = !(document.getElementById("im").checked);
    globColor = document.getElementById("col").value;
}

async function init() {
    area.start();
    assignGlobs();
    for(let i=0; i<globTicks; i++) {
        for(let j=0; j<globFreq; j++) {
            while(!(area.generatePhoton())) {} // Wait until valid Photon
        }
        //await sleep(1);
    }   
}

async function reinit() {
    area.clear();
    reassignGlobs();
    area.context.fillStyle = globColor;
    for(let i=0; i<globTicks; i++) {
        for(let j=0; j<globFreq; j++) {
            while(!(area.generatePhoton())) {} // Wait until valid Photon
        }
        if(globTimeVis) {
            await sleep(1);
        }
    }
}