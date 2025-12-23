moveSnake = function(direction)
  snakehead = snake[0]
  snake[0].sprite = "body"
  heady = snakehead.y
  headx = snakehead.x
  
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
    lose = true
  else
    // Vérification si le serpent a mangé une pomme
    if headx == snackx and heady == snacky then
      score += 1
      makeSnack()
      grow = true
      if (score % 2) and snakeSpeed > minSpeed then
        snakeSpeed -= 1
      end
    end
    
    snake = [makeSnakePart(headx, heady, true)] + snake
    if grow then
      grow = false
    else
      snakeTail = snake[snake.length-1]
      board.set(snakeTail.x, snakeTail.y, "")
      snake.pop()
    end
    
    for snakePart in snake
      board.set(snakePart.x, snakePart.y,snakePart.sprite)
    end
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
  return board.get(x,y) == "body"
end

// Permet de placer la pomme sur l'écran de jeu
// Vérifie si la pomme n'est pas sur le serpent, sinon il est replacé
makeSnack = function()
   snackx = getRandomX()
   snacky = getRandomY()
   if checkIfSnakePart(snackx,snacky) then makeSnack() end
end


getRandomX = function()
  return random.nextInt(board.width)
end

getRandomY = function()
  return random.nextInt(board.height)
end