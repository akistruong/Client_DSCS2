import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { adminRoute } from "~/area/admin/components/routes";
import { publicRoute } from "~/components/routes";
import { DefaultLayout, AdminLayout } from "~/components/layout";
import { Suspense } from "react";
import CustomSpin from "~/components/CustomSpin";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<h1>404 Not Fount</h1>} path={"*"}></Route>
          {adminRoute.map((route, index) => {
            const Page = route.element;
            const Layout =
              route.layout != undefined ? AdminLayout : DefaultLayout;
            return (
              <Route
                key={index}
                element={
                  <Layout>
                    <Suspense fallback={<CustomSpin />}>
                      <Page />
                    </Suspense>
                  </Layout>
                }
                path={route.path}
              ></Route>
            );
          })}
          {publicRoute.map((route, index) => {
            const Page = route.element;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                path={route.path}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
