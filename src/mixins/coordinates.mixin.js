/**
  Adds common functionality for coordinates on the board
**/
export default {
  methods: {
    // Checks if the passed in  object is a set of coordinates (x, y)
    isCoordinates (obj) {
      return obj && obj.hasOwnProperty ? obj.hasOwnProperty('x') && obj.hasOwnProperty('y') : false;
    },
    // Checks if the passed in objects are a pair of equal coordinates
    coordinatesEqual (obj1, obj2) {
      if (this.isCoordinates(obj1) && this.isCoordinates(obj2)) {
        return obj1.x === obj2.x && obj1.y === obj2.y;
      }
      return false;
    },
    // Get the midpoint coordinates between 2 coordinates
    getMidpoint (obj1, obj2) {
      if (this.isCoordinates(obj1) && this.isCoordinates(obj2)) {
        return {
          x: (obj1.x + obj2.x) / 2,
          y: (obj1.y + obj2.y) / 2
        };
      }
      return null;
    },
    // Finds the distance between 2 coordinates
    findDistanceBetween (obj1, obj2) {
      if (this.isCoordinates(obj1) && this.isCoordinates(obj2)) {
        return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
      }
      return null;
    },
    // Finds the number of spaces to traverse along horizontally and vertically assuming no obstructions
    findSpacesBetween (obj1, obj2) {
      if (this.isCoordinates(obj1) && this.isCoordinates(obj2)) {
        let hSpaces = Math.abs(obj1.x - obj2.x);
        let vSpaces = Math.abs(obj1.y - obj2.y);
        return hSpaces + vSpaces;
      }
      return null;
    },
    // Adds a coordinate to a provided object
    addCoordinateToObject (obj, coord) {
      if (this.isCoordinates(coord)) {
        let { x, y } = coord;
        if (!obj.hasOwnProperty(x)) {
          obj[x] = {};
        }
        obj[x][y] = true;
      }
    },
    // Checks if an object contains a coordinate
    doesObjectContainCoordinate (obj, coord) {
      if (this.isCoordinates(coord)) {
        let { x, y } = coord;
        return obj[x] && obj[x][y];
      }
      return false;
    }
  }
};
