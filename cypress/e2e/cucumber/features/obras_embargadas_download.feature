#language: pt

Funcionalidade: Consulta de obras embargadas no Portal da Transparência

  Contexto:
    Dado que o cidadão acessa a página de obras embargadas de João Pessoa

  Cenário: Baixar o anexo de uma obra embargada
    Quando o cidadão verifica o título da página de obras embargadas
    E visualiza a tabela de obras embargadas
    E clica no botão de download do anexo da primeira obra da lista
    Então a requisição de download do anexo deve ser realizada com sucesso
