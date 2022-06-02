/**
  Adds functionality for the game board's grid
**/
import grid from '@/specs/boardSpecs';
import rooms from '@/mixins/rooms.mixin';
import coordinates from '@/mixins/coordinates.mixin';

export default {
  mixins: [rooms, coordinates],
  computed: {
    gridMap () {
      // Convert the board specs into an object that's easy to access
      let map = {};
      for (let rowIdx in grid) {
        for (let cell of grid[rowIdx]) {
          let x = cell.col;
          if (!map.hasOwnProperty(x)) {
            map[x] = {};
          }
          let y = parseInt(rowIdx);
          // Check to see if this cell has an adjacent room
          if (cell.room) {
            map[x][y] = { room: cell.room };
          } else {
            map[x][y] = true;
          }
        }
      }
      return map;
    },
    doorSpaces () {
      let doorSpaces = {};
      Object.keys(this.gridMap).forEach(x => {
        Object.keys(this.gridMap[x]).forEach(y => {
          let room = this.gridMap[x][y].room;
          if (this.isValidRoom(room)) {
            if (!doorSpaces.hasOwnProperty(room)) {
              doorSpaces[room] = [];
            }
            doorSpaces[room].push({x:parseInt(x),y:parseInt(y)});
          }
        });
      });
      return doorSpaces;
    }
  },
  methods: {
    isPositionOnBoard (position) {
      if (this.isCoordinates(position)) {
        let { x, y } = position;
        return this.gridMap.hasOwnProperty(x) && this.gridMap[`${x}`].hasOwnProperty(y);
      }
      return false;
    },
    adjacentRoom (position) {
      if (this.isPositionOnBoard(position) && this.gridMap[position.x][position.y].room) {
        return this.gridMap[position.x][position.y].room;
      }
      return null;
    }
  }
};
