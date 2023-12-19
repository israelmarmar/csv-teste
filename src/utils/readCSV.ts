import fs from "fs";
import csv from "csv-parser";
import { str2Date } from "./str2Date";

export function getDataFromCsv() {
  let results: any = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("data.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        results = results.map((row: any) =>
          Object.assign({
            ...row,
            dtContrato: str2Date(row.dtContrato),
            dtVctPre: str2Date(row.dtVctPre),
            realQtPrestacoes: row.vlTotal/row.vlPresta,
            vlTotal: new Intl.NumberFormat("pt-BR", {
              style: "currency",
              minimumFractionDigits: 2,
              currency: "BRL",
              currencyDisplay: "narrowSymbol",
            })
              .format(row.vlTotal)
              .toString(),
            vlPresta: new Intl.NumberFormat("pt-BR", {
              style: "currency",
              minimumFractionDigits: 2,
              currency: "BRL",
              currencyDisplay: "narrowSymbol",
            })
              .format(row.vlPresta)
              .toString(),
            vlMora: new Intl.NumberFormat("pt-BR", {
              style: "currency",
              minimumFractionDigits: 2,
              currency: "BRL",
              currencyDisplay: "narrowSymbol",
            })
              .format(row.vlMora)
              .toString(),
          })
        );
        resolve(results);
      });
  });
}
