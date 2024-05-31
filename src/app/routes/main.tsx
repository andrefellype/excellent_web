import { createBrowserRouter } from "react-router-dom"
import { App } from '@pages/App'
import { ROUTE_MAIN } from "./main-router"
import { ROUTER_FAILANDUNDERCONSTRUCTION } from "./other-router"
import { ROUTE_USER } from "./user-router"
import ErrorPage from "@components/error.component"
import { ROUTE_CLIENT } from "./client-router"
import { ROUTE_CATEGORY } from "./category-router"
import { ROUTE_PRODUCT } from "./product-router"
import { ROUTE_ORDER } from "./order-router"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [ROUTE_MAIN, ...ROUTER_FAILANDUNDERCONSTRUCTION, ROUTE_USER, ROUTE_CLIENT, ROUTE_CATEGORY, ROUTE_PRODUCT, ROUTE_ORDER]
    }
])