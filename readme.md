# Mini Event Manager

Ce projet est un monorepo contenant une application **Angular** pour le frontend et une application **Spring Boot** pour le backend. La base de données est gérée avec **Docker Compose**.

## Structure du projet

```
/monorepo
│── EventManagerFrontend/         # Application Angular
│── EventManagerBackend/          # Application Spring Boot
│   ├── src/         
│   ├── pom.xml      # Gestion des dépendances Maven
│   ├── docker-compose.yml  # Configuration de la base de données
│── README.md        # Documentation
```

## Prérequis
Avant de commencer, assure-toi d'avoir installé :
- [Node.js](https://nodejs.org/) (v18+ recommandé)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [JDK 17+](https://adoptopenjdk.net/)
- [Maven](https://maven.apache.org/)
- [Docker](https://www.docker.com/)

---

## Installation et Lancement du Projet

### 1. Cloner le projet
```sh
git clone https://github.com/GHEMNINGAaron/EventManager.git
cd monorepo
```

### 2. Lancer la base de données avec Docker Compose
```sh
cd EventManagerFrontend
docker-compose up -d
```
*(Cette commande démarre la base de données en arrière-plan.)*

### 3. Installer et démarrer le **Backend (Spring Boot)**
```sh
cd EventManagerBackend
mvn clean install
mvn spring-boot:run
```
Par défaut, le backend tourne sur `http://localhost:9001`.

### 4. Installer et démarrer le **Frontend (Angular)**
```sh
cd EventManagerFrontend
npm install
ng serve
```
Par défaut, le frontend est accessible sur `http://localhost:4200`.

---

## Variables d'environnements
Copiez le contenu du fichier env.txt dans un fichier .env et sauvegardez celui ci à la racine du backend afin de pouvoir l'utiliser

---

##  Outils additionnels
- Utilisation de **Postman** pour tester l'API.

---

##  Conclusion
Le projet est maintenant opérationnel ! 
- **Backend** : http://localhost:9001
- **Frontend** : http://localhost:4200

Si tu rencontres des problèmes, n'hésite pas à ouvrir une issue sur GitHub. 

