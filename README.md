# Giphy Client

----
- Implement a little web application that allows user to search and browse gifs from Giphy API.
- A Searchbox on the top which allow user to enter a query. 
- Fetch results and display them in cards or any other visually appealing layout.
----

## Quick Start

- clone it by git bash command 

```bash || terminal
cd giphy-search-app/
```

Install dependencies:

```bash 
$ npm install
```

Start the server:

```bash
$ npm start
```

View the website at: `http://localhost:3000`

----
## Project Guidelines: 


## Goals 🎯
* [ ] Pagination or infinite scrolling.
* [ ] Auto-suggest in the search box.
* [ ] Polish and UX.
* [ ] Highly resuable components.
* [ ] Test.

----

## Folder Structure
```
app
├── node_modules
│
├── public
│
├── src
│   └── components
│       ├── atoms
│       │     └── index.js
│       ├── molecules
│       │     └── index.js
│       ├── organisms
│       │     └── index.js
│       ├── pages
│             └── index.js
│   └── containers
│          └── App.js
│   └── store
│          └── index.js
│   └── styles
│         └── index.scss
│         └── fonts
│   └── utils
│
│
└── index.js
│
└── .gitignore
│
└── package-lock.json
│
└── READEME.md

```
