# Emergence App



### Original code base

This app architecture is inspired by [create-react-app with a Node server on Heroku](https://github.com/mars/heroku-cra-node)



## Architecture of the App

The app is divided in two parts : the **server** and the **React app**.



### Dependencies management

The dependencies are managed with `npm`.

The *server* dependencies are located in `package.json` located at the <u>*root*</u> of the project.

The *React app* dependencies are located in `react-ui/package.json` 



### Run the project

The following commands need to be run from the root `/`  folder :

- To install dependencies : `npm install`
- To build a production app : `npm build`
- To start the app : `npm start`



### Project tree

```bash
react-ui
    |- public : public ressources
    |- src : react app source code
        |- assets : ressources
        |- components : components for each role, included in pages
            |- admin
            |- commons
            |- dev
            |- godfather
            |- laureate
        |- navigation : navigation components for each role
        |- pages : main pages of the app, include components
            |- admin
            |- godfather
            |- laureate
            |- ...
        |- routes : react routers for each role, handle pages inclusion
            |- AdminRouter
            |- GodfatherRouter
            |- LaureateROuter
        |- styles : style files (scss)
        |- App.js : React app main component, handle basic routing
        |- index.js : React app entry point
    |- .env : [optional] .env file with react app .env variables
    |- package.json : React app package
server
    |- config :
        |- index.js : config variables (secrets...)
    |- controllers : api controllers that interract with the database
    |- middlewares :
        |- authJwt.js : JWT api authentication middleware
    |- models : models for the database
    |- routes : api routers
    |- utils :
        |- database.js : database connection
    |- index.js : server creation
.env : [optional] .env file with server .env variables
package.json : server package
```

