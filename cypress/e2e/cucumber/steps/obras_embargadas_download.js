import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const URL_OBRAS_EMBARGADAS =
  'https://transparencia.joaopessoa.pb.gov.br/#/controle-urbano/obras-embargadas';

Given(
  'que o cidadão acessa a página de obras embargadas de João Pessoa',
  () => {
    cy.visit(URL_OBRAS_EMBARGADAS);
  }
);

When(
  'o cidadão verifica o título da página de obras embargadas',
  () => {
    // pega o componente de título da página
    cy.get('titulo-pagina .titulo_paginas')
      .should('be.visible')
      .and('contain.text', 'Obras Embargadas');
  }
);


When('visualiza a tabela de obras embargadas', () => {
  // tabela com lista de obras (pelo print, uma table com classes bootstrap)
  cy.get('table.table.table-bordered.table-striped.table-sm', {
    timeout: 10000,
  }).should('be.visible');

  // garante que há pelo menos uma linha
  cy.get('table.table.table-bordered.table-striped.table-sm tbody tr')
    .its('length')
    .should('be.greaterThan', 0);
});

When(
  'clica no botão de download do anexo da primeira obra da lista',
  () => {
    // intercepta qualquer requisição de download (geralmente GET)
    cy.intercept('GET', '**/*').as('downloadArquivo');

    // na primeira linha, localiza o botão de download (ícone/fa-download)
    cy.get(
      'table.table.table-bordered.table-striped.table-sm tbody tr'
    )
      .first()
      .within(() => {
        cy.get('button[icon*="fa-download"], button .fa-download')
          .first()
          .click();
      });
  }
);

Then(
  'a requisição de download do anexo deve ser realizada com sucesso',
  () => {
    // espera alguma requisição GET causada pelo clique; em um projeto real
    // você pode restringir o padrão da URL se quiser ser mais específico
    cy.wait('@downloadArquivo');
  }
);
