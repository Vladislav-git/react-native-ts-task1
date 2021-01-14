import React, {useContext, useState} from 'react';

const Context = React.createContext();
const UpdateContext = React.createContext();

export function useC () {
    return useContext(Context)
}

export function useUpdateC () {
    return useContext(UpdateContext)
}


export function Provider ({children}) {

    const [darkTheme, setDarkTheme] = useState(false);
    const [data, setData] = useState({a:'a'})

    function toggleTheme () {
        setDarkTheme(prevTheme => !prevTheme)
    }

    function updateData (data) {
        setData(prevData => data)
    }

    return (
        <Context.Provider value={{darkTheme, data}}>
            <UpdateContext.Provider value={{toggleTheme, updateData}}>
                {children}
            </UpdateContext.Provider>
        </Context.Provider>
    )
}


