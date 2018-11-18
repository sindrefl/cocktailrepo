package no.sindre.barapplication.services

import no.sindre.barapplication.exception.UserNotFoundException
import no.sindre.barapplication.repositories.UserRepository
import no.sindre.barapplication.security.UserPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
class CustomUserDetailsService(val userRepository: UserRepository): UserDetailsService {

    @Transactional
    @Throws(UserNotFoundException::class)
    override fun loadUserByUsername(email: String): UserDetails {
        val user = userRepository.findByEmail(email) ?: throw UserNotFoundException(email = email)
        return UserPrincipal.create(user)
    }

    @Transactional
    @Throws(UserNotFoundException::class)
    fun loadUserById(id: Long): UserDetails {
        val user = userRepository.findById(id) ?: throw UserNotFoundException(id = id)
        return UserPrincipal.create(user)
    }
}