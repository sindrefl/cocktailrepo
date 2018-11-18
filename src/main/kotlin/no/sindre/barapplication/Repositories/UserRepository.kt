package no.sindre.barapplication.Repositories

import no.sindre.barapplication.Models.AuthProvider
import no.sindre.barapplication.Models.User
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
class UserRepository(val namedParameterJdbcTemplate: NamedParameterJdbcTemplate) {

    fun updateExisting(user: User): User{
        val sql = """
            UPDATE cocktail_db.user
            SET
            name=:name,
            image_url=:image_url
            WHERE email=:email
            """.trimIndent().regexReplace()
        val map = MapSqlParameterSource(hashMapOf(
                "name" to user.name,
                "email" to user.email,
                "image_url" to user.imageUrl
        ))
        namedParameterJdbcTemplate.update(sql, map)
        return user
    }

    @Transactional
    fun save(user: User): User{
        val keyHolder = GeneratedKeyHolder()
        val sql = """
            INSERT INTO COCKTAIL_DB.USERINGREDIENTS
            (vodka,gin,rum,triple_sec,tequila)
            VALUES
            (0,0,0,0,0)
            """.trimIndent().regexReplace()
        namedParameterJdbcTemplate.update(sql, MapSqlParameterSource(), keyHolder)
        val sql2 = """
            INSERT INTO COCKTAIL_DB.USER
            (email,name,image_url,authprovider,auth_id,ingredienttable_id)
            VALUES
            (:email,:name,:image_url,:authprovider,:auth_id,:ingredients_id)
            """.trimIndent().regexReplace()
        val map = MapSqlParameterSource(hashMapOf(
                "email" to user.email,
                "name" to user.name,
                "image_url" to user.imageUrl,
                "authprovider" to user.provider.toString(),
                "auth_id" to user.providerId,
                "ingredients_id" to keyHolder.keys!!["ingredienttable_id"]

        ))
        namedParameterJdbcTemplate.update(sql2, map, keyHolder)
        user.id = keyHolder.keys!!["id"].toString().toLong()
        return user
    }

    fun findByEmail(email: String): User? {
        val sql = """
            SELECT *
            FROM cocktail_db.user
            WHERE email=(:email)
            """.trimIndent().regexReplace()
        val map = MapSqlParameterSource(hashMapOf(
                "email" to email
        ))
        try{
            return namedParameterJdbcTemplate.queryForObject(sql, map,
                    {rs, _ ->
                        val user: User? = User(
                            email = rs.getString("email"),
                            name = rs.getString("name"),
                            imageUrl = rs.getString("image_url"),
                            provider = AuthProvider.valueOf(rs.getString("authprovider")),
                            providerId = rs.getString("auth_id")
                    )
                        user!!.id = rs.getLong("id")
                        user
                    })
        }
        catch (e : EmptyResultDataAccessException){
            return null
        }
    }

    fun findById(id: Long): User?{
        val sql = """
            SELECT *
            FROM cocktail_db.user
            WHERE id=(:id)
            """.trimIndent().regexReplace()
        val map = MapSqlParameterSource(hashMapOf(
                "id" to id
        ))
        try{
            return namedParameterJdbcTemplate.queryForObject(sql, map,
                    {rs, _ ->
                        val user: User? = User(
                                email = rs.getString("email"),
                                name = rs.getString("name"),
                                imageUrl = rs.getString("image_url"),
                                provider = AuthProvider.valueOf(rs.getString("authprovider")),
                                providerId = rs.getString("auth_id")
                        )
                        user!!.id = rs.getLong("id")
                        user
                    })
        }
        catch (e : EmptyResultDataAccessException){
            return null
        }
    }

    fun String.regexReplace() :String {
        val nRegex = Regex("\\\n")
        return this.replace(nRegex," ")
    }
}