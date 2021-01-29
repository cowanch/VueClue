<template>
  <div class="css-game-panel">
    <die v-if="showDie"
         :value="dieValue"/>
    <div v-if="!optionsShown">
      <template v-if="isHumanTurn">
        <button v-if="showDie"
                @click="rollDie"
                :disabled="rollDisabled">
          Roll Die
        </button>
        <button v-if="showSuggestionPrompt"
                @click="showSuggestionOptions=true">
          Make Suggestion
        </button>
        <button v-if="showEndTurn"
                @click="() => $emit('end-turn')">
          End Turn
        </button>
        <button v-if="showAccusationPrompt"
                @click="showAccusationOptions=true">
          Make Accusation
        </button>
      </template>
      <button v-else
              :disabled="!cpuAction"
              @click="handleCpuNext">
        Next
      </button>
    </div>
    <div v-else-if="showSuggestionOptions">
      <clue-options v-model="suggestion"
                    :room="playerRoom"/>
      <button @click="makeSuggestion"
              :disabled="!suggestionReady">
        Suggest
      </button>
    </div>
    <div v-else-if="showAccusationOptions">
      <clue-options v-model="accusation"/>
      <button @click="makeAccusation"
              :disabled="!accusationReady">
        Accuse
      </button>
      <button @click="showAccusationOptions=false">
        Cancel
      </button>
    </div>
    <card-display :cards="cardSelection"
                  :selection="true"
                  @card-selected="disprove"/>
  </div>
</template>

<style>
.css-game-panel button {
  margin-right: 20px;
  margin-top: 20px;
}
textarea {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  resize: none;
}
</style>

<script>
import Die from '@/components/pieces/Die';
import ClueOptions from '@/components/controls/panel/ClueOptions';
import CardDisplay from '@/components/controls/panel/CardDisplay';
import rooms from '@/mixins/rooms.mixin';
import turnPhases from '@/mixins/turnPhases.mixin';
import { actions } from '@/specs/cpuSpecs';

const ROLLS = 5;

export default {
  name: 'GamePanel',
  mixins: [rooms,turnPhases],
  props: {
    turnPhase: String,
    playerPosition: [String, Object],
    cardSelection: Array,
    gameOver: Boolean,
    isHumanTurn: Boolean,
    cpuAction: Object
  },
  data () {
    return {
      dieValue: 0,
      showSuggestionOptions: false,
      showAccusationOptions: false,
      suggestion: {
        suspect: '',
        weapon: ''
      },
      accusation: {
        suspect: '',
        weapon: '',
        room: ''
      },
      isDieRolling: false
    };
  },
  computed: {
    rollDisabled () {
      return !this.isRollPhase(this.turnPhase) || this.isDieRolling;
    },
    showDie () {
      return (this.isRollPhase(this.turnPhase) || this.turnPhase === this.phases.MOVE) && !this.optionsShown;
    },
    showSuggestionPrompt () {
      return this.isSuggestionPhase(this.turnPhase);
    },
    suggestionReady () {
      return this.suggestion.suspect && this.suggestion.weapon && this.playerRoom;
    },
    showAccusationPrompt () {
      return (!this.rollDisabled || this.showSuggestionPrompt || this.showEndTurn) && !this.gameOver;
    },
    accusationReady () {
      return this.accusation.suspect && this.accusation.weapon && this.accusation.room;
    },
    playerRoom () {
      return this.isValidRoom(this.playerPosition) ? this.playerPosition : '';
    },
    showEndTurn () {
      return this.turnPhase === this.phases.END;
    },
    optionsShown () {
      return this.showSuggestionOptions || this.showAccusationOptions;
    }
  },
  methods: {
    rollDie () {
      this.isDieRolling = true;
      this.generateRoll();
    },
    generateRoll (rollNumber = 0) {
      this.dieValue = Math.ceil(Math.random() * 6);
      if (rollNumber < ROLLS) {
        setTimeout(() => {
          this.generateRoll(rollNumber+1);
        }, 100);
      } else {
        this.$emit('die-rolled', this.dieValue);
        this.isDieRolling = false;
      }
    },
    endTurn () {
      this.$emit('end-turn');
    },
    makeSuggestion () {
      if (this.suggestionReady) {
        this.emitSuggestion({
          suspect: this.suggestion.suspect,
          weapon: this.suggestion.weapon,
          room: this.playerRoom
        });
      }
    },
    emitSuggestion (suggestion) {
      this.$emit('suggest', suggestion);
    },
    makeAccusation () {
      if (this.accusationReady) {
        this.emitAccusation(this.accusation);
      }
    },
    emitAccusation (accusation) {
      this.$emit('accuse', accusation);
    },
    disprove (card) {
      this.$emit('disprove', card);
    },
    handleCpuNext () {
      if (this.cpuAction.action === actions.ROLL) {
        this.rollDie();
      } else if (this.cpuAction.action === actions.SUGGEST) {
        this.emitSuggestion(this.cpuAction.suggestion);
      } else if (this.cpuAction.action === actions.ACCUSE) {
        this.emitAccusation(this.cpuAction.accusation);
      } else if (this.cpuAction.action === actions.END) {
        this.endTurn();
      } else {
        this.$emit('cpu-next');
      }
    }
  },
  watch: {
    turnPhase (phase) {
      if (this.isRollPhase(phase)) {
        this.dieValue = 0;
        this.showAccusationOptions = false;
        this.accusation.suspect = '';
        this.accusation.weapon = '';
        this.accusation.room = '';
      }
      if (!this.isSuggestionPhase(phase)) {
        this.showSuggestionOptions = false;
        this.suggestion.suspect = '';
        this.suggestion.weapon = '';
      }
    },
    showSuggestionOptions (show) {
      this.$emit('show-suggest-options', show);
    },
    gameOver (isOver) {
      if (isOver) {
        this.showSuggestionOptions = false;
        this.showAccusationOptions = false;
      }
    },
    // cpuAction: {
    //   handler () {
    //     this.handleCpuNext();
    //   },
    //   deep: true
    // }
  },
  components: {
    Die,
    ClueOptions,
    CardDisplay
  }
};
</script>
