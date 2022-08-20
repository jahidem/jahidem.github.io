const winList = ['About', 'Projects', 'Skills', 'Contact'];
winList.forEach((e) => {
  document.getElementById(e).style.display = 'none';
});

var nowDisplay = 1;

var nowBtn = document.querySelector('.' + winList[nowDisplay - 1]);
nowBtn.classList.add('focus-on');
document.getElementById(winList[nowDisplay - 1]).style.display = 'block';

const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    nowBtn = document.querySelector('.' + winList[nowDisplay - 1]);
    
    nowBtn.classList.remove('focus-on');
    document.getElementById(winList[nowDisplay - 1]).style.display = 'none';

    const styles = e.currentTarget.classList;
    if (styles.contains('About')) {
      nowDisplay = 1;
    } else if (styles.contains('Projects')) {
      nowDisplay = 2;
    } else if (styles.contains('Skills')) {
      nowDisplay = 3;
    } else if (styles.contains('Contact')) {
      nowDisplay = 4;
    }

    nowBtn = document.querySelector('.' + winList[nowDisplay - 1]);
    
    nowBtn.classList.add('focus-on');
    document.getElementById(winList[nowDisplay - 1]).style.display = 'block';
  });
});
