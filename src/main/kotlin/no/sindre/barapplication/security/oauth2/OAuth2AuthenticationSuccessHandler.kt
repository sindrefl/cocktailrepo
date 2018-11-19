package no.sindre.barapplication.security.oauth2

import no.sindre.barapplication.config.AppProperties
import no.sindre.barapplication.security.TokenProvider
import no.sindre.barapplication.util.CookieUtils
import no.sindre.barapplication.exception.BadRequestException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
import org.springframework.stereotype.Component
import org.springframework.web.util.UriComponentsBuilder

import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.io.IOException
import java.net.URI

import no.sindre.barapplication.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.Companion;

@Component
class OAuth2AuthenticationSuccessHandler @Autowired
internal constructor(private val tokenProvider: TokenProvider, private val appProperties: AppProperties) : SimpleUrlAuthenticationSuccessHandler() {

    @Throws(IOException::class, ServletException::class)
    override fun onAuthenticationSuccess(request: HttpServletRequest, response: HttpServletResponse, authentication: Authentication) {
        println("AUTHENTICATION SUCCESS RUN")
        val targetUrl = determineTargetUrl(request, response, authentication)

        if (response.isCommitted) {
            logger.debug("Response has already been committed. Unable to redirect to $targetUrl")
            return
        }

        clearAuthenticationAttributes(request, response)
        redirectStrategy.sendRedirect(request, response, targetUrl)
    }

    protected fun determineTargetUrl(request: HttpServletRequest, response: HttpServletResponse, authentication: Authentication): String {
        val redirectUri = CookieUtils.getCookie(request, Companion.REDIRECT_URI_PARAM_COOKIE_NAME)?.value ?: defaultTargetUrl

        if (!isAuthorizedRedirectUri(redirectUri)) {
            throw BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication")
        }

        val token = tokenProvider.createToken(authentication)

        return UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("token", token)
                .build().toUriString()
    }

    protected fun clearAuthenticationAttributes(request: HttpServletRequest, response: HttpServletResponse) {
        super.clearAuthenticationAttributes(request)
        HttpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequest(request, response)
    }


    private fun isAuthorizedRedirectUri(uri: String): Boolean {
        val clientRedirectUri = URI.create(uri)

        return appProperties.oauth2.authorizedRedirectUris
                .stream()
                .anyMatch { authorizedRedirectUri ->
                    // Only validate host and port. Let the clients use different paths if they want to
                    val authorizedURI = URI.create(authorizedRedirectUri)
                    authorizedURI.host.equals(clientRedirectUri.host, ignoreCase = true) && authorizedURI.port == clientRedirectUri.port
                }
    }
}
