# Safe Way

**Safe Way** is a web application built with React that provides users with an interactive dashboard to report incidents, check locations, and access community help. The app supports multiple languages (English and Arabic) and includes a demo mode for preview purposes.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Features

- Multi-language support (English / Arabic) with automatic RTL/LTR layout adjustment.
- Home dashboard with quick actions:
  - Report incidents
  - Check safety locations
  - Get community help
- Responsive design that adapts to different screen sizes.
- Demo mode with a "Demo Only" badge.
- Navigation by clicking the logo to return to the home page.
- Language switch buttons (ع / En) that persist language preference in local storage.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  

The page will reload when you make changes. You may also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and filenames include hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

This command copies all the configuration files and dependencies (webpack, Babel, ESLint, etc.) into your project so you have full control over them. All commands except `eject` still work but now point to the copied scripts.

You don’t have to use `eject` unless you want to customize the build configuration.

---

## Project Structure
safe-way/
├─ public/
├─ src/
│ ├─ assets/ # Images, logos
│ ├─ components/ # Reusable components (Header, Icons, etc.)
│ ├─ pages/ # Application pages
│ │ ├─ checkIssues/
│ │ ├─ details/
│ │ ├─ helpCommunity/
│ │ ├─ home/
│ │ └─ reportScreen/
│ ├─ locales/ # Localization files
│ │ ├─ ar/
│ │ └─ en/
│ ├─ routes/ # App paths and routing logic
│ │ ├─ paths.js
│ │ ├─ route.js
│ │ └─ useWouter.js
│ ├─ theme/ # AppColors and styling constants
│ │ └─ appColors.js
│ ├─ app/
│ ├─ i18n.js # Internationalization setup
│ ├─ App.js
│ └─ index.js
├─ package.json
└─ README.md

---

## Usage

- Click the **logo** in the header to navigate back to the home dashboard.
- Use the **language buttons** (ع / En) to switch between Arabic and English.
- Explore the home dashboard to access main features like reporting incidents, checking locations, and getting community help.
- Enable **demo mode** to see a "Demo Only" badge.

---

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Troubleshooting Minify Errors](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

