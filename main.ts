let position = 0
input.onButtonPressed(Button.A, function () {
    MTS_RVR.Object_Tracking_Mode()
    huskylens.request()
    position = huskylens.readeBox_index(1, 7, Content1.xCenter)
    basic.showNumber(position)
})
input.onButtonPressed(Button.B, function () {
    MTS_RVR.Tag_Tracking_Mode()
    huskylens.request()
    position = huskylens.readeBox_index(1, 7, Content1.xCenter)
    basic.showNumber(position)
})
basic.forever(function () {
	
})
