# 🌟 Rich Text Editor

Create stunning and customizable Rich Text Editors effortlessly with our `richtext-editor` npm package! Using `draft-js`, this package brings a robust and versatile text editing experience to your project.

## ✨ Features

- **Rich Text Formatting**: Bold, italic, underline, monospace, and heading levels H1 to H6.
- **Hyperlinks**: Easily add and manage links.
- **Media Uploads**: Upload images, videos, PDFs, docs, and .txt files.
- **Mentions**: Integrate user mentions with the `@` character.

## 📦 Installation

Get started by installing the package via npm:

```bash
npm install @eulersgamma/richtext-editor

```

# 🚀 Usage

Seamlessly integrate the Rich Text Editor into your project:

```bash
  import { RichTextEditor } from '@eulersgamma/richtext-editor';

  <RichTextEditor
    rawJson={rawJson}
    mentionmembers={mentionmembers}
    dropDownAPI={dropDownAPI}
    onSubmit={onSubmit}
    getUrlforMedia={getUrlforMedia}
    style={{height: '140px'}}
  />
```

## 🔧 Props

- **rawJson**: The JSON structure of the editor's content, necessary for re-rendering and editing existing content.
- **mentionmembers**: An array of objects representing mentioned users for a specific note ID.
- **dropDownAPI**: A function `dropDownAPI(searchedText)` that returns an array of objects in the format 
  ```json
  [
    { "label": "Thomas", "id": "12348287236824" },
    { "label": "Swapnal", "id": "4398534858935935" }
  ]
  ```
- **onSubmit**: A callback function that receives an object containing
  ```bash
  {
    "html": get the content in html format,
    "rawJson": this rawJSON you will need to reconfigure Editor to edit pre-existing content,
    "mentions": all the mentions,
    "text": get raw text content
  }
  ```
- **getUrlforMedia**: An API function for saving images in the database and providing URLs for the media.

## 🛠️ Running Locally

To run the project locally and start development, follow these steps:

### Install Dependencies

```bash
  npm install
  # or
  yarn
```
### Start the Project

```bash
  npm run start
  # or
  yarn start
```
## 🤝 Contributing
We welcome contributions! Feel free to open issues, submit pull requests, or suggest enhancements.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/swapnalshahil/richtext-editor/blob/main/LICENSE) file for details.

Elevate your text editing experience with the richtext-editor! Enjoy rich features, easy integration, and endless possibilities.

# Happy Coding! 🎉