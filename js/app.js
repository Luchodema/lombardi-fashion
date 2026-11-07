
/* ============ datos base ============ */
const COLORES = {
  'negro':'#1d1d1f','blanco':'#f4f4f2','gris':'#9b9ba0','gris oscuro':'#4a4a50','beige':'#d6c2a3','camel':'#b98a57','marrón':'#6b4430','crema':'#efe6d2',
  'azul marino':'#1f2a44','denim':'#4a6489','celeste':'#9cc3e6','azul':'#2f5fb3','verde oliva':'#6b6b3a','verde':'#2e8b57','verde agua':'#7fcab5',
  'bordó':'#6d1f2f','rojo':'#c62f2f','rosa':'#e7a1b5','fucsia':'#c2185b','violeta':'#6a4c93','lila':'#b9a3d6','amarillo':'#e9c43b','mostaza':'#c9a227',
  'naranja':'#e07a2e','coral':'#ee7f6d','terracota':'#b5553b','dorado':'#c8a24a','plateado':'#bfc3c8','nude':'#e3c4ad'
};
const NEUTROS = new Set(['negro','blanco','gris','gris oscuro','beige','camel','marrón','crema','azul marino','denim','dorado','plateado','nude']);
const NEUTRO_CALIDO = new Set(['beige','camel','marrón','crema','dorado','nude']);
const ESTILOS = ['casual','urbano','deportivo','clasico','elegante'];
const ESTILO_LBL = {casual:'Casual',urbano:'Urbano',deportivo:'Deportivo',clasico:'Clásico',elegante:'Elegante'};
const COMPAT = {
  deportivo:{deportivo:1,casual:.8,urbano:.85,clasico:.35,elegante:.15},
  casual:{casual:1,deportivo:.8,urbano:.9,clasico:.8,elegante:.6},
  urbano:{urbano:1,casual:.9,deportivo:.85,clasico:.6,elegante:.5},
  clasico:{clasico:1,casual:.8,elegante:.9,urbano:.6,deportivo:.35},
  elegante:{elegante:1,clasico:.9,casual:.6,urbano:.5,deportivo:.15}
};
const OCASIONES = [
  {k:'casa',l:'Casa / mandados',f:1,e:'casual'},{k:'trabajo',l:'Trabajo',f:2,e:'casual'},{k:'casual',l:'Salida casual',f:2,e:'urbano'},
  {k:'elegante',l:'Cena / salida elegante',f:4,e:'elegante'},{k:'formal',l:'Evento formal',f:5,e:'elegante'},{k:'deporte',l:'Deporte',f:1,e:'deportivo'}
];
const TEMPS = [
  {l:'Menos de 5 °C',c:'< 5°',t:2,r:[9,15]},{l:'5 a 12 °C',c:'5–12°',t:9,r:[6,11]},{l:'12 a 18 °C',c:'12–18°',t:15,r:[4,8]},
  {l:'18 a 24 °C',c:'18–24°',t:21,r:[2,5]},{l:'Más de 24 °C',c:'> 24°',t:27,r:[1,3]}
];
const CLIMAS = [{k:'sol',l:'Soleado'},{k:'nublado',l:'Nublado'},{k:'lluvia',l:'Lluvia'},{k:'nieve',l:'Nieve'}];
const FRANJAS = [{k:'dia',l:'Todo el día'},{k:'manana',l:'Mañana'},{k:'tarde',l:'Tarde'},{k:'noche',l:'Noche'}];
const ZONAS = [
  {k:'torso',l:'Torso'},{k:'piernas',l:'Piernas'},{k:'cuerpo',l:'Cuerpo entero'},{k:'pies',l:'Calzado'},{k:'medias',l:'Medias'},
  {k:'cabeza',l:'Cabeza'},{k:'cuello',l:'Orejas / cuello'},{k:'cintura',l:'Cintura'},{k:'muneca',l:'Muñeca / manos'},{k:'externo',l:'Cartera / mochila'}
];
const CAPAS = [{k:'base',l:'Base'},{k:'intermedia',l:'Intermedia'},{k:'exterior',l:'Exterior'}];
const ACCES = new Set(['cabeza','cuello','cintura','muneca','medias','externo']);
const SILUETAS = {
  mujer:[{k:'reloj',l:'Reloj de arena',sh:44,bu:42,wa:28,hi:46},{k:'pera',l:'Pera',sh:36,bu:36,wa:30,hi:52},{k:'manzana',l:'Manzana',sh:42,bu:45,wa:42,hi:42},{k:'rectangulo',l:'Rectángulo',sh:40,bu:38,wa:36,hi:40},{k:'triangulo_inv',l:'Triángulo inv.',sh:50,bu:44,wa:34,hi:38}],
  hombre:[{k:'rectangulo',l:'Rectángulo',sh:46,bu:42,wa:38,hi:40},{k:'triangular',l:'Triangular',sh:42,bu:40,wa:41,hi:46},{k:'triangulo_inv',l:'Triángulo inv.',sh:54,bu:48,wa:36,hi:40},{k:'ovalado',l:'Ovalado',sh:46,bu:46,wa:49,hi:44},{k:'trapecio',l:'Trapecio',sh:52,bu:46,wa:40,hi:42}]
};

/* puntos + de la silueta (coordenadas del dibujo 200x430) */
const SPOTS = [
  {k:'cabeza',l:'Cabeza',x:100,y:40,subs:['cabeza']},
  {k:'cuello',l:'Cuello',x:100,y:86,subs:['cuello']},
  {k:'torso',l:'Torso',x:100,y:130,subs:['torso_base','torso_inter','torso_ext']},
  {k:'cintura',l:'Cintura',x:100,y:180,subs:['cintura']},
  {k:'cuerpo',l:'Vestido',x:24,y:150,subs:['cuerpo']},
  {k:'muneca',l:'Muñeca',x:30,y:226,subs:['muneca']},
  {k:'externo',l:'Cartera',x:176,y:232,subs:['externo']},
  {k:'piernas',l:'Piernas',x:100,y:300,subs:['piernas']},
  {k:'pies',l:'Pies',x:100,y:404,subs:['pies','medias']}
];
const SUB = {
  cabeza:{z:'cabeza',l:'Cabeza'}, cuello:{z:'cuello',l:'Orejas / cuello'},
  torso_base:{z:'torso',c:'base',l:'Base'}, torso_inter:{z:'torso',c:'intermedia',l:'Intermedia'}, torso_ext:{z:'torso',c:'exterior',l:'Exterior'},
  cintura:{z:'cintura',l:'Cintura'}, cuerpo:{z:'cuerpo',l:'Cuerpo entero'}, muneca:{z:'muneca',l:'Muñeca / manos'},
  externo:{z:'externo',l:'Cartera / mochila'}, piernas:{z:'piernas',l:'Piernas'}, pies:{z:'pies',l:'Calzado'}, medias:{z:'medias',l:'Medias'}
};
/* tendencias por temporada (hemisferio norte). Se actualizan cada temporada. */
const TENDENCIAS = [{
  id:'oi-2026', label:'Otoño-invierno 2026/27', desde:'2026-09-01', hasta:'2027-02-28', actualizado:'noviembre 2026',
  mujer:{ colores:['bordó','marrón','violeta','gris oscuro','rojo','rosa','azul','amarillo','mostaza','verde oliva'],
    nombres:'Ciruela y berenjena, bordó, marrón chocolate, gris carbón, rojo, rosa bebé, azul Klein, amarillo manteca, verde musgo',
    prendas:['blazer','saco entallado','tapado','cuello alto','bomber','pollera larga','cuadros','botas altas','bota alta','mocasín','mocasin','sweater','cardigan','satén','saten','piel sintética','cuero'],
    prendasTxt:'Blazers entallados, tapados y camperas de cuello alto, bombers cortas, polleras largas a cuadros, sweaters gruesos y cárdigans, camisas de satén, botas altas y mocasines' },
  hombre:{ colores:['camel','bordó','violeta','azul','azul marino','verde oliva','rojo','amarillo'],
    nombres:'Camel (el color de la temporada), bordó, berenjena, azul intenso, azul medianoche, verde grisáceo, rojo profundo, amarillo manteca',
    prendas:['trench','campera de cuero','bomber','cuello mao','overshirt','sobrecamisa','saco','blazer','corderoy','sweater','cardigan','mocasín','mocasin','botas','chino'],
    prendasTxt:'Trench, camperas de cuero o bomber, camisas y sobrecamisas de cuello mao, sacos de hombros estructurados, corderoy, buen tejido y mocasines; cortes rectos o regulares' },
  fuera:['oversize','ancho','suela gruesa','chunky'],
  fueraTxt:'Lo muy baggy u oversize y las zapatillas de suela gruesa pierden fuerza; vuelve lo más ajustado y entallado.',
  fuentes:[
    {t:'Mango: colores mujer OI 2026-2027',u:'https://shop.mango.com/us/en/discover/trends/women/the-colors-of-autumn-winter-2026-2027_blta3cf591953843f46'},
    {t:'Mango: tendencias hombre OI 2026-2027',u:'https://shop.mango.com/us/en/discover/trends/men/mens-style-the-fallwinter-fashion-trends-2026-2027-to-know_bltfe60403e8361a2b5'},
    {t:'Who What Wear: colores de otoño 2026',u:'https://www.whowhatwear.com/fashion/fall/autumn-fashion-colour-trends-2026'},
    {t:'blue News: adiós al oversize, OI 2026',u:'https://www.bluewin.ch/en/lifestyle/goodbye-oversized-these-trends-are-shaping-fall-and-winter-2026-li.3646832'},
    {t:'Trendalytics: tendencias de pasarela hombre OI 2026',u:'https://trendalytics.co/insights/the-top-10-menswear-runway-trends-fall-winter-2026'}
  ]
}];
function estacion(iso){ const m=+(iso||todayISO()).slice(5,7); return m===12||m<=2?'invierno':m<=5?'primavera':m<=8?'verano':'otoño'; }
function tendenciaVigente(iso){ const d=iso||todayISO(); return TENDENCIAS.find(t=>d>=t.desde&&d<=t.hasta)||null; }
function trendHit(it,T,g){
  if(!T) return false; const L=T[g==='hombre'?'hombre':'mujer'];
  const txt=(it.nombre+' '+it.tipo+' '+(it.material||'')+' '+(it.estampado||'')).toLowerCase();
  return L.colores.includes((it.color||'').toLowerCase()) || L.prendas.some(w=>txt.includes(w));
}
function L_isColorOnly(it,T,g){ const L=T[g==='hombre'?'hombre':'mujer']; const txt=(it.nombre+' '+it.tipo+' '+(it.material||'')+' '+(it.estampado||'')).toLowerCase(); return !L.prendas.some(w=>txt.includes(w)); }
function trendWhy(it,T,g){
  if(!T) return ''; const L=T[g==='hombre'?'hombre':'mujer'];
  const txt=(it.nombre+' '+it.tipo+' '+(it.material||'')+' '+(it.estampado||'')).toLowerCase();
  if(L.prendas.some(w=>txt.includes(w))) return `${cap(it.nombre)} está en tendencia esta temporada`;
  if(L.colores.includes((it.color||'').toLowerCase())) return `El ${it.color} viene fuerte esta temporada`;
  return '';
}
const MODA_LVL={clasico:{l:'Clásico, atemporal',k:.5,w:.05},aldia:{l:'Al día',k:1,w:.1},vanguardia:{l:'A la vanguardia',k:1.4,w:.15}};
function subFor(it){ if(it.zona==='torso')return it.capa==='exterior'?'torso_ext':it.capa==='intermedia'?'torso_inter':'torso_base'; return it.zona; }

/* ============ utilidades ============ */
const $ = (s,r=document)=>r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => Math.random().toString(36).slice(2,10);
const clamp = (v,a=0,b=1)=>Math.max(a,Math.min(b,v));
function todayISO(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function daysAgo(iso){ if(!iso) return 999; return Math.round((Date.parse(todayISO())-Date.parse(iso))/864e5); }
function hexToHsl(hex){
  const m=/^#?([0-9a-f]{6})$/i.exec(hex||''); if(!m) return {h:0,s:0,l:.5};
  const n=parseInt(m[1],16), r=(n>>16&255)/255, g=(n>>8&255)/255, b=(n&255)/255;
  const mx=Math.max(r,g,b), mn=Math.min(r,g,b), l=(mx+mn)/2; let h=0,s=0;
  if(mx!==mn){const d=mx-mn; s=l>.5?d/(2-mx-mn):d/(mx+mn); h=mx===r?((g-b)/d+(g<b?6:0)):mx===g?((b-r)/d+2):((r-g)/d+4); h*=60;}
  return {h,s,l};
}
const hueDiff=(a,b)=>{const d=Math.abs(a-b)%360;return d>180?360-d:d};
function isNeutral(it){ const c=(it.color||'').toLowerCase(); if(NEUTROS.has(c)) return true; const {s,l}=hexToHsl(it.hex); return s<.16||l>.9||l<.13; }
function warmth(it){ const c=(it.color||'').toLowerCase(); if(NEUTRO_CALIDO.has(c)) return 'calido'; if(isNeutral(it)) return 'neutro'; const {h}=hexToHsl(it.hex); if(h<70||h>330) return 'calido'; if(h>170&&h<300) return 'frio'; return 'neutro'; }

/* ============ dibujos de prendas ============ */
const SHAPES = {
  remera:'<path d="M20 11 L28 8 Q32 13 36 8 L44 11 L56 21 L50 29 L45 25 L45 56 L19 56 L19 25 L14 29 L8 21 Z"/>',
  camisa:'<path d="M22 8 L32 15 L42 8 L52 14 L58 48 L51 50 L46 25 L46 58 L18 58 L18 25 L13 50 L6 48 L12 14 Z"/><path d="M32 15 V58" fill="none"/>',
  buzo:'<path d="M22 9 Q32 16 42 9 L53 15 L58 50 L51 52 L46 27 L46 56 L18 56 L18 27 L13 52 L6 50 L11 15 Z"/>',
  campera:'<path d="M22 9 L32 13 L42 9 L54 15 L58 52 L50 54 L46 27 L46 58 L18 58 L18 27 L14 54 L6 52 L10 15 Z"/><path d="M32 13 V58" fill="none"/>',
  pantalon:'<path d="M18 6 L46 6 L49 58 L36 58 L32 22 L28 58 L15 58 Z"/>',
  short:'<path d="M16 12 L48 12 L51 42 L35 42 L32 26 L29 42 L13 42 Z"/>',
  pollera:'<path d="M22 10 L42 10 L53 52 L11 52 Z"/>',
  vestido:'<path d="M24 6 L28 6 Q32 12 36 6 L40 6 L42 22 L38 26 L51 58 L13 58 L26 26 L22 22 Z"/>',
  zapatilla:'<path d="M6 38 L11 25 L24 27 L32 35 L53 39 Q58 41 58 47 L6 47 Z"/>',
  zapato:'<path d="M6 41 Q8 32 18 32 L30 36 L52 38 Q58 40 57 47 L6 47 Z"/>',
  bota:'<path d="M15 7 L31 7 L31 36 L52 40 Q58 42 57 51 L15 51 Z"/>',
  sandalia:'<path d="M6 44 L58 44 L58 49 L6 49 Z"/><path d="M14 44 L24 31 L33 44 M31 44 L41 33 L50 44" fill="none" stroke-width="3"/>',
  gorro:'<path d="M14 40 Q14 14 32 14 Q50 14 50 40 Z"/><rect x="11" y="39" width="42" height="9" rx="3"/>',
  aros:'<circle cx="20" cy="36" r="10" fill="none" stroke-width="4"/><circle cx="44" cy="36" r="10" fill="none" stroke-width="4"/>',
  collar:'<path d="M14 12 Q32 54 50 12" fill="none" stroke-width="4"/><circle cx="32" cy="42" r="6"/>',
  bufanda:'<path d="M14 14 Q32 26 50 14 L50 22 Q40 28 38 30 L42 56 L32 56 L30 31 Q20 26 14 22 Z"/>',
  reloj:'<rect x="25" y="5" width="14" height="16" rx="3"/><rect x="25" y="43" width="14" height="16" rx="3"/><circle cx="32" cy="32" r="13"/>',
  cinturon:'<rect x="4" y="26" width="56" height="12" rx="3"/><rect x="24" y="23" width="16" height="18" rx="2" fill="none" stroke-width="3"/>',
  cartera:'<path d="M22 26 Q22 12 32 12 Q42 12 42 26" fill="none" stroke-width="3"/><path d="M12 26 H52 L48 54 H16 Z"/>',
  mochila:'<rect x="15" y="12" width="34" height="44" rx="10"/><rect x="21" y="34" width="22" height="14" rx="4" fill="none"/>',
  medias:'<path d="M22 6 H36 V38 L48 46 Q53 52 46 57 L22 57 Z"/>',
  generic:'<rect x="14" y="14" width="36" height="36" rx="8"/>'
};
function kindOf(it){
  const t=((it.tipo||'')+' '+(it.nombre||'')).toLowerCase(); const z=it.zona;
  const has=(...w)=>w.some(x=>t.includes(x));
  if(z==='medias'||has('media')) return 'medias';
  if(has('zapatilla')) return 'zapatilla'; if(has('bota')) return 'bota'; if(has('sandalia','ojota')) return 'sandalia';
  if(z==='pies'||has('zapato','stiletto','mocas')) return 'zapato';
  if(has('vestido','enterito','mono')) return 'vestido';
  if(has('pollera','falda')) return 'pollera'; if(has('short','bermuda')) return 'short';
  if(z==='piernas'||has('jean','pantal','jogging','chino')) return 'pantalon';
  if(has('campera','camper','tapado','saco','abrigo','chaleco','blazer')) return 'campera';
  if(has('buzo','sweater','cardigan','pullover','suéter','sueter')) return 'buzo';
  if(has('camisa','blusa')) return 'camisa';
  if(z==='torso') return 'remera';
  if(has('aro')) return 'aros'; if(has('collar','cadena')) return 'collar'; if(has('bufanda','pañuelo')) return 'bufanda';
  if(has('reloj','pulsera','anillo')||z==='muneca') return 'reloj'; if(has('cintur')||z==='cintura') return 'cinturon';
  if(has('mochila')) return 'mochila'; if(z==='externo') return 'cartera';
  if(z==='cabeza') return 'gorro'; if(z==='cuello') return 'collar';
  return 'generic';
}
function vis(it){
  if(!it) return '<div class="vis"></div>';
  if(it.foto) return `<div class="vis"><img src="${it.foto}" alt="${esc(it.nombre)}"></div>`;
  return `<div class="vis"><svg viewBox="0 0 64 64" aria-hidden="true" fill="${esc(it.hex||'#999')}" stroke="var(--ink)" stroke-opacity=".55" stroke-width="1.6" stroke-linejoin="round">${SHAPES[kindOf(it)]}</svg></div>`;
}
function logo(size=40){
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" role="img" aria-label="Lombardi Fashion"><rect width="64" height="64" rx="16" fill="var(--accent)"/><path d="M28 16.5 a4.5 4.5 0 1 1 4.5 4.5 v4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M32.5 25 L53 41 Q55.5 44.5 51.5 44.5 H13.5 Q9.5 44.5 12 41 Z" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><text x="32.5" y="42" text-anchor="middle" font-family="Bodoni Moda, Didot, Georgia, serif" font-style="italic" font-weight="700" font-size="15" fill="#F3D38B">L</text></svg>`;
}

/* ============ figura ============ */
function silParams(p){ const g=p.perfil.genero==='hombre'?'hombre':'mujer'; return SILUETAS[g].find(s=>s.k===p.perfil.silueta)||SILUETAS[g][g==='hombre'?0:3]; }
function figurePath(s){
  const L=v=>100-v, R=v=>100+v;
  return `M${L(9)} 72 L${L(9)} 82 Q${L(s.sh-6)} 84 ${L(s.sh)} 96 L${L(s.bu)} 128 Q${L(s.wa+2)} 150 ${L(s.wa)} 166 Q${L(s.hi+2)} 186 ${L(s.hi)} 210 L${L(s.hi-8)} 262 L${L(22)} 396 L${L(8)} 396 L${L(4)} 244 L100 236 L${R(4)} 244 L${R(8)} 396 L${R(22)} 396 L${R(s.hi-8)} 262 L${R(s.hi)} 210 Q${R(s.hi+2)} 186 ${R(s.wa)} 166 Q${R(s.wa+2)} 150 ${R(s.bu)} 128 L${R(s.sh)} 96 Q${R(s.sh-6)} 84 ${R(9)} 82 L${R(9)} 72 Z`;
}
function armPath(s,side){
  const k=side<0?-1:1, X=v=>100+k*v;
  return `M${X(s.sh)} 96 Q${X(s.sh+12)} 150 ${X(s.sh+14)} 214 L${X(s.sh+5)} 216 Q${X(s.sh-1)} 156 ${X(s.bu-1)} 130 Z`;
}
function figureSVG(s, mini){
  const body = `<ellipse cx="100" cy="44" rx="22" ry="27"/><path d="${figurePath(s)}"/><path d="${armPath(s,-1)}"/><path d="${armPath(s,1)}"/><circle cx="${100-s.sh-10}" cy="222" r="7"/><circle cx="${100+s.sh+10}" cy="222" r="7"/>`;
  return `<svg class="${mini?'':'fig'}" viewBox="0 0 200 430" aria-hidden="true"><g fill="var(--sil)" stroke="var(--sil-line)" stroke-width="${mini?3:1.5}" stroke-linejoin="round">${body}</g></svg>`;
}

/* ============ estado ============ */
const KEY='lombardi.v1';
let ST=null, IDX=new Map(), sampleFn=null, sampleImages=false, hoyRes=null, evalOpen=false, aiTxt='', sheetState=null, review=null, toastT=null;

function I(nombre,tipo,zona,capa,color,estilo,f,a,x={}){
  return Object.assign({id:uid(),nombre,tipo,zona,capa,color,hex:COLORES[color]||'#999999',estilo,formalidad:f,abrigo:a,estampado:'liso',material:'',calce:'recto',temporada:'todo el año',lluvia:true,estado:'limpio',fav:false,usos:0,ultimoUso:null,foto:null,ejemplo:true,vigencia:'atemporal',edadMin:null,edadMax:null},x);
}
function seedLucho(){ return [
  I('Remera blanca básica','remera','torso','base','blanco','casual',1,1,{material:'algodón'}),
  I('Remera negra','remera','torso','base','negro','casual',1,1,{material:'algodón'}),
  I('Camisa celeste oxford','camisa','torso','base','celeste','clasico',3,1,{material:'algodón'}),
  I('Chomba azul marino','chomba','torso','base','azul marino','casual',2,1,{material:'piqué'}),
  I('Buzo gris con capucha','buzo','torso','intermedia','gris','deportivo',1,3,{material:'algodón frisado'}),
  I('Sweater camel','sweater','torso','intermedia','camel','clasico',3,3,{material:'lana'}),
  I('Campera de jean','campera','torso','exterior','denim','urbano',2,2,{material:'denim'}),
  I('Camperón negro acolchado','camperón','torso','exterior','negro','urbano',2,5,{material:'nylon'}),
  I('Saco azul marino','saco','torso','exterior','azul marino','elegante',4,2,{material:'lana fría',lluvia:false}),
  I('Jean azul recto','jean','piernas',null,'denim','casual',2,2,{material:'denim'}),
  I('Chino beige','pantalón','piernas',null,'beige','clasico',3,2,{material:'gabardina',calce:'slim'}),
  I('Jogging negro','jogging','piernas',null,'negro','deportivo',1,2,{material:'algodón'}),
  I('Short deportivo gris','short','piernas',null,'gris oscuro','deportivo',1,1,{temporada:'verano'}),
  I('Zapatillas blancas','zapatillas','pies',null,'blanco','urbano',2,1,{material:'cuero',lluvia:false}),
  I('Zapatillas running grises','zapatillas','pies',null,'gris','deportivo',1,1,{material:'malla'}),
  I('Botas marrones','botas','pies',null,'marrón','clasico',3,3,{material:'cuero'}),
  I('Zapatos negros','zapatos','pies',null,'negro','elegante',5,1,{material:'cuero'}),
  I('Reloj plateado','reloj','muneca',null,'plateado','clasico',3,1),
  I('Gorro de lana gris','gorro','cabeza',null,'gris','casual',1,3,{material:'lana'}),
  I('Mochila negra','mochila','externo',null,'negro','urbano',2,1)
];}
function seedElla(){ return [
  I('Remera blanca','remera','torso','base','blanco','casual',1,1,{material:'algodón'}),
  I('Blusa rosa','blusa','torso','base','rosa','clasico',3,1,{material:'viscosa'}),
  I('Top negro de satén','top','torso','base','negro','elegante',4,1,{material:'satén'}),
  I('Sweater crema oversize','sweater','torso','intermedia','crema','casual',2,3,{material:'lana',calce:'oversize'}),
  I('Cardigan bordó','cardigan','torso','intermedia','bordó','clasico',3,2,{material:'punto'}),
  I('Tapado camel','tapado','torso','exterior','camel','elegante',4,4,{material:'paño',lluvia:false}),
  I('Campera de cuero negra','campera','torso','exterior','negro','urbano',3,3,{material:'cuero'}),
  I('Jean negro skinny','jean','piernas',null,'negro','casual',2,2,{material:'denim',calce:'slim'}),
  I('Pantalón sastrero gris','pantalón','piernas',null,'gris','clasico',4,2,{material:'lana fría'}),
  I('Pollera midi plisada','pollera','piernas',null,'verde oliva','clasico',3,1,{material:'poliéster'}),
  I('Vestido negro midi','vestido','cuerpo',null,'negro','elegante',4,1,{material:'crepé'}),
  I('Vestido floreado','vestido','cuerpo',null,'coral','casual',2,1,{estampado:'floreado',material:'viscosa',temporada:'verano'}),
  I('Zapatillas blancas','zapatillas','pies',null,'blanco','urbano',2,1,{material:'cuero',lluvia:false}),
  I('Botas negras de taco bajo','botas','pies',null,'negro','elegante',4,3,{material:'cuero'}),
  I('Stilettos nude','zapatos','pies',null,'nude','elegante',5,1,{lluvia:false}),
  I('Sandalias doradas','sandalias','pies',null,'dorado','casual',2,1,{lluvia:false,temporada:'verano'}),
  I('Aros dorados grandes','aros','cuello',null,'dorado','elegante',3,1),
  I('Bufanda gris','bufanda','cuello',null,'gris','casual',1,2,{material:'lana'}),
  I('Cinturón marrón','cinturón','cintura',null,'marrón','clasico',3,1,{material:'cuero'}),
  I('Medias negras','medias','medias',null,'negro','elegante',3,1),
  I('Cartera camel','cartera','externo',null,'camel','clasico',3,1,{material:'cuero'})
];}
function newProfile(nombre,genero,items){
  return {perfil:{nombre,genero,edad:genero==='hombre'?'35':'',altura:'',peso:'',silueta:'rectangulo',venas:'',metal:'',subtono:'neutro',estilos:{},vetos:'',ciudad:'Pavia di Udine',moda:'aldia'},
    items, outfit:{slots:{},locks:{}}, saved:[], likes:{}, dislikes:[], faltan:[]};
}
function freshState(){
  return {v:2, active:'lucho', ctx:{clima:'nublado',temp:1,franja:'dia',dia:'hoy',desde:'06:00',hasta:'14:00',auto:true,ocasion:'trabajo',estilo:''},
    profiles:{lucho:newProfile('Lucho','hombre',[]), ella:newProfile('Romi','mujer',[])}};
}
/* ============ nube (Supabase) ============ */
const CFG=window.LF_CONFIG||{};
const CLOUD=!!(CFG.supabaseUrl&&CFG.supabaseAnonKey&&window.supabase);
let sb=null, session=null, booting=CLOUD, syncState='', saveT=null, loginMsg='', loginBusy=false;
const synced={items:new Map(),estado:new Map()};
function cacheKey(){ return KEY+':'+(session?session.user.id:'local'); }
function cacheLocal(){ try{ localStorage.setItem(cacheKey(), JSON.stringify(ST, (k,v)=>k==='foto'&&typeof v==='string'&&!v.startsWith('data:')?undefined:v)); }catch(e){} }
function itemRow(i,perfil){ const {foto,fotoPath,id,...datos}=i; return {user_id:session.user.id,id,perfil,datos,foto_path:fotoPath||null}; }
function profDatos(p){ const {items,...rest}=p; return rest; }
function estadoRows(){ return [{clave:'global',datos:{active:ST.active,ctx:ST.ctx}}].concat(Object.entries(ST.profiles).map(([k,p])=>({clave:k,datos:profDatos(p)}))).map(r=>({...r,user_id:session.user.id})); }
function markSynced(){
  synced.items=new Map(); synced.estado=new Map();
  Object.entries(ST.profiles).forEach(([k,p])=>p.items.forEach(i=>synced.items.set(i.id,JSON.stringify(itemRow(i,k)))));
  estadoRows().forEach(r=>synced.estado.set(r.clave,JSON.stringify(r.datos)));
}
function setSync(s){ syncState=s; const d=$('#syncdot'); if(d){ d.dataset.s=s; d.title=SYNC_TXT[s]||''; } }
const SYNC_TXT={ok:'Todo guardado en la nube',saving:'Guardando…',error:'Sin conexión: se guarda cuando vuelva',local:'Modo local: solo en este teléfono'};
async function cloudLoad(){
  const [a,b]=await Promise.all([sb.from('estado').select('clave,datos'), sb.from('prendas').select('id,perfil,datos,foto_path')]);
  if(a.error) throw a.error; if(b.error) throw b.error;
  const s=freshState();
  (a.data||[]).forEach(r=>{ if(r.clave==='global'){ s.active=r.datos.active||s.active; s.ctx={...s.ctx,...(r.datos.ctx||{})}; } else if(s.profiles[r.clave]){ Object.assign(s.profiles[r.clave], r.datos, {items:[]}); } });
  const paths=(b.data||[]).map(r=>r.foto_path).filter(Boolean), urls={};
  for(let i=0;i<paths.length;i+=100){ const {data}=await sb.storage.from('fotos').createSignedUrls(paths.slice(i,i+100),60*60*24*7); (data||[]).forEach(d=>{ if(d.signedUrl) urls[d.path]=d.signedUrl; }); }
  (b.data||[]).forEach(r=>{ const pr=s.profiles[r.perfil]; if(pr) pr.items.push({...r.datos,id:r.id,fotoPath:r.foto_path||null,foto:r.foto_path?(urls[r.foto_path]||null):null}); });
  ST=s; migrate(); markSynced(); reindex(); cacheLocal(); setSync('ok');
  if(purgeEjemplos()) save();
}
async function cloudPush(){
  if(!sb||!session) return;
  setSync('saving');
  const ups=[], seen=new Set();
  for(const [k,pr] of Object.entries(ST.profiles)) for(const i of pr.items){
    if(i.foto&&i.foto.startsWith('data:')&&!i.fotoPath) await uploadFoto(i);
    seen.add(i.id); const row=itemRow(i,k), js=JSON.stringify(row); if(synced.items.get(i.id)!==js) ups.push({row,js});
  }
  const dels=[...synced.items.keys()].filter(id=>!seen.has(id));
  const est=estadoRows().filter(r=>synced.estado.get(r.clave)!==JSON.stringify(r.datos));
  try{
    if(ups.length){ const {error}=await sb.from('prendas').upsert(ups.map(u=>u.row),{onConflict:'user_id,id'}); if(error) throw error; ups.forEach(u=>synced.items.set(u.row.id,u.js)); }
    if(dels.length){
      const fotos=dels.map(id=>{ try{ return JSON.parse(synced.items.get(id)).foto_path; }catch(e){ return null; } }).filter(Boolean);
      const {error}=await sb.from('prendas').delete().in('id',dels); if(error) throw error;
      if(fotos.length) await sb.storage.from('fotos').remove(fotos);
      dels.forEach(id=>synced.items.delete(id));
    }
    if(est.length){ const {error}=await sb.from('estado').upsert(est,{onConflict:'user_id,clave'}); if(error) throw error; est.forEach(r=>synced.estado.set(r.clave,JSON.stringify(r.datos))); }
    setSync('ok');
  }catch(e){ console.warn(e); setSync('error'); clearTimeout(saveT); saveT=setTimeout(cloudPush,30000); }
}
async function uploadFoto(it){
  if(!sb||!session||!it.foto||!it.foto.startsWith('data:')) return;
  try{
    const blob=await (await fetch(it.foto)).blob(), path=`${session.user.id}/${it.id}.jpg`;
    const {error}=await sb.storage.from('fotos').upload(path,blob,{contentType:'image/jpeg',upsert:true});
    if(!error) it.fotoPath=path;
  }catch(e){}
}
async function boot(){
  if(!CLOUD){ load(); setSync('local'); render(); initAI(); return; }
  sb=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true}});
  const {data}=await sb.auth.getSession(); session=data.session;
  sb.auth.onAuthStateChange((ev,s)=>{ const was=!!session; session=s; if(!s&&was){ ST=null; render(); } });
  if(session){ load(); render(); try{ await cloudLoad(); }catch(e){ console.warn(e); setSync('error'); } }
  booting=false; initAI(); render();
}
async function doLogin(nuevo){
  const em=($('#lg-mail')||{}).value||'', pw=($('#lg-pass')||{}).value||'';
  if(!em||pw.length<6){ loginMsg='Poné el mail y una contraseña de al menos 6 caracteres.'; render(); return; }
  loginBusy=true; loginMsg=''; render();
  const r=nuevo? await sb.auth.signUp({email:em,password:pw}) : await sb.auth.signInWithPassword({email:em,password:pw});
  loginBusy=false;
  if(r.error){ loginMsg=nuevo?'No pude crear la cuenta: '+r.error.message:'Mail o contraseña incorrectos.'; render(); return; }
  if(!r.data.session){ loginMsg='Cuenta creada. Revisá el mail para confirmarla y después entrá.'; render(); return; }
  session=r.data.session; load(); try{ await cloudLoad(); }catch(e){ setSync('error'); }
  initAI(); go('hoy'); render();
}
function vLogin(){
  return `<div class="stack" style="max-width:380px;margin:12vh auto 0;text-align:center;align-items:center">${logo(76)}
    <h1 class="view-title" style="margin-top:8px">Lombardi <i>Fashion</i></h1>
    <p class="lede">Tu estilista personal. Entrá con la cuenta de la casa: la misma en los dos teléfonos.</p>
    <div class="card stack" style="width:100%;text-align:left">
      <div class="field"><label for="lg-mail">Mail</label><input id="lg-mail" type="email" autocomplete="username" inputmode="email"></div>
      <div class="field"><label for="lg-pass">Contraseña</label><input id="lg-pass" type="password" autocomplete="current-password"></div>
      ${loginMsg?`<p class="note" style="margin:0">${esc(loginMsg)}</p>`:''}
      <button class="btn primary block" data-act="login" ${loginBusy?'disabled':''}>${loginBusy?'Entrando…':'Entrar'}</button>
      <button class="btn ghost block small" data-act="signup" ${loginBusy?'disabled':''}>Es la primera vez: crear la cuenta</button>
    </div></div>`;
}
function load(){
  ST=null;
  try{ const raw=localStorage.getItem(cacheKey()); if(raw){ const s=JSON.parse(raw); if(s&&s.profiles) ST=s; } }catch(e){}
  if(!ST) ST=freshState();
  migrate(); if(!CLOUD) purgeEjemplos(); reindex();
}
/* las prendas de ejemplo del prototipo no van en la app real: se borran (también de la nube) */
function purgeEjemplos(){
  let n=0;
  Object.values(ST.profiles).forEach(p=>{
    const ids=new Set(p.items.filter(i=>i.ejemplo).map(i=>i.id)); if(!ids.size) return; n+=ids.size;
    p.items=p.items.filter(i=>!ids.has(i.id));
    Object.keys(p.outfit.slots).forEach(k=>{ if(ids.has(p.outfit.slots[k])){ delete p.outfit.slots[k]; delete p.outfit.locks[k]; } });
    p.saved=(p.saved||[]).filter(s=>!Object.values(s.slots).some(id=>ids.has(id)));
  });
  if(n){ hoyRes=null; comprasCache=null; }
  return n;
}
function migrate(){
  ST.ctx={...freshState().ctx,...ST.ctx};
  const e=ST.profiles.ella; if(e&&e.perfil.nombre==='Ella') e.perfil.nombre='Romi';
  Object.values(ST.profiles).forEach(p=>{ if(!p.perfil.moda) p.perfil.moda='aldia'; p.items.forEach(i=>{ if(!i.vigencia) i.vigencia='atemporal'; }); });
  if(ST.profiles.lucho && !ST.profiles.lucho.perfil.edad) ST.profiles.lucho.perfil.edad='35';
}
function save(){
  reindex(); cacheLocal(); comprasCache=null;
  if(sb&&session){ setSync('saving'); clearTimeout(saveT); saveT=setTimeout(cloudPush,700); }
}
function prof(){ return ST.profiles[ST.active]; }
function reindex(){ IDX=new Map(prof().items.map(i=>[i.id,i])); }
const byId = id => IDX.get(id);
function vetado(it,p){
  const v=(p.perfil.vetos||'').toLowerCase().split(',').map(s=>s.trim()).filter(Boolean);
  if(!v.length) return false; const t=(it.nombre+' '+it.tipo+' '+it.color+' '+(it.calce||'')).toLowerCase();
  return v.some(w=>t.includes(w));
}
function ctxEstilo(){ const c=ST.ctx; return c.estilo || prof().perfil.estilos[c.ocasion] || (OCASIONES.find(o=>o.k===c.ocasion)||{}).e || 'casual'; }

/* ============ motor de evaluación ============ */
function estilosOf(i){ const s=[i.estilo,...(i.estilos||[])].filter(Boolean); return [...new Set(s)]; }
function compatOf(a,b){ let m=0; for(const x of estilosOf(a)) for(const y of estilosOf(b)){ const v=(COMPAT[x]||{})[y]; m=Math.max(m,v==null?.7:v); } return m; }
function tipoBase(i){ return String(i.tipo||i.nombre||'').toLowerCase().split(/\s+/)[0].replace(/s$/,''); }
function similar(i,c){ return subFor(i)===subFor(c)&&kindOf(i)===kindOf(c)&&tipoBase(i)===tipoBase(c)&&(i.color===c.color||(!isNeutral(i)&&!isNeutral(c)&&hueDiff(hexToHsl(i.hex).h,hexToHsl(c.hex).h)<15)); }
function autoOc(it){ return OCASIONES.filter(o=>Math.abs((+it.formalidad||2)-o.f)<=1); }
function isEnterito(it){ return /enterito|mono|jumpsuit/i.test(it.tipo+' '+it.nombre); }
function blocked(o,k){
  const c=o.slots.cuerpo && byId(o.slots.cuerpo);
  if(!c) return false;
  if(k==='piernas') return true;
  if(k==='torso_base' && isEnterito(c)) return true;
  return false;
}
function evaluate(o, ctx, p, opt={}){
  const xs=Object.entries(o.slots).map(([k,id])=>({k,it:byId(id)})).filter(x=>x.it);
  const its=xs.map(x=>x.it);
  const has=k=>xs.some(x=>x.k===k);
  const missing=[];
  if(!(has('torso_base')||has('torso_inter')||has('torso_ext')||has('cuerpo'))) missing.push('algo para arriba');
  if(!(has('piernas')||has('cuerpo'))) missing.push('algo para abajo');
  if(!has('pies')) missing.push('calzado');
  const pros=[], issues=[];
  const main=xs.filter(x=>!ACCES.has(x.it.zona)).map(x=>x.it);
  const temp=TEMPS[ctx.temp]||TEMPS[1];
  const oc=OCASIONES.find(x=>x.k===ctx.ocasion)||OCASIONES[1];

  /* color */
  let color=1;
  const colorItems=its.filter(i=>i.zona!=='medias');
  const chrom=colorItems.filter(i=>!isNeutral(i));
  const groups=[];
  chrom.forEach(i=>{const h=hexToHsl(i.hex).h; const g=groups.find(g=>hueDiff(g.h,h)<28); if(g) g.items.push(i); else groups.push({h,items:[i]});});
  if(groups.length===0){ if(colorItems.length) pros.push('Base neutra: siempre funciona'); }
  else if(groups.length===1){ pros.push(`${cap(groups[0].items[0].color)} como único color fuerte, bien dosificado`); }
  else if(groups.length===2){ const d=hueDiff(groups[0].h,groups[1].h);
    if(d<50){color=.92; pros.push('Colores vecinos, combinan suave');}
    else if(d>145){color=.88; pros.push('Contraste de complementarios, con onda');}
    else {color=.66; issues.push({c:'color',t:`${cap(groups[0].items[0].color)} y ${groups[1].items[0].color} no terminan de llevarse`});}
  } else { color=groups.length===3?.55:.4; issues.push({c:'color',t:`Hay ${groups.length} colores fuertes compitiendo: dejá uno o dos y el resto neutro`}); }
  const pats=main.concat(its.filter(i=>i.zona==='cuello'||i.zona==='externo')).filter(i=>i.estampado&&i.estampado!=='liso');
  if(pats.length>=2){ color-=.25; issues.push({c:'color',t:'Dos estampados juntos se pelean'}); }
  const st=p.perfil.subtono;
  if(st==='calido'||st==='frio'){
    let pal=0; its.filter(i=>['torso','cuerpo','cuello'].includes(i.zona)).forEach(i=>{const w=warmth(i); if(w===st) pal+=.03; else if(w!=='neutro') pal-=.05;});
    color+=clamp(pal,-.12,.06);
    if(pal>0) pros.push(`Cerca de la cara usás colores de tu paleta ${st==='calido'?'cálida':'fría'}`);
    if(pal<=-.05) issues.push({c:'color',t:`Cerca de la cara hay colores ${st==='calido'?'fríos':'cálidos'}; con tu subtono te favorecen más los ${st==='calido'?'cálidos':'fríos'}`});
  }
  color=clamp(color);

  /* estilo */
  let estilo=1;
  if(main.length>=2){
    let sum=0,n=0,worst={v:1};
    for(let a=0;a<main.length;a++) for(let b=a+1;b<main.length;b++){ const v=compatOf(main[a],main[b]); sum+=v; n++; if(v<worst.v) worst={v,a:main[a],b:main[b]}; }
    estilo=sum/n;
    if(worst.v<.45){ estilo=Math.min(estilo,.45); issues.push({c:'estilo',t:`${cap(worst.a.nombre)} y ${lc(worst.b.nombre)} son de mundos distintos`}); }
    else if(estilo>.88) pros.push('Todo del mismo universo de estilo');
  }
  const pref=opt.estilo||'';
  if(pref && main.length){ const m=main.reduce((s,i)=>s+Math.max(...estilosOf(i).map(e=>(COMPAT[e]||{})[pref]??.6)),0)/main.length; estilo=estilo*.82+m*.18; }
  estilo=clamp(estilo);

  /* clima */
  let clima=1;
  if(!opt.noClima){
    let pen=0;
    let w=0; xs.forEach(({k,it})=>{ if(it.zona==='torso'||it.zona==='cuerpo') w+=+it.abrigo||1; if((it.zona==='cabeza'||it.zona==='cuello')&&ctx.temp<=1) w+=((+it.abrigo||1)-1)*.6; });
    const [lo,hi]=temp.r; const tl=lc(temp.l);
    if(main.length){
      if(w<lo){ const d=lo-w; pen+=.17*d; if(d>=1) issues.push({c:'clima',t:`Poco abrigo para ${tl}: ${d>=3?'te vas a congelar, sumá una o dos capas':'sumá una capa'}`,warm:'up'}); }
      else if(w>hi){ const d=w-hi; pen+=.15*d; if(d>=1) issues.push({c:'clima',t:`Demasiado abrigo para ${tl}: sacate una capa`,warm:'down'}); }
      else pros.push(`Abrigo justo para ${tl}`);
    }
    const legs=o.slots.cuerpo?byId(o.slots.cuerpo):(o.slots.piernas?byId(o.slots.piernas):null);
    if(legs && ctx.temp<=1 && /short|bermuda|pollera|vestido|falda/i.test(legs.tipo+' '+legs.nombre) && !has('medias')){ pen+=.25; issues.push({c:'clima',t:'Piernas al aire con este frío: sumá medias o cambiá a pantalón'}); }
    const shoes=o.slots.pies&&byId(o.slots.pies);
    if(shoes && kindOf(shoes)==='sandalia' && ctx.temp<=2){ pen+=.3; issues.push({c:'clima',t:'Sandalias con este frío no van'}); }
    if(ctx.clima==='lluvia'||ctx.clima==='nieve'){
      const bad=xs.filter(x=>['pies','torso_ext','externo'].includes(x.k) && x.it.lluvia===false);
      if(bad.length){ pen+=.22*bad.length; issues.push({c:'clima',t:`${cap(bad.map(b=>b.it.nombre).join(' y '))} ${bad.length>1?'sufren':'sufre'} con la ${ctx.clima}`}); }
      else if(shoes) pros.push(`Listo para la ${ctx.clima}`);
    }
    if(ctx.temp>=4 && xs.some(x=>x.it.zona==='torso'&&+x.it.abrigo>=4)) pen+=.3;
    if(ctx.spread>=8 && main.length && !(has('torso_inter')||has('torso_ext'))){ pen+=.15; issues.push({c:'clima',t:`Cambian ${ctx.spread} °C en el día: andá en capas para sacarte o ponerte algo`,warm:'up'}); }
    clima=Math.exp(-1.25*pen);
  }

  /* ocasión */
  let ocasion=1;
  if(main.length){
    const devs=main.map(i=>({i,d:(i.ocasiones||[]).includes(oc.k)?0:Math.abs((+i.formalidad||2)-oc.f)}));
    const avg=devs.reduce((s,x)=>s+x.d,0)/devs.length, mx=devs.reduce((m,x)=>x.d>m.d?x:m,devs[0]);
    ocasion=clamp(1-.17*avg-.13*Math.max(0,mx.d-1)); if(mx.d>=3) ocasion=Math.min(ocasion,.45);
    if(mx.d>=2) issues.push({c:'ocasion',t:`${cap(mx.i.nombre)} es ${(+mx.i.formalidad)>oc.f?'demasiado formal':'muy informal'} para ${oc.l.toLowerCase()}`});
    else if(avg<=.8) pros.push(`Formalidad acorde a ${oc.l.toLowerCase()}`);
    if(oc.k==='deporte'){
      const nope=main.find(i=>!(i.ocasiones||[]).includes('deporte')&&!estilosOf(i).includes('deportivo')&&(i.estilo==='elegante'||i.estilo==='clasico'||/jean|sastrero|bota|sandalia|zapato|stiletto|vestido|pollera|blusa|camisa|tapado|saco|cuero/i.test(i.tipo+' '+i.nombre)));
      if(nope){ ocasion=Math.min(ocasion,.4); issues.push({c:'ocasion',t:`${cap(nope.nombre)} no es para hacer deporte`}); }
    }
  }

  /* proporciones */
  let prop=.95;
  const tops=xs.filter(x=>x.it.zona==='torso').map(x=>x.it), bot=o.slots.piernas&&byId(o.slots.piernas);
  if(bot && tops.some(t=>t.calce==='oversize') && (bot.calce==='oversize'||bot.calce==='ancho')){ prop=.6; issues.push({c:'prop',t:'Oversize arriba y abajo te desdibuja: equilibrá con algo más ajustado'}); }
  else if(bot && tops.some(t=>t.calce==='oversize') && bot.calce==='slim'){ prop=1; pros.push('Volumen arriba y ajustado abajo: buena proporción'); }
  const sil=p.perfil.silueta;
  if(sil==='manzana' && tops.some(t=>t.calce==='cropped')){ prop=Math.min(prop,.7); issues.push({c:'prop',t:'Para tu silueta, un top más largo estiliza más que uno cropped'}); }
  if(sil==='pera' && bot && (bot.calce==='slim') && !tops.some(t=>t.capa!=='base')){ prop=Math.min(prop,.82); }
  if(sil==='reloj' && has('cintura')) { prop=Math.min(1,prop+.05); pros.push('El cinturón marca tu cintura'); }

  /* moda y temporada: suma por tendencia, resta poco por desactualizado, edad o fuera de temporada */
  let moda=.88;
  const lvl=MODA_LVL[p.perfil.moda]||MODA_LVL.aldia;
  const est=estacion(), fria=est==='otoño'||est==='invierno';
  const fuera=its.filter(i=>fria?i.temporada==='verano':i.temporada==='invierno');
  if(fuera.length){ moda-=.1*fuera.length; issues.push({c:'moda',t:`${cap(fuera[0].nombre)} es más de ${fria?'verano':'invierno'}; en ${est} queda fuera de temporada`}); }
  if(fria && chrom.some(i=>{const h=hexToHsl(i.hex);return h.l>.74&&h.s>.3;})){ moda-=.04; }
  if(!fria && chrom.some(i=>{const h=hexToHsl(i.hex);return h.l<.3&&h.s>.25;})){ moda-=.03; }
  const viejas=its.filter(i=>i.vigencia==='desactualizada');
  if(viejas.length){ moda-=.18*lvl.k*viejas.length; issues.push({c:'moda',t:`${cap(viejas[0].nombre)} hoy se ve un poco pasado de moda`}); }
  const edad=+p.perfil.edad;
  if(edad){
    const joven=its.find(i=>i.edadMax&&edad>+i.edadMax+8), mayor=its.find(i=>i.edadMin&&edad<+i.edadMin-8);
    if(joven){ moda-=.12; issues.push({c:'moda',t:`${cap(joven.nombre)} es de un estilo muy juvenil para tu edad`}); }
    if(mayor){ moda-=.12; issues.push({c:'moda',t:`${cap(mayor.nombre)} te suma años`}); }
  }
  const T=tendenciaVigente(), g=p.perfil.genero==='hombre'?'hombre':'mujer';
  if(T){
    const hits=its.filter(i=>trendHit(i,T,g));
    if(hits.length){ moda+=Math.min(.15,.05*hits.length)*lvl.k; pros.push(trendWhy(hits.find(i=>!L_isColorOnly(i,T,g))||hits[0],T,g)); }
    if(lvl.k>=1 && its.some(i=>T.fuera.some(w=>((i.calce||'')+' '+i.nombre).toLowerCase().includes(w)))) moda-=.03;
  }
  moda=clamp(moda);

  const crit={color:{v:color},estilo:{v:estilo},clima:{v:clima},ocasion:{v:ocasion},prop:{v:prop},moda:{v:moda}};
  const B=opt.noClima?{color:.375,estilo:.3125,clima:0,ocasion:.1875,prop:.125}:{color:.3,estilo:.25,clima:.2,ocasion:.15,prop:.1};
  const W={}; Object.keys(B).forEach(k=>W[k]=B[k]*(1-lvl.w)); W.moda=lvl.w;
  const s=Object.keys(W).reduce((a,k)=>a+W[k]*crit[k].v,0);
  return {s, seg:segOf(s,crit,opt.noClima), crit, pros, issues, missing, n:its.length};
}
function segOf(s,crit,noClima){
  let seg = s>=.9?9 : s>=.82?8 : s>=.72?7 : s>=.64?6 : s>=.56?5 : s>=.47?4 : s>=.37?3 : s>=.25?2 : 1;
  const vals=Object.entries(crit).filter(([k])=>k!=='moda'&&!(noClima&&k==='clima')).map(([,c])=>c.v);
  const worst=Math.min(...vals);
  if(worst<.35) seg=Math.min(seg,3); else if(worst<.5) seg=Math.min(seg,6);
  if(!noClima && crit.clima.v<.5) seg=Math.min(seg,3); else if(!noClima && crit.clima.v<.75) seg=Math.min(seg,6);
  return seg;
}
const cap=s=>{s=String(s||'');return s.charAt(0).toUpperCase()+s.slice(1)};
const lc=s=>{s=String(s||'');return s.charAt(0).toLowerCase()+s.slice(1)};
const SEG_TXT=['','Muy desacertado','Hay que cambiar algo','Corregible','Mejorable','Regular','Casi verde','Bien','Muy bien','Excelente'];
function segGroup(seg){ return seg>=7?'verde':seg>=4?'amarillo':'rojo'; }
function critColor(v){ return v>=.75?'var(--s8)':v>=.5?'var(--s5)':'var(--s2)'; }
const CRIT_LBL={clima:'Clima',color:'Colores',estilo:'Estilo',ocasion:'Ocasión',prop:'Proporciones',moda:'Moda y temporada'};
const CRIT_WHY={color:'mejora la combinación de colores',estilo:'queda más coherente de estilo',clima:'va mejor con el clima',ocasion:'acompaña mejor la ocasión',prop:'mejora las proporciones',moda:'está más al día y va con la temporada'};

function pool(p, sub, ctx){
  const d=SUB[sub];
  return p.items.filter(i=>i.estado!=='sucio' && !vetado(i,p) && i.zona===d.z && (d.c?(i.capa||'base')===d.c:true) && (!ctx||aptoClima(i,ctx)));
}
/* lo que nunca se recomienda con ese clima (el usuario igual lo puede elegir a mano en Armar) */
function aptoClima(it,ctx){
  const t=+ctx.temp, wet=ctx.clima==='lluvia'||ctx.clima==='nieve', k=kindOf(it), txt=((it.tipo||'')+' '+(it.nombre||'')).toLowerCase();
  if(k==='sandalia' && t<=2) return false;
  if(wet && it.lluvia===false && (it.zona==='pies'||it.zona==='externo'||(it.zona==='torso'&&it.capa==='exterior'))) return false;
  if(t<=1 && (it.temporada==='verano' || /short|bermuda/.test(txt))) return false;
  if(t<=1 && it.zona==='torso' && it.capa==='base' && /musculosa|top de tiras|crop/.test(txt)) return false;
  if(t>=4 && it.zona==='torso' && it.capa!=='base' && +it.abrigo>=3) return false;
  if(t>=3 && it.temporada==='invierno') return false;
  if(t>=4 && k==='bota') return false;
  return true;
}
function climaOK(e){ return e.crit.clima.v>=.8; }
function evalOpts(){ return {estilo:ctxEstilo()}; }
function cloneO(o){ return {slots:{...o.slots},locks:{...o.locks}}; }

function suggestions(o, ctx, p){
  const base=evaluate(o,ctx,p,evalOpts()); const out=[];
  const consider=['torso_base','torso_inter','torso_ext','piernas','cuerpo','pies','medias','cuello','cabeza','externo','cintura'];
  for(const k of consider){
    if(o.locks[k]||blocked(o,k)) continue;
    const cur=o.slots[k]&&byId(o.slots[k]);
    if(k==='cuerpo'&&!cur) continue;
    if((k==='torso_base'||k==='piernas')&&!cur) continue;
    let best=null;
    for(const it of pool(p,k,ctx)){
      if(cur&&it.id===cur.id) continue;
      const t=cloneO(o); t.slots[k]=it.id; const e=evaluate(t,ctx,p,evalOpts()); const d=e.s-base.s;
      if(!best||d>best.d) best={k,cur,it,d,e,type:cur?'swap':'add'};
    }
    if(cur && ['torso_inter','torso_ext','medias','cuello','cabeza','externo','cintura'].includes(k)){
      const t=cloneO(o); delete t.slots[k]; const e=evaluate(t,ctx,p,evalOpts()); const d=e.s-base.s;
      if(!best||d>best.d) best={k,cur,it:null,d,e,type:'remove'};
    }
    if(best && best.d>.025) out.push(best);
  }
  out.sort((a,b)=>b.d-a.d);
  out.forEach(t=>{ let bk='color',bv=-9; for(const c in t.e.crit){ const dv=t.e.crit[c].v-base.crit[c].v; if(dv>bv){bv=dv;bk=c;} } t.why=CRIT_WHY[bk];
    t.txt = t.type==='swap'?`Cambiá ${lc(t.cur.nombre)} por ${lc(t.it.nombre)}`: t.type==='add'?`Sumá ${lc(t.it.nombre)}`:`Sacá ${lc(t.cur.nombre)}`; });
  /* faltantes */
  const faltan=[];
  const cold=base.issues.find(i=>i.warm==='up');
  if(cold && ctx.temp<=1 && !pool(p,'torso_ext').some(i=>(+i.abrigo||1)>=4)) faltan.push('una capa más abrigada (campera o tapado)');
  if((ctx.clima==='lluvia'||ctx.clima==='nieve') && !pool(p,'pies').some(i=>i.lluvia!==false)) faltan.push('calzado para lluvia');
  return {base, tips:out.slice(0,3), faltan};
}
function fillLayers(o, ctx, p, opts){
  let cur=evaluate(o,ctx,p,opts);
  const order=['torso_inter','torso_ext','medias'].concat(ctx.temp<=1?['cuello','cabeza']:[]);
  for(let pass=0;pass<2;pass++) for(const k of order){
    if(o.slots[k]||o.locks[k]||blocked(o,k)) continue;
    let best=null;
    for(const it of pool(p,k,ctx)){
      if((k==='cuello'||k==='cabeza') && (+it.abrigo||1)<2) continue;
      const t=cloneO(o); t.slots[k]=it.id; const e=evaluate(t,ctx,p,opts);
      const mejoraClima=e.crit.clima.v>cur.crit.clima.v+.02;
      if((mejoraClima||e.s>cur.s+.012) && (!best||e.crit.clima.v>best.e.crit.clima.v+.001||(Math.abs(e.crit.clima.v-best.e.crit.clima.v)<=.001&&e.s>best.e.s))) best={it,e};
    }
    if(best){ o.slots[k]=best.it.id; cur=best.e; }
  }
  return cur;
}
function completar(o, ctx, p){
  const opts=evalOpts();
  const order=[];
  if(!o.slots.cuerpo){ order.push('torso_base','piernas'); }
  else if(!isEnterito(byId(o.slots.cuerpo))) order.push('torso_base_opt');
  order.push('pies');
  for(const k0 of order){
    const k=k0.replace('_opt','');
    if(o.slots[k]||o.locks[k]||blocked(o,k)) continue;
    if(k0.endsWith('_opt')) continue;
    let best=null;
    for(const it of pool(p,k,ctx)){ const t=cloneO(o); t.slots[k]=it.id; const e=evaluate(t,ctx,p,opts); if(!best||e.s>best.s) best={it,s:e.s}; }
    if(best) o.slots[k]=best.it.id;
  }
  /* si alguna capa de torso hace sobrar abrigo y no está con candado, se prueba quitarla */
  fillLayers(o,ctx,p,opts);
  return o;
}
function generar(ctx, p){
  const opts=evalOpts();
  const bases=pool(p,'torso_base',ctx), legs=pool(p,'piernas',ctx), feet=pool(p,'pies',ctx), dresses=pool(p,'cuerpo',ctx);
  let combos=[];
  for(const t of bases) for(const l of legs) for(const f of feet) combos.push({torso_base:t.id,piernas:l.id,pies:f.id});
  for(const d of dresses) for(const f of feet) combos.push(isEnterito(d)?{cuerpo:d.id,pies:f.id}:{cuerpo:d.id,pies:f.id});
  if(combos.length>3500){ combos.sort(()=>Math.random()-.5); combos=combos.slice(0,3500); }
  const dislikes=new Set(p.dislikes||[]);
  const scored=combos.map(c=>({c,s:evaluate({slots:c,locks:{}},ctx,p,{...opts,noClima:true}).s})).sort((a,b)=>b.s-a.s).slice(0,45);
  const full=scored.map(({c})=>{
    const o={slots:{...c},locks:{}}; const e=fillLayers(o,ctx,p,opts);
    let adj=0; Object.values(o.slots).forEach(id=>{const it=byId(id); if(!it) return; if(daysAgo(it.ultimoUso)<=3) adj-=.035; { const fr=['otoño','invierno'].includes(estacion()); if((fr&&it.temporada==='verano')||(!fr&&it.temporada==='invierno')) adj-=.04; } adj+=Math.min(.03,.01*((p.likes||{})[id]||0));});
    return {o,e,ok:climaOK(e),score:e.s+adj,key:comboKey(o)};
  }).filter(x=>!dislikes.has(x.key)).sort((a,b)=>(b.ok-a.ok)||(b.score-a.score));
  const pick=[];
  for(const f of full){
    const sig=[f.o.slots.torso_base||f.o.slots.cuerpo,f.o.slots.piernas||'-',f.o.slots.pies];
    if(pick.every(q=>{const s2=[q.o.slots.torso_base||q.o.slots.cuerpo,q.o.slots.piernas||'-',q.o.slots.pies]; return sig.filter((v,i)=>v!==s2[i]).length>=2;})) pick.push(f);
    if(pick.length===3) break;
  }
  return pick;
}
function comboKey(o){ return Object.keys(o.slots).sort().map(k=>o.slots[k]).join('|'); }

/* ============ IA: función segura en Supabase que llama a Claude ============ */
async function aiCall(prompt,{image=null,tier='fast',max=1200}={}){
  let r;
  try{ r=await fetch(CFG.supabaseUrl+'/functions/v1/estilista',{method:'POST',headers:{'content-type':'application/json',apikey:CFG.supabaseAnonKey,authorization:'Bearer '+session.access_token},body:JSON.stringify({prompt,image,tier,max_tokens:max})}); }
  catch(e){ throw {code:'offline'}; }
  const d=await r.json().catch(()=>({}));
  if(!r.ok) throw {code:r.status===401?'session_expired':r.status===429?'rate_limited':d.code||'upstream_error',message:d.error||''};
  if(!d.text) throw {code:'empty_completion'};
  return d.text;
}
function parseJSON(t){
  try{ return JSON.parse(t); }catch(e){}
  const m=t.match(/```(?:json)?\s*([\s\S]*?)```/); if(m){ try{ return JSON.parse(m[1]); }catch(e){} }
  const a=t.search(/[\[{]/), b=Math.max(t.lastIndexOf('}'),t.lastIndexOf(']'));
  if(a>=0&&b>a){ try{ return JSON.parse(t.slice(a,b+1)); }catch(e){} }
  throw {code:'invalid_json'};
}
async function fileToB64(file,max=1400){
  const {im,u}=await loadImage(file); const k=Math.min(1,max/Math.max(im.naturalWidth,im.naturalHeight));
  const c=document.createElement('canvas'); c.width=Math.round(im.naturalWidth*k); c.height=Math.round(im.naturalHeight*k);
  const g=c.getContext('2d'); g.fillStyle='#fff'; g.fillRect(0,0,c.width,c.height); g.drawImage(im,0,0,c.width,c.height); URL.revokeObjectURL(u);
  return c.toDataURL('image/jpeg',.85).split(',')[1];
}
/* misma forma que usaba el prototipo: sampleFn(prompt,opts) y sampleFn.json(prompt,opts) */
function makeAI(){
  const img=async o=>o&&o.images&&o.images[0]?fileToB64(o.images[0]):null;
  const f=async(prompt,o={})=>{ const text=await aiCall(prompt,{image:await img(o),tier:o.modelTier==='quick'?'fast':'smart',max:900}); o.onText&&o.onText({text,delta:text}); return {text}; };
  f.json=async(prompt,o={})=>parseJSON(await aiCall(prompt+'\n\nRespondé SOLO con el JSON, sin texto antes ni después.',{image:await img(o),tier:'smart',max:3500}));
  return f;
}
function initAI(){ if(CLOUD&&session){ sampleFn=makeAI(); sampleImages=true; } else { sampleFn=null; sampleImages=false; } }
function aiErr(e){
  const c=e?.code;
  if(c==='offline') return 'Sin conexión: no pude consultar a la IA. Probá cuando tengas señal.';
  if(c==='session_expired') return 'Se venció la sesión. Salí y volvé a entrar desde Perfil.';
  if(c==='no_key') return 'Falta configurar la clave de la IA (GEMINI_API_KEY) en Supabase.';
  if(c==='rate_limited') return 'Demasiadas consultas seguidas. Probá de nuevo en un rato.';
  if(c==='image_rejected') return 'No pude leer esa foto. Probá con otra.';
  if(c==='invalid_json') return 'La respuesta vino rara. Tocá de nuevo para reintentar.';
  if(c==='refused') return 'La IA no quiso analizar esa imagen.';
  return 'Algo falló al consultar la IA'+(e&&e.message?': '+String(e.message).slice(0,160):'')+'. Probá de nuevo.';
}
const AI_PROMPT = `Sos un catalogador de ropa para una app de estilismo. La foto puede tener UNA o VARIAS prendas (ropa, calzado o accesorios), extendidas sobre una cama o el piso, colgadas o puestas. Detectá cada prenda por separado. Ignorá personas, muebles y fondo.
Respondé SOLO con JSON con esta forma: {"prendas":[{...}]}. Campos de cada prenda:
"nombre": nombre corto en español rioplatense, ej. "Remera blanca lisa", "Jean azul recto".
"tipo": remera, camisa, blusa, top, chomba, buzo, sweater, cardigan, campera, camperón, tapado, saco, chaleco, jean, pantalón, jogging, short, pollera, vestido, enterito, zapatillas, zapatos, botas, sandalias, gorro, gorra, sombrero, anteojos, aros, collar, bufanda, pañuelo, cinturón, reloj, pulsera, anillo, cartera, mochila, morral, riñonera o medias.
"zona": una de cabeza | cuello | torso | cuerpo | cintura | piernas | muneca | pies | medias | externo  (cuerpo = vestido o enterito; cuello = aros, collares, bufandas; externo = carteras, mochilas, morrales).
"capa": solo si zona es torso: base | intermedia | exterior; si no, null.
"color": el color principal, elegido de esta lista: ${Object.keys(COLORES).join(', ')}.
"hex": color principal aproximado, #rrggbb.
"estampado": liso | rayas | cuadros | floreado | animal print | logo | otro.
"material": estimado, ej. algodón, denim, lana, cuero, sintético.
"calce": slim | recto | oversize | cropped | ancho, o null si no aplica.
"formalidad": entero 1 (muy informal) a 5 (formal).
"abrigo": entero 1 (muy liviano) a 5 (muy abrigado).
"estilo": el estilo principal: deportivo | casual | clasico | elegante | urbano.
"estilos_extra": lista de otros estilos con los que también funciona (puede ser vacía).
"ocasiones": lista de ocasiones donde se puede usar, entre casa, trabajo, casual (salida casual), elegante (cena o salida arreglada), formal (evento), deporte. Una prenda puede servir para varias (ej. un jean oscuro: casa, trabajo, casual, elegante).
"temporada": verano | entretiempo | invierno | todo el año.
"apto_lluvia": true o false (gamuza, lino, tela clara delicada o zapatillas blancas de tela = false).
"vigencia": atemporal (básico clásico que nunca pasa de moda) | actual (corte, lavado o detalle propio de la moda de estos años) | desactualizada (claramente de otra época, ej. jean tiro bajo con roturas de los 2000, camisa con estampado brillante de los 2000). Juzgá por corte, lavado, largo y detalles, no por el color.
"edad_min" y "edad_max": rango de edad de las personas que típicamente usan ese estilo de prenda hoy (ej. 15 y 35 para un buzo de anime oversize; 18 y 80 para una camisa oxford lisa).
"bbox": [x, y, ancho, alto] de la prenda dentro de la foto, en fracciones de 0 a 1 desde la esquina superior izquierda, bien ajustada a la prenda.
Si no hay ninguna prenda, devolvé {"prendas":[]}.`;

function normItem(r){
  const zonas=ZONAS.map(z=>z.k); let zona=zonas.includes(r.zona)?r.zona:'torso';
  let capa=zona==='torso'?(['base','intermedia','exterior'].includes(r.capa)?r.capa:'base'):null;
  const color=(r.color&&COLORES[String(r.color).toLowerCase()])?String(r.color).toLowerCase():(r.color||'gris');
  const hex=/^#[0-9a-f]{6}$/i.test(r.hex||'')?r.hex:(COLORES[color]||'#999999');
  const n=(v,d)=>{v=Math.round(+v);return v>=1&&v<=5?v:d};
  return {id:uid(),nombre:String(r.nombre||cap(r.tipo)||'Prenda').slice(0,60),tipo:String(r.tipo||'').toLowerCase(),zona,capa,color,hex,
    estilo:ESTILOS.includes(r.estilo)?r.estilo:'casual',
    estilos:Array.isArray(r.estilos_extra)?r.estilos_extra.filter(e=>ESTILOS.includes(e)&&e!==r.estilo):[],
    ocasiones:Array.isArray(r.ocasiones)?r.ocasiones.filter(k=>OCASIONES.some(o=>o.k===k)):[],formalidad:n(r.formalidad,2),abrigo:n(r.abrigo,1),estampado:r.estampado||'liso',
    material:r.material||'',calce:r.calce||'recto',temporada:r.temporada||'todo el año',lluvia:r.apto_lluvia!==false,
    estado:'limpio',fav:false,usos:0,ultimoUso:null,foto:null,ejemplo:false,
    vigencia:['atemporal','actual','desactualizada'].includes(r.vigencia)?r.vigencia:'atemporal',
    edadMin:Number.isFinite(+r.edad_min)&&r.edad_min!=null?+r.edad_min:null, edadMax:Number.isFinite(+r.edad_max)&&r.edad_max!=null?+r.edad_max:null};
}
function loadImage(file){ return new Promise((res,rej)=>{ const u=URL.createObjectURL(file); const im=new Image(); im.onload=()=>res({im,u}); im.onerror=()=>{URL.revokeObjectURL(u);rej(new Error('img'))}; im.src=u; }); }
function crop(im,b,max=380){
  let [x,y,w,h]=Array.isArray(b)&&b.length===4?b.map(Number):[0,0,1,1];
  if(![x,y,w,h].every(Number.isFinite)||w<=0||h<=0){x=0;y=0;w=1;h=1;}
  const pad=.04; x=clamp(x-pad); y=clamp(y-pad); w=clamp(w+2*pad,0,1-x); h=clamp(h+2*pad,0,1-y);
  const sx=x*im.naturalWidth, sy=y*im.naturalHeight, sw=Math.max(8,w*im.naturalWidth), sh=Math.max(8,h*im.naturalHeight);
  const k=Math.min(1,max/Math.max(sw,sh)); const c=document.createElement('canvas'); c.width=Math.round(sw*k); c.height=Math.round(sh*k);
  const g=c.getContext('2d'); g.fillStyle='#ffffff'; g.fillRect(0,0,c.width,c.height); g.drawImage(im,sx,sy,sw,sh,0,0,c.width,c.height);
  return c.toDataURL('image/jpeg',.78);
}
async function handleFiles(files){
  files=[...files].filter(f=>/^image\//.test(f.type)); if(!files.length) return;
  review={busy:true,items:[],msg:`Analizando ${files.length>1?files.length+' fotos':'la foto'}…`}; render();
  const out=[];
  for(const f of files){
    let img; try{ img=await loadImage(f); }catch(e){ continue; }
    if(sampleFn && sampleImages){
      try{
        const r=await sampleFn.json(AI_PROMPT,{images:[f]});
        const arr=Array.isArray(r)?r:(r&&Array.isArray(r.prendas)?r.prendas:[]);
        if(!arr.length) review.msg='En una foto no detecté prendas.';
        arr.forEach(x=>{ const it=normItem(x||{}); it.foto=crop(img.im,x&&x.bbox); out.push({it,on:true}); });
      }catch(e){ review.msg=aiErr(e); out.push({it:Object.assign(normItem({nombre:'Prenda nueva'}),{foto:crop(img.im,null)}),on:true,manual:true}); }
    } else {
      out.push({it:Object.assign(normItem({nombre:'Prenda nueva'}),{foto:crop(img.im,null)}),on:true,manual:true});
    }
    URL.revokeObjectURL(img.u);
  }
  review={busy:false,items:out,msg:review.msg&&!review.msg.startsWith('Analizando')?review.msg:''}; render();
}

function trendPrompt(g){
  const T=tendenciaVigente(); if(!T) return 'No hay datos de tendencias cargados para esta temporada: no inventes tendencias.';
  const L=T[g==='hombre'?'hombre':'mujer'];
  return `Tendencias ${T.label} (investigadas en ${T.actualizado}, usá SOLO estas, no inventes otras): colores ${L.nombres}; prendas ${L.prendasTxt}. ${T.fueraTxt} Las tendencias son un plus, nunca un motivo para criticar algo clásico.`;
}
let selfieBusy=false;
async function analizarSelfie(file){
  if(!sampleFn) return; selfieBusy=true; render();
  try{
    const r=await sampleFn.json(`Sos un asesor de colorimetría. Mirá la selfie (luz natural) y estimá el subtono de piel de la persona para elegir colores de ropa.
Respondé SOLO con JSON: {"subtono":"calido"|"frio"|"neutro","estacion":"primavera"|"verano"|"otoño"|"invierno","pelo":"color de pelo","ojos":"color de ojos","colores_que_favorecen":["4 a 6 colores de esta lista: ${Object.keys(COLORES).join(', ')}"],"explicacion":"1 frase en español rioplatense, con vos"}.
Si la luz o la foto no permiten saberlo, poné "neutro" y explicalo.`,{images:[file]});
    const pf=prof().perfil;
    if(['calido','frio','neutro'].includes(r.subtono)) pf.subtono=r.subtono;
    pf.colorNota=`${cap(r.estacion||'')}${r.estacion?': ':''}${r.explicacion||''}${Array.isArray(r.colores_que_favorecen)&&r.colores_que_favorecen.length?' Te favorecen: '+r.colores_que_favorecen.join(', ')+'.':''}`;
    save(); toast('Colorimetría actualizada');
  }catch(e){ toast(aiErr(e)); }
  selfieBusy=false; render();
}
async function aiOpinion(){
  if(!sampleFn) return;
  const p=prof(), o=p.outfit, ctx=ST.ctx, e=evaluate(o,ctx,p,evalOpts());
  const desc=Object.entries(o.slots).map(([k,id])=>{const i=byId(id); return i?`- ${SUB[k].l}: ${i.nombre} (${i.color}, ${ESTILO_LBL[i.estilo]||i.estilo}, formalidad ${i.formalidad}/5, abrigo ${i.abrigo}/5)`:'';}).filter(Boolean).join('\n');
  const closet=p.items.filter(i=>i.estado!=='sucio').slice(0,60).map(i=>`${i.nombre} [${SUB[subFor(i)].l}]`).join('; ');
  const pf=p.perfil, sil=silParams(p);
  const prompt=`Sos Lombardi, un estilista personal amable y directo (con onda, sin ser cruel). Hablás en español rioplatense, tuteo con "vos".
Persona: ${pf.genero}${pf.edad?', '+pf.edad+' años':''}, silueta ${sil.l.toLowerCase()}, subtono ${pf.subtono}.
Plan: ${(OCASIONES.find(x=>x.k===ctx.ocasion)||{}).l}, estilo ${ESTILO_LBL[ctxEstilo()]}, clima ${ctx.clima}, ${TEMPS[ctx.temp].l}${ctx.auto&&ctx.wxTxt?' (pronóstico real: '+ctx.wxTxt+')':''}. Estación: ${estacion()} (hemisferio norte). Quiere estar: ${(MODA_LVL[pf.moda]||MODA_LVL.aldia).l.toLowerCase()}.
${trendPrompt(pf.genero)}
Conjunto:
${desc}
Resultado del motor: ${SEG_TXT[e.seg]} (${segGroup(e.seg)}). Problemas detectados: ${e.issues.map(i=>i.t).join('; ')||'ninguno'}.
Prendas disponibles en su armario: ${closet}.
Dame tu opinión en 3 o 4 frases cortas. Si el conjunto está bien, decilo sin buscarle la quinta pata. Si sugerís un cambio, usá solo prendas del armario por su nombre. Nada de listas ni títulos.`;
  aiTxt='…'; renderEvalOnly();
  try{ await sampleFn(prompt,{modelTier:'quick',onText:({text})=>{aiTxt=text; renderEvalOnly();}}); }
  catch(err){ aiTxt=err?.text||aiErr(err); renderEvalOnly(); }
}

/* ============ vistas ============ */
const ICONS={
  hoy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  armar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2.5"/><path d="M8 9h8l-1 6h-6zM9.5 15l-1 7M14.5 15l1 7"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  armario:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6a2 2 0 1 1 2 2v1.5"/><path d="M14 9.5l7.5 5.5c.6.5.3 1.5-.5 1.5H3c-.8 0-1.1-1-.5-1.5L10 9.5"/></svg>',
  perfil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1zm2 0h6V7a3 3 0 0 0-6 0z"/></svg>'
};
const ROUTES=['hoy','armar','agregar','armario','perfil'];
function route(){ const h=(location.hash||'').slice(1); return ROUTES.includes(h)?h:'hoy'; }
function go(r){ if(location.hash!=='#'+r) location.hash=r; else render(); }

function header(){
  const ps=ST.profiles;
  return `<header class="top"><div class="brand">${logo(38)}<div class="brand-name"><b>Lombardi</b><small>Fashion <i id="syncdot" class="sync" data-s="${syncState}" title="${SYNC_TXT[syncState]||''}"></i></small></div></div>
  <div class="who" role="group" aria-label="Perfil">${['ella','lucho'].filter(k=>ps[k]).map(k=>[k,ps[k]]).map(([k,v])=>`<button data-act="prof" data-id="${k}" aria-pressed="${ST.active===k}">${esc(v.perfil.nombre||k)}</button>`).join('')}</div></header>`;
}
function tabs(){
  const r=route(); const t=(k,l)=>`<button data-act="nav" data-to="${k}" ${r===k?'aria-current="page"':''}>${ICONS[k]}<span>${l}</span></button>`;
  return `<div class="in">${t('hoy','Hoy')}${t('armar','Armar')}<button class="add" data-act="nav" data-to="agregar" ${r==='agregar'?'aria-current="page"':''} aria-label="Agregar prendas"><span class="plus">${ICONS.plus}</span><span>Agregar</span></button>${t('armario','Armario')}${t('perfil','Perfil')}</div>`;
}
function semaHTML(seg,small){ return `<div class="sema ${small?'sm':''}" role="img" aria-label="${SEG_TXT[seg]}">${[1,2,3,4,5,6,7,8,9].map(i=>`<i class="${i<=seg?'on':''}" style="background:var(--s${i})"></i>`).join('')}</div>`; }
/* ============ clima en tiempo real (Open-Meteo, sin clave) ============ */
let WX={data:null,t:0,key:'',place:null,loading:false,err:'',errAt:0};
const FR=[{k:'ahora',l:'Ahora'},{k:'manana',l:'Mañana 6–13'},{k:'tarde',l:'Tarde 13–20'},{k:'noche',l:'Noche 20–01'},{k:'dia',l:'Todo el día'},{k:'turno',l:'Mi horario'}];
async function ensurePlace(pf){
  if(pf.geo&&pf.lugar) return pf.lugar;
  const q=(pf.ciudad||'Pavia di Udine').trim();
  if(pf.lugar&&pf.lugar.q===q) return pf.lugar;
  const r=await fetch('https://geocoding-api.open-meteo.com/v1/search?count=1&language=es&name='+encodeURIComponent(q));
  const d=await r.json(); const g=d.results&&d.results[0]; if(!g) throw new Error('ciudad');
  pf.lugar={lat:g.latitude,lon:g.longitude,name:g.name+(g.admin1?', '+g.admin1:''),q}; save(); return pf.lugar;
}
async function loadWeather(force){
  const pf=prof().perfil, key=pf.geo?'geo':(pf.ciudad||'');
  if(WX.loading) return;
  if(!force&&WX.data&&WX.key===key&&Date.now()-WX.t<30*60e3) return;
  if(!force&&WX.err&&Date.now()-WX.errAt<5*60e3) return;
  WX.loading=true; WX.err='';
  try{
    const pl=await ensurePlace(pf);
    const u=`https://api.open-meteo.com/v1/forecast?latitude=${pl.lat}&longitude=${pl.lon}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,snowfall,weather_code,wind_speed_10m&timezone=auto&forecast_days=3`;
    const d=await (await fetch(u)).json(); if(!d.hourly) throw new Error('wx');
    WX={data:d,t:Date.now(),key,place:pl,loading:false,err:'',errAt:0};
  }catch(e){ WX.loading=false; WX.err=e.message==='ciudad'?'No encontré esa ciudad. Revisala en Perfil.':'No pude traer el clima. Revisá la conexión o pasá a modo manual.'; WX.errAt=Date.now(); }
  if(applyWeather()) save();
  if(['hoy','armar'].includes(route())) render();
}
function wxWindow(c){
  const now=new Date(), base=new Date(now.getFullYear(),now.getMonth(),now.getDate()+(c.dia==='manana'?1:0)), H=h=>new Date(base.getTime()+h*3600e3);
  const hm=s=>{ const [x,y]=String(s||'0:0').split(':').map(Number); return (x||0)+(y||0)/60; };
  switch(c.dia==='manana'&&c.franja==='ahora'?'dia':c.franja){
    case 'ahora': { const a=new Date(now); a.setMinutes(0,0,0); return [a,new Date(a.getTime()+3*3600e3)]; }
    case 'manana': return [H(6),H(13)];
    case 'tarde': return [H(13),H(20)];
    case 'noche': return [H(20),H(25)];
    case 'turno': { const a=hm(c.desde||'06:00'); let b=hm(c.hasta||'14:00'); if(b<=a) b+=24; return [H(a),H(b)]; }
    default: return [H(7),H(22)];
  }
}
function wxSummary(){
  const d=WX.data; if(!d) return null;
  const [a,b]=wxWindow(ST.ctx), T=d.hourly.time, idx=[];
  T.forEach((t,i)=>{ const x=new Date(t); if(x>=a&&x<=b) idx.push(i); });
  if(!idx.length) return null;
  const pk=k=>idx.map(i=>+d.hourly[k][i]||0);
  const t=pk('temperature_2m'), ap=pk('apparent_temperature'), pp=pk('precipitation_probability'), pr=pk('precipitation'), sn=pk('snowfall'), wc=pk('weather_code'), wi=pk('wind_speed_10m');
  const tmin=Math.min(...t), tmax=Math.max(...t), amin=Math.min(...ap), pmax=Math.max(...pp), rain=pr.reduce((s,x)=>s+x,0), snow=sn.reduce((s,x)=>s+x,0), wmax=Math.max(...wi);
  const clima=snow>.2?'nieve':(pmax>=50||rain>=.5)?'lluvia':(wc.filter(c=>c<=1).length>=wc.length/2?'sol':'nublado');
  const ref=Math.min(amin+1,(tmin+tmax)/2);
  const temp=ref<5?0:ref<12?1:ref<18?2:ref<24?3:4;
  return {tmin:Math.round(tmin),tmax:Math.round(tmax),amin:Math.round(amin),pmax:Math.round(pmax),wmax:Math.round(wmax),clima,temp,spread:Math.round(tmax-tmin)};
}
function applyWeather(){
  const c=ST.ctx; if(!c.auto) { c.spread=0; return false; }
  const s=wxSummary(); if(!s) return false;
  const before=c.clima+'|'+c.temp+'|'+c.spread; c.clima=s.clima; c.temp=s.temp; c.spread=s.spread;
  c.wxTxt=`${s.tmin} a ${s.tmax} °C (sensación mínima ${s.amin} °C), lluvia ${s.pmax}%, viento ${s.wmax} km/h`;
  if(before!==c.clima+'|'+c.temp+'|'+c.spread){ hoyRes=null; return true; } return false;
}
function ctxHTML(){
  const c=ST.ctx, pf=prof().perfil;
  if(c.auto) loadWeather();
  const s=c.auto?wxSummary():null;
  const head=`<div class="seg" style="margin:0" role="group" aria-label="Clima"><button data-act="ctx" data-f="auto" data-v="1" aria-pressed="${!!c.auto}">Clima automático</button><button data-act="ctx" data-f="auto" data-v="0" aria-pressed="${!c.auto}">Manual</button></div>`;
  const autoH=`<div class="stack" style="gap:8px">
      <div class="row">${[{k:'hoy',l:'Hoy'},{k:'manana',l:'Mañana'}].map(x=>`<button class="chip" data-act="ctx" data-f="dia" data-v="${x.k}" aria-pressed="${(c.dia||'hoy')===x.k}">${x.l}</button>`).join('')}</div>
      <div class="row">${FR.filter(f=>!(c.dia==='manana'&&f.k==='ahora')).map(f=>`<button class="chip" data-act="ctx" data-f="franja" data-v="${f.k}" aria-pressed="${c.franja===f.k}">${f.l}</button>`).join('')}</div>
      ${c.franja==='turno'?`<div class="grid2"><div class="field"><label for="ctx-de">Salgo a las</label><input id="ctx-de" type="time" value="${esc(c.desde||'06:00')}" data-ch="ctx" data-f="desde"></div><div class="field"><label for="ctx-ha">Vuelvo a las</label><input id="ctx-ha" type="time" value="${esc(c.hasta||'14:00')}" data-ch="ctx" data-f="hasta"></div></div>`:''}
      ${WX.loading&&!s?`<div class="row tiny muted"><span class="spinner"></span> Trayendo el pronóstico…</div>`:''}
      ${WX.err&&!s?`<p class="note" style="margin:0">${esc(WX.err)} <button class="btn small" data-act="wx-retry">Reintentar</button></p>`:''}
      ${s?`<div class="note" style="margin:0;color:var(--ink)"><b>${esc((WX.place||{}).name||pf.ciudad)}</b> · ${s.tmin} a ${s.tmax} °C · sensación ${s.amin} °C · lluvia ${s.pmax}% · viento ${s.wmax} km/h<br><span class="muted">Para vestirte: ${esc(CLIMAS.find(x=>x.k===s.clima).l.toLowerCase())}, ${esc(TEMPS[s.temp].l.toLowerCase())}${s.spread>=8?`. Cambian ${s.spread} °C en el día: andá en capas`:''}.</span></div>`:''}
    </div>`;
  const manH=`<div class="stack" style="gap:8px"><span class="lbl">Clima</span><div class="row">${CLIMAS.map(x=>`<button class="chip" data-act="ctx" data-f="clima" data-v="${x.k}" aria-pressed="${c.clima===x.k}">${x.l}</button>`).join('')}</div></div>
    <div class="stack" style="gap:8px"><span class="lbl">Temperatura</span><div class="row">${TEMPS.map((x,i)=>`<button class="chip" data-act="ctx" data-f="temp" data-v="${i}" aria-pressed="${c.temp===i}">${x.c}</button>`).join('')}</div></div>`;
  return `<div class="card stack">${head}${c.auto?autoH:manH}
    <div class="grid2">
      <div class="field"><label for="ctx-oc">Ocasión</label><select id="ctx-oc" data-ch="ctx" data-f="ocasion">${OCASIONES.map(o=>`<option value="${o.k}" ${c.ocasion===o.k?'selected':''}>${o.l}</option>`).join('')}</select></div>
      <div class="field"><label for="ctx-es">Estilo de hoy</label><select id="ctx-es" data-ch="ctx" data-f="estilo"><option value="">Mi estilo (${ESTILO_LBL[pf.estilos[c.ocasion]||(OCASIONES.find(o=>o.k===c.ocasion)||{}).e]})</option>${ESTILOS.map(e=>`<option value="${e}" ${c.estilo===e?'selected':''}>${ESTILO_LBL[e]}</option>`).join('')}</select></div>
    </div></div>`;
}

function vHoy(){
  const p=prof(); const d=new Date();
  if(!p.items.length) return `<h1 class="view-title">¿Qué me pongo <i>hoy</i>?</h1>
    <p class="lede">Primero necesito conocer tu ropa, ${esc(p.perfil.nombre)}.</p>
    <div class="card stack"><p style="margin:0">Poné varias prendas sobre la cama y sacales una foto: la IA las separa sola. Con 10 o 15 prendas ya te puedo armar conjuntos.</p>
    <button class="btn primary block" data-act="nav" data-to="agregar">Cargar mi ropa</button>
    <p class="tiny muted" style="margin:0">Antes, completá tu perfil (silueta, colorimetría, ocasiones): mejora mucho las recomendaciones.</p></div>`;
  const fecha=d.toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long'});
  let res='';
  if(hoyRes){
    if(!hoyRes.length) res=`<div class="note">No encontré conjuntos con lo que hay limpio. Cargá más prendas o marcá algunas como limpias.</div>`;
    else res=hoyRes.map((r,i)=>{
      const its=Object.keys(r.o.slots).map(k=>byId(r.o.slots[k])).filter(Boolean);
      const g=segGroup(r.e.seg);
      const why=r.e.pros.slice(0,3).map(x=>`<li>${esc(x)}</li>`).join('') + (r.e.issues[0]?`<li>${esc(r.e.issues[0].t)}</li>`:'');
      return `<article class="card ofit">
        <div class="sema-head"><span class="eyebrow">Propuesta ${i+1}</span><span class="tiny" style="font-weight:600;color:var(--s${g==='verde'?8:g==='amarillo'?5:2})">${SEG_TXT[r.e.seg]}</span></div>
        ${semaHTML(r.e.seg,true)}
        <div class="thumbs">${its.map(vis).join('')}</div>
        <div class="tiny">${its.map(i=>esc(i.nombre)).join(' · ')}</div>
        ${!r.ok?`<p class="note" style="margin:0">Con la ropa que cargaste no llego a cubrir bien este clima. ${esc((r.e.issues.find(i=>i.c==='clima')||{}).t||'')}</p>`:''}
        <ul class="why">${why}</ul>
        <div class="row">
          <button class="btn small primary" data-act="hoy-use" data-i="${i}">Lo uso hoy</button>
          <button class="btn small" data-act="hoy-open" data-i="${i}">Abrir en Armar</button>
          <button class="btn small ghost" data-act="hoy-like" data-i="${i}" aria-label="Me gusta">Me gusta</button>
          <button class="btn small ghost" data-act="hoy-dislike" data-i="${i}" aria-label="No me gusta">No va</button>
        </div></article>`; }).join('');
  }
  return `<h1 class="view-title">¿Qué me pongo <i>hoy</i>?</h1>
  <p class="lede">${cap(fecha)} · ${cap(estacion())}${tendenciaVigente()?' · tendencias '+lc(tendenciaVigente().label):''}</p>
  ${ctxHTML()}
  <div style="margin:14px 0"><button class="btn primary block" data-act="hoy-gen">${hoyRes?'Proponeme otras 3':'Proponeme 3 conjuntos'}</button></div>
  <div class="stack">${res}</div>`;
}

function vArmar(){
  const p=prof(), o=p.outfit, s=silParams(p);
  const spots=SPOTS.map(sp=>{
    const filled=sp.subs.map(k=>o.slots[k]&&byId(o.slots[k])?k:null).filter(Boolean);
    const isBlocked=sp.subs.every(k=>blocked(o,k));
    const locked=sp.subs.some(k=>o.locks[k]&&o.slots[k]);
    const first=filled.length?byId(o.slots[filled[filled.length-1]]):null;
    const x=sp.k==='cuerpo'?Math.max(18,100-s.sh-34):sp.k==='muneca'?100-s.sh-10:sp.k==='externo'?Math.min(184,100+s.sh+34):sp.x;
    return `<button class="hs ${filled.length?'filled':''} ${isBlocked&&!filled.length?'blocked':''}" style="left:${x/2}%;top:${sp.y/430*100}%" data-act="spot" data-k="${sp.k}" aria-label="${sp.l}${filled.length?': '+esc(first.nombre):''}">
      <span class="b">${first?vis(first):(isBlocked?'—':'+')}${filled.length>1?`<span class="cnt">${filled.length}</span>`:''}${locked?`<span class="lk">${ICONS.lock}</span>`:''}</span><span class="t">${sp.l}</span></button>`;
  }).join('');
  const sv=p.saved.length?`<div class="sec-h"><h2>Conjuntos guardados</h2><span class="tiny muted">${p.saved.length}</span></div><div class="stack">${p.saved.map((x,i)=>{const its=Object.values(x.slots).map(byId).filter(Boolean); return `<div class="card" style="padding:12px"><div class="row" style="justify-content:space-between"><b>${esc(x.nombre)}</b><span class="row"><button class="btn small" data-act="saved-load" data-i="${i}">Cargar</button><button class="btn small ghost" data-act="saved-del" data-i="${i}">Borrar</button></span></div><div class="thumbs" style="margin-top:8px">${its.map(vis).join('')}</div></div>`;}).join('')}</div>`:'';
  return `<h1 class="view-title">Armá tu <i>look</i></h1>
  <p class="lede">Tocá cada + para elegir de tu armario. Con el candado fijás una prenda y “Completar” arma el resto.</p>
  ${ctxHTML()}
  <div class="figwrap" id="fig">${figureSVG(s)}${spots}</div>
  <div class="grid2" style="margin-top:12px"><button class="btn dark" data-act="completar">Completar</button><button class="btn primary" data-act="evaluar">Evaluar conjunto</button></div>
  <div class="row" style="justify-content:center;margin-top:8px"><button class="btn small ghost" data-act="guardar">Guardar conjunto</button><button class="btn small ghost" data-act="vaciar">Vaciar</button></div>
  <div id="evalbox" style="margin-top:14px">${evalHTML()}</div>
  ${sv}`;
}
function evalHTML(){
  if(!evalOpen) return '';
  const p=prof(), o=p.outfit, ctx=ST.ctx;
  const e0=evaluate(o,ctx,p,evalOpts());
  if(e0.missing.length) return `<div class="card"><p style="margin:0">Para evaluar te falta ${e0.missing.join(', ')}. Tocá <b>Completar</b> o elegí en la silueta.</p></div>`;
  const {base:e,tips,faltan}=suggestions(o,ctx,p);
  const g=segGroup(e.seg);
  const head = g==='verde'?'Está bien, salimos':g==='amarillo'?'Funciona, pero se puede mejorar':'Así no: hay algo para corregir';
  let tipsH='';
  if(g==='verde'){ tipsH = tips[0]?`<div class="tip"><p><span class="muted tiny">Si querés un toque extra</span><br>${esc(tips[0].txt)}: ${esc(tips[0].why)}.</p><button class="btn small" data-act="tip" data-i="0">Aplicar</button></div>`:`<p class="muted tiny" style="margin:0">Nada para cambiar.</p>`; }
  else tipsH = tips.map((t,i)=>`<div class="tip"><p>${esc(t.txt)}: ${esc(t.why)}.</p><button class="btn small" data-act="tip" data-i="${i}">Aplicar</button></div>`).join('') || `<p class="muted tiny" style="margin:0">Con lo que hay en tu armario no encuentro un cambio que lo mejore.</p>`;
  const crit=Object.keys(CRIT_LBL).map(k=>{const v=e.crit[k].v; const iss=e.issues.find(i=>i.c===k); return `<span class="k"><span class="dot" style="background:${critColor(v)};margin-right:6px"></span>${CRIT_LBL[k]}</span><span class="muted">${esc(iss?iss.t:(v>=.75?'Bien':'Mejorable'))}</span>`;}).join('');
  return `<div class="card stack">
    <div class="sema-head"><b>${head}</b><span class="tiny" style="font-weight:600;color:var(--s${g==='verde'?8:g==='amarillo'?5:2})">${SEG_TXT[e.seg]}</span></div>
    ${semaHTML(e.seg)}
    <div class="crit">${crit}</div>
    ${e.pros.length?`<p class="tiny muted" style="margin:0">Lo bueno: ${esc(e.pros.slice(0,3).join(' · '))}</p>`:''}
    <div class="stack" style="gap:10px"><span class="eyebrow">${g==='verde'?'Opcional':'Consejos con tu ropa'}</span>${tipsH}</div>
    ${faltan.length?`<div class="note">Te falta en el armario: ${esc(faltan.join(', '))}. Lo anoto para la futura sección de compras.</div>`:''}
    ${sampleFn?`<div class="stack" style="gap:8px"><button class="btn small" data-act="ai-op">${aiTxt&&aiTxt!=='…'?'Pedir otra opinión':'Opinión de Lombardi (IA)'}</button>${aiTxt?`<p class="ai-out">${aiTxt==='…'?'<span class="spinner"></span> Pensando…':esc(aiTxt)}</p>`:''}</div>`:''}
  </div>`;
}
function renderEvalOnly(){ const b=$('#evalbox'); if(b) b.innerHTML=evalHTML(); }

/* ============ compras recomendadas ============ */
const FREQ=[{k:0,l:'Nunca'},{k:1,l:'A veces'},{k:2,l:'Seguido'},{k:3,l:'Todos los días'}];
function defFreq(g){ return g==='hombre'?{casa:2,trabajo:3,casual:2,elegante:1,formal:0,deporte:1}:{casa:2,trabajo:3,casual:2,elegante:1,formal:1,deporte:1}; }
function freqOf(p,k){ const f=(p.perfil.freq||{})[k]; return f==null?defFreq(p.perfil.genero)[k]:+f; }
function ocUsadas(p){ return OCASIONES.filter(o=>freqOf(p,o.k)>0).sort((a,b)=>freqOf(p,b.k)-freqOf(p,a.k)); }
function ctxFor(k){ return {...ST.ctx, ocasion:k, estilo:''}; }
function optsFor(p,k){ return {estilo:p.perfil.estilos[k]||(OCASIONES.find(o=>o.k===k)||{}).e, noClima:true}; }
function baseCombos(p,cap){
  const bases=pool(p,'torso_base'), legs=pool(p,'piernas'), feet=pool(p,'pies'), dresses=pool(p,'cuerpo'), all=[];
  for(const t of bases) for(const l of legs) for(const f of feet) all.push({torso_base:t.id,piernas:l.id,pies:f.id});
  for(const d of dresses) for(const f of feet) all.push({cuerpo:d.id,pies:f.id});
  if(all.length<=cap) return {list:all,factor:1};
  const step=all.length/cap, list=[]; for(let i=0;i<cap;i++) list.push(all[Math.floor(i*step)]);
  return {list,factor:all.length/cap};
}
function placeIn(combos,it){
  const k=subFor(it), out=[], seen=new Set();
  for(const c of combos){
    const s={...c};
    if((k==='piernas'||k==='torso_base')&&s.cuerpo) continue;
    if(k==='cuerpo'){ delete s.cuerpo; delete s.piernas; delete s.torso_base; }
    s[k]=it.id;
    const key=Object.keys(s).sort().map(x=>s[x]).join('|'); if(seen.has(key)) continue; seen.add(key); out.push(s);
  }
  return out;
}
function greenStats(p,it,ocK,combos){
  const had=IDX.has(it.id); if(!had) IDX.set(it.id,it);
  const placed=placeIn(combos,it), ctx=ctxFor(ocK), o=optsFor(p,ocK); let g=0; const partners={};
  for(const s of placed){ const e=evaluate({slots:s,locks:{}},ctx,p,o); if(e.seg>=7){ g++; for(const id of Object.values(s)) if(id!==it.id) partners[id]=(partners[id]||0)+1; } }
  if(!had) IDX.delete(it.id);
  return {green:g,total:placed.length,partners};
}
/* catálogo genérico de prendas para sugerir: [género u/h/m, nombre, tipo, zona, capa, estilo, estilos extra, formalidad, abrigo, colores, extra] */
const CAT=[
  ['u','Remera básica','remera','torso','base','casual',['urbano'],1,1,['blanco','negro','gris','azul marino','verde oliva']],
  ['h','Buzo canguro','buzo','torso','intermedia','urbano',['casual','deportivo'],1,3,['gris','negro','azul marino','verde oliva','bordó']],
  ['u','Sweater de lana','sweater','torso','intermedia','clasico',['casual'],3,3,['verde oliva','camel','gris','azul marino','bordó','crema'],{material:'lana'}],
  ['h','Camisa oxford','camisa','torso','base','clasico',['casual'],3,1,['blanco','celeste']],
  ['h','Sobrecamisa','sobrecamisa','torso','exterior','casual',['urbano'],2,2,['camel','verde oliva','marrón']],
  ['u','Campera bomber','campera bomber','torso','exterior','urbano',['casual'],2,3,['negro','verde oliva','azul marino','bordó']],
  ['u','Campera puffer','camperón','torso','exterior','urbano',['casual'],2,5,['negro','azul marino','verde oliva']],
  ['h','Trench','trench','torso','exterior','elegante',['clasico'],4,3,['camel','beige','negro']],
  ['u','Jean recto','jean','piernas',null,'casual',['urbano'],2,2,['denim','negro']],
  ['u','Jogging','jogging','piernas',null,'deportivo',['urbano','casual'],1,2,['gris','negro','azul marino']],
  ['h','Chino','pantalón chino','piernas',null,'clasico',['casual'],3,2,['beige','azul marino','verde oliva']],
  ['u','Zapatillas urbanas bajas','zapatillas','pies',null,'urbano',['casual'],2,1,['blanco','negro','gris'],{lluvia:false}],
  ['u','Botas tipo chelsea','botas','pies',null,'clasico',['casual','elegante'],3,3,['marrón','negro']],
  ['u','Mocasines','mocasín','pies',null,'clasico',['elegante'],4,1,['marrón','negro']],
  ['u','Bufanda','bufanda','cuello',null,'casual',['clasico'],2,2,['gris','camel','bordó']],
  ['u','Gorro de lana','gorro','cabeza',null,'casual',['urbano'],1,3,['negro','gris','bordó']],
  ['m','Blusa','blusa','torso','base','clasico',['elegante'],3,1,['blanco','rosa','crema','bordó']],
  ['m','Cardigan','cardigan','torso','intermedia','clasico',['casual'],3,2,['crema','camel','gris']],
  ['m','Blazer entallado','blazer','torso','exterior','elegante',['clasico'],4,2,['negro','camel','bordó']],
  ['m','Pantalón sastrero','pantalón sastrero','piernas',null,'clasico',['elegante'],4,2,['negro','camel']],
  ['m','Pollera midi','pollera','piernas',null,'clasico',['elegante'],3,1,['negro','camel','bordó']],
  ['m','Vestido de punto','vestido','cuerpo',null,'casual',['clasico'],2,2,['gris','bordó','camel'],{temporada:'invierno'}],
  ['m','Vestido negro','vestido','cuerpo',null,'elegante',['clasico'],4,1,['negro']],
  ['m','Botas altas','botas altas','pies',null,'elegante',['clasico'],4,3,['negro','marrón']],
  ['m','Tapado','tapado','torso','exterior','elegante',['clasico'],4,4,['camel','negro','gris']],
  ['m','Cartera de cuero','cartera','externo',null,'clasico',['elegante','casual'],3,1,['negro','camel','bordó']],
  ['m','Aros','aros','cuello',null,'elegante',['casual'],3,1,['dorado','plateado']]
];
function catalogo(p){
  const g=p.perfil.genero==='hombre'?'h':'m', out=[];
  for(const [gg,nombre,tipo,zona,capa,estilo,ext,f,a,colores,x] of CAT){
    if(gg!=='u'&&gg!==g) continue;
    for(const color of colores){
      const c=I(`${nombre} ${color}`,tipo,zona,capa,color,estilo,f,a,Object.assign({ejemplo:false,estilos:ext,virtual:true,ckey:tipo+'|'+color},x||{}));
      c.id='v_'+uid();
      if(vetado(c,p)) continue;
      const dup=p.items.some(i=>similar(i,c));
      if(!dup) out.push(c);
    }
  }
  return out;
}
let comprasCache=null, comprasBusy=false, comprasOc=null, comprasProg=0;
function sigP(p){ return ST.active+'|'+p.items.map(i=>i.id+i.estado+i.formalidad+i.estilo+(i.estilos||[]).join()+(i.ocasiones||[]).join()+i.color+i.zona).join(',')+'|'+JSON.stringify(p.perfil.freq||{})+JSON.stringify(p.perfil.estilos)+p.perfil.moda+p.perfil.subtono+p.perfil.genero; }
async function calcCompras(){
  const p=prof(), sig=sigP(p), who=ST.active;
  if(comprasBusy||(comprasCache&&comprasCache.sig===sig)) return;
  comprasBusy=true; comprasProg=0;
  const ocs=ocUsadas(p), {list:combos,factor}=baseCombos(p,400), cands=catalogo(p), base={};
  for(const o of ocs){ const ctx=ctxFor(o.k), op=optsFor(p,o.k); let g=0; const per={};
    for(const s of combos){ const e=evaluate({slots:s,locks:{}},ctx,p,op); if(e.seg>=7){ g++; for(const id of Object.values(s)) per[id]=(per[id]||0)+1; } }
    base[o.k]={green:Math.round(g*factor),per}; }
  const res=[];
  for(let i=0;i<cands.length;i++){
    if(ST.active!==who){ comprasBusy=false; return; }
    const c=cands[i], r={c,by:{}};
    for(const o of ocs){ const st=greenStats(p,c,o.k,combos); r.by[o.k]={green:Math.round(st.green*factor),partners:st.partners}; }
    res.push(r);
    if(i%3===2){ comprasProg=(i+1)/cands.length; const b=$('#cprog'); if(b) b.style.width=Math.round(comprasProg*100)+'%'; await new Promise(z=>setTimeout(z,0)); }
  }
  comprasBusy=false;
  if(ST.active!==who) return;
  comprasCache={sig,base,res,ocs,factor};
  if(route()==='armario'&&armTab==='compras') render();
}
const CORE=new Set(['torso_base','piernas','pies','cuerpo']);
function valor(r,k,p){ const g=r.by[k].green, s=subFor(r.c); if(CORE.has(s)) return g; const ya=p.items.filter(i=>subFor(i)===s&&i.estado!=='sucio').length; return g*(ACCES.has(r.c.zona)?.2:.35)/(1+.5*ya); }
function nivel(g,baseG){ if((baseG<3&&g>=3)||(g>=8&&g>=baseG*.5)) return ['Imprescindible','']; if(g>=5) return ['Muy útil','b']; return ['Opcional','c']; }
function recCard(r,k,reason,baseG){
  let [lv,cls]=nivel(valor(r,k,prof()),baseG); if(ACCES.has(r.c.zona)&&lv==='Imprescindible'){ lv='Muy útil'; cls='b'; } const idx=comprasCache.res.indexOf(r);
  return `<div class="rec">${vis(r.c)}<div class="stack" style="gap:6px;min-width:0">
    <div class="row" style="justify-content:space-between"><b>${esc(r.c.nombre)}</b><span class="lvl ${cls}">${lv}</span></div>
    <p class="muted">${esc(reason)}</p>
    <div class="row"><button class="btn small" data-act="compra-cons" data-i="${idx}">Analizar a fondo</button><button class="btn small ghost" data-act="compra-no" data-key="${esc(r.c.ckey)}">No me interesa</button></div></div></div>`;
}
function socioTxt(r,k,n=2){ const ps=Object.entries(r.by[k].partners).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([id])=>byId(id)).filter(Boolean); return ps.length?` Combina con ${ps.map(i=>lc(i.nombre)).join(' y ')}.`:''; }
function vCompras(){
  const p=prof();
  if(!comprasCache||comprasCache.sig!==sigP(p)){
    setTimeout(calcCompras,40);
    return `<div class="card stack"><span>Probando cientos de combinaciones con tu ropa…</span><div class="bar"><i id="cprog" style="width:${Math.round(comprasProg*100)}%"></i></div></div>`;
  }
  const C=comprasCache, ocs=C.ocs;
  if(!ocs.length) return `<div class="note">Marcá en Perfil qué ocasiones usás y te recomiendo qué comprar para cada una.</div>`;
  const k=ocs.some(o=>o.k===comprasOc)?comprasOc:ocs[0].k, oc=OCASIONES.find(o=>o.k===k), B=C.base[k];
  const no=new Set(p.comprasNo||[]);
  const list=C.res.filter(r=>!no.has(r.c.ckey)&&r.by[k]&&r.by[k].green>0).sort((a,b)=>valor(b,k,p)-valor(a,k,p));
  const used=new Set(), usedT=new Set();
  const take=(arr,n,why)=>{ const out=[]; for(const r of arr){ if(out.length>=n) break; if(used.has(r.c.ckey)||usedT.has(r.c.tipo)) continue; used.add(r.c.ckey); usedT.add(r.c.tipo); out.push(recCard(r,k,why(r),B.green)); } return out; };
  const ocl=lc(oc.l);
  const why=r=>CORE.has(subFor(r.c))?`Te arma ${r.by[k].green} conjuntos nuevos para ${ocl}.`:`Le suma a ${r.by[k].green} de tus conjuntos para ${ocl}.`;
  const falta=take(list,3,r=>why(r)+socioTxt(r,k));
  /* huérfanas: prendas tuyas aptas para la ocasión que casi no combinan */
  const huerf=p.items.filter(i=>i.estado!=='sucio'&&['torso_base','piernas','pies','cuerpo'].includes(subFor(i))&&((i.ocasiones||[]).includes(k)||Math.abs((+i.formalidad||2)-oc.f)<=1)&&(B.per[i.id]||0)<=2);
  const comb=[];
  for(const o of huerf){ if(comb.length>=3) break; const best=list.filter(r=>!used.has(r.c.ckey)).map(r=>({r,n:Math.round((r.by[k].partners[o.id]||0)*C.factor)})).sort((a,b)=>b.n-a.n)[0];
    if(best&&best.n>=2){ used.add(best.r.c.ckey); comb.push(recCard(best.r,k,`Tu ${lc(o.nombre)} casi no combina para ${ocl}: con esto la usarías en ${best.n} conjuntos.`,B.green)); } }
  const kinds=new Set(p.items.map(i=>subFor(i)+'|'+kindOf(i))), cols=new Set(p.items.map(i=>subFor(i)+'|'+i.color));
  const vari=take(list.filter(r=>r.by[k].green>=2&&(!kinds.has(subFor(r.c)+'|'+kindOf(r.c))||!cols.has(subFor(r.c)+'|'+r.c.color))),3,r=>`Algo distinto a lo que ya tenés. ${why(r)}`);
  const T=tendenciaVigente(), g=p.perfil.genero;
  const moda=T?take(list.filter(r=>r.by[k].green>=2&&trendHit(r.c,T,g)),3,r=>`${trendWhy(r.c,T,g)}. ${why(r)}`):[];
  const sec=(t,sub,arr,empty)=>`<section class="card stack" style="gap:12px"><div><h3 style="font-family:var(--f-display);font-weight:500;font-size:20px;margin:0">${t}</h3><p class="tiny muted" style="margin:2px 0 0">${sub}</p></div>${arr.length?arr.join(''):`<p class="tiny muted" style="margin:0">${empty}</p>`}</section>`;
  return `<div class="row" style="margin-bottom:12px;flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px">${ocs.map(o=>`<button class="chip" data-act="compra-oc" data-v="${o.k}" aria-pressed="${o.k===k}">${o.l}</button>`).join('')}</div>
  <p class="lede">Para ${ocl} hoy tenés ${C.factor>1?'unos ':''}${B.green} conjuntos que quedan bien. Usás esta ocasión ${lc(FREQ[freqOf(p,k)].l)}.</p>
  <div class="stack">
    ${sec('Te harían falta','Lo que más conjuntos nuevos te arma con tu ropa.',falta,'Para esta ocasión ya estás bien cubierto.')}
    ${sec('Para combinar lo que ya tenés','Prendas tuyas que casi no usás porque no tienen con qué.',comb,'Todo lo que tenés para esta ocasión ya combina.')}
    ${sec('Para más variedad','Tipos o colores que no tenés y que igual combinan.',vari,'No encontré nada distinto que combine bien.')}
    ${sec('Para estar a la moda',T?`Según las tendencias de ${lc(T.label)}.`:'Sin tendencias cargadas para esta temporada.',moda,'Nada en tendencia que te sume para esta ocasión.')}
  </div>
  <p class="tiny muted">Las ocasiones que marcaste como “Nunca” en Perfil no aparecen. Sugerencias genéricas: el color y el tipo de prenda, no una marca.</p>`;
}
let armTab='ropa';
let armFilter='todo';
const FILTERS=[{k:'todo',l:'Todo'},{k:'torso',l:'Arriba'},{k:'piernas',l:'Abajo'},{k:'cuerpo',l:'Vestidos'},{k:'pies',l:'Calzado'},{k:'acc',l:'Accesorios'},{k:'sucio',l:'Sucias'}];
function vArmario(){
  const seg=`<div class="seg mode" role="group" aria-label="Sección"><button data-act="arm-tab" data-v="ropa" aria-pressed="${armTab==='ropa'}">Mi ropa</button><button data-act="arm-tab" data-v="compras" aria-pressed="${armTab==='compras'}">Qué comprar</button></div>`;
  if(armTab==='compras') return `<h1 class="view-title">Qué <i>comprar</i></h1>${seg}${vCompras()}`;
  const p=prof(); const all=p.items;
  const f=armFilter;
  const list=all.filter(i=>f==='todo'||(f==='acc'?ACCES.has(i.zona):f==='sucio'?i.estado==='sucio':i.zona===f));
  const dirty=all.filter(i=>i.estado==='sucio').length, ex=all.filter(i=>i.ejemplo).length;
  return `<h1 class="view-title">Tu <i>armario</i></h1>
  ${seg}
  <p class="lede">${all.length} prendas${dirty?` · ${dirty} sucias`:''}${ex?` · ${ex} de ejemplo`:''}</p>
  ${ex?`<div class="note" style="margin-bottom:12px">Las prendas marcadas “ejemplo” son para probar la app. Cuando cargues las tuyas, borralas desde Perfil.</div>`:''}
  <div class="row" style="margin-bottom:12px;flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px">${FILTERS.map(x=>`<button class="chip" data-act="filter" data-v="${x.k}" aria-pressed="${f===x.k}">${x.l}</button>`).join('')}</div>
  ${list.length?`<div class="items">${list.map(i=>`<button class="item ${i.estado==='sucio'?'dirty':''}" data-act="item" data-id="${i.id}">${vis(i)}<span class="nm">${esc(i.nombre)}</span><span class="row" style="gap:4px"><span class="dot" style="background:${esc(i.hex)};border:1px solid var(--line)"></span>${i.estado==='sucio'?'<span class="badge dirty">sucia</span>':''}${i.ejemplo?'<span class="badge">ejemplo</span>':''}</span></button>`).join('')}</div>`:`<div class="note">No hay prendas en este filtro.</div>`}`;
}

/* ---- consulta en tienda: analiza una prenda sin agregarla ---- */
let addMode='agregar', consult=null;
function modeSeg(){ return `<div class="seg mode" role="group" aria-label="Modo"><button data-act="mode" data-v="agregar" aria-pressed="${addMode==='agregar'}">Agregar a mi armario</button><button data-act="mode" data-v="consultar" aria-pressed="${addMode==='consultar'}">Solo consultar</button></div>`; }
async function handleConsult(file){
  consult={busy:true}; render();
  let img; try{ img=await loadImage(file); }catch(e){ consult={err:'No pude abrir esa foto. Probá con otra.'}; render(); return; }
  let it=null, msg='';
  if(sampleFn&&sampleImages){
    try{
      const r=await sampleFn.json(AI_PROMPT+'\nSi hay varias prendas, poné primero la principal (la más grande o centrada).',{images:[file]});
      const arr=Array.isArray(r)?r:(r&&Array.isArray(r.prendas)?r.prendas:[]);
      if(arr.length){ it=normItem(arr[0]||{}); it.foto=crop(img.im,arr[0]&&arr[0].bbox); } else msg='No detecté ninguna prenda en la foto: completá los datos a mano.';
    }catch(e){ msg=aiErr(e); }
  }
  if(!it){ it=normItem({nombre:'Prenda a consultar'}); it.foto=crop(img.im,null); if(!msg) msg='Sin IA en esta vista: completá los datos de la prenda y te digo cómo te rinde.'; }
  URL.revokeObjectURL(img.u);
  consult={item:it,msg,file,ai:''}; render();
}
function analizarCompra(it,p){
  const ocsAll=ocUsadas(p), ocs=ocsAll.length?ocsAll:OCASIONES, {list:combos,factor}=baseCombos(p,500);
  const sirve=[], partners={}; let total=0;
  for(const o of ocs){
    const st=greenStats(p,it,o.k,combos); total=Math.max(total,st.total);
    sirve.push({o,f:freqOf(p,o.k),green:Math.round(st.green*factor),pct:st.total?Math.round(st.green/st.total*100):0});
    for(const id in st.partners) partners[id]=(partners[id]||0)+st.partners[id]*(1+freqOf(p,o.k));
  }
  const fuertes=sirve.filter(s=>s.f>=2), ref=fuertes.length?fuertes:sirve;
  const best=ref.reduce((m,s)=>s.pct>m.pct?s:m,{pct:0,green:0});
  const pct=best.pct, green=best.green;
  const socios=Object.entries(partners).sort((a,b)=>b[1]-a[1]).map(([id])=>byId(id)).filter(Boolean);
  const k=subFor(it);
  const dups=p.items.filter(i=>similar(i,it));
  const lvl=MODA_LVL[p.perfil.moda]||MODA_LVL.aldia, g=p.perfil.genero==='hombre'?'hombre':'mujer', T=tendenciaVigente();
  const pros=[], contras=[];
  let sc=total?.85*clamp(pct/70)+.1:.5; let capSeg=9;
  if(total){ if(pct>=50) pros.push(`Combina con mucho de lo que ya tenés`); else if(pct<20) contras.push('Combina con poco de lo que tenés: vas a tener que comprar otras cosas para usarla'); }
  if(total&&fuertes.length&&!fuertes.some(s=>s.green>0)){ sc-=.15; capSeg=Math.min(capSeg,6); contras.push(`No sirve para las ocasiones que más usás (${fuertes.map(s=>lc(s.o.l)).join(', ')})`); }
  if(dups.length){ sc-=.3+.05*(dups.length-1); capSeg=Math.min(capSeg,6); contras.push(`Ya tenés algo muy parecido: ${dups.slice(0,2).map(d=>lc(d.nombre)).join(' y ')}`); }
  if(trendHit(it,T,g)){ sc+=.08*lvl.k; pros.push(trendWhy(it,T,g)); }
  if(it.vigencia==='desactualizada'){ sc-=.2*lvl.k; if(lvl.k>=1) capSeg=Math.min(capSeg,6); contras.push('Se ve de otra época'); }
  const edad=+p.perfil.edad;
  if(edad&&it.edadMax&&edad>+it.edadMax+8){ sc-=.15; capSeg=Math.min(capSeg,6); contras.push('Es de un estilo muy juvenil para tu edad'); }
  if(edad&&it.edadMin&&edad<+it.edadMin-8){ sc-=.15; capSeg=Math.min(capSeg,6); contras.push('Te puede sumar años'); }
  const st=p.perfil.subtono;
  if((st==='calido'||st==='frio')&&['torso','cuerpo','cuello'].includes(it.zona)){ const w=warmth(it); if(w===st) { sc+=.05; pros.push(`El color va con tu paleta ${st==='calido'?'cálida':'fría'}`); } else if(w!=='neutro'){ sc-=.1; contras.push(`El color no es de tu paleta ${st==='calido'?'cálida':'fría'}, y va cerca de la cara`); } }
  if(vetado(it,p)){ sc-=.3; capSeg=Math.min(capSeg,3); contras.push('Es algo que marcaste que no te gusta usar'); }
  const est=estacion(), fria=est==='otoño'||est==='invierno';
  if((fria&&it.temporada==='verano')||(!fria&&it.temporada==='invierno')) pros.push(`Es para la próxima temporada: si está en liquidación, puede ser buena compra`);
  sc=clamp(sc);
  const seg=Math.min(capSeg, sc>=.85?9: sc>=.72?8: sc>=.6?7: sc>=.5?6: sc>=.42?5: sc>=.34?4: sc>=.25?3: sc>=.15?2:1);
  const enTemp=i=>!((fria&&i.temporada==='verano')||(!fria&&i.temporada==='invierno'));
  return {seg,pct,green,total,socios:socios.filter(enTemp),dups,pros,contras,sirve:sirve.filter(s=>s.green>0).sort((a,b)=>b.f-a.f||b.green-a.green),bestOc:best.o};
}
function vConsultar(){
  const aiOK=sampleFn&&sampleImages;
  if(consult&&consult.busy) return `<div class="card row" style="gap:12px"><span class="spinner"></span><span>Analizando la prenda…</span></div>`;
  if(!consult||!consult.item) return `<p class="lede">Estás en una tienda y dudás: sacale foto a la prenda y te digo si te conviene. No se guarda en tu armario.</p>
    ${consult&&consult.err?`<div class="note" style="margin-bottom:12px">${esc(consult.err)}</div>`:''}
    <div class="drop">${logo(54)}<div class="row" style="justify-content:center">
      <label class="btn primary filebtn">Sacar foto<input id="cs-cam" type="file" accept="image/*" capture="environment" data-ch="consfile"></label>
      <label class="btn filebtn">Elegir de la galería<input id="cs-gal" type="file" accept="image/*" data-ch="consfile"></label></div>
      <p class="tiny muted" style="margin:0">${aiOK?'La IA reconoce la prenda y la compara con todo tu armario.':'Sin IA en esta vista: cargás los datos a mano y la comparo igual.'}</p></div>`;
  const p=prof(), it=consult.item, r=consult.r||(consult.r=analizarCompra(it,p)), g=segGroup(r.seg);
  const head=g==='verde'?'Te conviene':g==='amarillo'?'Pensalo':'No te conviene';
  return `${consult.msg?`<div class="note" style="margin-bottom:12px">${esc(consult.msg)}</div>`:''}
  <div class="card stack">
    <div class="sema-head"><b>${head}</b><span class="tiny" style="font-weight:600;color:var(--s${g==='verde'?8:g==='amarillo'?5:2})">${SEG_TXT[r.seg]}</span></div>
    ${semaHTML(r.seg)}
    <div class="rev" style="grid-template-columns:110px 1fr">${vis(it)}<div class="stack" style="gap:4px;min-width:0">
      <span class="big-pct">${r.total?r.pct+'%':'—'}</span>
      <span class="tiny muted">${r.total?`de compatibilidad${r.bestOc?' para '+lc(r.bestOc.l):''}: arma ${r.green} ${r.green===1?'conjunto':'conjuntos'} que quedan bien con tu ropa`:'Todavía no hay prendas en tu armario para comparar'}</span></div></div>
    ${r.total?`<div class="stack" style="gap:6px"><span class="eyebrow">Sirve para</span>${r.sirve.length?`<div class="trend">${r.sirve.map(s=>`<span>${esc(s.o.l)} · ${s.green} ${s.green===1?'conjunto':'conjuntos'}${s.f>=2?' · <b>la usás '+lc(FREQ[s.f].l)+'</b>':''}</span>`).join('')}</div>`:`<p class="tiny muted" style="margin:0">Con tu ropa actual no arma ningún conjunto que quede bien.</p>`}</div>`:''}
    ${r.pros.length?`<div class="stack" style="gap:4px"><span class="eyebrow">A favor</span><ul class="why">${r.pros.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
    ${r.contras.length?`<div class="stack" style="gap:4px"><span class="eyebrow">En contra</span><ul class="why">${r.contras.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
    ${r.socios.length?`<div class="stack" style="gap:6px"><span class="eyebrow">La combinarías con</span><div class="thumbs">${r.socios.slice(0,6).map(vis).join('')}</div><span class="tiny muted">${r.socios.slice(0,6).map(i=>esc(i.nombre)).join(' · ')}</span></div>`:''}
    ${sampleFn?`<div class="stack" style="gap:8px"><button class="btn small" data-act="cons-ai">${consult.ai&&consult.ai!=='…'?'Pedir otra opinión':'Opinión de Lombardi (IA)'}</button>${consult.ai?`<p class="ai-out">${consult.ai==='…'?'<span class="spinner"></span> Pensando…':esc(consult.ai)}</p>`:''}</div>`:''}
    <div class="grid2"><button class="btn" data-act="cons-new">Consultar otra</button><button class="btn primary" data-act="cons-add">La compré: agregar</button></div>
  </div>
  <details class="card" style="margin-top:12px"><summary style="cursor:pointer;font-weight:500">Corregir los datos de la prenda</summary><div class="stack" style="gap:10px;margin-top:12px">${itemFields(it,'cs-','cons')}</div></details>`;
}
async function consAI(){
  if(!sampleFn||!consult||!consult.item) return;
  const p=prof(), it=consult.item, r=consult.r||(consult.r=analizarCompra(it,p)), pf=p.perfil;
  const closet=p.items.filter(i=>i.estado!=='sucio').slice(0,70).map(i=>`${i.nombre} [${SUB[subFor(i)].l}]`).join('; ');
  const prompt=`Sos Lombardi, un estilista personal amable y directo. Hablás en español rioplatense, con "vos".
La persona está en una tienda mirando esta prenda y quiere saber si le conviene comprarla. NO la tiene todavía.
Prenda: ${it.nombre} (${it.tipo}, ${it.color}, ${ESTILO_LBL[it.estilo]}, formalidad ${it.formalidad}/5, abrigo ${it.abrigo}/5, vigencia ${it.vigencia}).
Persona: ${pf.genero}${pf.edad?', '+pf.edad+' años':''}, silueta ${silParams(p).l.toLowerCase()}, subtono ${pf.subtono}, quiere estar ${(MODA_LVL[pf.moda]||MODA_LVL.aldia).l.toLowerCase()}. Estación: ${estacion()} (hemisferio norte).
${trendPrompt(pf.genero)}
Análisis del motor: ${r.total?r.pct+'% de compatibilidad, arma '+r.green+' conjuntos que quedan bien':'armario vacío'}. Sirve para: ${r.sirve.map(s=>s.o.l+' ('+s.green+' conjuntos)').join(', ')||'ninguna ocasión'}. Ocasiones que más usa: ${ocUsadas(p).filter(o=>freqOf(p,o.k)>=2).map(o=>o.l).join(', ')}. A favor: ${r.pros.join('; ')||'nada en especial'}. En contra: ${r.contras.join('; ')||'nada'}.
Su armario: ${closet}.
En 3 o 4 frases cortas: ¿la comprarías o no, y por qué? Decí para qué ocasiones le serviría. Nombrá 1 o 2 prendas de su armario con las que la combinaría. Si ya tiene algo muy parecido, decilo. Sin listas ni títulos.`;
  consult.ai='…'; render();
  const opt={modelTier:'quick',onText:({text})=>{ if(consult){ consult.ai=text; render(); } }};
  if(sampleImages&&consult.file) opt.images=[consult.file];
  try{ await sampleFn(prompt,opt); }catch(e){ if(consult){ consult.ai=e?.text||aiErr(e); render(); } }
}

function vAgregar(){
  if(addMode==='consultar' && !(review&&(review.busy||review.items.length))) return `<h1 class="view-title">¿Me la <i>compro</i>?</h1>${modeSeg()}${vConsultar()}`;
  const aiOK=sampleFn&&sampleImages;
  if(review&&review.busy) return `<h1 class="view-title">Agregar <i>prendas</i></h1><div class="card row" style="gap:12px"><span class="spinner"></span><span>${esc(review.msg)}</span></div>`;
  if(review&&review.items.length){
    const n=review.items.filter(x=>x.on).length;
    return `<h1 class="view-title">Revisá lo <i>detectado</i></h1>
    <p class="lede">${review.items.length===1?'Detecté 1 prenda':'Detecté '+review.items.length+' prendas'}. Corregí lo que haga falta y guardá.</p>
    ${review.msg?`<div class="note" style="margin-bottom:12px">${esc(review.msg)}</div>`:''}
    <div class="stack">${review.items.map((x,i)=>revCard(x,i)).join('')}</div>
    <div class="grid2" style="margin-top:14px"><button class="btn" data-act="rev-cancel">Descartar</button><button class="btn primary" data-act="rev-save" ${n?'':'disabled'}>Guardar ${n} ${n===1?'prenda':'prendas'}</button></div>`;
  }
  return `<h1 class="view-title">Agregar <i>prendas</i></h1>
  ${modeSeg()}
  <p class="lede">Poné varias prendas juntas sobre la cama, sin superponer, con buena luz, y sacales una sola foto.</p>
  <div class="drop">
    ${logo(54)}
    <div class="row" style="justify-content:center">
      <label class="btn primary filebtn">Sacar foto<input id="in-cam" type="file" accept="image/*" capture="environment" data-ch="files"></label>
      <label class="btn filebtn">Elegir de la galería<input id="in-gal" type="file" accept="image/*" multiple data-ch="files"></label>
    </div>
    <p class="tiny muted" style="margin:0">${aiOK?'La IA separa cada prenda y completa color, material, estilo, formalidad y abrigo.':'La IA no está disponible en esta vista: las fotos se cargan y completás los datos a mano.'}</p>
  </div>
  <div style="margin-top:14px"><button class="btn block ghost" data-act="manual">Cargar una prenda sin foto</button></div>
  ${sheetState&&sheetState.pendingSlot?`<p class="note" style="margin-top:12px">Lo que guardes se va a poner directo en “${esc(SUB[sheetState.pendingSlot].l)}” del armador.</p>`:''}`;
}
function sel(id,opts,val,attrs){ return `<select id="${id}" ${attrs}>${opts.map(o=>`<option value="${esc(o.k)}" ${String(val)===String(o.k)?'selected':''}>${esc(o.l)}</option>`).join('')}</select>`; }
const NUM5=[1,2,3,4,5].map(n=>({k:n,l:String(n)}));
const ESTILO_OPTS=ESTILOS.map(e=>({k:e,l:ESTILO_LBL[e]}));
const COLOR_OPTS=Object.keys(COLORES).map(c=>({k:c,l:cap(c)}));
function itemFields(it,pre,act){
  const a=f=>`data-ch="${act}" data-f="${f}" data-id="${it.id}"`;
  return `<div class="field"><label for="${pre}n">Nombre</label><input id="${pre}n" type="text" value="${esc(it.nombre)}" ${a('nombre')}></div>
  <div class="grid2">
    <div class="field"><label for="${pre}z">Zona</label>${sel(pre+'z',ZONAS,it.zona,a('zona'))}</div>
    ${it.zona==='torso'?`<div class="field"><label for="${pre}c">Capa</label>${sel(pre+'c',CAPAS,it.capa||'base',a('capa'))}</div>`:`<div class="field"><label for="${pre}t">Tipo</label><input id="${pre}t" type="text" value="${esc(it.tipo)}" ${a('tipo')}></div>`}
    <div class="field"><label for="${pre}co">Color</label>${sel(pre+'co',COLORES[it.color]?COLOR_OPTS:[{k:it.color,l:cap(it.color)}].concat(COLOR_OPTS),it.color,a('color'))}</div>
    <div class="field"><label for="${pre}e">Estilo</label>${sel(pre+'e',ESTILO_OPTS,it.estilo,a('estilo'))}</div>
    <div class="field"><label for="${pre}f">Formalidad (1–5)</label>${sel(pre+'f',NUM5,it.formalidad,a('formalidad'))}</div>
    <div class="field"><label for="${pre}a">Abrigo (1–5)</label>${sel(pre+'a',NUM5,it.abrigo,a('abrigo'))}</div>
    <div class="field"><label for="${pre}k">Calce</label>${sel(pre+'k',['slim','recto','oversize','cropped','ancho'].map(x=>({k:x,l:cap(x)})),it.calce||'recto',a('calce'))}</div>
    <div class="field"><label for="${pre}l">¿Va con lluvia?</label>${sel(pre+'l',[{k:'true',l:'Sí'},{k:'false',l:'No'}],String(it.lluvia!==false),a('lluvia'))}</div>
    <div class="field"><label for="${pre}tm">Temporada</label>${sel(pre+'tm',['todo el año','verano','entretiempo','invierno'].map(x=>({k:x,l:cap(x)})),it.temporada||'todo el año',a('temporada'))}</div>
    <div class="field"><label for="${pre}vg">Vigencia</label>${sel(pre+'vg',[{k:'atemporal',l:'Atemporal'},{k:'actual',l:'Actual'},{k:'desactualizada',l:'Desactualizada'}],it.vigencia||'atemporal',a('vigencia'))}</div>
  </div>
  <div class="field"><span class="lbl">También es de estilo</span><div class="row">${ESTILOS.filter(e=>e!==it.estilo).map(e=>`<button class="chip" data-act="multi" data-ctx="${act}" data-id="${it.id}" data-f="estilos" data-v="${e}" aria-pressed="${(it.estilos||[]).includes(e)}">${ESTILO_LBL[e]}</button>`).join('')}</div></div>
  <div class="field"><span class="lbl">La quiero usar para</span><div class="row">${OCASIONES.map(o=>`<button class="chip" data-act="multi" data-ctx="${act}" data-id="${it.id}" data-f="ocasiones" data-v="${o.k}" aria-pressed="${(it.ocasiones||[]).includes(o.k)}">${o.l}</button>`).join('')}</div>
    <span class="tiny muted">Lo que marques cuenta siempre. Lo demás se decide por la formalidad (hoy: ${esc(autoOc(it).map(o=>o.l).join(', ')||'ninguna')}).</span></div>
  <p class="tiny muted" style="margin:0">${esc([it.material,it.estampado!=='liso'?it.estampado:'',it.edadMin&&it.edadMax?`estilo de ${it.edadMin} a ${it.edadMax} años`:''].filter(Boolean).join(' · '))}${trendHit(it,tendenciaVigente(),prof().perfil.genero)?' · <b style="color:var(--gold)">en tendencia</b>':''}</p>`;
}
function revCard(x,i){
  return `<div class="card rev ${x.on?'':'off'}"><div class="stack" style="gap:8px">${vis(x.it)}<button class="btn small ${x.on?'':'primary'}" data-act="rev-toggle" data-i="${i}">${x.on?'Quitar':'Incluir'}</button></div><div class="stack" style="gap:10px;min-width:0">${itemFields(x.it,'r'+i,'rev')}</div></div>`;
}

function vPerfil(){
  const p=prof(), pf=p.perfil, g=pf.genero==='hombre'?'hombre':'mujer';
  const a=f=>`data-ch="perf" data-f="${f}"`;
  return `<h1 class="view-title">Perfil de <i>${esc(pf.nombre)}</i></h1>
  <p class="lede">Lo que un estilista necesita saber de vos. Todo se guarda solo.</p>
  <div class="stack">
  <section class="card stack"><span class="eyebrow">Datos básicos</span>
    <div class="grid2">
      <div class="field"><label for="pf-n">Nombre</label><input id="pf-n" type="text" value="${esc(pf.nombre)}" ${a('nombre')}></div>
      <div class="field"><label for="pf-g">Género</label>${sel('pf-g',[{k:'hombre',l:'Hombre'},{k:'mujer',l:'Mujer'}],g,a('genero'))}</div>
    </div>
    <div class="grid3">
      <div class="field"><label for="pf-e">Edad</label><input id="pf-e" type="number" inputmode="numeric" min="10" max="99" value="${esc(pf.edad)}" ${a('edad')}></div>
      <div class="field"><label for="pf-h">Altura (cm)</label><input id="pf-h" type="number" inputmode="numeric" min="120" max="220" value="${esc(pf.altura)}" ${a('altura')}></div>
      <div class="field"><label for="pf-p">Peso aprox. (kg)</label><input id="pf-p" type="number" inputmode="numeric" min="30" max="200" value="${esc(pf.peso)}" ${a('peso')}></div>
    </div></section>
  <section class="card stack"><span class="eyebrow">Tu silueta</span>
    <div class="sil-pick">${SILUETAS[g].map(s=>`<button data-act="sil" data-v="${s.k}" aria-pressed="${pf.silueta===s.k}">${figureSVG(s,true)}<span>${s.l}</span></button>`).join('')}</div></section>
  <section class="card stack"><span class="eyebrow">Colorimetría</span>
    <div class="grid2">
      <div class="field"><label for="pf-v">Venas de la muñeca</label>${sel('pf-v',[{k:'',l:'No sé'},{k:'verdes',l:'Verdosas'},{k:'azules',l:'Azuladas / violetas'},{k:'ambas',l:'Mezcla de las dos'}],pf.venas,a('venas'))}</div>
      <div class="field"><label for="pf-m">Te queda mejor</label>${sel('pf-m',[{k:'',l:'No sé'},{k:'dorado',l:'Dorado'},{k:'plateado',l:'Plateado'},{k:'ambos',l:'Los dos'}],pf.metal,a('metal'))}</div>
    </div>
    <div class="field"><label for="pf-s">Subtono (resultado, lo podés corregir)</label>${sel('pf-s',[{k:'calido',l:'Cálido'},{k:'frio',l:'Frío'},{k:'neutro',l:'Neutro'}],pf.subtono,a('subtono'))}</div>
    ${sampleFn?`<label class="btn small filebtn">${selfieBusy?'<span class="spinner"></span> Analizando…':'Analizar con una selfie'}<input id="pf-selfie" type="file" accept="image/*" capture="user" data-ch="selfie"></label>
    <p class="tiny muted" style="margin:0">Selfie con luz natural de ventana, sin maquillaje fuerte ni filtros. La foto no se guarda.</p>`:''}
    ${pf.colorNota?`<p class="note" style="margin:0">${esc(pf.colorNota)}</p>`:''}</section>
  <section class="card stack"><span class="eyebrow">Tus ocasiones</span>
    <p class="tiny muted" style="margin:0">Cuánto usás cada una y con qué estilo. Las compras recomendadas y la consulta en tienda se ordenan por esto.</p>
    ${OCASIONES.map(o=>`<div class="stack" style="gap:6px"><b style="font-weight:500">${o.l}</b><div class="grid2"><div class="field"><label for="pf-f-${o.k}">Frecuencia</label>${sel('pf-f-'+o.k,FREQ,freqOf(p,o.k),`data-ch="perf-fq" data-f="${o.k}"`)}</div><div class="field"><label for="pf-o-${o.k}">Estilo</label>${sel('pf-o-'+o.k,ESTILO_OPTS,pf.estilos[o.k]||o.e,`data-ch="perf-oc" data-f="${o.k}"`)}</div></div></div>`).join('')}</section>
  <section class="card stack"><span class="eyebrow">No me gusta usar</span>
    <div class="field"><label for="pf-x">Palabras separadas por coma (ej.: amarillo, oversize, sandalias)</label><input id="pf-x" type="text" value="${esc(pf.vetos)}" ${a('vetos')}></div></section>
  <section class="card stack"><span class="eyebrow">Moda</span>
    <div class="field"><label for="pf-md">¿Qué tan a la moda querés estar?</label>${sel('pf-md',Object.entries(MODA_LVL).map(([k,v])=>({k,l:v.l})),pf.moda||'aldia',a('moda'))}</div>
    <p class="tiny muted" style="margin:0">Clásico: las tendencias casi no cuentan. Al día: suman un poco. Vanguardia: pesan más. Lo atemporal nunca resta.</p>
    ${trendCard(g)}</section>
  <section class="card stack"><span class="eyebrow">Ubicación</span>
    <div class="field"><label for="pf-c">Ciudad para el clima</label><input id="pf-c" type="text" value="${esc(pf.ciudad)}" ${a('ciudad')}></div>
    <div class="row"><button class="btn small" data-act="geo">Usar mi ubicación</button>${pf.geo?'<span class="tiny muted">Usando tu ubicación</span>':''}</div></section>
  <section class="card stack"><span class="eyebrow">Datos</span>
    ${confirmKey==='reset'?`<p style="margin:0">¿Borro todo? Se eliminan los dos perfiles con todas sus prendas y fotos. No se puede deshacer.</p><div class="grid2"><button class="btn" data-act="confirm-no">Cancelar</button><button class="btn primary" data-act="reset">Sí, borrar todo</button></div>`
    :`<button class="btn small ghost" data-act="ask" data-v="reset">Borrar todo y empezar de cero</button>`}</section>
  <section class="card stack"><span class="eyebrow">Cuenta</span>
    <p class="tiny" style="margin:0">${CLOUD&&session?`Conectado como ${esc(session.user.email)}. ${esc(SYNC_TXT[syncState]||'')}.`:'Modo local: los datos quedan solo en este teléfono.'}</p>
    ${CLOUD&&session?`<button class="btn small ghost" data-act="logout">Salir</button>`:''}</section>
  </div>`;
}
let confirmKey='';
function trendCard(g){
  const T=tendenciaVigente(); const est=estacion();
  if(!T) return `<p class="note" style="margin:0">Estamos en ${est} y todavía no cargué las tendencias de esta temporada. Pedímelas y las actualizo.</p>`;
  const L=T[g==='hombre'?'hombre':'mujer'];
  return `<div class="stack" style="gap:8px"><b style="font-family:var(--f-display);font-size:18px;font-weight:500">${T.label}</b>
    <div class="trend">${L.colores.map(c=>`<span><i class="dot" style="background:${COLORES[c]}"></i>${cap(c)}</span>`).join('')}</div>
    <p class="tiny" style="margin:0">${esc(L.nombres)}.</p>
    <p class="tiny" style="margin:0"><b>Prendas:</b> ${esc(L.prendasTxt)}.</p>
    <p class="tiny muted" style="margin:0">${esc(T.fueraTxt)}</p>
    <p class="tiny muted" style="margin:0">Actualizado: ${T.actualizado}. Fuentes: ${T.fuentes.map(f=>`<a href="${f.u}" target="_blank" rel="noopener" style="color:var(--accent)">${esc(f.t)}</a>`).join(' · ')}</p></div>`;
}

/* hojas */
function openSheet(html){ $('#layer').innerHTML=`<div class="scrim" data-act="sheet-close"></div><div class="sheet" role="dialog" aria-modal="true"><div class="in"><div class="grab"></div>${html}</div></div>`; }
function closeSheet(){ $('#layer').innerHTML=''; if(sheetState&&!sheetState.pendingSlot) sheetState=null; }
function slotSheet(spotK, subK){
  const p=prof(), o=p.outfit, sp=SPOTS.find(s=>s.k===spotK); const k=subK||sp.subs[0];
  sheetState={spot:spotK,sub:k};
  const segs=sp.subs.length>1?`<div class="seg">${sp.subs.map(s=>`<button data-act="sub" data-k="${s}" aria-pressed="${s===k}">${SUB[s].l}${o.slots[s]?' ·':''}</button>`).join('')}</div>`:'';
  if(blocked(o,k)){ openSheet(`<h3>${SUB[k].l}</h3>${segs}<p class="note">Bloqueado: el ${lc(byId(o.slots.cuerpo).nombre)} ya ocupa esta zona. Sacalo desde “Vestido” para elegir acá.</p>`); return; }
  const cur=o.slots[k]; const items=pool(p,k); const dirty=p.items.filter(i=>i.estado==='sucio'&&subFor(i)===k).length;
  openSheet(`<h3>${SUB[k].l}</h3>${segs}
    <div class="row" style="justify-content:space-between;margin-bottom:10px">
      <button class="btn small ${o.locks[k]?'primary':''}" data-act="lock" data-k="${k}" ${cur?'':'disabled'}>${ICONS.lock.replace('<svg','<svg width="13" height="13"')} ${o.locks[k]?'Con candado':'Poner candado'}</button>
      <button class="btn small" data-act="photo-for" data-k="${k}">Sacar foto nueva</button></div>
    ${items.length?`<div class="items"><button class="item" data-act="pick" data-k="${k}" data-id="" aria-pressed="${!cur}"><div class="vis"><span class="muted">Nada</span></div><span class="nm">Sin prenda</span></button>${items.map(i=>`<button class="item" data-act="pick" data-k="${k}" data-id="${i.id}" aria-pressed="${cur===i.id}">${vis(i)}<span class="nm">${esc(i.nombre)}</span></button>`).join('')}</div>`
    :`<p class="note">No tenés prendas limpias para esta zona. Sacá una foto o marcá alguna como limpia en el armario.</p>`}
    ${dirty?`<p class="tiny muted">${dirty} ${dirty===1?'prenda sucia no se muestra':'prendas sucias no se muestran'}.</p>`:''}`);
}
function itemSheet(id){
  const it=byId(id); if(!it) return;
  openSheet(`<div class="rev" style="grid-template-columns:110px 1fr"><div>${vis(it)}</div><div class="stack" style="gap:6px;min-width:0"><h3 style="margin:0">${esc(it.nombre)}</h3><span class="tiny muted">Usada ${it.usos||0} ${it.usos===1?'vez':'veces'}${it.ultimoUso?` · última: ${esc(it.ultimoUso)}`:''}</span>
    <div class="row"><button class="btn small ${it.estado==='sucio'?'primary':''}" data-act="dirty" data-id="${id}">${it.estado==='sucio'?'Marcar limpia':'Marcar sucia'}</button><button class="btn small" data-act="to-armar" data-id="${id}">Usar en Armar</button></div></div></div>
    <div class="hr" style="margin:14px 0"></div>
    <div class="stack" style="gap:10px">${itemFields(it,'it-','item-f')}</div>
    <div style="margin-top:14px" id="delzone"><button class="btn small ghost" data-act="del-ask" data-id="${id}">Borrar prenda</button></div>`);
}

/* ============ render ============ */
function render(){
  if(CLOUD&&(booting||!session||!ST)){
    document.documentElement.dataset.prof='ella';
    $('#app').innerHTML=booting?`<div class="stack" style="align-items:center;margin-top:30vh">${logo(76)}<span class="spinner"></span></div>`:vLogin();
    $('#tabs').innerHTML=''; return;
  }
  const r=route();
  const v={hoy:vHoy,armar:vArmar,agregar:vAgregar,armario:vArmario,perfil:vPerfil}[r]();
  document.documentElement.dataset.prof=ST.active;
  const tc=document.querySelector('meta[name="theme-color"]'); if(tc) tc.content=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#F8F4F6';
  $('#app').innerHTML=header()+`<main>${v}</main>`;
  $('#tabs').innerHTML=tabs();
  setSync(syncState);
}
function toast(msg){ let t=$('#toast'); if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);} t.textContent=msg; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>{t.hidden=true},msg.length>60?7000:2600); }

/* ============ acciones ============ */
function markUsed(o){
  const p=prof(), d=todayISO();
  Object.values(o.slots).forEach(id=>{const it=byId(id); if(it){it.usos=(it.usos||0)+1; it.ultimoUso=d; p.likes[id]=(p.likes[id]||0)+1;}});
  save();
}
function setSlot(o,k,id){
  if(!id){ delete o.slots[k]; delete o.locks[k]; return; }
  o.slots[k]=id;
  if(k==='cuerpo'){ const it=byId(id); if(o.slots.piernas){ delete o.slots.piernas; delete o.locks.piernas; toast('El vestido reemplaza la parte de abajo'); } if(isEnterito(it)&&o.slots.torso_base){ delete o.slots.torso_base; delete o.locks.torso_base; } }
}
const ACT={
  nav:b=>{ if(b.dataset.to==='agregar'&&review&&!review.busy&&!review.items.length) review=null; go(b.dataset.to); },
  prof:b=>{ ST.active=b.dataset.id; hoyRes=null; evalOpen=false; aiTxt=''; review=null; consult=null; confirmKey=''; save(); render(); },
  ctx:b=>{ const f=b.dataset.f; let v=b.dataset.v; if(f==='temp') v=+v; if(f==='auto') v=v==='1'; ST.ctx[f]=v; applyWeather(); save(); hoyRes=null; aiTxt=''; render(); },
  'wx-retry':()=>{ WX.err=''; WX.errAt=0; loadWeather(true); render(); },
  login:()=>doLogin(false), signup:()=>doLogin(true),
  logout:async()=>{ await sb.auth.signOut(); session=null; ST=null; loginMsg=''; render(); },
  geo:()=>{ if(!navigator.geolocation){ toast('Este teléfono no da la ubicación'); return; } navigator.geolocation.getCurrentPosition(pos=>{ const pf=prof().perfil; pf.geo=true; pf.lugar={lat:pos.coords.latitude,lon:pos.coords.longitude,name:'Tu ubicación',q:'__geo'}; save(); loadWeather(true); render(); toast('Uso tu ubicación para el clima'); },()=>toast('No me diste permiso de ubicación')); },
  'hoy-gen':()=>{ hoyRes=generar(ST.ctx,prof()); render(); },
  'hoy-use':b=>{ const r=hoyRes[+b.dataset.i]; markUsed(r.o); prof().outfit=cloneO(r.o); save(); toast('Anotado: hoy usás este conjunto'); },
  'hoy-open':b=>{ prof().outfit=cloneO(hoyRes[+b.dataset.i].o); evalOpen=true; aiTxt=''; save(); go('armar'); },
  'hoy-like':b=>{ const p=prof(); Object.values(hoyRes[+b.dataset.i].o.slots).forEach(id=>p.likes[id]=(p.likes[id]||0)+1); save(); toast('Anotado, lo tengo en cuenta'); },
  'hoy-dislike':b=>{ const p=prof(); p.dislikes.push(hoyRes[+b.dataset.i].key); save(); hoyRes.splice(+b.dataset.i,1); render(); toast('No te lo vuelvo a proponer'); },
  spot:b=>slotSheet(b.dataset.k),
  sub:b=>slotSheet(sheetState.spot,b.dataset.k),
  pick:b=>{ const o=prof().outfit; setSlot(o,b.dataset.k,b.dataset.id); save(); aiTxt=''; const sp=sheetState.spot, k=b.dataset.k; render(); slotSheet(sp,k); },
  lock:b=>{ const o=prof().outfit, k=b.dataset.k; if(o.locks[k]) delete o.locks[k]; else o.locks[k]=true; save(); render(); slotSheet(sheetState.spot,k); },
  'photo-for':b=>{ sheetState={pendingSlot:b.dataset.k}; $('#layer').innerHTML=''; review=null; go('agregar'); },
  'sheet-close':()=>{ closeSheet(); },
  completar:()=>{ const p=prof(); completar(p.outfit,ST.ctx,p); save(); evalOpen=true; aiTxt=''; render(); },
  evaluar:()=>{ evalOpen=true; aiTxt=''; renderEvalOnly(); $('#evalbox')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}); },
  vaciar:()=>{ prof().outfit={slots:{},locks:{}}; evalOpen=false; aiTxt=''; save(); render(); },
  guardar:()=>{ const p=prof(), o=p.outfit; if(!Object.keys(o.slots).length){toast('Primero elegí alguna prenda');return;} const oc=(OCASIONES.find(x=>x.k===ST.ctx.oc||x.k===ST.ctx.ocasion)||{}).l; p.saved.unshift({nombre:`${oc} · ${TEMPS[ST.ctx.temp].c}`,slots:{...o.slots}}); save(); render(); toast('Conjunto guardado'); },
  'saved-load':b=>{ const p=prof(); p.outfit={slots:{...p.saved[+b.dataset.i].slots},locks:{}}; evalOpen=true; aiTxt=''; save(); render(); },
  'saved-del':b=>{ prof().saved.splice(+b.dataset.i,1); save(); render(); },
  tip:b=>{ const p=prof(), o=p.outfit; const {tips}=suggestions(o,ST.ctx,p); const t=tips[+b.dataset.i]; if(!t) return; if(t.type==='remove') setSlot(o,t.k,''); else setSlot(o,t.k,t.it.id); save(); aiTxt=''; render(); },
  'ai-op':()=>aiOpinion(),
  mode:b=>{ addMode=b.dataset.v; render(); },
  'arm-tab':b=>{ armTab=b.dataset.v; render(); },
  'compra-oc':b=>{ comprasOc=b.dataset.v; render(); },
  'compra-no':b=>{ const p=prof(); p.comprasNo=p.comprasNo||[]; p.comprasNo.push(b.dataset.key); save(); render(); toast('Listo, no te lo recomiendo más'); },
  'compra-cons':b=>{ const r=comprasCache&&comprasCache.res[+b.dataset.i]; if(!r) return; const it={...r.c,id:uid(),virtual:false}; delete it.ckey; consult={item:it,msg:'Recomendación de “Qué comprar”: así te rinde con tu ropa.',file:null,ai:''}; addMode='consultar'; go('agregar'); },
  multi:b=>{
    const c=b.dataset.ctx, id=b.dataset.id, f=b.dataset.f, v=b.dataset.v;
    const it=c==='rev'?(review&&review.items.find(x=>x.it.id===id)||{}).it : c==='cons'?(consult&&consult.item) : byId(id);
    if(!it) return; const arr=new Set(it[f]||[]); arr.has(v)?arr.delete(v):arr.add(v); it[f]=[...arr];
    if(c==='item-f'){ save(); render(); itemSheet(id); } else { if(c==='cons'){ consult.r=null; consult.ai=''; } render(); }
  },
  'cons-new':()=>{ consult=null; render(); },
  'cons-ai':()=>consAI(),
  'cons-add':()=>{ const p=prof(), it=consult.item; it.ejemplo=false; p.items.push(it); consult=null; addMode='agregar'; save(); armFilter='todo'; go('armario'); toast('Agregada a tu armario'); },
  filter:b=>{ armFilter=b.dataset.v; render(); },
  item:b=>itemSheet(b.dataset.id),
  dirty:b=>{ const it=byId(b.dataset.id); it.estado=it.estado==='sucio'?'limpio':'sucio'; save(); render(); itemSheet(it.id); },
  'to-armar':b=>{ const it=byId(b.dataset.id), o=prof().outfit, k=subFor(it); setSlot(o,k,it.id); o.locks[k]=true; evalOpen=false; save(); closeSheet(); go('armar'); toast('Puesta con candado. Tocá Completar.'); },
  'del-ask':b=>{ $('#delzone').innerHTML=`<p style="margin:0 0 8px">¿Borrar esta prenda? No se puede deshacer.</p><div class="grid2"><button class="btn" data-act="sheet-close">Cancelar</button><button class="btn primary" data-act="del" data-id="${b.dataset.id}">Sí, borrar</button></div>`; },
  del:b=>{ const p=prof(), id=b.dataset.id; p.items=p.items.filter(i=>i.id!==id); Object.keys(p.outfit.slots).forEach(k=>{if(p.outfit.slots[k]===id){delete p.outfit.slots[k];delete p.outfit.locks[k];}}); save(); closeSheet(); render(); toast('Prenda borrada'); },
  'rev-toggle':b=>{ const x=review.items[+b.dataset.i]; x.on=!x.on; render(); },
  'rev-cancel':()=>{ review=null; render(); },
  'rev-save':()=>{
    const p=prof(); const add=review.items.filter(x=>x.on).map(x=>x.it); p.items.push(...add); review=null; save();
    const ps=sheetState&&sheetState.pendingSlot; sheetState=null;
    if(ps){ const fit=add.find(i=>subFor(i)===ps); if(fit){ setSlot(p.outfit,ps,fit.id); save(); toast('Guardada y puesta en el armador'); go('armar'); return; } }
    toast(add.length===1?'Prenda guardada':add.length+' prendas guardadas'); armFilter='todo'; go('armario');
  },
  manual:()=>{ const it=normItem({nombre:'Prenda nueva',zona:sheetState?.pendingSlot?SUB[sheetState.pendingSlot].z:'torso',capa:sheetState?.pendingSlot?SUB[sheetState.pendingSlot].c:null}); review={busy:false,items:[{it,on:true,manual:true}],msg:''}; render(); },
  sil:b=>{ prof().perfil.silueta=b.dataset.v; save(); render(); },
  ask:b=>{ confirmKey=b.dataset.v; render(); },
  'confirm-no':()=>{ confirmKey=''; render(); },
  'del-ej':()=>{ const p=prof(); const ids=new Set(p.items.filter(i=>i.ejemplo).map(i=>i.id)); p.items=p.items.filter(i=>!i.ejemplo); Object.keys(p.outfit.slots).forEach(k=>{if(ids.has(p.outfit.slots[k])){delete p.outfit.slots[k];delete p.outfit.locks[k];}}); p.saved=p.saved.filter(s=>!Object.values(s.slots).some(id=>ids.has(id))); confirmKey=''; hoyRes=null; save(); render(); toast('Ejemplos borrados'); },
  reset:()=>{ ST=freshState(); confirmKey=''; hoyRes=null; evalOpen=false; review=null; save(); render(); toast('App reiniciada'); }
};
function subtonoAuto(pf){
  const v=pf.venas, m=pf.metal; let w=0; if(v==='verdes') w++; if(v==='azules') w--; if(m==='dorado') w++; if(m==='plateado') w--;
  if(!v&&!m) return pf.subtono; return w>0?'calido':w<0?'frio':'neutro';
}
const CH={
  ctx:t=>{ ST.ctx[t.dataset.f]=t.value; applyWeather(); save(); hoyRes=null; aiTxt=''; render(); },
  selfie:t=>{ const f=t.files&&t.files[0]; if(f) analizarSelfie(f); t.value=''; },
  files:t=>{ const f=t.files; if(f&&f.length) handleFiles(f); t.value=''; },
  consfile:t=>{ const f=t.files&&t.files[0]; if(f) handleConsult(f); t.value=''; },
  cons:t=>{ if(!consult||!consult.item) return; applyField(consult.item,t.dataset.f,t.value); consult.ai=''; consult.r=null; render(); },
  perf:t=>{ const pf=prof().perfil, f=t.dataset.f; pf[f]=t.value; if(f==='ciudad'){ pf.geo=false; loadWeather(true); }
    if(f==='genero'){ pf.silueta='rectangulo'; render(); }
    if(f==='venas'||f==='metal'){ pf.subtono=subtonoAuto(pf); render(); }
    save(); if(f==='nombre') render(); },
  'perf-oc':t=>{ prof().perfil.estilos[t.dataset.f]=t.value; save(); },
  'perf-fq':t=>{ const pf=prof().perfil; pf.freq=pf.freq||{}; pf.freq[t.dataset.f]=+t.value; save(); },
  rev:t=>{ const x=review.items.find(x=>x.it.id===t.dataset.id); if(!x) return; applyField(x.it,t.dataset.f,t.value); if(['zona','color'].includes(t.dataset.f)) render(); },
  'item-f':t=>{ const it=byId(t.dataset.id); if(!it) return; applyField(it,t.dataset.f,t.value); save(); if(['zona','color','nombre'].includes(t.dataset.f)){ render(); itemSheet(it.id); } }
};
function applyField(it,f,v){
  if(f==='formalidad'||f==='abrigo') it[f]=+v;
  else if(f==='lluvia') it.lluvia=v==='true';
  else if(f==='color'){ it.color=v; if(COLORES[v]) it.hex=COLORES[v]; }
  else if(f==='zona'){ it.zona=v; it.capa=v==='torso'?(it.capa||'base'):null; if(!it.tipo||it.ejemplo===false) {} }
  else it[f]=v;
}
document.addEventListener('click',e=>{ const b=e.target.closest('[data-act]'); if(!b||b.disabled) return; const fn=ACT[b.dataset.act]; if(fn){ e.preventDefault(); fn(b,e); } });
document.addEventListener('change',e=>{ const t=e.target.closest('[data-ch]'); if(t&&CH[t.dataset.ch]) CH[t.dataset.ch](t); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&$('#layer').innerHTML) closeSheet(); });
window.addEventListener('hashchange',()=>{ $('#layer').innerHTML=''; render(); window.scrollTo(0,0); });

boot();
if('serviceWorker' in navigator && location.protocol==='https:') navigator.serviceWorker.register('./sw.js').catch(()=>{});
