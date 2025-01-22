import {expect, test} from "vitest";
import {shallowMount} from "@vue/test-utils";
import BubbleSortComponent from "@/components/webworker/BubbleSortComponent.vue";
import WorkerView from "@/views/WorkerView.vue";

test('renders BubbleSortDemo', () => {
    const wrapper = shallowMount(WorkerView);
    const bubbleSortComponent = wrapper.findComponent(BubbleSortComponent);
    expect(bubbleSortComponent.exists()).toBe(true);
});
