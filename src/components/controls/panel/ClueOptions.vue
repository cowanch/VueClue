<!--
  UI options to allow the player to suggest a suspect and weapon. Room is excluded here because the player cannot choose the
  suggested room (it is where the player is at the time)
-->
<template>
  <div class="css-suggestion-options">
    <!-- Suspect Suggestions -->
    <label for="suspectSuggestions">Suspect:</label>
    <select id="suspectSuggestions"
            v-model="selected.suspect">
      <option value="">--Select a Suspect--</option>
      <option v-for="(name, key) in suspects"
              :key="key"
              :value="key">
        {{name}}
      </option>
    </select>
    <!-- Weapon Suggestions -->
    <label for="weaponSuggestions">Weapon:</label>
    <select id="weaponSuggestions"
            v-model="selected.weapon">
      <option value="">--Select a Weapon--</option>
      <option v-for="(name, key) in weapons"
              :key="key"
              :value="key">
        {{name}}
      </option>
    </select>
    <!-- Room Suggestions -->
    <label for="weaponSuggestions">Room:</label>
    <select id="weaponSuggestions"
            v-model="selected.room"
            v-if="!room">
      <option value="">--Select a Room--</option>
      <option v-for="(name, key) in rooms"
              :key="key"
              :value="key">
        {{name}}
      </option>
    </select>
    <span v-else>{{rooms[room]}}</span>
  </div>
</template>

<style scoped>
.css-suggestion-options {
  display: grid;
  grid-template-columns: auto auto;
  width: 30%;
}
select,label,span {
  margin-top: 10px;
}
</style>

<script>
import deck from '@/mixins/deck.mixin';

export default {
  name: 'ClueOptions',
  mixins: [deck],
  props: {
    value: {
      type: Object,
      validator: (val) => val.hasOwnProperty('suspect') && val.hasOwnProperty('weapon')
    },
    room: String
  },
  data () {
    return {
      selected: {
        suspect: '',
        weapon: '',
        room: ''
      }
    };
  },
  watch: {
    selected: {
      handler (val) {
        if (!this.room) {
          this.$emit('input', val);
        } else {
          this.$emit('input', {
            suspect: val.suspect,
            weapon: val.weapon,
            room: this.room
          });
        }
      },
      deep: true
    },
    value (val) {
      if (val.suspect !== this.selected.suspect) {
        this.selected.suspect = val.suspect;
      }
      if (val.weapon !== this.selected.weapon) {
        this.selected.weapon = val.weapon;
      }
      if (val.room !== this.selected.room && !this.room) {
        this.selected.room = val.room;
      }
    }
  }
};
</script>
