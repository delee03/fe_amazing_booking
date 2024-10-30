import UseRouteCustom from "./hooks/UseRouteCustom";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    const routes = UseRouteCustom();
    return (
        <>
            <GoogleOAuthProvider clientId="400954375666-e9naof78noa6r8g7l8kdj9tlcbqbav3l.apps.googleusercontent.com">
                {routes}
            </GoogleOAuthProvider>
        </>
    );
}

export default App;
