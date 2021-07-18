describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('create order', async () => {
    await element(by.id('email')).tap();
    await element(by.id('email')).typeText('markoni@gmail.com');
    await element(by.id('password')).tap();
    await element(by.id('password')).typeText('markoni');
    await element(by.id('loginButton')).tap();

    await element(
      by.id('restaurant50a162b5-6c4e-4381-8d2d-2aea910ee8bb'),
    ).tap();

    await element(by.id('menuItem5f3a0ebc-5562-49fe-ac70-566e69e37406')).tap();

    await element(by.id('increaseQuantity')).tap();
    await element(by.id('additionalInfo')).tap();
    await element(by.id('additionalInfo')).typeText('No onion');
    await element(by.id('pressable')).tap();
    await element(by.id('addToOrder')).tap();

    await element(by.id('goToCheckout')).tap();

    await element(by.id('confirmOrder')).tap();

    expect(
      element(by.id('restaurant50a162b5-6c4e-4381-8d2d-2aea910ee8bb')),
    ).toBeVisible();
  });
});
