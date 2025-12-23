// touchKeys plug in
// import this file to your project
// and check the documentation

touchKeys = object
  keys = []
  arrows = 1
  pressed = object end

  draw = function()
    displayed = []
    if arrows then
      drawKey("<",-screen.width/2+20+40,-screen.height/2+20+40,-90,"UP")
      drawKey("<",-screen.width/2+20+40,-screen.height/2+20+10,90,"DOWN")
      drawKey("<",-screen.width/2+20+10,-screen.height/2+20+20,0,"LEFT")
      drawKey(">",-screen.width/2+20+70,-screen.height/2+20+20,0,"RIGHT")
    end
    
    local index = 0
    for key in keys
      drawKey(key,screen.width/2-20-10-index*40,-screen.height/2+20+20,0,key)
      index += 1
    end
  end
  
  update = function()
    local y = -screen.height/2+20+20
    local p = object end
    for t in touch.touches
      for d in displayed
        if abs(t.x-d.x)<20 and abs(t.y-d.y)<20 then
          keyboard[d.ref] = 1
          p[d.ref] = 1
          pressed[d.ref] = 1
        end
      end
    end
    
    for k in pressed
      if pressed[k] and not p[k] then
        pressed[k] = 0
        keyboard[k] = 0
      end
    end
  end
  
  drawKey = function(key,x,y,rotation,ref)
    displayed.push(object
        x = x
        y = y
        ref = ref
      end)
    screen.fillRoundRect(x,y-2,22,22,2,"rgba(0,0,0,.5)")
    screen.fillRoundRect(x,y,22,22,2,"#000")
    screen.fillRoundRect(x,y,20,20,2,"#FFF")
    screen.setDrawRotation(rotation)
    screen.drawText(key,x,y,12,"#000")
    screen.setDrawRotation(0)
  end
end

