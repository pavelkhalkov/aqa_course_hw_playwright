/* 
Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные test@gmail.com / 12345678 при этом:
 - дождаться исчезновения спиннеров
 - проверить действительно ли пользователь с логином Anatoly вошел в систему
 - Проверить скриншотом боковое навигационное меню с выбранной страницей Home (optional)
*/

import { test, expect } from "@playwright/test"

interface ICredentials {
    username: string,
    password: string
}

test.describe.only('[UI] Login page', ()=> {

    const validCredentials: ICredentials = {
        username: 'test@gmail.com',
        password: '12345678'
    }

    enum TEXT {
        HOME_TEXT = 'Welcome to Sales Management Portal',
        FIRST_NAME = "Anatoly"
    }

    test('Should regestration witch valid credentials', async ({ page }) => {
        const URL = 'https://anatoly-karpovich.github.io/aqa-course-project/#'
        const userInput = page.locator("//input[@id='emailinput']")
        const passwordInput = page.locator("//input[@id='passwordinput']")
        const loginButton = page.locator(".loginBtn")
        const mainTitle = page.locator('//h1[@class="display-4 welcome-text"]')
        const navBar = page.locator("#user-menu-button")
        const managerDetails = page.locator("#manager-firstname")
        
        await page.goto(URL)
        await userInput.fill(validCredentials.username)
        await passwordInput.fill(validCredentials.password)
        await loginButton.click()
        await page.waitForLoadState('load')
        await expect(mainTitle).toHaveText(TEXT.HOME_TEXT)
        await navBar.click()
        await expect(managerDetails).toHaveText(TEXT.FIRST_NAME)
    })
})


