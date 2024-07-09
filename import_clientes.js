const { log } = Logger

const find_cliente = (cgc, cliente_lista) => {
  let index = 0
  let check = false
  let cliente_lista_size = cliente_lista.length
  while (true) {
    // checando se oc cgc existe na lista de clientes
    if (cgc == cliente_lista[index][4]) {
      check = true
      break
    }

    index++
    if (index >= cliente_lista_size) break
  }


  return check
}








// importando novos clientes

const import_clientes = () => {
  let clientes_novos_planilha = getSheetByName("Planilha1")
  let cliente_lista_atual = getSheetByName("CLIENTES-TOTAL")
  let cliente_lista_atual_data = cliente_lista_atual.getDataRange().getValues()
  let clientes_novos_planilha_data = clientes_novos_planilha.getDataRange().getValues()
  // log(clientes_novos_planilha_data)
  cliente_lista_atual_data.shift()

  let clientes_lista = []

  clientes_novos_planilha_data.shift()
  clientes_novos_planilha_data.forEach(data => {
    try {
      let diference = Date.now() - new Date(data[7].getTime())

      log(diference)
    } catch (error) { }
    if (data[7] == undefined || data[7].length == 0) data[7] = "01/01/1990"
    let cgc = data[4]
    // log(data[4])
    // log({ data })
    if (!find_cliente(cgc, cliente_lista_atual_data)) {
      // log("achei")
      clientes_lista.push(data)
    }
  })
  let cliente_last_row = cliente_lista_atual.getLastRow()
  // log(cliente_last_row)
  // cliente_last_row++
  // add novos clientes na atual lista de clientes
  // se a lista de novos cliente for maior que 0, indica que existem novos cliente, e esses novos cliente seram adicionados na lista
  if (clientes_lista.length > 0) {
    clientes_lista.forEach(data => {
      // log({data:data[7]})
      if (data[7] == undefined || data[7].length == 0) data[7] = "01/01/1990"
      log(new Date(data[7].getTime()))
      cliente_lista_atual.appendRow(data)
    })
  }

  // Configurando a ordenação dos cçliente pela data da ultima compra em ordem descrescente, asim quem tem mais tempo que comprou aparece primeiro.

  cliente_lista_atual.getRange("A2:M").sort([{
    column: 8,
    ascending: true
  }])
  // formatando a coluna de datas
  cliente_lista_atual.getRange("H2:H").setNumberFormat("DD/MM/YYYY")
  // cliente_lista_atual.getRange("G1:G").setNumberFormat("DD/MM/YYYY")

  try {
    // Tenta criar um filtro
    cliente_lista_atual.getRange("A1:M").createFilter()
  }
  catch (error) { }


  let date1 = new Date("01/01/2024");
  let date2 = new Date("26/01/2024");






  cliente_lista_atual.getRange("A2:M2").copyTo(cliente_lista_atual.getRange("A3:M"), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false)
  // cliente_lista_atual.getRange("i3:i3").copyTo(planilha01Sheet.getRange("i4:i"), SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false)
  // cliente_lista_atual.getRange("A"+cliente_last_row+":m").setValues(clientes_lista)

}
