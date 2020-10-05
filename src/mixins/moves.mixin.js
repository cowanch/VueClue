/**
  Adds common functionality for available moves on the board
**/
import coordinates from '@/mixins/coordinates.mixin';

export default {
  mixins: [coordinates],
  props: {
    availableMoves: Object
  },
  methods: {
    isAvailableMove (moveTo) {
      if (this.isCoordinates(moveTo)) {
        return this.availableMoves.hasOwnProperty(moveTo.x) && this.availableMoves[moveTo.x].hasOwnProperty(moveTo.y);
      } else {
        return this.availableMoves[moveTo];
      }
    },
    isAvailablePassage (moveTo) {
      if (!this.isCoordinates(moveTo)) {
        return this.availableMoves[`passage-${moveTo}`];
      }
      return false;
    }
  }
};
