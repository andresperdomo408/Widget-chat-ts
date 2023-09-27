import { ErrorMessage, Field, Form, Formik } from "formik";
import FooterComponent from "./FooterComponent";
import { InitialUserForm } from "../../utils/UserFormValidation";
import countryCodeData from "../../../../countryCode.json";
import Message from "../../../assets/conversacion.png";
import { useDispatch } from "react-redux";
import { widgetForm } from "../../../Domain/storage/widget/thunk";
import { FormChatInterface } from "../../../Domain/entities/FormChat";

const FormChatComponent = ({ toggleChatForm }: { toggleChatForm: () => void }) => {
  const countries = countryCodeData;
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-0 right-0 p-5 md:right-20 max-w-md ">
      <div className="flex flex-col p-5 static  scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrolling-touch max-h-auto  bg-blue-500 rounded-t-lg">
        <div className="bg-white rounded sm:shadow-lg py-4  px-4 md:px-9">
          <div className="mb-4 flex flex-col">
            <div className="w-14 h-14 ml-24 md:ml-28 rounded-full shadow-lg bg-blue-500 my-2  cursor-pointer">
              <img
                src={Message}
                alt="Message"
                className="w-full h-full p-3 border-2 border-white object-cover rounded-full"
              />
            </div>
            <Formik
              initialValues={{
                name: "",
                email: "",
                countryCode: "+57",
                phoneNumber: "",
                identificationCard: "",
              }}
              onSubmit={(values: FormChatInterface) => {
                dispatch<any>(widgetForm(values))
                  .then(() => {
                    toggleChatForm();
                  })
                  .catch((error: Error) => {
                    console.log(error);
                  });
              }}
              validationSchema={InitialUserForm}
            >
              {() => (
                <Form className="space-y-4">
                  <div className="relative">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Nombre Completo"
                      className="mt-1 pl-2   block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    />
                    <ErrorMessage name="name" component="div" className="font-medium text-red-500 text-xs mt-1" />
                  </div>
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Correo electronico"
                      className="mt-1 pl-2  block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    />
                    <ErrorMessage name="email" component="div" className="font-medium text-red-500 text-xs mt-1 pl-2" />
                  </div>
                  <div className="flex grid-cols-2 space-x-2 ">
                    <Field
                      as="select"
                      name="countryCode"
                      className="mt-1 pl-2  block w-36 border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 "
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.dial_code}>
                          {`${country.emoji} ${country.name} (${country.dial_code})`}
                        </option>
                      ))}
                    </Field>
                    <Field
                      type="text"
                      name="phoneNumber"
                      placeholder="Número Celular"
                      className="mt-1 pl-2  block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    />
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="font-medium text-red-500 text-xs mt-1 pl-2 "
                  />
                  <div className="relative">
                    <Field
                      type="text"
                      name="identificationCard"
                      placeholder="Cedula de Ciudadania"
                      className="mt-1 pl-2   block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    />
                    <ErrorMessage
                      name="identificationCard"
                      component="div"
                      className="font-medium text-red-500 text-xs mt-1"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 w-full py-1 my-2 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                      <div className="flex justify-center items-center p-1">Iniciar Conversación</div>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default FormChatComponent;
