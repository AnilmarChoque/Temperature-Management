# Desafio Radix

Você é um desenvolvedor em uma grande empresa do setor de óleo e gás. Uma das plantas dessa empresa instalou sensores em seus 2.000 equipamentos, e você foi encarregado de criar a infraestrutura para receber os dados desses sensores em tempo real.

## Descrição

Os equipamentos são capazes de enviar dados no formato JSON para um endpoint. Um exemplo do payload é:

```json
{
  "equipmentId": "EQ-12495",
  "timestamp": "2023-02-15T01:30:00.000-05:00",
  "value": 78.42
}
```

- `equipmentId`: o identificador do equipamento;
- `timestamp`: a data e hora em que o evento ocorreu, incluindo o fuso horário;
- `value`: o valor do sensor com precisão de duas casas decimais.

## Detalhamento das pastas
### Dados
Pasta onde é armazenada a modelagem e script do banco de dados utilizado. O banco de dados utilizado foi o MySQL.

### Backend
Pasta onde está localizada a API do projeto, foi utilizado o graphQL para realização dessa API.

### Frontend
Pasta onde está localizada as telas da aplicação, nela temos a pasta `src` que contem nossas imagens utilizadas (`assets`), nosso componentes e nossas páginas.

## Funções
- Realizar login (Apenas)
- Visualizar uma grade de equipamentos
-	Mostrar nessa grade às últimas capturas
-	Pesquisar o equipamento
-	Exibir um gráfico linha dos dados coletados do sensor
-	Exibir a média das últimas 24 horas
-	Exibir a média das últimas 48 horas
-	Exibir a média da última semana
-	Exibir a média do último mês
-	Enviar um arquivo CSV para adição, atualização ou preenchimento de dados perdidos

## Como Executar o Projeto

1. Criamos o banco de dados e as tabelas utilizando o script dentro da pasta `dados`

2. Abrimos um terminal dentro da pasta backend e executamos os seguintes comandos
```shell
npm i
node index.js
```

3. Abrimos outro terminal dentro da pasta frontend (sem encerrar o outro) e executamos o seguinte

```shell
npm run dev
```

4. Agora abra um navegador e acesse o link http://localhost:5173 para acessar a aplicação

### Prótotipo
[Prótotipo de telas](https://www.figma.com/design/PccEWKUnSifhFS8HNAUwQb/Temperature-Management-(Radix)?node-id=0-1&t=gWbBlutERFufhKZP-1)
