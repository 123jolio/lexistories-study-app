window.GreekMatching=(()=>{
const sets=[
{title:'1. Αναγνωρίζω τον χρόνο',pairs:[
['λύεις','Ενεστώτας · οριστική · β΄ ενικό','Το λυ- είναι το θέμα του ενεστώτα. Η κατάληξη -εις δηλώνει β΄ ενικό.'],
['ἔλυες','Παρατατικός · οριστική · β΄ ενικό','Αύξηση ἐ- και θέμα ενεστώτα: παρατατικός.'],
['λύσεις','Μέλλοντας · οριστική · β΄ ενικό','Το -σ- και η κατάληξη -εις σχηματίζουν τον μέλλοντα. Δεν έχει αύξηση.'],
['ἔλυσας','Αόριστος · οριστική · β΄ ενικό','Αύξηση και σιγματικός αόριστος σε -σας.'],
['λέλυκας','Παρακείμενος · οριστική · β΄ ενικό','Αναδιπλασιασμός λε- και χρονικός χαρακτήρας -κ-.'],
['ἐλελύκεις','Υπερσυντέλικος · οριστική · β΄ ενικό','Αύξηση μαζί με αναδιπλασιασμό και κατάληξη -κεις.']
]},
{title:'2. Ξεχωρίζω έγκλιση και ρηματικό τύπο',pairs:[
['λύετε','Ενεστώτας · οριστική ή προστακτική · β΄ πληθυντικό','Χωρίς συμφραζόμενα, το λύετε μπορεί να ανήκει και στις δύο εγκλίσεις.'],
['λύῃς','Ενεστώτας · υποτακτική · β΄ ενικό','Το η με υπογεγραμμένη είναι χαρακτηριστικό της κατάληξης της υποτακτικής.'],
['λύοις','Ενεστώτας · ευκτική · β΄ ενικό','Το -οι- σε βοηθά να αναγνωρίσεις την ευκτική.'],
['λῦε','Ενεστώτας · προστακτική · β΄ ενικό','Προτροπή ή εντολή. Προσοχή στην περισπωμένη του υ.'],
['λύειν','Ενεστώτας · απαρέμφατο','Άκλιτος ρηματικός τύπος σε -ειν, χωρίς πρόσωπο.'],
['λύων','Ενεστώτας · μετοχή · αρσενικό, ονομαστική ενικού','Η μετοχή έχει γένος, αριθμό και πτώση. Εδώ είναι αρσενικό.']
]},
{title:'3. Προσέχω τα διακριτικά',pairs:[
['λῦσαι','Απαρέμφατο αορίστου · περισπωμένη','Το λῦσαι με περισπωμένη είναι απαρέμφατο αορίστου.'],
['λύσαι','Ευκτική αορίστου · γ΄ ενικό · οξεία','Το λύσαι με οξεία είναι τύπος της ευκτικής, όχι το απαρέμφατο λῦσαι.'],
['ἔλυσα','Ψιλή και οξεία στο αρχικό ε','Οι αυξημένοι τύποι του λύω αρχίζουν με ψιλή, όχι δασεία.'],
['λύσῃς','Υποτακτική αορίστου · υπογεγραμμένη στο η','Το η έχει υπογεγραμμένη, ενώ το υ έχει οξεία.'],
['ὦ','Ψιλή και περισπωμένη στο ω','Το ὦ είναι υποτακτική του εἰμί, α΄ ενικό, με ψιλή.'],
['ᾖ','Ψιλή, περισπωμένη και υπογεγραμμένη στο η','Το ᾖ είναι υποτακτική του εἰμί, γ΄ ενικό. Η υπογεγραμμένη είναι μέρος της σωστής γραφής.']
]}];
const key='greek-matching-v1';
let setIndex=0,left=null,right=null,solved=[],order=[],message='',review=false;
function read(){try{const data=JSON.parse(localStorage.getItem(key)||'{}');return data&&typeof data==='object'&&!Array.isArray(data)?data:{};}catch{return {};}}
function items(){return sets.flatMap((set,group)=>set.pairs.map((pair,index)=>({id:group+'-'+index,form:pair[0],analysis:pair[1],hint:pair[2]}))).filter(item=>review?read()[item.id]?.last===false:item.id.startsWith(setIndex+'-'));}
let current=[];
function start(){current=items();order=current.map(item=>item.id);for(let index=order.length-1;index>0;index--){const other=Math.floor(Math.random()*(index+1));[order[index],order[other]]=[order[other],order[index]];}left=null;right=null;solved=[];message='';}
function button(item,side){const selected=(side==='left'?left:right)===item.id;return `<button type="button" data-match-side="${side}" data-match-id="${item.id}" class="${side==='left'?'polytonic ':''}${selected?'is-selected ':''}${solved.includes(item.id)?'is-solved':''}" aria-pressed="${selected}" ${solved.includes(item.id)?'disabled':''}>${side==='left'?item.form:item.analysis}${solved.includes(item.id)?' ✓':''}</button>`;}
function render(){if(!current.length&&!review)start();const stats=read(),attempts=Object.values(stats).reduce((total,item)=>total+(item.attempts||0),0),correct=Object.values(stats).reduce((total,item)=>total+(item.correct||0),0),weak=Object.values(stats).filter(item=>item.last===false).length;return `<section class="greek-matching"><header><p class="work-label">ΕΝΕΡΓΗΤΙΚΗ ΦΩΝΗ · ΤΑΙΡΙΑΖΩ ΚΑΙ ΕΞΗΓΩ</p><h2>Αντιστοιχίσεις</h2><p>Πάτησε έναν τύπο αριστερά και την ανάλυσή του δεξιά — ή αντίστροφα. Δεν χρειάζεται σύρσιμο. Μπορείς να χρησιμοποιήσεις Tab και Enter.</p></header><nav aria-label="Ομάδες αντιστοίχισης">${sets.map((set,index)=>`<button data-match-set="${index}" aria-pressed="${!review&&setIndex===index}">${set.title}</button>`).join('')}<button data-match-review>Επανάληψη λαθών (${weak})</button></nav><h3>${review?'Ξαναδοκιμάζω όσα μπέρδεψα':sets[setIndex].title}</h3>${current.length?`<p>Ολοκληρωμένα ζεύγη: <strong>${solved.length}/${current.length}</strong></p><progress max="${current.length}" value="${solved.length}" aria-label="Ολοκληρωμένα ζεύγη"></progress><div class="matching-columns"><div><h4>Ρηματικός τύπος</h4>${current.map(item=>button(item,'left')).join('')}</div><div><h4>Ανάλυση</h4>${order.map(id=>button(current.find(item=>item.id===id),'right')).join('')}</div></div>`:'<p>Δεν υπάρχουν καταγεγραμμένα λάθη για επανάληψη. Δοκίμασε μία από τις τρεις ομάδες.</p>'}<p class="match-feedback" role="status" aria-live="polite">${message}</p>${current.length&&solved.length===current.length?'<p><strong>✓ Ολοκλήρωσες την ομάδα!</strong> Πες τώρα προφορικά τι σε βοήθησε να αναγνωρίσεις κάθε τύπο.</p>':''}<button data-match-restart>Νέα προσπάθεια / ανακάτεμα</button><details><summary>Η πρόοδός μου στις αντιστοιχίσεις</summary><p>${correct} σωστά ζεύγη σε ${attempts} προσπάθειες. Η πρόοδος αποθηκεύεται μόνο σε αυτή τη συσκευή.</p>${sets.map((set,index)=>`<p>${set.title}: ${set.pairs.filter((pair,position)=>stats[index+'-'+position]?.last===true).length}/${set.pairs.length} ζεύγη με τελευταία σωστή απάντηση.</p>`).join('')}</details></section>`;}
document.addEventListener('click',event=>{const target=event.target.closest('[data-match-set],[data-match-side],[data-match-review],[data-match-restart]');if(!target)return;if(target.hasAttribute('data-match-set')){setIndex=Number(target.dataset.matchSet);review=false;start();}else if(target.hasAttribute('data-match-review')){review=true;start();}else if(target.hasAttribute('data-match-restart'))start();else{const id=target.dataset.matchId;if(!current.some(item=>item.id===id)||solved.includes(id))return;if(target.dataset.matchSide==='left')left=id;else right=id;if(left&&right){const item=current.find(entry=>entry.id===left),correct=left===right,stats=read(),old=stats[left]||{attempts:0,correct:0};old.attempts++;old.correct+=Number(correct);old.last=correct;stats[left]=old;message=(correct?'✓ Σωστό ζεύγος. ':'Όχι ακόμη. Ο τύπος '+item.form+' αντιστοιχεί σε: '+item.analysis+'. ')+item.hint;try{localStorage.setItem(key,JSON.stringify(stats));}catch{message+=' Η αποθήκευση δεν είναι διαθέσιμη.';}if(correct)solved.push(left);left=null;right=null;}else message='Τώρα επίλεξε το αντίστοιχο στοιχείο στην άλλη στήλη.';}document.getElementById('greek-matching-host').innerHTML=render();});
return {render};
})();
