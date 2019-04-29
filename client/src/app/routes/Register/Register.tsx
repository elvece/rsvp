import { TextField, Paper, Button, Checkbox, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl } from "@material-ui/core"
import React from 'react'
import { withFormik } from 'formik'


const Register = ({ values, handleChange, handleSubmit, status, isSubmitting }) => (
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
            name="rsvp"
            value={values.response}
            onChange={handleChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
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
    </Paper>
  </React.Fragment>
)

const formikConfig = {
  mapPropsToValues: () => ({
    email: ''
  }),
  handleSubmit: async (values, { setSubmitting, setStatus, props }) => {
    const { register } = props
    try {
      await register(...values)
      setStatus('Registration complete!')
    } catch (e) {
      setStatus(e.message)
      setSubmitting(false)
    }
  }
}

export default withFormik(formikConfig)(Register)