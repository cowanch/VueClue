/**
  Used when debugging various scenarios by overriding MainGame methods
**/
import { actions } from '@/specs/cpuSpecs';
import { phases } from '@/specs/turnSpecs';
import {debugTests} from '@/specs/debugSpecs';

class CpuDebug {
  constructor (mode, envelope) {
    this.getNextMove = () => {};
    switch (mode) {
      case debugTests.AUTO_PLAY: 
        this.startTurn = noTestStartTurn
        this.getNextMove = noTestNextMove;
        break;
      case debugTests.PROVEN_SUGGESTION: 
        this.startTurn = testProvenSuggestionStartTurn;
        this.getNextMove = testProvenSuggestionNextMove;
        break;
    }
    this.envelope = envelope;
  }
}

function noTestStartTurn (player, paths, phase) {
  return player.startTurn(paths, phase);
}

function noTestNextMove (player, phase) {
  return player.getNextMove(phase);
}

function testProvenSuggestionStartTurn (player, paths, phase) {
  player.myTurn = true;
  return testProvenSuggestionNextMove(player, phase);
}

function testProvenSuggestionNextMove (player, phase) {
  if (phase === phases.ROLL) {
    return player.rollAction();
  } else if (phase === phases.MOVE) {
    return {
      action: actions.MOVE,
      moveTo: this.envelope.room
    };
  } else if (phase === phases.SUGGEST) {
    player.suggestionDisprovedBy = {};
    let action = {
      action: actions.SUGGEST,
      suggestion: {
        suspect: this.envelope.suspect,
        weapon: this.envelope.weapon,
        room: this.envelope.room
      }
    };
    player.suggestionDisprovedBy[player.myPlayer] = player.canDisproveSuggestion(action.suggestion);
    return action;
  } else if (phase === phases.END) {
    let nextMove = player.getNextMove(phase);
    // We expect the active player to make an accusation since no other player could disprove their suggestion
    // If that doesn't happen, we don't want to return an ending action and cause an infinite loop
    if (nextMove.action !== actions.END) {
      return nextMove;
    }
  }
  return {};
}

export default CpuDebug;
