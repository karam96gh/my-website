const menuButton=document.querySelector('.menu-button');
const menu=document.getElementById('mobile-menu');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','فتح قائمة التنقل');}
menuButton.addEventListener('click',()=>{const opening=menu.hidden;menu.hidden=!opening;menuButton.setAttribute('aria-expanded',String(opening));menuButton.setAttribute('aria-label',opening?'إغلاق قائمة التنقل':'فتح قائمة التنقل');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu();});
document.getElementById('year').textContent=new Date().getFullYear();
const contactButton=document.querySelector('.mobile-contact');
const hero=document.querySelector('.hero');
const contact=document.getElementById('contact');
let heroVisible=true,contactVisible=false;
function updateContact(){contactButton.classList.toggle('visible',!heroVisible&&!contactVisible);}
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.target===hero)heroVisible=entry.isIntersecting;if(entry.target===contact)contactVisible=entry.isIntersecting;});updateContact();}).observe(hero);new IntersectionObserver(entries=>{contactVisible=entries[0].isIntersecting;updateContact();}).observe(contact);}
