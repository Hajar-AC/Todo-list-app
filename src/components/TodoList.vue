<template>
  <div>
    <h1>Todo List</h1>

    <!-- Filter Buttons -->
    <div>
      <button @click="setFilter('all')">All</button>
      <button @click="setFilter('active')">Active</button>
      <button @click="setFilter('completed')">Completed</button>
    </div>

    <!-- Todo List -->
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <div v-if="!todo.editing">
          <!-- Display ID, Text, and Checkbox -->
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
          />
          <span :class="{ completed: todo.completed }">
            ID: {{ todo.id }} - {{ todo.text }}
          </span>
          <button @click="editTodo(todo)">Edit</button>
          <button @click="removeTodo(todo.id)">Remove</button>
        </div>
        <div v-else>
          <!-- Editable Input Field -->
          <input v-model="todo.text" />
          <button @click="saveTodo(todo)">Save</button>
          <button @click="cancelEdit(todo)">Cancel</button>
        </div>
      </li>
    </ul>

    <!-- Add New Todo 
    <input
      v-model="newTodoText"
      placeholder="Add a new todo"
      @keyup.enter="addTodo"
    />
   
    <button @click="addTodo">Add Todo</button>
     -->

    <!-- Print Todo List -->
    <button @click="printTodos">Print Todo List</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Todo } from "../models/Todo";

export default defineComponent({
  data() {
    return {
      filter: "all", // Default filter value
      allTodos: [] as Todo[], // List of all todos
      newTodoText: "", // Text for the new todo
    };
  },
  computed: {
    // Filter todos based on the selected filter
    filteredTodos(): Todo[] {
      if (this.filter === "completed") {
        return this.allTodos.filter((todo: Todo) => todo.completed);
      } else if (this.filter === "active") {
        return this.allTodos.filter((todo: Todo) => !todo.completed);
      } else {
        return this.allTodos;
      }
    },
  },
  methods: {
    reassignLocalIds() {
      this.allTodos.forEach((todo, index) => {
        todo.id = index + 1;
      });
    },

    async fetchTodos() {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        this.allTodos = response.data;

        // Réassigner les IDs localement
        this.reassignLocalIds();
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },

    // Add a new todo
    async addTodo() {
      if (this.newTodoText.trim()) {
        try {
          const response = await axios.post("http://localhost:3000/todos", {
            text: this.newTodoText,
            completed: false,
          });
          this.allTodos.push(response.data);
          this.newTodoText = ""; // Reset the text field
        } catch (error) {
          console.error("Error adding todo:", error);
        }
      }
    },
    // Remove a todo and reassign IDs
    async removeTodo(id: number) {
      console.log(`Trying to delete todo with ID: ${id}`);
      try {
        // Supprimer la tâche sur le backend
        await axios.delete(`http://localhost:3000/todos/${id}`);

        // Mettre à jour localement après suppression
        this.allTodos = this.allTodos.filter((todo) => todo.id !== id);

        // Optionnel: Si nécessaire, recharger les todos depuis le backend pour s'assurer de la cohérence
        await this.fetchTodos();

        console.log("Todo deleted successfully.");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error deleting todo:",
            error.response?.data || error.message
          );
        } else if (error instanceof Error) {
          console.error("Error deleting todo:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    },

    async saveTodo(todo: Todo) {
      if (todo.text.trim()) {
        try {
          console.log(`Saving todo with ID: ${todo.id}`);

          if (!todo.id) {
            throw new Error("Invalid todo ID");
          }

          const response = await axios.put(
            `http://localhost:3000/todos/${todo.id}`,
            todo
          );

          if (response.status === 200) {
            todo.editing = false;
          } else {
            console.error(
              `Failed to save todo with ID: ${todo.id}. Server responded with status: ${response.status}`
            );
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Error saving todo:",
              error.response?.data || error.message
            );
          } else if (error instanceof Error) {
            console.error("Unexpected error saving todo:", error.message);
          } else {
            console.error("An unknown error occurred while saving the todo.");
          }
        }
      } else {
        console.warn("Todo text is empty. Cannot save.");
      }
    },

    async toggleTodo(id: number) {
      const todo = this.allTodos.find((todo) => todo.id === id);
      if (todo) {
        try {
          todo.completed = !todo.completed;
          await axios.put(`http://localhost:3000/todos/${todo.id}`, todo);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Error updating todo:",
              error.response?.data || error.message
            );
          } else if (error instanceof Error) {
            console.error("Unexpected error:", error.message);
          } else {
            console.error("An unknown error occurred:", error);
          }
        }
      }
    },
    // Edit a todo
    editTodo(todo: Todo) {
      todo.editing = true;
    },

    // Cancel editing a todo
    cancelEdit(todo: Todo) {
      todo.editing = false;
    },

    // Set the active filter (All, Active, Completed)
    setFilter(filter: string) {
      this.filter = filter;
    },

    // Print the todo list
    printTodos() {
      const printableContent = this.filteredTodos
        .map((todo) => {
          return `ID: ${todo.id}, Text: ${todo.text}, Completed: ${
            todo.completed ? "Yes" : "No"
          }`;
        })
        .join("\n");

      const printWindow = window.open("", "", "height=400,width=600");

      if (printWindow) {
        printWindow.document.write("<pre>" + printableContent + "</pre>");
        printWindow.document.close(); // Necessary for some browsers to finish writing before printing
        printWindow.focus(); // Ensure the window is in focus before printing
        printWindow.print();
      } else {
        console.error("Failed to open the print window");
      }
    },
  },

  // Fetch todos when the component is created
  created() {
    this.fetchTodos();
  },
});
</script>

<style scoped>
*{
  font-family: poppins;
  border-radius: 10px;
}

h1 {
  margin-bottom: 20px;
  text-align: center; /* Centrer le titre */
}

div {
  text-align: center; /* Centrer le contenu */
}

button {
  margin-left: 5px;
  background-color: #42b983;
  border: none;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  border-radius: 4px; /* Ajout de coins arrondis */
  font-size: 14px; /* Taille de police pour les boutons */
}

button:hover {
  background-color: #35495e;
}

ul {
  list-style-type: none;
  padding: 0;
  max-width: 500px; /* Limiter la largeur de la liste */
  margin: 20px auto; /* Centrer la liste */
}

li {
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center; /* Aligner les éléments au centre */
  justify-content: space-between; /* Espacer les éléments de manière égale */
}

li span {
  flex: 1;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: #ccc;
}

input[type="checkbox"] {
  margin-right: 10px; /* Espacement à droite de la case à cocher */
}

input[type="text"] {
  flex: 1;
  margin-right: 10px;
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

input[type="text"]::placeholder {
  color: #aaa;
}

input[type="text"]:focus {
  outline: none;
  border-color: #42b983;
}

input[type="text"][v-model="newTodoText"] {
  width: 80%; /* Largeur du champ de texte pour l'ajout de tâches */
  margin-bottom: 10px; /* Espacement en bas */
}

input[type="text"][v-model="newTodoText"] + button {
  width: 18%; /* Largeur du bouton pour l'ajout de tâches */
  margin-left: 2%;
}

ul li div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* Assurer que les éléments prennent toute la largeur */
}

ul li div button {
  margin-left: 10px; /* Espacement entre les boutons */
}

ul li div input[type="text"] {
  flex: 2; /* Prendre plus d'espace pour l'édition */
}

ul li div input[type="checkbox"] {
  flex: 0; /* Garder la taille de la case à cocher minimale */
}

ul li div span {
  flex: 3; /* Prendre plus d'espace pour le texte */
}

ul li div button {
  flex: 1; /* Garder les boutons de taille égale */
}

button.print-button {
  margin-top: 20px;
  background-color: #42b983;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
