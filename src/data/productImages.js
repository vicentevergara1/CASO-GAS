const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const MAX_IMAGE_LENGTH = 280000;

export function isUploadedImage(image) {
  return typeof image === "string" && /^data:image\/(?:jpeg|png|webp);base64,/i.test(image);
}

export function productImageSource(image) {
  if (isUploadedImage(image)) return image;
  return `${import.meta.env.BASE_URL}assets/images/${encodeURIComponent(String(image ?? ""))}`;
}

export async function prepareProductImage(file) {
  if (!file || !ACCEPTED_TYPES.has(file.type)) {
    throw new Error("Selecciona una imagen JPG, PNG o WEBP.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("La imagen no puede superar los 8 MB.");
  }

  const objectUrl = URL.createObjectURL(file);
  let image;
  try {
    image = await new Promise((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("No se pudo abrir la imagen seleccionada."));
      element.src = objectUrl;
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }

  if (!image.naturalWidth || !image.naturalHeight) {
    throw new Error("La imagen seleccionada no es válida.");
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Este navegador no permite procesar imágenes.");

  let dimension = 1000;
  for (let attempt = 0; attempt < 7; attempt += 1) {
    const scale = Math.min(1, dimension / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.82, 0.66, 0.5]) {
      const result = canvas.toDataURL("image/webp", quality);
      if (isUploadedImage(result) && result.length <= MAX_IMAGE_LENGTH) return result;
    }
    dimension = Math.floor(dimension * 0.75);
  }
  throw new Error("Esta foto ocupa demasiado espacio. Prueba con otra imagen más pequeña.");
}
