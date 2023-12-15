import { initializeApp, FirebaseApp, getApp } from "firebase/app";

export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize를 매번 호출할 때마다 하는 것이 아니라
// 처음에 Initialize가 되어 있으면 getApp을 통해서 해당 앱을 가져오고
// 그게 아닌 경우에만 Initialize를 하기 위함이다
//const app = initializeApp(firebaseConfig);
console.log("[firebaseApp]");

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}

const firebase = initializeApp(firebaseConfig);

export default firebase;
