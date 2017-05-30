!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){"use strict";function r(){l&&(l=!1,i.getCalculationStats(s.stats),a.getEconomics(s.stats,s.economics),setTimeout(function(){l=!0},40))}function o(){new Vue({el:"#calc-slider",data:{totalVolume:0,profit:0,minValue:0,maxValue:2e4},watch:{totalVolume:function(){s.stats.volume.total=this.totalVolume,r(),u.updateAll(),"-"!==s.economics.profit?this.profit=Math.round(s.economics.profit):this.profit="-"},deep:!0},mounted:function(){u.init(),this.totalVolume=s.stats.volume.total,this.minValue=s.stats.volume.minValue,this.maxValue=s.stats.volume.maxValue,r(),this.profit=Math.round(s.economics.profit),setTimeout(function(){u.updateAll()},1)}})}var i=n(172),a=n(175),c=n(166),u=n(177),s={stats:{distribution:{tap:0,bottle:.01,keg:0},distributionLock:["tap","bottle"]},economics:{}};c.loadJSON("/data/stats").then(function(t){s.stats=t,o()});var l=!0},166:function(t,e,n){"use strict";function r(t,e){return new Promise(function(n,r){var o=new XMLHttpRequest;try{o=new XMLHttpRequest}catch(t){try{o=new window.ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{o=new window.ActiveXObject("Microsoft.XMLHTTP")}catch(t){r("Unsupported browser")}}}o.onreadystatechange=function(){if(4===o.readyState)if(200===o.status){var e=JSON.parse(o.responseText);n(e)}else r("Resource not found: "+t)};var i=a.stringify(e);e?o.open("GET",t+"?"+i,!0):o.open("GET",t,!0),o.send()})}function o(t,e){return new Promise(function(n,r){var o=new XMLHttpRequest;try{o=new XMLHttpRequest}catch(t){try{o=new window.ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{o=new window.ActiveXObject("Microsoft.XMLHTTP")}catch(t){r("Unsupported browser")}}}o.onreadystatechange=function(){if(4===o.readyState)if(200===o.status){var e=JSON.parse(o.responseText);n(e)}else r("Resource not found: "+t)},o.open("POST",t,!0),o.setRequestHeader("Content-Type","application/json;charset=UTF-8"),o.send(JSON.stringify(e))})}function i(t,e,n,r){o("/data/stats",{total:t,tap:e,keg:n,bottle:r})}var a=n(167);t.exports={loadJSON:r,saveJSON:o,logCalc:i}},167:function(t,e,n){"use strict";e.decode=e.parse=n(168),e.encode=e.stringify=n(169)},168:function(t,e){"use strict";function n(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t,e,r,o){e=e||"&",r=r||"=";var i={};if("string"!=typeof t||0===t.length)return i;t=t.split(e);var a=1e3;o&&"number"==typeof o.maxKeys&&(a=o.maxKeys);var c=t.length;a>0&&c>a&&(c=a);for(var u=0;u<c;++u){var s,l,f,p,d=t[u].replace(/\+/g,"%20"),m=d.indexOf(r);m>=0?(s=d.substr(0,m),l=d.substr(m+1)):(s=d,l=""),f=decodeURIComponent(s),p=decodeURIComponent(l),n(i,f)?Array.isArray(i[f])?i[f].push(p):i[f]=[i[f],p]:i[f]=p}return i}},169:function(t,e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(t){switch(void 0===t?"undefined":n(t)){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,o,i){return e=e||"&",o=o||"=",null===t&&(t=void 0),"object"===(void 0===t?"undefined":n(t))?Object.keys(t).map(function(n){var i=encodeURIComponent(r(n))+o;return Array.isArray(t[n])?t[n].map(function(t){return i+encodeURIComponent(r(t))}).join(e):i+encodeURIComponent(r(t[n]))}).join(e):i?encodeURIComponent(r(i))+o+encodeURIComponent(r(t)):""}},172:function(t,e,n){"use strict";function r(t){var e=t.volume,n=t.distribution;return e.total&&n&&(e.tap=e.total*n.tap,e.keg=e.total*n.keg,e.bottle=e.total*n.bottle),t}function o(t){var e=t.beerType.current.fermentingTime/t.containers.fermentingTime;return e/=t.containers.productionYield,t.volume.relative=t.volume.total*e,t}function i(t){return t.beerType.current||(t.beerType.current=c.getDefaultBeerType(t)),t.beerType.current.cost=c.getProductionCost(t),r(t),o(t),t.containers.current=a.getConfiguration(t),t.electricityProduction=a.getEnergyProduction(t),t.waterProduction=a.getWaterCleaningCapacity(t),t.distributionLock=["tap","bottle"],t}var a=n(173),c=n(174);t.exports={getCalculationStats:i}},173:function(t,e){"use strict";function n(t){var e=t.containers.production,n=t.volume.relative,r=void 0;return e.forEach(function(t){r?r.brewingCapacity<n&&(r=t,r.usage=n/t.brewingCapacity):(r=t,r.usage=n/t.brewingCapacity)}),r}function r(t,e){var n=t.containers.fermenting,r=e.fermentingCapacity,o=t.volume.relative,i=o-r,a=e.series,c=n.filter(function(t){return t.series===a}),u=[];return c.forEach(function(t,e){i>0&&(i-=t.fermentingCapacity,i<0?t.usage=i/t.fermentingCapacity+1:e===c.length-1?t.usage=(i+t.fermentingCapacity)/t.fermentingCapacity:t.usage=1,u.push(t))}),u}function o(t){var e=t.containers.addon,n=[];return e.forEach(function(e){e.choosen&&n.push(e);var r=parseInt(t.volume.total,10),o=parseInt(t.containers.threshold.kegStorage,10),i=parseInt(t.containers.threshold.bottleMachine,10);-1!==e.comment.toLowerCase().indexOf("bott")?e.recommended=r>i:-1!==e.comment.toLowerCase().indexOf("keg")&&(e.recommended=r>o)}),n}function i(t){var e=t.containers.current.all,n=0;return e.forEach(function(t){n+=t.waterProduction}),n}function a(t){var e=t.containers.current.all,n=0;return e.forEach(function(t){n+=t.electricityProduction}),n}function c(t){var e=[n(t)],i=r(t,e[0]),a=o(t);return{production:e,fermenting:i,addons:a,all:e.concat(i).concat(a)}}function u(t){var e=t.containers.current.all,n=0;return e.forEach(function(t){n+=t.price}),n}t.exports={getConfiguration:c,getWaterCleaningCapacity:i,getEnergyProduction:a,getCost:u}},174:function(t,e){"use strict";function n(t){var e=t.ingredientsCosts,n=t.beerType;if(e&&n.current){var r={hops:e.hops*n.current.ingredient.hops,malt:e.malt*n.current.ingredient.malt,co2:e.co2*n.current.ingredient.co2};return r.total=r.hops+r.malt+r.co2,r}return{}}function r(t){return t.beerType.options[0]}t.exports={getProductionCost:n,getDefaultBeerType:r}},175:function(t,e,n){"use strict";function r(t,e){var n=t.productionCost,r=t.volume,o=t.beerType;e.variableCosts||(e.variableCosts={});var i=e.variableCosts;return r&&o.current.cost&&r.total&&n&&(o.current.cost&&r.total?i.ingredients=o.current.cost.total*r.total:i.ingredients=0,n&&r?(i.kegPrice=n.keg*r.keg,i.tapPrice=n.tap*r.tap,i.bottlePrice=n.bottle*r.bottle):(i.kegPrice=0,i.tapPrice=0,i.bottlePrice=0),i.total=i.kegPrice+i.tapPrice+i.bottlePrice+i.ingredients),e}function o(t,e){e.fixedCosts||(e.fixedCosts={});var n=e.fixedCosts;return t.containers.current&&(n.rent=c.getCost(t),n.total=n.rent),e}function i(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.7,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.82;e.incomes||(e.incomes={});var o=t.sellingPrice,i=t.volume,a=t.distribution,c=e.incomes;return o&&i&&(c.kegPrice=o.keg*i.keg*n*r,c.tapPrice=o.tap*i.tap*n*r,c.bottlePrice=o.bottle*i.bottle*n*r,c.waterPrice=o.water*a.water*n*r,c.total=c.kegPrice+c.tapPrice+c.bottlePrice+c.waterPrice),e}function a(t,e){i(t,e),o(t,e),r(t,e),e.profit=e.incomes.total-e.fixedCosts.total-e.variableCosts.total;var n=!0;return t.containers.current.all.forEach(function(t){t.usage>1&&(n=!1)}),n||(e.fixedCosts.rent="-",e.fixedCosts.total="-",e.profit="-"),e}var c=n(173);t.exports={getEconomics:a}},177:function(t,e){"use strict";function n(t){var e=t.value,n=t.attributes.min.value,r=t.attributes.max.value,o=t.offsetWidth,i=parseInt(t.dataset.thumbwidth,10);return(e-n)/(r-n)*(o-i)+i/2}function r(){var t=n(this);this.nextSibling.style.left=t+"px"}function o(){var t=document.querySelectorAll('input[type="range"].slider');setTimeout(function(){return t.forEach(function(t){return r.call(t)})},1)}function i(){var t=document.querySelectorAll('input[type="range"].slider');t.forEach(function(t){return t.addEventListener("change",r)}),t.forEach(function(t){return t.addEventListener("input",r)}),t.forEach(function(t){return r.call(t)})}t.exports={init:i,updateAll:o}}});