(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("error").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,s)=>{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await r.json();document.getElementById("error").classList.add("hidden"),n.popup&&t(n.popup),n.error&&t(n.error),n.redirect&&(window.location=n.redirect),s&&s(n)},hideError:()=>{document.getElementById("error").classList.add("hidden")}}}},t={};function a(s){var r=t[s];if(void 0!==r)return r.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,a),n.exports}(()=>{const e=a(603),t=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#msgContent").value,s=t.target.querySelector("#_csrf").value;return a?(e.sendPost(t.target.action,{msg:a,_csrf:s},n),!1):(e.handleError("Message is required!"),!1)},s=e=>React.createElement("form",{id:"msgForm",name:"msgForm",onSubmit:t,action:"/msg",method:"POST",className:"msgForm"},React.createElement("label",{htmlFor:"message"},"Welcome, ",React.createElement("b",null,e.username),"! What's on your mind? "),React.createElement("br",null),React.createElement("input",{id:"msgContent",type:"text",name:"message",placeholder:"Message"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"submitMessage",type:"submit",value:"Chirp"})),r=e=>{if(0===e.messages.length)return React.createElement("div",{className:"msgList"},React.createElement("h3",{className:"emptyMessage"},"No Messages Yet!"));const t=e.messages.map((e=>React.createElement("div",{key:e._id,className:"message"},React.createElement("h3",{className:"msgAuthor"},e.author),React.createElement("p",{className:"msgContent"},e.msg),React.createElement("p",{className:"msgDate"},"Posted: ",e.createdDate)))).reverse();return React.createElement("div",{className:"msgList"},t)},n=async()=>{const e=await fetch("/getMessages"),t=await e.json();ReactDOM.render(React.createElement(r,{messages:t.messages}),document.getElementById("messages"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json(),a=await fetch("/getAccountData"),c=await a.json();ReactDOM.render(React.createElement(s,{username:c.account.username,csrf:t.csrfToken}),document.getElementById("makeMessage")),ReactDOM.render(React.createElement(r,{messages:[]}),document.getElementById("messages")),n()}})()})();