import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductsPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader : true
    },
    {
        path: '/order', 
        page: OrderPage,
        isShowHeader : true
    },
    {
        path: '/payment', 
        page: PaymentPage,
        isShowHeader : true
    },
    {
        path: '/products', 
        page: ProductsPage,
        isShowHeader : true 
    },
    {
        path: '/product/:type', 
        page: TypeProductsPage,
        isShowHeader : true 
    },
    {
        path: '/sign-in', 
        page: SignInPage,
        isShowHeader : false 
    },
    {
        path: '/sign-up', 
        page: SignUpPage,
        isShowHeader : false 
    },
    {
        path: '/product-details/:id', 
        page: ProductDetailsPage,
        isShowHeader : true 
    },
    {
        path: '/profile-user', 
        page: ProfilePage,
        isShowHeader : true 
    },
    {
        path: '/system/admin', 
        page: AdminPage,
        isShowHeader : false,
        isPrivate: true 
    },
    {
        path: '*', 
        page: NotFoundPage,
        isShowHeader : false
    }
]