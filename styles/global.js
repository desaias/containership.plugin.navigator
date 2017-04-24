//
// Global Styles
// take caution!
//
import vars from './vars';

export default `
html, body, #__next, div[data-reactroot] {
  margin: 0;
  padding: 0;
  height: 100vh;
}
html {
  color: ${vars.fontDark};
}
body {
  font-family: sans-serif;
  font-weight: 400;
  letter-spacing: 0.78px;
  overflow-x: hidden;
}
*, *:after, *:before {
  box-sizing: border-box;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 300;
  letter-spacing: 0.78px;
  line-height: 30px;
  text-transform: uppercase;
}
h1 {
  font-size: 4rem;
  line-height: 1.3;
}
h2 {
  font-size: 2.5rem;
}
h6 {
  font-size: 1.6rem;
  line-height: 19px;
}
p {
  font-size: 1.3rem;
  line-height: 21px;
}
a, a:hover, a:active, a:hover {
  outline: none;
  text-decoration: none;
}
.btn {
  -webkit-appearance: none;
  appearance: none;
  border: 0 none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  font-size: 1.6rem;
  height: 45px;
  letter-spacing: 1.6px;
  text-align: center;
  text-transform: uppercase;
  -webkit-user-select: none;
  user-select:none;
  width: 100%;
}
a.btn {
  display: flex;
  flex-direction: column;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 26rem;
}
.btn.transparent {
  background-color: transparent;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.25);
  border: 1px solid #fff;
  color: #fff;
}
.btn.white {
  background-color: #fff;
  color: #000;
}
.btn.orig-blue {
  background-color: #4ac2e2;
  color: #fff;
}
.btn.blue {
  background-color: ${vars.lightBlue};
  color: #fff;
}
.btn.red {
  background-color: ${vars.red};
  color: #fff;
}
.btn.magenta {
  background-color: #e527a3;
  color: #fff;
}
.btn.disabled {
  cursor: default;
  pointer-events: none;
}
.btn:hover {
  filter: brightness(105%);
}

input[type=text],
input[type=number] {
  padding: 10px;
  border: 1px solid #dcdcdc;
  transition: box-shadow 0.3s, border 0.3s;
  border-radius: 4px;
}
input[type=text]:focus,
input[type=number]:focus {
  border: 1px solid ${vars.lightBlue};
  outline-offset: -3px;
}

input[type=text].error,
input[type=text].error:focus {
  border: 1px solid ${vars.red};
  outline-offset: -3px;
  outline-color: ${vars.red};
}
select.error {
  border: 1px solid ${vars.red}
}

input[readonly] {
  background: #eee;
  border: 0px;
}
input[readonly]:focus {
  border: 0px;
}

`;
