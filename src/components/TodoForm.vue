<template>
  <div>
    <h1>Add a New Todo</h1>
    <input
      v-model="newTodoText"
      placeholder="Add a new todo"
      @keyup.enter="submitTodo(false)"
    />
    <div>
      <button @click="submitTodo(false)">Add Active Todo</button>
      <button @click="submitTodo(true)">Add Completed Todo</button>
    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Todo } from "@/models/Todo";

export default defineComponent({
  data() {
    return {
      newTodoText: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitTodo(completed: boolean) {
      this.newTodoText = this.newTodoText.trim()
      if (this.newTodoText) {
        try {
          const response = await axios.post("http://localhost:3000/todos", {
            text: this.newTodoText,
            completed: completed,
          });
          const reponseData: Todo = response.data;
          console.log(`Response data: ${reponseData.text}`)
          this.$emit("add-todo", reponseData); 
          console.log(`Response data 2: ${reponseData.text}`)

          this.newTodoText = "";
          this.errorMessage = ""; 
          this.$router.push("/");
        } catch (error) {
          this.errorMessage = "Error adding the task. Please try again.";
          console.error("Error adding todo:", error);
        }
      } else {
        this.errorMessage = "Cannot add an empty task."; // Set error message
      }
    },
  },
});
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

input {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  margin-right: 5px;
}
</style>
