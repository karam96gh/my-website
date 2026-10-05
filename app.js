const menuToggle=document.querySelector('.menu-toggle');
const menu=document.getElementById('mobile-menu');
function closeMenu(){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','فتح القائمة');syncContact();}
menuToggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();menuToggle.focus();}});
const mobileContact=document.querySelector('.mobile-contact');
const hero=document.querySelector('.hero');
const contact=document.getElementById('contact');
let heroVisible=true,contactVisible=false;
function syncContact(){const visible=window.innerWidth<=600&&!heroVisible&&!contactVisible&&menu.hidden;mobileContact.classList.toggle('visible',visible);mobileContact.setAttribute('aria-hidden',String(!visible));mobileContact.tabIndex=visible?0:-1;}
window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu();syncContact();});
menuToggle.addEventListener('click',syncContact);
menu.addEventListener('click',syncContact);
document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target===hero)heroVisible=entry.isIntersecting;if(entry.target===contact)contactVisible=entry.isIntersecting;}syncContact();});observer.observe(hero);observer.observe(contact);}
