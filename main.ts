input.onButtonPressed(Button.A, function () {
    MTS_RVR.Tag_Tracking_Mode()
    while (!(MTS_RVR.H_Is_Target_Located())) {
        MTS_RVR.Turn(26)
    }
})
