import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import Signup from "./pages/home/Signup";
import Auth from "./pages/home/Auth";
import ClassList2 from "./pages/class/ClassList2";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

type AppProps = {
  user: string;
};

export default function App({ user }: AppProps) {
  return (
    <BrowserRouter>
      <Header user={user} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/class-list" element={<ClassList2 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
