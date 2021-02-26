//EDITOR//_____________________________________________________________________________________________
"use strict";

let editor = ace.edit("editor");

editor.setOptions({
    fontSize: 15
});

editor.setTheme("ace/theme/dracula");

editor.session.setMode("ace/mode/javascript");

if (localStorage.getItem("editorCode") !== null) {
    editor.setValue(localStorage.getItem("editorCode"));
}

let editMode = true;

function toggleEditMode(){
    editMode = !editMode;

    document.getElementById("editor-holder").style.bottom = editMode?'10%':'90%';
    document.getElementById("canvas-3d").style.top = editMode?'90%':'10%';

    editor.setReadOnly(!editMode);
    adjustCanvasSize();
    editor.resize()

    if(editMode){ //About to draw
        localStorage.setItem('editorCode', editor.getValue());
    }
}
function arrowSeperationClick(){
    toggleEditMode();
}
function arrowSeperationHover(){
    document.getElementById("arrow-seperation-text").innerHTML = editMode?"Save & Switch to View":"Switch to Editor";
}
function arrowSeperationLeave(){
    document.getElementById("arrow-seperation-text").innerHTML = "⇅";
}

//3D STATE//_____________________________________________________________________________________________
/// <reference path="./p5.global-mode.d.ts" />

let canvasDiv = document.getElementById("canvas-3d");

let canvas;

function adjustCanvasSize(){
    resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
}

function setup() {
    canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight, WEBGL);
    canvas.parent('canvas-3d');
}

function windowResized() {
    adjustCanvasSize();
}

//DRAWING HELPERS

function cube(x,y,z, size=70)
{
translate(x,y,z);
push();
//rotateZ(frameCount * 0.01);
//rotateX(frameCount * 0.01);
//rotateY(frameCount * 0.01);
box(size, size, size);
pop();
translate(-x,-y,-z);
}

function sphere(x,y,z, size=70)
{
    translate(x,y,z);
    push();
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    sphere(size);
    pop();
    translate(-x,-y,-z);
}

function draw() {
    if(!editMode){
        try{
            eval(editor.getValue());
        } catch (e) {
            alert("Error (not as bad as it sounds)\n\n_________________________________\n" + e.message + "\n_________________________________\n\nmore info:\n\n" + e.stack);
            toggleEditMode();
        }
    }else{
        background(255*(1-cos(frameCount/100.0)*cos(frameCount/100.0)*cos(frameCount/100.0)),255*(1-sin(frameCount/100.0)*sin(frameCount/100.0)*sin(frameCount/100.0)),200);
    }
}

/*
function cube(x,y,z)
{
translate(x,y,z);
push();
//rotateZ(frameCount * 0.01);
//rotateX(frameCount * 0.01);
//rotateY(frameCount * 0.01);
box(70, 70, 70);
pop();
translate(-x,-y,-z);

}

orbitControl();

background(250);

normalMaterial();

let yy, xx, zz;
for(yy = 0; yy < 1; ++yy){
    for(xx = -25; xx < 25; ++xx){
        for(zz = -25; zz < 25; ++zz){
            cube(xx*71,200*sin(frameCount/20.0+xx*zz/50.0)+300,zz*71);
        }
    }
}
*/