(() => {
  'use strict';
  const unit = 'Λεξιλόγιο · Σελίδες 66–70';
  const rows = [
    ['motivated','με κίνητρο, ενθουσιώδης','The motivated students practised every afternoon.','Οι μαθητές με κίνητρο εξασκούνταν κάθε απόγευμα.'],
    ['compress','συμπιέζω, συντομεύω','We can compress these files before sending them.','Μπορούμε να συμπιέσουμε αυτά τα αρχεία πριν τα στείλουμε.'],
    ['enforce','επιβάλλω την τήρηση νόμου ή κανόνα','The school must enforce its safety rules.','Το σχολείο πρέπει να επιβάλλει την τήρηση των κανόνων ασφαλείας.'],
    ['postpone','αναβάλλω','They will postpone the picnic until Friday.','Θα αναβάλουν το πικνίκ μέχρι την Παρασκευή.'],
    ['vastly','κατά πολύ, σε πολύ μεγάλο βαθμό','The new design is vastly better than the old one.','Το νέο σχέδιο είναι κατά πολύ καλύτερο από το παλιό.'],
    ['subsequently','στη συνέχεια, αργότερα','She studied art and subsequently opened a gallery.','Σπούδασε τέχνη και στη συνέχεια άνοιξε μια γκαλερί.'],
    ['supposedly','υποτίθεται, σύμφωνα με όσα λέγονται','The tunnel is supposedly haunted, but nobody has proof.','Το τούνελ υποτίθεται ότι είναι στοιχειωμένο, αλλά κανείς δεν έχει αποδείξεις.'],
    ['coincidentally','κατά σύμπτωση','Coincidentally, we booked rooms in the same hotel.','Κατά σύμπτωση, κλείσαμε δωμάτια στο ίδιο ξενοδοχείο.'],
    ['accuse','κατηγορώ κάποιον για κάτι','Do not accuse anyone of cheating without evidence.','Μην κατηγορείς κανέναν για αντιγραφή χωρίς αποδείξεις.'],
    ['relieve','ανακουφίζω· απαλλάσσω από καθήκοντα','A short rest may relieve your tired muscles.','Μια σύντομη ανάπαυση μπορεί να ανακουφίσει τους κουρασμένους μυς σου.'],
    ['reassure','καθησυχάζω, διαβεβαιώνω','The guide tried to reassure the nervous visitors.','Ο ξεναγός προσπάθησε να καθησυχάσει τους αγχωμένους επισκέπτες.'],
    ['acquit','αθωώνω','The jury decided to acquit the defendant.','Οι ένορκοι αποφάσισαν να αθωώσουν τον κατηγορούμενο.'],
    ['induction','εισαγωγική εκπαίδευση· πρόκληση διαδικασίας','New employees attend an induction on their first day.','Οι νέοι υπάλληλοι παρακολουθούν εισαγωγική εκπαίδευση την πρώτη ημέρα.'],
    ['intake','πρόσληψη τροφής ή αέρα· αριθμός εισακτέων','The college increased its annual intake of students.','Το κολέγιο αύξησε τον ετήσιο αριθμό εισακτέων του.'],
    ['influence','επιρροή· επηρεάζω','Her advice had a positive influence on my decision.','Η συμβουλή της είχε θετική επιρροή στην απόφασή μου.'],
    ['income','εισόδημα','His monthly income covers the rent and bills.','Το μηνιαίο εισόδημά του καλύπτει το ενοίκιο και τους λογαριασμούς.'],
    ['defective','ελαττωματικός','The shop replaced the defective charger.','Το κατάστημα αντικατέστησε τον ελαττωματικό φορτιστή.'],
    ['despondent','αποκαρδιωμένος, απογοητευμένος','She felt despondent after another unsuccessful attempt.','Ένιωσε αποκαρδιωμένη μετά από άλλη μία αποτυχημένη προσπάθεια.'],
    ['devious','δόλιος, ύπουλος','They uncovered a devious plan to steal the money.','Αποκάλυψαν ένα δόλιο σχέδιο για την κλοπή των χρημάτων.'],
    ['divert','εκτρέπω, ανακατευθύνω','Police will divert traffic away from the damaged bridge.','Η αστυνομία θα εκτρέψει την κυκλοφορία μακριά από τη χαλασμένη γέφυρα.'],
    ['banish','εξορίζω· διώχνω μια σκέψη','She tried to banish all doubts from her mind.','Προσπάθησε να διώξει κάθε αμφιβολία από το μυαλό της.'],
    ['flush','κοκκινίζω· τραβώ το καζανάκι','His face began to flush with embarrassment.','Το πρόσωπό του άρχισε να κοκκινίζει από αμηχανία.'],
    ['ban','απαγορεύω· απαγόρευση','The town will ban cars from the central square.','Η πόλη θα απαγορεύσει τα αυτοκίνητα στην κεντρική πλατεία.'],
    ['flee','τρέπομαι σε φυγή, διαφεύγω','The villagers had to flee the approaching fire.','Οι χωρικοί αναγκάστηκαν να φύγουν για να γλιτώσουν από τη φωτιά που πλησίαζε.'],
    ['appearance','εμφάνιση, όψη· παρουσία','The actor made a surprise appearance at our school.','Ο ηθοποιός έκανε μια απρόσμενη εμφάνιση στο σχολείο μας.'],
    ['projection','πρόβλεψη· προβολή σε οθόνη','The sales projection suggests a small increase next year.','Η πρόβλεψη πωλήσεων δείχνει μικρή αύξηση την επόμενη χρονιά.'],
    ['outlook','προοπτική· στάση ζωής· θέα','Despite the setback, she has an optimistic outlook on life.','Παρά την αναποδιά, έχει αισιόδοξη στάση απέναντι στη ζωή.'],
    ['overview','συνοπτική παρουσίαση, επισκόπηση','The first chapter gives an overview of the whole course.','Το πρώτο κεφάλαιο δίνει μια συνοπτική παρουσίαση όλου του μαθήματος.'],
    ['displace','εκτοπίζω· αντικαθιστώ','Rising water could displace families from their homes.','Η άνοδος του νερού θα μπορούσε να εκτοπίσει οικογένειες από τα σπίτια τους.'],
    ['succumb','υποκύπτω','He refused to succumb to pressure from the group.','Αρνήθηκε να υποκύψει στην πίεση της ομάδας.'],
    ['succeed','πετυχαίνω· διαδέχομαι','With steady practice, you can succeed in learning a language.','Με σταθερή εξάσκηση μπορείς να πετύχεις στην εκμάθηση μιας γλώσσας.'],
    ['abolish','καταργώ','The council voted to abolish the unfair rule.','Το συμβούλιο ψήφισε να καταργήσει τον άδικο κανόνα.'],
    ['generate','παράγω, δημιουργώ','These solar panels generate electricity for the school.','Αυτά τα φωτοβολταϊκά παράγουν ηλεκτρικό ρεύμα για το σχολείο.'],
    ['formulate','διατυπώνω, καταρτίζω','First, we need to formulate a clear plan.','Πρώτα πρέπει να καταρτίσουμε ένα σαφές σχέδιο.'],
    ['escalate','κλιμακώνω, οξύνομαι','An argument can escalate if nobody listens.','Μια διαφωνία μπορεί να οξυνθεί αν κανείς δεν ακούει.'],
    ['elaborate','αναπτύσσω με λεπτομέρειες· περίτεχνος','Could you elaborate on your suggestion?','Μπορείς να αναπτύξεις την πρότασή σου με περισσότερες λεπτομέρειες;'],
    ['deceive','εξαπατώ','The seller tried to deceive buyers with false photographs.','Ο πωλητής προσπάθησε να εξαπατήσει αγοραστές με ψεύτικες φωτογραφίες.'],
    ['delude','δημιουργώ ψευδαισθήσεις, αυταπατώμαι','Do not delude yourself into thinking practice is unnecessary.','Μην αυταπατάσαι πιστεύοντας ότι η εξάσκηση είναι περιττή.'],
    ['misconstrue','παρερμηνεύω','Please do not misconstrue my silence as agreement.','Σε παρακαλώ, μην παρερμηνεύσεις τη σιωπή μου ως συμφωνία.'],
    ['mislead','παραπλανώ','An unclear headline can mislead readers.','Ένας ασαφής τίτλος μπορεί να παραπλανήσει τους αναγνώστες.'],
    ['impulse','παρόρμηση','She bought the bright red hat on impulse.','Αγόρασε το κατακόκκινο καπέλο παρορμητικά.'],
    ['pursue','καταδιώκω· επιδιώκω','He hopes to pursue a career in music.','Ελπίζει να ακολουθήσει μια σταδιοδρομία στη μουσική.'],
    ['motivate','δίνω κίνητρο, παρακινώ','Small achievements can motivate us to keep learning.','Τα μικρά επιτεύγματα μπορούν να μας παρακινήσουν να συνεχίσουμε να μαθαίνουμε.'],
    ['instill','ενσταλάζω σταδιακά μια ιδέα ή αξία','Good coaches instill confidence in their players.','Οι καλοί προπονητές ενσταλάζουν αυτοπεποίθηση στους παίκτες τους.'],
    ['fundamental','θεμελιώδης, βασικός','Trust is fundamental to a strong friendship.','Η εμπιστοσύνη είναι θεμελιώδης για μια δυνατή φιλία.'],
    ['formulation','διατύπωση· διαμόρφωση σχεδίου','The formulation of a fair policy takes time.','Η διαμόρφωση μιας δίκαιης πολιτικής απαιτεί χρόνο.'],
    ['basement','υπόγειο','We keep our bicycles in the basement.','Φυλάμε τα ποδήλατά μας στο υπόγειο.'],
    ['predecessor','προκάτοχος','The new headteacher thanked her predecessor.','Η νέα διευθύντρια ευχαρίστησε την προκάτοχό της.'],
    ['absurd','παράλογος, γελοίος','It is absurd to expect a beginner to know everything.','Είναι παράλογο να περιμένουμε από έναν αρχάριο να τα γνωρίζει όλα.'],
    ['inferior','κατώτερος σε ποιότητα ή επίπεδο','This cheap copy is inferior to the original.','Αυτό το φθηνό αντίγραφο είναι κατώτερο από το πρωτότυπο.'],
    ['appropriate','κατάλληλος, αρμόζων','Choose appropriate shoes for the mountain walk.','Διάλεξε κατάλληλα παπούτσια για την πεζοπορία στο βουνό.'],
    ['reluctant','απρόθυμος, διστακτικός','He was reluctant to speak in front of strangers.','Ήταν διστακτικός να μιλήσει μπροστά σε αγνώστους.']
  ];
  const storyRows = [
    {
      key: 'new-start', emoji: '🌱', scene: 'team',
      name: 'Η πρώτη μέρα στη λέσχη', desc: 'Μια νέα αρχή με ανθρώπους που στηρίζουν ο ένας τον άλλο',
      en: 'Maya arrived for her {{induction}} at a youth club. The club had doubled its {{intake}} of new members, and everyone seemed {{motivated}}. The new leader thanked her {{predecessor}} for building such a welcoming place. She explained that a family’s {{income}} should never stop a child from joining. Her kindness had a strong {{influence}} on Maya, who immediately offered to help.',
      el: 'Η Μάγια έφτασε για την εισαγωγική της ενημέρωση σε μια λέσχη νέων. Η λέσχη είχε διπλασιάσει τον αριθμό των νέων μελών που δεχόταν και όλοι έμοιαζαν να έχουν κίνητρο. Η νέα υπεύθυνη ευχαρίστησε την προκάτοχό της που είχε δημιουργήσει έναν τόσο φιλόξενο χώρο. Εξήγησε ότι το εισόδημα μιας οικογένειας δεν έπρεπε ποτέ να εμποδίζει ένα παιδί να συμμετέχει. Η καλοσύνη της άσκησε μεγάλη επιρροή στη Μάγια, που αμέσως προσφέρθηκε να βοηθήσει.'
    },
    {
      key: 'workshop', emoji: '🔧', scene: 'observatory',
      name: 'Το εργαστήριο στο υπόγειο', desc: 'Ένα πρόβλημα γίνεται ευκαιρία για καλύτερη λύση',
      en: 'In the club’s {{basement}}, Leo found a {{defective}} camera. He felt {{despondent}} because he needed it for a project. A cheap replacement was {{inferior}} to the original, so the team chose a more {{appropriate}} solution: repairing it. The pictures were then {{vastly}} clearer. Leo learned to {{compress}} the video files so that he could share the finished project.',
      el: 'Στο υπόγειο της λέσχης ο Λίο βρήκε μια ελαττωματική κάμερα. Ένιωσε αποκαρδιωμένος επειδή τη χρειαζόταν για μια εργασία. Μια φθηνή κάμερα αντικατάστασης ήταν κατώτερη από την αρχική, οπότε η ομάδα διάλεξε μια πιο κατάλληλη λύση: να την επισκευάσει. Οι εικόνες ήταν τότε κατά πολύ καθαρότερες. Ο Λίο έμαθε να συμπιέζει τα αρχεία βίντεο, για να μπορέσει να μοιραστεί την ολοκληρωμένη εργασία.'
    },
    {
      key: 'fair-hearing', emoji: '⚖️', scene: 'hearing',
      name: 'Η κατηγορία και η αλήθεια', desc: 'Πρώτα ελέγχουμε τα στοιχεία, μετά βγάζουμε συμπέρασμα',
      en: 'Someone wanted to {{accuse}} Sam of taking the club’s camera. The leader tried to {{reassure}} him: “We will check the facts first.” They {{subsequently}} found a recording showing who had borrowed it. In a practice courtroom activity, the students agreed to {{acquit}} Sam of the imaginary charge. Knowing that his friends believed him helped {{relieve}} his anxiety.',
      el: 'Κάποιος ήθελε να κατηγορήσει τον Σαμ ότι είχε πάρει την κάμερα της λέσχης. Η υπεύθυνη προσπάθησε να τον καθησυχάσει: «Θα ελέγξουμε πρώτα τα γεγονότα». Στη συνέχεια βρήκαν μια καταγραφή που έδειχνε ποιος την είχε δανειστεί. Σε μια εκπαιδευτική προσομοίωση δικαστηρίου, οι μαθητές συμφώνησαν να αθωώσουν τον Σαμ από τη φανταστική κατηγορία. Το ότι ήξερε πως οι φίλοι του τον πίστευαν βοήθησε να ανακουφιστεί από το άγχος του.'
    },
    {
      key: 'storm-plan', emoji: '⛈️', scene: 'storm',
      name: 'Η καταιγίδα αλλάζει τα σχέδια', desc: 'Αναβολή της γιορτής και ασφαλής μετακίνηση',
      en: 'A storm forced the club to {{postpone}} its outdoor festival. Rising water could {{displace}} nearby families, so police decided to {{ban}} cars from the flooded square and {{divert}} traffic to a safer road. A few residents had to {{flee}} their homes before the water reached them. At the shelter, Maya tried to {{banish}} her worries by helping everyone find dry blankets.',
      el: 'Μια καταιγίδα ανάγκασε τη λέσχη να αναβάλει την υπαίθρια γιορτή της. Η άνοδος του νερού μπορούσε να εκτοπίσει οικογένειες από τα σπίτια τους, οπότε η αστυνομία αποφάσισε να απαγορεύσει τα αυτοκίνητα στην πλημμυρισμένη πλατεία και να εκτρέψει την κυκλοφορία σε ασφαλέστερο δρόμο. Μερικοί κάτοικοι αναγκάστηκαν να φύγουν από τα σπίτια τους πριν τους φτάσει το νερό. Στο καταφύγιο η Μάγια προσπάθησε να διώξει τις ανησυχίες της βοηθώντας όλους να βρουν στεγνές κουβέρτες.'
    },
    {
      key: 'online-offer', emoji: '🔎', scene: 'warehouse',
      name: 'Η προσφορά που ήταν πολύ καλή', desc: 'Ξεχωρίζουμε την εξαπάτηση από την παρεξήγηση',
      en: 'An online seller was {{supposedly}} offering a rare camera at a tiny price. {{Coincidentally}}, Sam had seen the same photograph on another website. The advert was part of a {{devious}} plan to {{deceive}} buyers. “Do not {{delude}} yourself into thinking every bargain is real,” he said. “A misleading picture can {{mislead}} you. But do not {{misconstrue}} my warning as criticism; I just want to help.”',
      el: 'Ένας διαδικτυακός πωλητής υποτίθεται ότι πρόσφερε μια σπάνια κάμερα σε εξαιρετικά χαμηλή τιμή. Κατά σύμπτωση ο Σαμ είχε δει την ίδια φωτογραφία σε άλλον ιστότοπο. Η αγγελία αποτελούσε μέρος ενός δόλιου σχεδίου για να εξαπατήσει αγοραστές. «Μην αυταπατάσαι πιστεύοντας ότι κάθε προσφορά είναι αληθινή», είπε. «Μια παραπλανητική εικόνα μπορεί να σε παραπλανήσει. Όμως μην παρερμηνεύσεις την προειδοποίησή μου ως κριτική· θέλω απλώς να βοηθήσω».'
    },
    {
      key: 'film-night', emoji: '🎬', scene: 'survey',
      name: 'Η βραδιά της προβολής', desc: 'Μια διστακτική μαθήτρια βρίσκει τη φωνή της',
      en: 'Before the {{projection}} of their film, Leo gave a short {{overview}} of the story. A local actor made a surprise {{appearance}} and asked Maya to {{elaborate}} on her idea. She was {{reluctant}} to speak, and her face began to {{flush}}. The actor listened patiently. By the end of the evening, Maya had a much more positive {{outlook}} on speaking in public.',
      el: 'Πριν από την προβολή της ταινίας τους ο Λίο έκανε μια σύντομη επισκόπηση της ιστορίας. Ένας ντόπιος ηθοποιός έκανε μια απρόσμενη εμφάνιση και ζήτησε από τη Μάγια να αναπτύξει την ιδέα της με περισσότερες λεπτομέρειες. Εκείνη δίσταζε να μιλήσει και το πρόσωπό της άρχισε να κοκκινίζει. Ο ηθοποιός την άκουσε υπομονετικά. Μέχρι το τέλος της βραδιάς η Μάγια είχε αποκτήσει πολύ θετικότερη στάση απέναντι στη δημόσια ομιλία.'
    },
    {
      key: 'energy-plan', emoji: '☀️', scene: 'committee',
      name: 'Το σχέδιο για μια πράσινη λέσχη', desc: 'Κανόνες, ενέργεια και δίκαιες αποφάσεις',
      en: 'The club wanted to {{generate}} its own electricity with solar panels. First, the members had to {{formulate}} a plan. The {{formulation}} of a budget took several meetings. Safety was {{fundamental}}, so trained adults would {{enforce}} the rules during installation. The committee also voted to {{abolish}} an old rule that prevented younger members from suggesting projects. Now everyone could contribute an idea.',
      el: 'Η λέσχη ήθελε να παράγει το δικό της ηλεκτρικό ρεύμα με φωτοβολταϊκά. Πρώτα τα μέλη έπρεπε να καταρτίσουν ένα σχέδιο. Η διαμόρφωση ενός προϋπολογισμού χρειάστηκε αρκετές συναντήσεις. Η ασφάλεια ήταν θεμελιώδης, γι’ αυτό εκπαιδευμένοι ενήλικοι θα επέβαλλαν την τήρηση των κανόνων κατά την εγκατάσταση. Η επιτροπή ψήφισε επίσης να καταργήσει έναν παλιό κανόνα που εμπόδιζε τα μικρότερα μέλη να προτείνουν έργα. Τώρα όλοι μπορούσαν να συνεισφέρουν μια ιδέα.'
    },
    {
      key: 'keep-going', emoji: '🎯', scene: 'recovery',
      name: 'Η προπόνηση που δεν πήγε τέλεια', desc: 'Από την απογοήτευση στην επιμονή',
      en: 'After a difficult practice, Maya felt an {{impulse}} to quit. She thought it was {{absurd}} to {{pursue}} her dream of playing for the school team. Her coach did not let an argument with a teammate {{escalate}}. Instead, she tried to {{instill}} confidence in Maya and {{motivate}} her with small, achievable goals. Maya chose not to {{succumb}} to fear. She returned the next day, ready to practise until she could {{succeed}}.',
      el: 'Μετά από μια δύσκολη προπόνηση η Μάγια ένιωσε την παρόρμηση να τα παρατήσει. Νόμιζε πως ήταν παράλογο να επιδιώκει το όνειρό της να παίξει στη σχολική ομάδα. Η προπονήτριά της δεν άφησε μια διαφωνία με συμπαίκτρια να οξυνθεί. Αντίθετα, προσπάθησε να ενσταλάξει αυτοπεποίθηση στη Μάγια και να της δώσει κίνητρο με μικρούς, εφικτούς στόχους. Η Μάγια διάλεξε να μην υποκύψει στον φόβο. Επέστρεψε την επόμενη ημέρα, έτοιμη να εξασκηθεί ώσπου να πετύχει.'
    }
  ];
  const prefix = 'pages66-70-';
  const stories = storyRows.map(story => ({
    ...story,
    revision: 1,
    id: prefix + story.key,
    image: 'assets/stories/story-' + story.scene + '.jpg',
    ids: [...new Set([...story.en.matchAll(/\{\{([^}:]+)(?::([^}]+))?\}\}/g)].map(match => prefix + (match[2] || match[1]).toLowerCase()))],
    en: story.en.replace(/\{\{([^}:]+)(?::([^}]+))?\}\}/g, (_, display, id) => '{{' + display + ':' + prefix + (id || display).toLowerCase() + '}}')
  }));
  window.EnglishPages6670 = {
    unit,
    stories,
    words: rows.map(([en, el, example, exampleGr]) => ({
      id: prefix + en, en, el, example, exampleGr,
      scene: stories.find(story => story.ids.includes(prefix + en))?.id || '', unit
    }))
  };
})();
