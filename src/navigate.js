const winList = ['About', 'Projects', 'Skills', 'Contact'];
var nowDisplay = 1;

winList.forEach((e)=> document.getElementById(e).style.display = 'none');
winList.forEach((e)=> document.querySelector('.'+e).style.color= "#1693b3");
    document.getElementById(winList[nowDisplay - 1]).style.display = 'block';
    document.querySelector('.'+winList[nowDisplay-1]).style.color = 'black';
const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
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

    winList.forEach((e)=> document.getElementById(e).style.display = 'none');
    winList.forEach((e)=> document.querySelector('.'+e).style.color= "#1693b3");
    document.getElementById(winList[nowDisplay - 1]).style.display = 'block';
    document.querySelector('.'+winList[nowDisplay-1]).style.color = 'black';
  });
});
