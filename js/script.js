let canvas = document.getElementById('cvs');
let ctx = canvas.getContext('2d');
let freeDraw = document.querySelector('.pen');
let line = document.querySelector('.line');
let square = document.querySelector('.square');
let circle = document.querySelector('.circle');
let eraser = document.querySelector('.eraser');
let reload = document.querySelector('.reload');
let fillInput = document.getElementById('fill');
let strokeInput = document.getElementById('stroke');
let lineInput = document.getElementById('lineInput');

line.addEventListener('click', () => mode = 'line');
freeDraw.addEventListener('click', () => mode = 'freehand');
square.addEventListener('click', () => mode = 'square');
circle.addEventListener('click', () => mode = 'circle');
eraser.addEventListener('click', () => mode = 'erase');
reload.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
fillInput.addEventListener('change', () => fillColor = fillInput.value);
strokeInput.addEventListener('change', () => strokeColor = strokeInput.value);
lineInput.addEventListener('change', () => strokeWidth = lineInput.value);

let mode = 'line';
let fillColor = 'white';
let strokeColor = 'black';
let strokeWidth = '2'; ////////////// need input for it

let drawFlag = false;
let startPoint = { x: 0, y: 0 }; //start point
let endPoint = { x: 0, y: 0 }; //end point

canvas.addEventListener('mousedown', (e) => {
    if (mode == 'line') {
        ctx.beginPath();
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;
        ctx.moveTo(startPoint.x, startPoint.y);
    }
    else if (mode == 'freehand') {
        ctx.beginPath();
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;
        ctx.moveTo(startPoint.x, startPoint.y);
        drawFlag = true;
    }
    else if (mode == 'square') {
        ctx.beginPath();
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;
    }
    else if (mode == 'circle') {
        ctx.beginPath();
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;
    }
    else if (mode == 'erase') {
        ctx.beginPath();
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;
        ctx.moveTo(startPoint.x, startPoint.y);
        drawFlag = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (mode == 'freehand') {
        if (drawFlag) {
            endPoint.x = e.offsetX;
            endPoint.y = e.offsetY;
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
        }
    }
    if (mode == 'erase') {
        if (drawFlag) {
            endPoint.x = e.offsetX;
            endPoint.y = e.offsetY;
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
        }
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (mode == 'line') {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    } 
    else if (mode == 'freehand') {
        drawFlag = false;
    }
    else if (mode == 'square') {
        endPoint.x = e.offsetX;
        endPoint.y = e.offsetY;
        ctx.rect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fillRect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
    }
    else if (mode == 'circle') {
        endPoint.x = e.offsetX;
        endPoint.y = e.offsetY;
        let rad = getDistance(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
        ctx.arc(startPoint.x, startPoint.y, rad, 0, 2 * Math.PI);  //(x,y,rad,start angle,end angle)
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    else if (mode == 'erase') {
        drawFlag = false;
    }
});

function drawSquare() {
    console.log('draw square');
    ctx.beginPath()
    ctx.rect(0,0,150,75)  //(x,y,width,height)
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle=strokeColor;
    ctx.stroke()
    ctx.fillStyle=fillColor;
    ctx.fillRect(0,0,150,75)
}

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;    
    return Math.sqrt(x * x + y * y);
}