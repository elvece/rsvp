import { TextField, Paper, Button, Checkbox, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl } from "@material-ui/core"
import React from 'react'
import { withFormik } from 'formik'
import { WebService } from 'app/services/WebService'

const webService = new WebService('http://localhost:3333')

const Register = ({ values, handleChange, handleSubmit, handleReset, status, isSubmitting }) => (
  <React.Fragment>
    <Paper>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          />
        <TextField
          label="Last Name"
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl component="div">
          <FormLabel component="label">RSVP</FormLabel>
          <RadioGroup
            aria-label="RSVP"
            name="reply"
            value={values.response}
            onChange={handleChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <Button
          onClick={handleReset}
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
  </React.Fragment>
)

const formikConfig = {
  mapPropsToValues: () => ({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    reply: ''
  }),
  handleSubmit: async (values, { setSubmitting, setStatus, setErrors, props }) => {
    try {
      await webService.createRsvp(values)
      setStatus('Registration complete!')
    } catch (e) {
      setErrors(e)
      setStatus(e.message)
      setSubmitting(false)
    }
  }
}

export default withFormik(formikConfig)(Register)