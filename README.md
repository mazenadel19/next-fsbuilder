# File System Builder

This project is a **file system builder** built with **Next.js**. It allows users to create, view, edit, and delete files and folders, providing a clean and efficient interface for managing their contents.

## Features

-   **Create New Files and Folders**: Users can add new files or folders to the system.
-   **View Folders**: Navigate through folders to organize content.
-   **Edit Files and Folders**: Modify the names or properties of existing files and folders.
-   **Delete Files and Folders**: Remove files or folders as needed.
-   **Responsive and Accessible Design**: Ensures a user-friendly experience on all devices, with accessibility considerations powered by Material-UI.

## Tech Stack

-   **Next.js**: A React framework for building fast, SEO-friendly web applications.
-   **React**: For building reusable UI components.
-   **Material-UI**: For responsive and accessible UI components.
-   **Firebase Realtime Database**: Stores and manages file and folder data.
-   **pnpm**: Package manager for faster and more efficient dependency management.

## Development Tools

-   **Absolute Imports**: Configured with ESLint for easier imports.
-   **Prettier**: Used for consistent code formatting.
-   **Husky**: Enforces Git hooks for maintaining code quality.
-   **lint-staged**: Runs linters on Git staged files to catch issues before commits.
-   **commitlint**: Enforces conventional commit messages to maintain clean commit history.

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/mazenadel19/next-fsbuilder.git
    ```
2. Navigate to the project directory:
    ```bash
    cd next-fsbuilder
    ```
3. Install dependencies using `pnpm`:
    ```bash
    pnpm install
    ```
4. Set up your Firebase Realtime Database and configure your Firebase credentials in `.env`:
    ```bash
    NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
    ```
5. Start the development server:

    ```bash
    pnpm run dev
    ```

6. Access the app at `http://localhost:3000`.

## Contributing

Feel free to open issues or submit pull requests to improve the project!

## License

This project is licensed under the [MIT](License.md)
.
