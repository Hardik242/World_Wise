import {createContext, useContext, useReducer} from "react";

const AuthContext = createContext();

const FAKE_USER = {
    name: "Hardik Goel",
    email: "hardikGoel@example.com",
    password: "passwords",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
    user: getLoginFromLocalStorage("isLogin") ? FAKE_USER : null,
    isAuthenticated: getLoginFromLocalStorage("isLogin"),
};

function setLoginToLocalStorage(isAuthenticated) {
    localStorage.setItem("isLogin", isAuthenticated);
}

function getLoginFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : false;
}

function reducer(state, {type, payload}) {
    switch (type) {
        case "login":
            setLoginToLocalStorage(true);
            return {...state, user: payload, isAuthenticated: true};
        case "logout":
            setLoginToLocalStorage(false);
            return {...state, user: null, isAuthenticated: false};

        default:
            throw new Error("Input type is incorret");
    }
}

export function AuthProvider({children}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(
        reducer,
        initialState
    );

    function login(email, password) {
        if (FAKE_USER.email === email && FAKE_USER.password === password) {
            dispatch({type: "login", payload: FAKE_USER});
        } else {
            console.log("unknown error");
        }
    }

    function logout() {
        dispatch({type: "logout"});
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const contextVal = useContext(AuthContext);
    if (contextVal === undefined) {
        throw new Error("AuthContext Used out of bounds of app");
    }
    return contextVal;
}
