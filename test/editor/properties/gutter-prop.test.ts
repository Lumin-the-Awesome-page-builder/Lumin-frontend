import { describe, expect, it } from 'vitest';
import GutterProp from '@/editor/properties/GutterProp.ts';


describe("Gutter prop test", () => {
  it("Correct class creation", () => {
    const fdProp = new GutterProp("value")

    expect(fdProp.value).toBe("value")
    expect(fdProp.defaultValue).toBe("g0")
    expect(fdProp.description).toBe("___")
    expect(fdProp.title).toBe("___")
    expect(fdProp.values).toStrictEqual({
      g0: 'gap-0',
      g1: 'gap-1',
      g2: 'gap-2',
      g3: 'gap-3',
      g4: 'gap-4',
      g5: 'gap-5',
    })
    expect(GutterProp.name).toBe("gap")
  })

  it("Correct name getter", () => {
    const fdProp = new GutterProp("value")

    expect(fdProp.getName()).toBe("gap")
  })
})