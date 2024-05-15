import classNames from "classnames";
import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";

import { calcularDesconto } from "./helpers/calcularDesconto";
import { formatCurrency } from "./helpers/formatCurrency";

const CSS_HANDLES = ["container", "sellingPrice", "listPrice", "flag"];

export default function PrecioM2() {
  const handles = useCssHandles(CSS_HANDLES);

  const { product } = useProduct();
  const { priceRange } = product;
  const { properties } = product;
  const { listPrice, sellingPrice } = priceRange;
  const { lowPrice } = listPrice;
  const { highPrice } = sellingPrice;
  // const lowPrice = 8900;
  // const highPrice = 9900;
  const isSellingPrice = lowPrice !== highPrice;

  const precioM2Object = properties.find((item) => item.name === "PrecioM2");
  const precioM2Value = precioM2Object ? precioM2Object.values[0] : null;

  const rendimientoObject = properties.find(
    (item) => item.name === "Rendimiento"
  );
  const rendimientoValue = rendimientoObject
    ? rendimientoObject.values[0]
    : null;
  const rendimiento = rendimientoValue
    ? parseFloat(rendimientoValue.replace("m2", "").replace(",", "."))
    : null;

  const precioM2 = parseInt(highPrice / rendimiento);

  function Container({ children }) {
    return (
      <div className={classNames(handles.container, "mv5")}>{children}</div>
    );
  }

  function SellingPrice({ lowPrice, highPrice }) {
    return (
      <Container>
        <div className={classNames("mb3")}>
          <p className={classNames(handles.listPrice, "ma0")}>
            <s className={classNames("gray f3")}>{formatCurrency(lowPrice)}</s>
          </p>
        </div>
        <div className={classNames("flex items-center")}>
          <p className={classNames(handles.sellingPrice, "ma0 c-base f2 b")}>
            {formatCurrency(highPrice)}
          </p>
          <span
            className={classNames(
              handles.flag,
              "ma0 bg-base--inverted br-pill f5 white b pv3 ph4 ml4"
            )}
          >
            {calcularDesconto(lowPrice, highPrice)}
          </span>
        </div>
      </Container>
    );
  }

  function SellingPriceM2({ lowPrice, highPrice }) {
    return (
      <Container>
        <div className={classNames("mb3")}>
          <p className={classNames(handles.listPrice, "ma0")}>
            <s className={classNames("gray f3")}>
              {formatCurrency(lowPrice)} m2
            </s>
          </p>
        </div>
        <div className={classNames("flex items-center mb3")}>
          <p className={classNames(handles.sellingPrice, "ma0 c-base f2 b")}>
            {formatCurrency(precioM2)} m2
          </p>
          <span
            className={classNames(
              handles.flag,
              "ma0 bg-base--inverted br-pill f5 white b pv3 ph4 ml4"
            )}
          >
            {calcularDesconto(lowPrice, highPrice)}
          </span>
        </div>
        <p className={classNames(handles.sellingPrice, "ma0 mb3 c-base f3 b")}>
          {formatCurrency(highPrice)} Caja
        </p>
      </Container>
    );
  }

  function ListPrice({ highPrice }) {
    return (
      <Container>
        <p className={classNames(handles.sellingPrice, "ma0 c-base f2 b")}>
          {formatCurrency(highPrice)}
        </p>
      </Container>
    );
  }

  function ListPriceM2({ highPrice }) {
    return (
      <Container>
        <p className={classNames(handles.sellingPrice, "ma0 mb3 c-base f2 b")}>
          {formatCurrency(precioM2)} m2
        </p>
        <p className={classNames(handles.sellingPrice, "ma0 c-base f3 b")}>
          {formatCurrency(highPrice)} Caja
        </p>
      </Container>
    );
  }

  return (
    <>
      {isSellingPrice ? (
        <>
          {precioM2Value ? (
            <SellingPriceM2 lowPrice={lowPrice} highPrice={highPrice} />
          ) : (
            <SellingPrice lowPrice={lowPrice} highPrice={highPrice} />
          )}
        </>
      ) : (
        <>
          {precioM2Value ? (
            <ListPriceM2 highPrice={highPrice} />
          ) : (
            <ListPrice highPrice={highPrice} />
          )}
        </>
      )}
    </>
  );
}
