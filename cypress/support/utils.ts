import * as yaml from 'js-yaml';

export const utilityFunctions = {
    launch:(url:string)=>{
        cy.visit(url)
    },
    isVisible:(selector: string) => {
        cy.get(selector).should('be.visible');

    },

    checkUrlContains:(path:string) => {
        cy.url().should('include',path);
    },
    clickElementBySelector:(selector:string)=>{
        cy.get(selector).should('be.visible').click();
    },
    clickElementText:(text:string)=>{
        cy.contains(text).should('be.visible').click();
    },
    enterText:(selector: string, inputText:string) => {
        cy.get(selector).should('be.visible').type(inputText);
    },
    getText:(selector:string) =>{
        return cy.get(selector).invoke('text').then((text)=> text.trim());
    },
    loadLocators: () => {
        return cy.readFile('cypress/fixtures/locators.yaml').then((fileContents) => {
          return yaml.load(fileContents);
        });
    }

}