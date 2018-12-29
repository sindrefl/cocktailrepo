package no.sindre.barapplication.services

import com.sendgrid.*
import org.springframework.stereotype.Service

import java.io.IOException
@Service
class MailService {
    fun sendOrderMail(cocktailName: String, orderName: String){
        println(cocktailName)
        val from = Email("no-reply@mycocktailbar.com")
        val subject = "Drink order: $cocktailName - to - $orderName"
        val to = Email("sindre.flood@gmail.com")
        val content = Content("text/plain", "This is the email content.")
        val mail = Mail(from, subject, to, content)

        val sg = SendGrid(System.getenv("SENDGRID_API_KEY"))
        val request = Request()
        try {
            request.method = Method.POST
            request.endpoint = "mail/send"
            request.body = mail.build()
            val response = sg.api(request)
            println(response.statusCode)
            println(response.body)
            println(response.headers)
        } catch (ex: IOException) {
            throw ex
        }
    }
}

