<!--
  Rooms are rendered slightly offset from the board grid. They extend past the edges of the grid by a certain scale of a cell.
  For this reason, the coordinates of the lines that render the room are offset slightly to make it easier to calculate and draw.
  This component will draw all bordering lines for a room with the exception of the space that has the door on the board.
-->
<template>
  <g>
    <!-- Study -->
    <g :transform="getXYTranslation(-offsetScale, -offsetScale)"
       @click="$emit('click', 'study')">
      <polygon :points="`0,0 ${offset(6)},0 ${offset(6)},${offset(1)} ${offset(7)},${offset(1)} ${offset(7)},${offset(4)} 0,${offset(4)}`"
               :class="{ highlight: isAvailableMove('study') }"/>
      <!-- Secret Passage to Kitchen -->
      <rect :class="{ highlight: isAvailablePassage('kitchen') }"
            :width="cellSize" :height="cellSize"
            :transform="getXYTranslation(0, offsetScale+3)"
            @click="$emit('passage', 'kitchen')"/>
      <text class="css-passage" :x="offset(2.5)" :y="offset(3.8)">Secret Passage to Kitchen</text>
      <line class="door" :x1="offset(6)" :x2="offset(7)" :y1="offset(4)" :y2="offset(4)"/>
      <line :x1="-borderWidth/2" :x2="offset(6)+borderWidth/2" :y1="0" :y2="0"/>
      <line :x1="offset(6)" :x2="offset(6)" :y1="0" :y2="offset(1)"/>
      <line :x1="offset(6)-borderWidth/2" :x2="offset(7)+borderWidth/2" :y1="offset(1)" :y2="offset(1)"/>
      <line :x1="offset(7)" :x2="offset(7)" :y1="offset(1)" :y2="offset(4)"/>
      <line :x1="-borderWidth/2" :x2="offset(6)" :y1="offset(4)" :y2="offset(4)"/>
      <line :x1="0" :x2="0" :y1="0" :y2="offset(4)"/>
      <text :x="offset(3)" :y="cell(2)">Study</text>
    </g>
    <!-- Library -->
    <g :transform="getXYTranslation(-offsetScale, 6)"
       @click="$emit('click', 'library')">
      <polygon :points="`${offset(1)},0 ${offset(6)},0 ${offset(6)},${cell(1)} ${offset(7)},${cell(1)} ${offset(7)},${cell(4)}
                        ${offset(6)},${cell(4)} ${offset(6)},${cell(5)} ${offset(1)},${cell(5)} ${offset(1)},${cell(4)} 0,${cell(4)}
                        0,${cell(1)} ${offset(1)},${cell(1)}`"
               :class="{ highlight: isAvailableMove('library') }"/>
      <line class="door" :x1="offset(7)" :x2="offset(7)" :y1="cell(2)" :y2="cell(3)"/>
      <line class="door" :x1="offset(3)" :x2="offset(4)" :y1="cell(5)" :y2="cell(5)"/>
      <line :x1="offset(1)-borderWidth/2" :x2="offset(6)+borderWidth/2" :y1="0" :y2="0"/>
      <line :x1="offset(6)" :x2="offset(6)" :y1="0" :y2="cell(1)"/>
      <line :x1="offset(6)-borderWidth/2" :x2="offset(7)+borderWidth/2" :y1="cell(1)" :y2="cell(1)"/>
      <line :x1="offset(7)" :x2="offset(7)" :y1="cell(1)" :y2="cell(2)"/>
      <line :x1="offset(7)" :x2="offset(7)" :y1="cell(3)" :y2="cell(4)"/>
      <line :x1="offset(6)-borderWidth/2" :x2="offset(7)+borderWidth/2" :y1="cell(4)" :y2="cell(4)"/>
      <line :x1="offset(6)" :x2="offset(6)" :y1="cell(4)" :y2="cell(5)"/>
      <line :x1="offset(4)" :x2="offset(6)+borderWidth/2" :y1="cell(5)" :y2="cell(5)"/>
      <line :x1="offset(1)-borderWidth/2" :x2="offset(3)" :y1="cell(5)" :y2="cell(5)"/>
      <line :x1="offset(1)" :x2="offset(1)" :y1="cell(4)" :y2="cell(5)"/>
      <line :x1="-borderWidth/2" :x2="offset(1)+borderWidth/2" :y1="cell(4)" :y2="cell(4)"/>
      <line :x1="0" :x2="0" :y1="cell(4)" :y2="cell(1)"/>
      <line :x1="-borderWidth/2" :x2="offset(1)+borderWidth/2" :y1="cell(1)" :y2="cell(1)"/>
      <line :x1="offset(1)" :x2="offset(1)" :y1="cell(1)" :y2="0"/>
      <text :x="cell(3.5)" :y="cell(2.5)">Library</text>
    </g>
    <!-- Billiard Room -->
    <g :transform="getXYTranslation(-offsetScale, 12)"
       @click="$emit('click', 'billiard')">
      <polygon :points="`0,0 ${offset(6)},0 ${offset(6)},${cell(5)} 0,${cell(5)}`"
               :class="{ highlight: isAvailableMove('billiard') }"/>
      <line class="door" :x1="offset(1)" :x2="offset(2)" :y1="0" :y2="0"/>
      <line class="door" :x1="offset(6)" :x2="offset(6)" :y1="cell(3)" :y2="cell(4)"/>
      <line :x1="-borderWidth/2" :x2="offset(1)" :y1="0" :y2="0"/>
      <line :x1="offset(2)" :x2="offset(6)+borderWidth/2" :y1="0" :y2="0"/>
      <line :x1="offset(6)" :x2="offset(6)" :y1="0" :y2="cell(3)"/>
      <line :x1="offset(6)" :x2="offset(6)" :y1="cell(4)" :y2="cell(5)"/>
      <line :x1="-borderWidth/2" :x2="offset(6)+borderWidth/2" :y1="cell(5)" :y2="cell(5)"/>
      <line :x1="0" :x2="0" :y1="0" :y2="cell(5)"/>
      <text :x="offset(2)" :y="cell(2)">Billiard Room</text>
    </g>
    <!-- Conservatory -->
    <g :transform="getXYTranslation(-offsetScale, 19)"
       @click="$emit('click', 'conservatory')">
      <polygon :points="`${offset(1)},0 ${offset(5)},0 ${offset(5)},${cell(1)} ${offset(6)},${cell(1)} ${offset(6)},${offset(5)}
                        0,${offset(5)} 0,${cell(1)} ${offset(1)},${cell(1)}`"
               :class="{ highlight: isAvailableMove('conservatory') }"/>
      <!-- Secret Passage to Lounge -->
      <rect :class="{ highlight: isAvailablePassage('lounge') }"
            :width="cellSize" :height="cellSize"
            :transform="getXYTranslation(offsetScale+1, 0)"
            @click="$emit('passage', 'lounge')"/>
      <text class="css-passage" :x="offset(1.5)" :y="cell(1.2)">Secret Passage to Lounge</text>
      <line class="door" :x1="offset(5)" :x2="offset(5)" :y1="0" :y2="cell(1)"/>
      <line :x1="offset(1)-borderWidth/2" :x2="offset(5)" :y1="0" :y2="0"/>
      <line :x1="offset(5)" :x2="offset(6)+borderWidth/2" :y1="cell(1)" :y2="cell(1)"/>
      <line :x1="offset(6)" :x2="offset(6)" :y1="cell(1)" :y2="offset(5)"/>
      <line :x1="-borderWidth/2" :x2="offset(6)+borderWidth/2" :y1="offset(5)" :y2="offset(5)"/>
      <line :x1="0" :x2="0" :y1="cell(1)" :y2="offset(5)"/>
      <line :x1="-borderWidth/2" :x2="offset(1)+borderWidth/2" :y1="cell(1)" :y2="cell(1)"/>
      <line :x1="offset(1)" :x2="offset(1)" :y1="0" :y2="cell(1)"/>
      <text :x="cell(3)" :y="cell(3)">Conservatory</text>
    </g>
    <!-- Ballroom -->
    <g :transform="getXYTranslation(8, 17)"
       @click="$emit('click', 'ballroom')">
      <polygon :points="`0,0 ${cell(8)},0 ${cell(8)},${cell(6)} ${cell(6)},${cell(6)} ${cell(6)},${offset(7)} ${cell(2)},${offset(7)}
                        ${cell(2)},${cell(6)} 0,${cell(6)}`"
               :class="{ highlight: isAvailableMove('ballroom') }"/>
      <line class="door" :x1="0" :x2="0" :y1="cell(2)" :y2="cell(3)"/>
      <line class="door" :x1="cell(1)" :x2="cell(2)" :y1="0" :y2="0"/>
      <line class="door" :x1="cell(6)" :x2="cell(7)" :y1="0" :y2="0"/>
      <line class="door" :x1="cell(8)" :x2="cell(8)" :y1="cell(2)" :y2="cell(3)"/>
      <line :x1="-borderWidth/2" :x2="cell(1)" :y1="0" :y2="0"/>
      <line :x1="cell(2)" :x2="cell(6)" :y1="0" :y2="0"/>
      <line :x1="cell(7)" :x2="cell(8)+borderWidth/2" :y1="0" :y2="0"/>
      <line :x1="cell(8)" :x2="cell(8)" :y1="0" :y2="cell(2)"/>
      <line :x1="cell(8)" :x2="cell(8)" :y1="cell(3)" :y2="cell(6)"/>
      <line :x1="cell(6)-borderWidth/2" :x2="cell(8)+borderWidth/2" :y1="cell(6)" :y2="cell(6)"/>
      <line :x1="cell(6)" :x2="cell(6)" :y1="cell(6)" :y2="offset(7)+borderWidth/2"/>
      <path :d="`M ${cell(2)} ${offset(7)} q ${cell(2)} ${cell(1)} ${cell(4)} 0`"
            :class="{ highlight: isAvailableMove('ballroom') }"/>
      <line :x1="cell(2)" :x2="cell(2)" :y1="cell(6)" :y2="offset(7)+borderWidth/2"/>
      <line :x1="-borderWidth/2" :x2="cell(2)+borderWidth/2" :y1="cell(6)" :y2="cell(6)"/>
      <line :x1="0" :x2="0" :y1="cell(3)" :y2="cell(6)"/>
      <line :x1="0" :x2="0" :y1="0" :y2="cell(2)"/>
      <text :x="cell(4)" :y="cell(2.5)">Ballroom</text>
    </g>
    <!-- Kitchen -->
    <g :transform="getXYTranslation(18, 18)"
       @click="$emit('click', 'kitchen')">
      <polygon :points="`0,0 ${cell(5)},0 ${cell(5)},${cell(1)} ${offset(6)},${cell(1)} ${offset(6)},${offset(6)} 0,${offset(6)}`"
               :class="{ highlight: isAvailableMove('kitchen') }"/>
      <!-- Secret Passage to Study -->
      <rect :class="{ highlight: isAvailablePassage('study') }"
            :width="cellSize" :height="cellSize"
            :transform="getXYTranslation(0, offsetScale+5)"
            @click="$emit('passage', 'study')"/>
      <text class="css-passage" :x="offset(2.4)" :y="offset(5.8)">Secret Passage to Study</text>
      <line class="door" :x1="cell(1)" :x2="cell(2)" :y1="0" :y2="0"/>
      <line :x1="-borderWidth/2" :x2="cell(1)" :y1="0" :y2="0"/>
      <line :x1="cell(2)" :x2="cell(5)+borderWidth/2" :y1="0" :y2="0"/>
      <line :x1="cell(5)" :x2="cell(5)" :y1="0" :y2="cell(1)"/>
      <line :x1="cell(5)-borderWidth/2" :x2="offset(6)+borderWidth/2" :y1="cell(1)" :y2="cell(1)"/>
      <line :x1="offset(6)" :x2="offset(6)" :y1="cell(1)" :y2="offset(6)"/>
      <line :x1="-borderWidth/2" :x2="offset(6)+borderWidth/2" :y1="offset(6)" :y2="offset(6)"/>
      <line :x1="0" :x2="0" :y1="0" :y2="offset(6)"/>
      <text :x="cell(3)" :y="cell(3)">Kitchen</text>
    </g>
    <!-- Dining Room -->
    <g :transform="getXYTranslation(16, 9)"
       @click="$emit('click', 'dining')">
      <polygon :points="`0,0 ${offset(8)},0 ${offset(8)},${cell(7)} ${cell(3)},${cell(7)} ${cell(3)},${cell(6)} 0,${cell(6)}`"
               :class="{ highlight: isAvailableMove('dining') }"/>
      <line class="door" :x1="cell(1)" :x2="cell(2)" :y1="0" :y2="0"/>
      <line class="door" :x1="0" :x2="0" :y1="cell(3)" :y2="cell(4)"/>
      <line :x1="-borderWidth/2" :x2="cell(1)" :y1="0" :y2="0"/>
      <line :x1="cell(2)" :x2="offset(8)+borderWidth/2" :y1="0" :y2="0"/>
      <line :x1="offset(8)" :x2="offset(8)" :y1="0" :y2="cell(7)"/>
      <line :x1="cell(3)-borderWidth/2" :x2="offset(8)+borderWidth/2" :y1="cell(7)" :y2="cell(7)"/>
      <line :x1="cell(3)" :x2="cell(3)" :y1="cell(6)" :y2="cell(7)"/>
      <line :x1="-borderWidth/2" :x2="cell(3)+borderWidth/2" :y1="cell(6)" :y2="cell(6)"/>
      <line :x1="0" :x2="0" :y1="cell(4)" :y2="cell(6)"/>
      <line :x1="0" :x2="0" :y1="0" :y2="cell(3)"/>
      <text :x="cell(4.5)" :y="cell(3)">Dining Room</text>
    </g>
    <!-- Lounge -->
    <g :transform="getXYTranslation(17, -offsetScale)"
       @click="$emit('click', 'lounge')">
      <polygon :points="`${cell(1)},0 ${offset(7)},0 ${offset(7)},${offset(6)} 0,${offset(6)} 0,${offset(1)} ${cell(1)},${offset(1)}`"
               :class="{ highlight: isAvailableMove('lounge') }"/>
      <!-- Secret Passage to Conservatory -->
      <rect :class="{ highlight: isAvailablePassage('conservatory') }"
            :width="cellSize" :height="cellSize"
            :transform="getXYTranslation(offsetScale+6, offsetScale+5)"
            @click="$emit('passage', 'conservatory')"/>
      <text class="css-passage" :x="offset(3.7)" :y="offset(5.8)">Secret Passage to Conservatory</text>
      <line class="door" :x1="0" :x2="cell(1)" :y1="offset(6)" :y2="offset(6)"/>
      <line :x1="cell(1)-borderWidth/2" :x2="offset(7)+borderWidth/2" :y1="0" :y2="0"/>
      <line :x1="offset(7)" :x2="offset(7)" :y1="0" :y2="offset(6)"/>
      <line :x1="cell(1)" :x2="offset(7)+borderWidth/2" :y1="offset(6)" :y2="offset(6)"/>
      <line :x1="0" :x2="0" :y1="offset(1)" :y2="offset(6)"/>
      <line :x1="-borderWidth/2" :x2="cell(1)+borderWidth/2" :y1="offset(1)" :y2="offset(1)"/>
      <line :x1="cell(1)" :x2="cell(1)" :y1="0" :y2="offset(1)"/>
      <text :x="cell(3.5)" :y="cell(3)">Lounge</text>
    </g>
    <!-- Hall -->
    <g :transform="getXYTranslation(9, -offsetScale)"
       @click="$emit('click', 'hall')">
      <polygon :points="`0,${offset(0)+cell(1/2)} ${cell(1)},${offset(0)+cell(1/2)} ${cell(1)},${cell(1/2)} ${cell(5)},${cell(1/2)}
                        ${cell(5)},${offset(0)+cell(1/2)} ${cell(6)},${offset(0)+cell(1/2)} ${cell(6)},${offset(7)} 0,${offset(7)}`"
               :class="{ highlight: isAvailableMove('hall') }"/>
      <line class="door" :x1="0" :x2="0" :y1="offset(4)" :y2="offset(5)"/>
      <line class="door" :x1="cell(2)" :x2="cell(4)" :y1="offset(7)" :y2="offset(7)"/>
      <line :x1="-borderWidth/2" :x2="cell(1)+borderWidth/2" :y1="offset(0)+cell(1/2)" :y2="offset(0)+cell(1/2)"/>
      <line :x1="cell(1)" :x2="cell(1)" :y1="cell(1/2)-cellLineWidth/2" :y2="offset(0)+cell(1/2)"/>
      <path :d="`M ${cell(1)} ${cell(1/2)} q ${cell(2)} ${-offset(0)-cell(1/2)} ${cell(4)} 0`"
            :class="{ highlight: isAvailableMove('hall') }"/>
      <line :x1="cell(5)" :x2="cell(5)" :y1="cell(1/2)-cellLineWidth/2" :y2="offset(0)+cell(1/2)"/>
      <line :x1="cell(5)-borderWidth/2" :x2="cell(6)+borderWidth/2" :y1="offset(0)+cell(1/2)" :y2="offset(0)+cell(1/2)"/>
      <line :x1="cell(6)" :x2="cell(6)" :y1="offset(0)+cell(1/2)" :y2="offset(7)"/>
      <line :x1="cell(4)" :x2="cell(6)+borderWidth/2" :y1="offset(7)" :y2="offset(7)"/>
      <line :x1="-borderWidth/2" :x2="cell(2)" :y1="offset(7)" :y2="offset(7)"/>
      <line :x1="0" :x2="0" :y1="offset(5)" :y2="offset(7)"/>
      <line :x1="0" :x2="0" :y1="offset(0)+cell(1/2)" :y2="offset(4)"/>
      <text :x="cell(3)" :y="cell(3.5)">Hall</text>
    </g>
  </g>
</template>

<script>
import cellScaling from '@/mixins/cellScaling.mixin';
import moves from '@/mixins/moves.mixin';

export default {
  name: 'Rooms',
  mixins: [cellScaling,moves],
  props: {
    cellLineWidth: Number,
    borderWidth: Number
  }
};
</script>
