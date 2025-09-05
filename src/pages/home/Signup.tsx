import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    alert(`회원가입 시도: ${name}, ${email}`);
  };

  const handleSocialSignup = (provider: string) => {
    alert(`${provider} 회원가입 시도`);
  };

  return (
    <section className="hero">
      <div
        className="container"
        style={{ display: "grid", placeItems: "center", minHeight: "90vh" }}
      >
        <div
          className="card"
          style={{ maxWidth: "460px", width: "100%", padding: "32px" }}
        >
          <h2 style={{ marginBottom: "20px" }}>회원가입</h2>

          {/* 회원가입 폼 */}
          <form
            onSubmit={handleSignup}
            style={{ display: "grid", gap: "16px" }}
          >
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="search"
              style={{ width: "100%" }}
            />
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
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="search"
              style={{ width: "100%" }}
            />
            <button
              className="btn btn-primary"
              type="submit"
              style={{ width: "100%" }}
            >
              회원가입
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

          {/* 소셜 회원가입 버튼 */}
          <div style={{ display: "grid", gap: "12px" }}>
            <button
              className="btn btn-outline"
              style={{
                width: "100%",
                background: "#FEE500",
                color: "#000",
              }}
              onClick={() => handleSocialSignup("카카오")}
            >
              카카오로 시작하기
            </button>
            <button
              className="btn btn-outline"
              style={{
                width: "100%",
                background: "#03C75A",
                color: "#fff",
              }}
              onClick={() => handleSocialSignup("네이버")}
            >
              네이버로 시작하기
            </button>
            <button
              className="btn btn-outline"
              style={{
                width: "100%",
                background: "#4285F4",
                color: "#fff",
              }}
              onClick={() => handleSocialSignup("구글")}
            >
              Google로 시작하기
            </button>
          </div>

          {/* 로그인 이동 */}
          <p style={{ marginTop: "16px", textAlign: "center" }}>
            이미 회원이신가요?{" "}
            <a
              href="/login"
              style={{ color: "var(--primary)", fontWeight: 600 }}
            >
              로그인
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
