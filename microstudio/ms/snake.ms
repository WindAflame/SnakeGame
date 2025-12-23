initSnake = function(x, y)
  snakeState = object
    snake = [makeSnakePart(x, y, true)]
    grow = false
  end
  return snakeState
end

moveSnake = function(snakeState, direction, gameState, foodState, scoreState)
  snakehead = snakeState.snake[0]
  snakeState.snake[0].sprite = "body"
  heady = snakehead.y
  headx = snakehead.x
  board = gameState.board

  // Déplacement de la tête du serpent sur la grille de jeu
  if direction == 1 then
     heady = (heady + 1) % board.height
  elsif direction == 2 then
     headx = (headx + 1) % board.width
  elsif direction == 3 then
    if (heady - 1) < 0 then heady = board.height-1 else heady = (heady - 1) end
  else
     if (headx - 1) < 0 then headx = board.width-1 else headx = (headx - 1) end

  end

  // Vérification si le serpent se mord la queue
  if checkIfSnakePart(headx, heady) then
    gameState.lose = true
  else
    // Vérification si le serpent a mangé une pomme
    if headx == foodState.x and heady == foodState.y then
      addScore(scoreState, 1)
      makeSnack(foodState, board)
      snakeState.grow = true
      if (scoreState.value % 2) and gameState.snakeSpeed > gameState.minSpeed then
        gameState.snakeSpeed -= 1
      end
    end

    snakeState.snake = [makeSnakePart(headx, heady, true)] + snakeState.snake
    if snakeState.grow then
      snakeState.grow = false
    else
      snakeTail = snakeState.snake[snakeState.snake.length-1]
      board.set(snakeTail.x, snakeTail.y, "")
      snakeState.snake.pop()
    end

    for snakePart in snakeState.snake
      board.set(snakePart.x, snakePart.y,snakePart.sprite)
    end
  end
end

drawSnake = function(snakeState, board)
  for snakePart in snakeState.snake
    board.set(snakePart.x, snakePart.y, snakePart.sprite)
  end
end


makeSnakePart = function(xpos, ypos, head) 
  local snakesprite = nil
  if head then snakesprite = "head" else sprite = "body" end
  return object 
    sprite = snakesprite
    x = xpos
    y = ypos
  end
end

checkIfSnakePart = function(x, y)
  board = maps["board"]
  return board.get(x,y) == "body"
end