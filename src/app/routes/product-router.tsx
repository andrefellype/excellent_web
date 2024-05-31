import ProductEditPage from "@pages/product/edit/edit.page";
import ProductListPage from "@pages/product/list/list.page";
import ProductNewPage from "@pages/product/new/new.page";

export const ROUTE_PRODUCT = {
    path: "product", children: [
        { path: "", element: <ProductListPage /> },
        { path: "new", element: <ProductNewPage /> },
        { path: "edit/:productId", element: <ProductEditPage /> }
    ]
}