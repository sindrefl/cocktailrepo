package no.sindre.barapplication.Services

import no.sindre.barapplication.exception.UserNotFoundException
import no.sindre.barapplication.Repositories.UserRepository
import no.sindre.barapplication.Security.UserPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
class CustomUserDetailsService(val userRepository: UserRepository): UserDetailsService {

    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(email: String): UserDetails {
        val user = userRepository.findByEmail(email)

        return UserPrincipal.create(user)
    }

    @Transactional
    @Throws(UserNotFoundException::class)
    fun loadUserById(id: Long): UserDetails {
        val user = userRepository.findById(id) ?: throw UserNotFoundException(id = id)
        return UserPrincipal.create(user)
    }
}