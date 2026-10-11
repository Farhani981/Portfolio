# Farhan Nasir Portfolio

A responsive personal portfolio built with plain HTML, CSS, and vanilla JavaScript.

## Features

- Home, About, Services, Skills, Experience, Projects, and Contact sections
- Responsive layout for desktop, tablet, and mobile screens
- Project detail cards and live project links
- Contact form powered by EmailJS
- Scroll animations and a downloadable resume text file

## Project files

```text
.
├── index.html       # Page content and external library setup
├── styles.css       # Layout, theme, and responsive styles
├── script.js        # Navigation, projects, animations, and interactions
└── images/          # Favicon, profile, skill, and project images
```

## Run locally

Open `index.html` in a browser, or open the project folder in Visual Studio Code and use the Live Server extension.

## Add or update a project

1. Add the project's card in the portfolio section of `index.html`.
2. Add its matching details and live URL to `projectsData` in `script.js` using the same project index.
3. Put its image in `images/` and use that path in the card and project data.

## Deploy

This is a static site; it has no build step. Deploy the project root containing `index.html`, `styles.css`, `script.js`, and `images/` to Netlify or Vercel. For automatic updates, connect the hosting service to the GitHub repository and push each change to the connected branch.
