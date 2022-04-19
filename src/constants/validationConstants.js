export class ValidationConstants {
  static emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  static passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
}