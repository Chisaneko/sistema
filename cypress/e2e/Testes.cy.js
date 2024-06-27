describe('Login/ Testes de credênciais', () => {
  it('Campos em brancos', () => {
    testarLogin(' ',' ')
    cy.get('#mensagem').should('be.visible').and('contain', 'Informe usuário e senha, os campos não podem ser brancos.')
  }),
  it('Email incorreto', () => {
    testarLogin('email incorreto','admin@123')
    cy.get('#mensagem').should('be.visible').and('contain', 'E-mail ou senha inválidos')
  }),
  it('Senha incorreta', () => {
    testarLogin('admin@admin.com','senha incorreta')
    cy.get('#mensagem').should('be.visible').and('contain', 'E-mail ou senha inválidos')
  }),
  it('Email e Senha incorretos', () => {
    testarLogin('email incorreto','senha incorreta')
    cy.get('#mensagem').should('be.visible').and('contain', 'E-mail ou senha inválidos')
  }),  
  it('Email e Senha válidos', () => {
    testarLogin('admin@admin.com','admin@123')
    cy.url().should('include', '/produtos.html?teste=123')
  })
})

describe('Produtos/ Funcionalidade', () => {
  it('Voltar', () => {
    cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
    cy.get('#collapsibleNavbar').click()
    cy.url().should('include', 'login.html')
  }),
  it('Criar', () => {
    cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
    cy.get('#btn-adicionar').click()
    cy.get('.modal-content').should('be.visible')
  }),
  describe('Produtos/ Modal', () => {
    it('Botão Sair', () => {
      cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
      cy.get('#btn-adicionar').click()
      cy.get('#btn-adicionar').click()
      cy.get('#btn-sair').click()
      cy.get('.modal-content').should('be.hidden')
    }),
    it('Botão X', () => {
      cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
      cy.get('#btn-adicionar').click()
      cy.get('#btn-adicionar').click()
      cy.get('.modal-header .close').click()
      cy.get('.modal-content').should('be.hidden')
    }),
    it('Campos em branco', () => {
      cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
      cy.get('#btn-adicionar').click()
      cy.get('#btn-adicionar').click()
      testarModalProduto(' ',' ',' ',' ','2024-06-26')
      cy.get('#btn-salvar').click()
      cy.get('#btn-salvar').click()
      cy.get('#mensagem').should('be.visible').and('contain', 'Todos os campos são obrigatórios para o cadastro!')
    }),
    it('Campos grandes demais', () => {
      cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
      cy.get('#btn-adicionar').click()
      cy.get('#btn-adicionar').click()
      testarModalProduto('9999999999','Banana  Banana  Banana  Banana  Banana  Banana  Banana  Banana ','9999999999','9999999999','2024-06-26')
      cy.get('#btn-salvar').click()
      cy.get('#btn-salvar').click()
      cy.get('#mensagem').should('be.visible').and('contain', 'Campos preenchidos incorretamente!')
    }),
    it('Salvar', () => {
      cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
      cy.get('#btn-adicionar').click()
      cy.get('#btn-adicionar').click()
      testarModalProduto('1','Banana','5','5,99','2024-06-26')
      cy.get('#btn-salvar').click()
      cy.get('#btn-salvar').click()
      cy.get('#btn-sair').click()
      cy.get('.modal-content').should('be.hidden')
      cy.get('td').should('be.visible').and('contain', 'Banana')
    }),
    it('Salvo', () => {
      cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
      cy.get('#btn-adicionar').click()
      cy.get('#btn-adicionar').click()
      testarModalProduto('1','Banana','5','5,99','2024-06-26')
      cy.get('#btn-salvar').click()
      cy.get('#btn-salvar').click()
      cy.get('#btn-sair').click()
      cy.get('td:first-child').should('be.visible').and('contain', '1')
      cy.get('td:nth-child(2)').should('be.visible').and('contain', 'Banana')
      cy.get('td:nth-child(3)').should('be.visible').and('contain', '5')
      cy.get('td:nth-child(4)').should('be.visible').and('contain', '5,99')
      cy.get('td:nth-child(5)').should('be.visible').and('contain', '2024-06-26')
    }),
    it('Validação de Dados', () => {
      cy.visit('http://127.0.0.1:5500//produtos.html?teste=123')
      cy.get('#btn-adicionar').click()
      cy.get('#btn-adicionar').click()
      testarModalProduto('Banana','Banana','Banana','Banana','2024-06-26')
      cy.get('#btn-salvar').click()
      cy.get('#btn-salvar').click()
      cy.get('#btn-sair').click()
      cy.get('td:first-child').invoke('val').should('match', /^\d+$/)
      cy.get('td:nth-child(3)').invoke('val').should('match', /^\d+$/)
      cy.get('td:nth-child(4)').invoke('val').should('match', /^\d+$/)
    })

  })
})



function testarModalProduto(codigo,nome,quantidade,value,data){
  cy.get('#codigo').type(codigo)
  cy.get('#nome').type(nome)
  cy.get('#quantidade').type(quantidade)
  cy.get('#valor').type(value)
  cy.get('#data').type(data)
}

function testarLogin(login,senha){
  cy.visit('http://127.0.0.1:5500/login.html')
  cy.get('#email').type(login)
  cy.get('#senha').type(senha)
  cy.get('#btn-entrar').click()
}
