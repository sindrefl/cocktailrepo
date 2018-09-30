package no.sindre.barapplication

import no.sindre.barapplication.Controllers.CocktailController
import no.sindre.barapplication.Repositories.CocktailRepository
import no.sindre.barapplication.Repositories.IngredientsRepository
import no.sindre.barapplication.Services.CSVService
import no.sindre.barapplication.Services.CocktailService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Primary
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import javax.sql.DataSource

@SpringBootApplication
class BarapplicationApplication

fun main(args: Array<String>) {
    val context = runApplication<BarapplicationApplication>(*args)
    //context.addApplicationListener()

}
