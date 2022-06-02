<!--
  The main game component. Handles the game logic and components.
-->
<template>
  <div class="css-container">
    <board :token-coordinates="tokenCoordinates"
           :available-moves="availableMoves"
           @move="movePhase"
           @passage="movePassage"/>
    <div class="css-options">
      <player-select v-if="selectingPlayers"
                     v-model="playerSelections"
                     @finish="selectingPlayers=false"/>
      <player-panel v-else
                    :cards="playerCards[humanPlayer]"
                    :messages="messages"
                    :player-won="hasPlayerWon"
                    :card-selection="cardSelection"
                    :turn-phase="turnPhase"
                    :player-position="this.turnPlayerPosition"
                    :game-over="playerGameOver[this.turnPlayer]"
                    :is-human-turn="isHumanPlayer(this.turnPlayer)"
                    :cpu-action="cpuAction"
                    @die-rolled="rollPhase"
                    @suggest="suggestPhase"
                    @accuse="accusePhase"
                    @end-turn="endTurn"
                    @show-suggest-options="suggestOptionsShown"
                    @disprove="disprovePhase"
                    @cpu-next="cpuNext"/>
    </div>
  </div>
</template>

<style>
html,
body,
body > div {
  height: 100%;
}

.css-container {
  display: flex;
}

.css-options {
  width: 50%;
}
</style>

<script>
// Components
import Board from '@/components/board/Board';
import PlayerSelect from '@/components/controls/PlayerSelect';
import PlayerPanel from '@/components/controls/PlayerPanel';
// Specs
import startingPositions from '@/specs/startingPositions';
import { playerTypes } from '@/specs/playerTypeSpecs';
import { actions } from '@/specs/cpuSpecs';
// Utils
import shuffle from '@/utils/shuffle';
// Mixins
import rooms from '@/mixins/rooms.mixin';
import deckUtil from '@/mixins/deck.mixin';
import turnPhases from '@/mixins/turnPhases.mixin';
import pathfinding from '@/mixins/pathfinding.mixin';
// Computer Player AI
import CpuEasy from '@/cpu/CpuEasy';

export default {
  name: 'Game',
  mixins: [rooms, deckUtil, turnPhases, pathfinding],
  data () {
    return {
      playerCoordinates: {},
      lastTurnCoordinates: {},
      playerSelections: {},
      playerCards: {},
      playerGameOver: {},
      hasPlayerWon: false,
      weaponCoordinates: {},
      currentTurn: -1,
      dieRoll: 0,
      selectingPlayers: true,
      envelope: {},
      turnPhase: null,
      messages: [],
      cardSelection: [],
      cpuPlayers: {},
      cpuAction: null
    };
  },
  computed: {
    tokenCoordinates () {
      return {
        players: this.playerCoordinates,
        weapons: this.weaponCoordinates
      }
    },
    turnOrder () {
      return Object.keys(this.playerCoordinates).filter(player => !!this.playerCoordinates[player]);
    },
    turnPlayer () {
      return this.turnOrder[this.currentTurn];
    },
    turnPlayerPosition () {
      return this.playerCoordinates[this.turnPlayer];
    },
    turnCpuPlayer () {
      if (this.isCpuPlayer(this.turnPlayer)) {
        return this.cpuPlayers[this.turnPlayer];
      }
      return null;
    },
    turnPlayerLastPosition: {
      get () { return this.lastTurnCoordinates[this.turnPlayer]; },
      set (coordinates) { this.lastTurnCoordinates[this.turnPlayer] = coordinates }
    },
    humanPlayer () {
      return Object.keys(this.playerSelections).find(key => this.isHumanPlayer(key));
    },
    availableMoves () {
      let availableMoves = {};
      if (this.isHumanPlayer(this.turnPlayer)) {
        if (this.dieRoll > 0) {
          availableMoves = this.findAvailableMoves(this.turnPlayerPosition, this.dieRoll);
        } else if (this.isRollPhase(this.turnPhase)) {
          availableMoves = this.checkSecretPassages(this.turnPlayerPosition);
        }
      }
      return availableMoves;
    }
  },
  created () {
    // Set up the different player settings
    Object.keys(this.suspects).forEach(player => {
      this.$set(this.playerCoordinates, player, null);
      this.$set(this.lastTurnCoordinates, player, null);
      this.$set(this.playerSelections, player, playerTypes.DISABLED);
      this.$set(this.playerCards, player, []);
      this.$set(this.playerGameOver, player, false);
    });
    let roomKeys = Object.keys(this.rooms);
    Object.keys(this.weapons).forEach(weapon => {
      let rand = Math.floor(Math.random() * roomKeys.length);
      this.$set(this.weaponCoordinates, weapon, roomKeys[rand]);
      roomKeys.splice(rand, 1);
    });
    this.addMessage('Welcome to Clue!');
  },
  methods: {
    isHumanPlayer (player) {
      return this.playerSelections[player] === playerTypes.HUMAN;
    },
    isCpuPlayer (player) {
      return this.playerSelections[player] === playerTypes.CPU_EASY ||
             this.playerSelections[player] === playerTypes.CPU_MEDIUM ||
             this.playerSelections[player] === playerTypes.CPU_HARD;
    },
    getRemainingDeckAfterPickingEnvelopeCards () {
      let suspectDeck = shuffle(Object.keys(this.suspects));
      let weaponDeck = shuffle(Object.keys(this.weapons));
      let roomDeck = shuffle(Object.keys(this.rooms));
      this.envelope.suspect = suspectDeck.shift();
      this.envelope.weapon = weaponDeck.shift();
      this.envelope.room = roomDeck.shift();

      return [...suspectDeck, ...weaponDeck, ...roomDeck];
    },
    dealCardsToPlayers (deck) {
      // This method assumes a shuffled deck
      let playerCount = this.turnOrder.length;
      deck.forEach((card, index) => {
        this.playerCards[this.turnOrder[index % playerCount]].push(card);
      });
    },
    rollPhase (roll) {
      if (this.isRollPhase(this.turnPhase)) {
        if (this.isHumanPlayer(this.turnPlayer)) {
          this.dieRoll = roll;
        } else if (this.isCpuPlayer(this.turnPlayer)) {
          this.turnCpuPlayer.setAvailableMoves(this.findAvailableMoves(this.turnPlayerPosition, roll));
        }
        this.turnPhase = this.phases.MOVE;
      }
    },
    movePhase (moveTo) {
      if (this.turnPhase === this.phases.MOVE) {
        // Move the player and reset the die
        this.movePlayerTo(this.turnPlayer, moveTo);
        this.dieRoll = 0;
        // Check to see if the player is in a room
        if (this.isValidRoom(this.turnPlayerPosition)) {
          this.turnPhase = this.phases.SUGGEST;
        } else {
          this.endTurn();
        }
      }
    },
    movePassage (moveTo) {
      if (this.isRollPhase(this.turnPhase)) {
        // Make sure the room being moved to is a secret passage room
        if (this.isSecretPassageRoom(moveTo)) {
          // Move the player to the room and change the phase to suggest
          this.movePlayerTo(this.turnPlayer, moveTo);
          this.turnPhase = this.phases.SUGGEST;
        }
      }
    },
    suggestPhase (suggestion) {
      // Suggestion made, find a player that can disprove it
      this.addSuggestionMessage(suggestion);
      // Move the suggested suspect into the suggested room
      if (this.playerCoordinates[suggestion.suspect]) {
        this.playerCoordinates[suggestion.suspect] = suggestion.room;
      }
      // Move the suggested weapon into the suggested room
      this.weaponCoordinates[suggestion.weapon] = suggestion.room;
      let turnIter = (this.currentTurn + 1) % this.turnOrder.length;
      let disproved = false;
      while (turnIter !== this.currentTurn) {
        let currentPlayer = this.turnOrder[turnIter];
        let cards = this.playerCards[currentPlayer];
        let disprovingCards = this.getDisprovingCards(cards, suggestion);
        let canDisprove = disprovingCards.length > 0;
        // CPU players witness disprovals
        Object.values(this.cpuPlayers).forEach(cpu => cpu.witnessDisproval(currentPlayer, canDisprove, suggestion));
        if (canDisprove) {
          disproved = true;
          this.turnPhase = this.phases.DISPROVE;
          this.addMessage(`${this.suspects[currentPlayer]} can disprove the suggestion`);
          this.handleDisprovingCards(currentPlayer, disprovingCards);
          break;
        } else {
          this.addMessage(`${this.suspects[currentPlayer]} cannot disprove the suggestion`);
        }
        turnIter = (turnIter + 1) % this.turnOrder.length;
      }
      if (!disproved) {
        this.turnPhase = this.phases.END;
      }
    },
    accusePhase (accusation) {
      // Accusation made, check the envelope to see if it's correct
      this.addAccusationMessage(accusation);
      let isCorrect = Object.keys(accusation).every(key => accusation[key] === this.envelope[key]);
      if (isCorrect) {
        this.addMessage(`Correct! ${this.suspects[this.turnPlayer]} wins!`);
        this.hasPlayerWon = true;
      } else {
        this.addMessage(`Incorrect - ${this.suspects[this.turnPlayer]} must sit out`);
        this.playerGameOver[this.turnPlayer] = true;
        this.turnPhase = this.phases.END;
      }
    },
    handleDisprovingCards (player, cards) {
      if (this.turnPhase === this.phases.DISPROVE) {
        if (this.isHumanPlayer(player)) {
          this.cardSelection = cards;
        } else if (this.isCpuPlayer(player)) {
          let card = this.cpuPlayers[player].chooseCardToReveal(cards);
          if (this.isHumanPlayer(this.turnPlayer)) {
            this.addMessage(`${this.suspects[player]} reveals ${this.getCardText(card)}`);
          } else if (this.isCpuPlayer(this.turnPlayer)) {
            this.turnCpuPlayer.recordRevealedCard(player, card);
          }
          this.turnPhase = this.phases.END;
        }
      }
    },
    getDisprovingCards (cards, suggestion) {
      let disprovingCards = [];
      let { suspect, weapon, room } = suggestion;
      if (cards.includes(suspect)) {
        disprovingCards.push(suspect);
      }
      if (cards.includes(weapon)) {
        disprovingCards.push(weapon);
      }
      if (cards.includes(room)) {
        disprovingCards.push(room);
      }
      return disprovingCards;
    },
    disprovePhase (card) {
      if (this.turnPhase === this.phases.DISPROVE) {
        this.cardSelection = [];
        if (this.isCpuPlayer(this.turnPlayer)) {
          this.turnCpuPlayer.recordRevealedCard(this.humanPlayer, card);
        }
        this.addMessage(`${this.suspects[this.humanPlayer]} reveals ${this.getCardText(card)} to ${this.suspects[this.turnPlayer]}`);
        this.turnPhase = this.phases.END;
      }
    },
    movePlayerTo (player, moveTo) {
      if (this.playerCoordinates.hasOwnProperty(player)) {
        this.playerCoordinates[player] = moveTo;
      }
    },
    endTurn () {
      this.clearMessages();
      this.turnPlayerLastPosition = this.turnPlayerPosition;
      this.currentTurn++;
    },
    suggestOptionsShown (shown) {
      if (shown && this.turnPhase === this.phases.ROLL_OR_SUGGEST) {
        this.turnPhase = this.phases.SUGGEST;
      }
    },
    cpuStart () {
      if (this.isCpuPlayer(this.turnPlayer)) {
        let paths = {};
        if (!this.isValidRoom(this.turnPlayerPosition)) {
          Object.keys(this.rooms).forEach(room => paths[room] = this.findShortestPathToRoom(this.turnPlayerPosition, room));
        } else {
          Object.keys(this.rooms).forEach(room => paths[room] = this.findShortestPathToRoomFromRoom(this.turnPlayerPosition, room));
        }
        this.cpuAction = this.turnCpuPlayer.startTurn(paths, this.turnPhase);
      }
    },
    cpuNext () {
      if (this.isCpuPlayer(this.turnPlayer)) {
        if (this.cpuAction.action === actions.MOVE) {
          this.movePhase(this.cpuAction.moveTo);
        } else if (this.cpuAction.action === actions.PASSAGE) {
          this.movePassage(this.cpuAction.moveTo);
        }
      }
    },
    addSuggestionMessage (suggestion) {
      let {suspect, weapon, room} = suggestion;
      let suspectText = this.suspects[suspect];
      let weaponText = this.weapons[weapon];
      let roomText = this.rooms[room];
      this.addMessage(`${this.suspects[this.turnPlayer]} suggests ${suspectText} with the ${weaponText} in the ${roomText}`);
    },
    addAccusationMessage (accusation) {
      let {suspect, weapon, room} = accusation;
      let suspectText = this.suspects[suspect];
      let weaponText = this.weapons[weapon];
      let roomText = this.rooms[room];
      this.addMessage(`${this.suspects[this.turnPlayer]} accuses ${suspectText} of committing the crime in the ${roomText} with the ${weaponText}`);
    },
    addMessage (message) {
      this.messages.push(message);
    },
    clearMessages () {
      this.messages = [];
    }
  },
  watch: {
    currentTurn (turn) {
      if (turn > this.turnOrder.length-1) {
        this.currentTurn = 0;
      } else if (turn < 0) {
        this.currentTurn = this.turnOrder.length-1;
      }
    },
    turnPlayer (player) {
      if (!this.playerGameOver[player]) {
        this.addMessage(`It is ${this.suspects[player]}'s turn`);
        if (this.isValidRoom(this.turnPlayerPosition) && this.turnPlayerLastPosition !== this.turnPlayerPosition) {
          this.turnPhase = this.phases.ROLL_OR_SUGGEST;
        } else {
          this.turnPhase = this.phases.ROLL;
        }
        if (this.isCpuPlayer(player)) {
          this.cpuStart();
        }
      } else {
        this.endTurn();
      }
    },
    playerSelections: {
      handler (selected) {
        if (this.selectingPlayers) {
          Object.keys(this.playerCoordinates).forEach(player => this.playerCoordinates[player] = selected[player] !== playerTypes.DISABLED ? startingPositions[player] : null);
        }
      },
      deep: true
    },
    selectingPlayers (isSelecting) {
      if (!isSelecting) {
        let deck = shuffle(this.getRemainingDeckAfterPickingEnvelopeCards());
        this.dealCardsToPlayers(deck);
        this.turnOrder.forEach(player => {
          if (this.isCpuPlayer(player)) {
            this.cpuPlayers[player] = new CpuEasy(player, this.playerCards[player], this.playerCoordinates[player], this.turnOrder);
          }
        });
        this.currentTurn = 0;
      }
    },
    turnPhase (phase) {
      if (this.isRollPhase(phase)) {
        let canSuggest = this.isSuggestionPhase(this.turnPhase);
        let canPassage = this.isSecretPassageRoom(this.turnPlayerPosition);
        let msg = 'Roll the die';
        if (canSuggest && canPassage) {
          msg += ', make a suggestion, or take the secret passage';
        } else if (canSuggest) {
          msg += ', or make a suggestion';
        } else if (canPassage) {
          msg += ', or take the secret passage';
        }
        this.addMessage(msg);
      } else if (phase === this.phases.SUGGEST) {
        this.addMessage('Make a suggestion');
      }
      if (this.isCpuPlayer(this.turnPlayer)) {
        this.turnCpuPlayer.setCoordinates(this.playerCoordinates[this.turnPlayer]);
        this.cpuAction = this.turnCpuPlayer.getNextMove(phase);
      }
    }
  },
  components: {
    Board,
    PlayerSelect,
    PlayerPanel
  }
};
</script>
