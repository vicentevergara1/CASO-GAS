import Icon from "../../../shared/components/Icon.jsx";

const POINTS = [
  "Catálogo organizado por categorías para comparar con facilidad.",
  "Carrito persistente en este navegador para continuar más tarde.",
  "Checkout con datos de entrega y resumen del pedido antes de confirmar.",
];

export default function About() {
  return (
    <section id="nosotros" className="section about-section">
      <div className="container">
        <div className="about-card">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-12 col-lg-7">
              <span className="section-eyebrow">Nosotros</span>
              <h2 className="section-title">Sobre Gas El Volcán</h2>
              <p className="section-lead">
                Una propuesta digital para facilitar la consulta y compra de productos de gas,
                con una experiencia clara tanto en computador como en dispositivos móviles.
              </p>
              <ul className="about-list">
                {POINTS.map((point) => (
                  <li key={point}>
                    <Icon name="check" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-5">
              <div className="about-highlight">
                <Icon name="truck" size={26} />
                <h3>Compra simple y atención cercana</h3>
                <p>
                  Elige tus productos, confirma tu pedido y coordina el despacho.
                  Te acompañamos durante todo el proceso de compra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
