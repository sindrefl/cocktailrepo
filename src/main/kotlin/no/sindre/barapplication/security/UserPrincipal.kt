package no.sindre.barapplication.security

import no.sindre.barapplication.models.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.oauth2.core.user.OAuth2User
import java.util.Collections

class UserPrincipal(val id: Long?, val email: String, private val authorities: Collection<GrantedAuthority>) : OAuth2User, UserDetails {
    private val password: String? = null
    private var attributes: Map<String, Any>? = null

    override fun getPassword(): String? {
        return password
    }

    override fun getUsername(): String {
        return email
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }

    override fun getAttributes(): Map<String, Any>? {
        return attributes
    }

    fun setAttributes(attributes: Map<String, Any>) {
        this.attributes = attributes
    }

    override fun getName(): String {
        return id.toString()
    }

    companion object {

        private val admins: List<String> = listOf("superskier131@hotmail.com", "sindre.flood@gmail.com")

        fun create(user: User): UserPrincipal {
            val authorities =
                    if (admins.contains(user.email)) listOf(SimpleGrantedAuthority("ROLE_USER"), SimpleGrantedAuthority("ROLE_ADMIN"))
                    else listOf(SimpleGrantedAuthority("ROLE_USER"))

            return UserPrincipal(
                    user.id,
                    user.email,
                    authorities
            )
        }

        fun create(user: User, attributes: Map<String, Any>): UserPrincipal {
            val userPrincipal = UserPrincipal.create(user)
            userPrincipal.setAttributes(attributes)
            return userPrincipal
        }
    }
}
