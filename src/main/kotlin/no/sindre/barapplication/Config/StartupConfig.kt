package no.sindre.barapplication.Config

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.lang.IllegalArgumentException
import org.springframework.core.env.Environment

@Configuration
class StartupConfig {

    @Autowired
    val env : Environment? = null

    @Bean
    fun s3client(): AmazonS3? {
        try {
            val s3client = AmazonS3ClientBuilder.standard()
                    .withCredentials(AWSStaticCredentialsProvider(BasicAWSCredentials(env!!.getProperty("awskey"), env!!.getProperty("awssecret"))))
                    .withRegion(Regions.EU_WEST_2)
                    .build()
            return s3client
        } catch (e: IllegalArgumentException) {
            e.printStackTrace()
            return null
        }
    }
}