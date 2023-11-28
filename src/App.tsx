import {Router} from "@/router";
import {AuthProvider} from "@/assets/isAuthContext";

export function App() {
    // Todo удалить Auth Provider
    return (
        <AuthProvider>
                <Router/>
        </AuthProvider>
    )
}
