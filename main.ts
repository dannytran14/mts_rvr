input.onButtonPressed(Button.A, function () {
    MTS_RVR.Object_Tracking_Mode()
    while (!(MTS_RVR.H_Is_Target_Located())) {
        MTS_RVR.Turn(26)
    }
    sphero.setAllLeds(0, 255, 0)
    MTS_RVR.H_Centre_Object_On_Screen()
    sphero.setAllLeds(0, 0, 255)
})
