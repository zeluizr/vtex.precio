export function calcularDesconto(precoLista, precoVenda) {
  if (precoLista !== precoVenda) {
    const desconto = ((precoLista - precoVenda) / precoLista) * 100;
    return desconto.toFixed(0) + "%";
  } else {
    return null;
  }
}
