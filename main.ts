input.onButtonPressed(Button.A, function () {
    MTS_RVR.Start_Up()
    MTS_RVR.Object_Tracking_Mode()
    while (MTS_RVR.HuskyTargetLocated(HasNot.Has_Not)) {
        MTS_RVR.Turn(30)
    }
    MTS_RVR.H_Centre_Object_On_Screen()
    MTS_RVR.Open_Gripper()
    while (MTS_RVR.SonarPickUpRange(HasNot.Has_Not)) {
        MTS_RVR.Move(3)
        MTS_RVR.H_Centre_Object_On_Screen()
    }
    MTS_RVR.Stop()
    MTS_RVR.Close_Gripper()
    MTS_RVR.Move_Arm_In()
    MTS_RVR.Tag_Tracking_Mode()
    while (MTS_RVR.HuskyHomeLocated(HasNot.Has_Not)) {
        MTS_RVR.Turn(40)
        MTS_RVR.H_Centre_Object_On_Screen()
    }
    while (MTS_RVR.SonarCollision(HasNot.Has_Not)) {
        MTS_RVR.Move(3)
    }
    MTS_RVR.Stop()
    MTS_RVR.Move_Arm_Out()
    MTS_RVR.Open_Gripper()
})
