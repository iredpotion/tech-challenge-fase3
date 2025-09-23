// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registrar from "./pages/Register";
import Posts from "./pages/PostList";
import PostDetalhe from "./pages/PostDetails";
import NovoPost from "./pages/CreatePost";
import EditarPost from "./pages/EditPost";
import AdminPosts from "./pages/Admin";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/create-post" element={<NovoPost />} />
          <Route path="/posts/:id" element={<PostDetalhe />} />

          {/* Rotas protegidas — só professors */}
          <Route path="/novo-post"
            element={
              <PrivateRoute role="professor">
                <NovoPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar-post/:id"
            element={
              <PrivateRoute role="professor">
                <EditarPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="professor">
                <AdminPosts />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
