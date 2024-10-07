// ===== Library =====

import ReactDom from "react-dom/client"
import { RecoilRoot } from "recoil"
import { BrowserRouter } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// ===== Components =====

import App from "./App"

// ===== Code =====
const queryClient = new QueryClient()

const root = document.getElementById("root")
ReactDom.createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <CookiesProvider>
            <BrowserRouter>
                <RecoilRoot>
                    <App/>
                </RecoilRoot>
            </BrowserRouter>
        </CookiesProvider>
    </QueryClientProvider>
)