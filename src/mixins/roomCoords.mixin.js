/**
  Adds functions to determine the coordinates of a token that is in a room
**/
import coordinates from '@/mixins/coordinates.mixin';
import rooms from '@/mixins/rooms.mixin';
import { roomCoordinates } from '@/specs/roomSpecs';

export default {
  mixins: [coordinates,rooms],
  props: {
    coordinates: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    boardCoordinates () {
      let boardCoords = {};
      Object.keys(this.coordinates).forEach(key => {
        let value = this.coordinates[key];
        if (this.isCoordinates(value)) {
          boardCoords[key] = value;
        } else if (this.isValidRoom(value)) {
          boardCoords[key] = this.getCooridinatesFromRoom(key, value);
        }
      });
      return boardCoords;
    }
  },
  methods: {
    getCooridinatesFromRoom (token, room) {
      if (roomCoordinates.hasOwnProperty(token) && roomCoordinates[token].hasOwnProperty(room)) {
        return roomCoordinates[token][room];
      }
    }
  }
};
