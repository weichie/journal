<template>
  <li>
    <div class="date">
      <strong>{{ item.createdAt | dayMonth}}</strong>
    </div>
    <div class="items">
      <span>{{ item.body.item_1 }}</span>
      <span>{{ item.body.item_2 }}</span>
      <span>{{ item.body.item_3 }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'journalItem',
  props: {
    item: Object
  }
}
</script>