var webcam;

var vScale;

var enviro = [];

function setup() {
    pixelDensity(.5);
    
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    
    vScale = height/240;
    
    webcam = createCapture(VIDEO);
    webcam.size(160,120);
    webcam.position(0,0);
    
    webcam.hide();
    
    captureBackground();
    
    var resetButton = createButton("capture me");
    resetButton.id("reset");
    resetButton.mousePressed(captureBackground);
    
    var saveButton = createButton("save image");
    saveButton.id("save");
    saveButton.mousePressed(savePicture);
    
    setInterval(captureBackground,1000*60*20);
}

function savePicture(){
    save("traces.png");
}

function captureBackground(){
    enviro = [];
    
    webcam.loadPixels();
    
    for (var y = 0; y < webcam.height; y++){
        for (var x = 0; x < webcam.width; x++){
            var index = (x +(y*webcam.width))*4;
            var bAdjust = 0;
            enviro.push(webcam.pixels[index] + bAdjust);
            enviro.push(webcam.pixels[index+1] + bAdjust);
            enviro.push(webcam.pixels[index+2] + bAdjust);
            enviro.push(webcam.pixels[index+3]);
        }
    }
}

function draw() {
    webcam.loadPixels();
    loadPixels();
    
    for (var y = 0; y < webcam.height; y++){
        for (var x = 0; x < webcam.width; x++){
            var index = (x +(y*webcam.width))*4;
            var indexM = (webcam.width - x + (y*webcam.width))*4;
            for (var i = 0; i < 4; i++){
            pixels[indexM+i] = webcam.pixels[index+i];
            }
        }
    }
    
    if (captureBackground){
        for (var y = 0; y < webcam.height; y++){
            for (var x = 0; x < webcam.width; x++){
                
                var index = (x + (y*webcam.width))*4;
                var indexM = (webcam.width - x + (y*webcam.width))*4;
                
                var enviroBrightness = (enviro[index] + enviro[index+1] + enviro[index+2])/3;
                var brightness = (webcam.pixels[index] + webcam.pixels[index+1] + webcam.pixels[index+2])/3;

                bLimit = 50;
                
                if (brightness <= enviroBrightness + bLimit && brightness >= enviroBrightness - bLimit){
                    //pixels[indexM+3] = 0;
                    pixels[indexM] = enviro[index];
                    pixels[indexM + 1] = enviro[index + 1];
                    pixels[indexM + 2] = enviro[index + 2];
                    }
                }
            }
        }
    
    
    updatePixels();
}