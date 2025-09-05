import { useState } from "react";

import ClassCard from "../../components/UIComponents/ClassCard";

export default function Home() {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>
              원데이 클래스를 <br />
              가볍게 예약하고, 가볍게 즐기세요 ✨
            </h1>
            <p>
              베이킹 · 드로잉 · 공예 · 플라워 · 캔들 · 도자기… 원하는 클래스를
              오늘 바로 예약하세요.
            </p>
            <div className="hero-cta">
              <div className="search">
                <input
                  type="text"
                  placeholder="예: 베이킹, 드로잉, 공예"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                  검색
                </button>
              </div>
              <button className="btn btn-primary" onClick={handleSearch}>
                클래스 보러가기
              </button>
            </div>
          </div>
          <div className="hero-art">
            <img
              alt="클래스 히어로 이미지"
              src="https://images.unsplash.com/photo-1516054719048-38394ee74f58?q=80&w=1200&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section id="featured" className="section">
        <div className="container">
          <h2>추천 클래스</h2>
          <p className="muted">인기/신규 클래스를 골라봤어요.</p>
          <div className="grid grid-3">
            <ClassCard
              title="초보자를 위한 베이킹 클래스"
              place="2시간 · 강남"
              price="₩50,000"
              img="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
            />
            <ClassCard
              title="힐링 수채화 원데이"
              place="1.5시간 · 홍대"
              price="₩40,000"
              img="https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1200&auto=format&fit=crop"
            />
            <ClassCard
              title="아로마 디퓨저 만들기"
              place="2시간 · 성수"
              price="₩30,000"
              img="https://images.unsplash.com/photo-1610632380989-680fe40816d2?q=80&w=1200&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
