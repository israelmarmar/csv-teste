export function str2Date(str: string) {
  var ano = parseInt(str.substring(0, 4));
  var mes = parseInt(str.substring(4, 6)) - 1;
  var dia = parseInt(str.substring(6, 8));

  return new Date(ano, mes, dia);

}
