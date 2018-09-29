package no.sindre.barapplication

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType
import javax.sql.DataSource

@Configuration
class StartupConfig {


    /*
    //First configure a data source that
    //generates an embedded db
    @Bean(name = arrayOf("dataSource"))
    fun dataSource(): DataSource {

        //This will create a new embedded database and run the schema.sql script
        return EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.HSQL)
                .addScript("schema.sql")
                .build()
    }


*/
    //Create a JdbcTemplate Bean that connects to our database

    @Bean
    fun jdbcTemplate(@Qualifier("dataSource") dataSource: DataSource): NamedParameterJdbcTemplate {
        return NamedParameterJdbcTemplate(dataSource)
    }
}
