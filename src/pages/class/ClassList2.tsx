import { useState } from "react";
import ClassCard from "../../components/UIComponents/ClassCard";

// 클래스 목록 페이지
export default function ClassList2() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("전체");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["전체", "베이킹", "드로잉", "공예", "플라워", "캔들", "도자기"];
  const durations = ["전체", "1시간", "1.5시간", "2시간", "3시간", "3시간+"];
  const regions = ["전체", "강남", "홍대", "성수", "압구정", "이태원", "합정", "건대", "신촌"];
  
  const classes = [
    { 
      id: 1, 
      title: "초보자를 위한 베이킹 클래스", 
      category: "베이킹", 
      duration: "2시간",
      region: "강남",
      place: "2시간 · 강남", 
      price: 50000, 
      instructor: "김베이킹", 
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: 2, 
      title: "힐링 수채화 원데이", 
      category: "드로잉", 
      duration: "1.5시간",
      region: "홍대",
      place: "1.5시간 · 홍대", 
      price: 40000, 
      instructor: "박아티스트", 
      img: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: 3, 
      title: "아로마 디퓨저 만들기", 
      category: "공예", 
      duration: "2시간",
      region: "성수",
      place: "2시간 · 성수", 
      price: 30000, 
      instructor: "이공예", 
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: 4, 
      title: "프렌치 마카롱 만들기", 
      category: "베이킹", 
      duration: "3시간",
      region: "압구정",
      place: "3시간 · 압구정", 
      price: 80000, 
      instructor: "최프렌치", 
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: 5, 
      title: "꽃다발 만들기 클래스", 
      category: "플라워", 
      duration: "1시간",
      region: "이태원",
      place: "1시간 · 이태원", 
      price: 35000, 
      instructor: "정플라워", 
      img: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: 6, 
      title: "소이캔들 DIY", 
      category: "캔들", 
      duration: "1.5시간",
      region: "합정",
      place: "1.5시간 · 합정", 
      price: 25000, 
      instructor: "한캔들", 
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: 7, 
      title: "세라믹 컵 만들기", 
      category: "도자기", 
      duration: "3시간",
      region: "건대",
      place: "3시간 · 건대", 
      price: 60000, 
      instructor: "조도자기", 
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: 8, 
      title: "펜 드로잉 기초", 
      category: "드로잉", 
      duration: "2시간",
      region: "신촌",
      place: "2시간 · 신촌", 
      price: 35000, 
      instructor: "김드로잉", 
      img: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1200&auto=format&fit=crop" 
    }
  ];

  const filteredClasses = classes.filter(cls => {
    const matchesCategory = selectedCategory === "전체" || selectedCategory === cls.category;
    const matchesSearch = cls.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = selectedDuration === "전체" || 
      (selectedDuration === "3시간+" ? cls.duration.includes("3시간") : cls.duration === selectedDuration);
    const matchesRegion = selectedRegion === "전체" || cls.region === selectedRegion;
    const matchesPrice = cls.price >= priceRange[0] && cls.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesDuration && matchesRegion && matchesPrice;
  });

  const resetFilters = () => {
    setSelectedCategory("전체");
    setSearchQuery("");
    setSelectedDuration("전체");
    setSelectedRegion("전체");
    setPriceRange([0, 100000]);
  };

  const formatPrice = (price: number): string => {
    return `₩${price.toLocaleString()}`;
  };

  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>클래스</h1>
          <p>다양한 원데이 클래스를 만나보세요</p>
        </div>

        {/* Search & Filter */}
        <div className="filters-section">
          <div className="search-filter">
            <input
              type="text"
              placeholder="클래스를 검색해보세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* 기본 카테고리 필터 */}
          <div className="filter-group">
            <h3>카테고리</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 상세 필터 토글 버튼 */}
          <div className="advanced-filter-toggle">
            <button 
              className="toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '상세 필터 숨기기' : '상세 필터 보기'} 
              <span className={`arrow ${showFilters ? 'up' : 'down'}`}>▼</span>
            </button>
          </div>

          {/* 상세 필터들 */}
          {showFilters && (
            <div className="advanced-filters">
              {/* 소요시간 필터 */}
              <div className="filter-group">
                <h3>소요시간</h3>
                <div className="duration-filters">
                  {durations.map(duration => (
                    <button
                      key={duration}
                      className={`filter-btn ${selectedDuration === duration ? 'active' : ''}`}
                      onClick={() => setSelectedDuration(duration)}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              {/* 지역 필터 */}
              <div className="filter-group">
                <h3>지역</h3>
                <div className="region-filters">
                  {regions.map(region => (
                    <button
                      key={region}
                      className={`filter-btn ${selectedRegion === region ? 'active' : ''}`}
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* 가격 범위 필터 */}
              <div className="filter-group">
                <h3>가격 범위</h3>
                <div className="price-filter">
                  <div className="price-range-display">
                    <span>{formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</span>
                  </div>
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="최소 금액"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                      className="price-input"
                      min="0"
                      max="100000"
                      step="5000"
                    />
                    <span>~</span>
                    <input
                      type="number"
                      placeholder="최대 금액"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 100000])}
                      className="price-input"
                      min="0"
                      max="100000"
                      step="5000"
                    />
                  </div>
                  <div className="price-presets">
                    <button 
                      className={`preset-btn ${priceRange[0] === 0 && priceRange[1] === 30000 ? 'active' : ''}`}
                      onClick={() => setPriceRange([0, 30000])}
                    >
                      3만원 이하
                    </button>
                    <button 
                      className={`preset-btn ${priceRange[0] === 30000 && priceRange[1] === 50000 ? 'active' : ''}`}
                      onClick={() => setPriceRange([30000, 50000])}
                    >
                      3-5만원
                    </button>
                    <button 
                      className={`preset-btn ${priceRange[0] === 50000 && priceRange[1] === 80000 ? 'active' : ''}`}
                      onClick={() => setPriceRange([50000, 80000])}
                    >
                      5-8만원
                    </button>
                    <button 
                      className={`preset-btn ${priceRange[0] === 80000 && priceRange[1] === 100000 ? 'active' : ''}`}
                      onClick={() => setPriceRange([80000, 100000])}
                    >
                      8만원 이상
                    </button>
                  </div>
                </div>
              </div>

              {/* 필터 리셋 버튼 */}
              <div className="filter-actions">
                <button className="reset-btn" onClick={resetFilters}>
                  필터 초기화
                </button>
              </div>
            </div>
          )}

          {/* 활성 필터 표시 */}
          <div className="active-filters">
            {selectedCategory !== "전체" && (
              <span className="active-filter">
                카테고리: {selectedCategory}
                <button onClick={() => setSelectedCategory("전체")}>×</button>
              </span>
            )}
            {selectedDuration !== "전체" && (
              <span className="active-filter">
                시간: {selectedDuration}
                <button onClick={() => setSelectedDuration("전체")}>×</button>
              </span>
            )}
            {selectedRegion !== "전체" && (
              <span className="active-filter">
                지역: {selectedRegion}
                <button onClick={() => setSelectedRegion("전체")}>×</button>
              </span>
            )}
            {(priceRange[0] !== 0 || priceRange[1] !== 100000) && (
              <span className="active-filter">
                가격: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                <button onClick={() => setPriceRange([0, 100000])}>×</button>
              </span>
            )}
          </div>
        </div>

        {/* 검색 결과 개수 */}
        <div className="results-count">
          <p>{filteredClasses.length}개의 클래스를 찾았습니다</p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-3">
          {filteredClasses.map(item => (
            <ClassCard
              key={item.id}
              title={item.title}
              place={item.place}
              price={formatPrice(item.price)}
              instructor='솜씨당'
              img={item.img}
              className="class-card"
            />
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="no-results">
            <p>검색 조건에 맞는 클래스가 없습니다.</p>
            <button className="reset-btn" onClick={resetFilters}>
              필터 초기화하고 다시 검색
            </button>
          </div>
        )}
      </div>
    </div>
  );
};