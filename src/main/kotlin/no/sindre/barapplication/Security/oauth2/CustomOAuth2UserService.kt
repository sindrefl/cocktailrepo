package no.sindre.barapplication.Security.oauth2


import no.sindre.barapplication.Models.AuthProvider
import no.sindre.barapplication.Models.User
import no.sindre.barapplication.Repositories.UserRepository
import no.sindre.barapplication.Security.UserPrincipal
import no.sindre.barapplication.Security.oauth2.user.OAuth2UserInfo
import no.sindre.barapplication.Security.oauth2.user.OAuth2UserInfoFactory
import no.sindre.barapplication.exception.OAuth2AuthenticationProcessingException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.InternalAuthenticationServiceException
import org.springframework.security.core.AuthenticationException
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.OAuth2AuthenticationException
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils

@Service
class CustomOAuth2UserService(val userRepository: UserRepository) : DefaultOAuth2UserService() {

    @Throws(OAuth2AuthenticationException::class)
    override fun loadUser(oAuth2UserRequest: OAuth2UserRequest): OAuth2User {
        val oAuth2User = super.loadUser(oAuth2UserRequest)

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User)
        } catch (ex: AuthenticationException) {
            throw ex
        } catch (ex: Exception) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw InternalAuthenticationServiceException(ex.message, ex.cause)
        }

    }

    private fun processOAuth2User(oAuth2UserRequest: OAuth2UserRequest, oAuth2User: OAuth2User): OAuth2User {
        val oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.clientRegistration.registrationId, oAuth2User.attributes)
        if (StringUtils.isEmpty(oAuth2UserInfo.email)) {
            throw OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider")
        }

        var user = userRepository.findByEmail(oAuth2UserInfo.email)
        user = if(user != null){
            if (user.provider != AuthProvider.valueOf(oAuth2UserRequest.clientRegistration.registrationId)) {
                throw OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.provider + " account. Please use your " + user.provider +
                        " account to login.")
            }
            updateExistingUser(user, oAuth2UserInfo)
        } else {
            registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.attributes)
    }

    private fun registerNewUser(oAuth2UserRequest: OAuth2UserRequest, oAuth2UserInfo: OAuth2UserInfo): User {
        val user = User(
                oAuth2UserInfo.name,
                oAuth2UserInfo.email,
                oAuth2UserInfo.imageUrl,
                AuthProvider.valueOf(oAuth2UserRequest.clientRegistration.registrationId),
                oAuth2UserInfo.id
        )

        return userRepository.save(user)
    }

    private fun updateExistingUser(existingUser: User, oAuth2UserInfo: OAuth2UserInfo): User {
        existingUser.name = oAuth2UserInfo.name
        existingUser.imageUrl = oAuth2UserInfo.imageUrl
        return userRepository.updateExisting(existingUser)
    }

}
