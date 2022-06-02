# VueClue

## CPU logic

### For all levels
- Find out the shortest path to each room (secret passages are a path of 0)
- Once solutions are found for all 3 categories, make an accusation when next possible

### Easy
Movement:
- Go to rooms that have not been disproven (closest target)

Suggestions:
- Suggest a suspect and weapon that have not been disproven (at random)

Evidence:
- Record cards that are shown to me
- If all but one clue card in a category is disproven, that is the solution for that category

### Medium
Movement:
- Go to rooms that have not been disproven (closest target)
- OR a room that has been disproven by a player two turns away at least (if in reach)
- OR I own the card for the room and haven't shown it yet (if in reach)

Suggestions:
- Suggest a suspect and weapon that have not been disproven (at random)
- If any category is solved, try to fake out by suggesting cards that I own (if it has not been shown to at least one player)

Evidence:
- Record cards that are shown to me
- Record when another player cannot disprove a suggestion (mark the suggested cards as "missing")
- If I see that no one has a particular clue card, that clue card is the solution for that category
- If all but one clue card in a category is disproven, that is the solution for that category

### Hard

Movement:
- Go to rooms that are in a potential group (closest target)
- OR go to rooms that have not been disproven (closest to above)
- OR a room that has been disproven by a player two turns away at least (if in reach)
- OR I own the card for the room and haven't shown it yet (if in reach)

Suggestions:
- Suggest at least one suspect OR weapon that is part of a potential group
- If there are 2 potential groups for different players, suggest a suspect from one and a weapon from the other
- Only suggest from potential groups that do not have the room you are in
- If no potential groups exist, suggest a suspect and weapon that have not been disproven (at random)
- If any category is solved, try to fake out by suggesting cards that I own (if it has not been shown to at least one player)

Evidence:
- Record cards that are shown to me
- Record when another player cannot disprove a suggestion (mark the suggested cards as "missing")
- When a player A disproves to player B, and I do not have any options in the suggestion disproven by player A, mark the 3 suggested cards (minus any disproven cards) as "potentially disproven"
- Keep a record of potentially disproven clues in groups of 3 or less mapped to the player who disproved one of them
- If player A shows me a clue, and that clue is in 1 or more potential groups for player A, remove all potential groups containing that clue for player A (have to assume that was the clue that was disproven earlier)
- If player A shows me a clue, and that clue is in 1 or more a potential group for player B, remove it from all potential groups for player B (and C, D, etc.)
- If player A is found to be missing a card, remove it from player A's potential groups
- If player A has a potential group with only one clue, mark that clue as disproven by player A and remove the group
- If I see that no one has a particular clue card, that clue card is the solution for that category
- If all but one clue card in a category is disproven, that is the solution for that category

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
