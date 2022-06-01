import { LoginElements } from "./elements/login.elements";
import { FormsCovid } from "./elements/formsCovid.elements";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Cypress.Commands.add("login", () => {
  cy.visit(
    "https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalacademico"
  );

  cy.get(LoginElements.tipoAutenticacao).select("Por Curso e Matricula");
  cy.readFile("/tcc/login.json")
    .its("curso")
    .then(($curso) => {
      cy.get(LoginElements.selectCurso).select($curso);
    });

  cy.readFile("/tcc/login.json")
    .its("matricula")
    .then(($matricula) => {
      cy.get(LoginElements.inputMatricula).type($matricula);
    });

  cy.readFile("/tcc/login.json")
    .its("senha")
    .then(($senha) => {
      cy.get(LoginElements.inputSenha).type($senha);
    });

  cy.get(LoginElements.buttonLogin).click();
  cy.wait(2000);

  cy.get("#ctl00_lblTitulo").then(($el) => {
    if ($el.text() === "Avaliação Pesquisa/Termo") {
      cy.contains("label", "Me sinto bem").siblings("input").click();
      cy.wait(500);
      cy.contains("label", "Em sua residência").siblings("input").click();
      cy.wait(500);
      cy.contains("label", "Nenhum dos sintomas acima")
        .siblings("input")
        .click();
      cy.wait(500);
      cy.contains(
        "tr",
        "4 - Teve contato próximo (menos de 1 metro) com alguém confirmado com a COVID-19 ou suspeito de estar infectado?"
      )
        .siblings("tr")
        .first()
        .within(() => {
          cy.contains("label", "Não").siblings("input").click();
        });
      cy.wait(500);
      cy.contains(
        "tr",
        "5 - Você está cumprindo quarentena por orientação médica ou dos órgãos de saúde?"
      )
        .siblings("tr")
        .first()
        .within(() => {
          cy.contains("label", "Sim").siblings("input").click();
        });
      cy.wait(500);
      cy.contains("label", "Recebi a dose de reforço")
        .siblings("input")
        .click();
      cy.get(FormsCovid.buttonConfirmar).click();
      cy.get(FormsCovid.buttonContinuar).click({ force: true });
    }
  });
});

Cypress.Commands.add("formularioCovid", () => {});
