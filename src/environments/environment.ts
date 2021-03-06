// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  swPath: '/sw.js',
  firebase: {
    apiKey: 'AIzaSyCeoHRNGdE7NleF1X1JiMXyk7Q9zRIU31A',
    authDomain: 'beta-splotv2.firebaseapp.com',
    databaseURL: 'https://beta-splotv2.firebaseio.com',
    projectId: 'beta-splotv2',
    storageBucket: 'beta-splotv2.appspot.com',
    messagingSenderId: '1099388656043'
  },
  splotBack: 'http://splotv2-back.herokuapp.com'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
