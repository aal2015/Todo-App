import { useState } from 'react';
import { Header } from "./Header";
import { Body } from "./Body";
import { LoginRegister } from "./LoginRegister";
import Cookies from "js-cookie";

export function TodoBox() {
    const [authCookie, setAuthCookie] = useState(Cookies.get('acess_token'));
    
    return (
        <div className="w-xl border border-solid rounded-sm">
            <Header />
            {authCookie ?  <Body /> : <LoginRegister onSetAuthCookie={setAuthCookie}/>}
        </div>
    );
}