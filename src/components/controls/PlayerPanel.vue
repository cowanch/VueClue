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
                class="css-panel"/>
    <div class="css-notepad-and-cards"
         v-show="isTabOpen(tabs.NOTEPAD)">
      <notepad class="css-panel"/>
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
import Notepad from '@/components/controls/panel/Notepad';
import GamePanel from '@/components/controls/panel/GamePanel';

const TABS_ENUM = Object.freeze({
  NOTEPAD: 'notepad-cards',
  GAME: 'game'
});

export default {
  name: 'PlayerPanel',
  props: {
    cards: Array,
    messages: Array,
    playerWon: Boolean
  },
  data () {
    return {
      openTab: ''
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
    }
  },
  components: {
    CardDisplay,
    Notepad,
    GamePanel
  }
};
</script>
