import './commands';
import addContext from 'mochawesome/addContext';
import 'cypress-mochawesome-reporter/register';


Cypress.on('uncaught:exception', (err: Error) => {
  console.error('Uncaught Exception:', err);
  if (err.message.includes('jQuery is not defined')) {
    return false;
  }
  return true; 
});


Cypress.on('test:after:run', (test: Mocha.Test, runnable: Mocha.Runnable) => {
  if (test.state === 'failed') {
    const parentTitle = runnable.parent ? runnable.parent.title : 'Unknown Parent';
    const screenshotPath = `${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${parentTitle} -- ${test.title} (failed).png`;

    const context = {
      runnable: runnable,
      test: test
    };

    addContext(context as unknown as Mocha.Context, {
      title: 'Screenshot',
      value: screenshotPath
    });
  }
});
