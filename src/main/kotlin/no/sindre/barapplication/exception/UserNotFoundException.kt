package no.sindre.barapplication.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus



@ResponseStatus(HttpStatus.NOT_FOUND)
class UserNotFoundException : RuntimeException{
    constructor(email: String) {
        RuntimeException(String.format("User not found with email : '%s'", email))
    }
    constructor(id: Long) {
        RuntimeException(String.format("User not found with id : '%d'", id))
    }
}
