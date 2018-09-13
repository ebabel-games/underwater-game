# Underwater Game
Aquatic 3D HTML5 game of survival, fighting underwater creatures in a web browser.

## Install
You need Node.js and npm from https://nodejs.org/

```
npm install
```

## Build once for Development
```
npm run build
```

## Build continuously for Development
```
npm run watch
```

## Run locally in Development
```
npm start
```

Browse http://localhost:3000

## Build for Production
```
npm run build-production
```

## Deploy to Production
Any Node.js hosting will do, but I recommend free hosting, easy to deploy service "now", from https://zeit.co/
```
npm install -g now
```

You can deploy as many versions, each deployment is unique and kept published forever, for free.
```
now --public
```

Browse https://underwater-game-[UNIQUE_KEY].now.sh where [UNIQUE_KEY] is generated during the deployment in your terminal.

Note: If you never installed `now` before, the first time you do an e-mail challenge will run to setup a token on your machine. If that happens, run `now --public` again to deploy.

You can see what you have deployed on https://zeit.co/dashboard/deployments - The free tier of https://zeit.co/ currently allows for up to 3 concurrent deployment. It's possible to remove previous deployments and make room for new ones to stay in the free tier.
