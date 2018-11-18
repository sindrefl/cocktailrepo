package no.sindre.barapplication.security.oauth2.user

class GithubOAuth2UserInfo(attributes: Map<String, Any>) : OAuth2UserInfo(attributes) {

    override fun getId(): String {
        return (attributes["id"] as Int).toString()
    }

    override fun getName(): String {
        return attributes["name"] as String
    }

    override fun getEmail(): String {
        return attributes["email"] as String
    }

    override fun getImageUrl(): String {
        return attributes["avatar_url"] as String
    }
}
