package no.sindre.barapplication.controllers

import no.sindre.barapplication.models.User
import no.sindre.barapplication.repositories.UserRepository
import no.sindre.barapplication.security.CurrentUser
import no.sindre.barapplication.security.UserPrincipal
import no.sindre.barapplication.exception.UserNotFoundException
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class UserController(val userRepository: UserRepository) {

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    fun getCurrentUser(@CurrentUser userPrincipal: UserPrincipal): User {
        return userRepository.findByEmail(userPrincipal.email) ?: throw UserNotFoundException(userPrincipal.email)
    }
}