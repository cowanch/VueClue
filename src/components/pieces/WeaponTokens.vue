<template>
  <g>
    <!-- Candlestick -->
    <use v-if="candlestick && isCoordinates(candlestick)"
         :width="tokenWidth"
         :height="tokenHeight"
         href="@/assets/tokens/weapons.svg#candlestick"
         :transform="getCoordinatesTranslation(candlestick)"/>
    <!-- Knife -->
    <use v-if="knife && isCoordinates(knife)"
         :width="tokenWidth"
         :height="tokenHeight"
         href="@/assets/tokens/weapons.svg#knife"
         :transform="`${getCoordinatesTranslation(knife)} ${rotate90}`"/>
    <!-- Pipe -->
    <use v-if="pipe && isCoordinates(pipe)"
         :width="tokenWidth"
         :height="tokenHeight"
         href="@/assets/tokens/weapons.svg#pipe"
         :transform="getCoordinatesTranslation(pipe)"/>
    <!-- Revolver -->
    <use v-if="revolver && isCoordinates(revolver)"
         :width="tokenWidth"
         :height="tokenHeight"
         href="@/assets/tokens/weapons.svg#revolver"
         :transform="`${getCoordinatesTranslation(revolver)} ${rotate90}`"/>
    <!-- Rope -->
    <use v-if="rope && isCoordinates(rope)"
         :width="tokenWidth"
         :height="tokenHeight"
         href="@/assets/tokens/weapons.svg#rope"
         :transform="getCoordinatesTranslation(rope)"/>
    <!-- Wrench -->
    <use v-if="wrench && isCoordinates(wrench)"
         :width="tokenWidth"
         :height="tokenHeight"
         href="@/assets/tokens/weapons.svg#wrench"
         :transform="getCoordinatesTranslation(wrench)"/>
  </g>
</template>

<script>
import cellScaling from '@/mixins/cellScaling.mixin';
import roomCoords from '@/mixins/roomCoords.mixin';

export default {
  name: 'WeaponTokens',
  mixins: [cellScaling,roomCoords],
  props: {
    coordinates: {
      type: Object,
      required: true,
      validator: (val) => val.hasOwnProperty('candlestick') && val.hasOwnProperty('knife') && val.hasOwnProperty('pipe')
                          && val.hasOwnProperty('revolver') && val.hasOwnProperty('rope') && val.hasOwnProperty('wrench')
    }
  },
  computed: {
    candlestick () {
      return this.boardCoordinates.candlestick || null;
    },
    knife () {
      return this.boardCoordinates.knife || null;
    },
    pipe () {
      return this.boardCoordinates.pipe || null;
    },
    revolver () {
      return this.boardCoordinates.revolver || null;
    },
    rope () {
      return this.boardCoordinates.rope || null;
    },
    wrench () {
      return this.boardCoordinates.wrench || null;
    },
    tokenHeight () {
      return this.cellSize * 2;
    },
    tokenWidth () {
      return this.cellSize;
    },
    rotate90 () {
      return `translate(${this.tokenHeight/2}, 0) rotate(90 ${this.tokenWidth/2} ${this.tokenHeight/4})`;
    }
  }
};
</script>
