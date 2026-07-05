import { CALCULATOR_BUTTONS } from "~/constants/calculatorButtons";
import type { CalculatorButton } from "~/types/calculator";

export function useCalculator() {
  const currentNumber = ref("");
  const previousNumber = ref("");
  const selectedOperator = ref("");
  const errorMessage = ref("");

  function pressNumber(value: string) {
    if (errorMessage.value) {
      currentNumber.value = "";
      errorMessage.value = "";
    }
    currentNumber.value += value;
  }

  function pressOperator(operator: string) {
    if (!!selectedOperator.value && !!currentNumber.value) {
      calculate();
    }
    previousNumber.value = currentNumber.value;
    currentNumber.value = "";
    selectedOperator.value = operator;
  }

  function deleteLast() {
    currentNumber.value = currentNumber.value.slice(0, -1);
    if (currentNumber.value.length === 0) {
      currentNumber.value = "0";
    }
  }

  function toggleSign() {
    if (currentNumber.value === "0" || currentNumber.value === "") return;

    if (currentNumber.value.startsWith("-")) {
      currentNumber.value = currentNumber.value.slice(1);
    } else {
      currentNumber.value = "-" + currentNumber.value;
    }
  }

  function clearEntry() {
    currentNumber.value = "";
  }

  function calculate() {
    switch (selectedOperator.value) {
      case "+":
        currentNumber.value = String(
          parseFloat(previousNumber.value) + parseFloat(currentNumber.value),
        );
        break;
      case "-":
        currentNumber.value = String(
          parseFloat(previousNumber.value) - parseFloat(currentNumber.value),
        );
        break;
      case "*":
        currentNumber.value = String(
          parseFloat(previousNumber.value) * parseFloat(currentNumber.value),
        );
        break;
      case "/":
        if (currentNumber.value === "0" && previousNumber.value === "0") {
          errorMessage.value = "No puedes dividir cero entre cero";
        } else if (currentNumber.value === "0") {
          errorMessage.value = "No puedes dividir entre cero";
        } else {
          currentNumber.value = String(
            parseFloat(previousNumber.value) / parseFloat(currentNumber.value),
          );
        }
        break;
      case "%":
        currentNumber.value = String(
          parseFloat(previousNumber.value) % parseFloat(currentNumber.value),
        );
    }
    previousNumber.value = "";
    selectedOperator.value = "";
  }

  function clear() {
    currentNumber.value = "";
    previousNumber.value = "";
    selectedOperator.value = "";
    errorMessage.value = "";
  }

  function addPoint() {
    if (currentNumber.value.includes(".")) return;
    pressNumber(".");
  }

  function handleButton(button: CalculatorButton) {
    switch (true) {
      case !isNaN(Number(button.text)) && !!button.text:
        pressNumber(button.text ?? "");
        break;
      case ["+", "-", "*", "/", "%"].includes(button.text ?? ""):
        pressOperator(button.text ?? "");
        break;
      case button.text === "=":
        calculate();
        break;
      case button.text === "C":
        clear();
        break;
      case button.text === "CE":
        clearEntry();
        break;
      case button.text === "+/-":
        toggleSign();
        break;
      case button.text === ".":
        addPoint();
        break;
      case button.action === "delete":
        deleteLast();
        break;
    }
  }

  const keyMap: Record<string, string> = {
    Enter: "=",
    Escape: "C",
    ",": ".",
    Delete: "Backspace",
  };

  function handleKey(event: KeyboardEvent) {
    const key = event.key;
    const mappedKey = keyMap[key] || key;

    const button = CALCULATOR_BUTTONS.find(
      (element) =>
        element.text === mappedKey ||
        (element.action === "delete" && mappedKey === "Backspace"),
    );

    if (button) {
      event.preventDefault();
      handleButton(button);
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleKey);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKey);
  });

  const display = computed(() => {
    return previousNumber.value.length > 0
      ? `${previousNumber.value} ${selectedOperator.value}`
      : "";
  });

  const displayNumber = computed(() => {
    return !!errorMessage.value
      ? errorMessage.value
      : !!currentNumber.value
        ? currentNumber.value
        : !!previousNumber.value
          ? previousNumber.value
          : "0";
  });

  return {
    previousNumber,
    selectedOperator,
    errorMessage,
    pressNumber,
    pressOperator,
    deleteLast,
    clearEntry,
    calculate,
    clear,
    handleButton,
    display,
    displayNumber,
  };
}
