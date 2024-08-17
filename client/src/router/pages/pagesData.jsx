import ShoppingCart from "../../pages/ShoppingCart";
import CourseDetail from "../../pages/CourseDetail";
import Home from "../../pages/Home";
import LoginForm from "../../pages/LoginForm";
import SignUpForm from "../../pages/SignUpForm";
import CheckoutPage from "../../pages/CheckOut";
import OrderConfirmation from "../../pages/OrderConfirmation";

const pagesData = [
  {
    path: "/login",
    element: <LoginForm />,
    title: "Login",
  },
  {
    path: "/signup",
    element: <SignUpForm />,
    title: "Sign Up",
  },
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/course",
    element: <CourseDetail />,
    title: "Course detail",
  },
  {
    path: "/cart",
    element: <ShoppingCart />,
    title: "Shopping Cart",
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
    title: "Checkout",
  },
  {
    path: "/order_confirmed",
    element: <OrderConfirmation />,
    title: "Order confirmed",
  },
];

export default pagesData;
