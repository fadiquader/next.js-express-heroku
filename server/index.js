'use strict'
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

// Add next-auth to next app
app
    .prepare()
    .then(() => {
        const expressApp = express();
        expressApp.get('*', (req, res) => {
            return handle(req, res)
        })
        // Get Express and instance of Express from NextAuth
        expressApp.listen(port, err => {
            if (err) {
                throw err
            }
            console.log('> Ready on http://localhost:' + port + ' [' + process.env.NODE_ENV + ']')
        })
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server')
        console.log(err)
    });
