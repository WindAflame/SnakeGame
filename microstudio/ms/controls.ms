handleInput = function()
  touchKeys.update()
  if keyboard.LEFT and currentDirection != direction["RIGHT"] then nextDirection=direction["LEFT"]
  elsif keyboard.RIGHT and currentDirection != direction["LEFT"] then nextDirection=direction["RIGHT"]
  elsif keyboard.UP and currentDirection != direction["DOWN"] then nextDirection=direction["UP"]
  elsif keyboard.DOWN and currentDirection != direction["UP"] then nextDirection=direction["DOWN"]
  end
end