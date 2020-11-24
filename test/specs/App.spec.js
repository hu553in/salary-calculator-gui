import AppPage from '../page-objects/App.page';

describe('App', () => {
  const appPage = new AppPage();
  const calculateSalarySuccessRequestRegExp = /\/calculate-salary\/0$/;
  const calculateSalaryFailureRequestRegExp = /\/calculate-salary\/1$/;

  it('should render page', () => {
    appPage.open();
    expect(browser).toHaveTitle('Salary calculator');
    appPage.rootContainer.waitForExist();
    appPage.appReactComponent.waitForExist();
    appPage.appContainer.waitForExist();
    appPage.logo.waitForExist();
    appPage.heading.waitForExist();
    appPage.instructions.waitForExist();
    appPage.employeeIdInput.waitForExist();
    expect(appPage.employeeIdInput).toHaveText('');
    appPage.calculateButton.waitForExist();
    expect(appPage.calculateButton).toBeDisabled();
  });

  it(
    'should enable/disable "Calculate" button ' +
    'depending on employee ID input value emptiness',
    () => {
      appPage.open();
      appPage.employeeIdInput.waitForExist();
      appPage.calculateButton.waitForExist();
      expect(appPage.calculateButton).toBeDisabled();
      appPage.employeeIdInput.setValue('0');
      expect(appPage.calculateButton).toBeEnabled();
      appPage.employeeIdInput.keys('Backspace');
      expect(appPage.calculateButton).toBeDisabled();
    }
  );

  it(
    'should calculate salary ' +
    'via clicking "Calculate" button',
    () => {
      appPage.open();
      browser.setupInterceptor();
      browser.expectRequest('GET', calculateSalarySuccessRequestRegExp, 200);
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue('0');
      appPage.calculateButton.waitForClickable();
      appPage.calculateButton.click();
      appPage.employeeSalaryLabel.waitForExist();
      appPage.employeeSalary.waitForExist();
      browser.assertRequests();
      expect(appPage.employeeSalary).toHaveText('500');
    }
  );

  it(
    'should calculate salary ' +
    'via pressing "Enter" keyboard button',
    () => {
      appPage.open();
      browser.setupInterceptor();
      browser.expectRequest('GET', calculateSalarySuccessRequestRegExp, 200);
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue('0');
      appPage.employeeIdInput.keys('Enter');
      appPage.employeeSalaryLabel.waitForExist();
      appPage.employeeSalary.waitForExist();
      browser.assertRequests();
      expect(appPage.employeeSalary).toHaveText('500');
    }
  );

  it(
    'should output non-existent employee ID error ' +
    'via clicking "Calculate" button',
    () => {
      appPage.open();
      browser.setupInterceptor();
      browser.expectRequest('GET', calculateSalaryFailureRequestRegExp, 422);
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue('1');
      appPage.calculateButton.waitForClickable();
      appPage.calculateButton.click();
      appPage.errorsLabel.waitForExist();
      appPage.errors.waitForExist();
      browser.assertRequests();
      expect(appPage.errors).toHaveText(
        'Unable to calculate salary because of: ' +
        'Unable to get employee by ID \'1\''
      );
    }
  );

  it(
    'should output non-existent employee ID error ' +
    'via pressing "Enter" keyboard button',
    () => {
      appPage.open();
      browser.setupInterceptor();
      browser.expectRequest('GET', calculateSalaryFailureRequestRegExp, 422);
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue('1');
      appPage.employeeIdInput.keys('Enter');
      appPage.errorsLabel.waitForExist();
      appPage.errors.waitForExist();
      browser.assertRequests();
      expect(appPage.errors).toHaveText(
        'Unable to calculate salary because of: ' +
        'Unable to get employee by ID \'1\''
      );
    }
  );

  it(
    'should hide non-existent employee ID error ' +
    'after changing employee ID input value',
    () => {
      appPage.open();
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue('1');
      appPage.calculateButton.waitForClickable();
      appPage.calculateButton.click();
      appPage.errorsLabel.waitForExist();
      appPage.errors.waitForExist();
      appPage.employeeIdInput.addValue('1');
      appPage.errorsLabel.waitForExist({ reverse: true });
      appPage.errors.waitForExist({ reverse: true });
    }
  );
});
