(() => {
  'use strict';

  const femaleVoiceNames = [
    /\bsamantha\b/i, /\bava\b/i, /\ballison\b/i, /\bsusan\b/i,
    /\bnicky\b/i, /\bvictoria\b/i, /\baria\b/i, /\bjenny\b/i,
    /\bzira\b/i, /\bemma\b/i, /\bmichelle\b/i, /\bana\b/i,
    /\bsalli\b/i, /\bjoanna\b/i, /\bgoogle us english\b/i,
    /\bkathy\b/i, /\bflo\b/i, /\bsandy\b/i, /\bgrandma\b/i,
    /\bfemale\b/i
  ];
  let pending = null;
  let pendingTimer = null;
  let repeatTimer = null;
  let activeRequest = null;
  let currentUtterance = null;

  function availableVoices() {
    return window.speechSynthesis?.getVoices() || [];
  }

  function selectVoice(voices = availableVoices()) {
    const american = voices.filter(voice => String(voice.lang).replace(/_/g, '-').toLowerCase() === 'en-us');
    for (const pattern of femaleVoiceNames) {
      const matches = american.filter(voice => pattern.test(voice.name));
      if (matches.length) {
        const quality = voice => (/premium|enhanced|natural|neural/i.test(voice.name) ? 2 : 0) + (voice.localService ? 1 : 0);
        return matches.sort((first, second) => quality(second) - quality(first))[0];
      }
    }
    return null;
  }

  function description() {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return 'Η εκφώνηση δεν υποστηρίζεται σε αυτό το πρόγραμμα περιήγησης.';
    const voice = selectVoice();
    const base = voice ? `🇺🇸 American English · γυναικεία φωνή ${voice.name}` : '🇺🇸 American English · χρειάζεται διαθέσιμη γυναικεία φωνή στη συσκευή.';
    return activeRequest?.repeat ? `${base} · 🔁 Επανάληψη: ${activeRequest.text}` : base;
  }

  function isRepeating(value) {
    return Boolean(activeRequest?.repeat && activeRequest.text === String(value || '').trim());
  }

  function refresh() {
    document.querySelectorAll('[data-english-voice]').forEach(element => {
      const text = description();
      if (element.textContent !== text) element.textContent = text;
    });
    document.querySelectorAll('[data-speak], [data-repeat-word]').forEach(element => {
      const word = element.dataset.speak || element.dataset.repeatWord;
      const repeating = isRepeating(word);
      const label = repeating ? `Σταμάτα την επανάληψη της λέξης ${word}` : `Άκου σε επανάληψη τη λέξη ${word}`;
      element.setAttribute('aria-pressed', String(repeating));
      element.setAttribute('aria-label', label);
      element.title = label;
      element.classList.toggle('is-speaking', repeating);
      if (element.hasAttribute('data-speak')) element.textContent = repeating ? '⏹' : '🔊';
    });
    document.querySelectorAll('[data-english-repeat-status]').forEach(element => {
      const text = activeRequest?.repeat ? `🔁 Επαναλαμβάνεται: ${activeRequest.text}. Ξαναπάτησε τη λέξη ή το ⏹ για διακοπή.` : 'Πάτησε τη λέξη ή το 🔊 για συνεχή επανάληψη. Με δεύτερο πάτημα σταματά.';
      if (element.textContent !== text) element.textContent = text;
    });
  }

  function stop() {
    clearTimeout(pendingTimer);
    clearTimeout(repeatTimer);
    pendingTimer = null;
    repeatTimer = null;
    pending = null;
    activeRequest = null;
    currentUtterance = null;
    window.speechSynthesis?.cancel();
    refresh();
  }

  function play(request) {
    if (activeRequest !== request) return;
    const voice = selectVoice();
    if (!voice) {
      stop();
      request.notify('Δεν βρέθηκε γυναικεία φωνή English (United States). Πρόσθεσέ τη στις φωνές της συσκευής, π.χ. Samantha, και ξαναπάτησε 🔊.');
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(request.text);
    utterance.lang = 'en-US';
    utterance.voice = voice;
    utterance.rate = 0.83;
    utterance.pitch = 1;
    currentUtterance = utterance;
    utterance.onend = () => {
      if (currentUtterance !== utterance || activeRequest !== request) return;
      currentUtterance = null;
      if (!request.repeat) {
        activeRequest = null;
        refresh();
        return;
      }
      repeatTimer = setTimeout(() => {
        repeatTimer = null;
        play(request);
      }, 800);
    };
    utterance.onerror = event => {
      if (currentUtterance !== utterance || activeRequest !== request) return;
      stop();
      if (!['canceled', 'interrupted'].includes(event.error)) request.notify('Η φωνή δεν μπόρεσε να αναπαραχθεί. Έλεγξε ότι είναι διαθέσιμη στη συσκευή και ξαναπάτησε 🔊.');
    };
    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      stop();
      request.notify('Η εκφώνηση δεν ξεκίνησε. Ξαναπάτησε 🔊.');
    }
  }

  function start(value, notify, repeat) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      notify('Η εκφώνηση δεν υποστηρίζεται σε αυτό το πρόγραμμα περιήγησης.');
      return;
    }
    const text = String(value || '').trim();
    if (!text) return;
    stop();
    activeRequest = {text, notify, repeat};
    refresh();
    if (availableVoices().length) {
      play(activeRequest);
      return;
    }
    pending = activeRequest;
    pendingTimer = setTimeout(() => {
      const request = pending;
      pending = null;
      pendingTimer = null;
      if (request) play(request);
    }, 2500);
  }

  function speak(value, notify = () => {}) {
    start(value, notify, false);
  }

  function toggle(value, notify = () => {}) {
    if (isRepeating(value)) stop();
    else start(value, notify, true);
  }

  window.speechSynthesis?.addEventListener('voiceschanged', () => {
    refresh();
    if (!pending || !selectVoice()) return;
    const request = pending;
    clearTimeout(pendingTimer);
    pendingTimer = null;
    pending = null;
    play(request);
  });
  window.addEventListener('pagehide', stop);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  availableVoices();
  window.EnglishSpeech = {speak, toggle, stop, description, refresh, isRepeating};
})();
