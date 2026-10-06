import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { lessons, lessonHref } from '../src/data/course';

test('the full curriculum opens real lesson pages and preserves next/previous navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Expand all' }).click();
  await expect(page.locator('.module[open]')).toHaveCount(5);
  await expect(page.locator('.lesson-link:visible')).toHaveCount(14);
  for (const lesson of lessons) {
    const response = await page.goto(lessonHref(lesson));
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: lesson.title, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'This lesson is brewing.' })).toBeVisible();
    await expect(page.locator('[aria-current="page"]')).toHaveAttribute('href', lessonHref(lesson));
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Start learning', exact: true }).click();
  await expect(page).toHaveURL(/why-bother/);
  await page.getByRole('link', { name: 'Next lesson' }).click();
  await expect(page).toHaveURL(/what-you-have-what-you-owe/);
  await page.getByRole('link', { name: 'Previous lesson' }).click();
  await expect(page).toHaveURL(/why-bother/);
});

for (const width of [320, 375, 414, 768, 1280, 1440]) {
  test(`responsive layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/lessons/debit-and-credit/']) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => Promise.all(Array.from(document.images).map(image => {
        image.loading = 'eager';
        return image.decode();
      })));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const brokenImages = await page.evaluate(() => Array.from(document.images).filter(image => !image.complete || !image.naturalWidth).length);
      expect(brokenImages).toBe(0);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(result.violations).toEqual([]);
      await page.screenshot({ path: `test-results/${path === '/' ? 'home' : 'player'}-${width}.png`, fullPage: true });
    }
  });
}

test('keyboard and reduced-motion users can explore chapters', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const chapter = page.locator('#making-money summary');
  await chapter.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#making-money')).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '04 Making Money Open lesson' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/lessons\/making-money/);
});

test('lesson discovery works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await page.locator('#reading-story summary').click();
  await page.getByRole('link', { name: /14 Where Did the Money Go/ }).click();
  await expect(page.getByRole('heading', { name: 'Where Did the Money Go?', exact: true })).toBeVisible();
  await context.close();
});
