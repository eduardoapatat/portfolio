// Copia texto al portapapeles; devuelve false si el navegador lo impide (sin permiso o sin HTTPS).
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
