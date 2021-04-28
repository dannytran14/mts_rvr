input.onButtonPressed(Button.A, function () {
    MTS_RVR.Move(60)
    MTS_RVR.Turn(180)
    basic.pause(1000)
    MTS_RVR.Move(30)
    MTS_RVR.Stop()
})
