import CategoryProductEditPage from "@pages/category/product/edit/edit.page";
import CategoryProductListPage from "@pages/category/product/list/list.page";
import CategoryProductNewPage from "@pages/category/product/new/new.page";

export const ROUTE_CATEGORY = {
    path: "category", children: [
        {
            path: "product", children: [
                { path: "", element: <CategoryProductListPage /> },
                { path: "new", element: <CategoryProductNewPage /> },
                { path: "edit/:categoryId", element: <CategoryProductEditPage /> }
            ]
        }
    ]
}