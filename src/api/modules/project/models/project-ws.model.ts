import WsModelUtil from '@/utils/ws-model.util';
import Component from '@/editor/core/component/Component';

export default class ProjectWsModel extends WsModelUtil {
  constructor(
    public projectId: number,
    public access: string,
  ) {
    super('lumin/collab/ws', false);
  }

  async auth() {
    return await this.sendAwaited(
      `auth-client-awaited-${this.access}`,
      'auth',
      {
        project_id: this.projectId,
        access: this.access,
      },
    );
  }

  blockComponent(component: Component) {
    this.send('block-element', {
      project_id: this.projectId,
      path: component
        .findTop()
        .map((el) => el.key)
        .reverse(),
      access: this.access,
    });
  }

  releaseComponent(component: Component) {
    this.send('release-element', {
      project_id: this.projectId,
      path: component
        .findTop()
        .map((el) => el.key)
        .reverse(),
      access: this.access,
    });
  }

  async patchElementProp(
    component: Component,
    action: string,
    prop_name: string,
    prop_value: any,
  ) {
    await this.sendAwaited(`patch-prop-awaited-${this.access}`, 'patch-prop', {
      project_id: this.projectId,
      access: this.access,
      path: component
        .findTop()
        .map((el) => el.key)
        .reverse(),
      action,
      prop_name,
      prop_value,
    });
  }

  addNewProp(component: Component, prop_name: string, prop_value: any) {
    this.patchElementProp(component, 'add', prop_name, prop_value);
  }

  removeProp(component: Component, prop_name: string, prop_value: any) {
    this.patchElementProp(component, 'remove', prop_name, prop_value);
  }

  async replaceProp(component: Component, prop_name: string, prop_value: any) {
    return await this.patchElementProp(
      component,
      'replace',
      prop_name,
      prop_value,
    );
  }

  async patchElement(component: Component) {
    return await this.sendAwaited(
      `patch-awaited-${this.access}`,
      'patch-tree',
      {
        project_id: this.projectId,
        access: this.access,
        path: component
          .findTop()
          .map((el) => el.key)
          .reverse(),
        data: component.toJson(),
      },
    );
  }

  async patchElementOrdering(path: string[], ordering: string[]) {
    return await this.sendAwaited(
      `patch-ordering-awaited-${this.access}`,
      'patch-item-ordering',
      {
        project_id: this.projectId,
        access: this.access,
        path,
        ordering,
      },
    );
  }

  async removeElement(path: string[]) {
    return await this.sendAwaited(
      `remove-awaited-${this.access}`,
      'remove-element',
      {
        project_id: this.projectId,
        access: this.access,
        path,
      },
    );
  }

  async save() {
    return await this.sendAwaited(`save-awaited-${this.access}`, 'save', {
      project_id: this.projectId,
      access: this.access,
    });
  }

  sendCursorCoordinates(x: number, y: number) {
    return this.send('cursor-updated', {
      x: x,
      y: y,
      project_id: this.projectId,
      access: this.access,
    });
  }

  removeCursor() {
    return this.send('delete-cursor', {
      project_id: this.projectId,
      access: this.access,
    });
  }

  closeEditing() {
    this.send('close', {
      project_id: this.projectId,
      access: this.access,
    });
    super.close();
  }
}
