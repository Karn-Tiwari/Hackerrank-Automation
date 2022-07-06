const puppeteer = require('puppeteer');
let link = 'https://www.youtube.com/playlist?list=PLW-S5oymMexXTgRyT3BWVt_y608nt85Uj'
let cTtab
(async function(){
    try{
        let browserOpen=await puppeteer.launch({// puppeteer initialize hota hai iss launch function se
            headless:false, // iski wajah se visible hone lagega
            args: ['--start-maximized'],
            defaultViewport:null
        })
        let browserInstance = await browserOpen
        let addTabsArr = await browserInstance.pages()
        cTtab = addTabsArr[0]
        await cTtab.goto(link)
        await cTtab.waitForSelector('h1#title')
        // is evaluate me function pass kar sakte hai ya iss function ka argument pass kar satke hai
        let name = await cTtab.evaluate(function(select){return document.querySelector(select).innerText},'h1#title')//evalutate=>This method runs document.querySelector within the page and passes the result as the first argument to the pageFunction.
        console.log(name)


        let allData = await cTtab.evaluate(getData,'#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer')
            console.log(name,allData.noOfVideos,allData.noOfViews)
    
    }catch(err){
    }

})();


function getData(){
    let allElems = document.querySelectorAll(selector)
    let noOfVideos = allElems[0].innerText
    let noOfViews = allElems[1].innerText


return{
noOfVideos,
noOfViews
}
}

