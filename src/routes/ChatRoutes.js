import React from "react";
import {Route, Routes} from "react-router-dom";


import ChatInbox from "../pages/chats/ChatInbox";

/**
 * Holds all the routes, regarding chatting
 * @return {Element}
 * @constructor
 */
export default function ChatRoutes() {

    return (<Routes>
        <Route exact path='/chat/inbox' element={<ChatInbox />}/>

    </Routes>);
}