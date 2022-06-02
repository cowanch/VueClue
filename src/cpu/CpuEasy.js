import Cpu from '@/cpu/Cpu';
import { notepadStates, clueStates } from '@/specs/cpuSpecs';
import { phases } from '@/specs/turnSpecs';
import { roomNames } from '@/specs/roomSpecs';

class CpuEasy extends Cpu {
  // ========== OVERRIDDEN FUNCTIONS ==========
  startTurn (roomPaths, phase) {
    super.startTurn();
    // Find the closest room that hasn't been disproven
    this.targetPath = null;
    let disprovenRooms = this.getRoomsOfClueState(clueStates.DISPROVEN);
    // Filter out paths that are inaccessible and rooms that this player is already in
    let filteredRoomPaths = Object.keys(roomPaths).filter(room => roomPaths[room] !== undefined);
    if (filteredRoomPaths.length > 0) {
      // If there is only one path that is available (in the case that a corner room's door is blocked),
      // take it even if the other room is disproven
      if (filteredRoomPaths.length === 1) {
        this.targetPath = roomPaths[filteredRoomPaths[0]];
      } else {
        // Filter out paths to disproven rooms
        filteredRoomPaths = filteredRoomPaths.filter(room => !disprovenRooms.includes(room));
        if (filteredRoomPaths.length === 0) {
          filteredRoomPaths = Object.keys(roomPaths);
        }
        let closestRoom = filteredRoomPaths.reduce((closest, room) => {
          let closestSteps = roomPaths[closest].length;
          let steps = roomPaths[room].length;
          if (steps < closestSteps) {
            return room;
          } else if (steps === closestSteps) {
            // If the distance is the same, pick a room at random
            let rand = Math.floor(Math.random() * 2);
            return (rand < 1) ? room : closest;
          }
          return closest;
        });
        this.targetPath = roomPaths[closestRoom];
      }
    }
    return this.getNextMove(phase);
  }

  // This method will return what the next move for the player will be
  getNextMove (phase) {
    // Roll phase (including suggestion)
    if (phase === phases.ROLL || phase === phases.ROLL_OR_SUGGEST) {
      // If no target path could be chosen, either end the turn or make a suggestion
      if (this.targetPath === null) {
        if (phase === phases.ROLL) {
          return this.endTurnAction();
        } else if (phase === phases.ROLL_OR_SUGGEST){
          this.suggestAction();
        }
      // If the player is in a suggestion phase and in a room that is not disproven, make a suggestion
      } else if (phase === phases.ROLL_OR_SUGGEST &&
                 roomNames.includes(this.coordinates) &&
                 !this.getRoomsOfClueState(clueStates.DISPROVEN).includes(this.coordinates)) {
        return this.suggestAction();
      // If the target path is one room directly to another, it's a secret passage move
      } else if (roomNames.includes(this.targetPath[0]) && this.targetPath.length === 2) {
        return this.passageAction(this.targetPath[1]);
      // Otherwise roll the dice
      } else {
        return this.rollAction();
      }
    // Move phase
    } else if (phase === phases.MOVE) {
      return this.moveAction();
    // Suggestion phase
    } else if (phase === phases.SUGGEST) {
      if (roomNames.includes(this.coordinates)) {
        return this.suggestAction();
      } else {
        return this.endTurnAction();
      }
    // End phase
    } else if (phase === phases.END) {
      // Check if an accusation can be made
      if (this.canAccuse()) {
        return this.accuseAction();
      }
      return this.endTurnAction();
    }
  }

  chooseSpaceToMove () {
    // Go down as far as you can down the target path
    let selectedSpace = null;
    // The first space is the starting space, so exclude it
    // The most amount of spaces the player can go is 6
    this.targetPath.slice(1,7).forEach(space => {
      if (this.availableMoves.hasOwnProperty(space) ||
          this.availableMoves.hasOwnProperty(space.x) && this.availableMoves[space.x].hasOwnProperty(space.y)) {
        selectedSpace = space;
      }
    });
    return selectedSpace;
  }

  chooseSuspectToSuggest () {
    if (!!this.accusation.suspect) {
      return this.accusation.suspect;
    }
    let possibleSuspects = this.getSuspectsNotOfClueState(clueStates.DISPROVEN);
    let rand = Math.random() * possibleSuspects.length;
    return possibleSuspects[Math.floor(rand)];
  }

  chooseWeaponToSuggest () {
    if (!!this.accusation.weapon) {
      return this.accusation.weapon;
    }
    let possibleWeapons = this.getWeaponsNotOfClueState(clueStates.DISPROVEN);
    let rand = Math.random() * possibleWeapons.length;
    return possibleWeapons[Math.floor(rand)];
  }

  chooseCardToReveal (cards) {
    let rand = Math.floor(Math.random() * cards.length);
    return cards[rand];
  }

  evaluateNotepad () {
    this.evaluateSuspects();
    this.evaluateWeapons();
    this.evaluateRooms();
  }

  evaluateSuspects () {
    this.getSuspectsOfNotepadState(notepadStates.OWNED)
      .forEach(suspect => this.setClueState(suspect, clueStates.DISPROVEN));
    this.checkDisprovenSuspects();
  }

  evaluateWeapons () {
    this.getWeaponsOfNotepadState(notepadStates.OWNED)
      .forEach(weapon => this.setClueState(weapon, clueStates.DISPROVEN));
    this.checkDisprovenWeapons();
  }

  evaluateRooms () {
    this.getRoomsOfNotepadState(notepadStates.OWNED)
      .forEach(room => this.setClueState(room, clueStates.DISPROVEN));
    this.checkDisprovenRooms();
  }

  // Checks if all players were unable to disprove the suggestion
  isSuggestionProven (suggestion) {
    let { suspect, weapon, room } = suggestion;
    return this.doAllPlayersNotOwn(suspect) && this.doAllPlayersNotOwn(weapon) && this.doAllPlayersNotOwn(room);
  }

  // An easy CPU only witnesses disprovals to their own suggestions
  witnessDisproval (player, canDisprove, suggestion) {
    if (player !== this.myPlayer && this.myTurn) {
      let { suspect, weapon, room } = suggestion;
      if (!canDisprove) {
        this.setNotepadNotOwned(player, suspect);
        this.setNotepadNotOwned(player, weapon);
        this.setNotepadNotOwned(player, room);
        if (this.isSuggestionProven(suggestion)) {
          this.accusation.suspect = suggestion.suspect;
          this.accusation.weapon = suggestion.weapon;
          this.accusation.room = suggestion.room;
        }
      }
    }
  }
}

export default CpuEasy;
