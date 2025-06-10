import { useState } from 'react';
import { Header } from "./Header";
import { Body } from "./Body";
import { LoginRegister } from "./LoginRegister";
import Cookies from "js-cookie";

export function TodoBox() {
    const [accessCookie, setAccessCookie] = useState(Cookies.get('access_token'));
    const [refreshCookie, setRefreshCookie] = useState(Cookies.get('refresh_token'));

    const storeAuthCookies = (fetchedAccessCookie: String, fetchedRefreshCookie: String) => {
        setAccessCookie(fetchedAccessCookie);
        setRefreshCookie(fetchedRefreshCookie);

        Cookies.set('access_token', fetchedAccessCookie);
        Cookies.set('refresh_token', fetchedRefreshCookie);
    }

    return (
        <div className="w-xl border border-solid rounded-sm">
            <Header />
            {
                accessCookie ?
                    <Body accessCookie={accessCookie} onSetAccessCookie={setAccessCookie} /> :
                    <LoginRegister onSetAuthCookie={storeAuthCookies} />
            }
        </div>
    );
}