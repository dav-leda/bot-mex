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

          browser.off('targetcreated', onTargetcreatedHandler) // unsubscribing

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
