const puppeteer = require("puppeteer")

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
    console.log('number of questions are',questionArr.length)
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