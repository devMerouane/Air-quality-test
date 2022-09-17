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

# Running the app

1. Create the local environment file and update the env variables
  
```
  code ./src/env/.env
  cp ./src/env/.env.template ./src/env/.env
  code ./src/env/.env
```

2. Start the application in development mode

```
  yarn dev
```

The application will be live on http://localhost:5000 and you can view the docs on http://localhost:5000/docs