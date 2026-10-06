document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const successMessage = document.getElementById("success-message");

  const fields = [
    { id: "email", errorId: "email-error" },
    { id: "password", errorId: "password-error" },
  ];

  function setInvalid(fieldId, errorId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    input.setAttribute("aria-invalid", "true");
    input.classList.remove("border-slate-300", "focus:ring-fg-brand");
    input.classList.add("border-red-500", "focus:ring-red-500");
    error.textContent = message;
    error.classList.remove("hidden");
  }

  function setValid(fieldId, errorId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    input.setAttribute("aria-invalid", "false");
    input.classList.remove("border-red-500", "focus:ring-red-500");
    input.classList.add("border-slate-300", "focus:ring-fg-brand");
    error.textContent = "";
    error.classList.add("hidden");
  }

  function clearAllErrors() {
    fields.forEach(function (f) {
      setValid(f.id, f.errorId);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    clearAllErrors();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Correo: obligatorio, formato válido y más de 3 caracteres
    if (!email) {
      setInvalid(
        "email",
        "email-error",
        "Por favor ingresa tu correo electrónico.",
      );
      isValid = false;
    } else if (email.length < 3) {
      setInvalid(
        "email",
        "email-error",
        "El correo debe tener más de 2 caracteres.",
      );
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvalid(
        "email",
        "email-error",
        "Ingresa un correo electrónico válido.",
      );
      isValid = false;
    }

    // Contraseña: obligatoria y más de 6 caracteres
    if (!password) {
      setInvalid(
        "password",
        "password-error",
        "Por favor ingresa tu contraseña.",
      );
      isValid = false;
    } else if (password.length <= 6) {
      setInvalid(
        "password",
        "password-error",
        "La contraseña debe tener más de 6 caracteres.",
      );
      isValid = false;
    }

    // Por ahora se permite cualquier usuario que cumpla el formato (no hay backend)
    if (isValid) {
      form.classList.add("hidden");
      successMessage.classList.remove("hidden");
      successMessage.classList.add("flex");
    }
  });

  // Limpia el error de un campo apenas el usuario empieza a corregirlo
  fields.forEach(function (f) {
    document.getElementById(f.id).addEventListener("input", function () {
      if (
        this.getAttribute("aria-invalid") === "true" &&
        this.value.trim() !== ""
      ) {
        setValid(f.id, f.errorId);
      }
    });
  });
});
