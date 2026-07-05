<template>
  <div class="calculator">
    <div class="calculator__screen">
      <div class="calculator__operation">{{ display }}</div>
      <div
        class="calculator__result"
        :class="{ calculator__error: errorMessage }"
      >
        {{ displayNumber }}
      </div>
    </div>
    <div class="calculator__keypad">
      <CalculatorButton
        v-for="value in CALCULATOR_BUTTONS"
        :key="value.label"
        :button="value"
        @pressed="handleButton"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { CALCULATOR_BUTTONS } from "~/constants/calculatorButtons";

const { displayNumber, errorMessage, handleButton, display } = useCalculator();
</script>
<style scoped>
.calculator {
  width: 95%;
  max-width: 400px;
  margin: 1.6rem auto;
  background-color: var(--bg-surface);
  border: 1px solid var(--neon-blue);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  border-radius: 0.8rem;
  overflow: hidden;
}

.calculator__screen {
  padding: 1.6rem;
  background-color: var(--bg-deep);
  border-bottom: 1px solid var(--neon-blue);
  text-align: right;
}

.calculator__operation {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--neon-blue);
  opacity: 0.7;
  min-height: 2rem;
  margin-bottom: 0.8rem;
}

.calculator__result {
  font-family: var(--font-display);
  font-size: 3.6rem;
  color: var(--neon-green);
  text-shadow: 0 0 10px var(--neon-green);
}

.calculator__keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.1rem;
  padding: 0.8rem;
  background-color: var(--bg-deep);
}

.calculator__error {
  color: var(--neon-magenta);
  text-shadow:
    0 0 10px var(--neon-magenta),
    0 0 20px var(--neon-magenta);
  font-size: 1.8rem;
  animation: glitch 0.3s;
}
</style>
