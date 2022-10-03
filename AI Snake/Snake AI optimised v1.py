import pygame, sys, random
from pygame.locals import *
from math import prod
import time

# colors
WHITE = (255,255,255)
BLACK = (0,0,0)
LIME = (191,255,0)
RED = (255,0,0)

# grid dimensions
GRIDSIZE = (20,20)
NUMBEROFCELLS = prod(GRIDSIZE)

# screen sizes
WINDOWSIZE = (800,800)

# cell size
CELLSIZE = (WINDOWSIZE[0]//GRIDSIZE[0], WINDOWSIZE[1]//GRIDSIZE[1])

# inital object velocities and position
PLAYERPOSx = PLAYERPOSy = 10
PLAYERVELOCITYx = PLAYERVELOCITYy = 0
PLAYERTAILLENGTH = 5
APPLEPOSx = APPLEPOSy = 15

# cycle file
CYCLEFILENAME = 'cycle.txt'

# game frame rate
FRAMERATE = 30

class Player:
    # possible player velocities
    _velocities = {
        'left': [-1, 0],
        'right': [1, 0],
        'up': [0, -1],
        'down': [0, 1]
    }
    
    # cell pixel offset
    _offset = 2
    
    def __init__(self, positionX, positionY, velocityX, velocityY):
        self.position = [positionX, positionY]
        self.velocity = [velocityX, velocityY]
        self.tailLength = PLAYERTAILLENGTH
        self.trail = []
    
    def addTrail(self):
        # increment tail
        self.trail.append(self.position.copy())
    
    def updateTrail(self):
        self.addTrail()
        if len(self.trail) > self.tailLength:
            del self.trail[0]
    
    def updatePosition(self):
        for i in range(len(self.position)):
            self.position[i] += self.velocity[i]
    
    def update(self):
        self.updatePosition()
        self.updateTrail()
    
    @property
    def trailRects(self):
        # return tail rects for rendering
        return [pygame.Rect(x[0]*CELLSIZE[0] + Player._offset, x[1]*CELLSIZE[1] + Player._offset, CELLSIZE[0] - 2 * Player._offset, CELLSIZE[1] - 2 * Player._offset) for x in self.trail]
    
    def addPoint(self):
        # apple eaten - increment tail length
        self.tailLength += 1
        if self.tailLength == NUMBEROFCELLS:
            endGame(message = 'You Win!', waitLength=2)
    
    # AI - choose velocity of snake
    def autoVelocityChange(self, hamiltonCycleGrid, applePosition):        
        possiblePositions = []
        
        # for all possible movements by the snake
        for velocity in Player._velocities:
            # check - next velocity does not oppose current velocity
            if [-x for x in Player._velocities[velocity]] == self.velocity:
                continue
            
            # calculate next board position from velocity
            nextPosition = [x + y for x,y in zip(Player._velocities[velocity], self.position)]
            
            # check for valid coord
            validCoord = True
            for i, pos in enumerate(nextPosition):
                if not 0 <= pos < GRIDSIZE[i]:
                    validCoord = False
            if not validCoord:
                continue
            
            # avoid tail collision
            if nextPosition in self.trail:
                continue
            
            # get location numbers from cycle
            nextLocation = hamiltonCycleGrid[nextPosition[0]][nextPosition[1]]
            appleLocation = hamiltonCycleGrid[applePosition[0]][applePosition[1]]
            
            # find distance from apple
            distance = appleLocation - nextLocation            
            if distance < 0:
                distance += NUMBEROFCELLS
                
            # add new possible path
            possiblePositions.append((distance, velocity))
        
        # pick path with smallest distance from apple
        try:
            self.velocity = Player._velocities[min(possiblePositions)[1]]
        except:
            endGame(message='Game Over - Tail Collision', waitLength=2)
        
class Apple:
    # cell pixel offset
    _offset = 2
    
    def __init__(self, positionX, positionY):
        self.position = [positionX, positionY]
        
    def updatePosition(self, trail):
        # generate possible coords
        coords = []
        for i in range(GRIDSIZE[0]):
            for j in range(GRIDSIZE[1]):
                if not [i,j] in trail:
                    coords.append([i,j])
        
        # select new random coord
        self.position = random.choice(coords)

    @property
    def rect(self):
        # apple current rect
        return pygame.Rect(self.position[0]*CELLSIZE[0] + Apple._offset, self.position[1]*CELLSIZE[1] + Apple._offset, CELLSIZE[0] - 2 * Apple._offset, CELLSIZE[1] - 2 * Apple._offset)
        

def main():
    # start pygame
    pygame.init()
    
    # clock
    clock = pygame.time.Clock()
    
    # screen
    screen = pygame.display.set_mode(WINDOWSIZE)
    
    # objects
    player = Player(PLAYERPOSx, PLAYERPOSy, PLAYERVELOCITYx, PLAYERVELOCITYy)
    apple = Apple(APPLEPOSx, APPLEPOSy)
    
    # get hamilton cycle
    hamiltonCycle = getHamiltonCycle()
    
    # TEST CODE - fonts + ai cycle follow
    pygame.font.init()
    myfont = pygame.font.SysFont('Comic Sans MS', 30)
    
    # game loop
    while True:
        # reset display
        screen.fill(BLACK)
        
        # events - player movement
        player.autoVelocityChange(hamiltonCycle, apple.position)
        for event in pygame.event.get():
            if event.type == QUIT:
                endGame()
                    
         # update player
        player.update()
        
        # apple, player collision
        if player.position == apple.position:
            # increase tail length of player
            player.addPoint()
            
            # change apple position
            apple.updatePosition(player.trail)            
            
        # player, wall collision
        for i, pos in enumerate(player.position):
            if not 0 <= pos < GRIDSIZE[i]:
                endGame(message = 'Game Over - Wall Collision', waitLength = 2)

        # tail collision
        if player.trail.count(player.position) == 2 and player.velocity != [0,0]:
            endGame(message = 'Game Over - Tail Collision', waitLength = 2)
        
        # render player
        for trailRect in player.trailRects:
            pygame.draw.rect(screen, LIME, trailRect)
        
        # render apple
        pygame.draw.rect(screen, RED, apple.rect)
        
        # TEST CODE
        textsurface = myfont.render(f'{player.tailLength}', False, WHITE) 
        screen.blit(textsurface,(0,0))

        # refresh display
        pygame.display.update()
        
        clock.tick(FRAMERATE)
        

def getHamiltonCycle():
    # matrix to store cycle
    grid = [[None for j in range(20)] for i in range(20)]
    
    # possible movements - 1 unit
    movements = {
        'R': (0, 1),
        'L': (0, -1),
        'U': (-1, 0),
        'D': (1, 0)
    }
    
    # defaults
    headPos = [0,0]
    counter = 0
    grid[0][0] = counter
    
    # get cycle from file
    with open(CYCLEFILENAME) as file:
        for line in file.readlines():
            magnitude, move = line.split()
            for i in range(int(magnitude)):
                counter += 1
                headPos = [x + y for x,y in zip(headPos, movements[move])]
                grid[headPos[0]][headPos[1]] = counter
    
    return grid

def endGame(message = None, waitLength = 0):
    # show message to user
    if message:
        print(message)
        
    # wait 'n' seconds
    time.sleep(waitLength)    
    
    # exit game
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()