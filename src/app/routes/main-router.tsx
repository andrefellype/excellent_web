import UserSignInPage from "@pages/user/auth/signIn/signIn.page";
import UserSignUpPage from "@pages/user/auth/signUp/signUp.page";

export const ROUTE_MAIN = {
    path: "", children: [
        { path: "", element: <UserSignInPage /> },
        { path: "signin", element: <UserSignInPage /> },
        { path: "signup", element: <UserSignUpPage /> }
    ]
}