// État du jeu
initGame = function()
  gameState = object
    lose = false
    tickerCounter = 0
    snakeSpeed = 8
    maxSpeed = 8
    minSpeed = 2
    board = maps["board"]
  end
  clearMap(gameState.board)
  screen.drawMap("board",0,0,200,200)
  return gameState
end

clearMap = function(board)
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

drawGame = function()
  screen.fillRect(0,0,screen.width,screen.width,"#000")
  screen.fillRect(0,0,150,150,"rgb(45,45,45)")
  screen.drawMap( "board", 0, 0, 150, 150)
end
