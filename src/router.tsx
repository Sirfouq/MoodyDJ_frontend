import { createBrowserRouter } from "react-router";
import App from "@/App";
import { HomePage } from "@/pages/HomePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginCard } from "@/pages/LoginPage";
import PublicRoute from "@/components/PublicRoute";


export const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                Component: PublicRoute,
                children: [
                    {
                        path: "/",
                        Component: LoginCard,
                    },
                ],
            },
            {
                Component: ProtectedRoute,
                children: [
                    {
                        path: "/home",
                        Component: HomePage,
                    },
                ],
            },
        ],
    },
]);