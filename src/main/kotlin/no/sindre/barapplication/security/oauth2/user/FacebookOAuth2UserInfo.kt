package no.sindre.barapplication.security.oauth2.user

class FacebookOAuth2UserInfo(attributes: Map<String, Any>) : OAuth2UserInfo(attributes) {

    override fun getId(): String {
        return attributes["id"] as String
    }

    override fun getName(): String {
        return attributes["name"] as String
    }

    override fun getEmail(): String {
        return attributes["email"] as String
    }

    override fun getImageUrl(): String? {
        if (attributes.containsKey("picture")) {
            val pictureObj = attributes["picture"] as Map<String, Any>
            if (pictureObj.containsKey("data")) {
                val dataObj = pictureObj["data"] as Map<String, Any>
                if (dataObj.containsKey("url")) {
                    return dataObj["url"] as String
                }
            }
        }
        return null
    }
}
