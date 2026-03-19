initFood = function(board)
  foodState = object
    x = getRandomX(board)
    y = getRandomY(board)
  end
  return foodState
end

makeSnack = function(foodState, board)
  foodState.x = getRandomX(board)
  foodState.y = getRandomY(board)
  if checkIfSnakePart(foodState.x, foodState.y) then
    makeSnack(foodState, board)
  end
end

getRandomX = function(board)
  return random.nextInt(board.width)
end

getRandomY = function(board)
  return random.nextInt(board.height)
end

drawFood = function(foodState, board)
  board.set(foodState.x, foodState.y, "snack")
end
