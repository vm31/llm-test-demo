"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./commands");
const addContext_1 = __importDefault(require("mochawesome/addContext"));
require("cypress-mochawesome-reporter/register");
Cypress.on('uncaught:exception', (err) => {
    console.error('Uncaught Exception:', err);
    if (err.message.includes('jQuery is not defined')) {
        return false;
    }
    return true;
});
Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const parentTitle = runnable.parent ? runnable.parent.title : 'Unknown Parent';
        const screenshotPath = `${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${parentTitle} -- ${test.title} (failed).png`;
        const context = {
            runnable: runnable,
            test: test
        };
        (0, addContext_1.default)(context, {
            title: 'Screenshot',
            value: screenshotPath
        });
    }
});
