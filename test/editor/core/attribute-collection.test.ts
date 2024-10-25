import { beforeEach, describe, expect, it, vi } from 'vitest';
import AttributeCollection from '@/editor/core/attribute/AttributeCollection.ts';
import Attribute from '@/editor/core/attribute/Attribute.ts';

describe('Test AttributeCollection class', () => {
  let attributeCollection: AttributeCollection
  beforeEach(() => {
    //@ts-ignore
    attributeCollection = new AttributeCollection<Attribute>();
  })
  it("Test new element addition", () => {
    const attrMock = {
      htmlName: "test",
    }
    attributeCollection.set = vi.fn()
    //@ts-ignore
    attributeCollection.add(attrMock)

    expect(attributeCollection.set).toBeCalledTimes(1)
    expect(attributeCollection.set).toBeCalledWith(attrMock.htmlName, attrMock)
  })

  describe("Test attribute value appending", () => {
    const test = (curAttrMock: any, appendAttrMock: any, resultAttrMock: any) => {

      attributeCollection.get = vi.fn(() => curAttrMock)
      attributeCollection.add = vi.fn()

      attributeCollection.append(appendAttrMock)

      expect(attributeCollection.add).toBeCalledWith(resultAttrMock)
      expect(attributeCollection.add).toBeCalledTimes(1)
      expect(attributeCollection.get).toBeCalledWith(appendAttrMock.htmlName)
      expect(attributeCollection.get).toBeCalledTimes(1)
    }
    it("Test if attribute exists", () => {
      const htmlName = "test"
      const curVal = "test"
      const onAppendVal = "on-append"
      const curAttrMock = {
        htmlName,
        value: curVal
      }
      const appendAttrMock = {
        htmlName,
        value: onAppendVal
      }
      const resultAttrMock = {
        htmlName,
        value: `${curVal} ${onAppendVal}`
      }

      test(curAttrMock, appendAttrMock, resultAttrMock)
    })

    it("Test if attribute doesnt exist", () => {
      const htmlName = "test"
      const onAppendVal = "on-append"

      const appendAttrMock = {
        htmlName,
        value: onAppendVal
      }
      const resultAttrMock = {
        htmlName,
        value: ` ${onAppendVal}`
      }

      test(null, appendAttrMock, resultAttrMock)
    })
  })

  it("Test empty collection creation", () => {
    const collection = AttributeCollection.empty()

    //@ts-ignore
    expect(collection.items).toStrictEqual({})
  })
})