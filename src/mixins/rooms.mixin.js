/**
  Adds functions related to room information
**/
import { roomNames, secretPassages } from '@/specs/roomSpecs';

export default {
  methods: {
    isValidRoom (room) {
      return roomNames.includes(room);
    },
    isSecretPassageRoom (room) {
      return this.isValidRoom(room) && secretPassages.hasOwnProperty(room);
    },
    getSecretPassageRoom (room) {
      if (this.isSecretPassageRoom(room)) {
        return secretPassages[room];
      }
      return null;
    }
  }
};
