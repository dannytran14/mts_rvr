input.onButtonPressed(Button.A, function () {
    huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
})
input.onButtonPressed(Button.AB, function () {
    huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
})
input.onButtonPressed(Button.B, function () {
    huskylens.request()
    position = huskylens.readeBox_index(1, 1, Content1.xCenter)
    basic.showNumber(position)
})
let position = 0
huskylens.initI2c()
