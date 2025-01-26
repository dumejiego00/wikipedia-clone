# Wikipedia Clone

## Overview

This project is a simple Wikipedia clone, built using Node.js, Express, and EJS. It demonstrates functionality for creating, editing, searching, and managing wiki articles, while also including features such as auto-linkification and article history. The application uses server-side validation and is structured to provide a clean and functional experience.

See example [here](https://wikipedia-clone.onrender.com)

## Features

### Core Functionalities

- **Homepage**:

  - Displays a list of articles.
  - Includes links to create a new article and view existing ones.

- **Article Management**:

  - View articles by title: `/article/:articlename`.
  - Edit articles: `/article/:articlename/edit`.
  - Delete articles: `/article/:articlename/delete` (includes confirmation pages).
  - Create new articles: `/newarticle`.

- **Validation**:
  - Prevent empty titles or content for articles.
  - Restrict inappropriate characters in article titles.
  - Disallow modifying or deleting non-existent articles.
  - Display user-friendly error messages for validation failures.

### Additional Functionalities

- **Improved Homepage**:

  - Displays up to 5 random articles (or fewer if less exist).
  - Includes a search form.

- **Search Functionality**:

  - Allows users to search articles by title or content.
  - Displays search results with links to relevant articles and mention counts.

- **Auto-Linkification**:

  - Automatically converts words in articles to links:
    - External links for words starting with `http://` or `https://`.
    - Wiki links for words that follow wiki-style conventions (e.g., `WikiLink`).
  - Redirects to article creation pages for non-existent wiki links.

- **Auto Article Creation**:
  - Redirects users to a pre-filled creation form when accessing non-existent articles.

### History Management (Advanced Feature)

- **Version Control**:

  - Each article edit is saved as a separate version.
  - Keeps track of the order of edits, optionally with timestamps.

- **History Page**:

  - Displays a list of all previous versions of an article.
  - Allows users to view older versions of an article by unique version ID.

- **Version Viewing**:
  - Disables editing and deletion for older versions.
  - Includes an option to return to the current version.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, HTML, CSS
- **Validation**: Server-side input validation

## How It Works

1. **Routing**: All routes are handled using Express, ensuring clear navigation between pages.
2. **Template Rendering**: Dynamic content is rendered using EJS, making it easy to populate article data.
3. **Data Management**: Articles and their history are managed using a simplified in-memory database.
4. **Error Handling**: User-friendly error messages guide users in case of invalid input or non-existent articles.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone git@github.com:dumejiego00/wikipedia-clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd wikipedia-clone
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to explore the application.

## Acknowledgments

Special thanks to [jholman](https://github.com/jholman), my previous instructor, for guidance and inspiration during the development of this project.

---

This project showcases fundamental web development concepts and demonstrates how to build a feature-rich web application using Node.js and Express.
