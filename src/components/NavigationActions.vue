<template>
  <div class="actions">
    <RouterLink v-if="back && back.length" class="back" :to="back[0]">{{
      back[1] || "Atras"
    }}</RouterLink>
    <RouterLink
      v-if="forward && forward.length"
      class="forward"
      :to="forward[0]"
      >{{ forward[1] || "Siguiente" }}
    </RouterLink>
  </div>
</template>
<script>
export default {
  name: "NavigationActions",
  props: {
    back: {
      type: Array,
      default: () => [],
    },
    forward: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  background-color: hsla(288, 20%, 49%, 0.206);
  color: white;
  text-decoration: none;
  transition: 0.2s;
}
a:hover {
  font-weight: bold;
}
.back, .forward {
  position: fixed;
  font-size: 1.2rem;
  top: 1.5rem;
  z-index: 2;
}
.back {
  left: 0;
}
.forward {
  right: 0;
}
</style>
