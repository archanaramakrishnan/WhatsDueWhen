import React, {useState, useEffect} from "react";

export const Context = React.createContext({
    userEmailContext: "",
    setUserEmailContext: () => {},
    isProfessor: false,
    setIsProfessor: () => {}
});

export const ContextProvider = (props) => {
    const [userEmailContext, setUserEmailContext] = useState("");
    const [isProfessor, setIsProfessor] = useState(false);

    useEffect(() => {
        console.log(`The user email is ${userEmailContext}`);
    }, [userEmailContext])

    return(
        <Context.Provider
            value={{
                userEmailContext,
                setUserEmailContext,
                isProfessor,
                setIsProfessor
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;