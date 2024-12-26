import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import EnvConfigurationSetup from '@/components/env/EnvConfigurationSetup.vue';

vi.mock('@/store/create-env.store', () => {
  return {
    default: vi.fn(() => ({
      selected: {
        mapping: {
          'file1.txt': {
            title: 'File 1',
            description: 'Description of File 1',
          },
          'file2.txt': {
            title: 'File 2',
            description: 'Description of File 2',
          },
        },
      },
      uploaded: {},
    })),
  };
});

describe('EnvConfigurationSetup.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EnvConfigurationSetup);
  });

  it('renders list of files correctly', () => {
    const fileItems = wrapper.findAll('.file-item');
    expect(fileItems.length).toBe(2);

    const file1 = fileItems[0];
    expect(file1.text()).toContain('File 1');
    expect(file1.text()).toContain('Description of File 1');

    const file2 = fileItems[1];
    expect(file2.text()).toContain('File 2');
    expect(file2.text()).toContain('Description of File 2');
  });

  it('computes files correctly from selected.mapping', () => {
    const files = wrapper.vm.files;
    expect(files.length).toBe(2);
    expect(files[0].name).toBe('file1.txt');
    expect(files[1].name).toBe('file2.txt');
  });

  it('computes selected correctly', () => {
    const selected = wrapper.vm.selected;
    expect(selected).toEqual({
      mapping: {
        'file1.txt': { title: 'File 1', description: 'Description of File 1' },
        'file2.txt': { title: 'File 2', description: 'Description of File 2' },
      },
    });
  });
});
