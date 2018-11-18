package no.sindre.barapplication

import no.sindre.barapplication.config.AppProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(AppProperties::class)
class BarapplicationApplication

fun main(args: Array<String>) {
    val context = runApplication<BarapplicationApplication>(*args)
    context.addApplicationListener(ApplicationStartupListener())

}
