import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useChooseDomainStore } from '@/store/modals/choose-domen-component.store.ts';

const response = 'response';
const setDomainMock = vi.fn(() => response);
const setIndexHtmlMock = vi.fn(() => response);
const reloadNginxMock = vi.fn(() => response);
vi.mock('@/api/modules/project/models/project.model.ts', () => {
  return {
    default: {
      setDomain: setDomainMock,
      setIndexHtml: setIndexHtmlMock,
      reloadNginx: reloadNginxMock,
    },
  };
});

describe('useChooseDomenStore', () => {
  let chooseDomenStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    chooseDomenStore = useChooseDomainStore();
  });

  it('initializes with default state', () => {
    expect(chooseDomenStore.showModal).toBe(false);
    expect(chooseDomenStore.domain).toBe('');
  });

  it('opens modal', () => {
    chooseDomenStore.openModal({
      id: 1,
      name: 'test',
      category: 'category',
      tags: 'tags',
    });
    expect(chooseDomenStore.showModal).toBe(true);
  });

  it('closes modal', () => {
    chooseDomenStore.openModal({
      id: 1,
      name: 'test',
      category: 'category',
      tags: 'tags',
    });
    chooseDomenStore.closeModal();
    expect(chooseDomenStore.showModal).toBe(false);
  });

  it('sets domen correctly', () => {
    chooseDomenStore.setDomain('my-subdomain');
    expect(chooseDomenStore.domain).toBe('my-subdomain');
  });

  it('Test save', async () => {
    const id = 1;
    const domain = 'domain';
    chooseDomenStore.setDomain(domain);

    const result = await chooseDomenStore.save(id);

    expect(setDomainMock).toBeCalledTimes(1);
    expect(setDomainMock).toBeCalledWith(id, domain);
    expect(result).equal(response);
  });

  it('Test saveIndex', async () => {
    const id = 1;
    const base64 = 'base64';

    const result = await chooseDomenStore.saveIndex(id, base64);

    expect(setIndexHtmlMock).toBeCalledTimes(1);
    expect(setIndexHtmlMock).toBeCalledWith(id, base64);
    expect(result).equal(response);
  });

  it('Test reloadNginx', async () => {
    const id = 1;
    const domain = 'domain';
    chooseDomenStore.setDomain(domain);

    const result = await chooseDomenStore.reloadNginx(id);

    expect(reloadNginxMock).toBeCalledTimes(1);
    expect(reloadNginxMock).toBeCalledWith(id, domain);
    expect(result).equal(response);
  });
});
