(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{321:function(r,a,n){"use strict";var e=n(244);function c(r){var a={};for(var n in r){a[0===n.indexOf("--")?n:Object(e.a)(n)]=r[n]}return r.fallbacks&&(Array.isArray(r.fallbacks)?a.fallbacks=r.fallbacks.map(c):a.fallbacks=c(r.fallbacks)),a}a.a=function(){return{onProcessStyle:function(r){if(Array.isArray(r)){for(var a=0;a<r.length;a++)r[a]=c(r[a]);return r}return c(r)},onChangeValue:function(r,a,n){if(0===a.indexOf("--"))return r;var c=Object(e.a)(a);return a===c?r:(n.prop(c,r),null)}}}}}]);