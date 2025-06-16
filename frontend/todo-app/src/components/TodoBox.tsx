import { useState } from 'react';
import { Header } from "./Header";
import { Body } from "./Body";
import { LoginRegister } from "./LoginRegister";
import Cookies from "js-cookie";

export function TodoBox() {
    const [accessCookie, setAccessCookie] = useState(Cookies.get('access_token'));
    const [refreshCookie, setRefreshCookie] = useState(Cookies.get('refresh_token'));

    const storeAuthCookies = (fetchedAccessCookie: String, fetchedRefreshCookie: String) => {
        Cookies.set('access_token', fetchedAccessCookie);
        Cookies.set('refresh_token', fetchedRefreshCookie);

        setAccessCookie(fetchedAccessCookie);
        setRefreshCookie(fetchedRefreshCookie);
    }

    const logout = () => {
        setAccessCookie(null);
        setRefreshCookie(null);
    }

    return (
        <div className="w-xl border border-solid rounded-sm">
            <Header accessCookie={accessCookie} onLogout={logout} />
            {
                accessCookie ?
                    <Body
                        authCookies={{ accessCookie: accessCookie, refreshCookie: refreshCookie }}
                        onSetAccessCookie={setAccessCookie}
                    /> :
                    <LoginRegister onSetAuthCookie={storeAuthCookies} />
            }
        </div>
    );
}