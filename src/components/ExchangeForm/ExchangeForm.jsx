import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { exchangeCurrency } from 'reduxState/operations';

const parseFormData = (value = '') => {
  const [amount, from, to] = value.replace('in ', '').split(' ');
  return {
    amount,
    from,
    to,
  };
};

export const ExchangeForm = () => {
  // const handleSubmit = () => {};
  const dispatch = useDispatch();
  return (
    <Formik
      onSubmit={(values, actions) => {
        const payload = parseFormData(values.exchangeRequest);
        dispatch(exchangeCurrency(payload));
        actions.resetForm();
      }}
      initialValues={{ exchangeRequest: '' }}
      validationSchema={Yup.object({
        exchangeRequest: Yup.string()
          .matches(
            /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/,
            'Request format 15 USD in UAH',
          )
          .required('Required'),
      })}
    >
      <Form className={styles.form}>
        <button className={styles.button} type="submit">
          <RiExchangeDollarFill className={styles.icon} />
        </button>

        <Field title="Request format 15 USD in UAH" name="exchangeRequest" />
        <ErrorMessage name="exchangeRequest" />
      </Form>
    </Formik>
  );
};
