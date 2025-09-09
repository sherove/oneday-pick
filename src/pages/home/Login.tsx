import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`로그인 시도: ${email}`);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} 로그인 시도`);
  };

   // ✅ 카카오 로그인
  const handleKakaoLogin = () => {
    localStorage.setItem("loginType", "kakao");
    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
  };

  // ✅ 로그인
  // 네이버 로그인 함수
  const handleNaverLogin = () => {
    localStorage.setItem("loginType", "naver");
    const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const STATE = Math.random().toString(36).substring(2, 15);
    const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;

    // 👉 state는 localStorage에 저장해둬야 나중에 비교 가능
    localStorage.setItem("naver_state", STATE);

    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = naverURL;
  }

  return (
    <section className="hero">
      <div className="container center-page">
        <div
          className="card"
          style={{ maxWidth: "420px", width: "100%", padding: "32px" }}
        >
          <h2 style={{ marginBottom: "20px" }}>로그인</h2>

          {/* 일반 로그인 */}
          <form onSubmit={handleLogin} style={{ display: "grid", gap: "16px" }}>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="search"
              style={{ width: "100%" }}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="search"
              style={{ width: "100%" }}
            />
            <button
              className="btn btn-primary"
              type="submit"
              style={{ width: "100%" }}
            >
              로그인
            </button>
          </form>

          {/* 구분선 */}
          <div
            style={{
              textAlign: "center",
              margin: "20px 0",
              color: "var(--muted)",
            }}
          >
            또는
          </div>

          {/* 소셜 로그인 버튼들 */}
          <div style={{ display: "grid", gap: "12px" }}>
            <button
              className="btn btn-outline"
              style={{ width: "100%", background: "#FEE500", color: "#000" }}
              onClick={() => handleKakaoLogin()}
            >
              카카오로 로그인
            </button>
            <button
              className="btn btn-outline"
              style={{ width: "100%", background: "#03C75A", color: "#fff" }}
              onClick={() => handleNaverLogin()}
            >
              네이버로 로그인
            </button>
            <button
              className="btn btn-outline"
              style={{ width: "100%", background: "#4285F4", color: "#fff" }}
              onClick={() => handleSocialLogin("구글")}
            >
              Google로 로그인
            </button>
          </div>

          {/* 회원가입 */}
          <p style={{ marginTop: "16px", textAlign: "center" }}>
            아직 회원이 아니신가요?{" "}
            <Link
              to="/signup"
              style={{ color: "var(--primary)", fontWeight: 600 }}
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
