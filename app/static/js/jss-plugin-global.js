(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{318:function(t,e,s){"use strict";var n=s(1),r=s(46),i="@global",o=function(){function t(t,e,s){for(var o in this.type="global",this.at=i,this.rules=void 0,this.options=void 0,this.key=void 0,this.isProcessed=!1,this.key=t,this.options=s,this.rules=new r.a(Object(n.a)({},s,{parent:this})),e)this.rules.add(o,e[o]);this.rules.process()}var e=t.prototype;return e.getRule=function(t){return this.rules.get(t)},e.addRule=function(t,e,s){var n=this.rules.add(t,e,s);return this.options.jss.plugins.onProcessRule(n),n},e.indexOf=function(t){return this.rules.indexOf(t)},e.toString=function(){return this.rules.toString()},t}(),l=function(){function t(t,e,s){this.type="global",this.at=i,this.options=void 0,this.rule=void 0,this.isProcessed=!1,this.key=void 0,this.key=t,this.options=s;var r=t.substr("@global ".length);this.rule=s.jss.createRule(r,e,Object(n.a)({},s,{parent:this}))}return t.prototype.toString=function(t){return this.rule?this.rule.toString(t):""},t}(),u=/\s*,\s*/g;function a(t,e){for(var s=t.split(u),n="",r=0;r<s.length;r++)n+=e+" "+s[r].trim(),s[r+1]&&(n+=", ");return n}e.a=function(){return{onCreateRule:function(t,e,s){if(!t)return null;if(t===i)return new o(t,e,s);if("@"===t[0]&&"@global "===t.substr(0,"@global ".length))return new l(t,e,s);var n=s.parent;return n&&("global"===n.type||n.options.parent&&"global"===n.options.parent.type)&&(s.scoped=!1),!1===s.scoped&&(s.selector=t),null},onProcessRule:function(t){"style"===t.type&&(function(t){var e=t.options,s=t.style,r=s?s[i]:null;if(r){for(var o in r)e.sheet.addRule(o,r[o],Object(n.a)({},e,{selector:a(o,t.selector)}));delete s[i]}}(t),function(t){var e=t.options,s=t.style;for(var r in s)if("@"===r[0]&&r.substr(0,i.length)===i){var o=a(r.substr(i.length),t.selector);e.sheet.addRule(o,s[r],Object(n.a)({},e,{selector:o})),delete s[r]}}(t))}}}}}]);