package no.sindre.barapplication

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

import java.util.Date

@RestController
class HelloController(@Autowired var testRepository: TestRepo) {


    @GetMapping("/api/hello")
    fun hello(): String {
        return "Hello, the time at the server is now " + Date() + "\n"
    }

    @GetMapping("/api/test")
    fun hi() : List<String> = testRepository.getAll()
}