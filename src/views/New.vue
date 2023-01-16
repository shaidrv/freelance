<template>
  <form class="card" @submit.prevent="submit">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="task.title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="task.date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="task.description"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: '',
        date: null,
        description: '',
      },
    }
  },
  computed: {
    isValid() {
      return (
        this.task.title != '' && this.task.date && this.task.description != ''
      )
    },
  },
  methods: {
    async submit() {
      await this.$store.dispatch('createTask', this.task)
      this.$router.push('/')
    },
  },
}
</script>
