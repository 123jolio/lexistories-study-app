(() => {
  const unit = 'Final Test 8 · Σελίδες 109–115';
  const entries = [
    ['officiate','χοροστατώ· διευθύνω τελετή'],['enumerate','απαριθμώ'],['relinquish','παραιτούμαι από· αφήνω'],['perpetuate','διαιωνίζω'],
    ['intent','πρόθεση· προσηλωμένος, αποφασισμένος'],['input','συμβολή· εισαγωγή δεδομένων'],['inflation','πληθωρισμός'],['influx','εισροή'],
    ['disseminate','διαδίδω πληροφορίες ή ιδέες'],['intentional','σκόπιμος'],['peripheral','περιφερειακός· δευτερεύων'],['preposterous','παράλογος, εξωφρενικός'],
    ['alleviate','ανακουφίζω, μετριάζω'],['appease','κατευνάζω'],['sustain','διατηρώ, στηρίζω· υφίσταμαι'],
    ['adjust','προσαρμόζω· προσαρμόζομαι'],['dispel','διαλύω φόβους, αμφιβολίες ή φήμες'],['contract','συστέλλομαι· προσβάλλομαι από ασθένεια'],['disband','διαλύομαι ως ομάδα'],
    ['compensation','αποζημίωση'],['acclaim','αναγνώριση, επιδοκιμασία· επαινώ'],['increment','αύξηση, προσαύξηση'],['excess','υπερβολή· περίσσεια'],
    ['compound','συνδυάζω· επιδεινώνω· σύνθετος'],['engulf','κατακλύζω, περικλείω'],['encompass','περιλαμβάνω'],['extract','εξάγω, αφαιρώ· απόσπασμα'],
    ['emphasis','έμφαση'],['rapport','καλή σχέση, συνεννόηση'],['relativity','σχετικότητα'],['enlightenment','διαφώτιση· Διαφωτισμός'],
    ['deformation','παραμόρφωση'],['ventilation','εξαερισμός'],['compilation','συλλογή, συγκέντρωση'],['corruption','διαφθορά'],
    ['negotiate','διαπραγματεύομαι'],['endorse','επιδοκιμάζω, υποστηρίζω· οπισθογραφώ'],['activate','ενεργοποιώ'],['accelerate','επιταχύνω'],
    ['preservative','συντηρητικό τροφίμων'],['conservative','συντηρητικός'],['infiltration','διείσδυση'],['adaptation','προσαρμογή· διασκευή'],
    ['entitle','δίνω δικαίωμα'],['authorize','εξουσιοδοτώ'],['accredit','πιστοποιώ, διαπιστεύω'],['empower','ενδυναμώνω, εξουσιοδοτώ'],
    ['downhill','κατηφορικά· προς το χειρότερο'],['downtown','στο κέντρο της πόλης'],['downstream','προς τα κατάντη, με τη ροή'],
    ['redundant','περιττός· απολυμένος λόγω κατάργησης θέσης'],['reluctant','απρόθυμος, διστακτικός'],['rebellious','επαναστατημένος, ανυπότακτος'],['responsible','υπεύθυνος'],
    ['gather','συγκεντρώνω, μαζεύω'],['grasp','πιάνω· κατανοώ'],['pop','σκάω· κάνω μικρό κρότο'],['locate','εντοπίζω· τοποθετώ'],
    ['shrewd','οξυδερκής, συνετός'],['distinctive','χαρακτηριστικός, ξεχωριστός'],['wary','επιφυλακτικός'],['sensational','εντυπωσιακός· εντυπωσιοθηρικός']
  ];
  const stories = [
    {id:'final8-festival',name:'Το φεστιβάλ των ιδεών',desc:'Οι μαθητές οργανώνουν μια γιορτή',emoji:'🎭',image:'assets/stories/story-team.jpg',en:'The class decided to {{gather:final8-gather}} ideas for a festival. They wanted to {{encompass:final8-encompass}} music and art, and to {{empower:final8-empower}} every student to participate. After they {{negotiated:final8-negotiate}} the plan, they asked the principal to {{endorse:final8-endorse}} it.',el:'Η τάξη αποφάσισε να συγκεντρώσει ιδέες για ένα φεστιβάλ. Ήθελαν να συμπεριλάβουν μουσική και τέχνη και να ενθαρρύνουν κάθε μαθητή να συμμετάσχει. Αφού διαπραγματεύτηκαν το σχέδιο, ζήτησαν από τον διευθυντή να το υποστηρίξει.'},
    {id:'final8-library',name:'Το μυστήριο της βιβλιοθήκης',desc:'Προσοχή στις πληροφορίες',emoji:'🔎',image:'assets/stories/story-observatory.jpg',en:'Maya was {{wary:final8-wary}} of a strange rumor. She went to the library to {{gather:final8-gather}} facts and {{dispel:final8-dispel}} the myth. Her {{shrewd:final8-shrewd}} questions helped the team {{grasp:final8-grasp}} the truth instead of spreading {{sensational:final8-sensational}} stories.',el:'Η Μάγια ήταν επιφυλακτική απέναντι σε μια παράξενη φήμη. Πήγε στη βιβλιοθήκη για να συγκεντρώσει στοιχεία και να διαλύσει τον μύθο. Οι οξυδερκείς ερωτήσεις της βοήθησαν την ομάδα να κατανοήσει την αλήθεια αντί να διαδίδει εντυπωσιοθηρικές ιστορίες.'}
  ].map(story=>({...story,revision:1,ids:[...story.en.matchAll(/\{\{[^}:]+:([^}]+)\}\}/g)].map(match=>match[1])}));
  window.EnglishFinalTest8 = {unit, stories, words: entries.map(([en, el]) => ({id: 'final8-' + en, en, el, unit}))};
})();
