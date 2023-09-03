import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import AuthProvider from "./context/auth";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
