import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailService{

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to); //This email is just a placeholder, will test with created email.
        msg.setSubject("OTP");
        msg.setText("OTP placeholder"); // This text will hold the OTP derived from angular

        mailSender.send(msg);
    }
}