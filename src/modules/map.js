import * as Utils from '../utils.js';
import * as Easystar from 'easystarjs';

let easystar = new Easystar.js();
easystar.enableDiagonals();
easystar.disableCornerCutting();

class Map {
    constructor(scene) {
        this.scene = scene;

        document.addEventListener("MAP:DATA:LOADED", (event) => {
            this.processMap();
        });

        document.addEventListener("MAP:TILESET:LOADED", (event) => {
            this.renderMap();
        });
        scene.mapObj = this;
    }

    /**
     * Loads the given map from /assets/maps/[name].json
     * @param name
     */
    load(name) {
        const path = '/assets/maps/' + name + '.json';
        Utils.get(path).then((response) => {
            // Add map data to scene.
            this.scene.map = JSON.parse(response);

            // Fire MAP:LOADED event.
            document.dispatchEvent(new Event('MAP:DATA:LOADED'));

        }, (error) => {
            console.error("Failed to load map `" + name + "` from `" + path + "`.");
        });
    }

    /**
     * Get the tilesheet image and load it.
     * Create the pathfinding map?
     */
    processMap() {
        // Load tileset.
        this.tileset = this.scene.map.tilesets[0];
        const tilesetImageUrl = this.tileset.image.split('/').pop();

        const layers = this.scene.map.layers;
        let layer, tileId;

        // Create empty two-dimensional array of map size.
        let easyMap = Utils.create2DArr(this.scene.map.width, this.scene.map.height);
        let acceptableTiles = [];

        // Loop through layers.
        for (let i = 0, len = layers.length; i < len; i++) {

            layer = layers[i];
            let movementCost = layer.properties.movementCost;

            // Set tile cost based on layer property.
            easystar.setTileCost(movementCost, movementCost);

            // Build array of acceptable tiles.
            if (movementCost < 10) {
                acceptableTiles.push(movementCost);
            }

            let layerCell = 0;
            // Loop through easyMap and update tile movement costs.
            // For each row.
            for (let j = 0, len = easyMap.length; j < len; j++) {
                let easyRow = easyMap[j];
                // For each col.
                for (let easyCol = 0, len = easyRow.length; easyCol < len; easyCol++) {
                    // If the map cell isn't 0, update the easyMap's value for that cell.
                    if (layer.data[layerCell] !== 0) {
                        easyRow[easyCol] = movementCost;
                    }

                    layerCell++;
                }
            }
        }

        // Set acceptable tiles.
        easystar.setAcceptableTiles(acceptableTiles);

        // Store movement map in scene.
        this.scene.map.movementMap = easyMap;

        // Load image.
        this.tileset.img = new Image();
        this.tileset.img.src = '/assets/spritesheets/' + tilesetImageUrl;
        this.tileset.img.onload = () => {
            document.dispatchEvent(new Event('MAP:TILESET:LOADED'));
        };
    }

    /**
     * Returns coordinates on tileset of given cell id.
     * @param tileId {number} - id of tileset cell to render.
     */
    getTileCoords(tileId) {
        // ID's are calculated left to right, top to bottom.
        // CellID 63 is row 2 column 6 on a 57 column tileset.
        const cols = this.tileset.columns;
        const spacing = this.tileset.spacing;
        const tilesize = this.tileset.tilewidth;

        const row = Math.floor(tileId / cols);
        const col = tileId % cols;

        return {
            x: (col - 1) * tilesize + (spacing * col) - 1,
            y: row * tilesize + (spacing * row)
        }
    }

    /**
     * Draw the given tile at the given cell.
     * @param cellId {number} - cell to draw tile at.
     * @param tileId {number} - tile to draw.
     */
    drawCell(cellId, tileId) {

        const coords = this.getTileCoords(tileId);

        const cols = this.scene.map.width;
        const tilesize = this.scene.map.tilewidth;

        const row = Math.floor(cellId / cols);
        const col = cellId % cols;

        const dest = {
            x: col * tilesize,
            y: row * tilesize
        };

        this.scene.ctx.drawImage(this.tileset.img, coords.x, coords.y, this.tileset.tilewidth, this.tileset.tileheight, dest.x, dest.y, this.tileset.tilewidth, this.tileset.tileheight);
    }

    // Finds a path from the source to the target for the given entity.
    findPath(sourceCol, sourceRow, targetCol, targetRow, entity) {
        easystar.setGrid(this.scene.map.movementMap);
        easystar.findPath(sourceCol, sourceRow, targetCol, targetRow, (path) => {
            if (path !== null && path.length > 0) {
                entity.moveTo(path[1].x, path[1].y);
            }
        });
        easystar.calculate();
    }

    /**
     * Render the map.
     */
    renderMap() {
        // Set canvas size.
        this.scene.ctx.canvas.width = this.scene.map.width * this.tileset.tilewidth;
        this.scene.ctx.canvas.height = this.scene.map.height * this.tileset.tileheight;

        const layers = this.scene.map.layers;
        let layer, tileId;

        // Loop through layers.
        for (let i = 0, len = layers.length; i < len; i++) {
            // For each layer, draw each cell.
            layer = layers[i];
            for (let j = 0, len = layer.data.length; j < len; j++) {
                tileId = layer.data[j];
                this.drawCell(j, tileId)
            }
        }

        document.dispatchEvent(new Event('MAP:RENDERED'));
    }
}

export default Map;
