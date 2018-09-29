package no.sindre.barapplication

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BarapplicationApplication

fun main(args: Array<String>) {
    val context = runApplication<BarapplicationApplication>(*args)
    //context.addApplicationListener()
}
