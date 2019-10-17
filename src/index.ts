import $ from 'jquery'
import inputGroup from './component/inputGroup'


let a: number = 123;
const h1 = document.createElement("h1");
h1.innerHTML = "Hello TS!";
document.body.appendChild(h1);

// 应用input组件
$('body').append('<div class="box"></div>')
let input = inputGroup.Input({
    label: 'label',
    placeholder: 'placeholder',
    extra: 'extra',
    value: ''
});
input.render(document.querySelector(".box"));