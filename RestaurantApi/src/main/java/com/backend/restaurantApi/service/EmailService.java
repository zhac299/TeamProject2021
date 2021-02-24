import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailService{

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to) {

    }
}