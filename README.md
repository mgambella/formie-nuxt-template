# Formie / Nuxt Headless Template

This is a template for a project using [Formie](https://plugins.craftcms.com/formie?craft4) plugin in a headless
configuration using GraphQL, [Craft CMS 4](https://craftcms.com) and [Nuxt 3](https://nuxt.com/).

## Project summary

This project is a demonstration of how to use Formie in a headless configuration, using GraphQL to query forms and
submit submissions. This project is an attempt to create full-featured implementation of Formie functionalities,
including form rendering, submission handling, and validation.

- [DDEV](https://ddev.com/) is used for running Craft CMS locally.
- [Craft CMS 4](https://craftcms.com) is the backend CMS.
- [Formie](https://plugins.craftcms.com/formie?craft4) is the form plugin, which is used to create forms, and handle submissions.
- [Nuxt 3](https://nuxt.com/) is the frontend framework.
- [Tailwind CSS](https://tailwindcss.com/).
- [ESlint](https://eslint.org/) for linting.
- [Prettier](https://prettier.io/) to keep the code correctly and consistently formatted.
- [Nuxt Apollo](https://apollo.nuxtjs.org) easy GraphQL handling using Apollo for queries and mutations.
- [Pristine.js](https://pristine.js.org/) simple form validation.

## Setting up Nuxt 3

This repository contains Nuxt 3 project files in the main root folder.

- Clone this repository to your local machine.
- run `npm install` at the root of the project.
- Ensure you have the `.env` file setup correctly. (see below)
- copy the `.env.example` file to `.env` and update the `CMS_GQL_URL` variable.
- Start up the Nuxt 3 dev server by typing `npm run dev`.

## Setting up DDEV / Craft CMS 4

This repository contains the Craft CMS project files in the main root folder. Little to no changes have been made from
the [craftcms/craft](https://github.com/craftcms/craft) project.

- Clone this repository to your local machine.
- Ensure you have [DDEV](https://ddev.com/) installed.
- Run `ddev restart` at the root of the project.
- Run `ddev composer install` at the root of the project.
- Ensure you setup your `cms/.env` file as you normally would.
- If this is your first time running the project, then run `ddev craft setup/security-key` to generate a security key
- and also run `ddev import-db --file=database.sql` to import the data.
- Finally, open the browser and go to [https://formie-headless.ddev.site/admin](https://formie-headless.ddev.site/admin).

The CP login credentials are initially set as follows:

Login: `formie` \
Password: `formie`
