import CpuEasy from '@/cpu/CpuEasy';
import { clueStates } from '@/specs/cpuSpecs';

class CpuMedium extends CpuEasy {
  constructor (myPlayer, cards, coords, players) {
    super(myPlayer, cards, coords, players);
    this.alternatePaths = {};
  }

  // ========== OVERRIDDEN FUNCTIONS ==========
  startTurn (roomPaths, phase) {
    this.targetPath = this.findClosestNonDisprovenPath(roomPaths);
    this.alternatePaths = {};
    Object.keys(roomPaths).filter(key => roomPaths[key] !== undefined && roomPaths[key].length < 8)
                          .forEach(key => this.alternatePaths[key] = roomPaths[key]);
    return this.getNextMove(phase);
  }

  // Check all suspects not yet disproven and mark it proven if:
  // - there is only 1 option remaining
  // - every player does not own it
  checkDisprovenSuspects () {
    super.checkDisprovenSuspects();
    this.getSuspectsNotOfClueState(clueStates.DISPROVEN).forEach(suspect => {
      if (this.doAllPlayersNotOwn(suspect)) {
        this.setClueState(suspect, clueStates.PROVEN);
      }
    });
  }

  // Check all weapons not yet disproven and mark it proven if:
  // - there is only 1 option remaining
  // - every player does not own it
  checkDisprovenWeapons () {
    super.checkDisprovenWeapons();
    this.getWeaponsNotOfClueState(clueStates.DISPROVEN).forEach(weapon => {
      if (this.doAllPlayersNotOwn(weapon)) {
        this.setClueState(weapon, clueStates.PROVEN);
      }
    });
  }

  // Check all rooms not yet disproven and mark it proven if:
  // - there is only 1 option remaining
  // - every player does not own it
  checkDisprovenRooms () {
    super.checkDisprovenRooms();
    this.getRoomsNotOfClueState(clueStates.DISPROVEN).forEach(room => {
      if (this.doAllPlayersNotOwn(room)) {
        this.setClueState(room, clueStates.PROVEN);
      }
    });
  }

  // An medium CPU will witness all disprovals
  witnessDisproval (player, canDisprove, suggestion) {
    if (player !== this.myPlayer) {
      let { suspect, weapon, room } = suggestion;
      if (!canDisprove) {
        this.setNotepadNotOwned(player, suspect);
        this.setNotepadNotOwned(player, weapon);
        this.setNotepadNotOwned(player, room);
      }
    }
  }
}

export default CpuMedium;
