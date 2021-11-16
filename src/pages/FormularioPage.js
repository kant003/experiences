import { Formik, Form, Field, ErrorMessage } from 'formik';
import {saveExperience} from "../services/experiences";

const FormularioPage = () => (
  <div>
    <h1>Añade una nueva experiencia</h1>
    <Formik
      initialValues={{ name: '', value: '' }}
      validate={
        values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          return errors;
        }
      }
      /*validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}*/
      onSubmit={async (values, { setSubmitting,resetForm }) => {
          await saveExperience(values)
          resetForm();

      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label for="name">Nombre:</label>
          <Field name="name" />
          <ErrorMessage name="name" component="div" />
          <br/>
          <label for="value">Valor:</label>
          <Field type="value" name="value" />
          <ErrorMessage name="value" component="div" />
          <br/>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default FormularioPage;