// Bu dosyada her test kendine ait bir `page` nesnesi kullanır.
// Test fonksiyonları `async ({ page }) =>` yapısı ile yazıldığı için Playwright
// her test için ayrı bir tarayıcı sekmesi (page) açar.
// Bu testler birbirinden tamamen izole olur ,birbirinden bağımsız çalışır
// ve paralel çalıştırmaya uygundur.
import { test, expect } from '@playwright/test';

test('User can sign in', async ({ page }) => {
  await page.goto('https://whenwise.agileway.net')
  //await page.getByRole('link', { name: 'Sign in' }).click();
  await page.locator('text=Sign in').click();
  //await page.fill("#email","driving@biz.com")
  await page.getByLabel('email').fill('driving@biz.com')
  await page.fill("#password","test01")
  //await page.getByLabel('Password').fill('test01')
  //await page.getByRole('button', { name: 'Sign in' }).click();
  await page.click('#login-btn')
  //await page.click('text=Sign in')  3 tane match ediyor, ilkine tıklıyor-bize lazım olan o buton değil
  await new Promise(resolve => setTimeout(resolve, 3 * 1000))
});
test('User can sign in failed: password invalid entered', async ({ page }) => {
  await page.goto('https://whenwise.agileway.net');
  await page.locator('text=SIGN IN').click();
  await page.fill("#email", "driving@biz.com");
  await page.fill("#password", "wrongpass");
  await page.click("#login-btn");
  const pageText = await page.textContent("body");
  expect(pageText).toContain("Password/email is invalid");  
});