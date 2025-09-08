// import ClassCard from "../../components/UIComponents/ClassCard";
import { useState } from "react";
import "./ClassList.css";
import ClassCard from "../../components/UIComponents/ClassCard";
// import { useState } from "react";


const dummyData = [
  { id: 1, title: "쿠킹 클래스", type: "쿠킹", place: "서울 강남", price: 30000, date: "2025-09-20", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, title: "드로잉 클래스", type: "드로잉", place: "서울 홍대", price: 20000, date: "2025-09-22", img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, title: "베이킹 클래스", type: "베이킹", place: "부산 서면", price: 25000, date: "2025-09-25", img: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, title: "작은식물 정원 클래스", type: "가드닝", place: "서울 강남", price: 30000, date: "2025-09-28", img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop" },
  { id: 5, title: "나만의 향수 만들기", type: "향수", place: "서울 홍대", price: 20000, date: "2025-09-29", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, title: "베이킹 클래스", type: "베이킹", place: "부산 서면", price: 25000, date: "2025-09-30", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop" },
];



export default function ClassList() {

  // 날짜 검색
  const [startDate, setStartDate] = useState("");

  const filteredData = dummyData.filter((item) => {
    const matchStartDate = startDate ? item.date >= startDate : true;

    return (
      matchStartDate
    );
  });

  return (
      <section className="classList">
        <div className="container">
          <h2>클래스 리스트</h2>

          {/* 검색 필터 */}
          <div className="filter">
            <div className="field">
            <label>시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="field">
            <label>종료일</label>
            <input
              type="date"
            />
          </div>
            <div className="field">
              <label>지역</label>
              <input
                type="text"
                placeholder="예: 강남"
              />
            </div>
            <div className="field">
              <label>클래스 타입</label>
              <input
                type="text"
                placeholder="예: 베이킹"
              />
            </div>
             <div className="field">
            <label>최소 가격</label>
            <input
              type="number"
              placeholder="예: 20000"
            />
          </div>
          <div className="field">
            <label>최대 가격</label>
            <input
              type="number"
              placeholder="예: 30000"
            />
            </div>
          </div>


          <div className="grid">
            {filteredData.map((item) => (
               <ClassCard
                  key={item.id}
                  title={item.title}
                  place={item.place}
                  price={`₩${item.price.toLocaleString()}`}
                  img={item.img}
                  className="class-card"
                />
            ))}
          </div>
        </div>
    </section>
  );
}