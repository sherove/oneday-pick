import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Auth() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    if (code) {
      // 카카오 토큰 요청
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
          console.log("토큰:", data);
          localStorage.setItem("kakao_token", data.access_token);

          // 사용자 정보 요청
          return fetch("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          });
        })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          // 홈으로 리다이렉트
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  }, [params, navigate]);

  return <div>로그인 처리중입니다...</div>;
}
