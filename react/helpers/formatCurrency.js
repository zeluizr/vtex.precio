export function formatCurrency(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}
