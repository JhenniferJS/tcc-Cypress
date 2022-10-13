/// <reference types="cypress"/>
import dadosBancarios from "../fixtures/dadosBancarios";
import { PortalElements } from "../support/elements/portal.elements";

describe("Portal do Aluno", function () {
  beforeEach(function () {
    cy.login();
  });

  it("Histórico academico", function () {
    cy.get(PortalElements.telaPrincipal).contains("a", "Histórico").click();
    cy.contains("th", "Sigla").should("be.visible");
    cy.contains("th", "Descrição da Disciplina").should("be.visible");
    cy.contains("th", "Nota").should("be.visible");
    cy.contains("th", "Ano/Semestre").should("be.visible");
  });

  it("Atividades complementares", function () {
    cy.get(PortalElements.telaPrincipal)
      .contains("a", "Atividades Complementares")
      .click();
    cy.contains(
      "span",
      "Você não está matriculado em turmas que possuem atividades complementares !!!"
    ).should("be.visible");
  });

  it("Pedidos (notas)", function () {
    cy.get(PortalElements.telaPrincipal)
      .contains("a", "Pedidos (Notas)")
      .click();
    cy.contains(
      "span",
      "Não existem pedidos de notas a serem solicitados !!!"
    ).should("be.visible");
  });

  it("Consulta de pedidos", function () {
    cy.get(PortalElements.telaPrincipal)
      .contains("a", "Consulta de Pedidos (Notas)")
      .click();
    cy.contains(
      "span",
      "Não existem Pedidos referentes à Notas a serem consultados."
    ).should("be.visible");
  });

  it("Requerimentos", function () {
    cy.get(PortalElements.telaPrincipal).contains("a", "Requerimentos").click();
    cy.get(PortalElements.selectRequerimentos).select(
      "Requerimento de Desistência de Disciplinas"
    );
    cy.get(PortalElements.inputDesistenciaDisciplina).should("be.visible");
    cy.get(PortalElements.selectRequerimentos).select(
      "Requerimento de Pedido de PVS"
    );
    cy.get(PortalElements.inputPedidoPvs).should("be.visible");
  });

  it("Nota de estágio", function () {
    cy.get(PortalElements.telaPrincipal)
      .contains("a", "Nota de Estágio")
      .click();
    cy.contains("th", "Sigla").should("be.visible");
    cy.contains("th", "Descrição da Disciplina").should("be.visible");
    cy.contains("th", "Nota").should("be.visible");
    cy.contains("th", "Ano/Semestre").should("be.visible");
    cy.contains("td", "Estágio Supervisionado").should("be.visible");
  });

  it("Quadro de Pré/Co-Requisitos", function () {
    cy.get(PortalElements.telaPrincipal)
      .contains("a", "Quadro de Pré/Co-Requisitos")
      .click();
    cy.contains("td", "Total de Créditos Aprovados").should("be.visible");
    cy.contains("td", "Total de Créditos Matriculados").should("be.visible");
    for (let i = 1; i <= 10; i++) {
      cy.contains("b", `P${i}`).should("be.visible");
    }
  });

  it("Tesouraria", function () {
    const dados = dadosBancarios.data();

    cy.get(PortalElements.telaPrincipal).contains("a", "Tesouraria").click();
    cy.contains("span", "Dados Bancários para Pagamento").should("be.visible");
    cy.contains("span", "Débitos").should("be.visible");
    cy.contains("span", "Créditos e Devoluções").should("be.visible");

    cy.contains("td", "Agência:")
      .siblings("td")
      .should("contain.text", dados.agencia);
    cy.contains("td", "Conta Corrente:")
      .siblings("td")
      .should("contain.text", dados.conta);
    cy.contains("td", "Titular:")
      .siblings("td")
      .should("contain.text", dados.titular);
    cy.contains("td", "Identificador Bancário:")
      .siblings("td")
      .should("contain.text", dados.idBancario);
    cy.contains("td", "Chave Pix (CNPJ):")
      .siblings("td")
      .should("contain.text", dados.pix);

    cy.contains("th", "Histórico").should("be.visible");
    cy.contains("th", "Vencimento").should("be.visible");
    cy.contains("th", "Valor").should("be.visible");
    cy.contains("th", "Multa").should("be.visible");
    cy.contains("th", "Correção").should("be.visible");
    cy.contains("th", "Juros").should("be.visible");
    cy.contains("th", "Total").should("be.visible");
  });
});
