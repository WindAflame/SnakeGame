initScore = function()
  scoreState = object
    value = 0
  end
  return scoreState
end

addScore = function(scoreState, points)
  scoreState.value += points
end

drawScore = function(scoreState)
  screen.drawText(scoreState.value, -90, 90, 10, "#FFF")
end

resetScore = function(scoreState)
  scoreState.value = 0
end
