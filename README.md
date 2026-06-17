# CRM

Sistema local para administrar separadamente as rotinas comerciais das empresas:

- Ionlab
- CiorBrasil
- Even
- Onix
- Vitralab
- Ambarlab

## Como executar

Use Python com `pandas` e `openpyxl` instalados:

```powershell
python server.py 8765
```

Depois abra:

```text
http://127.0.0.1:8765
```

## Importacao de vendas

A tela `Cadastros > Importacao de notas fiscais de vendas` permite escolher a empresa e importar um arquivo `.xlsx`.

Os dados sao gravados separadamente em:

```text
data/<empresa>/vendas.json
```

Para evitar duplicidade, o sistema usa a chave:

```text
empresa + ID_NF + ID_PRNF
```

Se uma planilha futura nao tiver essas colunas, o sistema usa um fallback com serie, numero da nota, data e produto.

## Importacao de clientes

A tela `Cadastros > Clientes` permite escolher a empresa e importar um arquivo `.xlsx` com cadastro de clientes.

Os dados sao gravados separadamente em:

```text
data/<empresa>/clientes.json
```

Para evitar duplicidade, o sistema usa a chave:

```text
empresa + CGC
```

Se uma planilha futura nao tiver `CGC`, o sistema usa `ID`; se tambem nao existir, usa nome, UF e CEP.

A importacao de clientes tambem descarta registros que nao estejam classificados como:

```text
CAT = Clientes
CC_DES = Cliente
```

## Consulta das tabelas

A tela inicial tem botoes para abrir:

- `Dashboard`
- `Vendas`
- `Clientes`

Cada consulta permite selecionar a empresa e pesquisar dinamicamente dentro dos registros daquela empresa. A exibicao mostra ate 200 linhas por consulta para manter a tela leve.

## Dashboard

O dashboard mostra a quantidade de clientes por UF para a empresa selecionada, sempre exibindo todas as 27 UFs do Brasil.

Tambem mostra o faturamento liquido por UF e por ano, de 2021 ate o ano corrente. O calculo usado e:

```text
PR_SBT - V_FRETE_NF - V_DESCONTO
```

Para vendas entre empresas do grupo, o dashboard ignora os clientes internos configurados para a empresa selecionada.

O grafico `Clientes Ativos/Inativos por UF` considera:

```text
Ativo = cliente com pelo menos uma compra no ano
Inativo = cliente sem compra no ano
```

As barras usam azul para ativos e vermelho para inativos.

## Prospect

A pagina `Prospect` permite pesquisar clientes por empresa, UF, cidade, cliente, periodo, referencia e tipo de cliente.

Campos de periodo obrigatorios:

```text
Mes inicial, mes final, ano inicial e ano final
```

Na consulta:

```text
Ativo = cliente com compra no periodo filtrado
Inativo = cliente sem compra no periodo filtrado
```

Se UF, cidade, cliente ou referencia ficarem em branco, o sistema considera todas as opcoes daquele filtro.
