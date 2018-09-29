package no.sindre.barapplication

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource

@Repository
class TestRepo(@Autowired var namedParameterJdbcTemplate: NamedParameterJdbcTemplate) {




   val GET_COCKTAIL_SQL = "SELECT COCKTAIL.NAME FROM COCKTAIL_DB.COCKTAIL;"

    fun get() : List<String> {

        return namedParameterJdbcTemplate.queryForList(GET_COCKTAIL_SQL, MapSqlParameterSource()).map { it.get("name").toString()}
    }
}
