# Projeto de Testes E2E – Portal da Transparência de João Pessoa

Automação de testes end‑to‑end usando **Cypress 13** com **Cucumber + Gherkin (BDD)** para validar a consulta de despesas no Portal da Transparência de João Pessoa, na tela **“Despesas – Quadro Geral”**.

## Objetivo

Garantir que um usuário consiga:

- Acessar a página de quadro geral de despesas.  
- Selecionar o ano desejado (ex.: 2025).  
- Executar a pesquisa mantendo o agrupamento por **Função**.  
- Visualizar a tabela de resultados com pelo menos uma linha de despesa.

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
│ │ │ └── steps
│ │   └── consulta_despesas_funcao.js
│ │ 
│ ├── fixtures
│ └── support
├── cypress.config.js
├── package.json
└── README.md
```

## Cenários Implementados

### 1. BDD – Consulta de despesas (arquivo `.feature`)

Cenário descrito em português usando Gherkin:

- Acessa a URL:  
  `https://transparencia.joaopessoa.pb.gov.br/#/despesas/despesas-quadro-geral`  
- Garante que o título **“Despesas – Quadro Geral”** está visível.  
- Seleciona o ano (via componente de dropdown de ano).  
- Clica no botão **“Pesquisar”**.  
- Valida que a tabela de despesas (dentro do container de scroll) está visível.  
- Verifica que existe pelo menos uma linha de resultado na tabela.

### 2. Arquivo consulta_despesas_funcao.js (steps)

- Importa as funções Given, When e Then do preprocessor Cucumber.

- Define a constante URL_QUADRO_GERAL com a URL da tela “Despesas – Quadro Geral”.

- Step Given: acessa a página de quadro geral de despesas com cy.visit(URL_QUADRO_GERAL).

- Step When (título): garante que o componente de título exibe o texto “Despesas – Quadro Geral” usando cy.contains(...).

- Step When (ano): abre o dropdown de ano (#selectYear) e seleciona o ano passado como parâmetro do cenário (ex.: “2025”).

- Step When (pesquisar): intercepta a requisição POST **/despesas-filtro, clica no botão “Pesquisar” e espera o carregamento da resposta com cy.wait.

- Step Then (tabela visível): verifica se a tabela renderizada dentro do container de scroll (div.table-scroll table...) está visível.

- Step Then (linhas): valida que existe pelo menos uma linha de resultado (tbody tr) na tabela, garantindo que a consulta retornou dados.

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
   - `consulta_despesas_quadro_geral.feature` para o cenário BDD. 


