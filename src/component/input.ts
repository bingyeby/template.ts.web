import { create } from '../utils/core';

// Input
export class Input<T extends InputOption>{
    private domOption: T;

    //构造函数
    constructor(inputOption: T) {
        this.domOption = inputOption;
    }

    //渲染方法
    render(ele: any) {
        console.log(this.domOption)
        const { label, placeholder, extra, value, click } = this.domOption;
        const dom: any = create('div', { class: 'xui-input' }, [
            create('label', { type: 'text', onclick: click }, [label]),
            create('input', { placeholder, value }, []),
            create('span', undefined, [extra])
        ]);

        ele.appendChild(dom.render());
    }
}

// 配置项的接口
export interface InputOption {
    label?: string,
    placeholder?: string,
    extra?: string,
    value?: string,
    click: string
}