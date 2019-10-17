import element from './element';

let ele: object;
export function create(tagName: string, props: any, children: any[]) {
    ele = new element(tagName, props, children);
    return ele;
}