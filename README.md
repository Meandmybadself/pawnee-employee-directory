# Pawnee Employee Directory

Why, hello there & thank you for taking time to check out my Postlight Code Challenge.

## Overview

When I was sketching out the initial plans for the challenge, I deliberated on several different subjects and landed on the employees of Pawnee, Indiana, the fictional city from [Parks & Recreation](https://www.nbc.com/parks-and-recreation)

## Demo

You can check out the working demo at [pawnee.prmr.ec](http://pawnee.prmr.ec).

## Setup

### Server

The server was written using [Feathers.js](https://feathersjs.com). This made standing up a CRUD server pretty simple. And as a bonus, [authentication came cheap](https://docs.feathersjs.com/api/authentication/server.html) & keeps the riff-raff away from the mutating endpoints. It persists all the data in a MongoDB via Mongoose. I started down the path of using Elasticsearch to get some of that sweet fuzzy searching, but instead, whipped up a [custom search endpoint that allowed for fuzzy regular expressions](https://github.com/Meandmybadself/pawnee-employee-directory/blob/master/server/src/services/users/users.hooks.js#L8).

The server is NGINX + pm2. PM2 watches the repository for pushes to master & rebuilds.

### Client

The client was build with React, using Redux to keep data nice & tidy. CSS was generated using [tailwindcss](https://tailwindcss.com). Normally, I'd use something a little more reusable, but given the time constraints, I knew I'd be designing the interface on the fly while developing, and tailwind makes that a breeze. For assistance on the Redux side, I used [reselect](https://www.npmjs.com/package/reselect) & [normalizr](https://github.com/paularmstrong/normalizr) to whip the data into shape.

The application was built using [Parcel](https://parceljs.org/).

## Functionality

You'll initially enter the site as a normal Pawnee-an. This will give you standard searchability through the site. If you want to update any outdated employee information, you can log in as [Tom Haverford](https://en.wikipedia.org/wiki/Tom_Haverford), an administrator in the Parks & Rec office. His credentials have been pre-filled for your convenience.

## V2 (aka, the stuff I didn't get to)

- _Creating users_ – A trained eye will note that the system is set up with a client-side router, but alas, only one route. The plan was to make a route endpoint for creating users, but pencils are down.
- _Image uploading_ – This would be pretty straight forward using a client library like [filepond](https://github.com/pqina/react-filepond) & an Express endpoint utilizing [multer](https://github.com/expressjs/multer).
- _SSL_ - I can feel the finger-wagging. I know. I was hoping I could get away w/ using Cloudflare to apply a cert, but it was colliding in namespace w/ the certs I currently have on the server & didn't feel comfortable messing w/ the other sites' certs @ 4:30 in the morning.
- _Testing_ - Some unit tests alongside some Cypress tests would wrap things up nicely.
