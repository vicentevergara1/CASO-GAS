import { useState } from "react";

export default function Login({ user, loading, onLogin, onRegister, onLogout, prompt = "" }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    if (mode === "register" && name.trim().length < 2) {
      setError("Ingresa tu nombre completo.");
      return;
    }
    if (password.length < (mode === "register" ? 8 : 1)) {
      setError(mode === "register" ? "La contraseña debe tener al menos 8 caracteres." : "Ingresa tu contraseña.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "register") {
        await onRegister({ name: name.trim(), email: email.trim(), password });
        setMessage("Cuenta creada e inicio de sesión realizado.");
      } else {
        await onLogin({ email: email.trim(), password });
        setMessage("Sesión iniciada correctamente.");
      }
      setPassword("");
    } catch (reason) {
      setError(reason.message || "No se pudo completar la solicitud.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="login" className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <span className="text-primary fw-semibold small">CUENTA</span>
                <h2 className="h4 mt-1">{user ? "Sesión activa" : mode === "register" ? "Crear cuenta de cliente" : "Ingresar a mi cuenta"}</h2>
                {prompt && <div className="alert alert-info" role="status">{prompt}</div>}
                {loading ? <p role="status" className="text-secondary">Comprobando sesión…</p> : user ? (
                  <>
                    <div className="alert alert-success">
                      <strong>{user.name}</strong><br />
                      {user.email}<br />
                      Rol: {user.role}
                    </div>
                    <button type="button" className="btn btn-outline-secondary" onClick={onLogout}>Cerrar sesión</button>
                  </>
                ) : (
                  <>
                    <div className="btn-group w-100 mb-3" role="group" aria-label="Tipo de acceso">
                      <button type="button" className={`btn ${mode === "login" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => { setMode("login"); setError(""); setMessage(""); }}>Ingresar</button>
                      <button type="button" className={`btn ${mode === "register" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => { setMode("register"); setError(""); setMessage(""); }}>Crear cuenta</button>
                    </div>
                    <form onSubmit={submit} noValidate>
                      {mode === "register" && (
                        <div className="mb-3">
                          <label className="form-label" htmlFor="account-name">Nombre completo</label>
                          <input id="account-name" className="form-control" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="account-email">Correo</label>
                        <input id="account-email" type="email" className="form-control" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="account-password">Contraseña</label>
                        <input id="account-password" type="password" className="form-control" autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={mode === "register" ? 8 : 1} />
                        {mode === "register" && <div className="form-text">Mínimo 8 caracteres.</div>}
                      </div>
                      {error && <div className="alert alert-danger" role="alert">{error}</div>}
                      {message && <div className="alert alert-success" role="status">{message}</div>}
                      <button type="submit" className="btn btn-primary w-100" disabled={busy}>{busy ? "Conectando…" : mode === "register" ? "Crear cuenta" : "Ingresar"}</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

