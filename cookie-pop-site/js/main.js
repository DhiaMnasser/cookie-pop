/* Cookie POP — interactions
   i18n (FR default / EN / AR-RTL) · Lenis smooth scroll · GSAP reveals ·
   hero pointer parallax · pinned "making" scroll story (separated parts + particles). */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!hasGsap) root.classList.remove('js-anim');
  var animate = hasGsap && !reduceMotion;


  /* ======================================================================
     Site details — fill these in and the matching buttons/blocks appear.
     Anything left empty stays hidden (no [PLACEHOLDER] ever shows).
     ====================================================================== */
  var SITE = {
    instagram: '',            // e.g. 'cookiepop.tn'   (without @)
    whatsapp: '',             // e.g. '21612345678'    (international, digits only)
    prices: { s: '', m: '', l: '' },   // e.g. '9 DT'
    shops: []                 // e.g. [{ name: 'Café X', area: 'La Marsa' }]
  };
  function applySite() {
    document.querySelectorAll('[data-cfg="instagram"]').forEach(function (a) {
      if (SITE.instagram) a.href = 'https://instagram.com/' + SITE.instagram; else a.hidden = true;
    });
    document.querySelectorAll('[data-cfg="whatsapp"]').forEach(function (a) {
      if (SITE.whatsapp) a.href = 'https://wa.me/' + SITE.whatsapp; else a.hidden = true;
    });
    var soon = document.querySelector('.order-soon');
    if (soon) soon.hidden = !!(SITE.instagram || SITE.whatsapp);
    document.querySelectorAll('[data-price]').forEach(function (el) { el.textContent = SITE.prices[el.getAttribute('data-price')] || ''; });
    var block = document.querySelector('[data-cfg="shops"]');
    if (block) {
      if (!SITE.shops.length) block.hidden = true;
      else block.querySelector('.shops').innerHTML = SITE.shops.map(function (x) {
        return '<li><span class="shop-name">' + x.name + '</span><span class="shop-area">' + (x.area || '') + '</span></li>';
      }).join('');
    }
  }
  applySite();

  /* ======================================================================
     i18n — French lives in the HTML; EN and AR here. No recipe details.
     ====================================================================== */
  var I18N = {
    en: {
      'a11y.skip': 'Skip to content', 'a11y.home': 'Cookie POP – home', 'a11y.nav': 'Main navigation',
      'a11y.lang': 'Language', 'a11y.menu': 'Open menu', 'a11y.menuClose': 'Close menu', 'a11y.chapters': 'Steps',
      'nav.making': 'How it’s made', 'nav.sizes': 'Sizes', 'nav.dips': 'Dips', 'nav.find': 'Find us', 'nav.order': 'Order',
      'hero.label': 'Mini cookie balls × double dip',
      'hero.title': 'Made <br>to dip.',
      'hero.text': 'Bite-size cookie balls, shaped by hand in small batches and sealed in a clear cup with milk and white chocolate to dip.',
      'hero.cta1': 'Order', 'hero.cta2': 'See how it’s made',
      'note.balls': 'Mini cookie balls', 'note.dip': 'Double chocolate dip',
      'stamp': 'HOMEMADE • DIP • BITE • REPEAT • TUNISIA •',
      'feat.1': 'Small bites', 'feat.2': 'Big happiness', 'feat.3': 'Premium quality',
      'making.label': 'How it’s made', 'making.title': 'From bowl <br>to cup.', 'making.hint': 'Keep scrolling, we make it in front of you',
      'ch1.name': 'The bowl', 'ch1.title': 'It starts here', 'ch1.text': 'A bowl, good butter and a house recipe we keep to ourselves.',
      'ch2.name': 'Whip', 'ch2.title': 'Soft as a cloud', 'ch2.text': 'Whipped until light and creamy. That’s where the melt comes from.',
      'ch3.name': 'Chips', 'ch3.title': 'Chips everywhere', 'ch3.text': 'A generous homemade dough, with chocolate chips in every bite.',
      'ch4.name': 'Shape', 'ch4.title': 'Rolled by hand', 'ch4.text': 'Every ball shaped one by one, golden or cacao.',
      'ch5.name': 'Bake', 'ch5.title': 'Straight from the oven', 'ch5.text': 'Golden outside, soft inside. The whole kitchen smells like cookies.',
      'ch6.name': 'Fill', 'ch6.title': 'Into the cup', 'ch6.text': 'The balls tumble into a crystal-clear cup, golden and cacao mixed.',
      'ch7.name': 'Dip', 'ch7.title': 'Double dip', 'ch7.text': 'Milk and white chocolate, each in its own compartment, away from the cookies.',
      'ch8.name': 'Seal', 'ch8.title': 'Sealed with a pop', 'ch8.text': 'A dome, a sticker, and it’s ready to munch.',
      'sizes.label': 'The lineup', 'sizes.title': 'Pick your pop.', 'sizes.text': 'Same cookies, same dips. Just choose how hungry you are.',
      'sizes.s': 'Small', 'sizes.m': 'Medium', 'sizes.l': 'Large', 'sizes.badge': 'Most loved',
      'dips.label': 'The dips', 'dips.title': 'Milk. White. Both.',
      'dips.text': 'Two chocolates sealed in their own compartments in the lid, so the cookies stay crunchy until the moment you dip.',
      'dips.milk': 'Milk chocolate', 'dips.white': 'White chocolate', 'dips.milkNote': 'the classic', 'dips.whiteNote': 'extra smooth',
      'find.label': 'Find us', 'find.title': 'Near you',
      'order.label': 'Order', 'order.title': 'Order your pop.',
      'order.text': 'Parties, birthdays, events or your shop: message us and we’ll get your cups ready.',
      'order.ig': 'Message us on Instagram', 'order.wa': 'WhatsApp', 'order.soon': 'Online ordering is coming very soon ♡',
      'num.1': 'chocolates to dip', 'num.2': 'cup sizes', 'num.3': 'made by hand', 'num.4': 'flavours: classic, cacao, strawberry, pistachio',
      'nav.flavours': 'Flavours', 'flav.label': 'The flavours', 'flav.title': 'Four flavours to munch.',
      'flav.text': 'Classic, cacao, strawberry or pistachio: a colour for every mood.',
      'flav.classic': 'Classic', 'flav.classicNote': 'chocolate chips', 'flav.cacao': 'Cacao', 'flav.cacaoNote': 'double chocolate',
      'flav.fraise': 'Strawberry', 'flav.fraiseNote': 'pretty in pink', 'flav.pistache': 'Pistachio', 'flav.pistacheNote': 'green & gorgeous',
      'alt.lineupColor': 'Cookie POP cups filled with classic, cacao, strawberry and pistachio mini cookie balls, with the double chocolate dip',
      'alt.lineup': 'The three Cookie POP cups, small, medium and large, filled with mini cookie balls and the double chocolate dip',
      'footer.meta': 'Homemade · Tunisia',
      'alt.hero': 'Clear Cookie POP cup filled with golden and cacao mini cookie balls, with milk and white chocolate under a dome lid',
      'alt.ch1': 'Butter in a bowl', 'alt.ch2': 'A light cream in a bowl', 'alt.ch3': 'Cookie dough with chocolate chips',
      'alt.ch4': 'Golden and cacao cookie balls on a tray', 'alt.ch5': 'Golden mini cookies fresh from the oven',
      'alt.ch6': 'Clear cup filled with golden and cacao mini cookies', 'alt.ch7': 'Cup with the milk and white chocolate insert',
      'alt.ch8': 'Sealed Cookie POP cup with dome lid and sticker',
      'alt.small': 'Small Cookie POP cup', 'alt.medium': 'Medium Cookie POP cup', 'alt.large': 'Large Cookie POP cup',
      'alt.dipMilk': 'Bowl of milk chocolate with a cookie ball', 'alt.dipWhite': 'Bowl of white chocolate with a cookie ball'
    },
    ar: {
      'a11y.skip': 'انتقل إلى المحتوى', 'a11y.home': 'Cookie POP – الرئيسية', 'a11y.nav': 'القائمة الرئيسية',
      'a11y.lang': 'اللغة', 'a11y.menu': 'افتح القائمة', 'a11y.menuClose': 'أغلق القائمة', 'a11y.chapters': 'المراحل',
      'nav.making': 'طريقة التحضير', 'nav.sizes': 'الأحجام', 'nav.dips': 'الشوكولا', 'nav.find': 'أين تجدنا', 'nav.order': 'اطلب',
      'hero.label': 'كرات كوكيز صغيرة × شوكولا مزدوجة',
      'hero.title': 'مصنوعة <br>للتغميس.',
      'hero.text': 'كرات كوكيز صغيرة، تُشكّل يدوياً على دفعات صغيرة وتُغلق في كأس شفاف مع شوكولا بالحليب وشوكولا بيضاء للتغميس.',
      'hero.cta1': 'اطلب الآن', 'hero.cta2': 'شاهد طريقة التحضير',
      'note.balls': 'كرات كوكيز صغيرة', 'note.dip': 'شوكولا مزدوجة',
      'stamp': 'صنع منزلي • غطّس • كول • عاود • تونس •',
      'feat.1': 'قضمات صغيرة', 'feat.2': 'سعادة كبيرة', 'feat.3': 'جودة عالية',
      'making.label': 'طريقة التحضير', 'making.title': 'من الوعاء <br>إلى الكأس.', 'making.hint': 'واصل التمرير، نحضّرها أمامك',
      'ch1.name': 'الوعاء', 'ch1.title': 'من هنا تبدأ', 'ch1.text': 'وعاء، زبدة جيدة، ووصفة منزلية نحتفظ بسرّها.',
      'ch2.name': 'خفق', 'ch2.title': 'ناعمة كالغيمة', 'ch2.text': 'نخفق حتى تصبح كريمة خفيفة. من هنا يأتي الذوبان في الفم.',
      'ch3.name': 'شوكولا', 'ch3.title': 'رقائق في كل مكان', 'ch3.text': 'عجينة منزلية سخية، مع رقائق الشوكولا في كل قضمة.',
      'ch4.name': 'تشكيل', 'ch4.title': 'مكوّرة باليد', 'ch4.text': 'كل كرة تُشكّل واحدة تلو الأخرى، ذهبية أو بالكاكاو.',
      'ch5.name': 'خبز', 'ch5.title': 'من الفرن مباشرة', 'ch5.text': 'ذهبية من الخارج، طرية من الداخل. ورائحة الكوكيز تملأ المطبخ.',
      'ch6.name': 'تعبئة', 'ch6.title': 'إلى الكأس', 'ch6.text': 'تتساقط الكرات في كأس شفاف كالكريستال، ذهبية وبالكاكاو معاً.',
      'ch7.name': 'شوكولا', 'ch7.title': 'شوكولا مزدوجة', 'ch7.text': 'شوكولا بالحليب وشوكولا بيضاء، كلٌّ في قسمه، بعيداً عن الكوكيز.',
      'ch8.name': 'إغلاق', 'ch8.title': 'يُغلق مع «بوب»', 'ch8.text': 'قبة، ملصق، وجاهزة للأكل.',
      'sizes.label': 'التشكيلة', 'sizes.title': 'اختر حجمك.', 'sizes.text': 'نفس الكوكيز، نفس الشوكولا. اختر فقط حسب جوعك.',
      'sizes.s': 'صغير', 'sizes.m': 'وسط', 'sizes.l': 'كبير', 'sizes.badge': 'الأكثر طلباً',
      'dips.label': 'الشوكولا', 'dips.title': 'حليب. أبيض. الاثنان.',
      'dips.text': 'نوعان من الشوكولا، كلٌّ في قسمه المغلق داخل الغطاء، لتبقى الكوكيز مقرمشة حتى لحظة التغميس.',
      'dips.milk': 'شوكولا بالحليب', 'dips.white': 'شوكولا بيضاء', 'dips.milkNote': 'الكلاسيكية', 'dips.whiteNote': 'ناعمة جداً',
      'find.label': 'أين تجدنا', 'find.title': 'قريب منك',
      'order.label': 'اطلب', 'order.title': 'اطلب كأسك.',
      'order.text': 'حفلات، أعياد ميلاد، مناسبات أو محلّك: راسلنا ونحضّر لك الكؤوس.',
      'order.ig': 'راسلنا على إنستغرام', 'order.wa': 'واتساب', 'order.soon': 'الطلب عبر الإنترنت قريباً جداً ♡',
      'num.1': 'نوعان من الشوكولا للتغميس', 'num.2': 'أحجام للكأس', 'num.3': 'صنع يدوي', 'num.4': 'نكهات: كلاسيك، كاكاو، فراولة، فستق',
      'nav.flavours': 'النكهات', 'flav.label': 'النكهات', 'flav.title': 'أربع نكهات للقرمشة.',
      'flav.text': 'كلاسيك، كاكاو، فراولة أو فستق: لون لكل مزاج.',
      'flav.classic': 'كلاسيك', 'flav.classicNote': 'رقائق الشوكولا', 'flav.cacao': 'كاكاو', 'flav.cacaoNote': 'شوكولا مضاعفة',
      'flav.fraise': 'فراولة', 'flav.fraiseNote': 'وردية بالكامل', 'flav.pistache': 'فستق', 'flav.pistacheNote': 'خضراء بالكامل',
      'alt.lineupColor': 'كؤوس Cookie POP مليئة بكرات كوكيز كلاسيك وكاكاو وفراولة وفستق، مع الشوكولا المزدوجة',
      'alt.lineup': 'كؤوس Cookie POP الثلاثة، صغير ووسط وكبير، مليئة بكرات الكوكيز مع الشوكولا المزدوجة',
      'footer.meta': 'صنع منزلي · تونس',
      'alt.hero': 'كأس Cookie POP شفاف مليء بكرات كوكيز ذهبية وبالكاكاو، مع شوكولا بالحليب وشوكولا بيضاء تحت غطاء قبة',
      'alt.ch1': 'زبدة في وعاء', 'alt.ch2': 'كريمة خفيفة في وعاء', 'alt.ch3': 'عجينة كوكيز مع رقائق الشوكولا',
      'alt.ch4': 'كرات كوكيز ذهبية وبالكاكاو على صينية', 'alt.ch5': 'كوكيز صغيرة ذهبية خارجة من الفرن',
      'alt.ch6': 'كأس شفاف مليء بكرات كوكيز ذهبية وبالكاكاو', 'alt.ch7': 'كأس مع حاوية الشوكولا بالحليب والبيضاء',
      'alt.ch8': 'كأس Cookie POP مغلق بغطاء قبة وملصق',
      'alt.small': 'كأس Cookie POP صغير', 'alt.medium': 'كأس Cookie POP وسط', 'alt.large': 'كأس Cookie POP كبير',
      'alt.dipMilk': 'وعاء شوكولا بالحليب مع كرة كوكيز', 'alt.dipWhite': 'وعاء شوكولا بيضاء مع كرة كوكيز'
    }
  };
  I18N.fr = { 'a11y.menuClose': 'Fermer le menu' };

  var textNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var attrNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-attr]'));
  textNodes.forEach(function (n) { I18N.fr[n.getAttribute('data-i18n')] = n.innerHTML; });
  attrNodes.forEach(function (n) { parseAttr(n).forEach(function (p) { I18N.fr[p.key] = n.getAttribute(p.attr); }); });
  I18N.fr['a11y.menu'] = I18N.fr['a11y.menu'] || 'Ouvrir le menu';

  function parseAttr(n) {
    return n.getAttribute('data-i18n-attr').split('|').map(function (s) {
      var i = s.indexOf(':');
      return { attr: s.slice(0, i).trim(), key: s.slice(i + 1).trim() };
    });
  }
  var currentLang = 'fr';
  function t(key) {
    var d = I18N[currentLang] || I18N.fr;
    return d[key] != null ? d[key] : I18N.fr[key];
  }

  /* split headings into words (keeps <br>), so they can rise line by line */
  function splitWords(el) {
    var html = el.innerHTML;
    if (currentLang === 'ar') { el.innerHTML = html; return; }  // Arabic keeps its ligatures whole
    el.innerHTML = html.split(/(<br\s*\/?>)/i).map(function (part) {
      if (/^<br/i.test(part)) return part;
      return part.split(/(\s+)/).map(function (w) {
        return /^\s+$/.test(w) || !w ? w : '<span class="w"><span>' + w + '</span></span>';
      }).join('');
    }).join('');
  }
  function splitAll() { document.querySelectorAll('[data-split]').forEach(splitWords); }

  var langButtons = Array.prototype.slice.call(document.querySelectorAll('.lang-btn'));
  var storyTl = null;

  function setLang(lang, opts) {
    if (!I18N[lang]) lang = 'fr';
    currentLang = lang;
    textNodes.forEach(function (n) {
      var v = t(n.getAttribute('data-i18n'));
      if (v != null) n.innerHTML = v;
    });
    attrNodes.forEach(function (n) {
      parseAttr(n).forEach(function (p) { var v = t(p.key); if (v != null) n.setAttribute(p.attr, v); });
    });
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    splitAll();
    langButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    updateMenuLabel();
    renderStory();
    if (!(opts && opts.initial)) {
      try { localStorage.setItem('cp-lang', lang); } catch (e) {}
      try {
        var url = new URL(location.href);
        if (lang === 'fr') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
        history.replaceState(null, '', url);
      } catch (e) {}
      if (animate && storyTl) rebuildStory();
      if (hasGsap) window.ScrollTrigger.refresh();
    }
  }
  langButtons.forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });

  /* ======================================================================
     Header: mobile menu + hide on scroll down
     ====================================================================== */
  var header = document.getElementById('site-header');
  var menuBtn = header.querySelector('.menu-btn');
  var menuOpen = false;
  function updateMenuLabel() { menuBtn.setAttribute('aria-label', t(menuOpen ? 'a11y.menuClose' : 'a11y.menu')); }
  function setMenu(open) {
    menuOpen = open;
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    updateMenuLabel();
    if (open) header.classList.remove('is-hidden');
  }
  menuBtn.addEventListener('click', function () { setMenu(!menuOpen); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) { setMenu(false); menuBtn.focus(); } });
  document.addEventListener('click', function (e) { if (menuOpen && !header.contains(e.target)) setMenu(false); });
  window.matchMedia('(min-width: 920px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });

  var lastY = window.scrollY;
  function onScrollHeader() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    if (!menuOpen && !reduceMotion) {
      if (y > lastY + 4 && y > 240) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 240) header.classList.remove('is-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });

  /* ======================================================================
     Smooth scroll (Lenis) + anchor links
     ====================================================================== */
  var lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.2, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(0);
    }
  }
  function scrollToY(y) {
    y = Math.max(0, y);
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    scrollToY(id === 'hero' ? 0 : target.getBoundingClientRect().top + window.scrollY - 8);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* ======================================================================
     Hero pointer parallax (CSS vars, smoothed)
     ====================================================================== */
  var heroVisual = document.querySelector('.hero-scene');
  if (heroVisual && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    heroVisual.querySelectorAll('[data-depth]').forEach(function (el) { el.style.setProperty('--d', el.getAttribute('data-depth')); });
    var plate = heroVisual.querySelector('.hero-plate');
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    var hero = document.getElementById('hero');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 40;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 30;
      if (!raf) raf = requestAnimationFrame(step);
    });
    hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(step); });
    function step() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      heroVisual.style.setProperty('--mx', cx.toFixed(2));
      heroVisual.style.setProperty('--my', cy.toFixed(2));
      if (plate) plate.style.translate = (cx * -0.25).toFixed(2) + 'px ' + (cy * -0.2).toFixed(2) + 'px';
      raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(step) : 0;
    }
  }

  /* ======================================================================
     The making — pinned scroll story
     ====================================================================== */
  var STEP_AT = [0, 2.4, 4.6, 6.8, 9.6, 15.2, 18.2, 20.6];
  var STORY_LEN = 23.6;
  var track = document.querySelector('.story-track');
  var pin = document.querySelector('.story-pin');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.story-tabs .tab'));
  var step = -1, storyTime = 0;

  // each panel carries its own step counter, so it rides in with the panel
  panels.forEach(function (p, i) {
    var c = document.createElement('p');
    c.className = 'panel-count';
    c.setAttribute('aria-hidden', 'true');
    c.innerHTML = '<span dir="ltr"><span class="count-now">0' + (i + 1) + '</span><span class="count-all">/0' + panels.length + '</span></span>';
    p.appendChild(c);
  });

  function stepName(i) { return panels[i].querySelector('.chapter-name').textContent; }
  function renderStory() {
    if (!pin) return;
    tabs.forEach(function (tab, i) {
      tab.querySelector('.tab-name').textContent = stepName(i);
      tab.setAttribute('aria-label', '0' + (i + 1) + ' — ' + stepName(i));
    });
    updateStory(storyTime, true);
  }
  function updateStory(time, force) {
    storyTime = time;
    var i = 0;
    // the tab bar sits at the top: switch once the rising panel has reached it
    while (i < STEP_AT.length - 1 && time >= STEP_AT[i + 1] + 0.95) i++;
    if (i !== step || force) {
      step = i;
      pin.setAttribute('data-tone', panels[i].getAttribute('data-tone'));
      tabs.forEach(function (tab, j) { if (j === i) tab.setAttribute('aria-current', 'step'); else tab.removeAttribute('aria-current'); });
    }
    tabs.forEach(function (tab, j) {
      var a = STEP_AT[j], b = j < STEP_AT.length - 1 ? STEP_AT[j + 1] : STORY_LEN;
      tab.style.setProperty('--f', Math.min(1, Math.max(0, (time - a) / (b - a))).toFixed(3));
    });
  }
  function scrollToStep(i) {
    var top = track.getBoundingClientRect().top + window.scrollY;
    var span = track.offsetHeight - window.innerHeight;
    scrollToY(top + span * Math.min(1, (STEP_AT[i] + 1.5) / STORY_LEN));
  }
  tabs.forEach(function (tab, i) { tab.addEventListener('click', function () { scrollToStep(i); }); });

  function buildStory(gsap) {
    var stage = document.querySelector('.stage');
    var q = function (s) { return Array.prototype.slice.call(stage.querySelectorAll(s)); };
    var one = function (s) { return stage.querySelector(s); };
    var W = function () { return stage.offsetWidth; };
    var H = function () { return stage.offsetHeight; };
    var dir = function () { return root.dir === 'rtl' ? -1 : 1; };
    var bowl = one('.rig-bowl'), tray = one('.rig-tray'), cup = one('.rig-cup');
    var cam = one('.ovencam'), oven = one('.rig-oven'), otray = one('.rig-otray'), door = one('.rig-door');
    var bf = q('.rig-bowl .f'), butter = one('.butter');           // empty, sugar, butter, cream, dough, butter sprite
    var ovenBody = q('.rig-oven .f');                               // body, body-baked, body-lit, flap
    var flap = one('.flap'), doorImg = one('.door'), ovenLight = one('.oven-light');
    var ot = q('.rig-otray .f');                                    // tray on the rack: raw, baked
    var tb = q('.rig-tray .tb');                                    // the 24 dough balls on the flat tray
    var fill = one('.fill'), ins = one('.ins'), insL = one('.ins-l'), insR = one('.ins-r');
    var pourL = one('.pour-l'), pourR = one('.pour-r'), lid = one('.lid');
    var sticker = one('.sticker'), burst = one('.burst'), glow = one('.glow'), steam = q('.steam');
    var grains = q('.grains i'), flour = q('.flour'), whisk = one('.whisk'), chips = q('.chips img'), rain = q('.balls img');
    var ovens = [oven, otray, door];
    var copyOf = function (p) { return p.querySelector('.panel-copy'); };
    var wordsOf = function (p) { return p.querySelectorAll('.panel-title .w > span'); };

    // geometry measured from the keyframes (tools/extract_parts.py → parts.json)
    var FLAP_TOP = 0.7627, DOOR_HINGE = 0.8008, WIN_C = [0.4987, 0.3962], OTRAY_C = 0.5057, OTRAY_W = 0.6902;
    var FILL_FROM = 91.9, FILL_TO = 40.2, INS_TOP = 14.1, INS_BOT = 40.2;

    function box(el) { return { l: el.offsetLeft, t: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }; }
    function pt(el, fx, fy, pose) {
      var b = box(el), s = pose.s == null ? 1 : pose.s, sy = pose.sy == null ? s : pose.sy;
      return { x: b.l + b.w / 2 + (fx * b.w - b.w / 2) * s + (pose.x || 0), y: b.t + b.h / 2 + (fy * b.h - b.h / 2) * sy + (pose.y || 0) };
    }
    var TRAY_SHAPE = function () { return { x: 0, y: H() * 0.2, s: 0.9 }; };
    var BOWL_POUR = function () { return { x: -W() * 0.04, y: -H() * 0.27, s: 0.58 }; };
    // the tray on the rack, at the front of the oven, matched in width and centre to the flat tray
    var OT_FRONT = function () {
      var s = 0.945 * box(tray).w * 0.9 / (OTRAY_W * box(oven).w);
      var ty = pt(tray, 0.5, 0.5, TRAY_SHAPE()).y, oy = pt(oven, 0.5, OTRAY_C, {}).y;
      return { y: ty - oy, s: s };
    };
    var CAM_ORIGIN = function () { var c = pt(oven, WIN_C[0], WIN_C[1], {}); return c.x + 'px ' + c.y + 'px'; };
    var CAM_ZOOM = function () { var c = pt(oven, WIN_C[0], WIN_C[1], {}); return { x: W() * 0.5 - c.x, y: H() * 0.47 - c.y }; };

    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      onUpdate: function () { updateStory(tl.time()); },
      // no invalidateOnRefresh: invalidating mid-story makes every .to() re-record its start from the current
      // (half-played) state, so parts vanish or show up early. Size changes rebuild the timeline instead (watchStage).
      scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: 1 }
    });
    // A value that's only in a fromTo's "from" (e.g. opacity: 1 to show a part) is not part of the tween itself:
    // when a scrub jump crosses the tween back and forth, GSAP restores the pre-tween value (opacity 0) and never
    // re-applies it, so the cup / tray / lid stays invisible. Carry every from-only value into the "to" as well.
    var fromTo = tl.fromTo;
    tl.fromTo = function (targets, from, to, at) {
      Object.keys(from).forEach(function (k) { if (!(k in to)) to[k] = from[k]; });
      return fromTo.call(this, targets, from, to, at);
    };

    // ---- initial state
    gsap.set(panels.slice(1), { yPercent: 115 });
    gsap.set(panels.map(copyOf), { y: 0, opacity: 1 });
    panels.slice(1).forEach(function (p) {
      var w = wordsOf(p);
      if (w.length) gsap.set(w, { yPercent: 115 });
      gsap.set(p.querySelectorAll('.step-kicker, .panel-text'), { opacity: 0, y: 24 });
      // Arabic titles aren't split (whole-title fade); other languages rise word by word. Always reset the title
      // too, or a rebuild after switching from Arabic leaves it stuck at opacity 0.
      gsap.set(p.querySelector('.panel-title'), w.length ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 });
    });
    gsap.set([bowl, tray, cup, cam].concat(ovens), { x: 0, y: 0, yPercent: 0, scaleX: 1, scaleY: 1, rotation: 0 });
    gsap.set([tray, cup].concat(ovens), { opacity: 0 });
    gsap.set(bowl, { opacity: 1, x: function () { return W() * 1.15; }, rotation: 16 });
    gsap.set(bf[1], { '--r': -16 });
    gsap.set(bf[2], { opacity: 0 });
    gsap.set([bf[3], bf[4]], { '--a': -60 });
    gsap.set(butter, { opacity: 0, y: 0, rotation: 0 });
    gsap.set([ovenBody[1], ovenBody[2], ovenLight, ot[1]], { opacity: 0 });
    gsap.set(otray, { transformOrigin: '50% ' + OTRAY_C * 100 + '%' });
    gsap.set(flap, { scaleY: 1, transformOrigin: '50% ' + FLAP_TOP * 100 + '%' });
    gsap.set(doorImg, { rotationX: -90, opacity: 0, transformPerspective: 2600, transformOrigin: '50% ' + DOOR_HINGE * 100 + '%' });
    gsap.set(tb, { opacity: 0, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, transformOrigin: '50% 85%' });
    gsap.set(fill, { '--ct': 100 });
    gsap.set(ins, { opacity: 0, y: 0, rotation: 0 });
    gsap.set(insL, { '--fl': 41 });
    gsap.set(insR, { '--fr': 41 });
    gsap.set([pourL, pourR], { opacity: 0, scaleY: 0, transformOrigin: '50% 0%' });
    gsap.set(lid, { opacity: 0, y: 0, rotation: 0 });
    gsap.set([glow].concat(steam), { opacity: 0 });
    gsap.set(grains.concat(flour, chips, rain), { opacity: 0, x: 0, y: 0, xPercent: -50, yPercent: -50 });
    gsap.set(whisk, { opacity: 0, x: 0, y: 0, rotation: 0, xPercent: -15, yPercent: -82, transformOrigin: '15% 82%' });
    gsap.set(sticker, { opacity: 0, scale: 2.4, rotation: -32 });
    gsap.set(burst, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' });

    function panelIn(i, at) {
      var p = panels[i], prev = panels[i - 1];
      tl.to(copyOf(prev), { y: -70, opacity: 0, duration: 0.6, ease: 'power2.in' }, at)
        .to(p, { yPercent: 0, duration: 1.1, ease: 'power3.inOut' }, at)
        .to(p.querySelector('.step-kicker'), { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, at + 0.4);
      var w = wordsOf(p);
      if (w.length) tl.to(w, { yPercent: 0, duration: 0.6, stagger: 0.05, ease: 'power4.out' }, at + 0.45);
      else tl.to(p.querySelector('.panel-title'), { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, at + 0.45);
      tl.to(p.querySelector('.panel-text'), { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, at + 0.6);
    }
    function impact(el, at, k) {
      k = k || 1;
      tl.to(el, { yPercent: 1.4 * k, duration: 0.09, ease: 'power2.out' }, at)
        .to(el, { yPercent: 0, duration: 0.5, ease: 'elastic.out(1.1, 0.4)' }, at + 0.09);
    }
    function wobble(el, at, amp, n, d) {
      for (var i = 0; i < n; i++) tl.to(el, { rotation: (i % 2 ? amp : -amp) * (1 - i / n), duration: d, ease: 'sine.inOut' }, at + i * d);
      tl.to(el, { rotation: 0, duration: d, ease: 'sine.out' }, at + n * d);
    }
    var BOWL_IN = function () { return pt(bowl, 0.52, 0.36, {}); };
    function whiskPass(t0, sweep, turns) {
      var ctr = function () { return pt(bowl, 0.52, 0.33, {}); };
      tl.fromTo(whisk, { opacity: 1, x: function () { return ctr().x + W() * 0.45; }, y: function () { return ctr().y - H() * 0.5; }, rotation: 18 },
        { x: function () { return ctr().x + W() * 0.1; }, y: function () { return ctr().y; }, rotation: 0, duration: 0.45, ease: 'power3.out', immediateRender: false }, t0);
      var o = { a: 0 };
      tl.fromTo(o, { a: 0 }, {
        a: Math.PI * 2 * turns, duration: sweep, ease: 'power1.inOut', immediateRender: false,
        onUpdate: function () {
          var c = ctr();
          gsap.set(whisk, { x: c.x + Math.cos(o.a) * W() * 0.1, y: c.y + Math.sin(o.a) * H() * 0.022, rotation: Math.sin(o.a) * 7 });
        }
      }, t0 + 0.45);
      tl.to(whisk, { x: function () { return ctr().x + W() * 0.5; }, y: function () { return ctr().y - H() * 0.55; }, rotation: 20, duration: 0.45, ease: 'power3.in' }, t0 + 0.45 + sweep)
        .set(whisk, { opacity: 0 }, t0 + 0.9 + sweep);
    }
    function stream(list, t0, spread, dur) {
      list.forEach(function (g, k) {
        var at = t0 + k * spread;
        tl.fromTo(g,
          { opacity: 1, x: function () { return BOWL_IN().x + (k % 3 - 1) * W() * 0.01; }, y: function () { return -H() * 0.05; }, rotation: k * 40 },
          { x: function () { return BOWL_IN().x + (k % 5 - 2) * W() * 0.035; }, y: function () { return BOWL_IN().y + (k % 4) * H() * 0.01; }, rotation: k * 90, duration: dur, ease: 'power2.in', immediateRender: false }, at)
          .to(g, { opacity: 0, duration: 0.05 }, at + dur);
      });
    }

    /* 01 — the bowl slides in; sugar pours in first, then the butter cubes drop onto it */
    tl.to(bowl, { x: 0, rotation: 0, duration: 0.95, ease: 'power3.out' }, 0);
    stream(grains, 1.0, 0.03, 0.4);
    tl.to(bf[1], { '--r': 115, duration: 0.7, ease: 'power1.inOut' }, 1.15);
    tl.fromTo(butter, { opacity: 1, y: function () { return -H() * 0.75; }, rotation: -28 },
      { y: 0, rotation: 0, duration: 0.5, ease: 'power2.in', immediateRender: false }, 1.6);
    impact(bowl, 2.1, 1);
    tl.set(bf[2], { opacity: 1 }, 2.12).set(butter, { opacity: 0 }, 2.13);

    /* 02 — whipped: the whisk goes round, the cream appears in its wake */
    panelIn(1, 2.4);
    whiskPass(2.65, 1.1, 2);
    tl.to(bf[3], { '--a': 360, duration: 1.1, ease: 'power1.inOut' }, 3.1);
    wobble(bowl, 3.1, 2.2, 5, 0.2);

    /* 03 — flour falls in and puffs up, chips rain, the whisk goes round again: dough */
    panelIn(2, 4.6);
    stream(grains, 4.8, 0.02, 0.3);
    flour.forEach(function (f, k) {
      var at = 5.08 + k * 0.08;
      tl.fromTo(f,
        { opacity: 0.95, scale: 0.15, rotation: k * 70, x: function () { return BOWL_IN().x; }, y: function () { return BOWL_IN().y; } },
        { scale: k ? 0.8 : 1, rotation: k * 70 + 25, x: function () { return BOWL_IN().x + (k ? 1 : -1) * W() * 0.06; }, y: function () { return BOWL_IN().y - H() * (k ? 0.1 : 0.14); }, duration: 0.5, ease: 'expo.out', immediateRender: false }, at)
        .to(f, { opacity: 0, scale: '+=0.25', y: '-=30', duration: 0.65, ease: 'power1.in' }, at + 0.35);
    });
    chips.forEach(function (c, k) {
      var at = 5.25 + k * 0.06, tx = (k % 4 - 1.5) * 0.09 + (k > 3 ? 0.04 : -0.03);
      tl.fromTo(c,
        { opacity: 1, x: function () { return BOWL_IN().x + W() * tx * 1.6; }, y: function () { return -H() * (0.1 + (k % 3) * 0.08); }, rotation: -90 + k * 40 },
        { x: function () { return BOWL_IN().x + W() * tx; }, y: function () { return BOWL_IN().y + (k % 2) * H() * 0.025; }, rotation: k * 25, duration: 0.5, ease: 'power2.in', immediateRender: false }, at)
        .to(c, { opacity: 0, duration: 0.15 }, at + 0.62);
    });
    whiskPass(5.35, 0.8, 2);
    tl.to(bf[4], { '--a': 360, duration: 0.8, ease: 'power1.inOut' }, 5.8);
    wobble(bowl, 5.8, 2.6, 4, 0.18);

    /* 04 — the bowl lifts and tips; one ball at a time drops onto the empty tray */
    panelIn(3, 6.8);
    tl.to(bowl, { x: function () { return BOWL_POUR().x; }, y: function () { return BOWL_POUR().y; }, scaleX: 0.58, scaleY: 0.58, duration: 0.8, ease: 'power3.inOut' }, 6.95)
      .to(bowl, { rotation: 16, duration: 0.5, ease: 'power2.inOut' }, 7.5);
    tl.fromTo(tray, { opacity: 1, x: 0, y: function () { return H() * 0.8; }, scaleX: 0.9, scaleY: 0.9 },
      { y: function () { return TRAY_SHAPE().y; }, duration: 0.85, ease: 'power3.out', immediateRender: false }, 7.05);
    var LIP = function () { return pt(bowl, 0.72, 0.3, BOWL_POUR()); };
    var order = [];                                   // nearest column first, then outwards: reads as one flow
    for (var c = 5; c >= 0; c--) for (var r = 0; r < 4; r++) order.push(r * 6 + c);
    order.forEach(function (k, n) {
      var el = tb[k], at = 7.85 + n * 0.055;
      var off = function (axis) {
        var b = box(el), tbx = box(tray), s = 0.9;
        var sx = pt(tray, (b.l + b.w / 2) / tbx.w, (b.t + b.h * 0.6) / tbx.h, TRAY_SHAPE());
        var lip = LIP();
        return axis === 'x' ? (lip.x - sx.x) / s : (lip.y - sx.y) / s;
      };
      tl.fromTo(el, { opacity: 1, x: function () { return off('x'); }, y: function () { return off('y'); }, rotation: -70, scaleX: 0.7, scaleY: 0.7 },
        { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, duration: 0.4, ease: 'power2.in', immediateRender: false }, at)
        .to(el, { scaleY: 0.82, scaleX: 1.1, duration: 0.06, ease: 'power2.out' }, at + 0.4)
        .to(el, { scaleY: 1, scaleX: 1, duration: 0.3, ease: 'elastic.out(1.2, 0.45)' }, at + 0.46);
    });
    tl.to(bowl, { y: function () { return -H() * 0.85; }, rotation: 28, opacity: 0, duration: 0.6, ease: 'power3.in' }, 9.25);

    /* 05 — the oven rises; the tray slides onto the rack, the door shuts, we lean in to watch them bake */
    panelIn(4, 9.6);
    tl.set(cam, { transformOrigin: CAM_ORIGIN }, 9.6);
    tl.fromTo([oven, door], { opacity: 0, y: function () { return H() * 0.55; } }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', immediateRender: false }, 9.75);
    // hand-over: the flat tray tilts back into the oven's perspective
    tl.fromTo(otray, { opacity: 0, x: 0, y: function () { return OT_FRONT().y; }, scaleX: function () { return OT_FRONT().s; }, scaleY: function () { return OT_FRONT().s * 1.45; } },
      { opacity: 1, scaleY: function () { return OT_FRONT().s; }, duration: 0.35, ease: 'power2.inOut', immediateRender: false }, 10.55)
      .to(tray, { opacity: 0, scaleY: 0.62, duration: 0.35, ease: 'power2.inOut' }, 10.55);
    tl.to(otray, { y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, 10.9);
    tl.to(flap, { scaleY: 0, duration: 0.22, ease: 'power2.in' }, 11.75)
      .set(doorImg, { opacity: 1 }, 11.79)
      .to(doorImg, { rotationX: 0, duration: 0.36, ease: 'power2.in' }, 11.79);
    impact(ovens, 12.15, 0.5);
    // camera dolly in to the window; the cookies bake behind the glass
    tl.to(cam, { x: function () { return CAM_ZOOM().x; }, y: function () { return CAM_ZOOM().y; }, scale: 2.3, duration: 0.8, ease: 'power2.inOut' }, 12.3)
      .to(glow, { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, 12.4)
      .to(ovenLight, { opacity: 0.9, duration: 0.35, ease: 'power1.out' }, 12.45)
      .to([ovenBody[1], ot[1]], { opacity: 1, duration: 1.3, ease: 'sine.inOut' }, 12.7)   // they turn golden, gradually
      .to(ovenLight, { opacity: 0.55, duration: 0.3, ease: 'sine.inOut' }, 13.1)
      .to(ovenLight, { opacity: 0.95, duration: 0.3, ease: 'sine.inOut' }, 13.4)
      .to(ovenLight, { opacity: 0, duration: 0.3 }, 13.95)
      .to(cam, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power2.inOut' }, 13.95);
    tl.to(doorImg, { rotationX: -90, duration: 0.34, ease: 'power2.out' }, 14.6)
      .set(doorImg, { opacity: 0 }, 14.94)
      .to(flap, { scaleY: 1, duration: 0.22, ease: 'power2.out' }, 14.85)
      .to(ovenBody[2], { opacity: 1, duration: 0.3 }, 14.75);                              // lit, steamy, empty cavity
    steam.forEach(function (s, k) {
      tl.fromTo(s, { opacity: 0, y: 0, scale: 0.7 }, { opacity: 0.9, y: function () { return -H() * 0.1; }, scale: 1.1, duration: 0.5, ease: 'sine.out', immediateRender: false }, 14.9 + k * 0.12)
        .to(s, { opacity: 0, y: function () { return -H() * 0.22; }, duration: 0.5, ease: 'sine.in' }, 15.4 + k * 0.12);
    });
    tl.to(otray, { y: function () { return H() * 1.35; }, scaleX: 1.7, scaleY: 1.7, duration: 0.75, ease: 'power2.in' }, 15.0)
      .set(otray, { opacity: 0 }, 15.76)
      .to([oven, door], { y: function () { return H() * 0.7; }, opacity: 0, duration: 0.6, ease: 'power2.in' }, 15.1)
      .to(glow, { opacity: 0, duration: 0.6 }, 15.3);

    /* 06 — the cup rises; baked balls rain in from above and pile up, one by one */
    panelIn(5, 15.2);
    tl.fromTo(cup, { opacity: 1, x: 0, y: function () { return H() * 0.75; }, rotation: 5 },
      { y: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.2)', immediateRender: false }, 15.8);
    var N = rain.length, R0 = 16.5, RS = 0.085;
    rain.forEach(function (el, k) {
      var land = R0 + k * RS + 0.42;
      var lvl = FILL_FROM - (FILL_FROM - FILL_TO) * (k + 1) / N;
      var side = ((k * 7) % 5 - 2) / 2;               // -1 … 1, scattered
      tl.fromTo(el,
        { opacity: 1, x: function () { return pt(cup, 0.5 + side * 0.22, 0, {}).x; }, y: function () { return -H() * 0.12; }, rotation: k * 50, scale: 0.9 },
        { y: function () { return pt(cup, 0.5, lvl / 100 + 0.01, {}).y; }, x: function () { return pt(cup, 0.5 + side * 0.28, 0, {}).x; }, rotation: k * 50 + 140, duration: 0.42, ease: 'power2.in', immediateRender: false }, R0 + k * RS)
        .to(el, { opacity: 0, duration: 0.05 }, land)
        .to(fill, { '--ct': lvl, duration: 0.14, ease: 'back.out(2.5)' }, land - 0.02);
      if (k % 4 === 3) impact(cup, land, 0.25);
    });

    /* 07 — the empty double-dip insert lowers into the rim, then milk & white chocolate pour in */
    panelIn(6, 18.2);
    tl.fromTo(ins, { opacity: 1, y: function () { return -H() * 0.35; }, rotation: -4 },
      { y: 0, rotation: 0, duration: 0.6, ease: 'power3.in', immediateRender: false }, 18.55);
    impact(cup, 19.15, 0.5);
    function pour(el, varName, t0) {
      tl.set(el, { transformOrigin: '50% 0%' }, t0)
        .fromTo(el, { opacity: 1, scaleY: 0 }, { scaleY: 1, duration: 0.2, ease: 'power2.in', immediateRender: false }, t0);
      var v = {}; v[varName] = INS_TOP;
      var f = {}; f[varName] = INS_BOT;
      tl.fromTo(varName === '--fl' ? insL : insR, f, Object.assign(v, { duration: 0.65, ease: 'power1.out', immediateRender: false }), t0 + 0.15);
      tl.set(el, { transformOrigin: '50% 100%' }, t0 + 0.8)
        .to(el, { scaleY: 0, duration: 0.18, ease: 'power2.in' }, t0 + 0.8)
        .set(el, { opacity: 0 }, t0 + 0.99);
    }
    pour(pourL, '--fl', 19.35);
    pour(pourR, '--fr', 19.75);

    /* 08 — the dome snaps on, then the logo stamps on with a pop */
    panelIn(7, 20.6);
    tl.fromTo(lid, { opacity: 1, y: function () { return -H() * 0.32; }, rotation: 8 },
      { y: 0, rotation: 0, duration: 0.6, ease: 'power3.in', immediateRender: false }, 21.0);
    impact(cup, 21.6, 0.8);
    tl.to(sticker, { opacity: 1, scale: 1, rotation: -6, duration: 0.45, ease: 'back.out(2.2)' }, 22.0)
      .fromTo(burst, { opacity: 1, scale: 0.5 }, { opacity: 0, scale: 1.25, duration: 0.55, ease: 'power2.out', immediateRender: false }, 22.25)
      .to(cup, { rotation: -3, duration: 0.18, ease: 'sine.out' }, 22.2)
      .to(cup, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' }, 22.38)
      .set({}, {}, STORY_LEN);

    updateStory(0, true);
    return tl;
  }

  // every stage image decoded up front, so nothing pops in (or fails to) mid-scroll
  function preloadStage() {
    Array.prototype.forEach.call(document.querySelectorAll('.stage img'), function (img) {
      img.loading = 'eager';
      if (img.decode) img.decode().catch(function () {});
    });
  }

  // rebuild from a clean initial state and jump straight to where we were: deterministic, unlike invalidate()
  function rebuildStory() {
    var gsap = window.gsap;
    var prog = storyTl.progress();
    storyTl.scrollTrigger && storyTl.scrollTrigger.kill();
    storyTl.kill();
    storyTl = buildStory(gsap);
    storyTl.progress(prog);
  }

  // positions are measured from the stage size, so rebuild only when that size really changes
  function watchStage() {
    var stage = document.querySelector('.stage');
    if (!stage || !window.ResizeObserver) return;
    var w = stage.offsetWidth, h = stage.offsetHeight, timer = 0;
    new ResizeObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (stage.offsetWidth === w && stage.offsetHeight === h) return;
        w = stage.offsetWidth; h = stage.offsetHeight;
        rebuildStory();
      }, 150);
    }).observe(stage);
  }

  /* ======================================================================
     GSAP: hero intro, reveals, parallax, edges
     ====================================================================== */
  function initMotion() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);

    // --- hero intro
    gsap.set('[data-hero]', { opacity: 1 });   // CSS hid them before first paint; the tweens below take over
    var heroWords = document.querySelectorAll('.hero-title .w > span');
    var intro = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.1 });
    intro.from('.hero-plate', { scale: 1.08, duration: 2.2, ease: 'expo.out' }, 0)
      .from('.hero-cup .cup-turn', { yPercent: 16, scale: 0.92, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0.15)
      .from('.hero-copy .pill', { y: 20, opacity: 0, duration: 0.8 }, 0.2);
    if (heroWords.length) intro.from(heroWords, { yPercent: 115, duration: 1, stagger: 0.08 }, 0.3);
    intro.from('.hero-script', { y: 20, opacity: 0, rotate: -8, duration: 0.9 }, 0.65)
      .from('.swoosh path', { strokeDasharray: 300, strokeDashoffset: 300, duration: 0.9, ease: 'power2.inOut' }, 0.9)
      .from('.hero-copy .lead, .hero-copy .btn-row', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.75)
      .from('.feat', { y: 30, opacity: 0, scale: 0.9, duration: 0.9, stagger: 0.1, ease: 'back.out(1.8)' }, 0.95)
      .to('.note', { opacity: 1, duration: 0.5 }, 1.3);
    document.querySelectorAll('.note .draw').forEach(function (p, k) {
      var len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      intro.to(p, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 1.4 + k * 0.15);
    });

    // --- hero scroll: the plate drifts slower than the cup (depth)
    gsap.to('.hero-plate', { yPercent: 6, scale: 1.04, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-cup', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // --- section titles: words rise on enter
    document.querySelectorAll('[data-split]').forEach(function (h) {
      if (h.closest('.hero') || h.closest('.panel')) return;
      var w = h.querySelectorAll('.w > span');
      if (w.length) {
        gsap.from(w, { yPercent: 115, duration: 1, stagger: 0.06, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
      } else {
        gsap.from(h, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
      }
    });

    // --- generic reveals
    gsap.set('[data-reveal]', { opacity: 0, y: 40 });
    ST.batch('[data-reveal]', {
      start: 'top 88%', once: true,
      onEnter: function (batch) { gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true }); }
    });

    // --- numbers roll like a slot machine when they come into view
    document.querySelectorAll('.num-val').forEach(function (el) {
      var target = String(el.getAttribute('data-count'));
      var pad = parseInt(el.getAttribute('data-pad') || '0', 10);
      while (target.length < pad) target = '0' + target;
      var suffix = el.getAttribute('data-suffix') || '';
      el.innerHTML = target.split('').map(function (d) {
        var col = '';
        for (var i = 0; i <= 10 + +d; i++) col += '<span>' + (i % 10) + '</span>';
        return '<span class="dg"><span>' + col + '</span></span>';
      }).join('') + suffix;
      el.setAttribute('aria-label', target + suffix);
      var cols = el.querySelectorAll('.dg > span');
      gsap.set(cols, { yPercent: 0 });
      cols.forEach(function (c, k) {
        var n = c.children.length - 1;
        gsap.to(c, { yPercent: -100 * n / (n + 1), duration: 1.6 + k * 0.25, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
    });

    // --- echo title: ghost copies trail behind and settle into the real one
    document.querySelectorAll('[data-echo]').forEach(function (h) {
      var label = h.querySelector('[data-i18n]');
      var ghosts = [];
      for (var g = 0; g < 3; g++) {
        var gh = document.createElement('span');
        gh.className = 'ghost'; gh.setAttribute('aria-hidden', 'true');
        gh.textContent = label.textContent;
        h.appendChild(gh); ghosts.push(gh);
      }
      var etl = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top 80%', once: true } });
      etl.from(label, { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' }, 0.25);
      ghosts.forEach(function (gh, g) {
        etl.fromTo(gh, { opacity: 0.9 - g * 0.25, y: -(g + 1) * 22, scale: 1 + (g + 1) * 0.03 },
          { opacity: 0, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, g * 0.08);
      });
    });

    // --- flavours: the balls drop in and bounce
    gsap.from('.flavour img', { y: -80, rotation: -40, scale: 0.6, duration: 1, stagger: 0.12, ease: 'bounce.out', scrollTrigger: { trigger: '.flavour-row', start: 'top 80%', once: true } });

    // --- sizes: the price tags pop on
    gsap.from('.tag', { scale: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(2.4)', scrollTrigger: { trigger: '.lineup', start: 'top 70%', once: true } });

    // --- dips: bowls float up
    gsap.utils.toArray('.dip picture').forEach(function (p) {
      gsap.from(p, { y: 70, rotation: -6, scale: 0.9, duration: 1.2, ease: 'back.out(1.6)', scrollTrigger: { trigger: p, start: 'top 85%', once: true } });
    });

    // --- the making story
    if (pin) { preloadStage(); storyTl = buildStory(gsap); watchStage(); }

    window.addEventListener('load', function () { ST.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
  }


  /* ======================================================================
     Boot
     ====================================================================== */
  var initial = 'fr';
  try { initial = new URLSearchParams(location.search).get('lang') || localStorage.getItem('cp-lang') || 'fr'; } catch (e) {}
  setLang(initial, { initial: true });

  if (animate) initMotion();
  else root.classList.remove('js-anim');

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  onScrollHeader();
})();
