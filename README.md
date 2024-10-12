# 🧩 Chrome Extension: Search YouTube for Selected Text

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Coverage](./badges/coverage.svg)

Simple Google Chrome browser extension that adds a context menu to search YouTube for selected text on a webpage.
Just highlight the text, right click and choose 'Search YouTube for'.
Selected query will be passed to YouTube's search page in a new browser tab.

![chrome-extension-search-youtube](https://github.com/user-attachments/assets/0949cce6-2b09-451c-aeba-ca4644a120ab)

## 🌟 Installation
You can easily install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/search-youtube-for-select/ljcefbidblfpfiheimehfaibcelaboln).

## ️🛠️ Development

To install the extension locally for development:

1. 🖥️ **Clone the repository**:

    ```sh
    git clone https://github.com/w431/chrome-extension-search-youtube-selected-text.git
    cd chrome-extension-search-youtube-selected-text
    ```

2. 📦 **Install dependencies**:

    ```sh
    npm install
    ```

3. ⚙ **Build the project**:

    ```sh
    npm run build
    ```

4. 🌐 **Load the extension in Chrome**:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" at the top right.
    - Click on "Load unpacked" and select the `dist` folder from your project directory.

## 🌍 Supported Languages

-   English
-   Arabic

Feel free to translate this extension to your language. Contributions are welcome!

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

<hr>

<p>
  <img src="https://img.shields.io/badge/Webpack-8DD6F9?logo=webpack&logoColor=black" alt="Webpack" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Jest-323330?logo=Jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/Chrome_Extension-4285F4?logo=google-chrome&logoColor=white" alt="Chrome Extension" />
</p>
