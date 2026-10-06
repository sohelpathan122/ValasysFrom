import test, { expect } from "@playwright/test";
import { formpage } from "../pages/formpage";

test.beforeEach(async({page})=>{
    await page.goto("/estimate")
})

test("TC_01 ,Verify Crrating Valasys from with valid data",async({page})=>
{
    const fp=new formpage(page);

   

  await fp.enterClinetName("Jhon")
  await fp.enterProposalName("CEO of Google")
 await  fp.uploadImage("C:\\Users\\Admin\\Downloads\\TestImage.jpg")

  await fp.selectAccountSetup()
   await fp.enterAmount1("20000")
  await fp.enterStatement1("one time password")

   await fp.selectDesigning()
  await fp.enterAmount2("30000")
  await fp.enterStatement2("Mutlti time password");
  await fp.enterExpectedResult("Hi I am QA Engineer")
  await fp.addNotesText("It will generate pdf");


  const newTab=page.waitForEvent("popup")
   await fp.clickSubmit();

const pdfUrl=(await newTab);
await pdfUrl.waitForLoadState();

await expect(pdfUrl).toHaveURL(/Generated-PDF/)

  
 
   

}

)
test("TC_02, Verify Quation Ui Element",async({page})=>
    {
           const fp=new formpage(page);
          
           await expect(fp.clientName).toBeVisible()
           await expect(fp.proposalName).toBeVisible()
           await expect(fp.image).toBeVisible()
           await expect(fp.accountSetup).toBeVisible()
           await expect(fp.designing).toBeVisible()
           await expect(fp.expectedResult).toBeVisible()
           await expect(fp.addNote).toBeVisible()
           await expect(fp.submitButton).toBeVisible()
})

test("TC_03, Verify That Valssy form user can enter and deatils and its visible",async({page})=>
{
      
      const fp=new formpage(page);
      await fp.enterClinetName("Jhon")
      await fp.enterProposalName("I am ceo of google")
      
      console.log(await fp.clientName.inputValue())
      console.log(await fp.proposalName.inputValue())
      await expect(fp.clientName).toHaveValue("Jhon")
      await expect(fp.proposalName).toHaveValue("I am ceo of google")

})

test("TC_04, Verify Upload Image",async({page})=>{
   
    const fp=new formpage(page);
    await fp.uploadImage("C:\\Users\\Admin\\Downloads\\TestImage.jpg")
    const path=await fp.image.inputValue()
    await expect(path).toContain("TestImage.jpg")
})

test("TC_05,Verify Account Setup and Desining Checkbox",async({page})=>
    {
        const fp=new formpage(page);

        await fp.selectAccountSetup();
        await fp.selectDesigning();

        await expect(fp.accountSetup).toBeChecked();
         await expect(fp.designing).toBeChecked()

})
test("TC_06,Verify Amount and Statment in Amount Setup and Designing can be entered and retained",async({page})=>{
       const fp=new formpage(page);

        await fp.selectAccountSetup();
        await fp.enterAmount1("3000")
        await fp.enterStatement1("One Time Password")

        await fp.selectDesigning();
        await fp.enterAmount2("4000")
        await fp.enterStatement2("Multi Time Password")

        await expect(fp.amount1).toHaveValue("3000")
        await expect(fp.statement1).toHaveValue("One Time Password")

        console.log(await fp.amount1.inputValue())
         await expect(fp.amount2).toHaveValue("4000")
        await expect(fp.statement2).toHaveValue("Multi Time Password")

})
test("TC_07,Verify Boundry of Amount and Statement",async({page})=>{
    const fp=new formpage(page);
    
    await fp.selectAccountSetup;

    await fp.enterAmount1("2000")
    await expect(fp.amount1).toHaveValue("2000")

    await fp.enterAmount1("000")
    await expect(fp.amount1).toHaveValue("000")

    await fp.enterAmount1("2000.50")
    await expect(fp.amount1).not.toHaveValue("2000.50")

    await fp.enterAmount1("-2000")
    await expect(fp.amount1).not.toHaveValue("-2000")

    await fp.enterAmount1("*$$$")
    await expect(fp.amount1).not.toHaveValue("*$$$")



})
test("TC_08,Verify From Without Selecting Services",async({page})=>
    {
       const fp=new formpage(page);
       await fp.enterClinetName("sp")
       await fp.enterProposalName("CEO of Automation Testing")
       await fp.uploadImage("C:\\Users\\Admin\\Downloads\\TestImage.jpg")
       await fp.clickSubmit()
       console.log(await fp.addServiceerror.innerText())
       await expect(fp.addServiceerror).toBeVisible();
})
test("TC_09,Verify Empty Client Name Error Msg",async({page})=>{
      const fp=new formpage(page);
      
       await fp.enterProposalName("CEO of Automation Testing")
       await fp.uploadImage("C:\\Users\\Admin\\Downloads\\TestImage.jpg")
       await fp.clickSubmit()
        console.log(await fp.error.innerText())
       await expect(fp.error).toBeVisible();
})
test("TC_10,Verify Empty CEO Name",async({page})=>{
      const fp=new formpage(page);
       await fp.enterClinetName("sp")
       await fp.enterProposalName("")
       await fp.uploadImage("C:\\Users\\Admin\\Downloads\\TestImage.jpg")
       await fp.clickSubmit()
       console.log(await fp.error.innerText())
       await expect(fp.error).toBeVisible();
})
test("TC_11,Verify Empty Client Name Error Msg",async({page})=>{
    
      const fp=new formpage(page);
       await fp.enterClinetName("sp")
       await fp.enterProposalName("CEO of Automation Testing")
       await fp.clickSubmit()
        console.log(await fp.error.innerText())
       await expect(fp.error).toBeVisible();
})