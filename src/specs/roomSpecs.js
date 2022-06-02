/**
  Defines the coordinates for each token / room combination.
  Keys are the player / weapons and the value is a mapping for rooms to the coordinates for where that token should be when in that room.
*/
export const roomCoordinates = {
  scarlet: {
    study: { x: 0, y: 2 },
    library: { x: 2, y: 9 },
    billiard: { x: 0, y: 12.5 },
    conservatory: { x: 4, y: 20.5 },
    ballroom: { x: 9, y: 18 },
    kitchen: { x: 18.5, y: 18.5 },
    dining: { x: 17.5, y: 10 },
    lounge: { x: 18, y: 3 },
    hall: { x: 10, y: 3 }
  },
  mustard: {
    study: { x: 1, y: 2 },
    library: { x: 3, y: 9 },
    billiard: { x: 1, y: 12.5 },
    conservatory: { x: 4.5, y: 21.5 },
    ballroom: { x: 10, y: 18 },
    kitchen: { x: 19.5, y: 18.5 },
    dining: { x: 18.5, y: 10 },
    lounge: { x: 19, y: 3 },
    hall: { x: 10, y: 4 }
  },
  white: {
    study: { x: 2, y: 2 },
    library: { x: 4, y: 9 },
    billiard: { x: 2, y: 12.5 },
    conservatory: { x: 4.5, y: 22.5 },
    ballroom: { x: 11, y: 18 },
    kitchen: { x: 19.5, y: 19.5 },
    dining: { x: 19.5, y: 10 },
    lounge: { x: 20, y: 3 },
    hall: { x: 11, y: 4 }
  },
  green: {
    study: { x: 4, y: 2 },
    library: { x: 5, y: 9 },
    billiard: { x: 3, y: 12.5 },
    conservatory: { x: 3.75, y: 23 },
    ballroom: { x: 12, y: 18 },
    kitchen: { x: 20.5, y: 19.5 },
    dining: { x: 20.5, y: 10 },
    lounge: { x: 18, y: 4 },
    hall: { x: 12, y: 4 }
  },
  peacock: {
    study: { x: 5, y: 2 },
    library: { x: 5, y: 8 },
    billiard: { x: 4.5, y: 15.5 },
    conservatory: { x: 4, y: 19.5 },
    ballroom: { x: 13, y: 18 },
    kitchen: { x: 20.5, y: 18.5 },
    dining: { x: 21.5, y: 10 },
    lounge: { x: 19, y: 4 },
    hall: { x: 10, y: 5 }
  },
  plum: {
    study: { x: 6, y: 2 },
    library: { x: 5, y: 7 },
    billiard: { x: 4.5, y: 14.5 },
    conservatory: { x: 5, y: 20 },
    ballroom: { x: 14, y: 18 },
    kitchen: { x: 21.5, y: 18.5 },
    dining: { x: 22.5, y: 10 },
    lounge: { x: 20, y: 4 },
    hall: { x: 11, y: 5 }
  },
  candlestick: {
    study: { x: 0, y: 0 },
    library: { x: 0, y: 7.5 },
    billiard: { x: 0, y: 14.5 },
    conservatory: { x: 0, y: 20.5 },
    ballroom: { x: 9, y: 20 },
    kitchen: { x: 18.5, y: 21 },
    dining: { x: 19.5, y: 13.5 },
    lounge: { x: 18.5, y: 0 },
    hall: { x: 9.5, y: 1 }
  },
  knife: {
    study: { x: 2, y: 2.75 },
    library: { x: 2, y: 6 },
    billiard: { x: 2, y: 15.5 },
    conservatory: { x: 2.25, y: 19 },
    ballroom: { x: 11, y: 21 },
    kitchen: { x: 22, y: 21.75 },
    dining: { x: 17.5, y: 12.5 },
    lounge: { x: 22, y: 3 },
    hall: { x: 11.5, y: 0 }
  },
  pipe: {
    study: { x: 1, y: 0 },
    library: { x: 1, y: 6.5 },
    billiard: { x: 1, y: 14.5 },
    conservatory: { x: 1, y: 22.25 },
    ballroom: { x: 10, y: 20 },
    kitchen: { x: 19.5, y: 21.5 },
    dining: { x: 20.5, y: 13.5 },
    lounge: { x: 19.5, y: 0 },
    hall: { x: 10.5, y: 0.5 }
  },
  revolver: {
    study: { x: 2, y: 0 },
    library: { x: 2, y: 7 },
    billiard: { x: 2, y: 14.5 },
    conservatory: { x: 1.5, y: 20.5 },
    ballroom: { x: 11, y: 20 },
    kitchen: { x: 22, y: 22.75 },
    dining: { x: 17.5, y: 13.5 },
    lounge: { x: 22, y: 2 },
    hall: { x: 11.5, y: 1 }
  },
  rope: {
    study: { x: 4, y: 0 },
    library: { x: 1, y: 8.5 },
    billiard: { x: 4, y: 12.5 },
    conservatory: { x: 2, y: 22.25 },
    ballroom: { x: 13, y: 20 },
    kitchen: { x: 20.5, y: 21.5 },
    dining: { x: 21.5, y: 13.5 },
    lounge: { x: 20.5, y: 0 },
    hall: { x: 13.5, y: 1 }
  },
  wrench: {
    study: { x: 5, y: 0 },
    library: { x: 4, y: 6.5 },
    billiard: { x: 5, y: 12.5 },
    conservatory: { x: 3, y: 22.25 },
    ballroom: { x: 14, y: 20 },
    kitchen: { x: 23, y: 19.75 },
    dining: { x: 22.5, y: 13.5 },
    lounge: { x: 21.5, y: 0 },
    hall: { x: 13.5, y: 3.5 }
  }
};

let names = {};
Object.values(roomCoordinates).forEach(rooms => Object.keys(rooms).forEach(roomName => names[roomName] = true));
export const roomNames = Object.keys(names);

let passages = {};
let joinedRooms = [['study', 'kitchen'], ['lounge', 'conservatory']];
joinedRooms.forEach(rooms => {
  if (rooms.length === 2) {
    passages[rooms[0]] = rooms[1];
    passages[rooms[1]] = rooms[0];
  }
});
export const secretPassages = passages;
