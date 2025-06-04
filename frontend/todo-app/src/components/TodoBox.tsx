import { Header } from "./Header";
import { Body } from "./Body";
export function TodoBox() {
    return (
        <div className="w-xl border border-solid rounded-sm">
            <Header />
            <Body />
        </div>
    );
}