import Component, { ComponentObject } from '@/editor/core/component/Component.ts';

export class App {
  public rootHTML: HTMLElement = document.createElement("div")
  public root: Component[] = []
  public collection: Record<string, Component> = {}
  public library: Record<string, any> = {}
  public mountPoint: string = ""
  public identifiersSalt: string = ""
  public scopeIdentifier: string = ""
  public state: ComponentObject[] = []


  init(mountPoint: string,
       identifierSalt: string,
       state: ComponentObject[] = []) {
    this.mountPoint = mountPoint
    this.identifiersSalt = identifierSalt
    this.state = state
    const root = document.getElementById(this.mountPoint);
    if (!root) {
      throw new DOMException("Bad root element provided");
    }

    this.scopeIdentifier = root.attributes[0].name

    this.rootHTML = root
  }

  public use<T extends typeof Component>(name: string, component: T) {
    this.library[name] = component
  }

  public buildTree(state: ComponentObject[]): Component[] {
    return state ? state.map(el => {
      const constr = this.library[el.name]

      if (!constr)
        throw new DOMException(`Unknown component: ${el.name}`)

      const component: Component = new constr()

      el.attrs.push({name: this.scopeIdentifier, value: ""})

      component.setAttrs(el.attrs)
      component.setProps(el.props)
      component.appendChildren(this.buildTree(el.children))
      component.setContent(el.content)
      component.setKeySalt(this.identifiersSalt)
      component.setKey(el.key)

      this.collection[component.key] = component

      return component
    }) : []
  }

  public run() {
    this.root = this.buildTree(this.state)

    this.rootHTML.innerHTML = ''
    this.root.forEach(el => {
      this.rootHTML.appendChild(el.render())
    })

    this.update("data-123-div-1729624518123", "data-123-div-1729624518542")
  }

  public find(key: string): Component | undefined {
    // return this.root.map(el => el.findChild(key)).filter(el => el)[0]
    return this.collection[key]
  }

  public update(key: string, content: string) {
    const element = this.find(key)
    if (element) {
      element.setContent(content)
      element.update()
    } else throw new DOMException("Element not found")
  }
}