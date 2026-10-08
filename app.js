(() => {
'use strict';
const menuToggle=document.querySelector('.menu-toggle');
const menu=document.getElementById('mobile-menu');
const mobileContact=document.querySelector('.mobile-contact');
const hero=document.querySelector('.hero');
const contact=document.getElementById('contact');
const header=document.querySelector('.site-header');
const progress=document.querySelector('.reading-progress');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let heroVisible=true,contactVisible=false;
function syncContact(){const visible=window.innerWidth<=600&&!heroVisible&&!contactVisible&&menu.hidden;mobileContact.classList.toggle('visible',visible);mobileContact.setAttribute('aria-hidden',String(!visible));mobileContact.tabIndex=visible?0:-1;}
function closeMenu(){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','فتح القائمة');syncContact();}
menuToggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');syncContact();});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();menuToggle.focus();}});
window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu();syncContact();scheduleProgress();});
document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){
 const contactObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target===hero)heroVisible=entry.isIntersecting;if(entry.target===contact)contactVisible=entry.isIntersecting;}syncContact();});
 contactObserver.observe(hero);contactObserver.observe(contact);
 if(!reduceMotion.matches){
  const revealObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');entry.target.classList.add('reveal-visible');revealObserver.unobserve(entry.target);}}},{threshold:0,rootMargin:'0px 0px -18px 0px'});
  document.querySelectorAll('.section-heading,.project,.service-card,.education-panel,.skill-card,.about-intro,.experience-list,.contact-inner').forEach((el,i)=>{if(el.getBoundingClientRect().top>window.innerHeight){el.style.setProperty('--reveal-delay',`${el.classList.contains('service-card')?(i%3)*65:0}ms`);el.classList.add('reveal-pending');revealObserver.observe(el);}});
  reduceMotion.addEventListener('change',()=>{if(reduceMotion.matches){document.querySelectorAll('.reveal-pending').forEach(el=>el.classList.remove('reveal-pending'));revealObserver.disconnect();}});
 }
}
let pending=false;
function updateProgress(){pending=false;const max=document.documentElement.scrollHeight-window.innerHeight;const ratio=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;progress.style.transform=`scaleX(${ratio})`;header.classList.toggle('scrolled',window.scrollY>24);}
function scheduleProgress(){if(!pending){pending=true;requestAnimationFrame(updateProgress);}}
window.addEventListener('scroll',scheduleProgress,{passive:true});window.addEventListener('load',scheduleProgress);updateProgress();
document.querySelectorAll('.project details').forEach(details=>details.addEventListener('toggle',()=>{scheduleProgress();const content=details.querySelector('.project-detail');if(details.open&&!reduceMotion.matches&&content.animate)content.animate([{opacity:0,transform:'translateY(-6px)'},{opacity:1,transform:'none'}],{duration:220,easing:'ease-out'});}));
})();
