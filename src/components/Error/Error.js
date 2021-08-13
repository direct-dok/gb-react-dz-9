import React from 'react'

// Material UI
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const Error = () => {

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1">Error 404! No such page exists</Typography>
      <Typography variant="body1" component="p">Unfortunately, the page you requested does not exist, or has changed the address. If you want to continue working with our site, then return to the main page</Typography>
    </Container>
  );
}

export default Error
