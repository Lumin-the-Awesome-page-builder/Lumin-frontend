import { assert, beforeEach, describe, expect, it, vi } from 'vitest';
import Component from '@/editor/core/component/Component.ts';
import Attribute from '@/editor/core/attribute/Attribute.ts';


describe("Base component class tests", () => {
  let component: Component
  beforeEach(() => {
    //@ts-ignore
    component = new Component("h1")
  })
  it('Test component creation', () => {

    assert.isNotNull(component.htmlElement)
    expect(component.htmlElement.tagName).equal('H1')
  })

  it('Test arguments setup', () => {
    const attr = {name: "class", value: "test1 test2"}
    const attrs = [
      attr
    ]

    const attributesMock = {
      add: vi.fn()
    }

    //@ts-ignore
    component.attributes = attributesMock
    component.setAttrs(attrs)

    expect(attributesMock.add).toBeCalledTimes(1)
    expect(attributesMock.add).toBeCalledWith(new Attribute(attr.name, attr.value))
  })

  it('Test key salt setup', () => {
    const keySalt = "test-salt"

    component.setKeySalt(keySalt)

    expect(component.keySalt).toBe(keySalt)
  })

  it("Test key setup", () => {
    const key = "test-key"
    const attributesMock = {
      add: vi.fn()
    }

    //@ts-ignore
    component.attributes = attributesMock
    component.setKey(key)

    expect(component.key).toBe(key)
    expect(attributesMock.add).toBeCalledTimes(1)
    expect(attributesMock.add).toBeCalledWith(new Attribute(key))
  })

  it("Test key generation", () => {
    const keySalt = "salt"
    vi.useFakeTimers();
    const mockDate = new Date(2024, 0, 1);
    vi.setSystemTime(mockDate);
    const now = mockDate.getTime()

    component.keySalt = keySalt
    component.setKey = vi.fn()
    component.generateKey()

    expect(component.setKey).toBeCalledWith(`data-${keySalt}-h1-${now}`)
    expect(component.setKey).toBeCalledTimes(1)
  })

  it("Test props setup", () => {
    const propName = "PropName"
    const propMock = {
      getName: vi.fn(() => propName)
    }
    //@ts-ignore
    component.props = {
      set: vi.fn()
    }

    //@ts-ignore
    component.setProps([propMock])

    expect(component.props.set).toBeCalledTimes(1)
    expect(component.props.set).toBeCalledWith(propName, propMock)
    expect(propMock.getName).toBeCalledTimes(1)
  })

  it('Test parent setup', () => {
    const parentMock = {}

    //@ts-ignore
    component.setParent(parentMock)

    expect(component.parent).toBe(parentMock)
  })

  it('Test child appending', () => {
    const setParentResult = "result"
    const childMock = {
      setParent: vi.fn(() => setParentResult)
    }

    component.appendChildren = vi.fn()
    //@ts-ignore
    component.appendChild(childMock)


    expect(childMock.setParent).toBeCalledTimes(1)
    expect(childMock.setParent).toBeCalledWith(component)
    expect(component.appendChildren).toBeCalledTimes(1)
    expect(component.appendChildren).toBeCalledWith([setParentResult])
  })

  it('Test children appending', () => {
    const setParentResult = "result"
    const childMock = {
      setParent: vi.fn(() => setParentResult)
    }

    //@ts-ignore
    component.children = {
      push: vi.fn()
    }

    //@ts-ignore
    component.appendChildren([childMock])

    expect(childMock.setParent).toBeCalledTimes(1)
    expect(childMock.setParent).toBeCalledWith(component)
    expect(component.children.push).toBeCalledTimes(1)
    expect(component.children.push).toBeCalledWith(setParentResult)
  })

  it('Test content setup', () => {
    const content = ""

    component.setContent(content)

    expect(component.content).toBe(content)
  })

  it('Test props applying', () => {
    const propMock = {
      apply: vi.fn()
    }
    component.props = {
      //@ts-ignore
      getAll: vi.fn(() => [propMock])
    }

    component.applyProps()

    expect(component.props.getAll).toBeCalledTimes(1)
    expect(propMock.apply).toBeCalledTimes(1)
    expect(propMock.apply).toBeCalledWith(component)
  })

  it('Test attributes applying', () => {
    const htmlName = "test"
    const value = "test-value"
    const attrMock = {
      htmlName,
      value
    }
    //@ts-ignore
    component.attributes = {
      getAll: vi.fn(() => [attrMock])
    }
    //@ts-ignore
    component.htmlElement = {
      setAttribute: vi.fn()
    }

    component.applyAttributes()

    expect(component.htmlElement.setAttribute).toBeCalledTimes(1)
    expect(component.htmlElement.setAttribute).toBeCalledWith(htmlName, value)
    expect(component.attributes.getAll).toBeCalledTimes(1)
  })

  describe('Test rendering', () => {
    beforeEach(() => {
      component.applyProps = vi.fn()
      component.applyAttributes = vi.fn()
      component.htmlElement = {
        innerHtml: "test-value",
        innerText: "",
        //@ts-ignore
        classList: {
          add: vi.fn()
        },
        appendChild: vi.fn()
      }
    })

    it('Test render empty children', () => {
      component.content = "test-content"
      //@ts-ignore
      component.children = {
        length: 0,
        forEach: vi.fn()
      }

      component.render()

      expect(component.htmlElement.innerText).toBe(component.content)
      expect(component.children.forEach).toBeCalledTimes(0)
      expect(component.htmlElement.classList.add).toBeCalledTimes(0)
    })

    it('Test render with children', () => {
      const renderResult = "render-result"
      const childMock = {
        render: vi.fn(() => renderResult)
      }
      //@ts-ignore
      component.children = [childMock]
      component.content = "test-content"

      component.render()

      expect(component.htmlElement.appendChild).toBeCalledTimes(1)
      expect(component.htmlElement.appendChild).toBeCalledWith(renderResult)
      expect(component.htmlElement.innerHTML).toBe("")
      expect(component.htmlElement.classList.add).toBeCalledTimes(0)
    })

    it('Test render empty child list and content', () => {
      //@ts-ignore
      component.children = {
        length: 0,
        forEach: vi.fn()
      }
      component.content = ""

      component.render()

      expect(component.htmlElement.classList.add).toBeCalledWith('empty-item')
      expect(component.htmlElement.classList.add).toBeCalledTimes(1)
      expect(component.htmlElement.innerHTML).toBe("")
      expect(component.htmlElement.innerText).toBe("")
      expect(component.children.forEach).toBeCalledTimes(0)
    })
  })

  describe('Test update', () => {
    it('Test update with parent component', () => {
      //@ts-ignore
      component.parent = {
        render: vi.fn()
      }

      component.render = vi.fn()
      component.update()

      expect(component.render).toBeCalledTimes(0)
      expect(component.parent.render).toBeCalledTimes(1)
    })

    it('Test update with no parent component', () => {
      //@ts-ignore
      component.parent = false

      component.render = vi.fn()
      component.update()

      expect(component.render).toBeCalledTimes(1)
    })
  })
})