# 🐍 Snake Game - Collection d'implémentations

Une collection de 3 implémentations du jeu classique Snake avec une **architecture modulaire cohérente**, démontrant diverses technologies et approches de développement de jeux web.

## 📋 Vue d'ensemble

Ce projet présente le jeu Snake implémenté avec différentes technologies modernes de développement web, allant du Canvas HTML5 natif aux moteurs de rendu professionnels comme Pixi.js, en passant par des plateformes dédiées comme MicroStudio.

**Toutes les implémentations partagent la même architecture modulaire :**
- **Game** - Orchestrateur principal et boucle de jeu
- **Controls** - Gestion des entrées clavier/tactiles
- **Score** - Gestion du score
- **Snake** - Entité serpent avec comportements
- **Food** - Entité nourriture avec comportements

## 🎮 Implémentations

### 1. **html5-canvas** - Canvas API avec TypeScript
- **Technologie** : HTML5 Canvas API + TypeScript vanilla
- **Outil de build** : Vite
- **Taille du canvas** : 640x640 pixels (grille 20x20)
- **Architecture** : Modulaire - 7 fichiers séparés (Game, Controls, Score, Snake, Food, SpriteLoader, types)
- **Caractéristiques** :
  - Système de sprites PNG
  - Architecture modulaire avec séparation des responsabilités
  - Contrôles clavier (flèches + WASD)
  - Redémarrage avec Espace

### 2. **html5-pixijs** - Moteur 2D Pixi.js
- **Technologie** : Pixi.js 8.14.3 + TypeScript
- **Outil de build** : Vite
- **Taille du canvas** : 600x600 pixels (grille 20x20)
- **Architecture** : Modulaire - 6 fichiers séparés (Game, Controls, Score, Snake, Food, types)
- **Caractéristiques** :
  - Rendu WebGL/Canvas optimisé
  - Création dynamique de sprites
  - Écran de Game Over avec overlay
  - Architecture scalable et maintenable

### 3. **microstudio** - Plateforme MicroStudio
- **Technologie** : MicroScript (langage propriétaire)
- **Plateforme** : Environnement MicroStudio
- **Architecture** : Modulaire - 6 fichiers séparés (main, game, controls, score, snake, food)
- **Caractéristiques** :
  - Support multi-plateforme (ordinateur, téléphone, tablette)
  - Contrôles tactiles et souris
  - Assets sprites intégrés
  - Architecture adaptée à MicroScript

## 🚀 Démarrage rapide

### Pour html5-canvas et html5-pixijs

```bash
# Naviguez dans le dossier de l'implémentation souhaitée
cd html5-canvas  # ou html5-pixijs

# Installez les dépendances
npm install

# Lancez le serveur de développement
npm run dev

# Pour builder en production
npm run build
```

### Pour microstudio

Ouvrez le projet dans l'environnement [MicroStudio](https://microstudio.dev/) pour exécuter cette implémentation.

## 🎯 Fonctionnalités communes

- **Mécaniques de jeu** : Mouvement du serpent, consommation de nourriture, détection de collision
- **Contrôles** :
  - Flèches directionnelles (↑ ↓ ← →)
  - WASD
  - Espace pour redémarrer après Game Over
- **Scoring** : +1 points par nourriture consommée
- **Thème visuel** : Mode sombre avec accents verts
- **Système de grille** : Mouvement basé sur des tuiles
- **Validation de direction** : Impossible de faire demi-tour directement

## 📊 Comparaison des technologies

| Implémentation | Langage | Framework | Moteur de rendu | Canvas | Architecture |
|----------------|---------|-----------|----------------|--------|-------------|
| **html5-canvas** | TypeScript | Vite | Canvas 2D | 640x640 | 7 modules (Game, Controls, Score, Snake, Food, SpriteLoader, types) |
| **html5-pixijs** | TypeScript | Vite + Pixi.js | WebGL/Canvas | 600x600 | 6 modules (Game, Controls, Score, Snake, Food, types) |
| **microstudio** | MicroScript | MicroStudio | Intégré | 150x150 | 6 modules (main, game, controls, score, snake, food) |

### Points communs de l'architecture

Chaque implémentation suit le même pattern modulaire :
- **Séparation des responsabilités** - Chaque module a un rôle unique et bien défini
- **Testabilité** - Les modules peuvent être testés indépendamment
- **Maintenabilité** - Code organisé et facile à comprendre
- **Extensibilité** - Nouvelles fonctionnalités faciles à ajouter

## 📁 Structure des fichiers

### html5-canvas & html5-pixijs (TypeScript)
```
src/
├── types.ts          # Définitions de types (Position, Direction)
├── Game.ts           # Orchestrateur principal et boucle de jeu
├── Controls.ts       # Gestion des contrôles clavier
├── Score.ts          # Gestion et affichage du score
├── Snake.ts          # Entité serpent avec logique de mouvement
├── Food.ts           # Entité nourriture avec génération de position
└── main.ts           # Point d'entrée de l'application
```

### microstudio (MicroScript)
```
ms/
├── main.ms           # Point d'entrée et initialization
├── game.ms           # Orchestration du jeu
├── controls.ms       # Gestion des entrées clavier/tactiles
├── score.ms          # Gestion et affichage du score
├── snake.ms          # Entité serpent avec logique de mouvement
└── food.ms           # Entité nourriture avec génération de position
```

## 👤 Auteur

**Windaflame**
dev.windaflame@gmail.com

## 📝 Licence

Ce projet est un projet personnel éducatif.

---

**Amusez-vous bien à jouer ! 🐍✨**
