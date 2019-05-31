# Pawnee Employee Directory

Why, hello there.
You look nice today. Did you do something new with your hair?

Thank you for taking time to check out my Postlight Code Challenge.

## Overview

When I was [researching](https://github.com/natotthomer/postlightproject) [the](https://github.com/jjcav84/employee-challenge) [landscape](https://github.com/nkarnick/employee-directory) and [sketching out the initial plans for the challenge](sketch.jpg), I deliberated on several different fictional subjects and landed on the employees of Pawnee, Indiana, the city from [Parks & Recreation](https://www.nbc.com/parks-and-recreation).

## Demo

You can check out the working demo at [https://pawnee.prmr.ec](https://pawnee.prmr.ec).

## Setup

### Server

The server was written using [Feathers.js](https://feathersjs.com). This made standing up a CRUD server pretty simple and [authentication](https://docs.feathersjs.com/api/authentication/server.html) helps keep the meddling kids away from the mutating endpoints.

It persists data in MongoDB via Mongoose. I started down the path of using Elasticsearch to get some of that sweet fuzzy searching, but instead, opted for Mongo(ose). Mongoose makes [validation a snap](https://github.com/Meandmybadself/pawnee-employee-directory/blob/master/server/src/models/users.model.js) and [plays nicely with Feathers](https://github.com/feathersjs-ecosystem/feathers-mongoose). To bridge the gap with Elasticsearch, I whipped up a [custom search endpoint that allowed for fuzzy regular expressions](https://github.com/Meandmybadself/pawnee-employee-directory/blob/master/server/src/services/users/users.hooks.js#L8).

The server is behind a NGINX reverse-proxy & persisted via pm2.

The SSL certs are brought to you by our friends @ LetsEncrypt.

### Client

The responsive client was build with React, using Redux to keep data nice & tidy. CSS was generated using [tailwindcss](https://tailwindcss.com). Normally, I'd opt for something that creates more reusable styles, but used tailwind given the time constraints and the fact that I knew I'd be designing the interface while developing.

The feathers client was used to interact w/ the web service and to persist authentication.

For assistance on the Redux side, I used [reselect](https://www.npmjs.com/package/reselect) & [normalizr](https://github.com/paularmstrong/normalizr) to whip the data into shape.

The application was built using [Parcel](https://parceljs.org/).

## Functionality

Users initially enter the site as a normal Pawneean, granting standard searchability through the site. If you want to update any outdated employee information, you can log in as [Tom Haverford](https://en.wikipedia.org/wiki/Tom_Haverford), an administrator in the Parks & Rec office. His credentials have been pre-filled for your convenience.

## V2 (aka, the stuff I didn't get to)

* *Creating users* – A trained eye will note that the system is [set up with a client-side router](https://github.com/Meandmybadself/pawnee-employee-directory/blob/master/client/src/routes/index.jsx), but alas, only one real route. The plan was to make a route endpoint for creating users, but pencils are down.
* *Image uploading* – This would be pretty straight forward using a client library like [filepond](https://github.com/pqina/react-filepond) & an Express endpoint utilizing [multer](https://github.com/expressjs/multer).
* *Testing* - Some unit tests alongside some Cypress tests would wrap things up nicely.
