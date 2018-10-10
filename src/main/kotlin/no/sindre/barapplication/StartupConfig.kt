package no.sindre.barapplication

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import no.sindre.barapplication.Services.AWSService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import javax.sql.DataSource
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.context.annotation.Primary
import org.springframework.boot.context.properties.ConfigurationProperties
import java.lang.IllegalArgumentException
import java.sql.SQLException


@Configuration
class StartupConfig {

    @Bean
    fun s3client(): AmazonS3? {
        try {
            val s3client = AmazonS3ClientBuilder.standard()
                    .withCredentials(AWSStaticCredentialsProvider(BasicAWSCredentials(System.getenv("AWS_ACCESS_KEY_ID"), System.getenv("AWS_SECRET_ACCESS_KEY"))))
                    .withRegion(Regions.EU_WEST_2)
                    .build()
            return s3client
        } catch (e: IllegalArgumentException) {
            e.printStackTrace()
            return null
        }
    }


    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    fun dataSource(): DataSource {
            return DataSourceBuilder.create().build()
        }
}