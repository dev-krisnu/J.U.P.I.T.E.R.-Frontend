/* BCRP — dynamics: logo loader + curtain page transitions, hero slider, reveal, counters, 3D tilt, magnetic buttons, progress bar, login UX */
(()=>{const $=(s,c=document)=>[...c.querySelectorAll(s)],L=document.getElementById('loader'),T=performance.now();
// Loader: full logo build on first visit, shorter on later pages
const first=!sessionStorage.getItem('bcrp'),min=first?2000:1100;sessionStorage.setItem('bcrp',1);
addEventListener('load',()=>setTimeout(()=>{L.className='out';setTimeout(()=>L.classList.add('off'),1300)},Math.max(0,min-(performance.now()-T))));
addEventListener('pageshow',e=>{if(e.persisted)L.className='off'});
// Curtain transition on internal links
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||e.metaKey||e.ctrlKey)return;const u=new URL(a.href,location);
if(u.origin!==location.origin||u.pathname===location.pathname)return;e.preventDefault();L.className='cover';setTimeout(()=>location.href=a.href,950)});
// Header, progress, parallax
const nav=$('.nav')[0],pg=$('#prog')[0];addEventListener('scroll',()=>{nav&&nav.classList.toggle('sc',scrollY>40);pg.style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'},{passive:true});
const bg=$('.burger')[0];if(bg)bg.onclick=()=>$('.menu')[0].classList.toggle('open');
// Reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');if(t.dataset.count)cnt(t);io.unobserve(t)}),{threshold:.15});
$('.rv,[data-count]').forEach((el,i)=>{el.style.setProperty('--d',(i%4)*.09+'s');io.observe(el)});
function cnt(el){const n=+el.dataset.count,s=el.dataset.s||'',t0=performance.now();(function f(t){const p=Math.min((t-t0)/1800,1);el.textContent=Math.round(n*(1-Math.pow(1-p,4)))+s;p<1&&requestAnimationFrame(f)})(t0)}
// Hero slider (auto, dots, arrows) + mouse parallax on floating shapes
const sl=$('.sl'),dots=$('.dots')[0];if(sl.length){let i=0,tm;sl.forEach((_,k)=>{const d=document.createElement('i');d.onclick=()=>go(k);dots.append(d)});
function go(n){i=(n+sl.length)%sl.length;sl.forEach((s,k)=>s.classList.toggle('on',k==i));$('i',dots).forEach((d,k)=>d.classList.toggle('on',k==i));clearInterval(tm);tm=setInterval(()=>go(i+1),6500)}
go(0);$('.arr.l')[0].onclick=()=>go(i-1);$('.arr.r')[0].onclick=()=>go(i+1);
$('.hero')[0].addEventListener('mousemove',e=>$('.shape').forEach((s,k)=>s.style.translate=`${(e.clientX/innerWidth-.5)*(k?-50:40)}px ${(e.clientY/innerHeight-.5)*30}px`))}
// 3D tilt on cards + magnetic buttons
$('.card,.q').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*9}deg) rotateX(${-y*9}deg) translateY(-6px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
$('.btn,.login').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.25}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
// Login page: role tabs, show/hide password, validation (backend hook: dispatches 'bcrp:login')
const f=$('#lf')[0];if(f){$('.tabs button').forEach(b=>b.onclick=()=>{$('.tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');f.dataset.role=b.dataset.r;$('#idl')[0].textContent=b.dataset.l});
$('.pw button')[0].onclick=e=>{e.preventDefault();const p=$('#pw')[0];p.type=p.type=='password'?'text':'password'};
f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));if(!d.id||!d.pw){f.parentNode.classList.remove('shake');void f.offsetWidth;f.parentNode.classList.add('shake');return}
dispatchEvent(new CustomEvent('bcrp:login',{detail:{role:f.dataset.role,...d}}))}}
})();
