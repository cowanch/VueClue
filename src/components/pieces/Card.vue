<template>
  <div class="css-card"
       :style="{width:widthPx, height:heightPx}"
       @click="() => $emit('click')">
    <p>{{cardText}}</p>
  </div>
</template>

<style scoped>
.css-card {
  border: 1px solid black;
  border-radius: 5px;
}
</style>

<script>
import {cardDimensions, deck} from '@/specs/cardSpecs';

export default {
  name: 'Card',
  props: {
    size: {
      type: Number,
      default: 1
    },
    id: String
  },
  computed: {
    cardText () {
      return deck.suspects[this.id] || deck.weapons[this.id] || deck.rooms[this.id] || '';
    },
    widthPx () {
      return `${cardDimensions.width * this.size}px`;
    },
    heightPx () {
      return `${cardDimensions.height * this.size}px`;
    }
  }
};
</script>
