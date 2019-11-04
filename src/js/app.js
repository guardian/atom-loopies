import loadJson from '../components/load-json/'

// js code here

startAtom();

function startAtom() {
  hideAtom();
  let sheetLink = getSheetLink();
  processLoopies(sheetLink);
}

function processLoopies(jsonUrl) {
  loadJson(jsonUrl)
    .then((data) => {
      var loopies = data.sheets[Object.keys(data.sheets)[0]];
      let parentDoc = window.parent.document;
      loopies.forEach(function (loop) {
        let loopEl = parentDoc.querySelector('[data-media-id="' + loop['Photo ID'] + '"]');
        createLoop(loopEl, loop['Video'])
      })
    });
}

function createLoop(el, url) {
  console.log(el, url)
  let vidWrapper = document.createElement('div');
  vidWrapper.classList.add('loop')
  vidWrapper.innerHTML = '<video style="position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;" class="fig-vid" autoplay="autoplay" webkit-playsinline="true" muted="muted" playsinline="true" preload="auto" loop="loop"><source src="' + url + '"></video>';
  el.appendChild(vidWrapper);
  el.classList.add('has-loop');
}

function hideAtom() {
  let sheetUrl = false;

  let parentDoc = window.parent.document;
  let allAtoms = parentDoc.querySelectorAll('.element-atom');
  allAtoms.forEach(function (a) {
    if (a.querySelector('iframe')) {
      let iBody = a.querySelector('iframe').contentDocument.body;
      let iBodyText = iBody.innerText;
      if (iBodyText.indexOf('Looping videosz') >= 0) {
        a.classList.add('element-atom-hidden');
      }
    }
  });

  let hideStyles = document.createElement('style');
  hideStyles.innerHTML = '.element-atom-hidden{display:none!important;}';
  parentDoc.body.appendChild(hideStyles);
  console.log(hideStyles);
}

function getSheetLink() {
  let sheetLink = false;

  let parentDoc = window.parent.document;
  let articleText = parentDoc.querySelectorAll('.element-embed iframe');
  articleText.forEach(function (iframeEl) {
    let iframeDoc = iframeEl.contentWindow.document;
    if (iframeDoc.querySelector('#video-loops-json') != null) {
      sheetLink = iframeDoc.querySelector('#video-loops-json').innerText.trim();
      iframeEl.classList.add('element-atom-hidden');
    }
  });

  return sheetLink;
}
