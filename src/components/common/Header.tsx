import { Link, useLocation } from "react-router-dom";

type AppProps = {
  user: string; // user라는 props 추가
};

export default function Header({ user }: AppProps) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <Link to="/">
            {user} <span className="logo-accent primary">Class</span>
          </Link>
        </div>
        {!isLoginPage && (
          <nav>
            <a href="#featured">클래스</a>
            <a href="#how">이용안내</a>
            <a href="#contact">문의</a>
            <Link className="btn btn-outline" to="/login">
              로그인
            </Link>
            <Link to="/signup">회원가입</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
