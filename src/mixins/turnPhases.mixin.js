/**
  Adds common functionality pertaining to the phases of a player's turn
**/
import {phases} from '@/specs/turnSpecs';

export default {
  computed: {
    phases () {
      return phases;
    },
    rollPhases () {
      return [this.phases.ROLL, this.phases.ROLL_OR_SUGGEST];
    },
    suggestionPhases () {
      return [this.phases.SUGGEST, this.phases.ROLL_OR_SUGGEST];
    }
  },
  methods: {
    isRollPhase (phase) {
      return this.rollPhases.includes(phase);
    },
    isSuggestionPhase (phase) {
      return this.suggestionPhases.includes(phase);
    }
  }
}
