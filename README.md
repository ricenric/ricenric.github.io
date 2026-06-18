# Ricenric Homepage

Welcome to my personal homepage! This project is an interactive carousel-based website built with **Tailwind CSS v4** and **JavaScript**. It showcases
all my applications that I have under this account and acts as a directory to those applications.


## 🚀 Features

* **Interactive Carousel:** Smooth, keyboard-accessible card carousel.
* **Keyboard Navigation:** Supports `Tab`, `Shift + Tab`, and Arrow keys for accessibility.
* **Dynamic Background:** Includes a beautiful custom petal animation using HTML5 Canvas.
* **Modern OS Aesthetic:** Immersive, permanent dark-themed interface designed with a focus on system-level ergonomics and depth.
* **Responsive:** Styled with Tailwind CSS for various screen sizes.

## 🛠 Tech Stack

* **HTML5**
* **CSS3 (Tailwind CSS v4)**
* **JavaScript (Vanilla)**
* **Build Tool:** [Vite](https://vite.dev/)


## 💻 Setup Instructions

If you'd like to run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ricenric/ricenric.github.io.git
    cd ricenric.github.io
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
## Deployment

This project uses **GitHub Actions** for automated deployment. Every time you push changes to the `main` branch, GitHub automatically builds your project and deploys it to GitHub Pages.

- **Source Code:** Lives in the `main` branch.
- **Live Site:** Served from the `gh-pages` branch.
- **Workflow:** Defined in `.github/workflows/deploy.yml`.

### How It Works

The peaceiris/actions-gh-pages action performs the following steps behind the scenes every time you push code:

**Checkout**: It clones your main branch onto a GitHub server.

**Install & Build**: It runs npm ci and npm run build, which creates your optimized dist/ folder containing the "finished" website files (HTML/CSS/JS).

**Branch Switch**: It switches to the gh-pages branch (it will create this branch automatically if it doesn't exist yet).

**Sync**: It takes the contents of your dist/ folder and moves them into the root of the gh-pages branch.

**Commit**: It creates a silent commit on that gh-pages branch containing only those build files.

**Serve**: GitHub Pages is *configured to look at the root of the gh-pages branch*. This is important that its pointed to serve from there. Since the action just placed your dist/ files there, GitHub Pages treats those as your website's root directory and serves them instantly.

## 🎨 Design Philosophy
`ericOS` is built to mimic the look and feel of a custom desktop operating system, prioritizing a coherent visual language through the use of glassmorphism, consistent dark-mode typography, and spatial navigation.

Built with ❤️ by Ricenric

## Legend

❤️ = AI Assisted
