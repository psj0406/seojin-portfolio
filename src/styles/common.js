/*====================================
  _tabContents
======================================*/
var _tabContents = function () {
  var tabs = document.querySelectorAll('.tab_wrap');
  tabs.forEach(function ($wrap) {
    var tabLists = $wrap.querySelectorAll('.tab_list');
    tabLists.forEach(function ($tabList) {
      var $tabItems = $tabList.querySelectorAll('.tab_item');
      var $tabPanels = $wrap.querySelector('.tab_contents') ? $wrap.querySelector('.tab_contents').querySelectorAll('.tab_panel') : [];

      $tabItems.forEach(function ($this) {
        $this.addEventListener('click', function () {
          var targetPanel = document.getElementById($this.getAttribute('aria-controls'));

          $tabItems.forEach(function (item) { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); item.setAttribute('tabindex', '-1'); });
          $this.classList.add('active');
          $this.setAttribute('aria-selected', 'true');
          $this.setAttribute('tabindex', '0');

          $tabPanels.forEach(function (panel) { panel.classList.remove('active'); });
          if (targetPanel) targetPanel.classList.add('active');
        });

        $this.addEventListener('keyup', function (e) {
          var keycode = e.keyCode || e.which;
          var $tabItemsArr = Array.from($tabItems);
          var idx = $tabItemsArr.indexOf($this);

          if (keycode == 39 || keycode == 40) {
            var next = $tabItemsArr[idx + 1] || $tabItemsArr[0];
            next.click();
            next.focus();
          } else if (keycode == 37 || keycode == 38) {
            var prev = $tabItemsArr[idx - 1] || $tabItemsArr[$tabItemsArr.length - 1];
            prev.click();
            prev.focus();
          }
        });
      });

      $tabPanels.forEach(function (panel) { panel.setAttribute('tabindex', '0'); });
    });
  });
};


/*====================================
  _accordion
======================================*/
var _accordion = function () {
  document.addEventListener('click', function (e) {
    var $this = e.target.closest('.accordion_wrap .btn_toggle');
    if (!$this) return;

    var $accWrap = $this.closest('.accordion_wrap');
    var $thisContents = $this.closest('.accordion_header').nextElementSibling;
    var isMulti = $accWrap.classList.contains('type-multi');
    var isHidden = $thisContents.style.display === 'none' || getComputedStyle($thisContents).display === 'none';

    if (isHidden) {
      if (!isMulti) {
        $accWrap.querySelectorAll('.btn_toggle.active').forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          btn.setAttribute('aria-label', '열기');
          var contents = btn.closest('.accordion_header').nextElementSibling;
          if (contents) contents.style.display = 'none';
        });
      }
      $thisContents.style.display = 'block';
      $this.classList.add('active');
      $this.setAttribute('aria-expanded', 'true');
      $this.setAttribute('aria-label', '닫기');
    } else {
      $this.classList.remove('active');
      $this.setAttribute('aria-expanded', 'false');
      $this.setAttribute('aria-label', '열기');
      $thisContents.style.display = 'none';
    }
  });
};


/*====================================
  _layerPop
======================================*/
var _zIndexCounter = 1000;
var _layerPop = function () {
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('.layerpop_open');
    if (opener) {
      var popId = opener.getAttribute('aria-controls');
      opener.setAttribute('aria-expanded', 'true');
      _zIndexCounter++;
      document.getElementById(popId).style.zIndex = _zIndexCounter;
      fnOpenLayerPop(popId);
    }

    var closer = e.target.closest('.layerpop_close');
    if (closer) {
      var popId = closer.closest('.layerpop_wrap').id;
      document.getElementById(popId).removeAttribute('aria-hidden');
      document.querySelectorAll('[aria-controls="' + popId + '"]').forEach(function (el) { el.setAttribute('aria-expanded', 'false'); });
      fnCloseLayerPop(popId);
    }
  });

  document.querySelectorAll('.layerpop_wrap').forEach(function (wrap) {
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var popId = wrap.id;
        document.getElementById(popId).removeAttribute('aria-hidden');
        document.querySelectorAll('[aria-controls="' + popId + '"]').forEach(function (el) { el.setAttribute('aria-expanded', 'false'); });
        fnCloseLayerPop(popId);
      }
    });
  });
};

var fnOpenLayerPop = function (popID) {
  var $el = document.getElementById(popID);
  var focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  document.body.classList.add('overflow');
  $el.classList.add('show');
  $el.setAttribute('aria-hidden', 'false');

  function popupResize() {
    var popH = $el.querySelector('.layerpop').offsetHeight;
    if (window.innerWidth > 900) {
      if (popH < 800) {
        $el.querySelector('.layerpop').style.top = '50%';
        $el.querySelector('.layerpop').style.transform = 'translate(-50%, -50%)';
      }
    } else {
      $el.querySelector('.layerpop').style.top = '';
      $el.querySelector('.layerpop').style.transform = '';
    }
  }
  popupResize();
  window.addEventListener('resize', popupResize);

  var focusable = Array.from($el.querySelectorAll(focusableSelector)).filter(function (el) {
    return el.offsetParent !== null && !el.disabled;
  });
  var firstFocusable = focusable[0];
  var lastFocusable = focusable[focusable.length - 1];
  if (firstFocusable) firstFocusable.focus();

  $el.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') { fnCloseLayerPop(popID); }
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) { e.preventDefault(); lastFocusable.focus(); }
      } else {
        if (document.activeElement === lastFocusable) { e.preventDefault(); firstFocusable.focus(); }
      }
    }
  });
};

var fnCloseLayerPop = function (popID) {
  var $el = document.getElementById(popID);
  var $focusBtn = document.querySelector('[aria-controls="' + popID + '"]');

  setTimeout(function () {
    $el.classList.remove('show');
    $el.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow');
    if ($focusBtn) { $focusBtn.setAttribute('aria-expanded', 'false'); $focusBtn.focus(); }
  }, 30);
};
window.fnCloseLayerPop = fnCloseLayerPop;


/*====================================
  _passwordToggle
======================================*/
var _passwordToggle = function () {
  document.addEventListener('change', function (e) {
    var target = e.target;
    if (target.classList.contains('password_toggle') && target.type === 'checkbox') {
      var container = target.closest('.input_box');
      var passwordInput = container ? container.querySelector('.password_input') : null;
      if (!passwordInput) return;
      passwordInput.type = target.checked ? 'text' : 'password';
    }
  });
};


/*====================================
  _swipeTab
======================================*/
var _swipeTab = function () {
  var tabs = document.querySelectorAll('.swipe_tab > div');
  if (tabs.length === 0) return;

  var checkOverflow = function () {
    tabs.forEach(function (el) {
      var isOverflowing = el.scrollWidth > el.clientWidth;
      var isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (isOverflowing && !isEnd) {
        el.parentElement.classList.add('is_overflow');
      } else {
        el.parentElement.classList.remove('is_overflow');
      }
    });
  };

  checkOverflow();
  tabs.forEach(function (el) { el.addEventListener('scroll', checkOverflow); });
  window.addEventListener('resize', checkOverflow);
};


/*====================================
  list img thumbnail
======================================*/
var _listImgThumbnail = function () {
  document.querySelectorAll('.product_list .img img').forEach(function (img) {
    var applyRatio = function (image) {
      var w = image.naturalWidth;
      var h = image.naturalHeight;
      if (h > w) {
        image.style.width = 'auto';
        image.style.height = '100%';
      } else {
        image.style.width = '100%';
        image.style.height = 'auto';
      }
    };
    if (img.complete && img.naturalWidth) {
      applyRatio(img);
    } else {
      img.addEventListener('load', function () { applyRatio(img); });
    }
  });
};
