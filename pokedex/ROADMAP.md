# 🚀 Roadmap Pokedex-Angular


- [x] **Organisation du Pair Programming**  
  - Élaboration d’un planning de sessions avec rôle **Driver** / **Navigator** alterné toutes les 30 minutes  
  - Adoption de VS Code Live Share pour coder simultanément et partager le focus  
  - Rédaction d’un guide interne décrivant les responsabilités de chaque rôle et les bonnes pratiques (commit messages, revue de code)

- [x] **Conception de l’architecture Angular**  
  - Définition des modules :
    - AppModule (import des modules cœur : HttpClientModule, ReactiveFormsModule)  
    - PokemonModule (regroupe les composants et services liés aux Pokémon)  
    - SharedModule (contient les composants/utilitaires réutilisables)  
  - Mise en place de AppRoutingModule pour gérer les routes principales ('', pokemon/:id)  
  - Structuration des dossiers :
    - features/ pour les composants métiers (Search, List, Detail)  
    - services/ pour PokeApiService et futurs services  
    - models/ pour les interfaces TypeScript (Pokemon, PokemonDetail)  
  - Configuration des environnements (environment.ts / environment.prod.ts) avec URL API et constantes

- [x] **Implémentation de la recherche, pagination et filtrage**  
  - **Recherche instantanée** :  
    - Utilisation de FormControl et valueChanges avec debounceTime(300) & distinctUntilChanged()  
    - Filtrage client sur les noms renvoyés par l’API  
  - **Pagination** :  
    - Service PokeApiService.getPokemonList(offset, limit) ajustable via environment.pageLimit  
    - Composant ListComponent qui gère currentOffset et navigation entre les pages  
  - **Tri et filtrage** :  
    - Tri alphabétique implémenté via array.sort((a,b) => a.name.localeCompare(b.name))  
    - Filtrage par type avec un menu déroulant lié à une méthode de filtrage client   