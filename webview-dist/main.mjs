(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode('@charset "UTF-8";:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}html{height:auto!important}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}.card{padding:2em}#app{max-width:1280px;min-height:100vh;width:100%}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}.hljs{display:block;overflow-x:auto;padding:.5em;background:#f0f0f0}.hljs,.hljs-subst{color:#444}.hljs-comment{color:#888}.hljs-keyword,.hljs-attribute,.hljs-selector-tag,.hljs-meta-keyword,.hljs-doctag,.hljs-name{font-weight:700}.hljs-type,.hljs-string,.hljs-number,.hljs-selector-id,.hljs-selector-class,.hljs-quote,.hljs-template-tag,.hljs-deletion{color:#800}.hljs-title,.hljs-section{color:#800;font-weight:700}.hljs-regexp,.hljs-symbol,.hljs-variable,.hljs-template-variable,.hljs-link,.hljs-selector-attr,.hljs-selector-pseudo{color:#bc6060}.hljs-literal{color:#78a960}.hljs-built_in,.hljs-bullet,.hljs-code,.hljs-addition{color:#397300}.hljs-meta{color:#1f7199}.hljs-meta-string{color:#4d99bf}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.chat-container[data-v-41788c6d]{position:relative;overflow:hidden;display:flex;flex-direction:column;width:100%;height:100vh;background-color:#181818}.chat-container .messages-container[data-v-41788c6d]{overflow-y:auto;display:flex;flex-direction:column;box-sizing:border-box;width:100%;height:calc(100vh - 80px);padding:10px}.chat-container .messages-container .empty-item[data-v-41788c6d]{height:calc(100vh - 80px)}.chat-container .messages-container .message-item[data-v-41788c6d]{display:flex;flex-direction:column;box-sizing:border-box;width:100%;margin-bottom:10px;padding:16px;line-height:24px;color:#fff;border-radius:8px}.chat-container .messages-container .message-item.user[data-v-41788c6d]{background-color:#04395e}.chat-container .messages-container .message-item.system[data-v-41788c6d]{background-color:#37373d}.chat-container .messages-container .message-item .time[data-v-41788c6d]{justify-content:end;margin-top:7px;font-size:13px;text-align:right}.chat-container .input-container[data-v-41788c6d]{position:absolute;bottom:0;left:0;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:80px}.chat-container .input-container .user-input[data-v-41788c6d]{width:calc(100% - 36px);height:38px;color:#fff;background-color:#313131;border-color:#313131;border-radius:4px}.chat-container .input-container .user-input[data-v-41788c6d]::placeholder{color:#fff;opacity:.7}.chat-container .input-container .user-input[data-v-41788c6d]:hover{border-color:#09b6a2;outline:none}.chat-container .input-container .user-input[data-v-41788c6d]:focus{border-color:#09b6a2;outline:none}.loading-container[data-v-41788c6d]{display:flex;align-items:center;justify-content:center;width:100px;min-height:68px;background:#313131;border-radius:4px}.dot[data-v-41788c6d]{width:12px;height:12px;margin:0 5px;opacity:0;background-color:#fff;border-radius:50%;animation:fadeIn-41788c6d 1.6s forwards infinite}.dot[data-v-41788c6d]:nth-child(2){animation-delay:.3s}.dot[data-v-41788c6d]:nth-child(3){animation-delay:.5s}@keyframes fadeIn-41788c6d{to{opacity:.7}}.dot{width:12px;height:12px;margin:0 5px;opacity:0;background-color:#fff;border-radius:50%;animation:fadeIn 1.6s forwards infinite}html,body{width:100%;height:100%}input::-ms-clear,input::-ms-reveal{display:none}*,*:before,*:after{box-sizing:border-box}html{font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-ms-overflow-style:scrollbar;-webkit-tap-highlight-color:rgba(0,0,0,0)}@-ms-viewport{width:device-width}body{margin:0}[tabindex="-1"]:focus{outline:none}hr{box-sizing:content-box;height:0;overflow:visible}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5em;font-weight:500}p{margin-top:0;margin-bottom:1em}abbr[title],abbr[data-original-title]{-webkit-text-decoration:underline dotted;text-decoration:underline;text-decoration:underline dotted;border-bottom:0;cursor:help}address{margin-bottom:1em;font-style:normal;line-height:inherit}input[type=text],input[type=password],input[type=number],textarea{-webkit-appearance:none}ol,ul,dl{margin-top:0;margin-bottom:1em}ol ol,ul ul,ol ul,ul ol{margin-bottom:0}dt{font-weight:500}dd{margin-bottom:.5em;margin-left:0}blockquote{margin:0 0 1em}dfn{font-style:italic}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}pre,code,kbd,samp{font-size:1em;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace}pre{margin-top:0;margin-bottom:1em;overflow:auto}figure{margin:0 0 1em}img{vertical-align:middle;border-style:none}a,area,button,[role=button],input:not([type=range]),label,select,summary,textarea{touch-action:manipulation}table{border-collapse:collapse}caption{padding-top:.75em;padding-bottom:.3em;text-align:left;caption-side:bottom}input,button,select,optgroup,textarea{margin:0;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}button,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{padding:0;border-style:none}input[type=radio],input[type=checkbox]{box-sizing:border-box;padding:0}input[type=date],input[type=time],input[type=datetime-local],input[type=month]{-webkit-appearance:listbox}textarea{overflow:auto;resize:vertical}fieldset{min-width:0;margin:0;padding:0;border:0}legend{display:block;width:100%;max-width:100%;margin-bottom:.5em;padding:0;color:inherit;font-size:1.5em;line-height:inherit;white-space:normal}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px;-webkit-appearance:none}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}output{display:inline-block}summary{display:list-item}template{display:none}[hidden]{display:none!important}mark{padding:.2em;background-color:#feffe6}.autoform[data-v-bdf9ab03]{max-width:880px;padding:40px}.autoform .footer[data-v-bdf9ab03]{margin-top:30px;display:flex;justify-content:center}.autoTable[data-v-ba8b693b]{max-width:880px;padding:40px}.autoTable .footer[data-v-ba8b693b]{margin-top:30px;display:flex;justify-content:center}')),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import "./main-CV1A_OBX.mjs";