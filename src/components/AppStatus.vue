<template>
  <span :class="['badge', badgeClass]">{{ title }}</span>
</template>

<script>
export default {
  data() {
    return {
      titles: {
        active: 'Активен',
        done: 'Завершен',
        cancelled: 'Отменен',
        pending: 'Выполняется',
      },
      classes: {
        active: 'primary',
        done: 'primary',
        cancelled: 'danger',
        pending: 'warning',
      },
    }
  },
  props: {
    type: {
      type: String,
      validator(value) {
        return ['active', 'done', 'cancelled', 'pending'].includes(value)
      },
    },
  },
  computed: {
    title() {
      return this.titles[this.type]
    },
    badgeClass() {
      return this.classes[this.type]
    },
  },
}
</script>
