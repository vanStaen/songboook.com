(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(2),r=n.n(s),c=n(13),o=n.n(c),i=(n(25),n(26),n(4)),u=n.n(i),l=n(14),d=n(15),j=n(16),h=n(19),b=n(18),g=(n(28),function(e){var t=e.page.title;return t=t.length>28?"".concat(t.slice(0,28),"..."):t,Object(a.jsxs)("div",{className:"Page__main",children:[Object(a.jsx)("a",{href:e.page.link,target:"_blank",children:Object(a.jsx)("img",{src:e.page.picurl,className:"Page__artwork"})}),Object(a.jsx)("div",{className:"Page__title",children:t})]})}),p=n(17),f=n.n(p),v=(n(46),function(e){Object(h.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(d.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={songbookPages:[],isLoading:!0},e}return Object(j.a)(n,[{key:"componentDidMount",value:function(){this.loadPages()}},{key:"loadPages",value:function(){var e=this;function t(){return(t=Object(l.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f()({url:"https://songbook-cvs.herokuapp.com/songbook",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=5;break}throw new Error("Error!");case 5:return e.next=7,t.data;case 7:return n=e.sent,e.abrupt("return",n);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(function(){return t.apply(this,arguments)})().then((function(t){var n=t;e.setState({songbookPages:n}),e.setState({isLoading:!1})})).catch((function(e){console.log(e.message)}))}},{key:"render",value:function(){var e=this.state.songbookPages.map((function(e){return Object(a.jsx)("div",{children:Object(a.jsx)(g,{page:e})})}));return Object(a.jsx)("div",{style:{margin:30},children:this.state.isLoading?Object(a.jsxs)("div",{children:[Object(a.jsx)("img",{src:"https://avatars0.githubusercontent.com/u/12551446",className:"book-loader",alt:"Loading"}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{style:{fontSize:18},children:"Loading ... "})]}):Object(a.jsx)("div",{className:"Book__main",children:e})})}}]),n}(s.Component));var m=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)("header",{className:"App-header",children:Object(a.jsx)(v,{})})})};o.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(m,{})}),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.82f64963.chunk.js.map