export async function getNewTab(browser) {

  let resultPromise;

  async function onTargetcreatedHandler(target) {
    
    if (target.type() === 'page') {
      const newPage = await target.page()
      const newPagePromise = new Promise(y =>
        newPage.once('domcontentloaded', () => y(newPage))
      )

      const isPageLoaded = await newPage.evaluate(
        () => document.readyState
      )

      browser.off('targetcreated', onTargetcreatedHandler)

      return isPageLoaded.match('complete|interactive')
        ? resultPromise(newPage)
        : resultPromise(newPagePromise)
    }
  }

  return new Promise(resolve => {
    resultPromise = resolve
    browser.on('targetcreated', onTargetcreatedHandler)
  })
};


export const sleep = segs => new Promise(resolve => setTimeout(resolve, segs * 1000));

export async function countDown(secs) {
  for (let i=secs; i > 0; i--) {
    console.log(i)
    await sleep(1)
  }
  console.log('Ready')
}


export async function waitThenClick(target, selector) {

  try {
    await sleep(2)
    await target.waitForSelector(selector, {timeout: 9999})
    await target.click(selector)

  } catch (error) {
    console.log(error)
  }
};
