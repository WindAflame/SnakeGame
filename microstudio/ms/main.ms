// Direction 0,1,2,3 = Gauche,Haut,Droite,Bas
direction = []
direction["LEFT"] = 0
direction["UP"] = 1
direction["RIGHT"] = 2
direction["DOWN"] = 3

init = function()
  screen.fillRect(0,0,150,150,"rgb(45,45,45)") // Initialise la taille de la grille de jeu
  tickerCounter = 0
  maxSpeed = 8
  minSpeed = 2
  snakeSpeed = maxSpeed
  initDont = 0
  lose = false // Status si le joueur est mort ou à perdu la partie
  score = 0 // Le Score du joueur
  currentDirection=direction["UP"]
  nextDirection=direction["RIGHT"] 
  board = maps["board"]
  clearMap() // Permet de nettoyer l'écran
  screen.drawMap("board",0,0,200,200) // Initialise l'écran de jeu
  makeSnack() // Place la pomme dans la grille de jeu
  snake = [makeSnakePart(12,12, true)] // Place le serpent dans la grille de jeu
  touchKeys.arrows = not system.inputs.keyboard // Le joueur ne peux pas déplacer le serpent
end

update = function()
  handleInput()
  if not lose then 
    // Permet de changer la rapidité du serpent
    if tickerCounter % snakeSpeed == 0 then
      currentDirection=nextDirection
      moveSnake(nextDirection)
    end
    tickerCounter += 1
  else
    if keyboard.SPACE then init() end
  end
  
end

draw = function()
  if lose then
     screen.drawText("Game Over. Press Spacebar to restart", 0, 0, 10, "#FFF")
  else
    screen.fillRect(0,0,screen.width,screen.width,"#000")
    screen.fillRect(0,0,150,150,"rgb(45,45,45)")
    screen.drawMap( "board", 0, 0, 150, 150)
    board.set(snackx, snacky, "snack")
    screen.drawText(score, -90, 90, 10, "#FFF")
  end
  touchKeys.draw()
end


clearMap = function()
  i = 0
  j = 0
  while i < 25
    j = 0
    while j < 25
      board.set(i, j, "")
    j += 1
    end
  i += 1
  end
end