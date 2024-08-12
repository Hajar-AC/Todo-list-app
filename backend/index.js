const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const Todo = require("./models/todo");
const cors = require("cors"); // Importer cors

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Synchronisation de la base de données
sequelize.sync()
  .then(() => {
    console.log("Base de données synchronisée");
  })
  .catch((err) => {
    console.error("Erreur lors de la synchronisation de la base de données:", err);
  });

// Route pour récupérer toutes les tâches
app.get("/todos", async (_, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findByPk(todoId); // Utilisation de findByPk pour récupérer par clé primaire
    if (!todo) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour ajouter une nouvelle tâche
app.post("/todos", async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todo = await Todo.create({ text, completed });
    console.log(`Adding task ${todo}`)
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour mettre à jour une tâche
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      todo.text = req.body.text || todo.text;
      todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
      await todo.save();
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: "Tâche non trouvée" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour supprimer une tâche
app.delete('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    await todo.destroy();
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/todos', async (req, res) => {
  try {
    await Todo.destroy({ where: {}, truncate: true }); // Supprimer toutes les tâches et réinitialiser les IDs
    res.status(204).send(); // Répondre avec un statut 204 No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
