namespace SpriteKind {
    export const EnemyBoss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyBoss, function (sprite, otherSprite) {
    otherSprite.destroy()
    scene.cameraShake(8, 500)
    info.changeLifeBy(-2)
    music.playMelody("C5 B A G F E D C ", 500)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
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
        `, spacePlane, 200, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.EnemyBoss, function (sprite, otherSprite) {
    destroy_enemy(sprite, otherSprite, 2)
})
function destroy_enemy (enemy: Sprite, projectile: Sprite, score: number) {
    enemy.destroy(effects.warmRadial, 500)
    projectile.destroy()
    info.changeScoreBy(score)
    music.baDing.play()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    destroy_enemy(sprite, otherSprite, 1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    music.playMelody("A B C5 G E - - - ", 1700)
})
let bogey: Sprite = null
let bigBogey: Sprite = null
let projectile: Sprite = null
let spacePlane: Sprite = null
spacePlane = sprites.create(img`
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
    `, SpriteKind.Player)
controller.moveSprite(spacePlane, 200, 100)
spacePlane.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(randint(1, 10) * 1000, function () {
    bigBogey = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 9 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 8 9 8 . . 9 . . . . 
        . . . 9 . 8 8 8 8 8 . . . . . . 
        . . . . 8 8 f 8 f 8 . . . . . . 
        . . . 8 8 8 8 8 8 9 8 . . . . . 
        . . . 8 8 9 8 8 8 8 8 . . . . . 
        . . . . 8 8 9 8 8 8 . 9 . . . . 
        . . . . . 8 8 8 8 8 . . . . . . 
        . . . . . . 8 8 9 . . . . . . . 
        . . . . 9 . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.EnemyBoss)
    bigBogey.setVelocity(-30, 0)
    bigBogey.setPosition(160, randint(5, 115))
    bigBogey.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(1000, function () {
    bogey = sprites.create(img`
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
        `, SpriteKind.Enemy)
    bogey.setVelocity(-80, 0)
    bogey.setPosition(160, randint(5, 115))
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
