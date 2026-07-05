<template>
  <button
    :aria-label="button.label"
    v-if="button.icon"
    :class="['button', `button--${button.color}`]"
    @click="handlePress"
  >
    <v-icon aria-hidden="true">{{ button.icon }}</v-icon>
  </button>
  <button
    v-else
    :class="['button', `button--${button.color}`]"
    :aria-label="button.label"
    @click="handlePress"
  >
    {{ button.text }}
  </button>
</template>
<script setup lang="ts">
import type { CalculatorButton } from "~/types/calculator";
const props = defineProps<{ button: CalculatorButton }>();

const emit = defineEmits<{ pressed: [button: CalculatorButton] }>();
function handlePress() {
  emit("pressed", props.button);
}
</script>

<style scoped>
.button {
  width: 100%;
  padding: 1.6rem;
  background-color: rgba(0, 212, 255, 0.1);
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 1.8rem;
  font-family: var(--font-ui);
  font-weight: 600;
  color: var(--text-main);
  border: 1px solid var(--neon-blue);
  transition: all 0.2s ease;
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.4);
}

.button:hover {
  background-color: rgba(0, 212, 255, 0.4);
}

.button:active {
  transform: scale(0.95);
}

.button--primary {
  color: var(--neon-blue);
  font-size: 2.2rem;
}

.button--secondary {
  color: var(--neon-green);
}

.button--info {
  color: var(--neon-magenta);
}

.button--success {
  color: var(--neon-yellow);
  grid-column: span 4;
  margin: 1rem 0;
}
</style>
