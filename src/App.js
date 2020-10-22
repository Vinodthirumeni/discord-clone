import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux"; //redux
import { selectUser } from "./features/userSlice"; //redux
import { auth } from "./firebase";
import { setLogin, setLogout } from "./features/userSlice"; //redux

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); //redux

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setLogin({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(setLogout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
