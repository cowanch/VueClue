<template>
  <svg width="100" height="100">
    <rect v-if="value>0"
          width="100" height="100"/>
    <!-- 1 -->
    <g v-if="value===1">
      <circle cx="50" cy="50" :r="dotRadius"/>
    </g>
    <!-- 2 -->
    <g v-else-if="value===2">
      <circle cx="25" cy="25" :r="dotRadius"/>
      <circle cx="75" cy="75" :r="dotRadius"/>
    </g>
    <!-- 3 -->
    <g v-else-if="value===3">
      <circle cx="25" cy="25" :r="dotRadius"/>
      <circle cx="50" cy="50" :r="dotRadius"/>
      <circle cx="75" cy="75" :r="dotRadius"/>
    </g>
    <!-- 4 -->
    <g v-else-if="value===4">
      <circle cx="25" cy="25" :r="dotRadius"/>
      <circle cx="25" cy="75" :r="dotRadius"/>
      <circle cx="75" cy="25" :r="dotRadius"/>
      <circle cx="75" cy="75" :r="dotRadius"/>
    </g>
    <!-- 5 -->
    <g v-else-if="value===5">
      <circle cx="25" cy="25" :r="dotRadius"/>
      <circle cx="25" cy="75" :r="dotRadius"/>
      <circle cx="50" cy="50" :r="dotRadius"/>
      <circle cx="75" cy="25" :r="dotRadius"/>
      <circle cx="75" cy="75" :r="dotRadius"/>
    </g>
    <!-- 6 -->
    <g v-else-if="value===6">
      <circle cx="25" cy="25" :r="dotRadius"/>
      <circle cx="25" cy="50" :r="dotRadius"/>
      <circle cx="25" cy="75" :r="dotRadius"/>
      <circle cx="75" cy="25" :r="dotRadius"/>
      <circle cx="75" cy="50" :r="dotRadius"/>
      <circle cx="75" cy="75" :r="dotRadius"/>
    </g>
  </svg>
</template>

<script>
const DOT_RADIUS = 9;

export default {
  name: 'Die',
  props: {
    value: {
      type: Number,
      validator: (val) => val >= 0 && val <= 6
    }
  },
  computed: {
    dotRadius () {
      return DOT_RADIUS;
    }
  }
};
</script>
