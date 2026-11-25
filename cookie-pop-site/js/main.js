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

  /* Header items keep one width in every language, so nothing moves when the language changes:
     each link / the Order button is sized to its longest translation, text centred. */
  function lockHeaderWidths() {
    var FONTS = { ar: '"IBM Plex Sans Arabic", "Nunito", system-ui, sans-serif', other: '"Nunito", system-ui, sans-serif' };
    var probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap';
    document.body.appendChild(probe);
    document.querySelectorAll('.site-header [data-i18n]').forEach(function (n) {
      var box = n.closest('a, button') || n, cs = getComputedStyle(box), key = n.getAttribute('data-i18n'), w = 0;
      ['fr', 'en', 'ar'].forEach(function (l) {
        if (!I18N[l] || I18N[l][key] == null) return;
        probe.style.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + (l === 'ar' ? FONTS.ar : FONTS.other);
        probe.innerHTML = I18N[l][key];
        w = Math.max(w, probe.getBoundingClientRect().width);
      });
      var extra = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
      if (box.querySelector('svg')) extra += box.querySelector('svg').getBoundingClientRect().width + parseFloat(cs.columnGap || 0);
      box.style.minWidth = Math.ceil(w + extra + 2) + 'px';
      box.style.justifyContent = 'center';
    });
    probe.remove();
  }
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('800 15px "Nunito"'), document.fonts.load('800 15px "IBM Plex Sans Arabic"', 'عربي')
    ]).then(lockHeaderWidths, lockHeaderWidths);
  } else lockHeaderWidths();

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
    var bakeSteam = one('.bake-steam');                              // wisps over the baking cookies
    var tb = q('.rig-tray .tb');                                    // the 24 dough balls on the flat tray
    var tbs = q('.rig-tray .tbs'), mound = one('.rig-tray .mound'), moundSh = one('.rig-tray .mound-sh');   // ball shadows, the dough mound
    var ins = one('.ins'), insL = one('.ins-l'), insR = one('.ins-r');
    var pourL = one('.pour-l'), pourR = one('.pour-r'), lid = one('.lid');
    var sticker = one('.sticker'), burst = one('.burst'), glow = one('.glow'), steam = q('.steam');
    var grains = q('.grains i'), flour = q('.flour'), whisk = one('.whisk'), chips = q('.chips img'), rain = q('.balls img');
    var ovens = [oven, otray, door];
    var copyOf = function (p) { return p.querySelector('.panel-copy'); };
    var wordsOf = function (p) { return p.querySelectorAll('.panel-title .w > span'); };

    // geometry measured from the keyframes (tools/extract_parts.py → parts.json)
    var FLAP_TOP = 0.7627, DOOR_HINGE = 0.8008, WIN_C = [0.4987, 0.3962], OTRAY_C = 0.5169, OTRAY_W = 0.6399;
    var INS_TOP = 14.1, INS_BOT = 40.2;

    function box(el) { return { l: el.offsetLeft, t: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }; }
    function pt(el, fx, fy, pose) {
      var b = box(el), s = pose.s == null ? 1 : pose.s, sy = pose.sy == null ? s : pose.sy;
      return { x: b.l + b.w / 2 + (fx * b.w - b.w / 2) * s + (pose.x || 0), y: b.t + b.h / 2 + (fy * b.h - b.h / 2) * sy + (pose.y || 0) };
    }
    var TRAY_SHAPE = function () { return { x: 0, y: H() * 0.2, s: 0.9 }; };
    var BOWL_POUR = function () { return { x: -W() * 0.04, y: -H() * 0.27, s: 0.58 }; };
    // the tray on the rack, at the front of the oven, matched in width and centre to the flat tray
    var OT_FRONT = function () {
      var s = 0.93 * box(tray).w * 0.9 / (OTRAY_W * box(oven).w);   // the pan is 93% of the flat tray picture's width
      var ty = pt(tray, 0.5, 0.474, TRAY_SHAPE()).y, oy = pt(oven, 0.5, OTRAY_C, {}).y;
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
    gsap.set([bf[3], bf[4]], { '--b0': -16, '--b1': -16, '--b2': -16, '--b3': -16, '--b4': -16, '--b5': -16, '--b6': -16, '--bf': 0 });
    gsap.set(butter, { opacity: 0, y: 0, rotation: 0 });
    gsap.set([ovenBody[1], ovenBody[2], ovenLight, ot[1]], { opacity: 0 });
    gsap.set(bakeSteam, { opacity: 0 });
    gsap.set(otray, { transformOrigin: '50% ' + OTRAY_C * 100 + '%' });
    gsap.set(flap, { scaleY: 1, transformOrigin: '50% ' + FLAP_TOP * 100 + '%' });
    gsap.set(doorImg, { rotationX: -90, opacity: 0, transformPerspective: 2600, transformOrigin: '50% ' + DOOR_HINGE * 100 + '%' });
    gsap.set(tb, { opacity: 0, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 });
    // each ball spins round its own centre, and its shadow sits flat under it (the ball images are not centred in their boxes)
    var core = tb.map(function (el) {
      var c = (el.getAttribute('data-core') || '0.5,0.5,0.9,0.7').split(',').map(Number), b = box(el);
      return { x: b.l + c[0] * b.w, y: b.t + c[1] * b.h, foot: b.t + c[2] * b.h, d: c[3] * b.w, ox: c[0], oy: c[1] };
    });
    tb.forEach(function (el, k) {
      var c = core[k], sw = c.d * 1.05, sh = sw * 0.3;
      gsap.set(el, { transformOrigin: (c.ox * 100) + '% ' + (c.oy * 100) + '%' });
      el.classList.toggle('is-back', k < 12);
      Object.assign(tbs[k].style, { left: (c.x - sw / 2) + 'px', top: (c.foot - sh * 0.55) + 'px', width: sw + 'px', height: sh + 'px' });
    });
    gsap.set(tbs, { opacity: 0, x: 0, y: 0, scale: 1 });
    gsap.set([mound, moundSh], { opacity: 0, x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, rotation: 0, transformOrigin: '50% 94%' });
    gsap.set(ins, { opacity: 0, y: 0, rotation: 0 });
    gsap.set([pourL, pourR], { opacity: 0 });
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
    // the new batter shows up in the whisk's wake: each blob opens as the whisk head passes it, then all grow and merge
    function mixIn(el, t0, sweep, turns) {
      var n = 7, lap = sweep / turns;
      for (var k = 0; k < n; k++) {
        var at = t0 + lap * (k / n);
        tl.to(el, { ['--b' + k]: 14, duration: lap * 0.6, ease: 'sine.out' }, at)
          .to(el, { ['--b' + k]: 75, duration: sweep - lap * (k / n), ease: 'sine.inOut' }, at + lap * 0.6);
      }
      tl.to(el, { '--bf': 1, duration: sweep * 0.5, ease: 'sine.in' }, t0 + sweep * 0.6);
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
    mixIn(bf[3], 3.1, 1.1, 2);
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
    mixIn(bf[4], 5.8, 0.8, 2);
    wobble(bowl, 5.8, 2.6, 4, 0.18);

    /* 04 — the bowl tips the whole dough out onto the tray; the balls are rolled off the mound one by one,
          each rolling to its place, and the mound shrinks as it goes */
    panelIn(3, 6.8);
    var TS = 0.9;                                                     // the tray's scale (TRAY_SHAPE)
    var MOUND = function () {                                         // the mound's base centre, on stage
      var m = box(mound), t = box(tray);
      return pt(tray, (m.l + m.w / 2) / t.w, (m.t + m.h * 0.94) / t.h, TRAY_SHAPE());
    };
    var DROP = function () { return H() * 0.36; };                    // how far the dough falls
    var TIP_A = 115;                                                  // how far the bowl tips (deg)
    var TIP_S = 0.44;                                                 // bowl scale here: its dough then matches the mound's size
    var TIP = function () {                                           // bowl pose that puts its mouth right above the mound
      var b = box(bowl), s = TIP_S, m = MOUND(), r = TIP_A * Math.PI / 180;
      var mouth = { x: m.x, y: m.y - DROP() };
      // the rim's centre is half a bowl-height above the bowl's centre; tipped, it swings out right and down
      var cx = mouth.x - Math.sin(r) * b.h / 2 * s, cy = mouth.y + Math.cos(r) * b.h / 2 * s;
      return { x: cx - (b.l + b.w / 2), y: cy - (b.t + b.h / 2) };
    };
    // where the dough sits inside the tipped bowl (its centre is at 46% / 27% of the bowl picture), as a move of the mound
    var DOUGH_OUT = function () {
      var b = box(bowl), p = TIP(), r = TIP_A * Math.PI / 180;
      var ox = (0.465 - 0.5) * b.w * TIP_S, oy = (0.27 - 0.5) * b.h * TIP_S;
      var c = { x: b.l + b.w / 2 + p.x + ox * Math.cos(r) - oy * Math.sin(r), y: b.t + b.h / 2 + p.y + ox * Math.sin(r) + oy * Math.cos(r) };
      var m = box(mound), base = MOUND(), mc = { x: base.x, y: base.y - m.h * 0.44 * TS };   // the mound's centre on stage
      return { x: (c.x - mc.x) / TS, y: (c.y - mc.y) / TS, s: (0.785 * b.w * TIP_S) / (m.w * TS) };
    };
    tl.to(bowl, { x: function () { return TIP().x; }, y: function () { return TIP().y; }, scaleX: TIP_S, scaleY: TIP_S, duration: 0.8, ease: 'power3.inOut' }, 6.95)
      .set(bowl, { zIndex: 1 }, 6.95)                                 // the bowl hangs above the back of the tray: behind it
      .to(bowl, { rotation: TIP_A, duration: 0.45, ease: 'power2.in' }, 7.45);
    tl.fromTo(tray, { opacity: 1, x: 0, y: function () { return H() * 0.8; }, scaleX: TS, scaleY: TS },
      { y: function () { return TRAY_SHAPE().y; }, duration: 0.85, ease: 'power3.out', immediateRender: false }, 7.05);
    // the dough slides out of the tipped bowl and lands as one mound, with a squash; the bowl is left empty
    tl.set(bf.slice(1), { opacity: 0 }, 7.86)
      .fromTo(mound, { opacity: 1, x: function () { return DOUGH_OUT().x; }, y: function () { return DOUGH_OUT().y; },
          scaleX: function () { return DOUGH_OUT().s; }, scaleY: function () { return DOUGH_OUT().s; }, rotation: TIP_A * 0.55 },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 0.34, ease: 'power2.in', immediateRender: false }, 7.86)
      .to(mound, { scaleY: 0.8, scaleX: 1.12, duration: 0.08, ease: 'power2.out' }, 8.18)
      .to(mound, { scaleY: 1, scaleX: 1, duration: 0.55, ease: 'elastic.out(1.1, 0.4)' }, 8.26)
      .fromTo(moundSh, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.32, ease: 'power2.in', immediateRender: false }, 7.86);
    impact(tray, 8.18, 0.6);
    tl.to(bowl, { y: function () { return -H() * 0.85; }, rotation: TIP_A + 25, opacity: 0, duration: 0.6, ease: 'power3.in' }, 8.2);
    // the balls, nearest the mound first: each pops off the mound's edge and rolls to its place
    var mc = function () { var m = box(mound); return { x: m.l + m.w / 2, y: m.t + m.h * 0.66, r: m.w * 0.2 }; };
    var order = tb.map(function (el, k) { return k; });
    (function () {
      var m = mc();
      order.sort(function (a, b) { return Math.hypot(core[a].x - m.x, core[a].y - m.y) - Math.hypot(core[b].x - m.x, core[b].y - m.y); });
    })();
    order.forEach(function (k, n) {
      var el = tb[k], at = 8.45 + n * 0.048;
      var from = function () {                                          // the start point on the mound's edge, toward the ball's place
        var m = mc(), c = core[k], dx = c.x - m.x, dy = c.y - m.y, len = Math.hypot(dx, dy) || 1;
        var r = m.r * Math.cbrt(1 - n / order.length), my = m.y + (1 - Math.cbrt(1 - n / order.length)) * m.r;   // the mound is smaller by now
        return { x: m.x + dx / len * r - c.x, y: my + dy / len * r * 0.5 - c.y, dist: len };
      };
      // whole turns only, so every ball settles upright with its light from the top, as photographed
      var roll = function () { var f = from(); return (f.x < 0 ? 1 : -1) * Math.max(1, Math.round(Math.hypot(f.x, f.y) / (Math.PI * core[k].d))) * 360; };
      var d = 0.45 + Math.min(0.35, from().dist / box(tray).w * 0.6);
      tl.fromTo(el, { opacity: 0, x: function () { return from().x; }, y: function () { return from().y; }, scaleX: 0.5, scaleY: 0.5, rotation: 0 },
        { opacity: 1, duration: 0.06, immediateRender: false }, at)
        .to(el, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: function () { return roll(); }, duration: d, ease: 'power2.out' }, at)
        .fromTo(tbs[k], { opacity: 0, x: function () { return from().x; }, y: function () { return from().y; }, scale: 0.5 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: d, ease: 'power2.out', immediateRender: false }, at);
      // the mound loses the volume of one ball (its height ~ cube root of what is left)
      var left = 1 - (n + 1) / order.length, s = Math.max(0, Math.cbrt(left));
      tl.to(mound, { scaleX: s * 1.02, scaleY: s, duration: 0.14, ease: 'power2.out' }, at)
        .to(moundSh, { scale: Math.max(0.2, s), opacity: left > 0 ? 1 : 0, duration: 0.14, ease: 'power2.out' }, at);
    });
    tl.set(mound, { opacity: 0 }, 8.45 + order.length * 0.048 + 0.1);

    /* 05 — the oven rises; the tray slides onto the rack, the door shuts, we lean in to watch them bake */
    panelIn(4, 9.6);
    tl.set(cam, { transformOrigin: CAM_ORIGIN }, 9.6);
    tl.fromTo([oven, door], { opacity: 0, y: function () { return H() * 0.55; } }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', immediateRender: false }, 9.75);
    // hand-over: the flat tray tilts back into the oven's perspective
    tl.fromTo(otray, { opacity: 0, x: 0, y: function () { return OT_FRONT().y; }, scaleX: function () { return OT_FRONT().s; }, scaleY: function () { return OT_FRONT().s * 1.65; } },
      { opacity: 1, scaleY: function () { return OT_FRONT().s; }, duration: 0.35, ease: 'power2.inOut', immediateRender: false }, 10.55)
      .to(tray, { opacity: 0, scaleY: 0.9 * 0.605, duration: 0.35, ease: 'power2.inOut' }, 10.55);
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
      .to(bakeSteam, { opacity: 1, duration: 0.6, ease: 'sine.out' }, 12.75)              // steam starts rising off them
      .to(bakeSteam, { opacity: 0, duration: 0.35, ease: 'sine.in' }, 14.3)
      .to(ovenLight, { opacity: 0.55, duration: 0.3, ease: 'sine.inOut' }, 13.1)
      .to(ovenLight, { opacity: 0.95, duration: 0.3, ease: 'sine.inOut' }, 13.4)
      .to(ovenLight, { opacity: 0, duration: 0.3 }, 13.95)
      .to(cam, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power2.inOut' }, 13.95);
    tl.to(doorImg, { rotationX: -90, duration: 0.34, ease: 'power2.out' }, 14.6)
      .set(doorImg, { opacity: 0 }, 14.94)
      .to(flap, { scaleY: 1, duration: 0.22, ease: 'power2.out' }, 14.85)
      .to(ovenBody[2], { opacity: 0.55, duration: 0.3 }, 14.75);                           // lit, a little steamy: enough glow, not a fog
    steam.forEach(function (s, k) {
      // a light puff when the door opens, which clears quickly
      tl.fromTo(s, { opacity: 0, y: 0, scale: 0.6 }, { opacity: 0.45, y: function () { return -H() * 0.08; }, scale: 0.9, duration: 0.4, ease: 'sine.out', immediateRender: false }, 14.9 + k * 0.1)
        .to(s, { opacity: 0, y: function () { return -H() * 0.18; }, scale: 1, duration: 0.4, ease: 'sine.in' }, 15.3 + k * 0.1);
    });
    tl.to(otray, { y: function () { return H() * 1.35; }, scaleX: 1.7, scaleY: 1.7, duration: 0.75, ease: 'power2.in' }, 15.0)
      .set(otray, { opacity: 0 }, 15.76)
      .to([oven, door], { y: function () { return H() * 0.7; }, opacity: 0, duration: 0.6, ease: 'power2.in' }, 15.1)
      .to(glow, { opacity: 0, duration: 0.6 }, 15.3);

    /* 06 — the cup rises; baked balls rain in from above and pile up, one by one */
    panelIn(5, 15.2);
    tl.fromTo(cup, { opacity: 1, x: 0, y: function () { return H() * 0.75; }, rotation: 5 },
      { y: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.2)', immediateRender: false }, 15.8);
    // the pile is built from the falling balls themselves, row by row from the bottom; in each row a darker,
    // slightly smaller back layer goes in first, then the front. Positions are fractions of the cup picture.
    // Measured from it: the glass's outer edge runs from 9.6% in (22% down) to 24.4% in (89% down).
    var WALL = function (fy) { return 0.096 + 0.222 * (fy - 0.222) + 0.03; };
    var ASPECT = 900 / 459;                                                       // cup picture height / width
    // a little settling simulation (run once): each ball is dropped at a random spot across the mouth, falls until it
    // meets the bottom, the glass or another ball, then rolls off to the side while that takes it lower. Two layers:
    // the front, and a darker back layer showing in the gaps. Units: cup widths (x 0…1), y = fraction × ASPECT.
    var PILE = [];
    (function () {
      var seed = 7;
      var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      var FLOOR = 0.925 * ASPECT, TOPY = 0.37 * ASPECT;
      var half = function (y) { return 0.5 - WALL(y / ASPECT); };               // inner half-width at that height
      var layers = { front: [], back: [] };
      function landY(list, r, x) {                                               // where a ball dropped at x comes to rest
        var y = FLOOR - r, on = null;
        list.forEach(function (p) {
          var dx = x - p.x, rr = r + p.r;
          if (Math.abs(dx) < rr) { var yc = p.y - Math.sqrt(rr * rr - dx * dx); if (yc < y) { y = yc; on = p; } }
        });
        return { y: y, on: on };
      }
      function inside(r, x, y) { var h = half(y) - r; return x >= 0.5 - h && x <= 0.5 + h; }
      function settle(list, r, x) {
        var l = landY(list, r, x);
        for (var i = 0; i < 12 && !inside(r, x, l.y); i++) {                        // nudge it off the glass, the walls lean in
          x += (x < 0.5 ? 1 : -1) * r * 0.25; l = landY(list, r, x);
        }
        if (!inside(r, x, l.y)) return null;
        for (var pass = 0; pass < 80 && l.on; pass++) {                             // on a ball: roll off its side while that goes lower
          var dir = x === l.on.x ? (rnd() < 0.5 ? -1 : 1) : Math.sign(x - l.on.x);
          var nx = x + dir * r * 0.2, nl = landY(list, r, nx);
          if (nl.y <= l.y + 0.001 || !inside(r, nx, nl.y)) break;                  // wedged: it stays
          x = nx; l = nl;
        }
        return { x: x, y: l.y };
      }
      var guard = 0, front = layers.front;
      while (guard++ < 500) {                                                    // the front layer: dropped and settled
        var r = 0.1 * (0.94 + rnd() * 0.12), top = half(TOPY) - r, spot = null;
        for (var t = 0; t < 16; t++) { var sp = settle(front, r, 0.5 + (rnd() * 2 - 1) * top); if (sp && (!spot || sp.y > spot.y)) spot = sp; }
        if (!spot || spot.y - r < TOPY - r * 0.6) continue;
        front.push({ x: spot.x, y: spot.y, r: r });
        PILE.push({ x: spot.x, y: spot.y / ASPECT, d: 2 * r, back: false });
      }
      // the back layer: a ball in every gap of the front one, so the pile reads as full (and in shade, further back)
      var back = layers.back, topF = Math.min.apply(null, front.map(function (p) { return p.y - p.r; }));
      for (var gy = FLOOR - 0.07; gy > topF + 0.04; gy -= 0.02) {
        var gh = half(gy) - 0.08;                                                     // keep it inside the glass
        for (var gx = 0.5 - gh; gx <= 0.5 + gh; gx += 0.02) {
          var x = gx + (rnd() - 0.5) * 0.01, y = gy + (rnd() - 0.5) * 0.01;
          var gap = Math.min.apply(null, front.map(function (p) { return Math.hypot(x - p.x, y - p.y) - p.r; }));
          var near = back.some(function (p) { return Math.hypot(x - p.x, y - p.y) < 0.075; });
          if (gap > -0.01 && !near) {
            var rb = 0.088 * (0.94 + rnd() * 0.12);
            back.push({ x: x, y: y, r: rb });
            PILE.push({ x: x, y: y / ASPECT, d: 2 * rb, back: true });
          }
        }
      }
      PILE.sort(function (a, b) { return b.y - a.y || (a.back ? -1 : 1); });   // they go in lowest first, back before front
    })();
    var R0 = 16.4, SPAN = 1.95, RS = SPAN / PILE.length;
    rain.forEach(function (el, k) {
      var c = PILE[k];
      if (!c) { el.style.display = 'none'; return; }
      el.classList.toggle('is-back', c.back);
      el.style.zIndex = (c.back ? 0 : 100) + k;                                   // back layer always behind the front; later balls on top
      var L = function (fx, fy) { var b = box(cup); return { x: fx * b.w, y: fy * b.h }; };   // inside the cup's own box
      var size = function () { return box(cup).w * c.d; };
      var fall = 0.36 + c.y * 0.16;                                                // further to fall to the bottom
      var t0 = R0 + k * RS, land = t0 + fall;
      var spin = (c.x < 0.5 ? -1 : 1) * (180 + (k * 37) % 140), rest = (k * 53) % 360;
      tl.set(el, { width: size }, t0)
        .fromTo(el,
          { opacity: 1, x: function () { return L(0.5 + (c.x - 0.5) * 0.55, 0).x; }, y: function () { return -box(cup).h * 0.35; }, rotation: rest - spin },
          { x: function () { return L(c.x, c.y).x; }, y: function () { return L(c.x, c.y).y; }, rotation: rest, duration: fall, ease: 'power2.in', immediateRender: false }, t0)
        // a small bounce where it lands, then it stays: it is the pile
        .to(el, { y: function () { return L(c.x, c.y).y - size() * 0.12; }, duration: 0.08, ease: 'power2.out' }, land)
        .to(el, { y: function () { return L(c.x, c.y).y; }, duration: 0.1, ease: 'power2.in' }, land + 0.08);
      if (k % 8 === 7) impact(cup, land, 0.22);
    });

    /* 07 — the empty double-dip insert lowers into the rim, then milk & white chocolate pour in */
    panelIn(6, 18.2);
    tl.fromTo(ins, { opacity: 1, y: function () { return -H() * 0.35; }, rotation: -4 },
      { y: 0, rotation: 0, duration: 0.6, ease: 'power3.in', immediateRender: false }, 18.55);
    impact(cup, 19.15, 0.5);
    // melted chocolate: a wobbling stream that thins as it falls and swells where it lands, ripples on the surface,
    // the photographed sauce uncovered as the level rises with a wavy, curved (seen-from-above) edge, then the tail
    // falls in and the surface settles. In % of the cup picture (the SVG and the sauce picture share its box).
    // Measured from the sauce picture: its liquid runs from 33% (bottom) up to 14% (rim); the surfaces' centres are
    // at about 29% / 69% across, 20% down.
    var SAUCE_BOT = 33.5, SAUCE_TOP = INS_TOP, SURF_C = 19.8;
    function pour(g, img, x0, x1, C, t0) {
      var cx = C.cx, hw = C.hw, sx = C.sx;
      var st = { lvl: SAUCE_BOT, head: -45, tail: -45, contact: 0, mound: 0, amp: 0, ph: 0, rip: 0, on: 0 };
      var stream = g.querySelector('.stream'), gloss = g.querySelector('.gloss'), rips = g.querySelectorAll('.rip');
      function surfY(x) {
        var u = Math.max(-1, Math.min(1, (x - cx) / hw)), rising = Math.min(1, (SAUCE_BOT - st.lvl) / 3);
        return st.lvl + 1.8 * (1 - u * u) * rising * (st.lvl > SAUCE_TOP + 0.3 ? 1 : 0)
          + st.amp * Math.sin(x * 0.5 + st.ph) * rising
          - st.mound * 2.4 * Math.exp(-Math.pow((x - sx) / 4.5, 2));
      }
      // where the stream meets the sauce: on the rising level, easing into the middle of the surface once it is full
      function landY() {
        var full = Math.max(0, Math.min(1, (SAUCE_BOT - st.lvl) / (SAUCE_BOT - SAUCE_TOP)));
        return surfY(sx) + (SURF_C - SAUCE_TOP) * full * full;
      }
      function ribbon(w0, w1, off) {
        var bottom = Math.min(st.head, landY()), top = Math.min(st.tail, bottom), L = [], R = [], n = 16;
        if (bottom - top < 0.2) return '';
        for (var i = 0; i <= n; i++) {
          var y = top + (bottom - top) * i / n, t = (y + 45) / (bottom + 45 || 1);
          var w = w0 + (w1 - w0) * t + st.contact * 1.6 * Math.exp(-Math.pow((bottom - y) / 2.2, 2));
          var x = sx + off + 0.7 * Math.sin(y * 0.22 + st.ph * 1.4) * t;
          L.push((x - w / 2).toFixed(2) + ',' + y.toFixed(2)); R.unshift((x + w / 2).toFixed(2) + ',' + y.toFixed(2));
        }
        return 'M' + L.join(' L') + ' L' + R.join(' L') + 'Z';
      }
      function render() {
        var pts = [];
        for (var i = 0; i <= 30; i++) { var x = x0 + (x1 - x0) * i / 30; pts.push(x.toFixed(2) + '% ' + surfY(x).toFixed(2) + '%'); }
        // nothing of the sauce picture shows until the stream reaches it (before that the insert may not even be there)
        img.style.clipPath = st.on <= 0 && st.lvl >= SAUCE_BOT - 0.01 ? 'inset(100% 0 0 0)'
          : 'polygon(' + pts.join(',') + ',' + x1 + '% 100%,' + x0 + '% 100%)';
        stream.setAttribute('d', ribbon(3.4, 2.3, 0));
        gloss.setAttribute('d', ribbon(0.7, 0.45, -0.55));
        var sy = landY();
        [0, 0.5].forEach(function (o, k) {
          var f = (st.rip + o) % 1, rx = 1.5 + 9 * f;
          rips[k].setAttribute('cx', sx); rips[k].setAttribute('cy', sy + 0.4);
          rips[k].setAttribute('rx', rx); rips[k].setAttribute('ry', rx * 0.22);
          rips[k].style.opacity = (1 - f) * st.on * 0.8;
        });
      }
      tl.set(g, { opacity: 1 }, t0)
        .fromTo(st, { head: -45, tail: -45 }, { head: 60, duration: 0.24, ease: 'power2.in', immediateRender: false, onUpdate: render }, t0)
        .fromTo(st, { contact: 0, mound: 0, amp: 0, on: 0 }, { contact: 1, mound: 1, amp: 0.7, on: 1, duration: 0.14, ease: 'power2.out', immediateRender: false, onUpdate: render }, t0 + 0.2)
        .fromTo(st, { lvl: SAUCE_BOT }, { lvl: SAUCE_TOP, duration: 0.66, ease: 'power1.out', immediateRender: false, onUpdate: render }, t0 + 0.2)
        .fromTo(st, { ph: 0, rip: 0 }, { ph: 16, rip: 4, duration: 1.6, ease: 'none', immediateRender: false, onUpdate: render }, t0)
        .to(st, { tail: 60, duration: 0.24, ease: 'power2.in', onUpdate: render }, t0 + 0.82)
        .to(st, { contact: 0, on: 0, duration: 0.35, ease: 'power1.in', onUpdate: render }, t0 + 0.98)
        .to(st, { mound: 0, amp: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)', onUpdate: render }, t0 + 0.98)
        .set(g, { opacity: 0 }, t0 + 1.7);
      render();
    }
    pour(pourL, insL, 0, 48.4, { cx: 29.5, hw: 17, sx: 29.5 }, 19.35);
    pour(pourR, insR, 51.6, 100, { cx: 69.5, hw: 17, sx: 69.5 }, 19.75);

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
     Hero "Pop!" — every ingredient is a real object. The cup slams onto the
     floor and a shockwave runs out from it: the pieces round the landing
     spot splash up and keep floating; the cookies, chips, crumbs and the dip
     bowl further out jump (the closer, the higher) and settle again.
     Air spots: fractions of the scene. Ground starts: cup-heights from the
     cup's centre / top. Floor objects: pixels of the 1376×768 poster photo,
     so they sit where they were photographed.
     ====================================================================== */
  function heroPop(gsap, ST, intro, landAt) {
    var scene = document.querySelector('.hero-scene');
    var cup = scene && scene.querySelector('.hero-cup');
    var back = scene && scene.querySelector('.pop-back');
    var front = scene && scene.querySelector('.pop-front');
    var ground = scene && scene.querySelector('.pop-floor');      // under the text's wash, like the photo was
    if (!cup || !back || !front || !ground) return;
    var cupTurn = cup.querySelector('.cup-turn');
    var plate = scene.querySelector('.hero-plate');
    var SRC = 'assets/transparent/seq/';
    var fine = window.matchMedia('(pointer: fine)').matches;
    var rnd = function (a, b) { return a + Math.random() * (b - a); };
    var IMG_W = 1376, IMG_H = 768;

    var SPOTS = [
      // air: fx, fy, size (× scene height), layer, blur, sprite, mobile, ground: gx, gy
      [0.25, 0.11, 0.050, 'b', 1,   'p-golden-2', 0,  -0.30, 0.92],
      [0.07, 0.30, 0.062, 'b', 1.5, 'p-golden-4', 1,  -0.42, 0.93],
      [0.03, 0.58, 0.052, 'b', 2,   'p-cacao-4',  0,  -0.46, 0.91],
      [0.40, 0.11, 0.030, 'b', 0.5, 'p-chip-2',   0,  -0.18, 0.94],
      [0.80, 0.44, 0.070, 'b', 0,   'p-cacao-1',  1,   0.26, 0.92],
      [0.88, 0.15, 0.036, 'b', 0,   'p-chip-4',   1,   0.36, 0.91],
      [0.975,0.38, 0.062, 'b', 0.5, 'p-golden-3', 1,   0.44, 0.92],
      [0.535,0.30, 0.032, 'b', 0,   'p-chip-1',   0,  -0.10, 0.93],
      [0.93, 0.62, 0.110, 'f', 0,   'p-golden-1', 1,   0.30, 1.04],
      [0.50, 0.85, 0.070, 'f', 2,   'p-cacao-2',  0,  -0.30, 1.05],
      [0.515,0.10, 0.056, 'f', 0,   'p-golden-3', 1,  -0.08, 1.06],
      [0.63, 0.12, 0.034, 'f', 0,   'p-chip-1',   1,   0.10, 1.07],
      [0.86, 0.80, 0.040, 'f', 0,   'p-chip-3',   1,   0.20, 1.06],
      [0.985,0.12, 0.050, 'f', 1,   'p-cacao-3',  0,   0.42, 1.03],
      [0.505,0.55, 0.048, 'f', 0,   'p-golden-4', 0,  -0.22, 1.04],
      [0.78, 0.90, 0.034, 'f', 0,   'p-chip-2',   1,   0.04, 1.07]
    ];
    // on the floor, as photographed: x, y (ground contact), diameter, sprite
    var FLOOR = [
      [340, 610, 76, 'p-golden-3'], [340, 733, 90, 'p-golden-1'], [125, 690, 58, 'p-golden-4'],
      [1298, 738, 96, 'p-golden-2'], [180, 700, 28, 'p-golden-3'], [1182, 706, 30, 'p-golden-4'],
      [45, 602, 24, 'p-chip-1'], [18, 622, 22, 'p-chip-2'], [70, 663, 24, 'p-chip-3'], [340, 637, 22, 'p-chip-4'],
      [390, 633, 22, 'p-chip-1'], [78, 727, 26, 'p-chip-2'], [262, 739, 26, 'p-chip-3'], [398, 746, 24, 'p-chip-4'],
      [460, 703, 22, 'p-chip-1'], [706, 723, 26, 'p-chip-2'], [1167, 580, 22, 'p-chip-3'], [1224, 620, 24, 'p-chip-4'],
      [1347, 630, 24, 'p-chip-1'], [1061, 739, 26, 'p-chip-2']
    ];
    var CRUMBS = [
      [1213,725,17],[573,710,16],[378,574,14],[204,720,15],[1272,594,13],[231,692,12],[1143,692,12],[19,641,11],
      [63,621,10],[1199,748,9],[1234,654,9],[48,666,9],[701,726,9],[144,691,8],[192,739,8],[217,708,8],[663,683,7],
      [1138,718,7],[40,634,7],[601,695,7],[8,664,7],[1207,716,7],[160,718,6],[140,714,6],[289,720,6],[436,689,5],
      [1354,683,5],[1116,714,5],[1170,714,5],[520,730,6],[820,742,7],[960,736,6],[1010,712,5]
    ];
    var BOWL = { x: 59, y: 503, w: 243, h: 195, contact: 651 };   // dip-bowl.webp, in photo pixels
    var BADGE = [-0.5, 0.22, 0.19];

    var mk = function (tag, cls, parent) { var e = document.createElement(tag); e.className = cls; parent.appendChild(e); return e; };

    // --- floating pieces (start on the ground round the landing spot)
    var balls = SPOTS.map(function (s) {
      var layer = s[3] === 'f' ? front : back;
      var sh = mk('span', 'pb-sh', layer);
      var el = mk('div', 'pb', layer);
      // .pb: flight · .pb-r: dodges the cursor · .pb-k: knocked by a click · img: floats
      el.innerHTML = '<div class="pb-r"><div class="pb-k"><img src="' + SRC + s[5] + '.webp" alt="" decoding="async" draggable="false"></div></div>';
      var img = el.querySelector('img');
      if (s[4]) img.style.filter = 'blur(' + s[4] + 'px) drop-shadow(0 12px 10px rgba(110, 52, 20, .28))';
      el.style.setProperty('--d', s[3] === 'f' ? 1.3 : 0.55);
      return { el: el, sh: sh, r: el.firstChild, k: el.firstChild.firstChild, img: img, s: s, hx: 0, hy: 0, gx: 0, gy: 0, sz: 0, on: true,
               qx: gsap.quickTo(el.firstChild, 'x', { duration: 0.7, ease: 'power3' }),
               qy: gsap.quickTo(el.firstChild, 'y', { duration: 0.7, ease: 'power3' }) };
    });

    // --- the floor: cookies, chips, crumbs and the dip bowl, where the photo had them
    var floorShadow = mk('span', 'cup-shadow', ground);
    var bowl = { sh: mk('span', 'pb-sh', ground), el: mk('div', 'pop-bowl', ground) };
    bowl.el.innerHTML = '<img src="assets/transparent/hero/dip-bowl.webp" alt="" decoding="async" draggable="false">';
    bowl.img = bowl.el.firstChild;
    var drops = [0, 1, 2, 3, 4, 5, 6].map(function () { return mk('span', 'pop-drop', ground); });
    var floor = FLOOR.map(function (f) {
      var sh = mk('span', 'pb-sh', ground);
      var el = mk('div', 'pb pb-floor', ground);
      el.innerHTML = '<div class="pb-k"><img src="' + SRC + f[3] + '.webp" alt="" decoding="async" draggable="false"></div>';
      gsap.set(el.firstChild, { rotation: rnd(-40, 40) });
      return { el: el, sh: sh, k: el.firstChild, f: f, x: 0, y: 0, sz: 0, off: 0 };
    });
    var crumbs = CRUMBS.map(function (c, i) {
      var el = mk('span', 'pop-crumb' + (i % 3 === 0 ? ' is-dark' : ''), ground);
      gsap.set(el, { rotation: rnd(0, 90) });
      return { el: el, c: c, x: 0, y: 0, sz: 0, off: 0 };
    });

    var badge = mk('div', 'pb pop-badge', front);
    badge.style.setProperty('--d', 0.9);
    badge.innerHTML = '<svg viewBox="0 0 200 200"><defs><path id="pop-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs>' +
      '<circle class="bg" cx="100" cy="100" r="99"/><circle class="ring" cx="100" cy="100" r="56"/>' +
      '<text><textPath href="#pop-ring"></textPath></text></svg>' +
      '<img src="' + SRC + 'p-golden-2.webp" alt="" decoding="async" draggable="false">';
    var badgeRing = badge.querySelector('svg'), badgeCookie = badge.querySelector('img'), badgePath = badge.querySelector('textPath');
    // the slogan round the badge: Latin letters spaced to fill the ring; Arabic keeps its natural spacing so the letters stay joined
    function badgeText() {
      var ar = root.lang === 'ar';
      badgePath.textContent = ar ? 'غمّس • اقضم • كرّر • غمّس • اقضم • كرّر • ' : 'DIP • BITE • REPEAT • DIP • BITE • REPEAT • ';
      // right-to-left text runs back from where it starts, so start it at the end of the circle
      var text = badgePath.parentNode;
      text.style.wordSpacing = '';
      if (ar) {
        badgePath.removeAttribute('textLength'); badgePath.removeAttribute('lengthAdjust'); badgePath.setAttribute('startOffset', '100%');
        // share the room left on the circle equally between the word gaps, so the words sit evenly round the ring
        text.style.wordSpacing = '0px';
        var ring = badge.querySelector('#pop-ring').getTotalLength(), used = text.getComputedTextLength();
        var gaps = (badgePath.textContent.match(/ /g) || []).length;
        if (used > 0 && gaps) text.style.wordSpacing = Math.max(0, (ring - used) / gaps).toFixed(2) + 'px';
      } else { badgePath.setAttribute('textLength', '462'); badgePath.setAttribute('lengthAdjust', 'spacing'); badgePath.removeAttribute('startOffset'); }
    }
    badgeText();
    // re-measure once the Arabic font has arrived (it only downloads when Arabic text is on the page)
    if (document.fonts && document.fonts.load) document.fonts.load('800 23px "Baloo Bhaijaan 2"', 'غمّس').then(badgeText, function () {});
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', badgeText);
    new MutationObserver(badgeText).observe(root, { attributes: true, attributeFilter: ['lang'] });
    var word = mk('span', 'pop-word', front);
    // "Double chocolate dip": the note sits beside the cup's top and its arrow is drawn to the lid, in every layout
    var note = scene.querySelector('.note--dip'), noteArrow = null;
    if (note) {
      var oldArrow = note.querySelector('svg'); if (oldArrow) oldArrow.style.display = 'none';
      noteArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      noteArrow.setAttribute('class', 'note-arrow'); noteArrow.setAttribute('aria-hidden', 'true');
      noteArrow.innerHTML = '<path class="curve" pathLength="1"/><path class="head" pathLength="1"/>';
      front.appendChild(noteArrow);
      note.classList.add('is-placed');
    }
    word.textContent = 'POP!';
    var rings = [0, 1].map(function () { return mk('span', 'pop-ring', ground); });
    var dust = mk('span', 'pop-dust', ground);
    // rings and dust lie on the floor, under everything else in the layer
    rings.concat(dust, floorShadow).forEach(function (e) { ground.insertBefore(e, ground.firstChild); });

    var geo = { cx: 0, top: 0, h: 1, dir: 1, base: 0, W: 1, narrow: false };
    function px(el, x, y) { el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px'; }
    function shadowAt(sh, x, y, size) {
      px(sh, x, y); sh.style.width = (size * 0.95).toFixed(1) + 'px'; sh.style.height = (size * 0.24).toFixed(1) + 'px';
    }
    function layout() {
      var W = scene.offsetWidth, SH = scene.offsetHeight, H = cup.offsetHeight || 1;
      var narrow = W < 920;
      // the cup box is centred on its offsetLeft (translate: -50%); its picture's base is at 97.4%
      geo = { cx: cup.offsetLeft, top: cup.offsetTop, h: H, dir: root.dir === 'rtl' ? -1 : 1, base: cup.offsetTop + 0.965 * H, W: W, narrow: narrow };
      // phones: the cup fills most of the width, so keep the ground spots in the strips beside it
      var half = 0.302 * H, room = Math.max(0, W / 2 - half * 0.9 - 14);
      var X = narrow
        ? function (ox) { return geo.cx + geo.dir * (ox < 0 ? -1 : 1) * (half * 0.9 + Math.min(1, Math.abs(ox) / 0.82) * room); }
        : function (ox) { return geo.cx + geo.dir * ox * H; };
      var FX = function (fx) { return (geo.dir < 0 ? 1 - fx : fx) * W; };
      // the photo is object-fit: cover, anchored bottom (50% / 62% on phones), mirrored in Arabic on desktop
      var s = Math.max(W / IMG_W, SH / IMG_H), offX = (W - IMG_W * s) * (narrow ? 0.62 : 0.5), offY = SH - IMG_H * s;
      var mirror = geo.dir < 0 && !narrow;
      var P = function (x, y) { var sx = offX + x * s; return { x: mirror ? W - sx : sx, y: offY + y * s }; };
      geo.s = s;

      var side = 0;
      balls.forEach(function (b) {
        b.on = !narrow || !!b.s[6];
        b.el.style.display = b.sh.style.display = b.on ? '' : 'none';
        if (narrow) {   // the copy is above the cup on phones: spread across the width, in the cup's band
          var fx = b.s[0] < 0.5 ? b.s[0] : (b.on && side++ % 2 ? 1 - b.s[0] : b.s[0]);   // balance left / right
          b.hx = Math.min(W - 16, Math.max(16, FX(fx)));
          b.hy = geo.top + (b.s[1] * 1.05 - 0.04) * H;
          b.sz = b.s[2] * H * 1.6;
        } else {
          b.hx = FX(b.s[0]); b.hy = b.s[1] * SH; b.sz = b.s[2] * SH;
        }
        b.gx = X(b.s[7]); b.gy = geo.top + b.s[8] * H - b.sz * 0.3;   // resting on the ground (drawn smaller there)
        px(b.el, b.hx, b.hy); b.el.style.setProperty('--s', b.sz.toFixed(1) + 'px');
        shadowAt(b.sh, b.gx, b.gy + b.sz * 0.3, b.sz * 0.6);
      });
      floor.forEach(function (o) {
        var p = P(o.f[0], o.f[1]); o.sz = o.f[2] * s; o.x = p.x; o.y = p.y;
        px(o.el, o.x, o.y - o.sz * 0.45); o.el.style.setProperty('--s', o.sz.toFixed(1) + 'px');
        shadowAt(o.sh, o.x, o.y, o.sz);
      });
      crumbs.forEach(function (c) {
        var p = P(c.c[0], c.c[1]); c.sz = c.c[2] * s * 0.8; c.x = p.x; c.y = p.y;
        px(c.el, c.x, c.y - c.sz / 2); c.el.style.width = c.el.style.height = c.sz.toFixed(1) + 'px';
      });
      var bp = P(BOWL.x + BOWL.w / 2, BOWL.contact);
      bowl.x = bp.x; bowl.y = bp.y; bowl.w = BOWL.w * s; bowl.h = BOWL.h * s;
      px(bowl.el, bowl.x, bowl.y); bowl.el.style.width = bowl.w.toFixed(1) + 'px';
      bowl.el.style.marginTop = (-(BOWL.contact - BOWL.y) * s).toFixed(1) + 'px';
      bowl.el.style.transform = mirror ? 'scaleX(-1)' : '';
      shadowAt(bowl.sh, bowl.x, bowl.y, bowl.w * 0.85);

      var bs = BADGE[2] * H * (narrow ? 0.85 : 1);
      badge.bx = Math.min(W - bs / 2 - 8, Math.max(bs / 2 + 8, X(BADGE[0]))); badge.by = geo.top + BADGE[1] * H;
      badge.gx = X(-0.12); badge.gy = geo.top + 1.03 * H - bs * 0.23;   // where its cookie lies before the slam
      px(badge, badge.bx, badge.by);
      badge.style.setProperty('--s', bs.toFixed(1) + 'px');
      px(word, X(-0.3), geo.top + 0.04 * H); word.style.setProperty('--fs', (0.1 * H).toFixed(1) + 'px');
      if (note) placeNote(W, SH, H);
      rings.concat(dust).forEach(function (e) {
        px(e, geo.cx, geo.base); e.style.width = (0.62 * H).toFixed(1) + 'px'; e.style.height = (0.13 * H).toFixed(1) + 'px';
      });
      px(floorShadow, geo.cx, geo.base);
      floorShadow.style.width = (0.8 * H).toFixed(1) + 'px'; floorShadow.style.height = (0.14 * H).toFixed(1) + 'px';
    }
    function placeNote(W, SH, H) {
      var d = geo.dir;
      // the text's inner edge, just clear of the cup's widest point (≈ 0.29 cup-heights from its centre)
      var tx = geo.cx + d * 0.37 * H, ty = geo.top + 0.15 * H;
      note.style.maxWidth = Math.max(90, Math.min(200, d > 0 ? W - tx - 12 : tx - 12)).toFixed(0) + 'px';
      px(note, tx, ty); note.style.translate = d < 0 ? '-100% 0' : '0 0';
      noteArrow.style.display = getComputedStyle(note).display === 'none' ? 'none' : '';
      noteArrow.setAttribute('width', W); noteArrow.setAttribute('height', SH);
      noteArrow.setAttribute('viewBox', '0 0 ' + W + ' ' + SH);
      // from the top of the text, an arc up and over, coming down onto the lid (over the dips)
      var sx = tx + d * note.offsetWidth * 0.4, sy = ty - 6;
      var ex = geo.cx + d * 0.2 * H, ey = geo.top + 0.09 * H;
      var c1x = sx - d * 0.01 * H, c1y = sy - 0.1 * H, c2x = ex + d * 0.09 * H, c2y = ey - 0.1 * H;
      noteArrow.querySelector('.curve').setAttribute('d', 'M' + sx.toFixed(1) + ',' + sy.toFixed(1) + ' C' + c1x.toFixed(1) + ',' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ',' + c2y.toFixed(1) + ' ' + ex.toFixed(1) + ',' + ey.toFixed(1));
      var ang = Math.atan2(ey - c2y, ex - c2x), L = Math.max(9, 0.018 * H), spread = 0.5;
      var h1x = ex - L * Math.cos(ang - spread), h1y = ey - L * Math.sin(ang - spread);
      var h2x = ex - L * Math.cos(ang + spread), h2y = ey - L * Math.sin(ang + spread);
      noteArrow.querySelector('.head').setAttribute('d', 'M' + h1x.toFixed(1) + ',' + h1y.toFixed(1) + ' L' + ex.toFixed(1) + ',' + ey.toFixed(1) + ' L' + h2x.toFixed(1) + ',' + h2y.toFixed(1));
    }
    layout();
    if ('ResizeObserver' in window) new ResizeObserver(layout).observe(scene);
    new MutationObserver(layout).observe(root, { attributes: true, attributeFilter: ['dir', 'lang'] });   // the note's text changes width
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

    // --- before the slam: the floating pieces lie on the ground round the landing spot
    balls.forEach(function (b) {
      gsap.set(b.el, { x: b.gx - b.hx, y: b.gy - b.hy, scale: 0.6, rotation: rnd(-30, 30) });
    });
    // the badge's cookie lies on the ground with the others; its ring only opens once the cookie arrives
    gsap.set(badgeRing, { scale: 0, rotation: -90, opacity: 0 });
    gsap.set(badgeCookie, { x: badge.gx - badge.bx, y: badge.gy - badge.by, scale: 0.6, rotation: rnd(-30, 30) });

    // how hard the shockwave hits a point on the floor, and when it gets there
    function wave(x, y) {
      var d = Math.hypot(x - geo.cx, (y - geo.base) * 2.2);
      return { delay: d / 1700, amp: Math.max(0.12, Math.min(1, 1 - d / (geo.W * 0.85))) };
    }

    // --- splash: thrown up and out from the ground, spinning, into the air spot
    function splash() {
      balls.forEach(function (b) {
        if (!b.on) return;
        var dist = Math.hypot(b.hx - b.gx, b.hy - b.gy);
        var near = Math.max(0.35, 1.1 - Math.abs(b.s[7]) * 1.4);
        var d = 0.85 + Math.min(1, dist / 1100) * 0.75 + rnd(0, 0.2);
        var peak = Math.min(b.gy - b.hy, 0) - geo.h * rnd(0.10, 0.22) * near;
        var delay = Math.abs(b.s[7]) * 0.12;
        gsap.timeline({ delay: delay })
          .to(b.el, { x: 0, scale: 1, rotation: rnd(-25, 25) + rnd(300, 620) * (b.hx < geo.cx ? -1 : 1), duration: d, ease: 'power2.out' }, 0)
          .to(b.el, { y: peak, duration: d * 0.4, ease: 'power2.out' }, 0)
          .to(b.el, { y: 0, duration: d * 0.6, ease: 'back.out(1.3)' }, d * 0.4)
          .to(b.sh, { scale: 0.3, opacity: 0, duration: d * 0.5, ease: 'power2.out' }, 0);
        if (b.s[3] === 'f') gsap.fromTo(b.k, { scale: 1 }, { scale: 1.18, duration: d * 0.38, ease: 'power2.out', yoyo: true, repeat: 1, delay: delay });
      });
      // the badge cookie flies up into place, then the slogan ring opens round it
      var bd = 1.05, bpeak = Math.min(badge.gy - badge.by, 0) - geo.h * 0.12;
      gsap.timeline({ delay: 0.12 })
        .to(badgeCookie, { x: 0, scale: 1, rotation: 360 * geo.dir, duration: bd, ease: 'power2.out' }, 0)
        .to(badgeCookie, { y: bpeak, duration: bd * 0.42, ease: 'power2.out' }, 0)
        .to(badgeCookie, { y: 0, duration: bd * 0.58, ease: 'back.out(1.6)' }, bd * 0.42)
        .to(badgeRing, { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.8)' }, bd * 0.85);
    }

    // --- a piece on the floor jumps, spins, lands and bounces; its shadow follows
    function hop(o, power, light) {
      var w = wave(o.x, o.y), a = w.amp * power;
      var h = geo.h * (light ? 0.05 + 0.16 * a * a : 0.06 + 0.32 * a * a) * rnd(0.8, 1.2);
      var up = 0.22 + 0.26 * a, out = (o.x < geo.cx ? -1 : 1) * a * rnd(20, 60) * (light ? 1.6 : 1);
      o.off = Math.max(-geo.W * 0.08, Math.min(geo.W * 0.08, o.off + out));
      var tl = gsap.timeline({ delay: w.delay });
      tl.to(o.el, { x: o.off, duration: up * 2.4, ease: 'power2.out' }, 0)
        .to(o.k || o.el, { y: -h, duration: up, ease: 'power2.out' }, 0)
        .to(o.k || o.el, { y: 0, duration: up, ease: 'power2.in' }, up)
        .to(o.k || o.el, { y: -h * 0.18, duration: up * 0.4, ease: 'power2.out' }, up * 2)
        .to(o.k || o.el, { y: 0, duration: up * 0.4, ease: 'power2.in' }, up * 2.4)
        .to(o.k || o.el, { rotation: '+=' + (rnd(120, 360) * a * (o.x < geo.cx ? -1 : 1)), duration: up * 2.8, ease: 'power2.out' }, 0);
      if (o.sh) tl.to(o.sh, { x: o.off, duration: up * 2.4, ease: 'power2.out' }, 0)
        .to(o.sh, { scale: 0.45, opacity: 0.35, duration: up, ease: 'power2.out' }, 0)
        .to(o.sh, { scale: 1, opacity: 1, duration: up, ease: 'power2.in' }, up);
    }

    // --- the dip bowl: heavy, so a short jump, a squash on landing, and the chocolate splashes
    function bowlHop(power) {
      var w = wave(bowl.x, bowl.y), a = w.amp * power;
      var h = geo.h * (0.03 + 0.1 * a), up = 0.2 + 0.12 * a, tilt = rnd(4, 9) * (bowl.x < geo.cx ? -1 : 1);
      gsap.timeline({ delay: w.delay })
        .to(bowl.img, { y: -h, rotation: tilt, scaleY: 1.05, scaleX: 0.97, duration: up, ease: 'power2.out' }, 0)
        .to(bowl.img, { y: 0, rotation: 0, scaleY: 1, scaleX: 1, duration: up, ease: 'power2.in' }, up)
        .to(bowl.img, { scaleY: 0.9, scaleX: 1.06, duration: 0.07, ease: 'power2.out' }, up * 2)
        .to(bowl.img, { scaleY: 1, scaleX: 1, duration: 0.8, ease: 'elastic.out(1, 0.35)' }, up * 2 + 0.07)
        .to(bowl.sh, { scale: 0.7, opacity: 0.5, duration: up, ease: 'power2.out' }, 0)
        .to(bowl.sh, { scale: 1, opacity: 1, duration: up, ease: 'power2.in' }, up)
        .add(function () { chocolateSplash(a); }, up * 2);
    }
    function chocolateSplash(a) {
      var rimY = bowl.y - bowl.h * 0.72, sz = bowl.w * 0.05;
      drops.forEach(function (d) {
        var s = sz * rnd(0.5, 1.2), dx = rnd(-0.45, 0.45) * bowl.w * (0.6 + a), peak = geo.h * rnd(0.06, 0.16) * (0.5 + a);
        var land = rnd(0, 1) < 0.5 ? rimY + bowl.h * 0.05 : bowl.y - s * 0.3;    // back in the bowl, or on the floor
        var t = rnd(0.45, 0.7);
        d.style.width = d.style.height = s.toFixed(1) + 'px';
        gsap.timeline()
          .set(d, { left: bowl.x + rnd(-0.25, 0.25) * bowl.w, top: rimY, x: 0, y: 0, opacity: 1, scaleX: 0.8, scaleY: 1.3 })
          .to(d, { x: dx, duration: t * 2, ease: 'none' }, 0)
          .to(d, { y: -peak, scaleX: 1, scaleY: 1, duration: t, ease: 'power2.out' }, 0)
          .to(d, { y: land - rimY, duration: t, ease: 'power2.in' }, t)
          .to(d, { scaleX: 1.8, scaleY: 0.4, duration: 0.12, ease: 'power2.out' }, t * 2)
          .to(d, { opacity: 0, duration: 0.6, ease: 'power1.in' }, t * 2 + 0.3);
      });
    }

    function impact(power) {
      gsap.timeline()
        .to(cupTurn, { scaleY: 1 - 0.22 * power, scaleX: 1 + 0.14 * power, duration: 0.08, ease: 'power3.out' })
        .to(cupTurn, { scaleY: 1, scaleX: 1, duration: 1.1, ease: 'elastic.out(1.1, 0.3)' });
      gsap.timeline()
        .to(floorShadow, { scaleX: 1 + 0.12 * power, duration: 0.08, ease: 'power3.out' })
        .to(floorShadow, { scaleX: 1, duration: 1.1, ease: 'elastic.out(1.1, 0.3)' });
      // shake the world, not the words
      var shake = [plate, ground, back, front].filter(Boolean), amp = 9 * power;
      gsap.timeline()
        .to(shake, { x: rnd(-1, 1) * amp, y: amp, duration: 0.05, ease: 'none' })
        .to(shake, { x: rnd(-1, 1) * amp * 0.6, y: -amp * 0.5, duration: 0.06, ease: 'none' })
        .to(shake, { x: rnd(-1, 1) * amp * 0.3, y: amp * 0.25, duration: 0.07, ease: 'none' })
        .to(shake, { x: 0, y: 0, duration: 0.25, ease: 'power2.out' });
      rings.forEach(function (r, i) {
        gsap.fromTo(r, { scale: 0.3, opacity: 0.7 * power }, { scale: 2.6 + i * 1.4, opacity: 0, duration: 0.9 + i * 0.35, ease: 'power2.out', delay: i * 0.08 });
      });
      gsap.fromTo(dust, { scale: 0.4, opacity: 0.9 * power }, { scale: 2.2, opacity: 0, duration: 0.8, ease: 'power2.out' });
      floor.forEach(function (o) { hop(o, power, false); });
      crumbs.forEach(function (c) { hop(c, power, true); });
      bowlHop(power);
      popWord();
    }

    function popWord() {
      gsap.killTweensOf(word);
      gsap.timeline()
        .fromTo(word, { opacity: 1, scale: 0.2, rotation: geo.dir * -24, y: 10 },
                      { scale: 1, rotation: geo.dir * -8, y: 0, duration: 0.45, ease: 'back.out(3)' })
        .to(word, { opacity: 0, y: -36, scale: 1.1, duration: 0.45, ease: 'power2.in' }, 0.75);
    }

    // --- the floating pieces keep floating, each at its own pace
    var floats = balls.map(function (b) {
      var depth = b.s[3] === 'f' ? 1 : 0.6;
      return gsap.to(b.img, { y: rnd(8, 18) * depth * (Math.random() < 0.5 ? -1 : 1), rotation: rnd(-14, 14),
        duration: rnd(2.4, 4.2), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: -rnd(0, 4) });
    });

    // --- intro: the cup falls hard (its shadow grows under it), slams, splash
    gsap.set(cupTurn, { transformOrigin: '50% 100%' });
    intro.from(cupTurn, { yPercent: -135, duration: 0.55, ease: 'power4.in' }, landAt - 0.55)
      .from(floorShadow, { scale: 0.25, opacity: 0, duration: 0.55, ease: 'power4.in' }, landAt - 0.55)
      .add(function () { impact(1); splash(); }, landAt);
    if (noteArrow) {
      var arrowParts = noteArrow.querySelectorAll('path');
      gsap.set(arrowParts, { strokeDasharray: 1, strokeDashoffset: 1 });
      intro.to(arrowParts[0], { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, landAt + 0.7)
        .to(arrowParts[1], { strokeDashoffset: 0, duration: 0.25, ease: 'power2.out' }, landAt + 1.25);
    }

    // --- click / tap the cup: it hops and slams again
    var busy = false;
    cup.classList.toggle('is-poppable', fine);
    cup.addEventListener('click', function () {
      if (busy) return; busy = true;
      gsap.timeline({ onComplete: function () { busy = false; } })
        .to(cupTurn, { scaleY: 0.92, scaleX: 1.05, duration: 0.08, ease: 'power2.out' })
        .to(cupTurn, { yPercent: -14, scaleY: 1.04, scaleX: 0.97, duration: 0.22, ease: 'power2.out' }, '>')
        .to(floorShadow, { scale: 0.8, opacity: 0.6, duration: 0.22, ease: 'power2.out' }, '<')
        .to(cupTurn, { yPercent: 0, scaleY: 1, scaleX: 1, duration: 0.18, ease: 'power3.in' })
        .to(floorShadow, { scale: 1, opacity: 1, duration: 0.18, ease: 'power3.in' }, '<')
        .add(function () {
          impact(0.7);
          var ox = geo.cx, oy = geo.top + 0.45 * geo.h;
          balls.forEach(function (b) {
            if (!b.on) return;
            var dx = b.hx - ox, dy = b.hy - oy, len = Math.hypot(dx, dy) || 1;
            var push = rnd(70, 150) * (b.s[3] === 'f' ? 1.2 : 0.8);
            gsap.timeline()
              .to(b.k, { x: dx / len * push, y: dy / len * push - rnd(20, 60), rotation: rnd(-120, 120), duration: 0.28, ease: 'power3.out', overwrite: 'auto' })
              .to(b.k, { x: 0, y: 0, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' });
          });
        })
        .to({}, { duration: 1 });
    });

    // --- desktop: floating pieces dodge the cursor, the cup leans toward it
    if (fine) {
      gsap.set(cup, { transformPerspective: 1100 });
      var tiltY = gsap.quickTo(cup, 'rotationY', { duration: 0.9, ease: 'power3' });
      var tiltX = gsap.quickTo(cup, 'rotationX', { duration: 0.9, ease: 'power3' });
      var R = 190;
      var hero = document.getElementById('hero');
      hero.addEventListener('pointermove', function (e) {
        var r = scene.getBoundingClientRect();
        var px2 = e.clientX - r.left, py2 = e.clientY - r.top;
        balls.forEach(function (b) {
          if (!b.on) return;
          var dx = b.hx - px2, dy = b.hy - py2, d = Math.hypot(dx, dy) || 1;
          var k = d < R ? Math.pow(1 - d / R, 2) * 110 : 0;
          b.qx(dx / d * k); b.qy(dy / d * k);
        });
        var nx = Math.max(-1, Math.min(1, (px2 - geo.cx) / (r.width * 0.4)));
        var ny = Math.max(-1, Math.min(1, (py2 - (geo.top + geo.h / 2)) / (r.height * 0.5)));
        tiltY(nx * 10); tiltX(-ny * 5);
      });
      hero.addEventListener('pointerleave', function () {
        balls.forEach(function (b) { b.qx(0); b.qy(0); });
        tiltY(0); tiltX(0);
      });
    }

    // --- script line: the three words hop one after another, now and then
    var sw = document.querySelectorAll('.hero-script .sw');
    if (sw.length) {
      gsap.timeline({ repeat: -1, repeatDelay: 2.8, delay: landAt + 1.8 })
        .to(sw, { y: -10, scale: 1.14, color: '#E9A15B', duration: 0.22, ease: 'power2.out', stagger: 0.2 })
        .to(sw, { y: 0, scale: 1, color: '#7B4027', duration: 0.6, ease: 'bounce.out', stagger: 0.2 }, 0.22);
    }

    // --- pause the floating while the hero is off screen
    ST.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top',
      onToggle: function (self) { floats.forEach(function (t) { if (self.isActive) t.resume(); else t.pause(); }); } });
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

    heroPop(gsap, ST, intro, 0.85);

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
      }).join('') + (suffix ? '<span class="num-suf">' + suffix + '</span>' : '');
      el.setAttribute('aria-label', target + suffix);
      // each column is as wide as its final digit (tabular digits left a gap after a narrow "1")
      el.querySelectorAll('.dg').forEach(function (dg, k) {
        var probe = document.createElement('span');
        probe.textContent = target.charAt(k);
        probe.style.cssText = 'position:absolute;visibility:hidden;font-variant-numeric:proportional-nums';
        el.appendChild(probe);
        var fs = parseFloat(getComputedStyle(el).fontSize) || 1;
        dg.style.width = (probe.getBoundingClientRect().width / fs) + 'em';
        el.removeChild(probe);
      });
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
