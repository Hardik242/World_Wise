import {Suspense, lazy} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import {CitiesProvider} from "./contexts/CitiesContext";
import {AuthProvider} from "./contexts/AuthContext";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Homepage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <CitiesProvider>
                    {/* Suspense is used so that we can display an loading element until the real element is loaded */}
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="product" element={<Product />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="login" element={<Login />} />
                            <Route path="app" element={<AppLayout />}>
                                <Route
                                    index
                                    element={<Navigate replace to="cities" />}
                                />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route
                                    path="countries"
                                    element={<CountryList />}
                                />
                                <Route path="form" element={<Form />} />
                                <Route
                                    path="*"
                                    element={<Navigate replace to="cities" />}
                                />
                            </Route>
                            {/* <Route path="*" element={<PageNotFound />} /> */}
                            <Route
                                path="*"
                                element={<Navigate replace to="app" />}
                            />
                        </Routes>
                    </Suspense>
                </CitiesProvider>
            </BrowserRouter>
        </AuthProvider>
    );
}
