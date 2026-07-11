import { createBrowserRouter, useRouteError, isRouteErrorResponse } from "react-router";
import App from "@/App";
import { HomePage } from "@/pages/HomePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage } from "@/pages/LoginPage";
import PublicRoute from "@/components/PublicRoute";
import CenteredLayout from "./components/layout/CenteredLayout";


export const router = createBrowserRouter([
    {
        Component: App,
        ErrorBoundary: RootErrorBoundary,
        children: [
            {
                Component: PublicRoute,
                children: [
                    {

                        Component: CenteredLayout,
                        children: [
                            {
                                path: "/",
                                Component: LoginPage
                            }
                        ]
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


export const Nav_links = [
    { label: 'Library', to: '/library' },
    { label: 'Discover', to: '/discover' }
]


function RootErrorBoundary() {
    let error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <>
                <h1>
                    {error.data}
                </h1>
                <p>Coming soon ...</p>
            </>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}