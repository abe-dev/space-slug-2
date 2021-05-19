def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . 8 . . . . . . . . . . . . 
                    . . . . 9 9 . . . 5 . . . . . . 
                    . . . . . 8 . 8 5 5 a a . . . . 
                    . . . 8 . . 9 . . 5 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        spacePlane,
        200,
        0)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy(effects.warm_radial, 500)
    sprite.destroy()
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    otherSprite.destroy()
    scene.camera_shake(4, 500)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

bogey: Sprite = None
projectile: Sprite = None
spacePlane: Sprite = None
spacePlane = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f 9 9 . . . . . . . . . 
            . . f b b b b f . . . . . . . . 
            . . . f b b b b f f f 9 9 . . . 
            . . . . f b b b b a a a a f . . 
            5 4 . c c c c b b b b a a f . . 
            . . 4 5 c c c b b b f f f . . . 
            4 5 . . . f f f f f 9 9 . . . . 
            . . 4 . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """),
    SpriteKind.player)
controller.move_sprite(spacePlane, 200, 100)
spacePlane.set_stay_in_screen(True)
info.set_life(3)

def on_update_interval():
    global bogey
    bogey = sprites.create(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 7 . . . . . . . . . . 
                    . . . . . . . 7 . . . . . . . . 
                    . . . . . 7 7 7 7 . 7 . . . . . 
                    . . . . 7 f 7 f 7 . . . . . . . 
                    . . . . . 7 7 7 7 . . . . . . . 
                    . . . . . 7 7 7 7 7 . . . . . . 
                    . . . . 7 . 7 7 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 7 . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        SpriteKind.enemy)
    bogey.set_velocity(-80, 0)
    bogey.set_position(160, randint(5, 115))
    bogey.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(1000, on_update_interval)
