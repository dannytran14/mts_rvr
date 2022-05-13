
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum HasNot {
    Has_Not,
    Has
}

enum Colour {
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
//% weight=999 color=#000000 icon=""
namespace MTS_Initialise{
    /**
     * Changes the HuskyLens to object tracking mode. 
     */
    //% blockGap=8
    //% block="start up"
    export function Start_Up(): void {
        sphero.resetYaw()
        position = -1
        degree = 0
        delay = 1500
        sphero.setAllLeds(255, 250, 147)
        basic.pause(1000)
    }
}

//% weight=998 color=#000000 icon=""
namespace MTS_Movement  {
    /**
     * The RVR will perform a slow movement. 
     */
    //% blockGap=8
    //% block
    export function Stop(): void {
        sphero.drive(0, degree)
        basic.pause(delay)
    }

    /**
     * The RVR will perform a slow movement. 
     */
    //% blockGap=8
    //% block
    export function Reverse(): void {
        sphero.drive(-60, degree)
        basic.pause(delay)
    }

    /**
     * The RVR will perform a slow movement. 
     */
    //% blockGap=8
    //% block="move at speed $speed for 1 second"
    //% speed.min=1 speed.max=10
    export function Move(speed: number): void {
        speed = speed * 6;
        if (speed > 60) {
            speed = 60
        }
        sphero.drive(speed, degree)
        basic.pause(delay)
    }

    /**
     * The RVR will move in the heading specified. 
     */
    //% blockGap=8
    //% block="turn left %heading degrees"
    //% heading.min=0 heading.max=180
    export function Turn_Left(heading: number): void {
        sphero.resetYaw()
        basic.pause(300)
        degree = 0

        if (heading > 180) {
            degree = 180
        }
        else if (heading < 0) {
            degree = 0
        }
        else {
            degree = degree - heading + 360
        }
        sphero.drive(0, degree)
        basic.pause(500)

    }

    /**
     * The RVR will move in the heading specified. 
     */
    //% blockGap=8
    //% block="turn right %heading degrees"
    //% heading.min=0 heading.max=180
    export function Turn_Right(heading: number): void {
        sphero.resetYaw()
        basic.pause(300)
        degree = 0

        if (heading > 180) {
            degree = 180
        }
        else if (heading < 0) {
            degree = 0
        }
        else {
            degree = heading
        }
        sphero.drive(0, degree)
        basic.pause(500)

    }


    /**
     * The arm will rotate out from its fold in position, in preparation for picking up an object. 
     */
    //% blockGap=8
    //% block="rotate bin horizontal"
    export function Move_Arm_In(): void {
        servos.P1.setAngle(20)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P1, 0)
        servos.P0.setAngle(110)
    }

    /**
     * The RVR will swing the arm out from its folding position. 
     */
    //% blockGap=8
    //% block="rotate bin vertical"
    export function Move_Arm_Out(): void {
        pins.digitalWritePin(DigitalPin.P0, 0)
        servos.P1.setAngle(90)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P1, 0)
    }

}

//% weight=996   color=#000000 icon=""
namespace MTS_Sonar{
    /**
     * Will return a true value once the RVR has reached its pick up distance. 
     */
    //% blockGap=8
    //% block="sonar %not detected object at short range"
    export function Sonar_Pick_Up_Range(not: HasNot): boolean {
        delay = 0;
        if (not == HasNot.Has) {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 4) {
                return true;
            }
            else
                return false
        }
        else {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 4) {
                return false;
            }
            else {
                return true
            }
        }

    }

    /**
     * The Sonar will return a true value once it detects that the RVR should slow once it detects an object. 
     */
    //% block="sonar %not detected object at far range"
    //% blockGap=8
    export function SonarObject(not: HasNot): boolean {
        delay = 0;
        if (not == HasNot.Has) {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 30) {
                return true;
            }
            else
                return false
        }
        else {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 30) {
                return false;
            }
            else {
                return true
            }
        }
    }

}

//% weight=996   color=#000000 icon=""
namespace MTS_HuskyLens{
    /**
     * Changes the HuskyLens to tag recognition mode
     */
    //% blockGap=8
    //% block="change to tag recognition"
    export function Tag_Tracking_Mode(): void {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
        huskylens.request()
        huskylens.request()
    }
    /**
     * The RVR will rotate until the object is centred on the HuskyLens. 
     */
    //% blockGap=8
    //% block="centre object on screen"
    export function H_Centre_Object_On_Screen(): void {
        let position: number;
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
            } else if (position > 175) {
                MTS_RVR.Turn(5)
            } else if (position > 200) {
                MTS_RVR.Turn(10)
            } else if (position > 230) {
                MTS_RVR.Turn(15)
            }
            huskylens.request()
        }
    }

    /**
    * HuskyLens checks whether home has been located.
    */
    //% blockGap=8
    //% block="husky %not located home "
    export function HuskyHomeLocated(not: HasNot) {
        delay = 100
        let position: number;
        huskylens.request();
        position = huskylens.readBox_s(Content3.xCenter)
        if (not == HasNot.Has) {
            if (position == -1)
                return false
            else
                return true
        }
        else {
            if (position == -1)
                return true
            else
                return false
        }
    }
}

//% weight=995 color=#000000 icon=""
namespace MTS_Lights{
    /**
     * The RVR Gripper will open. 
     */
    //% blockGap=8
    //% block="change light colour to $colour"
    export function Light(colour: Colour) {
        switch (colour) {
            case Colour.Black: {
                sphero.setAllLeds(0, 0, 0)
                break
            }
            case Colour.Blue: {
                sphero.setAllLeds(0, 0, 255)
                break
            }
            case Colour.Brown: {
                sphero.setAllLeds(139, 69, 19)
                break
            }
            case Colour.Green: {
                sphero.setAllLeds(0, 255, 0)
                break
            }
            case Colour.Orange: {
                sphero.setAllLeds(255, 140, 0)
                break
            }
            case Colour.Pink: {
                sphero.setAllLeds(255, 105, 180)
                break
            }
            case Colour.Purple: {
                sphero.setAllLeds(128, 0, 128)
                break
            }
            case Colour.Red: {
                sphero.setAllLeds(255, 0, 0)
                break
            }
            case Colour.White: {
                sphero.setAllLeds(255, 255, 255)
                break
            }
            case Colour.Yellow: {
                sphero.setAllLeds(255, 255, 0)
                break
            }
        }
    }
}
/**
 * Custom blocks
 */
//% weight=1000 color=#000000 icon=""
namespace MTS_RVR{

    /**
     * The RVR will move in the heading specified. 
     */
    //% subcategory=Movement
    //% blockGap=8
    //% heading.min=0 heading.max=180
    export function Turn(heading: number): void {
        sphero.resetYaw()
        basic.pause(300)
        degree = 0
        degree = heading
        if (degree > 359) {
            degree = 180
        }
        else if (degree < 0) {
            degree = 0
        }
        sphero.drive(0, degree)
        basic.pause(500)

    }
    /**
     * Changes the HuskyLens to object tracking mode. 
     */
    //% subcategory=HuskyLens
    //% blockGap=8
    //% block="change to object tracking"
    function Object_Tracking_Mode(): void {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
        huskylens.request()
        huskylens.request()
    }

    
    /**
     * Changes the HuskyLens to tag recognition mode
     */
    //% subcategory=Initialise
    //% blockGap=8
    //% block
    function Output(): void {
        huskylens.writeOSD(grove.measureInCentimeters(DigitalPin.P15).toString(), 150, 30)
    }

    /**
     * Changes the HuskyLens to tag recognition mode
     */
    //% subcategory=Initialise
    //% blockGap=8
    //% block
    function Test(): void {
        while (grove.measureInCentimeters(DigitalPin.P15) > 20) {
            sphero.drive(30, 0)
            sphero.setRgbLedByIndex(sphero.LEDs.rightHeadlight, 0, 255, 0)
        }
        sphero.drive(0, 0)
        sphero.setRgbLedByIndex(sphero.LEDs.rightHeadlight, 255, 0, 0)

    }

    

    

    /**
    * The Sonar will return a true value once it detects that the RVR should slow down once it detects a collision ahead. 
    */
    //% block="sonar %not detected a collision"
    //% subcategory=Sonar
    //% blockGap=8
    function SonarCollision(not: HasNot): boolean {
        delay = 0;
        if (not == HasNot.Has) {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 30) {
                return true;
            }
            else
                return false
        }
        else {
            if (grove.measureInCentimeters(DigitalPin.P15) <= 30) {
                return false;
            }
            else {
                return true
            }
        }
    }

    



    

    function Int_turn(heading: number): void {
        degree += heading
        if (degree > 359) {
            degree -= 360
        }
        else if (degree < 0) {
            degree += 360
        }
        sphero.drive(0, degree)
    }

    /**
     * The HuskyLens will return a true value once a object is detected its screen. 
     */
    //% block="husky %not located object"
    //% subcategory=HuskyLens
    //% blockGap=8
    function HuskyTargetLocated(not: HasNot): boolean {
        delay = 100
        let position: number;
        huskylens.request();
        position = huskylens.readBox_s(Content3.xCenter)
        if (not == HasNot.Has) {
            if (position == -1)
                return false
            else
                return true
        }
        else {
            if (position == -1)
                return true
            else
                return false
        }
    }

    

    
    /**
     * The RVR Gripper will open. 
     */
    //% subcategory=Arm
    //% blockGap=8
    //% block="open gripper"
    function Open_Gripper() {
        servos.P0.setAngle(0)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P0, 0)
    }

    
}


