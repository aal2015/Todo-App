import { useState } from 'react';
import { registerUser, loginUser } from './service';
import { Message } from '@mui/icons-material';

export function LoginRegister(
    { onSetAuthCookie }: { onSetAuthCookie: (fetchedAccessCookie: String, fetchedRefreshCookie: String) => void }
) {
    const [isLogin, setIsLogin] = useState<Boolean>(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const toggleLoginState = () => {
        setIsLogin(!isLogin);
    }

    const handleSubmit = async () => {
        if (isLogin) {
            await loginUser(username, password)
                .then(message => onSetAuthCookie(message.accessToken, message.refreshToken)
                )
                .catch(err => console.error(err));
        } else {
            await registerUser(username, password)
                .then(message => console.log(message)
                )
                .catch(err => console.error(err));
        }
    }

    return (<div className="bg-white rounded-b-sm h-96 p-8">
        <form>
            <h3 className="text-2xl font-semibold mb-4">
                {isLogin ? "Login" : "Register"} to View Notes
            </h3>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Username"
                    value={username} onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-between px-8">
                <button
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSubmit}
                >
                    {isLogin ? "Sign In" : "Sign Up"}
                </button>
                <a
                    onClick={toggleLoginState}
                    className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
                    href="#">
                    {isLogin ? "Register?" : "Login?"}
                </a>
            </div>
        </ form>
    </div>)
}