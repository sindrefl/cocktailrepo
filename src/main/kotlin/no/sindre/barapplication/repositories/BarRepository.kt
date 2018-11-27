package no.sindre.barapplication.repositories

import no.sindre.barapplication.payload.Batteri
import no.sindre.barapplication.security.UserPrincipal
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository
import org.springframework.util.LinkedCaseInsensitiveMap

@Repository
class BarRepository(val namedParameterJdbcTemplate: NamedParameterJdbcTemplate){

    fun getBatteri(userPrincipal: UserPrincipal): Batteri{
        val sql = """
            SELECT * FROM
            cocktail_db.useringredients as ing
            INNER JOIN cocktail_db.user as cu
            ON cu.ingredienttable_id=ing.ingredienttable_id
            WHERE cu.email=:email
            """.trimIndent().regexReplace()
        val map = MapSqlParameterSource(hashMapOf(
                "email" to userPrincipal.email
        ))

        return namedParameterJdbcTemplate.queryForObject(sql,map, { rs, rowNum -> Batteri(rs.getInt("vodka"),rs.getInt("gin"),rs.getInt("rum"),rs.getInt("triple_sec"),rs.getInt("tequila") ) })!!
    }

    fun String.regexReplace() :String {
        val nRegex = Regex("\\\n")
        return this.replace(nRegex," ")
    }
}