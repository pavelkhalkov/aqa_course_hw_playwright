    import { test } from "fixtures";
    import path from "path";

    const authFile = path.resolve(process.cwd(), "src", ".auth", "user.json");

    // test("Login as Admin", async ({ page, loginUIService }) => {
    //   await loginUIService.loginAsAdmin();
    //   await page.context().storageState({ path: authFile });
    // });

    test("Login as Admin via API", async ({ page, loginApiService }) => {
    const token = await loginApiService.loginAsAdmin();
    await page.context().addCookies([
        {
        name: "Authorization",
        value: token,
        domain: "localhost",
        path: "/",
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
        },
    ]);
    await page.context().storageState({ path: authFile });
    });