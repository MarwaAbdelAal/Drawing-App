let canvas = document.getElementById('cvs');
let ctx = canvas.getContext('2d');
let freeDraw = document.querySelector('.pen');
let line = document.querySelector('.line');
let square = document.querySelector('.square');
let circle = document.querySelector('.circle');
let eraser = document.querySelector('.eraser');
let fillInput = document.getElementById('fill');
let strokeInput = document.getElementById('stroke');

line.addEventListener('click', () => mode = 'line');
freeDraw.addEventListener('click', () => mode = 'freehand');
square.addEventListener('click', drawSquare);
circle.addEventListener('click', drawCircle);
eraser.addEventListener('click', erase);
fillInput.addEventListener('change', () => fillColor = fillInput.value);
strokeInput.addEventListener('change', () => strokeColor = strokeInput.value);

let mode = 'line';
let fillColor = 'black';
let strokeColor = 'black';

let startPoint = { x: 0, y: 0 };
let drawFlag = false;
let sp = { x: 0, y: 0 }; //start point
let ep = { x: 0, y: 0 }; //end point

canvas.addEventListener('mousedown', (e) => {
    if (mode == 'line') {
        ctx.beginPath();
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;
        ctx.moveTo(startPoint.x, startPoint.y);
    }
    else if (mode == 'freehand') {
        ctx.beginPath();
        sp.x = e.offsetX;
        sp.y = e.offsetY;
        ctx.moveTo(sp.x, sp.y);
        drawFlag = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (mode == 'freehand') {
        if (drawFlag) {
            ep.x = e.offsetX;
            ep.y = e.offsetY;
            ctx.lineTo(ep.x, ep.y);
            ctx.strokeStyle = strokeColor;
            ctx.stroke();
        }
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (mode == 'line') {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    } 
    else if (mode == 'freehand') {
        drawFlag = false;
    }
});

function drawSquare() {
    console.log('draw square');
    ctx.beginPath()
    ctx.rect(0,0,150,75)  //(x,y,width,height)
    ctx.lineWidth="3"
    // ctx.strokeStyle=strokeColor;
    // ctx.stroke()
    ctx.fillStyle=fillColor;
    ctx.fillRect(150,150,150,75)
}

function drawCircle() {
    console.log('draw circle');
}

function erase() {
    console.log('eraser');
}

function fillStyle() {
    strokeColor = fillInput.value;
}

function strokeStyle() {
    console.log('stroke Style');
}
