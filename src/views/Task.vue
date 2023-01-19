<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p>
      <strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}
    </p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')">
        Взять в работу
      </button>
      <button class="btn primary" @click="changeStatus('done')">
        Завершить
      </button>
      <button class="btn danger" @click="changeStatus('cancelled')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong> {{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'

export default {
  computed: {
    task() {
      return this.$store.getters.taskById(this.id)
    },
    id() {
      return this.$route.params.id
    },
  },
  methods: {
    changeStatus(status) {
      this.$store.dispatch('changeStatus', { status: status, id: this.id })
    },
  },
  components: { AppStatus },
}
</script>

<style scoped></style>
