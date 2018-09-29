package no.sindre.barapplication

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

import java.util.Date

@RestController
class HelloController {
    @GetMapping("/api/hello")
    fun hello(): String {
        return "Hello, the time at the server is now " + Date() + "\n"
    }
}