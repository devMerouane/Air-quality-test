# Air-quality-test

This projet is a simple api that interact with https://api-docs.iqair.com api to get AQI data

# Prerequisites

- NodeJs >= 16.17.0
- Yarn
- MongoDB

# Installation

1. Install dependencies with yarn

```
  yarn
```

# Running the app in development mode

1. Create the local environment file and update the env variables
  
```
  cp ./src/env/.env.template ./src/env/.env.development
  code ./src/env/.env
  
  // AIR_QUALITY_PUBLIC_KEY = add your key 
  // MONGODB_URL = add the mongodb url
```

2. Start the application in development mode

```
  yarn dev
```

The application will be live on http://localhost:5000 and you can view the docs on http://localhost:5000/docs

# Running the app in production mode

1. Execute those commands:

```
  yarn build

  code ./build/env/.env.production

  // AIR_QUALITY_PUBLIC_KEY = add your key 
  // MONGODB_URL = add the mongodb url 

  yarn production

```

The application will be live on http://localhost:5000 and you can view the docs on  http://localhost:5000/docs