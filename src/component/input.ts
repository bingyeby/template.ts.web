import { create } from '../utils/core';

///input
export class Input<T extends InputOption>{
    private thatOption: T;
    //构造函数
    constructor(inputOption: T) {
        this.thatOption = inputOption;
    }

    //渲染方法
    render(ele: any) {
        console.log(this.thatOption)
        const { label, placeholder, extra, value, click } = this.thatOption;
        const dom: any = create('div', { class: 'xui-input' }, [
            create('label', { type: 'text', onclick: click }, [label]),
            create('input', { placeholder, value }, []),
            create('span', undefined, [extra])
        ]);

        ele.appendChild(dom.render());
    }
}

///配置项的接口
export interface InputOption {
    label?: string,
    placeholder?: string,
    extra?: string,
    value?: string,
    click: string
}