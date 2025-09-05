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

  return (
    <section className="hero">
      <div
        className="container"
        style={{ display: "grid", placeItems: "center", minHeight: "90vh" }}
      >
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
              onClick={() => handleSocialLogin("카카오")}
            >
              카카오로 로그인
            </button>
            <button
              className="btn btn-outline"
              style={{ width: "100%", background: "#03C75A", color: "#fff" }}
              onClick={() => handleSocialLogin("네이버")}
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
