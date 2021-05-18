
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}
let degree: number = 0
let delay: number = 1500
/**
 * Custom blocks
 */
//% weight=100 color=#000000 icon=""
namespace MTS_RVR {
    /**
     * The RVR will perform a slow movement. 
     */
    //% group="MTS_Movement"
    //% blockGap=8
    //% block
    //% speed.min=-60 speed.max=60
    export function Move(speed: number) :void {
        if (speed > 60){
            speed = 60
        }
        sphero.drive(speed, degree)
        basic.pause(delay)
    }

    /**
     * The RVR will move in the heading specified. 
     */
    //% group="MTS_Movement"
    //% blockGap=8
    //% block
    //% heading.min=-180 heading.max=180
    export function Turn(heading: number): void {
        degree += heading
        if (degree > 359){
            degree -= 360
        }
        else if (degree < 0){
            degree += 360
        }
        basic.showNumber(degree)
        sphero.drive(0, degree)
        basic.pause(1000)
    }

    /**
     * The RVR will stop.  
     */
    //% group="MTS_Movement"
    //% blockGap=8
    //% block
    //% heading.min=0 heading.max=359
    export function Stop(): void {
        sphero.drive(0, degree)
    } 

    /**
     * Will return a true value once the RVR has reached its pick up distance. 
     */
    //% group="MTS_Sonar"
    //% blockGap=8
    //% block
    export function S_Is_In_Pick_Up_Range(): boolean {
        delay = 100; 
        if (grove.measureInCentimeters(DigitalPin.P15) <= 8) {
        return true;
        delay = 1500
        }
    return false;
    }

     /**
     * The Sonar will return a true value once it detects that the RVR should slow down once it detects a collision ahead. 
     */
    //% block
    //% group="MTS_Sonar"
    //% blockGap=8
    export function S_Is_Collision_Detected (): boolean {
        delay = 100
    if (grove.measureInCentimeters(DigitalPin.P15) <= 20) {
        return true
        delay = 1500
    }
    return false
    }

    /**
     * The Sonar will return a true value once it detects that the RVR should slow once it detects an object. 
     */
    //% block
    //% group="MTS_Sonar"
    //% blockGap=8
    export function S_Is_Object_Detected (): boolean {
        delay = 100
    if (grove.measureInCentimeters(DigitalPin.P15) <= 25) {
        return true
        delay = 1500
    }
    return false
    }

    /**
     * Changes the HuskyLens to object tracking mode. 
     */
    //% group="Initialise"
    //% blockGap=8
    //% block
    export function Husky_Start_Up(): void {
        huskylens.initI2c()
    }

    /**
     * Changes the HuskyLens to object tracking mode. 
     */
    //% group="Initialise"
    //% blockGap=8
    //% block
    export function Object_Tracking_Mode(): void {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
        let position = 0
    }

    /**
     * Changes the HuskyLens to tag recognition mode
     */
    //% group="Initialise"
    //% blockGap=8
    //% block
    export function Tag_Tracking_Mode(): void {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
        let position = 0
    }

    /**
     * The RVR will rotate until the object is centred on the HuskyLens. 
     */
    //% group="MTS_HuskyLens"
    //% blockGap=8
    //% block
    export function H_Centre_Object_On_Screen(): void {
        let position : number;
        huskylens.request();
        position = huskylens.readeBox_index(1, 1, Content1.xCenter);
        while (position < 150 || position > 170) {
            huskylens.request();
            position = huskylens.readeBox_index(1, 1, Content1.xCenter);
            huskylens.writeOSD(position.toString(), 150, 30)
            if (position < 130) {
                MTS_RVR.Turn(10)
            } 
            else{
                if (position < 150){
                    MTS_RVR.Turn(-5)
                }
                if (position > 190){
                    MTS_RVR.Turn(-10)
                }
                else {
                    if (position > 170){
                        MTS_RVR.Turn(-5)
                    }
                }
            }
        basic.pause(300);
        huskylens.request()
        }
    }

    /**
     * The HuskyLens will return a true value once a object is detected its screen. 
     */
    //% block
    //% group="MTS_HuskyLens"
    //% blockGap=8
    export function H_Is_Target_Located () : boolean {
        delay = 100
        let position: number;
        huskylens.request();
        position = huskylens.readeBox_index(1, 1, Content1.xCenter);
        if (position == -1) {
            return false
        } else {
            return true
            delay = 1500
        }
    }

     /**
     * HuskyLens checks whether home has been located.
     */
    //% group="MTS_HuskyLens"
    //% blockGap=8
    //% block
    export function H_Is_Home_Located () {
        delay = 100
        let position: number;
        huskylens.request();
        position = huskylens.readeBox_index(1, 1, Content1.xCenter);
        if (position == -1) {
            return false
        } else {
            return true
            delay = 1500
        }
    }

    /**
     * The arm will rotate out from its fold in position, in preparation for picking up an object. 
     */
    //% group="MTS_Arm_Control"
    //% blockGap=8
    //% block
    export function Move_Arm_In(): void {
        servos.P1.setAngle(0);
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P1, 0)
    }

    /**
     * The RVR Gripper will close. 
     */
    //% block
    //% group="MTS_Arm_Control"
    //% blockGap=8
    export function Close_Gripper(): void {
        servos.P0.setAngle(140)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P0, 0)
    }

    /**
     * The RVR will swing the arm out from its folding position. 
     */
    //% group="MTS_Arm_Control"
    //% blockGap=8
    //% block
    export function Move_Arm_Out(): void {
        servos.P1.setAngle(90)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P1, 0)
    }

    /**
     * The RVR Gripper will open. 
     */
    //% group="MTS_Arm_Control"
    //% blockGap=8
    //% block
    export function Open_Gripper () {
        servos.P0.setAngle(0)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}


