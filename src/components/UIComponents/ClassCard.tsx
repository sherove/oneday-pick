type ClassCardProps = {
  title: string;
  place: string;
  price: string;
  img: string;
};

export default function ClassCard({
  title,
  place,
  price,
  img,
}: ClassCardProps) {
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
