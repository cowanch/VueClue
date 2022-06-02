<template>
  <div class="css-player-select">
    <h2>Select Players</h2>
    <table>
      <tr v-for="(player, pkey) in players"
          :key="pkey">
        <td>{{ player }}</td>
        <td>
          <select v-model="selections[pkey]">
            <option v-for="(option, okey) in options"
                    :value="okey"
                    :key="okey"
                    :disabled="isOptionDisabled(okey)">
              {{ option }}
            </option>
          </select>
        </td>
      </tr>
    </table>
    <button @click="$emit('finish')"
            :disabled="!isMinimumSelected">
      Finished
    </button>
  </div>
</template>

<style scoped>
td {
  padding: 5px 10px 5px 0px;
}
button {
  margin-top: 2em;
}
</style>

<script>
import {playerTypes} from '@/specs/playerTypeSpecs';

export default {
  name: 'PlayerSelect',
  props: {
    value: {
      type: Object,
      required: true,
      validator: (val) => val.hasOwnProperty('scarlet') && val.hasOwnProperty('mustard') && val.hasOwnProperty('white')
                          && val.hasOwnProperty('green') && val.hasOwnProperty('peacock') && val.hasOwnProperty('plum')
    }
  },
  computed: {
    options () {
      return {
        disabled: 'Disabled',
        [playerTypes.HUMAN]: 'Human Player',
        [playerTypes.CPU_EASY]: 'CPU Easy',
        [playerTypes.CPU_MEDIUM]: 'CPU Medium',
        [playerTypes.CPU_HARD]: 'CPU Hard'
      };
    },
    players () {
      return { scarlet: 'Miss Scarlet', mustard: 'Colonel Mustard', white: 'Mrs. White', green: 'Mr. Green', peacock: 'Miss Peacock', plum: 'Prof. Plum' };
    },
    isMinimumSelected () {
      return Object.values(this.value).filter(val => val !== playerTypes.DISABLED).length >= 3;
    },
    isHumanPlayerSelected () {
      return Object.values(this.selections).some(selection => selection === playerTypes.HUMAN);
    }
  },
  data () {
    return {
      selections: this.value
    }
  },
  methods: {
    isOptionDisabled (value) {
      return value === playerTypes.HUMAN && this.isHumanPlayerSelected;
    }
  },
  watch: {
    selections: {
      handler (selected) {
        this.$emit('input', selected);
      },
      deep: true
    },
    value: {
      handler (val) {
        this.selections = val;
      },
      deep: true
    }
  }
};
</script>
