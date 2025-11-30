#language: pt

Funcionalidade: Consulta de despesas no quadro geral do Portal da Transparência

  Contexto:
    Dado que o cidadão acessa a página de quadro geral de despesas de João Pessoa

  Cenário: Consultar despesas de 2025 agrupadas por função
    Quando o cidadão verifica o título da página de despesas
    E seleciona o ano "2025"
    E clica no botão de pesquisar despesas
    Então a tabela de despesas agrupadas por função deve ser exibida
    E deve existir pelo menos uma linha de resultado na tabela
