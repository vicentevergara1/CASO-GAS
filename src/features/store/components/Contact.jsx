import Icon from "../../../shared/components/Icon.jsx";

export default function Contact() {
  return (
    <footer id="contacto" className="contact-section">
      <div className="container">
        <div className="row g-4 g-lg-5">
          <div className="col-12 col-lg-5">
            <a className="contact-brand" href="#inicio">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/logo.png`}
                alt=""
                width="48"
                height="48"
              />
              <span>
                <strong>Gas El Volcán</strong>
                <small>Atención y productos para tu hogar.</small>
              </span>
            </a>
            <p className="contact-description">
              Revisa el catálogo, arma tu carrito y completa tu compra en línea.
              La coordinación del despacho se realiza al finalizar el pedido.
            </p>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h2>Secciones</h2>
            <ul className="contact-links">
              <li><a href="#productos">Productos</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#faq">Preguntas frecuentes</a></li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <h2>Contacto</h2>
            <ul className="contact-info">
              <li>
                <Icon name="phone" />
                <span><a href="tel:+56981234567">+56 9 8123 4567</a></span>
              </li>
              <li>
                <Icon name="mail" />
                <span><a href="mailto:contacto.elvolcan@gmail.com">contacto.elvolcan@gmail.com</a></span>
              </li>
              <li>
                <Icon name="pin" />
                <span>Chillán, Región de Ñuble</span>
              </li>
              <li>
                <Icon name="clock" />
                <span>Lunes a sábado, 9:00 a 19:00 hrs.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="contact-bottom">
          <span>© {new Date().getFullYear()} Gas El Volcán. Todos los derechos reservados.</span>
          <a href="#inicio">Volver arriba</a>
        </div>
      </div>
    </footer>
  );
}
