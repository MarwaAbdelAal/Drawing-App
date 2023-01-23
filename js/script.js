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
let strokeWidth = '2';

let drawFlag = false;
let startPoint = { x: 0, y: 0 }; //start point
let endPoint = { x: 0, y: 0 }; //end point

canvas.addEventListener('mousedown', (e) => {
    ctx.beginPath();
    startPoint.x = e.offsetX;
    startPoint.y = e.offsetY;
    if (mode == 'line' || mode == 'freehand' || mode == 'erase') {
        ctx.moveTo(startPoint.x, startPoint.y);
        if(mode != 'line'){ drawFlag = true; }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (mode == 'freehand' || mode == 'erase') {
        if (drawFlag) {
            endPoint.x = e.offsetX;
            endPoint.y = e.offsetY;
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = mode == 'erase' ? 'white' : strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
        }
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (mode == 'freehand' || mode == 'erase') {
        drawFlag = false;
    }
    else if (mode == 'line' || mode == 'square' || mode == 'circle') {
        endPoint.x = e.offsetX;
        endPoint.y = e.offsetY;
        
        if (mode == 'line') {
            ctx.lineTo(endPoint.x, endPoint.y);
        }
        else if(mode == 'square'){
            ctx.rect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
            ctx.fillStyle = fillColor;
            ctx.fillRect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
        }
        else{
            let rad = getDistance(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
            ctx.arc(startPoint.x, startPoint.y, rad, 0, 2 * Math.PI);  //(x,y,rad,start angle,end angle)
            ctx.fillStyle = fillColor;
            ctx.fill();    
        }
        
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
});

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;    
    return Math.sqrt(x * x + y * y);
}