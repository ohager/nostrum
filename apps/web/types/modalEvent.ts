export interface ModalEvent {
  type: "info" | "success" | "error";
  title: string;
  text: string;
}
