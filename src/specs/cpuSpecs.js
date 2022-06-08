/**
  The states of a notepad cell that a CPU can mark
**/
export const actions = {
  ROLL: 'roll',
  MOVE: 'move',
  SUGGEST: 'suggest',
  PASSAGE: 'passage',
  ACCUSE: 'accuse',
  END: 'end'
};

export const notepadStates = {
  OWNED: 'owned',
  NOT_OWNED: 'not_owned'
};

export const clueStates = {
  DISPROVEN: 'disproven',
  PROVEN: 'proven'
};
