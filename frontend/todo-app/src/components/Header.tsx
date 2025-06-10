export function Header({ accessCookie, onLogout }: { accessCookie: string, onLogout: () => void }) {
    return (
        <div className="bg-indigo-500 py-3 px-4">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold text-white">Todo List</h2>
                {accessCookie && (
                    <button
                        onClick={onLogout}
                        className="bg-white text-indigo-500 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}