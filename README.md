# CDP Content Commons

The project contains both a server api and a React client. The code is split into separate directories, server and client in the event we want to put them on different servers at a later time.

### Configuration

Environment variables will be set on the server. For local development, create a .env in the project root. This file will be copied to the client folder when the command `npm run build` is run to make the variables available to the client.

```
# Allows the use of absolute paths to avoid long relative import statements.
# For example `import Header from 'components/Header'` instead of import Header from '../../components/Header'
NODE_PATH=src/

REACT_APP_WEBSITE_NAME=Content Commons

# Points to one of the public api endpoints: local (if set up), dev, staging or production
#REACT_APP_PUBLIC_API=http://localhost:8080  (local)
#REACT_APP_PUBLIC_API=https://api.dev.america.gov (dev)
#REACT_APP_PUBLIC_API=https://api.staging.america.gov (staging)
REACT_APP_PUBLIC_API=https://api.america.gov (prod)

# Point to the S3 bucket and objects for CDP modules (for the embed code) 
REACT_APP_CDP_MODULES_URL=
REACT_APP_SINGLE_ARTICLE_MODULE=

# Value from YouTube
REACT_APP_YOUTUBE_API_KEY=

# Value from Google
REACT_APP_GOOGLE_CLIENT_ID=

# Values from AWS
REACT_APP_COGNITO_IDENTITY_POOL_ID=
REACT_APP_COGNITO_REGION=
REACT_APP_COGNITO_USER_POOL_ID=
REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID=
```

### Getting Started

Run `npm run build` in the project root. This will run `npm install` for both the server and the client

To run both the server and the client run `npm run dev`. To run only the client, go to the client directory and run `npm start`

### Testing

#### Client

See the [create react app documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) for executing tests. **Note**. there is an issue with the watcher with react-scripts 1.x. Installing watchman `brew install watchman` should fix the problem

#### Server
