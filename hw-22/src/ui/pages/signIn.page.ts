import { ICredentials } from "types/signIn.types";
import { SalesPortalPage} from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.getByRole("button", { name: "Login" });

    uniqueElement = this.loginButton

async fillCredentials({ email, password }: ICredentials) {
    email && (await this.emailInput.fill(email));
    password && (await this.passwordInput.fill(password))
}

async clickLogin() {
    await this.loginButton.click()
}
}

