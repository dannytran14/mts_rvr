
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum HasNot {
    Has_Not, 
    Has
}

enum Colour{
    Red, 
    Green, 
    Blue, 
    Orange, 
    Yellow, 
    Pink, 
    Purple, 
    Brown, 
    Black, 
    White
}
let degree: number = 0
let delay: number = 1500
let position: number = -1
/**
 * Custom blocks
 */
//% weight=1000 color=#000000 icon=""
namespace MTS_RVR {
    /**
     * Changes the HuskyLens to object tracking mode. 
     */
    //% subcategory=Initialise
    //% blockGap=8
    //% block="start up"
    export function Start_Up(): void {
        sphero.resetYaw()
        //huskylens.initI2c()
        //huskylens.request();
        //huskylens.readeBox_index(1, 1, Content1.xCenter);
        position = -1
        degree = 0
        delay = 1500
        sphero.setAllLeds(255, 250, 147)
        basic.pause(1000)
    }

    /**
     * Changes the HuskyLens to object tracking mode. 
     */
    //% subcategory=HuskyLens
    //% blockGap=8
    //% block="change to object tracking"
    export function Object_Tracking_Mode(): void {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
        huskylens.request()
        huskylens.request()
    }

    /**
     * Changes the HuskyLens to tag recognition mode
     */
    //% subcategory=HuskyLens
    //% blockGap=8
    //% block="change to tag recognition"
    export function Tag_Tracking_Mode(): void {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
        huskylens.request()
        huskylens.request()
    }
    /**
     * Changes the HuskyLens to tag recognition mode
     */
    //% subcategory=Initialise
    //% blockGap=8
    //% block
    export function Output(): void {
        huskylens.writeOSD(delay.toString(), 150, 30)
    }
    
    /**
     * The RVR will perform a slow movement. 
     */
    //% subcategory=Movement
    //% blockGap=8
    //% block="move at speed $speed"
    //% speed.min=1 speed.max=10
    export function Move(speed: number) :void {
        speed = speed * 6;
        if (speed > 60){
            speed = 60
        }
        sphero.drive(speed, degree)
        basic.pause(delay)
    }

    /**
     * The RVR will move in the heading specified. 
     */
    //% subcategory=Movement
    //% blockGap=8
    //% block="turn %heading degrees"
    //% heading.min=-180 heading.max=180
    export function Turn(heading: number): void {
        degree += heading
        if (degree > 359){
            degree -= 360
        }
        else if (degree < 0){
            degree += 360
        }
        sphero.drive(0, degree)
        basic.pause(1000)
    }

    /**
     * The RVR will stop.  
     */
    //% subcategory=Movement
    //% blockGap=8
    //% block
    //% heading.min=0 heading.max=359
    export function Stop(): void {
        sphero.drive(0, degree)
    } 

    /**
     * Will return a true value once the RVR has reached its pick up distance. 
     */
    //% subcategory=Sonar
    //% blockGap=8
    //% block="sonar %not detected pick up range"
    export function SonarPickUpRange(not: HasNot): boolean {
        delay = 100; 
        if (not == HasNot.Has) {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 8) {
            return true;
            }
            else
                return false
        }
        else{
            if (grove.measureInCentimeters(DigitalPin.P15) <= 8) {
            return false;
            }
            else{
                return true
            }
        }

    }

     /**
     * The Sonar will return a true value once it detects that the RVR should slow down once it detects a collision ahead. 
     */
    //% block="sonar %not detected a collision"
    //% subcategory=Sonar
    //% blockGap=8
    export function SonarCollision(not: HasNot): boolean {
        delay = 100; 
        if (not == HasNot.Has) {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 20) {
            return true;
            }
            else
                return false
        }
        else{
            if (grove.measureInCentimeters(DigitalPin.P15) <= 20) {
            return false;
            }
            else{
                return true
            }
        }
    }

    /**
     * The Sonar will return a true value once it detects that the RVR should slow once it detects an object. 
     */
    //% block="sonar %not detected an object"
    //% subcategory=Sonar
    //% blockGap=8
    export function SonarObject (not: HasNot): boolean {
        delay = 100; 
        if (not == HasNot.Has) {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 25) {
            return true;
            }
            else
                return false
        }
        else{
            if (grove.measureInCentimeters(DigitalPin.P15) <= 25) {
            return false;
            }
            else{
                return true
            }
        }
    }

    

    /**
     * The RVR will rotate until the object is centred on the HuskyLens. 
     */
    //% subcategory=HuskyLens
    //% blockGap=8
    //% block="centre object on screen"
    export function H_Centre_Object_On_Screen(): void {
        let position : number;
        huskylens.request()
        position = huskylens.readBox_s(Content3.xCenter)
        while ((position < 145 || position > 175) && position != -1) {
            position = huskylens.readBox_s(Content3.xCenter)
            huskylens.writeOSD(position.toString(), 150, 30)
            huskylens.request()
            if (position < 90) {
                MTS_RVR.Turn(-15)
            } else if (position < 120) {
                MTS_RVR.Turn(-10)
            } else if (position < 145) {
                MTS_RVR.Turn(-5)
            } else if (position > 230) {
                MTS_RVR.Turn(15)
            } else if (position > 200) {
                MTS_RVR.Turn(10)
            } else if (position > 175) {
                MTS_RVR.Turn(5)
            }
            basic.pause(300)
            huskylens.request()
        }
    }

    /**
     * The HuskyLens will return a true value once a object is detected its screen. 
     */
    //% block="husky %not located object"
    //% subcategory=HuskyLens
    //% blockGap=8
    export function HuskyTargetLocated (not: HasNot) : boolean {
        delay = 100
        let position: number;
        huskylens.request();
        position = huskylens.readBox_s(Content3.xCenter)
        if (not == HasNot.Has){
            if (position == -1) 
                return false
            else 
                return true
        }   
        else{
            if (position == -1) 
                return true
            else 
                return false
        }
    }

     /**
     * HuskyLens checks whether home has been located.
     */
    //% subcategory=HuskyLens
    //% blockGap=8
    //% block="husky %not located home "
    export function HuskyHomeLocated (not: HasNot) {
        delay = 100
        let position: number;
        huskylens.request();
        position = huskylens.readBox_s(Content3.xCenter)
        if (not == HasNot.Has){
            if (position == -1) 
                return false
            else 
                return true
        }   
        else{
            if (position == -1) 
                return true
            else 
                return false
        }
    }

    /**
     * The arm will rotate out from its fold in position, in preparation for picking up an object. 
     */
    //% subcategory=Arm
    //% blockGap=8
    //% block="move arm up"
    export function Move_Arm_In(): void {
        servos.P1.setAngle(20)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P1, 0)
        servos.P0.setAngle(110)
    }

    /**
     * The RVR Gripper will close. 
     */
    //% block="close gripper"
    //% subcategory=Arm
    //% blockGap=8
    export function Close_Gripper(): void {
        servos.P0.setAngle(110)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P0, 0)
    }

    /**
     * The RVR will swing the arm out from its folding position. 
     */
    //% subcategory=Arm
    //% blockGap=8
    //% block="move arm down"
    export function Move_Arm_Out(): void {
        pins.digitalWritePin(DigitalPin.P0, 0)
        servos.P1.setAngle(90)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P1, 0)
    }

    /**
     * The RVR Gripper will open. 
     */
    //% subcategory=Arm
    //% blockGap=8
    //% block="open gripper"
    export function Open_Gripper () {
        servos.P0.setAngle(0)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P0, 0)
    }

    /**
     * The RVR Gripper will open. 
     */
    //% subcategory=Light
    //% blockGap=8
    //% block="change light colour to $colour"
    export function Light (colour : Colour) {
        switch(colour){
            case Colour.Black:{
                sphero.setAllLeds(0, 0, 0)
                break
            }
            case Colour.Blue:{
                sphero.setAllLeds(0, 0, 255)
                break
            }
            case Colour.Brown:{
                sphero.setAllLeds(139, 69, 19)
                break
            }
            case Colour.Green:{
                sphero.setAllLeds(0, 255, 0)
                break
            }
            case Colour.Orange:{
                sphero.setAllLeds(255, 140, 0)
                break
            }
            case Colour.Pink:{
                sphero.setAllLeds(255, 105, 180)
                break
            }
            case Colour.Purple:{
                sphero.setAllLeds(128, 0, 128)
                break
            }
            case Colour.Red:{
                sphero.setAllLeds(255, 0, 0)
                break
            }
            case Colour.White:{
                sphero.setAllLeds(255, 255, 255)
                break
            }
            case Colour.Yellow:{
                sphero.setAllLeds(255, 255, 0)
                break
            }
        }
    }
}


