import { useState } from "react";
import Icon from "../../shared/components/Icon.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s-]{8,}$/;
const MIN_PASSWORD = 7;

const EMPTY_LOGIN = { email: "", password: "" };
const EMPTY_REGISTER = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  terms: false,
};

const INTRO = {
  login: {
    title: "Ingresa a tu cuenta",
    text: "Ingresa con tu correo y contraseña para revisar tus pedidos y continuar tus compras.",
    points: [
      ["shield", "Compra rápida y segura"],
      ["user", "Accede a tus pedidos"],
    ],
  },
  register: {
    title: "Crea tu cuenta",
    text: "Regístrate para comprar más rápido, guardar tus datos de entrega y revisar el historial de tus pedidos.",
    points: [
      ["shield", "Tus datos protegidos"],
      ["package", "Historial de pedidos"],
      ["truck", "Despacho coordinado"],
    ],
  },
};

export default function LoginSection() {
  const [mode, setMode] = useState("login");
  const [login, setLogin] = useState(EMPTY_LOGIN);
  const [register, setRegister] = useState(EMPTY_REGISTER);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  const intro = INTRO[mode];

  function changeMode(next) {
    setMode(next);
    setOk("");
    setError("");
  }

  function changeLogin(field, value) {
    setLogin((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function changeRegister(field, value) {
    setRegister((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function submitLogin(event) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(login.email.trim())) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    if (login.password.length < MIN_PASSWORD) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`);
      return;
    }
    setError("");
    setOk("Sesión iniciada correctamente. Bienvenido de vuelta.");
  }

  function submitRegister(event) {
    event.preventDefault();
    const name = register.name.trim();
    const email = register.email.trim();
    const phone = register.phone.trim();

    if (name.length < 3) {
      setError("Ingresa tu nombre completo.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    if (phone && !PHONE_PATTERN.test(phone)) {
      setError("Ingresa un teléfono válido.");
      return;
    }
    if (register.password.length < MIN_PASSWORD) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`);
      return;
    }
    if (register.password !== register.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!register.terms) {
      setError("Debes aceptar los términos y la política de privacidad.");
      return;
    }

    setError("");
    setOk("¡Cuenta creada correctamente! Ya puedes iniciar sesión.");
    setLogin({ email, password: "" });
    setRegister(EMPTY_REGISTER);
  }

  return (
    <section id="cuenta" className="section account-section">
      <div className="container">
        <div className="account-card">
          <div className="row g-0">
            <div className="col-12 col-lg-5 account-intro">
              <span className="section-eyebrow section-eyebrow-light">Mi cuenta</span>
              <h2>{intro.title}</h2>
              <p>{intro.text}</p>
              <ul>
                {intro.points.map(([icon, label]) => (
                  <li key={label}>
                    <Icon name={icon} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12 col-lg-7 account-form-column">
              <div className="card-body">
                <div className="account-tabs" role="tablist" aria-label="Acceso a la cuenta">
                  <button
                    type="button"
                    role="tab"
                    id="account-tab-login"
                    aria-selected={mode === "login"}
                    aria-controls="account-panel"
                    className="account-tab"
                    onClick={() => changeMode("login")}
                  >
                    Iniciar sesión
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="account-tab-register"
                    aria-selected={mode === "register"}
                    aria-controls="account-panel"
                    className="account-tab"
                    onClick={() => changeMode("register")}
                  >
                    Crear cuenta
                  </button>
                </div>

                <div id="account-panel" role="tabpanel" aria-labelledby={`account-tab-${mode}`}>
                  <h3 className="h5">
                    {mode === "login" ? "Datos de acceso" : "Datos de registro"}
                  </h3>

                  {ok ? (
                    <>
                      <div className="alert alert-success" role="status">{ok}</div>
                      {mode === "register" && (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={() => changeMode("login")}
                        >
                          <Icon name="user" />
                          Iniciar sesión
                        </button>
                      )}
                    </>
                  ) : mode === "login" ? (
                    <form id="login-form" onSubmit={submitLogin} noValidate>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="login-email">Correo electrónico</label>
                        <input
                          id="login-email"
                          type="email"
                          required
                          autoComplete="email"
                          className="form-control"
                          placeholder="cliente@correo.cl"
                          value={login.email}
                          onChange={(event) => changeLogin("email", event.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="login-password">Contraseña</label>
                        <input
                          id="login-password"
                          type="password"
                          required
                          autoComplete="current-password"
                          className="form-control"
                          placeholder={`Al menos ${MIN_PASSWORD} caracteres`}
                          value={login.password}
                          onChange={(event) => changeLogin("password", event.target.value)}
                        />
                        <div className="form-text">Usa una contraseña segura de al menos {MIN_PASSWORD} caracteres.</div>
                      </div>
                      {error && <div className="alert alert-danger" role="alert">{error}</div>}
                      <button type="submit" className="btn btn-primary w-100">
                        <Icon name="user" />
                        Ingresar
                      </button>
                      <p className="account-switch">
                        ¿No tienes cuenta?{" "}
                        <button type="button" className="btn btn-link" onClick={() => changeMode("register")}>
                          Crear una cuenta
                        </button>
                      </p>
                    </form>
                  ) : (
                    <form id="register-form" onSubmit={submitRegister} noValidate>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="register-name">Nombre completo</label>
                        <input
                          id="register-name"
                          type="text"
                          required
                          autoComplete="name"
                          className="form-control"
                          placeholder="Ej: Juan Pérez"
                          value={register.name}
                          onChange={(event) => changeRegister("name", event.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="register-email">Correo electrónico</label>
                        <input
                          id="register-email"
                          type="email"
                          required
                          autoComplete="email"
                          className="form-control"
                          placeholder="cliente@correo.cl"
                          value={register.email}
                          onChange={(event) => changeRegister("email", event.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="register-phone">Teléfono</label>
                        <input
                          id="register-phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          className="form-control"
                          placeholder="+56 9 1234 5678 (opcional)"
                          value={register.phone}
                          onChange={(event) => changeRegister("phone", event.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="register-password">Contraseña</label>
                        <input
                          id="register-password"
                          type="password"
                          required
                          autoComplete="new-password"
                          className="form-control"
                          placeholder={`Al menos ${MIN_PASSWORD} caracteres`}
                          value={register.password}
                          onChange={(event) => changeRegister("password", event.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="register-confirm">Confirmar contraseña</label>
                        <input
                          id="register-confirm"
                          type="password"
                          required
                          autoComplete="new-password"
                          className="form-control"
                          placeholder="Repite tu contraseña"
                          value={register.confirm}
                          onChange={(event) => changeRegister("confirm", event.target.value)}
                        />
                      </div>
                      <div className="form-check mb-3">
                        <input
                          id="register-terms"
                          type="checkbox"
                          className="form-check-input"
                          checked={register.terms}
                          onChange={(event) => changeRegister("terms", event.target.checked)}
                        />
                        <label className="form-check-label account-terms" htmlFor="register-terms">
                          Acepto los términos y la política de privacidad.
                        </label>
                      </div>
                      {error && <div className="alert alert-danger" role="alert">{error}</div>}
                      <button type="submit" className="btn btn-primary w-100">
                        <Icon name="user" />
                        Crear cuenta
                      </button>
                      <p className="account-switch">
                        ¿Ya tienes cuenta?{" "}
                        <button type="button" className="btn btn-link" onClick={() => changeMode("login")}>
                          Inicia sesión
                        </button>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
