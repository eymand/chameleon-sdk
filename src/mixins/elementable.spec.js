import { createLocalVue, shallow } from '@vue/test-utils';
import elementable from './elementable';

const localVue = createLocalVue();
localVue.prototype.$chameleon = {};

const component = {
  data() {
    return {
    };
  },
  mixins: [
    elementable,
  ],
  render(h) {
    return h('div');
  },
};

const componentSchema = {
  type: 'panel',
  group: 'widgets',
  uid: 1,
  parentUid: 2,
};

let wrapper;
describe('elementable mixin', () => {
  beforeEach(() => {
    wrapper = shallow(component, {
      localVue,
      namespace: 'c-',
      propsData: {
        definition: {
          type: 'panel',
          _schema: componentSchema,
        },
      },
    });
  });

  it('sets config', () => {
    expect(wrapper.vm.config).toBeTruthy();
  });

  it('sets config type', () => {
    expect(wrapper.vm.config.type).toEqual('panel');
  });

  it('sets schema', () => {
    expect(wrapper.vm.schema).toBeTruthy();
  });

  it('sets schema uid', () => {
    expect(wrapper.vm.schema.uid).toEqual(1);
  });

  it('sets schema parentUid', () => {
    expect(wrapper.vm.schema.parentUid).toEqual(2);
  });

  it('sets registry', () => {
    expect(wrapper.vm.registry).toBeTruthy();
  });

  it('resolves schema attributes', () => {
    const schemaAttributes = wrapper.vm.getSchemaAttributes();
    expect(schemaAttributes['data-type']).toEqual(componentSchema.type);
    expect(schemaAttributes['data-group']).toEqual(componentSchema.group);
    expect(schemaAttributes['data-uid']).toEqual(componentSchema.uid);
    expect(schemaAttributes['data-parent']).toEqual(componentSchema.parentUid);
  });

  it('resolves element tag', () => {
    const tag = 'table';
    const elementTag = wrapper.vm.getElementTag(tag);
    expect(elementTag).toEqual(`c-${tag}`);
  });
});