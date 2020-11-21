describe('Salary calculator', () => {
  it('should render page', async () => {
      await browser.url('http://ui:3000');
      await expect(browser).toHaveTitle('Salary calculator');
      await expect($('#root')).toBeExisting();
      await expect($('.app')).toBeExisting();
      await expect($('.app__logo')).toBeExisting();
      await expect($('.app__heading')).toBeExisting();
      await expect($('.app__instructions')).toBeExisting();
      await expect($('.app__employeeIdInput')).toBeExisting();
      await expect($('.app__employeeIdInput')).toHaveValue('');
      await expect($('.app__calculateButton')).toBeExisting();
      await expect($('.app__calculateButton')).toHaveAttr('disabled');
  });
});
