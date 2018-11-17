package no.sindre.barapplication.Repositories

import no.sindre.barapplication.Models.AuthProvider
import no.sindre.barapplication.Models.User
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class UserRepository(val namedParameterJdbcTemplate: NamedParameterJdbcTemplate) {

    fun save(user: User): User{
        //TODO
        return user
    }

    fun findByEmail(email: String): User {
        //TODO
        return User("This","is", "an example", AuthProvider.facebook, "streng")
    }

    fun findById(id : Long): User {
        //TODO
        return findByEmail("")
    }
}