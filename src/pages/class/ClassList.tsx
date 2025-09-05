import ClassCard from "../../components/UIComponents/ClassCard";

const dummyData = [
  {
    id: 1,
    title: "쿠킹 클래스",
    place: "서울 강남",
    price: "₩30,000",
    img: "https://via.placeholder.com/300x200?text=Cooking",
  },
  {
    id: 2,
    title: "드로잉 클래스",
    place: "서울 홍대",
    price: "₩20,000",
    img: "https://via.placeholder.com/300x200?text=Drawing",
  },
  {
    id: 3,
    title: "베이킹 클래스",
    place: "부산 서면",
    price: "₩25,000",
    img: "https://via.placeholder.com/300x200?text=Baking",
  },
];


export default function ClassList() {
  return (
    <section id="featured" className="section">
      <div className="container">
        <h2>클래스 리스트</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {dummyData.map((item) => (
            <ClassCard
                key={item.id}
                title={item.title}
                place={item.place}
                price={item.price}
                img={item.img}
            />
            ))}
        </div>
      </div>
    </section>
  );
}