const app = document.getElementById("draw");

let curTool = "marker";
let canvas = document.createElement("canvas");
const clr = btn("clear","danger");
const tool = btn(curTool,"info","tool");
const prediction = btn("prediction","success")
const canvasWidth = "280";
const canvasHeight = "280";
let clickX = [];
let clickY = [];
let clickDrag = [];
let clickTool = [];
let clickColor = [];

let paint;
function btn(val,type,id=val) {
    const clr = document.createElement("button");
    clr.innerText = val;
    clr.setAttribute("class", "btn btn-" + type);
    clr.setAttribute("id", id);
    return clr;

}
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("id", "canvas");
let p =document.createElement("p");
let reponse = document.createElement("p");
reponse.setAttribute("id", "reponse")
p.appendChild(clr);
p.appendChild(tool);
p.appendChild(prediction);
app.appendChild(canvas);
app.appendChild(reponse);
app.appendChild(p);
if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
const context = canvas.getContext("2d");
document.querySelector("#clear").addEventListener('click',()=>{
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    clickX = [];
    clickY = [];
    clickDrag = [];
    clickTool = [];
    clickColor = [];

});
document.querySelector("#tool").addEventListener("click",effacer);
document.querySelector("#canvas").addEventListener("mousedown",mouvedown);

document.querySelector("#canvas").addEventListener("mousemove",mousemove);

document.querySelector("#canvas").addEventListener("mouseup",mouse);

document.querySelector("#canvas").addEventListener("mouseleave",mouse);
document.querySelector("#prediction").addEventListener("click",predict)
function mouse(){
    paint = false;
}
function mousemove(e){
    if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
}
function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
    if(curTool === "effacer"){
        clickColor.push("#000000");
    }else{
        clickColor.push("#ffffff");
    }
    clickTool.push(curTool);
}

function mouvedown(e){
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
}

function effacer() {
    if (curTool === "effacer"){
        tool.innerText = "marker";
        curTool = "marker";
    }
    else {
        tool.innerText = "effacer";
        curTool = "effacer";
    }
}

function redraw(){

    context.clearRect(0, 0, canvasWidth, canvasHeight); // Clears the canvas
    context.lineJoin = "round";
    context.lineWidth = 5;
              
    for(let i=0; i < clickX.length; i++) {
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
      context.lineWidth = 20;
      context.strokeStyle = clickColor[i];
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
    }
}

async function predict() {
    let response = await fetch("/predict", {
        method: 'POST',
        headers: {
            'X-Requested-With': 'xmlhttprequest',
        },
        body: await resizedataURL(canvas.toDataURL(),28,28)
    });
	msg = await response.json()
    document.querySelector("#reponse").innerHTML = msg.message
}

function resizedataURL(datas, wantedWidth, wantedHeight){
    return new Promise(async function(resolve,reject){

        // We create an image to receive the Data URI
        var img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = function()
        {
            // We create a canvas and get its context.
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width = wantedWidth;
            canvas.height = wantedHeight;

            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

            var dataURI = canvas.toDataURL();

            // This is the return of the Promise
            resolve(dataURI);
        };

        // We put the Data URI in the image's src attribute
        img.src = datas;

    })
}
