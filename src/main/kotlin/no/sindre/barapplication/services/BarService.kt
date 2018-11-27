package no.sindre.barapplication.services

import no.sindre.barapplication.payload.Batteri
import no.sindre.barapplication.repositories.BarRepository
import no.sindre.barapplication.security.UserPrincipal
import org.springframework.stereotype.Service

@Service
class BarService(val barRepository: BarRepository){

    fun getBatteri(currentUser: UserPrincipal) : Batteri{
        val res = barRepository.getBatteri(currentUser)
        return barRepository.getBatteri(currentUser)

    }
}