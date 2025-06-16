// authFetch.ts
export const authFetch = async (
    url: string,
    options: RequestInit = {},
    accessCookie: string,
    refreshCookie: string,
    retry = true
): Promise<Response> => {
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessCookie}`,
        'Content-Type': 'application/json',
    };

    let res = await fetch(url, options);

    // If access token expired
    if (res.status === 403 && retry && refreshCookie) {
        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: refreshCookie }),
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            localStorage.setItem('access_token', data.accessToken);
            accessCookie = data.accessToken;
            console.log("Access token refreshed successfully!");
            

            // Retry original request with new token
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${accessCookie}`,
            };
            return fetch(url, options);
        } else {
            // Refresh failed — log out user
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    }

    return res;
};
