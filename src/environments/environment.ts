// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDSqQqlRkKLN2FeADNZWHIr-G_YEdTJvao",
    authDomain: "swingstats.firebaseapp.com",
    databaseURL: "https://swingstats.firebaseio.com",
    projectId: "swingstats",
    storageBucket: "swingstats.appspot.com",
    messagingSenderId: "546728489926"

  }

};
