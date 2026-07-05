export type ButtonColor = "secondary" | "primary" | "info" | "success";

export interface CalculatorButton {
  label: string;
  color: ButtonColor;
  text?: string;
  icon?: string;
  action?: "delete";
}
