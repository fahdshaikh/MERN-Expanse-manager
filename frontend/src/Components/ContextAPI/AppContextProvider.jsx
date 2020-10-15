import React from 'react';
import { useState } from 'react';

export const AppContext = React.createContext();

function AppContextProvider(props){

    const [userId,setUserId] = useState('')

    return (
        <AppContext.Provider value={{userId,setUserId}}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
