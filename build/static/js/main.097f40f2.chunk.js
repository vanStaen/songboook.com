(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{116:function(e,t,n){},117:function(e,t,n){},148:function(e,t,n){},176:function(e,t,n){},177:function(e,t,n){},178:function(e,t,n){},180:function(e,t,n){},181:function(e,t,n){},182:function(e,t,n){},183:function(e,t,n){},184:function(e,t,n){},185:function(e,t,n){},186:function(e,t,n){},187:function(e,t,n){},188:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n(0),c=n.n(s),i=n(29),r=n.n(i),o=(n(116),n(6)),l=(n(117),n(9)),u=n.n(l),j=n(19),b=n(85),g=n(86),d=n(110),p=n(105),h=n(203),m=n(87),O=n(194),f=n(191),A=n(200),x=n(201),v=n(106),k=n(192),w=n(195),N=n(20),y=n.n(N),C=n(197),S=(n(148),function(e){var t=Object(s.useState)(e.tags),n=Object(o.a)(t,2),c=n[0],i=n[1],r=Object(s.useState)(-1),l=Object(o.a)(r,2),b=l[0],g=l[1],d=Object(s.useState)(""),p=Object(o.a)(d,2),h=p[0],m=p[1],O=Object(s.useState)(!1),f=Object(o.a)(O,2),A=f[0],x=f[1],N=Object(s.useState)(""),S=Object(o.a)(N,2),B=S[0],P=S[1],E=function(t){function n(){return(n=Object(j.a)(u.a.mark((function t(n){var a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y()({url:"https://songbook-cvs.herokuapp.com/songbook/"+e.id,method:"PATCH",data:{tags:n}});case 2:if(!(200!==(a=t.sent).status&201!==a.status)){t.next=5;break}throw new Error("Error!");case 5:return t.next=7,a.data;case 7:return s=t.sent,t.abrupt("return",s);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}(function(e){return n.apply(this,arguments)})(t).then((function(e){})).catch((function(e){console.log("error",e.message)}))},T=function(t){c[b]=h.toLowerCase(),i(c),E(c),g(-1),m(""),P(""),x(!1),e.setTagsMissing(!1)},L=function(e){g(-1),m(""),P(""),x(!1)},D=function(e){m(e.target.value),P(""),x(!1)},G=c?c.map((function(e,t){var n=e.length>30;return b===t?Object(a.jsx)(k.a,{size:"small",className:"tag-input",value:h,onChange:D,onBlur:L,onPressEnter:T},t):Object(a.jsx)(w.a,{className:"edit-tag",closable:!0,onClose:function(){return function(e){var t=c;t.splice(e,1),i(t)}(t)},children:Object(a.jsx)("span",{onDoubleClick:function(n){g(t),m(e),n.preventDefault()},children:n?"".concat(e.slice(0,30),"..."):e})},t)})):[];return Object(a.jsxs)("div",{className:"tags",children:[G,A&&Object(a.jsx)(k.a,{type:"text",size:"small",className:"tag-input",value:B,onChange:function(e){P(e.target.value)},onBlur:function(){P(""),x(!1),g(-1),m("")},onPressEnter:function(t){var n=t.target.value.toLowerCase();if(void 0===c||null===c){var a=[n];E(a),i(a)}else if(n&&-1===c.indexOf(n)){var s=[].concat(Object(v.a)(c),[n]);E(s),i(s)}P(""),x(!1),g(-1),m(""),e.setTagsMissing(!1)}}),!A&&Object(a.jsxs)(w.a,{className:"site-tag-plus",onClick:function(){x(!0),g(-1),m("")},children:[Object(a.jsx)(C.a,{})," Add Tag"]})]})}),B=n(69),P=n.n(B),E=function(e){var t=Object(s.useState)("Loading ..."),n=Object(o.a)(t,2),c=n[0],i=n[1],r="https://orion.apiseeds.com/api/music/lyric/"+e.artist.replace(/ /g,"%20")+"/"+e.song.replace(/ /g,"%20")+"?apikey=DoQSFaMhpnnHth7pgqmXYJjkNtV1Fn1VGZAjGwpKvaCGiKdIQk1LS1OeCApW8RN9";return"Loading ..."===c&&function(){function t(){return(t=Object(j.a)(u.a.mark((function e(){var t,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y()({url:r,method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=5;break}throw new Error("Error!");case 5:return e.next=7,t.data;case 7:return n=e.sent,a=n.result,e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(function(){return t.apply(this,arguments)})().then((function(t){var n=e.artist.toLowerCase().replace(/ /g,""),a=t.artist.name.toLowerCase().replace(/ /g,"");P()(n,a)<5||t.similarity>.9?i(t.track.text):(console.log("levenshtein:",n,a,P()(n,a)),console.log("similarity:",t.similarity),i("No lyrics found."))})).catch((function(e){i("No lyrics found."),console.log(e.message)}))}(),Object(a.jsx)("div",{style:{whiteSpace:"pre-line"},children:c})},T=n(198),L=n(199),D=(n(176),function(e){var t=Object(s.useState)(e.tabs),n=Object(o.a)(t,2),c=n[0],i=n[1],r=Object(s.useState)(e.video),l=Object(o.a)(r,2),b=l[0],g=l[1],d=Object(s.useState)(e.pic),p=Object(o.a)(d,2),h=p[0],m=p[1],O=Object(s.useState)(!1),f=Object(o.a)(O,2),A=f[0],x=f[1],v=Object(s.useState)(!1),N=Object(o.a)(v,2),C=N[0],S=N[1],B=Object(s.useState)(!1),P=Object(o.a)(B,2),E=P[0],D=P[1],G=Object(s.useState)(""),I=Object(o.a)(G,2),M=I[0],Q=I[1],_=e.isDrawerFold?165:400,F=e.isDrawerFold?230:480,V=function(t){function n(){return(n=Object(j.a)(u.a.mark((function t(n){var a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y()({url:"https://songbook-cvs.herokuapp.com/songbook/"+e.id,method:"PATCH",data:n});case 2:if(!(200!==(a=t.sent).status&201!==a.status)){t.next=5;break}throw new Error("Error!");case 5:return t.next=7,a.data;case 7:return s=t.sent,t.abrupt("return",s);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}(function(e){return n.apply(this,arguments)})(t).then((function(e){})).catch((function(e){console.log("error",e.message)}))},z=function(e){Q(e.target.value)},Y=function(){A&&x(!1),C&&S(!1),E&&D(!1),Q("")},X=function(){A?(M.length>0?(V({link:M}),e.setTabsMissing(!1)):(V({link:"null"}),e.setTabsMissing(!0)),i(M),x(!1)):C?(M.length>0?(V({videourl:M}),e.setVideoMissing(!1)):(V({videourl:"null"}),e.setVideoMissing(!0)),g(M),S(!1)):E&&(M.length>0?(V({picurl:M}),e.setPicMissing(!1)):(V({picurl:"null"}),e.setPicMissing(!0)),m(M),D(!1)),Q("")},Z=function(e,t){var n,a,s=!1,c=function(e){var t=document.createElement("canvas").getContext("2d");return t.font="12px sans-serif",t.measureText(e).width};for(n=e.length;c(e.slice(0,n))>t;n--)a=n,s=!0;return s?"".concat(e.slice(0,a),"..."):e};return Object(a.jsxs)("div",{className:"links",children:[Object(a.jsxs)("div",{children:["\xa0\xa0Tabs:",A?Object(a.jsx)(k.a,{size:"small",style:{width:F},className:"tag-input",value:M,onChange:z,onBlur:Y,onPressEnter:X},"link_input_".concat(e.id)):Object(a.jsx)("a",{href:c,target:"_Blank",rel:"noreferrer",children:Object(a.jsxs)(w.a,{className:"links__tag",children:[Object(a.jsx)(T.a,{}),"\xa0\xa0",Z(c,_),Object(a.jsx)(L.a,{onClick:function(e){Q(c),x(!0),e.preventDefault()}})]},"tabs")})]}),Object(a.jsxs)("div",{children:["Video:",C?Object(a.jsx)(k.a,{size:"small",style:{width:F},className:"tag-input",value:M,onChange:z,onBlur:Y,onPressEnter:X},"link_input_".concat(e.id)):Object(a.jsx)("a",{href:b,target:"_Blank",rel:"noreferrer",children:Object(a.jsxs)(w.a,{className:"links__tag",children:[Object(a.jsx)(T.a,{}),"\xa0\xa0",Z(b,_),Object(a.jsx)(L.a,{onClick:function(e){Q(b),S(!0),e.preventDefault()}})]},"video")})]}),Object(a.jsxs)("div",{children:["\xa0\xa0\xa0\xa0Pic:",E?Object(a.jsx)(k.a,{size:"small",style:{width:F},className:"tag-input",value:M,onChange:z,onBlur:Y,onPressEnter:X},"link_input_".concat(e.id)):Object(a.jsxs)(w.a,{className:"links__tag",onDoubleClick:function(e){Q(h),D(!0),e.preventDefault()},children:[Object(a.jsx)(T.a,{}),"\xa0\xa0",Z(h,_),Object(a.jsx)(L.a,{onClick:function(e){Q(h),D(!0),e.preventDefault()}})]},"pic")]})]})}),G=n(193),I=(n(177),function(e){var t=Object(s.useState)(e.bass?"b":e.piano?"p":"g"),n=Object(o.a)(t,2),c=n[0],i=n[1],r=Object(s.useState)(e.artist),l=Object(o.a)(r,2),b=l[0],g=l[1],d=Object(s.useState)(e.song),p=Object(o.a)(d,2),h=p[0],m=p[1],O=Object(s.useState)(!1),f=Object(o.a)(O,2),A=f[0],x=f[1],v=Object(s.useState)(!1),N=Object(o.a)(v,2),C=N[0],S=N[1],B=Object(s.useState)(""),P=Object(o.a)(B,2),E=P[0],T=P[1],D=e.isDrawerFold?165:400,I=function(t){function n(){return(n=Object(j.a)(u.a.mark((function t(n){var a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y()({url:"https://songbook-cvs.herokuapp.com/songbook/"+e.id,method:"PATCH",data:n});case 2:if(!(200!==(a=t.sent).status&201!==a.status)){t.next=5;break}throw new Error("Error!");case 5:return t.next=7,a.data;case 7:return s=t.sent,t.abrupt("return",s);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}(function(e){return n.apply(this,arguments)})(t).then((function(e){console.log("Success",e)})).catch((function(e){console.log("error",e.message)}))},M=function(e){T(e.target.value)},Q=function(){A&&x(!1),C&&S(!1),T("")},_=function(){A?(E.length>0?I({artist:E}):I({artist:"null"}),g(E),e.setArtist(E),x(!1)):C&&(E.length>0?I({song:E}):I({song:"null"}),m(E),e.setSong(E),S(!1)),T("")},F=function(e,t){var n,a,s=!1,c=function(e){var t=document.createElement("canvas").getContext("2d");return t.font="12px sans-serif",t.measureText(e).width};for(n=e.length;c(e.slice(0,n))>t;n--)a=n,s=!0;return s?"".concat(e.slice(0,a),"..."):e};return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:"Extras__radioType",children:Object(a.jsxs)(G.a.Group,{onChange:function(t){switch(t.target.value){case"g":e.setIsBass(!1),e.setIsPiano(!1),I({bass:!1,piano:!1});break;case"b":e.setIsBass(!0),e.setIsPiano(!1),I({bass:!0,piano:!1});break;case"p":e.setIsBass(!1),e.setIsPiano(!0),I({bass:!1,piano:!0})}i(t.target.value)},value:c,children:[Object(a.jsx)(G.a,{value:"g",children:"Guitar"}),Object(a.jsx)(G.a,{value:"b",children:"Bass"}),Object(a.jsx)(G.a,{value:"p",children:"Piano"})]})}),Object(a.jsx)("div",{className:"Extra__spacer"}),Object(a.jsxs)("div",{className:"Extras__artist",children:["\xa0\xa0Artist:",A?Object(a.jsx)(k.a,{size:"small",className:"Extras__input",value:E,onChange:M,onBlur:Q,onPressEnter:_},"link_input_".concat(e.id)):Object(a.jsxs)(w.a,{children:[F(b,D),"\xa0\xa0",Object(a.jsx)(L.a,{onClick:function(e){T(b),x(!0),S(!1),e.preventDefault()}})]},"Artist")]}),Object(a.jsxs)("div",{className:"Extras__song",children:["\xa0\xa0\xa0Song:",C?Object(a.jsx)(k.a,{size:"small",className:"Extras__input",value:E,onChange:M,onBlur:Q,onPressEnter:_},"link_input_".concat(e.id)):Object(a.jsxs)(w.a,{children:[F(h,D),"\xa0\xa0",Object(a.jsx)(L.a,{onClick:function(e){T(h),S(!0),x(!1),e.preventDefault()}})]},"Song")]})]})}),M=function(e){var t=Object(s.useState)(350),n=Object(o.a)(t,2),c=n[0],i=n[1],r=Object(s.useState)(!0),l=Object(o.a)(r,2),u=l[0],j=l[1],b=Object(s.useState)(e.page.artist),g=Object(o.a)(b,2),d=g[0],p=g[1],h=Object(s.useState)(e.page.song),v=Object(o.a)(h,2),k=v[0],w=v[1],N=e.page.videourl?e.page.videourl.split("=")[1]:"",y={height:u?227:310,width:u?300:550,playerVars:{autoplay:0}};Object(s.useEffect)((function(){C(u)}),[u]);var C=function(e){i(e?350:600),j(e)};return Object(a.jsxs)(O.a,{title:Object(a.jsxs)("div",{children:[u?Object(a.jsx)(A.a,{onClick:function(){return C(!1)}}):Object(a.jsx)(x.a,{onClick:function(){return C(!0)}}),"\xa0\xa0",u?k.toUpperCase():d.toUpperCase()+" - "+k.toUpperCase()]}),placement:"right",closable:!0,onClose:function(){j(!0),e.setDrawerVisible(!1)},visible:e.drawerVisible,width:c,children:[e.page.videourl?Object(a.jsx)(m.a,{videoId:N,opts:y}):Object(a.jsx)("img",{src:e.page.picurl,className:"Page-drawer__artwork",alt:"pic_missing"}),Object(a.jsx)(f.a,{orientation:"left",plain:!0,children:Object(a.jsx)("span",{className:"Page-drawer__diviser",children:"Links"})}),Object(a.jsx)(D,{tabs:e.page.link,video:e.page.videourl,pic:e.page.picurl,id:e.page.id,setTabsMissing:e.setTabsMissing,setVideoMissing:e.setVideoMissing,setPicMissing:e.setPicMissing,isDrawerFold:u}),Object(a.jsx)(f.a,{orientation:"left",plain:!0,children:Object(a.jsx)("span",{className:"Page-drawer__diviser",children:"Tags"})}),Object(a.jsx)(S,{tags:e.page.tags,id:e.page.id,setTagsMissing:e.setTagsMissing}),Object(a.jsx)(f.a,{orientation:"left",plain:!0,children:Object(a.jsx)("span",{className:"Page-drawer__diviser",children:"Extras"})}),Object(a.jsx)(I,{artist:e.page.artist,song:e.page.song,piano:e.page.piano,bass:e.page.bass,setArtist:p,setSong:w,isDrawerFold:u,id:e.page.id,setIsPiano:e.setIsPiano,setIsBass:e.setIsBass}),Object(a.jsx)(f.a,{orientation:"left",plain:!0,children:Object(a.jsx)("span",{className:"Page-drawer__diviser",children:"Lyrics"})}),Object(a.jsx)(E,{artist:e.page.artist,song:e.page.song})]})},Q="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACwklEQVRoge1Yy47aMBQ9thM2hVlTiSXsqFCnoxZWsIAvGPUDRl2OxKj9oOkPVLMHNkFQIbWqKiQ+AXXYkxXCdTfjNBC/SGCmjxzJIvjca9+Tex07AXLkyJHjr4Pv+5993xd7bXIs/hAQE9ntdl8QQj4CeAmAyv4gCJT2nU4HQgiMx2Ml3263QQgx+sfAAXwnhFwNh8OFLkbPJIAQcgvglYqrVCo7/5fLJTjnEEIYeUKIlt8DA3AhhLgF8DqVAADnAPD28hLPy+WoMwgCMMYSxu/7fQDAdDpV8h9ubgAAk8lEyfevr6PrH/f3+HR3F8WQVgAFgGq1miQoTfQ9KxaPxtdqNXmZVBqDTQAAoHR2luhTBRC3y8q7IrUAVQnE7bLyrnASoLpbtr6svCv+XwGqEojbZeVd8e9nQAjhfLfidll5Obfc+HRwEvBUGTipgMdYA/JYYoJRgBDiyTNgE/HHl5ANqTPwWCWUOQOqgQFgu92iUCgAADabTcIuK++K1AJms5nRLivvCicPSulOazabCZtWq3U0XjYX2N7IQAhJ1OtgMAAANBoNcM6xWCyUfPnhJWi1Win5er0Oxhjm87lx/tQCbINITsd7nhfZpfG3BQ84ZkAHSqnxKaF60uz7m0rl5BmQAtJmQAo4WQZsg9gyIAWY/G0ZsCGzABNsJcQYO70A00AywCwlxBhzClQHJwE62Ca3lZDneak2r50xXIxMGTAtcluGZAmdPAO6uyQF6HiZAZP/Ibuucg4XI1OAnPNMAmwL2QYnAbqtXmZAx0sBJp5SquVdYBPwEwD1fR/F2HdLAAjDMBKg4tfrdSTA8zyUSiWlP6VU6R+GobzkpgCNq6fX630FcGGyAX6/eOy3nYli5x7bGWgPX0aj0RsdaTsLXT18nz+H4StxPBgZuEpA/NcBHMA3Qsg7V4ccOXLkyHEwfgGWMvrsH43YhwAAAABJRU5ErkJggg==",_=n(196),F=(n(178),function(e){var t=e.isPiano;return Object(a.jsx)("div",{className:"piano",id:"piano",children:t&&Object(a.jsx)(_.a,{placement:"bottomRight",title:"Play this on keys!",children:Object(a.jsx)("img",{className:"piano__img",src:Q,alt:Q})})})}),V="data:image/png;base64,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",z=(n(180),function(e){var t=e.isBass;return Object(a.jsx)("div",{className:"bass",id:"piano",children:t&&Object(a.jsx)(_.a,{placement:"bottomRight",title:"Play this on bass!",children:Object(a.jsx)("img",{className:"bass__img",src:V,alt:V})})})}),Y=n(202),X=(n(181),function(e){var t=Object(s.useState)(e.checked),n=Object(o.a)(t,2),c=n[0],i=n[1],r=(e.isVisitor,function(t){!function(t){function n(){return(n=Object(j.a)(u.a.mark((function t(n){var a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y()({url:"https://songbook-cvs.herokuapp.com/songbook/"+e.id,method:"PATCH",data:{checked:n}});case 2:if(!(200!==(a=t.sent).status&201!==a.status)){t.next=5;break}throw new Error("Error!");case 5:return t.next=7,a.data;case 7:return s=t.sent,t.abrupt("return",s);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}(function(e){return n.apply(this,arguments)})(t).then((function(e){})).catch((function(e){console.log("error",e.message)}))}(t),i(t)});return Object(a.jsx)("div",{className:"CheckAdd",id:"checkAdd",children:c?Object(a.jsx)(_.a,{placement:"top",title:"Click to mark this song as unknown.",children:Object(a.jsx)(Y.a,{onClick:function(){return r(!1)},className:"CheckAdd__ico clickable"})}):Object(a.jsx)(_.a,{placement:"top",title:"Click to mark this song as known.",children:Object(a.jsx)(Y.a,{onClick:function(){return r(!0)},className:"CheckAdd__ico clickable grey_check"})})})}),Z="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABhklEQVRoge3ZsUsCYRjH8d/jhaQmlkuLf0FBU3SGBGpDm1vQ1NAQNNQU1ChNQZAEDTU1NLW3ieFwELa1tNRYQwRJ2ImEd09Di0SJD93xGjyf8e7e532/cDcdoJT610i6oJ23M2xxhYElAMmAztEipmrXwm6q2riXLBQFtPN2xrf4FkBadLzBvUbYmolfXT8NuiAimc4WVxDe4QEg7cM7lCyQBXy9NuEi2R6iAAT3zveTkjwsDRg6GmCaBpimAaZpgGkaYJoGmKYBpmmAaRpgmgaYpgGmaYBpGmBaWAEM4NInWiCfZkE4B+CFsdFIwPM+QLhgpv1krXHXc331LT+/Z1n+JsDrAEaD2lD0g+N9cY5/udUC6Czi4SBebzz2n2FPMvEGAVtgTPz0zFjtZuBz/TXgmQknXid6NO44Tcmsl1wuGRvtrgG8DSDTey/0ACI8MNNxwoudUr3ekcz4jpeno24zsQLGDoApQBYg4hZtxy1kS1wO/uPnMiJuIVtyi7YT9Gyl1BD7BGkmaI4lwsjMAAAAAElFTkSuQmCC",W=(n(182),function(e){var t=function(t){e.setIsBookmarked(t),function(t){function n(){return(n=Object(j.a)(u.a.mark((function t(n){var a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y()({url:"https://songbook-cvs.herokuapp.com/songbook/"+e.id,method:"PATCH",data:{bookmark:n}});case 2:if(!(200!==(a=t.sent).status&201!==a.status)){t.next=5;break}throw new Error("Error!");case 5:return t.next=7,a.data;case 7:return s=t.sent,t.abrupt("return",s);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}(function(e){return n.apply(this,arguments)})(t).then((function(e){var t=e;console.log("Sucess",t)})).catch((function(e){console.log("error",e.message)}))}(t)},n=e.isBookmarked;return Object(a.jsx)("div",{className:"bookmark",id:"bookmark",children:n?Object(a.jsx)(_.a,{placement:"right",title:"Delete the bookmark.",children:Object(a.jsx)("img",{onClick:function(){return t(!1)},className:"bookmark__img clickable",src:Z,alt:Z})}):Object(a.jsx)(_.a,{placement:"right",title:"Bookmark this.",children:Object(a.jsx)("img",{onClick:function(){return t(!0)},className:"bookmark__img clickable bookmark__grey",src:Z,alt:Z})})})}),R=(n(183),function(e){var t=Object(s.useState)(e.title.replace(/ /g,"").length>23?"".concat(e.title.replace("-","/").replace(/ /g,"").slice(0,23),"..."):e.title.replace("-","/").replace(/ /g,"")),n=Object(o.a)(t,2),c=n[0],i=n[1],r=Object(s.useState)(!1),l=Object(o.a)(r,2),b=l[0],g=l[1],d=Object(s.useState)(e.title.replace("-","/")),p=Object(o.a)(d,2),h=p[0],m=p[1];return Object(a.jsx)(a.Fragment,{children:b?Object(a.jsx)(k.a,{size:"small",className:"title__input",value:h,onChange:function(e){m(e.target.value)},onBlur:function(){g(!1),m(e.title.replace("-","/")),console.log("cancel")},onPressEnter:function(){!function(t){function n(){return(n=Object(j.a)(u.a.mark((function t(n){var a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y()({url:"https://songbook-cvs.herokuapp.com/songbook/"+e.id,method:"PATCH",data:{title:n}});case 2:if(!(200!==(a=t.sent).status&201!==a.status)){t.next=5;break}throw new Error("Error!");case 5:return t.next=7,a.data;case 7:return s=t.sent,t.abrupt("return",s);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}(function(e){return n.apply(this,arguments)})(t).then((function(e){console.log("Sucess",e)})).catch((function(e){console.log("error",e.message)}))}(h.replace("/","-")),i(h.replace(/ /g,"").length>23?"".concat(h.replace("-","/").replace(/ /g,"").slice(0,23),"..."):h.replace("-","/").replace(/ /g,"")),g(!1)}},"title_input_".concat(e.id)):Object(a.jsx)("div",{className:"Page__title",onDoubleClick:function(){return g(!0)},children:c})})}),U=(n.p,n(184),function(e){var t=Object(s.useState)(e.page.bookmark),n=Object(o.a)(t,2),c=n[0],i=n[1],r=Object(s.useState)(e.page.piano),l=Object(o.a)(r,2),u=l[0],j=l[1],b=Object(s.useState)(e.page.bass),g=Object(o.a)(b,2),d=g[0],p=g[1],h=Object(s.useState)(!1),m=Object(o.a)(h,2),O=m[0],f=m[1],A=Object(s.useState)("null"===e.page.link),x=Object(o.a)(A,2),v=x[0],k=x[1],w=Object(s.useState)(null===e.page.tags),N=Object(o.a)(w,2),y=N[0],C=N[1],S=Object(s.useState)("null"===e.page.videourl),B=Object(o.a)(S,2),P=B[0],E=B[1],T=Object(s.useState)("null"===e.page.picurl),L=Object(o.a)(T,2),D=L[0],G=L[1],I=Object(s.useState)(!!(v||y||P||D)),Q=Object(o.a)(I,2),_=Q[0],V=Q[1];Object(s.useEffect)((function(){V(!!(v||y||P||D))}),[v,y,P,D]);var Y=function(){f(!0)};return Object(a.jsxs)("div",{className:"Page__main",children:[_&&Object(a.jsxs)("div",{className:"Page__notab",onClick:Y,children:[Object(a.jsx)("div",{className:"Page__notab-text",children:function(){var e=[];if(_)return!0===v&&e.push("TABS MISSING"),!0===y&&e.push("HASHTAGS MISSING"),!0===P&&e.push("VIDEO MISSING"),!0===D&&e.push("PICTURE MISSING"),e.map((function(e,t){return Object(a.jsxs)("div",{children:[e," ",Object(a.jsx)("br",{})]},t)}))}()}),Object(a.jsx)("div",{className:"Page__notab Page__notab-background"})]}),Object(a.jsx)("div",{className:"Page__opendrawer",onClick:Y,children:Object(a.jsx)("img",{src:e.page.picurl,alt:"pic_missing",className:"Page__artwork"})}),Object(a.jsx)(W,{id:e.page.id,setIsBookmarked:i,isBookmarked:c}),Object(a.jsxs)("div",{className:"Page__icons",children:[Object(a.jsx)(F,{isPiano:u}),Object(a.jsx)(z,{isBass:d})]}),Object(a.jsx)("div",{className:"Page__actionicon",children:Object(a.jsx)(X,{isVisitor:!1,checked:e.page.checked,id:e.page.id})}),Object(a.jsx)(R,{title:e.page.title,id:e.page.id}),Object(a.jsx)(M,{page:e.page,setDrawerVisible:f,drawerVisible:O,setTabsMissing:k,setTagsMissing:C,setVideoMissing:E,setPicMissing:G,setIsPiano:j,setIsBass:p})]},e.page.id)}),J=(n(185),function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(b.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={songbookPages:[],isLoading:!0,isError:!1},e}return Object(g.a)(n,[{key:"componentDidMount",value:function(){this.loadPages()}},{key:"loadPages",value:function(){var e=this;function t(){return(t=Object(j.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y()({url:"https://songbook-cvs.herokuapp.com/songbook",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=5;break}throw new Error("Error!");case 5:return e.next=7,t.data;case 7:return n=e.sent,e.abrupt("return",n);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(function(){return t.apply(this,arguments)})().then((function(t){var n=t;e.setState({songbookPages:n}),e.setState({isLoading:!1})})).catch((function(t){e.setState({isError:!0,isLoading:!1}),console.log(t.message)}))}},{key:"render",value:function(){var e=this,t=this.state.songbookPages.map((function(t){var n=!0;return t.bass&&(n=!e.props.filterBass),t.piano&&(n=!e.props.filterPiano),t.bass||t.piano||(n=!e.props.filterGuitar),!t.bookmark&&e.props.onlyBookmarked&&(n=!1),1===e.props.onlyFlagKnown?t.checked&&(n=!1):2===e.props.onlyFlagKnown&&(t.checked||(n=!1)),n?Object(a.jsx)("div",{children:Object(a.jsx)(U,{page:t})},t.id):null}));return Object(a.jsx)("div",{style:{width:"100%"},children:this.state.isLoading?Object(a.jsx)("div",{className:"Book__spinner",children:Object(a.jsxs)("div",{children:[Object(a.jsx)("img",{src:"https://avatars0.githubusercontent.com/u/12551446",className:"loader",alt:"Loading"}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{style:{fontSize:18,marginTop:10,color:"white"},children:"Loading ... "})]})}):this.state.isError?Object(a.jsx)("div",{className:"Book__spinner",children:Object(a.jsxs)("div",{children:[Object(a.jsx)(h.a,{className:"error__icon"}),Object(a.jsx)("img",{src:"https://avatars0.githubusercontent.com/u/12551446",className:"error",alt:"Error"}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{style:{fontSize:18,marginTop:10,color:"white"},children:"Error connecting to the backend!"})]})}):Object(a.jsx)("div",{className:"Book__main",children:t})})}}]),n}(s.Component)),H=n(204),K=(n(186),function(e){return Object(a.jsxs)("div",{className:"menu__main",children:[Object(a.jsxs)("div",{onClick:function(){return e.setFilterGuitar(!e.filterGuitar)},children:[Object(a.jsx)(_.a,{placement:"right",title:e.filterGuitar&&"Guitar tabs hidden",children:Object(a.jsx)("div",{className:"menu__dymotagguitar",children:"\xa0Guitar\xa0"})}),Object(a.jsx)("div",{className:"menu__dymobgguitar"}),e.filterGuitar?Object(a.jsx)("div",{className:"guitar__strike"}):""]}),Object(a.jsxs)("div",{onClick:function(){return e.setFilterPiano(!e.filterPiano)},children:[Object(a.jsx)(_.a,{placement:"right",title:e.filterPiano&&"Piano songs hidden",children:Object(a.jsx)("div",{className:"menu__dymotagpiano",children:"\xa0\xa0\xa0Piano\xa0"})}),Object(a.jsx)("div",{className:"menu__dymobgpiano"}),e.filterPiano?Object(a.jsx)("div",{className:"piano__strike"}):""]}),Object(a.jsxs)("div",{onClick:function(){return e.setFilterBass(!e.filterBass)},children:[Object(a.jsx)(_.a,{placement:"right",title:e.filterBass&&"Bass tabs hidden",children:Object(a.jsx)("div",{className:"menu__dymotagbass",children:"\xa0\xa0\xa0\xa0bass\xa0"})}),Object(a.jsx)("div",{className:"menu__dymobgbass"}),e.filterBass?Object(a.jsx)("div",{className:"bass__strike"}):""]}),Object(a.jsx)(_.a,{placement:"right",title:e.onlyBookmarked&&"Show only bookmarked",children:Object(a.jsx)("div",{className:e.onlyBookmarked?"menu__favorite active":"menu__favorite inactive",onClick:function(){return e.setOnlyBookmarked(!e.onlyBookmarked)},children:Object(a.jsx)("img",{width:"25",height:"30",src:Z,alt:Z})})}),Object(a.jsx)(_.a,{placement:"bottomLeft",title:0===e.onlyFlagKnown?null:1===e.onlyFlagKnown?"Show only unknown songs":2===e.onlyFlagKnown?"Show only known songs":void 0,children:Object(a.jsx)("div",{className:0===e.onlyFlagKnown?"menu__check inactive white":1===e.onlyFlagKnown?"menu__check active black":2===e.onlyFlagKnown?"menu__check active green":void 0,onClick:function(){0===e.onlyFlagKnown?e.setOnlyFlagKnown(1):1===e.onlyFlagKnown?e.setOnlyFlagKnown(2):2===e.onlyFlagKnown&&e.setOnlyFlagKnown(0)},children:0===e.onlyFlagKnown?Object(a.jsx)(Y.a,{}):1===e.onlyFlagKnown?Object(a.jsx)(H.a,{}):2===e.onlyFlagKnown?Object(a.jsx)(Y.a,{}):void 0})})]})}),q=(n(187),function(){return Object(a.jsxs)("div",{className:"Footer__Main",children:["Songbook by ",Object(a.jsx)("a",{href:"http://www.clementvanstaen.com",target:"_blank",rel:"noopener noreferrer",children:"Cl\xe9ment van Staen"}),", 2020"]})});var $=function(){var e=Object(s.useState)(!1),t=Object(o.a)(e,2),n=t[0],c=t[1],i=Object(s.useState)(!1),r=Object(o.a)(i,2),l=r[0],u=r[1],j=Object(s.useState)(!1),b=Object(o.a)(j,2),g=b[0],d=b[1],p=Object(s.useState)(!1),h=Object(o.a)(p,2),m=h[0],O=h[1],f=Object(s.useState)(0),A=Object(o.a)(f,2),x=A[0],v=A[1],k=Object(s.useState)([]),w=Object(o.a)(k,2);return w[0],w[1],Object(a.jsxs)("div",{className:"App",children:[Object(a.jsxs)("header",{className:"App-header",children:[Object(a.jsx)(K,{filterBass:n,setFilterBass:c,filterPiano:l,setFilterPiano:u,filterGuitar:g,setFilterGuitar:d,onlyBookmarked:m,setOnlyBookmarked:O,onlyFlagKnown:x,setOnlyFlagKnown:v}),Object(a.jsx)(J,{filterBass:n,filterPiano:l,filterGuitar:g,onlyFlagKnown:x,onlyBookmarked:m})]}),Object(a.jsx)(q,{})]})};r.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)($,{})}),document.getElementById("root"))}},[[188,1,2]]]);
//# sourceMappingURL=main.097f40f2.chunk.js.map