import React from "react";

const AppContext = React.createContext();

export default function AppContextProvider({ children }) {
    const [appState, setAppState] = React.useState({});

    return (
        <AppContext.Provider value={{ appState, setAppState }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return React.useContext(AppContext);
}