import FailPage from "@components/page/fail/fail.page";
import UnderConstructionPage from "@components/page/underconstrution/underconstruction.page";

export const ROUTER_FAILANDUNDERCONSTRUCTION = [
    { path: "fail/:typeFail/:msgFail", element: <FailPage /> },
    { path: "underconstruction", element: <UnderConstructionPage /> }
]