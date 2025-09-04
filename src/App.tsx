import { useState } from 'react'
import './App.css'

export default function App() {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            OneDay <span className="logo-accent primary">Class</span>
          </div>
          <nav>
            <a href="#featured">클래스</a>
            <a href="#how">이용안내</a>
            <a href="#contact">문의</a>
            <a className="btn btn-outline" href="#login">
              로그인
            </a>
          </nav>
        </div>
      </header>

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

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2>카테고리 바로가기</h2>
          <p className="muted">관심 있는 분야를 선택해보세요.</p>
          <div className="grid grid-4">
            <a className="cat-card" href="#featured">
              <span className="cat-emoji">🧑‍🍳</span>
              요리/베이킹
            </a>
            <a className="cat-card" href="#featured">
              <span className="cat-emoji">🎨</span>
              드로잉/수채화
            </a>
            <a className="cat-card" href="#featured">
              <span className="cat-emoji">🧼</span>
              공예/비누
            </a>
            <a className="cat-card" href="#featured">
              <span className="cat-emoji">🌸</span>
              플라워
            </a>
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

      {/* Footer */}
      <footer id="contact">
        <div className="container">
          © 2025 OneDay Class · 문의: support@oneday.com
        </div>
      </footer>
    </div>
  );
}

type ClassCardProps = {
  title: string;
  place: string;
  price: string;
  img: string;
};

function ClassCard({ title, place, price, img }: ClassCardProps) {
  return (
    <article className="card">
      <img alt={title} src={img} />
      <div className="card-body">
        <h3>{title}</h3>
        <div className="muted">{place}</div>
        <div className="price">{price}</div>
      </div>
      <div className="card-actions">
        <button
          className="btn btn-primary"
          onClick={() => alert("예약 페이지로 이동 (데모)")}
        >
          예약하기
        </button>
      </div>
    </article>
  );
}