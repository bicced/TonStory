# TON Hackathon - 2D Platformer Game Telegram Mini App

2D platformer game developed for the TON Hackathon. In this game, players can farm airdrop points by fighting monsters. The game is designed to run as a Telegram Mini App.

https://github.com/user-attachments/assets/521e3d3b-a1ea-4687-8194-b8aeb333627c

## Technologies Used

### Frontend:
- Vite
- React
- Kaboom.js

### Backend:
- Firestore
- Firebase Cloud Functions via Express

All components are built using TypeScript.

## Environment Variables

This project uses Firebase, with built-in key management.

## Getting Started

To run this project, you'll need:
- Node.js
- Firebase account
- Telegram bot (for setting up the mini app)

### Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/ton-hackathon-2d-platformer.git
    ```

2. **Install Dependencies:**
    ```bash
    cd ton-hackathon-2d-platformer
    yarn install
    ```

### Setup

#### Firebase:
1. Go to Firebase and create a new project.
2. Add Firestore and set up Cloud Functions.
3. Download the service account key from Firebase and save it to `functions/credentials/service-account.json`.
4. Update `.firebaserc` to point to your new project.

#### Endpoints:
1. Update `tonconnect-manifest.json` with your frontend URL and information.
2. Update `API_BASE_URL` in `src/api/index.ts` with your backend URL.

#### Telegram Bot:
1. Update the Telegram bot tokens in `functions/middleware.ts` and `functions/src/telegram/index.ts`.
2. Store the tokens safely. I left the token exposed here because my bot is already deleted.

## TON Mini App Setup

For detailed instructions on setting up a TON Mini App, please refer to the [TON Mini App setup documentation](https://docs.ton.org/develop/dapps/).

## Contributing

I welcome contributions! This app is not fully complete; it was developed over a weekend and has several areas that can be improved.

### Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
