import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Auth() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");
    
    if (code) {
      const loginType = localStorage.getItem("loginType");
      
      if (loginType === "kakao") {
        handleKakaoAuth(code);
      } else if (loginType === "naver") {
        handleNaverAuth(code, state);
      }
    }
  }, [params, navigate]);

  // 🔥 타입 지정 추가
  const handleKakaoAuth = (code: string) => {
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        code: code,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("카카오 토큰:", data);
        localStorage.setItem("kakao_token", data.access_token);

        return fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
      })
      .then((res) => res.json())
      .then((user) => {
        localStorage.setItem("user", JSON.stringify({...user, platform: "kakao"}));
        localStorage.removeItem("loginType");
        navigate("/");
      })
      .catch((err) => console.error("카카오 로그인 에러:", err));
  };

    

  // 🔥 타입 지정 추가
  const handleNaverAuth = async (code: string, state: string | null) => {
    const url = "/api/naver/oauth2.0/token";

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
      client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET,
      code,
      state: state ?? "",
    });

    console.group("[NAVER] token");
    console.log("➡️", url, body.toString());

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    console.log("⬅️ status", res.status, res.statusText);
    const raw = await res.text();
    console.log("⬇️ raw(최대 400):", raw.slice(0, 400));

    let data: any;
    try { data = JSON.parse(raw); }
    catch { console.error("JSON 파싱 실패(HTML 가능)"); console.groupEnd(); return; }

    if (data.error) {
      console.error("Naver API error:", data.error, data.error_description);
      console.groupEnd(); return;
    }

    console.log("✅ token:", data);
    localStorage.setItem("naver_token", data.access_token);

    // const meRes = await fetch("/api/naveropen/v1/nid/me", {
    //   headers: { Authorization: `Bearer ${data.access_token}` },
    // });
    // const me = await meRes.json();
    // console.log("✅ me:", me);

    // localStorage.setItem("user", JSON.stringify({ ...me, platform: "naver" }));
    // localStorage.removeItem("loginType");
    // console.groupEnd();
    navigate("/");
  };

  return <div>로그인 처리중입니다...</div>;
}