import { assert, beforeEach, describe, expect, it } from 'vitest';
import { Collection } from '@/editor/utils/Collection.ts';


describe("Test collection util class", () => {
  let collection: Collection<Number>

  beforeEach(() => {
    //@ts-ignore
    collection = new Collection<Number>();
  })

  it("Test collection getter", () => {
    //@ts-ignore
    collection.items = {"test": 123};

    expect(collection.get("test")).toBe(123)
  })

  it("Test get all collection items", () => {
    //@ts-ignore
    collection.items = {"test": 123, "test2": 124};

    expect(collection.getAll()).toStrictEqual([123, 124])
  })

  it("Test collection setter", () => {

    collection.set("test", 123)

    //@ts-ignore
    expect(collection.items).toStrictEqual({"test": 123})
  })

  describe("Collection remove item", () => {
    describe("Remove with exception", () => {
      it("Item exists", () => {
        //@ts-ignore
        collection.items = {"test": 123, "test2": 124};

        collection.remove("test")

        //@ts-ignore
        expect(collection.items).toStrictEqual({"test2": 124});
      })

      it("Item does not exist", () => {
        //@ts-ignore
        collection.items = {"test": 123, "test2": 124};

        assert.throws(() => collection.remove("test123"))
      })
    })


    describe("Remove without exception", () => {
      it("Item exists", () => {
        //@ts-ignore
        collection.items = {"test": 123, "test2": 124};

        const result = collection.removeIfExists("test")

        //@ts-ignore
        expect(collection.items).toStrictEqual({"test2": 124});
        expect(result).toBe(true)
      })

      it("Item does not exist", () => {
        //@ts-ignore
        collection.items = {"test": 123, "test2": 124};

        const result = collection.removeIfExists("test123")

        //@ts-ignore
        expect(collection.items).toStrictEqual({"test": 123, "test2": 124});
        expect(result).toBe(false)
      })
    })
  })
})