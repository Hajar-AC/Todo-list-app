
import { shallowMount } from '@vue/test-utils';
import TodoForm from '@/components/TodoForm.vue';

describe('TodoForm.vue', () => {
  it('ajoute une nouvelle tâche à la liste', async () => {
    const wrapper = shallowMount(TodoForm, {
      data() {
        return {
          newTodoText: '',
        };
      },
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('New Task');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('add-todo')).toBeTruthy();
    expect(wrapper.emitted('add-todo')![0]).toEqual(['New Task']);
  });

  it('ne permet pas d\'ajouter une tâche vide', async () => {
    const wrapper = shallowMount(TodoForm, {
      data() {
        return {
          newTodoText: '',
        };
      },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('add-todo')).toBeFalsy();
  });
});
