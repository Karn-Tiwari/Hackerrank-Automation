const puppeteer = require("puppeteer")

const codeObj = require('./codes')

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'davidshout0111@gmail.com';
const password = 'David12345';

let browserOpen = puppeteer.launch({// puppeteer initialize hota hai iss launch function se

    headless:false, // iski wajah se visible hone lagega
    args: ['--start-maximized'],
    defaultViewport:null
})

let page

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab;
    let hackerrankOpenPromise = newTab.goto(loginLink)
    return hackerrankOpenPromise;
}).then(function(){
    let emailIsEntered = page.type("Input[id='input-1']", email,{delay:50})
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered = page.type("Input[type='password']", password,{delay:50})
    return passwordIsEntered;
}).then(function(){
    let loginButtonClicked = page.click('Button[data-analytics="LoginPassword"]',{delay:50})
    return loginButtonClicked;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]',page)
    return getToWarmUp;
 }).then(function(){//wait kar lega thodi daer uske baad kisi particular question pe click karega
    let waitfor5Seconds = page.waitForTimeout(5000)
    return waitfor5Seconds;
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})//$=>document.querySelector and $$=>document.querySelectorAll
    return allChallengesPromise;
}).then(function(questionArr){
    console.log('number of questions are',questionArr.length)// isse pata chelga kya hme wo sare k sare sawal mil gaye
    let questionWillBeSolved = questionSolver(page,questionArr[0],codeObj.answer[0]);
    return questionWillBeSolved;

})

// ye iseliye lagaya gaya hai ki agar koi page load hone me time le rha hai to load lene k baad hi element ko select karega aur phir selector pe click karega
function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
       let waitFotModalPromise =  cPage.waitForSelector(selector)
         waitFotModalPromise.then(function(){
            let clickModal = cPage.click(selector)
            return clickModal
         }).then(function(){
            resolve()
         }).catch(function(err){
            reject(err)
         })
    })    
}



function questionSolver(page,question,answer)//kis page pe hai konsa question hai aur uska answer kya hai yahi teen cheeze pass karni hogi
{
    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click()
         questionWillBeClicked.then(function(){
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs',page)// hamar cursor ab editor pe focus karna chahiye
            return EditorInFocusPromise;
         }).then(function(){
            return waitAndClick('.checkbox-input',page)//hamar checkbox click karna chahiye
         }).then(function(){
            return page.waitForSelector('textarea.custominput',page)
         }).then(function(){
            return page.type('textarea.custominput',answer,{delay:20})//hme ab answer type karana hai
         }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed;
         }).then(function(){
            let AIsPressed = page.keyboard.press('A',{delay:100})// select all from text area
            return AIsPressed;
         }).then(function(){
            let XIsPressed = page.keyboard.press('X',{delay:100})// all cut from text area
            return XIsPressed;
         }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')//control key ko dabaye rakna hai
            return ctrlIsUnPressed;
         }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs',page)//aur main editor me ake past karna hai
            return mainEditorInFocus;
         }).then(function(){
            ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed;
         }).then(function(){
            let AIsPressed = page.keyboard.press('A',{delay:100})
            return AIsPressed;
         }).then(function(){
            let VIsPressed = page.keyboard.press('V',{delay:100})
            return VIsPressed;
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed;
         }).then(function(){
            return page.click('.hr-monaco__run-code',{delay:100})// submit button ko select karna 
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}