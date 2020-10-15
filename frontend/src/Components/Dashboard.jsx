import React from 'react';
import { AppContext } from './ContextAPI/AppContextProvider'

function Dashboard(){
    return (
        <AppContext.Consumer>{   
        ({userId})=><h1>{userId}</h1>
        }
        </AppContext.Consumer>
    )
}

export default Dashboard;