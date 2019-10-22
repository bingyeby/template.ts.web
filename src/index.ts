import $ from 'jquery'
import UI from './component/UI'


let a: number = 123;
const h1 = document.createElement("h1");
h1.innerHTML = "Hello TS!";
document.body.appendChild(h1);

// 应用UI.Input组件
$('body').append('<div class="box"></div>')
let input = UI.Input({
    label: 'label',
    placeholder: 'placeholder',
    extra: 'extra',
    value: '',
    click: () => {
        console.log('click...')
    }
});
input.render(document.querySelector(".box"));