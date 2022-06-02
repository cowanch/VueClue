<template>
  <table>
    <thead>
      <tr class="css-category-row">
        <th class="css-name-col">PLAYERS</th>
        <th v-for="(player, key) in notepad"
            :key="key"
            class="css-input-box">
          <input :placeholder="key"
                 v-model="player.name"/>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="css-category-row">
        <td colspan="7">SUSPECTS</td>
      </tr>
      <tr v-for="(name, key) in suspects"
          :key="key">
        <td class="css-name-col"
            @click="toggleNameState(key)">
          <span :class="getNameTextClass(key)">{{name}}</span>
        </td>
        <td v-for="(player, pkey) in notepad"
            :key="`${pkey}-${key}`"
            class="css-input-box">
          <input v-model="player[key]"/>
        </td>
      </tr>
      <tr class="css-category-row">
        <td colspan="7">WEAPONS</td>
      </tr>
      <tr v-for="(name, key) in weapons"
          :key="key">
        <td class="css-name-col"
            @click="toggleNameState(key)">
          <span :class="getNameTextClass(key)">{{name}}</span>
        </td>
        <td v-for="(player, pkey) in notepad"
            :key="`${pkey}-${key}`"
            class="css-input-box">
          <input v-model="player[key]"/>
        </td>
      </tr>
      <tr class="css-category-row">
        <td colspan="7">ROOMS</td>
      </tr>
      <tr v-for="(name, key) in rooms"
          :key="key">
        <td class="css-name-col"
            @click="toggleNameState(key)">
          <span :class="getNameTextClass(key)">{{name}}</span>
        </td>
        <td v-for="(player, pkey) in notepad"
            :key="`${pkey}-${key}`"
            class="css-input-box">
          <input v-model="player[key]"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table, td, th {
  border: 1px solid black;
  border-collapse: collapse;
}
th {
  text-align: left;
}
input {
  width: inherit;
  border: none;
  text-align: center;
  padding: inherit;
}
td.css-name-col {
  cursor: pointer;
}
td.css-name-col:hover {
  background-color: lightblue;
}
.css-name-col {
  width: 218px;
  padding: 2px 0px 2px 15px;
}
.css-category-row > td, th {
  font-size: 20px;
  padding: 5px 0px;
}
.css-input-box {
  width: 40px;
  text-align: center;
}
.css-cross-out,
.css-circle-over {
  position: relative;
}
.css-cross-out::after {
  border-bottom: 0.125em solid black;
  content: "";
  left: 0;
  margin-top: calc(0.125em / 2 * -1);
  position: absolute;
  right: 0;
  top: 50%;
}
.css-circle-over::after {
  border: 0.125em solid black;
  border-radius: 50%;
  content: "";
  top: -10%;
  bottom: -10%;
  left: -10%;
  right: -10%;
  position: absolute;
}
</style>

<script>
import deck from '@/mixins/deck.mixin';

const NAME_STATES = Object.freeze({
  'NONE': '',
  'CROSSED': 'crossed',
  'CIRCLED': 'circled'
});

export default {
  name: 'Notepad',
  mixins: [deck],
  data () {
    return {
      notepad: {
        p1: {},
        p2: {},
        p3: {},
        p4: {},
        p5: {},
        p6: {}
      },
      nameState: {}
    };
  },
  created () {
    Object.values(this.notepad).forEach(player => {
      this.$set(player, 'name', '');
      Object.keys(this.suspects).forEach(suspect => {
        this.$set(player, suspect, '');
        if (!this.nameState.hasOwnProperty(suspect)) {
          this.$set(this.nameState, suspect, '');
        }
      });
      Object.keys(this.weapons).forEach(weapon => {
        this.$set(player, weapon, '');
        if (!this.nameState.hasOwnProperty(weapon)) {
          this.$set(this.nameState, weapon, '');
        }
      });
      Object.keys(this.rooms).forEach(room => {
        this.$set(player, room, '');
        if (!this.nameState.hasOwnProperty(room)) {
          this.$set(this.nameState, room, '');
        }
      });
    });
  },
  methods: {
    toggleNameState (key) {
      let stateValues = Object.values(NAME_STATES);
      let index = stateValues.findIndex(state => state === this.nameState[key]);
      this.nameState[key] = stateValues[++index % stateValues.length];
    },
    getNameTextClass (key) {
      return {
        'css-cross-out': this.nameState[key] === NAME_STATES.CROSSED,
        'css-circle-over': this.nameState[key] === NAME_STATES.CIRCLED
      };
    }
  }
};
</script>
