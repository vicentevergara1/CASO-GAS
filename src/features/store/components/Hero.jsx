import Icon from "../../../shared/components/Icon.jsx";

const BENEFITS = [
  ["truck", "Despacho coordinado", "Confirmamos la entrega al finalizar tu compra."],
  ["shield", "Compra simple", "Catálogo claro y carrito con total actualizado."],
  ["user", "Atención cercana", "Te orientamos para elegir el producto adecuado."],
];

export default function Hero({ onSearch }) {
  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-7">
            <span className="section-eyebrow">Distribuidora de gas</span>
            <h1 className="hero-title">Gas para tu hogar y negocio, con atención cercana.</h1>
            <p className="hero-lead">
              Compra cilindros, mangueras, reguladores y accesorios de forma simple.
              Revisa el catálogo, agrega tus productos y coordina la entrega desde la tienda.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href="#productos">
                Ver productos
                <Icon name="arrowRight" />
              </a>
              <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onSearch}>
                <Icon name="search" />
                Buscar un producto
              </button>
            </div>
            <ul className="hero-benefits">
              {BENEFITS.map(([icon, title, description]) => (
                <li key={title}>
                  <span className="hero-benefit-icon" aria-hidden="true">
                    <Icon name={icon} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-5">
            <div className="hero-visual">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/volcan.png`}
                className="hero-image"
                alt="Ilustración del volcán de Gas El Volcán"
              />
              <div className="hero-price-card">
                <span>Catálogo disponible</span>
                <strong>4 categorías</strong>
                <small>Cilindros, mangueras, reguladores y accesorios.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
