import _ from './unit';

export default class mElement {
    tagName!: string;
    props: any;
    children: any;
    key: any;
    count!: number;
    constructor(tagName: string, props: any, children: any[]) {
        if (!(this instanceof mElement)) {
            if (!_.isArray(children) && children != null) {
                children = _.slice(arguments, 2).filter(_.truthy)
            }
            return new mElement(tagName, props, children)
        }

        if (_.isArray(props)) {
            children = props
            props = {}
        }

        this.tagName = tagName
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : void 1

        var count = 0

        _.each(this.children, function (child, i) {
            if (child instanceof mElement) {
                count += child.count
            } else {
                children[i] = '' + child
            }
            count++
        })

        this.count = count
    }
    render = function (this: mElement) {
        var el = document.createElement(this.tagName)
        var props = this.props

        for (var propName in props) {
            var propValue = props[propName]
            _.setAttr(el, propName, propValue)
        }

        _.each(this.children, function (child) {
            var childEl = (child instanceof mElement)
                ? child.render()
                : document.createTextNode(child)
            el.appendChild(childEl)
        })

        return el
    }
}