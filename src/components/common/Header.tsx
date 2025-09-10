import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type AppProps = {
  user: string; // user라는 props 추가
};

export default function Header({ user }: AppProps) {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

   // 로그인 상태 관리 (예: localStorage에 토큰이 있으면 로그인된 걸로 처리)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [saveLoginType, setSaveLoginType] = useState<String>("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedLoginType = localStorage.getItem("loginType");

    if (storedToken && (storedLoginType === "kakao" || storedLoginType === "naver")) {
      setIsLoggedIn(true);
      setSaveLoginType(storedLoginType);
    } else {
      setIsLoggedIn(false);
      setSaveLoginType("");
    }
  }, [location]);


  const handleLogout = async () => {
    // 1. 로컬 저장소에서 토큰 삭제
    const loginType = localStorage.getItem("loginType");
    const token = localStorage.getItem("token");
    console.log('로그인타입 : ', loginType);

     // 1. 로컬 저장소에서 토큰 & 로그인 타입 삭제
    if("kakao" === loginType) {
      const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
      const LOGOUT_REDIRECT_URI =  import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI; // 홈으로 리다이렉트
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;

    } else if ("naver" === loginType){     
      try {
        await fetch(`http://localhost:3001/api/naver/logout?token=${token}`, {
          method: "GET",
        });
   
        console.log("네이버 로그아웃 완료");
      } catch (err) {
        console.error(err);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginType");

    // 상태 업데이트
    setIsLoggedIn(false);
    setSaveLoginType("");
    navigate("/");
  }

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
