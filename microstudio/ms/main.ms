// Direction 0,1,2,3 = Gauche,Haut,Droite,Bas
direction = []
direction["LEFT"] = 0
direction["UP"] = 1
direction["RIGHT"] = 2
direction["DOWN"] = 3

init = function()
  screen.fillRect(0,0,150,150,"rgb(45,45,45)") // Initialise la taille de la grille de jeu
  currentDirection=direction["UP"]
  nextDirection=direction["RIGHT"]
  gameState = initGame()
  scoreState = initScore()
  foodState = initFood(gameState.board)
  snakeState = initSnake(12, 12)
  touchKeys.arrows = not system.inputs.keyboard
end

update = function()
  handleInput()
  if not gameState.lose then
    // Permet de changer la rapidité du serpent
    if gameState.tickerCounter % gameState.snakeSpeed == 0 then
      currentDirection=nextDirection
      moveSnake(snakeState, nextDirection, gameState, foodState, scoreState)
    end
    gameState.tickerCounter += 1
  else
    if keyboard.SPACE then init() end
  end

end

draw = function()
  if gameState.lose then
     screen.drawText("Game Over. Press Spacebar to restart", 0, 0, 10, "#FFF")
  else
    drawGame()
    drawFood(foodState, gameState.board)
    drawScore(scoreState)
  end
  touchKeys.draw()
end
