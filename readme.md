# Grid Multi Agent Simulation

## Grid Contents
The grid should have a master object that contains the following information:

- width (in cells)
- height (in cells)
- cellSize (width/height of cell - cells are square so only one value needed)
- two dimensional array of grid cell objects
- representation of grid for use by pathfinding library

## Cell Contents
Each cell object should contain the following information

- id
- column
- row
- movementCost
- isOccupied (mainly for referencing whether cell already has an entity inside it - maybe this doesn't matter? how would wolves eat rabbits otherwise? Dumb, don't want 100 rabbits on one tile, attacks should be to adjacent cells)

## Cells

Cells should be referenceable by:

- id - ideal for returning a single value to reference a cell
- row/column - useful for pathfinding and such
- screen pixel x/y - useful for mouse interaction with grid, easy to convert into row/column

## Pathfinding

Calculating a path from A to B should be a single function that simply returns a route. This will make it easier to allow changes in behaviour - an entity can get a route once and follow it blindly, or refresh its route on every tick once moving obstacles/threats exist.]

## entity.moveTo(row, col)

This function will calculate a path from the entity's current position to the given coordinates. It will store this path against the entity and the entity's update function will detect the presence of a path and move the entity along that path until it reaches the end or is changed.

Does it make sense for entities to have a calculatePath function and a move function and keep them separate?

## entity.moveDir(dir)

This function allows the entity to move one tile in the given direction.git

# Build

Just run `webpack-dev-server` in the project root and it will build and serve everything.

# Notes

- Entities should have models.
- The world and its entities are being drawn into the same canvas, so in order to clear the canvas every frame, the world has to be redrawn every frame. This is inefficient considering that the world never changes; it should be in its own canvas.
- Not quite happy with the scene object. Once this is done, I should analyse it and see what I would improve.

# Thoughts

Using Markov Chains to generate behaviour

Rabbit is in waiting state
Rabbit is in hungry state
Rabbit is in eating state

A Fox walks close enough to alert the Rabbit

Rabbit is in scared state

This interrupts the chain by changing the Rabbit’s state externally
The Rabbit’s state when scared should not change ‘randomly’, it is being influenced by the presence of the Fox. It will run until it escapes the Fox or is eaten.

States could have time limits associated with them. Walking could be a short-term state, say 2 seconds, whereas being scared and running could be a 10 second state.

‘Sensing Danger’ could be a state that is switched into, making the Rabbit much more aware of its surroundings
	Does that mean it can’t sense danger when in a different state?
	Is Sensing Danger a passive skill that can be boosted by being in an active state?

Alternately, the Rabbit could have Primary states (calm, scared) that are managed by outside influence, and Secondary states that are dictated by the Primary state.  A Rabbit can be moved out of Calm and into Scared at any time, and this wipes its behaviour pattern and replaced it with a new one.
	This feels too complex and prescribed and like it won’t result in as much unexpected behaviour.

state:
	name
	duration
	behaviour

Game Loop

1 second ‘tick’?


If something is in the IDLE state for 5 seconds, what is it doing?
If something is in the WALKING state, is that a 1 second state where every second it moves one tile?
