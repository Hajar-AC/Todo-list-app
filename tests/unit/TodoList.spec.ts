import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';

describe('TodoList.vue', () => {
  it('affiche la liste des tâches correctement', () => {
    const wrapper = shallowMount(TodoList, {
      data() {
        return {
          allTodos: [
            { id: 1, text: 'Task 1', completed: false, editing: false },
            { id: 2, text: 'Task 2', completed: true, editing: false },
          ],
        };
      },
    });
    const todos = wrapper.findAll('li');
    expect(todos.length).toBe(2);
    expect(todos[0].text()).toContain('Task 1');
    expect(todos[1].text()).toContain('Task 2');
  });
});