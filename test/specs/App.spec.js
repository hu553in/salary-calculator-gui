import AppPage from '../pageobjects/App.page';

describe('App', () => {
  const appPage = new AppPage();
  const goodRequestRegExp =
    /\/calculate-salary\/a9978664-4d1d-40dd-81fa-d9026ef9485d$/;
  const badRequestRegExp = /\/calculate-salary\/0$/;
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
    expect(appPage.employeeIdInput).toHaveValue('');
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
      browser.expectRequest('GET', goodRequestRegExp, 200);
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue(
        'a9978664-4d1d-40dd-81fa-d9026ef9485d'
      );
      appPage.calculateButton.waitForEnabled();
      appPage.calculateButton.click();
      appPage.employeeSalaryLabel.waitForExist();
      appPage.employeeSalary.waitForExist();
      browser.assertRequests();
      expect(appPage.employeeSalary).toHaveValue(
        '39166.666666666664'
      );
    }
  );
  it(
    'should calculate salary ' +
    'via pressing "Enter" keyboard button',
    () => {
      appPage.open();
      browser.setupInterceptor();
      browser.expectRequest('GET', goodRequestRegExp, 200);
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue(
        'a9978664-4d1d-40dd-81fa-d9026ef9485d'
      );
      appPage.employeeIdInput.keys('Enter');
      appPage.employeeSalaryLabel.waitForExist();
      appPage.employeeSalary.waitForExist();
      browser.assertRequests();
      expect(appPage.employeeSalary).toHaveValue(
        '39166.666666666664'
      );
    }
  );
  it(
    'should output non-existent employee ID error ' +
    'via clicking "Calculate" button',
    () => {
      appPage.open();
      browser.setupInterceptor();
      browser.expectRequest('GET', badRequestRegExp, 422);
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue('0');
      appPage.calculateButton.waitForEnabled();
      appPage.calculateButton.click();
      appPage.errorsLabel.waitForExist();
      appPage.errors.waitForExist();
      browser.assertRequests();
      expect(appPage.errors).toHaveValue(
        'Unable to calculate salary because of: ' +
        'Unable to get employee by ID \'0\''
      );
    }
  );
  it(
    'should output non-existent employee ID error ' +
    'via pressing "Enter" keyboard button',
    () => {
      appPage.open();
      browser.setupInterceptor();
      browser.expectRequest('GET', badRequestRegExp, 422);
      appPage.employeeIdInput.waitForExist();
      appPage.employeeIdInput.setValue('0');
      appPage.employeeIdInput.keys('Enter');
      appPage.errorsLabel.waitForExist();
      appPage.errors.waitForExist();
      browser.assertRequests();
      expect(appPage.errors).toHaveValue(
        'Unable to calculate salary because of: ' +
        'Unable to get employee by ID \'0\''
      );
    }
  );
});
