<!--
  A component to hold all of the space squares to make it easier to debug the board
-->
<template>
  <g>
    <!-- Starting Space Markers -->
    <circle :cx="cellSize/2" :cy="cellSize/2" :r="offset(1)"
            :transform="getXYTranslation(16, offsetScale)"
            fill="red"/>
    <circle :cx="cellSize/2" :cy="cellSize/2" :r="offset(1)"
            :transform="getXYTranslation(23-offsetScale, 7)"
            fill="yellow"/>
    <circle :cx="cellSize/2" :cy="cellSize/2" :r="offset(1)"
            :transform="getXYTranslation(14, 24-offsetScale)"
            fill="white"
            stroke="black"/>
    <circle :cx="cellSize/2" :cy="cellSize/2" :r="offset(1)"
            :transform="getXYTranslation(9, 24-offsetScale)"
            fill="green"/>
    <circle :cx="cellSize/2" :cy="cellSize/2" :r="offset(1)"
            :transform="getXYTranslation(offsetScale, 18)"
            fill="blue"/>
    <circle :cx="cellSize/2" :cy="cellSize/2" :r="offset(1)"
            :transform="getXYTranslation(offsetScale, 5)"
            fill="purple"/>
    <!-- Grid Spaces -->
    <g v-for="(cell) in spaces"
       :key="`cell-row-${cell.coordinates.y}-col-${cell.coordinates.x}`"
       :transform="getCoordinatesTranslation(cell.coordinates)">
      <!-- space square -->
      <rect :class="{ highlight: isAvailableMove(cell.coordinates) }"
            :width="cellSize" :height="cellSize"
            @click="$emit('click', cell.coordinates)"/>
    </g>
    <g v-for="(cell) in spaces"
       :key="`border-row-${cell.coordinates.y}-col-${cell.coordinates.x}`"
       :transform="getCoordinatesTranslation(cell.coordinates)">
      <!-- top border -->
      <line v-if="cell.borders.top"
            v-bind="getBorderCoordinates('top')"/>
      <!-- left border -->
      <line v-if="cell.borders.left"
            v-bind="getBorderCoordinates('left')"/>
      <!-- bottom border -->
      <line v-if="cell.borders.bottom"
            v-bind="getBorderCoordinates('bottom')"/>
      <!-- right border -->
      <line v-if="cell.borders.right"
            v-bind="getBorderCoordinates('right')"/>
    </g>
  </g>
</template>

<script>
// Mixins
import cellScaling from '@/mixins/cellScaling.mixin';
import moves from '@/mixins/moves.mixin';
// Specs
import grid from '@/specs/boardSpecs';

export default {
  name: 'BoardSpaces',
  mixins: [cellScaling,moves],
  props: {
    cellLineWidth: Number
  },
  computed: {
    spaces () {
      let spaces = [];
      for (let rowIdx in grid) {
        for (let cell of grid[rowIdx]) {
          spaces.push({
            coordinates: { x: cell.col, y: parseInt(rowIdx) },
            borders: cell.borders
          });
        }
      }
      return spaces;
    }
  },
  methods: {
    getBorderCoordinates (direction) {
      let coords = { x1: 0, x2: 0, y1: 0, y2: 0 };
      if (direction === 'top' || direction === 'bottom') {
        coords.x1 = -this.cellLineWidth / 2;
        coords.x2 = this.cellSize + (this.cellLineWidth / 2);
        if (direction === 'bottom') {
          coords.y1 = coords.y2 = this.cellSize;
        }
      }
      if (direction === 'left' || direction === 'right') {
        coords.y1 = -this.cellLineWidth / 2;
        coords.y2 = this.cellSize + (this.cellLineWidth / 2);
        if (direction == 'right') {
          coords.x1 = coords.x2 = this.cellSize;
        }
      }
      return coords;
    }
  }
};
</script>
