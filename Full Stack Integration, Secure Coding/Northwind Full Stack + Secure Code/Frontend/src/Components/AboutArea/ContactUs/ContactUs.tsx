import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import "./ContactUs.css";
import ContactMail from '@mui/icons-material/ContactMail';
import Send from '@mui/icons-material/Send';
import Clear from '@mui/icons-material/Clear';

function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs">
            
            <Typography variant="h3">
                
                Contact Us &nbsp;

               
                <ContactMail fontSize="large"/>
            </Typography>

			<form>
                <TextField label="Name" className="TextBox"/>

                <TextField label="Email" type="email" className="TextBox" />
                
                <TextField label="Message"  className="TextBox"/>

                <FormControlLabel control={<Checkbox/>} label="Send me promotional emails" className="Left"/>


                <ButtonGroup variant="contained" fullWidth>
                    <Button color="primary">Send &nbsp; <Send/> </Button>
                    <Button type="reset" color="secondary" >Clear &nbsp; <Clear/> </Button>
                </ButtonGroup>

            </form>
        </div>
    );
}

export default ContactUs;
