import { get } from '../utils.js';

class Map {
    constructor(scene) {
        this.scene = scene;

        document.addEventListener("MAP:DATA:LOADED", (event) => {
            this.processMap();
        });

        document.addEventListener("MAP:TILESET:LOADED", (event) => {
            this.renderMap();
        });
    }

    /**
     * Loads the given map from /assets/maps/[name].json
     * @param name
     */
    load(name) {
        const path = '/grid-mas/assets/maps/' + name + '.json';
        get(path).then((response) => {
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

        // Load image.
        this.tileset.img = new Image();
        this.tileset.img.src = '/grid-mas/assets/spritesheets/' + tilesetImageUrl;
        this.tileset.img.onload = () => {
            document.dispatchEvent(new Event('MAP:TILESET:LOADED'));
        };

        // Generate pathfinding array.
        console.log(this.scene.map);
        // Loop through layers.
        // If something is in layer Ground and not 0, it is walkable.
        // If something is in layer Water and not 0, it is walkable and has a cost of 2.
        // If something is in layer Roads and not 0, it is walkable and has a cost of 0.5.
        // If something is in layer Obstacles and not 0, it is not walkable.

        // Easystar sets acceptable tiles (so Ground, Water, Roads)
        // Easystar can set tile cost on tile types.
        // So, if layers are represented by their tilecost number.
        // if (layer.properties.movementCost < 10) {
        //      add to acceptable tiles array
        //      set tile cost
        // }
        // Assuming 10 is an arbitrary cutoff value, where any movement cost equal to or higher than 10 becomes unwalkable.


        const layers = this.scene.map.layers;
        let layer, tileId;

        // Loop through layers.
        for (let i = 0, len = layers.length; i < len; i++) {
            // For each layer, draw each cell.
            layer = layers[i];
            console.log(layer.properties.movementCost)
            for (let j = 0, len = layer.data.length; j < len; j++) {
                tileId = layer.data[j];
                if (tileId !== 0) {

                }
            }
        }
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
    }
}

export default Map;