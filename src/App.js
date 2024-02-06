import {BrowserRouter} from "react-router-dom";

// import the routes
import BaseRoutes from "./routes/BaseRoutes";
import ProfileRoutes from './routes/ProfileRoutes'
import AuthenticationRoutes
    from "./routes/AuthenticationRoutes";
import PostRoutes from "./routes/PostRoutes";
import ChatRoutes from "./routes/ChatRoutes";
import StoriesRoutes
    from "./routes/StoriesRoutes";


// import the styles
import './styles/base.css';
import Header from "./components/Header";
import {useEffect, useRef, useState} from "react";
import global from "./globalVars";

export default function App() {
  // how to change the title of the webpage
  document.title = 'Hola Putos';
    // get the info if the user is logged in
    const [username, setUsername] = useState();
    const [loggedIn, setLoggedIn] = useState();
    // declare them as ref, so that no re-render is triggered
    const refLoggedIn = useRef();
    const refUsername = useRef();
    //const username = useRef();
    //const loggedIn = useRef();
    useEffect(() => {
        //console.log('i fire')
        fetch(`${global.backend}`, {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include'
        }).then(res => {
            res.json().then(data => {
                // here we have the data
                setUsername(data.username);
                refUsername.current = data.username;
                setLoggedIn(data.loggedIn);
                refLoggedIn.current = data.loggedIn;
            })
        }).catch(err => console.error(err))
    }, []);
  return (
      <>
          <Header loggedIn={loggedIn} />
          <BrowserRouter>
              <BaseRoutes loggedIn={refLoggedIn.current} username={refUsername.current} />
              <ProfileRoutes />
              <AuthenticationRoutes />
              <PostRoutes />
              <ChatRoutes />
              <StoriesRoutes />
          </BrowserRouter>
      </>
  );
}
