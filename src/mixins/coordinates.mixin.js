/**
  Adds common functionality for coordinates on the board
**/
const OFFSET_SCALE = 3/8;

export default {
  props: {
    cellSize: Number
  },
  computed: {
    offsetScale () {
      return OFFSET_SCALE;
    }
  },
  methods: {
    isCoordinates (obj) {
      return obj.hasOwnProperty('x') && obj.hasOwnProperty('y');
    },
    getCoordinatesTranslation (coords) {
      return this.isCoordinates(coords) ? this.getXYTranslation(coords.x, coords.y) : '';
    },
    getXYTranslation (x, y) {
      return `translate(${this.cell(x)}, ${this.cell(y)})`;
    },
    offset(coord) {
      // A method to return an offset coordinate from a given board coordinate
      return (this.cellSize * this.offsetScale) + this.cell(coord);
    },
    cell(coord) {
      return this.cellSize * coord;
    }
  }
};
