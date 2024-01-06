# Point Of Sale (POS)

## Introduction

This is full stack React application which provides a solid starting point for [NextJS](https://nextjs.org), [ReactJS](https://reactjs.org/), [sequelize](https://sequelize.org/), [Mongoose](https://mongoosejs.com/), [NodeJS](https://nodejs.org/en/) and [Socket.IO](https://socket.io/) based applications. Client side code and the backend API is written using TypeScript in NextJS.

Point of Sales or POS is a payment system that can facilitate transactions. POS can help in quick calculations,
store customer data, calculate profits and losses, and recap sales reports.

## Before You Begin

Before you begin i recommend you to read about the basic building blocks that assemble this application:
* NextJS - The best way to understand NextJS is through it's [Official Website]((https://nextjs.org) which has a [Getting Started](https://nextjs.org/docs) guide.
* ReactJS - React's [Official Website](https://reactjs.org/) is a great starting point.
* Sequelize - Get in-depth information about Sequelize on the [Official Website](https://sequelize.org/) to learn the [Core Concept](https://sequelize.org/docs/v6/category/core-concepts/) of Sequelize.
* MongoDB - Go through [MongoDB Official Website](https://www.mongodb.com/) and proceed to their [Official Manual](https://docs.mongodb.com/), which should help you understand NoSQL and MongoDB better.
* Node.js - Start by going through [Node.js Official Website](https://nodejs.org/en/) which should get you going with the Node.js platform.
* Socket.IO - you can go to [Socket.IO Official Website](https://socket.io/) to get the bas way to learn how to use it

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* POstgreSQL - [Download & Install PostgreSQL](https://www.postgresql.org/download/)
* MongoDB - [Download & Install MongoDB](https://www.mongodb.com/download-center), and make sure it's running on the default port (27017).

## front-end

 - ReactJS (ES6)
 - NextJS
 - redux
 - redux-thunk
 - bootstrap

*source files in `src/` folder.*
## back-end

 - NodeJS
 - ExpressJS
 - NextJS

*source files in `src/api` folder*

## Getting Started

First, open terminal to run the development server.
*Please make sure your MongoDB is running*

```bash
# Clone the repository
git clone https://github.com/ramdani221/POS

# Go inside the directory
cd POS

# Install dependencies
npm install

# Start aplication
npm run dev
```

open terminal to run the Socket.IO server.

```bash
# Go inside the directory
cd POS

# Install dependencies for Socket.IO
cd socket && npm install

# Start Socket.IO server
npm run socket
```

This application should run on port 3000 , you can access it through browser, just go to [http://localhost:3000/](http://localhost:3000/signin), and
[http://localhost:3001](http://localhost:3001) for Socket.IO.
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
