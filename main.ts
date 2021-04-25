function Sonar_Collison_Not_Detected () {
    if (grove.measureInCentimeters(DigitalPin.P15) < 15) {
        return false
    }
    return true
}
while (MTS_RVR.Sonar_Object_Not_Detected()) {
	
}
