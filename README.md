# Emergence App



#### Original code base

This app architecture is inspired by [create-react-app with a Node server on Heroku](https://github.com/mars/heroku-cra-node)


## Technical environment

This app uses :
- React front-end
- NodeJS back-end with Express
- PostgreSQL database


## Documentation

Documentation is located in `doc` folder.


## Run the App

1. Clone this project from GitHub with `git clone`.

2. Create an empty PostgreSQL database

3. Add the following environment variables for the *server* `/` folder :

```.env
# URI to access database
DATABASE_URL=postgres://username:password@hostname:5432/database_name
# SECRET for JWT authentication
JWT_SECRET=random_64_bits_key
```

4. Add the following environment variables for the React `/react-ui/` folder with the following variable :

```.env
# API hostname 
REACT_APP_API_HOST=https://api-hostname.com
```

5. Start the server with the following commands (run from the root `/`  folder of the project) :

- To install dependencies : `npm install`
- To build a production app : `npm build`
- To start the app : `npm start`

6. Add default values in database with SQL command :

Execute SQL statements in [`doc/first_setup.sql`](doc/first_setup.sql) to populate database.

Default credentials for admin account :
- email : test@test.io
- password : test


## Architecture of the App

The app is divided in two parts : the **server** and the **React app**.


### Dependencies management

The dependencies are managed with `npm`.

The *server* dependencies are located in `package.json` located at the <u>*root*</u> of the project.

The *React app* dependencies are located in `react-ui/package.json` 


### Project tree

```
doc : documentation
react-ui : React App
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
server : Node.js server
	|- algorithms : python algorithms
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

