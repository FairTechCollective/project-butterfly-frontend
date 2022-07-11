/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const t = !(window.ShadyDOM && window.ShadyDOM.inUse);
let e, i;
function s(i) {
  e =
    (!i || !i.shimcssproperties) &&
    (t ||
      Boolean(
        !navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) &&
          window.CSS &&
          CSS.supports &&
          CSS.supports('box-shadow', '0 0 0 var(--foo)')
      ));
}
window.ShadyCSS &&
  void 0 !== window.ShadyCSS.cssBuild &&
  (i = window.ShadyCSS.cssBuild);
const n = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);
window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
  ? (e = window.ShadyCSS.nativeCss)
  : window.ShadyCSS
  ? (s(window.ShadyCSS), (window.ShadyCSS = void 0))
  : s(window.WebComponents && window.WebComponents.flags);
const r = e;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ class o {
  constructor() {
    (this.start = 0),
      (this.end = 0),
      (this.previous = null),
      (this.parent = null),
      (this.rules = null),
      (this.parsedCssText = ''),
      (this.cssText = ''),
      (this.atRule = !1),
      (this.type = 0),
      (this.keyframesName = ''),
      (this.selector = ''),
      (this.parsedSelector = '');
  }
}
function h(t) {
  return a(
    (function (t) {
      let e = new o();
      (e.start = 0), (e.end = t.length);
      let i = e;
      for (let s = 0, n = t.length; s < n; s++)
        if (t[s] === p) {
          i.rules || (i.rules = []);
          let t = i,
            e = t.rules[t.rules.length - 1] || null;
          (i = new o()),
            (i.start = s + 1),
            (i.parent = t),
            (i.previous = e),
            t.rules.push(i);
        } else t[s] === d && ((i.end = s + 1), (i = i.parent || e));
      return e;
    })((t = t.replace(u.comments, '').replace(u.port, ''))),
    t
  );
}
function a(t, e) {
  let i = e.substring(t.start, t.end - 1);
  if (((t.parsedCssText = t.cssText = i.trim()), t.parent)) {
    let s = t.previous ? t.previous.end : t.parent.start;
    (i = e.substring(s, t.start - 1)),
      (i = (function (t) {
        return t.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
          let t = arguments[1],
            e = 6 - t.length;
          for (; e--; ) t = '0' + t;
          return '\\' + t;
        });
      })(i)),
      (i = i.replace(u.multipleSpaces, ' ')),
      (i = i.substring(i.lastIndexOf(';') + 1));
    let n = (t.parsedSelector = t.selector = i.trim());
    (t.atRule = 0 === n.indexOf(g)),
      t.atRule
        ? 0 === n.indexOf(v)
          ? (t.type = c.MEDIA_RULE)
          : n.match(u.keyframesRule) &&
            ((t.type = c.KEYFRAMES_RULE),
            (t.keyframesName = t.selector.split(u.multipleSpaces).pop()))
        : 0 === n.indexOf(f)
        ? (t.type = c.MIXIN_RULE)
        : (t.type = c.STYLE_RULE);
  }
  let s = t.rules;
  if (s) for (let t, i = 0, n = s.length; i < n && (t = s[i]); i++) a(t, e);
  return t;
}
function l(t, e, i = '') {
  let s = '';
  if (t.cssText || t.rules) {
    let i = t.rules;
    if (
      i &&
      !(function (t) {
        let e = t[0];
        return Boolean(e) && Boolean(e.selector) && 0 === e.selector.indexOf(f);
      })(i)
    )
      for (let t, n = 0, r = i.length; n < r && (t = i[n]); n++) s = l(t, e, s);
    else
      (s = e
        ? t.cssText
        : (function (t) {
            return (function (t) {
              return t.replace(u.mixinApply, '').replace(u.varApply, '');
            })(
              (t = (function (t) {
                return t.replace(u.customProp, '').replace(u.mixinProp, '');
              })(t))
            );
          })(t.cssText)),
        (s = s.trim()),
        s && (s = '  ' + s + '\n');
  }
  return (
    s &&
      (t.selector && (i += t.selector + ' ' + p + '\n'),
      (i += s),
      t.selector && (i += d + '\n\n')),
    i
  );
}
const c = {STYLE_RULE: 1, KEYFRAMES_RULE: 7, MEDIA_RULE: 4, MIXIN_RULE: 1e3},
  p = '{',
  d = '}',
  u = {
    comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    port: /@import[^;]*;/gim,
    customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    keyframesRule: /^@[^\s]*keyframes/,
    multipleSpaces: /\s+/g,
  },
  f = '--',
  v = '@media',
  g = '@',
  m =
    /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
  b = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
  y = /@media\s(.*)/,
  z = new Set();
function w(t) {
  const e = t.textContent;
  if (!z.has(e)) {
    z.add(e);
    const t = document.createElement('style');
    t.setAttribute('shady-unscoped', ''),
      (t.textContent = e),
      document.head.appendChild(t);
  }
}
function _(t) {
  return t.hasAttribute('shady-unscoped');
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function M(t, e) {
  return t ? ('string' == typeof t && (t = h(t)), e && x(t, e), l(t, r)) : '';
}
function H(t) {
  return !t.t && t.textContent && (t.t = h(t.textContent)), t.t || null;
}
function x(t, e, i, s) {
  if (!t) return;
  let n = !1,
    r = t.type;
  if (s && r === c.MEDIA_RULE) {
    let e = t.selector.match(y);
    e && (window.matchMedia(e[1]).matches || (n = !0));
  }
  r === c.STYLE_RULE
    ? e(t)
    : i && r === c.KEYFRAMES_RULE
    ? i(t)
    : r === c.MIXIN_RULE && (n = !0);
  let o = t.rules;
  if (o && !n)
    for (let t, n = 0, r = o.length; n < r && (t = o[n]); n++) x(t, e, i, s);
}
function k(t, e) {
  let i = t.indexOf('var(');
  if (-1 === i) return e(t, '', '', '');
  let s = (function (t, e) {
      let i = 0;
      for (let s = e, n = t.length; s < n; s++)
        if ('(' === t[s]) i++;
        else if (')' === t[s] && 0 == --i) return s;
      return -1;
    })(t, i + 3),
    n = t.substring(i + 4, s),
    r = t.substring(0, i),
    o = k(t.substring(s + 1), e),
    h = n.indexOf(',');
  return -1 === h
    ? e(r, n.trim(), '', o)
    : e(r, n.substring(0, h).trim(), n.substring(h + 1).trim(), o);
}
window.ShadyDOM && window.ShadyDOM.wrap;
function C(t) {
  if (void 0 !== i) return i;
  if (void 0 === t.i) {
    const e = t.getAttribute('css-build');
    if (e) t.i = e;
    else {
      const e = (function (t) {
        const e =
          'template' === t.localName ? t.content.firstChild : t.firstChild;
        if (e instanceof Comment) {
          const t = e.textContent.trim().split(':');
          if ('css-build' === t[0]) return t[1];
        }
        return '';
      })(t);
      '' !== e &&
        (function (t) {
          const e =
            'template' === t.localName ? t.content.firstChild : t.firstChild;
          e.parentNode.removeChild(e);
        })(
          /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ t
        ),
        (t.i = e);
    }
  }
  return t.i || '';
}
function V(t) {
  return '' !== C(t);
}
function L(t, e) {
  for (let i in e)
    null === i ? t.style.removeProperty(i) : t.style.setProperty(i, e[i]);
}
function S(t, e) {
  const i = window.getComputedStyle(t).getPropertyValue(e);
  return i ? i.trim() : '';
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const T = /;\s*/m,
  A = /^\s*(initial)|(inherit)\s*$/,
  E = /\s*!important/;
class P {
  constructor() {
    this._map = {};
  }
  set(t, e) {
    (t = t.trim()), (this._map[t] = {properties: e, dependants: {}});
  }
  get(t) {
    return (t = t.trim()), this._map[t] || null;
  }
}
let O = null;
class $ {
  constructor() {
    (this._currentElement = null),
      (this._measureElement = null),
      (this._map = new P());
  }
  detectMixin(t) {
    return (function (t) {
      const e = b.test(t) || m.test(t);
      return (b.lastIndex = 0), (m.lastIndex = 0), e;
    })(t);
  }
  gatherStyles(e) {
    const i = (function (e) {
      const i = [],
        s = e.querySelectorAll('style');
      for (let e = 0; e < s.length; e++) {
        const n = s[e];
        _(n)
          ? t || (w(n), n.parentNode.removeChild(n))
          : (i.push(n.textContent), n.parentNode.removeChild(n));
      }
      return i.join('').trim();
    })(e.content);
    if (i) {
      const t = document.createElement('style');
      return (
        (t.textContent = i), e.content.insertBefore(t, e.content.firstChild), t
      );
    }
    return null;
  }
  transformTemplate(t, e) {
    void 0 === t._gatheredStyle && (t._gatheredStyle = this.gatherStyles(t));
    const i = t._gatheredStyle;
    return i ? this.transformStyle(i, e) : null;
  }
  transformStyle(t, e = '') {
    let i = H(t);
    return this.transformRules(i, e), (t.textContent = M(i)), i;
  }
  transformCustomStyle(t) {
    let e = H(t);
    return (
      x(e, (t) => {
        ':root' === t.selector && (t.selector = 'html'), this.transformRule(t);
      }),
      (t.textContent = M(e)),
      e
    );
  }
  transformRules(t, e) {
    (this._currentElement = e),
      x(t, (t) => {
        this.transformRule(t);
      }),
      (this._currentElement = null);
  }
  transformRule(t) {
    (t.cssText = this.transformCssText(t.parsedCssText, t)),
      ':root' === t.selector && (t.selector = ':host > *');
  }
  transformCssText(t, e) {
    return (
      (t = t.replace(m, (t, i, s, n) =>
        this._produceCssProperties(t, i, s, n, e)
      )),
      this._consumeCssProperties(t, e)
    );
  }
  _getInitialValueForProperty(t) {
    return (
      this._measureElement ||
        ((this._measureElement = document.createElement('meta')),
        this._measureElement.setAttribute('apply-shim-measure', ''),
        (this._measureElement.style.all = 'initial'),
        document.head.appendChild(this._measureElement)),
      window.getComputedStyle(this._measureElement).getPropertyValue(t)
    );
  }
  _fallbacksFromPreviousRules(t) {
    let e = t;
    for (; e.parent; ) e = e.parent;
    const i = {};
    let s = !1;
    return (
      x(e, (e) => {
        (s = s || e === t),
          s ||
            (e.selector === t.selector &&
              Object.assign(i, this._cssTextToMap(e.parsedCssText)));
      }),
      i
    );
  }
  _consumeCssProperties(t, e) {
    let i = null;
    for (; (i = b.exec(t)); ) {
      let s = i[0],
        n = i[1],
        r = i.index,
        o = r + s.indexOf('@apply'),
        h = r + s.length,
        a = t.slice(0, o),
        l = t.slice(h),
        c = e ? this._fallbacksFromPreviousRules(e) : {};
      Object.assign(c, this._cssTextToMap(a));
      let p = this._atApplyToCssProperties(n, c);
      (t = `${a}${p}${l}`), (b.lastIndex = r + p.length);
    }
    return t;
  }
  _atApplyToCssProperties(t, e) {
    t = t.replace(T, '');
    let i = [],
      s = this._map.get(t);
    if ((s || (this._map.set(t, {}), (s = this._map.get(t))), s)) {
      let n, r, o;
      this._currentElement && (s.dependants[this._currentElement] = !0);
      const h = s.properties;
      for (n in h)
        (o = e && e[n]),
          (r = [n, ': var(', t, '_-_', n]),
          o && r.push(',', o.replace(E, '')),
          r.push(')'),
          E.test(h[n]) && r.push(' !important'),
          i.push(r.join(''));
    }
    return i.join('; ');
  }
  _replaceInitialOrInherit(t, e) {
    let i = A.exec(e);
    return (
      i &&
        (e = i[1] ? this._getInitialValueForProperty(t) : 'apply-shim-inherit'),
      e
    );
  }
  _cssTextToMap(t, e = !1) {
    let i,
      s,
      n = t.split(';'),
      r = {};
    for (let t, o, h = 0; h < n.length; h++)
      (t = n[h]),
        t &&
          ((o = t.split(':')),
          o.length > 1 &&
            ((i = o[0].trim()),
            (s = o.slice(1).join(':')),
            e && (s = this._replaceInitialOrInherit(i, s)),
            (r[i] = s)));
    return r;
  }
  _invalidateMixinEntry(t) {
    if (O) for (let e in t.dependants) e !== this._currentElement && O(e);
  }
  _produceCssProperties(t, e, i, s, n) {
    if (
      (i &&
        k(i, (t, e) => {
          e && this._map.get(e) && (s = `@apply ${e};`);
        }),
      !s)
    )
      return t;
    let r = this._consumeCssProperties('' + s, n),
      o = t.slice(0, t.indexOf('--')),
      h = this._cssTextToMap(r, !0),
      a = h,
      l = this._map.get(e),
      c = l && l.properties;
    c ? (a = Object.assign(Object.create(c), h)) : this._map.set(e, a);
    let p,
      d,
      u = [],
      f = !1;
    for (p in a)
      (d = h[p]),
        void 0 === d && (d = 'initial'),
        c && !(p in c) && (f = !0),
        u.push(`${e}_-_${p}: ${d}`);
    return (
      f && this._invalidateMixinEntry(l),
      l && (l.properties = a),
      i && (o = `${t};${o}`),
      `${o}${u.join('; ')};`
    );
  }
}
($.prototype.detectMixin = $.prototype.detectMixin),
  ($.prototype.transformStyle = $.prototype.transformStyle),
  ($.prototype.transformCustomStyle = $.prototype.transformCustomStyle),
  ($.prototype.transformRules = $.prototype.transformRules),
  ($.prototype.transformRule = $.prototype.transformRule),
  ($.prototype.transformTemplate = $.prototype.transformTemplate),
  ($.prototype._separator = '_-_'),
  Object.defineProperty($.prototype, 'invalidCallback', {
    get: () => O,
    set(t) {
      O = t;
    },
  });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const N = {},
  D = '_applyShimCurrentVersion',
  j = '_applyShimNextVersion',
  B = '_applyShimValidatingVersion',
  I = Promise.resolve();
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function R(t) {
  let e = N[t];
  e &&
    (function (t) {
      (t[D] = t[D] || 0), (t[B] = t[B] || 0), (t[j] = (t[j] || 0) + 1);
    })(e);
}
function F(t) {
  return t[D] === t[j];
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let U,
  K = null,
  q = (window.HTMLImports && window.HTMLImports.whenReady) || null;
function J(t) {
  requestAnimationFrame(function () {
    q
      ? q(t)
      : (K ||
          ((K = new Promise((t) => {
            U = t;
          })),
          'complete' === document.readyState
            ? U()
            : document.addEventListener('readystatechange', () => {
                'complete' === document.readyState && U();
              })),
        K.then(function () {
          t && t();
        }));
  });
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const Z = '__shadyCSSCachedStyle';
let W = null,
  G = null;
class Y {
  constructor() {
    (this.customStyles = []),
      (this.enqueued = !1),
      J(() => {
        window.ShadyCSS.flushCustomStyles &&
          window.ShadyCSS.flushCustomStyles();
      });
  }
  enqueueDocumentValidation() {
    !this.enqueued && G && ((this.enqueued = !0), J(G));
  }
  addCustomStyle(t) {
    t.u ||
      ((t.u = !0), this.customStyles.push(t), this.enqueueDocumentValidation());
  }
  getStyleForCustomStyle(t) {
    if (t[Z]) return t[Z];
    let e;
    return (e = t.getStyle ? t.getStyle() : t), e;
  }
  processStyles() {
    const t = this.customStyles;
    for (let e = 0; e < t.length; e++) {
      const i = t[e];
      if (i[Z]) continue;
      const s = this.getStyleForCustomStyle(i);
      if (s) {
        const t = s.g || s;
        W && W(t), (i[Z] = t);
      }
    }
    return t;
  }
}
(Y.prototype.addCustomStyle = Y.prototype.addCustomStyle),
  (Y.prototype.getStyleForCustomStyle = Y.prototype.getStyleForCustomStyle),
  (Y.prototype.processStyles = Y.prototype.processStyles),
  Object.defineProperties(Y.prototype, {
    transformCallback: {
      get: () => W,
      set(t) {
        W = t;
      },
    },
    validateCallback: {
      get: () => G,
      set(t) {
        let e = !1;
        G || (e = !0), (G = t), e && this.enqueueDocumentValidation();
      },
    },
  });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Q = new $();
class X {
  constructor() {
    (this.customStyleInterface = null), (Q.invalidCallback = R);
  }
  ensure() {
    this.customStyleInterface ||
      (window.ShadyCSS.CustomStyleInterface &&
        ((this.customStyleInterface = window.ShadyCSS.CustomStyleInterface),
        (this.customStyleInterface.transformCallback = (t) => {
          Q.transformCustomStyle(t);
        }),
        (this.customStyleInterface.validateCallback = () => {
          requestAnimationFrame(() => {
            this.customStyleInterface.enqueued && this.flushCustomStyles();
          });
        })));
  }
  prepareTemplate(t, e) {
    if ((this.ensure(), V(t))) return;
    N[e] = t;
    let i = Q.transformTemplate(t, e);
    t._styleAst = i;
  }
  flushCustomStyles() {
    if ((this.ensure(), !this.customStyleInterface)) return;
    let t = this.customStyleInterface.processStyles();
    if (this.customStyleInterface.enqueued) {
      for (let e = 0; e < t.length; e++) {
        let i = t[e],
          s = this.customStyleInterface.getStyleForCustomStyle(i);
        s && Q.transformCustomStyle(s);
      }
      this.customStyleInterface.enqueued = !1;
    }
  }
  styleSubtree(t, e) {
    if ((this.ensure(), e && L(t, e), t.shadowRoot)) {
      this.styleElement(t);
      let e = t.shadowRoot.children || t.shadowRoot.childNodes;
      for (let t = 0; t < e.length; t++) this.styleSubtree(e[t]);
    } else {
      let e = t.children || t.childNodes;
      for (let t = 0; t < e.length; t++) this.styleSubtree(e[t]);
    }
  }
  styleElement(t) {
    this.ensure();
    let {is: e} = (function (t) {
        let e = t.localName,
          i = '',
          s = '';
        return (
          e
            ? e.indexOf('-') > -1
              ? (i = e)
              : ((s = e), (i = (t.getAttribute && t.getAttribute('is')) || ''))
            : ((i = t.is), (s = t.extends)),
          {is: i, typeExtension: s}
        );
      })(t),
      i = N[e];
    if ((!i || !V(i)) && i && !F(i)) {
      (function (t) {
        return !F(t) && t[B] === t[j];
      })(i) ||
        (this.prepareTemplate(i, e),
        (function (t) {
          (t[B] = t[j]),
            t._validating ||
              ((t._validating = !0),
              I.then(function () {
                (t[D] = t[j]), (t._validating = !1);
              }));
        })(i));
      let s = t.shadowRoot;
      if (s) {
        let t = s.querySelector('style');
        t && ((t.t = i._styleAst), (t.textContent = M(i._styleAst)));
      }
    }
  }
  styleDocument(t) {
    this.ensure(), this.styleSubtree(document.body, t);
  }
}
if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
  const e = new X();
  let s = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
  (window.ShadyCSS = {
    prepareTemplate(t, i, s) {
      e.flushCustomStyles(), e.prepareTemplate(t, i);
    },
    prepareTemplateStyles(t, e, i) {
      window.ShadyCSS.prepareTemplate(t, e, i);
    },
    prepareTemplateDom(t, e) {},
    styleSubtree(t, i) {
      e.flushCustomStyles(), e.styleSubtree(t, i);
    },
    styleElement(t) {
      e.flushCustomStyles(), e.styleElement(t);
    },
    styleDocument(t) {
      e.flushCustomStyles(), e.styleDocument(t);
    },
    getComputedStyleValue: (t, e) => S(t, e),
    flushCustomStyles() {
      e.flushCustomStyles();
    },
    nativeCss: r,
    nativeShadow: t,
    cssBuild: i,
    disableRuntime: n,
  }),
    s && (window.ShadyCSS.CustomStyleInterface = s);
}
(window.ShadyCSS.ApplyShim = Q),
  /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  (window.JSCompiler_renameProperty = function (t, e) {
    return t;
  });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let tt,
  et,
  it = /(url\()([^)]*)(\))/g,
  st = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/;
function nt(t, e) {
  if (t && st.test(t)) return t;
  if ('//' === t) return t;
  if (void 0 === tt) {
    tt = !1;
    try {
      const t = new URL('b', 'http://a');
      (t.pathname = 'c%20d'), (tt = 'http://a/c%20d' === t.href);
    } catch (t) {}
  }
  if ((e || (e = document.baseURI || window.location.href), tt))
    try {
      return new URL(t, e).href;
    } catch (e) {
      return t;
    }
  return (
    et ||
      ((et = document.implementation.createHTMLDocument('temp')),
      (et.base = et.createElement('base')),
      et.head.appendChild(et.base),
      (et.anchor = et.createElement('a')),
      et.body.appendChild(et.anchor)),
    (et.base.href = e),
    (et.anchor.href = t),
    et.anchor.href || t
  );
}
function rt(t, e) {
  return t.replace(it, function (t, i, s, n) {
    return i + "'" + nt(s.replace(/["']/g, ''), e) + "'" + n;
  });
}
function ot(t) {
  return t.substring(0, t.lastIndexOf('/') + 1);
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const ht = !window.ShadyDOM || !window.ShadyDOM.inUse;
Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
const at =
  ht &&
  'adoptedStyleSheets' in Document.prototype &&
  'replaceSync' in CSSStyleSheet.prototype &&
  (() => {
    try {
      const t = new CSSStyleSheet();
      t.replaceSync('');
      const e = document.createElement('div');
      return (
        e.attachShadow({mode: 'open'}),
        (e.shadowRoot.adoptedStyleSheets = [t]),
        e.shadowRoot.adoptedStyleSheets[0] === t
      );
    } catch (t) {
      return !1;
    }
  })();
let lt =
    (window.Polymer && window.Polymer.rootPath) ||
    ot(document.baseURI || window.location.href),
  ct = (window.Polymer && window.Polymer.sanitizeDOMValue) || void 0,
  pt = (window.Polymer && window.Polymer.setPassiveTouchGestures) || !1,
  dt = (window.Polymer && window.Polymer.strictTemplatePolicy) || !1,
  ut = (window.Polymer && window.Polymer.allowTemplateFromDomModule) || !1,
  ft = (window.Polymer && window.Polymer.legacyOptimizations) || !1,
  vt = (window.Polymer && window.Polymer.legacyWarnings) || !1,
  gt = (window.Polymer && window.Polymer.syncInitialRender) || !1,
  mt = (window.Polymer && window.Polymer.legacyUndefined) || !1,
  bt = (window.Polymer && window.Polymer.orderedComputed) || !1,
  yt = (window.Polymer && window.Polymer.removeNestedTemplates) || !1,
  zt = (window.Polymer && window.Polymer.fastDomIf) || !1,
  wt = (window.Polymer && window.Polymer.suppressTemplateNotifications) || !1,
  _t = (window.Polymer && window.Polymer.legacyNoObservedAttributes) || !1,
  Mt =
    (window.Polymer && window.Polymer.useAdoptedStyleSheetsWithBuiltCSS) || !1,
  Ht = 0;
const xt = function (t) {
  let e = t._;
  e || ((e = new WeakMap()), (t._ = e));
  let i = Ht++;
  return function (s) {
    let n = s.H;
    if (n && n[i]) return s;
    let r = e,
      o = r.get(s);
    if (!o) {
      (o = t(s)), r.set(s, o);
      let e = Object.create(o.H || n || null);
      (e[i] = !0), (o.H = e);
    }
    return o;
  };
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ let kt = {},
  Ct = {};
function Vt(t, e) {
  kt[t] = Ct[t.toLowerCase()] = e;
}
function Lt(t) {
  return kt[t] || Ct[t.toLowerCase()];
}
class St extends HTMLElement {
  static get observedAttributes() {
    return ['id'];
  }
  static import(t, e) {
    if (t) {
      let i = Lt(t);
      return i && e ? i.querySelector(e) : i;
    }
    return null;
  }
  attributeChangedCallback(t, e, i, s) {
    e !== i && this.register();
  }
  get assetpath() {
    if (!this.C) {
      const t =
          window.HTMLImports && HTMLImports.importForElement
            ? HTMLImports.importForElement(this) || document
            : this.ownerDocument,
        e = nt(this.getAttribute('assetpath') || '', t.baseURI);
      this.C = ot(e);
    }
    return this.C;
  }
  register(t) {
    if ((t = t || this.id)) {
      if (dt && void 0 !== Lt(t))
        throw (
          (Vt(t, null),
          new Error(`strictTemplatePolicy: dom-module ${t} re-registered`))
        );
      (this.id = t),
        Vt(t, this),
        (e = this).querySelector('style') &&
          console.warn('dom-module %s has style outside template', e.id);
    }
    var e;
  }
}
(St.prototype.modules = kt), customElements.define('dom-module', St);
function Tt(t) {
  return St.import(t);
}
function At(t) {
  const e = rt((t.body ? t.body : t).textContent, t.baseURI),
    i = document.createElement('style');
  return (i.textContent = e), i;
}
function Et(t) {
  const e = t.trim().split(/\s+/),
    i = [];
  for (let t = 0; t < e.length; t++) i.push(...Pt(e[t]));
  return i;
}
function Pt(t) {
  const e = Tt(t);
  if (!e)
    return console.warn('Could not find style data in module named', t), [];
  if (void 0 === e._styles) {
    const t = [];
    t.push(...$t(e));
    const i = e.querySelector('template');
    i && t.push(...Ot(i, e.assetpath)), (e._styles = t);
  }
  return e._styles;
}
function Ot(t, e) {
  if (!t._styles) {
    const i = [],
      s = t.content.querySelectorAll('style');
    for (let t = 0; t < s.length; t++) {
      let n = s[t],
        r = n.getAttribute('include');
      r &&
        i.push(
          ...Et(r).filter(function (t, e, i) {
            return i.indexOf(t) === e;
          })
        ),
        e && (n.textContent = rt(n.textContent, e)),
        i.push(n);
    }
    t._styles = i;
  }
  return t._styles;
}
function $t(t) {
  const e = [],
    i = t.querySelectorAll('link[rel=import][type~=css]');
  for (let t = 0; t < i.length; t++) {
    let s = i[t];
    if (s.import) {
      const t = s.import,
        i = s.hasAttribute('shady-unscoped');
      if (i && !t._unscopedStyle) {
        const e = At(t);
        e.setAttribute('shady-unscoped', ''), (t._unscopedStyle = e);
      } else t._style || (t._style = At(t));
      e.push(i ? t._unscopedStyle : t._style);
    }
  }
  return e;
}
function Nt(t) {
  let e = Tt(t);
  if (e && void 0 === e._cssText) {
    let t = (function (t) {
        let e = '',
          i = $t(t);
        for (let t = 0; t < i.length; t++) e += i[t].textContent;
        return e;
      })(
        /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ e
      ),
      i = e.querySelector('template');
    i &&
      (t += (function (t, e) {
        let i = '';
        const s = Ot(t, e);
        for (let t = 0; t < s.length; t++) {
          let e = s[t];
          e.parentNode && e.parentNode.removeChild(e), (i += e.textContent);
        }
        return i;
      })(i, e.assetpath)),
      (e._cssText = t || null);
  }
  return (
    e || console.warn('Could not find style data in module named', t),
    (e && e._cssText) || ''
  );
}
const Dt =
  window.ShadyDOM && window.ShadyDOM.noPatch && window.ShadyDOM.wrap
    ? window.ShadyDOM.wrap
    : window.ShadyDOM
    ? (t) => ShadyDOM.patch(t)
    : (t) => t;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function jt(t) {
  return t.indexOf('.') >= 0;
}
function Bt(t) {
  let e = t.indexOf('.');
  return -1 === e ? t : t.slice(0, e);
}
function It(t, e) {
  return 0 === t.indexOf(e + '.');
}
function Rt(t, e) {
  return 0 === e.indexOf(t + '.');
}
function Ft(t, e, i) {
  return e + i.slice(t.length);
}
function Ut(t) {
  if (Array.isArray(t)) {
    let e = [];
    for (let i = 0; i < t.length; i++) {
      let s = t[i].toString().split('.');
      for (let t = 0; t < s.length; t++) e.push(s[t]);
    }
    return e.join('.');
  }
  return t;
}
function Kt(t) {
  return Array.isArray(t) ? Ut(t).split('.') : t.toString().split('.');
}
function qt(t, e, i) {
  let s = t,
    n = Kt(e);
  for (let t = 0; t < n.length; t++) {
    if (!s) return;
    s = s[n[t]];
  }
  return i && (i.path = n.join('.')), s;
}
function Jt(t, e, i) {
  let s = t,
    n = Kt(e),
    r = n[n.length - 1];
  if (n.length > 1) {
    for (let t = 0; t < n.length - 1; t++) {
      if (((s = s[n[t]]), !s)) return;
    }
    s[r] = i;
  } else s[e] = i;
  return n.join('.');
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const Zt = {},
  Wt = /-[a-z]/g,
  Gt = /([A-Z])/g;
function Yt(t) {
  return (
    Zt[t] ||
    (Zt[t] = t.indexOf('-') < 0 ? t : t.replace(Wt, (t) => t[1].toUpperCase()))
  );
}
function Qt(t) {
  return Zt[t] || (Zt[t] = t.replace(Gt, '-$1').toLowerCase());
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ let Xt = 0,
  te = 0,
  ee = [],
  ie = 0,
  se = !1,
  ne = document.createTextNode('');
new window.MutationObserver(function () {
  se = !1;
  const t = ee.length;
  for (let e = 0; e < t; e++) {
    let t = ee[e];
    if (t)
      try {
        t();
      } catch (t) {
        setTimeout(() => {
          throw t;
        });
      }
  }
  ee.splice(0, t), (te += t);
}).observe(ne, {characterData: !0});
const re = {
    after: (t) => ({
      run: (e) => window.setTimeout(e, t),
      cancel(t) {
        window.clearTimeout(t);
      },
    }),
    run: (t, e) => window.setTimeout(t, e),
    cancel(t) {
      window.clearTimeout(t);
    },
  },
  oe = {
    run: (t) => window.requestAnimationFrame(t),
    cancel(t) {
      window.cancelAnimationFrame(t);
    },
  },
  he = {
    run: (t) => (se || ((se = !0), (ne.textContent = ie++)), ee.push(t), Xt++),
    cancel(t) {
      const e = t - te;
      if (e >= 0) {
        if (!ee[e]) throw new Error('invalid async handle: ' + t);
        ee[e] = null;
      }
    },
  },
  ae = he,
  le = xt(
    (t) =>
      class extends t {
        static createProperties(t) {
          const e = this.prototype;
          for (let i in t) i in e || e._createPropertyAccessor(i);
        }
        static attributeNameForProperty(t) {
          return t.toLowerCase();
        }
        static typeForProperty(t) {}
        _createPropertyAccessor(t, e) {
          this._addPropertyToAttributeMap(t),
            this.hasOwnProperty(
              JSCompiler_renameProperty('__dataHasAccessor', this)
            ) || (this.V = Object.assign({}, this.V)),
            this.V[t] || ((this.V[t] = !0), this._definePropertyAccessor(t, e));
        }
        _addPropertyToAttributeMap(t) {
          this.hasOwnProperty(
            JSCompiler_renameProperty('__dataAttributes', this)
          ) || (this.L = Object.assign({}, this.L));
          let e = this.L[t];
          return (
            e ||
              ((e = this.constructor.attributeNameForProperty(t)),
              (this.L[e] = t)),
            e
          );
        }
        _definePropertyAccessor(t, e) {
          Object.defineProperty(this, t, {
            get() {
              return this.P[t];
            },
            set: e
              ? function () {}
              : function (e) {
                  this._setPendingProperty(t, e, !0) &&
                    this._invalidateProperties();
                },
          });
        }
        constructor() {
          super(),
            (this.O = !1),
            (this.N = !1),
            (this.D = !1),
            (this.P = {}),
            (this.j = null),
            (this.B = null),
            (this.I = null),
            (this.R = 0),
            (this.F = !1),
            this._initializeProperties();
        }
        ready() {
          (this.N = !0), this._flushProperties();
        }
        _initializeProperties() {
          for (let t in this.V)
            this.hasOwnProperty(t) &&
              ((this.I = this.I || {}), (this.I[t] = this[t]), delete this[t]);
        }
        _initializeInstanceProperties(t) {
          Object.assign(this, t);
        }
        _setProperty(t, e) {
          this._setPendingProperty(t, e) && this._invalidateProperties();
        }
        _getProperty(t) {
          return this.P[t];
        }
        _setPendingProperty(t, e, i) {
          let s = this.P[t],
            n = this._shouldPropertyChange(t, e, s);
          return (
            n &&
              (this.j || ((this.j = {}), (this.B = {})),
              this.B && !(t in this.B) && (this.B[t] = s),
              (this.P[t] = e),
              (this.j[t] = e)),
            n
          );
        }
        _isPropertyPending(t) {
          return !(!this.j || !this.j.hasOwnProperty(t));
        }
        _invalidateProperties() {
          !this.D &&
            this.N &&
            ((this.D = !0),
            ae.run(() => {
              this.D && ((this.D = !1), this._flushProperties());
            }));
        }
        _enableProperties() {
          this.O ||
            ((this.O = !0),
            this.I &&
              (this._initializeInstanceProperties(this.I), (this.I = null)),
            this.ready());
        }
        _flushProperties() {
          this.R++;
          const t = this.P,
            e = this.j,
            i = this.B;
          this._shouldPropertiesChange(t, e, i) &&
            ((this.j = null),
            (this.B = null),
            this._propertiesChanged(t, e, i)),
            this.R--;
        }
        _shouldPropertiesChange(t, e, i) {
          return Boolean(e);
        }
        _propertiesChanged(t, e, i) {}
        _shouldPropertyChange(t, e, i) {
          return i !== e && (i == i || e == e);
        }
        attributeChangedCallback(t, e, i, s) {
          e !== i && this._attributeToProperty(t, i),
            super.attributeChangedCallback &&
              super.attributeChangedCallback(t, e, i, s);
        }
        _attributeToProperty(t, e, i) {
          if (!this.F) {
            const s = this.L,
              n = (s && s[t]) || t;
            this[n] = this._deserializeValue(
              e,
              i || this.constructor.typeForProperty(n)
            );
          }
        }
        _propertyToAttribute(t, e, i) {
          (this.F = !0),
            (i = arguments.length < 3 ? this[t] : i),
            this._valueToNodeAttribute(
              this,
              i,
              e || this.constructor.attributeNameForProperty(t)
            ),
            (this.F = !1);
        }
        _valueToNodeAttribute(t, e, i) {
          const s = this._serializeValue(e);
          ('class' !== i && 'name' !== i && 'slot' !== i) || (t = Dt(t)),
            void 0 === s ? t.removeAttribute(i) : t.setAttribute(i, s);
        }
        _serializeValue(t) {
          switch (typeof t) {
            case 'boolean':
              return t ? '' : void 0;
            default:
              return null != t ? t.toString() : void 0;
          }
        }
        _deserializeValue(t, e) {
          switch (e) {
            case Boolean:
              return null !== t;
            case Number:
              return Number(t);
            default:
              return t;
          }
        }
      }
  ),
  ce = {};
let pe = HTMLElement.prototype;
for (; pe; ) {
  let t = Object.getOwnPropertyNames(pe);
  for (let e = 0; e < t.length; e++) ce[t[e]] = !0;
  pe = Object.getPrototypeOf(pe);
}
const de = xt((t) => {
    const e = le(t);
    return class extends e {
      static createPropertiesForAttributes() {
        let t = this.observedAttributes;
        for (let e = 0; e < t.length; e++)
          this.prototype._createPropertyAccessor(Yt(t[e]));
      }
      static attributeNameForProperty(t) {
        return Qt(t);
      }
      _initializeProperties() {
        this.U && (this._initializeProtoProperties(this.U), (this.U = null)),
          super._initializeProperties();
      }
      _initializeProtoProperties(t) {
        for (let e in t) this._setProperty(e, t[e]);
      }
      _ensureAttribute(t, e) {
        const i = this;
        i.hasAttribute(t) || this._valueToNodeAttribute(i, e, t);
      }
      _serializeValue(t) {
        switch (typeof t) {
          case 'object':
            if (t instanceof Date) return t.toString();
            if (t)
              try {
                return JSON.stringify(t);
              } catch (t) {
                return '';
              }
          default:
            return super._serializeValue(t);
        }
      }
      _deserializeValue(t, e) {
        let i;
        switch (e) {
          case Object:
            try {
              i = JSON.parse(t);
            } catch (e) {
              i = t;
            }
            break;
          case Array:
            try {
              i = JSON.parse(t);
            } catch (e) {
              (i = null),
                console.warn(
                  `Polymer::Attributes: couldn't decode Array as JSON: ${t}`
                );
            }
            break;
          case Date:
            (i = isNaN(t) ? String(t) : Number(t)), (i = new Date(i));
            break;
          default:
            i = super._deserializeValue(t, e);
        }
        return i;
      }
      _definePropertyAccessor(t, e) {
        !(function (t, e) {
          if (!ce[e]) {
            let i = t[e];
            void 0 !== i &&
              (t.P
                ? t._setPendingProperty(e, i)
                : (t.U
                    ? t.hasOwnProperty(
                        JSCompiler_renameProperty('__dataProto', t)
                      ) || (t.U = Object.create(t.U))
                    : (t.U = {}),
                  (t.U[e] = i)));
          }
        })(this, t),
          super._definePropertyAccessor(t, e);
      }
      _hasAccessor(t) {
        return this.V && this.V[t];
      }
      _isPropertyPending(t) {
        return Boolean(this.j && t in this.j);
      }
    };
  }),
  ue = {'dom-if': !0, 'dom-repeat': !0};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ let fe = !1,
  ve = !1;
function ge(t) {
  (function () {
    if (!fe) {
      fe = !0;
      const t = document.createElement('textarea');
      (t.placeholder = 'a'), (ve = t.placeholder === t.textContent);
    }
    return ve;
  })() &&
    'textarea' === t.localName &&
    t.placeholder &&
    t.placeholder === t.textContent &&
    (t.textContent = null);
}
function me(t) {
  let e = t.getAttribute('is');
  if (e && ue[e]) {
    let i = t;
    for (
      i.removeAttribute('is'),
        t = i.ownerDocument.createElement(e),
        i.parentNode.replaceChild(t, i),
        t.appendChild(i);
      i.attributes.length;

    )
      t.setAttribute(i.attributes[0].name, i.attributes[0].value),
        i.removeAttribute(i.attributes[0].name);
  }
  return t;
}
function be(t, e) {
  let i = e.parentInfo && be(t, e.parentInfo);
  if (!i) return t;
  for (let t = i.firstChild, s = 0; t; t = t.nextSibling)
    if (e.parentIndex === s++) return t;
}
function ye(t, e, i, s) {
  s.id && (e[s.id] = i);
}
function ze(t, e, i) {
  if (i.events && i.events.length)
    for (let s, n = 0, r = i.events; n < r.length && (s = r[n]); n++)
      t._addMethodEventListenerToNode(e, s.name, s.value, t);
}
function we(t, e, i, s) {
  i.templateInfo &&
    ((e._templateInfo = i.templateInfo), (e._parentTemplateInfo = s));
}
const _e = xt(
  (t) =>
    class extends t {
      static _parseTemplate(t, e) {
        if (!t._templateInfo) {
          let i = (t._templateInfo = {});
          (i.nodeInfoList = []),
            (i.nestedTemplate = Boolean(e)),
            (i.stripWhiteSpace =
              (e && e.stripWhiteSpace) || t.hasAttribute('strip-whitespace')),
            this._parseTemplateContent(t, i, {parent: null});
        }
        return t._templateInfo;
      }
      static _parseTemplateContent(t, e, i) {
        return this._parseTemplateNode(t.content, e, i);
      }
      static _parseTemplateNode(t, e, i) {
        let s = !1,
          n = t;
        return (
          'template' != n.localName || n.hasAttribute('preserve-content')
            ? 'slot' === n.localName && (e.hasInsertionPoint = !0)
            : (s = this._parseTemplateNestedTemplate(n, e, i) || s),
          ge(n),
          n.firstChild && this._parseTemplateChildNodes(n, e, i),
          n.hasAttributes &&
            n.hasAttributes() &&
            (s = this._parseTemplateNodeAttributes(n, e, i) || s),
          s || i.noted
        );
      }
      static _parseTemplateChildNodes(t, e, i) {
        if ('script' !== t.localName && 'style' !== t.localName)
          for (let s, n = t.firstChild, r = 0; n; n = s) {
            if (
              ('template' == n.localName && (n = me(n)),
              (s = n.nextSibling),
              n.nodeType === Node.TEXT_NODE)
            ) {
              let i = s;
              for (; i && i.nodeType === Node.TEXT_NODE; )
                (n.textContent += i.textContent),
                  (s = i.nextSibling),
                  t.removeChild(i),
                  (i = s);
              if (e.stripWhiteSpace && !n.textContent.trim()) {
                t.removeChild(n);
                continue;
              }
            }
            let o = {parentIndex: r, parentInfo: i};
            this._parseTemplateNode(n, e, o) &&
              (o.infoIndex = e.nodeInfoList.push(o) - 1),
              n.parentNode && r++;
          }
      }
      static _parseTemplateNestedTemplate(t, e, i) {
        let s = t,
          n = this._parseTemplate(s, e);
        return (
          (n.content =
            s.content.ownerDocument.createDocumentFragment()).appendChild(
            s.content
          ),
          (i.templateInfo = n),
          !0
        );
      }
      static _parseTemplateNodeAttributes(t, e, i) {
        let s = !1,
          n = Array.from(t.attributes);
        for (let r, o = n.length - 1; (r = n[o]); o--)
          s = this._parseTemplateNodeAttribute(t, e, i, r.name, r.value) || s;
        return s;
      }
      static _parseTemplateNodeAttribute(t, e, i, s, n) {
        return 'on-' === s.slice(0, 3)
          ? (t.removeAttribute(s),
            (i.events = i.events || []),
            i.events.push({name: s.slice(3), value: n}),
            !0)
          : 'id' === s && ((i.id = n), !0);
      }
      static _contentForTemplate(t) {
        let e = t._templateInfo;
        return (e && e.content) || t.content;
      }
      _stampTemplate(t, e) {
        t &&
          !t.content &&
          window.HTMLTemplateElement &&
          HTMLTemplateElement.decorate &&
          HTMLTemplateElement.decorate(t);
        let i = (e = e || this.constructor._parseTemplate(t)).nodeInfoList,
          s = e.content || t.content,
          n = document.importNode(s, !0);
        n.K = !e.hasInsertionPoint;
        let r = (n.nodeList = new Array(i.length));
        n.$ = {};
        for (let t, s = 0, o = i.length; s < o && (t = i[s]); s++) {
          let i = (r[s] = be(n, t));
          ye(0, n.$, i, t), we(0, i, t, e), ze(this, i, t);
        }
        return (n = n), n;
      }
      _addMethodEventListenerToNode(t, e, i, s) {
        let n = (function (t, e, i) {
          return (
            (t = t._methodHost || t),
            function (e) {
              t[i]
                ? t[i](e, e.detail)
                : console.warn('listener method `' + i + '` not defined');
            }
          );
        })((s = s || t), 0, i);
        return this._addEventListenerToNode(t, e, n), n;
      }
      _addEventListenerToNode(t, e, i) {
        t.addEventListener(e, i);
      }
      _removeEventListenerFromNode(t, e, i) {
        t.removeEventListener(e, i);
      }
    }
);
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */ let Me = 0;
const He = [],
  xe = {
    COMPUTE: '__computeEffects',
    REFLECT: '__reflectEffects',
    NOTIFY: '__notifyEffects',
    PROPAGATE: '__propagateEffects',
    OBSERVE: '__observeEffects',
    READ_ONLY: '__readOnly',
  },
  ke = /[A-Z]/;
function Ce(t, e, i) {
  let s = t[e];
  if (s) {
    if (!t.hasOwnProperty(e) && ((s = t[e] = Object.create(t[e])), i))
      for (let t in s) {
        let e = s[t],
          i = (s[t] = Array(e.length));
        for (let t = 0; t < e.length; t++) i[t] = e[t];
      }
  } else s = t[e] = {};
  return s;
}
function Ve(t, e, i, s, n, r) {
  if (e) {
    let o = !1;
    const h = Me++;
    for (let a in i) {
      let l = e[n ? Bt(a) : a];
      if (l)
        for (let e, c = 0, p = l.length; c < p && (e = l[c]); c++)
          (e.info && e.info.lastRun === h) ||
            (n && !Se(a, e.trigger)) ||
            (e.info && (e.info.lastRun = h),
            e.fn(t, a, i, s, e.info, n, r),
            (o = !0));
    }
    return o;
  }
  return !1;
}
function Le(t, e, i, s, n, r, o, h) {
  let a = !1,
    l = e[o ? Bt(s) : s];
  if (l)
    for (let e, c = 0, p = l.length; c < p && (e = l[c]); c++)
      (e.info && e.info.lastRun === i) ||
        (o && !Se(s, e.trigger)) ||
        (e.info && (e.info.lastRun = i),
        e.fn(t, s, n, r, e.info, o, h),
        (a = !0));
  return a;
}
function Se(t, e) {
  if (e) {
    let i = e.name;
    return (
      i == t || !(!e.structured || !It(i, t)) || !(!e.wildcard || !Rt(i, t))
    );
  }
  return !0;
}
function Te(t, e, i, s, n) {
  let r = 'string' == typeof n.method ? t[n.method] : n.method,
    o = n.property;
  r
    ? r.call(t, t.P[o], s[o])
    : n.dynamicFn ||
      console.warn('observer method `' + n.method + '` not defined');
}
function Ae(t, e, i) {
  let s = Bt(e);
  if (s !== e) {
    return Ee(t, Qt(s) + '-changed', i[e], e), !0;
  }
  return !1;
}
function Ee(t, e, i, s) {
  let n = {value: i, queueProperty: !0};
  s && (n.path = s), Dt(t).dispatchEvent(new CustomEvent(e, {detail: n}));
}
function Pe(t, e, i, s, n, r) {
  let o = (r ? Bt(e) : e) != e ? e : null,
    h = o ? qt(t, o) : t.P[e];
  o && void 0 === h && (h = i[e]), Ee(t, n.eventName, h, o);
}
function Oe(t, e, i, s, n) {
  let r = t.P[e];
  ct && (r = ct(r, n.attrName, 'attribute', t)),
    t._propertyToAttribute(e, n.attrName, r);
}
function $e(t, e, i, s) {
  let n = t[xe.COMPUTE];
  if (n)
    if (bt) {
      Me++;
      const r = (function (t) {
          let e = t.constructor.q;
          if (!e) {
            e = new Map();
            const i = t[xe.COMPUTE];
            let s,
              {
                counts: n,
                ready: r,
                total: o,
              } = (function (t) {
                const e = t.J,
                  i = {},
                  s = t[xe.COMPUTE],
                  n = [];
                let r = 0;
                for (let t in e) {
                  const s = e[t];
                  r += i[t] =
                    s.args.filter((t) => !t.literal).length +
                    (s.dynamicFn ? 1 : 0);
                }
                for (let t in s) e[t] || n.push(t);
                return {counts: i, ready: n, total: r};
              })(t);
            for (; (s = r.shift()); ) {
              e.set(s, e.size);
              const t = i[s];
              t &&
                t.forEach((t) => {
                  const e = t.info.methodInfo;
                  --o, 0 == --n[e] && r.push(e);
                });
            }
            if (0 !== o) {
              const e = t;
              console.warn(
                `Computed graph for ${e.localName} incomplete; circular?`
              );
            }
            t.constructor.q = e;
          }
          return e;
        })(t),
        o = [];
      for (let t in e) De(t, n, o, r, s);
      let h;
      for (; (h = o.shift()); )
        je(t, '', e, i, h) && De(h.methodInfo, n, o, r, s);
      Object.assign(i, t.B), Object.assign(e, t.j), (t.j = null);
    } else {
      let r = e;
      for (; Ve(t, n, r, i, s); )
        Object.assign(i, t.B), Object.assign(e, t.j), (r = t.j), (t.j = null);
    }
}
const Ne = (t, e, i) => {
    let s = 0,
      n = e.length - 1,
      r = -1;
    for (; s <= n; ) {
      const o = (s + n) >> 1,
        h = i.get(e[o].methodInfo) - i.get(t.methodInfo);
      if (h < 0) s = o + 1;
      else {
        if (!(h > 0)) {
          r = o;
          break;
        }
        n = o - 1;
      }
    }
    r < 0 && (r = n + 1), e.splice(r, 0, t);
  },
  De = (t, e, i, s, n) => {
    const r = e[n ? Bt(t) : t];
    if (r)
      for (let e = 0; e < r.length; e++) {
        const o = r[e];
        o.info.lastRun === Me ||
          (n && !Se(t, o.trigger)) ||
          ((o.info.lastRun = Me), Ne(o.info, i, s));
      }
  };
function je(t, e, i, s, n) {
  let r = qe(t, e, i, s, n);
  if (r === He) return !1;
  let o = n.methodInfo;
  return t.V && t.V[o] ? t._setPendingProperty(o, r, !0) : ((t[o] = r), !1);
}
function Be(t, e, i, s, n, r, o) {
  i.bindings = i.bindings || [];
  let h = {
    kind: s,
    target: n,
    parts: r,
    literal: o,
    isCompound: 1 !== r.length,
  };
  if (
    (i.bindings.push(h),
    (function (t) {
      return (
        Boolean(t.target) &&
        'attribute' != t.kind &&
        'text' != t.kind &&
        !t.isCompound &&
        '{' === t.parts[0].mode
      );
    })(h))
  ) {
    let {event: t, negate: e} = h.parts[0];
    (h.listenerEvent = t || Qt(n) + '-changed'), (h.listenerNegate = e);
  }
  let a = e.nodeInfoList.length;
  for (let i = 0; i < h.parts.length; i++) {
    let s = h.parts[i];
    (s.compoundIndex = i), Ie(t, e, h, s, a);
  }
}
function Ie(t, e, i, s, n) {
  if (!s.literal)
    if ('attribute' === i.kind && '-' === i.target[0])
      console.warn(
        'Cannot set attribute ' +
          i.target +
          ' because "-" is not a valid attribute starting character'
      );
    else {
      let r = s.dependencies,
        o = {index: n, binding: i, part: s, evaluator: t};
      for (let i = 0; i < r.length; i++) {
        let s = r[i];
        'string' == typeof s && ((s = Ye(s)), (s.wildcard = !0)),
          t._addTemplatePropertyEffect(e, s.rootProperty, {
            fn: Re,
            info: o,
            trigger: s,
          });
      }
    }
}
function Re(t, e, i, s, n, r, o) {
  let h = o[n.index],
    a = n.binding,
    l = n.part;
  if (
    r &&
    l.source &&
    e.length > l.source.length &&
    'property' == a.kind &&
    !a.isCompound &&
    h.Z &&
    h.V &&
    h.V[a.target]
  ) {
    let s = i[e];
    (e = Ft(l.source, a.target, e)),
      h._setPendingPropertyOrPath(e, s, !1, !0) && t._enqueueClient(h);
  } else {
    let o = n.evaluator._evaluateBinding(t, l, e, i, s, r);
    o !== He &&
      (function (t, e, i, s, n) {
        (n = (function (t, e, i, s) {
          if (i.isCompound) {
            let n = t.W[i.target];
            (n[s.compoundIndex] = e), (e = n.join(''));
          }
          'attribute' !== i.kind &&
            (('textContent' !== i.target &&
              ('value' !== i.target ||
                ('input' !== t.localName && 'textarea' !== t.localName))) ||
              (e = null == e ? '' : e));
          return e;
        })(e, n, i, s)),
          ct && (n = ct(n, i.target, i.kind, e));
        if ('attribute' == i.kind) t._valueToNodeAttribute(e, n, i.target);
        else {
          let s = i.target;
          e.Z && e.V && e.V[s]
            ? (e[xe.READ_ONLY] && e[xe.READ_ONLY][s]) ||
              (e._setPendingProperty(s, n) && t._enqueueClient(e))
            : t._setUnmanagedPropertyToNode(e, s, n);
        }
      })(t, h, a, l, o);
  }
}
function Fe(t, e) {
  if (e.isCompound) {
    let i = t.W || (t.W = {}),
      s = e.parts,
      n = new Array(s.length);
    for (let t = 0; t < s.length; t++) n[t] = s[t].literal;
    let r = e.target;
    (i[r] = n),
      e.literal &&
        'property' == e.kind &&
        ('className' === r && (t = Dt(t)), (t[r] = e.literal));
  }
}
function Ue(t, e, i) {
  if (i.listenerEvent) {
    let s = i.parts[0];
    t.addEventListener(i.listenerEvent, function (t) {
      !(function (t, e, i, s, n) {
        let r,
          o = t.detail,
          h = o && o.path;
        h ? ((s = Ft(i, s, h)), (r = o && o.value)) : (r = t.currentTarget[i]),
          (r = n ? !r : r),
          (e[xe.READ_ONLY] && e[xe.READ_ONLY][s]) ||
            !e._setPendingPropertyOrPath(s, r, !0, Boolean(h)) ||
            (o && o.queueProperty) ||
            e._invalidateProperties();
      })(t, e, i.target, s.source, s.negate);
    });
  }
}
function Ke(t, e, i, s, n, r) {
  r = e.static || (r && ('object' != typeof r || r[e.methodName]));
  let o = {methodName: e.methodName, args: e.args, methodInfo: n, dynamicFn: r};
  for (let n, r = 0; r < e.args.length && (n = e.args[r]); r++)
    n.literal ||
      t._addPropertyEffect(n.rootProperty, i, {fn: s, info: o, trigger: n});
  return r && t._addPropertyEffect(e.methodName, i, {fn: s, info: o}), o;
}
function qe(t, e, i, s, n) {
  let r = t._methodHost || t,
    o = r[n.methodName];
  if (o) {
    let s = t._marshalArgs(n.args, e, i);
    return s === He ? He : o.apply(r, s);
  }
  n.dynamicFn || console.warn('method `' + n.methodName + '` not defined');
}
const Je = [],
  Ze = new RegExp(
    '(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*))*)?)\\)\\s*)?)(?:]]|}})',
    'g'
  );
function We(t) {
  let e = '';
  for (let i = 0; i < t.length; i++) {
    e += t[i].literal || '';
  }
  return e;
}
function Ge(t) {
  let e = t.match(/([^\s]+?)\(([\s\S]*)\)/);
  if (e) {
    let t = {methodName: e[1], static: !0, args: Je};
    if (e[2].trim()) {
      return (function (t, e) {
        return (
          (e.args = t.map(function (t) {
            let i = Ye(t);
            return i.literal || (e.static = !1), i;
          }, this)),
          e
        );
      })(e[2].replace(/\\,/g, '&comma;').split(','), t);
    }
    return t;
  }
  return null;
}
function Ye(t) {
  let e = t
      .trim()
      .replace(/&comma;/g, ',')
      .replace(/\\(.)/g, '$1'),
    i = {name: e, value: '', literal: !1},
    s = e[0];
  switch (('-' === s && (s = e[1]), s >= '0' && s <= '9' && (s = '#'), s)) {
    case "'":
    case '"':
      (i.value = e.slice(1, -1)), (i.literal = !0);
      break;
    case '#':
      (i.value = Number(e)), (i.literal = !0);
  }
  return (
    i.literal ||
      ((i.rootProperty = Bt(e)),
      (i.structured = jt(e)),
      i.structured &&
        ((i.wildcard = '.*' == e.slice(-2)),
        i.wildcard && (i.name = e.slice(0, -2)))),
    i
  );
}
function Qe(t, e, i) {
  let s = qt(t, i);
  return void 0 === s && (s = e[i]), s;
}
function Xe(t, e, i, s) {
  const n = {indexSplices: s};
  mt && !t._overrideLegacyUndefined && (e.splices = n),
    t.notifyPath(i + '.splices', n),
    t.notifyPath(i + '.length', e.length),
    mt && !t._overrideLegacyUndefined && (n.indexSplices = []);
}
function ti(t, e, i, s, n, r) {
  Xe(t, e, i, [
    {index: s, addedCount: n, removed: r, object: e, type: 'splice'},
  ]);
}
const ei = xt((t) => {
    const e = _e(de(t));
    return class extends e {
      constructor() {
        super(),
          (this.Z = !0),
          this.G,
          this.Y,
          this.X,
          this.tt,
          this.et,
          this.W,
          this.it,
          this.st,
          this.nt,
          this.P,
          this.j,
          this.B,
          this.rt,
          this.J,
          this.ot,
          this.ht,
          this.at,
          this.lt,
          this.ct,
          this.dt,
          this._overrideLegacyUndefined;
      }
      get PROPERTY_EFFECT_TYPES() {
        return xe;
      }
      _initializeProperties() {
        super._initializeProperties(),
          this._registerHost(),
          (this.G = !1),
          (this.Y = null),
          (this.X = null),
          (this.tt = null),
          (this.et = !1),
          (this.W = this.W || null),
          (this.it = this.it || null),
          (this.st = {}),
          (this.nt = !1);
      }
      _registerHost() {
        if (ii.length) {
          let t = ii[ii.length - 1];
          t._enqueueClient(this), (this.it = t);
        }
      }
      _initializeProtoProperties(t) {
        (this.P = Object.create(t)), (this.j = Object.create(t)), (this.B = {});
      }
      _initializeInstanceProperties(t) {
        let e = this[xe.READ_ONLY];
        for (let i in t)
          (e && e[i]) ||
            ((this.j = this.j || {}),
            (this.B = this.B || {}),
            (this.P[i] = this.j[i] = t[i]));
      }
      _addPropertyEffect(t, e, i) {
        this._createPropertyAccessor(t, e == xe.READ_ONLY);
        let s = Ce(this, e, !0)[t];
        s || (s = this[e][t] = []), s.push(i);
      }
      _removePropertyEffect(t, e, i) {
        let s = Ce(this, e, !0)[t],
          n = s.indexOf(i);
        n >= 0 && s.splice(n, 1);
      }
      _hasPropertyEffect(t, e) {
        let i = this[e];
        return Boolean(i && i[t]);
      }
      _hasReadOnlyEffect(t) {
        return this._hasPropertyEffect(t, xe.READ_ONLY);
      }
      _hasNotifyEffect(t) {
        return this._hasPropertyEffect(t, xe.NOTIFY);
      }
      _hasReflectEffect(t) {
        return this._hasPropertyEffect(t, xe.REFLECT);
      }
      _hasComputedEffect(t) {
        return this._hasPropertyEffect(t, xe.COMPUTE);
      }
      _setPendingPropertyOrPath(t, e, i, s) {
        if (s || Bt(Array.isArray(t) ? t[0] : t) !== t) {
          if (!s) {
            let i = qt(this, t);
            if (!(t = Jt(this, t, e)) || !super._shouldPropertyChange(t, e, i))
              return !1;
          }
          if (((this.et = !0), this._setPendingProperty(t, e, i)))
            return (
              (function (t, e, i) {
                let s = t.tt;
                if (s) {
                  let n;
                  for (let r in s) {
                    let o = s[r];
                    Rt(r, e)
                      ? ((n = Ft(r, o, e)),
                        t._setPendingPropertyOrPath(n, i, !0, !0))
                      : Rt(o, e) &&
                        ((n = Ft(o, r, e)),
                        t._setPendingPropertyOrPath(n, i, !0, !0));
                  }
                }
              })(this, t, e),
              !0
            );
        } else {
          if (this.V && this.V[t]) return this._setPendingProperty(t, e, i);
          this[t] = e;
        }
        return !1;
      }
      _setUnmanagedPropertyToNode(t, e, i) {
        (i === t[e] && 'object' != typeof i) ||
          ('className' === e && (t = Dt(t)), (t[e] = i));
      }
      _setPendingProperty(t, e, i) {
        let s = this.et && jt(t),
          n = s ? this.st : this.P;
        return (
          !!this._shouldPropertyChange(t, e, n[t]) &&
          (this.j || ((this.j = {}), (this.B = {})),
          t in this.B || (this.B[t] = this.P[t]),
          s ? (this.st[t] = e) : (this.P[t] = e),
          (this.j[t] = e),
          (s || (this[xe.NOTIFY] && this[xe.NOTIFY][t])) &&
            ((this.X = this.X || {}), (this.X[t] = i)),
          !0)
        );
      }
      _setProperty(t, e) {
        this._setPendingProperty(t, e, !0) && this._invalidateProperties();
      }
      _invalidateProperties() {
        this.N && this._flushProperties();
      }
      _enqueueClient(t) {
        (this.Y = this.Y || []), t !== this && this.Y.push(t);
      }
      _flushClients() {
        this.G
          ? this.ft()
          : ((this.G = !0), this._readyClients(), (this.N = !0));
      }
      ft() {
        let t = this.Y;
        if (t) {
          this.Y = null;
          for (let e = 0; e < t.length; e++) {
            let i = t[e];
            i.O ? i.j && i._flushProperties() : i._enableProperties();
          }
        }
      }
      _readyClients() {
        this.ft();
      }
      setProperties(t, e) {
        for (let i in t)
          (!e && this[xe.READ_ONLY] && this[xe.READ_ONLY][i]) ||
            this._setPendingPropertyOrPath(i, t[i], !0);
        this._invalidateProperties();
      }
      ready() {
        this._flushProperties(),
          this.G || this._flushClients(),
          this.j && this._flushProperties();
      }
      _propertiesChanged(t, e, i) {
        let s,
          n = this.et;
        (this.et = !1),
          $e(this, e, i, n),
          (s = this.X),
          (this.X = null),
          this._propagatePropertyChanges(e, i, n),
          this._flushClients(),
          Ve(this, this[xe.REFLECT], e, i, n),
          Ve(this, this[xe.OBSERVE], e, i, n),
          s &&
            (function (t, e, i, s, n) {
              let r,
                o,
                h = t[xe.NOTIFY],
                a = Me++;
              for (let o in e)
                e[o] &&
                  ((h && Le(t, h, a, o, i, s, n)) || (n && Ae(t, o, i))) &&
                  (r = !0);
              r &&
                (o = t.it) &&
                o._invalidateProperties &&
                o._invalidateProperties();
            })(this, s, e, i, n),
          1 == this.R && (this.st = {});
      }
      _propagatePropertyChanges(t, e, i) {
        this[xe.PROPAGATE] && Ve(this, this[xe.PROPAGATE], t, e, i),
          this.dt && this._runEffectsForTemplate(this.dt, t, e, i);
      }
      _runEffectsForTemplate(t, e, i, s) {
        const n = (e, s) => {
          Ve(this, t.propertyEffects, e, i, s, t.nodeList);
          for (let n = t.firstChild; n; n = n.nextSibling)
            this._runEffectsForTemplate(n, e, i, s);
        };
        t.runEffects ? t.runEffects(n, e, s) : n(e, s);
      }
      linkPaths(t, e) {
        (t = Ut(t)), (e = Ut(e)), (this.tt = this.tt || {}), (this.tt[t] = e);
      }
      unlinkPaths(t) {
        (t = Ut(t)), this.tt && delete this.tt[t];
      }
      notifySplices(t, e) {
        let i = {path: ''};
        Xe(this, qt(this, t, i), i.path, e);
      }
      get(t, e) {
        return qt(e || this, t);
      }
      set(t, e, i) {
        i
          ? Jt(i, t, e)
          : (this[xe.READ_ONLY] && this[xe.READ_ONLY][t]) ||
            (this._setPendingPropertyOrPath(t, e, !0) &&
              this._invalidateProperties());
      }
      push(t, ...e) {
        let i = {path: ''},
          s = qt(this, t, i),
          n = s.length,
          r = s.push(...e);
        return e.length && ti(this, s, i.path, n, e.length, []), r;
      }
      pop(t) {
        let e = {path: ''},
          i = qt(this, t, e),
          s = Boolean(i.length),
          n = i.pop();
        return s && ti(this, i, e.path, i.length, 0, [n]), n;
      }
      splice(t, e, i, ...s) {
        let n,
          r = {path: ''},
          o = qt(this, t, r);
        return (
          e < 0 ? (e = o.length - Math.floor(-e)) : e && (e = Math.floor(e)),
          (n = 2 === arguments.length ? o.splice(e) : o.splice(e, i, ...s)),
          (s.length || n.length) && ti(this, o, r.path, e, s.length, n),
          n
        );
      }
      shift(t) {
        let e = {path: ''},
          i = qt(this, t, e),
          s = Boolean(i.length),
          n = i.shift();
        return s && ti(this, i, e.path, 0, 0, [n]), n;
      }
      unshift(t, ...e) {
        let i = {path: ''},
          s = qt(this, t, i),
          n = s.unshift(...e);
        return e.length && ti(this, s, i.path, 0, e.length, []), n;
      }
      notifyPath(t, e) {
        let i;
        if (1 == arguments.length) {
          let s = {path: ''};
          (e = qt(this, t, s)), (i = s.path);
        } else i = Array.isArray(t) ? Ut(t) : t;
        this._setPendingPropertyOrPath(i, e, !0, !0) &&
          this._invalidateProperties();
      }
      _createReadOnlyProperty(t, e) {
        var i;
        this._addPropertyEffect(t, xe.READ_ONLY),
          e &&
            (this['_set' + ((i = t), i[0].toUpperCase() + i.substring(1))] =
              function (e) {
                this._setProperty(t, e);
              });
      }
      _createPropertyObserver(t, e, i) {
        let s = {property: t, method: e, dynamicFn: Boolean(i)};
        this._addPropertyEffect(t, xe.OBSERVE, {
          fn: Te,
          info: s,
          trigger: {name: t},
        }),
          i &&
            this._addPropertyEffect(e, xe.OBSERVE, {
              fn: Te,
              info: s,
              trigger: {name: e},
            });
      }
      _createMethodObserver(t, e) {
        let i = Ge(t);
        if (!i) throw new Error("Malformed observer expression '" + t + "'");
        Ke(this, i, xe.OBSERVE, qe, null, e);
      }
      _createNotifyingProperty(t) {
        this._addPropertyEffect(t, xe.NOTIFY, {
          fn: Pe,
          info: {eventName: Qt(t) + '-changed', property: t},
        });
      }
      _createReflectedProperty(t) {
        let e = this.constructor.attributeNameForProperty(t);
        '-' === e[0]
          ? console.warn(
              'Property ' +
                t +
                ' cannot be reflected to attribute ' +
                e +
                ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'
            )
          : this._addPropertyEffect(t, xe.REFLECT, {
              fn: Oe,
              info: {attrName: e},
            });
      }
      _createComputedProperty(t, e, i) {
        let s = Ge(e);
        if (!s) throw new Error("Malformed computed expression '" + e + "'");
        const n = Ke(this, s, xe.COMPUTE, je, t, i);
        Ce(this, '__computeInfo')[t] = n;
      }
      _marshalArgs(t, e, i) {
        const s = this.P,
          n = [];
        for (let r = 0, o = t.length; r < o; r++) {
          let {
            name: o,
            structured: h,
            wildcard: a,
            value: l,
            literal: c,
          } = t[r];
          if (!c)
            if (a) {
              const t = Rt(o, e),
                n = Qe(s, i, t ? e : o);
              l = {path: t ? e : o, value: n, base: t ? qt(s, o) : n};
            } else l = h ? Qe(s, i, o) : s[o];
          if (
            mt &&
            !this._overrideLegacyUndefined &&
            void 0 === l &&
            t.length > 1
          )
            return He;
          n[r] = l;
        }
        return n;
      }
      static addPropertyEffect(t, e, i) {
        this.prototype._addPropertyEffect(t, e, i);
      }
      static createPropertyObserver(t, e, i) {
        this.prototype._createPropertyObserver(t, e, i);
      }
      static createMethodObserver(t, e) {
        this.prototype._createMethodObserver(t, e);
      }
      static createNotifyingProperty(t) {
        this.prototype._createNotifyingProperty(t);
      }
      static createReadOnlyProperty(t, e) {
        this.prototype._createReadOnlyProperty(t, e);
      }
      static createReflectedProperty(t) {
        this.prototype._createReflectedProperty(t);
      }
      static createComputedProperty(t, e, i) {
        this.prototype._createComputedProperty(t, e, i);
      }
      static bindTemplate(t) {
        return this.prototype._bindTemplate(t);
      }
      _bindTemplate(t, e) {
        let i = this.constructor._parseTemplate(t),
          s = this.vt == i;
        if (!s)
          for (let t in i.propertyEffects) this._createPropertyAccessor(t);
        if (e)
          if (((i = Object.create(i)), (i.wasPreBound = s), this.dt)) {
            const e = t._parentTemplateInfo || this.dt,
              s = e.lastChild;
            (i.parent = e),
              (e.lastChild = i),
              (i.previousSibling = s),
              s ? (s.nextSibling = i) : (e.firstChild = i);
          } else this.dt = i;
        else this.vt = i;
        return i;
      }
      static _addTemplatePropertyEffect(t, e, i) {
        (t.hostProps = t.hostProps || {})[e] = !0;
        let s = (t.propertyEffects = t.propertyEffects || {});
        (s[e] = s[e] || []).push(i);
      }
      _stampTemplate(t, e) {
        (e = e || this._bindTemplate(t, !0)), ii.push(this);
        let i = super._stampTemplate(t, e);
        if ((ii.pop(), (e.nodeList = i.nodeList), !e.wasPreBound)) {
          let t = (e.childNodes = []);
          for (let e = i.firstChild; e; e = e.nextSibling) t.push(e);
        }
        return (
          (i.templateInfo = e),
          (function (t, e) {
            let {nodeList: i, nodeInfoList: s} = e;
            if (s.length)
              for (let e = 0; e < s.length; e++) {
                let n = s[e],
                  r = i[e],
                  o = n.bindings;
                if (o)
                  for (let e = 0; e < o.length; e++) {
                    let i = o[e];
                    Fe(r, i), Ue(r, t, i);
                  }
                r.it = t;
              }
          })(this, e),
          this.G &&
            (this._runEffectsForTemplate(e, this.P, null, !1),
            this._flushClients()),
          i
        );
      }
      _removeBoundDom(t) {
        const e = t.templateInfo,
          {previousSibling: i, nextSibling: s, parent: n} = e;
        i ? (i.nextSibling = s) : n && (n.firstChild = s),
          s ? (s.previousSibling = i) : n && (n.lastChild = i),
          (e.nextSibling = e.previousSibling = null);
        let r = e.childNodes;
        for (let t = 0; t < r.length; t++) {
          let e = r[t];
          Dt(Dt(e).parentNode).removeChild(e);
        }
      }
      static _parseTemplateNode(t, i, s) {
        let n = e._parseTemplateNode.call(this, t, i, s);
        if (t.nodeType === Node.TEXT_NODE) {
          let e = this._parseBindings(t.textContent, i);
          e &&
            ((t.textContent = We(e) || ' '),
            Be(this, i, s, 'text', 'textContent', e),
            (n = !0));
        }
        return n;
      }
      static _parseTemplateNodeAttribute(t, i, s, n, r) {
        let o = this._parseBindings(r, i);
        if (o) {
          let e = n,
            r = 'property';
          ke.test(n)
            ? (r = 'attribute')
            : '$' == n[n.length - 1] &&
              ((n = n.slice(0, -1)), (r = 'attribute'));
          let h = We(o);
          return (
            h &&
              'attribute' == r &&
              ('class' == n &&
                t.hasAttribute('class') &&
                (h += ' ' + t.getAttribute(n)),
              t.setAttribute(n, h)),
            'attribute' == r &&
              'disable-upgrade$' == e &&
              t.setAttribute(n, ''),
            'input' === t.localName && 'value' === e && t.setAttribute(e, ''),
            t.removeAttribute(e),
            'property' === r && (n = Yt(n)),
            Be(this, i, s, r, n, o, h),
            !0
          );
        }
        return e._parseTemplateNodeAttribute.call(this, t, i, s, n, r);
      }
      static _parseTemplateNestedTemplate(t, i, s) {
        let n = e._parseTemplateNestedTemplate.call(this, t, i, s);
        const r = t.parentNode,
          o = s.templateInfo,
          h = 'dom-if' === r.localName,
          a = 'dom-repeat' === r.localName;
        yt &&
          (h || a) &&
          (r.removeChild(t),
          ((s = s.parentInfo).templateInfo = o),
          (s.noted = !0),
          (n = !1));
        let l = o.hostProps;
        if (zt && h)
          l &&
            ((i.hostProps = Object.assign(i.hostProps || {}, l)),
            yt || (s.parentInfo.noted = !0));
        else {
          let t = '{';
          for (let e in l) {
            Be(this, i, s, 'property', '_host_' + e, [
              {mode: t, source: e, dependencies: [e], hostProp: !0},
            ]);
          }
        }
        return n;
      }
      static _parseBindings(t, e) {
        let i,
          s = [],
          n = 0;
        for (; null !== (i = Ze.exec(t)); ) {
          i.index > n && s.push({literal: t.slice(n, i.index)});
          let r = i[1][0],
            o = Boolean(i[2]),
            h = i[3].trim(),
            a = !1,
            l = '',
            c = -1;
          '{' == r &&
            (c = h.indexOf('::')) > 0 &&
            ((l = h.substring(c + 2)), (h = h.substring(0, c)), (a = !0));
          let p = Ge(h),
            d = [];
          if (p) {
            let {args: t, methodName: i} = p;
            for (let e = 0; e < t.length; e++) {
              let i = t[e];
              i.literal || d.push(i);
            }
            let s = e.dynamicFns;
            ((s && s[i]) || p.static) && (d.push(i), (p.dynamicFn = !0));
          } else d.push(h);
          s.push({
            source: h,
            mode: r,
            negate: o,
            customEvent: a,
            signature: p,
            dependencies: d,
            event: l,
          }),
            (n = Ze.lastIndex);
        }
        if (n && n < t.length) {
          let e = t.substring(n);
          e && s.push({literal: e});
        }
        return s.length ? s : null;
      }
      static _evaluateBinding(t, e, i, s, n, r) {
        let o;
        return (
          (o = e.signature
            ? qe(t, i, s, 0, e.signature)
            : i != e.source
            ? qt(t, e.source)
            : r && jt(i)
            ? qt(t, i)
            : t.P[i]),
          e.negate && (o = !o),
          o
        );
      }
    };
  }),
  ii = [];
const si = xt((t) => {
    const e = le(t);
    function i(t) {
      const e = Object.getPrototypeOf(t);
      return e.prototype instanceof n ? e : null;
    }
    function s(t) {
      if (!t.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', t))) {
        let e = null;
        if (t.hasOwnProperty(JSCompiler_renameProperty('properties', t))) {
          const i = t.properties;
          i &&
            (e =
              /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
              (function (t) {
                const e = {};
                for (let i in t) {
                  const s = t[i];
                  e[i] = 'function' == typeof s ? {type: s} : s;
                }
                return e;
              })(i));
        }
        t.gt = e;
      }
      return t.gt;
    }
    class n extends e {
      static get observedAttributes() {
        if (
          !this.hasOwnProperty(
            JSCompiler_renameProperty('__observedAttributes', this)
          )
        ) {
          this.prototype;
          const t = this._properties;
          this.bt = t
            ? Object.keys(t).map((t) =>
                this.prototype._addPropertyToAttributeMap(t)
              )
            : [];
        }
        return this.bt;
      }
      static finalize() {
        if (
          !this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))
        ) {
          const t = i(this);
          t && t.finalize(), (this.yt = !0), this._finalizeClass();
        }
      }
      static _finalizeClass() {
        const t = s(this);
        t && this.createProperties(t);
      }
      static get _properties() {
        if (
          !this.hasOwnProperty(JSCompiler_renameProperty('__properties', this))
        ) {
          const t = i(this);
          this.zt = Object.assign({}, t && t._properties, s(this));
        }
        return this.zt;
      }
      static typeForProperty(t) {
        const e = this._properties[t];
        return e && e.type;
      }
      _initializeProperties() {
        this.constructor.finalize(), super._initializeProperties();
      }
      connectedCallback() {
        super.connectedCallback && super.connectedCallback(),
          this._enableProperties();
      }
      disconnectedCallback() {
        super.disconnectedCallback && super.disconnectedCallback();
      }
    }
    return n;
  }),
  ni = window.ShadyCSS && window.ShadyCSS.cssBuild,
  ri = xt((t) => {
    const e = si(ei(t));
    function i(t, e, i, s) {
      i.computed && (i.readOnly = !0),
        i.computed &&
          (t._hasReadOnlyEffect(e)
            ? console.warn(`Cannot redefine computed property '${e}'.`)
            : t._createComputedProperty(e, i.computed, s)),
        i.readOnly && !t._hasReadOnlyEffect(e)
          ? t._createReadOnlyProperty(e, !i.computed)
          : !1 === i.readOnly &&
            t._hasReadOnlyEffect(e) &&
            console.warn(`Cannot make readOnly property '${e}' non-readOnly.`),
        i.reflectToAttribute && !t._hasReflectEffect(e)
          ? t._createReflectedProperty(e)
          : !1 === i.reflectToAttribute &&
            t._hasReflectEffect(e) &&
            console.warn(
              `Cannot make reflected property '${e}' non-reflected.`
            ),
        i.notify && !t._hasNotifyEffect(e)
          ? t._createNotifyingProperty(e)
          : !1 === i.notify &&
            t._hasNotifyEffect(e) &&
            console.warn(`Cannot make notify property '${e}' non-notify.`),
        i.observer && t._createPropertyObserver(e, i.observer, s[i.observer]),
        t._addPropertyToAttributeMap(e);
    }
    function s(t, e, i, s) {
      if (!ni) {
        const n = e.content.querySelectorAll('style'),
          r = Ot(e),
          o = (function (t) {
            let e = Tt(t);
            return e ? $t(e) : [];
          })(i),
          h = e.content.firstElementChild;
        for (let i = 0; i < o.length; i++) {
          let n = o[i];
          (n.textContent = t._processStyleText(n.textContent, s)),
            e.content.insertBefore(n, h);
        }
        let a = 0;
        for (let e = 0; e < r.length; e++) {
          let i = r[e],
            o = n[a];
          o !== i
            ? ((i = i.cloneNode(!0)), o.parentNode.insertBefore(i, o))
            : a++,
            (i.textContent = t._processStyleText(i.textContent, s));
        }
      }
      if (
        (window.ShadyCSS && window.ShadyCSS.prepareTemplate(e, i),
        Mt && ni && at)
      ) {
        const i = e.content.querySelectorAll('style');
        if (i) {
          let e = '';
          Array.from(i).forEach((t) => {
            (e += t.textContent), t.parentNode.removeChild(t);
          }),
            (t._styleSheet = new CSSStyleSheet()),
            t._styleSheet.replaceSync(e);
        }
      }
    }
    return class extends e {
      static get polymerElementVersion() {
        return '3.4.1';
      }
      static _finalizeClass() {
        e._finalizeClass.call(this);
        const t =
          ((i = this).hasOwnProperty(
            JSCompiler_renameProperty('__ownObservers', i)
          ) ||
            (i.wt = i.hasOwnProperty(JSCompiler_renameProperty('observers', i))
              ? i.observers
              : null),
          i.wt);
        var i;
        t && this.createObservers(t, this._properties), this._prepareTemplate();
      }
      static _prepareTemplate() {
        let t = this.template;
        t &&
          ('string' == typeof t
            ? (console.error('template getter must return HTMLTemplateElement'),
              (t = null))
            : ft || (t = t.cloneNode(!0))),
          (this.prototype._template = t);
      }
      static createProperties(t) {
        for (let e in t) i(this.prototype, e, t[e], t);
      }
      static createObservers(t, e) {
        const i = this.prototype;
        for (let s = 0; s < t.length; s++) i._createMethodObserver(t[s], e);
      }
      static get template() {
        if (
          !this.hasOwnProperty(JSCompiler_renameProperty('_template', this))
        ) {
          const t = this.prototype.hasOwnProperty(
            JSCompiler_renameProperty('_template', this.prototype)
          )
            ? this.prototype._template
            : void 0;
          this._template =
            void 0 !== t
              ? t
              : (this.hasOwnProperty(JSCompiler_renameProperty('is', this)) &&
                  (function (t) {
                    let e = null;
                    if (
                      t &&
                      (!dt || ut) &&
                      ((e = St.import(t, 'template')), dt && !e)
                    )
                      throw new Error(
                        `strictTemplatePolicy: expecting dom-module or null template for ${t}`
                      );
                    return e;
                  })(this.is)) ||
                Object.getPrototypeOf(this.prototype).constructor.template;
        }
        return this._template;
      }
      static set template(t) {
        this._template = t;
      }
      static get importPath() {
        if (
          !this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))
        ) {
          const t = this.importMeta;
          if (t) this._importPath = ot(t.url);
          else {
            const t = St.import(this.is);
            this._importPath =
              (t && t.assetpath) ||
              Object.getPrototypeOf(this.prototype).constructor.importPath;
          }
        }
        return this._importPath;
      }
      constructor() {
        super(),
          this._template,
          this._importPath,
          this.rootPath,
          this.importPath,
          this.root,
          this.$;
      }
      _initializeProperties() {
        this.constructor.finalize(),
          this.constructor._finalizeTemplate(this.localName),
          super._initializeProperties(),
          (this.rootPath = lt),
          (this.importPath = this.constructor.importPath);
        let t = (function (t) {
          if (
            !t.hasOwnProperty(
              JSCompiler_renameProperty('__propertyDefaults', t)
            )
          ) {
            t._t = null;
            let e = t._properties;
            for (let i in e) {
              let s = e[i];
              'value' in s && ((t._t = t._t || {}), (t._t[i] = s));
            }
          }
          return t._t;
        })(this.constructor);
        if (t)
          for (let e in t) {
            let i = t[e];
            if (this._canApplyPropertyDefault(e)) {
              let t =
                'function' == typeof i.value ? i.value.call(this) : i.value;
              this._hasAccessor(e)
                ? this._setPendingProperty(e, t, !0)
                : (this[e] = t);
            }
          }
      }
      _canApplyPropertyDefault(t) {
        return !this.hasOwnProperty(t);
      }
      static _processStyleText(t, e) {
        return rt(t, e);
      }
      static _finalizeTemplate(t) {
        const e = this.prototype._template;
        if (e && !e.Mt) {
          e.Mt = !0;
          const i = this.importPath;
          s(this, e, t, i ? nt(i) : ''), this.prototype._bindTemplate(e);
        }
      }
      connectedCallback() {
        window.ShadyCSS && this._template && window.ShadyCSS.styleElement(this),
          super.connectedCallback();
      }
      ready() {
        this._template &&
          ((this.root = this._stampTemplate(this._template)),
          (this.$ = this.root.$)),
          super.ready();
      }
      _readyClients() {
        this._template && (this.root = this._attachDom(this.root)),
          super._readyClients();
      }
      _attachDom(t) {
        const e = Dt(this);
        if (e.attachShadow)
          return t
            ? (e.shadowRoot ||
                (e.attachShadow({mode: 'open', shadyUpgradeFragment: t}),
                e.shadowRoot.appendChild(t),
                this.constructor._styleSheet &&
                  (e.shadowRoot.adoptedStyleSheets = [
                    this.constructor._styleSheet,
                  ])),
              gt &&
                window.ShadyDOM &&
                window.ShadyDOM.flushInitial(e.shadowRoot),
              e.shadowRoot)
            : null;
        throw new Error(
          'ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.'
        );
      }
      updateStyles(t) {
        window.ShadyCSS && window.ShadyCSS.styleSubtree(this, t);
      }
      resolveUrl(t, e) {
        return !e && this.importPath && (e = nt(this.importPath)), nt(t, e);
      }
      static _parseTemplateContent(t, i, s) {
        return (
          (i.dynamicFns = i.dynamicFns || this._properties),
          e._parseTemplateContent.call(this, t, i, s)
        );
      }
      static _addTemplatePropertyEffect(t, i, s) {
        return (
          !vt ||
            i in this._properties ||
            (s.info.part.signature && s.info.part.signature.static) ||
            s.info.part.hostProp ||
            t.nestedTemplate ||
            console.warn(
              `Property '${i}' used in template but not declared in 'properties'; attribute will not be observed.`
            ),
          e._addTemplatePropertyEffect.call(this, t, i, s)
        );
      }
    };
  });
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class oi {
  constructor() {
    (this._asyncModule = null), (this._callback = null), (this._timer = null);
  }
  setConfig(t, e) {
    (this._asyncModule = t),
      (this._callback = e),
      (this._timer = this._asyncModule.run(() => {
        (this._timer = null), hi.delete(this), this._callback();
      }));
  }
  cancel() {
    this.isActive() && (this._cancelAsync(), hi.delete(this));
  }
  _cancelAsync() {
    this.isActive() &&
      (this._asyncModule.cancel(this._timer), (this._timer = null));
  }
  flush() {
    this.isActive() && (this.cancel(), this._callback());
  }
  isActive() {
    return null != this._timer;
  }
  static debounce(t, e, i) {
    return (
      t instanceof oi ? t._cancelAsync() : (t = new oi()), t.setConfig(e, i), t
    );
  }
}
let hi = new Set();
const ai = function (t) {
    hi.add(t);
  },
  li = function () {
    const t = Boolean(hi.size);
    return (
      hi.forEach((t) => {
        try {
          t.flush();
        } catch (t) {
          setTimeout(() => {
            throw t;
          });
        }
      }),
      t
    );
  };
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let ci = 'string' == typeof document.head.style.touchAction,
  pi = '__polymerGestures',
  di = '__polymerGesturesHandled',
  ui = '__polymerGesturesTouchAction',
  fi = ['mousedown', 'mousemove', 'mouseup', 'click'],
  vi = [0, 1, 4, 2],
  gi = (function () {
    try {
      return 1 === new MouseEvent('test', {buttons: 1}).buttons;
    } catch (t) {
      return !1;
    }
  })();
function mi(t) {
  return fi.indexOf(t) > -1;
}
let bi = !1;
function yi(t) {
  if (!mi(t) && 'touchend' !== t)
    return ci && bi && pt ? {passive: !0} : void 0;
}
!(function () {
  try {
    let t = Object.defineProperty({}, 'passive', {
      get() {
        bi = !0;
      },
    });
    window.addEventListener('test', null, t),
      window.removeEventListener('test', null, t);
  } catch (t) {}
})();
let zi = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
const wi = [],
  _i = {
    button: !0,
    input: !0,
    keygen: !0,
    meter: !0,
    output: !0,
    textarea: !0,
    progress: !0,
    select: !0,
  },
  Mi = {
    button: !0,
    command: !0,
    fieldset: !0,
    input: !0,
    keygen: !0,
    optgroup: !0,
    option: !0,
    select: !0,
    textarea: !0,
  };
function Hi(t) {
  let e = Array.prototype.slice.call(t.labels || []);
  if (!e.length) {
    e = [];
    let i = t.getRootNode();
    if (t.id) {
      let s = i.querySelectorAll(`label[for = ${t.id}]`);
      for (let t = 0; t < s.length; t++) e.push(s[t]);
    }
  }
  return e;
}
let xi = function (t) {
  let e = t.sourceCapabilities;
  var i;
  if (
    (!e || e.firesTouchEvents) &&
    ((t[di] = {skip: !0}), 'click' === t.type)
  ) {
    let e = !1,
      s = Ti(t);
    for (let t = 0; t < s.length; t++) {
      if (s[t].nodeType === Node.ELEMENT_NODE)
        if ('label' === s[t].localName) wi.push(s[t]);
        else if (((i = s[t]), _i[i.localName])) {
          let i = Hi(s[t]);
          for (let t = 0; t < i.length; t++) e = e || wi.indexOf(i[t]) > -1;
        }
      if (s[t] === Vi.mouse.target) return;
    }
    if (e) return;
    t.preventDefault(), t.stopPropagation();
  }
};
function ki(t) {
  let e = zi ? ['click'] : fi;
  for (let i, s = 0; s < e.length; s++)
    (i = e[s]),
      t
        ? ((wi.length = 0), document.addEventListener(i, xi, !0))
        : document.removeEventListener(i, xi, !0);
}
function Ci(t) {
  let e = t.type;
  if (!mi(e)) return !1;
  if ('mousemove' === e) {
    let e = void 0 === t.buttons ? 1 : t.buttons;
    return (
      t instanceof window.MouseEvent && !gi && (e = vi[t.which] || 0),
      Boolean(1 & e)
    );
  }
  return 0 === (void 0 === t.button ? 0 : t.button);
}
let Vi = {
  mouse: {target: null, mouseIgnoreJob: null},
  touch: {x: 0, y: 0, id: -1, scrollDecided: !1},
};
function Li(t, e, i) {
  (t.movefn = e),
    (t.upfn = i),
    document.addEventListener('mousemove', e),
    document.addEventListener('mouseup', i);
}
function Si(t) {
  document.removeEventListener('mousemove', t.movefn),
    document.removeEventListener('mouseup', t.upfn),
    (t.movefn = null),
    (t.upfn = null);
}
document.addEventListener(
  'touchend',
  function (t) {
    Vi.mouse.mouseIgnoreJob || ki(!0),
      (Vi.mouse.target = Ti(t)[0]),
      (Vi.mouse.mouseIgnoreJob = oi.debounce(
        Vi.mouse.mouseIgnoreJob,
        re.after(2500),
        function () {
          ki(), (Vi.mouse.target = null), (Vi.mouse.mouseIgnoreJob = null);
        }
      ));
  },
  !!bi && {passive: !0}
);
const Ti =
    window.ShadyDOM && window.ShadyDOM.noPatch
      ? window.ShadyDOM.composedPath
      : (t) => (t.composedPath && t.composedPath()) || [],
  Ai = {},
  Ei = [];
function Pi(t) {
  const e = Ti(t);
  return e.length > 0 ? e[0] : t.target;
}
function Oi(t) {
  let e,
    i = t.type,
    s = t.currentTarget.Ht;
  if (!s) return;
  let n = s[i];
  if (n) {
    if (!t[di] && ((t[di] = {}), 'touch' === i.slice(0, 5))) {
      let e = (t = t).changedTouches[0];
      if (
        ('touchstart' === i &&
          1 === t.touches.length &&
          (Vi.touch.id = e.identifier),
        Vi.touch.id !== e.identifier)
      )
        return;
      ci ||
        ('touchstart' !== i && 'touchmove' !== i) ||
        (function (t) {
          let e = t.changedTouches[0],
            i = t.type;
          if ('touchstart' === i)
            (Vi.touch.x = e.clientX),
              (Vi.touch.y = e.clientY),
              (Vi.touch.scrollDecided = !1);
          else if ('touchmove' === i) {
            if (Vi.touch.scrollDecided) return;
            Vi.touch.scrollDecided = !0;
            let i = (function (t) {
                let e = 'auto',
                  i = Ti(t);
                for (let t, s = 0; s < i.length; s++)
                  if (((t = i[s]), t[ui])) {
                    e = t[ui];
                    break;
                  }
                return e;
              })(t),
              s = !1,
              n = Math.abs(Vi.touch.x - e.clientX),
              r = Math.abs(Vi.touch.y - e.clientY);
            t.cancelable &&
              ('none' === i
                ? (s = !0)
                : 'pan-x' === i
                ? (s = r > n)
                : 'pan-y' === i && (s = n > r)),
              s ? t.preventDefault() : Ii('track');
          }
        })(t);
    }
    if (((e = t[di]), !e.skip)) {
      for (let i, s = 0; s < Ei.length; s++)
        (i = Ei[s]),
          n[i.name] &&
            !e[i.name] &&
            i.flow &&
            i.flow.start.indexOf(t.type) > -1 &&
            i.reset &&
            i.reset();
      for (let s, r = 0; r < Ei.length; r++)
        (s = Ei[r]), n[s.name] && !e[s.name] && ((e[s.name] = !0), s[i](t));
    }
  }
}
function $i(t, e, i) {
  return (
    !!Ai[e] &&
    ((function (t, e, i) {
      let s = Ai[e],
        n = s.deps,
        r = s.name,
        o = t[pi];
      o || (t[pi] = o = {});
      for (let e, i, s = 0; s < n.length; s++)
        (e = n[s]),
          (zi && mi(e) && 'click' !== e) ||
            ((i = o[e]),
            i || (o[e] = i = {_count: 0}),
            0 === i._count && t.addEventListener(e, Oi, yi(e)),
            (i[r] = (i[r] || 0) + 1),
            (i._count = (i._count || 0) + 1));
      t.addEventListener(e, i), s.touchAction && ji(t, s.touchAction);
    })(t, e, i),
    !0)
  );
}
function Ni(t, e, i) {
  return (
    !!Ai[e] &&
    ((function (t, e, i) {
      let s = Ai[e],
        n = s.deps,
        r = s.name,
        o = t[pi];
      if (o)
        for (let e, i, s = 0; s < n.length; s++)
          (e = n[s]),
            (i = o[e]),
            i &&
              i[r] &&
              ((i[r] = (i[r] || 1) - 1),
              (i._count = (i._count || 1) - 1),
              0 === i._count && t.removeEventListener(e, Oi, yi(e)));
      t.removeEventListener(e, i);
    })(t, e, i),
    !0)
  );
}
function Di(t) {
  Ei.push(t);
  for (let e = 0; e < t.emits.length; e++) Ai[t.emits[e]] = t;
}
function ji(t, e) {
  ci &&
    t instanceof HTMLElement &&
    he.run(() => {
      t.style.touchAction = e;
    }),
    (t[ui] = e);
}
function Bi(t, e, i) {
  let s = new Event(e, {bubbles: !0, cancelable: !0, composed: !0});
  if (((s.detail = i), Dt(t).dispatchEvent(s), s.defaultPrevented)) {
    let t = i.preventer || i.sourceEvent;
    t && t.preventDefault && t.preventDefault();
  }
}
function Ii(t) {
  let e = (function (t) {
    for (let e, i = 0; i < Ei.length; i++) {
      e = Ei[i];
      for (let i, s = 0; s < e.emits.length; s++)
        if (((i = e.emits[s]), i === t)) return e;
    }
    return null;
  })(t);
  e.info && (e.info.prevent = !0);
}
function Ri(t, e, i, s) {
  e &&
    Bi(e, t, {
      x: i.clientX,
      y: i.clientY,
      sourceEvent: i,
      preventer: s,
      prevent: function (t) {
        return Ii(t);
      },
    });
}
function Fi(t, e, i) {
  if (t.prevent) return !1;
  if (t.started) return !0;
  let s = Math.abs(t.x - e),
    n = Math.abs(t.y - i);
  return s >= 5 || n >= 5;
}
function Ui(t, e, i) {
  if (!e) return;
  let s,
    n = t.moves[t.moves.length - 2],
    r = t.moves[t.moves.length - 1],
    o = r.x - t.x,
    h = r.y - t.y,
    a = 0;
  n && ((s = r.x - n.x), (a = r.y - n.y)),
    Bi(e, 'track', {
      state: t.state,
      x: i.clientX,
      y: i.clientY,
      dx: o,
      dy: h,
      ddx: s,
      ddy: a,
      sourceEvent: i,
      hover: function () {
        return (function (t, e) {
          let i = document.elementFromPoint(t, e),
            s = i;
          for (; s && s.shadowRoot && !window.ShadyDOM; ) {
            let n = s;
            if (((s = s.shadowRoot.elementFromPoint(t, e)), n === s)) break;
            s && (i = s);
          }
          return i;
        })(i.clientX, i.clientY);
      },
    });
}
function Ki(t, e, i) {
  let s = Math.abs(e.clientX - t.x),
    n = Math.abs(e.clientY - t.y),
    r = Pi(i || e);
  !r ||
    (Mi[r.localName] && r.hasAttribute('disabled')) ||
    ((isNaN(s) ||
      isNaN(n) ||
      (s <= 25 && n <= 25) ||
      (function (t) {
        if ('click' === t.type) {
          if (0 === t.detail) return !0;
          let e = Pi(t);
          if (!e.nodeType || e.nodeType !== Node.ELEMENT_NODE) return !0;
          let i = e.getBoundingClientRect(),
            s = t.pageX,
            n = t.pageY;
          return !(s >= i.left && s <= i.right && n >= i.top && n <= i.bottom);
        }
        return !1;
      })(e)) &&
      (t.prevent ||
        Bi(r, 'tap', {
          x: e.clientX,
          y: e.clientY,
          sourceEvent: e,
          preventer: i,
        })));
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ Di({
  name: 'downup',
  deps: ['mousedown', 'touchstart', 'touchend'],
  flow: {start: ['mousedown', 'touchstart'], end: ['mouseup', 'touchend']},
  emits: ['down', 'up'],
  info: {movefn: null, upfn: null},
  reset: function () {
    Si(this.info);
  },
  mousedown: function (t) {
    if (!Ci(t)) return;
    let e = Pi(t),
      i = this;
    Li(
      this.info,
      function (t) {
        Ci(t) || (Ri('up', e, t), Si(i.info));
      },
      function (t) {
        Ci(t) && Ri('up', e, t), Si(i.info);
      }
    ),
      Ri('down', e, t);
  },
  touchstart: function (t) {
    Ri('down', Pi(t), t.changedTouches[0], t);
  },
  touchend: function (t) {
    Ri('up', Pi(t), t.changedTouches[0], t);
  },
}),
  Di({
    name: 'track',
    touchAction: 'none',
    deps: ['mousedown', 'touchstart', 'touchmove', 'touchend'],
    flow: {start: ['mousedown', 'touchstart'], end: ['mouseup', 'touchend']},
    emits: ['track'],
    info: {
      x: 0,
      y: 0,
      state: 'start',
      started: !1,
      moves: [],
      addMove: function (t) {
        this.moves.length > 2 && this.moves.shift(), this.moves.push(t);
      },
      movefn: null,
      upfn: null,
      prevent: !1,
    },
    reset: function () {
      (this.info.state = 'start'),
        (this.info.started = !1),
        (this.info.moves = []),
        (this.info.x = 0),
        (this.info.y = 0),
        (this.info.prevent = !1),
        Si(this.info);
    },
    mousedown: function (t) {
      if (!Ci(t)) return;
      let e = Pi(t),
        i = this,
        s = function (t) {
          let s = t.clientX,
            n = t.clientY;
          Fi(i.info, s, n) &&
            ((i.info.state = i.info.started
              ? 'mouseup' === t.type
                ? 'end'
                : 'track'
              : 'start'),
            'start' === i.info.state && Ii('tap'),
            i.info.addMove({x: s, y: n}),
            Ci(t) || ((i.info.state = 'end'), Si(i.info)),
            e && Ui(i.info, e, t),
            (i.info.started = !0));
        };
      Li(this.info, s, function (t) {
        i.info.started && s(t), Si(i.info);
      }),
        (this.info.x = t.clientX),
        (this.info.y = t.clientY);
    },
    touchstart: function (t) {
      let e = t.changedTouches[0];
      (this.info.x = e.clientX), (this.info.y = e.clientY);
    },
    touchmove: function (t) {
      let e = Pi(t),
        i = t.changedTouches[0],
        s = i.clientX,
        n = i.clientY;
      Fi(this.info, s, n) &&
        ('start' === this.info.state && Ii('tap'),
        this.info.addMove({x: s, y: n}),
        Ui(this.info, e, i),
        (this.info.state = 'track'),
        (this.info.started = !0));
    },
    touchend: function (t) {
      let e = Pi(t),
        i = t.changedTouches[0];
      this.info.started &&
        ((this.info.state = 'end'),
        this.info.addMove({x: i.clientX, y: i.clientY}),
        Ui(this.info, e, i));
    },
  }),
  Di({
    name: 'tap',
    deps: ['mousedown', 'click', 'touchstart', 'touchend'],
    flow: {start: ['mousedown', 'touchstart'], end: ['click', 'touchend']},
    emits: ['tap'],
    info: {x: NaN, y: NaN, prevent: !1},
    reset: function () {
      (this.info.x = NaN), (this.info.y = NaN), (this.info.prevent = !1);
    },
    mousedown: function (t) {
      Ci(t) && ((this.info.x = t.clientX), (this.info.y = t.clientY));
    },
    click: function (t) {
      Ci(t) && Ki(this.info, t);
    },
    touchstart: function (t) {
      const e = t.changedTouches[0];
      (this.info.x = e.clientX), (this.info.y = e.clientY);
    },
    touchend: function (t) {
      Ki(this.info, t.changedTouches[0], t);
    },
  });
const qi = xt(
    (t) =>
      class extends t {
        _addEventListenerToNode(t, e, i) {
          $i(t, e, i) || super._addEventListenerToNode(t, e, i);
        }
        _removeEventListenerFromNode(t, e, i) {
          Ni(t, e, i) || super._removeEventListenerFromNode(t, e, i);
        }
      }
  ),
  Ji = /:host\(:dir\((ltr|rtl)\)\)/g,
  Zi = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,
  Wi = /:dir\((?:ltr|rtl)\)/,
  Gi = Boolean(window.ShadyDOM && window.ShadyDOM.inUse),
  Yi = [];
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */ let Qi = null,
  Xi = '';
function ts() {
  Xi = document.documentElement.getAttribute('dir');
}
function es(t) {
  if (!t.xt) {
    t.setAttribute('dir', Xi);
  }
}
function is() {
  ts(), (Xi = document.documentElement.getAttribute('dir'));
  for (let t = 0; t < Yi.length; t++) es(Yi[t]);
}
const ss = xt((t) => {
  Gi ||
    Qi ||
    (ts(),
    (Qi = new MutationObserver(is)),
    Qi.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ['dir'],
    }));
  const e = de(t);
  class i extends e {
    static _processStyleText(t, i) {
      return (
        (t = e._processStyleText.call(this, t, i)),
        !Gi &&
          Wi.test(t) &&
          ((t = this._replaceDirInCssText(t)), (this.kt = !0)),
        t
      );
    }
    static _replaceDirInCssText(t) {
      let e = t;
      return (
        (e = e.replace(Ji, ':host([dir="$1"])')),
        (e = e.replace(Zi, ':host([dir="$2"]) $1')),
        e
      );
    }
    constructor() {
      super(), (this.xt = !1);
    }
    ready() {
      super.ready(), (this.xt = this.hasAttribute('dir'));
    }
    connectedCallback() {
      e.prototype.connectedCallback && super.connectedCallback(),
        this.constructor.kt &&
          (Qi && Qi.takeRecords().length && is(), Yi.push(this), es(this));
    }
    disconnectedCallback() {
      if (
        (e.prototype.disconnectedCallback && super.disconnectedCallback(),
        this.constructor.kt)
      ) {
        const t = Yi.indexOf(this);
        t > -1 && Yi.splice(t, 1);
      }
    }
  }
  return (i.kt = !1), i;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ let ns = !1,
  rs = [],
  os = [];
function hs() {
  (ns = !0),
    requestAnimationFrame(function () {
      (ns = !1),
        (function (t) {
          for (; t.length; ) as(t.shift());
        })(rs),
        setTimeout(function () {
          !(function (t) {
            for (let e = 0, i = t.length; e < i; e++) as(t.shift());
          })(os);
        });
    });
}
function as(t) {
  const e = t[0],
    i = t[1],
    s = t[2];
  try {
    i.apply(e, s);
  } catch (t) {
    setTimeout(() => {
      throw t;
    });
  }
}
function ls(t, e, i) {
  ns || hs(), os.push([t, e, i]);
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function cs() {
  document.body.removeAttribute('unresolved');
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function ps(t, e, i) {
  return {index: t, removed: e, addedCount: i};
}
'interactive' === document.readyState || 'complete' === document.readyState
  ? cs()
  : window.addEventListener('DOMContentLoaded', cs);
function ds(t, e, i, s, n, r) {
  let o,
    h = 0,
    a = 0,
    l = Math.min(i - e, r - n);
  if (
    (0 == e &&
      0 == n &&
      (h = (function (t, e, i) {
        for (let s = 0; s < i; s++) if (!fs(t[s], e[s])) return s;
        return i;
      })(t, s, l)),
    i == t.length &&
      r == s.length &&
      (a = (function (t, e, i) {
        let s = t.length,
          n = e.length,
          r = 0;
        for (; r < i && fs(t[--s], e[--n]); ) r++;
        return r;
      })(t, s, l - h)),
    (n += h),
    (r -= a),
    (i -= a) - (e += h) == 0 && r - n == 0)
  )
    return [];
  if (e == i) {
    for (o = ps(e, [], 0); n < r; ) o.removed.push(s[n++]);
    return [o];
  }
  if (n == r) return [ps(e, [], i - e)];
  let c = (function (t) {
    let e = t.length - 1,
      i = t[0].length - 1,
      s = t[e][i],
      n = [];
    for (; e > 0 || i > 0; ) {
      if (0 == e) {
        n.push(2), i--;
        continue;
      }
      if (0 == i) {
        n.push(3), e--;
        continue;
      }
      let r,
        o = t[e - 1][i - 1],
        h = t[e - 1][i],
        a = t[e][i - 1];
      (r = h < a ? (h < o ? h : o) : a < o ? a : o),
        r == o
          ? (o == s ? n.push(0) : (n.push(1), (s = o)), e--, i--)
          : r == h
          ? (n.push(3), e--, (s = h))
          : (n.push(2), i--, (s = a));
    }
    return n.reverse(), n;
  })(
    (function (t, e, i, s, n, r) {
      let o = r - n + 1,
        h = i - e + 1,
        a = new Array(o);
      for (let t = 0; t < o; t++) (a[t] = new Array(h)), (a[t][0] = t);
      for (let t = 0; t < h; t++) a[0][t] = t;
      for (let i = 1; i < o; i++)
        for (let r = 1; r < h; r++)
          if (fs(t[e + r - 1], s[n + i - 1])) a[i][r] = a[i - 1][r - 1];
          else {
            let t = a[i - 1][r] + 1,
              e = a[i][r - 1] + 1;
            a[i][r] = t < e ? t : e;
          }
      return a;
    })(t, e, i, s, n, r)
  );
  o = void 0;
  let p = [],
    d = e,
    u = n;
  for (let t = 0; t < c.length; t++)
    switch (c[t]) {
      case 0:
        o && (p.push(o), (o = void 0)), d++, u++;
        break;
      case 1:
        o || (o = ps(d, [], 0)), o.addedCount++, d++, o.removed.push(s[u]), u++;
        break;
      case 2:
        o || (o = ps(d, [], 0)), o.addedCount++, d++;
        break;
      case 3:
        o || (o = ps(d, [], 0)), o.removed.push(s[u]), u++;
    }
  return o && p.push(o), p;
}
function us(t, e) {
  return ds(t, 0, t.length, e, 0, e.length);
}
function fs(t, e) {
  return t === e;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function vs(t) {
  return 'slot' === t.localName;
}
let gs = class {
  static getFlattenedNodes(t) {
    const e = Dt(t);
    return vs(t)
      ? ((t = t), e.assignedNodes({flatten: !0}))
      : Array.from(e.childNodes)
          .map((t) => (vs(t) ? Dt((t = t)).assignedNodes({flatten: !0}) : [t]))
          .reduce((t, e) => t.concat(e), []);
  }
  constructor(t, e) {
    (this._shadyChildrenObserver = null),
      (this._nativeChildrenObserver = null),
      (this._connected = !1),
      (this._target = t),
      (this.callback = e),
      (this._effectiveNodes = []),
      (this._observer = null),
      (this._scheduled = !1),
      (this._boundSchedule = () => {
        this._schedule();
      }),
      this.connect(),
      this._schedule();
  }
  connect() {
    vs(this._target)
      ? this._listenSlots([this._target])
      : Dt(this._target).children &&
        (this._listenSlots(Dt(this._target).children),
        window.ShadyDOM
          ? (this._shadyChildrenObserver = window.ShadyDOM.observeChildren(
              this._target,
              (t) => {
                this._processMutations(t);
              }
            ))
          : ((this._nativeChildrenObserver = new MutationObserver((t) => {
              this._processMutations(t);
            })),
            this._nativeChildrenObserver.observe(this._target, {
              childList: !0,
            }))),
      (this._connected = !0);
  }
  disconnect() {
    vs(this._target)
      ? this._unlistenSlots([this._target])
      : Dt(this._target).children &&
        (this._unlistenSlots(Dt(this._target).children),
        window.ShadyDOM && this._shadyChildrenObserver
          ? (window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver),
            (this._shadyChildrenObserver = null))
          : this._nativeChildrenObserver &&
            (this._nativeChildrenObserver.disconnect(),
            (this._nativeChildrenObserver = null))),
      (this._connected = !1);
  }
  _schedule() {
    this._scheduled || ((this._scheduled = !0), he.run(() => this.flush()));
  }
  _processMutations(t) {
    this._processSlotMutations(t), this.flush();
  }
  _processSlotMutations(t) {
    if (t)
      for (let e = 0; e < t.length; e++) {
        let i = t[e];
        i.addedNodes && this._listenSlots(i.addedNodes),
          i.removedNodes && this._unlistenSlots(i.removedNodes);
      }
  }
  flush() {
    if (!this._connected) return !1;
    window.ShadyDOM && ShadyDOM.flush(),
      this._nativeChildrenObserver
        ? this._processSlotMutations(this._nativeChildrenObserver.takeRecords())
        : this._shadyChildrenObserver &&
          this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),
      (this._scheduled = !1);
    let t = {target: this._target, addedNodes: [], removedNodes: []},
      e = this.constructor.getFlattenedNodes(this._target),
      i = us(e, this._effectiveNodes);
    for (let e, s = 0; s < i.length && (e = i[s]); s++)
      for (let i, s = 0; s < e.removed.length && (i = e.removed[s]); s++)
        t.removedNodes.push(i);
    for (let s, n = 0; n < i.length && (s = i[n]); n++)
      for (let i = s.index; i < s.index + s.addedCount; i++)
        t.addedNodes.push(e[i]);
    this._effectiveNodes = e;
    let s = !1;
    return (
      (t.addedNodes.length || t.removedNodes.length) &&
        ((s = !0), this.callback.call(this._target, t)),
      s
    );
  }
  _listenSlots(t) {
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      vs(i) && i.addEventListener('slotchange', this._boundSchedule);
    }
  }
  _unlistenSlots(t) {
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      vs(i) && i.removeEventListener('slotchange', this._boundSchedule);
    }
  }
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const ms = function () {
    let t, e;
    do {
      (t = window.ShadyDOM && ShadyDOM.flush()),
        window.ShadyCSS &&
          window.ShadyCSS.ScopingShim &&
          window.ShadyCSS.ScopingShim.flush(),
        (e = li());
    } while (t || e);
  },
  bs = Element.prototype,
  ys =
    bs.matches ||
    bs.matchesSelector ||
    bs.mozMatchesSelector ||
    bs.msMatchesSelector ||
    bs.oMatchesSelector ||
    bs.webkitMatchesSelector,
  zs = function (t, e) {
    return ys.call(t, e);
  };
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ class ws {
  constructor(t) {
    window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.patch(t),
      (this.node = t);
  }
  observeNodes(t) {
    return new gs(this.node, t);
  }
  unobserveNodes(t) {
    t.disconnect();
  }
  notifyObserver() {}
  deepContains(t) {
    if (Dt(this.node).contains(t)) return !0;
    let e = t,
      i = t.ownerDocument;
    for (; e && e !== i && e !== this.node; )
      e = Dt(e).parentNode || Dt(e).host;
    return e === this.node;
  }
  getOwnerRoot() {
    return Dt(this.node).getRootNode();
  }
  getDistributedNodes() {
    return 'slot' === this.node.localName
      ? Dt(this.node).assignedNodes({flatten: !0})
      : [];
  }
  getDestinationInsertionPoints() {
    let t = [],
      e = Dt(this.node).assignedSlot;
    for (; e; ) t.push(e), (e = Dt(e).assignedSlot);
    return t;
  }
  importNode(t, e) {
    let i = this.node instanceof Document ? this.node : this.node.ownerDocument;
    return Dt(i).importNode(t, e);
  }
  getEffectiveChildNodes() {
    return gs.getFlattenedNodes(this.node);
  }
  queryDistributedElements(t) {
    let e = this.getEffectiveChildNodes(),
      i = [];
    for (let s, n = 0, r = e.length; n < r && (s = e[n]); n++)
      s.nodeType === Node.ELEMENT_NODE && zs(s, t) && i.push(s);
    return i;
  }
  get activeElement() {
    let t = this.node;
    return void 0 !== t._activeElement ? t._activeElement : t.activeElement;
  }
}
function _s(t, e) {
  for (let i = 0; i < e.length; i++) {
    let s = e[i];
    Object.defineProperty(t, s, {
      get: function () {
        return this.node[s];
      },
      configurable: !0,
    });
  }
}
class Ms {
  constructor(t) {
    this.event = t;
  }
  get rootTarget() {
    return this.path[0];
  }
  get localTarget() {
    return this.event.target;
  }
  get path() {
    return this.event.composedPath();
  }
}
ws.prototype.cloneNode,
  ws.prototype.appendChild,
  ws.prototype.insertBefore,
  ws.prototype.removeChild,
  ws.prototype.replaceChild,
  ws.prototype.setAttribute,
  ws.prototype.removeAttribute,
  ws.prototype.querySelector,
  ws.prototype.querySelectorAll,
  ws.prototype.parentNode,
  ws.prototype.firstChild,
  ws.prototype.lastChild,
  ws.prototype.nextSibling,
  ws.prototype.previousSibling,
  ws.prototype.firstElementChild,
  ws.prototype.lastElementChild,
  ws.prototype.nextElementSibling,
  ws.prototype.previousElementSibling,
  ws.prototype.childNodes,
  ws.prototype.children,
  ws.prototype.classList,
  ws.prototype.textContent,
  ws.prototype.innerHTML;
let Hs = ws;
if (
  window.ShadyDOM &&
  window.ShadyDOM.inUse &&
  window.ShadyDOM.noPatch &&
  window.ShadyDOM.Wrapper
) {
  class t extends window.ShadyDOM.Wrapper {}
  Object.getOwnPropertyNames(ws.prototype).forEach((e) => {
    'activeElement' != e && (t.prototype[e] = ws.prototype[e]);
  }),
    _s(t.prototype, ['classList']),
    (Hs = t),
    Object.defineProperties(Ms.prototype, {
      localTarget: {
        get() {
          const t = this.event.currentTarget,
            e = t && xs(t).getOwnerRoot(),
            i = this.path;
          for (let t = 0; t < i.length; t++) {
            const s = i[t];
            if (xs(s).getOwnerRoot() === e) return s;
          }
        },
        configurable: !0,
      },
      path: {
        get() {
          return window.ShadyDOM.composedPath(this.event);
        },
        configurable: !0,
      },
    });
} else
  !(function (t, e) {
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      t[s] = function () {
        return this.node[s].apply(this.node, arguments);
      };
    }
  })(ws.prototype, [
    'cloneNode',
    'appendChild',
    'insertBefore',
    'removeChild',
    'replaceChild',
    'setAttribute',
    'removeAttribute',
    'querySelector',
    'querySelectorAll',
  ]),
    _s(ws.prototype, [
      'parentNode',
      'firstChild',
      'lastChild',
      'nextSibling',
      'previousSibling',
      'firstElementChild',
      'lastElementChild',
      'nextElementSibling',
      'previousElementSibling',
      'childNodes',
      'children',
      'classList',
    ]),
    (function (t, e) {
      for (let i = 0; i < e.length; i++) {
        let s = e[i];
        Object.defineProperty(t, s, {
          get: function () {
            return this.node[s];
          },
          set: function (t) {
            this.node[s] = t;
          },
          configurable: !0,
        });
      }
    })(ws.prototype, ['textContent', 'innerHTML', 'className']);
const xs = function (t) {
    if ((t = t || document) instanceof Hs) return t;
    if (t instanceof Ms) return t;
    let e = t.Ct;
    return (
      e || ((e = t instanceof Event ? new Ms(t) : new Hs(t)), (t.Ct = e)), e
    );
  },
  ks = window.ShadyDOM,
  Cs = window.ShadyCSS;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function Vs(t, e) {
  return Dt(t).getRootNode() === e;
}
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const Ls = (t) => {
  for (; t; ) {
    const e = Object.getOwnPropertyDescriptor(t, 'observedAttributes');
    if (e) return e.get;
    t = Object.getPrototypeOf(t.prototype).constructor;
  }
  return () => [];
};
xt((t) => {
  const e = ri(t);
  let i = Ls(e);
  return class extends e {
    constructor() {
      super(), this.Vt;
    }
    static get observedAttributes() {
      return i.call(this).concat('disable-upgrade');
    }
    _initializeProperties() {
      this.hasAttribute('disable-upgrade')
        ? (this.Vt = !0)
        : super._initializeProperties();
    }
    _enableProperties() {
      this.Vt || super._enableProperties();
    }
    _canApplyPropertyDefault(t) {
      return (
        super._canApplyPropertyDefault(t) &&
        !(this.Vt && this._isPropertyPending(t))
      );
    }
    attributeChangedCallback(t, e, i, s) {
      'disable-upgrade' == t
        ? this.Vt &&
          null == i &&
          (super._initializeProperties(),
          (this.Vt = !1),
          Dt(this).isConnected && super.connectedCallback())
        : super.attributeChangedCallback(t, e, i, s);
    }
    connectedCallback() {
      this.Vt || super.connectedCallback();
    }
    disconnectedCallback() {
      this.Vt || super.disconnectedCallback();
    }
  };
});
let Ss = window.ShadyCSS;
const Ts = xt((t) => {
    const e = qi(ri(t)),
      i = ni ? e : ss(e),
      s = Ls(i),
      n = {x: 'pan-x', y: 'pan-y', none: 'none', all: 'auto'};
    class r extends i {
      constructor() {
        super(),
          this.isAttached,
          this.Lt,
          this._debouncers,
          this.Vt,
          this.St,
          this._legacyForceObservedAttributes;
      }
      static get importMeta() {
        return this.prototype.importMeta;
      }
      created() {}
      Tt(t, e, i) {
        ((this.L && this.L[t]) || 'disable-upgrade' === t) &&
          this.attributeChangedCallback(t, e, i, null);
      }
      setAttribute(t, e) {
        if (_t && !this._legacyForceObservedAttributes) {
          const i = this.getAttribute(t);
          super.setAttribute(t, e), this.Tt(t, i, String(e));
        } else super.setAttribute(t, e);
      }
      removeAttribute(t) {
        if (_t && !this._legacyForceObservedAttributes) {
          const e = this.getAttribute(t);
          super.removeAttribute(t), this.Tt(t, e, null);
        } else super.removeAttribute(t);
      }
      static get observedAttributes() {
        return _t && !this.prototype._legacyForceObservedAttributes
          ? (this.hasOwnProperty(
              JSCompiler_renameProperty('__observedAttributes', this)
            ) || ((this.bt = []), this.prototype),
            this.bt)
          : s.call(this).concat('disable-upgrade');
      }
      _enableProperties() {
        this.Vt || super._enableProperties();
      }
      _canApplyPropertyDefault(t) {
        return (
          super._canApplyPropertyDefault(t) &&
          !(this.Vt && this._isPropertyPending(t))
        );
      }
      connectedCallback() {
        this.St && this._takeAttributes(),
          this.Vt ||
            (super.connectedCallback(),
            (this.isAttached = !0),
            this.attached());
      }
      attached() {}
      disconnectedCallback() {
        this.Vt ||
          (super.disconnectedCallback(),
          (this.isAttached = !1),
          this.detached());
      }
      detached() {}
      attributeChangedCallback(t, e, i, s) {
        e !== i &&
          ('disable-upgrade' == t
            ? this.Vt &&
              null == i &&
              (this._initializeProperties(),
              (this.Vt = !1),
              Dt(this).isConnected && this.connectedCallback())
            : (super.attributeChangedCallback(t, e, i, s),
              this.attributeChanged(t, e, i)));
      }
      attributeChanged(t, e, i) {}
      _initializeProperties() {
        if (ft && this.hasAttribute('disable-upgrade')) this.Vt = !0;
        else {
          let t = Object.getPrototypeOf(this);
          t.hasOwnProperty(
            JSCompiler_renameProperty('__hasRegisterFinished', t)
          ) || (this._registered(), (t.At = !0)),
            super._initializeProperties(),
            (this.root = this),
            this.created(),
            _t &&
              !this._legacyForceObservedAttributes &&
              (this.hasAttributes()
                ? this._takeAttributes()
                : this.parentNode || (this.St = !0)),
            this._applyListeners();
        }
      }
      _takeAttributes() {
        const t = this.attributes;
        for (let e = 0, i = t.length; e < i; e++) {
          const i = t[e];
          this.Tt(i.name, null, i.value);
        }
      }
      _registered() {}
      ready() {
        this._ensureAttributes(), super.ready();
      }
      _ensureAttributes() {}
      _applyListeners() {}
      serialize(t) {
        return this._serializeValue(t);
      }
      deserialize(t, e) {
        return this._deserializeValue(t, e);
      }
      reflectPropertyToAttribute(t, e, i) {
        this._propertyToAttribute(t, e, i);
      }
      serializeValueToAttribute(t, e, i) {
        this._valueToNodeAttribute(i || this, t, e);
      }
      extend(t, e) {
        if (!t || !e) return t || e;
        let i = Object.getOwnPropertyNames(e);
        for (let s, n = 0; n < i.length && (s = i[n]); n++) {
          let i = Object.getOwnPropertyDescriptor(e, s);
          i && Object.defineProperty(t, s, i);
        }
        return t;
      }
      mixin(t, e) {
        for (let i in e) t[i] = e[i];
        return t;
      }
      chainObject(t, e) {
        return t && e && t !== e && (t.__proto__ = e), t;
      }
      instanceTemplate(t) {
        let e = this.constructor._contentForTemplate(t);
        return document.importNode(e, !0);
      }
      fire(t, e, i) {
        (i = i || {}), (e = null == e ? {} : e);
        let s = new Event(t, {
          bubbles: void 0 === i.bubbles || i.bubbles,
          cancelable: Boolean(i.cancelable),
          composed: void 0 === i.composed || i.composed,
        });
        s.detail = e;
        let n = i.node || this;
        return Dt(n).dispatchEvent(s), s;
      }
      listen(t, e, i) {
        t = t || this;
        let s = this.Lt || (this.Lt = new WeakMap()),
          n = s.get(t);
        n || ((n = {}), s.set(t, n));
        let r = e + i;
        n[r] || (n[r] = this._addMethodEventListenerToNode(t, e, i, this));
      }
      unlisten(t, e, i) {
        t = t || this;
        let s = this.Lt && this.Lt.get(t),
          n = e + i,
          r = s && s[n];
        r && (this._removeEventListenerFromNode(t, e, r), (s[n] = null));
      }
      setScrollDirection(t, e) {
        ji(e || this, n[t] || 'auto');
      }
      $$(t) {
        return this.root.querySelector(t);
      }
      get domHost() {
        let t = Dt(this).getRootNode();
        return t instanceof DocumentFragment ? t.host : t;
      }
      distributeContent() {
        const t = xs(this);
        window.ShadyDOM && t.shadowRoot && ShadyDOM.flush();
      }
      getEffectiveChildNodes() {
        return xs(this).getEffectiveChildNodes();
      }
      queryDistributedElements(t) {
        return xs(this).queryDistributedElements(t);
      }
      getEffectiveChildren() {
        return this.getEffectiveChildNodes().filter(function (t) {
          return t.nodeType === Node.ELEMENT_NODE;
        });
      }
      getEffectiveTextContent() {
        let t = this.getEffectiveChildNodes(),
          e = [];
        for (let i, s = 0; (i = t[s]); s++)
          i.nodeType !== Node.COMMENT_NODE && e.push(i.textContent);
        return e.join('');
      }
      queryEffectiveChildren(t) {
        let e = this.queryDistributedElements(t);
        return e && e[0];
      }
      queryAllEffectiveChildren(t) {
        return this.queryDistributedElements(t);
      }
      getContentChildNodes(t) {
        let e = this.root.querySelector(t || 'slot');
        return e ? xs(e).getDistributedNodes() : [];
      }
      getContentChildren(t) {
        return this.getContentChildNodes(t).filter(function (t) {
          return t.nodeType === Node.ELEMENT_NODE;
        });
      }
      isLightDescendant(t) {
        const e = this;
        return (
          e !== t &&
          Dt(e).contains(t) &&
          Dt(e).getRootNode() === Dt(t).getRootNode()
        );
      }
      isLocalDescendant(t) {
        return this.root === Dt(t).getRootNode();
      }
      scopeSubtree(t, e = !1) {
        return (function (t, e = !1) {
          if (!ks || !Cs) return null;
          if (!ks.handlesDynamicScoping) return null;
          const i = Cs.ScopingShim;
          if (!i) return null;
          const s = i.scopeForNode(t),
            n = Dt(t).getRootNode(),
            r = (t) => {
              if (!Vs(t, n)) return;
              const e = Array.from(
                ks.nativeMethods.querySelectorAll.call(t, '*')
              );
              e.push(t);
              for (let t = 0; t < e.length; t++) {
                const r = e[t];
                if (!Vs(r, n)) continue;
                const o = i.currentScopeForNode(r);
                o !== s && ('' !== o && i.unscopeNode(r, o), i.scopeNode(r, s));
              }
            };
          if ((r(t), e)) {
            const e = new MutationObserver((t) => {
              for (let e = 0; e < t.length; e++) {
                const i = t[e];
                for (let t = 0; t < i.addedNodes.length; t++) {
                  const e = i.addedNodes[t];
                  e.nodeType === Node.ELEMENT_NODE && r(e);
                }
              }
            });
            return e.observe(t, {childList: !0, subtree: !0}), e;
          }
          return null;
        })(t, e);
      }
      getComputedStyleValue(t) {
        return Ss.getComputedStyleValue(this, t);
      }
      debounce(t, e, i) {
        return (
          (this._debouncers = this._debouncers || {}),
          (this._debouncers[t] = oi.debounce(
            this._debouncers[t],
            i > 0 ? re.after(i) : he,
            e.bind(this)
          ))
        );
      }
      isDebouncerActive(t) {
        this._debouncers = this._debouncers || {};
        let e = this._debouncers[t];
        return !(!e || !e.isActive());
      }
      flushDebouncer(t) {
        this._debouncers = this._debouncers || {};
        let e = this._debouncers[t];
        e && e.flush();
      }
      cancelDebouncer(t) {
        this._debouncers = this._debouncers || {};
        let e = this._debouncers[t];
        e && e.cancel();
      }
      async(t, e) {
        return e > 0 ? re.run(t.bind(this), e) : ~he.run(t.bind(this));
      }
      cancelAsync(t) {
        t < 0 ? he.cancel(~t) : re.cancel(t);
      }
      create(t, e) {
        let i = document.createElement(t);
        if (e)
          if (i.setProperties) i.setProperties(e);
          else for (let t in e) i[t] = e[t];
        return i;
      }
      elementMatches(t, e) {
        return zs(e || this, t);
      }
      toggleAttribute(t, e) {
        let i = this;
        return (
          3 === arguments.length && (i = arguments[2]),
          1 == arguments.length && (e = !i.hasAttribute(t)),
          e ? (Dt(i).setAttribute(t, ''), !0) : (Dt(i).removeAttribute(t), !1)
        );
      }
      toggleClass(t, e, i) {
        (i = i || this),
          1 == arguments.length && (e = !i.classList.contains(t)),
          e ? i.classList.add(t) : i.classList.remove(t);
      }
      transform(t, e) {
        ((e = e || this).style.webkitTransform = t), (e.style.transform = t);
      }
      translate3d(t, e, i, s) {
        (s = s || this),
          this.transform('translate3d(' + t + ',' + e + ',' + i + ')', s);
      }
      arrayDelete(t, e) {
        let i;
        if (Array.isArray(t)) {
          if (((i = t.indexOf(e)), i >= 0)) return t.splice(i, 1);
        } else {
          if (((i = qt(this, t).indexOf(e)), i >= 0))
            return this.splice(t, i, 1);
        }
        return null;
      }
      _logger(t, e) {
        switch (
          (Array.isArray(e) &&
            1 === e.length &&
            Array.isArray(e[0]) &&
            (e = e[0]),
          t)
        ) {
          case 'log':
          case 'warn':
          case 'error':
            console[t](...e);
        }
      }
      _log(...t) {
        this._logger('log', t);
      }
      _warn(...t) {
        this._logger('warn', t);
      }
      _error(...t) {
        this._logger('error', t);
      }
      _logf(t, ...e) {
        return ['[%s::%s]', this.is, t, ...e];
      }
    }
    return (r.prototype.is = ''), r;
  }),
  As = {
    attached: !0,
    detached: !0,
    ready: !0,
    created: !0,
    beforeRegister: !0,
    registered: !0,
    attributeChanged: !0,
    listeners: !0,
    hostAttributes: !0,
  },
  Es = {
    attached: !0,
    detached: !0,
    ready: !0,
    created: !0,
    beforeRegister: !0,
    registered: !0,
    attributeChanged: !0,
    behaviors: !0,
    _noAccessors: !0,
  },
  Ps = Object.assign(
    {listeners: !0, hostAttributes: !0, properties: !0, observers: !0},
    Es
  );
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function Os(t, e, i, s) {
  !(function (t, e, i) {
    const s = t._noAccessors,
      n = Object.getOwnPropertyNames(t);
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      if (!(o in i))
        if (s) e[o] = t[o];
        else {
          let i = Object.getOwnPropertyDescriptor(t, o);
          i && ((i.configurable = !0), Object.defineProperty(e, o, i));
        }
    }
  })(e, t, s);
  for (let t in As) e[t] && ((i[t] = i[t] || []), i[t].push(e[t]));
}
function $s(t, e, i) {
  e = e || [];
  for (let s = t.length - 1; s >= 0; s--) {
    let n = t[s];
    n
      ? Array.isArray(n)
        ? $s(n, e)
        : e.indexOf(n) < 0 && (!i || i.indexOf(n) < 0) && e.unshift(n)
      : console.warn('behavior is null, check for missing or 404 import');
  }
  return e;
}
function Ns(t, e) {
  for (const i in e) {
    const s = t[i],
      n = e[i];
    t[i] =
      !('value' in n) && s && 'value' in s
        ? Object.assign({value: s.value}, n)
        : n;
  }
}
const Ds = Ts(HTMLElement);
function js(t, e, i) {
  let s;
  const n = {};
  class r extends e {
    static _finalizeClass() {
      if (
        this.hasOwnProperty(JSCompiler_renameProperty('generatedFrom', this))
      ) {
        if (s)
          for (let t, e = 0; e < s.length; e++)
            (t = s[e]),
              t.properties && this.createProperties(t.properties),
              t.observers && this.createObservers(t.observers, t.properties);
        t.properties && this.createProperties(t.properties),
          t.observers && this.createObservers(t.observers, t.properties),
          this._prepareTemplate();
      } else e._finalizeClass.call(this);
    }
    static get properties() {
      const e = {};
      if (s) for (let t = 0; t < s.length; t++) Ns(e, s[t].properties);
      return Ns(e, t.properties), e;
    }
    static get observers() {
      let e = [];
      if (s)
        for (let t, i = 0; i < s.length; i++)
          (t = s[i]), t.observers && (e = e.concat(t.observers));
      return t.observers && (e = e.concat(t.observers)), e;
    }
    created() {
      super.created();
      const t = n.created;
      if (t) for (let e = 0; e < t.length; e++) t[e].call(this);
    }
    _registered() {
      const t = r.prototype;
      if (
        !t.hasOwnProperty(JSCompiler_renameProperty('__hasRegisterFinished', t))
      ) {
        (t.At = !0), super._registered(), ft && o(t);
        const e = Object.getPrototypeOf(this);
        let i = n.beforeRegister;
        if (i) for (let t = 0; t < i.length; t++) i[t].call(e);
        if (((i = n.registered), i))
          for (let t = 0; t < i.length; t++) i[t].call(e);
      }
    }
    _applyListeners() {
      super._applyListeners();
      const t = n.listeners;
      if (t)
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          if (i)
            for (let t in i) this._addMethodEventListenerToNode(this, t, i[t]);
        }
    }
    _ensureAttributes() {
      const t = n.hostAttributes;
      if (t)
        for (let e = t.length - 1; e >= 0; e--) {
          const i = t[e];
          for (let t in i) this._ensureAttribute(t, i[t]);
        }
      super._ensureAttributes();
    }
    ready() {
      super.ready();
      let t = n.ready;
      if (t) for (let e = 0; e < t.length; e++) t[e].call(this);
    }
    attached() {
      super.attached();
      let t = n.attached;
      if (t) for (let e = 0; e < t.length; e++) t[e].call(this);
    }
    detached() {
      super.detached();
      let t = n.detached;
      if (t) for (let e = 0; e < t.length; e++) t[e].call(this);
    }
    attributeChanged(t, e, i) {
      super.attributeChanged();
      let s = n.attributeChanged;
      if (s) for (let n = 0; n < s.length; n++) s[n].call(this, t, e, i);
    }
  }
  if (i) {
    Array.isArray(i) || (i = [i]);
    let t = e.prototype.behaviors;
    (s = $s(i, null, t)), (r.prototype.behaviors = t ? t.concat(i) : s);
  }
  const o = (e) => {
    s &&
      (function (t, e, i) {
        for (let s = 0; s < e.length; s++) Os(t, e[s], i, Ps);
      })(e, s, n),
      Os(e, t, n, Es);
  };
  return ft || o(r.prototype), (r.generatedFrom = t), r;
}
const Bs = function (t) {
  let e;
  return (
    (e = 'function' == typeof t ? t : Bs.Class(t)),
    t._legacyForceObservedAttributes &&
      (e.prototype._legacyForceObservedAttributes =
        t._legacyForceObservedAttributes),
    customElements.define(e.is, e),
    e
  );
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Is(t, e, i, s, n) {
  let r;
  n && ((r = 'object' == typeof i && null !== i), r && (s = t.st[e]));
  let o = s !== i && (s == s || i == i);
  return r && o && (t.st[e] = i), o;
}
Bs.Class = function (t, e) {
  t || console.warn('Polymer.Class requires `info` argument');
  let i = e ? e(Ds) : Ds;
  return (i = js(t, i, t.behaviors)), (i.is = i.prototype.is = t.is), i;
};
const Rs = xt(
    (t) =>
      class extends t {
        _shouldPropertyChange(t, e, i) {
          return Is(this, t, e, i, !0);
        }
      }
  ),
  Fs = xt(
    (t) =>
      class extends t {
        static get properties() {
          return {mutableData: Boolean};
        }
        _shouldPropertyChange(t, e, i) {
          return Is(this, t, e, i, this.mutableData);
        }
      }
  );
Rs._mutablePropertyChange = Is;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Us = null;
function Ks() {
  return Us;
}
Ks.prototype = Object.create(HTMLTemplateElement.prototype, {
  constructor: {value: Ks, writable: !0},
});
const qs = ei(Ks),
  Js = Rs(qs);
const Zs = ei(class {});
function Ws(t, e) {
  for (let i = 0; i < e.length; i++) {
    let s = e[i];
    if (Boolean(t) != Boolean(s.Et))
      if (s.nodeType === Node.TEXT_NODE)
        t
          ? ((s.Pt = s.textContent), (s.textContent = ''))
          : (s.textContent = s.Pt);
      else if ('slot' === s.localName)
        if (t)
          (s.Ot = document.createComment('hidden-slot')),
            Dt(Dt(s).parentNode).replaceChild(s.Ot, s);
        else {
          const t = s.Ot;
          t && Dt(Dt(t).parentNode).replaceChild(s, t);
        }
      else
        s.style &&
          (t
            ? ((s.$t = s.style.display), (s.style.display = 'none'))
            : (s.style.display = s.$t));
    (s.Et = t), s._showHideChildren && s._showHideChildren(t);
  }
}
class Gs extends Zs {
  constructor(t) {
    super(),
      this._configureProperties(t),
      (this.root = this._stampTemplate(this.it));
    let e = [];
    this.children = e;
    for (let t = this.root.firstChild; t; t = t.nextSibling)
      e.push(t), (t.Nt = this);
    this.Dt && this.Dt.Et && this._showHideChildren(!0);
    let i = this.jt;
    ((t && i.instanceProps) || !i.instanceProps) && this._enableProperties();
  }
  _configureProperties(t) {
    if (this.jt.forwardHostProp)
      for (let t in this.Bt) this._setPendingProperty(t, this.it['_host_' + t]);
    for (let e in t) this._setPendingProperty(e, t[e]);
  }
  forwardHostProp(t, e) {
    this._setPendingPropertyOrPath(t, e, !1, !0) &&
      this.it._enqueueClient(this);
  }
  _addEventListenerToNode(t, e, i) {
    if (this._methodHost && this.jt.parentModel)
      this._methodHost._addEventListenerToNode(t, e, (t) => {
        (t.model = this), i(t);
      });
    else {
      let s = this.it.it;
      s && s._addEventListenerToNode(t, e, i);
    }
  }
  _showHideChildren(t) {
    Ws(t, this.children);
  }
  _setUnmanagedPropertyToNode(t, e, i) {
    t.Et && t.nodeType == Node.TEXT_NODE && 'textContent' == e
      ? (t.Pt = i)
      : super._setUnmanagedPropertyToNode(t, e, i);
  }
  get parentModel() {
    let t = this.It;
    if (!t) {
      let e;
      t = this;
      do {
        t = t.it.it;
      } while ((e = t.jt) && !e.parentModel);
      this.It = t;
    }
    return t;
  }
  dispatchEvent(t) {
    return !0;
  }
}
Gs.prototype.it,
  Gs.prototype.jt,
  Gs.prototype._methodHost,
  Gs.prototype.Dt,
  Gs.prototype.Bt;
const Ys = Rs(Gs);
function Qs(t) {
  let e = t.it;
  return (e && e._methodHost) || e;
}
function Xs(t, e, i) {
  let s = i.mutableData ? Ys : Gs;
  nn.mixin && (s = nn.mixin(s));
  let n = class extends s {};
  return (
    (n.prototype.jt = i),
    n.prototype._bindTemplate(t),
    (function (t, e, i, s) {
      let n = i.hostProps || {};
      for (let e in s.instanceProps) {
        delete n[e];
        let i = s.notifyInstanceProp;
        i &&
          t.prototype._addPropertyEffect(
            e,
            t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
            {fn: sn(e, i)}
          );
      }
      if (s.forwardHostProp && e.it)
        for (let e in n)
          i.hasHostProps || (i.hasHostProps = !0),
            t.prototype._addPropertyEffect(
              e,
              t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
              {
                fn: function (t, e, i) {
                  t.it._setPendingPropertyOrPath('_host_' + e, i[e], !0, !0);
                },
              }
            );
    })(n, t, e, i),
    n
  );
}
function tn(t, e, i, s) {
  let n = i.forwardHostProp;
  if (n && e.hasHostProps) {
    const r = 'template' == t.localName;
    let o = e.templatizeTemplateClass;
    if (!o) {
      if (r) {
        let t = i.mutableData ? Js : qs;
        class s extends t {}
        o = e.templatizeTemplateClass = s;
      } else {
        const i = t.constructor;
        class s extends i {}
        o = e.templatizeTemplateClass = s;
      }
      let h = e.hostProps;
      for (let t in h)
        o.prototype._addPropertyEffect(
          '_host_' + t,
          o.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,
          {fn: en(t, n)}
        ),
          o.prototype._createNotifyingProperty('_host_' + t);
      vt &&
        s &&
        (function (t, e, i) {
          const s = i.constructor._properties,
            {propertyEffects: n} = t,
            {instanceProps: r} = e;
          for (let t in n)
            if (!(s[t] || (r && r[t]))) {
              const e = n[t];
              for (let i = 0; i < e.length; i++) {
                const {part: s} = e[i].info;
                if (!s.signature || !s.signature.static) {
                  console.warn(
                    `Property '${t}' used in template but not declared in 'properties'; attribute will not be observed.`
                  );
                  break;
                }
              }
            }
        })(e, i, s);
    }
    if ((t.U && Object.assign(t.P, t.U), r))
      !(function (t, e) {
        (Us = t), Object.setPrototypeOf(t, e.prototype), new e(), (Us = null);
      })(t, o),
        (t.st = {}),
        (t.j = null),
        (t.B = null),
        t._enableProperties();
    else {
      Object.setPrototypeOf(t, o.prototype);
      const i = e.hostProps;
      for (let e in i)
        if (((e = '_host_' + e), e in t)) {
          const i = t[e];
          delete t[e], (t.P[e] = i);
        }
    }
  }
}
function en(t, e) {
  return function (t, i, s) {
    e.call(t.Dt, i.substring('_host_'.length), s[i]);
  };
}
function sn(t, e) {
  return function (t, i, s) {
    e.call(t.Dt, t, i, s[i]);
  };
}
function nn(t, e, i) {
  if (dt && !Qs(t))
    throw new Error('strictTemplatePolicy: template owner not trusted');
  if (((i = i || {}), t.Dt))
    throw new Error('A <template> can only be templatized once');
  t.Dt = e;
  let s = (e ? e.constructor : Gs)._parseTemplate(t),
    n = s.templatizeInstanceClass;
  n || ((n = Xs(t, s, i)), (s.templatizeInstanceClass = n));
  const r = Qs(t);
  tn(t, s, i, r);
  let o = class extends n {};
  return (
    (o.prototype._methodHost = r),
    (o.prototype.it = t),
    (o.prototype.Dt = e),
    (o.prototype.Bt = s.hostProps),
    (o = o),
    o
  );
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let rn = !1;
function on() {
  if (ft && !ht) {
    if (!rn) {
      rn = !0;
      const t = document.createElement('style');
      (t.textContent = 'dom-bind,dom-if,dom-repeat{display:none;}'),
        document.head.appendChild(t);
    }
    return !0;
  }
  return !1;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const hn = qi(Fs(ei(HTMLElement)));
customElements.define(
  'dom-bind',
  class extends hn {
    static get observedAttributes() {
      return ['mutable-data'];
    }
    constructor() {
      if ((super(), dt))
        throw new Error('strictTemplatePolicy: dom-bind not allowed');
      (this.root = null), (this.$ = null), (this.Rt = null);
    }
    attributeChangedCallback(t, e, i, s) {
      this.mutableData = !0;
    }
    connectedCallback() {
      on() || (this.style.display = 'none'), this.render();
    }
    disconnectedCallback() {
      this.Ft();
    }
    Ut() {
      Dt(Dt(this).parentNode).insertBefore(this.root, this);
    }
    Ft() {
      if (this.Rt)
        for (let t = 0; t < this.Rt.length; t++)
          this.root.appendChild(this.Rt[t]);
    }
    render() {
      let t;
      if (!this.Rt) {
        if (((t = t || this.querySelector('template')), !t)) {
          let e = new MutationObserver(() => {
            if (((t = this.querySelector('template')), !t))
              throw new Error('dom-bind requires a <template> child');
            e.disconnect(), this.render();
          });
          return void e.observe(this, {childList: !0});
        }
        (this.root = this._stampTemplate(t)),
          (this.$ = this.root.$),
          (this.Rt = []);
        for (let t = this.root.firstChild; t; t = t.nextSibling)
          this.Rt[this.Rt.length] = t;
        this._enableProperties();
      }
      this.Ut(),
        this.dispatchEvent(
          new CustomEvent('dom-change', {bubbles: !0, composed: !0})
        );
    }
  }
);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class an {
  constructor(t) {
    this.value = t.toString();
  }
  toString() {
    return this.value;
  }
}
function ln(t) {
  if (t instanceof HTMLTemplateElement) return t.innerHTML;
  if (t instanceof an)
    return (function (t) {
      if (t instanceof an) return t.value;
      throw new Error(
        `non-literal value passed to Polymer's htmlLiteral function: ${t}`
      );
    })(t);
  throw new Error(`non-template value passed to Polymer's html function: ${t}`);
}
const cn = function (t, ...e) {
    const i = document.createElement('template');
    return (i.innerHTML = e.reduce((e, i, s) => e + ln(i) + t[s + 1], t[0])), i;
  },
  pn = ri(HTMLElement),
  dn = Fs(pn);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ class un extends dn {
  static get is() {
    return 'dom-repeat';
  }
  static get template() {
    return null;
  }
  static get properties() {
    return {
      items: {type: Array},
      as: {type: String, value: 'item'},
      indexAs: {type: String, value: 'index'},
      itemsIndexAs: {type: String, value: 'itemsIndex'},
      sort: {type: Function, observer: '__sortChanged'},
      filter: {type: Function, observer: '__filterChanged'},
      observe: {type: String, observer: '__observeChanged'},
      delay: Number,
      renderedItemCount: {type: Number, notify: !wt, readOnly: !0},
      initialCount: {type: Number},
      targetFramerate: {type: Number, value: 20},
      _targetFrameTime: {
        type: Number,
        computed: '__computeFrameTime(targetFramerate)',
      },
      notifyDomChange: {type: Boolean},
      reuseChunkedInstances: {type: Boolean},
    };
  }
  static get observers() {
    return ['__itemsChanged(items.*)'];
  }
  constructor() {
    super(),
      (this.Kt = []),
      (this.qt = null),
      (this.Jt = {}),
      (this.Zt = null),
      (this.Wt = null),
      (this.Gt = !1),
      (this.Yt = !1),
      (this.Qt = !1),
      (this.Xt = 0),
      (this.te = null),
      (this.ee = null),
      (this.ie = null),
      (this.se = null),
      (this.ne = !0),
      (this.template = null),
      this._templateInfo;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), (this.ne = !0);
    for (let t = 0; t < this.Kt.length; t++) this.re(t);
  }
  connectedCallback() {
    if (
      (super.connectedCallback(),
      on() || (this.style.display = 'none'),
      this.ne)
    ) {
      this.ne = !1;
      let t = Dt(Dt(this).parentNode);
      for (let e = 0; e < this.Kt.length; e++) this.oe(e, t);
    }
  }
  he() {
    if (!this.se) {
      const t = this;
      let e = (this.template = t._templateInfo
        ? t
        : this.querySelector('template'));
      if (!e) {
        let t = new MutationObserver(() => {
          if (!this.querySelector('template'))
            throw new Error('dom-repeat requires a <template> child');
          t.disconnect(), this.ae();
        });
        return t.observe(this, {childList: !0}), !1;
      }
      let i = {};
      (i[this.as] = !0),
        (i[this.indexAs] = !0),
        (i[this.itemsIndexAs] = !0),
        (this.se = nn(e, this, {
          mutableData: this.mutableData,
          parentModel: !0,
          instanceProps: i,
          forwardHostProp: function (t, e) {
            let i = this.Kt;
            for (let s, n = 0; n < i.length && (s = i[n]); n++)
              s.forwardHostProp(t, e);
          },
          notifyInstanceProp: function (t, e, i) {
            if ((s = this.as) === (n = e) || It(s, n) || Rt(s, n)) {
              let s = t[this.itemsIndexAs];
              e == this.as && (this.items[s] = i);
              let n = Ft(
                this.as,
                `${JSCompiler_renameProperty('items', this)}.${s}`,
                e
              );
              this.notifyPath(n, i);
            }
            var s, n;
          },
        }));
    }
    return !0;
  }
  le() {
    return this.it._methodHost || this.it;
  }
  ce(t) {
    if ('string' == typeof t) {
      let e = t,
        i = this.le();
      return function () {
        return i[e].apply(i, arguments);
      };
    }
    return t;
  }
  pe(t) {
    (this.te = this.ce(t)), this.items && this.de(this.ae);
  }
  ue(t) {
    (this.ee = this.ce(t)), this.items && this.de(this.ae);
  }
  fe(t) {
    return Math.ceil(1e3 / t);
  }
  ve() {
    this.ie = this.observe && this.observe.replace('.*', '.').split(' ');
  }
  ge(t) {
    if (this.te || this.ee)
      if (t) {
        if (this.ie) {
          let e = this.ie;
          for (let i = 0; i < e.length; i++)
            0 === t.indexOf(e[i]) && this.de(this.ae, this.delay);
        }
      } else this.de(this.ae, this.delay);
  }
  me(t) {
    this.items &&
      !Array.isArray(this.items) &&
      console.warn('dom-repeat expected array for `items`, found', this.items),
      this.be(t.path, t.value) ||
        ('items' === t.path && (this.Gt = !0), this.de(this.ae));
  }
  de(t, e = 0) {
    (this.qt = oi.debounce(this.qt, e > 0 ? re.after(e) : he, t.bind(this))),
      ai(this.qt);
  }
  render() {
    this.de(this.ae), ms();
  }
  ae() {
    if (!this.he()) return;
    let t = this.items || [];
    const e = this.ye(t),
      i = this.ze(e.length);
    this.we(t, i, e),
      this.initialCount &&
        (this.Yt || this.Qt) &&
        (cancelAnimationFrame(this.Xt),
        (this.Xt = requestAnimationFrame(() => this._e()))),
      this._setRenderedItemCount(this.Kt.length),
      (wt && !this.notifyDomChange) ||
        this.dispatchEvent(
          new CustomEvent('dom-change', {bubbles: !0, composed: !0})
        );
  }
  ye(t) {
    let e = new Array(t.length);
    for (let i = 0; i < t.length; i++) e[i] = i;
    return (
      this.ee && (e = e.filter((e, i, s) => this.ee(t[e], i, s))),
      this.te && e.sort((e, i) => this.te(t[e], t[i])),
      e
    );
  }
  ze(t) {
    let e = t;
    const i = this.Kt.length;
    if (this.initialCount) {
      let s;
      !this.Zt || (this.Gt && !this.reuseChunkedInstances)
        ? ((e = Math.min(t, this.initialCount)),
          (s = Math.max(e - i, 0)),
          (this.Zt = s || 1))
        : ((s = Math.min(Math.max(t - i, 0), this.Zt)),
          (e = Math.min(i + s, t))),
        (this.Yt = s === this.Zt),
        (this.Qt = e < t),
        (this.Wt = performance.now());
    }
    return (this.Gt = !1), e;
  }
  _e() {
    if (this.Yt) {
      const t = performance.now() - this.Wt,
        e = this._targetFrameTime / t;
      this.Zt = Math.round(this.Zt * e) || 1;
    }
    this.Qt && this.de(this.ae);
  }
  we(t, e, i) {
    const s = (this.Jt = {});
    let n;
    for (n = 0; n < e; n++) {
      let e = this.Kt[n],
        r = i[n],
        o = t[r];
      (s[r] = n),
        e
          ? (e._setPendingProperty(this.as, o),
            e._setPendingProperty(this.indexAs, n),
            e._setPendingProperty(this.itemsIndexAs, r),
            e._flushProperties())
          : this.Me(o, n, r);
    }
    for (let t = this.Kt.length - 1; t >= n; t--) this.He(t);
  }
  re(t) {
    let e = this.Kt[t];
    const i = Dt(e.root);
    for (let t = 0; t < e.children.length; t++) {
      let s = e.children[t];
      i.appendChild(s);
    }
    return e;
  }
  oe(t, e) {
    let i = this.Kt[t];
    e.insertBefore(i.root, this);
  }
  He(t) {
    this.re(t), this.Kt.splice(t, 1);
  }
  xe(t, e, i) {
    let s = {};
    return (
      (s[this.as] = t),
      (s[this.indexAs] = e),
      (s[this.itemsIndexAs] = i),
      new this.se(s)
    );
  }
  Me(t, e, i) {
    const s = this.xe(t, e, i);
    let n = this.Kt[e + 1],
      r = n ? n.children[0] : this;
    return Dt(Dt(this).parentNode).insertBefore(s.root, r), (this.Kt[e] = s), s;
  }
  _showHideChildren(t) {
    for (let e = 0; e < this.Kt.length; e++) this.Kt[e]._showHideChildren(t);
  }
  be(t, e) {
    let i = t.slice(6),
      s = i.indexOf('.'),
      n = s < 0 ? i : i.substring(0, s);
    if (n == parseInt(n, 10)) {
      let t = s < 0 ? '' : i.substring(s + 1);
      this.ge(t);
      let r = this.Jt[n],
        o = this.Kt[r];
      if (o) {
        let i = this.as + (t ? '.' + t : '');
        o._setPendingPropertyOrPath(i, e, !1, !0), o._flushProperties();
      }
      return !0;
    }
  }
  itemForElement(t) {
    let e = this.modelForElement(t);
    return e && e[this.as];
  }
  indexForElement(t) {
    let e = this.modelForElement(t);
    return e && e[this.indexAs];
  }
  modelForElement(t) {
    return (function (t, e) {
      let i;
      for (; e; )
        if ((i = e.it ? e : e.Nt)) {
          if (i.it == t) return i;
          e = i.it;
        } else e = Dt(e).parentNode;
      return null;
    })(this.template, t);
  }
}
customElements.define(un.is, un);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class fn extends pn {
  static get is() {
    return 'dom-if';
  }
  static get template() {
    return null;
  }
  static get properties() {
    return {
      if: {type: Boolean, observer: '__debounceRender'},
      restamp: {type: Boolean, observer: '__debounceRender'},
      notifyDomChange: {type: Boolean},
    };
  }
  constructor() {
    super(),
      (this.qt = null),
      (this._lastIf = !1),
      (this.Et = !1),
      this.ke,
      this._templateInfo;
  }
  de() {
    (this.qt = oi.debounce(this.qt, he, () => this.ae())), ai(this.qt);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    const t = Dt(this).parentNode;
    (t && (t.nodeType != Node.DOCUMENT_FRAGMENT_NODE || Dt(t).host)) ||
      this.Ce();
  }
  connectedCallback() {
    super.connectedCallback(),
      on() || (this.style.display = 'none'),
      this.if && this.de();
  }
  Ve() {
    if (!this.ke) {
      const t = this;
      let e = t._templateInfo ? t : Dt(t).querySelector('template');
      if (!e) {
        let t = new MutationObserver(() => {
          if (!Dt(this).querySelector('template'))
            throw new Error('dom-if requires a <template> child');
          t.disconnect(), this.ae();
        });
        return t.observe(this, {childList: !0}), !1;
      }
      this.ke = e;
    }
    return !0;
  }
  Le() {
    let t = Dt(this).parentNode;
    if (this.Se()) {
      let e = this.Te();
      if (e && e.length) {
        if (Dt(this).previousSibling !== e[e.length - 1])
          for (let i, s = 0; s < e.length && (i = e[s]); s++)
            Dt(t).insertBefore(i, this);
      }
    } else {
      if (!t) return !1;
      if (!this.Ve()) return !1;
      this.Ae(t);
    }
    return !0;
  }
  render() {
    ms();
  }
  ae() {
    if (this.if) {
      if (!this.Le()) return;
    } else this.restamp && this.Ce();
    this._showHideChildren(),
      (wt && !this.notifyDomChange) ||
        this.if == this._lastIf ||
        (this.dispatchEvent(
          new CustomEvent('dom-change', {bubbles: !0, composed: !0})
        ),
        (this._lastIf = this.if));
  }
  Se() {}
  Te() {}
  Ae(t) {}
  Ce() {}
  _showHideChildren() {}
}
const vn = zt
  ? class extends fn {
      constructor() {
        super(), (this.Ee = null), (this.Pe = null);
      }
      Se() {
        return Boolean(this.Ee);
      }
      Te() {
        return this.Ee.templateInfo.childNodes;
      }
      Ae(t) {
        const e = this.it || this;
        if (dt && !this.it)
          throw new Error('strictTemplatePolicy: template owner not trusted');
        const i = e._bindTemplate(this.ke, !0);
        (i.runEffects = (t, e, i) => {
          let s = this.Pe;
          if (this.if)
            s &&
              ((this.Pe = null),
              this._showHideChildren(),
              (e = Object.assign(s.changedProps, e))),
              t(e, i);
          else if (this.Ee)
            if ((s || (s = this.Pe = {runEffects: t, changedProps: {}}), i))
              for (const t in e) {
                const e = Bt(t);
                s.changedProps[e] = this.it[e];
              }
            else Object.assign(s.changedProps, e);
        }),
          (this.Ee = e._stampTemplate(this.ke, i)),
          Dt(t).insertBefore(this.Ee, this);
      }
      Oe() {
        const t = this.Pe;
        t && ((this.Pe = null), t.runEffects(t.changedProps, !1));
      }
      Ce() {
        const t = this.it || this;
        this.Ee &&
          (t._removeBoundDom(this.Ee), (this.Ee = null), (this.Pe = null));
      }
      _showHideChildren() {
        const t = this.Et || !this.if;
        this.Ee &&
          Boolean(this.Ee.$e) !== t &&
          ((this.Ee.$e = t), Ws(t, this.Ee.templateInfo.childNodes)),
          t || this.Oe();
      }
    }
  : class extends fn {
      constructor() {
        super(), (this.se = null), (this.Ee = null), (this.Ne = null);
      }
      Se() {
        return Boolean(this.Ee);
      }
      Te() {
        return this.Ee.children;
      }
      Ae(t) {
        this.se ||
          (this.se = nn(this.ke, this, {
            mutableData: !0,
            forwardHostProp: function (t, e) {
              this.Ee &&
                (this.if
                  ? this.Ee.forwardHostProp(t, e)
                  : ((this.Ne = this.Ne || Object.create(null)),
                    (this.Ne[Bt(t)] = !0)));
            },
          })),
          (this.Ee = new this.se()),
          Dt(t).insertBefore(this.Ee.root, this);
      }
      Ce() {
        if (this.Ee) {
          let t = this.Ee.children;
          if (t && t.length) {
            let e = Dt(t[0]).parentNode;
            if (e) {
              e = Dt(e);
              for (let i, s = 0; s < t.length && (i = t[s]); s++)
                e.removeChild(i);
            }
          }
          (this.Ne = null), (this.Ee = null);
        }
      }
      Oe() {
        let t = this.Ne;
        if (t) {
          this.Ne = null;
          for (let e in t) this.Ee._setPendingProperty(e, this.it[e]);
          this.Ee._flushProperties();
        }
      }
      _showHideChildren() {
        const t = this.Et || !this.if;
        this.Ee &&
          Boolean(this.Ee.$e) !== t &&
          ((this.Ee.$e = t), this.Ee._showHideChildren(t)),
          t || this.Oe();
      }
    };
customElements.define(vn.is, vn);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let gn = xt((t) => {
  let e = ri(t);
  return class extends e {
    static get properties() {
      return {
        items: {type: Array},
        multi: {type: Boolean, value: !1},
        selected: {type: Object, notify: !0},
        selectedItem: {type: Object, notify: !0},
        toggle: {type: Boolean, value: !1},
      };
    }
    static get observers() {
      return ['__updateSelection(multi, items.*)'];
    }
    constructor() {
      super(), (this.De = null), (this.je = null), (this.Be = null);
    }
    Ie(t, e) {
      let i = e.path;
      if (i == JSCompiler_renameProperty('items', this)) {
        let i = e.base || [],
          s = this.De;
        if ((t !== this.je && this.clearSelection(), s)) {
          let t = us(i, s);
          this.Re(t);
        }
        (this.De = i), (this.je = t);
      } else if (
        e.path == `${JSCompiler_renameProperty('items', this)}.splices`
      )
        this.Re(e.value.indexSplices);
      else {
        let t = i.slice(`${JSCompiler_renameProperty('items', this)}.`.length),
          e = parseInt(t, 10);
        t.indexOf('.') < 0 && t == e && this.Fe(e);
      }
    }
    Re(t) {
      let e = this.Be;
      for (let i = 0; i < t.length; i++) {
        let s = t[i];
        e.forEach((t, i) => {
          t < s.index ||
            (t >= s.index + s.removed.length
              ? e.set(i, t + s.addedCount - s.removed.length)
              : e.set(i, -1));
        });
        for (let t = 0; t < s.addedCount; t++) {
          let i = s.index + t;
          e.has(this.items[i]) && e.set(this.items[i], i);
        }
      }
      this.Ue();
      let i = 0;
      e.forEach((t, s) => {
        t < 0
          ? (this.multi
              ? this.splice(JSCompiler_renameProperty('selected', this), i, 1)
              : (this.selected = this.selectedItem = null),
            e.delete(s))
          : i++;
      });
    }
    Ue() {
      if (((this.tt = {}), this.multi)) {
        let t = 0;
        this.Be.forEach((e) => {
          e >= 0 &&
            this.linkPaths(
              `${JSCompiler_renameProperty('items', this)}.${e}`,
              `${JSCompiler_renameProperty('selected', this)}.${t++}`
            );
        });
      } else
        this.Be.forEach((t) => {
          this.linkPaths(
            JSCompiler_renameProperty('selected', this),
            `${JSCompiler_renameProperty('items', this)}.${t}`
          ),
            this.linkPaths(
              JSCompiler_renameProperty('selectedItem', this),
              `${JSCompiler_renameProperty('items', this)}.${t}`
            );
        });
    }
    clearSelection() {
      (this.tt = {}),
        (this.Be = new Map()),
        (this.selected = this.multi ? [] : null),
        (this.selectedItem = null);
    }
    isSelected(t) {
      return this.Be.has(t);
    }
    isIndexSelected(t) {
      return this.isSelected(this.items[t]);
    }
    Fe(t) {
      let e = this.Ke(t);
      if (e >= 0) {
        let t = 0;
        this.Be.forEach((i, s) => {
          e == t++ && this.deselect(s);
        });
      }
    }
    Ke(t) {
      let e = this.tt[`${JSCompiler_renameProperty('items', this)}.${t}`];
      if (e)
        return parseInt(
          e.slice(`${JSCompiler_renameProperty('selected', this)}.`.length),
          10
        );
    }
    deselect(t) {
      let e = this.Be.get(t);
      if (e >= 0) {
        let i;
        this.Be.delete(t),
          this.multi && (i = this.Ke(e)),
          this.Ue(),
          this.multi
            ? this.splice(JSCompiler_renameProperty('selected', this), i, 1)
            : (this.selected = this.selectedItem = null);
      }
    }
    deselectIndex(t) {
      this.deselect(this.items[t]);
    }
    select(t) {
      this.selectIndex(this.items.indexOf(t));
    }
    selectIndex(t) {
      let e = this.items[t];
      this.isSelected(e)
        ? this.toggle && this.deselectIndex(t)
        : (this.multi || this.Be.clear(),
          this.Be.set(e, t),
          this.Ue(),
          this.multi
            ? this.push(JSCompiler_renameProperty('selected', this), e)
            : (this.selected = this.selectedItem = e));
    }
  };
})(pn);
class mn extends gn {
  static get is() {
    return 'array-selector';
  }
  static get template() {
    return null;
  }
}
customElements.define(mn.is, mn);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const bn = new Y();
window.ShadyCSS ||
  (window.ShadyCSS = {
    prepareTemplate(t, e, i) {},
    prepareTemplateDom(t, e) {},
    prepareTemplateStyles(t, e, i) {},
    styleSubtree(t, e) {
      bn.processStyles(), L(t, e);
    },
    styleElement(t) {
      bn.processStyles();
    },
    styleDocument(t) {
      bn.processStyles(), L(document.body, t);
    },
    getComputedStyleValue: (t, e) => S(t, e),
    flushCustomStyles() {},
    nativeCss: r,
    nativeShadow: t,
    cssBuild: i,
    disableRuntime: n,
  }),
  (window.ShadyCSS.CustomStyleInterface = bn);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const yn = window.ShadyCSS.CustomStyleInterface;
class zn extends HTMLElement {
  constructor() {
    super(), (this._style = null), yn.addCustomStyle(this);
  }
  getStyle() {
    if (this._style) return this._style;
    const t = this.querySelector('style');
    if (!t) return null;
    this._style = t;
    const e = t.getAttribute('include');
    return (
      e &&
        (t.removeAttribute('include'),
        (t.textContent =
          (function (t) {
            let e = t.trim().split(/\s+/),
              i = '';
            for (let t = 0; t < e.length; t++) i += Nt(e[t]);
            return i;
          })(e) + t.textContent)),
      this.ownerDocument !== window.document &&
        window.document.head.appendChild(this),
      this._style
    );
  }
}
window.customElements.define('custom-style', zn);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const wn = Ts(HTMLElement).prototype,
  _n = cn`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ _n.setAttribute('style', 'display: none;'),
  document.head.appendChild(_n.content);
var Mn = document.createElement('style');
(Mn.textContent = '[hidden] { display: none !important; }'),
  document.head.appendChild(Mn);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class Hn {
  constructor(t) {
    Hn[' '](t),
      (this.type = (t && t.type) || 'default'),
      (this.key = t && t.key),
      t && 'value' in t && (this.value = t.value);
  }
  get value() {
    var t = this.type,
      e = this.key;
    if (t && e) return Hn.types[t] && Hn.types[t][e];
  }
  set value(t) {
    var e = this.type,
      i = this.key;
    e &&
      i &&
      ((e = Hn.types[e] = Hn.types[e] || {}),
      null == t ? delete e[i] : (e[i] = t));
  }
  get list() {
    if (this.type) {
      var t = Hn.types[this.type];
      return t
        ? Object.keys(t).map(function (t) {
            return xn[this.type][t];
          }, this)
        : [];
    }
  }
  byKey(t) {
    return (this.key = t), this.value;
  }
}
(Hn[' '] = function () {}), (Hn.types = {});
var xn = Hn.types;
Bs({
  is: 'iron-meta',
  properties: {
    type: {type: String, value: 'default'},
    key: {type: String},
    value: {type: String, notify: !0},
    self: {type: Boolean, observer: '_selfChanged'},
    qe: {type: Boolean, computed: '__computeMeta(type, key, value)'},
  },
  hostAttributes: {hidden: !0},
  Je: function (t, e, i) {
    var s = new Hn({type: t, key: e});
    return (
      void 0 !== i && i !== s.value
        ? (s.value = i)
        : this.value !== s.value && (this.value = s.value),
      s
    );
  },
  get list() {
    return this.qe && this.qe.list;
  },
  _selfChanged: function (t) {
    t && (this.value = this);
  },
  byKey: function (t) {
    return new Hn({type: this.type, key: t}).value;
  },
}),
  /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  Bs({
    _template: cn`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        @apply --iron-icon;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
`,
    is: 'iron-icon',
    properties: {
      icon: {type: String},
      theme: {type: String},
      src: {type: String},
      _meta: {value: wn.create('iron-meta', {type: 'iconset'})},
    },
    observers: [
      '_updateIcon(_meta, isAttached)',
      '_updateIcon(theme, isAttached)',
      '_srcChanged(src, isAttached)',
      '_iconChanged(icon, isAttached)',
    ],
    _DEFAULT_ICONSET: 'icons',
    _iconChanged: function (t) {
      var e = (t || '').split(':');
      (this._iconName = e.pop()),
        (this._iconsetName = e.pop() || this._DEFAULT_ICONSET),
        this._updateIcon();
    },
    _srcChanged: function (t) {
      this._updateIcon();
    },
    _usesIconset: function () {
      return this.icon || !this.src;
    },
    _updateIcon: function () {
      this._usesIconset()
        ? (this._img &&
            this._img.parentNode &&
            xs(this.root).removeChild(this._img),
          '' === this._iconName
            ? this._iconset && this._iconset.removeIcon(this)
            : this._iconsetName &&
              this._meta &&
              ((this._iconset = this._meta.byKey(this._iconsetName)),
              this._iconset
                ? (this._iconset.applyIcon(this, this._iconName, this.theme),
                  this.unlisten(window, 'iron-iconset-added', '_updateIcon'))
                : this.listen(window, 'iron-iconset-added', '_updateIcon')))
        : (this._iconset && this._iconset.removeIcon(this),
          this._img ||
            ((this._img = document.createElement('img')),
            (this._img.style.width = '100%'),
            (this._img.style.height = '100%'),
            (this._img.draggable = !1)),
          (this._img.src = this.src),
          xs(this.root).appendChild(this._img));
    },
  }),
  /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  Bs({
    is: 'iron-iconset-svg',
    properties: {
      name: {type: String, observer: '_nameChanged'},
      size: {type: Number, value: 24},
      rtlMirroring: {type: Boolean, value: !1},
      useGlobalRtlAttribute: {type: Boolean, value: !1},
    },
    created: function () {
      this._meta = new Hn({type: 'iconset', key: null, value: null});
    },
    attached: function () {
      this.style.display = 'none';
    },
    getIconNames: function () {
      return (
        (this._icons = this._createIconMap()),
        Object.keys(this._icons).map(function (t) {
          return this.name + ':' + t;
        }, this)
      );
    },
    applyIcon: function (t, e) {
      this.removeIcon(t);
      var i = this._cloneIcon(e, this.rtlMirroring && this._targetIsRTL(t));
      if (i) {
        var s = xs(t.root || t);
        return s.insertBefore(i, s.childNodes[0]), (t._svgIcon = i);
      }
      return null;
    },
    removeIcon: function (t) {
      t._svgIcon &&
        (xs(t.root || t).removeChild(t._svgIcon), (t._svgIcon = null));
    },
    _targetIsRTL: function (t) {
      if (null == this.Ze)
        if (this.useGlobalRtlAttribute) {
          var e =
            document.body && document.body.hasAttribute('dir')
              ? document.body
              : document.documentElement;
          this.Ze = 'rtl' === e.getAttribute('dir');
        } else
          t && t.nodeType !== Node.ELEMENT_NODE && (t = t.host),
            (this.Ze = t && 'rtl' === window.getComputedStyle(t).direction);
      return this.Ze;
    },
    _nameChanged: function () {
      (this._meta.value = null),
        (this._meta.key = this.name),
        (this._meta.value = this),
        this.async(function () {
          this.fire('iron-iconset-added', this, {node: window});
        });
    },
    _createIconMap: function () {
      var t = Object.create(null);
      return (
        xs(this)
          .querySelectorAll('[id]')
          .forEach(function (e) {
            t[e.id] = e;
          }),
        t
      );
    },
    _cloneIcon: function (t, e) {
      return (
        (this._icons = this._icons || this._createIconMap()),
        this._prepareSvgClone(this._icons[t], this.size, e)
      );
    },
    _prepareSvgClone: function (t, e, i) {
      if (t) {
        var s = t.cloneNode(!0),
          n = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
          r = s.getAttribute('viewBox') || '0 0 ' + e + ' ' + e,
          o =
            'pointer-events: none; display: block; width: 100%; height: 100%;';
        return (
          i &&
            s.hasAttribute('mirror-in-rtl') &&
            (o +=
              '-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;'),
          n.setAttribute('viewBox', r),
          n.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
          n.setAttribute('focusable', 'false'),
          (n.style.cssText = o),
          n.appendChild(s).removeAttribute('id'),
          n
        );
      }
      return null;
    },
  });
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const kn = cn`<iron-iconset-svg name="icons" size="24">
<svg><defs>
<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>
<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>
<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>
<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>
<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>
<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>
<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>
<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>
<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>
<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>
<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>
<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>
<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>
<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>
<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>
<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>
<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>
<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>
<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>
<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>
<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>
<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>
<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>
<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>
<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>
<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>
<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>
<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>
<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>
<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>
<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>
<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>
<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>
<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>
<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>
<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>
<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>
<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>
<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>
<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>
<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>
<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>
<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>
<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>
<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>
<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>
<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>
<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>
<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>
<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>
<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>
<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>
<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>
<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>
<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>
<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>
<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>
<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>
<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>
<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>
<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>
<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>
<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>
<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>
<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>
<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>
<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>
<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>
<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>
<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>
<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>
<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>
<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>
<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>
<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>
<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>
<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>
<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>
<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>
<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>
<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>
<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>
<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>
<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>
<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>
<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>
<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>
<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>
<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>
<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>
<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>
<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>
<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>
<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>
<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>
<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>
<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>
<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>
<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>
<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>
<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>
<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>
<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>
<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>
<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>
<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>
<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>
<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>
<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>
<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>
<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>
<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>
<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>
<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>
<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>
<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>
<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>
<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>
<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>
<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>
<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>
<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>
<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>
<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>
<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>
<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>
<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>
<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>
<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>
<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>
<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>
<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>
<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>
<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>
<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>
<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>
<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>
<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>
<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>
<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>
<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>
<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>
<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>
<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>
<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>
<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>
<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>
<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>
<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>
<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>
<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>
<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>
<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>
<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>
<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>
<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>
<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>
<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>
<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>
<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>
<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>
<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>
<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>
<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>
<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>
<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>
<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>
<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>
<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>
<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>
<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>
<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>
<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>
<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>
<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>
<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>
<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>
<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>
<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>
<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>
<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>
<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>
<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>
<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>
<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>
<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>
<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>
<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>
<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>
<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>
<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>
<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>
<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>
<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>
<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>
<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>
<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>
<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>
</defs></svg>
</iron-iconset-svg>`;
document.head.appendChild(kn.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Cn = cn`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;
Cn.setAttribute('style', 'display: none;'),
  document.head.appendChild(Cn.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Vn = cn`
<custom-style>
  <style is="custom-style">
    html {
      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);

      /*
       * Primary and accent colors. Also see color.js for more colors.
       */
      --primary-color: var(--paper-indigo-500);
      --light-primary-color: var(--paper-indigo-100);
      --dark-primary-color: var(--paper-indigo-700);

      --accent-color: var(--paper-pink-a200);
      --light-accent-color: var(--paper-pink-a100);
      --dark-accent-color: var(--paper-pink-a400);


      /*
       * Material Design Light background theme
       */
      --light-theme-background-color: #ffffff;
      --light-theme-base-color: #000000;
      --light-theme-text-color: var(--paper-grey-900);
      --light-theme-secondary-color: #737373;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb;

      /*
       * Material Design Dark background theme
       */
      --dark-theme-background-color: var(--paper-grey-900);
      --dark-theme-base-color: #ffffff;
      --dark-theme-text-color: #ffffff;
      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c;

      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color);
      --default-primary-color: var(--primary-color);
    }
  </style>
</custom-style>`;
Vn.setAttribute('style', 'display: none;'),
  document.head.appendChild(Vn.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Ln = {
  properties: {
    focused: {
      type: Boolean,
      value: !1,
      notify: !0,
      readOnly: !0,
      reflectToAttribute: !0,
    },
    disabled: {
      type: Boolean,
      value: !1,
      notify: !0,
      observer: '_disabledChanged',
      reflectToAttribute: !0,
    },
    _oldTabIndex: {type: String},
    _boundFocusBlurHandler: {
      type: Function,
      value: function () {
        return this._focusBlurHandler.bind(this);
      },
    },
  },
  observers: ['_changedControlState(focused, disabled)'],
  ready: function () {
    this.addEventListener('focus', this._boundFocusBlurHandler, !0),
      this.addEventListener('blur', this._boundFocusBlurHandler, !0);
  },
  _focusBlurHandler: function (t) {
    this._setFocused('focus' === t.type);
  },
  _disabledChanged: function (t, e) {
    this.setAttribute('aria-disabled', t ? 'true' : 'false'),
      (this.style.pointerEvents = t ? 'none' : ''),
      t
        ? ((this._oldTabIndex = this.getAttribute('tabindex')),
          this._setFocused(!1),
          (this.tabIndex = -1),
          this.blur())
        : void 0 !== this._oldTabIndex &&
          (null === this._oldTabIndex
            ? this.removeAttribute('tabindex')
            : this.setAttribute('tabindex', this._oldTabIndex));
  },
  _changedControlState: function () {
    this._controlStateChanged && this._controlStateChanged();
  },
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ var Sn = {
    'U+0008': 'backspace',
    'U+0009': 'tab',
    'U+001B': 'esc',
    'U+0020': 'space',
    'U+007F': 'del',
  },
  Tn = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    27: 'esc',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    46: 'del',
    106: '*',
  },
  An = {shift: 'shiftKey', ctrl: 'ctrlKey', alt: 'altKey', meta: 'metaKey'},
  En = /[a-z0-9*]/,
  Pn = /U\+/,
  On = /^arrow/,
  $n = /^space(bar)?/,
  Nn = /^escape$/;
function Dn(t, e) {
  var i = '';
  if (t) {
    var s = t.toLowerCase();
    ' ' === s || $n.test(s)
      ? (i = 'space')
      : Nn.test(s)
      ? (i = 'esc')
      : 1 == s.length
      ? (e && !En.test(s)) || (i = s)
      : (i = On.test(s) ? s.replace('arrow', '') : 'multiply' == s ? '*' : s);
  }
  return i;
}
function jn(t, e) {
  return t.key
    ? Dn(t.key, e)
    : t.detail && t.detail.key
    ? Dn(t.detail.key, e)
    : ((i = t.keyIdentifier),
      (s = ''),
      i &&
        (i in Sn
          ? (s = Sn[i])
          : Pn.test(i)
          ? ((i = parseInt(i.replace('U+', '0x'), 16)),
            (s = String.fromCharCode(i).toLowerCase()))
          : (s = i.toLowerCase())),
      s ||
        (function (t) {
          var e = '';
          return (
            Number(t) &&
              (e =
                t >= 65 && t <= 90
                  ? String.fromCharCode(32 + t)
                  : t >= 112 && t <= 123
                  ? 'f' + (t - 112 + 1)
                  : t >= 48 && t <= 57
                  ? String(t - 48)
                  : t >= 96 && t <= 105
                  ? String(t - 96)
                  : Tn[t]),
            e
          );
        })(t.keyCode) ||
        '');
  var i, s;
}
function Bn(t, e) {
  return (
    jn(e, t.hasModifiers) === t.key &&
    (!t.hasModifiers ||
      (!!e.shiftKey == !!t.shiftKey &&
        !!e.ctrlKey == !!t.ctrlKey &&
        !!e.altKey == !!t.altKey &&
        !!e.metaKey == !!t.metaKey))
  );
}
function In(t) {
  return t
    .trim()
    .split(' ')
    .map(function (t) {
      return (function (t) {
        return 1 === t.length
          ? {combo: t, key: t, event: 'keydown'}
          : t.split('+').reduce(
              function (t, e) {
                var i = e.split(':'),
                  s = i[0],
                  n = i[1];
                return (
                  s in An
                    ? ((t[An[s]] = !0), (t.hasModifiers = !0))
                    : ((t.key = s), (t.event = n || 'keydown')),
                  t
                );
              },
              {combo: t.split(':').shift()}
            );
      })(t);
    });
}
const Rn = {
    properties: {
      keyEventTarget: {
        type: Object,
        value: function () {
          return this;
        },
      },
      stopKeyboardEventPropagation: {type: Boolean, value: !1},
      _boundKeyHandlers: {
        type: Array,
        value: function () {
          return [];
        },
      },
      _imperativeKeyBindings: {
        type: Object,
        value: function () {
          return {};
        },
      },
    },
    observers: ['_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)'],
    keyBindings: {},
    registered: function () {
      this._prepKeyBindings();
    },
    attached: function () {
      this._listenKeyEventListeners();
    },
    detached: function () {
      this._unlistenKeyEventListeners();
    },
    addOwnKeyBinding: function (t, e) {
      (this._imperativeKeyBindings[t] = e),
        this._prepKeyBindings(),
        this._resetKeyEventListeners();
    },
    removeOwnKeyBindings: function () {
      (this._imperativeKeyBindings = {}),
        this._prepKeyBindings(),
        this._resetKeyEventListeners();
    },
    keyboardEventMatchesKeys: function (t, e) {
      for (var i = In(e), s = 0; s < i.length; ++s) if (Bn(i[s], t)) return !0;
      return !1;
    },
    _collectKeyBindings: function () {
      var t = this.behaviors.map(function (t) {
        return t.keyBindings;
      });
      return -1 === t.indexOf(this.keyBindings) && t.push(this.keyBindings), t;
    },
    _prepKeyBindings: function () {
      for (var t in ((this._keyBindings = {}),
      this._collectKeyBindings().forEach(function (t) {
        for (var e in t) this._addKeyBinding(e, t[e]);
      }, this),
      this._imperativeKeyBindings))
        this._addKeyBinding(t, this._imperativeKeyBindings[t]);
      for (var e in this._keyBindings)
        this._keyBindings[e].sort(function (t, e) {
          var i = t[0].hasModifiers;
          return i === e[0].hasModifiers ? 0 : i ? -1 : 1;
        });
    },
    _addKeyBinding: function (t, e) {
      In(t).forEach(function (t) {
        (this._keyBindings[t.event] = this._keyBindings[t.event] || []),
          this._keyBindings[t.event].push([t, e]);
      }, this);
    },
    _resetKeyEventListeners: function () {
      this._unlistenKeyEventListeners(),
        this.isAttached && this._listenKeyEventListeners();
    },
    _listenKeyEventListeners: function () {
      this.keyEventTarget &&
        Object.keys(this._keyBindings).forEach(function (t) {
          var e = this._keyBindings[t],
            i = this._onKeyBindingEvent.bind(this, e);
          this._boundKeyHandlers.push([this.keyEventTarget, t, i]),
            this.keyEventTarget.addEventListener(t, i);
        }, this);
    },
    _unlistenKeyEventListeners: function () {
      for (var t, e, i, s; this._boundKeyHandlers.length; )
        (e = (t = this._boundKeyHandlers.pop())[0]),
          (i = t[1]),
          (s = t[2]),
          e.removeEventListener(i, s);
    },
    _onKeyBindingEvent: function (t, e) {
      if (
        (this.stopKeyboardEventPropagation && e.stopPropagation(),
        !e.defaultPrevented)
      )
        for (var i = 0; i < t.length; i++) {
          var s = t[i][0],
            n = t[i][1];
          if (
            Bn(s, e) &&
            (this._triggerKeyHandler(s, n, e), e.defaultPrevented)
          )
            return;
        }
    },
    _triggerKeyHandler: function (t, e, i) {
      var s = Object.create(t);
      s.keyboardEvent = i;
      var n = new CustomEvent(t.event, {detail: s, cancelable: !0});
      this[e].call(this, n), n.defaultPrevented && i.preventDefault();
    },
  },
  Fn = {
    properties: {
      pressed: {
        type: Boolean,
        readOnly: !0,
        value: !1,
        reflectToAttribute: !0,
        observer: '_pressedChanged',
      },
      toggles: {type: Boolean, value: !1, reflectToAttribute: !0},
      active: {type: Boolean, value: !1, notify: !0, reflectToAttribute: !0},
      pointerDown: {type: Boolean, readOnly: !0, value: !1},
      receivedFocusFromKeyboard: {type: Boolean, readOnly: !0},
      ariaActiveAttribute: {
        type: String,
        value: 'aria-pressed',
        observer: '_ariaActiveAttributeChanged',
      },
    },
    listeners: {down: '_downHandler', up: '_upHandler', tap: '_tapHandler'},
    observers: [
      '_focusChanged(focused)',
      '_activeChanged(active, ariaActiveAttribute)',
    ],
    keyBindings: {
      'enter:keydown': '_asyncClick',
      'space:keydown': '_spaceKeyDownHandler',
      'space:keyup': '_spaceKeyUpHandler',
    },
    _mouseEventRe: /^mouse/,
    _tapHandler: function () {
      this.toggles ? this._userActivate(!this.active) : (this.active = !1);
    },
    _focusChanged: function (t) {
      this._detectKeyboardFocus(t), t || this._setPressed(!1);
    },
    _detectKeyboardFocus: function (t) {
      this._setReceivedFocusFromKeyboard(!this.pointerDown && t);
    },
    _userActivate: function (t) {
      this.active !== t && ((this.active = t), this.fire('change'));
    },
    _downHandler: function (t) {
      this._setPointerDown(!0),
        this._setPressed(!0),
        this._setReceivedFocusFromKeyboard(!1);
    },
    _upHandler: function () {
      this._setPointerDown(!1), this._setPressed(!1);
    },
    _spaceKeyDownHandler: function (t) {
      var e = t.detail.keyboardEvent,
        i = xs(e).localTarget;
      this.isLightDescendant(i) ||
        (e.preventDefault(),
        e.stopImmediatePropagation(),
        this._setPressed(!0));
    },
    _spaceKeyUpHandler: function (t) {
      var e = t.detail.keyboardEvent,
        i = xs(e).localTarget;
      this.isLightDescendant(i) ||
        (this.pressed && this._asyncClick(), this._setPressed(!1));
    },
    _asyncClick: function () {
      this.async(function () {
        this.click();
      }, 1);
    },
    _pressedChanged: function (t) {
      this._changedButtonState();
    },
    _ariaActiveAttributeChanged: function (t, e) {
      e && e != t && this.hasAttribute(e) && this.removeAttribute(e);
    },
    _activeChanged: function (t, e) {
      this.toggles
        ? this.setAttribute(this.ariaActiveAttribute, t ? 'true' : 'false')
        : this.removeAttribute(this.ariaActiveAttribute),
        this._changedButtonState();
    },
    _controlStateChanged: function () {
      this.disabled ? this._setPressed(!1) : this._changedButtonState();
    },
    _changedButtonState: function () {
      this._buttonStateChanged && this._buttonStateChanged();
    },
  },
  Un = [Rn, Fn];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var Kn = {
  distance: function (t, e, i, s) {
    var n = t - i,
      r = e - s;
    return Math.sqrt(n * n + r * r);
  },
  now:
    window.performance && window.performance.now
      ? window.performance.now.bind(window.performance)
      : Date.now,
};
function qn(t) {
  (this.element = t),
    (this.width = this.boundingRect.width),
    (this.height = this.boundingRect.height),
    (this.size = Math.max(this.width, this.height));
}
function Jn(t) {
  (this.element = t),
    (this.color = window.getComputedStyle(t).color),
    (this.wave = document.createElement('div')),
    (this.waveContainer = document.createElement('div')),
    (this.wave.style.backgroundColor = this.color),
    this.wave.classList.add('wave'),
    this.waveContainer.classList.add('wave-container'),
    xs(this.waveContainer).appendChild(this.wave),
    this.resetInteractionState();
}
(qn.prototype = {
  get boundingRect() {
    return this.element.getBoundingClientRect();
  },
  furthestCornerDistanceFrom: function (t, e) {
    var i = Kn.distance(t, e, 0, 0),
      s = Kn.distance(t, e, this.width, 0),
      n = Kn.distance(t, e, 0, this.height),
      r = Kn.distance(t, e, this.width, this.height);
    return Math.max(i, s, n, r);
  },
}),
  (Jn.MAX_RADIUS = 300),
  (Jn.prototype = {
    get recenters() {
      return this.element.recenters;
    },
    get center() {
      return this.element.center;
    },
    get mouseDownElapsed() {
      var t;
      return this.mouseDownStart
        ? ((t = Kn.now() - this.mouseDownStart),
          this.mouseUpStart && (t -= this.mouseUpElapsed),
          t)
        : 0;
    },
    get mouseUpElapsed() {
      return this.mouseUpStart ? Kn.now() - this.mouseUpStart : 0;
    },
    get mouseDownElapsedSeconds() {
      return this.mouseDownElapsed / 1e3;
    },
    get mouseUpElapsedSeconds() {
      return this.mouseUpElapsed / 1e3;
    },
    get mouseInteractionSeconds() {
      return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds;
    },
    get initialOpacity() {
      return this.element.initialOpacity;
    },
    get opacityDecayVelocity() {
      return this.element.opacityDecayVelocity;
    },
    get radius() {
      var t = this.containerMetrics.width * this.containerMetrics.width,
        e = this.containerMetrics.height * this.containerMetrics.height,
        i = 1.1 * Math.min(Math.sqrt(t + e), Jn.MAX_RADIUS) + 5,
        s = 1.1 - (i / Jn.MAX_RADIUS) * 0.2,
        n = this.mouseInteractionSeconds / s,
        r = i * (1 - Math.pow(80, -n));
      return Math.abs(r);
    },
    get opacity() {
      return this.mouseUpStart
        ? Math.max(
            0,
            this.initialOpacity -
              this.mouseUpElapsedSeconds * this.opacityDecayVelocity
          )
        : this.initialOpacity;
    },
    get outerOpacity() {
      var t = 0.3 * this.mouseUpElapsedSeconds,
        e = this.opacity;
      return Math.max(0, Math.min(t, e));
    },
    get isOpacityFullyDecayed() {
      return (
        this.opacity < 0.01 &&
        this.radius >= Math.min(this.maxRadius, Jn.MAX_RADIUS)
      );
    },
    get isRestingAtMaxRadius() {
      return (
        this.opacity >= this.initialOpacity &&
        this.radius >= Math.min(this.maxRadius, Jn.MAX_RADIUS)
      );
    },
    get isAnimationComplete() {
      return this.mouseUpStart
        ? this.isOpacityFullyDecayed
        : this.isRestingAtMaxRadius;
    },
    get translationFraction() {
      return Math.min(
        1,
        ((this.radius / this.containerMetrics.size) * 2) / Math.sqrt(2)
      );
    },
    get xNow() {
      return this.xEnd
        ? this.xStart + this.translationFraction * (this.xEnd - this.xStart)
        : this.xStart;
    },
    get yNow() {
      return this.yEnd
        ? this.yStart + this.translationFraction * (this.yEnd - this.yStart)
        : this.yStart;
    },
    get isMouseDown() {
      return this.mouseDownStart && !this.mouseUpStart;
    },
    resetInteractionState: function () {
      (this.maxRadius = 0),
        (this.mouseDownStart = 0),
        (this.mouseUpStart = 0),
        (this.xStart = 0),
        (this.yStart = 0),
        (this.xEnd = 0),
        (this.yEnd = 0),
        (this.slideDistance = 0),
        (this.containerMetrics = new qn(this.element));
    },
    draw: function () {
      var t, e, i;
      (this.wave.style.opacity = this.opacity),
        (t = this.radius / (this.containerMetrics.size / 2)),
        (e = this.xNow - this.containerMetrics.width / 2),
        (i = this.yNow - this.containerMetrics.height / 2),
        (this.waveContainer.style.webkitTransform =
          'translate(' + e + 'px, ' + i + 'px)'),
        (this.waveContainer.style.transform =
          'translate3d(' + e + 'px, ' + i + 'px, 0)'),
        (this.wave.style.webkitTransform = 'scale(' + t + ',' + t + ')'),
        (this.wave.style.transform = 'scale3d(' + t + ',' + t + ',1)');
    },
    downAction: function (t) {
      var e = this.containerMetrics.width / 2,
        i = this.containerMetrics.height / 2;
      this.resetInteractionState(),
        (this.mouseDownStart = Kn.now()),
        this.center
          ? ((this.xStart = e),
            (this.yStart = i),
            (this.slideDistance = Kn.distance(
              this.xStart,
              this.yStart,
              this.xEnd,
              this.yEnd
            )))
          : ((this.xStart = t
              ? t.detail.x - this.containerMetrics.boundingRect.left
              : this.containerMetrics.width / 2),
            (this.yStart = t
              ? t.detail.y - this.containerMetrics.boundingRect.top
              : this.containerMetrics.height / 2)),
        this.recenters &&
          ((this.xEnd = e),
          (this.yEnd = i),
          (this.slideDistance = Kn.distance(
            this.xStart,
            this.yStart,
            this.xEnd,
            this.yEnd
          ))),
        (this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(
          this.xStart,
          this.yStart
        )),
        (this.waveContainer.style.top =
          (this.containerMetrics.height - this.containerMetrics.size) / 2 +
          'px'),
        (this.waveContainer.style.left =
          (this.containerMetrics.width - this.containerMetrics.size) / 2 +
          'px'),
        (this.waveContainer.style.width = this.containerMetrics.size + 'px'),
        (this.waveContainer.style.height = this.containerMetrics.size + 'px');
    },
    upAction: function (t) {
      this.isMouseDown && (this.mouseUpStart = Kn.now());
    },
    remove: function () {
      xs(xs(this.waveContainer).parentNode).removeChild(this.waveContainer);
    },
  }),
  Bs({
    _template: cn`
    <style>
      :host {
        display: block;
        position: absolute;
        border-radius: inherit;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
         * creating a node (with a position:absolute) in the middle of an event
         * handler "interrupts" that event handler (which happens when the
         * ripple is created on demand) */
        pointer-events: none;
      }

      :host([animating]) {
        /* This resolves a rendering issue in Chrome (as of 40) where the
           ripple is not properly clipped by its parent (which may have
           rounded corners). See: http://jsbin.com/temexa/4

           Note: We only apply this style conditionally. Otherwise, the browser
           will create a new compositing layer for every ripple element on the
           page, and that would be bad. */
        -webkit-transform: translate(0, 0);
        transform: translate3d(0, 0, 0);
      }

      #background,
      #waves,
      .wave-container,
      .wave {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #background,
      .wave {
        opacity: 0;
      }

      #waves,
      .wave {
        overflow: hidden;
      }

      .wave-container,
      .wave {
        border-radius: 50%;
      }

      :host(.circle) #background,
      :host(.circle) #waves {
        border-radius: 50%;
      }

      :host(.circle) .wave-container {
        overflow: hidden;
      }
    </style>

    <div id="background"></div>
    <div id="waves"></div>
`,
    is: 'paper-ripple',
    behaviors: [Rn],
    properties: {
      initialOpacity: {type: Number, value: 0.25},
      opacityDecayVelocity: {type: Number, value: 0.8},
      recenters: {type: Boolean, value: !1},
      center: {type: Boolean, value: !1},
      ripples: {
        type: Array,
        value: function () {
          return [];
        },
      },
      animating: {
        type: Boolean,
        readOnly: !0,
        reflectToAttribute: !0,
        value: !1,
      },
      holdDown: {type: Boolean, value: !1, observer: '_holdDownChanged'},
      noink: {type: Boolean, value: !1},
      _animating: {type: Boolean},
      _boundAnimate: {
        type: Function,
        value: function () {
          return this.animate.bind(this);
        },
      },
    },
    get target() {
      return this.keyEventTarget;
    },
    keyBindings: {
      'enter:keydown': '_onEnterKeydown',
      'space:keydown': '_onSpaceKeydown',
      'space:keyup': '_onSpaceKeyup',
    },
    attached: function () {
      11 == xs(this).parentNode.nodeType
        ? (this.keyEventTarget = xs(this).getOwnerRoot().host)
        : (this.keyEventTarget = xs(this).parentNode);
      var t = this.keyEventTarget;
      this.listen(t, 'up', 'uiUpAction'),
        this.listen(t, 'down', 'uiDownAction');
    },
    detached: function () {
      this.unlisten(this.keyEventTarget, 'up', 'uiUpAction'),
        this.unlisten(this.keyEventTarget, 'down', 'uiDownAction'),
        (this.keyEventTarget = null);
    },
    get shouldKeepAnimating() {
      for (var t = 0; t < this.ripples.length; ++t)
        if (!this.ripples[t].isAnimationComplete) return !0;
      return !1;
    },
    simulatedRipple: function () {
      this.downAction(null),
        this.async(function () {
          this.upAction();
        }, 1);
    },
    uiDownAction: function (t) {
      this.noink || this.downAction(t);
    },
    downAction: function (t) {
      (this.holdDown && this.ripples.length > 0) ||
        (this.addRipple().downAction(t),
        this._animating || ((this._animating = !0), this.animate()));
    },
    uiUpAction: function (t) {
      this.noink || this.upAction(t);
    },
    upAction: function (t) {
      this.holdDown ||
        (this.ripples.forEach(function (e) {
          e.upAction(t);
        }),
        (this._animating = !0),
        this.animate());
    },
    onAnimationComplete: function () {
      (this._animating = !1),
        (this.$.background.style.backgroundColor = ''),
        this.fire('transitionend');
    },
    addRipple: function () {
      var t = new Jn(this);
      return (
        xs(this.$.waves).appendChild(t.waveContainer),
        (this.$.background.style.backgroundColor = t.color),
        this.ripples.push(t),
        this._setAnimating(!0),
        t
      );
    },
    removeRipple: function (t) {
      var e = this.ripples.indexOf(t);
      e < 0 ||
        (this.ripples.splice(e, 1),
        t.remove(),
        this.ripples.length || this._setAnimating(!1));
    },
    animate: function () {
      if (this._animating) {
        var t, e;
        for (t = 0; t < this.ripples.length; ++t)
          (e = this.ripples[t]).draw(),
            (this.$.background.style.opacity = e.outerOpacity),
            e.isOpacityFullyDecayed &&
              !e.isRestingAtMaxRadius &&
              this.removeRipple(e);
        this.shouldKeepAnimating || 0 !== this.ripples.length
          ? window.requestAnimationFrame(this._boundAnimate)
          : this.onAnimationComplete();
      }
    },
    animateRipple: function () {
      return this.animate();
    },
    _onEnterKeydown: function () {
      this.uiDownAction(), this.async(this.uiUpAction, 1);
    },
    _onSpaceKeydown: function () {
      this.uiDownAction();
    },
    _onSpaceKeyup: function () {
      this.uiUpAction();
    },
    _holdDownChanged: function (t, e) {
      void 0 !== e && (t ? this.downAction() : this.upAction());
    },
  });
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Zn = {
    properties: {
      noink: {type: Boolean, observer: '_noinkChanged'},
      _rippleContainer: {type: Object},
    },
    _buttonStateChanged: function () {
      this.focused && this.ensureRipple();
    },
    _downHandler: function (t) {
      Fn._downHandler.call(this, t), this.pressed && this.ensureRipple(t);
    },
    ensureRipple: function (t) {
      if (!this.hasRipple()) {
        (this._ripple = this._createRipple()),
          (this._ripple.noink = this.noink);
        var e = this._rippleContainer || this.root;
        if ((e && xs(e).appendChild(this._ripple), t)) {
          var i = xs(this._rippleContainer || this),
            s = xs(t).rootTarget;
          i.deepContains(s) && this._ripple.uiDownAction(t);
        }
      }
    },
    getRipple: function () {
      return this.ensureRipple(), this._ripple;
    },
    hasRipple: function () {
      return Boolean(this._ripple);
    },
    _createRipple: function () {
      return document.createElement('paper-ripple');
    },
    _noinkChanged: function (t) {
      this.hasRipple() && (this._ripple.noink = t);
    },
  },
  Wn = {
    observers: ['_focusedChanged(receivedFocusFromKeyboard)'],
    _focusedChanged: function (t) {
      t && this.ensureRipple(), this.hasRipple() && (this._ripple.holdDown = t);
    },
    _createRipple: function () {
      var t = Zn._createRipple();
      return (
        (t.id = 'ink'),
        t.setAttribute('center', ''),
        t.classList.add('circle'),
        t
      );
    },
  },
  Gn = [Un, Ln, Zn, Wn];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Bs({
  is: 'paper-icon-button',
  _template: cn`
    <style>
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;

        width: 40px;
        height: 40px;

        /*
          NOTE: Both values are needed, since some phones require the value to
          be \`transparent\`.
        */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        /* Because of polymer/2558, this style has lower specificity than * */
        box-sizing: border-box !important;

        @apply --paper-icon-button;
      }

      :host #ink {
        color: var(--paper-icon-button-ink-color, var(--primary-text-color));
        opacity: 0.6;
      }

      :host([disabled]) {
        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));
        pointer-events: none;
        cursor: auto;

        @apply --paper-icon-button-disabled;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:hover) {
        @apply --paper-icon-button-hover;
      }

      iron-icon {
        --iron-icon-width: 100%;
        --iron-icon-height: 100%;
      }
    </style>

    <iron-icon id="icon" src="[[src]]" icon="[[icon]]"
               alt$="[[alt]]"></iron-icon>
  `,
  hostAttributes: {role: 'button', tabindex: '0'},
  behaviors: [Gn],
  registered: function () {
    this._template.setAttribute('strip-whitespace', '');
  },
  properties: {
    src: {type: String},
    icon: {type: String},
    alt: {type: String, observer: '_altChanged'},
  },
  _altChanged: function (t, e) {
    var i = this.getAttribute('aria-label');
    (i && e != i) || this.setAttribute('aria-label', t);
  },
}),
  /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  Bs({
    is: 'iron-media-query',
    properties: {
      queryMatches: {type: Boolean, value: !1, readOnly: !0, notify: !0},
      query: {type: String, observer: 'queryChanged'},
      full: {type: Boolean, value: !1},
      _boundMQHandler: {
        value: function () {
          return this.queryHandler.bind(this);
        },
      },
      _mq: {value: null},
    },
    attached: function () {
      (this.style.display = 'none'), this.queryChanged();
    },
    detached: function () {
      this._remove();
    },
    _add: function () {
      this._mq && this._mq.addListener(this._boundMQHandler);
    },
    _remove: function () {
      this._mq && this._mq.removeListener(this._boundMQHandler),
        (this._mq = null);
    },
    queryChanged: function () {
      this._remove();
      var t = this.query;
      t &&
        (this.full || '(' === t[0] || (t = '(' + t + ')'),
        (this._mq = window.matchMedia(t)),
        this._add(),
        this.queryHandler(this._mq));
    },
    queryHandler: function (t) {
      this._setQueryMatches(t.matches);
    },
  });
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var Yn = new Set();
const Qn = [
  {
    properties: {
      _parentResizable: {type: Object, observer: '_parentResizableChanged'},
      _notifyingDescendant: {type: Boolean, value: !1},
    },
    listeners: {
      'iron-request-resize-notifications': '_onIronRequestResizeNotifications',
    },
    created: function () {
      (this._interestedResizables = []),
        (this._boundNotifyResize = this.notifyResize.bind(this)),
        (this._boundOnDescendantIronResize =
          this._onDescendantIronResize.bind(this));
    },
    attached: function () {
      this._requestResizeNotifications();
    },
    detached: function () {
      this._parentResizable
        ? this._parentResizable.stopResizeNotificationsFor(this)
        : (Yn.delete(this),
          window.removeEventListener('resize', this._boundNotifyResize)),
        (this._parentResizable = null);
    },
    notifyResize: function () {
      this.isAttached &&
        (this._interestedResizables.forEach(function (t) {
          this.resizerShouldNotify(t) && this._notifyDescendant(t);
        }, this),
        this._fireResize());
    },
    assignParentResizable: function (t) {
      this._parentResizable &&
        this._parentResizable.stopResizeNotificationsFor(this),
        (this._parentResizable = t),
        t &&
          -1 === t._interestedResizables.indexOf(this) &&
          (t._interestedResizables.push(this), t._subscribeIronResize(this));
    },
    stopResizeNotificationsFor: function (t) {
      var e = this._interestedResizables.indexOf(t);
      e > -1 &&
        (this._interestedResizables.splice(e, 1),
        this._unsubscribeIronResize(t));
    },
    _subscribeIronResize: function (t) {
      t.addEventListener('iron-resize', this._boundOnDescendantIronResize);
    },
    _unsubscribeIronResize: function (t) {
      t.removeEventListener('iron-resize', this._boundOnDescendantIronResize);
    },
    resizerShouldNotify: function (t) {
      return !0;
    },
    _onDescendantIronResize: function (t) {
      this._notifyingDescendant
        ? t.stopPropagation()
        : ht || this._fireResize();
    },
    _fireResize: function () {
      this.fire('iron-resize', null, {node: this, bubbles: !1});
    },
    _onIronRequestResizeNotifications: function (t) {
      var e = xs(t).rootTarget;
      e !== this &&
        (e.assignParentResizable(this),
        this._notifyDescendant(e),
        t.stopPropagation());
    },
    _parentResizableChanged: function (t) {
      t && window.removeEventListener('resize', this._boundNotifyResize);
    },
    _notifyDescendant: function (t) {
      this.isAttached &&
        ((this._notifyingDescendant = !0),
        t.notifyResize(),
        (this._notifyingDescendant = !1));
    },
    _requestResizeNotifications: function () {
      if (this.isAttached)
        if ('loading' === document.readyState) {
          var t = this._requestResizeNotifications.bind(this);
          document.addEventListener('readystatechange', function e() {
            document.removeEventListener('readystatechange', e), t();
          });
        } else
          this._findParent(),
            this._parentResizable
              ? this._parentResizable._interestedResizables.forEach(function (
                  t
                ) {
                  t !== this && t._findParent();
                },
                this)
              : (Yn.forEach(function (t) {
                  t !== this && t._findParent();
                }, this),
                window.addEventListener('resize', this._boundNotifyResize),
                this.notifyResize());
    },
    _findParent: function () {
      this.assignParentResizable(null),
        this.fire('iron-request-resize-notifications', null, {
          node: this,
          bubbles: !0,
          cancelable: !0,
        }),
        this._parentResizable ? Yn.delete(this) : Yn.add(this);
    },
  },
  {
    listeners: {
      'app-reset-layout': '_appResetLayoutHandler',
      'iron-resize': 'resetLayout',
    },
    attached: function () {
      this.fire('app-reset-layout');
    },
    _appResetLayoutHandler: function (t) {
      xs(t).path[0] !== this && (this.resetLayout(), t.stopPropagation());
    },
    _updateLayoutStates: function () {
      console.error('unimplemented');
    },
    resetLayout: function () {
      var t = this._updateLayoutStates.bind(this);
      (this._layoutDebouncer = oi.debounce(this._layoutDebouncer, oe, t)),
        ai(this._layoutDebouncer),
        this._notifyDescendantResize();
    },
    _notifyLayoutChanged: function () {
      var t = this;
      requestAnimationFrame(function () {
        t.fire('app-reset-layout');
      });
    },
    _notifyDescendantResize: function () {
      this.isAttached &&
        this._interestedResizables.forEach(function (t) {
          this.resizerShouldNotify(t) && this._notifyDescendant(t);
        }, this);
    },
  },
];
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Bs({
  _template: cn`
    <style>
      :host {
        display: block;
        /**
         * Force app-drawer-layout to have its own stacking context so that its parent can
         * control the stacking of it relative to other elements.
         */
        position: relative;
        z-index: 0;
      }

      :host ::slotted([slot=drawer]) {
        z-index: 1;
      }

      :host([fullbleed]) {
        @apply --layout-fit;
      }

      #contentContainer {
        /* Create a stacking context here so that all children appear below the header. */
        position: relative;
        z-index: 0;
        height: 100%;
        transition: var(--app-drawer-layout-content-transition, none);
      }

      #contentContainer[drawer-position=left] {
        margin-left: var(--app-drawer-width, 256px);
      }

      #contentContainer[drawer-position=right] {
        margin-right: var(--app-drawer-width, 256px);
      }
    </style>

    <slot id="drawerSlot" name="drawer"></slot>

    <div id="contentContainer" drawer-position\$="[[_drawerPosition]]">
      <slot></slot>
    </div>

    <iron-media-query query="[[_computeMediaQuery(forceNarrow, responsiveWidth)]]" on-query-matches-changed="_onQueryMatchesChanged"></iron-media-query>
`,
  is: 'app-drawer-layout',
  behaviors: [Qn],
  properties: {
    forceNarrow: {type: Boolean, value: !1},
    responsiveWidth: {type: String, value: '640px'},
    narrow: {type: Boolean, reflectToAttribute: !0, readOnly: !0, notify: !0},
    openedWhenNarrow: {type: Boolean, value: !1},
    _drawerPosition: {type: String},
  },
  listeners: {click: '_clickHandler'},
  observers: ['_narrowChanged(narrow)'],
  get drawer() {
    return xs(this.$.drawerSlot).getDistributedNodes()[0];
  },
  attached: function () {
    var t = this.drawer;
    t && t.setAttribute('no-transition', '');
  },
  _clickHandler: function (t) {
    var e = xs(t).localTarget;
    if (e && e.hasAttribute('drawer-toggle')) {
      var i = this.drawer;
      i && !i.persistent && i.toggle();
    }
  },
  _updateLayoutStates: function () {
    var t = this.drawer;
    this.isAttached &&
      t &&
      ((this._drawerPosition = this.narrow ? null : t.position),
      this._drawerNeedsReset &&
        (this.narrow
          ? ((t.opened = this.openedWhenNarrow), (t.persistent = !1))
          : (t.opened = t.persistent = !0),
        t.hasAttribute('no-transition') &&
          ls(this, function () {
            t.removeAttribute('no-transition');
          }),
        (this._drawerNeedsReset = !1)));
  },
  _narrowChanged: function () {
    (this._drawerNeedsReset = !0), this.resetLayout();
  },
  _onQueryMatchesChanged: function (t) {
    this._setNarrow(t.detail.value);
  },
  _computeMediaQuery: function (t, e) {
    return t ? '(min-width: 0px)' : '(max-width: ' + e + ')';
  },
}),
  /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  Bs({
    _template: cn`
    <style>
      :host {
        position: fixed;
        top: -120px;
        right: 0;
        bottom: -120px;
        left: 0;

        visibility: hidden;

        transition-property: visibility;
      }

      :host([opened]) {
        visibility: visible;
      }

      :host([persistent]) {
        width: var(--app-drawer-width, 256px);
      }

      :host([persistent][position=left]) {
        right: auto;
      }

      :host([persistent][position=right]) {
        left: auto;
      }

      #contentContainer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;

        width: var(--app-drawer-width, 256px);
        padding: var(--app-drawer-content-padding, 120px 0);

        transition-property: -webkit-transform;
        transition-property: transform;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);

        background-color: #FFF;

        @apply --app-drawer-content-container;
      }

      #contentContainer[persistent] {
        width: 100%;
      }

      #contentContainer[position=right] {
        right: 0;
        left: auto;

        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
      }

      #contentContainer[swipe-open]::after {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 100%;

        visibility: visible;

        width: 20px;

        content: '';
      }

      #contentContainer[swipe-open][position=right]::after {
        right: 100%;
        left: auto;
      }

      #contentContainer[opened] {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      #scrim {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        transition-property: opacity;
        -webkit-transform: translateZ(0);
        transform:  translateZ(0);

        opacity: 0;
        background: var(--app-drawer-scrim-background, rgba(0, 0, 0, 0.5));
      }

      #scrim.visible {
        opacity: 1;
      }

      :host([no-transition]) #contentContainer {
        transition-property: none;
      }
    </style>

    <div id="scrim" on-click="close"></div>

    <!-- HACK(keanulee): Bind attributes here (in addition to :host) for styling to workaround Safari
    bug. https://bugs.webkit.org/show_bug.cgi?id=170762 -->
    <div id="contentContainer" opened\$="[[opened]]" persistent\$="[[persistent]]" position\$="[[position]]" swipe-open\$="[[swipeOpen]]">
      <slot></slot>
    </div>
`,
    is: 'app-drawer',
    properties: {
      opened: {type: Boolean, value: !1, notify: !0, reflectToAttribute: !0},
      persistent: {type: Boolean, value: !1, reflectToAttribute: !0},
      transitionDuration: {type: Number, value: 200},
      align: {type: String, value: 'left'},
      position: {type: String, readOnly: !0, reflectToAttribute: !0},
      swipeOpen: {type: Boolean, value: !1, reflectToAttribute: !0},
      noFocusTrap: {type: Boolean, value: !1},
      disableSwipe: {type: Boolean, value: !1},
    },
    observers: [
      'resetLayout(position, isAttached)',
      '_resetPosition(align, isAttached)',
      '_styleTransitionDuration(transitionDuration)',
      '_openedPersistentChanged(opened, persistent)',
    ],
    _translateOffset: 0,
    _trackDetails: null,
    _drawerState: 0,
    _boundEscKeydownHandler: null,
    _firstTabStop: null,
    _lastTabStop: null,
    attached: function () {
      ls(this, function () {
        (this._boundEscKeydownHandler = this._escKeydownHandler.bind(this)),
          this.addEventListener('keydown', this._tabKeydownHandler.bind(this)),
          this.listen(this, 'track', '_track'),
          this.setScrollDirection('y');
      }),
        this.fire('app-reset-layout');
    },
    detached: function () {
      document.removeEventListener('keydown', this._boundEscKeydownHandler);
    },
    open: function () {
      this.opened = !0;
    },
    close: function () {
      this.opened = !1;
    },
    toggle: function () {
      this.opened = !this.opened;
    },
    getWidth: function () {
      return this._savedWidth || this.$.contentContainer.offsetWidth;
    },
    _isRTL: function () {
      return 'rtl' === window.getComputedStyle(this).direction;
    },
    _resetPosition: function () {
      switch (this.align) {
        case 'start':
          return void this._setPosition(this._isRTL() ? 'right' : 'left');
        case 'end':
          return void this._setPosition(this._isRTL() ? 'left' : 'right');
      }
      this._setPosition(this.align);
    },
    _escKeydownHandler: function (t) {
      27 === t.keyCode && (t.preventDefault(), this.close());
    },
    _track: function (t) {
      if (!this.persistent && !this.disableSwipe)
        switch ((t.preventDefault(), t.detail.state)) {
          case 'start':
            this._trackStart(t);
            break;
          case 'track':
            this._trackMove(t);
            break;
          case 'end':
            this._trackEnd(t);
        }
    },
    _trackStart: function (t) {
      this._drawerState = this._DRAWER_STATE.TRACKING;
      var e = this.$.contentContainer.getBoundingClientRect();
      (this._savedWidth = e.width),
        'left' === this.position
          ? (this._translateOffset = e.left)
          : (this._translateOffset = e.right - window.innerWidth),
        (this._trackDetails = []),
        this._styleTransitionDuration(0),
        (this.style.visibility = 'visible');
    },
    _trackMove: function (t) {
      this._translateDrawer(t.detail.dx + this._translateOffset),
        this._trackDetails.push({dx: t.detail.dx, timeStamp: Date.now()});
    },
    _trackEnd: function (t) {
      var e = t.detail.dx + this._translateOffset,
        i = this.getWidth(),
        s = 'left' === this.position ? e >= 0 || e <= -i : e <= 0 || e >= i;
      if (!s) {
        var n = this._trackDetails;
        if (
          ((this._trackDetails = null),
          this._flingDrawer(t, n),
          this._drawerState === this._DRAWER_STATE.FLINGING)
        )
          return;
      }
      var r = i / 2;
      t.detail.dx < -r
        ? (this.opened = 'right' === this.position)
        : t.detail.dx > r && (this.opened = 'left' === this.position),
        s
          ? this.debounce('_resetDrawerState', this._resetDrawerState)
          : this.debounce(
              '_resetDrawerState',
              this._resetDrawerState,
              this.transitionDuration
            ),
        this._styleTransitionDuration(this.transitionDuration),
        this._resetDrawerTranslate(),
        (this.style.visibility = '');
    },
    _calculateVelocity: function (t, e) {
      for (
        var i, s = Date.now(), n = s - 100, r = 0, o = e.length - 1;
        r <= o;

      ) {
        var h = (r + o) >> 1,
          a = e[h];
        a.timeStamp >= n ? ((i = a), (o = h - 1)) : (r = h + 1);
      }
      return i ? (t.detail.dx - i.dx) / (s - i.timeStamp || 1) : 0;
    },
    _flingDrawer: function (t, e) {
      var i = this._calculateVelocity(t, e);
      if (!(Math.abs(i) < this._MIN_FLING_THRESHOLD)) {
        this._drawerState = this._DRAWER_STATE.FLINGING;
        var s,
          n = t.detail.dx + this._translateOffset,
          r = this.getWidth(),
          o = 'left' === this.position,
          h = i > 0;
        (s = !h && o ? -(n + r) : h && !o ? r - n : -n),
          h
            ? ((i = Math.max(i, this._MIN_TRANSITION_VELOCITY)),
              (this.opened = 'left' === this.position))
            : ((i = Math.min(i, -this._MIN_TRANSITION_VELOCITY)),
              (this.opened = 'right' === this.position));
        var a = (this._FLING_INITIAL_SLOPE * s) / i;
        this._styleTransitionDuration(a),
          this._styleTransitionTimingFunction(this._FLING_TIMING_FUNCTION),
          this._resetDrawerTranslate(),
          this.debounce('_resetDrawerState', this._resetDrawerState, a);
      }
    },
    _styleTransitionDuration: function (t) {
      (this.style.transitionDuration = t + 'ms'),
        (this.$.contentContainer.style.transitionDuration = t + 'ms'),
        (this.$.scrim.style.transitionDuration = t + 'ms');
    },
    _styleTransitionTimingFunction: function (t) {
      (this.$.contentContainer.style.transitionTimingFunction = t),
        (this.$.scrim.style.transitionTimingFunction = t);
    },
    _translateDrawer: function (t) {
      var e = this.getWidth();
      'left' === this.position
        ? ((t = Math.max(-e, Math.min(t, 0))),
          (this.$.scrim.style.opacity = 1 + t / e))
        : ((t = Math.max(0, Math.min(t, e))),
          (this.$.scrim.style.opacity = 1 - t / e)),
        this.translate3d(t + 'px', '0', '0', this.$.contentContainer);
    },
    _resetDrawerTranslate: function () {
      (this.$.scrim.style.opacity = ''),
        this.transform('', this.$.contentContainer);
    },
    _resetDrawerState: function () {
      var t = this._drawerState;
      t === this._DRAWER_STATE.FLINGING &&
        (this._styleTransitionDuration(this.transitionDuration),
        this._styleTransitionTimingFunction(''),
        (this.style.visibility = '')),
        (this._savedWidth = null),
        this.opened
          ? (this._drawerState = this.persistent
              ? this._DRAWER_STATE.OPENED_PERSISTENT
              : this._DRAWER_STATE.OPENED)
          : (this._drawerState = this._DRAWER_STATE.CLOSED),
        t !== this._drawerState &&
          (this._drawerState === this._DRAWER_STATE.OPENED
            ? (this._setKeyboardFocusTrap(),
              document.addEventListener(
                'keydown',
                this._boundEscKeydownHandler
              ),
              (document.body.style.overflow = 'hidden'))
            : (document.removeEventListener(
                'keydown',
                this._boundEscKeydownHandler
              ),
              (document.body.style.overflow = '')),
          t !== this._DRAWER_STATE.INIT &&
            this.fire('app-drawer-transitioned'));
    },
    resetLayout: function () {
      this.fire('app-reset-layout');
    },
    _setKeyboardFocusTrap: function () {
      if (!this.noFocusTrap) {
        var t = [
            'a[href]:not([tabindex="-1"])',
            'area[href]:not([tabindex="-1"])',
            'input:not([disabled]):not([tabindex="-1"])',
            'select:not([disabled]):not([tabindex="-1"])',
            'textarea:not([disabled]):not([tabindex="-1"])',
            'button:not([disabled]):not([tabindex="-1"])',
            'iframe:not([tabindex="-1"])',
            '[tabindex]:not([tabindex="-1"])',
            '[contentEditable=true]:not([tabindex="-1"])',
          ].join(','),
          e = xs(this).querySelectorAll(t);
        e.length > 0
          ? ((this._firstTabStop = e[0]), (this._lastTabStop = e[e.length - 1]))
          : ((this._firstTabStop = null), (this._lastTabStop = null));
        var i = this.getAttribute('tabindex');
        i && parseInt(i, 10) > -1
          ? this.focus()
          : this._firstTabStop && this._firstTabStop.focus();
      }
    },
    _tabKeydownHandler: function (t) {
      if (!this.noFocusTrap) {
        this._drawerState === this._DRAWER_STATE.OPENED &&
          9 === t.keyCode &&
          (t.shiftKey
            ? this._firstTabStop &&
              xs(t).localTarget === this._firstTabStop &&
              (t.preventDefault(), this._lastTabStop.focus())
            : this._lastTabStop &&
              xs(t).localTarget === this._lastTabStop &&
              (t.preventDefault(), this._firstTabStop.focus()));
      }
    },
    _openedPersistentChanged: function (t, e) {
      this.toggleClass('visible', t && !e, this.$.scrim),
        this.debounce(
          '_resetDrawerState',
          this._resetDrawerState,
          this.transitionDuration
        );
    },
    _MIN_FLING_THRESHOLD: 0.2,
    _MIN_TRANSITION_VELOCITY: 1.2,
    _FLING_TIMING_FUNCTION: 'cubic-bezier(0.667, 1, 0.667, 1)',
    _FLING_INITIAL_SLOPE: 1.5,
    _DRAWER_STATE: {
      INIT: 0,
      OPENED: 1,
      OPENED_PERSISTENT: 2,
      CLOSED: 3,
      TRACKING: 4,
      FLINGING: 5,
    },
  });
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Xn = {
    properties: {
      scrollTarget: {
        type: HTMLElement,
        value: function () {
          return this._defaultScrollTarget;
        },
      },
    },
    observers: ['_scrollTargetChanged(scrollTarget, isAttached)'],
    _shouldHaveListener: !0,
    _scrollTargetChanged: function (t, e) {
      if (
        (this._oldScrollTarget &&
          (this._toggleScrollListener(!1, this._oldScrollTarget),
          (this._oldScrollTarget = null)),
        e)
      )
        if ('document' === t) this.scrollTarget = this._doc;
        else if ('string' == typeof t) {
          var i = this.domHost;
          this.scrollTarget =
            i && i.$ ? i.$[t] : xs(this.ownerDocument).querySelector('#' + t);
        } else
          this._isValidScrollTarget() &&
            ((this._oldScrollTarget = t),
            this._toggleScrollListener(this._shouldHaveListener, t));
    },
    _scrollHandler: function () {},
    get _defaultScrollTarget() {
      return this._doc;
    },
    get _doc() {
      return this.ownerDocument.documentElement;
    },
    get _scrollTop() {
      return this._isValidScrollTarget()
        ? this.scrollTarget === this._doc
          ? window.pageYOffset
          : this.scrollTarget.scrollTop
        : 0;
    },
    get _scrollLeft() {
      return this._isValidScrollTarget()
        ? this.scrollTarget === this._doc
          ? window.pageXOffset
          : this.scrollTarget.scrollLeft
        : 0;
    },
    set _scrollTop(t) {
      this.scrollTarget === this._doc
        ? window.scrollTo(window.pageXOffset, t)
        : this._isValidScrollTarget() && (this.scrollTarget.scrollTop = t);
    },
    set _scrollLeft(t) {
      this.scrollTarget === this._doc
        ? window.scrollTo(t, window.pageYOffset)
        : this._isValidScrollTarget() && (this.scrollTarget.scrollLeft = t);
    },
    scroll: function (t, e) {
      var i;
      'object' == typeof t ? ((i = t.left), (e = t.top)) : (i = t),
        (i = i || 0),
        (e = e || 0),
        this.scrollTarget === this._doc
          ? window.scrollTo(i, e)
          : this._isValidScrollTarget() &&
            ((this.scrollTarget.scrollLeft = i),
            (this.scrollTarget.scrollTop = e));
    },
    get _scrollTargetWidth() {
      return this._isValidScrollTarget()
        ? this.scrollTarget === this._doc
          ? window.innerWidth
          : this.scrollTarget.offsetWidth
        : 0;
    },
    get _scrollTargetHeight() {
      return this._isValidScrollTarget()
        ? this.scrollTarget === this._doc
          ? window.innerHeight
          : this.scrollTarget.offsetHeight
        : 0;
    },
    _isValidScrollTarget: function () {
      return this.scrollTarget instanceof HTMLElement;
    },
    _toggleScrollListener: function (t, e) {
      var i = e === this._doc ? window : e;
      t
        ? this._boundScrollHandler ||
          ((this._boundScrollHandler = this._scrollHandler.bind(this)),
          i.addEventListener('scroll', this._boundScrollHandler))
        : this._boundScrollHandler &&
          (i.removeEventListener('scroll', this._boundScrollHandler),
          (this._boundScrollHandler = null));
    },
    toggleScrollListener: function (t) {
      (this._shouldHaveListener = t),
        this._toggleScrollListener(t, this.scrollTarget);
    },
  },
  tr = {},
  er = function (t, e) {
    if (null != tr[t])
      throw new Error('effect `' + t + '` is already registered.');
    tr[t] = e;
  },
  ir = [
    Xn,
    {
      properties: {
        effects: {type: String},
        effectsConfig: {
          type: Object,
          value: function () {
            return {};
          },
        },
        disabled: {type: Boolean, reflectToAttribute: !0, value: !1},
        threshold: {type: Number, value: 0},
        thresholdTriggered: {
          type: Boolean,
          notify: !0,
          readOnly: !0,
          reflectToAttribute: !0,
        },
      },
      observers: ['_effectsChanged(effects, effectsConfig, isAttached)'],
      _updateScrollState: function (t) {},
      isOnScreen: function () {
        return !1;
      },
      isContentBelow: function () {
        return !1;
      },
      _effectsRunFn: null,
      _effects: null,
      get _clampedScrollTop() {
        return Math.max(0, this._scrollTop);
      },
      attached: function () {
        this._scrollStateChanged();
      },
      detached: function () {
        this._tearDownEffects();
      },
      createEffect: function (t, e) {
        var i = tr[t];
        if (!i) throw new ReferenceError(this._getUndefinedMsg(t));
        var s = this._boundEffect(i, e || {});
        return s.setUp(), s;
      },
      _effectsChanged: function (t, e, i) {
        this._tearDownEffects(),
          t &&
            i &&
            (t.split(' ').forEach(function (t) {
              var i;
              '' !== t &&
                ((i = tr[t])
                  ? this._effects.push(this._boundEffect(i, e[t]))
                  : console.warn(this._getUndefinedMsg(t)));
            }, this),
            this._setUpEffect());
      },
      _layoutIfDirty: function () {
        return this.offsetWidth;
      },
      _boundEffect: function (t, e) {
        e = e || {};
        var i = parseFloat(e.startsAt || 0),
          s = parseFloat(e.endsAt || 1),
          n = s - i,
          r = function () {},
          o =
            0 === i && 1 === s
              ? t.run
              : function (e, s) {
                  t.run.call(this, Math.max(0, (e - i) / n), s);
                };
        return {
          setUp: t.setUp ? t.setUp.bind(this, e) : r,
          run: t.run ? o.bind(this) : r,
          tearDown: t.tearDown ? t.tearDown.bind(this) : r,
        };
      },
      _setUpEffect: function () {
        this.isAttached &&
          this._effects &&
          ((this._effectsRunFn = []),
          this._effects.forEach(function (t) {
            !1 !== t.setUp() && this._effectsRunFn.push(t.run);
          }, this));
      },
      _tearDownEffects: function () {
        this._effects &&
          this._effects.forEach(function (t) {
            t.tearDown();
          }),
          (this._effectsRunFn = []),
          (this._effects = []);
      },
      _runEffects: function (t, e) {
        this._effectsRunFn &&
          this._effectsRunFn.forEach(function (i) {
            i(t, e);
          });
      },
      _scrollHandler: function () {
        this._scrollStateChanged();
      },
      _scrollStateChanged: function () {
        if (!this.disabled) {
          var t = this._clampedScrollTop;
          this._updateScrollState(t),
            this.threshold > 0 &&
              this._setThresholdTriggered(t >= this.threshold);
        }
      },
      _getDOMRef: function (t) {
        console.warn('_getDOMRef', '`' + t + '` is undefined');
      },
      _getUndefinedMsg: function (t) {
        return (
          'Scroll effect `' +
          t +
          '` is undefined. Did you forget to import app-layout/app-scroll-effects/effects/' +
          t +
          '.html ?'
        );
      },
    },
  ];
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
er('blend-background', {
  setUp: function () {
    var t = {};
    (t.backgroundFrontLayer = this._getDOMRef('backgroundFrontLayer')),
      (t.backgroundRearLayer = this._getDOMRef('backgroundRearLayer')),
      (t.backgroundFrontLayer.style.willChange = 'opacity'),
      (t.backgroundFrontLayer.style.transform = 'translateZ(0)'),
      (t.backgroundRearLayer.style.willChange = 'opacity'),
      (t.backgroundRearLayer.style.transform = 'translateZ(0)'),
      (t.backgroundRearLayer.style.opacity = 0),
      (this._fxBlendBackground = t);
  },
  run: function (t, e) {
    var i = this._fxBlendBackground;
    (i.backgroundFrontLayer.style.opacity = 1 - t),
      (i.backgroundRearLayer.style.opacity = t);
  },
  tearDown: function () {
    delete this._fxBlendBackground;
  },
}),
  /**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  er('fade-background', {
    setUp: function (t) {
      var e = {},
        i = t.duration || '0.5s';
      (e.backgroundFrontLayer = this._getDOMRef('backgroundFrontLayer')),
        (e.backgroundRearLayer = this._getDOMRef('backgroundRearLayer')),
        (e.backgroundFrontLayer.style.willChange = 'opacity'),
        (e.backgroundFrontLayer.style.webkitTransform = 'translateZ(0)'),
        (e.backgroundFrontLayer.style.transitionProperty = 'opacity'),
        (e.backgroundFrontLayer.style.transitionDuration = i),
        (e.backgroundRearLayer.style.willChange = 'opacity'),
        (e.backgroundRearLayer.style.webkitTransform = 'translateZ(0)'),
        (e.backgroundRearLayer.style.transitionProperty = 'opacity'),
        (e.backgroundRearLayer.style.transitionDuration = i),
        (this._fxFadeBackground = e);
    },
    run: function (t, e) {
      var i = this._fxFadeBackground;
      t >= 1
        ? ((i.backgroundFrontLayer.style.opacity = 0),
          (i.backgroundRearLayer.style.opacity = 1))
        : ((i.backgroundFrontLayer.style.opacity = 1),
          (i.backgroundRearLayer.style.opacity = 0));
    },
    tearDown: function () {
      delete this._fxFadeBackground;
    },
  }),
  /**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  er('waterfall', {
    run: function () {
      this.shadow = this.isOnScreen() && this.isContentBelow();
    },
  }),
  er('resize-title', {
    setUp: function () {
      var t = this._getDOMRef('mainTitle'),
        e = this._getDOMRef('condensedTitle');
      if (!e)
        return (
          console.warn(
            'Scroll effect `resize-title`: undefined `condensed-title`'
          ),
          !1
        );
      if (!t)
        return (
          console.warn('Scroll effect `resize-title`: undefined `main-title`'),
          !1
        );
      (e.style.willChange = 'opacity'),
        (e.style.webkitTransform = 'translateZ(0)'),
        (e.style.transform = 'translateZ(0)'),
        (e.style.webkitTransformOrigin = 'left top'),
        (e.style.transformOrigin = 'left top'),
        (t.style.willChange = 'opacity'),
        (t.style.webkitTransformOrigin = 'left top'),
        (t.style.transformOrigin = 'left top'),
        (t.style.webkitTransform = 'translateZ(0)'),
        (t.style.transform = 'translateZ(0)');
      var i = t.getBoundingClientRect(),
        s = e.getBoundingClientRect(),
        n = {};
      (n.scale =
        parseInt(window.getComputedStyle(e)['font-size'], 10) /
        parseInt(window.getComputedStyle(t)['font-size'], 10)),
        (n.titleDX = i.left - s.left),
        (n.titleDY = i.top - s.top),
        (n.condensedTitle = e),
        (n.title = t),
        (this._fxResizeTitle = n);
    },
    run: function (t, e) {
      var i,
        s,
        n = this._fxResizeTitle;
      this.condenses || (e = 0),
        t >= 1
          ? ((n.title.style.opacity = 0), (n.condensedTitle.style.opacity = 1))
          : ((n.title.style.opacity = 1), (n.condensedTitle.style.opacity = 0)),
        (i = Math.min(1, t)),
        (s = [
          [1, n.scale],
          [0, -n.titleDX],
          [e, e - n.titleDY],
        ]),
        function (t, e, i) {
          this.transform(
            'translate(' +
              e +
              'px, ' +
              i +
              'px) scale3d(' +
              t +
              ', ' +
              t +
              ', 1)',
            n.title
          );
        }.apply(
          this,
          s.map(function (t) {
            return t[0] + (t[1] - t[0]) * i;
          })
        );
    },
    tearDown: function () {
      delete this._fxResizeTitle;
    },
  }),
  /**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  er('parallax-background', {
    setUp: function (t) {
      var e = {},
        i = parseFloat(t.scalar);
      (e.background = this._getDOMRef('background')),
        (e.backgroundFrontLayer = this._getDOMRef('backgroundFrontLayer')),
        (e.backgroundRearLayer = this._getDOMRef('backgroundRearLayer')),
        (e.deltaBg =
          e.backgroundFrontLayer.offsetHeight - e.background.offsetHeight),
        0 === e.deltaBg
          ? (isNaN(i) && (i = 0.8), (e.deltaBg = (this._dHeight || 0) * i))
          : (isNaN(i) && (i = 1), (e.deltaBg = e.deltaBg * i)),
        (this._fxParallaxBackground = e);
    },
    run: function (t, e) {
      var i = this._fxParallaxBackground;
      this.transform(
        'translate3d(0px, ' + i.deltaBg * Math.min(1, t) + 'px, 0px)',
        i.backgroundFrontLayer
      ),
        i.backgroundRearLayer &&
          this.transform(
            'translate3d(0px, ' + i.deltaBg * Math.min(1, t) + 'px, 0px)',
            i.backgroundRearLayer
          );
    },
    tearDown: function () {
      delete this._fxParallaxBackground;
    },
  }),
  /**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  er('material', {
    setUp: function () {
      return (
        (this.effects =
          'waterfall resize-title blend-background parallax-background'),
        !1
      );
    },
  }),
  /**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  er('resize-snapped-title', {
    setUp: function (t) {
      var e = this._getDOMRef('mainTitle'),
        i = this._getDOMRef('condensedTitle'),
        s = t.duration || '0.2s',
        n = {};
      return i
        ? e
          ? ((e.style.transitionProperty = 'opacity'),
            (e.style.transitionDuration = s),
            (i.style.transitionProperty = 'opacity'),
            (i.style.transitionDuration = s),
            (n.condensedTitle = i),
            (n.title = e),
            void (this._fxResizeSnappedTitle = n))
          : (console.warn(
              'Scroll effect `resize-snapped-title`: undefined `main-title`'
            ),
            !1)
        : (console.warn(
            'Scroll effect `resize-snapped-title`: undefined `condensed-title`'
          ),
          !1);
    },
    run: function (t, e) {
      var i = this._fxResizeSnappedTitle;
      t > 0
        ? ((i.title.style.opacity = 0), (i.condensedTitle.style.opacity = 1))
        : ((i.title.style.opacity = 1), (i.condensedTitle.style.opacity = 0));
    },
    tearDown: function () {
      var t = this._fxResizeSnappedTitle;
      (t.title.style.transition = ''),
        (t.condensedTitle.style.transition = ''),
        delete this._fxResizeSnappedTitle;
    },
  }),
  /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  Bs({
    _template: cn`
    <style>
      :host {
        position: relative;
        display: block;
        transition-timing-function: linear;
        transition-property: -webkit-transform;
        transition-property: transform;
      }

      :host::before {
        position: absolute;
        right: 0px;
        bottom: -5px;
        left: 0px;
        width: 100%;
        height: 5px;
        content: "";
        transition: opacity 0.4s;
        pointer-events: none;
        opacity: 0;
        box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.4);
        will-change: opacity;
        @apply --app-header-shadow;
      }

      :host([shadow])::before {
        opacity: 1;
      }

      #background {
        @apply --layout-fit;
        overflow: hidden;
      }

      #backgroundFrontLayer,
      #backgroundRearLayer {
        @apply --layout-fit;
        height: 100%;
        pointer-events: none;
        background-size: cover;
      }

      #backgroundFrontLayer {
        @apply --app-header-background-front-layer;
      }

      #backgroundRearLayer {
        opacity: 0;
        @apply --app-header-background-rear-layer;
      }

      #contentContainer {
        position: relative;
        width: 100%;
        height: 100%;
      }

      :host([disabled]),
      :host([disabled])::after,
      :host([disabled]) #backgroundFrontLayer,
      :host([disabled]) #backgroundRearLayer,
      /* Silent scrolling should not run CSS transitions */
      :host([silent-scroll]),
      :host([silent-scroll])::after,
      :host([silent-scroll]) #backgroundFrontLayer,
      :host([silent-scroll]) #backgroundRearLayer {
        transition: none !important;
      }

      :host([disabled]) ::slotted(app-toolbar:first-of-type),
      :host([disabled]) ::slotted([sticky]),
      /* Silent scrolling should not run CSS transitions */
      :host([silent-scroll]) ::slotted(app-toolbar:first-of-type),
      :host([silent-scroll]) ::slotted([sticky]) {
        transition: none !important;
      }

    </style>
    <div id="contentContainer">
      <slot id="slot"></slot>
    </div>
`,
    is: 'app-header',
    behaviors: [ir, Qn],
    properties: {
      condenses: {type: Boolean, value: !1},
      fixed: {type: Boolean, value: !1},
      reveals: {type: Boolean, value: !1},
      shadow: {type: Boolean, reflectToAttribute: !0, value: !1},
    },
    observers: ['_configChanged(isAttached, condenses, fixed)'],
    _height: 0,
    _dHeight: 0,
    _stickyElTop: 0,
    _stickyElRef: null,
    _top: 0,
    _progress: 0,
    _wasScrollingDown: !1,
    _initScrollTop: 0,
    _initTimestamp: 0,
    _lastTimestamp: 0,
    _lastScrollTop: 0,
    get _maxHeaderTop() {
      return this.fixed ? this._dHeight : this._height + 5;
    },
    get _stickyEl() {
      if (this._stickyElRef) return this._stickyElRef;
      for (
        var t, e = xs(this.$.slot).getDistributedNodes(), i = 0;
        (t = e[i]);
        i++
      )
        if (t.nodeType === Node.ELEMENT_NODE) {
          if (t.hasAttribute('sticky')) {
            this._stickyElRef = t;
            break;
          }
          this._stickyElRef || (this._stickyElRef = t);
        }
      return this._stickyElRef;
    },
    _configChanged: function () {
      this.resetLayout(), this._notifyLayoutChanged();
    },
    _updateLayoutStates: function () {
      if (0 !== this.offsetWidth || 0 !== this.offsetHeight) {
        var t = this._clampedScrollTop,
          e = 0 === this._height || 0 === t,
          i = this.disabled;
        (this._height = this.offsetHeight),
          (this._stickyElRef = null),
          (this.disabled = !0),
          e || this._updateScrollState(0, !0),
          this._mayMove()
            ? (this._dHeight = this._stickyEl
                ? this._height - this._stickyEl.offsetHeight
                : 0)
            : (this._dHeight = 0),
          (this._stickyElTop = this._stickyEl ? this._stickyEl.offsetTop : 0),
          this._setUpEffect(),
          e
            ? this._updateScrollState(t, !0)
            : (this._updateScrollState(this._lastScrollTop, !0),
              this._layoutIfDirty()),
          (this.disabled = i);
      }
    },
    _updateScrollState: function (t, e) {
      if (0 !== this._height) {
        var i = 0,
          s = 0,
          n = this._top;
        this._lastScrollTop;
        var r = this._maxHeaderTop,
          o = t - this._lastScrollTop,
          h = Math.abs(o),
          a = t > this._lastScrollTop,
          l = performance.now();
        if (
          (this._mayMove() && (s = this._clamp(this.reveals ? n + o : t, 0, r)),
          t >= this._dHeight &&
            ((s =
              this.condenses && !this.fixed ? Math.max(this._dHeight, s) : s),
            (this.style.transitionDuration = '0ms')),
          this.reveals &&
            !this.disabled &&
            h < 100 &&
            ((l - this._initTimestamp > 300 || this._wasScrollingDown !== a) &&
              ((this._initScrollTop = t), (this._initTimestamp = l)),
            t >= r))
        )
          if (Math.abs(this._initScrollTop - t) > 30 || h > 10) {
            a && t >= r
              ? (s = r)
              : !a &&
                t >= this._dHeight &&
                (s = this.condenses && !this.fixed ? this._dHeight : 0);
            var c = o / (l - this._lastTimestamp);
            this.style.transitionDuration =
              this._clamp((s - n) / c, 0, 300) + 'ms';
          } else s = this._top;
        (i = 0 === this._dHeight ? (t > 0 ? 1 : 0) : s / this._dHeight),
          e ||
            ((this._lastScrollTop = t),
            (this._top = s),
            (this._wasScrollingDown = a),
            (this._lastTimestamp = l)),
          (e || i !== this._progress || n !== s || 0 === t) &&
            ((this._progress = i),
            this._runEffects(i, s),
            this._transformHeader(s));
      }
    },
    _mayMove: function () {
      return this.condenses || !this.fixed;
    },
    willCondense: function () {
      return this._dHeight > 0 && this.condenses;
    },
    isOnScreen: function () {
      return 0 !== this._height && this._top < this._height;
    },
    isContentBelow: function () {
      return 0 === this._top
        ? this._clampedScrollTop > 0
        : this._clampedScrollTop - this._maxHeaderTop >= 0;
    },
    _transformHeader: function (t) {
      this.translate3d(0, -t + 'px', 0),
        this._stickyEl &&
          this.translate3d(
            0,
            this.condenses && t >= this._stickyElTop
              ? Math.min(t, this._dHeight) - this._stickyElTop + 'px'
              : 0,
            0,
            this._stickyEl
          );
    },
    _clamp: function (t, e, i) {
      return Math.min(i, Math.max(e, t));
    },
    _ensureBgContainers: function () {
      this._bgContainer ||
        ((this._bgContainer = document.createElement('div')),
        (this._bgContainer.id = 'background'),
        (this._bgRear = document.createElement('div')),
        (this._bgRear.id = 'backgroundRearLayer'),
        this._bgContainer.appendChild(this._bgRear),
        (this._bgFront = document.createElement('div')),
        (this._bgFront.id = 'backgroundFrontLayer'),
        this._bgContainer.appendChild(this._bgFront),
        xs(this.root).insertBefore(this._bgContainer, this.$.contentContainer));
    },
    _getDOMRef: function (t) {
      switch (t) {
        case 'backgroundFrontLayer':
          return this._ensureBgContainers(), this._bgFront;
        case 'backgroundRearLayer':
          return this._ensureBgContainers(), this._bgRear;
        case 'background':
          return this._ensureBgContainers(), this._bgContainer;
        case 'mainTitle':
          return xs(this).querySelector('[main-title]');
        case 'condensedTitle':
          return xs(this).querySelector('[condensed-title]');
      }
      return null;
    },
    getScrollState: function () {
      return {progress: this._progress, top: this._top};
    },
  }),
  /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  Bs({
    _template: cn`
    <style>
      :host {
        display: block;
        /**
         * Force app-header-layout to have its own stacking context so that its parent can
         * control the stacking of it relative to other elements (e.g. app-drawer-layout).
         * This could be done using \`isolation: isolate\`, but that's not well supported
         * across browsers.
         */
        position: relative;
        z-index: 0;
      }

      #wrapper ::slotted([slot=header]) {
        @apply --layout-fixed-top;
        z-index: 1;
      }

      #wrapper.initializing ::slotted([slot=header]) {
        position: relative;
      }

      :host([has-scrolling-region]) {
        height: 100%;
      }

      :host([has-scrolling-region]) #wrapper ::slotted([slot=header]) {
        position: absolute;
      }

      :host([has-scrolling-region]) #wrapper.initializing ::slotted([slot=header]) {
        position: relative;
      }

      :host([has-scrolling-region]) #wrapper #contentContainer {
        @apply --layout-fit;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      :host([has-scrolling-region]) #wrapper.initializing #contentContainer {
        position: relative;
      }

      :host([fullbleed]) {
        @apply --layout-vertical;
        @apply --layout-fit;
      }

      :host([fullbleed]) #wrapper,
      :host([fullbleed]) #wrapper #contentContainer {
        @apply --layout-vertical;
        @apply --layout-flex;
      }

      #contentContainer {
        /* Create a stacking context here so that all children appear below the header. */
        position: relative;
        z-index: 0;
      }

      @media print {
        :host([has-scrolling-region]) #wrapper #contentContainer {
          overflow-y: visible;
        }
      }

    </style>

    <div id="wrapper" class="initializing">
      <slot id="headerSlot" name="header"></slot>

      <div id="contentContainer">
        <slot></slot>
      </div>
    </div>
`,
    is: 'app-header-layout',
    behaviors: [Qn],
    properties: {
      hasScrollingRegion: {type: Boolean, value: !1, reflectToAttribute: !0},
    },
    observers: ['resetLayout(isAttached, hasScrollingRegion)'],
    get header() {
      return xs(this.$.headerSlot).getDistributedNodes()[0];
    },
    _updateLayoutStates: function () {
      var t = this.header;
      if (this.isAttached && t) {
        this.$.wrapper.classList.remove('initializing'),
          (t.scrollTarget = this.hasScrollingRegion
            ? this.$.contentContainer
            : this.ownerDocument.documentElement);
        var e = t.offsetHeight;
        this.hasScrollingRegion
          ? ((t.style.left = ''), (t.style.right = ''))
          : requestAnimationFrame(
              function () {
                var e = this.getBoundingClientRect(),
                  i = document.documentElement.clientWidth - e.right;
                (t.style.left = e.left + 'px'), (t.style.right = i + 'px');
              }.bind(this)
            );
        var i = this.$.contentContainer.style;
        t.fixed && !t.condenses && this.hasScrollingRegion
          ? ((i.marginTop = e + 'px'), (i.paddingTop = ''))
          : ((i.paddingTop = e + 'px'), (i.marginTop = ''));
      }
    },
  }),
  /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
  Bs({
    _template: cn`
    <style>

      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        position: relative;
        height: 64px;
        padding: 0 16px;
        pointer-events: none;
        font-size: var(--app-toolbar-font-size, 20px);
      }

      :host ::slotted(*) {
        pointer-events: auto;
      }

      :host ::slotted(paper-icon-button) {
        /* paper-icon-button/issues/33 */
        font-size: 0;
      }

      :host ::slotted([main-title]),
      :host ::slotted([condensed-title]) {
        pointer-events: none;
        @apply --layout-flex;
      }

      :host ::slotted([bottom-item]) {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
      }

      :host ::slotted([top-item]) {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
      }

      :host ::slotted([spacer]) {
        margin-left: 64px;
      }
    </style>

    <slot></slot>
`,
    is: 'app-toolbar',
  });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sr =
    window.ShadowRoot &&
    (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  nr = Symbol(),
  rr = new Map();
class or {
  constructor(t, e) {
    if (((this._$cssResult$ = !0), e !== nr))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    this.cssText = t;
  }
  get styleSheet() {
    let t = rr.get(this.cssText);
    return (
      sr &&
        void 0 === t &&
        (rr.set(this.cssText, (t = new CSSStyleSheet())),
        t.replaceSync(this.cssText)),
      t
    );
  }
  toString() {
    return this.cssText;
  }
}
const hr = (t, ...e) => {
    const i =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, i, s) =>
              e +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(i) +
              t[s + 1],
            t[0]
          );
    return new or(i, nr);
  },
  ar = sr
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = '';
              for (const i of t.cssRules) e += i.cssText;
              return ((t) => new or('string' == typeof t ? t : t + '', nr))(e);
            })(t)
          : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var lr;
const cr = window.trustedTypes,
  pr = cr ? cr.emptyScript : '',
  dr = window.reactiveElementPolyfillSupport,
  ur = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? pr : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let i = t;
      switch (e) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    },
  },
  fr = (t, e) => e !== t && (e == e || t == t),
  vr = {
    attribute: !0,
    type: String,
    converter: ur,
    reflect: !1,
    hasChanged: fr,
  };
class gr extends HTMLElement {
  constructor() {
    super(),
      (this._$Et = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Ei = null),
      this.o();
  }
  static addInitializer(t) {
    var e;
    (null !== (e = this.l) && void 0 !== e) || (this.l = []), this.l.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, i) => {
        const s = this._$Eh(i, e);
        void 0 !== s && (this._$Eu.set(s, i), t.push(s));
      }),
      t
    );
  }
  static createProperty(t, e = vr) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const i = 'symbol' == typeof t ? Symbol() : '__' + t,
        s = this.getPropertyDescriptor(t, i, e);
      void 0 !== s && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return {
      get() {
        return this[e];
      },
      set(s) {
        const n = this[t];
        (this[e] = s), this.requestUpdate(t, n, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || vr;
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Eu = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        e = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const i of e) this.createProperty(i, t[i]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const t of i) e.unshift(ar(t));
    } else void 0 !== t && e.push(ar(t));
    return e;
  }
  static _$Eh(t, e) {
    const i = e.attribute;
    return !1 === i
      ? void 0
      : 'string' == typeof i
      ? i
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  o() {
    var t;
    (this._$Ep = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Em(),
      this.requestUpdate(),
      null === (t = this.constructor.l) ||
        void 0 === t ||
        t.forEach((t) => t(this));
  }
  addController(t) {
    var e, i;
    (null !== (e = this._$Eg) && void 0 !== e ? e : (this._$Eg = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (i = t.hostConnected) || void 0 === i || i.call(t));
  }
  removeController(t) {
    var e;
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.splice(this._$Eg.indexOf(t) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Et.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e =
      null !== (t = this.shadowRoot) && void 0 !== t
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((t, e) => {
        sr
          ? (t.adoptedStyleSheets = e.map((t) =>
              t instanceof CSSStyleSheet ? t : t.styleSheet
            ))
          : e.forEach((e) => {
              const i = document.createElement('style'),
                s = window.litNonce;
              void 0 !== s && i.setAttribute('nonce', s),
                (i.textContent = e.cssText),
                t.appendChild(i);
            });
      })(e, this.constructor.elementStyles),
      e
    );
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$Eg) ||
        void 0 === t ||
        t.forEach((t) => {
          var e;
          return null === (e = t.hostConnected) || void 0 === e
            ? void 0
            : e.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$Eg) ||
      void 0 === t ||
      t.forEach((t) => {
        var e;
        return null === (e = t.hostDisconnected) || void 0 === e
          ? void 0
          : e.call(t);
      });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ES(t, e, i = vr) {
    var s, n;
    const r = this.constructor._$Eh(t, i);
    if (void 0 !== r && !0 === i.reflect) {
      const o = (
        null !==
          (n =
            null === (s = i.converter) || void 0 === s
              ? void 0
              : s.toAttribute) && void 0 !== n
          ? n
          : ur.toAttribute
      )(e, i.type);
      (this._$Ei = t),
        null == o ? this.removeAttribute(r) : this.setAttribute(r, o),
        (this._$Ei = null);
    }
  }
  _$AK(t, e) {
    var i, s, n;
    const r = this.constructor,
      o = r._$Eu.get(t);
    if (void 0 !== o && this._$Ei !== o) {
      const t = r.getPropertyOptions(o),
        h = t.converter,
        a =
          null !==
            (n =
              null !==
                (s =
                  null === (i = h) || void 0 === i
                    ? void 0
                    : i.fromAttribute) && void 0 !== s
                ? s
                : 'function' == typeof h
                ? h
                : null) && void 0 !== n
            ? n
            : ur.fromAttribute;
      (this._$Ei = o), (this[o] = a(e, t.type)), (this._$Ei = null);
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    void 0 !== t &&
      (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || fr)(
        this[t],
        e
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          !0 === i.reflect &&
            this._$Ei !== t &&
            (void 0 === this._$E_ && (this._$E_ = new Map()),
            this._$E_.set(t, i)))
        : (s = !1)),
      !this.isUpdatePending && s && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = !0;
    try {
      await this._$Ep;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Et &&
        (this._$Et.forEach((t, e) => (this[e] = t)), (this._$Et = void 0));
    let e = !1;
    const i = this._$AL;
    try {
      (e = this.shouldUpdate(i)),
        e
          ? (this.willUpdate(i),
            null === (t = this._$Eg) ||
              void 0 === t ||
              t.forEach((t) => {
                var e;
                return null === (e = t.hostUpdate) || void 0 === e
                  ? void 0
                  : e.call(t);
              }),
            this.update(i))
          : this._$EU();
    } catch (t) {
      throw ((e = !1), this._$EU(), t);
    }
    e && this._$AE(i);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.forEach((t) => {
        var e;
        return null === (e = t.hostUpdated) || void 0 === e
          ? void 0
          : e.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$EU() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$E_ &&
      (this._$E_.forEach((t, e) => this._$ES(e, this[e], t)),
      (this._$E_ = void 0)),
      this._$EU();
  }
  updated(t) {}
  firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var mr;
(gr.finalized = !0),
  (gr.elementProperties = new Map()),
  (gr.elementStyles = []),
  (gr.shadowRootOptions = {mode: 'open'}),
  null == dr || dr({ReactiveElement: gr}),
  (null !== (lr = globalThis.reactiveElementVersions) && void 0 !== lr
    ? lr
    : (globalThis.reactiveElementVersions = [])
  ).push('1.0.2');
const br = globalThis.trustedTypes,
  yr = br ? br.createPolicy('lit-html', {createHTML: (t) => t}) : void 0,
  zr = `lit$${(Math.random() + '').slice(9)}$`,
  wr = '?' + zr,
  _r = `<${wr}>`,
  Mr = document,
  Hr = (t = '') => Mr.createComment(t),
  xr = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  kr = Array.isArray,
  Cr = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  Vr = /-->/g,
  Lr = />/g,
  Sr =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  Tr = /'/g,
  Ar = /"/g,
  Er = /^(?:script|style|textarea)$/i,
  Pr = (
    (t) =>
    (e, ...i) => ({_$litType$: t, strings: e, values: i})
  )(1),
  Or = Symbol.for('lit-noChange'),
  $r = Symbol.for('lit-nothing'),
  Nr = new WeakMap(),
  Dr = Mr.createTreeWalker(Mr, 129, null, !1),
  jr = (t, e) => {
    const i = t.length - 1,
      s = [];
    let n,
      r = 2 === e ? '<svg>' : '',
      o = Cr;
    for (let e = 0; e < i; e++) {
      const i = t[e];
      let h,
        a,
        l = -1,
        c = 0;
      for (; c < i.length && ((o.lastIndex = c), (a = o.exec(i)), null !== a); )
        (c = o.lastIndex),
          o === Cr
            ? '!--' === a[1]
              ? (o = Vr)
              : void 0 !== a[1]
              ? (o = Lr)
              : void 0 !== a[2]
              ? (Er.test(a[2]) && (n = RegExp('</' + a[2], 'g')), (o = Sr))
              : void 0 !== a[3] && (o = Sr)
            : o === Sr
            ? '>' === a[0]
              ? ((o = null != n ? n : Cr), (l = -1))
              : void 0 === a[1]
              ? (l = -2)
              : ((l = o.lastIndex - a[2].length),
                (h = a[1]),
                (o = void 0 === a[3] ? Sr : '"' === a[3] ? Ar : Tr))
            : o === Ar || o === Tr
            ? (o = Sr)
            : o === Vr || o === Lr
            ? (o = Cr)
            : ((o = Sr), (n = void 0));
      const p = o === Sr && t[e + 1].startsWith('/>') ? ' ' : '';
      r +=
        o === Cr
          ? i + _r
          : l >= 0
          ? (s.push(h), i.slice(0, l) + '$lit$' + i.slice(l) + zr + p)
          : i + zr + (-2 === l ? (s.push(void 0), e) : p);
    }
    const h = r + (t[i] || '<?>') + (2 === e ? '</svg>' : '');
    return [void 0 !== yr ? yr.createHTML(h) : h, s];
  };
class Br {
  constructor({strings: t, _$litType$: e}, i) {
    let s;
    this.parts = [];
    let n = 0,
      r = 0;
    const o = t.length - 1,
      h = this.parts,
      [a, l] = jr(t, e);
    if (
      ((this.el = Br.createElement(a, i)),
      (Dr.currentNode = this.el.content),
      2 === e)
    ) {
      const t = this.el.content,
        e = t.firstChild;
      e.remove(), t.append(...e.childNodes);
    }
    for (; null !== (s = Dr.nextNode()) && h.length < o; ) {
      if (1 === s.nodeType) {
        if (s.hasAttributes()) {
          const t = [];
          for (const e of s.getAttributeNames())
            if (e.endsWith('$lit$') || e.startsWith(zr)) {
              const i = l[r++];
              if ((t.push(e), void 0 !== i)) {
                const t = s.getAttribute(i.toLowerCase() + '$lit$').split(zr),
                  e = /([.?@])?(.*)/.exec(i);
                h.push({
                  type: 1,
                  index: n,
                  name: e[2],
                  strings: t,
                  ctor:
                    '.' === e[1]
                      ? Kr
                      : '?' === e[1]
                      ? Jr
                      : '@' === e[1]
                      ? Zr
                      : Ur,
                });
              } else h.push({type: 6, index: n});
            }
          for (const e of t) s.removeAttribute(e);
        }
        if (Er.test(s.tagName)) {
          const t = s.textContent.split(zr),
            e = t.length - 1;
          if (e > 0) {
            s.textContent = br ? br.emptyScript : '';
            for (let i = 0; i < e; i++)
              s.append(t[i], Hr()),
                Dr.nextNode(),
                h.push({type: 2, index: ++n});
            s.append(t[e], Hr());
          }
        }
      } else if (8 === s.nodeType)
        if (s.data === wr) h.push({type: 2, index: n});
        else {
          let t = -1;
          for (; -1 !== (t = s.data.indexOf(zr, t + 1)); )
            h.push({type: 7, index: n}), (t += zr.length - 1);
        }
      n++;
    }
  }
  static createElement(t, e) {
    const i = Mr.createElement('template');
    return (i.innerHTML = t), i;
  }
}
function Ir(t, e, i = t, s) {
  var n, r, o, h;
  if (e === Or) return e;
  let a =
    void 0 !== s
      ? null === (n = i._$Cl) || void 0 === n
        ? void 0
        : n[s]
      : i._$Cu;
  const l = xr(e) ? void 0 : e._$litDirective$;
  return (
    (null == a ? void 0 : a.constructor) !== l &&
      (null === (r = null == a ? void 0 : a._$AO) ||
        void 0 === r ||
        r.call(a, !1),
      void 0 === l ? (a = void 0) : ((a = new l(t)), a._$AT(t, i, s)),
      void 0 !== s
        ? ((null !== (o = (h = i)._$Cl) && void 0 !== o ? o : (h._$Cl = []))[
            s
          ] = a)
        : (i._$Cu = a)),
    void 0 !== a && (e = Ir(t, a._$AS(t, e.values), a, s)),
    e
  );
}
class Rr {
  constructor(t, e) {
    (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const {
        el: {content: i},
        parts: s,
      } = this._$AD,
      n = (
        null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e
          ? e
          : Mr
      ).importNode(i, !0);
    Dr.currentNode = n;
    let r = Dr.nextNode(),
      o = 0,
      h = 0,
      a = s[0];
    for (; void 0 !== a; ) {
      if (o === a.index) {
        let e;
        2 === a.type
          ? (e = new Fr(r, r.nextSibling, this, t))
          : 1 === a.type
          ? (e = new a.ctor(r, a.name, a.strings, this, t))
          : 6 === a.type && (e = new Wr(r, this, t)),
          this.v.push(e),
          (a = s[++h]);
      }
      o !== (null == a ? void 0 : a.index) && ((r = Dr.nextNode()), o++);
    }
    return n;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      void 0 !== i &&
        (void 0 !== i.strings
          ? (i._$AI(t, i, e), (e += i.strings.length - 2))
          : i._$AI(t[e])),
        e++;
  }
}
class Fr {
  constructor(t, e, i, s) {
    var n;
    (this.type = 2),
      (this._$AH = $r),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = i),
      (this.options = s),
      (this._$Cg =
        null === (n = null == s ? void 0 : s.isConnected) || void 0 === n || n);
  }
  get _$AU() {
    var t, e;
    return null !==
      (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== e
      ? e
      : this._$Cg;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = Ir(this, t, e)),
      xr(t)
        ? t === $r || null == t || '' === t
          ? (this._$AH !== $r && this._$AR(), (this._$AH = $r))
          : t !== this._$AH && t !== Or && this.$(t)
        : void 0 !== t._$litType$
        ? this.T(t)
        : void 0 !== t.nodeType
        ? this.S(t)
        : ((t) => {
            var e;
            return (
              kr(t) ||
              'function' ==
                typeof (null === (e = t) || void 0 === e
                  ? void 0
                  : e[Symbol.iterator])
            );
          })(t)
        ? this.M(t)
        : this.$(t);
  }
  A(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  S(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.A(t)));
  }
  $(t) {
    this._$AH !== $r && xr(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.S(Mr.createTextNode(t)),
      (this._$AH = t);
  }
  T(t) {
    var e;
    const {values: i, _$litType$: s} = t,
      n =
        'number' == typeof s
          ? this._$AC(t)
          : (void 0 === s.el && (s.el = Br.createElement(s.h, this.options)),
            s);
    if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === n)
      this._$AH.m(i);
    else {
      const t = new Rr(n, this),
        e = t.p(this.options);
      t.m(i), this.S(e), (this._$AH = t);
    }
  }
  _$AC(t) {
    let e = Nr.get(t.strings);
    return void 0 === e && Nr.set(t.strings, (e = new Br(t))), e;
  }
  M(t) {
    kr(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let i,
      s = 0;
    for (const n of t)
      s === e.length
        ? e.push((i = new Fr(this.A(Hr()), this.A(Hr()), this, this.options)))
        : (i = e[s]),
        i._$AI(n),
        s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), (e.length = s));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for (
      null === (i = this._$AP) || void 0 === i || i.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const e = t.nextSibling;
      t.remove(), (t = e);
    }
  }
  setConnected(t) {
    var e;
    void 0 === this._$AM &&
      ((this._$Cg = t),
      null === (e = this._$AP) || void 0 === e || e.call(this, t));
  }
}
class Ur {
  constructor(t, e, i, s, n) {
    (this.type = 1),
      (this._$AH = $r),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = s),
      (this.options = n),
      i.length > 2 || '' !== i[0] || '' !== i[1]
        ? ((this._$AH = Array(i.length - 1).fill(new String())),
          (this.strings = i))
        : (this._$AH = $r);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let r = !1;
    if (void 0 === n)
      (t = Ir(this, t, e, 0)),
        (r = !xr(t) || (t !== this._$AH && t !== Or)),
        r && (this._$AH = t);
    else {
      const s = t;
      let o, h;
      for (t = n[0], o = 0; o < n.length - 1; o++)
        (h = Ir(this, s[i + o], e, o)),
          h === Or && (h = this._$AH[o]),
          r || (r = !xr(h) || h !== this._$AH[o]),
          h === $r
            ? (t = $r)
            : t !== $r && (t += (null != h ? h : '') + n[o + 1]),
          (this._$AH[o] = h);
    }
    r && !s && this.k(t);
  }
  k(t) {
    t === $r
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : '');
  }
}
class Kr extends Ur {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  k(t) {
    this.element[this.name] = t === $r ? void 0 : t;
  }
}
const qr = br ? br.emptyScript : '';
class Jr extends Ur {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  k(t) {
    t && t !== $r
      ? this.element.setAttribute(this.name, qr)
      : this.element.removeAttribute(this.name);
  }
}
class Zr extends Ur {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), (this.type = 5);
  }
  _$AI(t, e = this) {
    var i;
    if ((t = null !== (i = Ir(this, t, e, 0)) && void 0 !== i ? i : $r) === Or)
      return;
    const s = this._$AH,
      n =
        (t === $r && s !== $r) ||
        t.capture !== s.capture ||
        t.once !== s.once ||
        t.passive !== s.passive,
      r = t !== $r && (s === $r || n);
    n && this.element.removeEventListener(this.name, this, s),
      r && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, i;
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (i =
              null === (e = this.options) || void 0 === e ? void 0 : e.host) &&
            void 0 !== i
            ? i
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class Wr {
  constructor(t, e, i) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = i);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ir(this, t);
  }
}
const Gr = window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Yr, Qr;
null == Gr || Gr(Br, Fr),
  (null !== (mr = globalThis.litHtmlVersions) && void 0 !== mr
    ? mr
    : (globalThis.litHtmlVersions = [])
  ).push('2.0.2');
class Xr extends gr {
  constructor() {
    super(...arguments),
      (this.renderOptions = {host: this}),
      (this._$Dt = void 0);
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (
      (null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t) ||
        (e.renderBefore = i.firstChild),
      i
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Dt = ((t, e, i) => {
        var s, n;
        const r =
          null !== (s = null == i ? void 0 : i.renderBefore) && void 0 !== s
            ? s
            : e;
        let o = r._$litPart$;
        if (void 0 === o) {
          const t =
            null !== (n = null == i ? void 0 : i.renderBefore) && void 0 !== n
              ? n
              : null;
          r._$litPart$ = o = new Fr(
            e.insertBefore(Hr(), t),
            t,
            void 0,
            null != i ? i : {}
          );
        }
        return o._$AI(t), o;
      })(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return Or;
  }
}
(Xr.finalized = !0),
  (Xr._$litElement$ = !0),
  null === (Yr = globalThis.litElementHydrateSupport) ||
    void 0 === Yr ||
    Yr.call(globalThis, {LitElement: Xr});
const to = globalThis.litElementPolyfillSupport;
null == to || to({LitElement: Xr}),
  (null !== (Qr = globalThis.litElementVersions) && void 0 !== Qr
    ? Qr
    : (globalThis.litElementVersions = [])
  ).push('3.0.2');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const eo = (t) => (e) =>
    'function' == typeof e
      ? ((t, e) => (window.customElements.define(t, e), e))(t, e)
      : ((t, e) => {
          const {kind: i, elements: s} = e;
          return {
            kind: i,
            elements: s,
            finisher(e) {
              window.customElements.define(t, e);
            },
          };
        })(t, e),
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ io = (t, e) =>
    'method' === e.kind && e.descriptor && !('value' in e.descriptor)
      ? {
          ...e,
          finisher(i) {
            i.createProperty(e.key, t);
          },
        }
      : {
          kind: 'field',
          key: Symbol(),
          placement: 'own',
          descriptor: {},
          originalKey: e.key,
          initializer() {
            'function' == typeof e.initializer &&
              (this[e.key] = e.initializer.call(this));
          },
          finisher(i) {
            i.createProperty(e.key, t);
          },
        };
function so(t) {
  return (e, i) =>
    void 0 !== i
      ? ((t, e, i) => {
          e.constructor.createProperty(i, t);
        })(t, e, i)
      : io(t, e);
  /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
}
const no = {
  properties: {
    name: {type: String},
    value: {notify: !0, type: String},
    required: {type: Boolean, value: !1},
  },
  attached: function () {},
  detached: function () {},
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ let ro = null;
const oo = {
    properties: {
      validator: {type: String},
      invalid: {
        notify: !0,
        reflectToAttribute: !0,
        type: Boolean,
        value: !1,
        observer: '_invalidChanged',
      },
    },
    registered: function () {
      ro = new Hn({type: 'validator'});
    },
    _invalidChanged: function () {
      this.invalid
        ? this.setAttribute('aria-invalid', 'true')
        : this.removeAttribute('aria-invalid');
    },
    get _validator() {
      return ro && ro.byKey(this.validator);
    },
    hasValidator: function () {
      return null != this._validator;
    },
    validate: function (t) {
      return (
        void 0 === t && void 0 !== this.value
          ? (this.invalid = !this._getValidity(this.value))
          : (this.invalid = !this._getValidity(t)),
        !this.invalid
      );
    },
    _getValidity: function (t) {
      return !this.hasValidator() || this._validator.validate(t);
    },
  },
  ho = {
    properties: {
      checked: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0,
        notify: !0,
        observer: '_checkedChanged',
      },
      toggles: {type: Boolean, value: !0, reflectToAttribute: !0},
      value: {type: String, value: 'on', observer: '_valueChanged'},
    },
    observers: ['_requiredChanged(required)'],
    created: function () {
      this._hasIronCheckedElementBehavior = !0;
    },
    _getValidity: function (t) {
      return this.disabled || !this.required || this.checked;
    },
    _requiredChanged: function () {
      this.required
        ? this.setAttribute('aria-required', 'true')
        : this.removeAttribute('aria-required');
    },
    _checkedChanged: function () {
      (this.active = this.checked), this.fire('iron-change');
    },
    _valueChanged: function () {
      (void 0 !== this.value && null !== this.value) || (this.value = 'on');
    },
  },
  ao = [
    Gn,
    [no, oo, ho],
    {
      _checkedChanged: function () {
        ho._checkedChanged.call(this),
          this.hasRipple() &&
            (this.checked
              ? this._ripple.setAttribute('checked', '')
              : this._ripple.removeAttribute('checked'));
      },
      _buttonStateChanged: function () {
        Zn._buttonStateChanged.call(this),
          this.disabled || (this.isAttached && (this.checked = this.active));
      },
    },
  ],
  lo = cn`<style>
  :host {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    --calculated-paper-checkbox-size: var(--paper-checkbox-size, 18px);
    /* -1px is a sentinel for the default and is replaced in \`attached\`. */
    --calculated-paper-checkbox-ink-size: var(--paper-checkbox-ink-size, -1px);
    @apply --paper-font-common-base;
    line-height: 0;
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:focus) {
    outline: none;
  }

  .hidden {
    display: none;
  }

  #checkboxContainer {
    display: inline-block;
    position: relative;
    width: var(--calculated-paper-checkbox-size);
    height: var(--calculated-paper-checkbox-size);
    min-width: var(--calculated-paper-checkbox-size);
    margin: var(--paper-checkbox-margin, initial);
    vertical-align: var(--paper-checkbox-vertical-align, middle);
    background-color: var(--paper-checkbox-unchecked-background-color, transparent);
  }

  #ink {
    position: absolute;

    /* Center the ripple in the checkbox by negative offsetting it by
     * (inkWidth - rippleWidth) / 2 */
    top: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    left: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    width: var(--calculated-paper-checkbox-ink-size);
    height: var(--calculated-paper-checkbox-ink-size);
    color: var(--paper-checkbox-unchecked-ink-color, var(--primary-text-color));
    opacity: 0.6;
    pointer-events: none;
  }

  #ink:dir(rtl) {
    right: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    left: auto;
  }

  #ink[checked] {
    color: var(--paper-checkbox-checked-ink-color, var(--primary-color));
  }

  #checkbox {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    border: solid 2px;
    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
    border-radius: 2px;
    pointer-events: none;
    -webkit-transition: background-color 140ms, border-color 140ms;
    transition: background-color 140ms, border-color 140ms;

    -webkit-transition-duration: var(--paper-checkbox-animation-duration, 140ms);
    transition-duration: var(--paper-checkbox-animation-duration, 140ms);
  }

  /* checkbox checked animations */
  #checkbox.checked #checkmark {
    -webkit-animation: checkmark-expand 140ms ease-out forwards;
    animation: checkmark-expand 140ms ease-out forwards;

    -webkit-animation-duration: var(--paper-checkbox-animation-duration, 140ms);
    animation-duration: var(--paper-checkbox-animation-duration, 140ms);
  }

  @-webkit-keyframes checkmark-expand {
    0% {
      -webkit-transform: scale(0, 0) rotate(45deg);
    }
    100% {
      -webkit-transform: scale(1, 1) rotate(45deg);
    }
  }

  @keyframes checkmark-expand {
    0% {
      transform: scale(0, 0) rotate(45deg);
    }
    100% {
      transform: scale(1, 1) rotate(45deg);
    }
  }

  #checkbox.checked {
    background-color: var(--paper-checkbox-checked-color, var(--primary-color));
    border-color: var(--paper-checkbox-checked-color, var(--primary-color));
  }

  #checkmark {
    position: absolute;
    width: 36%;
    height: 70%;
    border-style: solid;
    border-top: none;
    border-left: none;
    border-right-width: calc(2/15 * var(--calculated-paper-checkbox-size));
    border-bottom-width: calc(2/15 * var(--calculated-paper-checkbox-size));
    border-color: var(--paper-checkbox-checkmark-color, white);
    -webkit-transform-origin: 97% 86%;
    transform-origin: 97% 86%;
    box-sizing: content-box; /* protect against page-level box-sizing */
  }

  #checkmark:dir(rtl) {
    -webkit-transform-origin: 50% 14%;
    transform-origin: 50% 14%;
  }

  /* label */
  #checkboxLabel {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    padding-left: var(--paper-checkbox-label-spacing, 8px);
    white-space: normal;
    line-height: normal;
    color: var(--paper-checkbox-label-color, var(--primary-text-color));
    @apply --paper-checkbox-label;
  }

  :host([checked]) #checkboxLabel {
    color: var(--paper-checkbox-label-checked-color, var(--paper-checkbox-label-color, var(--primary-text-color)));
    @apply --paper-checkbox-label-checked;
  }

  #checkboxLabel:dir(rtl) {
    padding-right: var(--paper-checkbox-label-spacing, 8px);
    padding-left: 0;
  }

  #checkboxLabel[hidden] {
    display: none;
  }

  /* disabled state */

  :host([disabled]) #checkbox {
    opacity: 0.5;
    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
  }

  :host([disabled][checked]) #checkbox {
    background-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled]) #checkboxLabel  {
    opacity: 0.65;
  }

  /* invalid state */
  #checkbox.invalid:not(.checked) {
    border-color: var(--paper-checkbox-error-color, var(--error-color));
  }
</style>

<div id="checkboxContainer">
  <div id="checkbox" class$="[[_computeCheckboxClass(checked, invalid)]]">
    <div id="checkmark" class$="[[_computeCheckmarkClass(checked)]]"></div>
  </div>
</div>

<div id="checkboxLabel"><slot></slot></div>`;
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ lo.setAttribute('strip-whitespace', ''),
  Bs({
    _template: lo,
    is: 'paper-checkbox',
    behaviors: [ao],
    hostAttributes: {role: 'checkbox', 'aria-checked': !1, tabindex: 0},
    properties: {ariaActiveAttribute: {type: String, value: 'aria-checked'}},
    attached: function () {
      ls(this, function () {
        if (
          '-1px' ===
          this.getComputedStyleValue(
            '--calculated-paper-checkbox-ink-size'
          ).trim()
        ) {
          var t = this.getComputedStyleValue(
              '--calculated-paper-checkbox-size'
            ).trim(),
            e = 'px',
            i = t.match(/[A-Za-z]+$/);
          null !== i && (e = i[0]);
          var s = parseFloat(t),
            n = (8 / 3) * s;
          'px' === e && (n = Math.floor(n)) % 2 != s % 2 && n++,
            this.updateStyles({'--paper-checkbox-ink-size': n + e});
        }
      });
    },
    _computeCheckboxClass: function (t, e) {
      var i = '';
      return t && (i += 'checked '), e && (i += 'invalid'), i;
    },
    _computeCheckmarkClass: function (t) {
      return t ? '' : 'hidden';
    },
    _createRipple: function () {
      return (
        (this._rippleContainer = this.$.checkboxContainer),
        Wn._createRipple.call(this)
      );
    },
  });
var co,
  po = function (t, e, i, s) {
    for (
      var n,
        r = arguments.length,
        o =
          r < 3
            ? e
            : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s,
        h = t.length - 1;
      h >= 0;
      h--
    )
      (n = t[h]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o);
    return r > 3 && o && Object.defineProperty(e, i, o), o;
  };
!(function (t) {
  t.CHECKED_CHANGED = 'checked-changed';
})(co || (co = {}));
let uo = class extends Xr {
  constructor() {
    super(...arguments),
      (this.header = ''),
      (this.filters = []),
      (this.disableTags = new Set());
  }
  render() {
    return Pr`
            <h4>${this.header}</h4>
            ${this.renderFilters(this.filters)}
        `;
  }
  renderFilters(t, e = 0) {
    if (!t.length) return $r;
    const i = t
      .map((t) =>
        t.options.length
          ? Pr`
                        <paper-checkbox
                            ?disabled="${this.disableTags.has(t.tag)}"
                            ?checked="${t.checked}"
                            @checked-changed="${this.updateFilter(t)}">
                            ${t.label}
                        </paper-checkbox>
                        ${this.renderFilters(t.options, e + 1)}
                    </details>`
          : Pr`
                    <paper-checkbox
                        ?disabled="${this.disableTags.has(t.tag)}"
                        ?checked="${t.checked}"
                        @checked-changed="${this.updateFilter(t)}">
                        ${t.label}
                    </paper-checkbox>`
      )
      .map((t) => Pr`<li>${t}</li>`);
    return Pr`<ul>
            ${i}
        </ul>`;
  }
  updateFilter(t) {
    return (e) => {
      if (((t.checked = !!e.target.checked), t.options && t.options.length))
        for (const e of t.options) e.checked = t.checked;
      this.dispatchEvent(new CustomEvent(co.CHECKED_CHANGED)),
        this.requestUpdate();
    };
  }
};
(uo.styles = hr`

        h4 {
            margin-left: 5px;
        }

        ul {
            padding-inline-start: 25px;
        }

        li {
            list-style: none;
            margin: 10px 0;
        }
    `),
  po([so({type: String})], uo.prototype, 'header', void 0),
  po([so({type: Array})], uo.prototype, 'filters', void 0),
  po([so({type: Object})], uo.prototype, 'disableTags', void 0),
  (uo = po([eo('filter-source')], uo));
var fo = function (t, e, i, s) {
  for (
    var n,
      r = arguments.length,
      o =
        r < 3
          ? e
          : null === s
          ? (s = Object.getOwnPropertyDescriptor(e, i))
          : s,
      h = t.length - 1;
    h >= 0;
    h--
  )
    (n = t[h]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o);
  return r > 3 && o && Object.defineProperty(e, i, o), o;
};
var vo;
!(function (t) {
  t.TAGS_CHANGED = 'tags-changed';
})(vo || (vo = {}));
let go = class extends Xr {
  constructor() {
    super(...arguments),
      (this.timer = null),
      (this.disableTags = new Set()),
      (this.filters = []);
  }
  render() {
    return this.filters.map(
      (t) => Pr`
            <filter-source
                .header="${t.header}"
                .disableTags="${this.disableTags}"
                .filters="${t.filters}"
                @checked-changed="${this.handleCheckedChanged}"
            >
            </filter-source>
        `
    );
  }
  handleCheckedChanged() {
    null != this.timer && clearTimeout(this.timer),
      (this.timer = window.setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent(vo.TAGS_CHANGED, {detail: this.getShownTags()})
        );
      }, 10));
  }
  getShownTags() {
    const t = new Set();
    function e(i) {
      for (const s of i)
        s.options.length ? e(s.options) : s.checked && t.add(s.tag);
    }
    for (const t of this.filters) e(t.filters);
    return t;
  }
};
(go.styles = hr``),
  fo([so({type: Object})], go.prototype, 'disableTags', void 0),
  fo([so({type: Array})], go.prototype, 'filters', void 0),
  (go = fo([eo('filter-list')], go));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const mo = cn`
<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`;
mo.setAttribute('style', 'display: none;'),
  document.head.appendChild(mo.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const bo = cn`
<dom-module id="paper-material-styles">
  <template>
    <style>
      html {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      .paper-material {
        @apply --paper-material;
      }
      .paper-material[elevation="1"] {
        @apply --paper-material-elevation-1;
      }
      .paper-material[elevation="2"] {
        @apply --paper-material-elevation-2;
      }
      .paper-material[elevation="3"] {
        @apply --paper-material-elevation-3;
      }
      .paper-material[elevation="4"] {
        @apply --paper-material-elevation-4;
      }
      .paper-material[elevation="5"] {
        @apply --paper-material-elevation-5;
      }

      /* Duplicate the styles because of https://github.com/webcomponents/shadycss/issues/193 */
      :host {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      :host(.paper-material) {
        @apply --paper-material;
      }
      :host(.paper-material[elevation="1"]) {
        @apply --paper-material-elevation-1;
      }
      :host(.paper-material[elevation="2"]) {
        @apply --paper-material-elevation-2;
      }
      :host(.paper-material[elevation="3"]) {
        @apply --paper-material-elevation-3;
      }
      :host(.paper-material[elevation="4"]) {
        @apply --paper-material-elevation-4;
      }
      :host(.paper-material[elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>
  </template>
</dom-module>`;
bo.setAttribute('style', 'display: none;'),
  document.head.appendChild(bo.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const yo = {
    properties: {
      elevation: {type: Number, reflectToAttribute: !0, readOnly: !0},
    },
    observers: [
      '_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)',
      '_computeKeyboardClass(receivedFocusFromKeyboard)',
    ],
    hostAttributes: {role: 'button', tabindex: '0', animated: !0},
    _calculateElevation: function () {
      var t = 1;
      this.disabled
        ? (t = 0)
        : this.active || this.pressed
        ? (t = 4)
        : this.receivedFocusFromKeyboard && (t = 3),
        this._setElevation(t);
    },
    _computeKeyboardClass: function (t) {
      this.toggleClass('keyboard-focus', t);
    },
    _spaceKeyDownHandler: function (t) {
      Fn._spaceKeyDownHandler.call(this, t),
        this.hasRipple() &&
          this.getRipple().ripples.length < 1 &&
          this._ripple.uiDownAction();
    },
    _spaceKeyUpHandler: function (t) {
      Fn._spaceKeyUpHandler.call(this, t),
        this.hasRipple() && this._ripple.uiUpAction();
    },
  },
  zo = [Un, Ln, Zn, yo],
  wo = cn`
  <style include="paper-material-styles">
    /* Need to specify the same specificity as the styles imported from paper-material. */
    :host {
      @apply --layout-inline;
      @apply --layout-center-center;
      position: relative;
      box-sizing: border-box;
      min-width: 5.14em;
      margin: 0 0.29em;
      background: transparent;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      font: inherit;
      text-transform: uppercase;
      outline-width: 0;
      border-radius: 3px;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      padding: 0.7em 0.57em;

      @apply --paper-font-common-base;
      @apply --paper-button;
    }

    :host([elevation="1"]) {
      @apply --paper-material-elevation-1;
    }

    :host([elevation="2"]) {
      @apply --paper-material-elevation-2;
    }

    :host([elevation="3"]) {
      @apply --paper-material-elevation-3;
    }

    :host([elevation="4"]) {
      @apply --paper-material-elevation-4;
    }

    :host([elevation="5"]) {
      @apply --paper-material-elevation-5;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([raised].keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-raised-keyboard-focus;
    }

    :host(:not([raised]).keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-flat-keyboard-focus;
    }

    :host([disabled]) {
      background: none;
      color: #a8a8a8;
      cursor: auto;
      pointer-events: none;

      @apply --paper-button-disabled;
    }

    :host([disabled][raised]) {
      background: #eaeaea;
    }


    :host([animated]) {
      @apply --shadow-transition;
    }

    paper-ripple {
      color: var(--paper-button-ink-color);
    }
  </style>

  <slot></slot>`;
wo.setAttribute('strip-whitespace', ''),
  Bs({
    _template: wo,
    is: 'paper-button',
    behaviors: [zo],
    properties: {
      raised: {
        type: Boolean,
        reflectToAttribute: !0,
        value: !1,
        observer: '_calculateElevation',
      },
    },
    _calculateElevation: function () {
      this.raised ? yo._calculateElevation.apply(this) : this._setElevation(0);
    },
  });
var _o,
  Mo = function (t, e, i, s) {
    for (
      var n,
        r = arguments.length,
        o =
          r < 3
            ? e
            : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s,
        h = t.length - 1;
      h >= 0;
      h--
    )
      (n = t[h]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o);
    return r > 3 && o && Object.defineProperty(e, i, o), o;
  };
!(function (t) {
  (t.REQUEST_EXPAND = 'request-expand'), (t.REQUEST_CLOSE = 'request-close');
})(_o || (_o = {}));
let Ho = class extends Xr {
  constructor() {
    super(...arguments),
      (this.data = {
        title: '',
        description: '',
        tags: new Set([]),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: [],
      }),
      (this.expand = !1),
      (this.hide = !1),
      (this.showTags = new Set([])),
      (this.forExport = !1),
      (this.selectedStartTime = new Date(0)),
      (this.selectedEndTime = new Date(0));
  }
  render() {
    return (this.hide && !this.expand) ||
      (this.showTags.size &&
        ![...this.data.tags].filter((t) => this.showTags.has(t)).length)
      ? $r
      : this.expand
      ? this.renderModal()
      : this.renderSummary();
  }
  renderSummary() {
    return Pr`
            <article>
                <h3>${this.data.title}</h3>
                <p>${this.data.description}</p>
                ${this.renderFilterSummary(this.forExport)}
                ${this.renderTimeSummary(this.forExport)}
                ${this.renderSummaryButtons()}
            </article>
        `;
  }
  renderFilterSummary(t) {
    const e = [],
      i = (e, s) => {
        for (const n of e)
          n.options.length
            ? i(n.options, s)
            : (t && !n.checked) ||
              s.push(Pr`<a class="tag" href="#">
                                ${n.label}
                            </a>`);
      };
    for (const t of this.data.filters) {
      const s = [];
      i(t.filters, s),
        e.push(Pr`<p>
                <span>${t.header}: </span>
                ${s}
            </p>`);
    }
    return Pr`<section>
            ${e}
        </section>`;
  }
  renderTimeSummary(t) {
    function e(t) {
      const e = t.getFullYear(),
        i = t.getDate();
      return `${
        [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ][t.getMonth()]
      } ${i}, ${e}`;
    }
    let i = this.data.startTime,
      s = this.data.startTime;
    return (
      t && ((i = this.selectedStartTime), (s = this.selectedEndTime)),
      Pr`<section>
            <p>
                <span>Time Range:</span>
                ${e(i)} to ${e(s)}
            </p>
        </section>`
    );
  }
  renderSummaryButtons() {
    let t = Pr`<paper-button
            @click="${() => {
              this.dispatchEvent(new CustomEvent(_o.REQUEST_EXPAND));
            }}">Select</paper-button>`;
    return this.forExport && (t = Pr`<paper-button>Download</paper-button>`), t;
  }
  renderModal() {
    return Pr`
            <article>
                <div class="row button-container">
                    <div class="row close-container">
                        <paper-icon-button
                            icon="icons:close"
                            @click="${() => {
                              this.dispatchEvent(
                                new CustomEvent(_o.REQUEST_CLOSE)
                              );
                            }}">
                        </paper-icon-button>
                        <h3>${this.data.title}</h3>
                    </div>
                    <div class="row">
                        <paper-button>Add to Queue</paper-button>
                        <paper-button>Download Now <iron-icon icon="icons:arrow-drop-down"></iron-icon></paper-button>
                    </div>
                </div>
                <p>${this.data.description}</p>
                <filter-list
                    .filters="${this.data.filters}">
                </filter-list>
            </article>`;
  }
};
(Ho.styles = hr`

        article {
            background-color: #e6e4e4;
            border-radius: 8px;
            margin: 15px;
            padding: 30px;
        }

        h3 {
            margin: 0;
        }

        .row {
            align-items: center;
            display: flex;
            justify-content: space-between;
        }

        section > p > span {
            font-weight: bold;
        }

        .tag {
            background-color: springgreen;
            color: white;
            margin: 2px;
            padding: 5px;
            text-decoration: none;
            border-radius: 8px;
        }

        .button-container {
            margin-top: -20px;
        }

        .close-container {
            margin-left: -20px;
        }
    `),
  Mo([so({type: Object})], Ho.prototype, 'data', void 0),
  Mo([so({type: Boolean})], Ho.prototype, 'expand', void 0),
  Mo([so({type: Boolean})], Ho.prototype, 'hide', void 0),
  Mo([so({type: Object})], Ho.prototype, 'showTags', void 0),
  Mo([so({type: Boolean})], Ho.prototype, 'forExport', void 0),
  Mo([so({type: Object})], Ho.prototype, 'selectedStartTime', void 0),
  Mo([so({type: Object})], Ho.prototype, 'selectedEndTime', void 0),
  (Ho = Mo([eo('data-source')], Ho));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xo = 1;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ko = (
  (t) =>
  (...e) => ({_$litDirective$: t, values: e})
)(
  class extends class {
    constructor(t) {}
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t, e, i) {
      (this._$Ct = t), (this._$AM = e), (this._$Ci = i);
    }
    _$AS(t, e) {
      return this.update(t, e);
    }
    update(t, e) {
      return this.render(...e);
    }
  } {
    constructor(t) {
      var e;
      if (
        (super(t),
        t.type !== xo ||
          'style' !== t.name ||
          (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2)
      )
        throw Error(
          'The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.'
        );
    }
    render(t) {
      return Object.keys(t).reduce((e, i) => {
        const s = t[i];
        return null == s
          ? e
          : e +
              `${(i = i
                .replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, '-$&')
                .toLowerCase())}:${s};`;
      }, '');
    }
    update(t, [e]) {
      const {style: i} = t.element;
      if (void 0 === this.ut) {
        this.ut = new Set();
        for (const t in e) this.ut.add(t);
        return this.render(e);
      }
      this.ut.forEach((t) => {
        null == e[t] &&
          (this.ut.delete(t),
          t.includes('-') ? i.removeProperty(t) : (i[t] = ''));
      });
      for (const t in e) {
        const s = e[t];
        null != s &&
          (this.ut.add(t), t.includes('-') ? i.setProperty(t, s) : (i[t] = s));
      }
      return Or;
    }
  }
);
function Co(t) {
  return JSON.parse(JSON.stringify(t));
}
var Vo = function (t, e, i, s) {
  for (
    var n,
      r = arguments.length,
      o =
        r < 3
          ? e
          : null === s
          ? (s = Object.getOwnPropertyDescriptor(e, i))
          : s,
      h = t.length - 1;
    h >= 0;
    h--
  )
    (n = t[h]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o);
  return r > 3 && o && Object.defineProperty(e, i, o), o;
};
const Lo = [
    {
      header: 'Locations',
      filters: [
        {
          label: 'Bay Area',
          tag: 'bay-area',
          checked: !1,
          options: [
            {
              label: 'Cities',
              tag: 'cities',
              checked: !1,
              options: [
                {label: 'Benicia', tag: 'benicia', options: [], checked: !1},
                {label: 'Martinez', tag: 'martinez', options: [], checked: !1},
              ],
            },
            {
              label: 'Refineries',
              tag: 'refineries',
              checked: !1,
              options: [
                {
                  label: 'Valero Benicia',
                  tag: 'valero-benicia',
                  options: [],
                  checked: !1,
                },
                {
                  label: 'Marathon Martinez',
                  tag: 'marathon-martinez',
                  options: [],
                  checked: !1,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      header: 'Chemicals',
      filters: [
        {label: 'Benzene', tag: 'benzene', checked: !1, options: []},
        {label: 'Xylene', tag: 'xylene', checked: !1, options: []},
        {
          label: 'Carbon Monoxide',
          tag: 'carbon-monoxide',
          checked: !1,
          options: [],
        },
      ],
    },
  ],
  So = [
    {
      title: 'The Benzene Report',
      description:
        'Refineries reporting of two-week average benzene levels to the EPA every three months.',
      tags: new Set([
        'benzene',
        'valero',
        'valero-benicia',
        'marathon-martinez',
        'martinez',
        'benicia',
      ]),
      startTime: new Date(0),
      endTime: new Date(0),
      filters: Co(Lo),
    },
    {
      title: 'Valero Benicia',
      description: 'Valero Refinery self reporting, real-time data',
      tags: new Set([
        'benzene',
        'xylene',
        'valero',
        'valero-benicia',
        'benicia',
      ]),
      startTime: new Date(0),
      endTime: new Date(0),
      filters: Co(Lo),
    },
    {
      title: 'Marathon Martinez',
      description: 'Marathon Martinez Refinery self reporting, real-time data',
      tags: new Set([
        'benzene',
        'carbon-monoxide',
        'martinez',
        'marathon-martinez',
      ]),
      startTime: new Date(0),
      endTime: new Date(0),
      filters: Co(Lo),
    },
  ];
let To = class extends Xr {
  constructor() {
    super(...arguments),
      (this.dataSources = So),
      (this.filterTags = new Set()),
      (this.disableTags = new Set()),
      (this.expanded = !1);
  }
  render() {
    return Pr`
            <div class="row">
                <filter-list
                    style="${ko({display: this.expanded ? 'none' : 'block'})}"
                    .filters="${Lo}"
                    .disableTags="${this.disableTags}"
                    @tags-changed="${this.handleTagsChanged}">
                </filter-list>
                <div class="sources">
                    ${this.renderDataSources()}
                </div>
            </div>
        `;
  }
  renderDataSources() {
    return this.dataSources.map(
      (t) => Pr`
            <data-source
                .data="${t}"
                .showTags="${this.filterTags}"
                .hide="${this.expanded}"
                @request-expand="${(t) => {
                  (t.target.expand = !0), (this.expanded = !0);
                }}"
                @request-close="${(t) => {
                  (t.target.expand = !1), (this.expanded = !1);
                }}"
                >
            </data-source>
        `
    );
  }
  handleTagsChanged(t) {
    if (((this.filterTags = t.detail), 0 === this.filterTags.size))
      return void (this.disableTags = new Set());
    const e = new Set(),
      i = new Set();
    for (const t of this.dataSources) {
      let s = !1;
      for (const e of t.tags) this.filterTags.has(e) && (s = !0);
      if (s) for (const i of t.tags) e.add(i);
      else for (const e of t.tags) i.add(e);
    }
    const s = new Set([...i].filter((t) => !e.has(t)));
    this.disableTags = s;
  }
};
(To.styles = hr`
        .row {
            display: flex;
            justify-content: stretch;
        }

        filter-list {
            flex-grow: 1;
        }

        .sources {
            flex-grow: 5;
            overflow: scroll;
            height: calc(100vh - 100px);
        }

        data-source {
            display: block;
            position: relative;
        }
    `),
  Vo([so({type: Array})], To.prototype, 'dataSources', void 0),
  Vo([so({type: Object})], To.prototype, 'filterTags', void 0),
  Vo([so({type: Object})], To.prototype, 'disableTags', void 0),
  Vo([so({type: Boolean})], To.prototype, 'expanded', void 0),
  (To = Vo([eo('data-source-list')], To));
var Ao = function (t, e, i, s) {
  for (
    var n,
      r = arguments.length,
      o =
        r < 3
          ? e
          : null === s
          ? (s = Object.getOwnPropertyDescriptor(e, i))
          : s,
      h = t.length - 1;
    h >= 0;
    h--
  )
    (n = t[h]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o);
  return r > 3 && o && Object.defineProperty(e, i, o), o;
};
let Eo = class extends Xr {
  render() {
    return Pr`
            <app-header-layout>
                <app-header slot="header" reveals effects="waterfall">
                    <app-toolbar>
                        <iron-icon
                            icon="icons:help"
                        ></iron-icon>
                        <div main-title>Project Butterfly</div>
                        <input type="text">
                        <paper-icon-button icon="search"></paper-icon-button>
                        <paper-icon-button
                            icon="icons:file-download"
                        ></paper-icon-button>
                    </app-toolbar>
                </app-header>
                <data-source-list size="100"></data-source-list>
            </app-header-layout>
        `;
  }
};
(Eo.styles = hr`
        app-header {
            background-color: #00897B;
            color: #fff;
        }

        paper-icon-button {
            --paper-icon-button-ink-color: white;
        }
    `),
  (Eo = Ao([eo('butterfly-app')], Eo));
export {Eo as App};
