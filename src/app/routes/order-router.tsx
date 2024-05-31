import OrderListPage from "@pages/order/list/list.page";
import OrderNewPage from "@pages/order/new/new.page";

export const ROUTE_ORDER = {
    path: "order", children: [
        { path: "", element: <OrderListPage /> },
        { path: "new", element: <OrderNewPage /> }
    ]
}