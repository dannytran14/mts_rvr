basic.forever(function () {
    MTS_RVR.Tag_Tracking_Mode()
    while (!(MTS_RVR.H_Is_Home_Located())) {
        MTS_RVR.Turn(20)
    }
    MTS_RVR.H_Centre_Object_On_Screen()
    while (!(MTS_RVR.S_Is_Object_Detected())) {
        MTS_RVR.Move(30)
    }
    MTS_RVR.Stop()
})
basic.forever(function () {
	
})
