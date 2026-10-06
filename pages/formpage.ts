import { Locator, Page } from "@playwright/test";


export class formpage
{
    readonly page:Page;
    readonly clientName:Locator;
     readonly proposalName: Locator;
    readonly image: Locator;
    readonly accountSetup: Locator;
    readonly designing: Locator;
    readonly submitButton: Locator;
    readonly amount1:Locator;
    readonly statement1:Locator;
    readonly amount2:Locator;
    readonly statement2:Locator;
    readonly expectedResult:Locator;
    readonly addNote:Locator;
     readonly addNoteInput:Locator;
     readonly excpectedResult:Locator;
      readonly error:Locator;
      readonly addServiceerror:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.clientName=page.locator("#clientName")
        this.proposalName=page.locator("#proposalName")
        this.image=page.locator("#image")
        this.accountSetup=page.locator("#account_setup")
        this.designing=page.locator("#designing_ad")
        this.submitButton=page.locator("#submit")
        this.amount1=page.getByPlaceholder("Enter Amount").first()
         this.amount2=page.getByPlaceholder("Enter Amount").nth(1)
        this.statement1=page.getByPlaceholder("eg. One time Charge").first()
        this.statement2=page.getByPlaceholder("eg. One time Charge").nth(1);
        this.expectedResult=page.frameLocator("iframe[title='Rich Text Editor, editor1']")
                                     .locator("body[contenteditable='true']")
        this.addNote=page.locator("#add_notes");
        this.addNoteInput=page.locator("#add_notes_input");
        this.excpectedResult=page.frameLocator("//iframe[contains(@title,'Rich Text')]").locator("//body[@contenteditable='true']");
        this.error=page.locator("//div[contains(text(),'All field')]")
        this.addServiceerror=page.locator("//div[contains(text(),'Please Add')]")


    }

    async enterClinetName(name:string)
    {
        await this.clientName.fill(name);
    }
    async enterProposalName(proposal: string) {
    await this.proposalName.fill(proposal);
}

async uploadImage(filePath: string) {
    await this.image.setInputFiles(filePath);
}

async selectAccountSetup() {
    await this.accountSetup.scrollIntoViewIfNeeded()
    await this.accountSetup.click({force:true})
}

async selectDesigning() {
    await this.designing.scrollIntoViewIfNeeded()
    await this.designing.click({force:true})
}

async enterAmount1(amount: string) {
    await this.amount1.fill(amount);
}

async enterStatement1(statement: string) {
    await this.statement1.fill(statement);
}

async enterAmount2(amount: string) {
    await this.amount2.fill(amount);
}

async enterStatement2(statement: string) {
    await this.statement2.fill(statement);
}

async addNotesText(notes: string) {
    await this.addNote.scrollIntoViewIfNeeded();
    await this.addNote.click({force:true})
    await this.addNoteInput.fill(notes);
}

async clickSubmit() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
}
async enterExpectedResult(text:string)
{
    await this.excpectedResult.fill(text)
}
}

