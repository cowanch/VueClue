<template>
  <div class="css-player-select">
    <h2>Debug Menu</h2>
    <button @click="emitAutoPlay"
            :disabled="!isMinimumSelected || isAnyPlayerHuman">
      Auto Play
    </button>
    <button @click="emitTestProvenSuggestion"
            :disabled="!isMinimumSelected || isAnyPlayerHuman">
      Test Proven Suggestion
    </button>
  </div>
</template>

<script>
import {playerTypes} from '@/specs/playerTypeSpecs';
import {debugTests} from '@/specs/debugSpecs';

export default {
  name: 'DebugMenu',
  props: {
    value: {
      type: Object,
      required: true,
      validator: (val) => val.hasOwnProperty('scarlet') && val.hasOwnProperty('mustard') && val.hasOwnProperty('white')
                          && val.hasOwnProperty('green') && val.hasOwnProperty('peacock') && val.hasOwnProperty('plum')
    }
  },
  computed: {
    isMinimumSelected () {
      return Object.values(this.value).filter(val => val !== playerTypes.DISABLED).length >= 3;
    },
    isAnyPlayerHuman () {
      return Object.values(this.value).filter(val => val === playerTypes.HUMAN).length >= 1;
    }
  },
  methods: {
    emitAutoPlay () {
      this.$emit('debug', debugTests.AUTO_PLAY);
    },
    emitTestProvenSuggestion () {
      this.$emit('debug', debugTests.PROVEN_SUGGESTION);
    }
  }
};
</script>
