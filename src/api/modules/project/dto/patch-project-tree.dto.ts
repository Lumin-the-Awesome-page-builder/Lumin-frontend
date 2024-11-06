import { ComponentObject } from '@/editor/core/component/Component.ts';

export default class PatchProjectTreeDto {
  constructor(
    public path: string[],
    public data: ComponentObject,
  ) {}
}
