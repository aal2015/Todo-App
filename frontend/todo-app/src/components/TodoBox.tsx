import { Header } from "./Header";
import { Body } from "./Body";
export function TodoBox() {
    return (
        <div className="w-2xl border border-solid rounded-sm">
            <Header />
            <Body />
        </div>
    );
}