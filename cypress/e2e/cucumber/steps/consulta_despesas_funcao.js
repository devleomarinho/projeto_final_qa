import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const URL_QUADRO_GERAL =
  'https://transparencia.joaopessoa.pb.gov.br/#/despesas/despesas-quadro-geral';

Given(
  'que o cidadão acessa a página de quadro geral de despesas de João Pessoa',
  () => {
    cy.visit(URL_QUADRO_GERAL);
  }
);

When('o cidadão verifica o título da página de despesas', () => {
  
  cy.contains('Despesas - Quadro Geral').should('be.visible');
});

When('seleciona o ano {string}', (ano) => {
  
  cy.get('#selectYear').click(); // abre o dropdown

  
  cy.contains('li', ano).click();
});
When('clica no botão de pesquisar despesas', () => {
  // espera a requisição que carrega os dados
  cy.intercept('POST', '**/despesas-filtro').as('buscarDespesas');

  cy.contains('button', 'Pesquisar').click();

  cy.wait('@buscarDespesas');
});

Then(
  'a tabela de despesas agrupadas por função deve ser exibida',
  () => {
    // começa na div de scroll e desce até a table
    cy.get('div.table-scroll table.table.table-striped.table-bordered', {
      timeout: 10000,
    }).should('be.visible');
  }
);

Then('deve existir pelo menos uma linha de resultado na tabela', () => {
  cy.get('div.table-scroll table.table.table-striped.table-bordered tbody tr', {
    timeout: 10000,
  })
    .its('length')
    .should('be.greaterThan', 0);
});
