import { get } from '../utils.js';

class Map {
    constructor(scene) {
        this.scene = scene;

        document.addEventListener("MAP:LOADED", (event) => {
            this.processMap();
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
            document.dispatchEvent(new Event('MAP:LOADED'));

        }, (error) => {
            console.error("Failed to load map `" + name + "` from `" + path + "`.");
        });
    }

    processMap() {
        // Load tilesets.
        console.log(this.scene);
        const tilesetImage = this.scene.map.tilesets[0];
        const tilesetImageUrl = tilesetImage.image.split('/').pop();
        console.log(tilesetImage, tilesetImageUrl);

        this.scene.ctx.canvas.width = tilesetImage.imagewidth;
        this.scene.ctx.canvas.height = tilesetImage.imageheight;

        tilesetImage.img = new Image();
        tilesetImage.img.src = '/grid-mas/assets/spritesheets/' + tilesetImageUrl;
        tilesetImage.img.onload = () => {
            this.scene.ctx.drawImage(tilesetImage.img, 0, 0);
        };



        // Load image into canvas.

    }
}

export default Map;