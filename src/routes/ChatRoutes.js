import React from "react";
import {Route, Routes} from "react-router-dom";


import ChatInbox from "../pages/chats/ChatInbox";

/**
 * Holds all the routes, regarding chatting
 * @return {Element}
 * @constructor
 */
export default function ChatRoutes({username}) {

    return (<Routes>
        <Route exact path='/chat/inbox' element={<ChatInbox username={username} />}/>

    </Routes>);
}