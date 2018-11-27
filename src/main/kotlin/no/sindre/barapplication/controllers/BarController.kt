package no.sindre.barapplication.controllers

import no.sindre.barapplication.payload.Batteri
import no.sindre.barapplication.security.CurrentUser
import no.sindre.barapplication.security.UserPrincipal
import no.sindre.barapplication.services.BarService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/bar")
class BarController(val barService: BarService){

    @GetMapping("/batteri")
    fun getBatt(@CurrentUser userPrincipal: UserPrincipal): ResponseEntity<Batteri>{
        return ResponseEntity.ok(barService.getBatteri(userPrincipal))
    }
}