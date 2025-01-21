<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.menu ul {
  list-style-type: none;
}

@media (max-width: 768px) {
  .menu {
    flex-direction: column;
  }
}
</style>
