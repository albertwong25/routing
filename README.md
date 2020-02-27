# routing

### Introduction
A simple routing app for pickup point and drop-off point.

### Prerequisite
* [Node.js](https://nodejs.org/) - JavaScript runtime environment for compile and run
* [Vue.js](https://vuejs.org/) - JavaScript framework
* [Vue CLI](https://cli.vuejs.org/) - Standard Tooling for Vue.js Development
* [Vuetify.js](https://vuetifyjs.com) - Vue.js Material Design Component Framework
* [Google Maps API](https://cloud.google.com/maps-platform) - Google mapping service 

To use the mapping service, you are reuqired to get the **Google Maps API key** from Google. Here is the steps:
1. Access [Google Maps Platform](https://cloud.google.com/maps-platform), click "Get started"
2. Login to your Google account
3. Type in a project name, follow the guide in "Enable Google Maps Platform"
4. Fill in billing information, you will get **USD200 free usage** every month. Check the details in [Pricing & Plans](https://cloud.google.com/maps-platform/pricing) of Google Maps Platform
5. You will get the API key in Google Maps Platform. **Keep the API key to be used in Installation**
6. In Google Maps Platform, enable **Directions API**, **Maps JavaScript API** and **Places API**

### Installation
This project requires **Node.js** version 8.9 or above. You can download and install the latest version through the official [website](https://nodejs.org/).

##### Vue CLI
To install **Vue CLI**, execute following command:
```
$ npm install -g @vue/cli
```

##### Vue.js and Vuetify.js
You are not required to install **Vue.js** and **Vuetify.js** separately; instead, execute following commands to install dependencies and devDependencies packages for the project:
```
$ cd routing
$ npm install
```

##### Google Maps API key
To use the **Google Maps API key** in the project, open your text editor and write in the first line:

``
VUE_APP_GOOGLE_MAP_TOKEN=<your Google Maps API key>
``

Save the file as **.env.local** under the project root directory. The file will be ignored by git.

### Getting Start
There are several commends to start the project:

##### Compiles and hot-reloads for development
With hot-reloads, you can see the change in real time without re-compile.
```
$ npm run serve
```

##### Compiles and minifies for production
After production built, you can deploy the files inside folder /dist to your production server.
```
$ npm run build
```

##### Run the unit tests
Unit tests are set for major functions.
```
$ npm run test:unit
```

##### Lints and fixes files
The lints rule is set to vue/recommended.
```
$ npm run lint
```
