<!--
  The board model. This will keep track of spaces and rooms on the board, as well as rendering where each player is located
-->
<template>
  <svg height="100%" width="50%">
    <g :transform="`translate(${cellSize}, ${cellSize})`"
       :style="cssVars">
      <spaces v-bind="boardProps"
              :available-moves="availableMoves"
              @click="emitMove"/>
      <rooms v-bind="boardProps"
             :available-moves="availableMoves"
             @click="emitMove"
             @passage="emitPassage"/>
      <player-tokens v-bind="boardProps"
                     :coordinates="tokenCoordinates.players"/>
      <weapon-tokens v-bind="boardProps"
                     :coordinates="tokenCoordinates.weapons"/>
    </g>
  </svg>
</template>

<style>
rect, polygon, path {
  fill: white;
}

.highlight {
  fill: #00FFFF;
  cursor: pointer;
}

line, path {
  stroke: red;
  stroke-width: var(--border-width);
}

line.door, rect {
  stroke: black;
  stroke-width: var(--cell-line-width);
}

text {
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
  text-anchor: middle;
  dominant-baseline: middle
}

text.css-passage {
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 10px;
  text-anchor: middle;
  dominant-baseline: middle
}
</style>

<script>
// Components
import Spaces from '@/components/board/Spaces';
import Rooms from '@/components/board/Rooms';
import PlayerTokens from '@/components/pieces/PlayerTokens';
import WeaponTokens from '@/components/pieces/WeaponTokens';
// Mixins
import moves from '@/mixins/moves.mixin';

const CELL_SIZE = 35;
const CELL_LINE_WIDTH = 2;
const BORDER_WIDTH = 4;

export default {
  name: 'Board',
  mixins: [moves],
  props: {
    tokenCoordinates: {
      type: Object,
      required: true,
      validator: (val) => val.hasOwnProperty('players') && val.hasOwnProperty('weapons')
    }
  },
  computed: {
    boardProps () {
      return {
        cellSize: CELL_SIZE,
        cellLineWidth: CELL_LINE_WIDTH,
        borderWidth: BORDER_WIDTH
      };
    },
    cellSize () {
      return this.boardProps.cellSize;
    },
    cssVars () {
      return {
        '--cell-line-width': this.boardProps.cellLineWidth,
        '--border-width': this.boardProps.borderWidth
      };
    }
  },
  methods: {
    emitMove (moveTo) {
      if (this.isAvailableMove(moveTo)) {
        this.$emit('move', moveTo);
      }
    },
    emitPassage (moveTo) {
      if (this.isAvailablePassage(moveTo)) {
        this.$emit('passage', moveTo);
      }
    }
  },
  components: {
    Spaces,
    Rooms,
    PlayerTokens,
    WeaponTokens
  }
};
</script>
