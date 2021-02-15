<template>
  <div class="container">
    <div class="p-d-flex p-flex-column">
      <h1>My ToDo App</h1>

      <h3>Add ToDo Item</h3>
      <div class="p-d-flex">
        <InputText
            type="text"
            v-model="inputTodo"
            class="p-mr-2 p-inputtext-lg p-fluid"
            placeholder="well, todo?"
            style="width: 80%;"
        />
        <Button
            label="Add ToDo"
            style="width: 20%;"
            @click="addTodo"
        />
      </div>

      <h3>ToDos List</h3>
      <div class="p-d-flex p-flex-column">
        <div class="todo-item" v-for="(todo, idx) in todos" v-if="todos.length > 0">
          <div class="p-d-flex p-ai-center">
            <Button
                type="Button"
                icon="pi pi-check"
                :class="{'p-button-outlined': !todo.done}"
                @click="isDone(todo)"
                class="p-mr-2"
            />
            <div class="todo-item__text">{{ todo.value }}</div>
            <Button
                type="Button"
                icon="pi pi-trash"
                class="p-button-danger p-ml-auto"
                @click="removeTodo(idx)"
            />
          </div>
        </div>
        <div v-else>
          <p>Todolist empty</p>
          <p>You can add new todo-item! :)</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      inputTodo: '',
      todos: [],
    }
  },
  mounted() {
    // if todos empty on localstorage we add default todos-list
    if (localStorage.getItem('todos') === null) {
      const defaultTodos = [
        {
          value: 'Buy bread.',
          done: false
        },
        {
          value: 'Wash the dishes.',
          done: false
        },
      ]
      localStorage.setItem('todos', JSON.stringify(defaultTodos))
    }

    // get todos
    this.todos = JSON.parse(localStorage.getItem('todos'))
  },
  methods: {
    addTodo () {
      // check if v-model input length
      if (this.inputTodo.length !== 0) {
        let newItem = {
          value: this.inputTodo,
          done: false // default false
        }
        // add new todos-item on todos array
        this.todos.push(newItem)
        // clear v-model input
        this.inputTodo = ''
        // update todolist on localstorage
        this.updateTodos();
      }
    },
    removeTodo (idx) {
      // remove in todos-list item where id = idx
      this.todos.splice(idx, 1)
      // update todolist on localstorage
      this.updateTodos()
    },
    isDone (todo) {
      // toggle done
      todo.done = !todo.done
      // update todolist on localstorage
      this.updateTodos()
    },
    updateTodos () {
      // save todos on localstorage
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 640px;
  margin: 0 auto;
}

.todo-item {
  margin-bottom: 16px;

  &__text {
    text-align: left;
    max-width: 80%;
  }
}
</style>
