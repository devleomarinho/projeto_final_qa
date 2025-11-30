# Projeto de Testes E2E – Portal da Transparência de João Pessoa

Automação de testes end‑to‑end usando **Cypress 13** com **Cucumber + Gherkin (BDD)** para validar a consulta de despesas no Portal da Transparência de João Pessoa, na tela **“Despesas – Quadro Geral”** e a funcionalidade de download de anexos na página **"Obras Embargadas"**.

## Objetivo

### Teste 1: Página de "Despesas - Quadro Geral"

Garantir que um usuário consiga:

- Acessar a página de quadro geral de despesas.  
- Selecionar o ano desejado (ex.: 2025).  
- Executar a pesquisa mantendo o agrupamento por **Função**.  
- Visualizar a tabela de resultados com pelo menos uma linha de despesa.

### Teste 2: Página "Obras Embargadas"

Garantir que um usuário consiga:

- Acessar a página de obras embargadas.
- Visualizar a tabela com a lista de obras embargadas.
- Presionar o botão de download em algum anexo desejado.  

## Tecnologias

- [Node.js](https://nodejs.org/)  
- [Cypress](https://www.cypress.io/)  
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)  
- Gherkin (.feature) para descrição dos cenários em BDD  

## Estrutura do Projeto
```
.
├── cypress
│ ├── e2e
│ │ ├── cucumber
│ │ │ ├── features
│ │ │ │ └── consulta_despesas_funcao.feature
| | | | └── obras_embargadas_download.feature
│ │ │ └── steps
│ │ |  └── consulta_despesas_funcao.js
│ │ |  └── obras_embargadas_download.js
│ ├── fixtures
│ └── support
├── cypress.config.js
├── package.json
└── README.md
```

## Cenários Implementados

### 1. Teste 1 – Consulta de despesas (arquivo `.feature`)

Cenário descrito em português usando Gherkin:

- Acessa a URL:  
  `https://transparencia.joaopessoa.pb.gov.br/#/despesas/despesas-quadro-geral`  
- Garante que o título **“Despesas – Quadro Geral”** está visível.  
- Seleciona o ano (via componente de dropdown de ano).  
- Clica no botão **“Pesquisar”**.  
- Valida que a tabela de despesas (dentro do container de scroll) está visível.  
- Verifica que existe pelo menos uma linha de resultado na tabela.

### 1.1. Arquivo consulta_despesas_funcao.js (steps)

- Importa as funções Given, When e Then do preprocessor Cucumber.

- Define a constante URL_QUADRO_GERAL com a URL da tela “Despesas – Quadro Geral”.

- Step Given: acessa a página de quadro geral de despesas com cy.visit(URL_QUADRO_GERAL).

- Step When (título): garante que o componente de título exibe o texto “Despesas – Quadro Geral” usando cy.contains(...).

- Step When (ano): abre o dropdown de ano (#selectYear) e seleciona o ano passado como parâmetro do cenário (ex.: “2025”).

- Step When (pesquisar): intercepta a requisição POST **/despesas-filtro, clica no botão “Pesquisar” e espera o carregamento da resposta com cy.wait.

- Step Then (tabela visível): verifica se a tabela renderizada dentro do container de scroll (div.table-scroll table...) está visível.

- Step Then (linhas): valida que existe pelo menos uma linha de resultado (tbody tr) na tabela, garantindo que a consulta retornou dados.


### 2. Teste 2 – Download de anexo de obra embargada (arquivo .feature)
Cenário descrito em português usando Gherkin:

- Acessa a URL:
https://transparencia.joaopessoa.pb.gov.br/#/controle-urbano/obras-embargadas

- Garante que o título “Obras Embargadas” está visível no componente de título da página.

- Valida que a tabela de obras embargadas (lista de registros com descrição e anexo) está visível.

- Verifica que existe pelo menos uma obra listada na tabela.

- Clica no botão de download do anexo da primeira obra da lista.

- Confirma que a requisição de download do arquivo é disparada com sucesso.

### 2.1. Arquivo obras_embargadas_download.js (steps)

- Importa as funções Given, When e Then do preprocessor Cucumber.

- Define a constante URL_OBRAS_EMBARGADAS com a URL da tela “Obras Embargadas”.

- Step Given: acessa a página de obras embargadas com cy.visit(URL_OBRAS_EMBARGADAS).

- Step When (título): garante que o componente de título da página (titulo-pagina) exibe o texto “Obras Embargadas”, usando um seletor específico do título (por exemplo, titulo-pagina .titulo_paginas).

- Step When (tabela): localiza a tabela de obras embargadas (por exemplo, table.table.table-bordered.table-striped.table-sm), verifica que está visível e que há pelo menos uma linha no tbody.

- Step When (download): intercepta a requisição de download (mapeando um GET genérico ou um padrão de URL) e, dentro da primeira linha da tabela, clica no botão de download do anexo (botão com ícone de download).

- Step Then (requisição de download): espera a requisição interceptada com cy.wait, validando que o clique no botão de download realmente disparou o pedido de arquivo, o que indica que o botão de anexos está funcional.


## Configuração

### Dependências

```
npm init -y
npm install --save-dev cypress cypress-cucumber-preprocessor

```
### `cypress.config.js` (exemplo)

```
const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
e2e: {
setupNodeEvents(on, config) {
on('file:preprocessor', cucumber());
return config;
},
specPattern: ['cypress/e2e//*.feature', 'cypress/e2e//*.cy.js'],
},
});
```
### `package.json` – configuração do preprocessor + scripts

```
{
"scripts": {
"cypress:open": "cypress open",
"cypress:run": "cypress run"
},
"cypress-cucumber-preprocessor": {
"step_definitions": "cypress/e2e/cucumber/steps"
}
}
```


## Como Executar os Testes

### Modo interativo (GUI)

```
npx cypress open

```

1. Selecione **E2E Testing**.  
2. Escolha o navegador.  
3. Execute:
   - `consulta_despesas_quadro_geral.feature` para o executar o primeiro teste;
   - `obras_embargadas_download.feature` para excutar o segundo teste.


