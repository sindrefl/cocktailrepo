package no.sindre.barapplication.models

import javax.annotation.Generated


data class User(
        var name: String,
        val email: String,
        var imageUrl: String,
        var provider: AuthProvider,
        var providerId: String
) {
    @Generated
    var id: Long? = null
    var emailVerified: Boolean? = false
}
