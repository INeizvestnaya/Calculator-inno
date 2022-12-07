# Calculator App

This is calculator! You can compute here anything what you want!

## Task

https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq_/view

## How to run the app

If you don't have git, install it.

Clone the repository.

Type

```
npm install
```

to install all dependencies of the projects.

Then type

```
npm run build:prod
```

to create optimized build version of the project.

The 'build' folder should appear in the project.

Open 'index.html' file in this folder in your browser.

## Folders of the app

### .husky

Configuration files for a pre-push hook.

It doesn't allow you to push anything when there are EsLint errors in the project.

### build

Build version of the project.

Contains index.html and build.js files, which will be actually executed by user's browser.

### node_modules

Modules of the app. They are installed with npm and are ignored by git.

### src

Source folder of application. It contains files written by developers of the app.

Contains JavaScript (.js), CSS files (.css) and index.html file.

#### src/style

Styles of the app.

Contains CSS files (.css).

#### src/script

Logic of the app, written in JavaScript programming language.

Contains JavaScript Files (.js)

#### src/script/calculator

Calculation logic: executing operations, maintaining memory.

#### src/script/command

Logic of 'Command' and Memento' programming patterns, which were used to write the app.
