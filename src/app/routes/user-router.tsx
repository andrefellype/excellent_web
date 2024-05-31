import UserEditAuthPage from "@pages/user/auth/edit/edit.page";
import UserEditPasswordAuthPage from "@pages/user/auth/editPassword/editPassword.page";
import UserListPage from "@pages/user/list/list.page";
import UserNewPage from "@pages/user/new/new.page";
import UserShowPage from "@pages/user/show/show.page";

export const ROUTE_USER = {
    path: "user", children: [
        { path: "auth/edit", element: <UserEditAuthPage /> },
        { path: "auth/edit/password", element: <UserEditPasswordAuthPage /> },
        { path: "", element: <UserListPage /> },
        { path: "new", element: <UserNewPage /> },
        { path: ":userId", element: <UserShowPage /> }
    ]
}