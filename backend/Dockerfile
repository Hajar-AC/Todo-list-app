# Utiliser l'image Node.js officielle
FROM node:20.16.0

# Créer et définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
