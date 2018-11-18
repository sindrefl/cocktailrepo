package no.sindre.barapplication.security.oauth2.user

abstract class OAuth2UserInfo(attributes: Map<String, Any>) {
    var attributes: Map<String, Any>
        protected set

    abstract fun getId(): String

    abstract fun getName(): String

    abstract fun getEmail(): String

    abstract fun getImageUrl(): String?

    init {
        this.attributes = attributes
    }
}
