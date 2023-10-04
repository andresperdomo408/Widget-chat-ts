import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const InitialUserForm = yup.object().shape({
  name: yup
    .string()
    .min(6, "El nombre debe tener al menos 6 caracteres")
    .max(30, "El nombre debe tener maximo de 30 caracteres")
    .required("Este campo es obligatorio"),
  email: yup.string().email("Ingresa un correo electrónico válido").trim().required("Este campo es obligatorio"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Número de teléfono no válido")
    .required("Este campo es obligatorio")
    .test("is-ten-digits", "El número de teléfono debe tener 10 dígitos", (value: string) => {
      const numericValue = value.replace(/\D/g, "");
      return numericValue.length === 10;
    }),
  identificationCard: yup
    .string()
    .matches(phoneRegExp, "La Cedula no es valida")
    .required("Este campo es obligatorio")
    .test("is-ten-digits", "Número no valido", (value: string) => {
      const numericValue = value.replace(/\D/g, "");
      return numericValue.length > 7;
    }),
});
