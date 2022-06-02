/**
  Adds common functionality for cards in the deck of clue cards
**/
import { deck } from '@/specs/cardSpecs';

export default {
  computed: {
    suspects () {
      return deck.suspects;
    },
    weapons () {
      return deck.weapons;
    },
    rooms () {
      return deck.rooms;
    }
  },
  methods: {
    getCardText (card) {
      if (this.suspects.hasOwnProperty(card)) {
        return this.suspects[card];
      } else if (this.weapons.hasOwnProperty(card)) {
        return this.weapons[card];
      } else if (this.rooms.hasOwnProperty(card)) {
        return this.rooms[card];
      }
    }
  }
};
