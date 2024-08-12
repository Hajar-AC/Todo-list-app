<template>
  <div id="app">
    <!-- Navigation -->
    <nav>
      <router-link to="/" class="nav-link">Todo List</router-link>
      <router-link to="/add" class="nav-link">Add Todo</router-link>
    </nav>

    <!-- Vue Router affichera ici le composant correspondant à la route -->
    <router-view @add-todo="addTodoToStore"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  methods: {
    ...mapActions(["addTodo"]),
    addTodoToStore(todo: { text: string; completed: boolean }) {
      this.addTodo(todo);
    },
  },
});
</script>

<style>
/* Styles comme décrits dans l'option 1 */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

nav {
  margin-bottom: 30px;
}

.nav-link {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}

.nav-link.router-link-active {
  color: #35495e;
}

h1 {
  color: #42b983;
}

button {
  background-color: #42b983;
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #35495e;
}

input {
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  width: 80%;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f3f3f3;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.completed {
  text-decoration: line-through;
  color: #ccc;
}

p {
  color: red;
  font-size: 14px;
}
</style>
