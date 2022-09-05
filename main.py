def on_button_pressed_a():
    MTS_Initialise.Start_Up()
    MTS_Movement.move(10)
input.on_button_pressed(Button.A, on_button_pressed_a)
