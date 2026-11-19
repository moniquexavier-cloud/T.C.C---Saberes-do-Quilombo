describe('Testes E2E - Saberes do Quilombo', () => {
  it('1. Deve abrir a página inicial e carregar a área de quilombos', () => {
    cy.visit('http://localhost:3000/index.html');
    cy.get('#lista-quilombos').should('exist');
  });

  it('2. Deve mostrar mensagem de erro ao errar a senha no login', () => {
    cy.visit('http://localhost:3000/login.html');
    cy.get('#usuario').type('teste_errado@gmail.com');
    cy.get('#senha').type('123456');
    cy.get('#form-login').submit();
    cy.get('#feedback-login').should('not.be.empty');
  });
});