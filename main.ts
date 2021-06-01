input.onButtonPressed(Button.A, function () {
    MTS_RVR.Start_Up()
    while (MTS_RVR.SonarObject(HasNot.Has_Not)) {
        MTS_RVR.Move(60)
    }
    sphero.setAllLeds(255, 0, 0)
    MTS_RVR.Stop()
})
