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
