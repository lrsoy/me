<!-- DelayTeleport -->
<script setup lang="ts">
import { Teleport } from 'vue'
const slots = useSlots()
const teleportVnode = ref<VNode | null>(null)
onMounted(() => {
  if (slots.default?.()) {
    teleportVnode.value = h(Teleport,
      {
        to: '#view_side'
      },
      slots.default?.()
    )
  }
})

const delayTeleport = {
  render() {
    return h('div', null, [teleportVnode.value])
  }
}
</script>
<template>
  <delayTeleport>
    <slot></slot>
  </delayTeleport>
</template>

<style  scoped></style>
