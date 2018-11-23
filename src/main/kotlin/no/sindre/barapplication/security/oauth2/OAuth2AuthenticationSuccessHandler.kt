package no.sindre.barapplication.security.oauth2

import no.sindre.barapplication.config.AppProperties
import no.sindre.barapplication.security.TokenProvider
import no.sindre.barapplication.util.CookieUtils
import no.sindre.barapplication.exception.BadRequestException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
import org.springframework.stereotype.Component

import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.io.IOException
import java.net.URI

import no.sindre.barapplication.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.Companion;
import org.springframework.core.env.Environment
import org.springframework.core.env.get

@Component
class OAuth2AuthenticationSuccessHandler @Autowired
internal constructor(private val tokenProvider: TokenProvider, private val appProperties: AppProperties, val environment: Environment) : SimpleUrlAuthenticationSuccessHandler() {

    @Throws(IOException::class, ServletException::class)
    override fun onAuthenticationSuccess(request: HttpServletRequest, response: HttpServletResponse, authentication: Authentication) {
        logger.info("AUTHENTICATION SUCCESS RUN")
        val targetUrl = determineTargetUrl(request, response, authentication)

        if (response.isCommitted) {
            logger.debug("Response has already been committed. Unable to redirect to $targetUrl")
            return
        }

        clearAuthenticationAttributes(request, response)
        redirectStrategy.sendRedirect(request, response, targetUrl)
    }

    protected fun determineTargetUrl(request: HttpServletRequest, response: HttpServletResponse, authentication: Authentication): String {
        val urlStringFromCookie = CookieUtils.getCookie(request, Companion.REDIRECT_URI_PARAM_COOKIE_NAME)?.value ?: defaultTargetUrl

        if (!isAuthorizedRedirectUri(urlStringFromCookie)) {
            throw BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication")
        }

        val token = tokenProvider.createToken(authentication)
        return environment["rooturl"] + urlStringFromCookie + "?token=$token"
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
                    val authorizedURI = URI.create(authorizedRedirectUri)
                    authorizedURI.host.equals(clientRedirectUri.host, ignoreCase = true) && authorizedURI.port == clientRedirectUri.port
                }
    }
}
