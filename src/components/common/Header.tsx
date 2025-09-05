import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type AppProps = {
  user: string; // user라는 props 추가
};

export default function Header({ user }: AppProps) {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

   // 로그인 상태 관리 (예: localStorage에 토큰이 있으면 로그인된 걸로 처리)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 내가 하고싶은건? 로그인 버튼 로그아웃버튼 두개가 있는데 소셜로그인 완료하면 -> 로그아웃버튼으로 바뀌기 
  // 확인해야하는건? 소셜로그인 어디서 가져오나 그리고 그거 상태값 어디에 담는가?

  useEffect(() => {
    const token = localStorage.getItem("kakao_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // 페이지 이동할 때마다 갱신


   useEffect(() => {
    const token = localStorage.getItem("kakao_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // 페이지 이동할 때마다 갱신

  const handleLogout = () => {
    // 1. 로컬 저장소에서 토큰 삭제
    localStorage.removeItem("kakao_token");

    // 2. 카카오 로그아웃 API 호출 (선택)
    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const LOGOUT_REDIRECT_URI =  import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI; // 홈으로 리다이렉트
    window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
    // window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${encodeURIComponent(LOGOUT_REDIRECT_URI)}`;
  };


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
            <Link to="/class-list">클래스</Link>
            <a href="#how">이용안내</a>
            <a href="#contact">문의</a>
            {isLoggedIn ? (
              // 로그인 상태면 로그아웃 버튼
              <button className="btn btn-outline" onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              // 로그인 안 되어 있으면 로그인 / 회원가입
              <>
                <Link className="btn btn-outline" to="/login">
                  로그인
                </Link>
                <Link to="/signup">회원가입</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
