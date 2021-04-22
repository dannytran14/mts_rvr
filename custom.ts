
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
/**
 * Custom blocks
 */
//% weight=100 color=#000000 icon=""
namespace MTS_RVR {
    /**
     * The RVR will perform a slow movement. 
     */
    //% group="MTS_Movement_Only"
    //% blockGap=8
    //% block
    export function Move_Forward_Slow_2000 () {
        sphero.drive(40, 0)
        basic.pause(2000)
    }

    /**
     * The RVR will perform a fast movement. 
     */
    //% group="MTS_Movement_Only"
    //% blockGap=8
    //% block
    export function Move_Forward_Fast_2000 (): void {
        sphero.drive(40, 0)
        basic.pause(2000)
    }

    /**
     * The RVR will move in the heading specified. 
     */
    //% group="MTS_Movement_Only"
    //% blockGap=8
    //% block
    //% heading.min=0 heading.max=359
    export function Move_Backward_2000(): void {
        sphero.drive(-40, 0)
        basic.pause(2000)
    }
    
    /**
     * The RVR will perform a slow movement. 
     */
    //% group="MTS_Movement"
    //% blockGap=8
    //% block
    export function Move_Forward_Slow_100() {
        sphero.drive(40, 0)
        basic.pause(100)
    }

    /**
     * The RVR will perform a fast movement. 
     */
    //% group="MTS_Movement"
    //% blockGap=8
    //% block
    export function Move_Foward_Fast_100(): void {
        sphero.drive(40, 0)
        basic.pause(100)
    }

    /**
     * The RVR will move in the heading specified. 
     */
    //% group="MTS_Movement"
    //% blockGap=8
    //% block
    //% heading.min=0 heading.max=359
    export function Move_Forward_With_Heading(heading: number): void {
        degree += heading
        if (degree > 359){
            degree -= 360
        }
        else if (degree < 0){
            degree += 360
        }
        sphero.drive(40, degree)
        basic.pause(2000)
    }

    

    /**
     * The RVR will perform a small clockwise rotation. 
     */
    //% group="MTS_Movement"
    //% blockGap=8
    //% block
    export function Rotate () {
        sphero.resetYaw()
        sphero.drive(0, 40)
        basic.pause(100)
    }

    /**
     * The RVR will stop.  
     */
    //% group="MTS_Movement"
    //% blockGap=8
    //% block
    //% heading.min=0 heading.max=359
    export function Stop(): void {
        sphero.drive(0, 0)
    } 

    /**
     * Will return a true value once the RVR has reached its pick up distance. 
     */
    //% group="MTS_Sonar"
    //% blockGap=8
    //% block
    export function Sonar_Pick_Up(): boolean {
        if (grove.measureInCentimeters(DigitalPin.P1) <= 8) {
        return true;
    }
    return false;
    }

    /**
     * The Sonar will return a true value once it detects that the RVR should slow down once it detects a collision ahead. 
     */
    //% block
    //% group="MTS_Sonar"
    //% blockGap=8
    export function Sonar_Collison_Not_Detected (): boolean {
    if (grove.measureInCentimeters(DigitalPin.P1) < 15) {
        return false
    }
    return true
    }

    /**
     * The Sonar will return a true value once it detects that the RVR should slow once it detects an object. 
     */
    //% block
    //% group="MTS_Sonar"
    //% blockGap=8
    export function Sonar_Object_Not_Detected (): boolean {
    if (grove.measureInCentimeters(DigitalPin.P1) < 25) {
        return false
    }
    return true
    }

    /**
     * The RVR will rotate until the object is centred on the HuskyLens. 
     */
    //% group="MTS_HuskyLens"
    //% blockGap=8
    //% block
    export function Husky_Centre(): void {
        let position : number;
        while (position < 140 || position > 180) {
            huskylens.request();
            position = huskylens.readeBox_index(1, 1, Content1.xCenter);
            sphero.resetYaw();
            if (position > 180) {
                sphero.drive(0, 25);
            } else {
                sphero.drive(0, -25);
            }
            basic.pause(300);
        }
    }

    /**
     * The HuskyLens will return a true value once a object is detected its screen. 
     */
    //% block
    //% group="MTS_HuskyLens"
    //% blockGap=8
    export function Husky_Locate () : boolean {
        let position: number;
        huskylens.request();
        position = huskylens.readeBox_index(1, 1, Content1.xCenter);
        if (position == -1) {
            return false
        } else {
            return true
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
    }

    /**
     * The RVR Gripper will close. 
     */
    //% block
    //% group="MTS_Arm_Control"
    //% blockGap=8
    export function Close_Gripper(): void {
        servos.P0.setAngle(180);
    }

    /**
     * The RVR will swing the arm out from its folding position. 
     */
    //% group="MTS_Arm_Control"
    //% blockGap=8
    //% block
    export function Move_Arm_Out(): void {
        servos.P1.setAngle(90)
    }

    /**
     * The RVR Gripper will open. 
     */
    //% group="MTS_Arm_Control"
    //% blockGap=8
    //% block
    export function Open_Gripper () {
        servos.P0.setAngle(0)
    }

    /**
     * Intialises all values and variables before the program begins. 
     */
    //% group="Initialise"
    //% blockGap=8
    //% block
    export function Initialise(): void {
        huskylens.initI2c()
        huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
    }

    /**
     * The RVR will pick up the object. 
     */
    //% group="Simplified Functions"
    //% blockGap=8
    //% block
    export function Pick_Up_Object(): void {
        Close_Gripper()
    }

    /**
     * The RVR will drop the object. 
     */
    //% group="Simplified Functions"
    //% blockGap=8
    //% block
    export function Drop_Object(): void {
        Open_Gripper()
    }

    /**
     * The RVR will return back to its starting position. 
     */
    //% group="Simplified Functions"
    //% blockGap=8
    //% block
    export function Return_Home(): void {
        sphero.resetYaw()
        sphero.drive(40, 180)
    }
    
     /**
     * Set husky lens target to home tag recognition. 
     */
    //% group="Simplified Functions"
    //% blockGap=8
    //% block
    export function target_home () {
    huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
    }

    /**
     * The RVR will centre its positioning relate to the object, and move towards it. 
     */
    //% group="Simplified Functions"
    //% blockGap=8
    //% block
    export function Move_To_Object(): void {
        Husky_Centre();
        Open_Gripper();
        while(Sonar_Object_Not_Detected()){
            Move_Foward_Fast_100();
        }
        while(!Sonar_Pick_Up()){
            Move_Forward_Slow_100();
        }
    }

    /**
     * The RVR will rotate until the HuskyLens recognises the object on its screen.
     */
    //% group="Simplified Functions"
    //% blockGap=8
    //% block
    export function Find_Object(): void {
        while(!Husky_Locate()){
            Rotate();
        }
        
    }
}


