import Icon from "../../../shared/components/Icon.jsx";

const SERVICES = [
  {
    icon: "package",
    title: "Venta de cilindros",
    description: "Formatos de 5, 11, 15 y 45 kg para distintos niveles de consumo.",
  },
  {
    icon: "settings",
    title: "Accesorios y conexión",
    description: "Mangueras, reguladores, abrazaderas y productos complementarios.",
  },
  {
    icon: "user",
    title: "Atención al cliente",
    description: "Orientación para elegir la alternativa adecuada según tu necesidad.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section services-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Servicios</span>
          <h2 className="section-title">Todo lo necesario para tu conexión de gas</h2>
          <p className="section-lead">
            Reunimos productos y orientación para que puedas comprar con claridad.
          </p>
        </div>

        <div className="row g-3 g-lg-4">
          {SERVICES.map((service) => (
            <div className="col-12 col-md-4" key={service.title}>
              <article className="card h-100 service-card">
                <div className="card-body">
                  <span className="service-icon" aria-hidden="true">
                    <Icon name={service.icon} size={24} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
