import ClientEditPage from "@pages/client/edit/edit.page";
import ClientListPage from "@pages/client/list/list.page";
import ClientNewPage from "@pages/client/new/new.page";

export const ROUTE_CLIENT = {
    path: "client", children: [
        { path: "", element: <ClientListPage /> },
        { path: "new", element: <ClientNewPage /> },
        { path: "edit/:clientId", element: <ClientEditPage /> }
    ]
}