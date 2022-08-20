const langs = ['c++', 'java', 'python', 'php', 'shell', 'matlab'];
nowShowing = 1;
const sta = document.getElementById(langs[0]);
sta.style.backgroundColor = '#fc7877';
sta.style.color = 'white';
setInterval(() => {
  const out = document.getElementById('chng-out');
  const imgCode = document.getElementById('code-box-img');
  const befo = document.getElementById(
    langs[(nowShowing - 1 + langs.length) % langs.length]
  );
  const nowR = document.getElementById(langs[nowShowing]);

  imgCode.style.opacity = 0;
  delay(300).then(() => {
    out.innerText = langs[nowShowing];
    const src = './src/images/' + langs[nowShowing] + '.png';
    imgCode.src = src;
    befo.style.backgroundColor = '#9fe2e7';
    befo.style.color = 'black';
    nowR.style.backgroundColor = '#fc7877';
    nowR.style.color = 'white';
    delay(500).then(() => {
      imgCode.style.opacity = 1;

      nowShowing = (nowShowing + 1) % langs.length;
    });
  });
}, 3500);

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
