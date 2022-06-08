<template>
  <div>
    <div class="css-tab">
      <button :class="getActiveTabClass(tabs.GAME)"
              @click="setActiveTab(tabs.GAME)">
        Game
      </button>
      <button :class="getActiveTabClass(tabs.NOTEPAD)"
              @click="setActiveTab(tabs.NOTEPAD)">
        Notepad / Cards
      </button>
    </div>
    <game-panel v-if="!playerWon"
                v-show="isTabOpen(tabs.GAME)"
                v-bind="$attrs"
                v-on="$listeners"
                @suggest="highlightNotepad"
                @end-turn="resetHighlights"
                class="css-panel"/>
    <div class="css-notepad-and-cards"
         v-show="isTabOpen(tabs.NOTEPAD)">
      <game-notepad class="css-panel"
                    :highlighted="notepadHighlights"
                    :debug-notes="debugNotes"/>
      <card-display :cards="cards"
                    :gridView="true"/>
    </div>
    <textarea readonly
              :value="messagesString"/>
  </div>
</template>

<style scoped>
.css-tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}
/* Style the buttons that are used to open the tab content */
.css-tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}
/* Change background color of buttons on hover */
.css-tab button:hover {
  background-color: #ddd;
}
/* Create an active/current tablink class */
.css-tab button.active {
  background-color: #ccc;
}
.css-panel {
  margin-top: 20px;
  margin-right: 100px;
}
.css-notepad-and-cards {
  display: flex;
}
</style>

<script>
import CardDisplay from '@/components/controls/panel/CardDisplay';
import GameNotepad from '@/components/controls/panel/GameNotepad';
import GamePanel from '@/components/controls/panel/GamePanel';

import deck from '@/mixins/deck.mixin';

const TABS_ENUM = Object.freeze({
  NOTEPAD: 'notepad-cards',
  GAME: 'game'
});

export default {
  name: 'PlayerPanel',
  mixins: [deck],
  props: {
    cards: Array,
    messages: Array,
    playerWon: Boolean,
    debugNotes: Object
  },
  data () {
    return {
      openTab: '',
      notepadHighlights: {}
    };
  },
  computed: {
    tabs () {
      return TABS_ENUM;
    },
    messagesString () {
      let text = '';
      if (this.messages) {
        this.messages.forEach(str => text+=`${str}\n`);
      }
      return text;
    }
  },
  created () {
    this.openTab = this.tabs.NOTEPAD;

    // Fill out the highlight states
    Object.keys(this.suspects).forEach(suspect => this.$set(this.notepadHighlights, suspect, false));
    Object.keys(this.weapons).forEach(weapon => this.$set(this.notepadHighlights, weapon, false));
    Object.keys(this.rooms).forEach(room => this.$set(this.notepadHighlights, room, false));
  },
  methods: {
    setActiveTab (id) {
      this.openTab = id;
    },
    getActiveTabClass (id) {
      return {
        'active': this.isTabOpen(id)
      };
    },
    isTabOpen (id) {
      return this.openTab === id;
    },
    highlightNotepad (suggestion) {
      this.notepadHighlights[suggestion.suspect] = true;
      this.notepadHighlights[suggestion.weapon] = true;
      this.notepadHighlights[suggestion.room] = true;
    },
    resetHighlights () {
      Object.keys(this.notepadHighlights).forEach(key => this.notepadHighlights[key] = false);
    }
  },
  components: {
    CardDisplay,
    GameNotepad,
    GamePanel
  }
};
</script>
