(() => {
  const unit = 'Σελίδες 95–101';
  const entries = [
    ['procedure','διαδικασία· ιατρική πράξη'],['function','λειτουργία· λειτουργώ'],['canal','κανάλι, διώρυγα'],
    ['insensible','αναίσθητος· ασυγκίνητος'],['obsessive','εμμονικός'],['fundamental','θεμελιώδης, βασικός'],['relentless','αδιάκοπος, αμείλικτος'],
    ['treacherous','επικίνδυνος· ύπουλος'],['scarce','σπάνιος, δυσεύρετος'],['taut','τεντωμένος'],['clinging','προσκολλημένος'],
    ['peculiar','παράξενος· χαρακτηριστικός'],['particular','συγκεκριμένος· ιδιαίτερος'],['representative','αντιπροσωπευτικός· εκπρόσωπος'],['rational','λογικός'],
    ['inventory','απογραφή· απόθεμα'],['accumulation','συσσώρευση'],['delegation','αντιπροσωπεία· ανάθεση'],['testament','απόδειξη· διαθήκη'],
    ['unprecedented','πρωτοφανής'],['successive','διαδοχικός'],['spontaneous','αυθόρμητος'],['insurmountable','ανυπέρβλητος'],
    ['sustain','διατηρώ, στηρίζω· υφίσταμαι'],['attest','βεβαιώνω, πιστοποιώ'],['ratify','επικυρώνω'],['promote','προωθώ· προάγω'],
    ['caution','προειδοποιώ· προσοχή'],['watch out','προσέχω'],['care','ενδιαφέρομαι· φροντίζω'],['beware','προσέχω, φυλάγομαι'],
    ['constitute','αποτελώ, συνιστώ'],['compel','εξαναγκάζω'],['impinge on','επηρεάζω αρνητικά· θίγω'],['implement','εφαρμόζω, υλοποιώ'],
    ['supplement','συμπλήρωμα· συμπληρώνω'],['subsidiary','δευτερεύων· θυγατρική εταιρεία'],['allocation','κατανομή'],['appendix','σκωληκοειδής απόφυση· παράρτημα βιβλίου'],
    ['edge out','παραγκωνίζω σταδιακά'],['corner','στριμώχνω· γωνία'],['square away','τακτοποιώ, διευθετώ'],['sidetrack','αποσπώ την προσοχή, παρεκτρέπω'],
    ['outstanding','εξαιρετικός· εκκρεμής'],['outright','απόλυτος, άμεσος· ολοκληρωτικά'],['outgoing','εξωστρεφής· απερχόμενος'],['outrageous','εξωφρενικός, απαράδεκτος'],
    ['deficiency','έλλειψη, ανεπάρκεια'],['dividend','μέρισμα'],['demeanor','συμπεριφορά, ύφος'],['diffraction','περίθλαση'],
    ['urge','παροτρύνω'],['maintain','διατηρώ, συντηρώ· υποστηρίζω'],['stress','τονίζω· άγχος'],['repeal','καταργώ νόμο']
  ];
  const stories = [
    {id:'pages95-garden',name:'Ένας κήπος για όλους',desc:'Μια ιδέα γίνεται σχέδιο',emoji:'🌱',image:'assets/stories/story-community.jpg',en:'The students had a {{spontaneous:pages95-spontaneous}} idea: create a garden. They made an {{inventory:pages95-inventory}} of their tools and asked the town to {{support:pages95-sustain}} the project. With careful {{allocation:pages95-allocation}} of resources, their garden became an {{outstanding:pages95-outstanding}} success.',el:'Οι μαθητές είχαν μια αυθόρμητη ιδέα: να δημιουργήσουν έναν κήπο. Κατέγραψαν τα εργαλεία τους και ζήτησαν από τον δήμο να στηρίξει το έργο. Με προσεκτική κατανομή των πόρων, ο κήπος τους έγινε μια εξαιρετική επιτυχία.'},
    {id:'pages95-museum',name:'Μια έκθεση για την πόλη',desc:'Μια ομάδα ετοιμάζει μια έκθεση',emoji:'🏛️',image:'assets/stories/story-survey.jpg',en:'A {{delegation:pages95-delegation}} visited the museum to {{promote:pages95-promote}} a new exhibition. The guide gave a {{particular:pages95-particular}} example and explained the {{function:pages95-function}} of an old machine. An {{appendix:pages95-appendix}} in the guide contained more details.',el:'Μια αντιπροσωπεία επισκέφθηκε το μουσείο για να προωθήσει μια νέα έκθεση. Ο ξεναγός έδωσε ένα συγκεκριμένο παράδειγμα και εξήγησε τη λειτουργία μιας παλιάς μηχανής. Ένα παράρτημα στον οδηγό περιείχε περισσότερες λεπτομέρειες.'}
  ].map(story=>({...story,revision:1,ids:[...story.en.matchAll(/\{\{[^}:]+:([^}]+)\}\}/g)].map(match=>match[1])}));
  window.EnglishPages95101 = {unit, stories, words: entries.map(([en, el]) => ({id: 'pages95-' + en, en, el, unit}))};
})();
