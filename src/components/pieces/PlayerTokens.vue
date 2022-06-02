<template>
  <g>
    <!-- Miss Scarlet -->
    <circle v-if="scarlet && isCoordinates(scarlet)"
            :cx="positionOffset" :cy="positionOffset" :r="tokenRadius"
            :transform="getCoordinatesTranslation(scarlet)"
            fill="red"/>
    <!-- Colonel Mustard -->
    <circle v-if="mustard && isCoordinates(mustard)"
            :cx="positionOffset" :cy="positionOffset" :r="tokenRadius"
            :transform="getCoordinatesTranslation(mustard)"
            fill="yellow"/>
    <!-- Mrs. White -->
    <circle v-if="white && isCoordinates(white)"
            :cx="positionOffset" :cy="positionOffset" :r="tokenRadius"
            :transform="getCoordinatesTranslation(white)"
            fill="white"/>
    <!-- Mr. Green -->
    <circle v-if="green && isCoordinates(green)"
            :cx="positionOffset" :cy="positionOffset" :r="tokenRadius"
            :transform="getCoordinatesTranslation(green)"
            fill="green"/>
    <!-- Mrs. Peacock -->
    <circle v-if="peacock && isCoordinates(peacock)"
            :cx="positionOffset" :cy="positionOffset" :r="tokenRadius"
            :transform="getCoordinatesTranslation(peacock)"
            fill="blue"/>
    <!-- Professor Plum -->
    <circle v-if="plum && isCoordinates(plum)"
            :cx="positionOffset" :cy="positionOffset" :r="tokenRadius"
            :transform="getCoordinatesTranslation(plum)"
            fill="purple"/>
  </g>
</template>

<style scoped>
circle {
  stroke: black;
}
</style>

<script>
import cellScaling from '@/mixins/cellScaling.mixin';
import roomCoords from '@/mixins/roomCoords.mixin';

export default {
  name: 'PlayerTokens',
  mixins: [cellScaling,roomCoords],
  props: {
    coordinates: {
      type: Object,
      required: true,
      validator: (val) => val.hasOwnProperty('scarlet') && val.hasOwnProperty('mustard') && val.hasOwnProperty('white')
                          && val.hasOwnProperty('green') && val.hasOwnProperty('peacock') && val.hasOwnProperty('plum')
    }
  },
  computed: {
    scarlet () {
      return this.boardCoordinates.scarlet || null;
    },
    mustard () {
      return this.boardCoordinates.mustard || null;
    },
    white () {
      return this.boardCoordinates.white || null;
    },
    green () {
      return this.boardCoordinates.green || null;
    },
    peacock () {
      return this.boardCoordinates.peacock || null;
    },
    plum () {
      return this.boardCoordinates.plum || null;
    },
    tokenRadius () {
      return this.cellSize / 3;
    },
    positionOffset () {
      return this.cellSize / 2;
    }
  }
};
</script>
