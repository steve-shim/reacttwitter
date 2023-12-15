import { useState } from "react";

import Router from "components/Router";
import { Layout } from "components/Layout";

import { getAuth } from "firebase/auth";
import { app } from "firebaseApp";

function App() {
  const auth = getAuth(app);
  console.log("[App] auth", auth, !!auth?.currentUser);

  // auth의 currentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  return (
    <Layout>
      <Router isAuthenticated={isAuthenticated} />
    </Layout>
  );
}

export default App;
