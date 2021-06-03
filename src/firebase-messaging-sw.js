
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	apiKey: "AIzaSyDlxLFrPSn02TG8TRQSwT_q4Fx_x7x0y6I",
	authDomain: "piscinet-79e4a.firebaseapp.com",
	databaseURL: "https://piscinet-79e4a.firebaseio.com",
	projectId: "piscinet-79e4a",
	storageBucket: "piscinet-79e4a.appspot.com",
	messagingSenderId: "412940409175",
	appId: "1:412940409175:web:da62771b749df1516d4612",
	measurementId: "G-YELLZ9SMBP",
	vapidKey: 'BDo2zWS28DWEY944DP0IctD3PAmrn5C_tU1IJ_fx1VZhtwy474tvw_Gux2E-g5b3pKHeSyTNLP-FrQcDjE8FkPs'

});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const messaging = firebase.messaging();


/*
	
importScripts('/__/firebase/7.15.0/firebase-app.js');
importScripts('/__/firebase/7.15.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();
*/

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

