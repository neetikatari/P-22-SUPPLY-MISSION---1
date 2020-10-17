// Physics Engine
// PROJECT NAME : SUPPLY MISSION -1
// AIM:  drop supplies and medical kits in the middle of a zombie apocalypse.
// USING: CLASSES AND OBJECT

/*
Package initially created is static, when down arrow is pressed the package is made free falling body.
The helicoptor can be controlled with left and right arrow to move it.
To ensure soft landing the restitution of the package object is set to 0.8, 
package bounces couple of times before coming to halt.
*/

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var package, ground, helicoptor,hImage, pImage ,packageSprite


function preload(){
    hImage =loadImage("helicopter.png");
    pImage = loadImage("package.png")
}

function setup(){

        createCanvas(800,800);
        
        //engine and world creation 
        engine = Engine.create();
        world =engine.world;

        //package BODIES OBJECT - initially static physics object
        var package_options = {
            'isStatic' : true,
            'restitution' : 0.8
        }
        package = Bodies.rectangle(width/2,100,50,50,package_options)
        World . add (world, package)

        //package sprite with image
        packageSprite = createSprite(package.position.x, package.position.y, 10, 10)
        packageSprite.addImage(pImage)
        packageSprite.scale = 0.2


        //ground BODIES OBJECT - static physic object
        var ground_options={
            'isStatic' : true
        }
        ground = Bodies.rectangle(width/2,height-20, 500, 10,ground_options)
        World . add (world, ground)

        //helicoptor sprite
        helicopter = createSprite(400,100,50,50);
        helicopter . addImage(hImage);
        helicopter . scale = 0.7


}

function draw(){
        background(0);

        //update the engine as x and y axis keep changing
        Engine . update (engine);

        //representation of the ground
        fill("green")
        rectMode(CENTER);
        rect(ground.position.x, ground.position.y, 1000, 20);

        //linking the sprite and physics object
        /*Sprites and Bodies behave a little differently.
            For Sprites the x property is directly accessible through the sprite itself.
            On the other hand, a Body has a position attribute which has the X and Y attributes
        */  
        packageSprite.x = package.position.x
        packageSprite.y = package.position.y

        //moving the helicoptor left and right
        if(keyDown("left")){
            helicopter.x -=3;
        }

        if(keyDown("right")){
            helicopter.x +=3;
        }

        drawSprites();
}


//function to drop the package when down arrow is pressed 
function keyPressed() {
    if (keyCode =DOWN_ARROW) {

       //set the body from static to not-static by setting its isStatic property to false.
       Matter.Body.setStatic(package, false);
          
   }
}





















