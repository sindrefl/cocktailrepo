package no.sindre.barapplication.Controllers

import no.sindre.barapplication.Models.User
import no.sindre.barapplication.Repositories.UserRepository
import no.sindre.barapplication.Security.CurrentUser
import no.sindre.barapplication.Security.UserPrincipal
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class UserController(val userRepository: UserRepository) {


    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    fun getCurrentUser(@CurrentUser userPrincipal: UserPrincipal): User {
        return userRepository.findById(userPrincipal.id)
    }
}