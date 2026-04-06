# Buddy Script Frontend

The frontend for **Buddy Script**, a modern social media-like platform designed for seamless user interaction. Built with **Next.js 15**, **TypeScript**, and **Redux Toolkit**, this application provides a responsive and intuitive interface for sharing posts, engaging with content, and connecting with others.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT.
- **Social Sign-in**: Integrated Google OAuth for quick access.
- **Dynamic Feed**: Real-time interaction with posts, including creation, editing, and deletion.
- **Engagement System**: Like and unlike posts or comments with instant feedback.
- **Threaded Conversations**: Multi-level commenting and reply system.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views using Tailwind CSS.
- **State Management**: Robust data handling and caching with Redux Toolkit Query (RTK Query).
- **Modern UI Components**: Built using Shadcn UI and Lucide icons for a polished look and feel.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Authentication**: [React OAuth Google](https://github.com/MomenSherif/react-oauth-google)

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **Backend Service**: Ensure the [Buddy Script Backend](https://github.com/your-repo/buddy-script-server) is running.

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd buddy-script-client
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add the following:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app`: Next.js App Router pages and layouts.
  - `(auth)`: Authentication routes (Login, Registration).
  - `(private)`: Protected routes (Feed).
  - `Components`: Feature-specific UI components (Feed, Post, Comment, etc.).
- `src/components`: Shared UI components and Shadcn primitives.
- `src/redux`: Global state management and API definitions.
- `src/hooks`: Custom React hooks for authentication and logic.
- `src/lib`: Utility functions and configurations.

## 📄 License

This project is licensed under the ISC License.
