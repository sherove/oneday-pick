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
        localStorage.setItem("token", data.access_token);

        return fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
      })
      .then((res) => res.json())
      .then((user) => {
        localStorage.setItem("user", JSON.stringify({...user, platform: "kakao"}));
        localStorage.setItem("LoginType", "kakao");
        navigate("/");
      })
      .catch((err) => console.error("카카오 로그인 에러:", err));
  };

    

  // 🔥 타입 지정 추가
  const handleNaverAuth = async (code: string, state: string | null) => {
    try {
      
      // 1. 토큰 요청
      const tokenUrl = "/api/naver/oauth2.0/token";
      const tokenBody = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
        client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET,
        code,
        state: state ?? "",
      });

      const tokenRes = await fetch(tokenUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        body: tokenBody,
      });

      
      const tokenRaw = await tokenRes.text();

      // 2. 토큰 파싱
      let tokenData: any;
      
      try {
        tokenData = JSON.parse(tokenRaw);
      } catch {
        const params = new URLSearchParams(tokenRaw);
        tokenData = {
          access_token: params.get('access_token'),
          refresh_token: params.get('refresh_token'),
          token_type: params.get('token_type'),
          expires_in: params.get('expires_in'),
          error: params.get('error'),
          error_description: params.get('error_description'),
        };
      }

      if (tokenData.error) {
        console.error("❌ 네이버 토큰 오류:", tokenData.error, tokenData.error_description);
        console.groupEnd();
        alert("네이버 로그인 실패: " + tokenData.error_description);
        navigate("/login");
        return;
      }

      if (!tokenData.access_token) {
        console.error("❌ 액세스 토큰을 받지 못했습니다");
        console.groupEnd();
        alert("네이버 로그인 실패: 토큰을 받지 못했습니다");
        navigate("/login");
        return;
      }

      localStorage.setItem("token", tokenData.access_token);

      // 3. 사용자 정보 요청 - Node.js 프록시 서버 사용

      const userRes = await fetch("http://localhost:3001/api/naveropen/v1/nid/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      
      const userRaw = await userRes.text();

      let userData: any;
      try {
        userData = JSON.parse(userRaw);
      } catch {
        console.error("❌ 사용자 정보 JSON 파싱 실패");
        console.groupEnd();
        alert("사용자 정보를 가져올 수 없습니다");
        navigate("/login");
        return;
      }

      if (!userData.response) {
        console.error("❌ 네이버 사용자 정보 오류:", userData);
        console.groupEnd();
        alert("네이버 사용자 정보를 가져올 수 없습니다: " + (userData.message || "알 수 없는 오류"));
        navigate("/login");
        return;
      }


      // 4. 사용자 정보 저장 및 리다이렉트
      const userInfo = {
        id: userData.response.id,
        email: userData.response.email,
        name: userData.response.name,
        nickname: userData.response.nickname,
        profile_image: userData.response.profile_image,
        platform: "naver"
      };

      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.removeItem("naver_state");
      
      console.log("✅ 네이버 로그인 완료:", userInfo);
      console.groupEnd();
      
      navigate("/");

    } catch (error) {
      console.error("❌ 네이버 로그인 전체 오류:", error);
      console.groupEnd();
      alert("네이버 로그인 중 오류가 발생했습니다");
      navigate("/login");
    }
  };

  return <div>로그인 처리중입니다...</div>;
}