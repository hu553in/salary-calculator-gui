export default class AppPage {
  open() {
    browser.url('http://ui:3000');
  }

  get rootContainer() {
    return $('#root');
  }

  get appReactComponent() {
    return browser.react$('App');
  }

  get appContainer() {
    return $('.app');
  }

  get logo() {
    return $('.app__logo');
  }

  get heading() {
    return $('.app__heading')
  }

  get instructions() {
    return $('.app__instructions');
  }

  get employeeIdInput() {
    return $('.app__employeeIdInput');
  }

  get calculateButton() {
    return $('.app__calculateButton');
  }

  get employeeSalaryLabel() {
    return $('.app__employeeSalaryLabel');
  }

  get employeeSalary() {
    return $('.app__employeeSalary');
  }

  get errorsLabel() {
    return $('.app__errorsLabel');
  }

  get errors() {
    return $('.app__errors');
  }
}
