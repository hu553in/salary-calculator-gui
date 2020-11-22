describe('App', () => {
  beforeEach(() => browser.url('http://ui:3000'));
  it('should render page', () => {
    expect(browser).toHaveTitle('Salary calculator');
    expect($('#root')).toExist();
    expect(browser.react$('App')).toExist();
    expect($('.app')).toExist();
    expect($('.app__logo')).toExist();
    expect($('.app__heading')).toExist();
    expect($('.app__instructions')).toExist();
    expect($('.app__employeeIdInput')).toExist();
    expect($('.app__employeeIdInput')).toHaveValue('');
    expect($('.app__calculateButton')).toExist();
    expect($('.app__calculateButton')).toBeDisabled();
  });
  it(
    'should enable/disable "Calculate" button ' +
    'depending on employee ID input value',
    () => {
      expect($('.app__calculateButton')).toBeDisabled();
      $('.app__employeeIdInput').setValue('0');
      expect($('.app__calculateButton')).toBeEnabled();
      $('.app__employeeIdInput').setValue('');
      expect($('.app__calculateButton')).toBeDisabled();
    }
  );
  it(
    'should calculate salary via ' +
    'pressing "Calculate" button',
    () => {
      $('.app__employeeIdInput').setValue(
        'a9978664-4d1d-40dd-81fa-d9026ef9485d'
      );
      $('.app__calculateButton').click();
      $('.app__employeeSalaryLabel').waitForExist();
      $('.app__employeeSalary').waitForExist();
      expect($('.app__employeeSalary')).toHaveValue('39166.666666666664');
    }
  );
  it(
    'should calculate salary via ' +
    'pressing "Enter" button',
    () => {
      $('.app__employeeIdInput').setValue(
        'a9978664-4d1d-40dd-81fa-d9026ef9485d'
      );
      $('.app__employeeIdInput').keys('\uE007');
      $('.app__employeeSalaryLabel').waitForExist();
      $('.app__employeeSalary').waitForExist();
      expect($('.app__employeeSalary')).toHaveValue('39166.666666666664');
    }
  );
  it(
    'should output non-existent employee ID error ' +
    'via pressing "Calculate" button',
    () => {
      $('.app__employeeIdInput').setValue('0');
      $('.app__calculateButton').click();
      $('.app__errorsLabel').waitForExist();
      $('.app__errors').waitForExist();
      expect($('.app__errors')).toHaveValue(
        'Unable to calculate salary because of: ' +
        'Unable to get employee by ID \'0\''
      );
    }
  );
  it(
    'should output non-existent employee ID error ' +
    'via pressing "Enter" button',
    () => {
      $('.app__employeeIdInput').setValue('0');
      $('.app__employeeIdInput').keys('\uE007');
      $('.app__errorsLabel').waitForExist();
      $('.app__errors').waitForExist();
      expect($('.app__errors')).toHaveValue(
        'Unable to calculate salary because of: ' +
        'Unable to get employee by ID \'0\''
      );
    }
  );
});
