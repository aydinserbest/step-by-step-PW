// Bu dosyada testler aynı `page` nesnesini paylaşır.
// `let page` dışarıda tanımlanmış ve `beforeAll()` içinde sadece 1 kez oluşturulmuştur.
// Bu yüzden testler arasında page nesnesi aynıdır → **paralel çalıştırılamaz**!
// Bu nedenle `test.describe.configure({ mode: 'serial' })` ile sırayla çalıştırma zorunludur.
// Eğerilk testte  sign-out yapılmazsa bir testin sonucu diğerini etkileyebilir.

import { test, Page, expect } from '@playwright/test';
import { Helper } from '../page-objects/Helper';
test.describe.configure({ mode: 'serial' }); // testler sırayla çalışır

let page: Page;
let helper: Helper;
test.beforeAll(async ({ browser }) => {
  // Sadece bir kez page oluşturuluyor
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach(async () => {
  await page.goto('https://whenwise.agileway.net');
  await page.locator('text=SIGN IN').click();
  helper = new Helper(page); // her testten önce helper hazır
});

test('User can sign in OK', async () => {
  await helper.login("driving@biz.com", "test01");
  const pageText = await page.textContent("body");
  expect(pageText).toContain("You have signed in successfully");

  // shared page kullanıldığı için, sonraki test etkilenmesin diye logout zorunludur!
  await page.goto('https://whenwise.agileway.net/sign-out');
});

test('User can sign in failed: wrong password', async () => {
  await helper.login("driving@biz.com", "wrongpass");
  const pageText = await page.textContent("body");
  expect(pageText).toContain("Password/email is invalid");
});