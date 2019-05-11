import { TextField, Paper, Button, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl } from "@material-ui/core"
import React from 'react'
import { withFormik } from 'formik'
import { WebService } from 'app/services/WebService'
import './Register.css'
import * as Yup from 'yup'
import { Prompt } from 'react-router-dom'

const webService = process.env.NODE_ENV === 'development' ? 
                  new WebService('http://localhost:3333') :
                  new WebService()

const Register = ({ values, handleChange, handleSubmit, status, isSubmitting, touched, errors, dirty }) => (
  <React.Fragment>
    <Prompt
      when={dirty}
      message={`Your changes are unsaved. Are you sure you want to leave this page?`}
    />
    <div className="register-wrapper">
      <Paper className="register-box">
        <h1 className="register-header">welcome</h1>
        <h3 className="register-text">Please register for Nicole's bridal shower below. <br/> We hope to see you there to create a memorable surprise for her!</h3>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="First Name"
            error={touched.firstName && !!errors.firstName}
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
          {
            touched.firstName && errors.firstName
              ? <div>{errors.firstName}</div>
              : null
          }
          <TextField
            label="Last Name"
            error={touched.lastName && !!errors.lastName}
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
          {
            touched.lastName && errors.lastName
              ? <div>{errors.lastName}</div>
              : null
          }
          <TextField
            label="Email"
            error={touched.email && !!errors.email}
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {
            touched.email && errors.email
            ? <div>{errors.email}</div>
            : null
          }
          <TextField
            label="Phone Number"
            error={touched.phone && !!errors.phone}
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {
            touched.phone && errors.phone
              ? <div>{errors.phone}</div>
              : null
          }
          <TextField
            label="Enter a short note if desired..."
            error={touched.note && !!errors.note}
            type="text"
            name="note"
            value={values.note}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {
            touched.note && errors.note
              ? <div>{errors.note}</div>
              : null
          }
          <div className="register-rsvp-box">
            <FormControl component="div">
              <FormLabel component="label" error={touched.reply && !!errors.reply}>RSVP</FormLabel>
              <RadioGroup
                aria-label="RSVP"
                name="reply"
                value={values.reply}
                onChange={handleChange}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {
              touched.reply && errors.reply
                ? <div>{errors.reply}</div>
                : null
            }
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isSubmitting}
          >
          Submit
          </Button>
        </form>
        {status && <p>{status}</p>}
      </Paper>
    </div>
  </React.Fragment>
)

const formikConfig = {
  validateOnChange: false,
  mapPropsToValues: props => ({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    reply: '',
    note: ''
  }),
  validationSchema:
    Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Email address required'),
      phone: Yup.string()
        .max(15, 'Phone Number must not be more than 15 characters')
        .required('Phone number required'),
      firstName: Yup.string()
        .min(2, 'First name has to be at least 2 characters')
        .max(30, 'Last name cannot be more than 30 characters')
        .required('First name required'),
      lastName: Yup.string()
        .min(2, 'Last name has to be at least 2 characters.')
        .max(30, 'Last name cannot be more than 30 characters')
        .required('Last name required'),
      reply: Yup.boolean()
        .required('RSVP reply required'),
      note: Yup.string()
        .max(240)
    }),
  handleSubmit: async (values, { setSubmitting, setStatus, setFieldValue, resetForm, setErrors, props }) => {
      await webService.createRsvp(values)
        .then(res => { 
          setStatus('Registration complete. Thank you!')
          for (let v in values) {
            setFieldValue(v, '')
          }
        })
        .catch(e => {
          setStatus(e.response.data)
        })
    setSubmitting(false)
  }
}

export default withFormik(formikConfig)(Register)