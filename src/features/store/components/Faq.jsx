import { useState } from "react";
import Icon from "../../../shared/components/Icon.jsx";

const QUESTIONS = [
  {
    question: "¿Qué productos puedo encontrar?",
    answer: "Cilindros de gas de 5, 11, 15 y 45 kg, además de mangueras, reguladores, abrazaderas y accesorios de conexión.",
  },
  {
    question: "¿Cómo agregar productos al carrito?",
    answer: "Puedes usar el botón Agregar de cada tarjeta del catálogo o el buscador. Desde el carrito puedes ajustar cantidades y revisar el total antes de continuar.",
  },
  {
    question: "¿Cómo puedo pagar?",
    answer: "Al finalizar la compra puedes elegir tarjeta de débito o crédito, transferencia bancaria o pago contra entrega. El resumen muestra el total antes de confirmar el pedido.",
  },
  {
    question: "¿Cómo se coordina el despacho?",
    answer: "Al confirmar tu pedido te contactamos para coordinar la entrega según tu dirección y comuna. El carrito queda guardado en este dispositivo para que puedas continuar más tarde.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Ayuda</span>
          <h2 className="section-title">Preguntas frecuentes</h2>
          <p className="section-lead">Respuestas breves sobre el catálogo, el carrito y el proceso de compra.</p>
        </div>

        <div className="faq-list">
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <Icon name="chevronDown" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
