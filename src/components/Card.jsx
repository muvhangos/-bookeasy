import "./Card.css";

export default function Card({ children, title }) {
  return (
    <div className="cardComponent">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}