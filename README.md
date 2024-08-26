# InSync

## Description

InSync is a cooperative game where players are challenged to align their understanding of various concepts by matching a hidden scale based on clues provided by one player. Built using Vue.js, this project showcases a range of modern frontend development techniques, including responsive design, interactive elements, and real-time updates using WebSockets.

## Gameplay

- **Randomised Scales**: Each player is presented with a randomised scale, offering a unique challenge every time.
- **Clue Giving**: One player, designated as the clue giver, provides a hint related to the scale, guiding the team towards the hidden target.
- **Team Guessing**: Players collaborate to adjust their scales, aiming to match the hidden scale as closely as possible based on the clue.
- **Scoring**: Points are awarded based on how accurately the team’s guess aligns with the hidden scale. Scores are tallied and revealed at the end of the game.

## Features

- **Responsive Design**: Optimised for various screen sizes, ensuring a smooth experience across devices, particularly in portrait mode.
- **Floating Button Animation**: Buttons are animated with a floating pattern, simulating a zero-gravity effect to enhance the user experience.
- **Carousel Format**: Content blocks are organised in a carousel format, navigated via buttons. Additionally, a fun facts modal presents randomised facts, ensuring variety each time it is viewed.
- **Loading Logic**: Implemented at the top level, the loading state is clearly communicated to users whenever the game is processing a request, keeping them informed.
- **Pop-Up Modals**: Designed for ease of use, modals can be closed via buttons or by clicking the background, offering a user-friendly experience.
- **Dynamic Pop-Up Messages**: Interactive messages and prompts are rendered dynamically, responding to user actions and enhancing interactivity.
- **Router Redirection Logic**: Intelligent routing ensures users are directed to the appropriate page based on their status, such as whether they are logged in or if they have an active game in progress.
- **Interactive Slider**: A real-time, draggable slider allows players to adjust their scales. The slider's state is dynamically updated across all players’ screens using WebSockets, ensuring smooth and synchronised gameplay.

## Technology Stack

### Frontend

- **Vue.js**: JavaScript framework used for building the user interface.
- **HTML5/CSS3**: For structuring and styling the application.
- **JavaScript (ES6+)**: Core programming language used in the project.
- **Pinia & Pinia-Persist**: State management library for Vue.js.
- **Vue Router**: Handling navigation between different views or pages.
- **Axios**: Promise-based HTTP client for making API requests.

### Real-Time Communication

- **WebSockets**: Enables real-time, two-way communication between the client and the server.

### Build Tools

- **npm**: Package manager for managing dependencies.

## Installation 
To set up this project locally, follow these steps: 
1. Clone the repository 
2. Install dependencies:
   npm install from within the app directory  
3. Create .env:
   Currently only thing required to make this work in development is the following to point to your local host port which the backend will be running on
   VITE_API_BASE_URL=http://localhost:5000/ 
4. Start the development server:
   npm run dev

## Usage 
Once the development server is running, you can access the game in your web browser by navigating to http://localhost:5173. From there, you can experience the full functionality of InSync. 

## Gameplay Instructions

1. **Open the Game**:
   - Launch the game in both an incognito window and a regular tab.

2. **Sign Up**:
   - Register your account in each tab.

3. **Start Playing**:
   - Click the "Play" button in both tabs.

4. **Host and Join**:
   - In one tab, Player 1 selects "Host Game" to start a new game.
   - In the other tab, Player 2 selects "Join Game" and enters the game code displayed on the host's screen.

5. **Start the Game**:
   - The host starts the game once all players have joined.

6. **Provide Clues**:
   - Each player provides clues, with an option to receive a new scale if desired.

7. **Clue Requirement**:
   - The game will pause until all players have submitted 3 clues.

8. **Gameplay Dynamics**:
   - The clue giver's scale will be disabled once their clue is given. The clue giver should refrain from giving any additional hints.
   - Non-clue-givers can discuss and adjust the scale position. These adjustments will be updated in real-time on all screens.
   - Any player (excluding the clue giver) can submit the group's guess at any time. The game will then proceed to the guess reveal, where the guess slider and the target slider are displayed.

9. **Game Progression**:
   - Only the host has access to the "Next" button, which controls the game's progression.

10. **Results**:
    - After all clues have been revealed and answered, each player will see a "Results" button.
    - Clicking this will show how many points the team scored for each clue.

11. **Final Score**:
    - On the results page, the total points and the total potential points are displayed.
    - The team is ranked based on their score and receives one of five possible responses according to their ranking.

12. **Replay Option**:
    - Players can choose to play again, which will return them to the play page where they can either host a new game or join an existing one.

## About the Developer 
As a frontend developer, this is my first full-fledged project, and it represents the culmination of my learning and growth in web development. Through InSync, I’ve explored various aspects of frontend development, including Vue.js, responsive design, real-time interactivity, and user experience optimisation. 
