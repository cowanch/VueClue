<template>
  <div :class="{ 'css-player-cards-grid': gridView, 'css-player-cards': !gridView }">
    <card v-for="(card) in cards"
          :key="card"
          class="css-card"
          :class="{'css-hover':selection}"
          :size="cardScale"
          :id="card"
          @click="() => emitCardSelected(card)"/>
  </div>
</template>

<style scoped>
.css-player-cards-grid {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: max-content;
}
.css-player-cards {
  display: flex;
}
.css-card {
  margin: 10px 10px;
}
.css-hover {
  cursor: pointer;
}
</style>

<script>
import Card from '@/components/pieces/Card';

export default {
  name: 'CardDisplay',
  props: {
    cards: Array,
    selection: Boolean,
    gridView: Boolean
  },
  data () {
    return {
      cardScale: 2
    };
  },
  methods: {
    emitCardSelected (card) {
      if (this.selection) {
        this.$emit('card-selected', card);
      }
    }
  },
  components: {
    Card
  }
};
</script>
